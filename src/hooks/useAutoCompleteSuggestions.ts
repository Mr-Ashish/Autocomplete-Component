import { useEffect, useState } from "react";
import { SingleWordOption } from "../types/autocomplete";
import { fetchSuggestions } from "../services/suggestions";

type AutoCompleteError = {
  message: string;
};

type UseAutoCompleteSuggestionsResult = {
  data: SingleWordOption[];
  loading: boolean;
  error: AutoCompleteError | null;
};

export const useAutoCompleteSuggestions = (
  value: string
): UseAutoCompleteSuggestionsResult => {
  const [data, setData] = useState<SingleWordOption[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<AutoCompleteError | null>(null);

  useEffect(() => {
    const controller = new AbortController(); // ✅ created on each effect run
    const signal = controller.signal;

    if (!value.trim()) {
      setData([]);
      return;
    }
    setLoading(true);
    setError(null);
    const fetchData = async () => {
      try {
        const response = await fetchSuggestions(value, signal);
        setData(response);
      } catch (error) {
        if (signal.aborted) return;
        setError({
          message: error instanceof Error ? error.message : "Unknown error",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort(); // Cleanup on value change or unmount
    };
  }, [value]);
  return { data, loading, error };
};
