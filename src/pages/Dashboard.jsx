import { useEffect, useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import { plan } from "../data/plan";
import { Activity, CheckCircle2, Clock, Sparkles } from "lucide-react";

// --- SAFE STORAGE UTILITY ---
const getSafeStorage = (key) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : [];
  } catch (error) {
    return [];
  }
};

export default function Dashboard() {
  const [open, setOpen] = useState(false);
  const [stats, setStats] = useState({ total: 0, completed: 0, daysDone: 0 });
  const [dataError, setDataError] = useState(false);

  const phases = useMemo(() => ({ p1: Array.isArray(plan) ? plan : [] }), []);

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
        if (!day || typeof day !== 'object') return;
        const savedTaskIndexes = getSafeStorage(`day-${day.day || 'unknown'}`);
        const explicitTotalTasks = Object.values(day.sections || {}).reduce(
          (acc, curr) => acc + (Array.isArray(curr) ? curr.length : 0), 0
        );

        totalTasksAccumulator += explicitTotalTasks;
        completedTasksAccumulator += savedTaskIndexes.length;
        if (savedTaskIndexes.length >= explicitTotalTasks && explicitTotalTasks > 0) {
          completedDaysCounter++;
        }
      });

      setStats({ total: totalTasksAccumulator, completed: completedTasksAccumulator, daysDone: completedDaysCounter });
      setDataError(false);
    } catch (err) {
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

  return (
    <div className="bg-[#030407] text-slate-300 min-h-screen selection:bg-indigo-500/30 font-sans overflow-x-hidden">
      {/* Visual Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full" />
        <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] bg-blue-600/5 blur-[100px] rounded-full" />
      </div>

      <Navbar setOpen={setOpen} />
      <Sidebar open={open} setOpen={setOpen} />

      <main className="pt-28 md:pl-64 px-6 md:px-10 pb-20 relative z-10">
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* HEADER SECTION */}
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-bold uppercase tracking-widest">
                <Sparkles size={12} />
                Learning Management System
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                Skill <span className="text-indigo-500">Pipeline.</span>
              </h1>
              <p className="text-slate-400 max-w-md text-sm leading-relaxed">
                Your structured path to placement readiness. Tracking 30 days of intensive technical prep.
              </p>
            </div>

            <div className="hidden lg:flex flex-col items-end">
                <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">System Health</span>
                <div className="flex items-center gap-2 text-xs font-medium text-emerald-400 bg-emerald-400/5 border border-emerald-400/10 px-3 py-1.5 rounded-lg">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Data Engine Operational
                </div>
            </div>
          </header>

          {/* STATS GRID */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard icon={<Activity />} label="Completed Tasks" value={stats.completed} max={stats.total} trend="Total Progress" />
            <StatCard icon={<CheckCircle2 />} label="Days Mastered" value={stats.daysDone} max={phases.p1.length} trend="Daily Streaks" />
            <StatCard icon={<Clock />} label="Days Remaining" value={Math.max(0, phases.p1.length - stats.daysDone)} trend="Estimated Finish" />
          </section>

          {/* MAIN PROGRESS CARD */}
          <section className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-1000" />
            <div className="relative bg-[#0B0F17] border border-white/[0.08] rounded-2xl p-8 backdrop-blur-xl">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
                    <div className="space-y-1 text-center md:text-left">
                        <h3 className="text-white font-bold text-lg">Overall Completion</h3>
                        <p className="text-slate-500 text-xs">Weighted progress across all technical modules</p>
                    </div>
                    <div className="text-5xl font-black text-white font-mono tracking-tighter">
                        {overallPercentage}<span className="text-indigo-500 text-2xl">%</span>
                    </div>
                </div>

                <div className="relative h-4 bg-white/[0.03] rounded-full overflow-hidden border border-white/[0.05]">
                    <motion.div
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-indigo-600 via-blue-500 to-cyan-400 shadow-[0_0_20px_rgba(79,70,229,0.4)]"
                        initial={{ width: 0 }}
                        animate={{ width: `${overallPercentage}%` }}
                        transition={{ duration: 1.2, ease: "circOut" }}
                    />
                </div>
                
                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-white/[0.05]">
                    <MiniMetric label="Efficiency" value="94%" />
                    <MiniMetric label="Accuracy" value="88%" />
                    <MiniMetric label="Velocity" value="2.4/day" />
                    <MiniMetric label="Status" value="Ahead" highlight />
                </div>
            </div>
          </section>

          {/* TIMELINE SECTION */}
          <section className="space-y-6">
            <div className="flex items-center gap-4">
                <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500 whitespace-nowrap">Timeline Curriculum</h2>
                <div className="h-px w-full bg-white/[0.05]" />
            </div>

            {phases.p1.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {phases.p1.map((day, idx) => (
                        <DayCard key={day?.day || idx} day={day} />
                    ))}
                </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

function StatCard({ icon, label, value, max, trend }) {
  return (
    <div className="group bg-[#0B0F17] border border-white/[0.06] hover:border-indigo-500/30 p-6 rounded-2xl transition-all duration-300 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2.5 bg-indigo-500/5 rounded-xl border border-indigo-500/10 text-indigo-400 group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <div className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">{trend}</div>
      </div>
      <div>
        <p className="text-xs font-semibold text-slate-500 mb-1">{label}</p>
        <h4 className="text-3xl font-bold text-white font-mono">
          {value}
          <span className="text-sm text-slate-600 font-sans ml-1.5 font-medium">/ {max}</span>
        </h4>
      </div>
    </div>
  );
}

function DayCard({ day }) {
  if (!day) return null;
  const savedTaskIndexes = getSafeStorage(`day-${day.day || 'unknown'}`);
  const completedCount = savedTaskIndexes.length;
  
  const totalTasks = useMemo(() => {
    return Object.values(day.sections || {}).reduce((acc, curr) => acc + (Array.isArray(curr) ? curr.length : 0), 0);
  }, [day.sections]);

  const percentage = totalTasks ? Math.min(Math.round((completedCount / totalTasks) * 100), 100) : 0;
  const isDone = totalTasks > 0 && completedCount >= totalTasks;

  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className={`relative group p-5 rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden
        ${isDone ? "bg-emerald-500/[0.02] border-emerald-500/20" : "bg-white/[0.01] border-white/[0.06] hover:border-white/[0.15]"}
      `}
    >
      <div className="flex justify-between items-center mb-4">
        <div className={`text-[10px] font-black font-mono px-2 py-0.5 rounded ${isDone ? "bg-emerald-500/10 text-emerald-400" : "bg-white/5 text-slate-400"}`}>
            DAY {day.day}
        </div>
      </div>

      <h3 className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors mb-4 line-clamp-1">
        {day.title}
      </h3>

      <div className="space-y-2">
        <div className="flex justify-between text-[10px] font-bold">
            <span className="text-slate-500">{completedCount}/{totalTasks} TASKS</span>
            <span className={isDone ? "text-emerald-400" : "text-indigo-400"}>{percentage}%</span>
        </div>
        <div className="h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
            <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                className={`h-full ${isDone ? "bg-emerald-500" : "bg-indigo-500"}`}
            />
        </div>
      </div>
    </motion.div>
  );
}

function MiniMetric({ label, value, highlight }) {
    return (
        <div className="text-center md:text-left">
            <p className="text-[9px] uppercase tracking-[0.15em] font-bold text-slate-600 mb-1">{label}</p>
            <p className={`text-sm font-bold ${highlight ? "text-indigo-400" : "text-slate-300"}`}>{value}</p>
        </div>
    );
}