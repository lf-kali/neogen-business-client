import { Link } from "react-router-dom";
import type { Costumer } from "../../features/costumer/costumer.types";

interface CostumerCardProps {
  costumer: Costumer;
}

function CostumerCard({ costumer }: CostumerCardProps) {
  const serviceOrdersCount = costumer.serviceOrders?.length ?? 0;

  return (
    <Link to={`/customers/${costumer.id}`}>
      <section
          className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm"
          aria-label={`Cliente ${costumer.name}`}
        >
        <h3 className="text-lg michroma-700 text-slate-900">{costumer.name}</h3>

        <dl className="mt-4 grid gap-3">
          <div className="flex items-center justify-between gap-4">
            <dt className="text-xs uppercase tracking-[0.22em] text-slate-400 oxanium-400">
              Telefone
            </dt>
            <dd className="text-sm text-slate-700 oxanium-400">
              {costumer.phone?.trim() ? costumer.phone : "—"}
            </dd>
          </div>

          <div className="flex items-center justify-between gap-4">
            <dt className="text-xs uppercase tracking-[0.22em] text-slate-400 oxanium-400">
              Ordens de serviço
            </dt>
            <dd className="text-sm text-slate-700 oxanium-400">
              {serviceOrdersCount}
            </dd>
          </div>
        </dl>
      </section>
    </Link>
  );
}

export default CostumerCard;