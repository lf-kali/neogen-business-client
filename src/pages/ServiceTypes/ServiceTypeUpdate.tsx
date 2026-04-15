import { useParams } from "react-router-dom"
import ServiceTypeForm from "../../components/serviceTypes/ServiceTypeForm"


function ServiceTypeUpdate() {
  const {id} = useParams<{id: string}>()
  return (
    <ServiceTypeForm entityId={id ? +id : 0}/>
  )
}

export default ServiceTypeUpdate