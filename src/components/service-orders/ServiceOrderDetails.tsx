import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import type { ServiceOrder, ServiceOrderStatus } from "../../features/serviceOrder/serviceOrder.types";
import { serviceOrderRepository } from "../../features/serviceOrder/serviceOrder.repository";
import Popup from "reactjs-popup";
import DeleteServiceOrderDialog from "./DeleteServiceOrderDialog";
import CostumerListItem from "../customers/CostumerListItem";
import DeviceListItem from "../devices/DeviceListItem";
import ProductListItem from "../product/ProductListItem";
import ServiceTypeListItem from "../serviceTypes/ServiceTypeListItem";
import type { PortableDevice } from "../../features/device/types/device.types";

function ServiceOrderDetails() {
  const {id} = useParams<{ id: string }>();
  const [serviceOrder, setServiceOrder] = useState<ServiceOrder>({} as ServiceOrder);
  const [devices, setDevices] = useState<PortableDevice[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  async function getServiceOrderById(id: string) {
    setLoading(true);
    setError(null);

    try {
        const data = await serviceOrderRepository.getById(+id);
        setServiceOrder(data);
    } catch (e) {
        setError("Erro ao buscar ordem de serviço!");
        console.error(e);        
    }
    finally {
        setLoading(false);
    }
  }

  useEffect(() => {
    if(id !== undefined) {
        getServiceOrderById(id);
    }
  }, [id]);

  const headerTitle = useMemo(() => {
      if (loading) return "Carregando Ordem de serviço";
      if (serviceOrder?.id) return `OS #${serviceOrder.id}`;
      return "Detalhes da ordem de serviço";
  }, [serviceOrder?.id, loading]);

  function mapStatusToPortuguese(status: ServiceOrderStatus): string {
    const statusMap: Record<ServiceOrderStatus, string> = {
      pending: "Pendente",
      confirmed: "Confirmada",
      acquiring_parts: "Adquirindo Peças",
      ongoing: "Em Andamento",
      finished: "Finalizada",
      cancelled: "Cancelada",
    };
    return statusMap[status] || status;
  }

  const displayId = serviceOrder?.id ? String(serviceOrder.id) : "—";
  const displayStatus = serviceOrder?.status ? mapStatusToPortuguese(serviceOrder.status) : "—";
  const displayEntryDate = serviceOrder?.entryDate?.trim() ? serviceOrder.entryDate : "—";
  const displayDeadline = serviceOrder?.deadline?.trim() ? serviceOrder.deadline : "—";
  const displayTechNotes = serviceOrder?.techNotes?.trim() ? serviceOrder.techNotes : "—";
  const displayClosureDate = serviceOrder?.closureDate?.trim() ? serviceOrder.closureDate : "—";
  const displayClosureNotes = serviceOrder?.closureNotes?.trim() ? serviceOrder.closureNotes : "—";
  const displayFinalPrice = serviceOrder?.finalPrice ? `R$ ${serviceOrder.finalPrice.toFixed(2)}` : "—";
  const displayTechnicianName = serviceOrder?.technician?.name?.trim() ? serviceOrder.technician.name : "—";

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-10"
      style={{ background: "linear-gradient(135deg, #f3f6ff 0%, #e9eeff 48%, #f8fafc 100%)" }}
    >
      <div className="w-full max-w-6xl rounded-4xl bg-white/80 shadow-2xl backdrop-blur border border-white/60 overflow-hidden">
        <div className="p-8 lg:p-12 bg-linear-to-br from-[#0e0f14] via-[#111827] to-[#0f172a] text-white">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="min-w-65">
              <span className="inline-flex items-center rounded-full border border-white/20 px-4 py-1 text-xs uppercase tracking-[0.3em] oxanium-400">
                Ordem de Serviço
              </span>
              <h1 className="mt-5 text-3xl xl:text-3xl michroma-700">
                {headerTitle}
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                className="rounded-full bg-white px-5 py-2 text-xs uppercase tracking-[0.22em] text-slate-900 oxanium-700 transition-all hover:bg-slate-100"
                onClick={() => navigate(`/service-orders/edit/${id}`)}
              >
                Editar
              </button>

              <Popup
                trigger={
                  <button
                    type="button"
                    className="rounded-full border border-red-500/40 bg-red-500/15 px-5 py-2 text-xs uppercase tracking-[0.22em] text-red-100 oxanium-400 transition-all hover:bg-red-500/20"
                  >
                    Deletar
                  </button>
                }
                modal
                closeOnDocumentClick
                closeOnEscape
                lockScroll
                overlayStyle={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                contentStyle={{
                  borderRadius: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto',
                  maxWidth: '900px',
                  width: 'min(500px, 60%)',
                  background: 'none',
                  border: 'none'
                }}
              >
                <DeleteServiceOrderDialog id={serviceOrder.id}/>
              </Popup>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {[`Status: ${displayStatus}`, `Cliente: ${serviceOrder?.costumer?.name ?? '—'}`].map((tag) => (
              <span key={tag} className="rounded-full bg-white/10 px-4 py-1 text-xs oxanium-400 text-white/70">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="p-8 lg:p-12">
          {error && (
            <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700 oxanium-400">
              {error}
            </div>
          )}

          {loading ? (
            <div className="my-10 flex w-full justify-center">
              <div
                className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-slate-700"
                aria-label="Carregando ordem de serviço"
              />
            </div>
          ) : (
            <>
              {/* DADOS DA ORDEM DE SERVIÇO */}
              <section className="mb-8">
                <div className="mb-6">
                  <h2 className="text-2xl michroma-700 text-[#0f172a]">Dados da Ordem de Serviço</h2>
                  <p className="mt-2 text-sm text-slate-500 oxanium-400">
                    Visualize as informações retornadas pela API para este cadastro.
                  </p>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 lg:p-8 shadow-sm">
                  <dl className="grid gap-6 md:grid-cols-2">
                    <div>
                      <dt className="text-xs uppercase tracking-[0.22em] text-slate-400 oxanium-400">ID</dt>
                      <dd className="mt-2 text-base text-slate-900 oxanium-400">{displayId}</dd>
                    </div>

                    <div>
                      <dt className="text-xs uppercase tracking-[0.22em] text-slate-400 oxanium-400">Status</dt>
                      <dd className="mt-2 text-base text-slate-900 oxanium-400">{displayStatus}</dd>
                    </div>

                    <div>
                      <dt className="text-xs uppercase tracking-[0.22em] text-slate-400 oxanium-400">Data de Entrada</dt>
                      <dd className="mt-2 text-base text-slate-900 oxanium-400">{displayEntryDate}</dd>
                    </div>

                    <div>
                      <dt className="text-xs uppercase tracking-[0.22em] text-slate-400 oxanium-400">Prazo</dt>
                      <dd className="mt-2 text-base text-slate-900 oxanium-400">{displayDeadline}</dd>
                    </div>

                    <div className="md:col-span-2">
                      <dt className="text-xs uppercase tracking-[0.22em] text-slate-400 oxanium-400">Anotações Técnicas</dt>
                      <dd className="mt-2 text-base text-slate-900 oxanium-400">{displayTechNotes}</dd>
                    </div>

                    {serviceOrder?.closureDate && (
                      <div>
                        <dt className="text-xs uppercase tracking-[0.22em] text-slate-400 oxanium-400">Data de Encerramento</dt>
                        <dd className="mt-2 text-base text-slate-900 oxanium-400">{displayClosureDate}</dd>
                      </div>
                    )}

                    {serviceOrder?.closureNotes && (
                      <div className="md:col-span-2">
                        <dt className="text-xs uppercase tracking-[0.22em] text-slate-400 oxanium-400">Anotações de Encerramento</dt>
                        <dd className="mt-2 text-base text-slate-900 oxanium-400">{displayClosureNotes}</dd>
                      </div>
                    )}

                    <div>
                      <dt className="text-xs uppercase tracking-[0.22em] text-slate-400 oxanium-400">Preço Final</dt>
                      <dd className="mt-2 text-base text-slate-900 oxanium-400">{displayFinalPrice}</dd>
                    </div>
                  </dl>
                </div>
              </section>

              {/* TÉCNICO RESPONSÁVEL */}
              <section className="mb-8">
                <div className="mb-6">
                  <h2 className="text-2xl michroma-700 text-[#0f172a]">Técnico Responsável</h2>
                  <p className="mt-2 text-sm text-slate-500 oxanium-400">
                    Profissional responsável pela execução desta ordem de serviço.
                  </p>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 lg:p-8 shadow-sm">
                  <p className="text-base text-slate-900 oxanium-400">{displayTechnicianName}</p>
                </div>
              </section>

              {/* CLIENTE */}
              {serviceOrder?.costumer && (
                <section className="mb-8">
                  <div className="mb-6">
                    <h2 className="text-2xl michroma-700 text-[#0f172a]">Cliente</h2>
                    <p className="mt-2 text-sm text-slate-500 oxanium-400">
                      Informações do cliente associado a esta ordem de serviço.
                    </p>
                  </div>

                  <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 lg:p-8 shadow-sm overflow-x-auto">
                    <table className="w-full">
                      <thead className="border-b border-slate-300">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs uppercase tracking-[0.22em] text-slate-400 oxanium-400 font-medium">ID</th>
                          <th className="px-4 py-3 text-left text-xs uppercase tracking-[0.22em] text-slate-400 oxanium-400 font-medium">Nome</th>
                          <th className="px-4 py-3 text-left text-xs uppercase tracking-[0.22em] text-slate-400 oxanium-400 font-medium">Telefone</th>
                          <th className="px-4 py-3 text-left text-xs uppercase tracking-[0.22em] text-slate-400 oxanium-400 font-medium">Ordem de Serviços</th>
                          <th className="px-4 py-3 text-left text-xs uppercase tracking-[0.22em] text-slate-400 oxanium-400 font-medium">Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        <CostumerListItem costumer={serviceOrder.costumer} />
                      </tbody>
                    </table>
                  </div>
                </section>
              )}

              {/* DISPOSITIVOS */}
              {serviceOrder?.devices && serviceOrder.devices.length > 0 && (
                <section className="mb-8">
                  <div className="mb-6">
                    <h2 className="text-2xl michroma-700 text-[#0f172a]">Dispositivos</h2>
                    <p className="mt-2 text-sm text-slate-500 oxanium-400">
                      Dispositivos associados a esta ordem de serviço.
                    </p>
                  </div>

                  <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 lg:p-8 shadow-sm overflow-x-auto">
                    <table className="w-full">
                      <thead className="border-b border-slate-300">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs uppercase tracking-[0.22em] text-slate-400 oxanium-400 font-medium">ID</th>
                          <th className="px-4 py-3 text-left text-xs uppercase tracking-[0.22em] text-slate-400 oxanium-400 font-medium">Data de Entrada</th>
                          <th className="px-4 py-3 text-left text-xs uppercase tracking-[0.22em] text-slate-400 oxanium-400 font-medium">Marca/Modelo</th>
                          <th className="px-4 py-3 text-left text-xs uppercase tracking-[0.22em] text-slate-400 oxanium-400 font-medium">Cliente Responsável</th>
                          <th className="px-4 py-3 text-left text-xs uppercase tracking-[0.22em] text-slate-400 oxanium-400 font-medium">Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {serviceOrder.devices.map((device) => (
                          <DeviceListItem key={device.id} device={device} />
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              )}

              {/* PRODUTOS */}
              {serviceOrder?.products && serviceOrder.products.length > 0 && (
                <section className="mb-8">
                  <div className="mb-6">
                    <h2 className="text-2xl michroma-700 text-[#0f172a]">Produtos</h2>
                    <p className="mt-2 text-sm text-slate-500 oxanium-400">
                      Produtos utilizados nesta ordem de serviço.
                    </p>
                  </div>

                  <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 lg:p-8 shadow-sm overflow-x-auto">
                    <table className="w-full">
                      <thead className="border-b border-slate-300">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs uppercase tracking-[0.22em] text-slate-400 oxanium-400 font-medium">ID</th>
                          <th className="px-4 py-3 text-left text-xs uppercase tracking-[0.22em] text-slate-400 oxanium-400 font-medium">Nome</th>
                          <th className="px-4 py-3 text-left text-xs uppercase tracking-[0.22em] text-slate-400 oxanium-400 font-medium">Preço - Custo</th>
                          <th className="px-4 py-3 text-left text-xs uppercase tracking-[0.22em] text-slate-400 oxanium-400 font-medium">Preço - Venda</th>
                          <th className="px-4 py-3 text-left text-xs uppercase tracking-[0.22em] text-slate-400 oxanium-400 font-medium">Estoque</th>
                          <th className="px-4 py-3 text-left text-xs uppercase tracking-[0.22em] text-slate-400 oxanium-400 font-medium">Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {serviceOrder.products.map((product) => (
                          <ProductListItem key={product.id} product={product} />
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              )}

              {/* SERVIÇOS */}
              {serviceOrder?.services && serviceOrder.services.length > 0 && (
                <section className="mb-8">
                  <div className="mb-6">
                    <h2 className="text-2xl michroma-700 text-[#0f172a]">Serviços</h2>
                    <p className="mt-2 text-sm text-slate-500 oxanium-400">
                      Serviços prestados nesta ordem de serviço.
                    </p>
                  </div>

                  <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 lg:p-8 shadow-sm overflow-x-auto">
                    <table className="w-full">
                      <thead className="border-b border-slate-300">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs uppercase tracking-[0.22em] text-slate-400 oxanium-400 font-medium">ID</th>
                          <th className="px-4 py-3 text-left text-xs uppercase tracking-[0.22em] text-slate-400 oxanium-400 font-medium">Nome</th>
                          <th className="px-4 py-3 text-left text-xs uppercase tracking-[0.22em] text-slate-400 oxanium-400 font-medium">Preço - Custo</th>
                          <th className="px-4 py-3 text-left text-xs uppercase tracking-[0.22em] text-slate-400 oxanium-400 font-medium">Preço - Venda</th>
                          <th className="px-4 py-3 text-left text-xs uppercase tracking-[0.22em] text-slate-400 oxanium-400 font-medium">Comissão</th>
                          <th className="px-4 py-3 text-left text-xs uppercase tracking-[0.22em] text-slate-400 oxanium-400 font-medium">Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {serviceOrder.services.map((service) => (
                          <ServiceTypeListItem key={service.id} serviceType={service} />
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              )}

              {/* EMPTY STATES */}
              {!serviceOrder?.devices?.length && !serviceOrder?.products?.length && !serviceOrder?.services?.length && (
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-500 oxanium-400">
                  Nenhum dispositivo, produto ou serviço associado a esta ordem de serviço.
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ServiceOrderDetails