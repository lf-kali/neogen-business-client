import { useParams } from "react-router-dom"
import CustomerForm from "../../components/customers/CustomerForm"


function CustomerUpdate() {
    const {id} = useParams<{id: string}>()
    return (
        <CustomerForm entityId={id ? +id : 0}/>
    )
}

export default CustomerUpdate