class Discreta extends FVGA {

    constructor(A, probA, B, probB, C, probC) {
        super();
        this.A = A;
        this.probA = probA;
        this.B = B;
        this.probB = probB;
        this.C = C;
        this.probC = probC;
    }

    gerarNumero() {
        const randomNum = super.gerarNumero();

        if (randomNum <= this.probA) {
            return this.A;
        }
        else if (randomNum <= this.probB) {
            return this.B;
        }
        else {
            return this.C;
        }
    }
}