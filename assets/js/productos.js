function main(){
  // Variables y Constantes
  const newProdForm = document.getElementById("newProduct_Form"),
        inputsNewProdForm = newProdForm.getElementsByTagName("input"),
        buttons = newProdForm.getElementsByTagName("button"),
        arrayProductos = [];

  // Funcion que reutilizaremos para crear alertas
  function mySweetAlert(icono, texto, timer, button)
  {
    swal({
      icon: icono,
      text: texto,
      timer: timer,
      button: button
    });
  }

  // Funcion para los eventos click
  function eventoClick(boton, arrayPos, miFuncion)
  {
    boton[arrayPos].addEventListener("click", miFuncion)
  }
        
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
      mySweetAlert("warning", "Completa todos los campos.", 3000, false);
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



  //
  // Boton "Añadir nuevo producto"
  eventoClick(buttons, 0, crearNuevoProducto);


}

main();