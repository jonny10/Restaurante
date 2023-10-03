module.exports = {
    VerificarCadastro: (nome, email, cep, telefone, senha) => {
        if(nome && email && cep && telefone && senha){
            if (nome.length < 2 || nome.length > 50) {
                return {validar: false, erro: "O nome está com 2 caracteres ou com mais de 50 caracteres!"}
            }else{
                function validateEmail(email) {
                    var re = /\S+@\S+\.\S+/;
                    return re.test(email);
                }
                if(!validateEmail(email)){
                    return {validar: false, erro: "O email não é valido!"}
                }else{
                    function validateCep(cep) {
                        var re = /[0-9]{5}-[0-9]{3}/
                        return re.test(cep);
                    }
                    if (!validateCep(cep)) {
                        return {validar: false, erro: "O cep está inválido!"}
                    }else{
                        function validateTelefone(telefone) {
                            var re = /\([0-9]{2}\)9[0-9]{4}-[0-9]{4}/
                            return re.test(telefone);
                        }
                        if (!validateTelefone(telefone)) {
                            return {validar: false, erro: "O telefone está inválido!"}
                        }else{
                            if(senha.length >= 8 && /[A-Z]/.test(senha) && /[0-9]/.test(senha)){
                                return {validar: false, erro: null}
                            }else{
                                return {validar: false, erro: "A senha não atende aos requisitos!"}
                            }
                        }
                    }
                }
            }
        }else{
            return {validar: false, erro: "Não foi possivel realizar o cadastro, algum campo obrigatorio está vazio!"}
        }
    },
    verificarSenha: (senha) => {
        if(senha.length >= 8 && /[A-Z]/.test(senha) && /[0-9]/.test(senha)){
            return {validar: true, erro: null}
        }else{
            return {validar: false, erro: "Não foi possivel realizar altera a senha, a senha não atende aos requisitos!"}
        }
    }
}