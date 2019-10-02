class Operador:
    def __init__(self, quantidade):
        self.operadores = []
        for i in range(0, quantidade):
            self.operadores.append(operadores())

    def verOperadorLivre(self):
        for x in self.operadores:
            if x.ES == 0:
                return 1
        return 0
    def ocuparOperador(self, TR):
        for x in range(len(self.operadores)):
            if self.operadores[x].ES == 0:
                self.operadores[x].changeES()
                self.operadores[x].addTempoLivre(TR)
                return x
    def aliviarOperador(self, TR, index):
        if self.operadores[index].ES == 1:
            self.operadores[index].changeES()
            self.operadores[index].setLastTR(TR)
    def sistemNotVazio(self):
        for x in self.operadores:
            if x.ES == 1:
                return 1

    #def printEstado(self):
    #    for x in self.operadores:
    #        print('ES: ' + repr(x.ES) + ' lastTR: ' + repr(x.lastTR) + ' tempoLivre: ' + repr(x.tempoLivre))
        
class operadores:
    def __init__(self):
        self.ES = 0
        self.lastTR = 0
        self.tempoLivre = 0
    def changeES(self):
        if self.ES == 1:
            self.ES = 0
        else:
            self.ES = 1
    def setLastTR(self, TR):
        self.lastTR = TR

    def addTempoLivre(self, TR):
        self.tempoLivre = self.tempoLivre + (TR - self.lastTR)