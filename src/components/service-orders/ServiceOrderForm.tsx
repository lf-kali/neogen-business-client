import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Select, { type SingleValue } from "react-select";
import Popup from "reactjs-popup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faFileCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../contexts/AuthContext";
import type {
  ServiceOrderStatus,
  CreateServiceOrder,
} from "../../features/serviceOrder/serviceOrder.types";
import { serviceOrderRepository } from "../../features/serviceOrder/serviceOrder.repository";
import { useCostumers } from "../../features/costumer/useCostumers";
import type { Costumer } from "../../features/costumer/costumer.types";
import CustomerForm from "../customers/CustomerForm";
import type { PortableDevice } from "../../features/device/types/device.types";
import { useDevices } from "../../features/device/hooks/useDevices";
import DeviceForm from "../devices/DeviceForm";
import type { Product } from "../../features/product/product.types";
import { useProducts } from "../../features/product/useProducts";
import ProductForm from "../product/ProductForm";
import type { ServiceType } from "../../features/serviceType/serviceType.types";
import { useServiceTypes } from "../../features/serviceType/useServiceTypes";
import ServiceTypeForm from "../serviceTypes/ServiceTypeForm";
import { technicianRepository } from "../../features/technician/technician.repository";
import type { Technician } from "../../features/technician/technician.types";
import NeogenInput from "../neogen/keyboard-input/neogen-input/NeogenInput";
import NeogenTextarea from "../neogen/keyboard-input/neogen-textarea/NeogenTextarea";
import NeogenButton from "../neogen/neogen-button/NeogenButton";

type SelectOption = { value: number; label: string };

type LocalServiceOrderFormData = Omit<CreateServiceOrder, "deadline" | "productIDs"> & {
  deadline: string;
  productIDs: number[];
};

const statusOptions: Array<{ value: ServiceOrderStatus; label: string }> = [
  { value: "pending", label: "Pendente" },
  { value: "confirmed", label: "Confirmado" },
  { value: "acquiring_parts", label: "Aguardando peças" },
  { value: "ongoing", label: "Em andamento" },
  { value: "finished", label: "Finalizado" },
  { value: "cancelled", label: "Cancelado" },
];

const buildTechnicianOptionLabel = (technician: Technician) => `${technician.name} (${technician.email ?? "sem email"})`;
const buildCostumerOptionLabel = (costumer: Costumer) => costumer.name;
const buildDeviceOptionLabel = (device: PortableDevice) => `${device.brand?.name ?? "Marca"} ${device.model?.name ?? "Modelo"} - ${device.id}`;
const buildProductOptionLabel = (product: Product) => product.name;
const buildServiceTypeOptionLabel = (serviceType: ServiceType) => serviceType.name;

function ServiceOrderForm() {
  const { handleLogout } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { costumers, reload: reloadCostumers } = useCostumers();
  const { devices, reload: reloadDevices } = useDevices();
  const { products, reload: reloadProducts } = useProducts();
  const { serviceTypes, reload: reloadServiceTypes } = useServiceTypes();

  const [technicians, setTechnicians] = useState<Technician[]>([]);

  const [serviceOrderFormData, setServiceOrderFormData] = useState<LocalServiceOrderFormData>({
    deadline: "",
    status: "pending",
    techNotes: "",
    technicianId: 0,
    costumerId: 0,
    deviceIDs: [],
    productIDs: [],
    serviceTypeIDs: [],
  });

  const [selectedTechnician, setSelectedTechnician] = useState<SelectOption | null>(null);
  const [selectedCostumer, setSelectedCostumer] = useState<SelectOption | null>(null);
  const [deviceSelectItems, setDeviceSelectItems] = useState<Array<SelectOption | null>>([null]);
  const [productSelectItems, setProductSelectItems] = useState<Array<SelectOption | null>>([null]);
  const [serviceTypeSelectItems, setServiceTypeSelectItems] = useState<Array<SelectOption | null>>([null]);

  const [isCustomerModalOpen, setCustomerModalOpen] = useState(false);
  const [isDeviceModalOpen, setDeviceModalOpen] = useState(false);
  const [isProductModalOpen, setProductModalOpen] = useState(false);
  const [isServiceTypeModalOpen, setServiceTypeModalOpen] = useState(false);

  useEffect(() => {
    const loadTechnicians = async () => {
      try {
        const data = await technicianRepository.list();
        console.log("Loaded technicians:", data);
        setTechnicians(data);
      } catch (error: any) {
        console.error("Erro ao carregar técnicos:", error);
      }
    };

    void loadTechnicians();
  }, []);

  // Sync selectedTechnician with technicianId when technicians are loaded
  useEffect(() => {
    if (technicians.length > 0 && serviceOrderFormData.technicianId > 0 && !selectedTechnician) {
      const option = technicianOptions.find(opt => opt.value === serviceOrderFormData.technicianId);
      if (option) {
        console.log("Syncing selectedTechnician with technicianId:", serviceOrderFormData.technicianId);
        setSelectedTechnician(option);
      }
    }
  }, [technicians, serviceOrderFormData.technicianId, selectedTechnician]);

  // Sync selectedCostumer with costumerId when costumers are loaded
  useEffect(() => {
    if (costumers.length > 0 && serviceOrderFormData.costumerId > 0 && !selectedCostumer) {
      const option = customerOptions.find(opt => opt.value === serviceOrderFormData.costumerId);
      if (option) {
        console.log("Syncing selectedCostumer with costumerId:", serviceOrderFormData.costumerId);
        setSelectedCostumer(option);
      }
    }
  }, [costumers, serviceOrderFormData.costumerId, selectedCostumer]);

  useEffect(() => {

    const loadServiceOrder = async () => {
      try {
        const order = await serviceOrderRepository.getById(+id!);
        console.log("Loaded service order:", order);
        setServiceOrderFormData({
          deadline: order.deadline || "",
          status: order.status,
          techNotes: order.techNotes || "",
          technicianId: order.technician.id,
          costumerId: order.costumer.id,
          deviceIDs: order.devices.map((device) => device.id),
          productIDs: order.products?.map((product) => product.id) ?? [],
          serviceTypeIDs: order.services.map((serviceType) => serviceType.id),
        });
        console.log("Set serviceOrderFormData.technicianId to:", order.technician.id);
        // Use technicianOptions when available, otherwise create the object
        const technicianOption = technicianOptions.find(opt => opt.value === order.technician.id);
        setSelectedTechnician(technicianOption || {
          value: order.technician.id,
          label: buildTechnicianOptionLabel(order.technician),
        });
        const costumerOption = customerOptions.find(opt => opt.value === order.costumer.id);
        setSelectedCostumer(costumerOption || {
          value: order.costumer.id,
          label: buildCostumerOptionLabel(order.costumer),
        });
        setDeviceSelectItems(
          order.devices.length > 0
            ? order.devices.map((device) => ({
                value: device.id,
                label: buildDeviceOptionLabel(device),
              }))
            : [null],
        );
        setProductSelectItems(
          order.products && order.products.length > 0
            ? order.products.map((product) => ({
                value: product.id,
                label: buildProductOptionLabel(product),
              }))
            : [null],
        );
        setServiceTypeSelectItems(
          order.services.length > 0
            ? order.services.map((serviceType) => ({
                value: serviceType.id,
                label: buildServiceTypeOptionLabel(serviceType),
              }))
            : [null],
        );
      } catch (error: any) {
        if (error?.toString?.().includes("401")) {
          handleLogout();
        } else {
          console.error("Erro ao carregar ordem de serviço:", error);
        }
      }
    };

    void loadServiceOrder();
  }, [id, handleLogout]);

  const technicianOptions = technicians
    .filter((technician) => {
      const isValid = technician.id != null && technician.id !== undefined && typeof technician.id === 'number' && technician.id > 0;
      if (!isValid) {
        console.error("Technician with invalid ID found and filtered out:", technician);
      }
      return isValid;
    })
    .map((technician) => ({
      value: technician.id,
      label: buildTechnicianOptionLabel(technician),
    }));

  console.log("Technician options (filtered):", technicianOptions);

  const customerOptions = costumers.map((costumer) => ({
    value: costumer.id,
    label: buildCostumerOptionLabel(costumer),
  }));

  const deviceOptions = devices.map((device) => ({
    value: device.id,
    label: buildDeviceOptionLabel(device),
  }));

  const productOptions = products.map((product) => ({
    value: product.id,
    label: buildProductOptionLabel(product),
  }));

  const serviceTypeOptions = serviceTypes.map((serviceType) => ({
    value: serviceType.id,
    label: buildServiceTypeOptionLabel(serviceType),
  }));

  const handleFieldChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setServiceOrderFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTechnicianChange = (selected: SingleValue<SelectOption>) => {
    console.log("handleTechnicianChange called with:", selected);
    setSelectedTechnician(selected);
    setServiceOrderFormData((prev) => {
      const newData = {
        ...prev,
        technicianId: selected?.value ?? 0,
      };
      console.log("Updated serviceOrderFormData.technicianId to:", newData.technicianId);
      return newData;
    });
  };

  const handleCostumerChange = (selected: SingleValue<SelectOption>) => {
    console.log("handleCostumerChange called with:", selected);
    setSelectedCostumer(selected);
    setServiceOrderFormData((prev) => {
      const newData = {
        ...prev,
        costumerId: selected?.value ?? 0,
      };
      console.log("Updated serviceOrderFormData.costumerId to:", newData.costumerId);
      return newData;
    });
  };

  const updateDeviceSelection = (
    index: number,
    selected: SingleValue<SelectOption>,
  ) => {
    const next = [...deviceSelectItems];
    next[index] = selected ?? null;
    setDeviceSelectItems(next);

    const deviceIDs = next.filter(Boolean).map((item) => item!.value);
    setServiceOrderFormData((prev) => ({
      ...prev,
      deviceIDs,
    }));

    return;
  };

  const updateProductSelection = (
    index: number,
    selected: SingleValue<SelectOption>,
  ) => {
    const next = [...productSelectItems];
    next[index] = selected ?? null;
    setProductSelectItems(next);

    const productIDs = next.filter(Boolean).map((item) => item!.value);
    setServiceOrderFormData((prev) => ({
      ...prev,
      productIDs,
    }));

  };

  const updateServiceTypeSelection = (
    index: number,
    selected: SingleValue<SelectOption>,
  ) => {
    const next = [...serviceTypeSelectItems];
    next[index] = selected ?? null;
    setServiceTypeSelectItems(next);

    const serviceTypeIDs = next.filter(Boolean).map((item) => item!.value);
    setServiceOrderFormData((prev) => ({
      ...prev,
      serviceTypeIDs,
    }));

  };

  const addDeviceRow = () => {
    setDeviceSelectItems((prev) => [...prev, null]);
  };

  const addProductRow = () => {
    setProductSelectItems((prev) => [...prev, null]);
  };

  const addServiceTypeRow = () => {
    setServiceTypeSelectItems((prev) => [...prev, null]);
  };

  const removeDeviceRow = (index: number) => {
    if (deviceSelectItems.length <= 1 || index === 0) {
      return;
    }

    const next = deviceSelectItems.filter((_, i) => i !== index);
    setDeviceSelectItems(next);

    const deviceIDs = next.filter(Boolean).map((item) => item!.value);
    setServiceOrderFormData((prev) => ({
      ...prev,
      deviceIDs,
    }));
  };

  const removeProductRow = (index: number) => {
    if (productSelectItems.length <= 1 || index === 0) {
      return;
    }

    const next = productSelectItems.filter((_, i) => i !== index);
    setProductSelectItems(next);

    const productIDs = next.filter(Boolean).map((item) => item!.value);
    setServiceOrderFormData((prev) => ({
      ...prev,
      productIDs,
    }));
  };

  const removeServiceTypeRow = (index: number) => {
    if (serviceTypeSelectItems.length <= 1 || index === 0) {
      return;
    }

    const next = serviceTypeSelectItems.filter((_, i) => i !== index);
    setServiceTypeSelectItems(next);

    const serviceTypeIDs = next.filter(Boolean).map((item) => item!.value);
    setServiceOrderFormData((prev) => ({
      ...prev,
      serviceTypeIDs,
    }));
  };

  const handleCustomerCreated = (newCustomer: Costumer) => {
    setCustomerModalOpen(false);
    reloadCostumers();
    const option = { value: newCustomer.id, label: newCustomer.name };
    setSelectedCostumer(option);
    setServiceOrderFormData((prev) => ({
      ...prev,
      costumerId: newCustomer.id,
    }));
  };

  const handleDeviceCreated = (newDevice: PortableDevice) => {
    setDeviceModalOpen(false);
    reloadDevices();
    const option = {
      value: newDevice.id,
      label: buildDeviceOptionLabel(newDevice),
    };
    setDeviceSelectItems((prev) => {
      const next = [...prev];
      const emptyIndex = next.findIndex((item) => item === null);
      if (emptyIndex >= 0) {
        next[emptyIndex] = option;
        return next;
      }
      return [...next, option];
    });
    setServiceOrderFormData((prev) => ({
      ...prev,
      deviceIDs: [...prev.deviceIDs, newDevice.id],
    }));
  };

  const handleProductCreated = (newProduct: Product) => {
    setProductModalOpen(false);
    reloadProducts();
    const option = { value: newProduct.id, label: newProduct.name };
    setProductSelectItems((prev) => {
      const next = [...prev];
      const emptyIndex = next.findIndex((item) => item === null);
      if (emptyIndex >= 0) {
        next[emptyIndex] = option;
        return next;
      }
      return [...next, option];
    });
    setServiceOrderFormData((prev) => ({
      ...prev,
      productIDs: [...prev.productIDs, newProduct.id],
    }));
  };

  const handleServiceTypeCreated = (newServiceType: ServiceType) => {
    setServiceTypeModalOpen(false);
    reloadServiceTypes();
    const option = { value: newServiceType.id, label: newServiceType.name };
    setServiceTypeSelectItems((prev) => {
      const next = [...prev];
      const emptyIndex = next.findIndex((item) => item === null);
      if (emptyIndex >= 0) {
        next[emptyIndex] = option;
        return next;
      }
      return [...next, option];
    });
    setServiceOrderFormData((prev) => ({
      ...prev,
      serviceTypeIDs: [...prev.serviceTypeIDs, newServiceType.id],
    }));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("onSubmit called with serviceOrderFormData:", serviceOrderFormData);

    if (!serviceOrderFormData.deadline) {
      alert("O prazo da ordem de serviço é obrigatório.");
      return;
    }

    if (!serviceOrderFormData.technicianId || serviceOrderFormData.technicianId === 0) {
      alert("O técnico responsável é obrigatório.");
      return;
    }

    if (!serviceOrderFormData.costumerId || serviceOrderFormData.costumerId === 0) {
      alert("O cliente é obrigatório.");
      return;
    }

    if (serviceOrderFormData.deviceIDs.length === 0) {
      alert("Pelo menos um dispositivo deve ser selecionado.");
      return;
    }

    try {
      const payload: CreateServiceOrder = {
        deadline: serviceOrderFormData.deadline,
        status: serviceOrderFormData.status,
        techNotes: serviceOrderFormData.techNotes || undefined,
        technicianId: serviceOrderFormData.technicianId,
        costumerId: serviceOrderFormData.costumerId,
        deviceIDs: serviceOrderFormData.deviceIDs,
        productIDs: serviceOrderFormData.productIDs.length
          ? serviceOrderFormData.productIDs
          : undefined,
        serviceTypeIDs: serviceOrderFormData.serviceTypeIDs,
      };

      console.log("Payload to send:", payload);

      if (!id) {
        await serviceOrderRepository.create(payload);
      } else {
        await serviceOrderRepository.update(+id, payload);
      }
      navigate("/service-orders");
    } catch (error: any) {
      alert("Erro ao salvar ordem de serviço.");
      console.error("Erro ao salvar ordem de serviço:", error);
    }
  };

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
      <div className="w-full max-w-2xl lg:max-w-6xl rounded-4xl bg-white/75 shadow-2xl backdrop-blur border border-white/60 overflow-hidden">
        <div className="p-3 sm:p-8 lg:p-12">
          <div className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl michroma-700 text-[#0f172a]">
              {id ? "Editar Ordem de Serviço" : "Nova Ordem de Serviço"}
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-500 oxanium-400">
              Preencha os dados principais e adicione os relacionamentos necessários para a ordem.
            </p>
          </div>

          <form className="space-y-8" onSubmit={onSubmit}>
            <section className="rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 michroma-600">Dados principais</h3>
                  <p className="mt-2 text-sm text-slate-500 oxanium-400">
                    Campos não relacionais da ordem de serviço.
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <NeogenInput
                  label="Prazo"
                  type="date"
                  id="deadline"
                  name="deadline"
                  value={serviceOrderFormData.deadline}
                  labelStyle={darkLabelStyle}
                  inputStyle={darkInputStyle}
                  onChange={handleFieldChange}
                />
                <div>
                  <label htmlFor="status" className="block text-sm font-medium mb-2" style={darkLabelStyle}>
                    Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={serviceOrderFormData.status}
                    onChange={handleFieldChange}
                    className="neogen-input w-full"
                    style={darkInputStyle}
                  >
                    {statusOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-6">
                <NeogenTextarea
                  label="Anotações técnicas"
                  id="techNotes"
                  name="techNotes"
                  placeholder="Escreva observações para o técnico"
                  rows={4}
                  labelStyle={darkLabelStyle}
                  inputStyle={darkInputStyle}
                  value={serviceOrderFormData.techNotes}
                  onChange={handleFieldChange}
                />
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 michroma-600">Relacionamentos</h3>
                  <p className="mt-2 text-sm text-slate-500 oxanium-400">
                    Selecione o técnico e o cliente responsáveis pela ordem.
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={darkLabelStyle}>
                    Técnico responsável
                  </label>
                  <Select
                    options={technicianOptions}
                    value={selectedTechnician}
                    onChange={handleTechnicianChange}
                    placeholder="Selecione um técnico"
                    isSearchable
                    styles={{
                      control: (base) => ({
                        ...base,
                        backgroundColor: "rgba(255,255,255,0.92)",
                        borderColor: "rgba(0,0,0,0.28)",
                        color: "#0f172a",
                      }),
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={darkLabelStyle}>
                    Cliente
                  </label>
                  <div className="flex gap-3 mb-4">
                    <div className="flex-1">
                      <Select
                        options={customerOptions}
                        value={selectedCostumer}
                        onChange={handleCostumerChange}
                        placeholder="Selecione um cliente"
                        isSearchable
                        styles={{
                          control: (base) => ({
                            ...base,
                            backgroundColor: "rgba(255,255,255,0.92)",
                            borderColor: "rgba(0,0,0,0.28)",
                            color: "#0f172a",
                          }),
                        }}
                      />
                    </div>
                    
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-1">
                        <NeogenButton
                        type="button"
                        style={{ backgroundColor: "#0f172a", minWidth: 120 }}
                        onClick={() => setCustomerModalOpen(true)}
                    >
                        Novo cliente
                    </NeogenButton>
                    </div>
                    
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 michroma-600">Dispositivos</h3>
                  <p className="mt-2 text-sm text-slate-500 oxanium-400">
                    Adicione um ou mais dispositivos associados à ordem.
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {deviceSelectItems.map((selected, index) => (
                  <div key={`device-row-${index}`} className="grid gap-3 sm:grid-cols-[1fr_auto_auto_auto] items-end">
                    <Select
                      options={deviceOptions}
                      value={selected}
                      onChange={(option) => updateDeviceSelection(index, option)}
                      placeholder="Selecione um dispositivo"
                      isSearchable
                      styles={{
                        control: (base) => ({
                          ...base,
                          backgroundColor: "rgba(255,255,255,0.92)",
                          borderColor: "rgba(0,0,0,0.28)",
                          color: "#0f172a",
                        }),
                      }}
                    />
                    <NeogenButton
                      type="button"
                      title="Criar novo dispositivo"
                      style={{ backgroundColor: "#11bf6b", minWidth: 40, padding: "0.5rem" }}
                      onClick={() => setDeviceModalOpen(true)}
                    >
                      <FontAwesomeIcon icon={faFileCirclePlus} />
                    </NeogenButton>
                    <NeogenButton
                      type="button"
                      title="Adicionar linha"
                      style={{ backgroundColor: "#0f172a", minWidth: 40, padding: "0.5rem" }}
                      onClick={addDeviceRow}
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </NeogenButton>
                    {index > 0 && (
                      <NeogenButton
                        type="button"
                        title="Remover"
                        style={{ backgroundColor: "#dc2626", minWidth: 40, padding: "0.5rem" }}
                        onClick={() => removeDeviceRow(index)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </NeogenButton>
                    )}
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 michroma-600">Produtos</h3>
                  <p className="mt-2 text-sm text-slate-500 oxanium-400">
                    Adicione produtos que serão usados ou vendidos na ordem.
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {productSelectItems.map((selected, index) => (
                  <div key={`product-row-${index}`} className="grid gap-3 sm:grid-cols-[1fr_auto_auto_auto] items-end">
                    <Select
                      options={productOptions}
                      value={selected}
                      onChange={(option) => updateProductSelection(index, option)}
                      placeholder="Selecione um produto"
                      isSearchable
                      styles={{
                        control: (base) => ({
                          ...base,
                          backgroundColor: "rgba(255,255,255,0.92)",
                          borderColor: "rgba(0,0,0,0.28)",
                          color: "#0f172a",
                        }),
                      }}
                    />
                    <NeogenButton
                      type="button"
                      title="Criar novo produto"
                      style={{ backgroundColor: "#11bf6b", minWidth: 40, padding: "0.5rem" }}
                      onClick={() => setProductModalOpen(true)}
                    >
                      <FontAwesomeIcon icon={faFileCirclePlus} />
                    </NeogenButton>
                    <NeogenButton
                      type="button"
                      title="Adicionar linha"
                      style={{ backgroundColor: "#0f172a", minWidth: 40, padding: "0.5rem" }}
                      onClick={addProductRow}
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </NeogenButton>
                    {index > 0 && (
                      <NeogenButton
                        type="button"
                        title="Remover"
                        style={{ backgroundColor: "#dc2626", minWidth: 40, padding: "0.5rem" }}
                        onClick={() => removeProductRow(index)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </NeogenButton>
                    )}
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 michroma-600">Serviços</h3>
                  <p className="mt-2 text-sm text-slate-500 oxanium-400">
                    Adicione os serviços aplicados nesta ordem de serviço.
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {serviceTypeSelectItems.map((selected, index) => (
                  <div key={`service-row-${index}`} className="grid gap-3 sm:grid-cols-[1fr_auto_auto_auto] items-end">
                    <Select
                      options={serviceTypeOptions}
                      value={selected}
                      onChange={(option) => updateServiceTypeSelection(index, option)}
                      placeholder="Selecione um serviço"
                      isSearchable
                      styles={{
                        control: (base) => ({
                          ...base,
                          backgroundColor: "rgba(255,255,255,0.92)",
                          borderColor: "rgba(0,0,0,0.28)",
                          color: "#0f172a",
                        }),
                      }}
                    />
                    <NeogenButton
                      type="button"
                      title="Criar novo serviço"
                      style={{ backgroundColor: "#11bf6b", minWidth: 40, padding: "0.5rem" }}
                      onClick={() => setServiceTypeModalOpen(true)}
                    >
                      <FontAwesomeIcon icon={faFileCirclePlus} />
                    </NeogenButton>
                    <NeogenButton
                      type="button"
                      title="Adicionar linha"
                      style={{ backgroundColor: "#0f172a", minWidth: 40, padding: "0.5rem" }}
                      onClick={addServiceTypeRow}
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </NeogenButton>
                    {index > 0 && (
                      <NeogenButton
                        type="button"
                        title="Remover"
                        style={{ backgroundColor: "#dc2626", minWidth: 40, padding: "0.5rem" }}
                        onClick={() => removeServiceTypeRow(index)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </NeogenButton>
                    )}
                  </div>
                ))}
              </div>
            </section>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="text-xs text-slate-500 oxanium-400">
                Após salvar, você será redirecionado para a lista de ordens de serviço.
              </p>
              <NeogenButton type="submit" style={{ backgroundColor: "#0f172a", width: "auto", paddingLeft: 28, paddingRight: 28 }}>
                {id ? "Salvar alterações" : "Criar ordem de serviço"}
              </NeogenButton>
            </div>
          </form>

          <Popup
            open={isCustomerModalOpen}
            onClose={() => setCustomerModalOpen(false)}
            modal
            closeOnDocumentClick
            closeOnEscape
            lockScroll
            overlayStyle={{ overflowY: "auto", padding: "24px 12px" }}
            contentStyle={{
              borderRadius: "1rem",
              paddingBottom: "2rem",
              margin: "0 auto",
              maxWidth: "900px",
              width: "min(900px, 100%)",
              background: "none",
              border: "none",
            }}
          >
            <CustomerForm onCreated={handleCustomerCreated} />
          </Popup>

          <Popup
            open={isDeviceModalOpen}
            onClose={() => setDeviceModalOpen(false)}
            modal
            closeOnDocumentClick
            closeOnEscape
            lockScroll
            overlayStyle={{ overflowY: "auto", padding: "24px 12px" }}
            contentStyle={{
              borderRadius: "1rem",
              paddingBottom: "2rem",
              margin: "0 auto",
              maxWidth: "900px",
              width: "min(900px, 100%)",
              background: "none",
              border: "none",
            }}
          >
            <DeviceForm onCreated={handleDeviceCreated} />
          </Popup>

          <Popup
            open={isProductModalOpen}
            onClose={() => setProductModalOpen(false)}
            modal
            closeOnDocumentClick
            closeOnEscape
            lockScroll
            overlayStyle={{ overflowY: "auto", padding: "24px 12px" }}
            contentStyle={{
              borderRadius: "1rem",
              paddingBottom: "2rem",
              margin: "0 auto",
              maxWidth: "900px",
              width: "min(900px, 100%)",
              background: "none",
              border: "none",
            }}
          >
            <ProductForm onCreated={handleProductCreated} />
          </Popup>

          <Popup
            open={isServiceTypeModalOpen}
            onClose={() => setServiceTypeModalOpen(false)}
            modal
            closeOnDocumentClick
            closeOnEscape
            lockScroll
            overlayStyle={{ overflowY: "auto", padding: "24px 12px" }}
            contentStyle={{
              borderRadius: "1rem",
              paddingBottom: "2rem",
              margin: "0 auto",
              maxWidth: "900px",
              width: "min(900px, 100%)",
              background: "none",
              border: "none",
            }}
          >
            <ServiceTypeForm onCreated={handleServiceTypeCreated} />
          </Popup>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-500 oxanium-400">
            Se preferir, você pode cadastrar os itens primeiro nas telas de cadastro e depois voltar para criar a ordem.
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceOrderForm;