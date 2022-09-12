
function main()
{
  // Variables
  let formulario_registro =  document.getElementById("SignIn_Form"),
      formulario_ingreso = document.getElementById("LogIn_Form"),
      botones_ingreso = formulario_ingreso.getElementsByTagName("button"),
      botones_registro = formulario_registro.getElementsByTagName("button");
  

  function cambiar_entre_formularios()
  {
    function addClassForToggle()
    { // Funcion que agrega la clase bootstrap d-none para cambiar entre formularios
      formulario_ingreso.classList.toggle("d-none");
      formulario_registro.classList.toggle("d-none");
    }
    
    botones_ingreso[1].addEventListener("click", addClassForToggle); // Boton "Registrarse"
    botones_registro[0].addEventListener("click", crear_nuevo_usuario); // Boton "Aceptar" que creara al usuario
    botones_registro[1].addEventListener("click", addClassForToggle);  // Boton "Volver atras"
  }
  cambiar_entre_formularios(); // Cambiar entre formularios -- LogIn & SignIn
  

  function crear_nuevo_usuario()
  {
    // Variables
    const usuariosArray = []; // Array que contrenda a los usuarios
    
    let inputs = formulario_registro.getElementsByTagName("input"),
        inputUsuario = inputs[0].value,
        inputContraseña = inputs[1].value,
        id = 0;  // Valores de entrada de los inputs
    
    
    // Clase que nos creara el nuevo usuario
    class NuevoUsuario
    {
      constructor(ParametroID, ParametroUsuario, ParametroContraseña)
      {
        this.id = ParametroID;
        this.usuario = ParametroUsuario;
        this.contraseña = ParametroContraseña;
      }
    }
    
    // Instanciamos la clase para poder usarla y le pasamos los parametros de los inputs
    const miNuevoUsuario = new NuevoUsuario(id, inputUsuario, inputContraseña);
    usuariosArray.push(miNuevoUsuario);
    
    const usuariosJSON = JSON.stringify(usuariosArray);
    


    localStorage.setItem("Usuarios", usuariosJSON);

    // CONTINUAR CON MEJORAR EL ARRAY PARA CONTENER MÁS USUARIOS Y EL KEY:VALUE DEL LOCAL STORAGE

  }


  function ingresar()
  {
    botones_ingreso[0].addEventListener("click", validacion);

    function validacion(e)
    {
      e.preventDefault(); // Prevenimos el comportamiento del formulario

      const usuario = localStorage.getItem("Usuarios"),
            usuarioObject = JSON.parse(usuario),
            inputs_ingreso = formulario_ingreso.getElementsByTagName("input");
      //console.log(usuario); // Devuelve el array almacenado en el localstorage
      //console.log(usuarioObject[0]["usuario"]); // Devuelve del localstorage el usuario
      //console.log(usuarioObject[0]["contraseña"]); // Devuelve del localstorage la contraseña

      // Si las credenciales ingresadas coinciden con las del local, entras
      if( usuarioObject[0]["usuario"] == inputs_ingreso[0].value && usuarioObject[0]["contraseña"] == inputs_ingreso[1].value )
      {
        window.location.href = "productos.html";
      }
      else  // Sino, vuelve a intentar
      {
        alert("Credenciales incorrectas.");
      }
      

    }
  }
  ingresar();

}


main();