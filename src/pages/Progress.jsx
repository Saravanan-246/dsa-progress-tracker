import { useEffect, useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Circle, Trophy } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import { plan } from "../data/plan";

export default function Progress() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeDay, setActiveDay] = useState(null);
  const [days, setDays] = useState([]);

  // -----------------------------
  // LOAD DATA
  // -----------------------------
  const loadData = useCallback(() => {
    const updated = plan.map((day) => {
      const saved = JSON.parse(localStorage.getItem(`day-${day.day}`)) || [];
      const total = day.tasks.length;
      const percent = total ? saved.length / total : 0;

      return {
        ...day,
        completed: saved,
        total,
        intensity:
          percent === 1 ? 3 :
          percent > 0.5 ? 2 :
          percent > 0 ? 1 : 0,
      };
    });

    setDays(updated);
  }, []);

  useEffect(() => {
    loadData();
    window.addEventListener("local-update", loadData);
    return () => window.removeEventListener("local-update", loadData);
  }, [loadData]);

  // -----------------------------
  // STATS
  // -----------------------------
  const stats = useMemo(() => {
    const solved = days.reduce((a, d) => a + (d.completed?.length || 0), 0);
    const total = days.reduce((a, d) => a + d.total, 0);

    return {
      percent: total ? Math.round((solved / total) * 100) : 0,
      solved,
      total,
    };
  }, [days]);

  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white">
      <Navbar setOpen={setIsSidebarOpen} />
      <Sidebar open={isSidebarOpen} setOpen={setIsSidebarOpen} />

      <main className="pt-20 md:pl-64 px-6 pb-16">
        <div className="max-w-5xl mx-auto space-y-10">

          {/* HEADER */}
          <header className="flex justify-between items-center">
            <div>
              <p className="text-sm text-white/40">Progress Overview</p>
              <h1 className="text-4xl font-semibold">
                {stats.percent}%
              </h1>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-xs text-white/40">Completed</p>
                <p className="text-lg font-semibold">{stats.solved}</p>
              </div>

              <div className="h-10 w-[1px] bg-white/10" />

              <div className="p-3 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
                <Trophy className="text-indigo-400" size={20} />
              </div>
            </div>
          </header>

          {/* HEATMAP */}
          <section className="space-y-4">

            {/* LEGEND */}
            <div className="flex justify-between items-center text-xs text-white/40">
              <span>Activity</span>

              <div className="flex items-center gap-2">
                <span>Less</span>
                <div className="flex gap-1">
                  <div className="w-3 h-3 bg-white/10 rounded" />
                  <div className="w-3 h-3 bg-indigo-900 rounded" />
                  <div className="w-3 h-3 bg-indigo-500 rounded" />
                  <div className="w-3 h-3 bg-indigo-300 rounded" />
                </div>
                <span>More</span>
              </div>
            </div>

            {/* GRID */}
            <div className="grid grid-cols-7 sm:grid-cols-10 md:grid-cols-14 lg:grid-cols-15 gap-2">
              {days.map((d, i) => (
                <motion.button
                  key={d.day}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.01 }}
                  onClick={() => setActiveDay(d)}
                  className={`
                    relative aspect-square rounded-md transition-all duration-200
                    flex items-center justify-center text-[10px] font-medium
                    hover:scale-110

                    ${d.intensity === 3 ? "bg-indigo-300 text-black" :
                      d.intensity === 2 ? "bg-indigo-500 text-white" :
                      d.intensity === 1 ? "bg-indigo-900 text-white" :
                      "bg-white/10 text-white/40"}
                  `}
                >
                  {d.day}
                </motion.button>
              ))}
            </div>

          </section>
        </div>
      </main>

      {/* MODAL */}
      <AnimatePresence>
        {activeDay && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black/80"
            onClick={() => setActiveDay(null)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-[#0F141F] border border-white/10 rounded-xl w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between px-5 py-4 border-b border-white/10">
                <h3 className="font-semibold">Day {activeDay.day}</h3>
                <button onClick={() => setActiveDay(null)}>
                  <X size={18} />
                </button>
              </div>

              <div className="p-4 space-y-2 max-h-[60vh] overflow-y-auto">
                {activeDay.tasks.map((task, i) => {
                  const done = activeDay.completed.includes(i);

                  return (
                    <div
                      key={i}
                      onClick={() => {
                        const key = `day-${activeDay.day}`;
                        let saved = JSON.parse(localStorage.getItem(key)) || [];

                        saved = done
                          ? saved.filter(idx => idx !== i)
                          : [...saved, i];

                        localStorage.setItem(key, JSON.stringify(saved));
                        window.dispatchEvent(new Event("local-update"));
                        setActiveDay({ ...activeDay, completed: saved });
                      }}
                      className={`
                        flex items-center gap-3 p-3 rounded-lg cursor-pointer
                        ${done ? "bg-indigo-500/10" : "hover:bg-white/5"}
                      `}
                    >
                      {done ? (
                        <CheckCircle2 size={18} className="text-indigo-400" />
                      ) : (
                        <Circle size={18} className="text-white/30" />
                      )}

                      <span className={`
                        text-sm
                        ${done ? "line-through text-white/30" : "text-white/80"}
                      `}>
                        {typeof task === "string" ? task : task.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}