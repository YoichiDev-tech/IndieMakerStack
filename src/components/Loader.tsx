// Simple text-based loading indicator. Kept minimal on purpose,
// no spinner graphics or animation dependencies.
export default function Loader() {
  return (
    <div className="flex justify-center py-12 text-sm text-gray-500">
      Loading...
    </div>
  );
}
