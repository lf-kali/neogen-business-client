import { useParams } from "react-router-dom"
import type { ProductCategory } from "../../../features/productCategory/productCategory.types";
import { useEffect, useState } from "react";
import { ProductCategoryRepository } from "../../../features/productCategory/productCategory.repository";
import { useAuth } from "../../../contexts/AuthContext";
import UpdateProductCategoryForm from "./UpdateProductCategoryForm";
import CreateProductCategoryForm from "./CreateProductCategoryForm";

function ProductCategoryFormResolve() {
  const {handleLogout} = useAuth();
  const {id} = useParams<{id: string}>();
  const [category, setCategory] = useState<ProductCategory| null>(null);

  async function getCategory(id: number) {
    try {
        const category = await ProductCategoryRepository.getById(id);
        setCategory(category);
    } catch (error: any) {
        if (error.toString.includes('401')) handleLogout()
    }
  }

  useEffect(() => {
    if(id) getCategory(+id);
  }, [id]);
  
  return (
    <>
      {
        (id && category) ? 
        (
          <UpdateProductCategoryForm category={category}/>
        ) : 
        (
          <CreateProductCategoryForm/>
        )
      }
    </>

  )
}

export default ProductCategoryFormResolve