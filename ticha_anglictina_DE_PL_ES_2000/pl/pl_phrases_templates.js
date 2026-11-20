// Fráze a šablony pro jazyk: Polština (PL)
export const PHRASES_PL = [
  {
    "id": "pl-gen-1",
    "topic": "general",
    "cz": "Dobrý den, jak se máte?",
    "target": "Dzień dobry, jak się Pan/Pani ma?",
    "phonetic": "[džjeň dobry, jak šje pan/pani ma?]",
    "tip": "Polština vyká přes „Pan“ (pán) a „Pani“ (paní). V běžné mluvě stačí „Dzień dobry!“."
  },
  {
    "id": "pl-gen-2",
    "topic": "general",
    "cz": "Promiňte, nerozumím. Můžete to zopakovat?",
    "target": "Przepraszam, nie rozumiem. Czy może Pan powtórzyć?",
    "phonetic": "[pšeprašam, ňe rozumjem. čy može pan poftužyč?]",
    "tip": "Polské „rz“ a „sz“ se čte jako české „š“ nebo „ž“ (po znělé souhlásce)."
  },
  {
    "id": "pl-gen-3",
    "topic": "general",
    "cz": "Moc děkuji za pomoc.",
    "target": "Bardzo dziękuję za pomoc.",
    "phonetic": "[bardzo džjenkuje za pomoc.]",
    "tip": "„Bardzo“ znamená „velmi / moc“."
  },
  {
    "id": "pl-gen-4",
    "topic": "general",
    "cz": "Jsme z České republiky.",
    "target": "Jesteśmy z Czech.",
    "phonetic": "[jestešmy z čech.]",
    "tip": "Poláci říkají Česku jednoduše „Czechy“ (z Czech)."
  },
  {
    "id": "pl-camp-1",
    "topic": "camping",
    "cz": "Máte volné místo pro auto se stanem a elektřinou?",
    "target": "Czy mają Państwo wolne miejsce z prądem?",
    "phonetic": "[čy majom państfo volne mjejsce z prondem?]",
    "tip": "„Prąd“ [pront] je elektřina / proud."
  },
  {
    "id": "pl-camp-2",
    "topic": "camping",
    "cz": "Kde jsou tady sprchy a toalety?",
    "target": "Gdzie są tutaj prysznice i toalety?",
    "phonetic": "[gdžje som tutaj pryšnice i toalety?]",
    "tip": "„Prysznic“ [pryšnic] je sprcha."
  },
  {
    "id": "pl-camp-3",
    "topic": "camping",
    "cz": "Kolik stojí jedna noc pro dvě osoby?",
    "target": "Ile kosztuje jedna noc dla dwóch osób?",
    "phonetic": "[ile koštuje jedna noc dla dvúch osúp?]",
    "tip": "„Ile kosztuje…?“ = Kolik stojí…?"
  },
  {
    "id": "pl-rest-1",
    "topic": "restaurant",
    "cz": "Poprosíme jídelní lístek a dvě piva.",
    "target": "Poprosimy kartę dań i dwa piwa.",
    "phonetic": "[poprosimy karte daň i dva piva.]",
    "tip": "„Karta dań“ je jídelní lístek. „Poprosimy“ = Poprosíme."
  },
  {
    "id": "pl-rest-2",
    "topic": "restaurant",
    "cz": "Můžeme zaplatit kartou? Poprosíme účet.",
    "target": "Czy można zapłacić kartą? Poprosimy rachunek.",
    "phonetic": "[čy možna zapuačič kartom? poprosimy rachunek.]",
    "tip": "Polské „ł“ se čte jako krátké „u“ nebo anglické „w“ (zapłacić = zapuačič)."
  },
  {
    "id": "pl-rest-3",
    "topic": "restaurant",
    "cz": "Bylo to moc dobré, děkujeme.",
    "target": "Było bardzo pyszne, dziękujemy.",
    "phonetic": "[byuo bardzo pyšne, džjenkujemy.]",
    "tip": "„Pyszne“ znamená v polštině „vynikající / mňam“ (nikoliv pyšné!)."
  },
  {
    "id": "pl-shop-1",
    "topic": "shopping",
    "cz": "Kolik to stojí dohromady?",
    "target": "Ile to kosztuje razem?",
    "phonetic": "[ile to koštuje razem?]",
    "tip": "„Razem“ znamená dohromady."
  },
  {
    "id": "pl-shop-2",
    "topic": "shopping",
    "cz": "Potřebuji účtenku a tašku, prosím.",
    "target": "Poproszę paragon i reklamówkę.",
    "phonetic": "[poproše paragon i reklamúfke.]",
    "tip": "„Paragon“ je v Polsku účtenka z pokladny, „reklamówka“ je igelitová taška."
  },
  {
    "id": "pl-air-1",
    "topic": "airport",
    "cz": "Kde je tady nejbližší parkoviště?",
    "target": "Gdzie jest tutaj najbliższy parking?",
    "phonetic": "[gdžje jest tutaj najbliššy parking?]",
    "tip": "„Gdzie jest…?“ = Kde je…?"
  },
  {
    "id": "pl-prob-1",
    "topic": "problems",
    "cz": "Promiňte, potřebuji lékárnu.",
    "target": "Przepraszam, potrzebuję apteki.",
    "phonetic": "[pšeprašam, potšebuje apteki.]",
    "tip": "„Apteka“ je lékárna."
  }
];

export const TEMPLATES_PL = [
  {
    "id": "pl-tpl-1",
    "topic": "general",
    "tip": "„Chciałbym…“ (říká muž) / „Chciałabym…“ (říká žena) znamená „Chtěl/a bych…“.",
    "parts": [
      {
        "type": "text",
        "target": "Dzień dobry, chciałbym ",
        "cz": "Dobrý den, chtěl bych ",
        "phonetic": "džjeň dobry, chčjaubym "
      },
      {
        "type": "slot",
        "options": [
          {
            "target": "to kupić",
            "cz": "tohle koupit",
            "phonetic": "to kupič"
          },
          {
            "target": "zapłacić kartą",
            "cz": "zaplatit kartou",
            "phonetic": "zapuačič kartom"
          },
          {
            "target": "zarezerwować miejsce",
            "cz": "rezervovat místo",
            "phonetic": "zarezervovač mjejsce"
          }
        ]
      },
      {
        "type": "text",
        "target": ".",
        "cz": ".",
        "phonetic": "."
      }
    ]
  },
  {
    "id": "pl-tpl-2",
    "topic": "restaurant",
    "tip": "„Poproszę…“ (Poprosím…) + 4. pád. V restauraci i obchodě naprosto nejpoužívanější slovo.",
    "parts": [
      {
        "type": "text",
        "target": "Poproszę ",
        "cz": "Poprosím ",
        "phonetic": "poproše "
      },
      {
        "type": "slot",
        "options": [
          {
            "target": "rachunek",
            "cz": "účet",
            "phonetic": "rachunek"
          },
          {
            "target": "wodę niegazowaną",
            "cz": "neperlivou vodu",
            "phonetic": "vode ňegazovanom"
          },
          {
            "target": "kawę z mlekiem",
            "cz": "kávu s mlékem",
            "phonetic": "kave z mlekjem"
          }
        ]
      },
      {
        "type": "text",
        "target": ".",
        "cz": ".",
        "phonetic": "."
      }
    ]
  }
];
