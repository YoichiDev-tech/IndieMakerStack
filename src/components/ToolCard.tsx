import { Link } from "react-router-dom";
import { Tool } from "../types";

interface ToolCardProps {
  tool: Tool;
}

// Displays a single tool as a card. Links to the tool's detail page,
// not directly to the external link, so users see full context first.
export default function ToolCard({ tool }: ToolCardProps) {
  return (
    <Link
      to={`/tools/${tool.id}`}
      className="block rounded-lg border border-gray-200 p-4 transition hover:border-gray-400"
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-base font-medium text-gray-900">{tool.name}</h3>
        <span className="whitespace-nowrap rounded-full border border-gray-200 px-2 py-0.5 text-xs text-gray-500">
          {tool.category}
        </span>
      </div>
      <p className="mt-2 line-clamp-2 text-sm text-gray-600">
        {tool.description}
      </p>
    </Link>
  );
}
