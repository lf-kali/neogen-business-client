import { useCallback, useEffect, useState } from "react";
import type { DeviceBrand } from "../types/deviceBrand.types";
import { type ApiError, toApiError } from "../../../api/http/apiError";
import { cellphoneBrandRepository } from "../repository/cellphoneBrand.repository";
import type { DeviceCategory } from "../../device/types/device.types";
import type { DeviceBrandRepository } from "./useDeviceBrandRepository";
import { laptopBrandRepository } from "../repository/laptopBrand.repository";


export function useDevicebrands(deviceType: DeviceCategory) {

    const repoMap: Record<DeviceCategory, DeviceBrandRepository> = {
        Cellphone: cellphoneBrandRepository,
        Laptop: laptopBrandRepository,
    }

    const repo = repoMap[deviceType];

    const [brandList, setBrandList] = useState<DeviceBrand[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<ApiError | null>(null);

    const reload = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const data = await repo.list();
            setBrandList(data);
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

    return {brandList, loading, error, reload};
}