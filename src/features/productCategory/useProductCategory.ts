import { useCallback, useEffect, useState } from "react";
import type { ProductCategory } from "./productCategory.types";
import { type ApiError, toApiError } from "../../api/http/apiError";
import { ProductCategoryRepository } from "./productCategory.repository";

export function useProductCategory() {
    const [categories, setCategories] = useState<ProductCategory[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<ApiError | null>(null);
    
    const reload = useCallback(async () => {
        console.log("CARREGANDO CATEGORIAS...")

        setLoading(true);
        setError(null);

        try {
            const data = await ProductCategoryRepository.list();
            setCategories(data); 
            console.log("CATEGORIAS CARREGADAS: ", data )
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

    return { categories, loading, error, reload};
}