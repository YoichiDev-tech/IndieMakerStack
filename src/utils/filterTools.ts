import { Tool } from "../types";

// Filters a list of tools by a search query (matched against name and
// description) and an optional category. Both filters are case-insensitive.
export function filterTools(
  tools: Tool[],
  query: string,
  category: string
): Tool[] {
  const normalizedQuery = query.trim().toLowerCase();
  const normalizedCategory = category.trim().toLowerCase();

  return tools.filter((tool) => {
    const matchesQuery =
      normalizedQuery === "" ||
      tool.name.toLowerCase().includes(normalizedQuery) ||
      tool.description.toLowerCase().includes(normalizedQuery);

    const matchesCategory =
      normalizedCategory === "" ||
      normalizedCategory === "all" ||
      tool.category.toLowerCase() === normalizedCategory;

    return matchesQuery && matchesCategory;
  });
}
