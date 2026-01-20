import NeogenInput from "../../components/neogen/keyboard-input/neogen-input/NeogenInput";
import NeogenButton from "../../components/neogen/neogen-button/NeogenButton";

function CustomerRegister() {
  const darkLabelStyle = { color: "rgba(255, 255, 255, 0.75)" };
  const darkInputStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.92)",
    borderColor: "rgba(255, 255, 255, 0.28)",
    color: "#0f172a",
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-10"
      style={{ background: "linear-gradient(135deg, #f5f8ff 0%, #edf2ff 45%, #f8fafc 100%)" }}
    >
      <div className="w-full max-w-6xl rounded-[32px] bg-white/75 shadow-2xl backdrop-blur border border-white/60 overflow-hidden">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_1fr]">
          <div className="p-8 lg:p-12 flex flex-col justify-between bg-gradient-to-br from-[#0e0f14] via-[#111827] to-[#0f172a] text-white">
            <div>
              <span className="inline-flex items-center rounded-full border border-white/20 px-4 py-1 text-xs uppercase tracking-[0.3em] oxanium-400">
                Customer Suite
              </span>
              <h1 className="mt-6 text-3xl lg:text-4xl michroma-700">
                Cadastro de clientes com visual elegante e corporativo.
              </h1>
              <p className="mt-4 text-sm leading-relaxed text-white/70 oxanium-400">
                Organize os dados essenciais para faturamento, atendimento e relacionamento, mantendo um layout clean e futurista.
              </p>
              <div className="mt-8 grid gap-4">
                {[
                  { title: "Dados completos", desc: "Campos estratégicos para perfil comercial robusto." },
                  { title: "Identidade premium", desc: "Tipografia e cantos arredondados seguindo o padrão Neogen." },
                  { title: "Fluxo objetivo", desc: "Seções claras para acelerar o preenchimento." },
                ].map((item) => (
                  <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-sm michroma-400">{item.title}</p>
                    <p className="mt-2 text-xs text-white/70 oxanium-400">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              {["Cliente premium", "UX guiada", "ERP central"].map((tag) => (
                <span key={tag} className="rounded-full bg-white/10 px-4 py-1 text-xs oxanium-400 text-white/70">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="p-8 lg:p-12">
            <div className="mb-8">
              <h2 className="text-2xl michroma-700 text-[#0f172a]">Novo cliente</h2>
              <p className="mt-2 text-sm text-slate-500 oxanium-400">
                Preencha as informações corporativas para iniciar o relacionamento.
              </p>
            </div>

            <form className="space-y-5">
              <NeogenInput
                label="Nome completo"
                type="text"
                id="name"
                name="name"
                placeholder="Nome do cliente"
                labelStyle={darkLabelStyle}
                inputStyle={darkInputStyle}
              />

              <div className="grid gap-5 md:grid-cols-2">
                <NeogenInput
                  label="Email"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="cliente@email.com"
                  labelStyle={darkLabelStyle}
                  inputStyle={darkInputStyle}
                />
                <NeogenInput
                  label="Telefone"
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="(11) 99999-0000"
                  labelStyle={darkLabelStyle}
                  inputStyle={darkInputStyle}
                />
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <NeogenInput
                  label="CPF"
                  type="text"
                  id="cpf"
                  name="cpf"
                  placeholder="000.000.000-00"
                  labelStyle={darkLabelStyle}
                  inputStyle={darkInputStyle}
                />
                <NeogenInput
                  label="CNPJ (opcional)"
                  type="text"
                  id="cnpj"
                  name="cnpj"
                  placeholder="00.000.000/0001-00"
                  labelStyle={darkLabelStyle}
                  inputStyle={darkInputStyle}
                />
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <NeogenInput
                  label="CEP"
                  type="text"
                  id="cep"
                  name="cep"
                  placeholder="00000-000"
                  labelStyle={darkLabelStyle}
                  inputStyle={darkInputStyle}
                />
                <NeogenInput
                  label="Endereço"
                  type="text"
                  id="address"
                  name="address"
                  placeholder="Rua, número, complemento"
                  labelStyle={darkLabelStyle}
                  inputStyle={darkInputStyle}
                />
              </div>

              <NeogenButton type="submit" style={{ backgroundColor: "#0f172a" }}>
                Salvar cliente
              </NeogenButton>
            </form>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-500 oxanium-400">
              Prefere cadastrar múltiplos contatos? Em breve módulo de contatos avançados.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerRegister;
