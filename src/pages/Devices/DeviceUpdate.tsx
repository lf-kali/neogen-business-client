import { useParams } from "react-router-dom"
import DeviceForm from "../../components/devices/DeviceForm"

function DeviceUpdate() {
  const {id} = useParams<{id:string}>()
  return (
    <DeviceForm entityId={id ? +id : 0}/>
  )
}

export default DeviceUpdate