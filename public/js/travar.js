// Função para travar a tela
travarTela = () => {
    const overlay = document.getElementById('overlay');

    overlay.style.display = 'flex'; // Exibe o overlay
    
    document.body.style.overflow = 'hidden'; // Impede a rolagem da página
}

// Função para destravar a tela
destravarTela = () => {
    const overlay = document.getElementById('overlay');
    
    overlay.style.display = 'none'; // Oculta o overlay
    document.body.style.overflow = 'auto'; // retorna a rolagem da página
}