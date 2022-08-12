function productos(){
  let agregar = document.getElementById("btn_agregar_producto"); // Botón para agregar más productos
  let sacar = document.getElementById("btn_restar_producto"); // Botón para sacar productos
  let unidades = 0;  // Total inicial de la cant. de productos
  let precio_por_unidad = 70;
  

  // AGREGAR MAS PRODUCTOS
  agregar.addEventListener("click", function(){ // Al darle click al boton +
    unidades++; // Por cada click al boton, incremento en 1
    let total = unidades * precio_por_unidad;

    console.log("<---------------------------------->");
    console.log("TOTAL: ", total, "$", "// ", "(", "Cantidad seleccionada: ", unidades,")");

    descuento(unidades, total); // Paso como parametros las unidades y el total
  });
  // SACAR PRODUCTOS
  sacar.addEventListener("click", function(){ // Evento para restar la cantidad de cafes comprados
    if(unidades == 0){
      console.log("<------------------ ERROR ---------------->");
      console.log("No puedes tener una cantidad de productos menores a cero.");
    }
    else{
      unidades--;
      let total = unidades * precio_por_unidad;

      console.log("<---------------------------------->");
      console.log("TOTAL: ", total, "$", "// ", "(", "Cantidad seleccionada: ", unidades,")");

      descuento(unidades, total); // Paso como parametros las unidades y el total
    }
    
  });
  
}


function descuento(u, t){ // u = unidades, t = total
  if(u >= 5 && u < 10){ // Si el rango está entre 5 y 9, descuento del 5%
    console.log("Precio final con descuento del 5%: ", t-(t * 0.05));
  }
  else if(u >= 10 && u < 15){ // Si el rango está entre 10 y 14, 10% descuento
    console.log("Precio final con descuento del 10%: ", t-(t * 0.10));
  }
  else if(u >= 15){ // Si es mayor a 15 el descuento será del 15%
    console.log("Precio final con descuento del 15%: ", t-(t * 0.15));
  }
}

productos();  // Llamo a la función productos


