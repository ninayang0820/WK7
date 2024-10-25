window.addEventListener('load', () => {

  console.log("Client side js is loaded!");

  fetch('/data')
    .then(response => response.json())
    .then(data => {
      console.log(data);

      let theData = data.favoriteRecipes;

      //Select for element on the page
      let recipes = document.getElementById('recipes');
      //Loop through data and append to the page
      for (let i = 0; i < theData.length; i++) {
        let recipeName = theData[i].recipeName;
        let cuisine = theData[i].cuisine;
        let ingredients = theData[i].ingredients;
        let cookingTime = theData[i].cookingTime;

        let currentEl = document.createElement('tr');
        let nameEl = document.createElement('td');
        nameEl.innerHTML = recipeName;
        let cuisineEl = document.createElement('td');
        cuisineEl.innerHTML = cuisine;
        let ingredientsEl = document.createElement('td');
        ingredientsEl.innerHTML = ingredients;
        let cookingTimeEl = document.createElement('td');
        cookingTimeEl.innerHTML = cookingTime;

        currentEl.appendChild(nameEl);
        currentEl.appendChild(cuisineEl);
        currentEl.appendChild(ingredientsEl);
        currentEl.appendChild(cookingTimeEl);
        recipes.appendChild(currentEl);
      }

    })
    .catch(error => {
      console.log(error)
    });
});


//Create an event listener to collect and POST data
let recipeSubmit = document.getElementById('recipe-submit');
recipeSubmit.addEventListener('click', () => {
  console.log("Button was clicked!");

  let nameInput = document.getElementById('name-input');
  let currentName = nameInput.value;

  let cuisineInput = document.getElementById('cuisine-input')
  let currentCuisine = cuisineInput.value;

  let ingredientsInput = document.getElementById('ingredients-input')
  let currentIngredients = ingredientsInput.value;

  let cookingTimeInput = document.getElementById('cookingTime-input')
  let currentCookingTime = cookingTimeInput.value;

  let recipeObj = {
    recipeName: currentName,
    cuisine: currentCuisine,
    ingredients: currentIngredients,
    cookingTime: currentCookingTime,
  };
  console.log(recipeObj);

  let recipeObjJSON = JSON.stringify(recipeObj);

  fetch('/new-data', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: recipeObjJSON
  })
    .then(response => response.json())
    .then(data => {
      console.log("Did this work?");
      console.log(data);
    })
    .catch(error => {
      console.log(error);
    });

  let recipes = document.getElementById('recipes');

  let currentEl = document.createElement('tr');
  let nameEl = document.createElement('td');
  nameEl.innerHTML = currentName;
  let cuisineEl = document.createElement('td');
  cuisineEl.innerHTML = currentCuisine;
  let ingredientsEl = document.createElement('td');
  ingredientsEl.innerHTML = currentIngredients;
  let cookingTimeEl = document.createElement('td');
  cookingTimeEl.innerHTML = currentCookingTime;

  currentEl.appendChild(nameEl);
  currentEl.appendChild(cuisineEl);
  currentEl.appendChild(ingredientsEl);
  currentEl.appendChild(cookingTimeEl);
  recipes.appendChild(currentEl);

  nameInput.value = ''
  cuisineInput.value = '';
  ingredientsInput.value = '';
  cookingTimeInput.value = '';

});
