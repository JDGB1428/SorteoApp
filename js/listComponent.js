// import Cookie from "./Cookie-1.js";
let listComponent =  function(element, define, styles="list-none text-md font-bold uppercase text-black", ultimo=false){
    let list = [];
    
    if(Cookie.exist(define)){
        list=Cookie.get(define);
        mostrar();
    }else{
        Cookie.set({key:define, value:[]});
    }

    this.get = () =>{
        return list;
    }


    this.add = new function(){
        function factor() {
            Cookie.set({ key:define, value:list});
            mostrar();
        }
        this.item=(elemento )=>{
            if(elemento.length > 0){
                list.push(elemento);
                factor();
            }
        }
        this.list = (elemento,)=>{
            list = [...list, ...elemento];
            factor();
        }
    }

    this.remove = () =>{
        Cookie.delete(define);
        list=[];
        mostrar();
    }

    
    this.eliminar_el_ultimo = () =>{
        list.pop()
        mostrar();
    }

    function mostrar(){
        let lista = element;
        lista.innerHTML = "";
        
        if (ultimo) {
            if (list.length >0) {
                lista.innerHTML = `<div id="spinner" class="spinner"></div>`;
                setTimeout(() => {
                    lista.innerHTML = `
                        <li id='${list.length - 1}' class="list-none font-bold text-3xl uppercase text-center m-14 w-[100%]"> El ganador es: ${list[list.length - 1]}</li>
                    `;
                    const spinnerElement = document.getElementById('spinner');
                    if (spinnerElement) {
                        spinnerElement.remove();
                    }
                }, 2000);
            }
        }else{
            let count=0;
            for(let elemento of list){
                lista.innerHTML +=`
                <li id='${count}' class="${styles}"> ${elemento}</li>
                `;
                count++;
            }
        }
    }



}
