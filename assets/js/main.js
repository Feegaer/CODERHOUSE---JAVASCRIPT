//////////////////// CLASES ////////////////////


class Producto 
{
  constructor(id_producto, nombre_producto, img_producto)
  {
    this.id = id_producto;
    this.img = img_producto;
    this.nombre = nombre_producto;
  }
}

//////////////////// MAIN ////////////////////

main();
cartas();


function main()
{
  
  let btn = document.getElementById("carrito");

  btn.addEventListener("click", carrito);

  

  

}

//////////////////// FUNCIÓN QUE CREA LAS TARJETAS DINAMICAMENTE ////////////////////
function cartas()
{
  let cocktailContainer = document.getElementById("cocktails-container"),
      btns = cocktailContainer.getElementsByTagName("button"),
      template = '',
      drinks;

  // Fetch a la API para obtener todos los cocteles
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail`)
    .then((response) => response.json())  // Response = JSON
    .then((data) => {
      drinks = data.drinks; // Array con los cocteles

      for(let drink of drinks)  // Para cada elemento dentro del array, se agregará a template, una carta
      {

        template += `
        <div class="col-6">
          <div class="row p-4 justify-content-around">
          
          <div class="card p-0" style="width: 18rem;">
            <img src="${drink.strDrinkThumb}" class="card-img-top" alt="...">
            <div class="card-footer">
              <h6>${drink.strDrink}</h6>
              <button class="btn btn-outline-primary btn-agregar" value="${drink.strDrink}">Agregar al carrito</button>
            </div>
          </div>
            
          </div>
        </div>
        `;
      }


      cocktailContainer.innerHTML = template; // Dónde se insertara el contenido de 'template'

      agregarProducto(btns);  // Debemos ubicar a esta función después de generar las cartas o los valores se tomaran como inexistentes por no haberse generado aun

    })
}

//////////////////// FUNCIÓN QUE AGREGA LOS PRODUCTOS AL CARRO ////////////////////
function agregarProducto(btns)
{
  let drink, 
      itemNro = 0;
  const arrayCarritos = [];


  for(let btn of btns)  // Para cada botón de las tarjetas
  {
    btn.addEventListener("click", (e) => {

      drink = e.target.value;

      fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`)
      .then((response) => response.json())
      .then((data) => {
        drink = data.drinks[0]; // Data de la bebida elegida
        
        // Creamos un objecto con los datos de esa bebida para agregarlos al carrito
        const objProducto = new Producto(drink.idDrink, drink.strDrink, drink.strDrinkThumb);

        arrayCarritos.push(objProducto);  // Metemos ese objecto al array
        // Guardamos en el localstorage los items del carro, después de crear un autoincrement y parsear el objecto a string
        localStorage.setItem("Item" + itemNro++, JSON.stringify(objProducto));
        
        Toastify({text: "Se ha agregado: " + objProducto.nombre}).showToast();


      })


    });
  }

}


function carrito()
{

}

