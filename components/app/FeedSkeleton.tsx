/** Skeleton shown while the feed data loads. Matches the FeedColumn layout. */

const PULSE: React.CSSProperties = {
  animation: "skeleton-pulse 1.6s ease-in-out infinite",
};

const BONE = (w: string | number, h: number, radius = 8): React.CSSProperties => ({
  width: w,
  height: h,
  borderRadius: radius,
  background: "var(--color-line-soft)",
  ...PULSE,
});

function SkeletonCard() {
  return (
    <div
      style={{
        background: "var(--color-paper)",
        border: "1px solid var(--color-line-soft)",
        borderRadius: 18,
        padding: "22px 24px",
        display: "grid",
        gridTemplateColumns: "40px 1fr",
        gap: 16,
        alignItems: "start",
      }}
    >
      {/* Avatar */}
      <div style={{ ...BONE(40, 40, 999) }} />

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {/* Author line */}
        <div style={BONE("55%", 11)} />
        {/* Title */}
        <div style={BONE("92%", 18)} />
        <div style={BONE("72%", 18)} />
        {/* Action row */}
        <div style={{ display: "flex", gap: 12, marginTop: 4 }}>
          <div style={BONE(60, 10)} />
          <div style={BONE(60, 10)} />
        </div>
      </div>
    </div>
  );
}

function SkeletonDivider() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 18, margin: "36px 0 14px" }}>
      <div style={BONE(120, 10)} />
      <div style={{ flex: 1, height: 1, background: "var(--color-line)" }} />
    </div>
  );
}

export function FeedSkeleton() {
  return (
    <main className="app-feed" aria-busy="true" aria-label="Feed lädt…">
      {/* Header */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={BONE(180, 10)} />
        <div style={BONE(220, 32, 6)} />
        <div style={BONE(300, 14)} />
      </div>

      {/* District filter chips */}
      <div style={{ display: "flex", gap: 8, marginTop: 20, flexWrap: "wrap" }}>
        {[80, 100, 90, 130].map((w, i) => (
          <div key={i} style={{ ...BONE(w, 32, 999) }} />
        ))}
      </div>

      <SkeletonDivider />

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>

      <SkeletonDivider />

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </main>
  );
}
