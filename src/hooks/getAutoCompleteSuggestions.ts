import { useEffect, useState } from "react";
import { SingleWordOption } from "../types/autocomplete";
import words from "../utils/sampleData.json";

type AutoCompleteError = {
  message: string;
  error: unknown;
};

export const getAutoCompleteSuggestions = (value: string) => {
  const [data, setData] = useState<SingleWordOption[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<AutoCompleteError | null>(null);

  const controller = new AbortController();
  const signal = controller.signal;

  useEffect(() => {
    if (!value) setData([]);
    setLoading(true);
    setError(null);
    const fetchData = async () => {
      try {
        const response = await new Promise<SingleWordOption[]>((resolve) =>
          setTimeout(
            () =>
              resolve(
                words.filter((word: SingleWordOption) =>
                  word.text.toLowerCase().startsWith(value.toLowerCase())
                )
              ),
            300
          )
        );
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
