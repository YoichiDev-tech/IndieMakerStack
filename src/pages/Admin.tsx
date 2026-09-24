import { useState } from "react";
import Loader from "../components/Loader";
import ErrorState from "../components/ErrorState";
import { useTools } from "../hooks/useTools";

// Basic admin page: lists all tools with a delete action.
// No authentication in v1, per the requirements — this page is
// intended to sit behind a private URL or be gated later.
export default function Admin() {
  const { tools, loading, error, deleteTool, refetch } = useTools();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  async function handleDelete(id: string) {
    setDeletingId(id);
    setActionError(null);

    const { error: deleteError } = await deleteTool(id);

    setDeletingId(null);

    if (deleteError) {
      setActionError(deleteError);
    }
  }

  return (
    <div>
      <h1 className="text-xl font-semibold text-gray-900">Admin</h1>
      <p className="mt-1 text-sm text-gray-500">
        Manage submitted tools. No authentication is enforced in v1.
      </p>

      {actionError && (
        <p className="mt-4 text-sm text-red-600">{actionError}</p>
      )}

      <div className="mt-6">
        {loading && <Loader />}
        {!loading && error && (
          <ErrorState message={`Failed to load tools: ${error}`} onRetry={refetch} />
        )}
        {!loading && !error && tools.length === 0 && (
          <p className="py-12 text-center text-sm text-gray-500">
            No tools submitted yet.
          </p>
        )}
        {!loading && !error && tools.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-gray-500">
                  <th className="py-2 pr-4 font-medium">Name</th>
                  <th className="py-2 pr-4 font-medium">Category</th>
                  <th className="py-2 pr-4 font-medium">Link</th>
                  <th className="py-2 pr-4 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {tools.map((tool) => (
                  <tr key={tool.id} className="border-b border-gray-100">
                    <td className="py-2 pr-4 text-gray-900">{tool.name}</td>
                    <td className="py-2 pr-4 text-gray-600">
                      {tool.category}
                    </td>
                    <td className="py-2 pr-4 text-gray-600">
                      <a
                        href={tool.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-gray-900"
                      >
                        {tool.link}
                      </a>
                    </td>
                    <td className="py-2 pr-4">
                      <button
                        onClick={() => handleDelete(tool.id)}
                        disabled={deletingId === tool.id}
                        className="rounded-md border border-gray-300 px-2 py-1 text-xs text-gray-700 hover:border-red-400 hover:text-red-600 disabled:opacity-50"
                      >
                        {deletingId === tool.id ? "Deleting..." : "Delete"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
