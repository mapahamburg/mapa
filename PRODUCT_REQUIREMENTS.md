# MAPA — Product Requirements

> Stand: 26. Mai 2026. Ergänzt die MVP-Scope-Liste in `CLAUDE.md`.
> Diese Datei ist die Single Source of Truth für Feature-Planung und Prioritäten.

---

## Prioritätsstufen

| Stufe | Bedeutung |
|---|---|
| **P0** | Pflicht vor erstem echten Nutzer (legal/sicherheit) |
| **P1** | Required for MVP launch |
| **P2** | Bald nach Launch |
| **P3** | Post-MVP / Roadmap |

---

## 1 · Legal & Privacy

**P0 — vor erstem echten Nutzer**

| Feature | Status | Notizen |
|---|---|---|
| Cookie Consent Banner | ☐ | DSGVO-konform, keine Dark Patterns |
| Datenschutzerklärung | ☐ | `/datenschutz` |
| Impressum | ☐ | `/impressum` |
| Terms / Community Guidelines | ☐ | `/hausregeln` — Draft in `COMMUNITY_GUIDELINES.md` |
| Account Deletion Flow | ☐ | Vollständige Datenlöschung, bestätigter Flow |
| Password Reset Flow | ☐ | Per Email |
| Newsletter Opt-in Management | ☐ | Double Opt-in, jederzeit abmeldbar |
| DSGVO-konforme Datenhaltung | ☐ | Datenverarbeitung dokumentiert |
| Export / Deletion Request | ☐ | Artikel 17 + 20 DSGVO — Nutzer können Daten anfordern |

---

## 2 · Authentication & Account

**P1 — Required for MVP**

| Feature | Status | Notizen |
|---|---|---|
| Email Signup | ☐ | Mit Bestätigungs-Email |
| Login | ☐ | Email + Passwort |
| Magic Link Login | ☐ | Als Alternative zu Passwort — bevorzugte UX |
| Password Reset | ☐ | Via Email |
| Change Password | ☐ | In Account-Einstellungen |
| Edit Profile | ☐ | Name, Viertel, Bio, Interessen |
| Delete Account | ☐ | Vollständiger Flow inkl. Datenlöschung |
| District Selection | ☐ | Onboarding + jederzeit änderbar |
| Notification Settings | ☐ | Email-Präferenzen, später Push |
| Newsletter Preferences | ☐ | Opt-in/out granular |

---

## 3 · Profile

**Prinzipien:** minimal · ruhig · kein Social-Media-Gefühl

### Zeigen
- Vorname
- Stadtteil
- Kurze Bio (optional, 160 Zeichen max)
- Alter der Kinder (optional, nur Altersgruppen — kein Geburtsdatum)
- Interessen / Themen
- Beigetretene Gruppen (P2)
- Gespeicherte Orte/Events (P2)

### Nicht zeigen — verboten
- Follower-Anzahl
- Following-Anzahl
- Like-Counts
- Post-Counts als Metric
- "Aktiv"-Status / Online-Indikator
- Profilaufrufe / Views

---

## 4 · Messaging

### 4.1 · Direct Messages (DMs) — P2

**Nutzer können:**
- Private Nachrichten senden
- Private Nachrichten empfangen
- Nutzer blockieren / melden
- Gespräche stummschalten

**Tonalität:** einfach · sicher · ruhig
**Nicht:** WhatsApp-Dynamik, Discord-Channels, Slack-Threads

### 4.2 · Gruppen / Community Groups — P2/P3

**Mögliche Gruppen:**
- Winterhude Eltern
- Spielplatztreffen
- Yoga mit Baby
- Flohmarktgruppe
- Kita-Austausch
- Wochenendtipps

**Gruppen unterstützen:**
- Einfache threaded Conversations
- Event-Sharing
- Empfehlungen
- Moderation / Melden
- Lokalen Kontext (Stadtteil-gebunden)

---

## 5 · Moderation & Safety

**P1 — parallel zu Auth**

### Systeme

| Feature | Status | Notizen |
|---|---|---|
| Post melden | ☐ | |
| Nutzer melden | ☐ | |
| Nachricht melden | ☐ | P2, wenn DMs live |
| Moderation Queue | ☐ | Im Admin Dashboard |
| Keyword-Alerts | ☐ | Automatisch geflaggte Begriffe |
| Spam-Erkennung | ☐ | Basis-Heuristik |
| User Blocking | ☐ | Gegenseitig unsichtbar |
| Rollen-Permissions | ☐ | Siehe Rollen-Tabelle unten |

### Rollen

| Rolle | Kann |
|---|---|
| `user` | Posten, kommentieren, melden, blockieren |
| `local_host` | + Begrüßen, Threads schließen, Events erstellen, Empfehlungen kuratieren |
| `co_admin` | + Nutzer sperren, Moderation Queue bearbeiten |
| `admin` | Alles + Rollen vergeben, System-Config |

---

## 6 · Notifications

**P2 — Email sofort, Push mit iOS-App**

### Was benachrichtigt

| Event | Email | Push (später) |
|---|---|---|
| Neue Antwort auf eigenen Beitrag | ✓ | ✓ |
| Event in der Nähe | ✓ | ✓ |
| Neuer Beitrag im Viertel | Digest (wöchentlich) | ✓ |
| Neue DM | ✓ | ✓ |
| Gruppen-Aktivität | Digest | ✓ |
| Moderations-Alert | ✓ (Hosts) | ✓ (Hosts) |

### Anti-Engagement-Regeln
- Keine "Dein Beitrag wird gut aufgenommen!"-Notifications
- Kein täglicher Digest ohne Opt-in
- Keine Notification für Likes / Reactions
- Kein "X Personen haben deinen Beitrag gesehen"

---

## 7 · Future Features (P3 — Post-MVP)

- Native iOS App
- Native Android App
- Push Notifications (via mobile app)
- Event RSVPs
- Karten-Integration (Mapbox / MapLibre, custom Cream+Cobalt-Style)
- Host Dashboards (erweiterte Statistiken)
- District Analytics
- Community Reputation (intern, nie öffentlich sichtbar)
- Verified Local Businesses (kuratiert, nicht self-service)
- Local Guides & Collections

---

## 8 · Explizit Out of Scope (auch langfristig)

- Öffentliche Follower-Systeme
- Algorithmisches Feed-Ranking
- Reels / TikTok-Style Content
- Livestreaming
- Creator Economy Features
- Öffentliche Like-Counts
- Gamification (Badges, Punkte, Leaderboards)
- Werbung im Feed

---

## 9 · Nächste Implementierungs-Reihenfolge (Vorschlag)

```
Phase 1 (jetzt)
  ├── Impressum + Datenschutz (statische Seiten)
  ├── Cookie Consent Banner
  └── Community Guidelines Seite (/hausregeln bereits teilweise vorhanden)

Phase 2
  ├── Supabase Auth: Email Signup + Magic Link
  ├── Password Reset Flow
  ├── Account-Einstellungen (Edit Profile, Delete Account)
  └── District Selection in Onboarding verdrahten

Phase 3
  ├── Moderation Queue im Admin Dashboard
  ├── Post / Nutzer melden
  └── Rollen-System (user / local_host / admin)

Phase 4 (Post-MVP)
  ├── DMs
  ├── Gruppen
  └── Notifications (Email Digest)
```
