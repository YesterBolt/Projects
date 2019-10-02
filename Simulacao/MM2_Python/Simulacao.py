from Exponencial import exponencial
from Uniforme import uniforme
from Discreta import discreta
from Cliente import Cliente, clientes
from Operador import Operador, operadores

def inEvent(clientes, operador, TR, TF, HC, HS):
    TR = HC
    TEC = entradaRandom.gerarNumero()
    clientes.addCliente(TR)
    if(operador.verOperadorLivre()):
        TS = saidaRandom.gerarNumero()
        HS = TR + TS
        clientes.setNextClient(HS, TS, operador.ocuparOperador(TR))
    else:
        TF = TF + 1
    HC = TR + TEC
    return TR, TF, HC, clientes.lessHS()

def outEvent(clientes, operador, TR, TF, HC, HS):
    TR = clientes.lessHS()
    clienteAux = clientes.removeCliente()
    operador.aliviarOperador(TR, clienteAux.indexOperador)
    if(TF > 0):
        TS = saidaRandom.gerarNumero()
        HS = TR + TS
        clientes.setNextClient(HS, TS, operador.ocuparOperador(TR))
        TF = TF - 1
    else:
        HS = 999999
    return TR, TF, HC, HS, clienteAux   

TR, TF, HC = 0, 0, 0
HS = 999999
numCliente = 0
entradaRandom = uniforme(2,2)
saidaRandom = uniforme(4,4)
clientes = Cliente()
clientesFora = []
operador = Operador(2)

sumTS = 0
clientesFila = 0
tempoFila = 0

while(TR <= 20 or TF != 0 or operador.sistemNotVazio()):
    if(HC < clientes.lessHS() and TR <= 20):
        if not(operador.verOperadorLivre()):
            clientesFila = clientesFila + 1
        TR, TF, HC, HS = inEvent(clientes, operador, TR, TF, HC, HS)
    else:
        TR, TF, HC, HS, clienteAux = outEvent(clientes, operador, TR, TF, HC, HS)
        clientesFora.append(clienteAux)

print('Cliente\t\tTempo Simulacao\t\tTempo de Servico\t\tTempo Inicio\t\tTempo na Fila\t\tTempo Final\t\tOperador que Atendeu')
for x in clientesFora:
    print(repr(x.numCliente) + '\t\t\t' + repr(x.TR) + '\t\t\t'+ repr(x.TS) + '\t\t\t\t' + repr(x.getInicioServico()) + '\t\t\t' + repr(x.getTempoFila()) + '\t\t\t' + repr(x.HS) + '\t\t\t' + repr(x.indexOperador))


for cliente in clientesFora:
    sumTS = sumTS + cliente.TS
    tempoFila = tempoFila + cliente.getTempoFila()


print('\nTempo medio de esperar:            %.3f' % (tempoFila/float(clientes.numCliente)))
print('Probabilidade de esperar:          %.3f' % (clientesFila/float(clientes.numCliente)))
print('Probabilidade de operador 1 livre:   %.3f' % (operador.operadores[0].tempoLivre/float(TR)))
print('Probabilidade de operador 2 livre:   %.3f' % (operador.operadores[1].tempoLivre/float(TR)))
print('Tempo medio de servico:            %.3f' % (sumTS/float(clientes.numCliente)))
print('Tempo medio despendido no sistema: %.3f' % (TR/float(clientes.numCliente)))