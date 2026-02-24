import { useCallback, useEffect, useState } from "react";
import { toApiError, type ApiError } from "../../api/http/apiError";
import { costumerRepository } from "./costumer.repository";
import type { Costumer } from "./costumer.types";

export function useCostumers() {
  const [items, setItems] = useState<Costumer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await costumerRepository.list();
      setItems(data);
    } catch (e) {
      setError(toApiError(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void reload();
  }, [reload]);

  return { items, loading, error, reload };
}
