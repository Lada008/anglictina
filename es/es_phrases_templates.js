// Fráze a šablony pro jazyk: Španělština (ES)
export const PHRASES_ES = [
  {
    "id": "es-gen-1",
    "topic": "general",
    "cz": "Dobrý den, jak se máte?",
    "target": "Hola, buenos días. ¿Qué tal?",
    "phonetic": "[ola, buenos días. ké tal?]",
    "tip": "„¿Qué tal?“ je univerzální a přátelské „Jak to jde / Jak se máte?“."
  },
  {
    "id": "es-gen-2",
    "topic": "general",
    "cz": "Promiňte, nemluvím dobře španělsky.",
    "target": "Perdone, no hablo bien español.",
    "phonetic": "[perdone, no ablo bjen espaňol.]",
    "tip": "Písmeno „h“ se ve španělštině nikdy nevyslovuje („hablo“ = [ablo])."
  },
  {
    "id": "es-gen-3",
    "topic": "general",
    "cz": "Můžete mluvit pomaleji, prosím?",
    "target": "¿Puede hablar más despacio, por favor?",
    "phonetic": "[puede ablár más despasio, por favór?]",
    "tip": "„Más despacio“ = pomaleji, „por favor“ = prosím."
  },
  {
    "id": "es-gen-4",
    "topic": "general",
    "cz": "Moc děkuji.",
    "target": "Muchas gracias.",
    "phonetic": "[mučas grasias.]",
    "tip": "Odpověď na poděkování je „De nada“ (není zač)."
  },
  {
    "id": "es-camp-1",
    "topic": "camping",
    "cz": "Máte volné místo s elektřinou?",
    "target": "¿Tienen una parcela con electricidad?",
    "phonetic": "[tjenen una parsela kon elektrisidad?]",
    "tip": "„Parcela“ je parcela/místo v kempu."
  },
  {
    "id": "es-camp-2",
    "topic": "camping",
    "cz": "Kde je nejbližší pláž?",
    "target": "¿Dónde está la playa más cercana?",
    "phonetic": "[donde está la plaja más serkana?]",
    "tip": "„¿Dónde está…?“ se používá pro polohu míst a budov (Kde se nachází…?)."
  },
  {
    "id": "es-camp-3",
    "topic": "camping",
    "cz": "Potřebuji plnou nádrž nafty, prosím.",
    "target": "Lleno de diésel, por favor.",
    "phonetic": "[jeno de díesel, por favór.]",
    "tip": "Dvojité „ll“ se čte jako české „j“ (lleno = [jeno] = plný)."
  },
  {
    "id": "es-rest-1",
    "topic": "restaurant",
    "cz": "Stůl pro dva na terase, prosím.",
    "target": "Una mesa para dos en la terraza, por favor.",
    "phonetic": "[una mesa para dos en la terasa, por favór.]",
    "tip": "„Mesa“ = stůl, „terraza“ = zahrádka / terasa."
  },
  {
    "id": "es-rest-2",
    "topic": "restaurant",
    "cz": "Účet, prosím. Zaplatíme kartou.",
    "target": "La cuenta, por favor. Pagamos con tarjeta.",
    "phonetic": "[la kuenta, por favór. pagamos kon tarcheta.]",
    "tip": "„La cuenta“ je účet v restauraci. „J“ se čte jako chraplavé „ch“ (tarjeta = [tarcheta])."
  },
  {
    "id": "es-rest-3",
    "topic": "restaurant",
    "cz": "Dáme si dvě kávy s mlékem a vodu.",
    "target": "Dos cafés con leche y un agua, por favor.",
    "phonetic": "[dos kafés kon leče i un agua, por favór.]",
    "tip": "„Café con leche“ je klasická káva s mlékem."
  },
  {
    "id": "es-shop-1",
    "topic": "shopping",
    "cz": "Kolik tohle stojí?",
    "target": "¿Cuánto cuesta esto?",
    "phonetic": "[kuanto kuesta esto?]",
    "tip": "„¿Cuánto cuesta…?“ = Kolik stojí…?"
  },
  {
    "id": "es-shop-2",
    "topic": "shopping",
    "cz": "Potřebuji tašku, prosím.",
    "target": "Necesito una bolsa, por favor.",
    "phonetic": "[nesesito una bolsa, por favór.]",
    "tip": "„Bolsa“ je nákupní taška."
  },
  {
    "id": "es-air-1",
    "topic": "airport",
    "cz": "Kde je autobusová zastávka do centra?",
    "target": "¿Dónde está la parada de autobús al centro?",
    "phonetic": "[donde está la parada de autobús al sentro?]",
    "tip": "„Parada“ = zastávka."
  },
  {
    "id": "es-prob-1",
    "topic": "problems",
    "cz": "Potřebuji lékárnu, není mi dobře.",
    "target": "Necesito una farmacia, no me encuentro bien.",
    "phonetic": "[nesesito una farmasia, no me enkuentro bjen.]",
    "tip": "„Farmacia“ je lékárna."
  }
];

export const TEMPLATES_ES = [
  {
    "id": "es-tpl-1",
    "topic": "general",
    "tip": "„Quisiera…“ (Chtěl bych…) je zdvořilá forma od slovesa „querer“ (chtít). Funguje v každé situaci.",
    "parts": [
      {
        "type": "text",
        "target": "Hola, quisiera ",
        "cz": "Dobrý den, chtěl bych ",
        "phonetic": "ola, kisiera "
      },
      {
        "type": "slot",
        "options": [
          {
            "target": "comprar esto",
            "cz": "koupit tohle",
            "phonetic": "komprár esto"
          },
          {
            "target": "una mesa para dos",
            "cz": "stůl pro dva",
            "phonetic": "una mesa para dos"
          },
          {
            "target": "pagar con tarjeta",
            "cz": "zaplatit kartou",
            "phonetic": "pagár kon tarcheta"
          }
        ]
      },
      {
        "type": "text",
        "target": ", por favor.",
        "cz": ", prosím.",
        "phonetic": ", por favór."
      }
    ]
  },
  {
    "id": "es-tpl-2",
    "topic": "airport",
    "tip": "„¿Dónde está…?“ (Kde je…?) se používá pro hledání jakéhokoli místa.",
    "parts": [
      {
        "type": "text",
        "target": "Perdone, ¿dónde está ",
        "cz": "Promiňte, kde je ",
        "phonetic": "perdone, donde está "
      },
      {
        "type": "slot",
        "options": [
          {
            "target": "el baño",
            "cz": "záchod",
            "phonetic": "el baňo"
          },
          {
            "target": "la salida",
            "cz": "východ",
            "phonetic": "la salida"
          },
          {
            "target": "la estación de tren",
            "cz": "vlakového nádraží",
            "phonetic": "la estasión de tren"
          }
        ]
      },
      {
        "type": "text",
        "target": "?",
        "cz": "?",
        "phonetic": "?"
      }
    ]
  }
];
