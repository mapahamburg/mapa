const PULSE: React.CSSProperties = {
  animation: "skeleton-pulse 1.6s ease-in-out infinite",
  background: "var(--color-line-soft)",
  borderRadius: 8,
};

export default function PostDetailLoading() {
  return (
    <article className="post-detail-article" style={{ fontFamily: "var(--font-ui)" }}>
      {/* Back link */}
      <div style={{ ...PULSE, width: 140, height: 14 }} />

      {/* Post card */}
      <div style={{
        background: "var(--color-ivory)",
        border: "1px solid var(--color-line-soft)",
        borderRadius: 20,
        marginTop: 20,
        padding: 32,
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}>
        <div style={{ ...PULSE, width: 80, height: 22, borderRadius: 999 }} />
        <div style={{ ...PULSE, width: "85%", height: 32, borderRadius: 6 }} />
        <div style={{ ...PULSE, width: "60%", height: 32, borderRadius: 6 }} />
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <div style={{ ...PULSE, width: 40, height: 40, borderRadius: "50%" }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ ...PULSE, width: 120, height: 12 }} />
            <div style={{ ...PULSE, width: 160, height: 11 }} />
          </div>
        </div>
        <div style={{ ...PULSE, width: "100%", height: 14 }} />
        <div style={{ ...PULSE, width: "90%", height: 14 }} />
        <div style={{ ...PULSE, width: "75%", height: 14 }} />
      </div>

      {/* Comments */}
      <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ ...PULSE, width: 100, height: 11 }} />
        {[1, 2].map((i) => (
          <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
            <div style={{ ...PULSE, width: 32, height: 32, borderRadius: "50%" }} />
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ ...PULSE, width: 180, height: 11 }} />
              <div style={{ ...PULSE, width: "80%", height: 13 }} />
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}
