const d = document;

const textArea = d.querySelector(".form__input");
const imagenNube = d.querySelector(".result__img");
const loaderBarra = d.querySelector(".loader");
const tituloResultado = d.querySelector(".result__title");
const textoResultado = d.querySelector(".result__text");
const botonEncriptar = d.querySelector(".form__btn");
const botonDesencriptar = d.querySelectorAll(".form__btn");
const botonCopiar = d.querySelector(".result__btn");

const llaves = [
    ["e", "enter"],
    ["i", "imes"],
    ["a", "ai"],
    ["o", "ober"],
    ["u", "ufat"]
];

// function para encriptar
function encriptarMensaje(mensaje){
    let mensajeEncriptado = "";
    for(let i = 0; i < mensaje.length; i++){
        let letra = mensaje[i];
        let encriptada = letra;

        for(let j = 0; j < llaves.length; j++){
            if(letra == llaves[j][0]){
                encriptada = llaves[j][1];
            break;
            }
        }
        mensajeEncriptado += encriptada;
    }
    return mensajeEncriptado;
};

// function para desencriptar
function desencriptarMensaje(mensaje){
    let mensajeDesencriptado = mensaje;
    for(let i = 0; i < llaves.length; i++){
        let regex = new RegExp(llaves[i][1], 'g');
        mensajeDesencriptado = mensajeDesencriptado.replace(regex, llaves[i][0]);
    }
    return mensajeDesencriptado;
};

// ocultar elementos de forma dinámica
textArea.addEventListener("input", (e)=>{
    imagenNube.style.display = "none";
    console.log(e.target.value);
    loaderBarra.classList.remove("hidden");
    tituloResultado.textContent = "Capturando mensaje...";
    textoResultado.textContent = "";
});

// función para encriptar por medio de su botón
botonEncriptar.addEventListener("click", (e)=>{
    e.preventDefault();
    let mensaje = textArea.value.toLowerCase();
    let mensajeEncriptado = encriptarMensaje(mensaje);
    textoResultado.textContent = mensajeEncriptado;
    botonCopiar.classList.remove("hidden");
    tituloResultado.textContent = "El resultado es:";
    loaderBarra.classList.add("hidden");
});

// función para desencriptar por medio de su botón
botonDesencriptar[1].addEventListener("click", (e)=>{
    e.preventDefault();
    let mensaje = textArea.value.toLowerCase();
    let mensajeDesencriptado = desencriptarMensaje(mensaje);
    textoResultado.textContent = mensajeDesencriptado;
    botonCopiar.classList.remove("hidden");
    tituloResultado.textContent = "El resultado es:";
    loaderBarra.classList.add("hidden");
});

// función para copiar texto por medio de su botón
botonCopiar.addEventListener("click", ()=>{
    let textoCopiado = textoResultado.textContent;
    navigator.clipboard.writeText(textoCopiado).then(()=> {
        loaderBarra.classList.add("hidden");
        tituloResultado.textContent = "El texto ha sido copiado de forma exitosa";
        botonCopiar.classList.add("hidden");
        textoResultado.textContent = "";
    });
});