import { useEffect, useMemo, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Target, Flame, Trophy, AlertTriangle } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import { plan } from "../data/plan";

// --- SAFE STORAGE UTILITY ---
const getSafeStorage = (key) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : [];
  } catch (error) {
    return [];
  }
};

export default function Progress() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [dataError, setDataError] = useState(false);
  
  const [progress, setProgress] = useState({
    totalTasks: 0,
    completedTasks: 0,
    dayStats: {},
    streak: 0,
  });

  // -----------------------------
  // FAIL-SAFE DATA ENGINE
  // -----------------------------
  const computeProgress = useCallback(() => {
    try {
      let completed = 0;
      let total = 0;
      const dayStats = {};

      if (!Array.isArray(plan)) {
        setDataError(true);
        return;
      }

      plan.forEach((day) => {
        if (!day) return;
        const saved = getSafeStorage(`day-${day.day || 'unknown'}`);
        
        let dayTotalTasks = 0;
        if (day.sections) {
          dayTotalTasks = Object.values(day.sections).reduce(
            (acc, arr) => acc + (Array.isArray(arr) ? arr.length : 0), 0
          );
        } else if (Array.isArray(day.tasks)) {
          dayTotalTasks = day.tasks.length;
        } else if (day.stats?.totalTasks) {
          dayTotalTasks = day.stats.totalTasks;
        }

        total += dayTotalTasks;
        completed += saved.length;
        dayStats[day.day] = saved.length;
      });

      // Calculate Streak Safely
      let streak = 0;
      for (let i = plan.length; i >= 1; i--) {
        if (dayStats[i] > 0) streak++;
        else if (streak > 0) break;
      }

      setProgress({ totalTasks: total, completedTasks: completed, dayStats, streak });
      setDataError(false);
    } catch (err) {
      setDataError(true);
    }
  }, []);

  useEffect(() => {
    computeProgress();
    window.addEventListener("local-update", computeProgress);
    window.addEventListener("storage", computeProgress);
    return () => {
      window.removeEventListener("local-update", computeProgress);
      window.removeEventListener("storage", computeProgress);
    };
  }, [computeProgress]);

  const percentage = useMemo(() => {
    if (progress.totalTasks === 0) return 0;
    return Math.min(Math.round((progress.completedTasks / progress.totalTasks) * 100), 100);
  }, [progress]);

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-400 font-sans antialiased selection:bg-zinc-800">
      {/* Structural Minimalist Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f23_1px,transparent_1px),linear-gradient(to_bottom,#1f1f23_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-[0.2] pointer-events-none" />

      <Navbar setOpen={setIsSidebarOpen} />
      <Sidebar open={isSidebarOpen} setOpen={setIsSidebarOpen} />

      <main className="pt-24 md:pl-64 px-6 lg:px-12 pb-24 relative z-10 max-w-[1400px] mx-auto">
        <div className="space-y-10">
          
          {/* ERROR BANNER */}
          {dataError && (
            <div className="bg-red-500/5 border border-red-500/20 text-red-400 p-4 rounded-xl flex items-center gap-3 text-sm">
              <AlertTriangle size={16} className="text-red-400 shrink-0" />
              <p className="text-xs font-medium">Warning: Missing or corrupted curriculum pipeline data structures. Telemetry statistics may read inaccurate maps.</p>
            </div>
          )}

          <Header />

          {/* STATS SUMMARY PANELS */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <MiniStat
              icon={<Flame size={14} />}
              label="Current Progress Streak"
              value={`${progress.streak} Days`}
              color="text-orange-400"
              bg="bg-orange-500/5 border-orange-500/10"
            />
            <MiniStat
              icon={<CheckCircle2 size={14} />}
              label="Tasks Completed"
              value={`${progress.completedTasks} units`}
              color="text-emerald-400"
              bg="bg-emerald-500/5 border-emerald-500/10"
            />
            <MiniStat
              icon={<Target size={14} />}
              label="Core Mastery Rate"
              value={`${percentage}%`}
              color="text-indigo-400"
              bg="bg-indigo-500/5 border-indigo-500/10"
            />
          </div>

          {/* CINEMATIC TRACK BAR */}
          <ProgressBar percent={percentage} completed={progress.completedTasks} total={progress.totalTasks} />

          {/* SYSTEM HEATMAP CONNECTOR */}
          <ActivityMap dayStats={progress.dayStats} />
        </div>
      </main>

      <style>{`
        @keyframes tip-pulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.3); opacity: 0.3; }
        }
        .animate-tip-pulse { animation: tip-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
      `}</style>
    </div>
  );
}

// -----------------------------
// SYSTEM HEADER BANNER
// -----------------------------
function Header() {
  return (
    <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-zinc-800/60">
      <div>
        <div className="flex items-center gap-2 text-xs font-medium text-zinc-500 mb-1">
          <span>Metrics Analytics Console</span>
          <span className="text-zinc-700">/</span>
          <span className="text-zinc-400 font-mono">Overview</span>
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-100 flex items-center gap-2">
          Progress Architecture
        </h1>
      </div>
    </header>
  );
}

// -----------------------------
// PROGRESS BAR
// -----------------------------
function ProgressBar({ percent, completed, total }) {
  const safePercent = Math.max(0, Math.min(100, isNaN(percent) ? 0 : percent));

  return (
    <section className="relative overflow-hidden rounded-xl border border-zinc-800 bg-[#0d0d11]/60 p-6 shadow-sm">
      <div className="relative z-10 mb-4 flex items-end justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.15em] font-bold text-zinc-500">
            Weighted Curriculum Completion
          </p>
          <p className="mt-1 text-xs text-zinc-400 font-medium">
            <span className="text-zinc-200 font-bold font-mono text-sm">{completed}</span> of {total} verified target nodes mapped
          </p>
        </div>

        <div className="rounded-md border border-zinc-800 bg-zinc-900 px-3 py-1 text-xs font-mono font-bold text-zinc-200 shadow-inner">
          {safePercent}%
        </div>
      </div>

      <div className="relative">
        <div className="relative h-3 w-full overflow-hidden rounded-full bg-zinc-950 border border-zinc-900">
          <motion.div
            className="relative h-full rounded-full bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-400 shadow-[0_0_15px_rgba(99,102,241,0.2)]"
            initial={{ width: 0 }}
            animate={{ width: `${safePercent}%` }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            {safePercent > 2 && (
              <div className="absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 translate-x-[20%]">
                <div className="absolute inset-[3px] rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,1)]" />
                <div className="absolute inset-0 rounded-full bg-white/40 blur-sm animate-tip-pulse" />
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// -----------------------------
// MATRIX HEATMAP GITHUB-STYLE
// -----------------------------
function ActivityMap({ dayStats }) {
  return (
    <section className="rounded-xl border border-zinc-800/60 bg-[#0d0d11]/60 p-6 space-y-5">
      <div className="flex items-center justify-between border-b border-zinc-800/60 pb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-zinc-900 border border-zinc-800 text-zinc-400 rounded-lg">
            <Trophy size={14} className="text-yellow-500/80" />
          </div>
          <h3 className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
            Consistency Matrix Logs
          </h3>
        </div>
        <span className="text-[10px] uppercase tracking-wider font-semibold text-zinc-500 bg-zinc-900/60 border border-zinc-800 px-2 py-1 rounded-md">90-Day Telemetry Matrix</span>
      </div>

      <div className="grid grid-cols-6 sm:grid-cols-10 md:grid-cols-14 lg:grid-cols-[repeat(18,minmax(0,1fr))] gap-2">
        {Array.from({ length: 90 }).map((_, i) => {
          const day = i + 1;
          const count = dayStats[day] || 0;

          const colorClass =
            count === 0 ? "bg-zinc-900/40 border-zinc-800/30 hover:bg-zinc-800/40"
          : count === 1 ? "bg-indigo-950/40 border-indigo-900/30"
          : count === 2 ? "bg-indigo-700/50 border-indigo-600/50"
          : "bg-indigo-500 border-indigo-400 shadow-[0_0_10px_rgba(99,102,241,0.15)]";

          return (
            <motion.div
              key={day}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.002, duration: 0.15 }}
              title={`Day ${day} Framework Node: ${count} verified items`}
              className={`
                group relative aspect-square rounded-[4px] border transition-all duration-150
                ${colorClass} hover:scale-110 hover:z-10 cursor-crosshair flex items-center justify-center
              `}
            >
              <span className="text-[8px] font-mono font-bold text-zinc-200 opacity-0 transition-opacity duration-150 group-hover:opacity-100 pointer-events-none">
                {day}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Legend layout box */}
      <div className="flex justify-end items-center gap-2 pt-2 text-[10px] font-medium uppercase tracking-wider text-zinc-500 select-none">
        <span>Less</span>
        <div className="flex gap-1.5 px-0.5">
          <div className="h-2.5 w-2.5 rounded-sm bg-zinc-900 border border-zinc-800/60" />
          <div className="h-2.5 w-2.5 rounded-sm bg-indigo-950/40 border border-indigo-900/40" />
          <div className="h-2.5 w-2.5 rounded-sm bg-indigo-700/50 border border-indigo-600/50" />
          <div className="h-2.5 w-2.5 rounded-sm bg-indigo-500 border border-indigo-400" />
        </div>
        <span>More</span>
      </div>
    </section>
  );
}

// -----------------------------
// STRUCTURAL METRIC COMPONENTS
// -----------------------------
function MiniStat({ icon, label, value, color, bg }) {
  return (
    <div className="group flex items-center gap-4 rounded-xl border border-zinc-800 bg-[#0d0d11]/40 p-4 transition-all duration-200 hover:bg-[#0d0d11]/80 hover:border-zinc-700/60">
      <div className={`flex h-10 w-10 items-center justify-center rounded-lg border ${bg} ${color} transition-transform duration-200 group-hover:scale-105`}>
        {icon}
      </div>

      <div className="flex flex-col min-w-0">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 truncate">
          {label}
        </span>
        <span className="text-base font-bold font-mono text-zinc-200 mt-0.5 tracking-tight">{value}</span>
      </div>
    </div>
  );
}