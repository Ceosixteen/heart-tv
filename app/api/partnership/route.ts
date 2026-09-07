import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

const STORE = path.join(process.cwd(), "content", "submissions.json");

type Submission = Record<string, unknown> & { id: string; receivedAt: string };

function clean(value: unknown, max = 2000) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "We could not read that submission." }, { status: 400 });
  }

  const fullName = clean(body.fullName, 120);
  const email = clean(body.email, 160);
  const phone = clean(body.phone, 40);
  const country = clean(body.country, 80);

  if (!fullName) return NextResponse.json({ error: "Please tell us your name." }, { status: 400 });
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
    return NextResponse.json({ error: "That email address does not look right." }, { status: 400 });
  if (phone.replace(/\D/g, "").length < 7)
    return NextResponse.json({ error: "Please give us a reachable phone number." }, { status: 400 });
  if (!country) return NextResponse.json({ error: "Please tell us your country." }, { status: 400 });
  if (!body.consent)
    return NextResponse.json({ error: "We need your permission to contact you." }, { status: 400 });

  const submission: Submission = {
    id: `HTV-${Date.now().toString(36).toUpperCase()}`,
    receivedAt: new Date().toISOString(),
    fullName,
    email,
    phone,
    country,
    tier: clean(body.tier, 40),
    frequency: clean(body.frequency, 40),
    currency: clean(body.currency, 8),
    amount: clean(body.amount, 20),
    heardFrom: clean(body.heardFrom, 80),
    prayer: clean(body.prayer, 4000),
    newsletter: Boolean(body.newsletter),
  };

  // Local JSON store. Swap this block for the ministry CRM / mailing list
  // once credentials are available — the shape above is what it should receive.
  try {
    let existing: Submission[] = [];
    try {
      existing = JSON.parse(await fs.readFile(STORE, "utf8")) as Submission[];
    } catch {
      existing = [];
    }
    existing.push(submission);
    await fs.writeFile(STORE, `${JSON.stringify(existing, null, 2)}\n`, "utf8");
  } catch (err) {
    console.error("Could not persist partnership submission", err);
    return NextResponse.json(
      { error: "We could not save that. Please call partner care instead." },
      { status: 500 },
    );
  }

  return NextResponse.json({
    ok: true,
    reference: submission.id,
    message: `Thank you, ${fullName.split(" ")[0]} — your reference is ${submission.id}.`,
  });
}
