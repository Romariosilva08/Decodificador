const listaCriptografica = ["enter", "imes", "ai", "ober", "ufat"];
const listaNormal = ["e", "i", "a", "o", "u"];

const cifrasParaCriptografar = {
    "e": "enter",
    "i": "imes",
    "a": "ai",
    "o": "ober",
    "u": "ufat"
};

const cifrasParaDescriptografar = {
    "enter": "e",
    "imes": "i",
    "ai": "a",
    "ober": "o",
    "ufat": "u"
};

function criptografaTexto(texto) {
    let textoConvertido = texto;
    listaNormal.forEach(function(letra) {
        textoConvertido = textoConvertido.replaceAll(letra, cifrasParaCriptografar[letra]);
    });
    return textoConvertido;
}

function descriptografaTexto(texto) {
    let textoParaConverter = texto;
    listaCriptografica.forEach(function(letra) {
        textoParaConverter = textoParaConverter.replaceAll(letra, cifrasParaDescriptografar[letra]);
    });
    return textoParaConverter;
}

function copiarTexto() {
    const textoCopiado = document.querySelector(".texto-criptografado p");
    const btnCopy = document.querySelector("#copiar");
    btnCopy.addEventListener("click", function() {
        navigator.clipboard.writeText(textoCopiado.innerText);
        alert("Texto copiado");
        location.reload();
    });
}

function verificaTextoValido(texto) {
    // Verifica se o texto contém apenas letras minúsculas e sem acento
    const minusculas = texto.toLowerCase();
    const semAcento = texto.normalize("NFD");
    const temCaracterEspecial = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(texto);

    return texto === minusculas && texto === semAcento && !temCaracterEspecial;
}

function atualizaTextoCriptografado(textoCriptografado) {
    const paragrafo = document.querySelector(".texto-criptografado p");

    if (verificaTextoValido(textoCriptografado)) {
        paragrafo.textContent = textoCriptografado;
    } else {
        paragrafo.textContent = "Apenas letras minúsculas e sem acento.";
    }
}

function criptografa() {
    const campoTexto = document.getElementById("texto-principal");
    const btnCryptography = document.querySelector("#criptografar");

    btnCryptography.addEventListener("click", function(event) {
        event.preventDefault();
        const textoCriptografado = criptografaTexto(campoTexto.value);

        const campoVazio = document.querySelector(".sem-retorno");
        campoVazio.classList.add("d-none");

        const campoPreenchido = document.querySelector(".texto-criptografado");
        campoPreenchido.classList.remove("d-none");

        atualizaTextoCriptografado(textoCriptografado);
    });
}

function descriptografa() {
    const campoTexto = document.getElementById("texto-principal");
    const btnCryptography = document.querySelector("#descriptografar");

    btnCryptography.addEventListener("click", function(event) {
        event.preventDefault();
        const textoDescriptografado = descriptografaTexto(campoTexto.value);

        const campoVazio = document.querySelector(".sem-retorno");
        campoVazio.classList.add("d-none");

        const campoPreenchido = document.querySelector(".texto-criptografado");
        campoPreenchido.classList.remove("d-none");

        atualizaTextoCriptografado(textoDescriptografado);
    });
}

function setupListeners() {
    criptografa();
    descriptografa();

    const textArea = document.querySelector("#texto-principal");
    textArea.addEventListener('input', autoResize);
}

function autoResize() {
    this.style.height = 'auto';
    this.style.height = this.scrollHeight + 'px';
}

setupListeners();
