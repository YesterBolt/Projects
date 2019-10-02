from FGVA import fgva

class discreta(fgva):
    def __init__(self, a, probA, b, probB, c, probC):
        fgva.__init__(self)
        self.a = a
        self.probA = probA
        self.b = b
        self.probB = probB
        self.c = c
        self.probC = probC
    def gerarNumero(self):
        randomNum = fgva.gerarNumero(self)
        if randomNum <= probA:
            return a
        elif randomNum <= probB:
            return b
        else:
            return c