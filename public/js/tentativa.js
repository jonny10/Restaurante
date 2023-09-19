const Item = require("./models/Item")
const itens = await Item.findAll({include: Tamanho})
const name = "btnradio" + itens['dataValues']['titulo']

// Função para verificar qual input radio está selecionado e esconder a classe correspondente.
function esconderClasse() {
    var opcaoSelecionada = document.querySelector('input[name=' + name + ']:checked').value;
    var elementosComClasse = document.querySelectorAll('.' + opcaoSelecionada);

    // Esconde todas as classes e mostra apenas a classe selecionada.
    elementosComClasse.forEach(function(elemento) {
        elemento.style.display = 'none';
    });

    // Mostra a classe selecionada.
    var classeSelecionada = document.querySelector('.' + opcaoSelecionada);
    classeSelecionada.style.display = 'block';
}

// Adicione um evento de escuta para os inputs radio.
var radios = document.querySelectorAll('input[name=' + name + ']');
radios.forEach(function(radio) {
    radio.addEventListener('change', esconderClasse);
});

// Inicialmente, chame a função para garantir que a classe correta seja exibida.
esconderClasse();
