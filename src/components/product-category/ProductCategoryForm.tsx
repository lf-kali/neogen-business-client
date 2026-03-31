import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext"
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import NeogenInput from "../neogen/keyboard-input/neogen-input/NeogenInput";
import NeogenButton from "../neogen/neogen-button/NeogenButton";
import type { CreateProductCategory, ProductCategory, UpdateProductCategory } from "../../features/productCategory/productCategory.types";
import { ProductCategoryRepository } from "../../features/productCategory/productCategory.repository";

function ProductCategoryForm() {
  const {handleLogout} = useAuth();
  const navigate = useNavigate();
  const {id} = useParams<{id: string}>();
  
  const [productCategoryFormData, setProductCategoryFormData] = useState<CreateProductCategory | UpdateProductCategory>({
    name: '',
  })

  async function getCategory(id: number) {
    try {
      const category = await ProductCategoryRepository.getById(id);
      setProductCategoryFormData(category);

    } catch (error: any) {
      if(error.toString().includes('401')) handleLogout();  
    }
  }

  useEffect(() => {
    if (id) {
        getCategory(+id);
    }
  },[id]);

  function onInputChange(e: ChangeEvent<HTMLInputElement>) {
    setProductCategoryFormData({
        ...productCategoryFormData,
        [e.target.name]: e.target.value,
    });
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(productCategoryFormData);
    let res: ProductCategory;

    try {
      if(!id) res = await ProductCategoryRepository.create(productCategoryFormData as CreateProductCategory);
      else res = await ProductCategoryRepository.update(+id, productCategoryFormData as UpdateProductCategory);   
      navigate(`/product-categories/${res.id}`)
    } catch (error) {
      alert("Erro ao salvar categoria!");
      console.error("Erro ao salvar categoria: ", error);
    }
    
  }
  
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
      <div className="w-full max-w-2xl lg:max-w-6xl rounded-[32px] bg-white/75 shadow-2xl backdrop-blur border border-white/60 overflow-hidden">
        <div className="p-3 sm:p-8 lg:p-12">
            <div className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl michroma-700 text-[#0f172a]">{id ? 'Editar categoria de produto' : 'Nova categoria de produto'}</h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-500 oxanium-400">
                Preencha o nome da categoria para organizar seus produtos.
              </p>
            </div>

            <form className="space-y-4 sm:space-y-5" onSubmit={onSubmit}>
              <NeogenInput
                label="Nome da categoria"
                type="text"
                id="name"
                name="name"
                placeholder="Ex: Smartphones, Acessórios, etc."
                value={productCategoryFormData.name}
                labelStyle={darkLabelStyle}
                inputStyle={darkInputStyle}
                onChange={(e: ChangeEvent<HTMLInputElement>) => onInputChange(e)}
              />

              <NeogenButton type="submit" style={{ backgroundColor: "#0f172a" }}>
                Salvar categoria
              </NeogenButton>
            </form>

            <div className="mt-4 sm:mt-6 rounded-2xl border border-slate-200 bg-slate-50 px-3 sm:px-4 py-2 sm:py-3 text-xs text-slate-500 oxanium-400">
              Produtos serão adicionados à categoria após a sua criação.
            </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCategoryForm