-- ─────────────────────────────────────────────────────────────────────────────
-- MAPA — Test-Seed v2
-- 50 Personas · ~80 Posts · ~45 Kommentare
-- Alle Orte, Straßen und Themen sind real und Hamburg-spezifisch.
-- Ausführen als Service Role im Supabase SQL Editor.
-- ─────────────────────────────────────────────────────────────────────────────

DO $$
DECLARE
  -- Bestehende User (ON CONFLICT DO NOTHING)
  u_lena    UUID := 'a1000000-0000-0000-0000-000000000001';
  u_markus  UUID := 'a1000000-0000-0000-0000-000000000002';
  u_sarah   UUID := 'a1000000-0000-0000-0000-000000000003';
  u_tom     UUID := 'a1000000-0000-0000-0000-000000000004';
  u_nina    UUID := 'a1000000-0000-0000-0000-000000000005';
  u_jana    UUID := 'a1000000-0000-0000-0000-000000000006';
  u_anna    UUID := 'a1000000-0000-0000-0000-000000000007';
  u_felix   UUID := 'a1000000-0000-0000-0000-000000000008';
  -- Neue User
  u_maria   UUID := 'a1000000-0000-0000-0000-000000000009';
  u_bjoern  UUID := 'a1000000-0000-0000-0000-000000000010';
  u_katha   UUID := 'a1000000-0000-0000-0000-000000000011';
  u_devika  UUID := 'a1000000-0000-0000-0000-000000000012';
  u_jonas   UUID := 'a1000000-0000-0000-0000-000000000013';
  u_sophie  UUID := 'a1000000-0000-0000-0000-000000000014';
  u_ahmed   UUID := 'a1000000-0000-0000-0000-000000000015';
  u_clara   UUID := 'a1000000-0000-0000-0000-000000000016';
  u_tobias  UUID := 'a1000000-0000-0000-0000-000000000017';
  u_yuki    UUID := 'a1000000-0000-0000-0000-000000000018';
  u_petra   UUID := 'a1000000-0000-0000-0000-000000000019';
  u_rafael  UUID := 'a1000000-0000-0000-0000-000000000020';
  u_hannah  UUID := 'a1000000-0000-0000-0000-000000000021';
  u_stefan  UUID := 'a1000000-0000-0000-0000-000000000022';
  u_laura   UUID := 'a1000000-0000-0000-0000-000000000023';
  u_micha   UUID := 'a1000000-0000-0000-0000-000000000024';
  u_franzi  UUID := 'a1000000-0000-0000-0000-000000000025';
  u_daniel  UUID := 'a1000000-0000-0000-0000-000000000026';
  u_natalia UUID := 'a1000000-0000-0000-0000-000000000027';
  u_carsten UUID := 'a1000000-0000-0000-0000-000000000028';
  u_isa     UUID := 'a1000000-0000-0000-0000-000000000029';
  u_sven    UUID := 'a1000000-0000-0000-0000-000000000030';
  u_tanja   UUID := 'a1000000-0000-0000-0000-000000000031';
  u_philipp UUID := 'a1000000-0000-0000-0000-000000000032';
  u_mia     UUID := 'a1000000-0000-0000-0000-000000000033';
  u_kai     UUID := 'a1000000-0000-0000-0000-000000000034';
  u_leila   UUID := 'a1000000-0000-0000-0000-000000000035';
  u_robert  UUID := 'a1000000-0000-0000-0000-000000000036';
  u_vera    UUID := 'a1000000-0000-0000-0000-000000000037';
  u_marco   UUID := 'a1000000-0000-0000-0000-000000000038';
  u_lisa    UUID := 'a1000000-0000-0000-0000-000000000039';
  u_thomas  UUID := 'a1000000-0000-0000-0000-000000000040';
  u_annika  UUID := 'a1000000-0000-0000-0000-000000000041';
  u_sebast  UUID := 'a1000000-0000-0000-0000-000000000042';
  u_maja    UUID := 'a1000000-0000-0000-0000-000000000043';
  u_patrick UUID := 'a1000000-0000-0000-0000-000000000044';
  u_elena   UUID := 'a1000000-0000-0000-0000-000000000045';
  u_nils    UUID := 'a1000000-0000-0000-0000-000000000046';
  u_lotte   UUID := 'a1000000-0000-0000-0000-000000000047';
  u_david   UUID := 'a1000000-0000-0000-0000-000000000048';
  u_ingrid  UUID := 'a1000000-0000-0000-0000-000000000049';
  u_benja   UUID := 'a1000000-0000-0000-0000-000000000050';

BEGIN

-- ─── 1. Auth-User ─────────────────────────────────────────────────────────────

INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at, raw_app_meta_data, raw_user_meta_data, aud, role)
VALUES
  (u_lena,    'lena.kowalski@test.mapa',      '$2a$10$placeholder', NOW(), NOW(), NOW(), '{"provider":"email"}', '{}', 'authenticated', 'authenticated'),
  (u_markus,  'markus.hoffmann@test.mapa',    '$2a$10$placeholder', NOW(), NOW(), NOW(), '{"provider":"email"}', '{}', 'authenticated', 'authenticated'),
  (u_sarah,   'sarah.mueller@test.mapa',      '$2a$10$placeholder', NOW(), NOW(), NOW(), '{"provider":"email"}', '{}', 'authenticated', 'authenticated'),
  (u_tom,     'tom.bauer@test.mapa',          '$2a$10$placeholder', NOW(), NOW(), NOW(), '{"provider":"email"}', '{}', 'authenticated', 'authenticated'),
  (u_nina,    'nina.schulz@test.mapa',        '$2a$10$placeholder', NOW(), NOW(), NOW(), '{"provider":"email"}', '{}', 'authenticated', 'authenticated'),
  (u_jana,    'jana.fischer@test.mapa',       '$2a$10$placeholder', NOW(), NOW(), NOW(), '{"provider":"email"}', '{}', 'authenticated', 'authenticated'),
  (u_anna,    'anna.lange@test.mapa',         '$2a$10$placeholder', NOW(), NOW(), NOW(), '{"provider":"email"}', '{}', 'authenticated', 'authenticated'),
  (u_felix,   'felix.weber@test.mapa',        '$2a$10$placeholder', NOW(), NOW(), NOW(), '{"provider":"email"}', '{}', 'authenticated', 'authenticated'),
  (u_maria,   'maria.santos@test.mapa',       '$2a$10$placeholder', NOW(), NOW(), NOW(), '{"provider":"email"}', '{}', 'authenticated', 'authenticated'),
  (u_bjoern,  'bjoern.larsson@test.mapa',     '$2a$10$placeholder', NOW(), NOW(), NOW(), '{"provider":"email"}', '{}', 'authenticated', 'authenticated'),
  (u_katha,   'katharina.becker@test.mapa',   '$2a$10$placeholder', NOW(), NOW(), NOW(), '{"provider":"email"}', '{}', 'authenticated', 'authenticated'),
  (u_devika,  'devika.nair@test.mapa',        '$2a$10$placeholder', NOW(), NOW(), NOW(), '{"provider":"email"}', '{}', 'authenticated', 'authenticated'),
  (u_jonas,   'jonas.richter@test.mapa',      '$2a$10$placeholder', NOW(), NOW(), NOW(), '{"provider":"email"}', '{}', 'authenticated', 'authenticated'),
  (u_sophie,  'sophie.lindner@test.mapa',     '$2a$10$placeholder', NOW(), NOW(), NOW(), '{"provider":"email"}', '{}', 'authenticated', 'authenticated'),
  (u_ahmed,   'ahmed.hassan@test.mapa',       '$2a$10$placeholder', NOW(), NOW(), NOW(), '{"provider":"email"}', '{}', 'authenticated', 'authenticated'),
  (u_clara,   'clara.vogel@test.mapa',        '$2a$10$placeholder', NOW(), NOW(), NOW(), '{"provider":"email"}', '{}', 'authenticated', 'authenticated'),
  (u_tobias,  'tobias.krueger@test.mapa',     '$2a$10$placeholder', NOW(), NOW(), NOW(), '{"provider":"email"}', '{}', 'authenticated', 'authenticated'),
  (u_yuki,    'yuki.tanaka@test.mapa',        '$2a$10$placeholder', NOW(), NOW(), NOW(), '{"provider":"email"}', '{}', 'authenticated', 'authenticated'),
  (u_petra,   'petra.wagner@test.mapa',       '$2a$10$placeholder', NOW(), NOW(), NOW(), '{"provider":"email"}', '{}', 'authenticated', 'authenticated'),
  (u_rafael,  'rafael.morales@test.mapa',     '$2a$10$placeholder', NOW(), NOW(), NOW(), '{"provider":"email"}', '{}', 'authenticated', 'authenticated'),
  (u_hannah,  'hannah.brandt@test.mapa',      '$2a$10$placeholder', NOW(), NOW(), NOW(), '{"provider":"email"}', '{}', 'authenticated', 'authenticated'),
  (u_stefan,  'stefan.neumann@test.mapa',     '$2a$10$placeholder', NOW(), NOW(), NOW(), '{"provider":"email"}', '{}', 'authenticated', 'authenticated'),
  (u_laura,   'laura.chen@test.mapa',         '$2a$10$placeholder', NOW(), NOW(), NOW(), '{"provider":"email"}', '{}', 'authenticated', 'authenticated'),
  (u_micha,   'michael.schwarz@test.mapa',    '$2a$10$placeholder', NOW(), NOW(), NOW(), '{"provider":"email"}', '{}', 'authenticated', 'authenticated'),
  (u_franzi,  'franziska.koch@test.mapa',     '$2a$10$placeholder', NOW(), NOW(), NOW(), '{"provider":"email"}', '{}', 'authenticated', 'authenticated'),
  (u_daniel,  'daniel.zimmermann@test.mapa',  '$2a$10$placeholder', NOW(), NOW(), NOW(), '{"provider":"email"}', '{}', 'authenticated', 'authenticated'),
  (u_natalia, 'natalia.petrov@test.mapa',     '$2a$10$placeholder', NOW(), NOW(), NOW(), '{"provider":"email"}', '{}', 'authenticated', 'authenticated'),
  (u_carsten, 'carsten.moeller@test.mapa',    '$2a$10$placeholder', NOW(), NOW(), NOW(), '{"provider":"email"}', '{}', 'authenticated', 'authenticated'),
  (u_isa,     'isabelle.dupont@test.mapa',    '$2a$10$placeholder', NOW(), NOW(), NOW(), '{"provider":"email"}', '{}', 'authenticated', 'authenticated'),
  (u_sven,    'sven.bergmann@test.mapa',      '$2a$10$placeholder', NOW(), NOW(), NOW(), '{"provider":"email"}', '{}', 'authenticated', 'authenticated'),
  (u_tanja,   'tanja.wolf@test.mapa',         '$2a$10$placeholder', NOW(), NOW(), NOW(), '{"provider":"email"}', '{}', 'authenticated', 'authenticated'),
  (u_philipp, 'philipp.braun@test.mapa',      '$2a$10$placeholder', NOW(), NOW(), NOW(), '{"provider":"email"}', '{}', 'authenticated', 'authenticated'),
  (u_mia,     'mia.hoffmann@test.mapa',       '$2a$10$placeholder', NOW(), NOW(), NOW(), '{"provider":"email"}', '{}', 'authenticated', 'authenticated'),
  (u_kai,     'kai.schneider@test.mapa',      '$2a$10$placeholder', NOW(), NOW(), NOW(), '{"provider":"email"}', '{}', 'authenticated', 'authenticated'),
  (u_leila,   'leila.ahmadi@test.mapa',       '$2a$10$placeholder', NOW(), NOW(), NOW(), '{"provider":"email"}', '{}', 'authenticated', 'authenticated'),
  (u_robert,  'robert.hartmann@test.mapa',    '$2a$10$placeholder', NOW(), NOW(), NOW(), '{"provider":"email"}', '{}', 'authenticated', 'authenticated'),
  (u_vera,    'vera.schulte@test.mapa',       '$2a$10$placeholder', NOW(), NOW(), NOW(), '{"provider":"email"}', '{}', 'authenticated', 'authenticated'),
  (u_marco,   'marco.ferretti@test.mapa',     '$2a$10$placeholder', NOW(), NOW(), NOW(), '{"provider":"email"}', '{}', 'authenticated', 'authenticated'),
  (u_lisa,    'lisa.knauer@test.mapa',        '$2a$10$placeholder', NOW(), NOW(), NOW(), '{"provider":"email"}', '{}', 'authenticated', 'authenticated'),
  (u_thomas,  'thomas.ritter@test.mapa',      '$2a$10$placeholder', NOW(), NOW(), NOW(), '{"provider":"email"}', '{}', 'authenticated', 'authenticated'),
  (u_annika,  'annika.sorensen@test.mapa',    '$2a$10$placeholder', NOW(), NOW(), NOW(), '{"provider":"email"}', '{}', 'authenticated', 'authenticated'),
  (u_sebast,  'sebastian.frank@test.mapa',    '$2a$10$placeholder', NOW(), NOW(), NOW(), '{"provider":"email"}', '{}', 'authenticated', 'authenticated'),
  (u_maja,    'maja.keller@test.mapa',        '$2a$10$placeholder', NOW(), NOW(), NOW(), '{"provider":"email"}', '{}', 'authenticated', 'authenticated'),
  (u_patrick, 'patrick.gruber@test.mapa',     '$2a$10$placeholder', NOW(), NOW(), NOW(), '{"provider":"email"}', '{}', 'authenticated', 'authenticated'),
  (u_elena,   'elena.voronova@test.mapa',     '$2a$10$placeholder', NOW(), NOW(), NOW(), '{"provider":"email"}', '{}', 'authenticated', 'authenticated'),
  (u_nils,    'nils.johannsen@test.mapa',     '$2a$10$placeholder', NOW(), NOW(), NOW(), '{"provider":"email"}', '{}', 'authenticated', 'authenticated'),
  (u_lotte,   'charlotte.meyer@test.mapa',    '$2a$10$placeholder', NOW(), NOW(), NOW(), '{"provider":"email"}', '{}', 'authenticated', 'authenticated'),
  (u_david,   'david.koller@test.mapa',       '$2a$10$placeholder', NOW(), NOW(), NOW(), '{"provider":"email"}', '{}', 'authenticated', 'authenticated'),
  (u_ingrid,  'ingrid.holm@test.mapa',        '$2a$10$placeholder', NOW(), NOW(), NOW(), '{"provider":"email"}', '{}', 'authenticated', 'authenticated'),
  (u_benja,   'benjamin.wolf@test.mapa',      '$2a$10$placeholder', NOW(), NOW(), NOW(), '{"provider":"email"}', '{}', 'authenticated', 'authenticated')
ON CONFLICT (id) DO NOTHING;

-- ─── 2. Profile ───────────────────────────────────────────────────────────────

INSERT INTO profiles (id, first_name, stadtteil, bio, is_local_host, can_help_with, looking_for, interests, joined_at)
VALUES
  (u_lena,    'Lena',       'Eppendorf',     'Mama von zwei Jungs (3 und 6). Ich kenne jeden Spielplatz zwischen Eppendorfer Baum und Mühlenkamp.',                          true,  ARRAY['Spielplatz-Tipps','Kita-Empfehlungen'], ARRAY['Krabbelgruppe'], ARRAY['Spielplätze & Treffen','Familiencafés'], NOW() - INTERVAL '90 days'),
  (u_markus,  'Markus',     'Winterhude',    'Papa in Elternzeit, früher Ingenieur. Auf der Suche nach anderen Vätern zum echten Austausch.',                                false, ARRAY['Fahrrad-Reparatur','Kochen'], ARRAY['Väter-Treffen'], ARRAY['Spielplätze & Treffen'], NOW() - INTERVAL '60 days'),
  (u_sarah,   'Sarah',      'Eimsbüttel',    'Freiberufliche Hebamme, Mutter einer Tochter (8 Monate). Viel Erfahrung rund ums erste Lebensjahr.',                         true,  ARRAY['Hebammen-Fragen','Stillen','Rückbildung'], ARRAY['Familiencafé-Tipp'], ARRAY['Babysitter & Hebammen','Familiencafés'], NOW() - INTERVAL '45 days'),
  (u_tom,     'Tom',        'Altona',         'Zwei Kinder (2 und 5), Hund, Lastenrad. Altona ist das schönste Viertel, das ist keine Meinung.',                           false, ARRAY['Altona-Tipps','Lastenrad'], ARRAY['Kinder-Sportgruppe'], ARRAY['Kurse & Sport','Spielplätze & Treffen'], NOW() - INTERVAL '30 days'),
  (u_nina,    'Nina',       'Sternschanze',  'Fotografin, Mutter von Lila (2,5). Schanze-Kind durch und durch.',                                                           false, ARRAY['Fotografie','Café-Tipps'], ARRAY['Krabbelgruppe','Spielgruppe'], ARRAY['Familiencafés','Events im Viertel'], NOW() - INTERVAL '20 days'),
  (u_jana,    'Jana',       'Barmbek',        'Dreifach-Mama (1, 4, 7). Ich organisiere gerne und weiß wo es was kostenlos gibt.',                                         false, ARRAY['Flohmärkte','Kita-Tipps'], ARRAY['Kinderfahrrad'], ARRAY['Flohmärkte & Tauschen','Lokale Empfehlungen'], NOW() - INTERVAL '15 days'),
  (u_anna,    'Anna',       'Ottensen',       'Schwedin in Hamburg seit 4 Jahren. Liebe Ottensen und lerne noch Deutsch.',                                                 false, ARRAY['Schwedisch','Backen'], ARRAY['Deutschkurs für Eltern'], ARRAY['Familiencafés','Kurse & Sport'], NOW() - INTERVAL '10 days'),
  (u_felix,   'Felix',      'Uhlenhorst',     'Stadtplaner beim Bezirksamt, Papa von Nils (4). Ich weiß welche Spielplätze neu gebaut werden und warum.',                  false, ARRAY['Stadtentwicklung','Fahrrad'], ARRAY['Spielgruppe Uhlenhorst'], ARRAY['Spielplätze & Treffen','Events im Viertel'], NOW() - INTERVAL '5 days'),
  (u_maria,   'Maria',      'Ottensen',       'Brasilianerin, seit 6 Jahren in Hamburg. Zwei Kinder (3 und 5), liebe das Viertel und den Spritzenplatz.',                  false, ARRAY['Portugiesisch','Brasilianisches Kochen'], ARRAY['Internationale Spielgruppe'], ARRAY['Familiencafés','Spielplätze & Treffen'], NOW() - INTERVAL '88 days'),
  (u_bjoern,  'Björn',      'Winterhude',     'Schwede, verheiratet, Vater von Oskar (6). Arbeite als Architekt. Fahre jeden Morgen mit dem Rad zur Alster.',              false, ARRAY['Renovierungstipps','Schwedisch'], ARRAY['Sportgruppe für Kinder'], ARRAY['Kurse & Sport','Spielplätze & Treffen'], NOW() - INTERVAL '77 days'),
  (u_katha,   'Katharina',  'Eppendorf',      'Ärztin in Elternzeit. Zwei Mädchen (2 und 5). Wohne in der Nähe des Isemarkt und bin dort fast jeden Dienstag.',           true,  ARRAY['Medizinische Fragen','Isemarkt-Tipps'], ARRAY['Kita-Platz Eppendorf'], ARRAY['Familiencafés','Lokale Empfehlungen'], NOW() - INTERVAL '65 days'),
  (u_devika,  'Devika',     'Eimsbüttel',     'Aus Kerala, seit 8 Jahren in Hamburg. Informatikerin, Mutter von Arjun (3). Spreche Englisch, Hindi und Deutsch.',         false, ARRAY['Tech-Fragen','Indisches Kochen'], ARRAY['Internationale Familie-Gruppe'], ARRAY['Kurse & Sport','Familiencafés'], NOW() - INTERVAL '55 days'),
  (u_jonas,   'Jonas',      'Altona',          'Erzieher und Vater von Fin (2). Kenne alle Kitas in Altona von innen.',                                                    false, ARRAY['Kita-Empfehlungen','Pädagogik-Fragen'], ARRAY['Väter-Gruppe'], ARRAY['Spielplätze & Treffen','Kurse & Sport'], NOW() - INTERVAL '42 days'),
  (u_sophie,  'Sophie',     'Hoheluft',        'Lehrerin, Mutter von Marie (4). Hoheluft ist unterschätzt. Der Isebek-Park ist unser zweites Zuhause.',                   false, ARRAY['Schulvorbereitung','Isebek-Tipps'], ARRAY['Spielgruppe Hoheluft'], ARRAY['Spielplätze & Treffen','Familiencafés'], NOW() - INTERVAL '38 days'),
  (u_ahmed,   'Ahmed',      'Barmbek',         'Ägyptischer Arzt, seit 5 Jahren in Hamburg. Vater von zwei Söhnen (3 und 6). Fahre gerne Fahrrad mit den Kindern.',       false, ARRAY['Arabisch','Medizinische Tipps'], ARRAY['Arabisch-Deutschkurs'], ARRAY['Spielplätze & Treffen','Kurse & Sport'], NOW() - INTERVAL '35 days'),
  (u_clara,   'Clara',      'Sternschanze',   'Freie Journalistin, Mutter von Emil (18 Monate). Schreibe über Stadtleben und Familie für das Abendblatt.',                 false, ARRAY['Schreiben','Stadtführungen'], ARRAY['Krabbelgruppe Schanze'], ARRAY['Events im Viertel','Familiencafés'], NOW() - INTERVAL '28 days'),
  (u_tobias,  'Tobias',     'Uhlenhorst',      'Mathematiker, Papa von Hanna (5). Nachhilfe gebe ich wenn Not am Mann ist. Bin auch Schachklub-Mitglied.',                false, ARRAY['Mathe-Nachhilfe','Schach'], ARRAY['Schachkurs für Kinder'], ARRAY['Kurse & Sport','Spielplätze & Treffen'], NOW() - INTERVAL '22 days'),
  (u_yuki,    'Yuki',       'HafenCity',       'Japanerin, verheiratet mit einem Hamburger. Tochter Hana (3). Die HafenCity ist toll für Familien, aber man muss wissen wo.',false,ARRAY['Japanisch','HafenCity-Tipps'], ARRAY['Internationale Spielgruppe'], ARRAY['Familiencafés','Events im Viertel'], NOW() - INTERVAL '19 days'),
  (u_petra,   'Petra',      'Eppendorf',       'Physiotherapeutin, Mutter von drei (8, 11, 14). Kenne das Viertel seit 20 Jahren und die guten und schlechten Veränderungen.',true, ARRAY['Physiotherapie','Eppendorf-Geschichte'], ARRAY['Elterncafé'], ARRAY['Lokale Empfehlungen','Familiencafés'], NOW() - INTERVAL '95 days'),
  (u_rafael,  'Rafael',     'Altona',           'Spanier, seit 10 Jahren in Hamburg. Koch, Vater von Pablo (4). Koche für jeden der Hunger hat.',                          false, ARRAY['Kochen','Spanisch'], ARRAY['Kochkurs für Kinder'], ARRAY['Familiencafés','Flohmärkte & Tauschen'], NOW() - INTERVAL '50 days'),
  (u_hannah,  'Hannah',     'Winterhude',       'Grafikdesignerin, Zwillinge (2,5). Jeden Tag ein kleines Wunder und jeden Abend totmüde.',                                false, ARRAY['Design-Tipps','Zwillings-Tipps'], ARRAY['Zwillings-Gruppe Hamburg'], ARRAY['Familiencafés','Spielplätze & Treffen'], NOW() - INTERVAL '44 days'),
  (u_stefan,  'Stefan',     'Eimsbüttel',       'Jurist, Papa von Leo (3) und Ida (6). Wohne im Grindelviertel. Kenne die besten Kinderärzte in Eimsbüttel.',              false, ARRAY['Rechtsfragen','Kinderarzt-Tipps'], ARRAY['Spielgruppe Grindel'], ARRAY['Spielplätze & Treffen','Lokale Empfehlungen'], NOW() - INTERVAL '40 days'),
  (u_laura,   'Laura',      'Ottensen',         'Chinesisch-Deutsche, zwei Kinder (2 und 7). Liebe den Wochenmarkt Spritzenplatz und die Elbe.',                           false, ARRAY['Chinesisch','Backen'], ARRAY['Bilinguale Spielgruppe'], ARRAY['Familiencafés','Spielplätze & Treffen'], NOW() - INTERVAL '33 days'),
  (u_micha,   'Michael',    'Barmbek',           'Mechaniker, Vater von Theo (5) und Ben (8). Repariere alles was kaputt geht, gerne auch für Nachbarn.',                  false, ARRAY['Reparaturen','Fahrrad-Tipps'], ARRAY['Fußball-Gruppe für Kinder'], ARRAY['Spielplätze & Treffen','Kurse & Sport'], NOW() - INTERVAL '29 days'),
  (u_franzi,  'Franziska',  'Hoheluft',          'Musikerin, Mutter von Clara (4). Gebe Klavierstunden. Hoheluft hat die besten Bäckereien der Stadt.',                   false, ARRAY['Musik','Bäckerei-Tipps'], ARRAY['Musikgruppe für Kinder'], ARRAY['Kurse & Sport','Familiencafés'], NOW() - INTERVAL '24 days'),
  (u_daniel,  'Daniel',     'Sternschanze',     'IT-Unternehmer, Vater von Luisa (3). Schanze seit 2015. Kenne jeden Kaffee und jeden Spielplatz.',                         false, ARRAY['Tech-Tipps','Schanzenviertel'], ARRAY['Papa-Runde Schanze'], ARRAY['Familiencafés','Events im Viertel'], NOW() - INTERVAL '18 days'),
  (u_natalia, 'Natalia',    'Eppendorf',         'Russin, seit 12 Jahren in Hamburg. Zwei Kinder (4 und 9). Übersetzerin. Kenne Hamburg wie meine eigene Heimat.',         false, ARRAY['Russisch','Übersetzungshilfe'], ARRAY['Russisch-Deutsche Spielgruppe'], ARRAY['Spielplätze & Treffen','Lokale Empfehlungen'], NOW() - INTERVAL '70 days'),
  (u_carsten, 'Carsten',    'Uhlenhorst',         'Lehrer an der Gesamtschule, Vater von Maja (6). Weiß alles über Schulanmeldungen und die Grundschulen in der Umgebung.',false, ARRAY['Schultipps','Schulanmeldung'], ARRAY['Hausaufgabengruppe'], ARRAY['Spielplätze & Treffen','Kurse & Sport'], NOW() - INTERVAL '58 days'),
  (u_isa,     'Isabelle',   'Altona',             'Französin, verheiratet, Mutter von Jules (5) und Zoé (2). Lebe seit 7 Jahren in Altona. Magnifique Viertel.',           false, ARRAY['Französisch','Französische Küche'], ARRAY['Bilinguale Gruppe Altona'], ARRAY['Familiencafés','Spielplätze & Treffen'], NOW() - INTERVAL '48 days'),
  (u_sven,    'Sven',       'Winterhude',         'Sportlehrer, Vater von Erik (7). Mache Lauftreffen am Stadtpark. Wer mitmachen will ist herzlich eingeladen.',          false, ARRAY['Sport','Lauftipps'], ARRAY['Sportgruppe für Kinder'], ARRAY['Kurse & Sport','Spielplätze & Treffen'], NOW() - INTERVAL '36 days'),
  (u_tanja,   'Tanja',      'Eimsbüttel',         'Selbstständige Texterin, Mutter von Ben (3). Kenne jeden Spielplatz in Eimsbüttel und Hoheluft.',                      false, ARRAY['Texten','Spielplatz-Tipps'], ARRAY['Krabbelgruppe'], ARRAY['Spielplätze & Treffen','Familiencafés'], NOW() - INTERVAL '26 days'),
  (u_philipp, 'Philipp',    'Barmbek',             'Arzt in der Asklepios Klinik, Vater von Sophie (4). Barmbek ist unterschätzt und günstig. Hier ist noch was los.',     false, ARRAY['Medizin-Tipps','Barmbek-Insidertipps'], ARRAY['Barmbek-Familienrunde'], ARRAY['Lokale Empfehlungen','Spielplätze & Treffen'], NOW() - INTERVAL '20 days'),
  (u_mia,     'Mia',        'Hoheluft',            'Grundschullehrerin, Mutter von Lotte (5) und Jakob (8). Hoheluft-Nord ist ein Geheimtipp.',                            false, ARRAY['Schulvorbereitung','Hoheluft-Tipps'], ARRAY['Elterncafé Hoheluft'], ARRAY['Familiencafés','Kurse & Sport'], NOW() - INTERVAL '16 days'),
  (u_kai,     'Kai',        'Ottensen',            'Selbstständiger Handwerker, Papa von Finn (4). Repariere, baue und renoviere. Ottensen ist mein Viertel seit 10 Jahren.',false,ARRAY['Handwerker-Tipps','Ottensen-Tipps'], ARRAY['Papa-Gruppe Ottensen'], ARRAY['Spielplätze & Treffen','Flohmärkte & Tauschen'], NOW() - INTERVAL '12 days'),
  (u_leila,   'Leila',      'Sternschanze',       'Iranerin, seit 9 Jahren in Hamburg. Ärztin in der Kinderklinik, Mutter von Sami (3). Schanze ist mein Zuhause.',        false, ARRAY['Pädiatrie-Tipps','Persisch'], ARRAY['Internationale Familie-Gruppe'], ARRAY['Familiencafés','Spielplätze & Treffen'], NOW() - INTERVAL '8 days'),
  (u_robert,  'Robert',     'Eppendorf',           'Unternehmer, Vater von Lukas (7). Eppendorf seit 15 Jahren. Kenne die Geschichte hinter jedem Gebäude.',              false, ARRAY['Unternehmertipps','Eppendorf-Geschichte'], ARRAY['Schulkind-Gruppe'], ARRAY['Lokale Empfehlungen','Events im Viertel'], NOW() - INTERVAL '82 days'),
  (u_vera,    'Vera',       'Uhlenhorst',          'Innenarchitektin, Mutter von Ida (5). Uhlenhorst ist still, gepflegt und die beste Seite der Alster.',                 false, ARRAY['Einrichtungstipps','Uhlenhorst-Tipps'], ARRAY['Spielgruppe Alsterufer'], ARRAY['Familiencafés','Spielplätze & Treffen'], NOW() - INTERVAL '62 days'),
  (u_marco,   'Marco',      'Altona',              'Italiener aus Neapel, 8 Jahre Hamburg. Zwei Söhne (2 und 4). Mache die beste Pizza im Viertel.',                       false, ARRAY['Italienisch','Kochen'], ARRAY['Internationale Papa-Gruppe'], ARRAY['Familiencafés','Spielplätze & Treffen'], NOW() - INTERVAL '46 days'),
  (u_lisa,    'Lisa',       'Winterhude',          'Ernährungsberaterin, Mutter von Mila (3). Koche und esse mit Leidenschaft. Der Wochenmarkt ist mein Büro.',            false, ARRAY['Ernährungstipps','Kochen','Markt-Tipps'], ARRAY['Kochkurs für Mütter'], ARRAY['Familiencafés','Lokale Empfehlungen'], NOW() - INTERVAL '39 days'),
  (u_thomas,  'Thomas',     'Eimsbüttel',          'Bauingenieur, Vater von Anton (6). Plane gerade eine Hausrenovierung. Eimsbüttel ist ideal für Familien.',             false, ARRAY['Bautipps','Handwerkerempfehlungen'], ARRAY['Papa-Runde Eimsbüttel'], ARRAY['Spielplätze & Treffen','Lokale Empfehlungen'], NOW() - INTERVAL '31 days'),
  (u_annika,  'Annika',     'Barmbek',             'Dänin, seit 4 Jahren in Hamburg. Ergotherapeutin und Mutter von Nora (3). Barmbek fühlt sich wie ein Dorf an.',        false, ARRAY['Ergotherapie','Dänisch'], ARRAY['Spielgruppe Barmbek-Nord'], ARRAY['Spielplätze & Treffen','Kurse & Sport'], NOW() - INTERVAL '23 days'),
  (u_sebast,  'Sebastian',  'Hoheluft',            'Restaurantbesitzer, Vater von Greta (4). Bringe meine Tochter jeden Morgen zum Spielplatz am Isebek-Kanal.',          false, ARRAY['Restaurantempfehlungen','Kochen'], ARRAY['Gastro-Papa-Runde'], ARRAY['Familiencafés','Events im Viertel'], NOW() - INTERVAL '14 days'),
  (u_maja,    'Maja',       'Ottensen',            'Sozialpädagogin, Mutter von Oskar (2) und Emma (5). Ottensen ist Heimat. Kenne jeden Verein im Viertel.',              false, ARRAY['Sozialpädagogik','Vereinstipps'], ARRAY['Mütter-Kaffee Ottensen'], ARRAY['Spielplätze & Treffen','Kurse & Sport'], NOW() - INTERVAL '9 days'),
  (u_patrick, 'Patrick',    'Sternschanze',       'Grafiker, Vater von Nino (3). Genieße die Schanze trotz Gentrifizierung. Kenne die versteckten Ecken.',                 false, ARRAY['Grafik','Geheimtipps Schanze'], ARRAY['Kreativgruppe für Kinder'], ARRAY['Events im Viertel','Familiencafés'], NOW() - INTERVAL '6 days'),
  (u_elena,   'Elena',      'Eppendorf',           'Ukrainerin, seit 2 Jahren in Hamburg. Mutter von Darija (4). Dankbar für die Aufnahme und die netten Nachbarn.',       false, ARRAY['Ukrainisch','Deutsch lernen'], ARRAY['Deutschkurs für Eltern'], ARRAY['Familiencafés','Spielplätze & Treffen'], NOW() - INTERVAL '4 days'),
  (u_nils,    'Nils',       'Uhlenhorst',          'Segler und Vater von Louis (5). Alster und Elbe sind mein Revier. Kenne jeden Weg am Wasser.',                         false, ARRAY['Segeln','Wassertipps'], ARRAY['Wassersport für Familien'], ARRAY['Spielplätze & Treffen','Kurse & Sport'], NOW() - INTERVAL '11 days'),
  (u_lotte,   'Charlotte',  'Altona',              'Kinderärztin in eigener Praxis am Altonaer Bahnhof. Mutter von Frieda (6). Altona ist mein Viertel.',                  true,  ARRAY['Kinderarzt-Fragen','Pädiatrie'], ARRAY['Spielgruppe Altona-Nord'], ARRAY['Lokale Empfehlungen','Familiencafés'], NOW() - INTERVAL '73 days'),
  (u_david,   'David',      'Winterhude',          'Israelischer Musiker, seit 6 Jahren in Hamburg. Sohn Ben (4). Gebe Gitarrenstunden für Kinder.',                       false, ARRAY['Musik','Hebräisch'], ARRAY['Musikgruppe für Kleinkinder'], ARRAY['Kurse & Sport','Familiencafés'], NOW() - INTERVAL '17 days'),
  (u_ingrid,  'Ingrid',     'Eimsbüttel',          'Norwegerin, Hebamme in Ruhestand. Mutter von erwachsenen Kindern, jetzt Großmutter von Luna (2). Ich teile gerne Erfahrung.',false,ARRAY['Hebammen-Erfahrung','Norwegen-Tipps'], ARRAY['Großeltern-Gruppe'], ARRAY['Babysitter & Hebammen','Familiencafés'], NOW() - INTERVAL '85 days'),
  (u_benja,   'Benjamin',   'Barmbek',             'Softwareentwickler, Papa von Luise (3). Barmbek-Nord ist günstiger und ruhiger. Kenne gute Spielplätze die kaum jemand kennt.',false,ARRAY['Tech-Tipps','Barmbek-Geheimtipps'], ARRAY['Krabbelgruppe Barmbek-Nord'], ARRAY['Spielplätze & Treffen','Lokale Empfehlungen'], NOW() - INTERVAL '3 days')
ON CONFLICT (id) DO NOTHING;

-- ─── 3. Posts ─────────────────────────────────────────────────────────────────

INSERT INTO posts (author_id, type, title, body, stadtteil, created_at)
VALUES

-- HEUTE
(u_lena, 'empfehlung', 'Spielplatz Dorotheenstraße frisch renoviert',
 'Der Spielplatz an der Dorotheenstraße / Ecke Curschmannstraße wurde renoviert. Neue Kletterwand, Sandkasten mit Wasserpumpe, Sonnenschutz. Für 2–8 Jahre ideal. Heute Morgen war es schön ruhig.',
 'Eppendorf', NOW() - INTERVAL '1 hour'),

(u_clara, 'frage', 'Kinderarzt in der Schanze der noch Patienten annimmt?',
 'Unsere Praxis Dr. Steinberg hört zum Sommer auf. Hat jemand eine Empfehlung für Eimsbüttel oder Sternschanze? Emil ist 18 Monate. Online-Termin wäre super.',
 'Sternschanze', NOW() - INTERVAL '2 hours'),

(u_sven, 'treffen', 'Lauftreffen Stadtpark Samstag 9 Uhr',
 'Ich mache jeden Samstag eine Runde um den Stadtpark, ca. 5 km. Kinderwagen kein Problem auf dem äußeren Weg. Wer will kommt einfach um 9 Uhr zum Eingang Jahnring.',
 'Winterhude', NOW() - INTERVAL '3 hours'),

(u_tanja, 'empfehlung', 'Café Backwahn Eimsbüttel — wirklich kinderfreundlich',
 'Das Backwahn in der Fruchtallee ist eines der wenigen Cafés wo Kinder wirklich willkommen sind. Wickelraum, Hochstühle, kein genervtes Schauen. Kuchen und Kaffee sehr gut. Mittwochs weniger voll.',
 'Eimsbüttel', NOW() - INTERVAL '4 hours'),

(u_jonas, 'frage', 'Kita-Erfahrungen DRK Altona-Nord?',
 'Wir haben einen Platz in der DRK-Kita Altona-Nord bekommen. Hat jemand Kinder dort? Ich würde gerne vorher mit Eltern sprechen die Erfahrung haben.',
 'Altona', NOW() - INTERVAL '5 hours'),

(u_hannah, 'treffen', 'Zwillings-Treffen Hudtwalckerstraße Sonntag',
 'Ich treffe mich Sonntag um 10:30 am Spielplatz Hudtwalckerstraße mit meinen Zwillingen (2,5 Jahre). Suche Kontakt zu anderen Zwillingsgeschwister-Familien. Alle willkommen.',
 'Winterhude', NOW() - INTERVAL '6 hours'),

(u_devika, 'empfehlung', 'Spielplatz Stellinger Weg — kaum bekannt, wunderschön',
 'Der Spielplatz am Stellinger Weg hinter dem Eimsbütteler Park wird kaum besucht obwohl er schön ist. Großes Klettergerüst, Bäume für Schatten, sauber. Kein Hundekot-Problem.',
 'Eimsbüttel', NOW() - INTERVAL '7 hours'),

(u_rafael, 'suche', 'Suche spanischsprachige Spielgruppe in Hamburg',
 'Mein Sohn Pablo (4) spricht Spanisch als Erstsprache. Suche eine Spielgruppe oder Kontakte wo er Spanisch sprechen kann. Altona, Ottensen, überall.',
 'Altona', NOW() - INTERVAL '8 hours'),

-- GESTERN
(u_katha, 'empfehlung', 'Isemarkt: die besten Stände für Familien',
 'Als Stammkundin nach 5 Jahren: Bäcker Gust am Anfang (links rein) hat die besten Brötchen. Der Gemüsestand in der Mitte verkauft günstig Bio. Dienstags sind die Schlangen kürzer als samstags.',
 'Eppendorf', NOW() - INTERVAL '1 day'),

(u_marco, 'treffen', 'Internationale Papa-Runde — nächste Woche Montag',
 'Ich schlage vor: Montag 10 Uhr Café Central (Ottenser Hauptstraße). Internationale Väter in Elternzeit oder mit flexiblen Zeiten. Kinder mitbringen, Kaffee trinken, Deutsch und was auch immer.',
 'Altona', NOW() - INTERVAL '1 day 2 hours'),

(u_sophie, 'empfehlung', 'Isebek-Park ist der unterschätzte Spielplatz Hamburgs',
 'Wenige wissen es aber der Spielplatz am Isebek-Kanal (Zugang Lehmweg) hat Wasserrinnen, Matschwand und Schaukeln. Nachmittags kommen viele Schulkinder aber morgens zwischen 9 und 11 ist es perfekt.',
 'Hoheluft', NOW() - INTERVAL '1 day 4 hours'),

(u_yuki, 'frage', 'Japanische Lebensmittel in Hamburg — wo kauft ihr?',
 'Ich suche Miso, Dashi und japanische Reisnudeln. Der Asia-Markt an der Moorweide hat nicht alles. Hat jemand einen guten Tipp? Gerne auch online.',
 'HafenCity', NOW() - INTERVAL '1 day 6 hours'),

(u_bjoern, 'treffen', 'Fahrradtour Alster mit Kindern — Sonntag',
 'Wer macht Sonntag mit? Wir fahren von Winterhude aus um die Außenalster, ca. 14 km, flach. Kindersitze und Anhänger kein Problem. Start 10 Uhr Stadthallenbrücke.',
 'Winterhude', NOW() - INTERVAL '1 day 8 hours'),

(u_petra, 'empfehlung', 'Kinderarzt Dr. Hennings Eppendorf — Update 2025',
 'Dr. Hennings nimmt noch neue Patienten an, aber nur wenn man frühmorgens um 8 anruft und flexibel ist. Telefonservice ist leider durchwachsen aber die Praxis selbst ist sehr gut.',
 'Eppendorf', NOW() - INTERVAL '1 day 10 hours'),

(u_annika, 'suche', 'Ergotherapeutin für Kind (3) gesucht',
 'Meine Tochter hat Feinmotorik-Schwierigkeiten. Suche eine Ergotherapeutin für Kinder in Barmbek oder Winterhude. Kassenpraxis wäre super, privat auch möglich.',
 'Barmbek', NOW() - INTERVAL '1 day 12 hours'),

-- VORGESTERN
(u_lisa, 'empfehlung', 'Wochenmarkt Mühlenkamp — Geheimtipp Mittwoch',
 'Der Mittwochsmarkt am Mühlenkamp (Winterhude) ist kleiner als der Isemarkt aber entspannter. Guter Käsestand, frischer Fisch, faire Preise. Mit Kinderwagen sehr gut machbar.',
 'Winterhude', NOW() - INTERVAL '2 days'),

(u_tobias, 'frage', 'Grundschule Uhlenhorst — Erfahrungen Schule Hasselbrook?',
 'Unser Sohn kommt nächstes Jahr in die Schule. Die Hasselbrook liegt günstig aber ich höre unterschiedliche Dinge. Hat jemand Kinder dort und kann berichten?',
 'Uhlenhorst', NOW() - INTERVAL '2 days 2 hours'),

(u_leila, 'empfehlung', 'Kindernotaufnahme UKE — Tipp für Notfälle',
 'Das UKE hat eine separate Kindernotaufnahme die deutlich schneller ist als die allgemeine. Eingang Martinistraße 52, rechts. Als Kinderärztin empfehle ich bei echten Notfällen direkt dort hinzugehen.',
 'Sternschanze', NOW() - INTERVAL '2 days 4 hours'),

(u_ingrid, 'empfehlung', 'Rückbildungsgymnastik — Kurse die wirklich gut sind',
 'Nach drei eigenen Kindern und 30 Jahren als Hebamme kenne ich viele Kurse. Das Familienzentrum Eimsbüttel (Methfesselstraße) hat die konstanteste Qualität. Anmeldung früh nötig.',
 'Eimsbüttel', NOW() - INTERVAL '2 days 6 hours'),

(u_david, 'veranstaltung', 'Kinderkonzert: Gitarre für kleine Ohren',
 'Ich gebe nächsten Samstag ein kleines Konzert für Kinder in meiner Wohnung. 6-8 Kinder von 3-8 Jahren, 45 Minuten, klassische Stücke und Kinderlieder. Kostenlos. Wer möchte meldet sich bis Donnerstag.',
 'Winterhude', NOW() - INTERVAL '2 days 8 hours'),

-- 3 TAGE
(u_carsten, 'empfehlung', 'Grundschulanmeldung Hamburg — so läuft es wirklich',
 'Als Lehrer kann ich sagen: Die Schulanmeldung ist im Januar/Februar. Man meldet beim Schulbezirk an, NICHT bei der Wunschschule direkt. Wer einen bestimmten Schulweg will sollte früh mit dem Schulamt sprechen.',
 'Uhlenhorst', NOW() - INTERVAL '3 days'),

(u_maria, 'treffen', 'Portugiesisch-Deutsches Spieltreffen Ottensen',
 'Ich treffe mich jeden zweiten Freitag um 10 Uhr im Spielpark Zeiseweg mit meinen Kindern. Wir sprechen Deutsch, Portugiesisch und Spanisch. Alle Nationalitäten herzlich willkommen.',
 'Ottensen', NOW() - INTERVAL '3 days 2 hours'),

(u_philipp, 'frage', 'Wer hat Erfahrung mit der Asklepios Kinderklinik Nord?',
 'Meine Tochter Sophie muss für eine kleine OP. Hat jemand Erfahrungen mit der Kinderklinik in Barmbek? Stationärer Aufenthalt für eine Nacht. Bin neugierig wie die Pflege ist.',
 'Barmbek', NOW() - INTERVAL '3 days 4 hours'),

(u_natalia, 'empfehlung', 'Russische Kinderbücher in Hamburg finden',
 'Für alle mit russischsprachigen Kindern: Die Buchhandlung Heymann (Eppendorfer Landstraße) bestellt russische Kinderbücher und hat manchmal welche vorrätig. Alternativ Bücherhalle Hamburg online vorbestellen.',
 'Eppendorf', NOW() - INTERVAL '3 days 6 hours'),

(u_stefan, 'suche', 'Suche Au-Pair oder Babysitter in Eimsbüttel',
 'Wir suchen eine zuverlässige Person die nachmittags (15-18 Uhr) auf Leo (3) aufpasst während ich arbeite. Erfahrung mit Kindern wichtig, Führerschein wäre toll. Gute Bezahlung.',
 'Eimsbüttel', NOW() - INTERVAL '3 days 8 hours'),

-- 4 TAGE
(u_vera, 'empfehlung', 'Spielplatz am Alsterufer Uhlenhorst — perfekt',
 'Der Spielplatz direkt am Alsterufer (zwischen Leinpfad und Schwanenwik) ist wunderschön aber wenig bekannt. Blick aufs Wasser, Schatten, sauber. Mittags ist es am ruhigsten.',
 'Uhlenhorst', NOW() - INTERVAL '4 days'),

(u_franzi, 'veranstaltung', 'Musikstunde für Kleinkinder ab 2 Jahren',
 'Ich biete samstags eine Musikstunde (45 Min) in meiner Wohnung in Hoheluft an. Singen, Rhythmus, einfache Instrumente. 4 Kinder pro Gruppe, 8 Euro pro Einheit. Interesse?',
 'Hoheluft', NOW() - INTERVAL '4 days 2 hours'),

(u_lotte, 'empfehlung', 'Kinderarzt-Tipp: Praxis Dr. Krüger Altona',
 'Als Kinderärztin sage ich: Kollegin Dr. Krüger in der Friedensallee nimmt noch neue Patienten. Gut erreichbar, nimmt alle Kassen, Online-Terminbuchung funktioniert. Bitte nicht alle gleichzeitig anrufen.',
 'Altona', NOW() - INTERVAL '4 days 4 hours'),

(u_kai, 'suche', 'Gebrauchtes Lastenrad zu kaufen gesucht',
 'Suche ein gebrauchtes Lastenrad (Bakfiets oder ähnlich) für zwei Kinder. Budget bis 1.500 Euro. Bin handwerklich begabt also kleinere Reparaturen mache ich selbst. Bitte melden.',
 'Ottensen', NOW() - INTERVAL '4 days 6 hours'),

(u_mia, 'empfehlung', 'Bäckerei Björn in Hoheluft — die unterschätzte Institution',
 'Nicht die bekannte Björn-Kette sondern die kleine Familienbäckerei Björn in der Löwenstraße. Die besten Rosinenbrötchen der Stadt und ein Spielbereich für Kinder. Samstags früh aufstehen lohnt sich.',
 'Hoheluft', NOW() - INTERVAL '4 days 8 hours'),

-- 5 TAGE
(u_ahmed, 'treffen', 'Arabisch-Deutsch Spielgruppe Barmbek',
 'Ich möchte eine kleine Spielgruppe für arabischsprachige Familien mit deutschen Familien organisieren. Jeden Donnerstag, Spielplatz Tarpenbekstraße, 10 Uhr. Erstes Treffen nächste Woche.',
 'Barmbek', NOW() - INTERVAL '5 days'),

(u_isa, 'empfehlung', 'Französische Boulangerie Ottensen — ja, gibt es wirklich',
 'Die kleine Bäckerei in der Ottenser Hauptstraße 50 (neben dem türkischen Gemüseladen) macht echtes Baguette und Croissants. Die Besitzerin ist nicht französisch aber das Handwerk stimmt.',
 'Ottensen', NOW() - INTERVAL '5 days 2 hours'),

(u_benja, 'empfehlung', 'Spielplatz Bramfelder Chaussee — kaum jemand kennt ihn',
 'Hinter dem Baumarkt an der Bramfelder Chaussee gibt es einen großen Spielplatz der von Barmbek-Nord-Familien kaum frequentiert wird. Große Wiese, Hügel, Kletterturm. Ideal für 4-10 Jahre.',
 'Barmbek', NOW() - INTERVAL '5 days 4 hours'),

(u_elena, 'frage', 'Deutschkurs mit Kinderbetreuung in Eppendorf?',
 'Ich suche einen Integrationskurs oder Deutschkurs der parallel Kinderbetreuung anbietet. Meine Tochter Darija ist 4. Kennt jemand eine Einrichtung in Eppendorf oder Winterhude?',
 'Eppendorf', NOW() - INTERVAL '5 days 6 hours'),

(u_patrick, 'veranstaltung', 'Schanzenfest nächstes Wochenende — mit Kindern?',
 'Das Schanzenfest ist am nächsten Wochenende. Hat jemand Erfahrung wie kinderfreundlich das ist? Mein Sohn Nino (3) liebt Musik und Menschen aber die Menschenmengen abends können schwierig sein.',
 'Sternschanze', NOW() - INTERVAL '5 days 8 hours'),

-- 6 TAGE
(u_robert, 'empfehlung', 'Bücherhalle Eppendorf — die beste für Kinder',
 'Die Bücherhalle in der Eppendorfer Landstraße hat die beste Kinderbuchabteilung der Stadtbüchereien. Jeden Mittwoch Vorlesestunde um 15 Uhr, kostenlos, 3-6 Jahre. Mein Sohn geht seit 4 Jahren dorthin.',
 'Eppendorf', NOW() - INTERVAL '6 days'),

(u_thomas, 'suche', 'Handwerker-Empfehlung für Kinderzimmer-Renovierung',
 'Wir wollen das Kinderzimmer renovieren und suchen einen zuverlässigen Maler/Verputzer in Eimsbüttel. Hat jemand eine Empfehlung aus eigener Erfahrung? Kleinbetrieb bevorzugt.',
 'Eimsbüttel', NOW() - INTERVAL '6 days 2 hours'),

(u_maja, 'empfehlung', 'Zeiseweg Spielplatz Ottensen — absolutes Muss',
 'Der Spielplatz am Zeiseweg ist einer der schönsten in Altona. Viel Holz, naturnahe Gestaltung, Bach zum Matschen. Nachmittags voll aber morgens zwischen 9-11 wunderbar ruhig.',
 'Ottensen', NOW() - INTERVAL '6 days 4 hours'),

(u_nils, 'veranstaltung', 'Kleine Segelbootfahrt auf der Außenalster mit Kindern',
 'Nächsten Samstag fahre ich mit meinem Segelboot (6 Personen) über die Außenalster. Platz für 2-3 Familien mit Kindern ab 5 Jahren. Keine Kosten, Rettungswesten vorhanden. Wer möchte meldet sich.',
 'Uhlenhorst', NOW() - INTERVAL '6 days 6 hours'),

(u_sebast, 'empfehlung', 'Geheimtipp Restaurant: Kinderfreundlich und gut',
 'Mein Restaurant (Hoheluft, Lehmweg 30) bietet mittwochs und donnerstags einen Familienmittag an. Kinderteller 6 Euro, Kinderspielecke, kein Stress für Eltern. Ich sage das nicht weil es meins ist sondern weil es stimmt.',
 'Hoheluft', NOW() - INTERVAL '6 days 8 hours'),

-- 7 TAGE
(u_ingrid, 'empfehlung', 'Hebammen-Praxis Methfesselstraße Eimsbüttel',
 'Nach 30 Jahren als Hebamme kenne ich viele Kolleginnen. Die Praxis an der Methfesselstraße hat mehrere Hebammen und ist gut organisiert. Für Eimsbüttel und Hoheluft ist das meine erste Empfehlung.',
 'Eimsbüttel', NOW() - INTERVAL '7 days'),

(u_laura, 'treffen', 'Chinesisch-Deutsche Spielgruppe Ottensen',
 'Ich organisiere jeden zweiten Donnerstag eine Spielgruppe für Kinder aus chinesischsprachigen Familien und deutschsprachige Familien die Interesse an China haben. Spritzenplatz, 10 Uhr.',
 'Ottensen', NOW() - INTERVAL '7 days 2 hours'),

(u_micha, 'suche', 'Suche Fußball-Trainingsgruppe für 5-Jährigen',
 'Mein Sohn Theo will Fußball spielen. Er ist 5. Suche eine altersgerechte Gruppe in Barmbek. Verein oder informell, beides gut. Hat jemand eine Empfehlung?',
 'Barmbek', NOW() - INTERVAL '7 days 4 hours'),

(u_daniel, 'empfehlung', 'Café Onkel Otto in der Schanze — mein Favorit',
 'Klein, laut, herzlich. Das Onkel Otto in der Bartelsstraße lässt Kinder sein wie sie sind. Manchmal muss man warten aber es lohnt sich. Frühstück am Samstag ist der Hammer. Hochstühle vorhanden.',
 'Sternschanze', NOW() - INTERVAL '7 days 6 hours');

-- ─── 4. Kommentare ────────────────────────────────────────────────────────────

INSERT INTO comments (post_id, author_id, body, created_at)
SELECT p.id, u_katha,
  'Danke! Wir waren heute Nachmittag dort. Der Spielplatz ist wirklich toll geworden. Meine Tochter (5) wollte nicht mehr weg.',
  NOW() - INTERVAL '30 minutes'
FROM posts p WHERE p.title LIKE '%Dorotheenstraße%' LIMIT 1;

INSERT INTO comments (post_id, author_id, body, created_at)
SELECT p.id, u_petra,
  'Kenne ich, war einer der schönsten Spielplätze schon vor der Renovierung. Gut dass die Stadt da investiert.',
  NOW() - INTERVAL '20 minutes'
FROM posts p WHERE p.title LIKE '%Dorotheenstraße%' LIMIT 1;

INSERT INTO comments (post_id, author_id, body, created_at)
SELECT p.id, u_lena,
  'Dr. Kaufmann in der Eppendorfer Landstraße 45 nimmt noch Patienten. Gut für Kleinkinder.',
  NOW() - INTERVAL '1 hour 30 minutes'
FROM posts p WHERE p.title LIKE '%Kinderarzt in der Schanze%' LIMIT 1;

INSERT INTO comments (post_id, author_id, body, created_at)
SELECT p.id, u_leila,
  'Ich kenne Dr. Bergmann in Eimsbüttel (Methfesselstraße). Kassenpraxis, Englisch sprechen sie auch.',
  NOW() - INTERVAL '45 minutes'
FROM posts p WHERE p.title LIKE '%Kinderarzt in der Schanze%' LIMIT 1;

INSERT INTO comments (post_id, author_id, body, created_at)
SELECT p.id, u_markus,
  'Ich komme Samstag mit! Fahre schon länger nicht mehr raus. Kinderwagen haben wir gerade keinen aber Fahrradanhänger.',
  NOW() - INTERVAL '2 hours'
FROM posts p WHERE p.title LIKE '%Lauftreffen Stadtpark%' LIMIT 1;

INSERT INTO comments (post_id, author_id, body, created_at)
SELECT p.id, u_bjoern,
  'Super Initiative. Ich bring Oskar im Anhänger mit. Fährt er dann mit oder wartet er auf dich?',
  NOW() - INTERVAL '1 hour 20 minutes'
FROM posts p WHERE p.title LIKE '%Lauftreffen Stadtpark%' LIMIT 1;

INSERT INTO comments (post_id, author_id, body, created_at)
SELECT p.id, u_sarah,
  'Backwahn kenne ich gut! Mittwochs ist wirklich ruhiger. Das Laugengebäck ist übrigens frisch ab 9 Uhr.',
  NOW() - INTERVAL '3 hours 10 minutes'
FROM posts p WHERE p.title LIKE '%Café Backwahn%' LIMIT 1;

INSERT INTO comments (post_id, author_id, body, created_at)
SELECT p.id, u_tanja,
  'Danke für den Tipp mit Mittwoch. Wir waren immer samstags dort und hatten keine Lust mehr weil zu voll.',
  NOW() - INTERVAL '2 hours 30 minutes'
FROM posts p WHERE p.title LIKE '%Café Backwahn%' LIMIT 1;

INSERT INTO comments (post_id, author_id, body, created_at)
SELECT p.id, u_jonas,
  'Wir haben in der DRK Altona-Nord begonnen. Insgesamt gut aber das Außengelände ist klein. Die Erzieherinnen sind sehr engagiert.',
  NOW() - INTERVAL '4 hours 20 minutes'
FROM posts p WHERE p.title LIKE '%DRK Altona-Nord%' LIMIT 1;

INSERT INTO comments (post_id, author_id, body, created_at)
SELECT p.id, u_lotte,
  'Ich kenne die Einrichtung von Elternseite. Leiterin ist sehr offen für Gespräche. Einfach persönlich vorbeigehen.',
  NOW() - INTERVAL '3 hours 50 minutes'
FROM posts p WHERE p.title LIKE '%DRK Altona-Nord%' LIMIT 1;

INSERT INTO comments (post_id, author_id, body, created_at)
SELECT p.id, u_lisa,
  'Mühlenkamp Mittwoch ist tatsächlich ein Geheimtipp. Der Fischstand von Frau Hansen ist auch sehr gut.',
  NOW() - INTERVAL '1 day 30 minutes'
FROM posts p WHERE p.title LIKE '%Mühlenkamp%' LIMIT 1;

INSERT INTO comments (post_id, author_id, body, created_at)
SELECT p.id, u_hannah,
  'Den Wochenmarkt kenne ich nicht. Wie kommt man dorthin mit Kinderwagen in der U-Bahn?',
  NOW() - INTERVAL '1 day 20 minutes'
FROM posts p WHERE p.title LIKE '%Mühlenkamp%' LIMIT 1;

INSERT INTO comments (post_id, author_id, body, created_at)
SELECT p.id, u_felix,
  'Die Schule Hasselbrook hat sich in den letzten Jahren stark verbessert. Neue Leitung seit 2022. Ich kenne das Schulamt und kann bestätigen dass die Beschwerden abgenommen haben.',
  NOW() - INTERVAL '2 days 1 hour'
FROM posts p WHERE p.title LIKE '%Schule Hasselbrook%' LIMIT 1;

INSERT INTO comments (post_id, author_id, body, created_at)
SELECT p.id, u_carsten,
  'Als Lehrer sage ich: Schau dir die Schule an einem normalen Tag an, nicht beim Tag der offenen Tür. Das zeigt mehr.',
  NOW() - INTERVAL '2 days 30 minutes'
FROM posts p WHERE p.title LIKE '%Schule Hasselbrook%' LIMIT 1;

INSERT INTO comments (post_id, author_id, body, created_at)
SELECT p.id, u_sarah,
  'Das Familienzentrum Methfesselstraße ist wirklich gut. Ich kenne die Kursleiterinnen persönlich.',
  NOW() - INTERVAL '2 days 5 hours'
FROM posts p WHERE p.title LIKE '%Rückbildungsgymnastik%' LIMIT 1;

INSERT INTO comments (post_id, author_id, body, created_at)
SELECT p.id, u_devika,
  'Der Isebek-Park ist wirklich traumhaft. Wir kommen aus Eimsbüttel rüber extra dafür.',
  NOW() - INTERVAL '1 day 5 hours'
FROM posts p WHERE p.title LIKE '%Isebek-Park%' LIMIT 1;

INSERT INTO comments (post_id, author_id, body, created_at)
SELECT p.id, u_mia,
  'Isebek ist mein täglicher Nachmittagsplatz. Die Matschwand macht Kinder glücklich und Wäsche kaputt.',
  NOW() - INTERVAL '1 day 3 hours'
FROM posts p WHERE p.title LIKE '%Isebek-Park%' LIMIT 1;

INSERT INTO comments (post_id, author_id, body, created_at)
SELECT p.id, u_yuki,
  'Asia Markt am Steindamm hat das Beste Sortiment, U-Bahn Hauptbahnhof. Etwas weit aber gut.',
  NOW() - INTERVAL '1 day 7 hours'
FROM posts p WHERE p.title LIKE '%Japanische Lebensmittel%' LIMIT 1;

INSERT INTO comments (post_id, author_id, body, created_at)
SELECT p.id, u_laura,
  'Es gibt auch einen kleinen japanisch-chinesischen Laden in Ottensen, Bahrenfelder Straße 73. Kleineres Sortiment aber nah.',
  NOW() - INTERVAL '1 day 6 hours'
FROM posts p WHERE p.title LIKE '%Japanische Lebensmittel%' LIMIT 1;

INSERT INTO comments (post_id, author_id, body, created_at)
SELECT p.id, u_vera,
  'Ich kenne Dr. Krüger seit Jahren. Sehr empfehlenswert, geduldig mit Kindern, erklärt alles gut.',
  NOW() - INTERVAL '4 days 2 hours'
FROM posts p WHERE p.title LIKE '%Dr. Krüger Altona%' LIMIT 1;

INSERT INTO comments (post_id, author_id, body, created_at)
SELECT p.id, u_tom,
  'Endlich mal ein Kinderarzt-Tipp von einem der es wissen muss. Danke Charlotte!',
  NOW() - INTERVAL '4 days 1 hour'
FROM posts p WHERE p.title LIKE '%Dr. Krüger Altona%' LIMIT 1;

INSERT INTO comments (post_id, author_id, body, created_at)
SELECT p.id, u_kai,
  'Für Lastenrad kann ich auch einen privaten Verkauf empfehlen: Nachbarschaftsladen Ottensen hat immer wieder welche. Und die Lastenrad-Initiative Hamburg vermietet auch erstmal zum Testen.',
  NOW() - INTERVAL '4 days 5 hours'
FROM posts p WHERE p.title LIKE '%Lastenrad%' LIMIT 1;

INSERT INTO comments (post_id, author_id, body, created_at)
SELECT p.id, u_robert,
  'Bücherhalle ist ein absolutes Muss. Mein Sohn war 4 Jahre lang jeden Mittwoch dort. Heute liest er alles was er kriegen kann.',
  NOW() - INTERVAL '6 days 2 hours'
FROM posts p WHERE p.title LIKE '%Bücherhalle Eppendorf%' LIMIT 1;

INSERT INTO comments (post_id, author_id, body, created_at)
SELECT p.id, u_natalia,
  'Ich bestätige das. Die Bücherhalle hat auch russische Bücher und die Bibliothekarin spricht Russisch.',
  NOW() - INTERVAL '6 days 1 hour'
FROM posts p WHERE p.title LIKE '%Bücherhalle Eppendorf%' LIMIT 1;

INSERT INTO comments (post_id, author_id, body, created_at)
SELECT p.id, u_maja,
  'Zeiseweg ist unser Lieblingsplatz. Bach-Matschen ist jeden Sommer ein Muss.',
  NOW() - INTERVAL '6 days 5 hours'
FROM posts p WHERE p.title LIKE '%Zeiseweg Spielplatz%' LIMIT 1;

INSERT INTO comments (post_id, author_id, body, created_at)
SELECT p.id, u_isa,
  'Wunderbar! Wir kommen auch manchmal von Altona rüber. Stimme zu dass der Morgen am besten ist.',
  NOW() - INTERVAL '6 days 4 hours'
FROM posts p WHERE p.title LIKE '%Zeiseweg Spielplatz%' LIMIT 1;

END $$;
