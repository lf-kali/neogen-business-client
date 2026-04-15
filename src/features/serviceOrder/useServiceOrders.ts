import { useCallback, useEffect, useState } from "react";
import type { ServiceOrder } from "./serviceOrder.types";
import { type ApiError, toApiError } from "../../api/http/apiError";
import { serviceOrderRepository } from "./serviceOrder.repository";

export function useServiceOrders() {
    const [serviceOrders, setServiceOrders] = useState<ServiceOrder[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<ApiError | null>(null);
    
    const reload = useCallback(async () => {
        console.log("CARREGANDO ORDENS DE SERVIÇO...")

        setLoading(true);
        setError(null);

        try {
            const data = await serviceOrderRepository.list();
            setServiceOrders(data); 
            console.log("ORDENS DE SERVIÇO CARREGADAS: ", data )
        }
        catch (e){
            setError(toApiError(e));
        }
        finally{
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        void reload();
    }, [reload]);

    return { serviceOrders, loading, error, reload};
}