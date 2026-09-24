import { useCallback, useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { NewTool, Tool } from "../types";

interface UseToolsResult {
  tools: Tool[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
  addTool: (tool: NewTool) => Promise<{ error: string | null }>;
  deleteTool: (id: string) => Promise<{ error: string | null }>;
}

// Central hook for reading and writing tools from Supabase.
// Keeping data access in one hook keeps pages and components simple.
export function useTools(): UseToolsResult {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTools = useCallback(async () => {
    setLoading(true);
    setError(null);

    const { data, error: fetchError } = await supabase
      .from("tools")
      .select("*")
      .order("created_at", { ascending: false });

    if (fetchError) {
      setError(fetchError.message);
      setTools([]);
    } else {
      setTools(data ?? []);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    fetchTools();
  }, [fetchTools]);

  // Inserts a new tool and refreshes the local list on success.
  const addTool = useCallback(
    async (tool: NewTool) => {
      const { error: insertError } = await supabase.from("tools").insert([tool]);

      if (insertError) {
        return { error: insertError.message };
      }

      await fetchTools();
      return { error: null };
    },
    [fetchTools]
  );

  // Deletes a tool by id and refreshes the local list on success.
  const deleteTool = useCallback(
    async (id: string) => {
      const { error: deleteError } = await supabase
        .from("tools")
        .delete()
        .eq("id", id);

      if (deleteError) {
        return { error: deleteError.message };
      }

      await fetchTools();
      return { error: null };
    },
    [fetchTools]
  );

  return { tools, loading, error, refetch: fetchTools, addTool, deleteTool };
}
