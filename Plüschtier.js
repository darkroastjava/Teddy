class Plüschtier {
    constructor(name, links, unten, z, breite, höhe) {
        this.name = name;
        this.links = links;
        this.unten = unten;
        this.z = z;
        this.breite = breite;
        this.höhe = höhe;
        this.genommen = false;
    }

    nehmen() {
        this.genommen = true;
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
        if (this.plüschtier.genommen && this.genommen == false) {
            this.genommen = true;

            this.spielDarsteller.document.getElementById("Welt").removeChild(this.divPlüschtier);
            this.spielDarsteller.document.body.appendChild(this.divPlüschtier);

            this.plüschtier.links = 0;
        }

        this.divPlüschtier.style.left = this.plüschtier.links + "px";
        this.divPlüschtier.style.bottom = this.plüschtier.unten + "px";
        this.divPlüschtier.style.width = this.plüschtier.breite + "px";
        this.divPlüschtier.style.height = this.plüschtier.höhe + "px";
        this.divPlüschtier.style["z-index"] = this.plüschtier.z;
    }
}