import { useEffect, useState, type ChangeEvent, type Dispatch, type FormEvent, type SetStateAction } from "react";
import NeogenInput from "../neogen/keyboard-input/neogen-input/NeogenInput";
import NeogenTextarea from "../neogen/keyboard-input/neogen-textarea/NeogenTextarea";
import NeogenButton from "../neogen/neogen-button/NeogenButton";
import type { CreateDevice, DeviceCategory, HandedAccessories, InitialDiagnosis, UpdateDevice } from "../../features/device/device.types";
import { deviceRepository } from "../../features/device/device.repository";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";


type DeviceFormData = {
  problemDescription: string;
  category?: DeviceCategory;
  brandId: number;
  modelId: number;
}

function DeviceForm() {
  const {handleLogout} = useAuth();
  const navigate = useNavigate();
  const {id} = useParams<{id:string}>();
  
  const [deviceFormData, setDeviceFormData ] = useState<DeviceFormData>({
    problemDescription: '',
    category: undefined,
    brandId: 0,
    modelId: 0,
  });

  const [initialDiagnosisFormdata, setInitialDiagnosisFormdata] = useState<InitialDiagnosis>({
    externalState: '',
    turnsOn: false,
    audio: '',
    screen: undefined,
    battery: undefined,
    rearCamera: undefined,
    frontalCamera: undefined,
  });

  const [handedAccessoriesFormdata, setHandedAccessoriesFormdata] = useState<HandedAccessories>({
    charger: false,
    cable: false,
    case: false,
    storageDevice: undefined,
  });


  async function getDevice(id: number) {
    try {
      const device = await deviceRepository.getById(id);
      setDeviceFormData({problemDescription: device.problemDescription, category: device.category, brandId: device.brand.id, modelId: device.model.id});
      setInitialDiagnosisFormdata(device.initialDiagnosis);
      setHandedAccessoriesFormdata(device.handedAccessories);
      
    } catch (error: any) {
      if(error.toString().includes('401')) handleLogout()
    }
    
  }
  useEffect(()=>{
    if (id) {
      getDevice(+id)
    }
  },[id])

  function onInputChange<T>(data: T, setData: Dispatch<SetStateAction<T>>, e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    })
  }
  
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const payload: CreateDevice | UpdateDevice= {
      ...deviceFormData,
      brandId: +deviceFormData.brandId,
      modelId: +deviceFormData.modelId,
      initialDiagnosis: initialDiagnosisFormdata,
      handedAccessories: handedAccessoriesFormdata
    } 

    console.log(payload)

    try {
      if (!id) await deviceRepository.create(payload as CreateDevice)
      else await deviceRepository.update(+id, payload as UpdateDevice)
      navigate('/devices')
    }
    catch (e) {
      alert("Erro ao salvar dispositivo!")
      console.error("Erro ao salvar dispositivo: ", e)
    }
  }

  
  const darkLabelStyle = { color: "rgba(0, 0, 0, 0.75)" };
  const darkInputStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.92)",
    borderColor: "rgba(0, 0, 0, 0.28)",
    color: "#0f172a",
  };

  return (
    <div
      className="flex flex-col items-center px-4 md:py-6 sm:py-10"
      style={{ background: "linear-gradient(135deg, #f5f8ff 0%, #edf2ff 45%, #f8fafc 100%)" }}
    >
      <div className="w-full max-w-2xl lg:max-w-6xl rounded-[32px] bg-white/75 shadow-2xl backdrop-blur border border-white/60 overflow-hidden">
        <div className="p-3 sm:p-8 lg:p-12">
            <div className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl michroma-700 text-[#0f172a]">{id ? 'Editar dados de Dispositivo' : 'Novo Dispositivo'}</h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-500 oxanium-400">
                Preencha as informações do dispositivo.
              </p>
            </div>

            <form className="space-y-4 sm:space-y-5" onSubmit={onSubmit}>
              {/* Descrição do Problema */}
              <NeogenTextarea
                label="Descrição do Problema"
                id="problemDescription"
                name="problemDescription"
                placeholder="Descreva o problema do dispositivo"
                rows={4}
                labelStyle={darkLabelStyle}
                inputStyle={darkInputStyle}
                value={deviceFormData.problemDescription}
                onChange={(e) => onInputChange<DeviceFormData>(deviceFormData, setDeviceFormData, e)}
              />

              {/* Categoria */}
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm mb-2 oxanium-700"
                  style={darkLabelStyle}
                >
                  Categoria do Dispositivo
                </label>
                <select
                  id="category"
                  name="category"
                  value={deviceFormData.category || ''}
                  onChange={(e) => onInputChange<DeviceFormData>(deviceFormData, setDeviceFormData, e)}
                  className="w-full px-4 py-2 rounded-lg border outline-none focus:ring-2 transition-all oxanium-400"
                  style={darkInputStyle}
                >
                  <option value="">Selecione uma categoria</option>
                  <option value="cellphone">Celular</option>
                  <option value="laptop">Notebook</option>
                  <option value="pc">PC</option>
                  <option value="tablet">Tablet</option>
                </select>
              </div>

              {/* Brand ID e Model ID */}
              <div className="grid grid-cols-2 gap-4">
                <NeogenInput
                  label="ID da Marca"
                  id="brandId"
                  type="number"
                  name="brandId"
                  value={deviceFormData.brandId}
                  onChange={(e) => onInputChange<DeviceFormData>(deviceFormData, setDeviceFormData, e)}
                  labelStyle={darkLabelStyle}
                  inputStyle={darkInputStyle}
                />
                <NeogenInput
                  label="ID do Modelo"
                  id="modelId"
                  type="number"
                  name="modelId"
                  value={deviceFormData.modelId}
                  onChange={(e) => onInputChange<DeviceFormData>(deviceFormData, setDeviceFormData, e)}
                  labelStyle={darkLabelStyle}
                  inputStyle={darkInputStyle}
                />
              </div>

              {/* Diagnóstico Inicial */}
              <fieldset className="border rounded-lg p-4" style={{ borderColor: 'rgba(0, 0, 0, 0.28)' }}>
                <legend className="text-sm oxanium-700" style={darkLabelStyle}>
                  Diagnóstico Inicial
                </legend>
                <div className="space-y-4 mt-4">
                  <NeogenTextarea
                    label="Estado Externo"
                    id="externalState"
                    name="externalState"
                    placeholder="Descreva o estado externo do dispositivo"
                    rows={2}
                    labelStyle={darkLabelStyle}
                    inputStyle={darkInputStyle}
                    value={initialDiagnosisFormdata.externalState}
                    onChange={(e) => onInputChange<InitialDiagnosis>(initialDiagnosisFormdata, setInitialDiagnosisFormdata, e)}
                  />

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="turnsOn"
                      name="turnsOn"
                      checked = {initialDiagnosisFormdata.turnsOn}
                      onChange={(e) => setInitialDiagnosisFormdata({...initialDiagnosisFormdata, turnsOn: e.currentTarget.checked})}
                      style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                    />
                    <label htmlFor="turnsOn" className="ml-2 text-sm oxanium-400 font-bold" style={darkLabelStyle}>
                      Liga Normalmente
                    </label>
                  </div>

                  <NeogenInput
                    label="Áudio"
                    id="audio"
                    type="text"
                    name="audio"
                    placeholder="Descrição do áudio"
                    labelStyle={darkLabelStyle}
                    inputStyle={darkInputStyle}
                    value={initialDiagnosisFormdata.audio}
                    onChange={(e) => onInputChange<InitialDiagnosis>(initialDiagnosisFormdata, setInitialDiagnosisFormdata, e)}
                  />

                  <div>
                    <label className="block text-sm mb-2 oxanium-700" style={darkLabelStyle}>
                      Tela
                    </label>
                    <select
                      name="screen"
                      className="w-full px-4 py-2 rounded-lg border outline-none focus:ring-2 transition-all oxanium-400"
                      style={darkInputStyle}
                      value={initialDiagnosisFormdata.screen}
                      onChange={(e) => onInputChange<InitialDiagnosis>(initialDiagnosisFormdata, setInitialDiagnosisFormdata, e)}
                    >
                      <option value="">Selecione o estado da tela</option>
                      <option value="ok">OK</option>
                      <option value="damaged">Danificada</option>
                      <option value="no_video">Sem Vídeo</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm mb-2 oxanium-700" style={darkLabelStyle}>
                      Bateria
                    </label>
                    <select
                      name="battery"
                      className="w-full px-4 py-2 rounded-lg border outline-none focus:ring-2 transition-all oxanium-400"
                      style={darkInputStyle}
                      value={initialDiagnosisFormdata.battery}
                      onChange={(e) => onInputChange<InitialDiagnosis>(initialDiagnosisFormdata, setInitialDiagnosisFormdata, e)}
                    >
                      <option value="">Selecione o estado da bateria</option>
                      <option value="ok">OK</option>
                      <option value="damaged">Danificada</option>
                      <option value="swollen">Inchada</option>
                      <option value="not_charging">Não Carrega</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm mb-2 oxanium-700" style={darkLabelStyle}>
                      Câmera Traseira
                    </label>
                    <select
                      name="rearCamera"
                      className="w-full px-4 py-2 rounded-lg border outline-none focus:ring-2 transition-all oxanium-400"
                      style={darkInputStyle}
                      value={initialDiagnosisFormdata.rearCamera}
                      onChange={(e) => onInputChange<InitialDiagnosis>(initialDiagnosisFormdata, setInitialDiagnosisFormdata, e)}
                    >
                      <option value="">Selecione o estado</option>
                      <option value="ok">OK</option>
                      <option value="damaged">Danificada</option>
                      <option value="not_working">Não Funciona</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm mb-2 oxanium-700" style={darkLabelStyle}>
                      Câmera Frontal
                    </label>
                    <select
                      name="frontalCamera"
                      className="w-full px-4 py-2 rounded-lg border outline-none focus:ring-2 transition-all oxanium-400"
                      style={darkInputStyle}
                      value={initialDiagnosisFormdata.frontalCamera}
                      onChange={(e) => onInputChange<InitialDiagnosis>(initialDiagnosisFormdata, setInitialDiagnosisFormdata, e)}
                    >
                      <option value="">Selecione o estado</option>
                      <option value="ok">OK</option>
                      <option value="damaged">Danificada</option>
                      <option value="not_working">Não Funciona</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm mb-2 oxanium-700" style={darkLabelStyle}>
                      Toque
                    </label>
                    <select
                      name="touch"
                      className="w-full px-4 py-2 rounded-lg border outline-none focus:ring-2 transition-all oxanium-400"
                      style={darkInputStyle}
                      value={initialDiagnosisFormdata.touch}
                      onChange={(e) => onInputChange<InitialDiagnosis>(initialDiagnosisFormdata, setInitialDiagnosisFormdata, e)}
                    >
                      <option value="">Selecione o estado</option>
                      <option value="ok">OK</option>
                      <option value="damaged">Danificado</option>
                      <option value="phantom_touch">Phantom Touch</option>
                      <option value="not_working">Não Funciona</option>
                    </select>
                  </div>
                </div>
              </fieldset>

              {/* Acessórios Entregues */}
              <fieldset className="border rounded-lg p-4" style={{ borderColor: 'rgba(0, 0, 0, 0.28)' }}>
                <legend className="text-sm oxanium-700" style={darkLabelStyle}>
                  Acessórios Entregues
                </legend>
                <div className="space-y-3 mt-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="charger"
                      name="charger"
                      checked={handedAccessoriesFormdata.charger}
                      onChange={(e) => setHandedAccessoriesFormdata({...handedAccessoriesFormdata, charger: e.currentTarget.checked})}
                      style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                    />
                    <label htmlFor="charger" className="ml-2 text-sm oxanium-400" style={darkLabelStyle}>
                      Carregador
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="cable"
                      name="cable"
                      checked={handedAccessoriesFormdata.cable}
                      onChange={(e) => setHandedAccessoriesFormdata({...handedAccessoriesFormdata, cable: e.currentTarget.checked})}
                      style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                    />
                    <label htmlFor="cable" className="ml-2 text-sm oxanium-400" style={darkLabelStyle}>
                      Cabo
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="case"
                      name="case"
                      checked={handedAccessoriesFormdata.case}
                      onChange={(e) => setHandedAccessoriesFormdata({...handedAccessoriesFormdata, case: e.currentTarget.checked})}
                      style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                    />
                    <label htmlFor="case" className="ml-2 text-sm oxanium-400" style={darkLabelStyle}>
                      Capinha
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm mb-2 oxanium-700" style={darkLabelStyle}>
                      Dispositivo de Armazenamento
                    </label>
                    <select
                      name="storageDevice"
                      className="w-full px-4 py-2 rounded-lg border outline-none focus:ring-2 transition-all oxanium-400"
                      style={darkInputStyle}
                      value={handedAccessoriesFormdata.storageDevice}
                      onChange={(e) => onInputChange<HandedAccessories>(handedAccessoriesFormdata, setHandedAccessoriesFormdata, e)}
                    >
                      <option value="">Nenhum</option>
                      <option value="sd_card">Cartão SD</option>
                      <option value="flash_drive">Pen Drive</option>
                      <option value="external_hdd">HD Externo</option>
                      <option value="external_ssd">SSD Externo</option>
                    </select>
                  </div>
                </div>
              </fieldset>

              <NeogenButton type="submit" style={{ backgroundColor: "#0f172a" }}>
                Salvar Dispositivo
              </NeogenButton>
            </form>
        </div>
      </div>
    </div>
  );
}

export default DeviceForm;
