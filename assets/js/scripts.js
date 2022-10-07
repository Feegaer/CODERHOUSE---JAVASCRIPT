let input = document.getElementsByTagName("input");
const container = document.getElementById("container"); 

main();
cards_category();

function main()
{
  
  



  
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

      get_btn_value();

    })

  
}



function get_btn_value()
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
      //console.log(data["drinks"]);
      data = data["drinks"];
      container.innerHTML = '';
      
      data.forEach(trago => {
        container.innerHTML += `
        <div class="col-4">
          <div class="row p-1">
            <button class="card p-0 border-0 text-bg-dark drink_card" value="${trago.idDrink}">
              <img src="${trago.strDrinkThumb}" class="card-img" alt="An image of the drink">
              <div class="card-img-overlay d-flex align-items-center justify-content-center text-center">
                <h5 class="card-title" style="text-shadow: 1.5px 1.5px 5px #333333">${trago.strDrink}</h5>
              </div>
            </button>
          </div>
        </div>

        `;
      });

      view_recipe();

    })
}


function view_recipe()
{
  let drinks = document.getElementsByClassName("drink_card");

  for (let drink of drinks)
  {
    drink.addEventListener("click", () => {
      let drink_value = drink.value;

      //console.log(drink_value);
      fetch_recipe(drink_value);
    });
  }
}

function fetch_recipe(value)
{
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${value}`)
    .then((response) => response.json())
    .then((data) => {
      
      data = data["drinks"][0];
      //console.log(data[`${"strIngredient"+"1"}`]);


      container.innerHTML = `
      <div class="col-12">
        <div class="row p-4">
          <div class="card p-0">
            <img src="${data.strDrinkThumb}" class="card-img-top" alt="...">
            <div class="card-body p-4">
              <h5 class="card-title mb-4">${data.strDrink}</h5>
              <p class="card-text">
                <span class="fw-semibold">Category:</span> ${data.strCategory} &nbsp;&nbsp;&nbsp;&nbsp;
                <span class="fw-semibold">Type:</span> ${data.strAlcoholic}  
              </p>
              <h6 class="card-title">Ingredients</h6>
              <ul class="list-group mb-4">${iterator(data, "strIngredient", "strMeasure")}</ul>
              <h6 class="card-title">Preparation</h6>
              <p class="card-text">
                ${data.strInstructions}
              </p>
            </div>
          </div>
        </div>
      </div>

      `;


      
    })
}

function iterator(data, resource, resource2)
{ // FUNCION QUE ITERA PARA RECORRER EL ARRAY DE INGREDIENTES O MEDIDAS Y OBTENERLAS
  console.log(data);

  let i = 1,
      lim = 15,
      template = "";
  

  for (i; i <= lim; i++)
  {
    if(data[resource + i] === null)
      i = lim + 1;
    else   
      template += `<li class="border-none" style="list-style-type: none;">${data[resource + i] + " (" + data[resource2 + i] + ")"}</li>`;
  }

  console.log(template) ;

  return template;

}