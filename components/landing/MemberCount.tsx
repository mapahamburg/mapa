"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface MemberCountProps {
  /** Vom Server geladene Startzahl */
  initial: number;
  /** Fallback-Anzeige wenn Supabase nicht konfiguriert ist */
  fallback?: string;
}

export function MemberCount({ initial, fallback = "1.247" }: MemberCountProps) {
  const [count, setCount] = useState(initial);

  useEffect(() => {
    // Kein Realtime wenn Supabase nicht konfiguriert
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return;

    const channel = supabase
      .channel("member-count")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "profiles" },
        () => setCount((c) => c + 1)
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Wenn keine DB-Verbindung: Fallback anzeigen
  const display =
    count === 0
      ? fallback
      : count.toLocaleString("de-DE");

  return (
    <strong style={{ color: "var(--fg)", fontWeight: 500 }}>
      {display} Familien
    </strong>
  );
}
