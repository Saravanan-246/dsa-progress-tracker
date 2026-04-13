import { Menu } from "lucide-react";

export default function Navbar({ setOpen }) {
  return (
    <header className="sticky top-0 z-50 h-14 bg-[#0B0F1A]/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">

        {/* LEFT: Menu + Name */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setOpen(prev => !prev)}
            className="p-1 md:hidden text-white/40 hover:text-white transition"
          >
            <Menu size={20} />
          </button>

          <h1 className="text-sm font-semibold tracking-wide text-white/90">
            Saravanan
          </h1>
        </div>

        {/* RIGHT: Clean minimal (empty for now or future use) */}
        <div />
        
      </div>
    </header>
  );
}