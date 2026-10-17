"use client";

export default function GlobalError({ reset }) {
  return (
    <html lang="en-IN">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          background: "#22a052",
          color: "#1e211e",
          fontFamily: "Georgia, 'Times New Roman', serif",
          display: "flex",
          alignItems: "center",
        }}
      >
        <main style={{ padding: "0 24px", maxWidth: 640, margin: "0 auto" }}>
          <h1 style={{ fontWeight: 300, fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.05 }}>
            Something went wrong.
          </h1>
          <p style={{ fontFamily: "Arial, sans-serif", lineHeight: 1.6 }}>
            Please try again, or return to the homepage.
          </p>
          <p style={{ display: "flex", gap: 16, fontFamily: "Arial, sans-serif" }}>
            <button
              type="button"
              onClick={() => reset()}
              style={{ padding: "12px 24px", border: "1px solid #1e211e", background: "transparent", borderRadius: 6, cursor: "pointer" }}
            >
              Try again
            </button>
            <a href="/" style={{ padding: "12px 24px", border: "1px solid #1e211e", borderRadius: 6, color: "inherit", textDecoration: "none" }}>
              Back to the homepage
            </a>
          </p>
        </main>
      </body>
    </html>
  );
}