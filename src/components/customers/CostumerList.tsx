import CostumerCard from "./CostumerCard";
import { useCostumers } from "../../features/costumer/useCostumers";

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
        <div className="mx-auto flex w-full max-w-6xl flex-col px-4">
          {!loading && costumers.length === 0 && (
            <span className="my-8 text-center text-sm text-slate-500 oxanium-400">
              Nenhum cliente foi encontrado!
            </span>
          )}

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {costumers.map((costumer) => (
              <CostumerCard key={costumer.id} costumer={costumer} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default CostumerList;