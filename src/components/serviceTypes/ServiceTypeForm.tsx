import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { type CreateServiceType, type UpdateServiceType } from "../../features/serviceType/serviceType.types";
import { serviceTypeRepository } from "../../features/serviceType/serviceType.repository";
import NeogenInput from "../neogen/keyboard-input/neogen-input/NeogenInput";
import NeogenButton from "../neogen/neogen-button/NeogenButton";

function ServiceTypeForm() {
  const {handleLogout} = useAuth();
  const navigate = useNavigate();
  const {id} = useParams<{id: string}>();

  const [serviceTypeFormData, setServiceTypeFormData] = useState<CreateServiceType | UpdateServiceType>({
    name: '',
    costPrice: undefined,
    salePrice: undefined,
    comissionPercent: undefined,
    desc: '',
  });

  async function getServiceType(id: number) {
    try {
      const serviceType = await serviceTypeRepository.getById(id);
      setServiceTypeFormData(serviceType);
    } catch (error: any) {
      if(error.toString().includes('401')) handleLogout();
    }
  }
  
  useEffect(() => {
    if (id) getServiceType(+id);
  },[id]);

  function onInputChange(e: ChangeEvent<HTMLInputElement>) {
    const {name, value} = e.target;
    const numericFields = ['costPrice', 'salePrice', 'comissionPercent'];

    setServiceTypeFormData({
      ...serviceTypeFormData,
      [name]: numericFields.includes(name) ? (value ? parseFloat(value) : undefined) : value,
    });
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(serviceTypeFormData);

    try {
      if (!id) await serviceTypeRepository.create(serviceTypeFormData as CreateServiceType);
      else await serviceTypeRepository.update(+id, serviceTypeFormData as UpdateServiceType);
      navigate('/service-types');
    }
    catch (error: any) {
      alert("Erro ao salvar Serviço!");
      console.error("Erro ao salvar serviço: ", e);
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
              <h2 className="text-xl sm:text-2xl michroma-700 text-[#0f172a]">{id ? 'Editar dados de serviço' : 'Novo serviço'}</h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-500 oxanium-400">
                Preencha as informações para adicionar o serviço ao catálogo.
              </p>
            </div>

            <form className="space-y-4 sm:space-y-5" onSubmit={onSubmit}>
              <NeogenInput
                label="Nome do serviço"
                type="text"
                id="name"
                name="name"
                placeholder="Nome do serviço"
                value={serviceTypeFormData.name}
                labelStyle={darkLabelStyle}
                inputStyle={darkInputStyle}
                onChange={(e: ChangeEvent<HTMLInputElement>) => onInputChange(e)}
              />

              {/* <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
                <NeogenInput
                  label="SKU"
                  type="text"
                  id="sku"
                  name="sku"
                  placeholder="SKU-001"
                  value={serviceTypeFormData.sku}
                  labelStyle={darkLabelStyle}
                  inputStyle={darkInputStyle}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => onInputChange(e)}
                />
                <NeogenInput
                  label="Código de Barras (opcional)"
                  type="text"
                  id="barCode"
                  name="barCode"
                  placeholder="123456789012"
                  value={serviceTypeFormData.barCode || ''}
                  labelStyle={darkLabelStyle}
                  inputStyle={darkInputStyle}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => onInputChange(e)}
                />
              </div> */}

              <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
                <NeogenInput
                  label="Preço de Custo"
                  type="number"
                  id="costPrice"
                  name="costPrice"
                  placeholder="0.00"
                  step="0.01"
                  value={serviceTypeFormData.costPrice}
                  labelStyle={darkLabelStyle}
                  inputStyle={darkInputStyle}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => onInputChange(e)}
                />
                <NeogenInput
                  label="Preço de Venda"
                  type="number"
                  id="salePrice"
                  name="salePrice"
                  placeholder="0.00"
                  step="0.01"
                  value={serviceTypeFormData.salePrice}
                  labelStyle={darkLabelStyle}
                  inputStyle={darkInputStyle}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => onInputChange(e)}
                />
              </div>

              <NeogenInput
                label="Comissão (%)"
                type="number"
                id="comissionPercent"
                name="comissionPercent"
                placeholder="0"
                value={serviceTypeFormData.comissionPercent || ''}
                labelStyle={darkLabelStyle}
                inputStyle={darkInputStyle}
                onChange={(e: ChangeEvent<HTMLInputElement>) => onInputChange(e)}
              />

              <NeogenInput
                label="Descrição (opcional)"
                type="text"
                id="desc"
                name="desc"
                placeholder="Descrição do serviço"
                value={serviceTypeFormData.desc || ''}
                labelStyle={darkLabelStyle}
                inputStyle={darkInputStyle}
                onChange={(e: ChangeEvent<HTMLInputElement>) => onInputChange(e)}
              />

              <NeogenButton type="submit" style={{ backgroundColor: "#0f172a" }}>
                Salvar serviço
              </NeogenButton>
            </form>

            <div className="mt-4 sm:mt-6 rounded-2xl border border-slate-200 bg-slate-50 px-3 sm:px-4 py-2 sm:py-3 text-xs text-slate-500 oxanium-400">
              Galeria de imagens e variações de serviços estarão disponíveis em breve.
            </div>
        </div>
      </div>
    </div>
  )
}

export default ServiceTypeForm