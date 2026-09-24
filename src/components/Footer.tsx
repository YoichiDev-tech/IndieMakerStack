export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink/10 bg-paper/60">
      <div className="mx-auto w-full max-w-5xl px-4 py-6 text-sm text-ink/50">
        © {year} PrismStack — a directory of tools and resources for indie makers.
      </div>
    </footer>
  );
}