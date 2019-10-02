class Cliente:
    def __init__(self):
        self.clientes = []
        self.numCliente = 0

    def addCliente(self, TR):
        self.numCliente = self.numCliente + 1
        self.clientes.append(clientes(self.numCliente, TR))

    def lessHS(self):
        aux = 999999
        for x in range(len(self.clientes)):
            if self.clientes[x].HS != None:
                if self.clientes[x].HS <= aux:
                    aux = self.clientes[x].HS
        return aux

    def removeCliente(self):
        aux = 999999
        for x in range(len(self.clientes)):
            if self.clientes[x].HS != None:
                if self.clientes[x].HS <= aux:
                    aux = self.clientes[x].HS
                    index = x
        return self.clientes.pop(index)

    def setNextClient(self, HS, TS, index):
        for x in self.clientes:
            if x.HS == None:
                x.setHS(HS)
                x.setTS(TS)
                x.setOperador(index)
                return

class clientes:
    def __init__(self, numCliente, TR):
        self.numCliente = numCliente
        self.TR = TR
        self.TS = None
        self.HS = None
        self.indexOperador = None

    def setOperador(self, index):
        self.indexOperador = index
    def setTS(self, TS):
        self.TS = TS
    def setHS(self, HS):
        self.HS = HS

    def getInicioServico(self):
        return self.HS - self.TS
    def getTempoFila(self):
        return self.getInicioServico() - self.TR