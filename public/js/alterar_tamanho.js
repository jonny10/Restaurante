/*Uma função que o ser chamada pelo onclick leva as classes de um determinado conjunto de item
ou seja,(Feijoada, a classe da feijoada tamanho P, M, G) e também leva infosItem, que é uma
dessas classes do item P, M ou G como paremetros.
Sendo assim é definido uma variavel chamadas classes que guarda o primeiro parametro com um
ponto no começo para leva a uma classe de uma div no querySelectorAll, e de todos ele remove
o ativo do css, que é o block, ou seja, transformando em none e pós isso guarda o segundo
parametro em uma variavel chamada "elementoMostrar" com um ponto no começo novamente para levar
a uma classe selecionada, sendo assim é adicionado o ativo do css, transformando a classe em block
e assim tirando somente daquela classe o none*/
function mostrarClasse(classe, infosItem) {
    const classes = document.querySelectorAll('.' + infosItem);
    classes.forEach(element => {
        element.classList.remove('ativo');
    });
    const elementoMostrar = document.querySelector('.' + classe);
    elementoMostrar.classList.add('ativo');
}

/*Criando uma viravel chamada de pequeno e coocando nela todas as div com classe
".tamanhoP", e após isso adicionando em todas elas o "ativo" do css para transformar
inicial assim que cerregar a página todas classes do item de tamanho P em block
para aparece os tamanhos P inicialmente*/
const pequeno = document.querySelectorAll('.tamanhoP');
pequeno.forEach(element => {
    element.classList.add('ativo');
});