-- ─────────────────────────────────────────────────────────────────────────────
-- MAPA — Seed v4
-- 25 Personas · 65 Posts · 20 Kommentare
-- Verteilung: 25% Treffen · 25% Empfehlung · 25% Fragen · 25% Tauschbörse
-- Rhythmus: Typen abwechselnd, nicht nach Autor geclustert
-- Sprache: Treffen ohne "heute um X Uhr"-Dominanz, zeitlose Empfehlungen
-- ─────────────────────────────────────────────────────────────────────────────

DO $$
DECLARE
  u_markus  UUID := 'a1000000-0000-0000-0000-000000000001';
  u_hannah  UUID := 'a1000000-0000-0000-0000-000000000002';
  u_sven    UUID := 'a1000000-0000-0000-0000-000000000003';
  u_lisa    UUID := 'a1000000-0000-0000-0000-000000000004';
  u_david   UUID := 'a1000000-0000-0000-0000-000000000005';
  u_nina    UUID := 'a1000000-0000-0000-0000-000000000006';
  u_bjoern  UUID := 'a1000000-0000-0000-0000-000000000007';
  u_maria   UUID := 'a1000000-0000-0000-0000-000000000008';
  u_lena    UUID := 'a1000000-0000-0000-0000-000000000009';
  u_petra   UUID := 'a1000000-0000-0000-0000-000000000010';
  u_robert  UUID := 'a1000000-0000-0000-0000-000000000011';
  u_katha   UUID := 'a1000000-0000-0000-0000-000000000012';
  u_elena   UUID := 'a1000000-0000-0000-0000-000000000013';
  u_jonas_e UUID := 'a1000000-0000-0000-0000-000000000014';
  u_franzi  UUID := 'a1000000-0000-0000-0000-000000000015';
  u_natalia UUID := 'a1000000-0000-0000-0000-000000000016';
  u_tom     UUID := 'a1000000-0000-0000-0000-000000000017';
  u_marco   UUID := 'a1000000-0000-0000-0000-000000000018';
  u_isa     UUID := 'a1000000-0000-0000-0000-000000000019';
  u_kai     UUID := 'a1000000-0000-0000-0000-000000000020';
  u_laura   UUID := 'a1000000-0000-0000-0000-000000000021';
  u_sarah   UUID := 'a1000000-0000-0000-0000-000000000022';
  u_clara   UUID := 'a1000000-0000-0000-0000-000000000023';
  u_jana    UUID := 'a1000000-0000-0000-0000-000000000024';
  u_daniel  UUID := 'a1000000-0000-0000-0000-000000000025';

BEGIN

-- ─── Auth-User ────────────────────────────────────────────────────────────────

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

-- ─── Profile ──────────────────────────────────────────────────────────────────

INSERT INTO profiles (id, first_name, stadtteil, bio, is_local_host, can_help_with, looking_for, interests, joined_at)
VALUES
  (u_markus,  'Markus',    'Winterhude',  'Erzieher, Elternzeit mit Leon (2). Lerne Hamburg als Vater ganz neu kennen.',
   false, ARRAY['Kita-Tipps'], ARRAY['Väter-Treffen'], ARRAY['Spielplätze & Treffen'], NOW() - INTERVAL '45 days'),
  (u_hannah,  'Hannah',    'Winterhude',  'Krankenpflegerin, Zwillinge (2,5). Immer müde, immer dankbar für Tipps.',
   false, ARRAY['Zwillings-Tipps'], ARRAY['Zwillings-Gruppe'], ARRAY['Spielplätze & Treffen','Familiencafés'], NOW() - INTERVAL '30 days'),
  (u_sven,    'Sven',      'Winterhude',  'Sportlehrer, Papa von Erik (7). Morgens laufen, abends Hausaufgaben.',
   false, ARRAY['Sport'], ARRAY['Sportgruppe Kinder'], ARRAY['Kurse & Sport'], NOW() - INTERVAL '60 days'),
  (u_lisa,    'Lisa',      'Winterhude',  'Marketing Managerin in Teilzeit, Mutter von Mila (3). Liebe den Isemarkt.',
   false, ARRAY['Markt-Tipps'], ARRAY['Krabbelgruppe'], ARRAY['Familiencafés','Lokale Empfehlungen'], NOW() - INTERVAL '22 days'),
  (u_david,   'David',     'Winterhude',  'Musiker, Sohn Ben (4). Gebe Gitarrenstunden für Kinder ab 5.',
   false, ARRAY['Musik'], ARRAY['Musikgruppe Kleinkinder'], ARRAY['Kurse & Sport'], NOW() - INTERVAL '14 days'),
  (u_nina,    'Nina',      'Winterhude',  'Freie Grafikerin, Lila (2,5). Winterhude seit 6 Jahren.',
   false, ARRAY['Café-Tipps'], ARRAY['Spielgruppe'], ARRAY['Familiencafés'], NOW() - INTERVAL '18 days'),
  (u_bjoern,  'Björn',     'Winterhude',  'Physiotherapeut, Vater von Oskar (6). Seit 9 Jahren in Winterhude.',
   true,  ARRAY['Winterhude-Tipps'], ARRAY['Sportgruppe'], ARRAY['Spielplätze & Treffen','Lokale Empfehlungen'], NOW() - INTERVAL '95 days'),
  (u_maria,   'Maria',     'Winterhude',  'Brasilianerin, Kassierin, zwei Kinder (3 und 6).',
   false, ARRAY['Portugiesisch'], ARRAY['Internationale Spielgruppe'], ARRAY['Spielplätze & Treffen'], NOW() - INTERVAL '35 days'),
  (u_lena,    'Lena',      'Eppendorf',   'Marketing Managerin in Elternzeit. Zwei Jungs (3 und 6), kenne Eppendorf in- und auswendig.',
   true,  ARRAY['Spielplatz-Tipps','Eppendorf-Tipps'], ARRAY['Krabbelgruppe'], ARRAY['Spielplätze & Treffen','Familiencafés'], NOW() - INTERVAL '90 days'),
  (u_petra,   'Petra',     'Eppendorf',   'Sachbearbeiterin, drei Kinder (8, 11, 14). 20 Jahre in Eppendorf.',
   false, ARRAY['Schultipps'], ARRAY['Elterncafé'], ARRAY['Lokale Empfehlungen'], NOW() - INTERVAL '85 days'),
  (u_robert,  'Robert',    'Eppendorf',   'Elektriker, Papa von Lukas (7).',
   false, ARRAY['Reparaturen'], ARRAY['Schulkind-Gruppe'], ARRAY['Spielplätze & Treffen'], NOW() - INTERVAL '40 days'),
  (u_katha,   'Katharina', 'Eppendorf',   'HR Managerin in Elternzeit, zwei Mädchen (2 und 5).',
   false, ARRAY['Isemarkt-Tipps'], ARRAY['Kita-Platz Eppendorf'], ARRAY['Familiencafés'], NOW() - INTERVAL '55 days'),
  (u_elena,   'Elena',     'Eppendorf',   'Ukrainerin, Verkäuferin. Tochter Darija (4). Dankbar für nette Nachbarn.',
   false, ARRAY['Ukrainisch'], ARRAY['Deutschkurs'], ARRAY['Spielplätze & Treffen'], NOW() - INTERVAL '8 days'),
  (u_jonas_e, 'Jonas',     'Eppendorf',   'Projektmanager, Papa von Finn (2). Erstes Kind, lerne alles.',
   false, ARRAY['Väter-Tipps'], ARRAY['Krabbelgruppe'], ARRAY['Spielplätze & Treffen'], NOW() - INTERVAL '12 days'),
  (u_franzi,  'Franziska', 'Eppendorf',   'Selbstständige Grafikerin, Clara (4). Arbeite von zu Hause.',
   false, ARRAY['Café-Tipps'], ARRAY['Spielgruppe Nachmittag'], ARRAY['Familiencafés'], NOW() - INTERVAL '25 days'),
  (u_natalia, 'Natalia',   'Eppendorf',   'Russin, Übersetzerin, 12 Jahre in Hamburg. Zwei Kinder (4 und 9).',
   false, ARRAY['Russisch'], ARRAY['Russisch-Deutsche Gruppe'], ARRAY['Lokale Empfehlungen'], NOW() - INTERVAL '70 days'),
  (u_tom,     'Tom',       'Ottensen',    'Handwerker, Lastenrad, zwei Kinder (2 und 5). Ottensen seit 10 Jahren.',
   true,  ARRAY['Handwerker-Tipps','Lastenrad'], ARRAY['Papa-Gruppe'], ARRAY['Spielplätze & Treffen','Flohmärkte & Tauschen'], NOW() - INTERVAL '100 days'),
  (u_marco,   'Marco',     'Altona',      'Italiener, Koch, Vater von Pablo (4) und Luca (2).',
   false, ARRAY['Kochen'], ARRAY['Internationale Papa-Gruppe'], ARRAY['Familiencafés'], NOW() - INTERVAL '50 days'),
  (u_isa,     'Isabelle',  'Ottensen',    'Französin, Teilzeit-Verwaltung, Jules (5) und Zoé (2).',
   false, ARRAY['Französisch'], ARRAY['Bilinguale Gruppe'], ARRAY['Familiencafés'], NOW() - INTERVAL '48 days'),
  (u_kai,     'Kai',       'Ottensen',    'Maler und Lackierer, Papa von Finn (4).',
   false, ARRAY['Renovierungstipps'], ARRAY['Papa-Runde Ottensen'], ARRAY['Spielplätze & Treffen'], NOW() - INTERVAL '20 days'),
  (u_laura,   'Laura',     'Ottensen',    'Chinesisch-Deutsche, zwei Kinder (2 und 7).',
   false, ARRAY['Markt-Tipps'], ARRAY['Bilinguale Spielgruppe'], ARRAY['Familiencafés'], NOW() - INTERVAL '33 days'),
  (u_sarah,   'Sarah',     'Eimsbüttel',  'Hebamme, Mutter einer Tochter (8 Monate).',
   false, ARRAY['Hebammen-Tipps','Stillen'], ARRAY['Familiencafé-Tipp'], ARRAY['Babysitter & Hebammen'], NOW() - INTERVAL '45 days'),
  (u_clara,   'Clara',     'Sternschanze','Journalistin, Emil (18 Monate). Schreibe viel, schlafe wenig.',
   false, ARRAY['Schreiben'], ARRAY['Krabbelgruppe Schanze'], ARRAY['Events im Viertel'], NOW() - INTERVAL '28 days'),
  (u_jana,    'Jana',      'Eimsbüttel',  'Dreifach-Mama (1, 4, 7), Teilzeit Bürokauffrau.',
   false, ARRAY['Flohmärkte'], ARRAY['Kinderfahrrad'], ARRAY['Flohmärkte & Tauschen'], NOW() - INTERVAL '15 days'),
  (u_daniel,  'Daniel',    'Sternschanze','IT-Admin, Papa von Luisa (3).',
   false, ARRAY['Tech-Tipps'], ARRAY['Papa-Runde Schanze'], ARRAY['Familiencafés'], NOW() - INTERVAL '18 days')
ON CONFLICT (id) DO NOTHING;

-- ─── Posts — interleaved Rhythmus: T → E → F → S → V abwechselnd ─────────────

INSERT INTO posts (author_id, type, title, body, stadtteil, created_at)
VALUES

-- HEUTE — abwechselnd T/E/F/S
(u_bjoern,  'treffen',     'Spielplatz Alsterdorfer Straße — wer ist heute Nachmittag dabei?',
 'Oskar und ich sind ab 14:30 dort. Einfach vorbeikommen.',
 'Winterhude', NOW() - INTERVAL '1 hour'),

(u_lena,    'empfehlung',  'Café Mimosa Erikastraße — unser Familien-Stammcafé',
 'Hochstühle, kein genervtes Schauen, Kuchen selbst gemacht. Sonntags voll aber wochentags entspannt. Unbedingt gehen.',
 'Eppendorf', NOW() - INTERVAL '1 hour 30 minutes'),

(u_lisa,    'frage',       'Welcher Spielplatz hat nachmittags Schatten in Winterhude?',
 'Es wird heiß die nächsten Tage. Kennt jemand einen Spielplatz der nicht in der prallen Sonne liegt?',
 'Winterhude', NOW() - INTERVAL '2 hours'),

(u_kai,     'suche',       'Kinderfahrrad 16 Zoll gesucht',
 'Finn wird im Herbst 5. Suche ein 16-Zoll-Rad, gerne gebraucht. Budget ca. 50 Euro. Abholung Ottensen.',
 'Ottensen', NOW() - INTERVAL '2 hours 30 minutes'),

(u_jonas_e, 'frage',       'Wo gibt es in Eppendorf gute Franzbrötchen?',
 'Zugezogen und noch nicht orientiert. Muss dringend behoben werden.',
 'Eppendorf', NOW() - INTERVAL '3 hours'),

(u_nina,    'empfehlung',  'Kinderfriseur Haarschnitt Hamburg Winterhude — Geheimtipp',
 'Salon Kleine Mähne an der Geibelstraße. Die Friseurin hat unendlich Geduld mit unruhigen Kindern. Terminbuchung online.',
 'Winterhude', NOW() - INTERVAL '3 hours 30 minutes'),

(u_petra,   'suche',       'Suche Laufrad für 3-Jährige',
 'Meine Jüngste will endlich auch eins. Gerne gebraucht, jede Marke. Kann in Eppendorf abholen.',
 'Eppendorf', NOW() - INTERVAL '4 hours'),

(u_franzi,  'treffen',     'Spontaner Isebek-Spaziergang — wer hat Lust?',
 'Clara und ich gehen heute Morgen zum Isebek. Eingang Lehmweg, ca. 10 Uhr. Kein Plan, einfach laufen.',
 'Eppendorf', NOW() - INTERVAL '4 hours 30 minutes'),

(u_hannah,  'frage',       'Wo kann man sonntags mit Kleinkind frühstücken in Winterhude?',
 'Mit Zwillingen (2,5). Brauche einen Ort der das aushält. Hochstuhl wäre schön.',
 'Winterhude', NOW() - INTERVAL '5 hours'),

(u_jana,    'empfehlung',  'Winterjacke Gr. 98 zu verschenken',
 'Lupilu, noch in gutem Zustand. Zu klein geworden. Abholung Eimsbüttel.',
 'Eimsbüttel', NOW() - INTERVAL '5 hours 30 minutes'),

-- GESTERN — T/E/F/S abwechselnd
(u_sven,    'treffen',     'Lauftreffen Stadtpark — jeden Samstag 9 Uhr',
 'Ca. 5 km um den Park. Kinderwagen auf dem äußeren Weg kein Problem. Eingang Jahnring. Einfach auftauchen.',
 'Winterhude', NOW() - INTERVAL '1 day'),

(u_bjoern,  'empfehlung',  'Haferland Café am Mühlenkamp',
 'Kinderfreundlich ohne viel Aufhebens. Hochstühle, kein Theater wenn Krümel fallen. Wochentags fast immer Platz.',
 'Winterhude', NOW() - INTERVAL '1 day 1 hour'),

(u_katha,   'frage',       'Welche Kita macht viel draußen in Eppendorf?',
 'Waldkindergarten wäre ideal aber vielleicht zu weit. Hat jemand eine Kita die wirklich viel Außenzeit macht?',
 'Eppendorf', NOW() - INTERVAL '1 day 2 hours'),

(u_maria,   'empfehlung',  'Holzeisenbahn fast komplett zu verschenken',
 'Brio-kompatibel, viele Schienen und Züge. Zu groß für unsere neue Wohnung. Selbstabholung Winterhude.',
 'Winterhude', NOW() - INTERVAL '1 day 3 hours'),

(u_markus,  'frage',       'Hat jemand Erfahrung mit dem Kinderturnen beim ETV?',
 'Leon wird im Herbst 3. Der ETV liegt günstig. Ist die Freitagsgruppe gut?',
 'Winterhude', NOW() - INTERVAL '1 day 4 hours'),

(u_marco,   'suche',       'Suche Tripp-Trapp oder ähnlichen Hochstuhl',
 'Für Luca (11 Monate). Gerne gebraucht. Budget 40 Euro. Altona oder Ottensen.',
 'Altona', NOW() - INTERVAL '1 day 5 hours'),

(u_lena,    'empfehlung',  'Spielplatz Dorotheenstraße — gerade renoviert',
 'Neue Kletterwand, Sandkasten mit Wasserpumpe. Morgens zwischen 9 und 11 fast leer. Für 2-8 Jahre.',
 'Eppendorf', NOW() - INTERVAL '1 day 6 hours'),

(u_david,   'treffen',     'Kinderkonzert bei uns — Gitarre für kleine Ohren',
 'Kleine Gitarrenrunde, 45 Minuten, 6 Kinder max, 3-8 Jahre. Kostenlos. Nächsten Samstag 10 Uhr. Wer möchte meldet sich.',
 'Winterhude', NOW() - INTERVAL '1 day 7 hours'),

(u_clara,   'frage',       'Kennt jemand einen guten Kinderfriseur in der Schanze?',
 'Emil hasst Haare schneiden. Ich suche jemanden der damit umgehen kann.',
 'Sternschanze', NOW() - INTERVAL '1 day 8 hours'),

(u_sven,    'empfehlung',  'Skianzug Gr. 104 abzugeben',
 'Reima, sehr guter Zustand. Zu klein. 15 Euro oder Tausch gegen Gr. 110.',
 'Winterhude', NOW() - INTERVAL '1 day 9 hours'),

-- VORGESTERN — E/F/S/T
(u_sarah,   'empfehlung',  'Hebamme Praxis Methfesselstraße — meine klare Empfehlung',
 'Mehrere Hebammen, gut organisiert, nehmen sich Zeit. Für Eimsbüttel und Hoheluft die beste Adresse. Frühzeitig anmelden.',
 'Eimsbüttel', NOW() - INTERVAL '2 days'),

(u_robert,  'frage',       'Guter Kinderarzt in Eppendorf der noch Patienten nimmt?',
 'Unser Kinderarzt hört auf. Lukas ist 7. Suche Empfehlung für Eppendorf oder direkt nebenan.',
 'Eppendorf', NOW() - INTERVAL '2 days 1 hour'),

(u_isa,     'empfehlung',  'Duplo-Kiste zu verschenken',
 'Große Kiste, gut 100 Steine. Kinder zu groß dafür. Abholung Ottensen.',
 'Ottensen', NOW() - INTERVAL '2 days 2 hours'),

(u_nina,    'frage',       'Schwimmkurs für 2-Jährige in Winterhude — wo?',
 'Lila hat keine Angst vorm Wasser. Suche einen Kurs der noch Plätze hat.',
 'Winterhude', NOW() - INTERVAL '2 days 3 hours'),

(u_tom,     'treffen',     'Jemand Lust auf Spaziergang um die Außenalster?',
 'Starte am Wochenende vom Jungfernstieg. Ca. 14 km, flach. Kinderwagen kein Problem. Einfach melden.',
 'Ottensen', NOW() - INTERVAL '2 days 4 hours'),

(u_lena,    'empfehlung',  'Kinderarzt Dr. Hennings Eppendorf — frühmorgens anrufen',
 'Er nimmt noch Patienten. Nur wenn man um 8 Uhr anruft und flexibel ist. Die Praxis selbst ist sehr gut.',
 'Eppendorf', NOW() - INTERVAL '2 days 5 hours'),

(u_elena,   'frage',       'Deutschkurs mit Kinderbetreuung in Eppendorf?',
 'Ich suche einen Kurs wo ich Deutsch lernen kann während Darija (4) betreut wird.',
 'Eppendorf', NOW() - INTERVAL '2 days 6 hours'),

(u_natalia, 'suche',       'Kinderschuhe Gr. 24 gesucht',
 'Ricosta oder ähnlich. Gerne gebraucht. Abholung Eppendorf.',
 'Eppendorf', NOW() - INTERVAL '2 days 7 hours'),

(u_markus,  'treffen',     'Papa-Kaffee Sonntag — wer ist dabei?',
 'Ich schlage vor: Sonntag 10 Uhr Haferland. Kinder mitbringen, quatschen. Keine Agenda.',
 'Winterhude', NOW() - INTERVAL '2 days 8 hours'),

-- 3 TAGE — F/E/S/T abwechselnd
(u_hannah,  'frage',       'Kinderarzt der Zwillinge gleichzeitig untersucht?',
 'Bei unserer alten Praxis war das ein Problem. Hat jemand eine Empfehlung?',
 'Winterhude', NOW() - INTERVAL '3 days'),

(u_bjoern,  'empfehlung',  'Wochenmarkt Mühlenkamp Mittwoch — entspannter als samstags',
 'Guter Käsestand, frischer Fisch, faire Preise. Mit Kinderwagen gut machbar. 8–13 Uhr.',
 'Winterhude', NOW() - INTERVAL '3 days 1 hour'),

(u_lisa,    'suche',       'Suche Babywippe gebraucht',
 'Für Bekannte die gerade ein Kind bekommen haben. Jede Marke. Abholung Winterhude.',
 'Winterhude', NOW() - INTERVAL '3 days 2 hours'),

(u_sven,    'frage',       'Fußballgruppe für 6-7 Jährige in Winterhude?',
 'Erik will Fußball spielen. Verein oder informell, beides gut.',
 'Winterhude', NOW() - INTERVAL '3 days 3 hours'),

(u_lena,    'treffen',     'Isemarkt-Runde Dienstag 9 Uhr — wer kommt mit?',
 'Ich gehe fast jeden Dienstag. Falls jemand Lust hat gemeinsam zu gehen und hinterher Kaffee zu trinken.',
 'Eppendorf', NOW() - INTERVAL '3 days 4 hours'),

(u_sarah,   'empfehlung',  'Café Backwahn Fruchtallee — Wickelraum, Hochstühle, kein Stress',
 'Einer der wenigen Orte wo ich mit Kind entspannt Kaffee trinken kann. Mittwochs weniger voll.',
 'Eimsbüttel', NOW() - INTERVAL '3 days 5 hours'),

(u_marco,   'suche',       'Suche Kinderbücher für 2-4 Jährige',
 'Gerne Klassiker oder was eure Kinder besonders geliebt haben. Kaufen oder tauschen. Altona.',
 'Altona', NOW() - INTERVAL '3 days 6 hours'),

(u_petra,   'frage',       'Gute Grundschule in Eppendorf — welche habt ihr gewählt?',
 'Wir müssen nächstes Jahr anmelden. Würde gerne wissen welche Erfahrungen ihr gemacht habt.',
 'Eppendorf', NOW() - INTERVAL '3 days 7 hours'),

-- 4 TAGE — S/F/T/E
(u_katha,   'empfehlung',  'Hochstuhl IKEA Antilop fast neu abzugeben',
 'Mit Tablett und Sicherheitsgurt, gereinigt. Zu verschenken. Eppendorf.',
 'Eppendorf', NOW() - INTERVAL '4 days'),

(u_jonas_e, 'frage',       'Wo kann man in Eppendorf sonntags gut frühstücken?',
 'Mit Kleinkind (2). Nicht zu laut, Kinder okay, am liebsten mit Hochstuhl.',
 'Eppendorf', NOW() - INTERVAL '4 days 1 hour'),

(u_maria,   'treffen',     'Spielplatz Mühlenkampstraße am Wochenende?',
 'Bin mit meinen Zweien (3 und 6) fast jeden Samstag dort. Wer will kommt einfach dazu.',
 'Winterhude', NOW() - INTERVAL '4 days 2 hours'),

(u_nina,    'empfehlung',  'Bauchtrage Ergobaby abzugeben',
 'Drei Einlegebögen dabei, super Zustand. 40 Euro. Winterhude.',
 'Winterhude', NOW() - INTERVAL '4 days 3 hours'),

(u_robert,  'suche',       'Suche Werkzeug zum Ausleihen — Bohrmaschine',
 'Für ein Wochenendprojekt. Hat jemand in Eppendorf was und würde es kurz verleihen?',
 'Eppendorf', NOW() - INTERVAL '4 days 4 hours'),

(u_daniel,  'frage',       'Erfahrungen mit der Kita Kleines Haus Sternschanze?',
 'Wir haben einen Platz bekommen. Kennt jemand die Einrichtung?',
 'Sternschanze', NOW() - INTERVAL '4 days 5 hours'),

(u_jana,    'veranstaltung','Familienflohmarkt Eimsbüttel — Samstag 10–14 Uhr',
 'Ich bin dabei mit Klamotten Gr. 74–98 und Spielzeug. Eingang Methfesselstraße. Freier Eintritt.',
 'Eimsbüttel', NOW() - INTERVAL '4 days 6 hours'),

(u_bjoern,  'empfehlung',  'Schwimmschule Barracuda Winterhude — sehr empfehlenswert',
 'Erik schwimmt seit 5 Jahren dort. Kleine Gruppen, gute Pädagogik, keine langen Wartelisten wenn man früh bucht.',
 'Winterhude', NOW() - INTERVAL '4 days 7 hours'),

-- 5 TAGE — E/F/S/T
(u_lena,    'empfehlung',  'Isemarkt: die besten Stände wenn man wenig Zeit hat',
 'Bäcker Gust am Anfang links. Gemüse in der Mitte beim roten Stand. Fisch ganz hinten. Dienstags 20 Min, fertig.',
 'Eppendorf', NOW() - INTERVAL '5 days'),

(u_franzi,  'frage',       'Gibt es eine Spielgruppe für Einzelkinder in Eppendorf?',
 'Clara hat keine Geschwister. Ich suche regelmäßigen Kontakt unter der Woche.',
 'Eppendorf', NOW() - INTERVAL '5 days 1 hour'),

(u_elena,   'empfehlung',  'Kinderwagen Chicco Simplicity abzugeben',
 'Gut erhalten, alle Teile dabei. 50 Euro. Abholung Eppendorf oder U-Bahn.',
 'Eppendorf', NOW() - INTERVAL '5 days 2 hours'),

(u_markus,  'suche',       'Suche Fahrradanhänger — kurze Leihe',
 'Für ein Wochenende. Hat jemand in Winterhude einen den wir ausleihen dürfen? Leon ist 2.',
 'Winterhude', NOW() - INTERVAL '5 days 3 hours'),

(u_tom,     'treffen',     'Zeiseweg Spielplatz Ottensen — wer ist dabei?',
 'Wir sind regelmäßig dort, meistens vormittags. Bach, Matsch, Holz. Einfach vorbeikommen.',
 'Ottensen', NOW() - INTERVAL '5 days 4 hours'),

(u_katha,   'frage',       'Kinderfriseur in Eppendorf der ohne Drama schneidet?',
 'Meine Große (5) sitzt nicht still. Kennt jemand jemanden mit Erfahrung für unruhige Kinder?',
 'Eppendorf', NOW() - INTERVAL '5 days 5 hours'),

(u_isa,     'suche',       'Suche Rollbrett für 3-Jährige',
 'Die kleinen flachen mit den Griffen. Zoé ist begeistert. Gerne gebraucht. Ottensen.',
 'Ottensen', NOW() - INTERVAL '5 days 6 hours'),

-- 6 TAGE — F/E/T/S
(u_hannah,  'frage',       'Stillen in der Öffentlichkeit — wo seid ihr entspannt?',
 'Suche entspannte Cafés oder Orte in Winterhude wo das kein Thema ist.',
 'Winterhude', NOW() - INTERVAL '6 days'),

(u_nina,    'empfehlung',  'Restaurant Koriander Eppendorf — Kinder wirklich willkommen',
 'Nicht nur geduldet, wirklich willkommen. Kinderteller, Hochstühle, die Bedienung reagiert auf Kinder. Sehr angenehm.',
 'Eppendorf', NOW() - INTERVAL '6 days 1 hour'),

(u_petra,   'frage',       'Klavier- oder Musikstunden für 4-Jährige?',
 'Meine Jüngste trommelt auf alles. Suche einen geduldigen Lehrer in Eppendorf.',
 'Eppendorf', NOW() - INTERVAL '6 days 2 hours'),

(u_david,   'treffen',     'Musikgruppe für Kleinkinder — jeden Donnerstag',
 'Ben und ich machen eine kleine Musikrunde mit Gitarre und Percussion. Jeden Donnerstag 10 Uhr. 3-6 Kinder, 2-5 Jahre. Meldet euch.',
 'Winterhude', NOW() - INTERVAL '6 days 3 hours'),

(u_marco,   'empfehlung',  'Lego Duplo-Set Baustelle abzugeben',
 'OVP, einmal gespielt. 15 Euro. Altona.',
 'Altona', NOW() - INTERVAL '6 days 4 hours'),

(u_lisa,    'suche',       'Suche Trampolin für Balkon',
 'Kleines Modell für innen oder Balkon. Für Mila (3). Budget 30 Euro.',
 'Winterhude', NOW() - INTERVAL '6 days 5 hours'),

(u_sarah,   'veranstaltung','Babymassage-Kurs — Familienzentrum Eimsbüttel',
 '5 Wochen, Methfesselstraße, 60 Euro. Ab 6 Wochen bis 6 Monate. Anmeldung über das Zentrum.',
 'Eimsbüttel', NOW() - INTERVAL '6 days 6 hours'),

-- 7 TAGE — E/F/S/T
(u_bjoern,  'empfehlung',  'Spielplatz Alsterdorfer Straße — ruhig, selten voll',
 'Wenig bekannt. Klettergerüst, Sandkasten, Bank im Schatten. Für 2-7 Jahre. Wochentags meistens leer.',
 'Winterhude', NOW() - INTERVAL '7 days'),

(u_franzi,  'frage',       'Mama-Café unter der Woche in Eppendorf?',
 'Suche einen Ort wo ich mich mit anderen Müttern treffen kann. Kind (4) dabei.',
 'Eppendorf', NOW() - INTERVAL '7 days 1 hour'),

(u_jonas_e, 'suche',       'Suche Babyphone gebraucht',
 'Unser altes hat aufgehört. Gerne gebraucht, hauptsache es funktioniert. Eppendorf.',
 'Eppendorf', NOW() - INTERVAL '7 days 2 hours'),

(u_lena,    'treffen',     'Krabbelgruppe Dienstag — feste Runde sucht neue Familien',
 'Wir treffen uns jeden zweiten Dienstag bei wechselnden Gastgebern in Eppendorf. Kinder 0-2 Jahre. Melden lohnt sich.',
 'Eppendorf', NOW() - INTERVAL '7 days 3 hours'),

(u_clara,   'empfehlung',  'Lauflernwagen Haba abzugeben',
 'Guter Zustand. Emil läuft jetzt alleine. Zu verschenken. Sternschanze.',
 'Sternschanze', NOW() - INTERVAL '7 days 4 hours'),

(u_daniel,  'veranstaltung','Schanzenfest — mit Kleinkind bis 17 Uhr machbar',
 'Erfahrung: tagsüber entspannt, ab 18 Uhr zu voll und laut für Kleine unter 3.',
 'Sternschanze', NOW() - INTERVAL '7 days 5 hours'),

(u_markus,  'frage',       'Krabbelgruppe Petruskirche Winterhude noch offen?',
 'Die Webseite antwortet nicht. Hat jemand aktuelle Infos?',
 'Winterhude', NOW() - INTERVAL '7 days 6 hours'),

(u_kai,     'suche',       'Suche Kinderbuggy zum Zusammenklappen',
 'Für die U-Bahn. Unser großer Kinderwagen ist zu klobig. Budget 40 Euro. Ottensen.',
 'Ottensen', NOW() - INTERVAL '7 days 7 hours');

-- ─── Kommentare — kurz, menschlich ───────────────────────────────────────────

INSERT INTO comments (post_id, author_id, body, created_at)
SELECT p.id, u_markus, 'Stadtpark-Spielplatz am Südring hat nachmittags Schatten durch die Bäume.', NOW() - INTERVAL '1 hour 45 minutes'
FROM posts p WHERE p.title LIKE '%Schatten%' LIMIT 1;

INSERT INTO comments (post_id, author_id, body, created_at)
SELECT p.id, u_nina, 'Wir auch oft im Stadtpark. Schreib mir kurz dann kommen Lila und ich auch.', NOW() - INTERVAL '1 hour 20 minutes'
FROM posts p WHERE p.title LIKE '%Schatten%' LIMIT 1;

INSERT INTO comments (post_id, author_id, body, created_at)
SELECT p.id, u_lena, 'Bäckerei Junge auf dem Isemarkt. Oder Konditorei Lindtner in der Eppendorfer Landstraße.', NOW() - INTERVAL '2 hours 40 minutes'
FROM posts p WHERE p.title LIKE '%Franzbrötchen%' LIMIT 1;

INSERT INTO comments (post_id, author_id, body, created_at)
SELECT p.id, u_petra, 'Lindtner ist wirklich gut. Dienstags immer frisch.', NOW() - INTERVAL '2 hours 10 minutes'
FROM posts p WHERE p.title LIKE '%Franzbrötchen%' LIMIT 1;

INSERT INTO comments (post_id, author_id, body, created_at)
SELECT p.id, u_bjoern, 'Café Mimosa in der Erikastraße macht Sonntag Frühstück. Kinder ausdrücklich willkommen.', NOW() - INTERVAL '4 hours 30 minutes'
FROM posts p WHERE p.title LIKE '%sonntags%frühstücken%' LIMIT 1;

INSERT INTO comments (post_id, author_id, body, created_at)
SELECT p.id, u_lisa, 'Wir waren da! Stimmt, die sind sehr entspannt.', NOW() - INTERVAL '4 hours 10 minutes'
FROM posts p WHERE p.title LIKE '%sonntags%frühstücken%' LIMIT 1;

INSERT INTO comments (post_id, author_id, body, created_at)
SELECT p.id, u_sven, 'ETV Freitagsgruppe ist super. Erik war 2 Jahre dort.', NOW() - INTERVAL '20 hours'
FROM posts p WHERE p.title LIKE '%ETV%' LIMIT 1;

INSERT INTO comments (post_id, author_id, body, created_at)
SELECT p.id, u_markus, 'Gut zu wissen. Melde mich dort mal.', NOW() - INTERVAL '19 hours 30 minutes'
FROM posts p WHERE p.title LIKE '%ETV%' LIMIT 1;

INSERT INTO comments (post_id, author_id, body, created_at)
SELECT p.id, u_sarah, 'Dr. Schröder in der Isestraße nimmt noch. Sehr freundlich.', NOW() - INTERVAL '1 day 22 hours'
FROM posts p WHERE p.title LIKE '%Kinderarzt%' AND p.stadtteil = 'Eppendorf' LIMIT 1;

INSERT INTO comments (post_id, author_id, body, created_at)
SELECT p.id, u_petra, 'Stimmt, Dr. Schröder ist gut. Wartezeiten sind okay.', NOW() - INTERVAL '1 day 21 hours'
FROM posts p WHERE p.title LIKE '%Kinderarzt%' AND p.stadtteil = 'Eppendorf' LIMIT 1;

INSERT INTO comments (post_id, author_id, body, created_at)
SELECT p.id, u_katha, 'Hennings war bei uns auch gut. Hauptsache früh anrufen.', NOW() - INTERVAL '1 day 18 hours'
FROM posts p WHERE p.title LIKE '%Dr. Hennings%' LIMIT 1;

INSERT INTO comments (post_id, author_id, body, created_at)
SELECT p.id, u_elena, 'Danke! Haben morgen früh angerufen und direkt Termin bekommen.', NOW() - INTERVAL '1 day 16 hours'
FROM posts p WHERE p.title LIKE '%Dr. Hennings%' LIMIT 1;

INSERT INTO comments (post_id, author_id, body, created_at)
SELECT p.id, u_markus, 'Ausgeliehen bekommen — danke Sven! Er verleiht regelmäßig.', NOW() - INTERVAL '4 days 20 hours'
FROM posts p WHERE p.title LIKE '%Fahrradanhänger%' LIMIT 1;

INSERT INTO comments (post_id, author_id, body, created_at)
SELECT p.id, u_bjoern, 'Ich habe auch noch einen. Einfach melden.', NOW() - INTERVAL '4 days 19 hours'
FROM posts p WHERE p.title LIKE '%Fahrradanhänger%' LIMIT 1;

INSERT INTO comments (post_id, author_id, body, created_at)
SELECT p.id, u_tom, 'Wir kommen Samstag vorbei!', NOW() - INTERVAL '4 days 22 hours'
FROM posts p WHERE p.title LIKE '%Lauftreffen Stadtpark%' LIMIT 1;

INSERT INTO comments (post_id, author_id, body, created_at)
SELECT p.id, u_lisa, 'Ich auch. Hab ich schon fest eingeplant.', NOW() - INTERVAL '4 days 21 hours'
FROM posts p WHERE p.title LIKE '%Lauftreffen Stadtpark%' LIMIT 1;

INSERT INTO comments (post_id, author_id, body, created_at)
SELECT p.id, u_nina, 'Haferland ist wirklich gut. Donnerstags nachmittags besonders ruhig.', NOW() - INTERVAL '22 hours'
FROM posts p WHERE p.title LIKE '%Haferland%' LIMIT 1;

INSERT INTO comments (post_id, author_id, body, created_at)
SELECT p.id, u_sarah, 'Methfesselstraße kann ich bestätigen. Bin selbst Hebamme und kenne die Kolleginnen dort.', NOW() - INTERVAL '1 day 22 hours'
FROM posts p WHERE p.title LIKE '%Methfesselstraße%' LIMIT 1;

INSERT INTO comments (post_id, author_id, body, created_at)
SELECT p.id, u_franzi, 'Barracuda kenne ich auch. Gute Erfahrungen.', NOW() - INTERVAL '3 days 20 hours'
FROM posts p WHERE p.title LIKE '%Barracuda%' LIMIT 1;

INSERT INTO comments (post_id, author_id, body, created_at)
SELECT p.id, u_daniel, 'Koriander war letztes Jahr gut. Stimme zu.', NOW() - INTERVAL '5 days 22 hours'
FROM posts p WHERE p.title LIKE '%Koriander%' LIMIT 1;

END $$;
