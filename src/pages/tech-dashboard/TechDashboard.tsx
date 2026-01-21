import { Link } from "react-router-dom";

function TechDashboard() {
  const quickLinks = [
    {
      title: "Cadastrar cliente",
      description: "Crie o cadastro completo do cliente para liberar atendimentos.",
      path: "/customers/register",
      badge: "Cadastro",
    },
    {
      title: "Nova ordem de serviço",
      description: "Abra uma ordem vinculando cliente e dispositivos.",
      path: "/service-orders/create",
      badge: "OS",
    },
  ];

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-10"
      style={{ background: "linear-gradient(135deg, #f3f6ff 0%, #e9eeff 48%, #f8fafc 100%)" }}
    >
      <div className="w-full max-w-6xl rounded-[32px] bg-white/80 shadow-2xl backdrop-blur border border-white/60 overflow-hidden">
        <div className="p-8 lg:p-12 bg-gradient-to-br from-[#0e0f14] via-[#111827] to-[#0f172a] text-white">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <span className="inline-flex items-center rounded-full border border-white/20 px-4 py-1 text-xs uppercase tracking-[0.3em] oxanium-400">
                Tech Dashboard
              </span>
              <h1 className="mt-5 text-3xl lg:text-4xl michroma-700">Painel do técnico</h1>
              <p className="mt-3 text-sm leading-relaxed text-white/70 oxanium-400">
                Acesso rápido às tarefas críticas do atendimento com cards interativos e visual premium.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {["Fluxo rápido", "UI futurista", "Central de serviços"].map((tag) => (
                <span key={tag} className="rounded-full bg-white/10 px-4 py-1 text-xs oxanium-400 text-white/70">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="p-8 lg:p-12">
          <div className="mb-8">
            <h2 className="text-2xl michroma-700 text-[#0f172a]">Atalhos principais</h2>
            <p className="mt-2 text-sm text-slate-500 oxanium-400">
              Escolha uma ação para iniciar rapidamente o fluxo de atendimento.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {quickLinks.map((item) => (
              <Link
                key={item.title}
                to={item.path}
                className="group rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-slate-500 oxanium-400">
                    {item.badge}
                  </span>
                  <span className="text-xs text-slate-400 oxanium-400">Acessar</span>
                </div>
                <h3 className="mt-5 text-xl michroma-700 text-[#0f172a] group-hover:text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm text-slate-500 oxanium-400">
                  {item.description}
                </p>
                <div className="mt-6 inline-flex items-center gap-2 text-xs text-slate-700 oxanium-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  Disponível agora
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TechDashboard;
