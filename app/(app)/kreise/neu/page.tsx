import type { Metadata } from "next";
import { ProposeKreisForm } from "./ProposeKreisForm";

export const metadata: Metadata = {
  title: "Kreis vorschlagen · mapa",
};

export default function KreisNeuPage() {
  return (
    <main className="form-main-pad">
      <ProposeKreisForm />
    </main>
  );
}
