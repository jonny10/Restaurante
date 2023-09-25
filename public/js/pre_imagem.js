function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            document.getElementById('mudarImagem').src = e.target.result;
        }

        reader.readAsDataURL(input.files[0]);
    }
}

document.getElementById("imagemUpdate").addEventListener("change", function () {
    readURL(this);
});