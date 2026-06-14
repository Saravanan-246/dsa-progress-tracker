import { useEffect, useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Circle, Trophy, CheckSquare, ChevronDown } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import { plan } from "../data/plan";

export default function Progress() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeDayNum, setActiveDayNum] = useState(null); // Fixed here
  const [days, setDays] = useState([]);
  const [expandedSections, setExpandedSections] = useState({});
  
  // ... rest of your code stays exactly the same
  // -----------------------------
  // LOAD & SYNC DATA STRUCTURES
  // -----------------------------
  const loadData = useCallback(() => {
    const updated = plan.map((day) => {
      const saved = JSON.parse(localStorage.getItem(`day-${day.day}`)) || [];
      const total = Object.values(day.sections || {}).reduce(
        (acc, sec) => acc + (sec?.length || 0), 
        0
      );
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

  // Derived state to always keep activeDay perfectly synced and fresh
  const activeDay = useMemo(() => {
    if (activeDayNum === null) return null;
    return days.find((d) => d.day === activeDayNum) || null;
  }, [days, activeDayNum]);

  // -----------------------------
  // ANALYTICS & AGGREGATIONS
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

  // -----------------------------
  // SMART INITIALIZATION FLOW
  // -----------------------------
  const handleOpenDay = (dayObj) => {
    let trackingIndex = 0;
    const initialVisibility = {};
    let foundFirstActive = false;

    Object.entries(dayObj.sections || {}).forEach(([sectionName, tasks]) => {
      if (!tasks || tasks.length === 0) return;

      const sectionTaskIndexes = Array.from({ length: tasks.length }, (_, i) => trackingIndex + i);
      const isSectionDone = sectionTaskIndexes.every(idx => dayObj.completed?.includes(idx));
      trackingIndex += tasks.length;

      if (!isSectionDone && !foundFirstActive) {
        initialVisibility[sectionName] = true;
        foundFirstActive = true;
      } else {
        initialVisibility[sectionName] = false;
      }
    });

    if (!foundFirstActive && Object.keys(dayObj.sections || {}).length > 0) {
      initialVisibility[Object.keys(dayObj.sections)[0]] = true;
    }

    setExpandedSections(initialVisibility);
    setActiveDayNum(dayObj.day);
  };

  const toggleSection = (sectionName) => {
    setExpandedSections(prev => ({ ...prev, [sectionName]: !prev[sectionName] }));
  };

  const toggleAllSections = (expand) => {
    if (!activeDay) return;
    const updated = {};
    Object.keys(activeDay.sections || {}).forEach(key => { updated[key] = expand; });
    setExpandedSections(updated);
  };

  const handleToggleTask = (dayNum, taskIndex) => {
    const key = `day-${dayNum}`;
    let saved = JSON.parse(localStorage.getItem(key)) || [];
    saved = saved.includes(taskIndex) ? saved.filter((idx) => idx !== taskIndex) : [...saved, taskIndex];
    localStorage.setItem(key, JSON.stringify(saved));
    window.dispatchEvent(new Event("local-update"));
  };

  const handleMarkAllDone = (dayObj) => {
    const key = `day-${dayObj.day}`;
    const saved = JSON.parse(localStorage.getItem(key)) || [];
    const newSaved = saved.length === dayObj.total ? [] : Array.from({ length: dayObj.total }, (_, i) => i);
    localStorage.setItem(key, JSON.stringify(newSaved));
    window.dispatchEvent(new Event("local-update"));
  };

  const handleCloseModal = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setActiveDayNum(null);
  };

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-200 antialiased selection:bg-indigo-500/20">
      <Navbar setOpen={setIsSidebarOpen} />
      <Sidebar open={isSidebarOpen} setOpen={setIsSidebarOpen} />

      <main className="pt-24 md:pl-64 px-4 sm:px-8 pb-16 transition-all duration-300">
        <div className="max-w-5xl mx-auto space-y-12">

          {/* HEADERS */}
          <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 pb-6 border-b border-white/[0.04]">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-1">Metrics Analytics</p>
              <h1 className="text-4xl font-bold tracking-tight text-white flex items-baseline gap-2">
                {stats.percent}% <span className="text-xs font-normal text-slate-400">overall metrics</span>
              </h1>
            </div>

            <div className="flex items-center gap-4 bg-white/[0.01] border border-white/[0.05] px-4 py-2.5 rounded-xl">
              <div className="text-right">
                <p className="text-[9px] uppercase font-bold tracking-wider text-slate-500">Completed tasks</p>
                <p className="text-lg font-bold text-slate-200 font-mono">{stats.solved}<span className="text-slate-600 text-xs font-normal"> / {stats.total}</span></p>
              </div>
              <div className="h-6 w-[1px] bg-white/10 mx-1" />
              <div className="p-2 bg-indigo-500/10 rounded-lg border border-indigo-500/20">
                <Trophy className="text-indigo-400" size={16} />
              </div>
            </div>
          </header>

          {/* DYNAMIC HEATMAP METRIC GRID */}
          <section className="space-y-4 bg-white/[0.005] border border-white/[0.03] p-5 rounded-xl">
            <div className="flex justify-between items-center text-xs text-slate-400 font-medium">
              <span className="text-slate-400 font-medium text-[11px] uppercase tracking-wider">Consistency Matrix</span>
              <div className="flex items-center gap-2 bg-white/[0.02] px-2.5 py-1 rounded-md border border-white/[0.04] text-[10px]">
                <span className="text-slate-500">Less</span>
                <div className="flex gap-1 items-center">
                  <div className="w-2.5 h-2.5 bg-white/5 rounded-sm" />
                  <div className="w-2.5 h-2.5 bg-indigo-950/60 rounded-sm" />
                  <div className="w-2.5 h-2.5 bg-indigo-700/70 rounded-sm" />
                  <div className="w-2.5 h-2.5 bg-indigo-400 rounded-sm" />
                </div>
                <span className="text-slate-500">More</span>
              </div>
            </div>

            <div className="grid grid-cols-7 sm:grid-cols-10 md:grid-cols-14 lg:grid-cols-15 gap-2 pt-1">
              {days.map((d, i) => (
                <motion.button
                  key={d.day}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ease: [0.16, 1, 0.3, 1], delay: i * 0.006 }}
                  onClick={() => handleOpenDay(d)}
                  className={`
                    relative aspect-square rounded-md font-mono text-[11px] font-semibold
                    flex items-center justify-center transition-all duration-200
                    hover:scale-105 active:scale-95 border
                    ${d.intensity === 3 ? "bg-indigo-400 text-slate-950 border-indigo-300 font-bold" :
                      d.intensity === 2 ? "bg-indigo-600 text-white border-indigo-500" :
                      d.intensity === 1 ? "bg-indigo-950/60 text-indigo-300 border-indigo-900/40" :
                      "bg-white/[0.02] text-slate-500 border-white/[0.01] hover:bg-white/[0.05] hover:text-slate-300"}
                  `}
                >
                  {d.day}
                </motion.button>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* MODAL WINDOW DIALOG */}
      <AnimatePresence>
        {activeDay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50 px-4"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="bg-[#0B0E14] border border-white/[0.06] rounded-xl w-full max-w-md flex flex-col max-h-[80vh] shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* HEADER CONTAINER */}
              <div className="flex justify-between items-center px-5 py-4 border-b border-white/[0.05]">
                <div>
                  <h3 className="font-semibold text-white tracking-tight text-sm">
                    Day {activeDay.day} Status
                  </h3>
                  <p className="text-[11px] text-slate-500 truncate max-w-[170px] mt-0.5">{activeDay.title || 'Track Details'}</p>
                </div>
                
                <div className="flex items-center gap-2">
                  <button 
                    type="button"
                    onClick={() => handleMarkAllDone(activeDay)}
                    className="flex items-center gap-1 text-[11px] font-semibold text-indigo-400 bg-indigo-500/[0.06] border border-indigo-500/15 px-2.5 py-1.5 rounded-lg hover:bg-indigo-500/15 transition active:scale-95"
                  >
                    <CheckSquare size={12} />
                    {activeDay.completed?.length === activeDay.total ? "Clear All" : "Mark All Done"}
                  </button>

                  <button 
                    type="button"
                    onClick={handleCloseModal} 
                    className="p-1.5 text-slate-500 hover:text-slate-200 hover:bg-white/[0.04] rounded-lg transition active:scale-90"
                  >
                    <X size={15} />
                  </button>
                </div>
              </div>

              {/* ACTION ROW UTILITIES */}
              <div className="flex justify-between items-center px-5 py-2.5 bg-white/[0.005] border-b border-white/[0.03] text-[9px] font-bold tracking-wider text-slate-500 uppercase select-none">
                <span>Task Groups</span>
                <div className="flex gap-2.5 normal-case tracking-normal text-[11px] font-medium text-slate-400">
                  <button type="button" onClick={() => toggleAllSections(true)} className="hover:text-indigo-400 transition">Expand all</button>
                  <span className="text-white/5 font-normal">/</span>
                  <button type="button" onClick={() => toggleAllSections(false)} className="hover:text-indigo-400 transition">Collapse all</button>
                </div>
              </div>

              {/* SECTION TREE CONTAINER */}
              <div className="p-4 space-y-3 overflow-y-auto flex-1 custom-scrollbar">
                {(() => {
                  let runningIndex = 0;
                  return Object.entries(activeDay.sections || {}).map(([sectionName, tasks]) => {
                    if (!tasks || tasks.length === 0) return null;

                    const isOpen = !!expandedSections[sectionName];
                    const currentSectionTasks = tasks.map(task => ({
                      label: typeof task === "string" ? task : task.label, 
                      idx: runningIndex++
                    }));

                    const doneCount = currentSectionTasks.filter(t => activeDay.completed?.includes(t.idx)).length;
                    const isSectionComplete = doneCount === tasks.length;

                    return (
                      <div key={sectionName} className="border border-white/[0.03] rounded-lg overflow-hidden bg-white/[0.002]">
                        
                        {/* ACCORDION TRIGGER */}
                        <div
                          onClick={() => toggleSection(sectionName)}
                          className="flex justify-between items-center px-3.5 py-2.5 bg-white/[0.01] hover:bg-white/[0.02] cursor-pointer transition select-none"
                        >
                          <div className="flex items-center gap-2">
                            <h4 className={`text-[11px] font-bold tracking-wider uppercase transition-colors ${isSectionComplete ? "text-emerald-400/90" : "text-slate-300"}`}>
                              {sectionName}
                            </h4>
                            <span className={`text-[9px] font-mono font-bold px-1 rounded ${isSectionComplete ? "bg-emerald-500/5 text-emerald-400/80" : "bg-white/5 text-slate-500"}`}>
                              {doneCount}/{tasks.length}
                            </span>
                          </div>

                          <ChevronDown 
                            size={13} 
                            className={`text-slate-500 transition-transform duration-200 ${isOpen ? "rotate-180 text-slate-300" : ""}`} 
                          />
                        </div>

                        {/* TASKS DRAWER EXPANSION */}
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.15, ease: "easeInOut" }}
                              className="overflow-hidden bg-[#090B0F]"
                            >
                              <div className="p-1 border-t border-white/[0.02] space-y-0.5">
                                {currentSectionTasks.map((task) => {
                                  const isDone = activeDay.completed?.includes(task.idx);

                                  return (
                                    <div
                                      key={task.idx}
                                      onClick={() => handleToggleTask(activeDay.day, task.idx)}
                                      className={`
                                        flex items-center gap-2.5 p-2 rounded-md cursor-pointer transition-colors duration-150 group
                                        ${isDone ? "bg-indigo-500/[0.01]" : "hover:bg-white/[0.01]"}
                                      `}
                                    >
                                      {isDone ? (
                                        <CheckCircle2 size={14} className="text-indigo-400 shrink-0" />
                                      ) : (
                                        <Circle size={14} className="text-slate-700 group-hover:text-slate-500 shrink-0 transition-colors" />
                                      )}

                                      <span className={`
                                        text-xs font-normal tracking-wide transition-all
                                        ${isDone ? "line-through text-slate-600" : "text-slate-300 group-hover:text-white"}
                                      `}>
                                        {task.label}
                                      </span>
                                    </div>
                                  );
                                })}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                      </div>
                    );
                  });
                })()}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.03); border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.08); }
      `}</style>
    </div>
  );
}