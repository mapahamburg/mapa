import type { Metadata } from "next";
import { NewPostForm } from "./NewPostForm";

export const metadata: Metadata = {
  title: "Neuer Beitrag · mapa",
};

export default function NewPostPage() {
  return (
    <main
      style={{
        flex: 1,
        padding: "40px 32px",
        minWidth: 0,
      }}
    >
      <NewPostForm />
    </main>
  );
}
