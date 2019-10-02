from FGVA import fgva
import math

class exponencial(fgva):
    def __init__(self, _lambda):
        fgva.__init__(self)
        self._lambda = _lambda
    def gerarNumero(self):
        return int(-(1/float(self._lambda)) * math.log(fgva.gerarNumero(self)))