import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import type { CreateProduct, UpdateProduct } from "../../features/product/product.types";
import { productRepository } from "../../features/product/product.repository";
import Select from 'react-select'
import { useProductCategory } from "../../features/productCategory/useProductCategory";
import NeogenInput from "../neogen/keyboard-input/neogen-input/NeogenInput";
import NeogenButton from "../neogen/neogen-button/NeogenButton";

function ProductForm() {
  const {handleLogout} = useAuth();
  const navigate = useNavigate();
  const {id} = useParams<{id: string}>();
  const {categories} = useProductCategory()

  const options = categories.map((category) => {
    return {value: category.id, label: category.name}
  })

  const [productFormData, setProductFormData] = useState<CreateProduct | UpdateProduct> ({
    name: '',
    desc: undefined,
    sku: '',
    barCode: undefined,
    costPrice: 0,
    salePrice: 0,
    currentStock: undefined,
    categoryId: undefined,
  });

  async function getProduct(id: number) {
    try {
        const product = await productRepository.getById(id);
        setProductFormData(product);
    }
    catch (error: any) {
        if(error.toString().includes('401')) handleLogout();
    }
  }

  useEffect(() => {
    if (id) getProduct(+id);
  }, [id]);

  function onInputChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    const numericFields = ['costPrice', 'salePrice', 'currentStock'];
    
    setProductFormData({
        ...productFormData,
        [name]: numericFields.includes(name) ? (value ? parseFloat(value) : undefined) : value,
    })
  }

  function onCategoryChange(selectedOption: {value: number, label: string} | null) {
    setProductFormData({
      ...productFormData,
      categoryId: selectedOption?.value
    })
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(productFormData)

    try {
        if(!id) await productRepository.create(productFormData as CreateProduct);
        else await productRepository.update(+id, productFormData as UpdateProduct);
        navigate('/products');
    }
    catch (e: any) {
        alert("Erro ao salvar Produto!");
        console.error("Erro ao salvar o produto: ", e);
    }
  }

  const darkLabelStyle = { color: "rgba(0, 0, 0, 0.75)" };
  const darkInputStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.92)",
    borderColor: "rgba(0, 0, 0, 0.28)",
    color: "#0f172a",
  };

  const selectedCategory = productFormData.categoryId 
    ? options.find(opt => opt.value === productFormData.categoryId)
    : null;

  return (
    <div
      className="flex flex-col items-center px-4 md:py-6 sm:py-10"
      style={{ background: "linear-gradient(135deg, #f5f8ff 0%, #edf2ff 45%, #f8fafc 100%)" }}
    >
      <div className="w-full max-w-2xl lg:max-w-6xl rounded-[32px] bg-white/75 shadow-2xl backdrop-blur border border-white/60 overflow-hidden">
        <div className="p-3 sm:p-8 lg:p-12">
            <div className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl michroma-700 text-[#0f172a]">{id ? 'Editar dados de produto' : 'Novo produto'}</h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-500 oxanium-400">
                Preencha as informações para adicionar o produto ao catálogo.
              </p>
            </div>

            <form className="space-y-4 sm:space-y-5" onSubmit={onSubmit}>
              <NeogenInput
                label="Nome do produto"
                type="text"
                id="name"
                name="name"
                placeholder="Nome do produto"
                value={productFormData.name}
                labelStyle={darkLabelStyle}
                inputStyle={darkInputStyle}
                onChange={(e: ChangeEvent<HTMLInputElement>) => onInputChange(e)}
              />

              <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
                <NeogenInput
                  label="SKU"
                  type="text"
                  id="sku"
                  name="sku"
                  placeholder="SKU-001"
                  value={productFormData.sku}
                  labelStyle={darkLabelStyle}
                  inputStyle={darkInputStyle}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => onInputChange(e)}
                />
                <NeogenInput
                  label="Código de Barras (opcional)"
                  type="text"
                  id="barCode"
                  name="barCode"
                  placeholder="123456789012"
                  value={productFormData.barCode || ''}
                  labelStyle={darkLabelStyle}
                  inputStyle={darkInputStyle}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => onInputChange(e)}
                />
              </div>

              <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
                <NeogenInput
                  label="Preço de Custo"
                  type="number"
                  id="costPrice"
                  name="costPrice"
                  placeholder="0.00"
                  step="0.01"
                  value={productFormData.costPrice}
                  labelStyle={darkLabelStyle}
                  inputStyle={darkInputStyle}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => onInputChange(e)}
                />
                <NeogenInput
                  label="Preço de Venda"
                  type="number"
                  id="salePrice"
                  name="salePrice"
                  placeholder="0.00"
                  step="0.01"
                  value={productFormData.salePrice}
                  labelStyle={darkLabelStyle}
                  inputStyle={darkInputStyle}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => onInputChange(e)}
                />
              </div>

              <NeogenInput
                label="Estoque Atual (opcional)"
                type="number"
                id="currentStock"
                name="currentStock"
                placeholder="0"
                value={productFormData.currentStock || ''}
                labelStyle={darkLabelStyle}
                inputStyle={darkInputStyle}
                onChange={(e: ChangeEvent<HTMLInputElement>) => onInputChange(e)}
              />

              <div>
                <label style={darkLabelStyle} className="block text-sm font-medium oxanium-400 mb-2">
                  Categoria (opcional)
                </label>
                <Select
                  options={options}
                  value={selectedCategory}
                  onChange={onCategoryChange}
                  isClearable
                  isSearchable
                  placeholder="Selecione uma categoria..."
                  styles={{
                    control: (base) => ({
                      ...base,
                      backgroundColor: "rgba(255, 255, 255, 0.92)",
                      borderColor: "rgba(0, 0, 0, 0.28)",
                      color: "#0f172a",
                      borderRadius: "0.375rem",
                      padding: "0.25rem",
                      minHeight: "2.5rem",
                    }),
                    input: (base) => ({
                      ...base,
                      color: "#0f172a",
                    }),
                    option: (base, state) => ({
                      ...base,
                      backgroundColor: state.isSelected ? "#0f172a" : state.isFocused ? "#f1f5f9" : "white",
                      color: state.isSelected ? "white" : "#0f172a",
                    }),
                  }}
                />
              </div>

              <NeogenInput
                label="Descrição (opcional)"
                type="text"
                id="desc"
                name="desc"
                placeholder="Descrição do produto"
                value={productFormData.desc || ''}
                labelStyle={darkLabelStyle}
                inputStyle={darkInputStyle}
                onChange={(e: ChangeEvent<HTMLInputElement>) => onInputChange(e)}
              />

              <NeogenButton type="submit" style={{ backgroundColor: "#0f172a" }}>
                Salvar produto
              </NeogenButton>
            </form>

            <div className="mt-4 sm:mt-6 rounded-2xl border border-slate-200 bg-slate-50 px-3 sm:px-4 py-2 sm:py-3 text-xs text-slate-500 oxanium-400">
              Galeria de imagens e variações de produtos estarão disponíveis em breve.
            </div>
        </div>
      </div>
    </div>
  );
}

export default ProductForm;