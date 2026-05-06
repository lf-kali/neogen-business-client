import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { PortableDevice, DeviceCategory, HandedAccessories, InitialDiagnosis } from "../../features/device/types/device.types";
import DeleteDeviceDialog from "./DeleteDeviceDialog";
import Popup from "reactjs-popup";
import type { DeviceBrand } from "../../features/deviceBrand/types/deviceBrand.types";
import type { DeviceModel } from "../../features/deviceModel/deviceModel.types";
import { portableDeviceSearchRepository } from "../../features/device/repository/portableDeviceSearch.repository";
import ServiceOrderListItem from "../service-orders/ServiceOrderListItem";

function DeviceDetails() {
  const { id } = useParams<{ id: string }>();
  const [device, setDevice] = useState<PortableDevice>({
    id: 0,
    entryDate: '',
    problemDescription: '',
    type: undefined,
    brand: {} as DeviceBrand,
    model: {} as DeviceModel,
    initialDiagnosis: {} as InitialDiagnosis,
    handedAccessories: {} as HandedAccessories,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  
  async function getDeviceById(id: number) {
    setLoading(true);
    setError(null);

    try {
      const data = await portableDeviceSearchRepository.getById(id);
      setDevice(data);
    } catch (e) {
      setError("Erro ao buscar dispositivo!");
      alert("Erro ao buscar dispositivo!");
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if(id !== undefined) {
        getDeviceById(+id);
    }
  },[id])

  const headerTitle = useMemo(() => {
    if (loading) return "Carregando dispositivo";
    const brandName = device?.brand?.name?.trim() || "";
    const modelName = device?.model?.name?.trim() || "";
    const deviceId = device?.id ? String(device.id) : "";
    
    if (brandName && modelName && deviceId) {
      return `${brandName} ${modelName} #${deviceId}`;
    }
    return "Detalhes do dispositivo";
  }, [device?.brand?.name, device?.model?.name, device?.id, loading]);

  const displayId = device?.id ? String(device.id) : "—";
  const displayCategory = device?.type ? mapCategoryToPortuguese(device.type) : "—";
  const displayBrand = device?.brand?.name?.trim() ? device.brand.name : "—";
  const displayModel = device?.model?.name?.trim() ? device.model.name : "—";
  const displayProblem = device?.problemDescription?.trim() ? device.problemDescription : "—";

  function mapCategoryToPortuguese(type: DeviceCategory): string {
    const categoryMap: Record<DeviceCategory, string> = {
      Cellphone: "Celular",
      Laptop: "Notebook",
    };
    return categoryMap[type];
  }

  function mapDiagnosisStatus(status: string): string {
    const statusMap: Record<string, string> = {
      ok: "OK",
      damaged: "Danificado",
      no_video: "Sem vídeo",
      not_working: "Não funciona",
    };
    return statusMap[status] || status;
  }

  function mapBatteryStatus(status: string): string {
    const statusMap: Record<string, string> = {
      ok: "OK",
      damaged: "Danificada",
      swollen: "Inchada",
      not_charging: "Não carrega",
    };
    return statusMap[status] || status;
  }

  function mapTouchStatus(status: string): string {
    const statusMap: Record<string, string> = {
      ok: "OK",
      damaged: "Danificado",
      phantom_touch: "Toque Fantasma",
      not_working: "Não funciona",
    };
    return statusMap[status] || status;
  }

  function mapStorageDevice(device: string): string {
    const deviceMap: Record<string, string> = {
      sd_card: "Cartão SD",
      flash_drive: "Pendrive",
      external_hdd: "HD Externo",
      external_ssd: "SSD Externo",
    };
    return deviceMap[device] || device;
  }

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
                Dispositivo
              </span>
              <h1 className="mt-5 text-3xl xl:text-3xl michroma-700">
                {headerTitle}
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                className="rounded-full bg-white px-5 py-2 text-xs uppercase tracking-[0.22em] text-slate-900 oxanium-700 transition-all hover:bg-slate-100"
                onClick={() => navigate(`/devices/edit/${id}`)}
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
                <DeleteDeviceDialog device={device}/>
              </Popup>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {[`Categoria: ${displayCategory}`, `Marca: ${displayBrand}`, `Modelo: ${displayModel}`].map((tag) => (
              <span key={tag} className="rounded-full bg-white/10 px-4 py-1 text-xs oxanium-400 text-white/70">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="p-8 lg:p-12">
          <div className="mb-8">
            <h2 className="text-2xl michroma-700 text-[#0f172a]">Dados do dispositivo</h2>
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
                aria-label="Carregando dispositivo"
              />
            </div>
          ) : (
            <section className="rounded-3xl border border-slate-200 bg-white/80 p-6 lg:p-8 shadow-sm mb-10">
              <dl className="grid gap-6 md:grid-cols-2">
                <div>
                  <dt className="text-xs uppercase tracking-[0.22em] text-slate-400 oxanium-400">ID</dt>
                  <dd className="mt-2 text-base text-slate-900 oxanium-400">{displayId}</dd>
                </div>

                <div>
                  <dt className="text-xs uppercase tracking-[0.22em] text-slate-400 oxanium-400">Categoria</dt>
                  <dd className="mt-2 text-base text-slate-900 oxanium-400">{displayCategory}</dd>
                </div>

                <div>
                  <dt className="text-xs uppercase tracking-[0.22em] text-slate-400 oxanium-400">Marca</dt>
                  <dd className="mt-2 text-base text-slate-900 oxanium-400">{displayBrand}</dd>
                </div>

                <div>
                  <dt className="text-xs uppercase tracking-[0.22em] text-slate-400 oxanium-400">Modelo</dt>
                  <dd className="mt-2 text-base text-slate-900 oxanium-400">{displayModel}</dd>
                </div>

                <div className="md:col-span-2">
                  <dt className="text-xs uppercase tracking-[0.22em] text-slate-400 oxanium-400">Descrição do Problema</dt>
                  <dd className="mt-2 text-base text-slate-900 oxanium-400">{displayProblem}</dd>
                </div>
              </dl>

              <div className="mt-8 border-t border-slate-200 pt-8">
                <h3 className="text-lg michroma-700 text-slate-900 mb-6">Diagnóstico Inicial</h3>
                <dl className="grid gap-6 md:grid-cols-2">
                  <div>
                    <dt className="text-xs uppercase tracking-[0.22em] text-slate-400 oxanium-400">Estado Externo</dt>
                    <dd className="mt-2 text-base text-slate-900 oxanium-400">
                      {device?.initialDiagnosis?.externalState?.trim() ? device.initialDiagnosis.externalState : "—"}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-xs uppercase tracking-[0.22em] text-slate-400 oxanium-400">Liga</dt>
                    <dd className="mt-2 text-base text-slate-900 oxanium-400">
                      {device?.initialDiagnosis?.turnsOn !== undefined ? (device.initialDiagnosis.turnsOn ? "Sim" : "Não") : "—"}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-xs uppercase tracking-[0.22em] text-slate-400 oxanium-400">Áudio</dt>
                    <dd className="mt-2 text-base text-slate-900 oxanium-400">
                      {device?.initialDiagnosis?.audio?.trim() ? device.initialDiagnosis.audio : "—"}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-xs uppercase tracking-[0.22em] text-slate-400 oxanium-400">Tela</dt>
                    <dd className="mt-2 text-base text-slate-900 oxanium-400">
                      {device?.initialDiagnosis?.screen ? mapDiagnosisStatus(device.initialDiagnosis.screen) : "—"}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-xs uppercase tracking-[0.22em] text-slate-400 oxanium-400">Bateria</dt>
                    <dd className="mt-2 text-base text-slate-900 oxanium-400">
                      {device?.initialDiagnosis?.battery ? mapBatteryStatus(device.initialDiagnosis.battery) : "—"}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-xs uppercase tracking-[0.22em] text-slate-400 oxanium-400">Câmera Frontal</dt>
                    <dd className="mt-2 text-base text-slate-900 oxanium-400">
                      {device?.initialDiagnosis?.frontalCamera ? mapDiagnosisStatus(device.initialDiagnosis.frontalCamera) : "—"}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-xs uppercase tracking-[0.22em] text-slate-400 oxanium-400">Câmera Traseira</dt>
                    <dd className="mt-2 text-base text-slate-900 oxanium-400">
                      {device?.initialDiagnosis?.rearCamera ? mapDiagnosisStatus(device.initialDiagnosis.rearCamera) : "—"}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-xs uppercase tracking-[0.22em] text-slate-400 oxanium-400">Touch</dt>
                    <dd className="mt-2 text-base text-slate-900 oxanium-400">
                      {device?.initialDiagnosis?.touch ? mapTouchStatus(device.initialDiagnosis.touch) : "—"}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="mt-8 border-t border-slate-200 pt-8">
                <h3 className="text-lg michroma-700 text-slate-900 mb-6">Acessórios Entregues</h3>
                <dl className="grid gap-6 md:grid-cols-2">
                  <div>
                    <dt className="text-xs uppercase tracking-[0.22em] text-slate-400 oxanium-400">Carregador</dt>
                    <dd className="mt-2 text-base text-slate-900 oxanium-400">
                      {device?.handedAccessories?.charger ? "Sim" : "Não"}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-xs uppercase tracking-[0.22em] text-slate-400 oxanium-400">Cabo</dt>
                    <dd className="mt-2 text-base text-slate-900 oxanium-400">
                      {device?.handedAccessories?.cable ? "Sim" : "Não"}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-xs uppercase tracking-[0.22em] text-slate-400 oxanium-400">Case</dt>
                    <dd className="mt-2 text-base text-slate-900 oxanium-400">
                      {device?.handedAccessories?.case ? "Sim" : "Não"}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-xs uppercase tracking-[0.22em] text-slate-400 oxanium-400">Dispositivo de Armazenamento</dt>
                    <dd className="mt-2 text-base text-slate-900 oxanium-400">
                      {device?.handedAccessories?.storageDevice ? mapStorageDevice(device.handedAccessories.storageDevice) : "Não"}
                    </dd>
                  </div>
                </dl>
              </div>
            </section>
          )}
          {device?.serviceOrders && (
                <section className="mb-8">
                  <div className="mb-6">
                    <h2 className="text-2xl michroma-700 text-[#0f172a]">Histórico de OS</h2>
                    <p className="mt-2 text-sm text-slate-500 oxanium-400">
                      Ordens de serviço que incluem o dispositivo
                    </p>
                  </div>

                  <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 lg:p-8 shadow-sm overflow-x-auto">
                    <table className="w-full">
                      <thead className="border-b border-slate-300">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs uppercase tracking-[0.22em] text-slate-400 oxanium-400 font-medium">ID</th>
                          <th className="px-4 py-3 text-left text-xs uppercase tracking-[0.22em] text-slate-400 oxanium-400 font-medium">Data de entrada</th>
                          <th className="px-4 py-3 text-left text-xs uppercase tracking-[0.22em] text-slate-400 oxanium-400 font-medium">Nome cliente</th>
                          <th className="px-4 py-3 text-left text-xs uppercase tracking-[0.22em] text-slate-400 oxanium-400 font-medium">Prazo</th>
                          <th className="px-4 py-3 text-left text-xs uppercase tracking-[0.22em] text-slate-400 oxanium-400 font-medium">Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {device.serviceOrders.map((so) => (
                          <ServiceOrderListItem serviceOrder={so} />
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              )}
        </div>
      </div>
    </div>
  );
}

export default DeviceDetails;