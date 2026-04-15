import { Link, useNavigate } from "react-router-dom";
import type { ServiceOrder } from "../../features/serviceOrder/serviceOrder.types";
import Popup from "reactjs-popup";
import DeleteServiceOrderDialog from "./DeleteServiceOrderDialog";

interface ServiceOrderListItemProps {
    serviceOrder: ServiceOrder;
}

function ServiceOrderListItem({serviceOrder}: ServiceOrderListItemProps) {
  const navigate = useNavigate()

  return (
    <tr className="border-b border-slate-500/30 hover:bg-slate-50 transition-colors">
      {/* ID */}
      <td className="px-4 py-3 whitespace-nowrap cursor-pointer" onClick={() => navigate(`/service-orders/${serviceOrder.id}`)}>
        <span className="text-sm text-slate-600 oxanium-400">
          {serviceOrder.id}
        </span>
      </td>

      {/* Data de entrada */}
      <td className="px-4 py-3 whitespace-nowrap cursor-pointer" onClick={() => navigate(`/service-orders/${serviceOrder.id}`)}>
        <span className="text-sm font-medium text-slate-900 oxanium-400">
          {serviceOrder.entryDate}
        </span>
      </td>

      {/* Nome cliente */}
      <td className="px-4 py-3 whitespace-nowrap cursor-pointer" onClick={() => navigate(`/service-orders/${serviceOrder.id}`)}>
        <span className="text-sm text-slate-600 oxanium-400">
          {serviceOrder.costumer.name}
        </span>
      </td>

      {/* Prazo */}
      <td className="px-4 py-3 whitespace-nowrap cursor-pointer" onClick={() => navigate(`/service-orders/${serviceOrder.id}`)}>
        <span className="text-sm text-slate-600 oxanium-400">
          {serviceOrder.deadline}
        </span>
      </td>

      {/* Ações */}
      <td className="px-4 py-3 whitespace-nowrap">
        <div className="flex items-center gap-2">
          {/* Botão Editar */}
          <Link
            to={`/service-orders/edit/${serviceOrder.id}`}
            className="p-1.5 rounded hover:bg-blue-100 text-slate-600 hover:text-blue-600 transition-colors"
            aria-label={`Editar Ordem de Serviço ${serviceOrder.id}`}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12.146 2.354l1.5 1.5a1 1 0 0 1 0 1.414L5.5 13H2v-3.5L10.732 2.354a1 1 0 0 1 1.414 0Z" />
            </svg>
          </Link>

          {/* Botão Deletar */}
          <Popup
            trigger={
              <button
                className="p-1.5 rounded hover:bg-red-100 text-slate-600 hover:text-red-600 transition-colors cursor-pointer"
                aria-label={`Deletar ordem de serviço ${serviceOrder.id}`}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 4h12M6.5 7v4M9.5 7v4M3 4l1 10c0 .55.45 1 1 1h6c.55 0 1-.45 1-1l1-10M6 4V3c0-.55.45-1 1-1h2c.55 0 1 .45 1 1v1" />
                </svg>
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
      </td>
    </tr>
  )
}

export default ServiceOrderListItem