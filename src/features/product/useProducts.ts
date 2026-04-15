import { useCallback, useEffect, useState } from "react";
import type { Product } from "./product.types";
import { type ApiError, toApiError } from "../../api/http/apiError";
import { productRepository } from "./product.repository";

export function useProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<ApiError | null>(null);

    const reload = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
          const data = await productRepository.list();
          setProducts(data); 
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

    return { products, loading, error, reload };
}