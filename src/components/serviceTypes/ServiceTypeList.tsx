import { Link } from "react-router-dom";
import { useServiceTypes } from "../../features/serviceType/useServiceTypes"
import ServiceTypeListItem from "./ServiceTypeListItem";
import { useEffect } from "react";

function ServiceTypeList() {
  const {serviceTypes, loading} = useServiceTypes();
  useEffect(() => {
    console.log(serviceTypes);
  },[serviceTypes]);
    
  return (
    <>
      {loading && (
        <div className="my-8 flex w-full justify-center">
        <div
            className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-slate-700"
            aria-label="Carregando serviços"
        />
        </div>
      )}
      <div className="my-4 flex w-full justify-center">
        <div className="mx-auto flex w-full flex-col px-8">
            {!loading && serviceTypes.length === 0 && (
                <span className="my-8 text-center text-sm text-slate-500 oxanium-400">
                    Nenhum serviço foi encontrado!
                </span>
            )}

            {!loading && serviceTypes.length > 0 && (
                <div className="w-full overflow-x-auto rounded-lg border border-slate-500/30 bg-white">
                <table className="w-full">
                    <thead className="border-b border-slate-400/40 bg-slate-800">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-widest text-white michroma-700">
                                ID
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-widest text-white michroma-700">
                                Nome
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-widest text-white michroma-700">
                                Preço - Custo
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-widest text-white michroma-700">
                                Preço - Venda
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-widest text-white michroma-700">
                                Comissão
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-widest text-white michroma-700">
                                Ações
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {serviceTypes.map((serviceType) => (
                            <ServiceTypeListItem key={serviceType.id} serviceType={serviceType}/>
                        ))}
                    </tbody>
                </table>
                </div>
            )}
        </div>
      </div>
      <Link
            to={'/service-types/new'}
            className="fixed right-6 bottom-6 p-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition-all duration-200 hover:shadow-xl active:scale-95"
            aria-label="Adicionar novo Serviço"
            title="Novo Serviço"
        >
          <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
          >
            <line x1="10" y1="5" x2="10" y2="15" />
            <line x1="5" y1="10" x2="15" y2="10" />
          </svg>
        </Link>
    </>
  )
}

export default ServiceTypeList