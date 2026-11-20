import { EXTRA_PHRASES, EXTRA_TEMPLATES } from './extra_phrases_templates.js';
import { VOCABULARY_PART_1 } from './vocabulary_part_1.js';
import { VOCABULARY_PART_2 } from './vocabulary_part_2.js';
import { VOCABULARY_PART_3 } from './vocabulary_part_3.js';
import { VOCABULARY_PART_4 } from './vocabulary_part_4.js';

export const VOCABULARY = [
  ...VOCABULARY_PART_1,
  ...VOCABULARY_PART_2,
  ...VOCABULARY_PART_3,
  ...VOCABULARY_PART_4
];

export const TOPICS = [
  { id: 'general', label: 'Běžná konverzace', shortLabel: 'Běžná mluva', icon: '💬' },
  { id: 'camping', label: 'Kempování a cestování autem', shortLabel: 'Kemp & auto', icon: '⛺' },
  { id: 'restaurant', label: 'Restaurace a jídlo', shortLabel: 'Restaurace', icon: '🍽️' },
  { id: 'shopping', label: 'Nákupy', shortLabel: 'Nákupy', icon: '🛍️' },
  { id: 'airport', label: 'Letiště a navigace', shortLabel: 'Letiště', icon: '✈️' },
  { id: 'problems', label: 'Řešení problémů', shortLabel: 'Problémy', icon: '🛟' }
];

export const TOPIC_ILLUSTRATIONS = {
  general: `<svg viewBox="0 0 120 72" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect width="120" height="72" rx="14" fill="#E0E7FF"/>
    <rect x="18" y="16" width="54" height="32" rx="10" fill="#4F46E5"/>
    <path d="M28 48 L22 57 L38 48 Z" fill="#4F46E5"/>
    <rect x="28" y="26" width="32" height="4" rx="2" fill="#FFFFFF"/>
    <rect x="28" y="34" width="22" height="4" rx="2" fill="#C7D2FE"/>
    <rect x="52" y="28" width="50" height="30" rx="10" fill="#FFFFFF" stroke="#4F46E5" stroke-width="2"/>
    <rect x="62" y="38" width="28" height="4" rx="2" fill="#4F46E5"/>
    <rect x="62" y="46" width="18" height="4" rx="2" fill="#94A3B8"/>
  </svg>`,
  camping: `<svg viewBox="0 0 120 72" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect width="120" height="72" rx="14" fill="#CCFBF1"/>
    <path d="M0 58 Q30 46 60 56 T120 52 L120 72 L0 72 Z" fill="#5EEAD4"/>
    <circle cx="96" cy="20" r="9" fill="#FBBF24"/>
    <path d="M18 54 L34 26 L50 54 Z" fill="#0F766E"/>
    <path d="M34 26 L42 54 L50 54 Z" fill="#115E59"/>
    <path d="M31 54 L34 42 L37 54 Z" fill="#FEF3C7"/>
    <rect x="58" y="34" width="44" height="20" rx="5" fill="#FFFFFF" stroke="#0F766E" stroke-width="2"/>
    <rect x="64" y="39" width="12" height="8" rx="2" fill="#BAE6FD"/>
    <rect x="80" y="39" width="14" height="8" rx="2" fill="#BAE6FD"/>
    <circle cx="68" cy="55" r="5" fill="#334155"/>
    <circle cx="92" cy="55" r="5" fill="#334155"/>
  </svg>`,
  restaurant: `<svg viewBox="0 0 120 72" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect width="120" height="72" rx="14" fill="#FEF3C7"/>
    <circle cx="60" cy="38" r="22" fill="#FFFFFF" stroke="#D97706" stroke-width="2.5"/>
    <circle cx="60" cy="38" r="15" fill="#FFFBEB" stroke="#FCD34D" stroke-width="1.5"/>
    <path d="M26 18 V36 M22 18 V28 M30 18 V28 M26 36 V56" stroke="#92400E" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M94 18 C98 24 98 32 94 36 V56" stroke="#92400E" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M52 38 C52 33 68 33 68 38 C68 43 52 43 52 38 Z" fill="#F59E0B"/>
  </svg>`,
  shopping: `<svg viewBox="0 0 120 72" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect width="120" height="72" rx="14" fill="#E0F2FE"/>
    <rect x="34" y="24" width="32" height="36" rx="5" fill="#0284C7"/>
    <path d="M42 24 C42 14 58 14 58 24" stroke="#0369A1" stroke-width="3" stroke-linecap="round"/>
    <rect x="58" y="30" width="28" height="30" rx="5" fill="#38BDF8"/>
    <path d="M65 30 C65 22 79 22 79 30" stroke="#0284C7" stroke-width="2.5" stroke-linecap="round"/>
    <circle cx="44" cy="40" r="3" fill="#FFFFFF"/>
    <circle cx="72" cy="44" r="3" fill="#FFFFFF"/>
  </svg>`,
  airport: `<svg viewBox="0 0 120 72" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect width="120" height="72" rx="14" fill="#EDE9FE"/>
    <circle cx="28" cy="22" r="8" fill="#C4B5FD" opacity="0.6"/>
    <circle cx="94" cy="50" r="10" fill="#C4B5FD" opacity="0.5"/>
    <path d="M24 44 L96 24 L82 40 L92 50 L74 44 L44 54 L52 40 Z" fill="#6D28D9"/>
    <path d="M46 38 L36 24 L48 26 L62 34 Z" fill="#8B5CF6"/>
    <path d="M18 58 Q56 50 102 58" stroke="#7C3AED" stroke-width="2" stroke-dasharray="4 4" stroke-linecap="round"/>
  </svg>`,
  problems: `<svg viewBox="0 0 120 72" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect width="120" height="72" rx="14" fill="#FEE2E2"/>
    <circle cx="60" cy="36" r="22" fill="#FFFFFF" stroke="#DC2626" stroke-width="7"/>
    <circle cx="60" cy="36" r="11" fill="#FEE2E2"/>
    <path d="M60 10 V22 M60 50 V62 M34 36 H46 M74 36 H86" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round"/>
  </svg>`
};

/**
 * 30 praktických cestovatelských frází (6 pro každé z 5 témat)
 * Čistě český fonetický přepis + gramatický/cestovatelský tip.
 */
export const INITIAL_PHRASES = [
  // 1. Kempování a cestování autem (6)
  {
    id: 'init-camp-1',
    topic: 'camping',
    cz: 'Mohli bychom dostat místo pro stan s elektřinou?',
    en: 'Could we get a pitch with electricity?',
    phonetic: '[kud ví get e pič vis ilektrisiti?]',
    tip: '„Could we…?“ (Mohli bychom…?) je zdvořilejší než „Can we…?“. Slovo „pitch“ znamená v kempu parcelu pro stan nebo obytné auto.'
  },
  {
    id: 'init-camp-2',
    topic: 'camping',
    cz: 'Kde se dá vypustit odpadní voda z karavanu?',
    en: 'Where can we empty the grey water?',
    phonetic: '[vér ken ví empty de grej vótr?]',
    tip: 'V otázce stojí „can“ před „we“ (Where can we = Kde můžeme). „Grey water“ je šedá odpadní voda ze sprchy a dřezu.'
  },
  {
    id: 'init-camp-3',
    topic: 'camping',
    cz: 'Je tu pitná voda k doplnění nádrže?',
    en: 'Is there drinking water to fill the tank?',
    phonetic: '[iz dér drinkin vótr tu fil de tenk?]',
    tip: '„Is there…?“ znamená „Je tady…?“. Vazba „to fill“ (abychom naplnili) vyjadřuje účel — angličtina tu dává „to + sloveso“.'
  },
  {
    id: 'init-camp-4',
    topic: 'camping',
    cz: 'Potřebujeme plnou nádrž benzínu, prosím.',
    en: 'We need a full tank of petrol, please.',
    phonetic: '[ví níd e ful tenk of petrol, plíz.]',
    tip: 'Slovosled v oznamovací větě je pevný: Kdo (We) + co dělá (need) + co (a full tank of petrol). V USA se místo „petrol“ říká „gas“.'
  },
  {
    id: 'init-camp-5',
    topic: 'camping',
    cz: 'Smíme tady přespat na jednu noc?',
    en: 'Are we allowed to stay overnight here?',
    phonetic: '[ár ví elaud tu stej ouvrnajt hír?]',
    tip: '„Are we allowed to…?“ = „Smíme…? / Máme dovoleno…?“. Místo (here) patří v angličtině vždy až na konec věty.'
  },
  {
    id: 'init-camp-6',
    topic: 'camping',
    cz: 'Kde najdeme sprchy a záchody?',
    en: 'Where can we find the showers and toilets?',
    phonetic: '[vér ken ví fajnd de šaurz end tojlits?]',
    tip: 'Člen „the“ tu znamená konkrétní sprchy a záchody v tomto kempu. Množné číslo se tvoří jednoduše koncovkou -s.'
  },

  // 2. Restaurace a jídlo (6)
  {
    id: 'init-rest-1',
    topic: 'restaurant',
    cz: 'Měli bychom zájem o stůl pro dva venku.',
    en: 'We would like a table for two outside.',
    phonetic: '[ví vud lajk e tejbl fór tú autsajd.]',
    tip: '„We would like…“ (Rádi bychom…) je nejlepší univerzální fráze do restaurace. Určení místa „outside“ stojí až na konci.'
  },
  {
    id: 'init-rest-2',
    topic: 'restaurant',
    cz: 'Můžeme dostat jídelní lístek v angličtině?',
    en: 'Can we have the menu in English, please?',
    phonetic: '[ken ví hev de menjú in ingliš, plíz?]',
    tip: 'V restauraci angličtina nepoužívá „give us“ (dejte nám), ale zdvořilé „Can we have…?“ (Můžeme mít/dostat…?).'
  },
  {
    id: 'init-rest-3',
    topic: 'restaurant',
    cz: 'Co byste nám doporučil z místních jídel?',
    en: 'What local dish would you recommend?',
    phonetic: '[vot loukl diš vud jů rekomend?]',
    tip: 'Přídavné jméno „local“ (místní) stojí vždy před podstatným jménem „dish“ (jídlo/chod). „Would you“ = byste.'
  },
  {
    id: 'init-rest-4',
    topic: 'restaurant',
    cz: 'Poprosíme účet, budeme platit kartou.',
    en: 'Could we have the bill? We will pay by card.',
    phonetic: '[kud ví hev de bil? ví vil pej baj kárd.]',
    tip: 'Placení kartou se říká „by card“, ale hotově „in cash“. V USA se účtu v restauraci častěji říká „the check“.'
  },
  {
    id: 'init-rest-5',
    topic: 'restaurant',
    cz: 'Jsem alergický na ořechy, je to v tom jídle?',
    en: 'I am allergic to nuts, is it in this dish?',
    phonetic: '[aj em elérdžik tu nats, iz it in dis diš?]',
    tip: 'Po slově „allergic“ se v angličtině vždy pojí předložka „to“ (doslova alergický „k“ ořechům).'
  },
  {
    id: 'init-rest-6',
    topic: 'restaurant',
    cz: 'Dáme si dvě kávy s sebou, prosím.',
    en: 'Two coffees to take away, please.',
    phonetic: '[tú kofíz tu tejk evej, plíz.]',
    tip: '„To take away“ (s sebou) je běžné v Evropě a Británii; v USA uslyšíš spíše kratší „to go“.'
  },

  // 3. Nákupy (6)
  {
    id: 'init-shop-1',
    topic: 'shopping',
    cz: 'Kolik tohle stojí dohromady?',
    en: 'How much does this cost altogether?',
    phonetic: '[hau mač daz dis kost óltugedr?]',
    tip: 'Na cenu se vždy ptáme „How much…?“ (Kolik). Protože „this“ je jednotné číslo, pomocné sloveso je „does“.'
  },
  {
    id: 'init-shop-2',
    topic: 'shopping',
    cz: 'Máte tohle ve větší velikosti?',
    en: 'Do you have this in a larger size?',
    phonetic: '[dú jů hev dis in e lárdžr sajz?]',
    tip: 'Otázku „Máte…?“ v angličtině tvoří pomocné „Do you have…?“ na začátku. Koncovka „-er“ u „larger“ znamená „větší“.'
  },
  {
    id: 'init-shop-3',
    topic: 'shopping',
    cz: 'Jen se dívám, děkuji za pomoc.',
    en: 'I am just looking, thank you for your help.',
    phonetic: '[aj em džast lukin, senk jů fór jór help.]',
    tip: 'Tvar „I am looking“ (průběhový čas s -ing) vyjadřuje, že se díváš právě teď v tuto chvíli.'
  },
  {
    id: 'init-shop-4',
    topic: 'shopping',
    cz: 'Berete bezkontaktní karty nebo jen hotovost?',
    en: 'Do you take contactless cards or only cash?',
    phonetic: '[dú jů tejk kontektles kárdz ór ounli keš?]',
    tip: 'Sloveso „take“ se v obchodech běžně používá ve významu „přijímat/brát“ (platbu). Můžeš říct i „accept“.'
  },
  {
    id: 'init-shop-5',
    topic: 'shopping',
    cz: 'Můžu dostat účtenku a tašku, prosím?',
    en: 'Could I get a receipt and a bag, please?',
    phonetic: '[kud aj get e risít end e beg, plíz?]',
    tip: 'Pozor na slovo „receipt“ (účtenka) — písmeno „p“ se vůbec nevyslovuje! Čte se jednoduše [risít].'
  },
  {
    id: 'init-shop-6',
    topic: 'shopping',
    cz: 'Kde najdu nejbližší obchod s potravinami?',
    en: 'Where is the nearest grocery store?',
    phonetic: '[vér iz de nírist grousri stór?]',
    tip: 'Před 3. stupněm přídavného jména (nearest = nejbližší) je v angličtině vždy člen „the“.'
  },

  // 4. Letiště a navigace (6)
  {
    id: 'init-air-1',
    topic: 'airport',
    cz: 'Kde je odbavení pro tento let?',
    en: 'Where is the check-in desk for this flight?',
    phonetic: '[vér iz de ček-in desk fór dis flajt?]',
    tip: '„Check-in desk“ je odbavovací přepážka. „This“ označuje věc blízko/tento konkrétní let.'
  },
  {
    id: 'init-air-2',
    topic: 'airport',
    cz: 'Kterým směrem je nástupní brána číslo pět?',
    en: 'Which way is boarding gate number five?',
    phonetic: '[vič vej iz bórdin gejt nambr fajv?]',
    tip: '„Which way is…?“ (Kterým směrem je…?) je super rychlá fráze, když hledáš cestu na letišti nebo ve městě.'
  },
  {
    id: 'init-air-3',
    topic: 'airport',
    cz: 'Jede tenhle autobus do centra města?',
    en: 'Does this bus go to the city centre?',
    phonetic: '[daz dis bas gou tu de siti sentr?]',
    tip: 'Pro 3. osobu (this bus = on) začíná otázka „Does“, a hlavní sloveso „go“ už zůstává v základním tvaru bez -s.'
  },
  {
    id: 'init-air-4',
    topic: 'airport',
    cz: 'Můžete mi to ukázat na mapě, prosím?',
    en: 'Could you show me on the map, please?',
    phonetic: '[kud jů šou mí on de mep, plíz?]',
    tip: '„Could you…?“ (Mohl byste…?) + základní tvar slovesa (show). S mapou se pojí předložka „on“ (on the map = na mapě).'
  },
  {
    id: 'init-air-5',
    topic: 'airport',
    cz: 'Kolik času trvá cesta pěšky na nádraží?',
    en: 'How long does it take to walk to the station?',
    phonetic: '[hau long daz it tejk tu vók tu de stejšn?]',
    tip: 'Ustálená vazba „How long does it take to…?“ znamená „Jak dlouho trvá…?“. Skvěle se hodí pro chůzi i jízdu autem.'
  },
  {
    id: 'init-air-6',
    topic: 'airport',
    cz: 'Potřebuji si koupit zpáteční jízdenku.',
    en: 'I need to buy a return ticket.',
    phonetic: '[aj níd tu baj e ritérn tikit.]',
    tip: 'Po „need“ následuje „to + sloveso“ (need to buy = potřebuji koupit). Jednosměrná jízdenka je „single“ nebo „one-way“.'
  },

  // 5. Řešení problémů (6)
  {
    id: 'init-prob-1',
    topic: 'problems',
    cz: 'Promiňte, ale tohle nefunguje správně.',
    en: 'Excuse me, but this is not working properly.',
    phonetic: '[ikskjúz mí, bat dis iz not vérkin proprli.]',
    tip: '„Excuse me“ slouží k upoutání pozornosti (Promiňte), zatímco „Sorry“ je omluva. „Is not working“ = zrovna nefunguje.'
  },
  {
    id: 'init-prob-2',
    topic: 'problems',
    cz: 'Píchli jsme pneumatiku, potřebujeme odtah.',
    en: 'We have a flat tyre and need roadside assistance.',
    phonetic: '[ví hev e flet tajr end níd roudsajd esistns.]',
    tip: '„Flat tyre“ znamená doslova „plochá pneumatika“ (píchnuté kolo). „Roadside assistance“ je silniční asistenční služba.'
  },
  {
    id: 'init-prob-3',
    topic: 'problems',
    cz: 'Ztratil jsem kufr, kde ho můžu nahlásit?',
    en: 'I lost my suitcase, where can I report it?',
    phonetic: '[aj lost maj sútkejs, vér ken aj ripórt it?]',
    tip: '„Lost“ je minulý čas od „lose“ (ztratit). V druhé části je otázka, proto „can“ stojí před „I“ (where can I).'
  },
  {
    id: 'init-prob-4',
    topic: 'problems',
    cz: 'Můžete mi prosím napsat adresu na papír?',
    en: 'Could you write the address down for me, please?',
    phonetic: '[kud jů rajt de edres daun fór mí, plíz?]',
    tip: '„Write down“ je frázové sloveso = „zapsat si“. Předmět (the address) může stát mezi „write“ a „down“.'
  },
  {
    id: 'init-prob-5',
    topic: 'problems',
    cz: 'Potřebuji lékárnu, mám horečku.',
    en: 'I need a pharmacy, I have a fever.',
    phonetic: '[aj níd e fármesi, aj hev e fívr.]',
    tip: 'U nemocí a příznaků jako horečka (a fever) nebo bolest hlavy (a headache) angličtina používá neurčitý člen „a“.'
  },
  {
    id: 'init-prob-6',
    topic: 'problems',
    cz: 'Můžeme si pokoj vyměnit za tišší?',
    en: 'Could we change to a quieter room?',
    phonetic: '[kud ví čejndž tu e kvajtr rúm?]',
    tip: '„Change to“ znamená „přesunout se / změnit na“. Koncovka „-er“ u „quieter“ tvoří 2. stupeň (tišší).'
  },
  ...EXTRA_PHRASES
];

/**
 * Interaktivní šablony pro Stavebnici (režim Šablony).
 * Každá šablona obsahuje i vysvětlení stavby věty (tip).
 */
export const SENTENCE_TEMPLATES = [
  // Běžná konverzace (obecné univerzální věty)
  {
    id: 'tpl-gen-1',
    topic: 'general',
    tip: '„I would like to…“ (Chtěl bych / Rád bych…) + základní tvar slovesa. Je to jedna z nejužitečnějších a nejzdvořilejších vazeb v celé angličtině.',
    parts: [
      { type: 'text', en: 'I would like to ', cz: 'Chtěl bych ', phonetic: 'aj vud lajk tu ' },
      {
        type: 'slot',
        options: [
          { en: 'buy this', cz: 'koupit tohle', phonetic: 'baj dis' },
          { en: 'visit the museum', cz: 'navštívit muzeum', phonetic: 'vizit de mjúzím' },
          { en: 'learn more English', cz: 'naučit se víc anglicky', phonetic: 'lérn mór ingliš' },
          { en: 'take a photo', cz: 'udělat fotku', phonetic: 'tejk e foutou' }
        ]
      },
      { type: 'text', en: '.', cz: '.', phonetic: '.' }
    ]
  },
  {
    id: 'tpl-gen-2',
    topic: 'general',
    tip: 'Pozor na slovosled u nepřímé otázky „Do you know where…?“ (Nevíte, kde…?) — sloveso „is“ stojí až na samém konci věty!',
    parts: [
      { type: 'text', en: 'Do you know where ', cz: 'Nevíte, kde je ', phonetic: 'dú jů nou vér ' },
      {
        type: 'slot',
        options: [
          { en: 'the nearest pharmacy', cz: 'nejbližší lékárna', phonetic: 'de nírist fármesi' },
          { en: 'the bus stop', cz: 'autobusová zastávka', phonetic: 'de bas stop' },
          { en: 'the toilet', cz: 'záchod', phonetic: 'de tojlit' }
        ]
      },
      { type: 'text', en: ' is?', cz: '?', phonetic: ' iz?' }
    ]
  },
  {
    id: 'tpl-gen-3',
    topic: 'general',
    tip: '„Could you help me…?“ (Mohl byste mi pomoci…?) + základní tvar slovesa (bez „to“). Funguje v každé každodenní situaci.',
    parts: [
      { type: 'text', en: 'Could you help me ', cz: 'Mohl byste mi pomoci ', phonetic: 'kud jů help mí ' },
      {
        type: 'slot',
        options: [
          { en: 'find this place', cz: 'najít tohle místo', phonetic: 'fajnd dis plejs' },
          { en: 'translate this', cz: 'přeložit tohle', phonetic: 'trenslejt dis' },
          { en: 'carry this bag', cz: 'odnést tuhle tašku', phonetic: 'keri dis beg' }
        ]
      },
      { type: 'text', en: ', please?', cz: ', prosím?', phonetic: ', plíz?' }
    ]
  },
  {
    id: 'tpl-gen-4',
    topic: 'general',
    tip: 'U otázek o tom, co se někomu líbí nebo co potřebuje, dáváme na začátek „Do you…?“ a za něj základní sloveso.',
    parts: [
      { type: 'text', en: 'Do you ', cz: '', phonetic: 'dú jů ' },
      {
        type: 'slot',
        options: [
          { en: 'have time today', cz: 'Máte dnes čas', phonetic: 'hev tajm tudej' },
          { en: 'need any help', cz: 'Potřebujete pomoct', phonetic: 'níd eni help' },
          { en: 'understand me', cz: 'Rozumíte mi', phonetic: 'andrstend mí' }
        ]
      },
      { type: 'text', en: '?', cz: '?', phonetic: '?' }
    ]
  },

  // Kempování a cestování autem
  {
    id: 'tpl-camp-1',
    topic: 'camping',
    tip: '„Could we get…?“ je zdvořilá žádost (Mohli bychom dostat…?). Na konec věty jednoduše přidáš požadavek: s elektřinou, u pláže nebo ve stínu.',
    parts: [
      { type: 'text', en: 'Could we get a pitch ', cz: 'Mohli bychom dostat místo ', phonetic: 'kud ví get e pič ' },
      {
        type: 'slot',
        options: [
          { en: 'with electricity', cz: 's elektřinou', phonetic: 'vis ilektrisiti' },
          { en: 'near the beach', cz: 'blízko pláže', phonetic: 'nír de bíč' },
          { en: 'in the shade', cz: 've stínu', phonetic: 'in de šejd' }
        ]
      },
      { type: 'text', en: '?', cz: '?', phonetic: '?' }
    ]
  },
  {
    id: 'tpl-camp-2',
    topic: 'camping',
    tip: '„We are staying for…“ používá průběhový čas pro naplánovaný pobyt. Předložka „for“ vyjadřuje délku pobytu (na dvě noci / na týden).',
    parts: [
      { type: 'text', en: 'We are staying for ', cz: 'Zůstáváme na ', phonetic: 'ví ár stej-in fór ' },
      {
        type: 'slot',
        options: [
          { en: 'two nights', cz: 'dvě noci', phonetic: 'tú najts' },
          { en: 'one week', cz: 'jeden týden', phonetic: 'van vík' },
          { en: 'just tonight', cz: 'jen dnešní noc', phonetic: 'džast tunajt' }
        ]
      },
      { type: 'text', en: ' with ', cz: ' s ', phonetic: ' vis ' },
      {
        type: 'slot',
        options: [
          { en: 'a campervan', cz: 'obytným autem', phonetic: 'e kemprven' },
          { en: 'a small tent', cz: 'malým stanem', phonetic: 'e smól tent' },
          { en: 'a caravan', cz: 'karavanem', phonetic: 'e kereven' }
        ]
      },
      { type: 'text', en: '.', cz: '.', phonetic: '.' }
    ]
  },
  {
    id: 'tpl-camp-3',
    topic: 'camping',
    tip: 'V otázce „Where can we…?“ (Kde můžeme…?) se prohodí pořadí „we can“ na „can we“ a pak následuje čisté sloveso (fill up / plug in / park).',
    parts: [
      { type: 'text', en: 'Where can we ', cz: 'Kde můžeme ', phonetic: 'vér ken ví ' },
      {
        type: 'slot',
        options: [
          { en: 'fill up fresh water', cz: 'doplnit čistou vodu', phonetic: 'fil ap freš vótr' },
          { en: 'plug in the cable', cz: 'zapojit kabel', phonetic: 'plag in de kejbl' },
          { en: 'park for the night', cz: 'zaparkovat přes noc', phonetic: 'párk fór de najt' }
        ]
      },
      { type: 'text', en: '?', cz: '?', phonetic: '?' }
    ]
  },

  // Restaurace a jídlo
  {
    id: 'tpl-rest-1',
    topic: 'restaurant',
    tip: '„Could we have a table…?“ je nejpřirozenější způsob, jak požádat o stůl. Počet osob (for two) dáváme hned za „table“, umístění (outside) až na konec.',
    parts: [
      { type: 'text', en: 'Could we have a table ', cz: 'Mohli bychom dostat stůl ', phonetic: 'kud ví hev e tejbl ' },
      {
        type: 'slot',
        options: [
          { en: 'for two', cz: 'pro dva', phonetic: 'fór tú' },
          { en: 'for four', cz: 'pro čtyři', phonetic: 'fór fór' },
          { en: 'by the window', cz: 'u okna', phonetic: 'baj de vindou' }
        ]
      },
      { type: 'text', en: ' ', cz: ' ', phonetic: ' ' },
      {
        type: 'slot',
        options: [
          { en: 'outside', cz: 'venku', phonetic: 'autsajd' },
          { en: 'in the shade', cz: 've stínu', phonetic: 'in de šejd' },
          { en: 'please', cz: 'prosím', phonetic: 'plíz' }
        ]
      },
      { type: 'text', en: '?', cz: '?', phonetic: '?' }
    ]
  },
  {
    id: 'tpl-rest-2',
    topic: 'restaurant',
    tip: '„I would like…“ (Dal bych si…) je vždy zdvořilé (nikdy neříkej jen „I want“). Předložka „without“ znamená „bez“.',
    parts: [
      { type: 'text', en: 'I would like ', cz: 'Dal bych si ', phonetic: 'aj vud lajk ' },
      {
        type: 'slot',
        options: [
          { en: 'sparkling water', cz: 'perlivou vodu', phonetic: 'spárklin vótr' },
          { en: 'still water', cz: 'neperlivou vodu', phonetic: 'stil vótr' },
          { en: 'a local beer', cz: 'místní pivo', phonetic: 'e loukl bír' }
        ]
      },
      { type: 'text', en: ' without ', cz: ' bez ', phonetic: ' visaut ' },
      {
        type: 'slot',
        options: [
          { en: 'ice', cz: 'ledu', phonetic: 'ajs' },
          { en: 'lemon', cz: 'citronu', phonetic: 'lemn' },
          { en: 'sugar', cz: 'cukru', phonetic: 'šugr' }
        ]
      },
      { type: 'text', en: '.', cz: '.', phonetic: '.' }
    ]
  },
  {
    id: 'tpl-rest-3',
    topic: 'restaurant',
    tip: 'Všimni si rozdílu předložek: kartou je vždy „by card“, hotově „in cash“ a zvlášť je příslovce „separately“ bez předložky.',
    parts: [
      { type: 'text', en: 'Can we pay ', cz: 'Můžeme zaplatit ', phonetic: 'ken ví pej ' },
      {
        type: 'slot',
        options: [
          { en: 'by card', cz: 'kartou', phonetic: 'baj kárd' },
          { en: 'in cash', cz: 'hotově', phonetic: 'in keš' },
          { en: 'separately', cz: 'zvlášť', phonetic: 'sepretli' }
        ]
      },
      { type: 'text', en: ', please?', cz: ', prosím?', phonetic: ', plíz?' }
    ]
  },

  // Nákupy
  {
    id: 'tpl-shop-1',
    topic: 'shopping',
    tip: 'Otázka „Do you have…?“ (Máte…?) potřebuje pomocné „Do“ na začátku. Velikost i barva se v angličtině pojí s předložkou „in“.',
    parts: [
      { type: 'text', en: 'Do you have this in ', cz: 'Máte tohle v ', phonetic: 'dú jů hev dis in ' },
      {
        type: 'slot',
        options: [
          { en: 'a smaller size', cz: 'menší velikosti', phonetic: 'e smólr sajz' },
          { en: 'a larger size', cz: 'větší velikosti', phonetic: 'e lárdžr sajz' },
          { en: 'another colour', cz: 'jiné barvě', phonetic: 'enadr kalr' }
        ]
      },
      { type: 'text', en: '?', cz: '?', phonetic: '?' }
    ]
  },
  {
    id: 'tpl-shop-2',
    topic: 'shopping',
    tip: '„How much is…?“ používáme pro jednu věc (jednotné číslo). Pokud se ptáš na více věcí najednou, řekneš „How much are…?“. ',
    parts: [
      { type: 'text', en: 'How much is ', cz: 'Kolik stojí ', phonetic: 'hau mač iz ' },
      {
        type: 'slot',
        options: [
          { en: 'one kilo of this', cz: 'jedno kilo tohohle', phonetic: 'van kílou of dis' },
          { en: 'this bottle', cz: 'tahle láhev', phonetic: 'dis botl' },
          { en: 'the whole set', cz: 'celá sada', phonetic: 'de houl set' }
        ]
      },
      { type: 'text', en: '?', cz: '?', phonetic: '?' }
    ]
  },
  {
    id: 'tpl-shop-3',
    topic: 'shopping',
    tip: '„Can I…?“ (Můžu si…?) + základní tvar slovesa. „Try on“ znamená vyzkoušet si oblečení — „this“ se vkládá mezi „try“ a „on“.',
    parts: [
      { type: 'text', en: 'Can I ', cz: 'Můžu si ', phonetic: 'ken aj ' },
      {
        type: 'slot',
        options: [
          { en: 'try this on', cz: 'tohle vyzkoušet', phonetic: 'traj dis on' },
          { en: 'return this tomorrow', cz: 'tohle zítra vrátit', phonetic: 'ritérn dis tumorou' },
          { en: 'get a paper bag', cz: 'vzít papírovou tašku', phonetic: 'get e pejpr beg' }
        ]
      },
      { type: 'text', en: '?', cz: '?', phonetic: '?' }
    ]
  },

  // Letiště a navigace
  {
    id: 'tpl-air-1',
    topic: 'airport',
    tip: '„How do I get to…?“ (Jak se dostanu do/na…?) je nejlepší navigační věta. Sloveso „get to“ znamená „dostat se někam“.',
    parts: [
      { type: 'text', en: 'Excuse me, how do I get to ', cz: 'Promiňte, jak se dostanu na ', phonetic: 'ikskjúz mí, hau dú aj get tu ' },
      {
        type: 'slot',
        options: [
          { en: 'the city centre', cz: 'centrum města', phonetic: 'de siti sentr' },
          { en: 'terminal two', cz: 'terminál dva', phonetic: 'términl tú' },
          { en: 'the train station', cz: 'vlakové nádraží', phonetic: 'de trejn stejšn' }
        ]
      },
      { type: 'text', en: '?', cz: '?', phonetic: '?' }
    ]
  },
  {
    id: 'tpl-air-2',
    topic: 'airport',
    tip: 'Na jízdní řády se ptáme přítomným časem s „does“ (protože bus/train/ferry je jednotné číslo). Sloveso „leave“ (odjíždět) stojí na konci.',
    parts: [
      { type: 'text', en: 'When does the next ', cz: 'Kdy jede další ', phonetic: 'ven daz de nekst ' },
      {
        type: 'slot',
        options: [
          { en: 'bus', cz: 'autobus', phonetic: 'bas' },
          { en: 'train', cz: 'vlak', phonetic: 'trejn' },
          { en: 'ferry', cz: 'trajekt', phonetic: 'feri' }
        ]
      },
      { type: 'text', en: ' leave?', cz: '?', phonetic: ' lív?' }
    ]
  },
  {
    id: 'tpl-air-3',
    topic: 'airport',
    tip: 'Otázka se slovesem „být“ (is) se tvoří jednoduše prohozením: „This seat is free“ → „Is this seat free?“.',
    parts: [
      { type: 'text', en: 'Is this seat ', cz: 'Je tohle místo ', phonetic: 'iz dis sít ' },
      {
        type: 'slot',
        options: [
          { en: 'free', cz: 'volné', phonetic: 'frí' },
          { en: 'taken', cz: 'obsazené', phonetic: 'tejkn' },
          { en: 'reserved', cz: 'rezervované', phonetic: 'rizérvd' }
        ]
      },
      { type: 'text', en: '?', cz: '?', phonetic: '?' }
    ]
  },

  // Řešení problémů
  {
    id: 'tpl-prob-1',
    topic: 'problems',
    tip: '„Is not working“ (nefunguje) má na konci -ing, protože popisuje aktuální poruchu právě teď. Zkráceně lze říct i „isn’t working“.',
    parts: [
      { type: 'text', en: 'Sorry, ', cz: 'Promiňte, ', phonetic: 'sori, ' },
      {
        type: 'slot',
        options: [
          { en: 'the Wi-Fi', cz: 'Wi-Fi', phonetic: 'de waj-faj' },
          { en: 'the air conditioning', cz: 'klimatizace', phonetic: 'de ér kondišnin' },
          { en: 'the hot water', cz: 'teplá voda', phonetic: 'de hot vótr' }
        ]
      },
      { type: 'text', en: ' is not working.', cz: ' nefunguje.', phonetic: ' iz not vérkin.' }
    ]
  },
  {
    id: 'tpl-prob-2',
    topic: 'problems',
    tip: '„Could you speak…?“ (Mohl byste mluvit…?) je velmi zdvořilá prosba. „More slowly“ = pomaleji, „a bit louder“ = trochu hlasitěji.',
    parts: [
      { type: 'text', en: 'Could you speak ', cz: 'Mohl byste mluvit ', phonetic: 'kud jů spík ' },
      {
        type: 'slot',
        options: [
          { en: 'more slowly', cz: 'pomaleji', phonetic: 'mór slouli' },
          { en: 'a bit louder', cz: 'trochu hlasitěji', phonetic: 'e bit laudr' },
          { en: 'simpler English', cz: 'jednodušší angličtinou', phonetic: 'simplr ingliš' }
        ]
      },
      { type: 'text', en: ', please?', cz: ', prosím?', phonetic: ', plíz?' }
    ]
  },
  {
    id: 'tpl-prob-3',
    topic: 'problems',
    tip: '„I need help with…“ (Potřebuji pomoc s…) je jedna z nejužitečnějších nouzových vět. „Luggage“ (zavazadlo) je nepočitatelné — nikdy nemá -s.',
    parts: [
      { type: 'text', en: 'I need help with ', cz: 'Potřebuji pomoc s ', phonetic: 'aj níd help vis ' },
      {
        type: 'slot',
        options: [
          { en: 'my car', cz: 'mým autem', phonetic: 'maj kár' },
          { en: 'my reservation', cz: 'mojí rezervací', phonetic: 'maj rezervejšn' },
          { en: 'my luggage', cz: 'mým zavazadlem', phonetic: 'maj lagidž' }
        ]
      },
      { type: 'text', en: '.', cz: '.', phonetic: '.' }
    ]
  },
  ...EXTRA_TEMPLATES
];
