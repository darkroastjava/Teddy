var ZusammengesetzteMöbelvorlagen = {
    Stuhl: [
        // [ name, links, unten, z, breite, höhe ] = teil
        [ "Stuhlsitz", 0, 0, 10, 108, 87 ],
        [ "Stuhllehne", 0, 87, - 10, 75, 74 ]
    ]
};



var Spielaufbau = {
    Grösse: [ 1000, 600 ],
    Möbel: [
        // [ name, links, unten, z, breite, höhe ] = möbel
        [ "Tisch", 0, 0, 30, 313, 161 ],
        [ "Stuhl", 400, 0, 20, 108, 161 ],
        [ "Sofa", 600, 0, 25,314,116 ]
    ],
    Teddy: [ 800, 500, 25, 44, 62 ]
}



var MöbelZusammensetzen = function(Möbelvorlage, links, unten, z, breite, höhe) {
    var Möbel = JSON.parse(JSON.stringify( Möbelvorlage ));

    var maxBreite = Möbel.reduce((p, c, i, a) => Math.max(p, c[1] + c[4]), 0);
    var maxHöhe = Möbel.reduce((p, c, i, a) => Math.max(p, c[2] + c[5]), 0);

    for (const Teil of Möbel) {
        Teil[1] += links;
        Teil[2] += unten;
        Teil[3] += z;
        Teil[4] *= breite / maxBreite;
        Teil[5] *= höhe / maxHöhe;
    }

    return Möbel;
};
