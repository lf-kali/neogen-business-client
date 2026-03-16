
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

function UserNavBar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, handleLogout } = useAuth();

  // Contagem de OS
  const osAbertas = user.serviceOrders?.filter(os => os.status !== "finished").length ?? 0;
  const osFinalizadas = user.serviceOrders?.filter(os => os.status === "finished").length ?? 0;

  // Data e hora formatadas
  const dataAtual = new Date().toLocaleDateString("pt-BR", {
    weekday: "short",
    day: "2-digit",
    month: "short",
  });
  const horaAtual = new Date().toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="border-t border-white/5 bg-white/5">
      <div className="mx-auto w-full max-w-6xl px-4">
        <div className="flex items-center justify-between py-1.5">
          
          {/* Usuário + Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 rounded-full bg-white/5 px-2 py-1 transition-all hover:bg-white/10"
            >
              {/* Avatar */}
              {user.profilePicture ? (
                <img
                  src={user.profilePicture}
                  alt={user.name}
                  className="h-6 w-6 rounded-full object-cover ring-2 ring-white/20"
                />
              ) : (
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-[10px] font-bold text-white">
                  {user.name?.charAt(0).toUpperCase() ?? "?"}
                </div>
              )}

              {/* Nome e Email */}
              <div className="hidden text-left sm:block">
                <p className="text-xs font-medium text-white/90">{user.name}</p>
                <p className="text-[10px] text-white/50">{user.email}</p>
              </div>

              {/* Ícone Chevron */}
              <svg
                className={`h-3 w-3 text-white/50 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute left-0 top-full mt-1 w-44 rounded-lg border border-white/10 bg-[#0b0f1f]/95 py-1 shadow-xl backdrop-blur z-50">
                <button className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-xs text-white/70 transition-colors hover:bg-white/10 hover:text-white">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Perfil
                </button>
                <button className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-xs text-white/70 transition-colors hover:bg-white/10 hover:text-white">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Editar informações
                </button>
                <div className="my-1 border-t border-white/10" />
                <button 
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-xs text-red-400 transition-colors hover:bg-red-500/10 hover:text-red-300"
                >
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Sair
                </button>
              </div>
            )}
          </div>

          {/* Data/Hora + Resumo de Atividade */}
          <div className="flex items-center gap-3">
            {/* Data e Hora */}
            <div className="hidden items-center gap-1.5 text-[10px] text-white/50 sm:flex">
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{dataAtual}</span>
              <span className="text-white/30">•</span>
              <span>{horaAtual}</span>
            </div>

            {/* Separador */}
            <div className="hidden h-3 w-px bg-white/10 sm:block" />

            {/* Status OS */}
            <div className="flex items-center gap-1.5 rounded-full bg-white/5 px-2 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              <span className="text-[10px] text-white/70">
                <span className="font-semibold text-white">{osAbertas}</span> abertas
              </span>
            </div>
            <div className="hidden items-center gap-1.5 rounded-full bg-white/5 px-2 py-1 md:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span className="text-[10px] text-white/70">
                <span className="font-semibold text-white">{osFinalizadas}</span> finalizadas
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserNavBar;