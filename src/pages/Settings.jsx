import { useEffect, useRef, useState } from "react";
import { Check, Trash2, User2, Loader2 } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

export default function Settings() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [saveState, setSaveState] = useState("idle"); // "idle" | "saving" | "saved"
  const saveTimer = useRef(null);

  // Load initial value safely
  useEffect(() => {
    try {
      const savedName = localStorage.getItem("user-name") || "";
      setName(savedName);
    } catch (error) {
      console.error("Failed to read from localStorage:", error);
    }
  }, []);

  // Cleanup timeout hook on unmount
  useEffect(() => {
    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
  }, []);

  // Debounced handler for auto-saving
  const handleChange = (e) => {
    const newName = e.target.value;
    setName(newName);
    setSaveState("saving");

    if (saveTimer.current) clearTimeout(saveTimer.current);

    saveTimer.current = setTimeout(() => {
      try {
        localStorage.setItem("user-name", newName);
        window.dispatchEvent(new Event("local-update"));
        setSaveState("saved");
      } catch (error) {
        console.error("Failed to write to localStorage:", error);
        setSaveState("idle");
      }
    }, 500); // 500ms debounce window for seamless typing feel
  };

  const handleClearData = () => {
    if (window.confirm("Are you sure you want to clear all data? This action cannot be undone.")) {
      try {
        localStorage.clear();
        window.location.reload();
      } catch (error) {
        console.error("Failed to clear localStorage:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white selection:bg-indigo-500/30">
      <Navbar setOpen={setOpen} />
      <Sidebar open={open} setOpen={setOpen} />

      <main className="pt-20 md:pl-60 px-4 md:px-8 pb-12 transition-all duration-300">
        <div className="max-w-2xl mx-auto space-y-6">
          
          {/* HEADER */}
          <header className="space-y-1">
            <h1 className="text-xl font-semibold tracking-tight text-white/90">Settings</h1>
            <p className="text-xs text-white/40">
              Manage your profile and synchronization data
            </p>
          </header>

          {/* PROFILE SUMMARY BAR */}
          <div className="bg-white/[0.02] border border-white/[0.06] backdrop-blur-md rounded-xl px-5 py-4 flex items-center justify-between transition-all">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center text-sm font-semibold shadow-inner">
                {name.trim() ? name.trim().charAt(0).toUpperCase() : "U"}
              </div>

              <div className="space-y-0.5">
                <p className="text-[11px] font-medium tracking-wider text-white/30 uppercase">Logged in as</p>
                <p className="text-sm font-medium text-white/90 truncate max-w-[180px] sm:max-w-xs">
                  {name.trim() || "Anonymous User"}
                </p>
              </div>
            </div>

            <div className="text-xs font-medium text-emerald-400/90 flex items-center gap-1.5 transition-opacity duration-300">
              {saveState === "saved" && (
                <>
                  <Check size={14} className="animate-scale-in" />
                  <span className="hidden sm:inline">All changes saved</span>
                </>
              )}
            </div>
          </div>

          {/* PROFILE INPUT CARD */}
          <section className="bg-white/[0.02] border border-white/[0.06] backdrop-blur-md rounded-xl p-6 space-y-5">
            <div className="flex items-start gap-3.5">
              <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/10">
                <User2 size={18} />
              </div>

              <div className="space-y-0.5">
                <h2 className="text-sm font-medium text-white/90">Profile Information</h2>
                <p className="text-xs text-white/40">
                  Update your public name used across the application.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="username-input" className="text-[11px] font-semibold text-white/40 uppercase tracking-wider">
                Display Name
              </label>

              <input
                id="username-input"
                type="text"
                value={name}
                onChange={handleChange}
                placeholder="Enter your name"
                autoComplete="off"
                className="w-full rounded-lg border border-white/[0.08] bg-white/[0.02] px-3.5 py-2.5 text-sm outline-none transition-all duration-200 placeholder:text-white/20 focus:border-indigo-500/50 focus:bg-white/[0.04] focus:ring-2 focus:ring-indigo-500/10"
              />
            </div>

            {/* SAVE STATUS INDICATOR */}
            <div className="flex justify-between items-center pt-2 border-t border-white/[0.04]">
              <span className="text-[11px] text-white/30 italic">
                Changes are automatically saved locally
              </span>

              <div
                className={`
                  text-xs px-2.5 py-1 rounded-md border flex items-center gap-1.5 font-medium transition-all duration-200
                  ${
                    saveState === "saving"
                      ? "text-amber-400 border-amber-500/20 bg-amber-500/5"
                      : saveState === "saved"
                      ? "text-emerald-400 border-emerald-500/20 bg-emerald-500/5"
                      : "text-white/30 border-white/[0.06] bg-white/[0.01]"
                  }
                `}
              >
                {saveState === "saving" && <Loader2 size={13} className="animate-spin" />}
                {saveState === "saved" && <Check size={13} />}
                
                <span>
                  {saveState === "saving" ? "Saving" : saveState === "saved" ? "Saved" : "Sync Idle"}
                </span>
              </div>
            </div>
          </section>

          {/* DANGER ZONE / RESET SECTION */}
          <section className="bg-red-500/[0.02] border border-red-500/20 rounded-xl p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-0.5">
              <h2 className="text-sm font-medium text-red-400/90">Danger Zone</h2>
              <p className="text-xs text-white/40">
                Permanently purge all data cached in local storage.
              </p>
            </div>

            <button
              onClick={handleClearData}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 hover:text-red-300 active:scale-[0.98] transition-all duration-200 text-sm font-medium"
            >
              <Trash2 size={15} />
              Reset Cache Data
            </button>
          </section>

        </div>
      </main>
    </div>
  );
}