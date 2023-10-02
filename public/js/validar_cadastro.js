const checkForm = {
    nameAlert: false,
    alertaDescricao: false,
    obraURL: false,
    artistaAlert: false,
}

document.getElementById('nome').addEventListener('input', function (e) {
    const nameAlert = e.target.value;
    if (nameAlert.length < 5 || nameAlert.length > 50) {
        document.getElementById('alertaNome').style.display = "block";
        checkForm.nameAlert = false;
    } else {
        document.getElementById('alertaNome').style.display = "none";
        checkForm.nameAlert = true;
    }
    enableButton();
});

function enableButton() {
    const buttonEnviar = document.getElementById("cadastrarUsuario");
    if (checkForm.nameAlert && checkForm.obraURL && checkForm.alertaDescricao && checkForm.artistaAlert) {
            buttonEnviar.disabled = false;
    } else {
        buttonEnviar.disabled = true;
    }
}