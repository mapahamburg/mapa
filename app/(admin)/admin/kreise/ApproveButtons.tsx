"use client";

import { approveKreis, rejectKreis } from "@/app/actions/kreise";

export function ApproveButtons({ kreisId }: { kreisId: string }) {
  async function approve() { await approveKreis(kreisId); }
  async function reject()  { await rejectKreis(kreisId); }

  return (
    <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
      <form action={approve}>
        <button
          type="submit"
          style={{
            background: "var(--mapa-sage-500, #6F855A)",
            color: "#fff",
            border: "none",
            borderRadius: 999,
            padding: "10px 20px",
            fontFamily: "var(--font-ui)",
            fontSize: 14,
            fontWeight: 500,
            cursor: "pointer",
            minHeight: 44,
          }}
        >
          Freischalten
        </button>
      </form>
      <form action={reject}>
        <button
          type="submit"
          style={{
            background: "transparent",
            color: "var(--fg-muted)",
            border: "1px solid var(--mapa-line)",
            borderRadius: 999,
            padding: "10px 20px",
            fontFamily: "var(--font-ui)",
            fontSize: 14,
            fontWeight: 400,
            cursor: "pointer",
            minHeight: 44,
          }}
        >
          Ablehnen
        </button>
      </form>
    </div>
  );
}
