import { useEffect, useState, useMemo } from "react";
import { CheckCircle2, Circle, ExternalLink, ArrowRight } from "lucide-react";

export default function TaskCard({ dayData }) {
  const [completed, setCompleted] = useState([]);

  // Safely grab local storage data
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(`day-${dayData?.day}`)) || [];
      setCompleted(saved);
    } catch (e) {
      setCompleted([]);
    }
  }, [dayData?.day]);

  // Handle cross-tab state syncing dynamically
  useEffect(() => {
    const syncState = () => {
      try {
        const saved = JSON.parse(localStorage.getItem(`day-${dayData?.day}`)) || [];
        setCompleted(saved);
      } catch (e) {}
    };
    window.addEventListener("local-update", syncState);
    window.addEventListener("storage", syncState);
    return () => {
      window.removeEventListener("local-update", syncState);
      window.removeEventListener("storage", syncState);
    };
  }, [dayData?.day]);

  // -------------------------------------------------------------
  // SCHEMA ENGINE: Safely extract and flatten data structures
  // -------------------------------------------------------------
  const flattenedTasks = useMemo(() => {
    if (!dayData) return [];
    
    // If it's using the new section schema:
    if (dayData.sections && typeof dayData.sections === "object") {
      let globalIndex = 0;
      const tasksAccumulator = [];
      
      Object.entries(dayData.sections).forEach(([sectionName, taskArray]) => {
        if (!Array.isArray(taskArray)) return;
        taskArray.forEach((task) => {
          const baseTask = typeof task === "string" ? { label: task } : task;
          tasksAccumulator.push({
            ...baseTask,
            section: sectionName,
            index: globalIndex++, // Maintain strict index mapping
          });
        });
      });
      return tasksAccumulator;
    }
    
    // Fallback if it's using the old array schema:
    if (Array.isArray(dayData.tasks)) {
      return dayData.tasks.map((task, index) => {
        const baseTask = typeof task === "string" ? { label: task } : task;
        return { ...baseTask, section: null, index };
      });
    }

    return [];
  }, [dayData]);

  const toggleTask = (index) => {
    const updated = completed.includes(index)
      ? completed.filter((i) => i !== index)
      : [...completed, index];

    setCompleted(updated);
    localStorage.setItem(`day-${dayData.day}`, JSON.stringify(updated));

    // Force all components across your workspace to sync simultaneously
    window.dispatchEvent(new Event("local-update"));
    window.dispatchEvent(new Event("storage"));
  };

  const total = flattenedTasks.length;
  const done = completed.length;
  const percent = total === 0 ? 0 : Math.min(100, Math.round((done / total) * 100));
  const isFullyComplete = percent === 100 && total > 0;

  if (!dayData) return null;

  return (
    <div className={`
      group bg-[#0B0E14]/40 border rounded-xl p-4 transition-all duration-300 flex flex-col justify-between h-full backdrop-blur-sm
      ${isFullyComplete ? "border-emerald-500/20 shadow-lg shadow-emerald-500/[0.01]" : "border-white/[0.05] hover:border-white/[0.12] hover:bg-white/[0.01]"}
    `}>
      
      <div>
        {/* CARD TOP TRACK LAYER */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-[10px] text-slate-500 font-mono font-bold uppercase tracking-wider">
              Day {dayData.day?.toString().padStart(2, "0")}
            </p>
            <h3 className="text-sm font-semibold text-slate-200 mt-0.5 group-hover:text-white transition-colors line-clamp-1">
              {dayData.title || "Daily Tracking Space"}
            </h3>
          </div>

          <div className="text-right select-none">
            <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${isFullyComplete ? "bg-emerald-500/10 text-emerald-400" : "bg-white/5 text-slate-400"}`}>
              {done}/{total}
            </span>
          </div>
        </div>

        {/* METRIC PROGRESS METERS */}
        <div className="h-1 bg-white/[0.06] rounded-full mb-4 overflow-hidden border border-white/[0.01]">
          <div
            style={{ width: `${percent}%` }}
            className={`h-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isFullyComplete ? "bg-emerald-400" : "bg-indigo-500"
            }`}
          />
        </div>

        {/* DYNAMIC SCROLL CONSOLE */}
        <div className="space-y-1 max-h-[220px] overflow-y-auto pr-1 custom-mini-scrollbar">
          {flattenedTasks.map((task) => {
            const isDone = completed.includes(task.index);
            const taskLabel = task.label || "Untitled Task Item";
            const taskUrl = task.url || "";

            return (
              <div
                key={task.index}
                className={`
                  flex items-center justify-between p-2 rounded-lg transition-all duration-150 group/item
                  ${isDone ? "bg-white/[0.005]" : "hover:bg-white/[0.02]"}
                `}
              >
                {/* CHECKBOX TRIGGER AREA */}
                <div
                  onClick={() => toggleTask(task.index)}
                  className="flex items-center gap-2.5 cursor-pointer flex-1 select-none"
                >
                  <div className={`transition-colors shrink-0 ${isDone ? "text-indigo-400" : "text-slate-600 group-hover/item:text-slate-400"}`}>
                    {isDone ? <CheckCircle2 size={15} /> : <Circle size={15} />}
                  </div>

                  <span className={`text-xs transition-all tracking-wide ${
                    isDone ? "line-through text-slate-600 font-normal" : "text-slate-300 group-hover/item:text-white"
                  }`}>
                    {taskLabel}
                  </span>
                </div>

                {/* ANCHOR REDIRECTIONS */}
                {taskUrl && taskUrl !== "#" && !isDone && (
                  <a
                    href={taskUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1 text-slate-600 hover:text-indigo-400 transition-colors"
                  >
                    <ExternalLink size={12} />
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* COMPONENT ANCHORED ACTION TRIGGER */}
      <button className="w-full mt-4 py-2 border border-white/[0.03] hover:border-white/[0.08] bg-white/[0.01] hover:bg-white/[0.02] rounded-lg text-[11px] font-semibold text-slate-400 hover:text-white transition-all flex items-center justify-center gap-1.5 active:scale-[0.98]">
        <span>Review Concepts</span>
        <ArrowRight size={12} className="text-slate-500 group-hover:translate-x-0.5 transition-transform" />
      </button>

      <style>{`
        .custom-mini-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-mini-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-mini-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.03); border-radius: 99px; }
        .custom-mini-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.08); }
      `}</style>
    </div>
  );
}