import { useCallback, useEffect, useState } from "react";
import type { Device } from "./device.types";
import { type ApiError, toApiError } from "../../api/http/apiError";
import { deviceRepository } from "./device.repository";


export function useDevices() {
    const [devices, setDevices] = useState<Device[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<ApiError | null>(null);

    const reload = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const data = await deviceRepository.list();
            setDevices(data);
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

    return {devices, loading, error, reload};
}