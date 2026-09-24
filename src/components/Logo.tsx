export function Logo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={`h-8 w-8 ${className}`}
      aria-hidden="true"
    >
      <rect width="40" height="40" rx="10" fill="var(--color-ink, #14121A)" />
      <path
        d="M12 27V13h6.2c3.6 0 5.8 1.9 5.8 5s-2.2 5-5.8 5H15v4h-3Zm3-7h3c1.7 0 2.7-.8 2.7-2.1S19.7 15.8 18 15.8h-3V20Z"
        fill="var(--color-amber, #F5A623)"
      />
      <circle cx="28" cy="27" r="2.6" fill="var(--color-coral, #FF6B5B)" />
    </svg>
  );
}