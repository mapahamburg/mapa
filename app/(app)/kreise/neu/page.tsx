import type { Metadata } from "next";
import { ProposeKreisForm } from "./ProposeKreisForm";

export const metadata: Metadata = {
  title: "Kreis vorschlagen · mapa",
};

export default function KreisNeuPage() {
  return (
    <main
      style={{
        flex: 1,
        padding: "40px 32px",
        minWidth: 0,
      }}
    >
      <ProposeKreisForm />
    </main>
  );
}
