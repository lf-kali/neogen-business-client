import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import type { CreatePortableDevice, DeviceCategory, HandedAccessories, InitialDiagnosis, PortableDevice, UpdatePortableDevice } from "../../features/device/types/device.types";
import { useEffect, useState, type ChangeEvent, type Dispatch, type FormEvent, type SetStateAction } from "react";
import type { DeviceBrand } from "../../features/deviceBrand/types/deviceBrand.types";
import type { DeviceModel } from "../../features/deviceModel/deviceModel.types";
import { portableDeviceSearchRepository } from "../../features/device/repository/portableDeviceSearch.repository";
import NeogenTextarea from "../neogen/keyboard-input/neogen-textarea/NeogenTextarea";
import Select from "react-select";
import NeogenInput from "../neogen/keyboard-input/neogen-input/NeogenInput";
import NeogenButton from "../neogen/neogen-button/NeogenButton";
import { useDevicebrands } from "../../features/deviceBrand/hooks/useDeviceBrands";
import type { PortableDeviceRepository } from "../../features/device/hooks/usePortableDeviceRepository";
import { cellphoneRepository } from "../../features/device/repository/cellphone.repository";
import { laptopRepository } from "../../features/device/repository/laptop.repository";


type DeviceFormProps = {
  entityId?: number;
  onCreated?: (device: PortableDevice) => void;
  onUpdated?: (device: PortableDevice) => void;
};

type DeviceFormData = {
  problemDescription: string;
  type?: DeviceCategory;
  brandId: number;
  modelId: number;
}

function DeviceForm({ entityId, onCreated, onUpdated }: DeviceFormProps) {

  // Base: Autenticação e navegação
  const {handleLogout} = useAuth();
  const navigate = useNavigate();

  // Marcas de celular
  const {brandList: cellphoneBrands} = useDevicebrands("Cellphone")

  // Marcas de laptop
  const {brandList: laptopBrands} = useDevicebrands("Laptop");

  // Armazenar marcas de dispositivos
  const [deviceBrands, setDeviceBrands] = useState<DeviceBrand[]>([]);
  const [brandOptions, setBrandOptions] = useState<{value: number, label: string}[]>([])
  const [selectedBrand, setSelectedBrand] = useState<{value: number, label: string} | null> (null);

  // Armazenar modelos de dispositicvos
  const [modelOptions, setModelOptions] = useState<{value: number, label: string}[]>([]);
  const [selectedModel, setSelectedModel] = useState<{value: number, label: string} | null>(null);

  // Dados do formulário: Dispositivo
  const [deviceFormData, setDeviceFormData ] = useState<DeviceFormData>({
    problemDescription: '',
    type: undefined,
    brandId: 0,
    modelId: 0,
  });

  // Dados do formulário: Diagnóstico inicial
  const [initialDiagnosisFormdata, setInitialDiagnosisFormdata] = useState<InitialDiagnosis>({
    externalState: '',
    turnsOn: false,
    audio: '',
    screen: undefined,
    battery: undefined,
    rearCamera: undefined,
    frontalCamera: undefined,
    notes: undefined,
  });

  // Dados do formulário: Acessórios
  const [handedAccessoriesFormdata, setHandedAccessoriesFormdata] = useState<HandedAccessories>({
    charger: false,
    cable: false,
    case: false,
    storageDevice: undefined,
    other: undefined,
  });

  // Carregar dispositivo por id
  async function getDevice(id: number) {
    try {
      const device = await portableDeviceSearchRepository.getById(id);
      setDeviceFormData({problemDescription: device.problemDescription, type: device.type, brandId: device.brand.id, modelId: device.model.id,});
      setInitialDiagnosisFormdata(device.initialDiagnosis);
      setHandedAccessoriesFormdata(device.handedAccessories);
      
      if (device.type) {
        const listMap: Record<DeviceCategory, DeviceBrand[]> = {
          Cellphone: cellphoneBrands,
          Laptop: laptopBrands,
        };
        const brandList = listMap[device.type];
        setDeviceBrands(brandList);
        setBrandOptions(brandList.map((brand: DeviceBrand) => ({ value: brand.id, label: brand.name })));
        setSelectedBrand({ value: device.brand.id, label: device.brand.name });
        setSelectedModel({ value: device.model.id, label: device.model.name });
        setModelOptions(device.brand.models.map((model: DeviceModel) => ({ value: model.id, label: model.name })));
      }
      
    } catch (error: any) {
      if(error.toString().includes('401')) handleLogout()
    }
    
  }
  useEffect(()=>{
    if (entityId) {
      getDevice(+entityId)
    }
  },[entityId]);

  useEffect(() => {
    if (deviceFormData.type) {
      const listMap: Record<DeviceCategory, DeviceBrand[]> = {
        Cellphone: cellphoneBrands,
        Laptop: laptopBrands,
      };
      const brandList = listMap[deviceFormData.type];
      setDeviceBrands(brandList);
      setBrandOptions(brandList.map((brand: DeviceBrand) => ({ value: brand.id, label: brand.name })));
    } else {
      setDeviceBrands([]);
      setBrandOptions([]);
    }
  }, [deviceFormData.type, cellphoneBrands, laptopBrands]);

  // Evento de mudança de tipo de dispositivo
  function onTypeChange(e: ChangeEvent<HTMLSelectElement>) {
    const newType = e.target.value as DeviceCategory;
    setDeviceFormData(prev => ({
      ...prev,
      type: newType,
    }));
    const listMap: Record<DeviceCategory, DeviceBrand[]> = {
      Cellphone: cellphoneBrands,
      Laptop: laptopBrands,
    };
    const brandList = newType ? listMap[newType] : [];
    setDeviceBrands(brandList);
    setBrandOptions(brandList.map(brand => ({ value: brand.id, label: brand.name })));
    setSelectedBrand(null);
    setSelectedModel(null);
    setModelOptions([]);
  }

  // Atualizar dados do formulário com mudança de input
  function onInputChange<T>(data: T, setData: Dispatch<SetStateAction<T>>, e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    })
  }

  // Evento de mudança de marca
  function onBrandChange(selected: {value: number, label: string} | null){
    setSelectedBrand(selected);
    if (selected) {
      const brand = deviceBrands.find(b => b.id === selected.value);
      if (brand) {
        setModelOptions(brand.models.map((model: DeviceModel) => ({ value: model.id, label: model.name })));
        setDeviceFormData({
          ...deviceFormData,
          brandId: selected.value
        })
      }
    } else {
      setModelOptions([]);
    }
    setSelectedModel(null);
  }

  // Evento de mudança de Modelo
  function onModelChange(selectedOption: {value: number, label: string} | null) {
    setSelectedModel(selectedOption);
    setDeviceFormData(prev => ({ ...prev, modelId: selectedOption?.value ?? 0 }));
  }

  // Evento de envio de formulário
  async function onSubmit(e: FormEvent<HTMLFormElement>) {

    const repoMap: Record<DeviceCategory, PortableDeviceRepository> = {
      Cellphone: cellphoneRepository,
      Laptop: laptopRepository,
    }

    const repo = repoMap[deviceFormData.type as DeviceCategory]

    e.preventDefault();
    const payload: CreatePortableDevice | UpdatePortableDevice= {
      ...deviceFormData,
      brandId: +deviceFormData.brandId,
      modelId: +deviceFormData.modelId,
      initialDiagnosis: initialDiagnosisFormdata,
      handedAccessories: handedAccessoriesFormdata
    } 

    console.log(payload)

    try {
      if (!entityId) {
        const created = await repo.create(payload as CreatePortableDevice);
        if (onCreated) {
          onCreated(created);
          return;
        }
      } else {
        await repo.update(+entityId, payload as UpdatePortableDevice);
      }
      navigate('/devices');
    }
    catch (e) {
      alert("Erro ao salvar dispositivo!")
      console.error("Erro ao salvar dispositivo: ", e)
    }
  }

  // Estilos de Label e input
  const darkLabelStyle = { color: "rgba(0, 0, 0, 0.75)" };
  const darkInputStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.92)",
    borderColor: "rgba(0, 0, 0, 0.28)",
    color: "#0f172a",
  };

  // Html + CSS
  return (
    <div
      className="flex flex-col items-center px-4 md:py-6 sm:py-10"
      style={{ background: "linear-gradient(135deg, #f5f8ff 0%, #edf2ff 45%, #f8fafc 100%)" }}
    >
      <div className="w-full max-w-2xl lg:max-w-6xl rounded-[32px] bg-white/75 shadow-2xl backdrop-blur border border-white/60 overflow-hidden">
        <div className="p-3 sm:p-8 lg:p-12">
            <div className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl michroma-700 text-[#0f172a]">{entityId ? 'Editar dados de Dispositivo' : 'Novo Dispositivo'}</h2>
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
                  id="type"
                  name="type"
                  value={deviceFormData.type || ''}
                  onChange={onTypeChange}
                  className="w-full px-4 py-2 rounded-lg border outline-none focus:ring-2 transition-all oxanium-400"
                  style={darkInputStyle}
                >
                  <option value="">Selecione uma categoria</option>
                  <option value="Cellphone">Celular</option>
                  <option value="Laptop">Notebook</option>
                </select>
              </div>

              {/* Brand e Model */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2 oxanium-700" style={darkLabelStyle}>
                    Marca
                  </label>
                  <Select
                    options={brandOptions}
                    value={selectedBrand}
                    onChange={onBrandChange}
                    isSearchable
                    placeholder="Selecione a marca..."
                    styles={{
                      control: (base) => ({
                        ...base,
                        backgroundColor: "rgba(255, 255, 255, 0.92)",
                        borderColor: "rgba(0, 0, 0, 0.28)",
                        color: "#0f172a",
                        borderRadius: "0.375rem",
                        padding: "0.25rem",
                        minHeight: "2.5rem",
                      }),
                      input: (base) => ({ ...base, color: "#0f172a" }),
                      option: (base, state) => ({
                        ...base,
                        backgroundColor: state.isSelected ? "#0f172a" : state.isFocused ? "#f1f5f9" : "white",
                        color: state.isSelected ? "white" : "#0f172a",
                      }),
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2 oxanium-700" style={darkLabelStyle}>
                    Modelo
                  </label>
                  <Select
                    options={modelOptions}
                    value={selectedModel}
                    onChange={onModelChange}
                    isSearchable
                    isDisabled={!selectedBrand}
                    placeholder={selectedBrand ? "Selecione o modelo..." : "Selecione uma marca primeiro"}
                    styles={{
                      control: (base) => ({
                        ...base,
                        backgroundColor: "rgba(255, 255, 255, 0.92)",
                        borderColor: "rgba(0, 0, 0, 0.28)",
                        color: "#0f172a",
                        borderRadius: "0.375rem",
                        padding: "0.25rem",
                        minHeight: "2.5rem",
                      }),
                      input: (base) => ({ ...base, color: "#0f172a" }),
                      option: (base, state) => ({
                        ...base,
                        backgroundColor: state.isSelected ? "#0f172a" : state.isFocused ? "#f1f5f9" : "white",
                        color: state.isSelected ? "white" : "#0f172a",
                      }),
                    }}
                  />
                </div>
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
                  <NeogenTextarea
                    label="Notas"
                    id="notes"
                    name="notes"
                    placeholder="Observações adicionais."
                    rows={4}
                    labelStyle={darkLabelStyle}
                    inputStyle={darkInputStyle}
                    value={initialDiagnosisFormdata.notes}
                    onChange={(e) => onInputChange<InitialDiagnosis>(initialDiagnosisFormdata, setInitialDiagnosisFormdata, e)}
                  />
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
                  <NeogenInput
                    label="Outros"
                    id="other"
                    type="text"
                    name="other"
                    placeholder="Por favor, especifique."
                    labelStyle={darkLabelStyle}
                    inputStyle={darkInputStyle}
                    value={handedAccessoriesFormdata.other}
                    onChange={(e) => onInputChange<HandedAccessories>(handedAccessoriesFormdata, setHandedAccessoriesFormdata, e)}
                  />
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

export default DeviceForm