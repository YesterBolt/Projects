class Operador {
    constructor(){
        this.ES = 0;
        this.lastTR = 0;
        this.tempoLivre = 0;
    }

    changeES(){
        this.ES = this.ES == 1 ? 0 : 1;
    }

    addTempoLivre(TR){
        this.tempoLivre += (TR - this.lastTR);
    }
}