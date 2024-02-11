class Möbel {
    constructor(name, links, unten, z, breite, höhe, kannDaraufStehen) {
        this.name = name;
        this.links = links;
        this.unten = unten;
        this.z = z;
        this.breite = breite;
        this.höhe = höhe;
        if (typeof kannDaraufStehen == 'undefined') {
            this.kannDaraufStehen = true;
        } else {
            this.kannDaraufStehen = kannDaraufStehen;
        }
    }
}

class MöbelDarsteller {
    constructor(möbel, spielDarsteller) {
        this.möbel = möbel;
        this.spielDarsteller = spielDarsteller;

        let divMöbelVorlage = this.spielDarsteller.document.getElementById("Möbel");
        let divMöbel = divMöbelVorlage.cloneNode(true);
        divMöbel.removeAttribute("id");
        divMöbel.getElementsByTagName("img")[0].src = "Bilder/" + möbel.name + ".png";

        spielDarsteller.document.getElementById("Welt").appendChild(divMöbel);

        this.divMöbel = divMöbel;
    }

    darstellen() {
        this.divMöbel.style.left = this.möbel.links + "px";
        this.divMöbel.style.bottom = this.möbel.unten + "px";
        this.divMöbel.style.width = this.möbel.breite + "px";
        this.divMöbel.style.height = this.möbel.höhe + "px";
        this.divMöbel.style["z-index"] = this.möbel.z;
    }
}