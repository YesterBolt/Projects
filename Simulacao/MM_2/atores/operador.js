class Operadores {

    constructor(quantidade) {
        this.operadores = [];
        var i;

        for (i = 0; i < quantidade; i++) {
            this.operadores.push(new Operador());
        }
    }

    verOperadorLivre() {
        const index = this.operadores.findIndex(operador => operador.ES == 0);

        if (index >= 0) {
            return true;
        }
        return false;
    }

    ocuparOperador(TR) {
        const index = this.operadores.findIndex(operador => operador.ES == 0);

        if (index >= 0) {
            this.operadores[index].changeES();
            this.operadores[index].addTempoLivre(TR);
        }
        return index;
    }

    aliviarOperador(TR, index) {
        if (this.operadores[index].ES == 1) {
            this.operadores[index].changeES();
            this.operadores[index].setLastTR(TR);
        }
    }

    sistemaNaoVazio() {
        const index = this.operadores.findIndex(operador => operador.ES == 1);

        if (index >= 0) {
            return true;
        }
        return false;
    }

}

class Operador {

    constructor() {
        this.ES = 0;
        this.lastTR = 0;
        this.tempoLivre = 0;
    }

    changeES() {
        this.ES = this.ES == 1 ? 0 : 1;
    }

    setLastTR(TR) {
        this.lastTR = TR
    }

    addTempoLivre(TR) {
        this.tempoLivre += (TR - this.lastTR);
    }
}