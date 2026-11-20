export const TOPICS = [
  { id: 'camping', label: 'Kempování a cestování autem', shortLabel: 'Kemp & auto', icon: '⛺' },
  { id: 'restaurant', label: 'Restaurace a jídlo', shortLabel: 'Restaurace', icon: '🍽️' },
  { id: 'shopping', label: 'Nákupy', shortLabel: 'Nákupy', icon: '🛍️' },
  { id: 'airport', label: 'Letiště a navigace', shortLabel: 'Letiště', icon: '✈️' },
  { id: 'problems', label: 'Řešení problémů', shortLabel: 'Problémy', icon: '🛟' }
];

/**
 * 30 praktických cestovatelských frází (6 pro každé z 5 témat)
 * Předvyplněno při prvním spuštění aplikace.
 */
export const INITIAL_PHRASES = [
  // 1. Kempování a cestování autem (6)
  {
    id: 'init-camp-1',
    topic: 'camping',
    cz: 'Mohli bychom dostat místo pro stan s elektřinou?',
    en: 'Could we get a pitch with electricity?',
    phonetic: '[kud wí get e pič wið ilektrisiti?]'
  },
  {
    id: 'init-camp-2',
    topic: 'camping',
    cz: 'Kde se dá vypustit odpadní voda z karavanu?',
    en: 'Where can we empty the grey water?',
    phonetic: '[wér ken wí empti ðə grej wótr?]'
  },
  {
    id: 'init-camp-3',
    topic: 'camping',
    cz: 'Je tu pitná voda k doplnění nádrže?',
    en: 'Is there drinking water to fill the tank?',
    phonetic: '[iz ðér drinkin wótr tu fil ðə tenk?]'
  },
  {
    id: 'init-camp-4',
    topic: 'camping',
    cz: 'Potřebujeme plnou nádrž benzínu, prosím.',
    en: 'We need a full tank of petrol, please.',
    phonetic: '[wí níd e ful tenk of petrol, plíz.]'
  },
  {
    id: 'init-camp-5',
    topic: 'camping',
    cz: 'Smíme tady přespat na jednu noc?',
    en: 'Are we allowed to stay overnight here?',
    phonetic: '[ár wí elaud tu stej ouvrnajt hír?]'
  },
  {
    id: 'init-camp-6',
    topic: 'camping',
    cz: 'Kde najdeme sprchy a záchody?',
    en: 'Where can we find the showers and toilets?',
    phonetic: '[wér ken wí fajnd ðə šaurz end tojlits?]'
  },

  // 2. Restaurace a jídlo (6)
  {
    id: 'init-rest-1',
    topic: 'restaurant',
    cz: 'Měli bychom zájem o stůl pro dva venku.',
    en: 'We would like a table for two outside.',
    phonetic: '[wí wud lajk e tejbl fór tú autsajd.]'
  },
  {
    id: 'init-rest-2',
    topic: 'restaurant',
    cz: 'Můžeme dostat jídelní lístek v angličtině?',
    en: 'Can we have the menu in English, please?',
    phonetic: '[ken wí hev ðə menjú in ingliš, plíz?]'
  },
  {
    id: 'init-rest-3',
    topic: 'restaurant',
    cz: 'Co byste nám doporučil z místních jídel?',
    en: 'What local dish would you recommend?',
    phonetic: '[wot loukl diš wud jů rekomend?]'
  },
  {
    id: 'init-rest-4',
    topic: 'restaurant',
    cz: 'Poprosíme účet, budeme platit kartou.',
    en: 'Could we have the bill? We will pay by card.',
    phonetic: '[kud wí hev ðə bil? wí wil pej baj kárd.]'
  },
  {
    id: 'init-rest-5',
    topic: 'restaurant',
    cz: 'Jsem alergický na ořechy, je to v tom jídle?',
    en: 'I am allergic to nuts, is it in this dish?',
    phonetic: '[aj em elérdžik tu nats, iz it in ðis diš?]'
  },
  {
    id: 'init-rest-6',
    topic: 'restaurant',
    cz: 'Dáme si dvě kávy s sebou, prosím.',
    en: 'Two coffees to take away, please.',
    phonetic: '[tú kofíz tu tejk ewej, plíz.]'
  },

  // 3. Nákupy (6)
  {
    id: 'init-shop-1',
    topic: 'shopping',
    cz: 'Kolik tohle stojí dohromady?',
    en: 'How much does this cost altogether?',
    phonetic: '[hau mač daz ðis kost óltugeðr?]'
  },
  {
    id: 'init-shop-2',
    topic: 'shopping',
    cz: 'Máte tohle ve větší velikosti?',
    en: 'Do you have this in a larger size?',
    phonetic: '[dú jů hev ðis in e lárdžr sajz?]'
  },
  {
    id: 'init-shop-3',
    topic: 'shopping',
    cz: 'Jen se dívám, děkuji za pomoc.',
    en: 'I am just looking, thank you for your help.',
    phonetic: '[aj em džast lukin, θenk jů fór jór help.]'
  },
  {
    id: 'init-shop-4',
    topic: 'shopping',
    cz: 'Berete bezkontaktní karty nebo jen hotovost?',
    en: 'Do you take contactless cards or only cash?',
    phonetic: '[dú jů tejk kontektles kárdz ór ounli keš?]'
  },
  {
    id: 'init-shop-5',
    topic: 'shopping',
    cz: 'Můžu dostat účtenku a tašku, prosím?',
    en: 'Could I get a receipt and a bag, please?',
    phonetic: '[kud aj get e risít end e beg, plíz?]'
  },
  {
    id: 'init-shop-6',
    topic: 'shopping',
    cz: 'Kde najdu nejbližší obchod s potravinami?',
    en: 'Where is the nearest grocery store?',
    phonetic: '[wér iz ðə nírist grousri stór?]'
  },

  // 4. Letiště a navigace (6)
  {
    id: 'init-air-1',
    topic: 'airport',
    cz: 'Kde je odbavení pro tento let?',
    en: 'Where is the check-in desk for this flight?',
    phonetic: '[wér iz ðə ček-in desk fór ðis flajt?]'
  },
  {
    id: 'init-air-2',
    topic: 'airport',
    cz: 'Kterým směrem je nástupní brána číslo pět?',
    en: 'Which way is boarding gate number five?',
    phonetic: '[wič wej iz bórdin gejt nambr fajv?]'
  },
  {
    id: 'init-air-3',
    topic: 'airport',
    cz: 'Jede tenhle autobus do centra města?',
    en: 'Does this bus go to the city centre?',
    phonetic: '[daz ðis bas gou tu ðə siti sentr?]'
  },
  {
    id: 'init-air-4',
    topic: 'airport',
    cz: 'Můžete mi to ukázat na mapě, prosím?',
    en: 'Could you show me on the map, please?',
    phonetic: '[kud jů šou mí on ðə mep, plíz?]'
  },
  {
    id: 'init-air-5',
    topic: 'airport',
    cz: 'Kolik času trvá cesta pěšky na nádraží?',
    en: 'How long does it take to walk to the station?',
    phonetic: '[hau long daz it tejk tu wók tu ðə stejšn?]'
  },
  {
    id: 'init-air-6',
    topic: 'airport',
    cz: 'Potřebuji si koupit zpáteční jízdenku.',
    en: 'I need to buy a return ticket.',
    phonetic: '[aj níd tu baj e ritérn tikit.]'
  },

  // 5. Řešení problémů (6)
  {
    id: 'init-prob-1',
    topic: 'problems',
    cz: 'Promiňte, ale tohle nefunguje správně.',
    en: 'Excuse me, but this is not working properly.',
    phonetic: '[ikskjúz mí, bat ðis iz not wérkin proprli.]'
  },
  {
    id: 'init-prob-2',
    topic: 'problems',
    cz: 'Píchli jsme pneumatiku, potřebujeme odtah.',
    en: 'We have a flat tyre and need roadside assistance.',
    phonetic: '[wí hev e flet tajr end níd roudsajd esistns.]'
  },
  {
    id: 'init-prob-3',
    topic: 'problems',
    cz: 'Ztratil jsem kufr, kde ho můžu nahlásit?',
    en: 'I lost my suitcase, where can I report it?',
    phonetic: '[aj lost maj sútkejs, wér ken aj ripórt it?]'
  },
  {
    id: 'init-prob-4',
    topic: 'problems',
    cz: 'Můžete mi prosím napsat adresu na papír?',
    en: 'Could you write the address down for me, please?',
    phonetic: '[kud jů rajt ðə edres daun fór mí, plíz?]'
  },
  {
    id: 'init-prob-5',
    topic: 'problems',
    cz: 'Potřebuji lékárnu, mám horečku.',
    en: 'I need a pharmacy, I have a fever.',
    phonetic: '[aj níd e fármesi, aj hev e fívr.]'
  },
  {
    id: 'init-prob-6',
    topic: 'problems',
    cz: 'Můžeme si pokoj vyměnit za tišší?',
    en: 'Could we change to a quieter room?',
    phonetic: '[kud wí čejndž tu e kwajtr rúm?]'
  }
];

/**
 * Interaktivní šablony pro Stavebnici (režim Šablony).
 * Každá šablona má části: statický text nebo slot s variantami.
 */
export const SENTENCE_TEMPLATES = [
  // Kempování a cestování autem
  {
    id: 'tpl-camp-1',
    topic: 'camping',
    parts: [
      { type: 'text', en: 'Could we get a pitch ', cz: 'Mohli bychom dostat místo ', phonetic: 'kud wí get e pič ' },
      {
        type: 'slot',
        options: [
          { en: 'with electricity', cz: 's elektřinou', phonetic: 'wið ilektrisiti' },
          { en: 'near the beach', cz: 'blízko pláže', phonetic: 'nír ðə bíč' },
          { en: 'in the shade', cz: 've stínu', phonetic: 'in ðə šejd' }
        ]
      },
      { type: 'text', en: '?', cz: '?', phonetic: '?' }
    ]
  },
  {
    id: 'tpl-camp-2',
    topic: 'camping',
    parts: [
      { type: 'text', en: 'We are staying for ', cz: 'Zůstáváme na ', phonetic: 'wí ár stej-in fór ' },
      {
        type: 'slot',
        options: [
          { en: 'two nights', cz: 'dvě noci', phonetic: 'tú najts' },
          { en: 'one week', cz: 'jeden týden', phonetic: 'wan wík' },
          { en: 'just tonight', cz: 'jen dnešní noc', phonetic: 'džast tunajt' }
        ]
      },
      { type: 'text', en: ' with ', cz: ' s ', phonetic: ' wið ' },
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
    parts: [
      { type: 'text', en: 'Where can we ', cz: 'Kde můžeme ', phonetic: 'wér ken wí ' },
      {
        type: 'slot',
        options: [
          { en: 'fill up fresh water', cz: 'doplnit čistou vodu', phonetic: 'fil ap freš wótr' },
          { en: 'plug in the cable', cz: 'zapojit kabel', phonetic: 'plag in ðə kejbl' },
          { en: 'park for the night', cz: 'zaparkovat přes noc', phonetic: 'párk fór ðə najt' }
        ]
      },
      { type: 'text', en: '?', cz: '?', phonetic: '?' }
    ]
  },

  // Restaurace a jídlo
  {
    id: 'tpl-rest-1',
    topic: 'restaurant',
    parts: [
      { type: 'text', en: 'Could we have a table ', cz: 'Mohli bychom dostat stůl ', phonetic: 'kud wí hev e tejbl ' },
      {
        type: 'slot',
        options: [
          { en: 'for two', cz: 'pro dva', phonetic: 'fór tú' },
          { en: 'for four', cz: 'pro čtyři', phonetic: 'fór fór' },
          { en: 'by the window', cz: 'u okna', phonetic: 'baj ðə windou' }
        ]
      },
      { type: 'text', en: ' ', cz: ' ', phonetic: ' ' },
      {
        type: 'slot',
        options: [
          { en: 'outside', cz: 'venku', phonetic: 'autsajd' },
          { en: 'in the shade', cz: 've stínu', phonetic: 'in ðə šejd' },
          { en: 'please', cz: 'prosím', phonetic: 'plíz' }
        ]
      },
      { type: 'text', en: '?', cz: '?', phonetic: '?' }
    ]
  },
  {
    id: 'tpl-rest-2',
    topic: 'restaurant',
    parts: [
      { type: 'text', en: 'I would like ', cz: 'Dal bych si ', phonetic: 'aj wud lajk ' },
      {
        type: 'slot',
        options: [
          { en: 'sparkling water', cz: 'perlivou vodu', phonetic: 'spárklin wótr' },
          { en: 'still water', cz: 'neperlivou vodu', phonetic: 'stil wótr' },
          { en: 'a local beer', cz: 'místní pivo', phonetic: 'e loukl bír' }
        ]
      },
      { type: 'text', en: ' without ', cz: ' bez ', phonetic: ' wiðaut ' },
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
    parts: [
      { type: 'text', en: 'Can we pay ', cz: 'Můžeme zaplatit ', phonetic: 'ken wí pej ' },
      {
        type: 'slot',
        options: [
          { en: 'by card', cz: 'kartou', phonetic: 'baj kárd' },
          { en: 'in cash', cz: 'hotově', phonetic: 'in keš' },
          { en: 'separately', cz: 'zvlášť', phonetic: 'seprətli' }
        ]
      },
      { type: 'text', en: ', please?', cz: ', prosím?', phonetic: ', plíz?' }
    ]
  },

  // Nákupy
  {
    id: 'tpl-shop-1',
    topic: 'shopping',
    parts: [
      { type: 'text', en: 'Do you have this in ', cz: 'Máte tohle v ', phonetic: 'dú jů hev ðis in ' },
      {
        type: 'slot',
        options: [
          { en: 'a smaller size', cz: 'menší velikosti', phonetic: 'e smólr sajz' },
          { en: 'a larger size', cz: 'větší velikosti', phonetic: 'e lárdžr sajz' },
          { en: 'another colour', cz: 'jiné barvě', phonetic: 'enaðr kalr' }
        ]
      },
      { type: 'text', en: '?', cz: '?', phonetic: '?' }
    ]
  },
  {
    id: 'tpl-shop-2',
    topic: 'shopping',
    parts: [
      { type: 'text', en: 'How much is ', cz: 'Kolik stojí ', phonetic: 'hau mač iz ' },
      {
        type: 'slot',
        options: [
          { en: 'one kilo of this', cz: 'jedno kilo tohohle', phonetic: 'wan kílou of ðis' },
          { en: 'this bottle', cz: 'tahle láhev', phonetic: 'ðis botl' },
          { en: 'the whole set', cz: 'celá sada', phonetic: 'ðə houl set' }
        ]
      },
      { type: 'text', en: '?', cz: '?', phonetic: '?' }
    ]
  },
  {
    id: 'tpl-shop-3',
    topic: 'shopping',
    parts: [
      { type: 'text', en: 'Can I ', cz: 'Můžu si ', phonetic: 'ken aj ' },
      {
        type: 'slot',
        options: [
          { en: 'try this on', cz: 'tohle vyzkoušet', phonetic: 'traj ðis on' },
          { en: 'return this tomorrow', cz: 'tohle zítra vrátit', phonetic: 'ritérn ðis tumorou' },
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
    parts: [
      { type: 'text', en: 'Excuse me, how do I get to ', cz: 'Promiňte, jak se dostanu na ', phonetic: 'ikskjúz mí, hau dú aj get tu ' },
      {
        type: 'slot',
        options: [
          { en: 'the city centre', cz: 'centrum města', phonetic: 'ðə siti sentr' },
          { en: 'terminal two', cz: 'terminál dva', phonetic: 'términl tú' },
          { en: 'the train station', cz: 'vlakové nádraží', phonetic: 'ðə trejn stejšn' }
        ]
      },
      { type: 'text', en: '?', cz: '?', phonetic: '?' }
    ]
  },
  {
    id: 'tpl-air-2',
    topic: 'airport',
    parts: [
      { type: 'text', en: 'When does the next ', cz: 'Kdy jede další ', phonetic: 'wen daz ðə nekst ' },
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
    parts: [
      { type: 'text', en: 'Is this seat ', cz: 'Je tohle místo ', phonetic: 'iz ðis sít ' },
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
    parts: [
      { type: 'text', en: 'Sorry, ', cz: 'Promiňte, ', phonetic: 'sori, ' },
      {
        type: 'slot',
        options: [
          { en: 'the Wi-Fi', cz: 'Wi-Fi', phonetic: 'ðə waj-faj' },
          { en: 'the air conditioning', cz: 'klimatizace', phonetic: 'ðə ér kondišnin' },
          { en: 'the hot water', cz: 'teplá voda', phonetic: 'ðə hot wótr' }
        ]
      },
      { type: 'text', en: ' is not working.', cz: ' nefunguje.', phonetic: ' iz not wérkin.' }
    ]
  },
  {
    id: 'tpl-prob-2',
    topic: 'problems',
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
    parts: [
      { type: 'text', en: 'I need help with ', cz: 'Potřebuji pomoc s ', phonetic: 'aj níd help wið ' },
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
  }
];
