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
    
    const nombreProducto = inputsNewProdForm[0].value,
          precioProducto = inputsNewProdForm[1].value,
          stockProducto = inputsNewProdForm[2].value,
          arrayProductos = [];

    

  }
}

main();