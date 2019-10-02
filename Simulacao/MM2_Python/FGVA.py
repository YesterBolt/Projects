import GNA
from GNA import Seed
import math


class fgva:
    def __init__(self):
        self.seed = Seed()
    def gerarNumero(self):
        return GNA.MCLM(self.seed)