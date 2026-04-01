import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import type { ServiceType } from "../../features/serviceType/serviceType.types";
import { serviceTypeRepository } from "../../features/serviceType/serviceType.repository";
import Popup from "reactjs-popup";
import DeleteServiceTypeDialog from "./DeleteServiceTypeDialog";

function ServiceTypeDetails() {
  const { id } = useParams<{ id: string }>();
  const [serviceType, setServiceType] = useState<ServiceType>({} as ServiceType);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  async function getServiceTypeById(id: string) {
    setLoading(true);
    setError(null);

    try {
      const data = await serviceTypeRepository.getById(+id);
      setServiceType(data);
    } catch (error) {
      setError("Erro ao buscar Tipo de Serviço!");
      alert("Erro ao buscar tipo de serviço!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (id !== undefined) {
      getServiceTypeById(id);
    }
  }, [id]);

  const headerTitle = useMemo(() => {
    if (loading) return "Carregando tipo de serviço";
    if (serviceType?.name?.trim()) return serviceType.name;
    return "Detalhes do tipo de serviço";
  }, [serviceType?.name, loading]);

  const displayName = serviceType?.name?.trim() ? serviceType.name : "—";
  const displayCostPrice = serviceType?.costPrice ? `R$ ${serviceType.costPrice.toFixed(2)}` : "—";
  const displaySalePrice = serviceType?.salePrice ? `R$ ${serviceType.salePrice.toFixed(2)}` : "—";
  const displayCommissionPercent = serviceType?.comissionPercent !== undefined ? `${serviceType.comissionPercent}%` : "—";
  const displayDescription = serviceType?.desc?.trim() ? serviceType.desc : "—";
  const displayId = serviceType?.id ? String(serviceType.id) : "—";

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
                Tipo de Serviço
              </span>
              <h1 className="mt-5 text-3xl xl:text-3xl michroma-700">
                {headerTitle}
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                className="rounded-full bg-white px-5 py-2 text-xs uppercase tracking-[0.22em] text-slate-900 oxanium-700 transition-all hover:bg-slate-100"
                onClick={() => navigate(`/service-types/edit/${id}`)}
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
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                contentStyle={{
                  borderRadius: "1rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto",
                  maxWidth: "900px",
                  width: "min(500px, 60%)",
                  background: "none",
                  border: "none",
                }}
              >
                <DeleteServiceTypeDialog id={serviceType.id} />
              </Popup>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {[`Preço de venda: ${displaySalePrice}`, `Comissão: ${displayCommissionPercent}`].map(
              (tag) => (
                <span key={tag} className="rounded-full bg-white/10 px-4 py-1 text-xs oxanium-400 text-white/70">
                  {tag}
                </span>
              )
            )}
          </div>
        </div>

        <div className="p-8 lg:p-12">
          <div className="mb-8">
            <h2 className="text-2xl michroma-700 text-[#0f172a]">Dados do tipo de serviço</h2>
            <p className="mt-2 text-sm text-slate-500 oxanium-400">
              Visualize as informações retornadas pela API para este cadastro.
            </p>
          </div>

          {error && (
            <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700 oxanium-400">
              {error}
            </div>
          )}

          {loading ? (
            <div className="my-10 flex w-full justify-center">
              <div
                className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-slate-700"
                aria-label="Carregando tipo de serviço"
              />
            </div>
          ) : (
            <section className="rounded-3xl border border-slate-200 bg-white/80 p-6 lg:p-8 shadow-sm">
              <dl className="grid gap-6 md:grid-cols-2">
                <div>
                  <dt className="text-xs uppercase tracking-[0.22em] text-slate-400 oxanium-400">ID</dt>
                  <dd className="mt-2 text-base text-slate-900 oxanium-400">{displayId}</dd>
                </div>

                <div>
                  <dt className="text-xs uppercase tracking-[0.22em] text-slate-400 oxanium-400">Nome</dt>
                  <dd className="mt-2 text-base text-slate-900 oxanium-400">
                    {displayName}
                  </dd>
                </div>

                <div>
                  <dt className="text-xs uppercase tracking-[0.22em] text-slate-400 oxanium-400">Preço de Custo</dt>
                  <dd className="mt-2 text-base text-slate-900 oxanium-400">{displayCostPrice}</dd>
                </div>

                <div>
                  <dt className="text-xs uppercase tracking-[0.22em] text-slate-400 oxanium-400">Preço de Venda</dt>
                  <dd className="mt-2 text-base text-slate-900 oxanium-400">{displaySalePrice}</dd>
                </div>

                <div>
                  <dt className="text-xs uppercase tracking-[0.22em] text-slate-400 oxanium-400">Percentual de Comissão</dt>
                  <dd className="mt-2 text-base text-slate-900 oxanium-400">{displayCommissionPercent}</dd>
                </div>

                <div className="md:col-span-2">
                  <dt className="text-xs uppercase tracking-[0.22em] text-slate-400 oxanium-400">Descrição</dt>
                  <dd className="mt-2 text-base text-slate-900 oxanium-400">{displayDescription}</dd>
                </div>
              </dl>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

export default ServiceTypeDetails;