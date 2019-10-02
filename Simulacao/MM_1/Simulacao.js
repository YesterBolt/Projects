function inEvent(clientes, operador, numCliente, TR, ES, TF, HC, HS, lambda, mi) {
    TR = HC;
    clientes.push(new Cliente(numCliente, TR));
    TEC = lambda.gerarNumero();

    if (operador.ES == 0) {
        operador.changeES();
        operador.addTempoLivre(TR);

        ES = 1;
        TS = mi.gerarNumero();
        HS = TR + TS;

        clientes[0].TS = TS;
        clientes[0].HS = HS;
    }
    else {
        TF = TF + 1;
    }
    HC = TR + TEC;

    return [TR, ES, TF, HC, HS];
}

function outEvent(clientes, operador, TR, ES, TF, HC, HS, mi) {
    TR = HS;
    if (TF > 0) {
        TS = mi.gerarNumero();
        HS = TR + TS;
        TF = TF - 1;

        clientes[1].TS = TS;
        clientes[1].HS = HS;
    }
    else {
        operador.changeES();
        ES = 0;
        operador.lastTR = TR;
        HS = 999999;
    }
    return [TR, ES, TF, HC, HS];
}

function getInEvent(clientes, operador, numCliente, TR, ES, TF, HC, HS) {
    // debugger

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

    return this.inEvent(clientes, operador, numCliente, TR, ES, TF, HC, HS, lambda, mi);
}

function getOutEvent(clientes, operador, TR, ES, TF, HC, HS) {
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
    return this.outEvent(clientes, operador, TR, ES, TF, HC, HS, mi);
}

function init() {
    document.getElementById("resultTable").innerHTML = '';
    //debugger;
    var TR = 0;
    var ES = 0;
    var TF = 0;
    var HC = 0;
    var HS = 999999;
    var numCliente = 0;
    var data = [];

    var clientes = [];
    var clientesFora = [];
    var clientesFila = 0
    var operador = new Operador();

    const tempoMax = setUp.tempoMax ? setUp.tempoMax : 100;

    while (TR < tempoMax || TF != 0 || HS != 999999) {
        if (HC < HS && TR < tempoMax) {

            clientesFila += ES == 1 ? 1 : 0;

            numCliente = numCliente + 1;
            [TR, ES, TF, HC, HS] = getInEvent(clientes, operador, numCliente, TR, ES, TF, HC, HS);
            data.push(['CHEGADA', numCliente, TR, ES, TF, HC, HS]);
        }
        else {
            TF_After = TF;
            [TR, ES, TF, HC, HS] = getOutEvent(clientes, operador, TR, ES, TF, HC, HS);
            clientesFora.push(clientes.shift(0));
            data.push(['SAIDA  ', numCliente - TF_After, TR, ES, TF, HC, HS]);
        }
    }

    this.generateTable(data);
    this.getStatisticsData(clientesFora, clientesFila, numCliente, operador, TR);
    $('#separador').show();
}

function generateTable(data) {
    var inner = "";
    var linhas = [];

    data.forEach(data => {
        var str = '<tr><th>' + data[0] + '</th><td>' + data[1] + '</td><td>' + data[2] + '</td><td>' + data[3] + '</td><td>' + data[4] + '</td><td>' + data[5] + '</td><td>' + data[6] + '</td></tr>';
        linhas += str;
    });

    inner = '<div class="col-12 col-lg-12"><h4>Tabela de Simulação</h4><table class="table table-striped table-hover"><thead><tr><th scope="col">Estado</th><th scope="col">Nº Cliente</th><th scope="col">Tempo Simulacao</th><th scope="col">Estado Servidor</th><th scope="col">Tamanho Fila</th><th scope="col">Agendamento Chegada</th><th scope="col">Agendamento Saida</th></tr></thead><tbody>';
    inner += linhas;
    inner += '</tbody></table></div>';
    document.getElementById("resultTable").innerHTML = inner;
}

function getStatisticsData(clientesFora, clientesFila, numCliente, operador, TR) {
    var sumTS = 0;
    var tempoFila = 0;
    console.log(clientesFora);

    clientesFora.forEach(cliente => {
        sumTS += cliente.TS;
        tempoFila += cliente.getTempoFila();
    });
    console.log(tempoFila);
    console.log(numCliente);
    var inner = '<div class="col-12"><h4>Tabela de Resultados</h4><table class="table table-striped table-hover"><thead><tr><th scope="col">Descrição</th><th scope="col">Valor</th></tr></thead><tbody><tr><th>Tempo Médio de Espera</th><td>' + (tempoFila / numCliente).toFixed(2) + '</td></tr><tr><th>Probabilidade de Esperar</th><td>' + (clientesFila / numCliente).toFixed(2) + '</td></tr><tr><th>Probabilidade de operador livre</th><td>' + (operador.tempoLivre / TR).toFixed(2) + '</td></tr><tr><th>Tempo medio de servico</span></th><td>' + (sumTS / numCliente).toFixed(2) + '</td></tr><tr><th>Tempo medio despendido no sistema</th><td>' + (TR / numCliente).toFixed(2) + '</td></tr></tbody></table></div>';
    document.getElementById("statisticsTable").innerHTML = inner;
}