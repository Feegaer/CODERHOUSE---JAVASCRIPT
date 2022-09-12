function main(){
  // Variables y Constantes
  const newProdForm = document.getElementById("newProduct_Form"),
        inputsNewProdForm = newProdForm.getElementsByTagName("input"),
        buttons = newProdForm.getElementsByTagName("button");

  // Boton "Añadir nuevo producto"
  buttons[0].addEventListener("click", crearNuevoProducto);
  
  // Funcion que creara al nuevo producto
  function crearNuevoProducto(e){
    e.preventDefault(); // Prevenimos el comportamiento por default del formulario para que no recargue la pagina
    
    // Valores de las entradas, id inicial y array
    const nombreProducto = inputsNewProdForm[0].value,
          precioProducto = inputsNewProdForm[1].value,
          stockProducto = inputsNewProdForm[2].value,
          id = 0,
          arrayProductos = [];

    // Clase que creara nuestros productos
    class NuevoProducto{
      constructor(id, nombre, precio, stock){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
      }
    }
    // Verificamos que los campos no esten vacíos
    if(nombreProducto == '' || precioProducto == '' || stockProducto == ''){
      alert("Debes completar todos los campos para poder agregar un nuevo producto al mercado.");
    }
    else{

      // Instanciamos nuestra clase para pasarle los parametros y utilizarla
      const nuevoProducto = new NuevoProducto(id, nombreProducto, precioProducto, stockProducto);

      arrayProductos.push(nuevoProducto); // Pusheamos nuestro objeto al array
      console.log(arrayProductos);  // Mostramos el contenido del array
      
      let template = '',
          container = document.getElementById("productosContainer");

          
      for( i = 0; arrayProductos.length; i++)
      {
        template += `
          <div class="row p-4">
            <div class="card bg-light p-0" style="width: 12.5rem;">
              <div class="card-header">
                ${arrayProductos[i].nombre}
              </div>
              <div class="card-body">
                <p>
                  Precio: ${arrayProductos[i].precio} <br>
                  <span class="small">Stock: ${arrayProductos[i].stock}</span>
                </p>
              </div>
              <div class=""></div>
            </div>
          </div>
        `;  
        
        container.innerHTML = template;
      }
      


    }

  }
}

main();