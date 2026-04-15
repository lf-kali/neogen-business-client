import { useCallback, useEffect, useState } from "react";
import type { ServiceType } from "./serviceType.types";
import { toApiError, type ApiError } from "../../api/http/apiError";
import { serviceTypeRepository } from "./serviceType.repository";

export function useServiceTypes() {
    const [serviceTypes, setServiceTypes] = useState<ServiceType[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<ApiError | null>(null);

    const reload = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const data = await serviceTypeRepository.list();
            setServiceTypes(data);
        } catch (error) {
            setError(toApiError(error));
        }
        finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        void reload();
    }, [reload]);

    return {serviceTypes, loading, error, reload};
}