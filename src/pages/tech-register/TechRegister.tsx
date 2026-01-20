import NeogenInput from "../../components/neogen/keyboard-input/neogen-input/NeogenInput";
import NeogenTextarea from "../../components/neogen/keyboard-input/neogen-textarea/NeogenTextarea";
import NeogenButton from "../../components/neogen/neogen-button/NeogenButton";

function TechRegister() {
  const darkLabelStyle = { color: "rgba(255, 255, 255, 0.72)" };
  const darkInputStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.92)",
    borderColor: "rgba(255, 255, 255, 0.3)",
    color: "#0f172a",
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-10"
      style={{ background: "linear-gradient(135deg, #f7f9fc 0%, #eef2ff 45%, #f8fafc 100%)" }}
    >
      <div className="w-full max-w-6xl rounded-[32px] bg-white/80 shadow-2xl backdrop-blur border border-white/60 overflow-hidden">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div className="p-8 lg:p-12 flex flex-col justify-between bg-white/80">
            <div>
              <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-1 text-xs uppercase tracking-[0.25em] text-slate-500 oxanium-400">
                TechRegister
              </span>
              <h1 className="mt-6 text-3xl lg:text-4xl michroma-700 text-slate-900">
                Cadastro de Técnico com identidade futurista e empresarial.
              </h1>
              <p className="mt-4 text-sm text-slate-500 oxanium-400 leading-relaxed">
                Estruture o onboarding com informações completas, mantendo o visual limpo, arredondado e alinhado à tipografia do projeto.
              </p>
              <div className="mt-8 grid gap-4">
                {[
                  { title: "Fluxo inteligente", desc: "Campos distribuídos para rápida leitura e preenchimento." },
                  { title: "Consistência visual", desc: "Botões e inputs suaves alinhados com a identidade Neogen." },
                  { title: "Dados completos", desc: "Informações essenciais para controle técnico." },
                ].map((item) => (
                  <div key={item.title} className="rounded-2xl border border-slate-200 bg-white px-5 py-4">
                    <p className="text-sm michroma-400 text-slate-900">{item.title}</p>
                    <p className="mt-1 text-xs text-slate-500 oxanium-400">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              {["UI suave", "Tipografia forte", "ERP ready"].map((tag) => (
                <span key={tag} className="rounded-full bg-slate-100 px-4 py-1 text-xs text-slate-500 oxanium-400">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="p-8 lg:p-12 bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#0b0f1f] text-white">
            <div className="mb-8">
              <h2 className="text-2xl michroma-700">Crie a conta técnica</h2>
              <p className="mt-2 text-sm text-white/70 oxanium-400">
                Complete os dados e integre o colaborador ao fluxo de serviços.
              </p>
            </div>

            <form className="space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <NeogenInput
                  label="Nome Completo"
                  type="text"
                  id="name"
                  name="name"
                  placeholder="João Silva"
                  labelStyle={darkLabelStyle}
                  inputStyle={darkInputStyle}
                />
                <NeogenInput
                  label="Telefone"
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="(11) 98765-4321"
                  labelStyle={darkLabelStyle}
                  inputStyle={darkInputStyle}
                />
              </div>

              <NeogenInput
                label="Email"
                type="email"
                id="email"
                name="email"
                placeholder="joao@example.com"
                labelStyle={darkLabelStyle}
                inputStyle={darkInputStyle}
              />

              <div className="grid gap-5 md:grid-cols-2">
                <NeogenInput
                  label="Senha"
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Mínimo 8 caracteres"
                  labelStyle={darkLabelStyle}
                  inputStyle={darkInputStyle}
                />
                <NeogenInput
                  label="Confirmar Senha"
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Repita a senha"
                  labelStyle={darkLabelStyle}
                  inputStyle={darkInputStyle}
                />
              </div>

              <NeogenTextarea
                label="Endereço"
                id="address"
                name="address"
                placeholder="Rua, número, complemento, cidade, estado"
                rows={3}
                labelStyle={darkLabelStyle}
                inputStyle={darkInputStyle}
              />

              <NeogenInput
                label="URL da Foto de Perfil (opcional)"
                type="url"
                id="profilePicture"
                name="profilePicture"
                placeholder="https://example.com/image.jpg"
                labelStyle={darkLabelStyle}
                inputStyle={darkInputStyle}
              />

              <NeogenButton type="submit" style={{ backgroundColor: "#111827" }}>
                Cadastrar Técnico
              </NeogenButton>
            </form>

            <p className="text-center text-xs mt-6 text-white/70 oxanium-400">
              Já possui uma conta?{" "}
              <a href="/login" className="text-white hover:underline">
                Faça login aqui
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TechRegister;
