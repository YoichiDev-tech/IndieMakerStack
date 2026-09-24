import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ToolCard from "../components/ToolCard";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import Loader from "../components/Loader";
import ErrorState from "../components/ErrorState";
import { useTools } from "../hooks/useTools";
import { useCategories } from "../hooks/useCategories";
import { filterTools } from "../utils/filterTools";

// Home page: lists all tools with search and category filtering.
// The category filter can be pre-set via a "category" query param,
// which CategoryCard links use.
export default function Home() {
  const { tools, loading, error, refetch } = useTools();
  const { categories } = useCategories();
  const [searchParams, setSearchParams] = useSearchParams();

  const [query, setQuery] = useState("");
  const category = searchParams.get("category") ?? "all";

  const filteredTools = useMemo(
    () => filterTools(tools, query, category),
    [tools, query, category]
  );

  function handleCategoryChange(value: string) {
    if (value === "all") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", value);
    }
    setSearchParams(searchParams);
  }

  return (
    <div>
      <h1 className="text-xl font-semibold text-gray-900">Tools</h1>
      <p className="mt-1 text-sm text-gray-500">
        A directory of tools and resources for indie makers, founders, and
        solopreneurs.
      </p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <div className="flex-1">
          <SearchBar value={query} onChange={setQuery} />
        </div>
        <FilterBar
          categories={categories}
          value={category}
          onChange={handleCategoryChange}
        />
      </div>

      <div className="mt-6">
        {loading && <Loader />}
        {!loading && error && (
          <ErrorState
            message={`Failed to load tools: ${error}`}
            onRetry={refetch}
          />
        )}
        {!loading && !error && filteredTools.length === 0 && (
          <p className="py-12 text-center text-sm text-gray-500">
            No tools match your search.
          </p>
        )}
        {!loading && !error && filteredTools.length > 0 && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {filteredTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
