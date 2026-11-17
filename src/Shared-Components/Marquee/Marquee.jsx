export default function Marquee({ items = [], speed = 38 }) {
  const row = [...items, ...items];
  return (
    <div className="rj-marquee" aria-hidden="true">
      <div className="rj-marquee-track" style={{ animationDuration: `${speed}s` }}>
        {row.map((t, i) => (
          <span key={i}>{t}<i>&#10022;</i></span>
        ))}
      </div>
    </div>
  );
}
