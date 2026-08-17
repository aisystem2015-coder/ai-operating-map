interface FGMarkProps {
  className?: string;
  size?: number;
}

export default function FGMark({ className = "", size = 24 }: FGMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Simple geometric monogram - F and G combined */}
      <rect width="24" height="24" rx="4" fill="#0a1838" />
      <path
        d="M7 6h6v2H9v3h4v2H9v4H7V6z"
        fill="white"
      />
      <path
        d="M13 6h4c1.5 0 2.5 1 2.5 2.5 0 1-0.5 1.8-1.5 2.2l2.5 4.3h-2.5l-2-3.5h-1v3.5h-2V6zm2 4h2c0.5 0 1-0.4 1-1s-0.5-1-1-1h-2v2z"
        fill="white"
      />
    </svg>
  );
}




