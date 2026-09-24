import { Link } from "react-router-dom";
import { Category } from "../types";

interface CategoryCardProps {
  category: Category;
}

// Displays a single category as a clickable card. Navigates to the
// home page pre-filtered to this category via a query parameter.
export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      to={`/?category=${encodeURIComponent(category.name)}`}
      className="block rounded-lg border border-gray-200 p-4 text-center transition hover:border-gray-400"
    >
      <span className="text-sm font-medium text-gray-900">
        {category.name}
      </span>
    </Link>
  );
}
