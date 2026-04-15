import { useParams } from "react-router-dom"
import ProductForm from "../../components/product/ProductForm"

function ProductUpdate() {
  const {id} = useParams<{id: string}>()


  return (
    <ProductForm entityId={id ? +id : 0}/>
  )
}

export default ProductUpdate