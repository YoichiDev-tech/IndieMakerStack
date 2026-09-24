import { Link } from "react-router-dom";

// Fallback page for any unmatched route.
export default function NotFound() {
  return (
    <div className="flex flex-col items-center gap-3 py-24 text-center">
      <h1 className="text-xl font-semibold text-gray-900">Page not found</h1>
      <p className="text-sm text-gray-500">
        The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="mt-2 rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-900 hover:border-gray-500"
      >
        Back to home
      </Link>
    </div>
  );
}
