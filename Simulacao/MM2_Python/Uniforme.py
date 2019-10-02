from FGVA import fgva

class uniforme(fgva):
    def __init__(self, a, b):
        fgva.__init__(self)
        self.a = a
        self.b = b
    def gerarNumero(self):
        return int(self.a + (self.b - self.a) * fgva.gerarNumero(self))