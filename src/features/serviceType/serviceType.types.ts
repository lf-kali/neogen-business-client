import type { ServiceOrder } from "../serviceOrder/serviceOrder.types";

export type ServiceType = {
    id: number;
    name: string;
    costPrice?: number;
    salePrice: number;
    comssionPercent?: number;
    desc?: string;
    serviceOrders: ServiceOrder[];
}

export type CreateServiceType = {
    name: string;
    costPrice?: number;
    comissionPercent?: number;
    desc?: string;
}

export type UpdateServiceType = Partial<CreateServiceType>