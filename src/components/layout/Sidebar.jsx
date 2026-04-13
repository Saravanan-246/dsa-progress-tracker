import {
  LayoutDashboard,
  BarChart3,
  Settings,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Sidebar({ open, setOpen }) {
  const location = useLocation();
  const navigate = useNavigate();

  const menu = [
    { name: "Dashboard", path: "/", icon: LayoutDashboard },
    { name: "Progress", path: "/progress", icon: BarChart3 },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  return (
    <>
      {/* OVERLAY (Mobile only) */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full
          bg-[#0B0F1A] border-r border-white/10
          flex flex-col transition-all duration-300

          ${open ? "w-56" : "w-16"}
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* HEADER */}
        <div className="h-14 flex items-center px-4 border-b border-white/5">
          <span className="text-sm font-semibold text-white tracking-wide">
            {open ? "Saravanan" : "S"}
          </span>
        </div>

        {/* NAV */}
        <nav className="flex-1 px-2 py-3 space-y-1">
          {menu.map(({ name, path, icon: Icon }) => {
            const active = location.pathname === path;

            return (
              <button
                key={path}
                onClick={() => {
                  navigate(path);
                  if (window.innerWidth < 768) setOpen(false);
                }}
                className={`
                  w-full flex items-center rounded-lg py-2 text-sm
                  transition-all duration-200

                  ${open ? "px-3 gap-3" : "justify-center"}

                  ${
                    active
                      ? "bg-white/10 text-white"
                      : "text-white/60 hover:bg-white/5 hover:text-white"
                  }
                `}
              >
                <Icon size={18} />

                {/* TEXT */}
                {open && <span>{name}</span>}
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
}