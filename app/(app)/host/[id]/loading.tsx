const PULSE: React.CSSProperties = {
  animation: "skeleton-pulse 1.6s ease-in-out infinite",
  background: "var(--color-line-soft)",
  borderRadius: 8,
};

export default function HostLoading() {
  return (
    <main className="app-main-pad">
      <div style={{ maxWidth: 560 }}>
        <div style={{ ...PULSE, width: 140, height: 14, marginBottom: 28 }} />
        <div style={{
          background: "var(--color-sage-soft)",
          borderRadius: 20,
          padding: 28,
          display: "flex",
          flexDirection: "column",
          gap: 16,
          marginBottom: 32,
        }}>
          <div style={{ ...PULSE, width: 100, height: 10 }} />
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <div style={{ ...PULSE, width: 56, height: 56, borderRadius: "50%" }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ ...PULSE, width: 140, height: 24, borderRadius: 6 }} />
              <div style={{ ...PULSE, width: 180, height: 12 }} />
            </div>
          </div>
          <div style={{ ...PULSE, width: "90%", height: 14 }} />
          <div style={{ ...PULSE, width: "75%", height: 14 }} />
          <div style={{ ...PULSE, width: 140, height: 38, borderRadius: 999 }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[1, 2, 3].map((i) => (
            <div key={i} style={{ display: "flex", gap: 12, alignItems: "center", padding: "8px 0" }}>
              <div style={{ ...PULSE, width: 70, height: 22, borderRadius: 999 }} />
              <div style={{ ...PULSE, flex: 1, height: 14 }} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
