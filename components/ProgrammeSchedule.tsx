"use client";

import { useState } from "react";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function ProgrammeSchedule() {
  const [selected, setSelected] = useState("Sunday");

  return (
    <div className="overflow-hidden rounded-3xl border border-navy/10 bg-white shadow-sm">
      <div className="overflow-x-auto border-b border-navy/10 px-3 py-3">
        <div className="flex min-w-max gap-1" role="tablist" aria-label="Weekly programme schedule">
          {DAYS.map((day) => (
            <button
              key={day}
              type="button"
              role="tab"
              aria-selected={selected === day}
              aria-controls="programme-day"
              onClick={() => setSelected(day)}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                selected === day ? "bg-navy text-white" : "text-muted hover:bg-mist hover:text-navy"
              }`}
            >
              {day.slice(0, 3)}
            </button>
          ))}
        </div>
      </div>

      <div id="programme-day" role="tabpanel" className="grid min-h-64 place-items-center px-6 py-14 text-center">
        <div key={selected} className="programme-panel-in">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-mist text-2xl text-blue" aria-hidden>
            ◷
          </span>
          <p className="eyebrow mt-6 text-blue">{selected} · East Africa Time</p>
          <h3 className="display mt-3 text-2xl text-navy">Schedule coming soon.</h3>
          <p className="mx-auto mt-3 max-w-md leading-relaxed text-muted">
            The official Heart TV timetable is being prepared. Follow our social channels for current service and broadcast announcements.
          </p>
        </div>
      </div>
    </div>
  );
}
