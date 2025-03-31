import { SingleWordOption } from "../types/autocomplete";

const API_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

export const fetchSuggestions = async (query: string) => {
  const response = await fetch(`${API_BASE_URL}/suggestions`);
  const data = await response.json();
  return data.filter((item: SingleWordOption) =>
    item.text.toLowerCase().includes(query.toLowerCase())
  );
};
