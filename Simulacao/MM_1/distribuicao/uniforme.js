class Uniforme extends FVGA{

    constructor(limInf, limSup){
        super();
        this.limInf = limInf;
        this.limSup = limSup;
    }

    gerarNumero(){
        return parseInt(this.limInf + (this.limSup - this.limInf) * super.gerarNumero());
    }
}