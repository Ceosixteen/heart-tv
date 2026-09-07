import { NextResponse } from "next/server";

const FIREBASE_READY =
  !!process.env.FIREBASE_PROJECT_ID &&
  !!process.env.FIREBASE_CLIENT_EMAIL &&
  !!process.env.FIREBASE_PRIVATE_KEY;

function clean(v: unknown, max = 2000) {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Could not read submission." }, { status: 400 });
  }

  const name = clean(body.name, 120);
  const email = clean(body.email, 160);
  const subject = clean(body.subject, 200);
  const message = clean(body.message, 4000);

  if (!name) return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
    return NextResponse.json({ error: "That email address doesn't look right." }, { status: 400 });
  if (!message) return NextResponse.json({ error: "Please write a message." }, { status: 400 });

  const entry = {
    id: `MSG-${Date.now().toString(36).toUpperCase()}`,
    receivedAt: new Date().toISOString(),
    name,
    email,
    subject: subject || "(no subject)",
    message,
  };

  try {
    if (FIREBASE_READY) {
      const { db, Timestamp } = await import("@/lib/firebase");
      await db()
        .collection("contact_messages")
        .doc(entry.id)
        .set({ ...entry, receivedAt: Timestamp.fromDate(new Date(entry.receivedAt)) });
    } else {
      console.log("Contact message (no Firestore):", entry);
    }
  } catch (err) {
    console.error("Could not save contact message", err);
    return NextResponse.json(
      { error: "Something went wrong. Please email us directly." },
      { status: 500 },
    );
  }

  return NextResponse.json({
    ok: true,
    message: `Thank you, ${name.split(" ")[0]} — we'll be in touch soon.`,
  });
}
