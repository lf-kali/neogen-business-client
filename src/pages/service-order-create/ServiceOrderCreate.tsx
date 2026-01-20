import NeogenInput from "../../components/neogen/keyboard-input/neogen-input/NeogenInput";
import NeogenTextarea from "../../components/neogen/keyboard-input/neogen-textarea/NeogenTextarea";
import NeogenButton from "../../components/neogen/neogen-button/NeogenButton";

function ServiceOrderCreate() {
  const labelStyle = { color: "#1f2937" };
  const inputStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.92)",
    borderColor: "rgba(255, 255, 255, 0.25)",
    color: "#0f172a",
  };

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
              <NeogenTextarea
                label="Descrição do problema"
                id="problemDescription"
                name="problemDescription"
                placeholder="Detalhe o problema relatado pelo cliente"
                rows={4}
                labelStyle={labelStyle}
                inputStyle={inputStyle}
              />

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
                <div>
                  <h3 className="text-lg michroma-700 text-slate-900">Componentes</h3>
                  <p className="text-xs text-slate-500 oxanium-400">
                    Use o botão abaixo para incluir um novo dispositivo.
                  </p>
                </div>
                <NeogenButton type="button" style={{ backgroundColor: "#111827", width: "auto", paddingLeft: 24, paddingRight: 24 }}>
                  Adicionar dispositivo
                </NeogenButton>
              </div>

              <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50/80 p-5">
                <h4 className="text-sm michroma-700 text-slate-900">Cadastro de dispositivo</h4>
                <p className="mt-1 text-xs text-slate-500 oxanium-400">
                  Preencha os dados do dispositivo para adicionar à lista.
                </p>

                <div className="mt-4 grid gap-5">
                  <NeogenTextarea
                    label="Descrição do problema"
                    id="deviceProblemDescription"
                    name="deviceProblemDescription"
                    placeholder="Informe o problema específico do dispositivo"
                    rows={3}
                    labelStyle={labelStyle}
                    inputStyle={inputStyle}
                  />

                  <div className="grid gap-5 md:grid-cols-3">
                    <div>
                      <label className="block text-sm mb-2 oxanium-700" style={{ color: labelStyle.color }}>
                        Categoria
                      </label>
                      <select
                        id="category"
                        name="category"
                        className="w-full px-4 py-2 rounded-lg border outline-none focus:ring-2 transition-all oxanium-400"
                        style={inputStyle}
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Selecione
                        </option>
                        <option value="cellphone">Celular</option>
                        <option value="laptop">Laptop</option>
                        <option value="pc">PC</option>
                        <option value="tablet">Tablet</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm mb-2 oxanium-700" style={{ color: labelStyle.color }}>
                        Marca
                      </label>
                      <select
                        id="brandId"
                        name="brandId"
                        className="w-full px-4 py-2 rounded-lg border outline-none focus:ring-2 transition-all oxanium-400"
                        style={inputStyle}
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Selecione
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm mb-2 oxanium-700" style={{ color: labelStyle.color }}>
                        Modelo
                      </label>
                      <select
                        id="modelId"
                        name="modelId"
                        className="w-full px-4 py-2 rounded-lg border outline-none focus:ring-2 transition-all oxanium-400"
                        style={inputStyle}
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Selecione
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-2 rounded-2xl border border-white/10 bg-white/60 p-4">
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                      <div>
                        <h5 className="text-sm michroma-700 text-slate-900">Diagnóstico inicial</h5>
                        <p className="mt-1 text-xs text-slate-500 oxanium-400">
                          Registre o estado do dispositivo no recebimento.
                        </p>
                      </div>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] text-slate-500 oxanium-400">
                        checklist
                      </span>
                    </div>

                    <div className="mt-4 grid gap-5">
                      <div className="grid gap-5 md:grid-cols-3">
                        {[
                          { id: "charger", label: "Carregador" },
                          { id: "cable", label: "Cabo" },
                          { id: "case", label: "Capa" },
                        ].map((item) => (
                          <fieldset key={item.id} className="space-y-2">
                            <legend className="text-sm oxanium-700" style={{ color: labelStyle.color }}>
                              {item.label}
                            </legend>
                            <div className="flex items-center gap-4 text-xs oxanium-400 text-slate-600">
                              <label className="flex items-center gap-2" htmlFor={`handedAccessories.${item.id}.yes`}>
                                <input
                                  id={`handedAccessories.${item.id}.yes`}
                                  type="radio"
                                  name={`handedAccessories.${item.id}`}
                                  value="true"
                                />
                                Sim
                              </label>
                              <label className="flex items-center gap-2" htmlFor={`handedAccessories.${item.id}.no`}>
                                <input
                                  id={`handedAccessories.${item.id}.no`}
                                  type="radio"
                                  name={`handedAccessories.${item.id}`}
                                  value="false"
                                />
                                Não
                              </label>
                            </div>
                          </fieldset>
                        ))}
                      </div>

                      <div className="grid gap-5 md:grid-cols-2">
                        <div>
                          <label className="block text-sm mb-2 oxanium-700" style={{ color: labelStyle.color }}>
                            Armazenamento entregue
                          </label>
                          <select
                            id="storageDevice"
                            name="storageDevice"
                            className="w-full px-4 py-2 rounded-lg border outline-none focus:ring-2 transition-all oxanium-400"
                            style={inputStyle}
                            defaultValue=""
                          >
                            <option value="" disabled>
                              Selecione
                            </option>
                            <option value="sd_card">Cartão SD</option>
                            <option value="flash_drive">Pendrive</option>
                            <option value="external_hdd">HD externo</option>
                            <option value="external_ssd">SSD externo</option>
                          </select>
                        </div>
                        <NeogenInput
                          label="Estado externo"
                          type="text"
                          id="externalState"
                          name="externalState"
                          placeholder="Ex.: riscos, amassados"
                          labelStyle={labelStyle}
                          inputStyle={inputStyle}
                        />
                      </div>

                      <fieldset className="space-y-2">
                        <legend className="text-sm oxanium-700" style={{ color: labelStyle.color }}>
                          Liga?
                        </legend>
                        <div className="flex items-center gap-4 text-xs oxanium-400 text-slate-600">
                          <label className="flex items-center gap-2" htmlFor="turnsOnYes">
                            <input id="turnsOnYes" type="radio" name="turnsOn" value="true" />
                            Sim
                          </label>
                          <label className="flex items-center gap-2" htmlFor="turnsOnNo">
                            <input id="turnsOnNo" type="radio" name="turnsOn" value="false" />
                            Não
                          </label>
                        </div>
                      </fieldset>

                      <NeogenInput
                        label="Áudio"
                        type="text"
                        id="audio"
                        name="audio"
                        placeholder="Ex.: ok, ruído, sem som"
                        labelStyle={labelStyle}
                        inputStyle={inputStyle}
                      />

                      <div className="grid gap-5 md:grid-cols-2">
                        <div>
                          <label className="block text-sm mb-2 oxanium-700" style={{ color: labelStyle.color }}>
                            Tela
                          </label>
                          <select
                            id="screen"
                            name="screen"
                            className="w-full px-4 py-2 rounded-lg border outline-none focus:ring-2 transition-all oxanium-400"
                            style={inputStyle}
                            defaultValue=""
                          >
                            <option value="" disabled>
                              Selecione
                            </option>
                            <option value="ok">Ok</option>
                            <option value="cracked">Trincada</option>
                            <option value="leaking">Vazando</option>
                            <option value="no_video">Sem vídeo</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm mb-2 oxanium-700" style={{ color: labelStyle.color }}>
                            Bateria
                          </label>
                          <select
                            id="battery"
                            name="battery"
                            className="w-full px-4 py-2 rounded-lg border outline-none focus:ring-2 transition-all oxanium-400"
                            style={inputStyle}
                            defaultValue=""
                          >
                            <option value="" disabled>
                              Selecione
                            </option>
                            <option value="ok">Ok</option>
                            <option value="swollen">Estufada</option>
                            <option value="not_charging">Não carrega</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid gap-5 md:grid-cols-3">
                        <div>
                          <label className="block text-sm mb-2 oxanium-700" style={{ color: labelStyle.color }}>
                            Câmera traseira
                          </label>
                          <select
                            id="rearCamera"
                            name="rearCamera"
                            className="w-full px-4 py-2 rounded-lg border outline-none focus:ring-2 transition-all oxanium-400"
                            style={inputStyle}
                            defaultValue=""
                          >
                            <option value="" disabled>
                              Selecione
                            </option>
                            <option value="ok">Ok</option>
                            <option value="damaged">Danificada</option>
                            <option value="not_working">Não funciona</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm mb-2 oxanium-700" style={{ color: labelStyle.color }}>
                            Câmera frontal
                          </label>
                          <select
                            id="frontalCamera"
                            name="frontalCamera"
                            className="w-full px-4 py-2 rounded-lg border outline-none focus:ring-2 transition-all oxanium-400"
                            style={inputStyle}
                            defaultValue=""
                          >
                            <option value="" disabled>
                              Selecione
                            </option>
                            <option value="ok">Ok</option>
                            <option value="damaged">Danificada</option>
                            <option value="not_working">Não funciona</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm mb-2 oxanium-700" style={{ color: labelStyle.color }}>
                            Toque
                          </label>
                          <select
                            id="touch"
                            name="touch"
                            className="w-full px-4 py-2 rounded-lg border outline-none focus:ring-2 transition-all oxanium-400"
                            style={inputStyle}
                            defaultValue=""
                          >
                            <option value="" disabled>
                              Selecione
                            </option>
                            <option value="ok">Ok</option>
                            <option value="phantom_touch">Toque fantasma</option>
                            <option value="not_working">Não funciona</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
