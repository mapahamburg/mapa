-- ─────────────────────────────────────────────────────────────────────────────
-- MAPA — Test-Seed (Supabase SQL Editor, als Service Role ausführen)
-- Erstellt 8 Test-User + Profiles + ~30 Posts + Kommentare
-- ─────────────────────────────────────────────────────────────────────────────

-- Deterministische UUIDs für Test-User
DO $$
DECLARE
  u_lena    UUID := 'a1000000-0000-0000-0000-000000000001';
  u_markus  UUID := 'a1000000-0000-0000-0000-000000000002';
  u_sarah   UUID := 'a1000000-0000-0000-0000-000000000003';
  u_tom     UUID := 'a1000000-0000-0000-0000-000000000004';
  u_nina    UUID := 'a1000000-0000-0000-0000-000000000005';
  u_jana    UUID := 'a1000000-0000-0000-0000-000000000006';
  u_anna    UUID := 'a1000000-0000-0000-0000-000000000007';
  u_felix   UUID := 'a1000000-0000-0000-0000-000000000008';
BEGIN

-- ─── 1. Auth-User anlegen ─────────────────────────────────────────────────────

INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at, raw_app_meta_data, raw_user_meta_data, aud, role)
VALUES
  (u_lena,   'lena.kowalski@test.mapa',   '$2a$10$placeholder', NOW(), NOW(), NOW(), '{"provider":"email"}', '{}', 'authenticated', 'authenticated'),
  (u_markus, 'markus.hoffmann@test.mapa', '$2a$10$placeholder', NOW(), NOW(), NOW(), '{"provider":"email"}', '{}', 'authenticated', 'authenticated'),
  (u_sarah,  'sarah.mueller@test.mapa',   '$2a$10$placeholder', NOW(), NOW(), NOW(), '{"provider":"email"}', '{}', 'authenticated', 'authenticated'),
  (u_tom,    'tom.bauer@test.mapa',       '$2a$10$placeholder', NOW(), NOW(), NOW(), '{"provider":"email"}', '{}', 'authenticated', 'authenticated'),
  (u_nina,   'nina.schulz@test.mapa',     '$2a$10$placeholder', NOW(), NOW(), NOW(), '{"provider":"email"}', '{}', 'authenticated', 'authenticated'),
  (u_jana,   'jana.fischer@test.mapa',    '$2a$10$placeholder', NOW(), NOW(), NOW(), '{"provider":"email"}', '{}', 'authenticated', 'authenticated'),
  (u_anna,   'anna.lange@test.mapa',      '$2a$10$placeholder', NOW(), NOW(), NOW(), '{"provider":"email"}', '{}', 'authenticated', 'authenticated'),
  (u_felix,  'felix.weber@test.mapa',     '$2a$10$placeholder', NOW(), NOW(), NOW(), '{"provider":"email"}', '{}', 'authenticated', 'authenticated')
ON CONFLICT (id) DO NOTHING;

-- ─── 2. Profile anlegen ───────────────────────────────────────────────────────

INSERT INTO profiles (id, first_name, stadtteil, bio, is_local_host, can_help_with, looking_for, interests, joined_at)
VALUES
  (u_lena,   'Lena',   'Eppendorf',    'Mama von zwei Jungs (3 und 6). Ich kenne jeden Spielplatz in Eppendorf.',           true,  ARRAY['Spielplatz-Tipps','Kita-Empfehlungen'], ARRAY['Krabbelgruppe'], ARRAY['Spielplätze & Treffen','Familiencafés'], NOW() - INTERVAL '90 days'),
  (u_markus, 'Markus', 'Winterhude',   'Papa in Elternzeit. Auf der Suche nach anderen Vätern zum Austausch.',             false, ARRAY['Fahrrad-Reparatur','Kochen'], ARRAY['Väter-Treffen'], ARRAY['Spielplätze & Treffen'], NOW() - INTERVAL '60 days'),
  (u_sarah,  'Sarah',  'Eimsbüttel',   'Hebamme und Mutter einer Tochter. Viel Erfahrung rund ums erste Jahr.',            true,  ARRAY['Hebammen-Fragen','Stillen'], ARRAY['Familiencafé'], ARRAY['Babysitter & Hebammen','Familiencafés'], NOW() - INTERVAL '45 days'),
  (u_tom,    'Tom',    'Altona',        'Zwei Kinder, Hund, Fahrrad. Altona ist das beste Viertel, Punkt.',                false, ARRAY['Altona-Tipps','Hundetraining'], ARRAY['Kinder-Sportgruppe'], ARRAY['Kurse & Sport','Spielplätze & Treffen'], NOW() - INTERVAL '30 days'),
  (u_nina,   'Nina',   'Sternschanze', 'Freiberuflerin, Mutter von Lila (2). Suche Gleichgesinnte im Viertel.',           false, ARRAY['Kreativprojekte','Café-Tipps'], ARRAY['Krabbelgruppe','Spielgruppe'], ARRAY['Familiencafés','Events im Viertel'], NOW() - INTERVAL '20 days'),
  (u_jana,   'Jana',   'Barmbek',       'Dreifach-Mama. Organisiere gerne und weiß wo es was umsonst gibt.',               false, ARRAY['Flohmärkte','Kita-Tipps'], ARRAY['Kinderfahrrad'], ARRAY['Flohmärkte & Tauschen','Lokale Empfehlungen'], NOW() - INTERVAL '15 days'),
  (u_anna,   'Anna',   'Ottensen',      'Schwedin in Hamburg. Liebe Ottensen und lerne noch Deutsch.',                    false, ARRAY['Schwedisch','Backrezepte'], ARRAY['Deutschkurs für Eltern'], ARRAY['Familiencafés','Kurse & Sport'], NOW() - INTERVAL '10 days'),
  (u_felix,  'Felix',  'Uhlenhorst',    'Stadtplaner, Papa von Nils (4). Ich weiß welche Spielplätze neu gebaut werden.', false, ARRAY['Stadtentwicklung','Fahrrad'], ARRAY['Spielgruppe Uhlenhorst'], ARRAY['Spielplätze & Treffen','Events im Viertel'], NOW() - INTERVAL '5 days')
ON CONFLICT (id) DO NOTHING;

-- ─── 3. Posts ─────────────────────────────────────────────────────────────────

INSERT INTO posts (author_id, type, title, body, stadtteil, created_at)
VALUES

-- Heute
(u_lena,   'empfehlung', 'Spielplatz am Stadtpark-Teich ist gerade top',
  'Der Spielplatz direkt am Stadtpark-Teich (Eingang Südring) wurde letzten Monat renoviert. Neue Rutsche, saubere Sandkiste, Bank mit Sonnenschirm. Absolute Empfehlung für die 2-6-Jährigen.',
  'Eppendorf', NOW() - INTERVAL '2 hours'),

(u_markus, 'frage', 'Gute Kinderarzt-Praxis in Winterhude gesucht',
  'Unser Kinderarzt hört auf. Suche eine Praxis in Winterhude oder Uhlenhorst die noch Patienten annimmt, am besten mit Online-Terminen. Wer hat einen Tipp?',
  'Winterhude', NOW() - INTERVAL '4 hours'),

(u_nina,   'treffen', 'Spielnachmittag Donnerstag, Schanze',
  'Ich treffe mich Donnerstag um 15 Uhr am Spielplatz Lerchenstraße. Lila ist 2, alle Altersgruppen willkommen. Einfach vorbeikommen.',
  'Sternschanze', NOW() - INTERVAL '5 hours'),

(u_sarah,  'empfehlung', 'Familiencafé Kleine Auszeit in Eimsbüttel',
  'Das Café in der Fruchtallee hat einen abgetrennten Spielbereich mit Wickelraum. Kaffee ist gut, Kuchen selbst gemacht, die Betreiberin ist selbst Mama. Mittwochs gibt es Lauftreffen von dort.',
  'Eimsbüttel', NOW() - INTERVAL '6 hours'),

(u_tom,    'suche', 'Kinderfahrrad 16 Zoll gesucht',
  'Meine Tochter wird im März 4. Suche ein Kinderfahrrad 16 Zoll, gerne gebraucht in gutem Zustand. Budget ca. 40–60 Euro. Kann in Altona oder Ottensen abholen.',
  'Altona', NOW() - INTERVAL '8 hours'),

(u_felix,  'frage', 'Kennt jemand die neue Kita am Mundsburger Damm?',
  'Dort öffnet im Herbst eine neue Kita. Hat jemand Infos ob die gut sind? Wir sind auf der Suche für unseren Sohn der 2026 einen Platz braucht.',
  'Uhlenhorst', NOW() - INTERVAL '10 hours'),

-- Gestern
(u_jana,   'veranstaltung', 'Familienflohmarkt Barmbek am Samstag',
  'Samstag 10–14 Uhr auf dem Parkplatz Bramfelder Straße 25. Ich bin dabei mit Klamotten Gr. 74–92 und Spielzeug. Freier Eintritt, Anmeldung nicht nötig.',
  'Barmbek', NOW() - INTERVAL '1 day'),

(u_anna,   'empfehlung', 'Ottenser Wochenmarkt mit Kindern',
  'Der Dienstags-Markt an der Spritzenplatz ist super mit Kindern. Es gibt Pfannkuchen, die Händler sind geduldig und der Platz ist übersichtlich. Wir sind meistens um 9 Uhr dort.',
  'Ottensen', NOW() - INTERVAL '1 day 2 hours'),

(u_lena,   'frage', 'Krabbelgruppe in Eppendorf noch offen?',
  'Die Krabbelgruppe in der Gemeindekirche Eppendorf — weiß jemand ob die noch läuft? Die Webseite ist veraltet und ich kriege keine Antwort auf Mails.',
  'Eppendorf', NOW() - INTERVAL '1 day 4 hours'),

(u_markus, 'treffen', 'Väter-Kaffee Sonntag Winterhude',
  'Ich schlage vor: Sonntag um 10 Uhr Café Haferland (Hudtwalckerstraße). Kinder mitbringen, quatschen, Kaffee. Keine Agenda. Wer hat Lust?',
  'Winterhude', NOW() - INTERVAL '1 day 6 hours'),

(u_sarah,  'suche', 'Suche Stillgruppe oder Stillberaterin',
  'Meine Tochter (6 Wochen) trinkt nicht richtig. Kennt jemand eine gute Stillberaterin in Eimsbüttel oder Umgebung? Oder eine Gruppe wo man hingehen kann?',
  'Eimsbüttel', NOW() - INTERVAL '1 day 8 hours'),

(u_tom,    'empfehlung', 'Tipp: Altonaer Museum hat jetzt Familiensonntag',
  'Jeden ersten Sonntag im Monat freier Eintritt für Kinder unter 16 und reduzierter Eintritt für Eltern. Gibt ein Kinderprogramm im Keller. Haben es letzte Woche ausprobiert, war super.',
  'Altona', NOW() - INTERVAL '1 day 10 hours'),

-- Vorgestern
(u_nina,   'empfehlung', 'Bester Spielplatz im Schanzenviertel: Lerchenfeld',
  'Klein aber fein. Rutsche, Sandkasten, Klettergerüst. Keine Hunde erlaubt was ich sehr schätze. Nachmittags immer gut besucht, nette Eltern.',
  'Sternschanze', NOW() - INTERVAL '2 days'),

(u_felix,  'veranstaltung', 'Stadtführung für Familien: Das versteckte Hamburg',
  'Nächsten Freitag 14 Uhr, Treffpunkt Rathaus. Stadtführerin macht Touren extra für Kinder ab 4 Jahren. 8 Euro pro Familie. Ich habe bereits gebucht, war letztes Jahr toll.',
  'Uhlenhorst', NOW() - INTERVAL '2 days 2 hours'),

(u_jana,   'frage', 'Wo kauft ihr Kinderschuhe in Hamburg?',
  'Suche einen Laden der ordentlich vermisst und berät. Nicht Deichmann. Hat jemand eine Empfehlung, gerne auch in Wandsbek oder Barmbek?',
  'Barmbek', NOW() - INTERVAL '2 days 4 hours'),

(u_anna,   'treffen', 'Deutsch-Schwedische Spielgruppe Ottensen',
  'Ich treffe mich jeden zweiten Freitag um 10 Uhr mit meiner Tochter (2,5) im Spielhaus Ottensen. Wir sprechen Deutsch und Schwedisch. Alle willkommen, auch ohne Schwedisch.',
  'Ottensen', NOW() - INTERVAL '2 days 6 hours'),

-- Diese Woche
(u_lena,   'empfehlung', 'Kinderarzt Dr. Hennings in Eppendorf',
  'Super Praxis, keine langen Wartezeiten, Dr. Hennings nimmt sich Zeit. Online-Terminbuchung funktioniert zuverlässig. Empfehlung ohne Einschränkungen.',
  'Eppendorf', NOW() - INTERVAL '3 days'),

(u_markus, 'suche', 'Suche Fahrradanhänger zum Ausleihen',
  'Wir wollen am Wochenende eine Fahrradtour an die Alster machen. Hat jemand einen Fahrradanhänger den wir für Samstag/Sonntag ausleihen könnten? Wären sehr dankbar.',
  'Winterhude', NOW() - INTERVAL '3 days 4 hours'),

(u_sarah,  'veranstaltung', 'Babymassage-Kurs startet im April',
  'Im Familienzentrum Eimsbüttel beginnt am 3. April ein 5-wöchiger Babymassage-Kurs. 8 Plätze, 60 Euro Kursgebühr. Ich habe letztes Jahr teilgenommen, sehr empfehlenswert.',
  'Eimsbüttel', NOW() - INTERVAL '4 days'),

(u_tom,    'frage', 'Gute Kita-Alternativen zu städtischen Kitas?',
  'Wir sind auf der Suche nach einer Kita für unsere Tochter (wird im August 3). Städtische Plätze haben wir überall auf der Warteliste aber nichts. Kennt jemand gute Elterninitiativen oder Waldkindergärten in Altona?',
  'Altona', NOW() - INTERVAL '4 days 3 hours'),

(u_nina,   'empfehlung', 'Rucola in der Schanze: kinderfreundlichstes Café',
  'Ja wirklich. Hochstühle, kein Augenrollen wenn Krümel fallen, Leitungswasser gratis. Außerdem guter Kaffee und faire Preise. Donnerstags nachmittags fast immer Platz.',
  'Sternschanze', NOW() - INTERVAL '5 days'),

(u_jana,   'treffen', 'Spielzeug-Tauschbörse Barmbek',
  'Mittwoch 14 Uhr Nachbarschaftshaus Barmbek Nord. Jeder bringt was er nicht mehr braucht, nimmt was er braucht. Ich bringe Puzzles (3+) und ein Rutschauto.',
  'Barmbek', NOW() - INTERVAL '5 days 2 hours'),

(u_felix,  'empfehlung', 'Uhlenhorster Fähre für Kinder ein Erlebnis',
  'Die kurze Fähre über die Alster kostet fast nichts mit dem HVV-Ticket und Kinder lieben es. Danach Spielplatz am Fähranleger. Perfekter Nachmittag für 2-6 Jährige.',
  'Uhlenhorst', NOW() - INTERVAL '6 days'),

(u_anna,   'frage', 'Kinderarzt der auch Englisch spricht?',
  'Unser Kinderarzt spricht leider kein Englisch und mein Deutsch reicht für medizinische Fragen nicht aus. Kennt jemand eine Praxis in Ottensen oder Altona mit English-speaking Ärzten?',
  'Ottensen', NOW() - INTERVAL '6 days 3 hours'),

(u_lena,   'veranstaltung', 'Osterbasteln im Kulturhaus Eppendorf',
  'Am 29. März von 10–12 Uhr gibt es Osterbasteln für Kinder ab 3 Jahren. Materialien inklusive, Anmeldung per E-Mail an kulturhaus@eppendorf.de. Wir sind dabei.',
  'Eppendorf', NOW() - INTERVAL '7 days');

-- ─── 4. Kommentare ────────────────────────────────────────────────────────────

-- Kommentare zum Spielplatz-Post
INSERT INTO comments (post_id, author_id, body, created_at)
SELECT p.id, u_markus,
  'Danke für den Tipp! Wir waren gestern dort, mein Sohn wollte gar nicht mehr weg.',
  NOW() - INTERVAL '1 hour'
FROM posts p WHERE p.title LIKE '%Stadtpark-Teich%' LIMIT 1;

INSERT INTO comments (post_id, author_id, body, created_at)
SELECT p.id, u_felix,
  'Der Spielplatz Dorotheenstraße ist auch gut renoviert worden, vielleicht als Alternative.',
  NOW() - INTERVAL '30 minutes'
FROM posts p WHERE p.title LIKE '%Stadtpark-Teich%' LIMIT 1;

-- Kommentare zum Kinderarzt-Post
INSERT INTO comments (post_id, author_id, body, created_at)
SELECT p.id, u_lena,
  'Dr. Hennings in Eppendorf nimmt noch Patienten, sehr empfehlenswert!',
  NOW() - INTERVAL '3 hours'
FROM posts p WHERE p.title LIKE '%Kinderarzt-Praxis in Winterhude%' LIMIT 1;

INSERT INTO comments (post_id, author_id, body, created_at)
SELECT p.id, u_sarah,
  'Gemeinschaftspraxis Mühlenkamp ist auch gut, lange offen und zuverlässig.',
  NOW() - INTERVAL '2 hours'
FROM posts p WHERE p.title LIKE '%Kinderarzt-Praxis in Winterhude%' LIMIT 1;

-- Kommentare zum Flohmarkt
INSERT INTO comments (post_id, author_id, body, created_at)
SELECT p.id, u_anna,
  'Komme auch! Bringe Klamotten 86–98 mit.',
  NOW() - INTERVAL '20 hours'
FROM posts p WHERE p.title LIKE '%Familienflohmarkt%' LIMIT 1;

INSERT INTO comments (post_id, author_id, body, created_at)
SELECT p.id, u_nina,
  'Super Initiative. Gibts auch Bücher?',
  NOW() - INTERVAL '18 hours'
FROM posts p WHERE p.title LIKE '%Familienflohmarkt%' LIMIT 1;

-- Kommentare zum Väter-Kaffee
INSERT INTO comments (post_id, author_id, body, created_at)
SELECT p.id, u_tom,
  'Ich bin dabei. Komme mit meinem Sohn (3).',
  NOW() - INTERVAL '1 day 5 hours'
FROM posts p WHERE p.title LIKE '%Väter-Kaffee%' LIMIT 1;

INSERT INTO comments (post_id, author_id, body, created_at)
SELECT p.id, u_felix,
  'Gerne, bin Sonntag dabei. Macht mal öfter sowas.',
  NOW() - INTERVAL '1 day 4 hours'
FROM posts p WHERE p.title LIKE '%Väter-Kaffee%' LIMIT 1;

END $$;
