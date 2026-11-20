// =========================================================
// NĚMČINA (DE) – Fráze, šablony vět a 300 nejpoužívanějších slovíček
// Čistě český fonetický přepis bez IPA znaků + gramatické tipy.
// =========================================================

export const DE_PHRASES = [
  // 1. Běžná konverzace (6)
  { id: 'de-gen-1', topic: 'general', cz: 'Dobrý den, jak se máte?', en: 'Guten Tag, wie geht es Ihnen?', phonetic: '[gútn ták, ví gét es ínen?]', tip: '„Ihnen“ (Vám) je zdvořilé vykání. V neformální řeči se říká „Wie geht es dir?“.' },
  { id: 'de-gen-2', topic: 'general', cz: 'Nemluvím moc dobře německy.', en: 'Ich spreche nicht sehr gut Deutsch.', phonetic: '[ich špreche nicht zér gút dojč.]', tip: 'V německé oznamovací větě stojí sloveso (spreche) vždy na 2. místě.' },
  { id: 'de-gen-3', topic: 'general', cz: 'Můžete to prosím zopakovat pomaleji?', en: 'Können Sie das bitte langsamer wiederholen?', phonetic: '[kenen zí das bite langzámer vídrhoulen?]', tip: 'U modálního slovesa „können“ (moci) stojí hlavní sloveso „wiederholen“ až na samém konci věty!' },
  { id: 'de-gen-4', topic: 'general', cz: 'Mluvíte anglicky?', en: 'Sprechen Sie Englisch?', phonetic: '[šprechen zí engliš?]', tip: 'Otázku bez tázacího slova tvoří němčina jednoduše prohozením: Sloveso (Sprechen) + Sie.' },
  { id: 'de-gen-5', topic: 'general', cz: 'Moc děkuji za vaši pomoc.', en: 'Vielen Dank für Ihre Hilfe.', phonetic: '[fílen dank fýr íre hilfe.]', tip: '„Vielen Dank“ znamená „mnohokrát děkuji“ a hodí se do každé situace.' },
  { id: 'de-gen-6', topic: 'general', cz: 'Nerozumím tomu slovu.', en: 'Ich verstehe dieses Wort nicht.', phonetic: '[ich ferštéhe dízes vort nicht.]', tip: 'Záporka „nicht“ u konkrétního předmětu stojí až na konci věty.' },

  // 2. Kempování a cestování autem (6)
  { id: 'de-camp-1', topic: 'camping', cz: 'Máte volné místo pro obytné auto s elektřinou?', en: 'Haben Sie einen Stellplatz mit Strom frei?', phonetic: '[hábn zí ajnen štelplac mit štróm fraj?]', tip: '„Stellplatz“ je německý výraz pro parcelu v kempu (pro karavan/obytné auto). „Strom“ = elektřina.' },
  { id: 'de-camp-2', topic: 'camping', cz: 'Kde můžeme vypustit odpadní vodu?', en: 'Wo können wir das Grauwasser ablassen?', phonetic: '[vó kenen vír das grauvásr aplasn?]', tip: '„Grauwasser“ je šedá odpadní voda. Sloveso „ablassen“ (vypustit) stojí za „können“ až na konci.' },
  { id: 'de-camp-3', topic: 'camping', cz: 'Je tady pitná voda k doplnění nádrže?', en: 'Gibt es hier Trinkwasser zum Auffüllen?', phonetic: '[gipt es hír trinkvásr cum auffylen?]', tip: '„Gibt es…?“ znamená „Je tady…? / Existuje…?“. Velmi častá německá vazba.' },
  { id: 'de-camp-4', topic: 'camping', cz: 'Zůstáváme dvě noci se stanem.', en: 'Wir bleiben zwei Nächte mit einem Zelt.', phonetic: '[vír blajbn cvaj nechte mit ajnem celt.]', tip: 'Po předložce „mit“ (s) se používá 3. pád: „ein Zelt“ → „mit einem Zelt“.' },
  { id: 'de-camp-5', topic: 'camping', cz: 'Kde jsou sprchy a toalety?', en: 'Wo sind die Duschen und Toiletten?', phonetic: '[vó zint dí dúšn unt toalétn?]', tip: 'V množném čísle je určitý člen vždy „die“ (die Duschen = sprchy).' },
  { id: 'de-camp-6', topic: 'camping', cz: 'Potřebujeme plnou nádrž nafty.', en: 'Wir brauchen einen vollen Tank Diesel.', phonetic: '[vír brauhen ajnen folen tank dízl.]', tip: '„Wir brauchen“ = potřebujeme. V němčině se všechna podstatná jména píší s velkým počátečním písmenem!' },

  // 3. Restaurace a jídlo (6)
  { id: 'de-rest-1', topic: 'restaurant', cz: 'Chtěli bychom stůl pro dva venku.', en: 'Wir hätten gern einen Tisch für zwei draußen.', phonetic: '[vír hetn gern ajnen tiš fýr cvaj drausn.]', tip: '„Wir hätten gern…“ (Rádi bychom měli…) je nejzdvořilejší fráze v německých a rakouských restauracích.' },
  { id: 'de-rest-2', topic: 'restaurant', cz: 'Můžeme dostat jídelní lístek, prosím?', en: 'Könnten wir bitte die Speisekarte haben?', phonetic: '[kentn vír bite dí špajzekárte hábn?]', tip: '„Speisekarte“ znamená jídelní lístek (často se zkracuje jen na „die Karte“).' },
  { id: 'de-rest-3', topic: 'restaurant', cz: 'Dal bych si perlivou vodu a kávu.', en: 'Ich möchte ein Sprudelwasser und einen Kaffee.', phonetic: '[ich mechte ajn šprúdlvásr unt ajnen kafe.]', tip: '„Ich möchte…“ (Chtěl bych…) je univerzální zdvořilý způsob objednávání.' },
  { id: 'de-rest-4', topic: 'restaurant', cz: 'Účet, prosím. Platíme kartou.', en: 'Die Rechnung, bitte. Wir zahlen mit Karte.', phonetic: '[dí rechnung, bite. vír cálen mit kárte.]', tip: 'Často stačí i krátké „Zahlen, bitte!“ (Platit, prosím!).' },
  { id: 'de-rest-5', topic: 'restaurant', cz: 'Jsem alergický na ořechy.', en: 'Ich bin allergisch gegen Nüsse.', phonetic: '[ich bin alergiš gégn nyse.]', tip: 'V němčině se po „allergisch“ používá předložka „gegen“ (proti).' },
  { id: 'de-rest-6', topic: 'restaurant', cz: 'Co byste nám doporučil?', en: 'Was können Sie uns empfehlen?', phonetic: '[vas kenen zí uns empfélen?]', tip: '„Uns“ znamená „nám“, a sloveso „empfehlen“ (doporučit) jde na konec věty.' },

  // 4. Nákupy (6)
  { id: 'de-shop-1', topic: 'shopping', cz: 'Kolik tohle stojí?', en: 'Wie viel kostet das?', phonetic: '[ví fíl kostet das?]', tip: '„Wie viel“ = kolik. Krátká a naprosto nepostradatelná fráze do každého obchodu.' },
  { id: 'de-shop-2', topic: 'shopping', cz: 'Máte to ve větší velikosti?', en: 'Haben Sie das eine Nummer größer?', phonetic: '[hábn zí das ajne numr grésr?]', tip: 'Doslova „o jedno číslo větší“. Menší velikost by byla „eine Nummer kleiner“.' },
  { id: 'de-shop-3', topic: 'shopping', cz: 'Jen se dívám, děkuji.', en: 'Ich schaue mich nur um, danke.', phonetic: '[ich šaue mich núr um, danke.]', tip: '„Sich umschauen“ je odlučitelné sloveso — předpona „um“ se odtrhne a jde až na konec věty!' },
  { id: 'de-shop-4', topic: 'shopping', cz: 'Berete platební karty nebo jen hotovost?', en: 'Nehmen Sie Karte oder nur Bargeld?', phonetic: '[némen zí kárte ódr núr bárgelt?]', tip: 'V Německu a Rakousku jsou místa, kde berou jen „Bargeld“ (hotovost), vyplatí se zeptat předem.' },
  { id: 'de-shop-5', topic: 'shopping', cz: 'Můžu dostat účtenku a tašku?', en: 'Kann ich bitte den Kassenbon und eine Tüte haben?', phonetic: '[kan ich bite dén kasnbon unt ajne týte hábn?]', tip: '„Kassenbon“ nebo „Quittung“ = účtenka, „Tüte“ (v Rakousku „Sackerl“) = taška.' },
  { id: 'de-shop-6', topic: 'shopping', cz: 'Kde je nejbližší supermarket?', en: 'Wo ist der nächste Supermarkt?', phonetic: '[vó ist dér néchste zúprmárkt?]', tip: '„Der nächste“ znamená jak „další“, tak „nejbližší“.' },

  // 5. Letiště a navigace (6)
  { id: 'de-air-1', topic: 'airport', cz: 'Kde je odbavení pro tento let?', en: 'Wo ist der Check-in für diesen Flug?', phonetic: '[vó ist dér ček-in fýr dízn flúk?]', tip: 'Po předložce „für“ (pro) je 4. pád: „dieser Flug“ → „für diesen Flug“.' },
  { id: 'de-air-2', topic: 'airport', cz: 'Kudy se jde k nástupní bráně pět?', en: 'Wie komme ich zum Gate fünf?', phonetic: '[ví kome ich cum gejt fynf?]', tip: '„Wie komme ich zu…?“ (Jak se dostanu k…?) je nejlepší německá navigační věta.' },
  { id: 'de-air-3', topic: 'airport', cz: 'Jede tenhle autobus do centra?', en: 'Fährt dieser Bus ins Zentrum?', phonetic: '[fért dízr bus ins centrum?]', tip: '„Ins“ je zkrácenina pro „in das“ (do centra).' },
  { id: 'de-air-4', topic: 'airport', cz: 'Můžete mi to ukázat na mapě?', en: 'Können Sie mir das auf der Karte zeigen?', phonetic: '[kenen zí mír das auf dér kárte cajgn?]', tip: '„Auf der Karte“ = na mapě. Sloveso „zeigen“ (ukázat) stojí na konci.' },
  { id: 'de-air-5', topic: 'airport', cz: 'Kdy jede další vlak?', en: 'Wann fährt der nächste Zug ab?', phonetic: '[van fért dér néchste cúk ap?]', tip: '„Abfahren“ (odjíždět) je odlučitelné sloveso, proto „ab“ putuje na konec otázky.' },
  { id: 'de-air-6', topic: 'airport', cz: 'Potřebuji zpáteční jízdenku.', en: 'Ich brauche eine Fahrkarte hin und zurück.', phonetic: '[ich brauhe ajne fárkárte hin unt curyk.]', tip: '„Hin und zurück“ znamená doslova „tam a zpět“ (zpáteční).' },

  // 6. Řešení problémů (6)
  { id: 'de-prob-1', topic: 'problems', cz: 'Promiňte, tohle nefunguje.', en: 'Entschuldigung, das funktioniert nicht.', phonetic: '[entšuldigung, das funkcionírt nicht.]', tip: '„Entschuldigung“ se používá jak pro oslovení (Promiňte), tak pro omluvu.' },
  { id: 'de-prob-2', topic: 'problems', cz: 'Píchli jsme pneumatiku, potřebujeme pomoc.', en: 'Wir haben eine Reifenpanne und brauchen Hilfe.', phonetic: '[vír hábn ajne rajfnpane unt brauhen hilfe.]', tip: '„Reifenpanne“ je přesný německý výraz pro defekt/píchlé kolo.' },
  { id: 'de-prob-3', topic: 'problems', cz: 'Ztratil jsem kufr.', en: 'Ich habe meinen Koffer verloren.', phonetic: '[ich hábe majnen kofr ferlóren.]', tip: 'Minulý čas v mluvené němčině se tvoří pomocí „haben“ + příčestí na konci (verloren = ztratil).' },
  { id: 'de-prob-4', topic: 'problems', cz: 'Můžete mi prosím napsat adresu?', en: 'Können Sie mir bitte die Adresse aufschreiben?', phonetic: '[kenen zí mír bite dí adrese aufšrajbn?]', tip: '„Aufschreiben“ = zapsat. Díky „können“ zůstává pohromadě na konci věty.' },
  { id: 'de-prob-5', topic: 'problems', cz: 'Potřebuji lékárnu, mám horečku.', en: 'Ich brauche eine Apotheke, ich habe Fieber.', phonetic: '[ich brauhe ajne apotéke, ich hábe fíbr.]', tip: '„Apotheke“ je lékárna, „Fieber“ = horečka.' },
  { id: 'de-prob-6', topic: 'problems', cz: 'Můžeme dostat tišší pokoj?', en: 'Könnten wir ein ruhigeres Zimmer bekommen?', phonetic: '[kentn vír ajn rúigeres cimr bekomen?]', tip: '„Ruhig“ (tichý) → „ruhigeres Zimmer“ (tišší pokoj).' }
];

export const DE_TEMPLATES = [
  {
    id: 'de-tpl-1', topic: 'general',
    tip: '„Ich möchte…“ (Chtěl bych…) posouvá druhé sloveso v infinitivu vždy až na konec věty.',
    parts: [
      { type: 'text', en: 'Ich möchte ', cz: 'Chtěl bych ', phonetic: 'ich mechte ' },
      { type: 'slot', options: [
        { en: 'das kaufen', cz: 'tohle koupit', phonetic: 'das kaufn' },
        { en: 'hier bleiben', cz: 'zůstat tady', phonetic: 'hír blajbn' },
        { en: 'Deutsch lernen', cz: 'učit se německy', phonetic: 'dojč lernen' }
      ]},
      { type: 'text', en: '.', cz: '.', phonetic: '.' }
    ]
  },
  {
    id: 'de-tpl-2', topic: 'general',
    tip: '„Können Sie mir…?“ znamená „Můžete mi…?“. Zdvořilé vykání používá vždy „Sie“ s velkým S.',
    parts: [
      { type: 'text', en: 'Können Sie mir ', cz: 'Můžete mi ', phonetic: 'kenen zí mír ' },
      { type: 'slot', options: [
        { en: 'helfen', cz: 'pomoci', phonetic: 'helfn' },
        { en: 'das zeigen', cz: 'to ukázat', phonetic: 'das cajgn' },
        { en: 'das erklären', cz: 'to vysvětlit', phonetic: 'das erkléren' }
      ]},
      { type: 'text', en: '?', cz: '?', phonetic: '?' }
    ]
  },
  {
    id: 'de-tpl-3', topic: 'camping',
    tip: '„Haben Sie… frei?“ = „Máte volný…?“. Slůvko „frei“ stojí až na konci otázky.',
    parts: [
      { type: 'text', en: 'Haben Sie einen Stellplatz ', cz: 'Máte místo v kempu ', phonetic: 'hábn zí ajnen štelplac ' },
      { type: 'slot', options: [
        { en: 'mit Strom', cz: 's elektřinou', phonetic: 'mit štróm' },
        { en: 'im Schatten', cz: 've stínu', phonetic: 'im šatn' },
        { en: 'am Strand', cz: 'u pláže', phonetic: 'am štrant' }
      ]},
      { type: 'text', en: ' frei?', cz: ' volné?', phonetic: ' fraj?' }
    ]
  },
  {
    id: 'de-tpl-4', topic: 'camping',
    tip: '„Wir bleiben für…“ (Zůstáváme na…) vyjadřuje délku pobytu.',
    parts: [
      { type: 'text', en: 'Wir bleiben für ', cz: 'Zůstáváme na ', phonetic: 'vír blajbn fýr ' },
      { type: 'slot', options: [
        { en: 'zwei Nächte', cz: 'dvě noci', phonetic: 'cvaj nechte' },
        { en: 'eine Woche', cz: 'jeden týden', phonetic: 'ajne voche' },
        { en: 'nur heute Nacht', cz: 'jen dnešní noc', phonetic: 'núr hojte nacht' }
      ]},
      { type: 'text', en: '.', cz: '.', phonetic: '.' }
    ]
  },
  {
    id: 'de-tpl-5', topic: 'restaurant',
    tip: '„Ich hätte gern…“ (Dal bych si…) je přirozená zdvořilá fráze do restaurací i pekáren.',
    parts: [
      { type: 'text', en: 'Ich hätte gern ', cz: 'Dal bych si ', phonetic: 'ich hete gern ' },
      { type: 'slot', options: [
        { en: 'ein Bier', cz: 'jedno pivo', phonetic: 'ajn bír' },
        { en: 'einen Kaffee', cz: 'jednu kávu', phonetic: 'ajnen kafe' },
        { en: 'ein stilles Wasser', cz: 'neperlivou vodu', phonetic: 'ajn štiles vásr' }
      ]},
      { type: 'text', en: ', bitte.', cz: ', prosím.', phonetic: ', bite.' }
    ]
  },
  {
    id: 'de-tpl-6', topic: 'restaurant',
    tip: 'V němčině je platba kartou „mit Karte“, hotově „bar“ a zvlášť „getrennt“.',
    parts: [
      { type: 'text', en: 'Können wir ', cz: 'Můžeme zaplatit ', phonetic: 'kenen vír ' },
      { type: 'slot', options: [
        { en: 'mit Karte', cz: 'kartou', phonetic: 'mit kárte' },
        { en: 'bar', cz: 'hotově', phonetic: 'bár' },
        { en: 'getrennt', cz: 'zvlášť', phonetic: 'getrent' }
      ]},
      { type: 'text', en: ' zahlen?', cz: '?', phonetic: ' cálen?' }
    ]
  },
  {
    id: 'de-tpl-7', topic: 'shopping',
    tip: '„Wie viel kostet…?“ se ptá na cenu jedné věci. Pro více věcí je „Wie viel kosten…?“. ',
    parts: [
      { type: 'text', en: 'Wie viel kostet ', cz: 'Kolik stojí ', phonetic: 'ví fíl kostet ' },
      { type: 'slot', options: [
        { en: 'diese Flasche', cz: 'tahle láhev', phonetic: 'díze flaše' },
        { en: 'ein Kilo davon', cz: 'jedno kilo tohohle', phonetic: 'ajn kílo dafon' },
        { en: 'alles zusammen', cz: 'všechno dohromady', phonetic: 'ales cuzamen' }
      ]},
      { type: 'text', en: '?', cz: '?', phonetic: '?' }
    ]
  },
  {
    id: 'de-tpl-8', topic: 'airport',
    tip: '„Wie komme ich…?“ (Jak se dostanu…?) je nejlepší otázka na směr.',
    parts: [
      { type: 'text', en: 'Entschuldigung, wie komme ich ', cz: 'Promiňte, jak se dostanu ', phonetic: 'entšuldigung, ví kome ich ' },
      { type: 'slot', options: [
        { en: 'zum Bahnhof', cz: 'na nádraží', phonetic: 'cum bánhóf' },
        { en: 'ins Zentrum', cz: 'do centra', phonetic: 'ins centrum' },
        { en: 'zum Flughafen', cz: 'na letiště', phonetic: 'cum flúkháfn' }
      ]},
      { type: 'text', en: '?', cz: '?', phonetic: '?' }
    ]
  },
  {
    id: 'de-tpl-9', topic: 'problems',
    tip: '„Funktioniert nicht“ = nefunguje. Jednoduchá a účinná věta v hotelu i kempu.',
    parts: [
      { type: 'text', en: 'Entschuldigung, ', cz: 'Promiňte, ', phonetic: 'entšuldigung, ' },
      { type: 'slot', options: [
        { en: 'das WLAN', cz: 'Wi-Fi', phonetic: 'das vé-lan' },
        { en: 'die Klimaanlage', cz: 'klimatizace', phonetic: 'dí klíma-anláge' },
        { en: 'das warme Wasser', cz: 'teplá voda', phonetic: 'das varme vásr' }
      ]},
      { type: 'text', en: ' funktioniert nicht.', cz: ' nefunguje.', phonetic: ' funkcionírt nicht.' }
    ]
  }
];

const DE_RAW_PACKS = [
  {
    id: 'de-pack-verbs', topic: 'general', title: '1. Základní slovesa (DE)', icon: '⚡', color: '#ede9fe',
    raw: `sein|být|zajn|✨
haben|mít|hábn|🤲
machen|dělat|machen|⚡
gehen|jít|géhen|🚶
fahren|jet|fáren|🚗
kommen|přijít|komen|👋
sehen|vidět|zéhen|👀
wissen|vědět|visn|🧠
wollen|chtít|volen|🙋
können|moci / umět|kenen|💪
müssen|muset|mysn|❗
brauchen|potřebovat|brauhen|📌
geben|dát|gébn|🤝
nehmen|vzít|némen|✊
finden|najít|findn|🔍
sagen|říct|zágn|💬
sprechen|mluvit|šprechen|🗣️
verstehen|rozumět|ferštéhen|💡
fragen|ptát se|frágn|❓
helfen|pomoci|helfn|🛟
kaufen|koupit|kaufn|🛒
bezahlen|zaplatit|becálen|💳
essen|jíst|esn|🍴
trinken|pít|trinkn|🥤
schlafen|spát|šláfn|😴
bleiben|zůstat|blajbn|🏨
warten|čekat|vartn|⏳
suchen|hledat|zúchn|🔎
öffnen|otevřít|efnen|🔓
schließen|zavřít|šlísn|🔒`
  },
  {
    id: 'de-pack-travel', topic: 'airport', title: '2. Cestování a doprava (DE)', icon: '✈️', color: '#e0f2fe',
    raw: `der Flughafen|letiště|flúkháfn|🛫
der Flug|let|flúk|✈️
der Reisepass|cestovní pas|rajzepas|🛂
der Koffer|kufr|kofr|🧳
das Gepäck|zavazadla|gepek|🎒
die Fahrkarte|jízdenka|fárkárte|🎫
der Zug|vlak|cúk|🚆
der Bus|autobus|bus|🚌
die Straßenbahn|tramvaj|štrásnbán|🚊
das Auto|auto|auto|🚗
der Bahnhof|nádraží|bánhóf|🚉
das Gleis|nástupiště / kolej|glajs|🛤️
die Verspätung|zpoždění|feršpétung|⏳
der Ausgang|východ|ausgang|🚪
der Eingang|vchod|ajngang|🚪
die Straße|ulice / silnice|štráse|🛣️
die Autobahn|dálnice|autobán|🛣️
die Brücke|most|bryke|🌉
die Tankstelle|benzínka|tankštele|⛽
das Benzin|benzín|bencín|⛽
der Parkplatz|parkoviště|párkplac|🅿️
die Karte|mapa|kárte|🗺️
links|vlevo|links|⬅️
rechts|vpravo|rechts|➡️
geradeaus|rovně|gerádeaus|⬆️
die Grenze|hranice|grence|🚧
das Hotel|hotel|houtel|🏨
die Rezeption|recepce|recepcion|🛎️
die Reservierung|rezervace|rezervírung|📅
der Schlüssel|klíč|šlysl|🔑`
  },
  {
    id: 'de-pack-camping', topic: 'camping', title: '3. Kemp a příroda (DE)', icon: '⛺', color: '#ccfbf1',
    raw: `der Campingplatz|kemp|kempingplac|⛺
der Stellplatz|parcela pro auto/stan|štelplac|🚐
das Zelt|stan|celt|⛺
das Wohnmobil|obytné auto|vónmobíl|🚐
der Strom|elektřina|štróm|🔌
das Wasser|voda|vásr|💧
das Trinkwasser|pitná voda|trinkvásr|🚰
die Dusche|sprcha|dúše|🚿
die Toilette|záchod|toaléte|🚽
der Strand|pláž|štrant|🏖️
das Meer|moře|mér|🌊
der See|jezero|zé|🏞️
der Berg|hora|berk|🏔️
der Wald|les|valt|🌲
die Sonne|slunce|zone|☀️
der Regen|déšť|régn|🌧️
der Wind|vítr|vint|💨
der Schatten|stín|šatn|⛱️
das Feuer|oheň|fojr|🔥
die Nacht|noc|nacht|🌙
das Wetter|počasí|vetr|🌦️
der Schlafsack|spacák|šláfzak|🛏️
die Taschenlampe|baterka|tašnlampe|🔦
der Müll|odpadky|myl|🗑️
das Handtuch|ručník|hantúch|🛁
die Decke|deka|deke|🧶
der Hund|pes|hunt|🐶
der Weg|cesta|vék|🥾
die Aussicht|výhled|auszicht|🔭
die Natur|příroda|natúr|🌿`
  },
  {
    id: 'de-pack-food', topic: 'restaurant', title: '4. Jídlo a restaurace (DE)', icon: '🍽️', color: '#fef3c7',
    raw: `das Essen|jídlo|esn|🍽️
das Frühstück|snídaně|frýštyk|🥐
das Mittagessen|oběd|mitákesn|🥗
das Abendessen|večeře|ábntesn|🍝
die Speisekarte|jídelní lístek|špajzekárte|📋
die Rechnung|účet|rechnung|🧾
der Tisch|stůl|tiš|🪑
das Brot|chléb|brót|🍞
das Brötchen|houska / rohlík|brétchen|🥖
die Butter|máslo|butr|🧈
der Käse|sýr|kéze|🧀
das Fleisch|maso|flajš|🥩
das Hähnchen|kuře|hénchen|🍗
der Fisch|ryba|fiš|🐟
die Suppe|polévka|zupe|🍲
der Salat|salát|zalát|🥗
das Gemüse|zelenina|gemýze|🥦
das Obst|ovoce|ópst|🍎
der Kaffee|káva|kafe|☕
der Tee|čaj|té|🍵
das Bier|pivo|bír|🍺
der Wein|víno|vajn|🍷
die Milch|mléko|milch|🥛
der Zucker|cukr|cukr|🍬
das Salz|sůl|zalc|🧂
das Eis|zmrzlina / led|ajs|🍦
der Kuchen|koláč / dort|kúchn|🍰
lecker|chutný / výborný|lekr|😋
heiß|horký|hajs|🔥
kalt|studený|kalt|❄️`
  },
  {
    id: 'de-pack-shop', topic: 'shopping', title: '5. Nákupy a peníze (DE)', icon: '🛍️', color: '#fce7f3',
    raw: `das Geld|peníze|gelt|💵
das Bargeld|hotovost|bárgelt|💵
die Karte|platební karta|kárte|💳
der Preis|cena|prajs|🏷️
der Rabatt|sleva|rabat|📉
die Kasse|pokladna|kase|🛒
der Kassenbon|účtenka|kasnbon|🧾
die Tüte|taška|týte|🛍️
das Geschäft|obchod|gešeft|🏪
der Supermarkt|supermarket|zúprmárkt|🛒
die Bäckerei|pekárna|bekeraj|🥐
die Größe|velikost|grése|📏
billig|levný|bilich|🪙
teuer|drahý|tojr|💎
kostenlos|zdarma|kostnlós|🆓
geöffnet|otevřeno|ge-efnet|🔓
geschlossen|zavřeno|gešlosn|🔒
die Flasche|láhev|flaše|🍾
das Geschenk|dárek|gešenk|🎁
die Kleidung|oblečení|klajdung|👕
die Schuhe|boty|šúhe|👞
die Jacke|bunda|jake|🧥
die Hose|kalhoty|hóze|👖
das Hemd|košile|hemt|👔
die Brille|brýle|brile|👓
neu|nový|noj|🆕
alt|starý|alt|🏛️
groß|velký|grós|🐘
klein|malý|klajn|🐜
das Wechselgeld|drobné nazpět|vekslgelt|🪙`
  },
  {
    id: 'de-pack-health', topic: 'problems', title: '6. Zdraví, čas a každodenní výrazy (DE)', icon: '🛟', color: '#fee2e2',
    raw: `die Hilfe|pomoc|hilfe|🆘
der Arzt|lékař|árct|🩺
die Apotheke|lékárna|apotéke|💊
das Krankenhaus|nemocnice|kranknhaus|🏥
die Polizei|policie|policaj|🚓
der Schmerz|bolest|šmerc|🤕
das Fieber|horečka|fíbr|🌡️
die Allergie|alergie|alergí|🤧
das Medikament|lék|medikament|💊
kaputt|rozbitý|kaput|🔧
verloren|ztracený|ferlóren|❓
heute|dnes|hojte|📅
morgen|zítra|morgn|➡️
gestern|včera|gestrn|⬅️
jetzt|teď|ject|⏱️
später|později|špétr|⏳
die Stunde|hodina|štunde|⌛
der Tag|den|ták|☀️
die Woche|týden|voche|📆
ja|ano|já|✅
nein|ne|najn|❌
bitte|prosím|bite|🙏
danke|děkuji|danke|💐
Entschuldigung|promiňte|entšuldigung|🙋
hallo|ahoj|haló|👋
tschüss|ahoj (loučení)|čys|👋
gut|dobrý|gút|👍
schlecht|špatný|šlecht|👎
langsam|pomalu|langzám|🐢
schnell|rychle|šnel|⚡`
  }
];

function parseRaw(raw, topic) {
  return raw.trim().split('\n').map((l) => l.trim()).filter(Boolean).map((line, i) => {
    const [en, cz, ph, img] = line.split('|');
    return {
      id: `de-v-${topic}-${i}`,
      topic,
      en: (en || '').trim(),
      cz: (cz || '').trim(),
      phonetic: ph ? `[${ph.trim()}]` : '',
      img: (img || '🇩🇪').trim()
    };
  });
}

export const DE_VOCAB_PACKS = DE_RAW_PACKS.map((p) => ({
  id: p.id,
  topic: p.topic,
  title: p.title,
  icon: p.icon,
  color: p.color,
  words: parseRaw(p.raw, p.topic)
}));

export const DE_VOCABULARY = DE_VOCAB_PACKS.flatMap((p) => p.words);
