# 002 — Mobile Stack

**Date:** 2026-05-25  
**Status:** decided

## Decision

**React Native + Expo** für die mobile App (iOS + Android).

## Begründung

| Kriterium | React Native + Expo | SwiftUI |
|---|---|---|
| iOS + Android | ✅ ein Codebase | ❌ iOS only |
| Design Tokens | ✅ `lib/tokens.ts` direkt nutzbar | ❌ Swift-Port nötig |
| Supabase Client | ✅ identisch mit Web | ❌ Swift-SDK verschieden |
| Tester onboarden | ✅ Expo Go, kein Store | ❌ TestFlight Setup |
| Team-Expertise | ✅ TypeScript durchgehend | ⚠️ Swift lernen |
| Store-Deployment | ✅ Expo EAS Build | ✅ Xcode |

## Projektstruktur

Mobile App liegt in `/mobile/` (separates Expo-Projekt, gleiches Repo).

Shared Code:
- Design Tokens → `web/lib/tokens.ts` wird nach `mobile/lib/tokens.ts` gespiegelt (oder als Workspace-Package extrahiert)
- Supabase → gleiche `.env`-Werte, gleiche Client-Logik
- TypeScript-Types → `web/types/index.ts` → `mobile/types/index.ts`

## Wann Mobile starten?

Nach Supabase Schema + Auth auf Web-Seite — damit Mobile direkt gegen echte Daten entwickeln kann.

## Bewusst nicht gewählt

- **SwiftUI** — iOS only, kein Vorteil für MAPA MVP
- **Flutter** — Dart-Ökosystem, zu weit vom bestehenden TypeScript-Stack
