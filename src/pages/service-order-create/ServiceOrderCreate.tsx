import { useLoaderData, useSearchParams } from "react-router-dom";
import NeogenInput from "../../components/neogen/keyboard-input/neogen-input/NeogenInput";
import NeogenButton from "../../components/neogen/neogen-button/NeogenButton";
import type { UserSession } from "../../core/session";
import DeviceForm from "../../components/devices/DeviceForm";
import Popup from 'reactjs-popup'
import { useRequireAuth } from "../../utils/useRequireAuth";

function ServiceOrderCreate() {
  const labelStyle = { color: "#1f2937" };
  const inputStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.92)",
    borderColor: "rgba(255, 255, 255, 0.25)",
    color: "#0f172a",
  };

  const user = useRequireAuth();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('from') || '/';

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-10"
      style={{ background: "linear-gradient(135deg, #f4f7ff 0%, #eef2ff 45%, #f8fafc 100%)" }}
    >
      <div className="w-full max-w-6xl rounded-[32px] bg-white/75 shadow-2xl backdrop-blur border border-white/60 overflow-hidden">
        <div className="p-8 lg:p-12 bg-gradient-to-br from-[#0e0f14] via-[#111827] to-[#0f172a] text-white">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <span className="inline-flex items-center rounded-full border border-white/20 px-4 py-1 text-xs uppercase tracking-[0.3em] oxanium-400">
                Service Order
              </span>
              <h1 className="mt-5 text-3xl lg:text-4xl michroma-700">Nova ordem de serviço</h1>
              <p className="mt-3 text-sm leading-relaxed text-white/70 oxanium-400">
                Centralize as informações do atendimento e associe os dispositivos em um fluxo organizado.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {[
                "Fluxo amplo",
                "Formulário guiado",
                "Visual premium",
              ].map((tag) => (
                <span key={tag} className="rounded-full bg-white/10 px-4 py-1 text-xs oxanium-400 text-white/70">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="p-8 lg:p-12 space-y-10">
          <section className="rounded-3xl border border-slate-200 bg-white/80 p-6 lg:p-8 shadow-sm">
            <div className="flex items-start justify-between gap-6 flex-wrap">
              <div>
                <h2 className="text-2xl michroma-700 text-[#0f172a]">Detalhes</h2>
                <p className="mt-2 text-sm text-slate-500 oxanium-400">
                  Defina a descrição do problema, prazo e o cliente responsável pela solicitação.
                </p>
              </div>
              <span className="rounded-full bg-slate-100 px-4 py-1 text-xs text-slate-500 oxanium-400">
                Etapa 1
              </span>
            </div>

            <div className="mt-6 grid gap-5">

              <div className="grid gap-5 md:grid-cols-2">
                <NeogenInput
                  label="Prazo"
                  type="date"
                  id="deadline"
                  name="deadline"
                  placeholder=""
                  labelStyle={labelStyle}
                  inputStyle={inputStyle}
                />
                <NeogenInput
                  label="Cliente"
                  type="text"
                  id="customerName"
                  name="customerName"
                  placeholder="Nome do cliente"
                  labelStyle={labelStyle}
                  inputStyle={inputStyle}
                />
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white/80 p-6 lg:p-8 shadow-sm">
            <div className="flex items-start justify-between gap-6 flex-wrap">
              <div>
                <h2 className="text-2xl michroma-700 text-[#0f172a]">Dispositivos</h2>
                <p className="mt-2 text-sm text-slate-500 oxanium-400">
                  Adicione os dispositivos associados à ordem e acompanhe os detalhes do atendimento.
                </p>
              </div>
              <span className="rounded-full bg-slate-100 px-4 py-1 text-xs text-slate-500 oxanium-400">
                Etapa 2
              </span>
            </div>

            <div className="mt-6 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <Popup
                  trigger={
                    <NeogenButton type="button" style={{ backgroundColor: "#111827", width: "auto", paddingLeft: 24, paddingRight: 24 }}>
                      Adicionar dispositivo
                    </NeogenButton>
                  }
                  modal
                  closeOnDocumentClick
                  closeOnEscape
                  lockScroll
                  overlayStyle={{
                    overflowY: 'auto',
                    padding: '24px 12px',
                  }}
                  contentStyle={{
                    borderRadius: '1rem',
                    paddingBottom:'2rem',
                    margin: '0 auto',
                    maxWidth: '900px',
                    width: 'min(900px, 100%)',
                    background: 'none',
                    border: 'none'
                  }}
                >
                  <DeviceForm/>
                </Popup>
              </div>

              

              <div className="grid gap-4 md:grid-cols-2">
                {[1, 2].map((item) => (
                  <div key={item} className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
                    <div className="flex items-center justify-between">
                      <p className="text-sm michroma-400 text-slate-900">Dispositivo #{item}</p>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] text-slate-500 oxanium-400">
                        categoria
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-slate-500 oxanium-400">
                      Problema descrito: substituição de peça e revisão completa.
                    </p>
                    <div className="mt-3 grid gap-2 text-xs text-slate-500 oxanium-400">
                      <span>Marca: —</span>
                      <span>Modelo: —</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-xs text-slate-500 oxanium-400">
              Antes de enviar, confirme os dados do cliente e dos dispositivos.
            </p>
            <NeogenButton type="submit" style={{ backgroundColor: "#0f172a", width: "auto", paddingLeft: 32, paddingRight: 32 }}>
              Criar ordem de serviço
            </NeogenButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceOrderCreate;
