import { useEffect, useState, useMemo } from "react";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import { plan } from "../data/plan";
import { Activity, CheckCircle2, Clock, ChevronDown } from "lucide-react";

export default function Dashboard() {
  const [open, setOpen] = useState(false);

  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    daysDone: 0,
  });

  const [openPhase, setOpenPhase] = useState({
    p1: true,
    p2: false,
    p3: false,
  });

  const phases = useMemo(() => ({
    p1: plan.filter((d) => d.day <= 30),
    p2: plan.filter((d) => d.day > 30 && d.day <= 60),
    p3: plan.filter((d) => d.day > 60),
  }), []);

  // -----------------------------
  // CALCULATE
  // -----------------------------
  const calculate = () => {
    let total = 0, completed = 0, daysDone = 0;

    plan.forEach((day) => {
      const saved =
        JSON.parse(localStorage.getItem(`day-${day.day}`)) || [];

      total += day.tasks.length;
      completed += saved.length;

      if (saved.length === day.tasks.length && day.tasks.length > 0) {
        daysDone++;
      }
    });

    setStats({ total, completed, daysDone });
  };

  useEffect(() => {
    calculate();
    window.addEventListener("local-update", calculate);
    window.addEventListener("storage", calculate);

    return () => {
      window.removeEventListener("local-update", calculate);
      window.removeEventListener("storage", calculate);
    };
  }, []);

  const percent =
    stats.total > 0
      ? Math.round((stats.completed / stats.total) * 100)
      : 0;

  const togglePhase = (key) => {
    setOpenPhase((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="bg-[#0B0F1A] text-white min-h-screen">

      <Navbar setOpen={setOpen} />
      <Sidebar open={open} setOpen={setOpen} />

      <main className="pt-16 md:pl-56 px-4 md:px-6 pb-10">
        <div className="max-w-6xl mx-auto space-y-8">

          {/* HEADER */}
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-xl font-semibold">Dashboard</h1>
              <p className="text-xs text-white/40">
                Track your 90-day progress
              </p>
            </div>
            <span className="text-sm font-semibold text-indigo-400">
              {percent}%
            </span>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-3 gap-3">
            <StatCard icon={<Activity size={16} />} label="Tasks" value={stats.completed} color="text-indigo-400" />
            <StatCard icon={<CheckCircle2 size={16} />} label="Days Done" value={stats.daysDone} color="text-emerald-400" />
            <StatCard icon={<Clock size={16} />} label="Remaining" value={plan.length - stats.daysDone} color="text-orange-400" />
          </div>

          {/* IMPROVED PROGRESS */}
          <div className="bg-white/[0.04] border border-white/[0.06] rounded-xl p-5">

            <div className="flex justify-between mb-3">
              <span className="text-xs text-white/40">Overall Progress</span>
              <span className="text-sm font-semibold">{percent}%</span>
            </div>

            <div className="h-3 bg-white/10 rounded-full overflow-hidden relative">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-blue-500 transition-all duration-700"
                style={{ width: `${percent}%` }}
              />

              {/* subtle shine */}
              <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.2),transparent)] animate-[shine_2.5s_linear_infinite]" />
            </div>

          </div>

          {/* PHASES */}
          <div className="space-y-6">

            {[
              { key: "p1", title: "Phase 1 (Day 1–30)" },
              { key: "p2", title: "Phase 2 (Day 31–60)" },
              { key: "p3", title: "Phase 3 (Day 61–90)" },
            ].map((phase) => (

              <div key={phase.key}>

                {/* HEADER */}
                <div
                  onClick={() => togglePhase(phase.key)}
                  className="cursor-pointer flex justify-between items-center bg-white/[0.04] border border-white/[0.06] rounded-xl px-4 py-3 hover:border-white/10 transition"
                >
                  <h2 className="text-sm font-semibold text-white/80">
                    {phase.title}
                  </h2>

                  <div className="flex items-center gap-2 text-xs text-white/40">
                    {openPhase[phase.key] ? "Collapse" : "Expand"}
                    <ChevronDown
                      size={14}
                      className={`transition ${openPhase[phase.key] ? "rotate-180" : ""}`}
                    />
                  </div>
                </div>

                {/* CONTENT */}
                {openPhase[phase.key] && (
                  <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 mt-3">
                    {phases[phase.key].map((day) => (
                      <DayCard key={day.day} day={day} />
                    ))}
                  </div>
                )}

              </div>
            ))}

          </div>

        </div>
      </main>

      {/* ANIMATION */}
      <style>
        {`
          @keyframes shine {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}
      </style>

    </div>
  );
}

/* DAY CARD */
function DayCard({ day }) {
  const saved =
    JSON.parse(localStorage.getItem(`day-${day.day}`)) || [];

  const done = saved.length;
  const total = day.tasks.length;
  const percent = total ? Math.round((done / total) * 100) : 0;

  return (
    <div className="group bg-white/[0.04] border border-white/[0.06] rounded-xl p-4 hover:border-white/10 hover:scale-[1.02] transition">

      <div className="flex justify-between mb-2">
        <span className="text-[10px] text-white/40">Day {day.day}</span>
        <span className="text-[10px] text-white/40">{percent}%</span>
      </div>

      <p className="text-sm text-white/80 mb-3 line-clamp-2">
        {day.title}
      </p>

      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden mb-2">
        <div
          className="h-full bg-indigo-500 transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>

      <div className="text-[10px] text-white/40 flex justify-between">
        <span>{done}/{total}</span>
        <span>{percent === 100 ? "Done" : "Progress"}</span>
      </div>

    </div>
  );
}

/* STAT CARD */
function StatCard({ icon, label, value, color }) {
  return (
    <div className="bg-white/[0.04] border border-white/[0.06] rounded-xl p-4 flex items-center gap-3 hover:bg-white/[0.06] transition">
      <div className={color}>{icon}</div>
      <div>
        <p className="text-[10px] text-white/40">{label}</p>
        <p className="text-sm font-semibold text-white">{value}</p>
      </div>
    </div>
  );
}