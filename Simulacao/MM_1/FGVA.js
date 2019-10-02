var seedClass = new Seed();
 
class FVGA {
    constructor(){
        this.seedObj = seedClass;
    }

    gerarNumero(){
        return MCLM(this.seedObj);
    }
}