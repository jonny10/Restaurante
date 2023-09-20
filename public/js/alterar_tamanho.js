function mostrarClasse(classe) {
    const classes = document.querySelectorAll('.desc');
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