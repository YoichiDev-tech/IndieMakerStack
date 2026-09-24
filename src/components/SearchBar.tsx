interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

// Controlled text input for searching tools by name or description.
export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search tools..."
      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-gray-500 focus:outline-none"
    />
  );
}
