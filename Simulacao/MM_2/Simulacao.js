function inEvent(clientes, operadores, TR, TF, HC, HS, lambda, mi) {
    TR = HC;
    TEC = lambda.gerarNumero();
    
    clientes.addCliente(TR);

    if (operadores.verOperadorLivre()) {
        TS = mi.gerarNumero();
        HS = TR + TS;
        clientes.setNextCliente(HS, TS, operadores.ocuparOperador(TR))
    }
    else {
        TF = TF + 1;
    }
    HC = TR + TEC;

    return [TR, TF, HC, clientes.minHs()];
}

function outEvent(clientes, operadores, TR, TF, HC, HS, mi) {
    TR = clientes.minHs();
    var clienteAux = clientes.removeCliente();
    operadores.aliviarOperador(TR, clienteAux.indexOperador);

    if (TF > 0) {
        TS = mi.gerarNumero();
        HS = TR + TS;
        clientes.setNextCliente(HS, TS, operadores.ocuparOperador(TR));

        TF = TF - 1;
    }
    else {
        HS = 999999;
    }
    return [TR, TF, HC, HS, clienteAux];
}

function getInEvent(clientes, operadores, TR, TF, HC, HS) {
    var lambda;
    var mi;

    if (setUp.distribuicao == 'exponencial') {
        lambda = new Exponencial(setUp.exponencial.chegada);
        mi = new Exponencial(setUp.exponencial.servico);
    }
    else if (setUp.distribuicao == 'uniforme') {
        lambda = new Uniforme(setUp.uniforme.limInfChegada, setUp.uniforme.limSupChegada);
        mi = new Uniforme(setUp.uniforme.limInfServico, setUp.uniforme.limSupServico);
    }
    else if (setUp.distribuicao == 'discreta') {
        const chegada = setUp.discreta.chegada;
        const servico = setUp.discreta.servico;
        lambda = new Discreta(chegada.valorA, chegada.probA, chegada.valorB, chegada.probB, chegada.valorC, chegada.probC);
        mi = new Discreta(servico.valorA, servico.probA, servico.valorB, servico.probB, servico.valorC, servico.probC);
    }

    return this.inEvent(clientes, operadores, TR, TF, HC, HS, lambda, mi);
}

function getOutEvent(clientes, operadores, TR, TF, HC, HS) {
    var mi;
    if (setUp.distribuicao == 'exponencial') {
        mi = new Exponencial(setUp.exponencial.servico);
    }
    else if (setUp.distribuicao == 'uniforme') {
        mi = new Uniforme(setUp.uniforme.limInfServico, setUp.uniforme.limSupServico);
    }
    else if (setUp.distribuicao == 'discreta') {
        const servico = setUp.discreta.servico;
        mi = new Discreta(servico.valorA, servico.probA, servico.valorB, servico.probB, servico.valorC, servico.probC);
    }
    return this.outEvent(clientes, operadores, TR, TF, HC, HS, mi);
}

function init() {
    document.getElementById("resultTable").innerHTML = '';

    var TR = 0;
    var TF = 0;
    var HC = 0;
    var HS = 999999;

    var clientes = new Clientes();
    var clientesFora = [];
    var operadores = new Operadores(2);

    var clientesFila = 0
    const tempoMax = setUp.tempoMax ? setUp.tempoMax : 100;

    while (TR <= tempoMax || TF != 0 || operadores.sistemaNaoVazio()) {
        if (HC < clientes.minHs() && TR <= tempoMax) {

            clientesFila += operadores.verOperadorLivre() ? 0 : 1;

            [TR, TF, HC, HS] = getInEvent(clientes, operadores, TR, TF, HC, HS);
        }
        else {
            [TR, TF, HC, HS, clienteAux] = getOutEvent(clientes, operadores, TR, TF, HC, HS);
            clientesFora.push(clienteAux);
        }
    }

    this.generateTable(clientesFora);
    this.getStatisticsData(clientesFora, clientesFila, clientes.numCliente, operadores.operadores, TR);
    $('#separador').show();
}

function generateTable(data) {
    var inner = "";
    var linhas = [];

    data.forEach(cliente => {
        var str = '<tr><th>' + cliente.numCliente + '</th><td>' + cliente.TR + '</td><td>' + cliente.TS + '</td><td>' + cliente.getInicioServico() + '</td><td>' + cliente.getTempoFila() + '</td><td>'+ cliente.HS + '</td><td>' + cliente.indexOperador + '</td></tr>';
        linhas += str;
    });

    inner = '<div class="col-12 col-lg-12"><h4>Tabela de Simulação</h4><table class="table table-striped table-hover"><thead><tr><th scope="col">Cliente</th><th scope="col">Tempo Simulacao</th><th scope="col">Tempo de Servico</th><th scope="col">Tempo Inicio</th><th scope="col">Tempo na Fila</th><th scope="col">Tempo Final</th><th scope="col">Operador que Atendeu</th></tr></thead><tbody>';
    inner += linhas;
    inner += '</tbody></table></div>';
    document.getElementById("resultTable").innerHTML = inner;
}

function getStatisticsData(clientesFora, clientesFila, numCliente, operadores, TR) {
    var sumTS = 0;
    var tempoFila = 0;

    clientesFora.forEach(cliente => {
        sumTS += cliente.TS;
        tempoFila += cliente.getTempoFila();
    });

    var inner = '<div class="col-12"><h4>Tabela de Resultados</h4><table class="table table-striped table-hover"><thead><tr><th scope="col">Descrição</th><th scope="col">Valor</th></tr></thead><tbody><tr><th>Tempo Médio de Espera</th><td>' + (tempoFila / numCliente).toFixed(2) + '</td></tr><tr><th>Probabilidade de Esperar</th><td>' + (clientesFila / numCliente).toFixed(2) + '</td></tr><tr><th>Probabilidade de operador 1 livre</th><td>' + (operadores[0].tempoLivre / TR).toFixed(2) + '</td></tr><tr><th>Probabilidade de operador 2 livre</th><td>' + (operadores[1].tempoLivre / TR).toFixed(2) + '</td></tr><tr><th>Tempo medio de servico</span></th><td>' + (sumTS / numCliente).toFixed(2) + '</td></tr><tr><th>Tempo medio despendido no sistema</th><td>' + (TR / numCliente).toFixed(2) + '</td></tr></tbody></table></div>';
    document.getElementById("statisticsTable").innerHTML = inner;
}