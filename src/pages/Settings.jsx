import { useEffect, useRef, useState } from "react";
import { Check, Trash2, User2 } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

export default function Settings() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [saveState, setSaveState] = useState("idle");
  const saveTimer = useRef(null);

  useEffect(() => {
    const savedName = localStorage.getItem("user-name") || "";
    setName(savedName);
  }, []);

  useEffect(() => {
    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
  }, []);

  const handleChange = (e) => {
    const newName = e.target.value;
    setName(newName);
    setSaveState("saving");

    localStorage.setItem("user-name", newName);
    window.dispatchEvent(new Event("local-update"));

    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      setSaveState("saved");
    }, 400);
  };

  const handleClearData = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white">

      <Navbar setOpen={setOpen} />
      <Sidebar open={open} setOpen={setOpen} />

      <main className="pt-16 md:pl-56 px-4 md:px-6 pb-10">
        <div className="max-w-2xl mx-auto space-y-6">

          {/* HEADER */}
          <div>
            <h1 className="text-lg font-semibold">Settings</h1>
            <p className="text-xs text-white/40">
              Manage your profile & app data
            </p>
          </div>

          {/* 🔥 PROFILE BAR */}
          <div className="bg-white/[0.04] border border-white/[0.06] rounded-xl px-4 py-3 flex items-center justify-between">

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-sm font-semibold">
                {name ? name.charAt(0).toUpperCase() : "S"}
              </div>

              <div>
                <p className="text-xs text-white/40">Logged in as</p>
                <p className="text-sm font-medium text-white">
                  {name || "Your Name"}
                </p>
              </div>
            </div>

            <div className="text-[11px] text-emerald-400">
              {saveState === "saved" ? "Updated ✓" : ""}
            </div>
          </div>

          {/* PROFILE INPUT CARD */}
          <div className="bg-white/[0.04] border border-white/[0.06] rounded-xl p-5 space-y-4">

            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
                <User2 size={16} />
              </div>

              <div>
                <p className="text-sm font-medium">Profile</p>
                <p className="text-xs text-white/40">
                  Update your display name
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] text-white/40 uppercase">
                Name
              </label>

              <input
                type="text"
                value={name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            {/* SAVE STATUS */}
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-white/40">
                Auto-saves instantly
              </span>

              <div
                className={`
                  text-[11px] px-2 py-1 rounded-md border flex items-center gap-1

                  ${
                    saveState === "saving"
                      ? "text-yellow-400 border-yellow-400/30"
                      : saveState === "saved"
                      ? "text-emerald-400 border-emerald-400/30"
                      : "text-white/30 border-white/10"
                  }
                `}
              >
                {saveState === "saved" && <Check size={12} />}
                {saveState === "saving"
                  ? "Saving..."
                  : saveState === "saved"
                  ? "Saved"
                  : "Idle"}
              </div>
            </div>
          </div>

          {/* RESET SECTION */}
          <div className="bg-red-500/[0.04] border border-red-500/20 rounded-xl p-5 flex justify-between items-center">

            <div>
              <p className="text-sm font-medium">Reset Data</p>
              <p className="text-xs text-white/40">
                Clear all saved progress
              </p>
            </div>

            <button
              onClick={handleClearData}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition"
            >
              <Trash2 size={14} />
              Reset
            </button>

          </div>

        </div>
      </main>
    </div>
  );
}