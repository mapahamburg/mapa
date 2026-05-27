"use client";

import { useState } from "react";
import { ContactModal } from "./ContactModal";

interface Props {
  recipientName: string;
  postId?:       string;
  postTitle?:    string;
}

export function ContactButton({ recipientName, postId, postTitle }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen(true);
        }}
        style={{
          background: "none",
          border: "none",
          padding: 0,
          fontFamily: "var(--font-ui)",
          fontSize: 12.5,
          color: "var(--cobalt-500)",
          cursor: "pointer",
          lineHeight: 1,
          fontWeight: 500,
        }}
      >
        Kontaktieren
      </button>

      {open && (
        <ContactModal
          recipientName={recipientName}
          postId={postId}
          postTitle={postTitle}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
