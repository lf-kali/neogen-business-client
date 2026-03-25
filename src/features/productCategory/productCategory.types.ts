import type { Product } from "../product/product.types";

export type ProductCategory = {
    id: number
    name: string;
    products: Product[];
}

export type CreateProductCategory = {
    name: string;
}

export type UpdateProductCategory = Partial<CreateProductCategory>; 