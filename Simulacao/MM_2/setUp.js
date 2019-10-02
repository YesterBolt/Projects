var setUp = {};

function getSetUp() {
    const form = document.forms['mm1Options'];
    this.setUp.distribuicao = form['distribuicao'].value;

    this.setUp.exponencial = {
        chegada: parseFloat(form['taxaChegada'].value, 10),
        servico: parseFloat(form['taxaServico'].value, 10)
    }

    this.setUp.uniforme = {
        limInfChegada: parseFloat(form['limInfChegada'].value, 10),
        limSupChegada: parseFloat(form['limSupChegada'].value, 10),
        limInfServico: parseFloat(form['limInfServico'].value, 10),
        limSupServico: parseFloat(form['limSupServico'].value, 10)
    }

    this.setUp.discreta = {
        chegada: {
            valorA: parseFloat(form['chegadaA'].value, 10),
            probA: parseFloat(form['probChegadaA'].value, 10),
            valorB: parseFloat(form['chegadaB'].value, 10),
            probB: parseFloat(form['probChegadaB'].value, 10),
            valorC: parseFloat(form['chegadaC'].value, 10),
            probC: parseFloat(form['probChegadaC'].value, 10)
        },
        servico: {
            valorA: parseFloat(form['servicoA'].value, 10),
            probA: parseFloat(form['probServicoA'].value, 10),
            valorB: parseFloat(form['servicoB'].value, 10),
            probB: parseFloat(form['probServicoB'].value, 10),
            valorC: parseFloat(form['servicoC'].value, 10),
            probC: parseFloat(form['probServicoC'].value, 10)
        }
    }

    this.setUp.tempoMax = parseFloat(form['tempoMax'].value, 10);
    $('#formulario').hide();
    $('#reload').show();
    init();
}

function setDistributionType() {
    const option = document.getElementById('distribuicao').value;
    if (option == 'exponencial') {
        $('#exponencialGroup').show();
        $('#uniformeGroup').hide();
        $('#discretaGroup').hide();
    }
    else if (option == 'uniforme') {
        $('#exponencialGroup').hide();
        $('#uniformeGroup').show();
        $('#discretaGroup').hide();
    }
    else if (option == 'discreta') {
        $('#exponencialGroup').hide();
        $('#uniformeGroup').hide();
        $('#discretaGroup').show();
    }
}

function reload() {
    document.getElementById("mm1Options").reset();
    $('#formulario').show();
    document.getElementById("resultTable").innerHTML = '';
    document.getElementById("statisticsTable").innerHTML = '';
    $("#distribuicao").prop("selectedIndex", -1)
    $('#exponencialGroup').hide();
    $('#uniformeGroup').hide();
    $('#discretaGroup').hide();
    $('#separador').hide();
    $('#reload').hide();
}