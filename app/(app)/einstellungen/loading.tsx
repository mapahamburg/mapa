const PULSE: React.CSSProperties = {
  animation: "skeleton-pulse 1.6s ease-in-out infinite",
  background: "var(--color-line-soft)",
  borderRadius: 8,
};

export default function EinstellungenLoading() {
  return (
    <main className="app-main-pad">
      <div style={{ maxWidth: 520, display: "flex", flexDirection: "column", gap: 28 }}>
        <div style={{ ...PULSE, width: 180, height: 28, borderRadius: 6 }} />
        {[1, 2, 3].map((i) => (
          <div key={i} style={{
            background: "var(--color-ivory)",
            border: "1px solid var(--color-line-soft)",
            borderRadius: 16,
            padding: 20,
            display: "flex",
            gap: 16,
            alignItems: "flex-start",
          }}>
            <div style={{ ...PULSE, width: 36, height: 36, borderRadius: 999 }} />
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ ...PULSE, width: "60%", height: 14 }} />
              <div style={{ ...PULSE, width: "80%", height: 12 }} />
            </div>
            <div style={{ ...PULSE, width: 44, height: 26, borderRadius: 999 }} />
          </div>
        ))}
      </div>
    </main>
  );
}
