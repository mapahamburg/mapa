"use client";

import { useState, useRef } from "react";
import { ImagePlus, X, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

// Compress an image client-side: max 1600px long edge, JPEG quality 0.82.
// Keeps uploads small without any external library.
async function compress(file: File): Promise<Blob> {
  const bitmap = await createImageBitmap(file);
  const MAX = 1600;
  let { width, height } = bitmap;
  if (width > MAX || height > MAX) {
    const scale = MAX / Math.max(width, height);
    width = Math.round(width * scale);
    height = Math.round(height * scale);
  }
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return file;
  ctx.drawImage(bitmap, 0, 0, width, height);
  return new Promise((resolve) => {
    canvas.toBlob(
      (blob) => resolve(blob ?? file),
      "image/jpeg",
      0.82
    );
  });
}

interface ImageUploadProps {
  labelStyle: React.CSSProperties;
}

export function ImageUpload({ labelStyle }: ImageUploadProps) {
  const [url, setUrl] = useState("");
  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Bitte wähle ein Bild.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("Das Bild ist zu groß (max. 10 MB).");
      return;
    }

    setError("");
    setUploading(true);
    setPreview(URL.createObjectURL(file));

    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setError("Bitte melde dich an.");
        setUploading(false);
        return;
      }

      const blob = await compress(file);
      const path = `${user.id}/${crypto.randomUUID()}.jpg`;

      const { error: upErr } = await supabase.storage
        .from("post-images")
        .upload(path, blob, { contentType: "image/jpeg", upsert: false });

      if (upErr) {
        setError("Upload fehlgeschlagen. Bitte versuch es erneut.");
        setUploading(false);
        setPreview("");
        return;
      }

      const { data } = supabase.storage.from("post-images").getPublicUrl(path);
      setUrl(data.publicUrl);
    } catch {
      setError("Upload fehlgeschlagen. Bitte versuch es erneut.");
      setPreview("");
    } finally {
      setUploading(false);
    }
  }

  function remove() {
    setUrl("");
    setPreview("");
    setError("");
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div>
      <span style={labelStyle}>
        Foto{" "}
        <span style={{ fontWeight: 400, letterSpacing: 0 }}>(wenn du magst)</span>
      </span>

      {/* Hidden field carries the uploaded URL into the form */}
      <input type="hidden" name="image_url" value={url} />

      {preview ? (
        <div
          style={{
            position: "relative",
            borderRadius: 12,
            overflow: "hidden",
            border: "1px solid var(--color-line)",
            background: "var(--color-sunk)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={preview}
            alt="Vorschau"
            style={{
              width: "100%",
              maxHeight: 280,
              objectFit: "cover",
              display: "block",
              opacity: uploading ? 0.6 : 1,
            }}
          />
          {uploading && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--color-paper)",
              }}
            >
              <Loader2 size={24} strokeWidth={2} className="spin" />
            </div>
          )}
          {!uploading && (
            <button
              type="button"
              onClick={remove}
              aria-label="Foto entfernen"
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                width: 32,
                height: 32,
                borderRadius: 999,
                background: "rgba(23,22,20,0.7)",
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <X size={16} strokeWidth={2} color="#fff" />
            </button>
          )}
        </div>
      ) : (
        <label
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            padding: "28px 20px",
            background: "var(--color-paper)",
            border: "1.5px dashed var(--color-line)",
            borderRadius: 12,
            cursor: "pointer",
            transition: "border-color 160ms",
          }}
        >
          <ImagePlus size={22} strokeWidth={1.5} color="var(--color-muted)" />
          <span
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: 14,
              color: "var(--color-muted)",
            }}
          >
            Foto hinzufügen
          </span>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleFile}
            style={{ display: "none" }}
          />
        </label>
      )}

      {error && (
        <p
          style={{
            marginTop: 8,
            fontFamily: "var(--font-ui)",
            fontSize: 13,
            color: "var(--color-danger)",
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
}
