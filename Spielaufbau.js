var Spielaufbau = {
    // [ links, breite, höhe ]
    Welt: [ -2000, 3000, 600 ],

    Möbel: [
        // ---- Wohnzimmer ----
        // [ name,      links,  unten,  z,  breite, höhe ]
        [   "Tisch",    2000,   0,      30, 313,    161 ],
        [   "Stuhl",    2350,   0,      20, 108,    161 ],
        [   "Stuhl",    2800,   6,      20, 108,    161 ],
        [   "Sofa",     2500,   0,      20, 250,    250 * 307 / 479 ],

        // ---- Gang ----
        // [ name,      links,  unten,  z,  breite, höhe ]
        [   "Geländer", 1100,   0,      20, 824,    195 ],

        // ---- Kinderzimmer ----
        // [ name,      links,  unten,  z,  breite, höhe ]
        [   "Hängematte", 200,  100,    10, 200,    200 * 646 / 522 ],
        [   "Bett",       0,    0,      0,  533,    430 ],
        [   "Bücherregal",790,  0,      5,  216,    430 ],
        [   "Pult",       450,  5,      0,  307,    196 ]
    ],

    Plüschtiere: [
        // ---- Wohnzimmer ----
        // [ name,      links,  unten,  z,  breite, höhe ]
        [   "Fuchs",    830,   425,      30, 50,    64 ]

        // ---- Gang ----
        // [ name,      links,  unten,  z,  breite, höhe ]

        // ---- Kinderzimmer ----
        // [ name,      links,  unten,  z,  breite, höhe ]
    ],

    // [        links,  unten,  z,  breite, höhe ]
    Teddy: [    2860,   93,     25, 44,     62 ]
}



var ZusammengesetzteMöbelvorlagen = {
    Stuhl: [
        // [ name,              links,  unten,  z,  breite, höhe ]
        [ "Stuhlsitz",          0,      0,      2,  108,    87 ],
        [ "Stuhllehne",         0,      87,     -2, 75,     74 ]
    ],
    Sofa: [
        // [ name,              links,  unten,  z,  breite, höhe ]
        [ "Sofalehne",          68,     176,    0,  411,    131 ],
        [ "Sofasitz",           68,     0,      2,  356,    176 ],
        [ "SofaArmlehneLinks",  0,      0,      2,  68,     240 ],
        [ "SofaArmlehneRechts", 424,    0,      2,  55,     237 ]
    ],
    Bett: [
        // [ name,              links,  unten,  z,  breite, höhe,   kannDaraufStehen ]
        [ "Bett",               0,      0,      0,  1067,   861,    false ],  
        [ "BettSchublade1",     160,    0,      8,  256,    181 ],
        [ "BettSchublade2",     124,    181,    5,  242,    176 ],
        [ "BettSchublade3",     82,     357,    2,  218,    158 ],
        [ "BettSchublade4",     38,     515,    0,  214,    144 ],
        [ "BettGeländer",       0,      0,      26, 209,    859 ],
        [ "BettInnen",          176,    0,      0,  891,    777 ],
        [ "BettRahmen",         176,    777,    30, 891,    84,     false ]
    ],
    Bücherregal: [
        // [ name,              links,  unten,  z,  breite, höhe ]
        [ "Bücherregal",        0,      0,      0,  390,    676 ],
        [ "Bücherregal1",       0,      0,      0,  390,    280 ],
        [ "Bücherregal2",       0,      280,    0,  390,    95  ],
        [ "Bücherregal3",       0,      375,    0,  390,    96  ],
        [ "Bücherregal4",       0,      471,    0,  390,    98  ]
    ],
    Pult: [
        // [ name,              links,  unten,  z,  breite, höhe,   kannDaraufStehen ]
        [ "Pult",               0,      0,      0,  920,    588,    false ],
        [ "PultVorne",          0,      0,      0,  920,    540 ]
    ],
    Hängematte: [
        // [ name,              links,  unten,  z,  breite, höhe    kannDaraufStehen ]
        [ "Hängematte",         0,      0,      0,  522,    646,    false ],
        [ "HängematteVorne",    0,      0,     20,  489,    211,    false ],
        [ "HängematteVorne2",   0,      0,     20,  329,    211 ],
        [ "HängematteInnen",    0,      0,      0,  522,    94  ]
    ]
};



var MöbelZusammensetzen = function(Möbelvorlage, links, unten, z, breite, höhe) {
    var Möbel = JSON.parse(JSON.stringify( Möbelvorlage ));

    var maxBreite = Möbel.reduce((p, c, i, a) => Math.max(p, c[1] + c[4]), 0);
    var maxHöhe = Möbel.reduce((p, c, i, a) => Math.max(p, c[2] + c[5]), 0);

    for (const Teil of Möbel) {
        Teil[1] = Teil[1] * breite / maxBreite + links;
        Teil[2] = Teil[2] * höhe / maxHöhe + unten;
        Teil[3] += z;
        Teil[4] *= breite / maxBreite;
        Teil[5] *= höhe / maxHöhe;
    }

    return Möbel;
};
