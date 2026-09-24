import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import ErrorState from "../components/ErrorState";
import { supabase } from "../lib/supabaseClient";
import { Tool } from "../types";

// Tool detail page: fetches a single tool by id from the route params
// and displays its full description plus a link to the external site.
export default function ToolDetail() {
  const { id } = useParams<{ id: string }>();
  const [tool, setTool] = useState<Tool | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchTool() {
      if (!id) return;

      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from("tools")
        .select("*")
        .eq("id", id)
        .single();

      if (!isMounted) return;

      if (fetchError) {
        setError(fetchError.message);
        setTool(null);
      } else {
        setTool(data);
      }

      setLoading(false);
    }

    fetchTool();

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) return <Loader />;

  if (error || !tool) {
    return (
      <ErrorState message={error ? `Failed to load tool: ${error}` : "Tool not found."} />
    );
  }

  return (
    <div>
      <Link to="/" className="text-sm text-gray-500 hover:text-gray-900">
        &larr; Back to tools
      </Link>

      <div className="mt-4">
        <div className="flex items-start justify-between gap-2">
          <h1 className="text-xl font-semibold text-gray-900">{tool.name}</h1>
          <span className="whitespace-nowrap rounded-full border border-gray-200 px-2 py-0.5 text-xs text-gray-500">
            {tool.category}
          </span>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-gray-700">
          {tool.description}
        </p>

        <a
          href={tool.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-900 hover:border-gray-500"
        >
          Visit tool
        </a>
      </div>
    </div>
  );
}
