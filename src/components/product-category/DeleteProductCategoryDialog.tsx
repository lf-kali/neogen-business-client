import { useLocation, useNavigate } from "react-router-dom";
import { ProductCategoryRepository } from "../../features/productCategory/productCategory.repository";

type deleteProductCategoryDialogProps = {
    id: number;
}

function DeleteProductCategoryDialog({id}: deleteProductCategoryDialogProps) {
    const navigate = useNavigate();
    const location = useLocation();

    async function deleteProductCategory() {
        try {
            await ProductCategoryRepository.delete(id)
        } catch (error) {
            alert(`Erro ao deletar Categoria!`);
            console.error(`Erro ao deletar Categoria: ${error}`);
        }

        if (location.pathname === '/product-categories') navigate(0);
        else navigate('/product-categories');
    }

    return (
    <div className="w-full max-w-md bg-white rounded-xl border border-slate-200 shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-50 to-red-50/50 border-b border-red-200/30 px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-red-100">
            <svg
                className="text-red-700"
                width="20"
                height="20"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M2 4h12M6.5 7v4M9.5 7v4M3 4l1 10c0 .55.45 1 1 1h6c.55 0 1-.45 1-1l1-10M6 4V3c0-.55.45-1 1-1h2c.55 0 1 .45 1 1v1" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-red-700 oxanium-700">
            Confirmar Deleção
          </h3>
        </div>
      </div>

      {/* Body */}
      <div className="px-6 py-6">
        <p className="text-sm text-slate-700 leading-relaxed mb-4">
          Você tem certeza que deseja deletar esta categoria? Esta ação é
          <span className="font-semibold text-red-600"> irreversível</span> e não poderá ser desfeita.
        </p>
        
        <div className="bg-red-50 border border-red-200/40 rounded-lg p-4">
          <p className="text-xs text-red-700 font-medium oxanium-600">
            ⚠️ Aviso: Todos os dados associados também serão removidos.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-slate-50 border-t border-slate-200/50 px-6 py-4 flex gap-3 justify-end">
        <button
          className="px-4 py-2 rounded-lg text-sm font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 hover:border-slate-400 transition-all duration-200 oxanium-600"
          onClick={() => navigate(0)}
        >
          Cancelar
        </button>
        <button
          className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-red-700 hover:bg-red-800 active:scale-95 transition-all duration-200 oxanium-600 shadow-md hover:shadow-lg"
          onClick={deleteProductCategory}
        >
          Deletar Categoria
        </button>
      </div>
    </div>
  );
}

export default DeleteProductCategoryDialog;