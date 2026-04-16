import { Link, useLocation } from "react-router-dom"


function AppNavBar() {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const linkBase =
    "rounded-full px-3.5 py-2 text-[11px] uppercase tracking-[0.22em] oxanium-400 transition-all";

  const linkActive = "bg-white/15 text-white border border-white/20";
  const linkInactive = "text-white/70 hover:text-white hover:bg-white/10";

  return (
    <div className="sticky top-0 z-49 border-b border-white/10 bg-[#0b0f1f]/75 backdrop-blur">
      <div className="mx-auto w-full max-w-7xl px-2.5">
        <nav className="flex flex-wrap items-center justify-between gap-2 py-2.5">
          <div className="flex flex-wrap items-center gap-2">
            <Link
              to="/technician/dashboard"
              className={`${linkBase} ${isActive("/technician/dashboard") ? linkActive : linkInactive}`}
            >
              Dashboard
            </Link>

            <button
              type="button"
              className={`${linkBase} ${linkInactive} cursor-not-allowed opacity-80`}
              title="Em breve"
              aria-disabled="true"
            >
              Fila de OS
              <span className="ml-2 rounded-full bg-white/10 px-2 py-1 text-[12px] text-white/70">
                0
              </span>
            </button>

            <Link
              to="/customers"
              className={`${linkBase} ${isActive("/customers") ? linkActive : linkInactive}`}
            >
              Clientes
            </Link>
          </div>

          <div className="hidden md:flex flex-wrap items-center gap-2">
            <Link
              to="/service-orders/new"
              className="rounded-full bg-white px-3.5 py-2 text-[11px] uppercase tracking-[0.22em] text-slate-900 oxanium-700 transition-all hover:bg-slate-100"
            >
              + Nova OS
            </Link>

            <Link
              to="/customers/register"
              className="rounded-full border border-white/20 bg-white/10 px-3.5 py-2 text-[11px] uppercase tracking-[0.22em] text-white/80 oxanium-400 transition-all hover:bg-white/15 hover:text-white"
            >
              + Cliente
            </Link>
          </div>
        </nav>
      </div>
    </div>
  )
}

export default AppNavBar