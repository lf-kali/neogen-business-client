import { Link, useLocation } from "react-router-dom";

function NeogenNavbar() {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const linkBase =
    "rounded-full px-4 py-2 text-xs uppercase tracking-[0.22em] oxanium-400 transition-all";

  const linkActive = "bg-white/15 text-white border border-white/20";
  const linkInactive = "text-white/70 hover:text-white hover:bg-white/10";

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0b0f1f]/75 backdrop-blur">
      <div className="mx-auto w-full max-w-6xl px-4">
        <nav className="flex flex-wrap items-center justify-between gap-3 py-3">
          <div className="flex flex-wrap items-center gap-2">
            <Link
              to="/technician/dashboard"
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2"
              aria-label="Ir para o dashboard"
            >
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span className="text-xs uppercase tracking-[0.28em] text-white/80 oxanium-400">
                Neogen
              </span>
            </Link>

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
              <span className="ml-2 rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-white/70">
                0
              </span>
            </button>

            <button
              type="button"
              className={`${linkBase} ${linkInactive} cursor-not-allowed opacity-80`}
              title="Em breve"
              aria-disabled="true"
            >
              Clientes
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link
              to="/service-orders/create"
              className="rounded-full bg-white px-5 py-2 text-xs uppercase tracking-[0.22em] text-slate-900 oxanium-700 transition-all hover:bg-slate-100"
            >
              + Nova OS
            </Link>

            <Link
              to="/customers/register"
              className="rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs uppercase tracking-[0.22em] text-white/80 oxanium-400 transition-all hover:bg-white/15 hover:text-white"
            >
              + Cliente
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default NeogenNavbar;
