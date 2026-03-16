import NeogenInput from "../neogen/keyboard-input/neogen-input/NeogenInput";
import NeogenTextarea from "../neogen/keyboard-input/neogen-textarea/NeogenTextarea";
import NeogenButton from "../neogen/neogen-button/NeogenButton";


function DeviceForm() {
  const labelStyle = { color: "#1f2937" };
  const inputStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.92)",
    borderColor: "rgba(255, 255, 255, 0.25)",
    color: "#0f172a",
  };
  return (
    <div className="pb-6">
      <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5">
        <h4 className="text-2xl michroma-700 text-slate-900 pb-0.5">Cadastro de dispositivo</h4>
        <p className="mt-1 text-sm text-slate-500 oxanium-400 pb-1">
          Preencha os dados do dispositivo para adicionar à lista.
        </p>

        <form>
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

          <NeogenButton type="submit" style={{ backgroundColor: "#111827", width: "auto", paddingLeft: 24, paddingRight: 24 }}>Salvar</NeogenButton>
        </form>
      </div>
    </div>
  )
}

export default DeviceForm