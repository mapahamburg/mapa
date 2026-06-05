-- ─────────────────────────────────────────────────────────────────────────────
-- MAPA — Seed v3
-- 25 Personas · 75 Posts · 20 Kommentare
-- Fokus: Winterhude + Eppendorf stark befüllt
-- Local Hosts: nur Winterhude, Eppendorf, Ottensen
-- Ton: Community, kein Expertenforum
-- ─────────────────────────────────────────────────────────────────────────────

DO $$
DECLARE
  -- Winterhude
  u_markus  UUID := 'a1000000-0000-0000-0000-000000000001';
  u_hannah  UUID := 'a1000000-0000-0000-0000-000000000002';
  u_sven    UUID := 'a1000000-0000-0000-0000-000000000003';
  u_lisa    UUID := 'a1000000-0000-0000-0000-000000000004';
  u_david   UUID := 'a1000000-0000-0000-0000-000000000005';
  u_nina    UUID := 'a1000000-0000-0000-0000-000000000006';
  u_bjoern  UUID := 'a1000000-0000-0000-0000-000000000007';
  u_maria   UUID := 'a1000000-0000-0000-0000-000000000008';

  -- Eppendorf
  u_lena    UUID := 'a1000000-0000-0000-0000-000000000009';
  u_petra   UUID := 'a1000000-0000-0000-0000-000000000010';
  u_robert  UUID := 'a1000000-0000-0000-0000-000000000011';
  u_katha   UUID := 'a1000000-0000-0000-0000-000000000012';
  u_elena   UUID := 'a1000000-0000-0000-0000-000000000013';
  u_jonas_e UUID := 'a1000000-0000-0000-0000-000000000014';
  u_franzi  UUID := 'a1000000-0000-0000-0000-000000000015';
  u_natalia UUID := 'a1000000-0000-0000-0000-000000000016';

  -- Altona / Ottensen
  u_tom     UUID := 'a1000000-0000-0000-0000-000000000017';
  u_marco   UUID := 'a1000000-0000-0000-0000-000000000018';
  u_isa     UUID := 'a1000000-0000-0000-0000-000000000019';
  u_kai     UUID := 'a1000000-0000-0000-0000-000000000020';
  u_laura   UUID := 'a1000000-0000-0000-0000-000000000021';

  -- Eimsbüttel / Sternschanze
  u_sarah   UUID := 'a1000000-0000-0000-0000-000000000022';
  u_clara   UUID := 'a1000000-0000-0000-0000-000000000023';
  u_jana    UUID := 'a1000000-0000-0000-0000-000000000024';
  u_daniel  UUID := 'a1000000-0000-0000-0000-000000000025';

BEGIN

-- ─── 1. Auth-User ─────────────────────────────────────────────────────────────

INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at, raw_app_meta_data, raw_user_meta_data, aud, role)
VALUES
  (u_markus,  'markus.hoffmann@test.mapa',   '$2a$10$placeholder', NOW(), NOW(), NOW(), '{"provider":"email"}', '{}', 'authenticated', 'authenticated'),
  (u_hannah,  'hannah.brandt@test.mapa',     '$2a$10$placeholder', NOW(), NOW(), NOW(), '{"provider":"email"}', '{}', 'authenticated', 'authenticated'),
  (u_sven,    'sven.bergmann@test.mapa',     '$2a$10$placeholder', NOW(), NOW(), NOW(), '{"provider":"email"}', '{}', 'authenticated', 'authenticated'),
  (u_lisa,    'lisa.knauer@test.mapa',       '$2a$10$placeholder', NOW(), NOW(), NOW(), '{"provider":"email"}', '{}', 'authenticated', 'authenticated'),
  (u_david,   'david.koller@test.mapa',      '$2a$10$placeholder', NOW(), NOW(), NOW(), '{"provider":"email"}', '{}', 'authenticated', 'authenticated'),
  (u_nina,    'nina.schulz@test.mapa',       '$2a$10$placeholder', NOW(), NOW(), NOW(), '{"provider":"email"}', '{}', 'authenticated', 'authenticated'),
  (u_bjoern,  'bjoern.larsson@test.mapa',   '$2a$10$placeholder', NOW(), NOW(), NOW(), '{"provider":"email"}', '{}', 'authenticated', 'authenticated'),
  (u_maria,   'maria.santos@test.mapa',      '$2a$10$placeholder', NOW(), NOW(), NOW(), '{"provider":"email"}', '{}', 'authenticated', 'authenticated'),
  (u_lena,    'lena.kowalski@test.mapa',     '$2a$10$placeholder', NOW(), NOW(), NOW(), '{"provider":"email"}', '{}', 'authenticated', 'authenticated'),
  (u_petra,   'petra.wagner@test.mapa',      '$2a$10$placeholder', NOW(), NOW(), NOW(), '{"provider":"email"}', '{}', 'authenticated', 'authenticated'),
  (u_robert,  'robert.hartmann@test.mapa',   '$2a$10$placeholder', NOW(), NOW(), NOW(), '{"provider":"email"}', '{}', 'authenticated', 'authenticated'),
  (u_katha,   'katharina.becker@test.mapa',  '$2a$10$placeholder', NOW(), NOW(), NOW(), '{"provider":"email"}', '{}', 'authenticated', 'authenticated'),
  (u_elena,   'elena.voronova@test.mapa',    '$2a$10$placeholder', NOW(), NOW(), NOW(), '{"provider":"email"}', '{}', 'authenticated', 'authenticated'),
  (u_jonas_e, 'jonas.wagner@test.mapa',      '$2a$10$placeholder', NOW(), NOW(), NOW(), '{"provider":"email"}', '{}', 'authenticated', 'authenticated'),
  (u_franzi,  'franziska.koch@test.mapa',    '$2a$10$placeholder', NOW(), NOW(), NOW(), '{"provider":"email"}', '{}', 'authenticated', 'authenticated'),
  (u_natalia, 'natalia.petrov@test.mapa',    '$2a$10$placeholder', NOW(), NOW(), NOW(), '{"provider":"email"}', '{}', 'authenticated', 'authenticated'),
  (u_tom,     'tom.bauer@test.mapa',         '$2a$10$placeholder', NOW(), NOW(), NOW(), '{"provider":"email"}', '{}', 'authenticated', 'authenticated'),
  (u_marco,   'marco.ferretti@test.mapa',    '$2a$10$placeholder', NOW(), NOW(), NOW(), '{"provider":"email"}', '{}', 'authenticated', 'authenticated'),
  (u_isa,     'isabelle.dupont@test.mapa',   '$2a$10$placeholder', NOW(), NOW(), NOW(), '{"provider":"email"}', '{}', 'authenticated', 'authenticated'),
  (u_kai,     'kai.schneider@test.mapa',     '$2a$10$placeholder', NOW(), NOW(), NOW(), '{"provider":"email"}', '{}', 'authenticated', 'authenticated'),
  (u_laura,   'laura.chen@test.mapa',        '$2a$10$placeholder', NOW(), NOW(), NOW(), '{"provider":"email"}', '{}', 'authenticated', 'authenticated'),
  (u_sarah,   'sarah.mueller@test.mapa',     '$2a$10$placeholder', NOW(), NOW(), NOW(), '{"provider":"email"}', '{}', 'authenticated', 'authenticated'),
  (u_clara,   'clara.vogel@test.mapa',       '$2a$10$placeholder', NOW(), NOW(), NOW(), '{"provider":"email"}', '{}', 'authenticated', 'authenticated'),
  (u_jana,    'jana.fischer@test.mapa',      '$2a$10$placeholder', NOW(), NOW(), NOW(), '{"provider":"email"}', '{}', 'authenticated', 'authenticated'),
  (u_daniel,  'daniel.zimmermann@test.mapa', '$2a$10$placeholder', NOW(), NOW(), NOW(), '{"provider":"email"}', '{}', 'authenticated', 'authenticated')
ON CONFLICT (id) DO NOTHING;

-- ─── 2. Profile ───────────────────────────────────────────────────────────────

INSERT INTO profiles (id, first_name, stadtteil, bio, is_local_host, can_help_with, looking_for, interests, joined_at)
VALUES
  -- Winterhude (Local Host: Björn)
  (u_markus,  'Markus',     'Winterhude',   'Erzieher, gerade in Elternzeit mit Leon (2). Lerne Hamburg als Vater ganz neu kennen.',
   false, ARRAY['Kita-Tipps','Spielplatz-Tipps'], ARRAY['Väter-Treffen'], ARRAY['Spielplätze & Treffen'], NOW() - INTERVAL '45 days'),

  (u_hannah,  'Hannah',     'Winterhude',   'Krankenpflegerin, Zwillinge (2,5). Immer müde, immer dankbar für Tipps.',
   false, ARRAY['Pflegetipps','Zwillings-Tipps'], ARRAY['Zwillings-Gruppe'], ARRAY['Spielplätze & Treffen','Familiencafés'], NOW() - INTERVAL '30 days'),

  (u_sven,    'Sven',       'Winterhude',   'Sportlehrer, Papa von Erik (7). Morgens laufen, abends Hausaufgaben.',
   false, ARRAY['Sport','Laufen'], ARRAY['Sportgruppe Kinder'], ARRAY['Kurse & Sport'], NOW() - INTERVAL '60 days'),

  (u_lisa,    'Lisa',       'Winterhude',   'Marketing Managerin in Teilzeit, Mutter von Mila (3). Liebe den Isemarkt.',
   false, ARRAY['Marketing-Tipps','Markt-Tipps'], ARRAY['Krabbelgruppe'], ARRAY['Familiencafés','Lokale Empfehlungen'], NOW() - INTERVAL '22 days'),

  (u_david,   'David',      'Winterhude',   'Musiker, Sohn Ben (4). Gebe Gitarrenstunden für Kinder ab 5.',
   false, ARRAY['Musik'], ARRAY['Musikgruppe Kleinkinder'], ARRAY['Kurse & Sport','Familiencafés'], NOW() - INTERVAL '14 days'),

  (u_nina,    'Nina',       'Winterhude',   'Freie Grafikerin, Lila (2,5). Winterhude seit 6 Jahren.',
   false, ARRAY['Grafik','Café-Tipps'], ARRAY['Spielgruppe'], ARRAY['Familiencafés','Events im Viertel'], NOW() - INTERVAL '18 days'),

  (u_bjoern,  'Björn',      'Winterhude',   'Physiotherapeut, Vater von Oskar (6). Seit 9 Jahren in Winterhude, kenne das Viertel gut.',
   true,  ARRAY['Physiotherapie-Tipps','Winterhude-Tipps'], ARRAY['Sportgruppe'], ARRAY['Spielplätze & Treffen','Lokale Empfehlungen'], NOW() - INTERVAL '95 days'),

  (u_maria,   'Maria',      'Winterhude',   'Brasilianerin, Kassierin bei Edeka, zwei Kinder (3 und 6). Sehr froh in Winterhude zu wohnen.',
   false, ARRAY['Portugiesisch'], ARRAY['Internationale Spielgruppe'], ARRAY['Spielplätze & Treffen','Familiencafés'], NOW() - INTERVAL '35 days'),

  -- Eppendorf (Local Host: Lena)
  (u_lena,    'Lena',       'Eppendorf',    'Marketing Managerin in Elternzeit. Zwei Jungs (3 und 6), kenne Eppendorf in- und auswendig.',
   true,  ARRAY['Spielplatz-Tipps','Eppendorf-Tipps'], ARRAY['Krabbelgruppe'], ARRAY['Spielplätze & Treffen','Familiencafés'], NOW() - INTERVAL '90 days'),

  (u_petra,   'Petra',      'Eppendorf',    'Sachbearbeiterin beim Finanzamt, Mutter von drei (8, 11, 14). 20 Jahre in Eppendorf.',
   false, ARRAY['Schultipps','Eppendorf-Geschichte'], ARRAY['Elterncafé'], ARRAY['Lokale Empfehlungen'], NOW() - INTERVAL '85 days'),

  (u_robert,  'Robert',     'Eppendorf',    'Elektriker, Papa von Lukas (7). Repariere gerne auch für Nachbarn.',
   false, ARRAY['Elektriker-Tipps','Reparaturen'], ARRAY['Schulkind-Gruppe'], ARRAY['Spielplätze & Treffen'], NOW() - INTERVAL '40 days'),

  (u_katha,   'Katharina',  'Eppendorf',    'HR Managerin in Elternzeit, zwei Mädchen (2 und 5). Fast jeden Dienstag am Isemarkt.',
   false, ARRAY['Isemarkt-Tipps'], ARRAY['Kita-Platz Eppendorf'], ARRAY['Familiencafés','Lokale Empfehlungen'], NOW() - INTERVAL '55 days'),

  (u_elena,   'Elena',      'Eppendorf',    'Ukrainerin, seit 2 Jahren in Hamburg. Verkäuferin. Tochter Darija (4). Sehr dankbar für die netten Nachbarn hier.',
   false, ARRAY['Ukrainisch'], ARRAY['Deutschkurs mit Kinderbetreuung'], ARRAY['Spielplätze & Treffen','Familiencafés'], NOW() - INTERVAL '8 days'),

  (u_jonas_e, 'Jonas',      'Eppendorf',    'Projektmanager, Papa von Finn (2). Erstes Kind, lerne gerade alles.',
   false, ARRAY['Projektmanagement'], ARRAY['Krabbelgruppe','Väter-Tipps'], ARRAY['Spielplätze & Treffen'], NOW() - INTERVAL '12 days'),

  (u_franzi,  'Franziska',  'Eppendorf',    'Selbstständige Grafikerin, Clara (4). Arbeite von zu Hause, immer Augen offen für Cafés mit gutem WLAN.',
   false, ARRAY['Grafik','Café-Tipps'], ARRAY['Spielgruppe Nachmittag'], ARRAY['Familiencafés','Spielplätze & Treffen'], NOW() - INTERVAL '25 days'),

  (u_natalia, 'Natalia',    'Eppendorf',    'Russin, Übersetzerin, 12 Jahre in Hamburg. Zwei Kinder (4 und 9).',
   false, ARRAY['Russisch','Übersetzung'], ARRAY['Russisch-Deutsche Gruppe'], ARRAY['Spielplätze & Treffen','Lokale Empfehlungen'], NOW() - INTERVAL '70 days'),

  -- Altona / Ottensen (Local Host: Tom)
  (u_tom,     'Tom',        'Ottensen',     'Handwerker, Lastenrad, Hund, zwei Kinder (2 und 5). Ottensen seit 10 Jahren.',
   true,  ARRAY['Handwerker-Tipps','Ottensen-Tipps','Lastenrad'], ARRAY['Papa-Gruppe'], ARRAY['Spielplätze & Treffen','Flohmärkte & Tauschen'], NOW() - INTERVAL '100 days'),

  (u_marco,   'Marco',      'Altona',       'Italiener, Koch, Vater von Pablo (4) und Luca (2). Beste Pizza im Viertel.',
   false, ARRAY['Kochen','Italienisch'], ARRAY['Internationale Papa-Gruppe'], ARRAY['Familiencafés','Spielplätze & Treffen'], NOW() - INTERVAL '50 days'),

  (u_isa,     'Isabelle',   'Ottensen',     'Französin, Teilzeit-Verwaltung, Jules (5) und Zoé (2). 7 Jahre Altona.',
   false, ARRAY['Französisch'], ARRAY['Bilinguale Gruppe'], ARRAY['Familiencafés','Spielplätze & Treffen'], NOW() - INTERVAL '48 days'),

  (u_kai,     'Kai',        'Ottensen',     'Maler und Lackierer, Papa von Finn (4). Ottensen ist das beste Viertel, fertig.',
   false, ARRAY['Renovierungstipps','Handwerk'], ARRAY['Papa-Runde Ottensen'], ARRAY['Spielplätze & Treffen','Flohmärkte & Tauschen'], NOW() - INTERVAL '20 days'),

  (u_laura,   'Laura',      'Ottensen',     'Chinesisch-Deutsche, zwei Kinder (2 und 7). Liebe den Wochenmarkt Spritzenplatz.',
   false, ARRAY['Chinesisch','Markt-Tipps'], ARRAY['Bilinguale Spielgruppe'], ARRAY['Familiencafés','Spielplätze & Treffen'], NOW() - INTERVAL '33 days'),

  -- Eimsbüttel / Sternschanze (kein Local Host)
  (u_sarah,   'Sarah',      'Eimsbüttel',   'Hebamme, Mutter einer Tochter (8 Monate). Eimsbüttel ist ideal für Familien.',
   false, ARRAY['Hebammen-Tipps','Stillen'], ARRAY['Familiencafé-Tipp'], ARRAY['Babysitter & Hebammen'], NOW() - INTERVAL '45 days'),

  (u_clara,   'Clara',      'Sternschanze', 'Journalistin, Emil (18 Monate). Schreibe viel, schlafe wenig.',
   false, ARRAY['Schreiben'], ARRAY['Krabbelgruppe Schanze'], ARRAY['Events im Viertel','Familiencafés'], NOW() - INTERVAL '28 days'),

  (u_jana,    'Jana',       'Eimsbüttel',   'Dreifach-Mama (1, 4, 7), Teilzeit Bürokauffrau. Immer auf der Suche nach Schnäppchen.',
   false, ARRAY['Flohmärkte','Kita-Tipps'], ARRAY['Kinderfahrrad'], ARRAY['Flohmärkte & Tauschen','Lokale Empfehlungen'], NOW() - INTERVAL '15 days'),

  (u_daniel,  'Daniel',     'Sternschanze', 'IT-Systemadministrator, Papa von Luisa (3). Schanze seit 2015.',
   false, ARRAY['Tech-Tipps'], ARRAY['Papa-Runde Schanze'], ARRAY['Familiencafés','Events im Viertel'], NOW() - INTERVAL '18 days')
ON CONFLICT (id) DO NOTHING;

-- ─── 3. Posts ─────────────────────────────────────────────────────────────────

INSERT INTO posts (author_id, type, title, body, stadtteil, created_at)
VALUES

-- ══ HEUTE ══

-- Spontane Treffen
(u_bjoern, 'treffen', 'Wir sind heute ab 15 Uhr am Planschbecken im Stadtpark.',
 'Oskar und ich. Einfach vorbeikommen.',
 'Winterhude', NOW() - INTERVAL '1 hour'),

(u_nina, 'treffen', 'Spielplatz Hudtwalckerstraße heute Nachmittag?',
 'Lila und ich sind ab 14:30 dort. Wer kommt mit?',
 'Winterhude', NOW() - INTERVAL '2 hours'),

(u_franzi, 'treffen', 'Spontaner Spaziergang Isebek heute um 10?',
 'Clara ist heute Morgen fit und ich auch. Isebek-Eingang Lehmweg.',
 'Eppendorf', NOW() - INTERVAL '3 hours'),

-- Fragen Alltag
(u_lisa, 'frage', 'Welcher Spielplatz hat heute Nachmittag Schatten?',
 'Es wird heiß. Wir suchen einen Spielplatz der nicht in der prallen Sonne liegt. Bin in Winterhude.',
 'Winterhude', NOW() - INTERVAL '2 hours 30 minutes'),

(u_jonas_e, 'frage', 'Wo gibt es in Eppendorf gute Franzbrötchen?',
 'Zugezogen und noch nicht orientiert. Muss dringend behoben werden.',
 'Eppendorf', NOW() - INTERVAL '4 hours'),

(u_hannah, 'frage', 'Wo kann man sonntags mit Kleinkind frühstücken?',
 'Mit Zwillingen (2,5). Brauche einen Platz der das aushält. Winterhude oder Eppendorf.',
 'Winterhude', NOW() - INTERVAL '5 hours'),

-- Tauschbörse
(u_petra, 'suche', 'Suche Laufrad für 3-Jährige',
 'Meine Jüngste will endlich auch eins. Gerne gebraucht, jede Marke. Kann in Eppendorf abholen.',
 'Eppendorf', NOW() - INTERVAL '3 hours'),

(u_sven, 'empfehlung', 'Buggy Joolz Geo 2 abzugeben',
 'Unser Joolz Geo 2 sucht ein neues Zuhause. Sehr guter Zustand, alle Zubehörteile dabei. 150 Euro. Selbstabholung Winterhude.',
 'Winterhude', NOW() - INTERVAL '6 hours'),

(u_kai, 'suche', 'Kinderfahrrad 16 Zoll gesucht',
 'Finn wird im Herbst 5. Suche ein 16-Zoll-Rad, gerne gebraucht. Budget ca. 50 Euro. Abholung Ottensen.',
 'Ottensen', NOW() - INTERVAL '7 hours'),

-- ══ GESTERN ══

-- Fragen
(u_markus, 'frage', 'Hat jemand Erfahrung mit dem Kinderturnen beim ETV?',
 'Leon wird im Herbst 3. Der ETV liegt günstig aber ich kenne niemanden der dort ist.',
 'Winterhude', NOW() - INTERVAL '1 day'),

(u_clara, 'frage', 'Kennt jemand einen guten Kinderfriseur in der Schanze oder Eimsbüttel?',
 'Emil hasst Haare schneiden. Ich suche jemanden der damit umgehen kann.',
 'Sternschanze', NOW() - INTERVAL '1 day 2 hours'),

(u_katha, 'frage', 'Welche Kita macht viel draußen in Eppendorf?',
 'Waldkindergarten wäre ideal aber vielleicht zu weit. Hat jemand eine Kita die viel Außenzeit macht?',
 'Eppendorf', NOW() - INTERVAL '1 day 4 hours'),

-- Tauschbörse
(u_jana, 'empfehlung', 'Winterjacke Gr. 98 zu verschenken',
 'Lupilu, noch in gutem Zustand. Zu klein geworden. Wer Interesse hat meldet sich. Kann in Eimsbüttel übergeben werden.',
 'Eimsbüttel', NOW() - INTERVAL '1 day 1 hour'),

(u_lena, 'suche', 'Suche Buggy für kurze Strecken',
 'Unser großer Kinderwagen ist zu klobig für die U-Bahn. Suche einen leichten Buggy zum Zusammenklappen. Budget 40 Euro.',
 'Eppendorf', NOW() - INTERVAL '1 day 3 hours'),

(u_maria, 'empfehlung', 'Holzeisenbahn fast komplett zu verschenken',
 'Brio-kompatibel, viele Schienen und Züge. Zu groß für unsere neue Wohnung. Selbstabholung Winterhude.',
 'Winterhude', NOW() - INTERVAL '1 day 5 hours'),

-- Empfehlungen
(u_bjoern, 'empfehlung', 'Haferland Café am Mühlenkamp — unser Stammcafé',
 'Kinderfreundlich ohne viel Aufhebens. Hochstühle, kein Theater wenn Krümel fallen. Kaffee ist gut. Samstags voll aber wochentags entspannt.',
 'Winterhude', NOW() - INTERVAL '1 day 6 hours'),

(u_lena, 'empfehlung', 'Spielplatz Dorotheenstraße — gerade renoviert',
 'Neue Kletterwand, Sandkasten mit Wasserpumpe. Morgens zwischen 9 und 11 fast leer.',
 'Eppendorf', NOW() - INTERVAL '1 day 8 hours'),

-- Treffen
(u_david, 'treffen', 'Kinderkonzert bei uns zu Hause — Samstag 10 Uhr',
 'Kleine Gitarrenrunde, 45 Minuten, 6 Kinder max, 3-8 Jahre. Kostenlos. Wer möchte meldet sich kurz.',
 'Winterhude', NOW() - INTERVAL '1 day 9 hours'),

-- ══ VORGESTERN ══

-- Fragen
(u_robert, 'frage', 'Guter Kinderarzt in Eppendorf der noch Patienten nimmt?',
 'Unser Kinderarzt hört auf. Suche Empfehlung für Eppendorf oder direkt nebenan. Lukas ist 7.',
 'Eppendorf', NOW() - INTERVAL '2 days'),

(u_elena, 'frage', 'Deutschkurs mit Kinderbetreuung in Eppendorf?',
 'Ich suche einen Kurs wo ich Deutsch lernen kann während Darija (4) betreut wird. Hat jemand eine Adresse?',
 'Eppendorf', NOW() - INTERVAL '2 days 2 hours'),

(u_hannah, 'frage', 'Stillen in der Öffentlichkeit — wo seid ihr damit entspannt?',
 'Suche entspannte Cafés oder Orte in Winterhude wo das kein Thema ist.',
 'Winterhude', NOW() - INTERVAL '2 days 3 hours'),

-- Tauschbörse
(u_isa, 'empfehlung', 'Duplo-Kiste zu verschenken',
 'Große Kiste, gut 100 Steine. Kinder zu groß dafür. Abholung Ottensen.',
 'Ottensen', NOW() - INTERVAL '2 days 1 hour'),

(u_marco, 'suche', 'Suche Tripp-Trapp oder ähnlichen Hochstuhl',
 'Für Luca (11 Monate). Gerne gebraucht. Budget 40 Euro. Altona oder Ottensen.',
 'Altona', NOW() - INTERVAL '2 days 4 hours'),

(u_natalia, 'empfehlung', 'Kinderschuhe Gr. 24 abzugeben',
 'Ricosta, kaum getragen. Zu klein geworden. Zu verschenken. Abholung Eppendorf.',
 'Eppendorf', NOW() - INTERVAL '2 days 6 hours'),

-- Spontane Treffen
(u_tom, 'treffen', 'Jemand Lust auf Spaziergang um die Außenalster heute Nachmittag?',
 'Starte um 14 Uhr am Jungfernstieg. Kinderwagen kein Problem. Einfach melden.',
 'Ottensen', NOW() - INTERVAL '2 days 5 hours'),

-- Empfehlung
(u_sarah, 'empfehlung', 'Café Backwahn Fruchtallee — Wickelraum, Hochstühle, kein Stress',
 'Einer der wenigen Orte wo ich mit Kind entspannt Kaffee trinken kann. Mittwochs weniger voll als am Wochenende.',
 'Eimsbüttel', NOW() - INTERVAL '2 days 7 hours'),

-- ══ 3 TAGE ══

-- Fragen
(u_nina, 'frage', 'Wer kennt gute Schwimmkurse für 2-Jährige in Winterhude?',
 'Lila hat keine Angst vorm Wasser. Suche einen Babyschwimmkurs der noch Plätze hat.',
 'Winterhude', NOW() - INTERVAL '3 days'),

(u_sven, 'frage', 'Fußballgruppe für 6-7 Jährige in Winterhude?',
 'Erik will Fußball spielen. Verein oder informell, beides gut.',
 'Winterhude', NOW() - INTERVAL '3 days 2 hours'),

(u_petra, 'frage', 'Gute Grundschule in Eppendorf — welche habt ihr gewählt?',
 'Wir müssen nächstes Jahr anmelden. Würde gerne wissen welche Erfahrungen ihr gemacht habt.',
 'Eppendorf', NOW() - INTERVAL '3 days 4 hours'),

-- Tauschbörse
(u_markus, 'suche', 'Suche Fahrradanhänger für Wochenende',
 'Für Samstag und Sonntag. Hat jemand einen den wir ausleihen dürfen? Leon ist 2. Wären sehr dankbar.',
 'Winterhude', NOW() - INTERVAL '3 days 1 hour'),

(u_lisa, 'empfehlung', 'Babywippe abzugeben',
 'Fisher-Price, gut erhalten. Kind zu groß. Zu verschenken. Abholung Winterhude.',
 'Winterhude', NOW() - INTERVAL '3 days 3 hours'),

(u_daniel, 'suche', 'Suche Kinderbücher für 3-Jährige',
 'Gerne Klassiker oder was ihr selbst toll findet. Kaufen oder tauschen.',
 'Sternschanze', NOW() - INTERVAL '3 days 5 hours'),

-- Treffen
(u_lena, 'treffen', 'Isemarkt-Runde Dienstag 9 Uhr — wer kommt mit?',
 'Ich gehe fast jeden Dienstag. Falls jemand Lust hat gemeinsam zu gehen, meldet euch.',
 'Eppendorf', NOW() - INTERVAL '3 days 6 hours'),

-- ══ 4 TAGE ══

-- Fragen
(u_katha, 'frage', 'Kinderfriseur in Eppendorf der ohne Drama schneidet?',
 'Meine Große (5) sitzt nicht still. Kennt jemand jemanden der damit Erfahrung hat?',
 'Eppendorf', NOW() - INTERVAL '4 days'),

(u_jonas_e, 'frage', 'Wo kann man in Eppendorf sonntags gut frühstücken mit Kleinkind?',
 'Suche einen Ort der nicht zu laut ist und wo Kinder okay sind. Am liebsten mit Hochstuhl.',
 'Eppendorf', NOW() - INTERVAL '4 days 2 hours'),

(u_hannah, 'frage', 'Kinderarzt der Zwillinge gleichzeitig untersucht?',
 'Klingt komisch aber bei unserer alten Praxis war das ein Problem. Hat jemand eine Empfehlung?',
 'Winterhude', NOW() - INTERVAL '4 days 4 hours'),

-- Tauschbörse
(u_elena, 'empfehlung', 'Kinderwagen Chicco Simplicity abzugeben',
 'Gut erhalten, alle Teile dabei. 50 Euro. Abholung Eppendorf oder kann zur U-Bahn gebracht werden.',
 'Eppendorf', NOW() - INTERVAL '4 days 1 hour'),

(u_laura, 'suche', 'Suche Trampolin für Garten',
 'Klein bis mittel. Für zwei Kinder (2 und 7). Budget 60 Euro. Ottensen oder Altona.',
 'Ottensen', NOW() - INTERVAL '4 days 3 hours'),

(u_tom, 'empfehlung', 'Winterjacke Gr. 110 fast neu abzugeben',
 'Regatta, kaum getragen. Mein Sohn ist zu schnell gewachsen. Zu verschenken. Ottensen.',
 'Ottensen', NOW() - INTERVAL '4 days 5 hours'),

-- Empfehlung
(u_bjoern, 'empfehlung', 'Spielplatz Alsterdorfer Straße — ruhig und schön',
 'Wenig bekannt, selten voll. Klettergerüst, Sandkasten, Bank im Schatten. Für 2-7 Jahre.',
 'Winterhude', NOW() - INTERVAL '4 days 6 hours'),

-- Veranstaltung
(u_jana, 'veranstaltung', 'Familienflohmarkt Eimsbüttel — Samstag 10–14 Uhr',
 'Ich bin dabei mit Klamotten Gr. 74–98 und Spielzeug. Eingang Methfesselstraße. Freier Eintritt.',
 'Eimsbüttel', NOW() - INTERVAL '4 days 7 hours'),

-- ══ 5 TAGE ══

-- Fragen
(u_franzi, 'frage', 'Gibt es eine Spielgruppe speziell für Einzelkinder in Eppendorf?',
 'Clara hat keine Geschwister. Ich suche regelmäßigen Kontakt zu anderen Kindern unter der Woche.',
 'Eppendorf', NOW() - INTERVAL '5 days'),

(u_david, 'frage', 'Wo kauft ihr günstig Spielzeug in Winterhude?',
 'Kein Amazon. Gibt es gute Läden oder Flohmärkte die ihr regelmäßig kennt?',
 'Winterhude', NOW() - INTERVAL '5 days 2 hours'),

-- Tauschbörse
(u_clara, 'empfehlung', 'Lauflernwagen abzugeben',
 'Haba, guter Zustand. Emil läuft jetzt alleine. Zu verschenken. Abholung Sternschanze.',
 'Sternschanze', NOW() - INTERVAL '5 days 1 hour'),

(u_robert, 'suche', 'Suche Boormachine oder Stichsäge zum Ausleihen',
 'Für ein Wochenendprojekt. Hat jemand in Eppendorf was und würde es kurz verleihen?',
 'Eppendorf', NOW() - INTERVAL '5 days 3 hours'),

(u_sven, 'empfehlung', 'Skianzug Gr. 104 abzugeben',
 'Reima, sehr guter Zustand. Zu klein. 15 Euro oder Tausch gegen was Ähnliches in 110.',
 'Winterhude', NOW() - INTERVAL '5 days 4 hours'),

-- Spontane Treffen
(u_maria, 'treffen', 'Spielplatz Mühlenkampstraße heute um 16 Uhr?',
 'Bin mit meinen Zweien (3 und 6) dort. Wer will kommt einfach dazu.',
 'Winterhude', NOW() - INTERVAL '5 days 5 hours'),

-- Empfehlung
(u_lena, 'empfehlung', 'Isemarkt: die besten Stände wenn man wenig Zeit hat',
 'Bäcker Gust ganz am Anfang links. Gemüse in der Mitte beim roten Stand. Fisch ganz hinten. Dienstags 20 Min, fertig.',
 'Eppendorf', NOW() - INTERVAL '5 days 6 hours'),

-- ══ 6 TAGE ══

-- Fragen
(u_markus, 'frage', 'Krabbelgruppe in Winterhude noch offen?',
 'Die bei der Petruskirche — weiß jemand ob die noch läuft? Webseite antwortet nicht.',
 'Winterhude', NOW() - INTERVAL '6 days'),

(u_petra, 'frage', 'Klavier- oder Musikstunden für 4-Jährige in Eppendorf?',
 'Meine Jüngste trommelt auf alles. Suche einen geduldigen Lehrer oder eine Musikgruppe.',
 'Eppendorf', NOW() - INTERVAL '6 days 2 hours'),

-- Tauschbörse
(u_katha, 'empfehlung', 'Hochstuhl IKEA Antilop fast neu',
 'Mit Tablett und Sicherheitsgurt, gereinigt. Zu verschenken. Eppendorf.',
 'Eppendorf', NOW() - INTERVAL '6 days 1 hour'),

(u_isa, 'suche', 'Suche Rollbrett für 3-Jährige',
 'Die kleinen flachen mit den Griffen. Zoé ist begeistert von denen. Gerne gebraucht.',
 'Ottensen', NOW() - INTERVAL '6 days 3 hours'),

(u_nina, 'empfehlung', 'Bauchtrage Ergobaby abzugeben',
 'Drei Einlegebögen dabei, super Zustand. 40 Euro. Winterhude, kann auch an die U-Bahn gebracht werden.',
 'Winterhude', NOW() - INTERVAL '6 days 4 hours'),

-- Empfehlungen
(u_bjoern, 'empfehlung', 'Wochenmarkt Mühlenkamp Mittwoch — entspannter als samstags',
 'Guter Käsestand, frischer Fisch, faire Preise. Mit Kinderwagen gut machbar. 8-13 Uhr.',
 'Winterhude', NOW() - INTERVAL '6 days 5 hours'),

-- Veranstaltungen
(u_sarah, 'veranstaltung', 'Babymassage-Kurs April — Familienzentrum Eimsbüttel',
 '5 Wochen, Methfesselstraße, 60 Euro. Ab 6 Wochen bis ca. 6 Monate. Anmeldung über das Zentrum.',
 'Eimsbüttel', NOW() - INTERVAL '6 days 6 hours'),

-- ══ 7 TAGE ══

-- Fragen
(u_hannah, 'frage', 'Wo kauft ihr Klamotten für Kinder in Winterhude?',
 'Ohne Online-Shopping. Gibt es gute Läden im Viertel oder in der Nähe?',
 'Winterhude', NOW() - INTERVAL '7 days'),

(u_franzi, 'frage', 'Mama-Café unter der Woche in Eppendorf?',
 'Suche einen Ort wo ich mich mit anderen Müttern treffen kann ohne dass es zu chaotisch wird. Kind (4) dabei.',
 'Eppendorf', NOW() - INTERVAL '7 days 2 hours'),

-- Tauschbörse
(u_marco, 'empfehlung', 'Lego Duplo-Set Baustelle abzugeben',
 'OVP, einmal gespielt. Sohn findet Lego nicht mehr interessant. 15 Euro. Altona.',
 'Altona', NOW() - INTERVAL '7 days 1 hour'),

(u_jonas_e, 'suche', 'Suche Babyphone das noch funktioniert',
 'Unser altes hat aufgehört. Gerne gebraucht, hauptsache es funktioniert. Eppendorf.',
 'Eppendorf', NOW() - INTERVAL '7 days 3 hours'),

-- Treffen
(u_sven, 'treffen', 'Lauftreffen Stadtpark Samstag 9 Uhr — jede Woche',
 'Ca. 5 km um den Park. Kinderwagen auf dem äußeren Weg kein Problem. Eingang Jahnring.',
 'Winterhude', NOW() - INTERVAL '7 days 4 hours'),

-- Empfehlungen
(u_lena, 'empfehlung', 'Kinderarzt Dr. Hennings Eppendorf — frühmorgens anrufen',
 'Er nimmt noch Patienten. Aber wirklich nur wenn man um 8 anruft und flexibel ist. Die Praxis selbst ist sehr gut.',
 'Eppendorf', NOW() - INTERVAL '7 days 5 hours'),

(u_tom, 'empfehlung', 'Zeiseweg Spielplatz Ottensen — absolutes Muss',
 'Bach, Matsch, Holz. Morgens zwischen 9-11 wunderbar ruhig. Nachmittags voll aber trotzdem schön.',
 'Ottensen', NOW() - INTERVAL '7 days 6 hours'),

-- Veranstaltung
(u_daniel, 'veranstaltung', 'Schanzenfest — mit Kleinkind bis 17 Uhr okay?',
 'Meine Erfahrung: tagsüber entspannt, ab 18 Uhr wird es zu voll und laut für Kleine unter 3.',
 'Sternschanze', NOW() - INTERVAL '7 days 7 hours');

-- ─── 4. Kommentare — kurz, menschlich, kein Expertenton ──────────────────────

INSERT INTO comments (post_id, author_id, body, created_at)
SELECT p.id, u_markus,
  'Stadtpark-Spielplatz am Südring hat nachmittags Schatten durch die Bäume.',
  NOW() - INTERVAL '1 hour 45 minutes'
FROM posts p WHERE p.title LIKE '%Schatten%' LIMIT 1;

INSERT INTO comments (post_id, author_id, body, created_at)
SELECT p.id, u_nina,
  'Wir auch oft im Stadtpark! Schreib mir kurz dann kommen Lila und ich auch.',
  NOW() - INTERVAL '1 hour 30 minutes'
FROM posts p WHERE p.title LIKE '%Schatten%' LIMIT 1;

INSERT INTO comments (post_id, author_id, body, created_at)
SELECT p.id, u_lena,
  'Bäckerei Junge auf dem Isemarkt hat die besten. Oder Konditorei Lindtner in der Eppendorfer Landstraße.',
  NOW() - INTERVAL '3 hours 20 minutes'
FROM posts p WHERE p.title LIKE '%Franzbrötchen%' LIMIT 1;

INSERT INTO comments (post_id, author_id, body, created_at)
SELECT p.id, u_petra,
  'Lindtner ist wirklich gut. Dienstags immer frisch.',
  NOW() - INTERVAL '3 hours'
FROM posts p WHERE p.title LIKE '%Franzbrötchen%' LIMIT 1;

INSERT INTO comments (post_id, author_id, body, created_at)
SELECT p.id, u_sven,
  'ETV ist gut, mein Erik war dort. Freitagsgruppe ist besonders nett.',
  NOW() - INTERVAL '22 hours'
FROM posts p WHERE p.title LIKE '%ETV%' LIMIT 1;

INSERT INTO comments (post_id, author_id, body, created_at)
SELECT p.id, u_markus,
  'Können wir bestätigen. Leon hat Freitags immer Laune danach.',
  NOW() - INTERVAL '21 hours 30 minutes'
FROM posts p WHERE p.title LIKE '%ETV%' LIMIT 1;

INSERT INTO comments (post_id, author_id, body, created_at)
SELECT p.id, u_bjoern,
  'Café Mimosa in der Erikastraße. Sonntags voll aber die nehmen Kinder ernst.',
  NOW() - INTERVAL '2 days 1 hour'
FROM posts p WHERE p.title LIKE '%sonntags%frühstücken%' LIMIT 1;

INSERT INTO comments (post_id, author_id, body, created_at)
SELECT p.id, u_lisa,
  'Wir waren da! Stimmt, die sind sehr entspannt mit Kindern.',
  NOW() - INTERVAL '2 days 45 minutes'
FROM posts p WHERE p.title LIKE '%sonntags%frühstücken%' LIMIT 1;

INSERT INTO comments (post_id, author_id, body, created_at)
SELECT p.id, u_katha,
  'Der Buggy ist weg — wir haben schon einen bekommen. Danke allen!',
  NOW() - INTERVAL '1 day 2 hours'
FROM posts p WHERE p.title LIKE '%Buggy%' AND p.author_id = u_lena LIMIT 1;

INSERT INTO comments (post_id, author_id, body, created_at)
SELECT p.id, u_nina,
  'Haben wir auch eine Weile gesucht. Schau mal auf Kleinanzeigen unter Winterhude — da geht viel.',
  NOW() - INTERVAL '1 day 1 hour 30 minutes'
FROM posts p WHERE p.title LIKE '%Buggy%' AND p.author_id = u_lena LIMIT 1;

INSERT INTO comments (post_id, author_id, body, created_at)
SELECT p.id, u_lena,
  'Joolz Geo kann ich auch empfehlen. War bei uns 4 Jahre im Einsatz.',
  NOW() - INTERVAL '5 hours 30 minutes'
FROM posts p WHERE p.title LIKE '%Joolz%' LIMIT 1;

INSERT INTO comments (post_id, author_id, body, created_at)
SELECT p.id, u_markus,
  'Wir haben unseren heute ausgeliehen bekommen — danke Sven! Für alle anderen: er verleiht regelmäßig.',
  NOW() - INTERVAL '2 days 30 minutes'
FROM posts p WHERE p.title LIKE '%Fahrradanhänger%' LIMIT 1;

INSERT INTO comments (post_id, author_id, body, created_at)
SELECT p.id, u_bjoern,
  'Ich habe noch einen. Einfach melden wenn Sven verliehen hat.',
  NOW() - INTERVAL '2 days 20 minutes'
FROM posts p WHERE p.title LIKE '%Fahrradanhänger%' LIMIT 1;

INSERT INTO comments (post_id, author_id, body, created_at)
SELECT p.id, u_sarah,
  'Kinderärztin Dr. Schröder in der Isestraße nimmt noch. Sehr freundlich, nimmt sich Zeit.',
  NOW() - INTERVAL '1 day 22 hours'
FROM posts p WHERE p.title LIKE '%Kinderarzt%' AND p.author_id = u_robert LIMIT 1;

INSERT INTO comments (post_id, author_id, body, created_at)
SELECT p.id, u_petra,
  'Stimmt, Dr. Schröder ist gut. Wartezeiten sind okay.',
  NOW() - INTERVAL '1 day 21 hours'
FROM posts p WHERE p.title LIKE '%Kinderarzt%' AND p.author_id = u_robert LIMIT 1;

INSERT INTO comments (post_id, author_id, body, created_at)
SELECT p.id, u_tom,
  'Wir kommen am Samstag vorbei! Oskar freut sich.',
  NOW() - INTERVAL '6 days 22 hours'
FROM posts p WHERE p.title LIKE '%Lauftreffen Stadtpark%' LIMIT 1;

INSERT INTO comments (post_id, author_id, body, created_at)
SELECT p.id, u_markus,
  'Ich auch. Hab ich abonniert sozusagen.',
  NOW() - INTERVAL '6 days 21 hours'
FROM posts p WHERE p.title LIKE '%Lauftreffen Stadtpark%' LIMIT 1;

INSERT INTO comments (post_id, author_id, body, created_at)
SELECT p.id, u_katha,
  'Hennings war bei uns auch gut. Hauptsache früh anrufen, das stimmt.',
  NOW() - INTERVAL '6 days 22 hours'
FROM posts p WHERE p.title LIKE '%Dr. Hennings%' LIMIT 1;

INSERT INTO comments (post_id, author_id, body, created_at)
SELECT p.id, u_elena,
  'Danke für den Tipp. Haben morgen früh angerufen und direkt einen Termin bekommen.',
  NOW() - INTERVAL '6 days 20 hours'
FROM posts p WHERE p.title LIKE '%Dr. Hennings%' LIMIT 1;

INSERT INTO comments (post_id, author_id, body, created_at)
SELECT p.id, u_nina,
  'Haferland kenne ich auch gut. Stimmt alles. Donnerstags nachmittags besonders ruhig.',
  NOW() - INTERVAL '22 hours'
FROM posts p WHERE p.title LIKE '%Haferland%' LIMIT 1;

END $$;
