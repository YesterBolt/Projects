import random
from datetime import datetime

class Seed:
    def __init__(self, InitSeed = datetime.now().microsecond):
        self.seed = (2 * InitSeed) - 1  #GARANTIA DE SEED SER IMPAR
    
    def getSeed(self):
        return self.seed

    def setSeed(self, newSeed):
        self.seed = newSeed

def MCLM(seed):
    #CONSTANTES
    a = 19           #MULTIPLICADOR
    m = 128          #MODULO
    seed.setSeed(((a * seed.getSeed()) % m))
    return seed.getSeed()/float(m)
