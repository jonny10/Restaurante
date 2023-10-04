document.getElementById('nome').addEventListener('input', function (e) {
    const nameAlert = e.target.value;
    if (nameAlert.length < 2 || nameAlert.length > 50) {
        document.getElementById('alertaNome').style.display = "block";
    } else {
        document.getElementById('alertaNome').style.display = "none";
    }
});

function validateValor(valor) {
    var re = /[0-9]\.[0-9]{2,2}$/
    return re.test(valor);
  }

document.getElementById('valor').addEventListener('input', function (e) {
    const valorAlert = e.target.value;
    if (validateValor(valorAlert)) {
        document.getElementById('alertaValor').style.display = "none";
    } else {
        document.getElementById('alertaValor').style.display = "block";
    }
});

document.getElementById('tipo').addEventListener('change', function (e) {
    const tipoAlert = e.target.value;
    console.log(tipoAlert)
    if (tipoAlert) {
        document.getElementById('alertaTipo').style.display = "none";
    } else {
        document.getElementById('alertaTipo').style.display = "block";
    }
});