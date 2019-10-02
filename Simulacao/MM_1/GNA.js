
class Seed{
    
    constructor(InitSeed = new Date()){
        this.seed = (2*InitSeed) - 1;
    }

    get Seed(){
        return this.seed;
    }

    set Seed(newSeed){
        this.seed = newSeed;
    }
}
    

function MCLM(seedObj){
    const a = 19;
    const m = 128;
    seedObj.seed = (((a * seedObj.seed % m)));
    return seedObj.seed/m;
}
