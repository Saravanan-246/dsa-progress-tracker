import { useEffect, useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Circle, Trophy, CheckSquare, ChevronDown, SlidersHorizontal, Eye, EyeOff } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import { plan } from "../data/plan";

export default function Progress() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeDayNum, setActiveDayNum] = useState(null);
  const [days, setDays] = useState([]);
  const [expandedSections, setExpandedSections] = useState({});

  // -----------------------------
  // DATA ENGINE MATRIX PIPELINE
  // -----------------------------
  const loadData = useCallback(() => {
    const updated = (Array.isArray(plan) ? plan : []).map((day) => {
      let saved = [];
      try {
        const item = localStorage.getItem(`day-${day.day}`);
        saved = item ? JSON.parse(item) : [];
      } catch {
        saved = [];
      }

      const total = Object.values(day.sections || {}).reduce(
        (acc, sec) => acc + (Array.isArray(sec) ? sec.length : 0), 
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
    window.addEventListener("storage", loadData);
    return () => {
      window.removeEventListener("local-update", loadData);
      window.removeEventListener("storage", loadData);
    };
  }, [loadData]);

  const activeDay = useMemo(() => {
    if (activeDayNum === null) return null;
    return days.find((d) => d.day === activeDayNum) || null;
  }, [days, activeDayNum]);

  const stats = useMemo(() => {
    const solved = days.reduce((a, d) => a + (Array.isArray(d.completed) ? d.completed.length : 0), 0);
    const total = days.reduce((a, d) => a + (d.total || 0), 0);

    return {
      percent: total ? Math.round((solved / total) * 100) : 0,
      solved,
      total,
    };
  }, [days]);

  // -----------------------------
  // INTERACTION FLOW CONTROLLERS
  // -----------------------------
  const handleOpenDay = (dayObj) => {
    let trackingIndex = 0;
    const initialVisibility = {};
    let foundFirstActive = false;

    Object.entries(dayObj.sections || {}).forEach(([sectionName, tasks]) => {
      if (!Array.isArray(tasks) || tasks.length === 0) return;

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
    let saved = [];
    try {
      const item = localStorage.getItem(key);
      saved = item ? JSON.parse(item) : [];
    } catch {
      saved = [];
    }
    saved = saved.includes(taskIndex) ? saved.filter((idx) => idx !== taskIndex) : [...saved, taskIndex];
    localStorage.setItem(key, JSON.stringify(saved));
    window.dispatchEvent(new Event("local-update"));
  };

  const handleMarkAllDone = (dayObj) => {
    const key = `day-${dayObj.day}`;
    let saved = [];
    try {
      const item = localStorage.getItem(key);
      saved = item ? JSON.parse(item) : [];
    } catch {
      saved = [];
    }
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
    <div className="min-h-screen bg-[#09090b] text-zinc-400 font-sans antialiased selection:bg-zinc-800">
      {/* Structural Minimalist Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f23_1px,transparent_1px),linear-gradient(to_bottom,#1f1f23_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-[0.2] pointer-events-none" />

      <Navbar setOpen={setIsSidebarOpen} />
      <Sidebar open={isSidebarOpen} setOpen={setIsSidebarOpen} />

      <main className="pt-24 md:pl-64 px-6 lg:px-12 pb-24 relative z-10 max-w-[1400px] mx-auto">
        <div className="space-y-10">

          {/* SYSTEM HEADER BANNER */}
          <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 pb-6 border-b border-zinc-800/60">
            <div>
              <div className="flex items-center gap-2 text-xs font-medium text-zinc-500 mb-1">
                <span>Metrics Analytics Console</span>
                <span className="text-zinc-700">/</span>
                <span className="text-zinc-400 font-mono">Telemetry</span>
              </div>
              <h1 className="text-2xl font-semibold tracking-tight text-zinc-100 flex items-baseline gap-2">
                {stats.percent}<span className="text-zinc-500 text-sm font-light font-sans"> % Weighted Core Progress</span>
              </h1>
            </div>

            <div className="flex items-center gap-3.5 bg-[#0d0d11] border border-zinc-800/80 px-4 py-3 rounded-xl shadow-sm">
              <div className="text-left">
                <p className="text-[10px] uppercase font-bold tracking-wider text-zinc-500">Pipeline Solved</p>
                <p className="text-base font-bold text-zinc-200 font-mono mt-0.5">
                  {stats.solved}<span className="text-zinc-600 text-xs font-normal font-sans"> / {stats.total} units</span>
                </p>
              </div>
              <div className="h-7 w-[1px] bg-zinc-800/80" />
              <div className="p-2 bg-zinc-900 border border-zinc-800 text-zinc-400 rounded-lg">
                <Trophy size={14} className="text-yellow-500/80" />
              </div>
            </div>
          </header>

          {/* CORE HEATMAP MATRIX GRID */}
          <section className="space-y-4 bg-[#0d0d11]/60 border border-zinc-800/60 p-6 rounded-xl relative overflow-hidden">
            <div className="flex justify-between items-center text-xs">
              <span className="text-zinc-400 font-medium text-[11px] uppercase tracking-wider">Consistency Matrix</span>
              <div className="flex items-center gap-2 bg-zinc-900 px-2.5 py-1 rounded-md border border-zinc-800 text-[10px] text-zinc-500">
                <span>Less</span>
                <div className="flex gap-1 items-center px-1">
                  <div className="w-2.5 h-2.5 bg-zinc-900 border border-zinc-800/60 rounded-sm" />
                  <div className="w-2.5 h-2.5 bg-indigo-950/40 border border-indigo-900/40 rounded-sm" />
                  <div className="w-2.5 h-2.5 bg-indigo-700/50 border border-indigo-600/50 rounded-sm" />
                  <div className="w-2.5 h-2.5 bg-indigo-500 border border-indigo-400 rounded-sm" />
                </div>
                <span>More</span>
              </div>
            </div>

            <div className="grid grid-cols-6 sm:grid-cols-10 md:grid-cols-14 lg:grid-cols-15 gap-2.5 pt-2">
              {days.map((d, i) => (
                <motion.button
                  key={d.day}
                  initial={{ opacity: 0, y: 3 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ease: "easeOut", duration: 0.2, delay: i * 0.005 }}
                  onClick={() => handleOpenDay(d)}
                  className={`
                    relative aspect-square rounded-md font-mono text-[11px] font-semibold
                    flex items-center justify-center transition-all duration-150 border
                    hover:scale-[1.03] active:scale-95 shadow-sm
                    ${d.intensity === 3 ? "bg-indigo-500 text-white border-indigo-400 font-bold shadow-[0_0_12px_rgba(99,102,241,0.15)]" :
                      d.intensity === 2 ? "bg-indigo-700/60 text-indigo-100 border-indigo-600/60" :
                      d.intensity === 1 ? "bg-indigo-950/40 text-indigo-300/90 border-indigo-900/40" :
                      "bg-zinc-900/40 text-zinc-500 border-zinc-800/40 hover:bg-zinc-800/60 hover:text-zinc-300"}
                  `}
                >
                  {d.day}
                </motion.button>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* DETAILED MODAL LAYER */}
      <AnimatePresence>
        {activeDay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 px-4"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ scale: 0.98, opacity: 0, y: 8 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.98, opacity: 0, y: 8 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#0d0d11] border border-zinc-800 rounded-xl w-full max-w-md flex flex-col max-h-[85vh] shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* ACCORDION TOP HEADER PANEL */}
              <div className="flex justify-between items-center px-5 py-4 border-b border-zinc-800">
                <div className="min-w-0 pr-4">
                  <h3 className="font-medium text-zinc-200 tracking-tight text-sm">
                    Track Overview (Day {activeDay.day})
                  </h3>
                  <p className="text-[11px] text-zinc-500 truncate mt-0.5 pr-2">
                    {activeDay.title || 'Module Documentation details'}
                  </p>
                </div>
                
                <div className="flex items-center gap-2 shrink-0">
                  <button 
                    type="button"
                    onClick={() => handleMarkAllDone(activeDay)}
                    className="flex items-center gap-1.5 text-[11px] font-medium text-zinc-300 bg-zinc-900 border border-zinc-800 px-2.5 py-1.5 rounded-md hover:bg-zinc-800 transition active:scale-95"
                  >
                    <CheckSquare size={12} className="text-zinc-400" />
                    <span>{activeDay.completed?.length === activeDay.total ? "Reset" : "Complete Day"}</span>
                  </button>

                  <button 
                    type="button"
                    onClick={handleCloseModal} 
                    className="p-1.5 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900 rounded-md border border-transparent hover:border-zinc-800 transition active:scale-90"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>

              {/* CONTROLS TREE SLIDER DRAWER MAP */}
              <div className="flex justify-between items-center px-5 py-2.5 bg-[#09090b] border-b border-zinc-800/80 text-[10px] font-medium text-zinc-500 select-none">
                <div className="flex items-center gap-1.5 font-semibold text-zinc-500 uppercase tracking-wider">
                  <SlidersHorizontal size={10} />
                  <span>Topic Segments</span>
                </div>
                <div className="flex gap-2.5 text-[11px] font-medium text-zinc-400">
                  <button type="button" onClick={() => toggleAllSections(true)} className="hover:text-zinc-200 transition flex items-center gap-1"><Eye size={11}/> Expand</button>
                  <span className="text-zinc-800">|</span>
                  <button type="button" onClick={() => toggleAllSections(false)} className="hover:text-zinc-200 transition flex items-center gap-1"><EyeOff size={11}/> Collapse</button>
                </div>
              </div>

              {/* LIST TREE CONTROLLER */}
              <div className="p-4 space-y-3 overflow-y-auto flex-1 custom-scrollbar">
                {(() => {
                  let runningIndex = 0;
                  return Object.entries(activeDay.sections || {}).map(([sectionName, tasks]) => {
                    if (!Array.isArray(tasks) || tasks.length === 0) return null;

                    const isOpen = !!expandedSections[sectionName];
                    const currentSectionTasks = tasks.map(task => {
                      const taskLabel = (task && typeof task === "object") ? task.label : task;
                      return {
                        label: typeof taskLabel === "string" ? taskLabel : "Task specification item",
                        idx: runningIndex++
                      };
                    });

                    const doneCount = currentSectionTasks.filter(t => activeDay.completed?.includes(t.idx)).length;
                    const isSectionComplete = doneCount === tasks.length;

                    return (
                      <div key={sectionName} className="border border-zinc-800/60 rounded-lg overflow-hidden bg-zinc-900/10">
                        
                        {/* TOGGLE INNER STRIP */}
                        <div
                          onClick={() => toggleSection(sectionName)}
                          className="flex justify-between items-center px-3.5 py-2.5 bg-zinc-900/40 hover:bg-zinc-900/80 cursor-pointer transition select-none border-b border-transparent data-[open=true]:border-zinc-800/60"
                          data-open={isOpen}
                        >
                          <div className="flex items-center gap-2">
                            <h4 className={`text-[11px] font-semibold tracking-wider uppercase transition-colors ${isSectionComplete ? "text-emerald-500/90" : "text-zinc-300"}`}>
                              {sectionName}
                            </h4>
                            <span className={`text-[9px] font-mono font-bold px-1 rounded ${isSectionComplete ? "bg-emerald-950/40 text-emerald-400" : "bg-zinc-900 text-zinc-500 border border-zinc-800"}`}>
                              {doneCount}/{tasks.length}
                            </span>
                          </div>

                          <ChevronDown 
                            size={12} 
                            className={`text-zinc-500 transition-transform duration-150 ${isOpen ? "rotate-180 text-zinc-300" : ""}`} 
                          />
                        </div>

                        {/* ANCHOR DRAW EXTENSION LAYER */}
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.15, ease: "easeInOut" }}
                              className="overflow-hidden bg-[#09090b]/40"
                            >
                              <div className="p-1 border-t border-zinc-800/40 space-y-0.5">
                                {currentSectionTasks.map((task) => {
                                  const isDone = activeDay.completed?.includes(task.idx);

                                  return (
                                    <div
                                      key={task.idx}
                                      onClick={() => handleToggleTask(activeDay.day, task.idx)}
                                      className="flex items-center gap-2.5 p-2 rounded-md cursor-pointer transition-colors duration-100 group hover:bg-zinc-900/60"
                                    >
                                      {isDone ? (
                                        <CheckCircle2 size={13} className="text-zinc-400 shrink-0" />
                                      ) : (
                                        <Circle size={13} className="text-zinc-700 group-hover:text-zinc-500 shrink-0 transition-colors" />
                                      )}

                                      <span className={`
                                        text-xs font-normal tracking-wide transition-all pr-1
                                        ${isDone ? "line-through text-zinc-600" : "text-zinc-300 group-hover:text-zinc-100"}
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
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #27272a; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #3f3f46; }
      `}</style>
    </div>
  );
}