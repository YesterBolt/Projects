class Clientes {

    constructor() {
        this.clientes = [];
        this.numCliente = 0;
    }

    addCliente(TR) {
        this.numCliente += 1;
        this.clientes.push(new Cliente(this.numCliente, TR));
    }

    minHs() {
        var minHs = 999999;
        
        var HSvalues = this.clientes.filter(cliente =>
            cliente.HS != null && cliente.HS != undefined);
            
        if (HSvalues && HSvalues.length > 0){
            minHs = HSvalues.reduce((min, cliente) =>
                Math.min(min, cliente.HS), HSvalues[0].HS);
        }

        return minHs;
    }

    removeCliente() {
        var minHS = this.minHs();
        
        const index = this.clientes.findIndex(cliente => cliente.HS != null && cliente.HS != undefined && cliente.HS == minHS);

        const clienteAux = this.clientes[index];
        this.clientes.splice(index, 1);

        return clienteAux;
    }

    setNextCliente(HS, TS, index) {
        var cliente = this.clientes.find(cliente => !cliente.HS);
        cliente.HS = HS;
        cliente.TS = TS;
        cliente.indexOperador = index;
    }

}

class Cliente {

    constructor(numCliente, TR){
        this.numCliente = numCliente;
        this.TR = TR;
        this.TS = null;
        this.HS = null;
        this.indexOperador = null;
    }

    getInicioServico() {
        return this.HS - this.TS;
    }

    getTempoFila() {
        return this.getInicioServico() - this.TR;
    }

}