import { useEffect, useState } from "react";
import { SingleWordOption } from "../types/autocomplete";
import { fetchSuggestions } from "../services/suggestions";

type AutoCompleteError = {
  message: string;
  error: unknown;
};

export const useAutoCompleteSuggestions = (value: string) => {
  const [data, setData] = useState<SingleWordOption[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<AutoCompleteError | null>(null);

  const controller = new AbortController();
  const signal = controller.signal;

  useEffect(() => {
    if (!value.trim()) {
      setData([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    const fetchData = async () => {
      try {
        const response = await fetchSuggestions(value);
        setData(response);
      } catch (error) {
        setError({ message: "Error occurred", error: error });
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
