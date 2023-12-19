
// import listComponent from "./listComponent.js";
// import Cookie from "./Cookie-1.js";

let input = document.querySelector("#participante");
let nombre = input.value;

document.querySelector('#btn-agregar').addEventListener("click",agregar);
document.querySelector('#btn-eliminar').addEventListener("click",eliminar);
document.querySelector('#btn-sortear').addEventListener("click",sortear)
document.querySelector('#excel').addEventListener("change", cargarArchivo)
document.querySelector('#sorteados').addEventListener("click", eliminar_sorteados)
document.querySelector('#repetir_sorteados').addEventListener("click", repetir_sorteados)
document.querySelector('#eliminar_ultimo_participante').addEventListener("click", eliminar_ultimo_participante)


let HTML_listado = document.querySelector('#listado'); 
let HTML_listado_sorteado = document.querySelector('#resultado'); 

let lista_participantes = new listComponent(HTML_listado, "listado");
let lista_sorteado = new listComponent(HTML_listado_sorteado, "sorteados", "list-none font-bold uppercase text-lg", true);

let check_repetidos = false;

const modal = document.getElementById('myModal');
const closeModal = document.getElementById('closeModal');

if(Cookie.exist("check_repetidos")){
    check_repetidos = Cookie.get("check_repetidos");
    document.querySelector('#repetir_sorteados').checked = check_repetidos;
}else{
    Cookie.set({key:"check_repetidos", value:false});
}


function agregar(e){
    lista_participantes.add.item(input.value);
    input.value = "";
}


function eliminar(){
    Cookie.delete("check_repetidos");
    lista_participantes.remove();
    lista_sorteado.remove();

}


function eliminar_sorteados(){
    lista_sorteado.remove();
}

function eliminar_ultimo_participante(){
    lista_participantes.eliminar_el_ultimo();
}

function sortear(){
    let random = Math.floor(Math.random() * lista_participantes.get().length);
    let Item_Aleatorio = lista_participantes.get()[random];
    if(lista_sorteado.get().includes(Item_Aleatorio) && !check_repetidos){
        if (lista_sorteado.get().length>= lista_participantes.get().length) {
            openModal();
        }else{
            sortear()
        }
    }else{
        lista_sorteado.add.item(Item_Aleatorio);
    }
}

function openModal() {
    modal.classList.remove('hidden');
  }

  function hideModal() {
    modal.classList.add('hidden');
  }

  closeModal.addEventListener('click', hideModal);

function repetir_sorteados(e){
    check_repetidos = e.target.checked;
    Cookie.set({key:"check_repetidos", value:check_repetidos});
}

async function cargarArchivo(e){
     let listafile = await leerexcel(e);
     lista_participantes.add.list(listafile);
}


async function leerexcel(e){
    let file = e.target.files[0];
    let Lista_items = await new Promise((resolve, reject)=>{
        const reader = new FileReader();
        reader.onload = function (e) {
            const textContent = e.target.result;
            resolve(textContent.replaceAll("\r", "").split("\n"));
        };
        reader.readAsText(file);
    });
    let new_list = [];
    [...Lista_items].forEach(element => {
        if (element.length>0) {
            new_list.push(element)
        }
    });
    return new_list;
   
}


