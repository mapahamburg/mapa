import type { Metadata } from "next";
import { NewPostForm } from "./NewPostForm";

export const metadata: Metadata = {
  title: "Neuer Beitrag · mapa",
};

export default function NewPostPage() {
  return (
    <main className="form-main-pad">
      <NewPostForm />
    </main>
  );
}
