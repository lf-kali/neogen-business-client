import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import NeogenInput from "../neogen/keyboard-input/neogen-input/NeogenInput";
import NeogenButton from "../neogen/neogen-button/NeogenButton";
import type { CreateCostumer, UpdateCostumer } from "../../features/costumer/costumer.types";
import { costumerRepository } from "../../features/costumer/costumer.repository";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

function CustomerForm() {
  const {handleLogout} = useAuth();
  const navigate = useNavigate();
  const {id} = useParams<{id:string}>();
  
  const [customerFormData, setCustomerFormData ] = useState<CreateCostumer | UpdateCostumer>({
    name: '',
    email: '',
    phone: '',
    address: '',
    cep: '',
    cpf: '',
    cnpj: '',
  });

  async function getCustomer(id: number) {
    try {
      const customer = await costumerRepository.getById(id);
      setCustomerFormData(customer)
      
    } catch (error: any) {
      if(error.toString().includes('401')) handleLogout();
    }
    
  }
  useEffect(()=>{
    if (id) {
      getCustomer(+id)
    }
  },[id])

  function onInputChange(e: ChangeEvent<HTMLInputElement>) {
    setCustomerFormData({
      ...customerFormData,
      [e.target.name]: e.target.value,
    })
  }
  
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(customerFormData)

    try {
      if (!id) await costumerRepository.create(customerFormData as CreateCostumer);
      else await costumerRepository.update(+id, customerFormData as UpdateCostumer);
      navigate('/customers');
    }
    catch (e) {
      alert("Erro ao salvar cliente!")
      console.error("Erro ao salvar cliente: ", e)
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
              <h2 className="text-xl sm:text-2xl michroma-700 text-[#0f172a]">{id ? 'Editar dados de cliente' : 'Novo cliente'}</h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-500 oxanium-400">
                Preencha as informações para iniciar o relacionamento.
              </p>
            </div>

            <form className="space-y-4 sm:space-y-5" onSubmit={onSubmit}>
              <NeogenInput
                label="Nome completo"
                type="text"
                id="name"
                name="name"
                placeholder="Nome do cliente"
                value={customerFormData.name}
                labelStyle={darkLabelStyle}
                inputStyle={darkInputStyle}
                onChange={(e: ChangeEvent<HTMLInputElement>) => onInputChange(e)}
              />

              <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
                <NeogenInput
                  label="Email"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="cliente@email.com"
                  value={customerFormData.email}
                  labelStyle={darkLabelStyle}
                  inputStyle={darkInputStyle}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => onInputChange(e)}
                />
                <NeogenInput
                  label="Telefone"
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="(11) 99999-0000"
                  value={customerFormData.phone}
                  labelStyle={darkLabelStyle}
                  inputStyle={darkInputStyle}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => onInputChange(e)}
                />
              </div>

              <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
                <NeogenInput
                  label="CPF"
                  type="text"
                  id="cpf"
                  name="cpf"
                  placeholder="000.000.000-00"
                  value={customerFormData.cpf}
                  labelStyle={darkLabelStyle}
                  inputStyle={darkInputStyle}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => onInputChange(e)}
                />
                <NeogenInput
                  label="CNPJ (opcional)"
                  type="text"
                  id="cnpj"
                  name="cnpj"
                  value={customerFormData.cnpj}
                  placeholder="00.000.000/0001-00"
                  labelStyle={darkLabelStyle}
                  inputStyle={darkInputStyle}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => onInputChange(e)}
                />
              </div>

              <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
                <NeogenInput
                  label="CEP"
                  type="text"
                  id="cep"
                  name="cep"
                  value={customerFormData.cep}
                  placeholder="00000-000"
                  labelStyle={darkLabelStyle}
                  inputStyle={darkInputStyle}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => onInputChange(e)}
                />
                <NeogenInput
                  label="Endereço"
                  type="text"
                  id="address"
                  value={customerFormData.address}
                  name="address"
                  placeholder="Rua, número, complemento"
                  labelStyle={darkLabelStyle}
                  inputStyle={darkInputStyle}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => onInputChange(e)}
                />
              </div>

              <NeogenButton type="submit" style={{ backgroundColor: "#0f172a" }}>
                Salvar cliente
              </NeogenButton>
            </form>

            <div className="mt-4 sm:mt-6 rounded-2xl border border-slate-200 bg-slate-50 px-3 sm:px-4 py-2 sm:py-3 text-xs text-slate-500 oxanium-400">
              Prefere cadastrar múltiplos contatos? Em breve módulo de contatos avançados.
            </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerForm;
