function main(){
  // Variables y Constantes
  const newProdForm = document.getElementById("newProduct_Form"),
        inputsNewProdForm = newProdForm.getElementsByTagName("input"),
        buttons = newProdForm.getElementsByTagName("button");

        
        const arrayProductos = [];
        // Boton "Añadir nuevo producto"
        buttons[0].addEventListener("click", crearNuevoProducto);
        
  // Funcion que creara al nuevo producto
  function crearNuevoProducto(e)
  {
    e.preventDefault(); // Prevenimos el comportamiento por default del formulario para que no recargue la pagina
          
          
    let nombreProducto = inputsNewProdForm[0].value,
        precioProducto = inputsNewProdForm[1].value,
        stockProducto = inputsNewProdForm[2].value,
        id = 0;
    // Clase que creara nuestros productos
    class NuevoProducto
    {
      constructor(id, nombre, precio, stock){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
      }
    }
    // Verificamos que los campos no esten vacíos
    if(nombreProducto == '' || precioProducto == '' || stockProducto == '')
    {
      swal({
        title: "Error",
        text: "Completa todos los campos.",
        icon: "warning",
        button: false,
        timer: 2000
      });
    }
    else
    {
      // Instanciamos nuestra clase para pasarle los parametros y utilizarla
      const nuevoProducto = new NuevoProducto(id, nombreProducto, precioProducto, stockProducto);
      arrayProductos.push(nuevoProducto); // Pusheamos nuestro objeto al array
      console.log(arrayProductos);  // Mostramos el contenido del array
      
      let template = '',
          container = document.getElementById("productosContainer");

          
      for( i = 0; arrayProductos.length; i++)
      {
        
        template += `
            <div class="card bg-light p-0 mb-3" style="width: 12.5rem;">
              <div class="card-header">
                ${arrayProductos[i].nombre}
              </div>
              <div class="card-body">
                <p>
                  ID: ${arrayProductos[i].id} <br>
                  Precio: ${arrayProductos[i].precio} <br>
                  <span class="small">Stock: ${arrayProductos[i].stock}</span>
                </p>
              </div>
              <div class="card-footer">
                <button class="btn btn-danger">Eliminar</button>
              </div>
            </div>
        `;  

        container.innerHTML = template;
      }
      


    }

    // Agregar borrar producto

  }

}

main();