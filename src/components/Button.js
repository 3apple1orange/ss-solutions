import Link from "next/link";

// variant: "solid" (on light), "solid-dark" (on the dark band), "outline"
export default function Button({ href, children, variant = "solid", className = "" }) {
  return (
    <Link href={href} className={`btn btn-${variant} ${className}`}>
      <span className="btn-label">
        <span>{children}</span>
        <span aria-hidden="true">{children}</span>
      </span>
    </Link>
  );
}