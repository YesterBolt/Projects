class Cliente {
    constructor(numCliente, TR) {
        this.numCliente = numCliente;
        this.TR = TR;
    }

    getInicioServico() {
        return this.HS - this.TS;
    }

    getTempoFila() {
        return this.getInicioServico() - this.TR;
    }
}