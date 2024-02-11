class Plüschtier {
    constructor(name, links, unten, z, breite, höhe) {
        this.name = name;
        this.links = links;
        this.unten = unten;
        this.z = z;
        this.breite = breite;
        this.höhe = höhe;
        this.genommen = false;
        this.stehtAufEtwas = true;
        this.stehtAufMöbel = "";

        this.amLaufen = 0;
    }

    folgen(teddy) {
        this.genommen = true;

        this.teddy = teddy;
        this.teddy.followers.push(this);
        this.followerNummer = this.teddy.followers.length;
        this.z = this.teddy.z - this.followerNummer;
        this.teddyBewegungen = [];
    }

    bewegen() {
        if (!this.genommen) { return; }

        // Wenn das Plüschtier "genommen" ist, folgt es dem Teddy: Alle Bewegungen des Teddys werden
        // in eine "Queue" gespeichert, von der anderen Seite durch das Plüschtier wieder ausgelesen
        // und übernommen. Die Queue wird erst konsumiert, wenn sie eine gewisse Länge hat, ausser, wenn
        // das Plüschtier gerade im freien Fall ist, sonst würde es in der Luft steckenbleiben.

        let teddyStehtAufEtwas = this.teddy.stehtAufEtwas()
        if (!teddyStehtAufEtwas || this.teddy.amLaufen) {
            this.teddyBewegungen.push([ this.teddy.links, this.teddy.unten, this.teddy.amLaufen, teddyStehtAufEtwas, this.teddy.stehtAufMöbel ]);
        }

        if (this.teddyBewegungen.length > this.followerNummer * 50
             || !this.stehtAufEtwas && this.teddyBewegungen.length > 0) {

            [ this.links, this.unten, this.amLaufen, this.stehtAufEtwas, this.stehtAufMöbel ] = this.teddyBewegungen.shift();
        } else {
            this.amLaufen = false;
        }
    }
}

class PlüschtierDarsteller {
    constructor(plüschtier, spielDarsteller) {
        this.plüschtier = plüschtier;
        this.spielDarsteller = spielDarsteller;

        let divPlüschtierVorlage = this.spielDarsteller.document.getElementById("Plüschtier");
        let divPlüschtier = divPlüschtierVorlage.cloneNode(true);
        divPlüschtier.removeAttribute("id");
        divPlüschtier.getElementsByTagName("img")[0].src = "Bilder/" + plüschtier.name + ".png";

        spielDarsteller.document.getElementById("Welt").appendChild(divPlüschtier);

        this.divPlüschtier = divPlüschtier;
        this.genommen = false;
    }

    darstellen() {
        this.divPlüschtier.style.left = this.plüschtier.links + "px";
        this.divPlüschtier.style.bottom = this.plüschtier.unten + "px";
        this.divPlüschtier.style.width = this.plüschtier.breite + "px";
        this.divPlüschtier.style.height = this.plüschtier.höhe + "px";
        this.divPlüschtier.style["z-index"] = this.plüschtier.z;

        if (this.plüschtier.amLaufen < 0) { this.spiegeln = -1; }
        if (this.plüschtier.amLaufen > 0) { this.spiegeln = 1; }

        // Lauf-Effekt (wackeln)
        let rotate = "";

        if (this.plüschtier.amLaufen && this.plüschtier.stehtAufEtwas) {
            if (!this.gekipptSeit || this.gekipptSeit < Date.now() - 600) {
                this.gekipptSeit = Date.now();
            }
            if ((Date.now() - this.gekipptSeit) % 200 < 100) {
                rotate = "rotate(" + this.plüschtier.amLaufen * 5 + "deg)";
            }
        }

        let scale = "scaleX(" + this.spiegeln + ")";

        this.divPlüschtier.style.transform = rotate + " " + scale;
    }
}