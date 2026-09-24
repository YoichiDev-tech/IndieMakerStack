// Minimal footer. No branding, just a neutral closing line.
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200">
      <div className="mx-auto w-full max-w-5xl px-4 py-6 text-sm text-gray-500">
        {year} — A directory of tools and resources for indie makers.
      </div>
    </footer>
  );
}
