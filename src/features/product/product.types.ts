import type { ProductCategory } from "../productCategory/productCategory.types";
import type { ServiceOrder } from "../serviceOrder/serviceOrder.types";

export type Product = {
    id: number;
    name: string;
    desc?: string;
    sku: string;
    barCode?: string;
    costPrice: number;
    salePrice: number;
    currentStock?: number;
    category?: ProductCategory;
    serviceOrders: ServiceOrder[];
}

export type CreateProduct = {
    name: string;
    desc?: string;
    sku: string;
    barCode?: string;
    costPrice: number;
    salePrice: number;
    currentStock?: number;
    categoryId?: number; 
}

export type UpdateProduct = Partial<CreateProduct>;