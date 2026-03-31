import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";
import { CreateServiceType, UpdateServiceType } from "../../features/serviceType/serviceType.types";

function ServiceTypeForm() {
  const {handleLogout} = useAuth();
  const navigate = useNavigate();
  const {id} = useParams<{id: string}>();

  const [serviceTypeFormData, setServiceTypeFormData] = useState<CreateServiceType | UpdateServiceType>({
    
  })
  return (
    <div>ServiceTypeForm</div>
  )
}

export default ServiceTypeForm