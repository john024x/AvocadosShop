/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

const url = "https://platzi-avo.vercel.app/api/avo";
const  baseURL = "https://platzi-avo.vercel.app/";
const appNode = document.querySelector('#mount');
appNode.className = "margin:0 auto flex flex-wrap"; 
//events listener
appNode.addEventListener("click",(event)=>{
    if(event.target.nodeName === 'H2'){
        window.alert("hola");
    }
});

//funcion que estandariza los precios para mostrar
const formatPrice = (price) => {
    const newPrice = new window.Intl.NumberFormat("es-MX",{//Se asigna la region de la persona que entra
        style: "currency",//que sera tipo moneda
        currency: "MXN",//y el tipo de moneda que sera
    }).format(price);
    return newPrice;
}
//web api
//codigo hecho con promesas, se puede utilizar tambien async/await
//conectar al servidor
window.fetch(url)
//Procesar la respuesta y convertirla en JSON
.then(respuesta => respuesta.json()) 
//JSON -> Data -> renderizar la informacion en el browser
.then(ResponseJson =>{
    const TodosLosItems = []
    ResponseJson.data.forEach(item => {
        //crear imagen
        const img = document.createElement('img');
        img.src = `${baseURL}${item.image}`;
        img.className = "rounded-full h-55 w-55 flex items-center justify-center...";
        //crear titulo
        const title = document.createElement('h2');
        title.textContent = item.name;
            //los estilos se pueden agregar de la manera siguiente
            title.style="font-size:1.5rem";
            //cada estilo tiene una propiedad para poderlo definir como objeto
            title.style.fontFamily = "Minion";
            //o bien, podemos agregar clases
            title.className = "text-2x1 text-green-700"; 
            

        //crear precio
        const price = document.createElement('div');
            //api de intl (internacionalizacion) usualmente usada para dar formato a fechas y moneda
            price.textContent = formatPrice(item.price);
        price.style="font-size:1.25rem";
        price.className = "text-2x1 text-yellow-900"; 
        //crear contenedor para los elementos
        const container = document.createElement('div')
        container.append(title, img, price);
        container.className = "hover:bg-gray-200"; 
        TodosLosItems.push(container)
    });
    appNode.append(...TodosLosItems);
});