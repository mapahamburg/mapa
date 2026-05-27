"use server";

import { createClient } from "@/lib/supabase/server";
import { Resend } from "resend";

export type ContactState = {
  error?: string;
  success?: boolean;
};

export async function sendContactRequest(
  _prevState: ContactState,
  formData: FormData
): Promise<ContactState> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Bitte zuerst einloggen." };

  // Pull sender profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("first_name, stadtteil")
    .eq("id", user.id)
    .single();

  const senderName      = profile?.first_name ?? "Unbekannt";
  const senderStadtteil = profile?.stadtteil  ?? "";

  const recipientName = (formData.get("recipient_name") as string).trim();
  const postId        = (formData.get("post_id")        as string) || null;
  const postTitle     = (formData.get("post_title")     as string) || null;
  const message       = ((formData.get("message")       as string) ?? "").trim();
  const contactInfo   = (formData.get("contact_info")   as string).trim();

  if (!contactInfo) return { error: "Bitte deine Kontaktinfos hinterlassen." };
  if (!recipientName) return { error: "Empfänger fehlt." };

  // 1. Persist in DB
  const { error: dbError } = await (supabase.from("contact_requests") as any).insert({
    sender_id:        user.id,
    sender_name:      senderName,
    sender_stadtteil: senderStadtteil,
    recipient_name:   recipientName,
    post_id:          postId,
    post_title:       postTitle,
    message:          message || null,
    contact_info:     contactInfo,
  });

  if (dbError) {
    console.error("contact_requests insert error:", dbError);
    return { error: "Etwas ist schiefgelaufen. Bitte versuch es erneut." };
  }

  // 2. Send notification email to the mapa team
  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    const resend = new Resend(resendKey);

    const postLine = postTitle
      ? `<p><strong>Beitrag:</strong> „${postTitle}"${postId ? ` · <a href="https://mapa.hamburg/feed/${postId}">Öffnen</a>` : ""}</p>`
      : "";

    const messageLine = message
      ? `<p><strong>Nachricht:</strong><br>${message.replace(/\n/g, "<br>")}</p>`
      : "<p><em>Keine Nachricht hinterlassen.</em></p>";

    await resend.emails.send({
      from: "mapa <hey@mapa.hamburg>",
      to:   "hey@mapa.hamburg",
      subject: `Kontaktanfrage: ${senderName} möchte ${recipientName} kontaktieren`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;color:#1C1A17;">
          <h2 style="margin:0 0 20px">Neue Kontaktanfrage</h2>

          <p><strong>Von:</strong> ${senderName}${senderStadtteil ? `, ${senderStadtteil}` : ""}</p>
          <p><strong>An:</strong> ${recipientName}</p>
          ${postLine}
          <hr style="border:none;border-top:1px solid #E0D8C6;margin:20px 0">
          ${messageLine}
          <p><strong>Kontaktinfos des Absenders:</strong><br>
          <span style="font-size:16px;font-weight:600">${contactInfo}</span></p>
          <hr style="border:none;border-top:1px solid #E0D8C6;margin:20px 0">
          <p style="font-size:12px;color:#888">
            Bitte leite diese Anfrage manuell an ${recipientName} weiter,
            sofern sie den Hausregeln entspricht.
          </p>
        </div>
      `,
    });
  }

  return { success: true };
}
