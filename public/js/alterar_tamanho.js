function mostrarClasse(classe, infosItem) {
    const classes = document.querySelectorAll('.' + infosItem);
    classes.forEach(element => {
        element.classList.remove('ativo');
    });
    const elementoMostrar = document.querySelector('.' + classe);
    elementoMostrar.classList.add('ativo');
}

const pequeno = document.querySelectorAll('.tamanhoP');
pequeno.forEach(element => {
    element.classList.add('ativo');
});