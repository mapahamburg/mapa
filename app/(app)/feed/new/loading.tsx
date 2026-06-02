const PULSE: React.CSSProperties = {
  animation: "skeleton-pulse 1.6s ease-in-out infinite",
  background: "var(--color-line-soft)",
  borderRadius: 8,
};

export default function NewPostLoading() {
  return (
    <main className="form-main-pad">
      <div className="form-card" style={{ background: "var(--color-ivory)", border: "1px solid var(--color-line-soft)", maxWidth: 680, width: "100%" }}>
        <div style={{ ...PULSE, width: 180, height: 28, borderRadius: 6, marginBottom: 32 }} />
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          {[1, 2, 3].map((i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ ...PULSE, width: 60, height: 10 }} />
              <div style={{ ...PULSE, width: "100%", height: 44, borderRadius: 10 }} />
            </div>
          ))}
          <div style={{ ...PULSE, width: "100%", height: 52, borderRadius: 999 }} />
        </div>
      </div>
    </main>
  );
}
