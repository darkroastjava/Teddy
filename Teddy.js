class Teddy {
    static NEIN = 0;
    static NACH_LINKS = -1;
    static NACH_RECHTS = 1;

    constructor(links, unten, z, breite, höhe, spiel) {
        this.links = links;
        this.unten = unten;
        this.z = z;
        this.breite = breite;
        this.höhe = höhe;
        this.spiel = spiel;

        this.amLaufen = Teddy.NEIN;
        this.amSpringen = Teddy.NEIN;
    }

    laufenNachRechts() {
        this.amLaufen = Teddy.NACH_RECHTS;
    }

    laufenNachLinks() {
        this.amLaufen = Teddy.NACH_LINKS;
    }

    anhalten() {
        this.amLaufen = Teddy.NEIN;
    }

    springen() {
        if (this.amSpringen == Teddy.NEIN && this.stehtAufEtwas()) {
            this.spiel.tönen("springen");
            this.amSpringen = 20;
        }
    }

    bewegen() {
        this.links += this.amLaufen;
        if (this.links < 0) { this.links = 0; }
        if (this.links > this.spiel.breite - this.breite) { this.links = this.spiel.breite - this.breite }

        if (this.links < 1000) {
            this.spiel.links = 0;
        } else {
            this.spiel.links = -1000;
        }

        if (this.amSpringen > 0) {
            this.unten += this.amSpringen / 2;
            this.amSpringen -= 1;
        } else {
            if (!this.stehtAufEtwas()) {
                this.unten -= 2;
            }
        }
    }

    stehtAufEtwas() {
        if (this.stehtAufBoden()) {
            return true;
        }
        for (let i = 0; i < this.spiel.alleMöbel.length; i++) {
            const möbel = this.spiel.alleMöbel[i];
            
            if (this.stehtAuf(möbel)) {
                return true;
            }
        }
    
        return false;
    }

    stehtAuf(möbel) {
        let möbelOben = möbel.unten + möbel.höhe;
        let möbelRechts = möbel.links + möbel.breite;
        let teddyLinks = this.links + 10;
        let teddyRechts = this.links + this.breite - 10;
        let teddyUnten = this.unten;

        if (teddyRechts < möbel.links) {
            return false;
        }
        if (teddyLinks > möbelRechts) {
            return false;
        }
        if (teddyUnten < möbelOben) {
            return false;
        }
        if (teddyUnten > möbelOben + 2) {
            return false;
        }

        return true;
    }

    stehtAufBoden() {
        return this.unten < 2;
    }

}

class TeddyDarsteller {
    constructor(teddy, spielDarsteller) {
        this.teddy = teddy;
        this.spielDarsteller = spielDarsteller;
        this.divTeddy = this.spielDarsteller.document.getElementById("Teddy");
    }

    darstellen() {
        this.divTeddy.style.left = this.teddy.links + "px";
        this.divTeddy.style.bottom = this.teddy.unten + "px";
        this.divTeddy.style.width = this.teddy.breite + "px";
        this.divTeddy.style.height = this.teddy.höhe + "px";
        this.divTeddy.style["z-index"] = this.teddy.z;

        if (this.teddy.amLaufen < 0) { this.spiegeln = -1; }
        if (this.teddy.amLaufen > 0) { this.spiegeln = 1; }

        // Lauf-Effekte (Tönen und wackeln)
        let rotate = "";

        if (this.teddy.amLaufen && this.teddy.stehtAufEtwas()) {
            if (!this.laufenTöntSeit || this.laufenTöntSeit < Date.now() - 600) {
                this.spielDarsteller.spiel.tönen("laufen");
                this.laufenTöntSeit = Date.now();
            }
            if ((Date.now() - this.laufenTöntSeit) % 200 < 100) {
                rotate = "rotate(" + this.teddy.amLaufen * 5 + "deg)";
            }
        }

        let scale = "scaleX(" + this.spiegeln + ")";

        this.divTeddy.style.transform = rotate + " " + scale;
    }
}

class TeddySteuerung {
    constructor(teddy, spielSteuerung) {
        this.teddy = teddy;
        this.spielSteuerung = spielSteuerung;
    }

    tasteGedrückt(taste) {
        if (taste == "ArrowRight") {
            this.teddy.laufenNachRechts();
        }
        if (taste == "ArrowLeft") {
            this.teddy.laufenNachLinks();
        }
        if (taste == " ") {
            this.teddy.springen();
        }
    }

    tasteLosgelassen(taste) {
        if (taste == "ArrowRight" || taste == "ArrowLeft") {
            this.teddy.anhalten();
        }
    }
}