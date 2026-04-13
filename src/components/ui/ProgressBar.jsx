import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, Target, Flame, Trophy } from "lucide-react";
import { plan } from "../data/plan";

export default function Progress() {
  const [progress, setProgress] = useState({
    totalTasks: 0,
    completedTasks: 0,
    dayStats: {},
    streak: 0,
  });

  const computeProgress = () => {
    let completed = 0;
    let total = 0;
    const dayStats = {};

    plan.forEach((day) => {
      const saved = JSON.parse(localStorage.getItem(`day-${day.day}`)) || [];
      total += day.tasks.length;
      completed += saved.length;
      dayStats[day.day] = saved.length;
    });

    let streak = 0;
    for (let i = plan.length; i >= 1; i--) {
      if (dayStats[i] > 0) streak++;
      else break;
    }

    setProgress({
      totalTasks: total,
      completedTasks: completed,
      dayStats,
      streak,
    });
  };

  useEffect(() => {
    computeProgress();
    window.addEventListener("local-update", computeProgress);
    return () => {
      window.removeEventListener("local-update", computeProgress);
    };
  }, []);

  const percentage = useMemo(() => {
    if (progress.totalTasks === 0) return 0;
    return Math.min(
      Math.round((progress.completedTasks / progress.totalTasks) * 100),
      100
    );
  }, [progress]);

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-4 text-white md:p-8">
      <Header />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <MiniStat
          icon={<Flame size={18} />}
          label="Current Streak"
          value={`${progress.streak} Days`}
        />
        <MiniStat
          icon={<CheckCircle2 size={18} />}
          label="Tasks Completed"
          value={progress.completedTasks}
        />
        <MiniStat
          icon={<Target size={18} />}
          label="Mastery"
          value={`${percentage}%`}
        />
      </div>

      <ProgressBar
        percent={percentage}
        completed={progress.completedTasks}
        total={progress.totalTasks}
      />

      <ActivityMap dayStats={progress.dayStats} />
    </div>
  );
}

function Header() {
  return (
    <div className="flex items-end justify-between">
      <div>
        <h1 className="text-2xl font-semibold md:text-3xl">
          Progress Overview
        </h1>
        <p className="text-sm text-white/50">Track your 90-day consistency</p>
      </div>
    </div>
  );
}

function ProgressBar({ percent, completed, total }) {
  const safePercent = Math.max(0, Math.min(100, percent));
  const showTip = safePercent > 2;

  return (
    <section className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-[0_8px_30px_rgba(0,0,0,0.18)] backdrop-blur-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-white/40">
            Overall Progress
          </p>
          <p className="mt-1 text-sm font-medium text-white/85">
            {completed} / {total} tasks completed
          </p>
        </div>

        <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm font-semibold text-white shadow-inner shadow-white/5">
          {safePercent}%
        </div>
      </div>

      <div className="relative">
        <div className="relative h-3.5 w-full overflow-hidden rounded-full bg-white/10 ring-1 ring-inset ring-white/5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_70%)]" />

          <div
            className="relative h-full rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-sky-400 shadow-[0_0_18px_rgba(99,102,241,0.30)] transition-[width] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{ width: `${safePercent}%` }}
          >
            <div className="absolute inset-0 rounded-full bg-[linear-gradient(to_bottom,rgba(255,255,255,0.24),rgba(255,255,255,0.03))]" />

            <div className="absolute inset-0 overflow-hidden rounded-full">
              <div className="absolute inset-y-0 left-[-35%] w-[32%] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.48),transparent)] skew-x-[-18deg] animate-progress-shine" />
            </div>

            <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
              <span className="snow-dot absolute left-[14%] top-1/2 -translate-y-1/2 animate-snow-float [animation-delay:0s]" />
              <span className="snow-dot absolute left-[36%] top-[32%] animate-snow-float [animation-delay:.8s]" />
              <span className="snow-dot absolute left-[57%] top-[60%] animate-snow-float [animation-delay:1.6s]" />
              <span className="snow-dot absolute left-[76%] top-[35%] animate-snow-float [animation-delay:2.4s]" />
            </div>

            {showTip && (
              <div className="pointer-events-none absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 translate-x-[20%]">
                <div className="absolute inset-[3px] rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.95)]" />
                <div className="absolute inset-0 rounded-full bg-white/25 blur-md animate-tip-pulse" />
              </div>
            )}
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between text-[11px] text-white/45">
          <span>Keep going</span>
          <span>Smooth live progress</span>
        </div>
      </div>
    </section>
  );
}

function ActivityMap({ dayStats }) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Trophy size={14} className="text-yellow-400" />
          <h3 className="text-xs uppercase tracking-wide text-white/40">
            Activity Map
          </h3>
        </div>

        <span className="text-[10px] text-white/30">Last 90 days</span>
      </div>

      <div className="grid grid-cols-7 gap-2 sm:grid-cols-10 md:grid-cols-15 lg:grid-cols-[repeat(18,minmax(0,1fr))]">
        {Array.from({ length: 90 }).map((_, i) => {
          const day = i + 1;
          const count = dayStats[day] || 0;

          const color =
            count === 0
              ? "bg-white/[0.06]"
              : count === 1
              ? "bg-emerald-900"
              : count === 2
              ? "bg-emerald-600"
              : "bg-emerald-400";

          return (
            <div
              key={day}
              title={`Day ${day} • ${count} tasks`}
              className={`
                group relative aspect-square rounded-md transition-all duration-200
                ${color}
                hover:scale-110
                hover:shadow-[0_0_8px_rgba(52,211,153,0.25)]
              `}
            >
              <span className="absolute inset-0 flex items-center justify-center text-[8px] text-white/70 opacity-0 transition group-hover:opacity-100">
                {day}
              </span>
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-2 text-[10px] text-white/30">
        <span>Less</span>
        <div className="flex gap-1">
          <div className="h-3 w-3 rounded bg-white/[0.06]" />
          <div className="h-3 w-3 rounded bg-emerald-900" />
          <div className="h-3 w-3 rounded bg-emerald-600" />
          <div className="h-3 w-3 rounded bg-emerald-400" />
        </div>
        <span>More</span>
      </div>
    </section>
  );
}

function MiniStat({ icon, label, value, color = "text-emerald-400" }) {
  return (
    <div
      className="
        group flex items-center gap-4 rounded-xl border border-white/10
        bg-white/[0.03] p-4 transition-all duration-200
        hover:border-white/20 hover:bg-white/[0.05]
      "
    >
      <div
        className={`
          flex h-10 w-10 items-center justify-center rounded-lg
          border border-white/10 bg-white/[0.05]
          ${color}
          transition group-hover:scale-105
        `}
      >
        {icon}
      </div>

      <div className="flex flex-col">
        <span className="text-[11px] uppercase tracking-wide text-white/40">
          {label}
        </span>

        <span className="text-lg font-semibold text-white">{value}</span>
      </div>
    </div>
  );
}