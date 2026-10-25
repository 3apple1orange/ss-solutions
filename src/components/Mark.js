export default function Mark({ children, delay = 400 }) {
  return (
    <span className="mark" style={{ "--mark-delay": `${delay}ms` }}>
      {children}
    </span>
  );
}