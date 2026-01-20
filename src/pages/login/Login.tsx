import NeogenInput from "../../components/neogen/keyboard-input/neogen-input/NeogenInput";
import NeogenButton from "../../components/neogen/neogen-button/NeogenButton";

function Login() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-10"
      style={{ background: "linear-gradient(135deg, #f4f6fb 0%, #eef2ff 50%, #f7f7fb 100%)" }}
    >
      <div className="w-full max-w-5xl rounded-[32px] bg-white/70 shadow-xl backdrop-blur border border-white/60 overflow-hidden">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          <div className="p-8 lg:p-12 flex flex-col justify-between bg-gradient-to-br from-[#0e0e0e] via-[#111827] to-[#0f172a] text-white">
            <div>
              <span className="inline-flex items-center rounded-full border border-white/20 px-4 py-1 text-xs uppercase tracking-[0.3em] oxanium-400">
                Neogen ERP
              </span>
              <h1 className="mt-6 text-3xl lg:text-4xl michroma-700">
                Login Empresarial com estética futurista e confiável.
              </h1>
              <p className="mt-4 text-sm leading-relaxed text-white/70 oxanium-400">
                Centralize acessos críticos, monitore integrações e conecte o time com segurança em cada sessão.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  { title: "Sessão segura", desc: "Criptografia ponta a ponta e autenticação inteligente." },
                  { title: "Performance", desc: "Acesso rápido aos módulos essenciais." },
                  { title: "Analytics", desc: "Dashboards para decisões rápidas." },
                  { title: "Integrações", desc: "Conexões estáveis com ERPs modernos." },
                ].map((item) => (
                  <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-sm michroma-400">{item.title}</p>
                    <p className="mt-2 text-xs text-white/70 oxanium-400">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              {["Design arredondado", "Fluxo intuitivo", "Visual premium"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-white/10 px-4 py-1 text-xs oxanium-400 text-white/70"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="p-8 lg:p-12 flex flex-col justify-center">
            <div className="mb-8">
              <h2 className="text-2xl michroma-700 text-[#0f172a]">Bem-vindo de volta</h2>
              <p className="mt-2 text-sm text-slate-500 oxanium-400">
                Use suas credenciais corporativas para continuar.
              </p>
            </div>

            <form className="space-y-5">
              <NeogenInput label="Email corporativo" type="email" id="email" name="email" placeholder="nome@empresa.com" />
              <NeogenInput label="Senha" type="password" id="password" name="password" placeholder="Digite sua senha" />

              <div className="flex items-center justify-between text-xs text-slate-500">
                <label className="flex items-center gap-2 oxanium-400">
                  <input type="checkbox" className="h-4 w-4 rounded border-slate-300 accent-slate-900" />
                  Manter conectado
                </label>
                <a href="#recuperar" className="text-slate-600 hover:text-slate-900 oxanium-400">
                  Esqueci minha senha
                </a>
              </div>

              <NeogenButton type="submit" style={{ backgroundColor: "#0f172a" }}>
                Entrar
              </NeogenButton>
            </form>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-500 oxanium-400">
              Primeiro acesso?{" "}
              <a href="/technician/register" className="text-slate-900 hover:underline">
                Criar conta de técnico
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
