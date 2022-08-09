let nombre = prompt("Ingrese un nombre o escriba SALIR para terminar la ejecución:");
let cantidad_usuarios = 0;


while(nombre != "SALIR"){
  console.log("El nombre del usuario es ", nombre);

  nombre = prompt("Ingrese otro nombre:");
  cantidad_usuarios++;
}

for(let i = 1; i <= cantidad_usuarios; i++){
  if(i%2 == 0){
    console.log("Contando usuarios registrados...", "(", i, "-", "número par", ")");
  }
  else{
    console.log("Contando usuarios registrados...", "(", i, "-", "número impar", ")");
  }
}

