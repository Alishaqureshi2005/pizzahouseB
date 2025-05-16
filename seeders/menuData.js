const menuData = [
  {
    category: "Pizza's",
    description: "Verscheidenheid aan pizza's in kleine en grote maten",
    items: [
      {
        title: "MARGIRITA#1",
        content: "Tomatensaus, kaas",
        price: "8.95"
      },
      {
        title: "FUNGHI#2",
        content: "Tomatensaus, kaas, champignons",
        price: "8.95"
      },
      {
        title: "PROSCUITTO#3",
        content: "Tomatensaus, kaas, ham",
        price: "8.95"
      },
      {
        title: "SALAMI#4",
        content: "Tomatensaus, kaas, salami",
        price: "8.95"
      },
      {
        title: "BOLOGNAISE#5",
        content: "Bolognaise, kaas, look",
        price: "8.95"
      },
      {
        title: "TONNO#6",
        content: "Tomatensaus, kaas, tonijn, ui, olijven",
        price: "8.95"
      },
      {
        title: "VEGETARISCH #7",
        content: "Tomatensaus, kaas, paprika, champignons, mais, ui, olijven",
        price: "8.95"
      },
      {
        title: "QUATTRO FROMAGGIO #8",
        content: "Tomatensaus, kaas, vier soorten kaas",
        price: "8.95"
      },
      {
        title: "PEPPERONI #9",
        content: "Tomatensaus, kaas, pepperoni, maïs pikante pepers",
        price: "8.95"
      },
      {
        title: "MIMOSA #10",
        content: "Tomatensaus, kaas, ham, tomaat",
        price: "8.95"
      },
      {
        title: "KEBAB #11",
        content: "Tomatensaus, kaas, kebab",
        price: "8.95"
      },
      {
        title: "QUATTRO STAGIONE #12",
        content: "Tomatensaus, kaas, champignons, paprika, salami, ham",
        price: "9.95"
      },
      {
        title: "MARGARITA SPECIAAL #13",
        content: "Tomatensaus, kaas, look, ui, paprika, mozzarella kaas",
        price: "9.95"
      },
      {
        title: "BOLOGNAISE SPECIAAL #14",
        content: "Bolognaise, look, ui, kaas, pikante peppers",
        price: "9.95"
      },
      {
        title: "KEBAB SPECIAAL #15",
        content: "Tomatensaus, kaas, kebab, ui, paprika, look",
        price: "9.95"
      },
      {
        title: "RUSTICA #16",
        content: "Tomatensaus, kaas, ham, salami, ei",
        price: "9.95"
      },
      {
        title: "CALZONE #17",
        content: "Tomatensaus, kaas, ham, salami, paprika, bolognaise",
        price: "9.95"
      },
      {
        title: "BOLOGNAISE KIP #18",
        content: "bolognaisesaus, kaas, look, ui, kip",
        price: "9.95"
      },
      {
        title: "POLLO #19",
        content: "Tomatensaus, kaas, kip, ui, champignons, paprika",
        price: "10.95"
      },
      {
        title: "HAWAI #20",
        content: "Tomatensaus, kaas, ham, kip, ananas, maïs",
        price: "10.95"
      },
      {
        title: "BBQ KIP #21",
        content: "Bbq saus, kaas, ui, paprika, kip",
        price: "10.95"
      },
      {
        title: "BBQ GEHAKT #22",
        content: "Bbq saus, kaas, ui, paprika, gehaktballetjes",
        price: "10.95"
      },
      {
        title: "BBQ BACON #23",
        content: "Bbq saus, kaas, ui, paprika, bacon, gehakt",
        price: "10.95"
      },
      {
        title: "PIZZA MERGUEZZ #24",
        content: "Tomatensaus, kaas, ui, paprika, look, merguez, pikante pepers, bbq saus",
        price: "10.95"
      },
      {
        title: "HOT PIZZA #25",
        content: "Tomatensaus, kaas, peperoni, ui, paprika, pikante pepers",
        price: "10.95"
      },
      {
        title: "ROOM VEGIE #26",
        content: "Roomsaus, kaas, champignons, ui, paprika, maïs, olijven",
        price: "10.95"
      },
      {
        title: "ROOM BACON #27",
        content: "Roomsaus, kaas, bacon, ui, paprika",
        price: "10.95"
      },
      {
        title: "ROOME KIP #28",
        content: "Roomsaus, kaas, paprika, ui, kip",
        price: "10.95"
      },
      {
        title: "CURRY KIP #29",
        content: "Currysaus, kaas, ui, ananas, kip, mozzarella",
        price: "10.95"
      },
      {
        title: "CURRY KEBAB #30",
        content: "Currysaus, kaas, ui, paprika, kebab, pikante pepers",
        price: "10.95"
      },
      {
        title: "CURRY VEGIE #31",
        content: "Currysaus, kaas, ui, champignons, paprika, maïs, olijven",
        price: "10.95"
      },
      {
        title: "CURRY DELUXE #32",
        content: "Currysaus, kaas, ui, paprika, kip, gehaktballetjes",
        price: "11.95"
      },
      {
        title: "TANDOORI #33",
        content: "Tomatensaus, kaas, ui, paprika, tandoori kip",
        price: "11.95"
      },
      {
        title: "FRUTTI DI MARE #34",
        content: "Tomatensaus, kaas, tonijn, scampi's, garnalen, mosselen, calamares",
        price: "11.95"
      },
      {
        title: "FULL OPTION #35",
        content: "Tomatensaus, kaas, ui, maïs, paprika, salami, bolognaise, kip, olijven",
        price: "11.95"
      },
      {
        title: "PIZZA MIX #36",
        content: "Tomatensaus, kaas, pitta vlees, kip pikante pepers, ui, champignons",
        price: "11.95"
      },
      {
        title: "BBQ SPECIAAL #37",
        content: "Bbq saus, kaas, pepperoni, ui, paprika, kip, gehaktballetjes",
        price: "11.95"
      },
      {
        title: "CURRY SPECIAAL #38",
        content: "Currysaus, kaas, ham, gehaktballetjes, ui, paprika, kip, mozzarella",
        price: "11.95"
      },
      {
        title: "PIZZA SCAMPI'S #39",
        content: "Tomatensaus, kaas, ui, paprika, scampi's",
        price: "11.95"
      },
      {
        title: "PIZZA HUSREV #40",
        content: "Tomatensaus, kaas, peperoni, salami, ham, paprika, gehaktballetjes, kip, olijven",
        price: "11.95"
      }
    ]
  },
  {
    category: "Pasta's",
    description: "We bieden een verscheidenheid aan pasta's, ontdek ons menu",
    items: [
      {
        title: "PASTA BOLOGNAISE #42",
        content: "Bolognaisesaus, kaas",
        price: "11.00"
      },
      {
        title: "PASTA FUNGI #43",
        content: "Roomsaus, kaas, champignons",
        price: "11.00"
      },
      {
        title: "PASTA CARBONARA #44",
        content: "Roomsaus, kaas, spek, tomatensaus",
        price: "11.00"
      },
      {
        title: "PASTA POLLO #45",
        content: "Roomsaus, kaas, kip",
        price: "11.00"
      },
      {
        title: "PASTA VEGETARIAN #46",
        content: "Roomsaus, kaas, groenten",
        price: "11.00"
      },
      {
        title: "PASTA QUATTRO FROMAGGIO #47",
        content: "Roomsaus, vier soorten kaas",
        price: "11.00"
      },
      {
        title: "PASTA DIABOLIQUE #48",
        content: "Roomsaus, kaas, scampi's tomatensaus",
        price: "12.00"
      },
      {
        title: "PASTA SPECIAL #49",
        content: "Roomsaus, kaas, spek, kip, ei",
        price: "12.00"
      },
      {
        title: "PASTA CHICKEN #50",
        content: "Roomsaus, kaas, kip pesto",
        price: "12.00"
      },
      {
        title: "PASTA CURRY #51",
        content: "Roomsaus, ananas, maïs, ui, kip, gehaktballetjes, currysaus",
        price: "12.00"
      },
      {
        title: "PASTA HUSREV #52",
        content: "Roomsaus, ui, paprika, kip, gehaktballetjes",
        price: "12.00"
      },
      {
        title: "PASTA FRUTTI DI MARE #53",
        content: "Roomsaus, tomatensaus, zeevruchten",
        price: "12.00"
      },
      {
        title: "PASTA ROMANA #54",
        content: "Roomsaus, kaas, kip, ui, champignons",
        price: "12.00"
      }
    ]
  },
  {
    category: "Pitta Brood",
    description: "Turkse Kebab En Brood",
    items: [
      {
        title: "Schotel Pitta",
        content: "Brood, Pitta Vlees, Keuze Van saus en Groentjes",
        price: "7.00"
      },
      {
        title: "Brood Kip",
        content: "Brood, Pitta Kip, Keuze Van saus en Groentjes",
        price: "7.00"
      },
      {
        title: "Brood Mix",
        content: "Brood, Pitta Vlees en kip, Keuze Van saus en Salade",
        price: "7.00"
      },
      {
        title: "VEGETARISCH Brood",
        content: "Brood, FetaKaas, Keuze Van saus en Groentjes",
        price: "6.00"
      }
    ]
  },
  {
    category: "Schotels",
    description: "Pitta Vlees, Frietjes, Keuze Van saus en Groentjes",
    items: [
      {
        title: "Schotel Pitta",
        content: "Brood, Pitta Vlees, Keuze Van saus en Groentjes",
        price: "11.00"
      },
      {
        title: "Schotel Kip",
        content: "Frietjes, Kip, Keuze Van saus en Groentjes",
        price: "11.00"
      },
      {
        title: "Schotel Mix",
        content: "Pitta Vlees en Kip, Frietjes, Keuze Van saus en Groentjes",
        price: "11.00"
      },
      {
        title: "Schotel Mexicano",
        content: "Mexicano, Frietjes, Keuze Van saus en Groentjes",
        price: "11.00"
      },
      {
        title: "Schotel Hamburger",
        content: "Hamburger, Frietjes, Keuze Van saus en Groentjes",
        price: "11.00"
      },
      {
        title: "Schotel Frikandel",
        content: "Frikandel, Frietjes, Keuze Van saus en Groentjes",
        price: "11.00"
      },
      {
        title: "Schotel Vegetarisch",
        content: "Fetakaas, Frietjes, Keuze Van saus en Groentjes",
        price: "10.00"
      },
      {
        title: "Schotel Kipsate",
        content: "Kipsate, Frietjes, Keuze Van saus en Groentjes",
        price: "13.00"
      },
      {
        title: "Schotel Apirio",
        content: "Apirio, Frietjes, Keuze Van saus en Groentjes",
        price: "13.00"
      },
      {
        title: "Schotel Husrev",
        content: "Grill Kipfilet, Frietjes, Keuze Van saus en Groentjes",
        price: "13.00"
      },
      {
        title: "Schotel Kofte",
        content: "Kofte, Frietjes, Keuze Van saus en Groentjes",
        price: "13.00"
      },
      {
        title: "Schotel Adana",
        content: "Adana, Frietjes, Keuze Van saus en Groentjes",
        price: "13.00"
      }
    ]
  },
  {
    category: "Durum",
    description: "Heerlijke wraps met verschillende vullingen",
    items: [
      {
        title: "Durum Pitta",
        content: "Wrap, Vlees, Keuze Van saus en Groentjes",
        price: "8.00"
      },
      {
        title: "Durum Kip",
        content: "Wrap, Keuze Van saus en Groentjes",
        price: "8.00"
      },
      {
        title: "Durum Mix",
        content: "Wrap Vlees en Kip, Keuze Van saus en Groentjes",
        price: "8.00"
      },
      {
        title: "Durum Firkandel",
        content: "Wrap, Frikandel, Keuze Van saus en Groentjes",
        price: "8.00"
      },
      {
        title: "Durum Hamburger",
        content: "Wrap, Hamburger, Keuze Van saus en Groentjes",
        price: "8.00"
      },
      {
        title: "Durum Mexicano",
        content: "Wrap, Mexicano, Keuze Van saus en Groentjes",
        price: "8.00"
      },
      {
        title: "Durum Kofte",
        content: "Wrap Kofte, Keuze Van saus en Groentjes",
        price: "9.00"
      },
      {
        title: "Durum Adana",
        content: "Wrap, Adana, Keuze Van saus en Groentjes",
        price: "9.00"
      },
      {
        title: "Durum Kipcorn",
        content: "Wrap, Kipcorn, Keuze Van saus en Groentjes",
        price: "10.00"
      },
      {
        title: "Durum Kipsate",
        content: "Wrap, Kipsate, Keuze Van saus en Groentjes",
        price: "10.00"
      },
      {
        title: "Durum Vegetarisch",
        content: "Wrap, Fetakaas, Frietjes, Keuze Van saus en Groentjes",
        price: "10.00"
      }
    ]
  }
];

module.exports = menuData; 