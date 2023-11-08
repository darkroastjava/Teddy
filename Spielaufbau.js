
// Lieber Jorim. 
//
// Neu kannst du unten sehen, dass es nur noch einen "Stuhl" gibt.
// Noch weiter unten findest du heraus, wie ein Stuhl aus einer Stuhllehne und
// einem Stuhlsitz zusammengefügt wird.
// Wenn du dann einen Stuhl im Spielaufbau hinzufügst, und z.B. für "links" die Zahl 400 eingibst,
// wird automatisch die Stuhllehne UND der Stuhlsitz bei 400 platziert.
// Das Bild vom Stuhl habe ich in zwei Bilder zerteilt: Die Stuhllehne.png und den Stuhlsitz.png
// Die beiden Bilder sind so platziert, dass es wie ein einziges Möbel aussieht.
// 
// Aufgabe:
// Versuche das gleiche mit dem Sofa zu machen. Die Bilder Sofalehne.png und Sofasitz.png gibt es schon.


var Spielaufbau = {
    Grösse: [ 1000, 600 ],
    Möbel: [
        // [ name, links, unten, z, breite, höhe ] = möbel
        [ "Tisch", 0, 0, 30, 313, 161 ],
        [ "Stuhl", 350, 0, 20, 108, 161 ],
        [ "Sofa", 500, 0, 20, 320, 204]
    ],
    Teddy: [ 800, 500, 25, 44, 62 ]
}



var ZusammengesetzteMöbelvorlagen = {
    Stuhl: [
        // [ name, links, unten, z, breite, höhe ] = teil
        [ "Stuhlsitz", 0, 0, 2, 108, 87 ],
        [ "Stuhllehne", 0, 87, -2, 75, 74 ]
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
