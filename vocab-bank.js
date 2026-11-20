/**
 * Vizuální banka nejpoužívanějších slovíček (tématické balíčky A1–B1).
 * Každé slovíčko má odpovídající obrázek (ikonu), čistě českou výslovnost a překlad.
 */
export const VOCAB_PACKS = [
  {
    id: 'pack-travel',
    topic: 'airport',
    title: 'Doprava a cestování',
    icon: '✈️',
    color: '#ede9fe',
    words: [
      { en: 'airport', cz: 'letiště', phonetic: '[érpórt]', img: '🛫' },
      { en: 'ticket', cz: 'jízdenka / letenka', phonetic: '[tikit]', img: '🎫' },
      { en: 'passport', cz: 'cestovní pas', phonetic: '[páspórt]', img: '🛂' },
      { en: 'suitcase', cz: 'kufr', phonetic: '[sútkejs]', img: '🧳' },
      { en: 'train', cz: 'vlak', phonetic: '[trejn]', img: '🚆' },
      { en: 'bus', cz: 'autobus', phonetic: '[bas]', img: '🚌' },
      { en: 'car', cz: 'auto', phonetic: '[kár]', img: '🚗' },
      { en: 'ferry', cz: 'trajekt', phonetic: '[feri]', img: '⛴️' },
      { en: 'map', cz: 'mapa', phonetic: '[mep]', img: '🗺️' },
      { en: 'bridge', cz: 'most', phonetic: '[bridž]', img: '🌉' },
      { en: 'station', cz: 'nádraží / stanice', phonetic: '[stejšn]', img: '🚉' },
      { en: 'seat', cz: 'sedadlo / místo', phonetic: '[sít]', img: '💺' },
      { en: 'exit', cz: 'východ', phonetic: '[egzit]', img: '🚪' },
      { en: 'luggage', cz: 'zavazadla', phonetic: '[lagidž]', img: '🎒' },
      { en: 'fuel', cz: 'palivo', phonetic: '[fjúl]', img: '⛽' }
    ]
  },
  {
    id: 'pack-camping',
    topic: 'camping',
    title: 'Kemp, příroda a počasí',
    icon: '⛺',
    color: '#ccfbf1',
    words: [
      { en: 'tent', cz: 'stan', phonetic: '[tent]', img: '⛺' },
      { en: 'campervan', cz: 'obytné auto', phonetic: '[kemprven]', img: '🚐' },
      { en: 'beach', cz: 'pláž', phonetic: '[bíč]', img: '🏖️' },
      { en: 'sea', cz: 'moře', phonetic: '[sí]', img: '🌊' },
      { en: 'mountain', cz: 'hora', phonetic: '[mauntn]', img: '🏔️' },
      { en: 'forest', cz: 'les', phonetic: '[forist]', img: '🌲' },
      { en: 'sun', cz: 'slunce', phonetic: '[san]', img: '☀️' },
      { en: 'rain', cz: 'déšť', phonetic: '[rejn]', img: '🌧️' },
      { en: 'wind', cz: 'vítr', phonetic: '[vind]', img: '💨' },
      { en: 'shade', cz: 'stín', phonetic: '[šejd]', img: '⛱️' },
      { en: 'fire', cz: 'oheň', phonetic: '[fajr]', img: '🔥' },
      { en: 'electricity', cz: 'elektřina', phonetic: '[ilektrisiti]', img: '🔌' },
      { en: 'shower', cz: 'sprcha', phonetic: '[šaur]', img: '🚿' },
      { en: 'key', cz: 'klíč', phonetic: '[kí]', img: '🔑' },
      { en: 'night', cz: 'noc', phonetic: '[najt]', img: '🌙' }
    ]
  },
  {
    id: 'pack-food',
    topic: 'restaurant',
    title: 'Jídlo a pití',
    icon: '🍽️',
    color: '#fef3c7',
    words: [
      { en: 'water', cz: 'voda', phonetic: '[vótr]', img: '💧' },
      { en: 'coffee', cz: 'káva', phonetic: '[kofi]', img: '☕' },
      { en: 'tea', cz: 'čaj', phonetic: '[tí]', img: '🍵' },
      { en: 'beer', cz: 'pivo', phonetic: '[bír]', img: '🍺' },
      { en: 'wine', cz: 'víno', phonetic: '[vajn]', img: '🍷' },
      { en: 'bread', cz: 'chléb / pečivo', phonetic: '[bred]', img: '🍞' },
      { en: 'cheese', cz: 'sýr', phonetic: '[číz]', img: '🧀' },
      { en: 'meat', cz: 'maso', phonetic: '[mít]', img: '🥩' },
      { en: 'fish', cz: 'ryba', phonetic: '[fiš]', img: '🐟' },
      { en: 'chicken', cz: 'kuře', phonetic: '[čikin]', img: '🍗' },
      { en: 'salad', cz: 'salát', phonetic: '[seled]', img: '🥗' },
      { en: 'soup', cz: 'polévka', phonetic: '[súp]', img: '🍲' },
      { en: 'fruit', cz: 'ovoce', phonetic: '[frút]', img: '🍎' },
      { en: 'ice cream', cz: 'zmrzlina', phonetic: '[ajs krím]', img: '🍦' },
      { en: 'breakfast', cz: 'snídaně', phonetic: '[brekfest]', img: '🥐' }
    ]
  },
  {
    id: 'pack-shopping',
    topic: 'shopping',
    title: 'Nákupy a peníze',
    icon: '🛍️',
    color: '#e0f2fe',
    words: [
      { en: 'shop', cz: 'obchod', phonetic: '[šop]', img: '🏪' },
      { en: 'price', cz: 'cena', phonetic: '[prajs]', img: '🏷️' },
      { en: 'cash', cz: 'hotovost', phonetic: '[keš]', img: '💵' },
      { en: 'card', cz: 'platební karta', phonetic: '[kárd]', img: '💳' },
      { en: 'receipt', cz: 'účtenka', phonetic: '[risít]', img: '🧾' },
      { en: 'bag', cz: 'taška', phonetic: '[beg]', img: '🛍️' },
      { en: 'discount', cz: 'sleva', phonetic: '[diskaunt]', img: '📉' },
      { en: 'size', cz: 'velikost', phonetic: '[sajz]', img: '📏' },
      { en: 'bottle', cz: 'láhev', phonetic: '[botl]', img: '🍾' },
      { en: 'open', cz: 'otevřeno', phonetic: '[oupn]', img: '🔓' },
      { en: 'closed', cz: 'zavřeno', phonetic: '[klouzd]', img: '🔒' },
      { en: 'cheap', cz: 'levný', phonetic: '[číp]', img: '🪙' },
      { en: 'expensive', cz: 'drahý', phonetic: '[ikspensiv]', img: '💎' },
      { en: 'gift', cz: 'dárek', phonetic: '[gift]', img: '🎁' },
      { en: 'change', cz: 'drobné / nazpět', phonetic: '[čejndž]', img: '💰' }
    ]
  },
  {
    id: 'pack-health',
    topic: 'problems',
    title: 'Zdraví a nouzové situace',
    icon: '🛟',
    color: '#fee2e2',
    words: [
      { en: 'doctor', cz: 'lékař', phonetic: '[doktr]', img: '🩺' },
      { en: 'pharmacy', cz: 'lékárna', phonetic: '[fármesi]', img: '💊' },
      { en: 'hospital', cz: 'nemocnice', phonetic: '[hospitl]', img: '🏥' },
      { en: 'police', cz: 'policie', phonetic: '[polís]', img: '🚓' },
      { en: 'help', cz: 'pomoc', phonetic: '[help]', img: '🆘' },
      { en: 'pain', cz: 'bolest', phonetic: '[pejn]', img: '🤕' },
      { en: 'fever', cz: 'horečka', phonetic: '[fívr]', img: '🤒' },
      { en: 'allergy', cz: 'alergie', phonetic: '[elerdži]', img: '🤧' },
      { en: 'insurance', cz: 'pojištění', phonetic: '[inšurens]', img: '📄' },
      { en: 'phone', cz: 'telefon', phonetic: '[foun]', img: '📱' },
      { en: 'battery', cz: 'baterie', phonetic: '[beteri]', img: '🔋' },
      { en: 'charger', cz: 'nabíječka', phonetic: '[čárdžr]', img: '🔌' },
      { en: 'broken', cz: 'rozbitý', phonetic: '[broukn]', img: '🔧' },
      { en: 'lost', cz: 'ztracený', phonetic: '[lost]', img: '❓' },
      { en: 'danger', cz: 'nebezpečí', phonetic: '[dejndžr]', img: '⚠️' }
    ]
  },
  {
    id: 'pack-verbs',
    topic: 'airport',
    title: 'Nejdůležitější slovesa',
    icon: '⚡',
    color: '#f3e8ff',
    words: [
      { en: 'go', cz: 'jít / jet', phonetic: '[gou]', img: '🚶' },
      { en: 'come', cz: 'přijít', phonetic: '[kam]', img: '👋' },
      { en: 'want', cz: 'chtít', phonetic: '[vont]', img: '🙋' },
      { en: 'need', cz: 'potřebovat', phonetic: '[níd]', img: '❗' },
      { en: 'have', cz: 'mít', phonetic: '[hev]', img: '🤲' },
      { en: 'buy', cz: 'koupit', phonetic: '[baj]', img: '🛒' },
      { en: 'pay', cz: 'zaplatit', phonetic: '[pej]', img: '💳' },
      { en: 'eat', cz: 'jíst', phonetic: '[ít]', img: '🍴' },
      { en: 'drink', cz: 'pít', phonetic: '[drink]', img: '🥤' },
      { en: 'sleep', cz: 'spát', phonetic: '[slíp]', img: '😴' },
      { en: 'find', cz: 'najít', phonetic: '[fajnd]', img: '🔍' },
      { en: 'wait', cz: 'čekat', phonetic: '[vejt]', img: '⏳' },
      { en: 'stop', cz: 'zastavit', phonetic: '[stop]', img: '🛑' },
      { en: 'understand', cz: 'rozumět', phonetic: '[andrstend]', img: '💡' },
      { en: 'speak', cz: 'mluvit', phonetic: '[spík]', img: '🗣️' }
    ]
  },
  {
    id: 'pack-time',
    topic: 'airport',
    title: 'Čas, dny a směry',
    icon: '🕒',
    color: '#e0e7ff',
    words: [
      { en: 'today', cz: 'dnes', phonetic: '[tudej]', img: '📅' },
      { en: 'tomorrow', cz: 'zítra', phonetic: '[tumorou]', img: '🌅' },
      { en: 'yesterday', cz: 'včera', phonetic: '[jestrdej]', img: '⏪' },
      { en: 'now', cz: 'teď', phonetic: '[nau]', img: '⏱️' },
      { en: 'later', cz: 'později', phonetic: '[lejtr]', img: '🕒' },
      { en: 'morning', cz: 'ráno', phonetic: '[mórnin]', img: '🌄' },
      { en: 'evening', cz: 'večer', phonetic: '[ívnin]', img: '🌆' },
      { en: 'left', cz: 'vlevo', phonetic: '[left]', img: '⬅️' },
      { en: 'right', cz: 'vpravo', phonetic: '[rajt]', img: '➡️' },
      { en: 'straight', cz: 'rovně', phonetic: '[strejt]', img: '⬆️' },
      { en: 'here', cz: 'tady', phonetic: '[hír]', img: '📍' },
      { en: 'there', cz: 'tam', phonetic: '[dér]', img: '👉' },
      { en: 'near', cz: 'blízko', phonetic: '[nír]', img: '🤏' },
      { en: 'far', cz: 'daleko', phonetic: '[fár]', img: '🔭' },
      { en: 'hour', cz: 'hodina', phonetic: '[aur]', img: '⌛' }
    ]
  },
  {
    id: 'pack-adjectives',
    topic: 'restaurant',
    title: 'Užitečná přídavná jména',
    icon: '🎨',
    color: '#fce7f3',
    words: [
      { en: 'good', cz: 'dobrý', phonetic: '[gud]', img: '👍' },
      { en: 'bad', cz: 'špatný', phonetic: '[bed]', img: '👎' },
      { en: 'big', cz: 'velký', phonetic: '[big]', img: '🐘' },
      { en: 'small', cz: 'malý', phonetic: '[smól]', img: '🐜' },
      { en: 'hot', cz: 'horký / pálivý', phonetic: '[hot]', img: '🔥' },
      { en: 'cold', cz: 'studený', phonetic: '[kould]', img: '❄️' },
      { en: 'clean', cz: 'čistý', phonetic: '[klín]', img: '✨' },
      { en: 'quiet', cz: 'tichý', phonetic: '[kvajet]', img: '🤫' },
      { en: 'fast', cz: 'rychlý', phonetic: '[fást]', img: '⚡' },
      { en: 'slow', cz: 'pomalý', phonetic: '[slou]', img: '🐢' },
      { en: 'free', cz: 'volný / zdarma', phonetic: '[frí]', img: '🆓' },
      { en: 'full', cz: 'plný', phonetic: '[ful]', img: '🔋' },
      { en: 'new', cz: 'nový', phonetic: '[njú]', img: '🆕' },
      { en: 'old', cz: 'starý', phonetic: '[ould]', img: '🏛️' },
      { en: 'ready', cz: 'připravený', phonetic: '[redi]', img: '✅' }
    ]
  }
];
