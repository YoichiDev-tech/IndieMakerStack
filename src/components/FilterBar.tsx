// import React from "react";

interface Category {
  id: string;
  name: string;
}

interface FilterBarProps {
  categories: Category[];
  value: string;
  onChange: (value: string) => void;
}

export default function FilterBar({
  categories,
  value,
  onChange,
}: FilterBarProps) {
  return (
    <div className="w-full sm:w-48">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-gray-300 bg-white px-3 pr-8 py-2 text-sm"
      >
        <option value="all">All categories</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>
    </div>
  );
}
