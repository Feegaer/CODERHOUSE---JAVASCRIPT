// Datos de entrada ingresados por el usuario
let mas_stock = document.getElementById("agregar_stock"); // Boton mas
let menos_stock = document.getElementById("disminuir_stock"); // Boton menos
let contador = document.getElementById("contador"); // Obtenemos el contador
let valor_contador = 0; // Valor inicial del contador
let crear_button = document.getElementById("crear_producto"); // Boton, crear producto

// Funcion para detectar la cantidad de stock deseada y cambiarla
function cantidad_stock(){
  contador.innerHTML = valor_contador;
  // Agregar más stock deseado al crear el producto
  function sumar(){
    mas_stock.addEventListener("click", () =>{
      valor_contador++;
      contador.innerHTML = valor_contador;  // Llenamos el contenido del contador con el valor nuevo
    });
  }
  // Agregar menos stock deseado al crear el producto
  function restar(){
    menos_stock.addEventListener("click", () =>{
      if(valor_contador == 0){  // Si el contador es igual a 0, que no se vuelva negativo
        alert("No puedes tener valores inferiores a cero.");
      }
      else{
        valor_contador--;
        contador.innerHTML = valor_contador;  // Llenamos el contenido del contador con el valor nuevo
      }
    });
  }

  sumar();
  restar();

}

cantidad_stock();


// Clase "producto" el cual tendrá al constructor de la clase
class producto{
  constructor(nombre, precio, stock){
    this.nombre = nombre;
    this.precio = precio;
    this.stock = stock;

  }

}


function crear_nuevo_producto(){

  // Array que contendra los productos en forma de objetos
  const array_productos = [];

  crear_button.addEventListener("click", () => {

    let nombre_producto = document.getElementById("producto_nombre").value; // Obtenemos producto nombre input
    let precio_producto = document.getElementById("producto_precio").value; // Obtenemos producto precio input


    // Instanciamos la clase "producto" para crear un nuevo producto
    const nuevo_producto = new producto(nombre_producto, precio_producto, valor_contador);
    // Método por el cual meteremos esos objetos al array
    array_productos.push(nuevo_producto);
    // Mostrar array y su contenido
    console.log(array_productos);


    // Limpiamos los campos
    nombre_producto = document.getElementById("producto_nombre").value = "";
    precio_producto = document.getElementById("producto_precio").value = "";
    valor_contador = 0;
    contador.innerHTML = valor_contador;
  });


} 

crear_nuevo_producto();



