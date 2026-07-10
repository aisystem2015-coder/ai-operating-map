export default function ChartSource({
  label,
  href,
}: {
  label: string;
  href?: string;
}) {
  return (
    <div className="text-xs text-secondary/70">
      <span>Source: {label}</span>
      {href && (
        <>
          {" — "}
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline underline-offset-4 font-medium"
          >
            Link
          </a>
        </>
      )}
    </div>
  );
}
