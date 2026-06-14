import { useEffect, useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import { plan } from "../data/plan";
import { Activity, CheckCircle2, Clock, ChevronDown, Sparkles, AlertTriangle } from "lucide-react";

// --- SAFE STORAGE UTILITY ---
// If someone corrupts the local storage string, this stops the React app from crashing.
const getSafeStorage = (key) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : [];
  } catch (error) {
    console.warn(`[SafeStorage] Corrupted data found for ${key}. Resetting to empty.`, error);
    return [];
  }
};

export default function Dashboard() {
  const [open, setOpen] = useState(false);
  const [stats, setStats] = useState({ total: 0, completed: 0, daysDone: 0 });
  const [openPhase, setOpenPhase] = useState({ p1: true });
  const [dataError, setDataError] = useState(false);

  // Fallback if someone deletes the plan array completely
  const phases = useMemo(() => ({ p1: Array.isArray(plan) ? plan : [] }), []);

  // -----------------------------
  // FAIL-SAFE CALCULATION LOGIC
  // -----------------------------
  const calculate = useCallback(() => {
    try {
      let totalTasksAccumulator = 0;
      let completedTasksAccumulator = 0;
      let completedDaysCounter = 0;

      if (!Array.isArray(plan)) {
        setDataError(true);
        return;
      }

      plan.forEach((day) => {
        if (!day || typeof day !== 'object') return; // Skip broken objects

        const savedTaskIndexes = getSafeStorage(`day-${day.day || 'unknown'}`);
        
        // Safely extract total tasks even if 'sections' is missing or undefined
        const explicitTotalTasks = Object.values(day.sections || {}).reduce(
          (acc, currentSectionArray) => acc + (Array.isArray(currentSectionArray) ? currentSectionArray.length : 0), 
          0
        );

        totalTasksAccumulator += explicitTotalTasks;
        completedTasksAccumulator += savedTaskIndexes.length;

        if (savedTaskIndexes.length >= explicitTotalTasks && explicitTotalTasks > 0) {
          completedDaysCounter++;
        }
      });

      setStats({ 
        total: totalTasksAccumulator, 
        completed: completedTasksAccumulator, 
        daysDone: completedDaysCounter 
      });
      setDataError(false);
    } catch (err) {
      console.error("[Dashboard Engine] Calculation failed:", err);
      setDataError(true);
    }
  }, []);

  useEffect(() => {
    calculate();
    window.addEventListener("local-update", calculate);
    window.addEventListener("storage", calculate);

    return () => {
      window.removeEventListener("local-update", calculate);
      window.removeEventListener("storage", calculate);
    };
  }, [calculate]);

  const overallPercentage = useMemo(() => {
    return stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;
  }, [stats.completed, stats.total]);

  const togglePhase = (key) => {
    setOpenPhase((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="bg-[#07090E] text-slate-200 min-h-screen antialiased selection:bg-indigo-500/20">
      <Navbar setOpen={setOpen} />
      <Sidebar open={open} setOpen={setOpen} />

      <main className="pt-24 md:pl-60 px-4 md:px-8 pb-16 transition-all duration-300">
        <div className="max-w-6xl mx-auto space-y-10">

          {/* ERROR BANNER (Only shows if someone breaks plan.js) */}
          {dataError && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl flex items-center gap-3 text-sm">
              <AlertTriangle size={18} />
              <p><strong>Warning:</strong> The data schema in <code>plan.js</code> appears to be corrupted. Please ensure it exports a valid array of days.</p>
            </div>
          )}

          {/* HEADER */}
          <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-white/[0.04]">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-2">
                Dashboard
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                Track and manage your comprehensive 30-day placement preparation pipeline
              </p>
            </div>
            <div className="flex items-center gap-1.5 bg-indigo-500/[0.04] border border-indigo-500/20 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wide uppercase text-indigo-400">
              <Sparkles size={12} className="animate-pulse" />
              <span>Live Synced Workspace</span>
            </div>
          </header>

          {/* METRIC CARDS */}
          <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatCard icon={<Activity size={16} />} label="Tasks Solved" value={stats.completed} max={stats.total} color="text-indigo-400" bg="bg-indigo-500/[0.02]" border="border-indigo-500/10" />
            <StatCard icon={<CheckCircle2 size={16} />} label="Milestone Days Done" value={stats.daysDone} max={phases.p1.length} color="text-emerald-400" bg="bg-emerald-500/[0.02]" border="border-emerald-500/10" />
            <StatCard icon={<Clock size={16} />} label="Remaining Days" value={Math.max(0, phases.p1.length - stats.daysDone)} color="text-amber-400" bg="bg-amber-500/[0.02]" border="border-amber-500/10" />
          </section>

          {/* LINEAR PROGRESS */}
          <section className="bg-gradient-to-b from-white/[0.01] to-transparent border border-white/[0.05] rounded-xl p-5 backdrop-blur-md">
            <div className="flex justify-between items-baseline mb-2.5">
              <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400">Aggregated Pipeline Progress</span>
              <span className="text-xl font-bold font-mono text-white">{overallPercentage}%</span>
            </div>

            <div className="h-2.5 bg-white/[0.06] rounded-full overflow-hidden relative border border-white/[0.02]">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 via-blue-500 to-sky-400 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${overallPercentage}%` }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              />
              <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent_25%,rgba(255,255,255,0.15)_50%,transparent_75%)] bg-[length:250%_100%] animate-shimmer pointer-events-none" />
            </div>
          </section>

          {/* TIMELINE ACCORDIONS */}
          <section className="space-y-4">
            {[
              { key: "p1", title: "Placement Preparation Timeline", sub: "Day 1 to Day 30 Comprehensive Guide" },
            ].map((phase) => {
              const isCollapsed = !openPhase[phase.key];

              return (
                <div key={phase.key} className="space-y-4">
                  <div
                    onClick={() => togglePhase(phase.key)}
                    className="group cursor-pointer flex justify-between items-center bg-white/[0.01] hover:bg-white/[0.03] border border-white/[0.05] hover:border-white/[0.08] rounded-xl px-5 py-3.5 transition-all duration-200 select-none"
                  >
                    <div>
                      <h2 className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">
                        {phase.title}
                      </h2>
                      <p className="text-[11px] text-slate-500 mt-0.5">{phase.sub}</p>
                    </div>

                    <div className="flex items-center gap-3 text-xs font-medium text-slate-400 bg-white/[0.02] border border-white/[0.04] px-3 py-1.5 rounded-lg transition-colors group-hover:bg-white/[0.04]">
                      <span>{isCollapsed ? "Expand View" : "Collapse View"}</span>
                      <ChevronDown
                        size={14}
                        className={`text-slate-400 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${!isCollapsed ? "rotate-180 text-white" : ""}`}
                      />
                    </div>
                  </div>

                  <AnimatePresence initial={false}>
                    {!isCollapsed && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5 pt-1 pb-2">
                          {phases[phase.key].map((day, idx) => (
                            <DayCard key={day?.day || idx} day={day} />
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </section>

        </div>
      </main>

      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .animate-shimmer {
          animation: shimmer 6s infinite linear;
        }
      `}</style>
    </div>
  );
}

// -----------------------------
// SECURE DAY CARD LAYER
// -----------------------------
function DayCard({ day }) {
  if (!day) return null; // Defensive check

  const savedTaskIndexes = getSafeStorage(`day-${day.day || 'unknown'}`);
  const completedCount = savedTaskIndexes.length;
  
  const explicitTotalTasks = useMemo(() => {
    return Object.values(day.sections || {}).reduce(
      (acc, currentSectionArray) => acc + (Array.isArray(currentSectionArray) ? currentSectionArray.length : 0), 
      0
    );
  }, [day.sections]);

  const percentageSolved = explicitTotalTasks ? Math.round((completedCount / explicitTotalTasks) * 100) : 0;
  const isFullyComplete = explicitTotalTasks > 0 && completedCount >= explicitTotalTasks;

  return (
    <div className={`
      group border rounded-xl p-4 transition-all duration-300 bg-white/[0.005] hover:bg-white/[0.015]
      ${isFullyComplete ? "border-emerald-500/20 shadow-lg shadow-emerald-500/[0.01]" : "border-white/[0.04] hover:border-white/[0.1]"}
    `}>
      <div className="flex justify-between items-center mb-2.5">
        <span className="text-[10px] font-mono font-bold tracking-wider text-slate-500 uppercase">
          Day {day.day || 'N/A'}
        </span>
        <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${isFullyComplete ? "bg-emerald-500/10 text-emerald-400" : "bg-white/5 text-slate-400"}`}>
          {percentageSolved > 100 ? 100 : percentageSolved}%
        </span>
      </div>

      <h3 className="text-xs font-semibold text-slate-300 group-hover:text-white line-clamp-1 mb-4 transition-colors">
        {day.title || 'Untitled Phase'}
      </h3>

      <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden mb-3 border border-white/[0.01]">
        <motion.div
          className={`h-full rounded-full ${isFullyComplete ? "bg-emerald-400" : "bg-indigo-500"}`}
          initial={{ width: 0 }}
          animate={{ width: `${percentageSolved > 100 ? 100 : percentageSolved}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>

      <div className="text-[10px] font-medium text-slate-500 flex justify-between items-center">
        <span className="font-mono">{completedCount} <span className="text-slate-600">/</span> {explicitTotalTasks} tasks</span>
        <span className={`font-semibold tracking-wide transition-colors ${isFullyComplete ? "text-emerald-400/90" : "text-slate-500 group-hover:text-slate-400"}`}>
          {isFullyComplete ? "Verified" : "Active"}
        </span>
      </div>
    </div>
  );
}

// -----------------------------
// SECURE METRIC CARD
// -----------------------------
function StatCard({ icon, label, value, max, color, bg, border }) {
  return (
    <div className={`border ${border} ${bg} rounded-xl p-4 flex items-center gap-3.5 backdrop-blur-md transition-all duration-300 hover:bg-white/[0.015]`}>
      <div className={`${color} p-2 bg-white/[0.02] border border-white/[0.04] rounded-lg shadow-sm`}>
        {icon}
      </div>
      <div>
        <p className="text-[10px] uppercase font-bold tracking-wider text-slate-500">{label}</p>
        <p className="text-lg font-bold text-white font-mono mt-0.5">
          {isNaN(value) ? 0 : value}
          {max !== undefined && <span className="text-slate-600 text-xs font-normal font-sans"> / {isNaN(max) ? 0 : max}</span>}
        </p>
      </div>
    </div>
  );
}