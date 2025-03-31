import { SingleWordOption } from "../types/autocomplete";
const API_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

export const fetchSuggestions = async (
  query: string,
  signal?: AbortSignal
): Promise<SingleWordOption[]> => {
  const response = await fetch(`${API_BASE_URL}/suggestions`, { signal });

  if (!response.ok) {
    throw new Error(`Failed to fetch suggestions: ${response.statusText}`);
  }

  const data: SingleWordOption[] = await response.json();

  return data.filter((item) =>
    item.text.toLowerCase().includes(query.toLowerCase())
  );
};
