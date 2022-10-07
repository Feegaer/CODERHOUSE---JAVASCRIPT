let input = document.getElementsByTagName("input");
const container = document.getElementById("container"); 

main();
cards_category();

function main()
{
  
  



  
}

function search()
{
  input[0].addEventListener("input", () => {
    console.log(input[0].value);  // Valor mientras se escribe
    fetchRecipe(input[0].value);
  });
}

function fetchRecipe(inputValue)
{
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputValue}`)
    .then((response) => console.log(response))
    .then((json) => response.json())
    
}

function cards_category()
{
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`)  // Devuelve una promesa
    .then((response) => response.json())  //  Si la promesa es resuelta, tenemos una respuesta la que es tratada con json
    .then((data) => {
      //console.log(data.drinks) // Array con la respuesta
      data = data.drinks; // data contiene un array donde están las bebidas, debemos volver a acceder para tener todas las categorias

      data.forEach((category) => {  // Para cada elemento del array, creamos un boton en card_container
        //console.log(category["strCategory"]);
        
        container.innerHTML += `
          <div class="col-4">
            <div class="row p-2">
              <button class="col-12" style="height: 8.5rem" value="${category["strCategory"]}">${category["strCategory"]}</button>
            </div>
          </div>`;
      });

      t();

    })

  
}



function t()
{
  let btns = container.getElementsByTagName("button");

  for(let btn of btns)
  {
    btn.addEventListener("click", () => {
      fetch_category(btn.value);
    });
  }

  
  
}

function fetch_category(value)
{
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${value}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data["drinks"]);
      data = data["drinks"];
      container.innerHTML = '';
      
      data.forEach(trago => {
        container.innerHTML += `
        <div class="col-6">
          <div class="row p-2">
            <div class="col-12" style="
              height: 22.5rem; 
              background: url(${trago.strDrinkThumb}), 
                          rgba(0, 0, 0, 0.5); 
              background-position: center; 
              background-size: cover;
              background-repeat: no-repeat;
              background-blend-mode: overlay;
            ">
              ...
            </div>
          </div>
        </div>

        `;
      });
    })
}