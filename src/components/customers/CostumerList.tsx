import CostumerListItem from "./CostumerListItem";
import { useCostumers } from "../../features/costumer/useCostumers";
import { Link, useNavigate } from "react-router-dom";

function CostumerList() {
  const { costumers, loading } = useCostumers();

  return (
    <>
      {loading && (
        <div className="my-8 flex w-full justify-center">
          <div
            className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-slate-700"
            aria-label="Carregando clientes"
          />
        </div>
      )}

      <div className="my-4 flex w-full justify-center">
        <div className="mx-auto flex w-full flex-col px-8">
          {!loading && costumers.length === 0 && (
            <span className="my-8 text-center text-sm text-slate-500 oxanium-400">
              Nenhum cliente foi encontrado!
            </span>
          )}

          {!loading && costumers.length > 0 && (
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
                      Telefone
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-widest text-white michroma-700">
                      OS Ativas
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-widest text-white michroma-700">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {costumers.map((costumer) => (
                    <CostumerListItem key={costumer.id} costumer={costumer}/>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Botão Flutuante - Novo Cliente */}
      <Link
        to={'/customers/register'}
        className="fixed right-6 bottom-6 p-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition-all duration-200 hover:shadow-xl active:scale-95"
        aria-label="Adicionar novo cliente"
        title="Novo Cliente"
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
  );
}

export default CostumerList;