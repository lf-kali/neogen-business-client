import { useCallback, useEffect, useState } from "react";
import type { DeviceBrand } from "./deviceBrand.types";
import { type ApiError, toApiError } from "../../api/http/apiError";
import { deviceBrandRepository } from "./deviceBrand.repository";


export function useDevicebrands() {
    const [deviceBrands, setDeviceBrands] = useState<DeviceBrand[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<ApiError | null>(null);

    const reload = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const data = await deviceBrandRepository.list();
            setDeviceBrands(data);
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

    return {deviceBrands, loading, error, reload};
}