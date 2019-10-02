class Exponencial extends FVGA{

    constructor(param){
        super();
        this.param = param;
    }

    gerarNumero(){
        return parseInt(-(1/this.param) * Math.log(super.gerarNumero()));
    }
}