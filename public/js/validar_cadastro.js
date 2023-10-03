document.getElementById('nome').addEventListener('input', function (e) {
    const nameAlert = e.target.value;
    if (nameAlert.length < 2 || nameAlert.length > 50) {
        document.getElementById('alertaNome').style.display = "block";
        checkForm.nameAlert = false;
    } else {
        document.getElementById('alertaNome').style.display = "none";
        checkForm.nameAlert = true;
    }
});

function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

document.getElementById('email').addEventListener('input', function (e) {
    const emailAlert = e.target.value;
    if (!validateEmail(emailAlert)) {
        document.getElementById('alertaEmail').style.display = "block";
        checkForm.emailAlert = false;
    } else {
        document.getElementById('alertaEmail').style.display = "none";
        checkForm.emailAlert = true;
    }
});

function validateCep(cep) {
    var re = /[0-9]{5}-[0-9]{3}/
    return re.test(cep);
}

document.getElementById('cep').addEventListener('input', function (e) {
    const cepAlert = e.target.value;
    if (!validateCep(cepAlert)) {
        document.getElementById('alertaCep').style.display = 'block';
        checkForm.numeroAlert = false;
    } else {
        document.getElementById('alertaCep').style.display = 'none';
        checkForm.numeroAlert = true;
    }
});

document.getElementById('telefone').addEventListener('input', function (e) {
    e.target.value = e.target.value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '($1)$2')
        .replace(/(\d{4})(\d)/, '$1-$2')
        .replace(/(\d{4})-(\d)(\d{4})/, '$1$2-$3')
        .replace(/(-\d{4})\d+?$/, '$1')
})

function validateTelefone(telefone) {
    var re = /\([0-9]{2}\)9[0-9]{4}-[0-9]{4}/
    return re.test(telefone);
}

document.getElementById('telefone').addEventListener('input', function (e) {
    const numeroAlert = e.target.value;
    if (!validateTelefone(numeroAlert)) {
        document.getElementById('alertaTelefone').style.display = 'block';
        checkForm.numeroAlert = false;

    } else {
        document.getElementById('alertaTelefone').style.display = 'none';
        checkForm.numeroAlert = true;

    }
});

document.getElementById('senha').addEventListener('input', (e) => {
    const senhaAlert = e.target.value
    if(senhaAlert.length >= 8 && /[A-Z]/.test(senhaAlert) && /[0-9]/.test(senhaAlert)){
        document.getElementById('alertaSenha').style.display = 'none';
    }else{
        document.getElementById('alertaSenha').style.display = 'block';
    }
})