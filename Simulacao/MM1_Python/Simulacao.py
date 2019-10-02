from Exponencial import exponencial
from Uniforme import uniforme
from Discreta import discreta

class Cliente:
    def __init__(self, numCliente, TR):
        self.numCliente = numCliente
        self.TR = TR

    def setTS(self, TS):
        self.TS = TS
    def setHS(self, HS):
        self.HS = HS

    def getInicioServico(self):
        return self.HS - self.TS
    def getTempoFila(self):
        return self.getInicioServico() - self.TR

class Operador:
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

def inEvent(clientes, operador, numCliente, TR, ES, TF, HC, HS):
    TR = HC
    clientes.append(Cliente(numCliente, TR))
    TEC = entradaRandom.gerarNumero()
    if(operador.ES == 0):
        operador.changeES()
        operador.addTempoLivre(TR)
        ES = 1
        TS = saidaRandom.gerarNumero()
        HS = TR + TS
        clientes[0].setTS(TS)
        clientes[0].setHS(HS)
    else:
        TF = TF + 1
    HC = TR + TEC
    return TR, ES, TF, HC, HS

def outEvent(clientes, operador, TR, ES, TF, HC, HS):
    TR = HS
    if(TF > 0):
        TS = saidaRandom.gerarNumero()
        HS = TR + TS
        clientes[1].setTS(TS)
        clientes[1].setHS(HS)
        TF = TF - 1
    else:
        operador.changeES()
        ES = 0
        operador.setLastTR(TR)
        HS = 999999
    return TR, ES, TF, HC, HS

TR, ES, TF, HC = 0, 0, 0, 0
HS = 999999
numCliente = 0
entradaRandom = uniforme(4,4)
saidaRandom = uniforme(2,2)
data = []
clientes = []
clientesFora = []
operador = Operador()

sumTS = 0
clientesFila = 0
tempoFila = 0

while(TR < 10 or TF != 0 or HS != 999999):
    if(HC < HS and TR < 10):
        if ES == 1:
            clientesFila = clientesFila + 1
        numCliente = numCliente + 1
        TR, ES, TF, HC, HS = inEvent(clientes, operador, numCliente, TR, ES, TF, HC, HS)
        data.append(['CHEGADA', numCliente, TR, ES, TF, HC, HS])
    else:
        TF_After = TF
        TR, ES, TF, HC, HS = outEvent(clientes, operador, TR, ES, TF, HC, HS)
        clientesFora.append(clientes.pop(0))
        data.append(['SAIDA  ', numCliente - TF_After, TR, ES, TF, HC, HS])

print('Estado\tNumero Cliente\t\tTempo Simulacao\t\tEstado Servidor\t\tTamanho Fila\t\tAgendamento Chegada\t\tAgendamento Saida')
for [estado, _numCliente, _TR, _ES, _TF, _HC, _HS] in data:
    print(estado + '\t\t' + repr(_numCliente) + '\t\t\t' + repr(_TR) + '\t\t\t' + repr(_ES) + '\t\t\t'+ repr(_TF) + '\t\t\t\t' + repr(_HC) + '\t\t\t' + repr(_HS))


for cliente in clientesFora:
    sumTS = sumTS + cliente.TS
    #print(repr(cliente.numCliente) + ' ' + repr(cliente.TS))
    tempoFila = tempoFila + cliente.getTempoFila()


print('\nTempo medio de esperar:            %.3f' % (tempoFila/float(numCliente)))
print('Probabilidade de esperar:          %.3f' % (clientesFila/float(numCliente)))
print('Probabilidade de operador livre:   %.3f' % (operador.tempoLivre/float(TR)))
print('Tempo medio de servico:            %.3f' % (sumTS/float(numCliente)))
print('Tempo medio despendido no sistema: %.3f' % (TR/float(numCliente)))