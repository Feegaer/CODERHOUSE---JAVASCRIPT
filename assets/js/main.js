//////////////////// CLASES ////////////////////
class Producto 
{
  constructor(id_producto, nombre_producto, img_producto, cant_producto)
  {
    this.id = id_producto;
    this.img = img_producto;
    this.nombre = nombre_producto;
    this.cantidad = cant_producto;
  }
}

//////////////////// MAIN ////////////////////
cartas();
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
          
            <div class="card p-0 border-secondary" style="width: 18rem;">
              <img src="${drink.strDrinkThumb}" class="card-img-top" alt="An image of the drink">
              <div class="card-footer p-4">
                <h6 class="">${drink.strDrink}</h6>
                <button class="btn btn-small btn-outline-primary btn-agregar" value="${drink.strDrink}">Agregar al carrito</button>
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
  let drink;  // Bebida elegida

  for(let btn of btns)  // Para cada botón de las tarjetas
  {
    btn.addEventListener("click", (e) => {

      drink = e.target.value; // Valor de la bebida elegida (Nombre)

      fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`)
      .then((response) => response.json())
      .then((data) => {
        drink = data.drinks[0]; // Data de la bebida elegida

        // FUNCION PARA CREAR EL ITEM EN EL CARRO
        crearItem(drink);
      })
    });
  }
  
}


function crearItem(item)
{
  // Declaraciones
  let   producto, cantidad, lsItem;
  const productosEnCarro = [];
  // Ini
  cantidad = 1;

  if(existenciaItem(item) == 0)
  {
    producto = new Producto(item.idDrink, item.strDrink, item.strDrinkThumb, cantidad);
    localStorage.setItem("ID_" + localStorage.length, JSON.stringify(producto));
  }
  // De lo contrario, simplemente lo buscamos en el localstorage con su key, y aumentados su cantidad
  else  
  {
    lsItem   = localStorage.getItem(existenciaItem(item));  // Obtenemos el item del localstorage
    lsItem   = JSON.parse(lsItem);  // String -> Obj
    cantidad = lsItem.cantidad + 1; // Modificamos la cantidad + 1
    producto = new Producto(item.idDrink, item.strDrink, item.strDrinkThumb, cantidad); // Instanciamos y creamos el objecto
    producto = JSON.stringify(producto);  // Obj -> String : para poder ser guardado en el local

    localStorage.setItem(existenciaItem(item), producto); // Seteamos el nuevo valor sobre el que ya había
  }


}
////////////// FUNCIÓN QUE VERIFICA SI EL ITEM YA EXISTE //////////////
function existenciaItem(producto)
{
  // PRODUCTO : Bebida ingresada
  let   itemObj;

  if(localStorage.length != 0)  // Si el localstorage no está vacío..
  {
    // Recorremos el localstorage y metemos los datos en un array
    for(i = 0; i < localStorage.length; i++)
    {
      item = localStorage.getItem(localStorage.key(i)); // Item del local
      itemObj = JSON.parse(item); // String -> Obj
    
      if(itemObj.id == producto.idDrink)  // Si se encuentra coincidencias, retornamos el key del localstorage para saber cual cambiar
        return localStorage.key(i);
    }

    return 0;
  }
  else  // De lo contrario, dejamos que el usuario cree el producto del carrito
    return 0;


}


