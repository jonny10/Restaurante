/*Uma função que recebe um input como parametro e ler verificar se há algo no files e file[0] do array
e se tiver ele pega o camainho do img com id "mudarImagem" e carrega dentro do reader e após isso altera
o reader com o file que está dentro do input*/
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            document.getElementById('mudarImagem').src = e.target.result;
        }

        reader.readAsDataURL(input.files[0]);
    }
}

/*Um evento de "listener" que fica escutando o input "imagemUpdate" e assim
que ele é alterado é executado a função "readURL()"*/
document.getElementById("imagemUpdate").addEventListener("change", function () {
    readURL(this);
});