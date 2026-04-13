import { useEffect, useState } from "react";
import { CheckCircle2, Circle, ExternalLink, ArrowRight } from "lucide-react";

export default function TaskCard({ dayData }) {
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(`day-${dayData.day}`)) || [];
    setCompleted(saved);
  }, [dayData.day]);

  const toggleTask = (index) => {
    const updated = completed.includes(index)
      ? completed.filter((i) => i !== index)
      : [...completed, index];

    setCompleted(updated);
    localStorage.setItem(`day-${dayData.day}`, JSON.stringify(updated));

    window.dispatchEvent(new Event("storage"));
  };

  const total = dayData.tasks?.length || 0;
  const done = completed.length;
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);

  return (
    <div className="group bg-white/[0.04] border border-white/[0.06] hover:border-white/10 rounded-xl p-4 transition-all duration-300">
      
      {/* HEADER */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-[10px] text-white/40 uppercase tracking-wider">
            Day {dayData.day.toString().padStart(2, "0")}
          </p>
          <h3 className="text-sm font-semibold text-white group-hover:text-white/90">
            {dayData.title || "Daily Practice"}
          </h3>
        </div>

        <div className="text-right">
          <p className="text-[10px] text-white/30">Done</p>
          <p
            className={`text-xs font-semibold ${
              percent === 100 ? "text-emerald-400" : "text-white/60"
            }`}
          >
            {done}/{total}
          </p>
        </div>
      </div>

      {/* PROGRESS */}
      <div className="h-1.5 bg-white/10 rounded-full mb-4 overflow-hidden">
        <div
          style={{ width: `${percent}%` }}
          className={`h-full transition-all duration-500 ${
            percent === 100 ? "bg-emerald-500" : "bg-white/40"
          }`}
        />
      </div>

      {/* TASKS */}
      <div className="space-y-1">
        {dayData.tasks?.map((task, index) => {
          const isDone = completed.includes(index);
          const taskLabel = typeof task === "string" ? task : task.label;
          const taskUrl = task.url || "#";

          return (
            <div
              key={index}
              className={`
                flex items-center justify-between p-2 rounded-lg transition
                ${isDone ? "opacity-40" : "hover:bg-white/[0.04]"}
              `}
            >
              {/* LEFT */}
              <div
                onClick={() => toggleTask(index)}
                className="flex items-center gap-2 cursor-pointer flex-1"
              >
                <div className={isDone ? "text-emerald-500" : "text-white/30"}>
                  {isDone ? (
                    <CheckCircle2 size={16} />
                  ) : (
                    <Circle size={16} />
                  )}
                </div>

                <span
                  className={`text-sm ${
                    isDone
                      ? "line-through text-white/40"
                      : "text-white/80"
                  }`}
                >
                  {taskLabel}
                </span>
              </div>

              {/* LINK */}
              {!isDone && (
                <a
                  href={taskUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1 text-white/20 hover:text-white/70 transition"
                >
                  <ExternalLink size={14} />
                </a>
              )}
            </div>
          );
        })}
      </div>

      {/* FOOTER */}
      <button className="w-full mt-4 py-2 text-xs text-white/50 hover:text-white transition flex items-center justify-center gap-1">
        View Notes
        <ArrowRight size={14} />
      </button>
    </div>
  );
}