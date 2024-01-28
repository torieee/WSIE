//const userModel = require("../../../server/src/models/userModel");

const edamamLink = "https://api.edamam.com/api/recipes/v2?type=public&app_id=3cd9f1b4&app_key=e19d74b936fc6866b5ae9e2bd77587d9&q=";

var edamam = (() => {

    var searchRecipe = (event) => {
      event.preventDefault();

      const username = getUsername();

      getUserData(username)
      .then(async (userData) => {
        console.log(userData);
  
        console.log('Health of user: ', userData.health);
        console.log('Diet of user: ', userData.diet);
        //get strings for health and diet to append to fullLink
        var healthString = getHealthString(userData.health);
        console.log("HEALTH STRING: ", healthString);

        var dietString = getDietString(userData.diet);
        console.log("DIET STRING: ", dietString);

        //Hide recipe on new search (if it exists)
        const selectedRecipeDetails = document.getElementById('selected-recipe-details');
        selectedRecipeDetails.style.display = 'none';

        //Show the search results
        const recipeListDiv = document.getElementById('recipe-list');
        recipeListDiv.style.display = 'block';
        const recipeList = document.getElementById('recipeList');
        recipeList.innerHTML = '';

        const searchParam = document.getElementById('search-input').value;

        //Call restricitons file to get array HERE
        const fullLink = edamamLink + searchParam + dietString + healthString;
        console.log(fullLink);

        try {
            fetch(fullLink, { 
              method: 'GET',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }
            }).then(resp => resp.json())
              .then(results => {
                results.hits.forEach(data => {
                  const source = data.recipe.source;
                  const viableSource = sourceIsViable(source);
                  if(viableSource)
                  {
                    console.log(source, " - ", data.recipe.label);
                    const recipeName = document.createElement('li');
                    
                    //Image
                    if (data.recipe.images && data.recipe.images.LARGE && data.recipe.images.LARGE.url) {
                      const imageElement = document.createElement('img');
                      imageElement.src = data.recipe.images.LARGE.url;
                      imageElement.alt = data.recipe.label;
                      imageElement.style.display = 'block';
                      imageElement.style.margin = '0 auto';
                      recipeName.appendChild(imageElement);
                    }
          
                    const link = document.createElement('a');
                    link.textContent = data.recipe.label;
                    recipeName.appendChild(link);
                    recipeList.appendChild(recipeName);
                    link.onclick = () => showRecipe(data, data.recipe.source);
                  }
                });
            });
        } catch (e) {
          console.log(e);
        }
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
        return false;
    }

    //These are for the diet and health parameters passed to edamam api call
    function getHealthString(healthArray) {
      if (!healthArray.length) {
        return "";
      }
      const healthString = healthArray.map(healthItem => `&health=${healthItem}`).join('');
      return healthString;
    }
    
    function getDietString(dietArray) {
      if (!dietArray.length) {
        return "";
      }
      const dietString = dietArray.map(dietItem => `&diet=${dietItem}`).join('');
      return dietString;
    }
    

    function sourceIsViable(source){
      switch(source) {
        case 'Food52':
          return true;
        case 'Martha Stewart':
          return true;
        case 'BBC Good Food':
          return true;
        case 'Food Network':
          return true;
        case 'Simply Recipes':
          return true;
        case 'Delish':
          return true;
        case 'EatingWell':
          return true;
        default:
          return false;
      }
    }

    function showRecipe(json, source) {
      console.log('recipe: ', json);

      const ingredients = setupRecipe(json); //Recipe name and ingredients 
      const directionsList = document.getElementById('directions-list'); // List of directions
      directionsList.innerHTML = '';
      const link = json.recipe.url;
  
      // Create the URL with the recipeLink and source parameters
      const recipeSiteEndpoint = `http://${host}/api/v1/scrape-recipe/?recipeLink=${link}&source=${source}`;
  
      try {
          fetch(recipeSiteEndpoint, {
              method: 'GET',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
              }
          })
          .then((resp) => resp.json())
          .then(async (results) => {
              console.log("results: ", results);
              directionsList.innerHTML = '<ul>' + results.map(item => `<li>${item[0]}</li>`).join('') + '</ul>';

              const recipeTitleHeader = document.getElementById('recipe-name');
              
              const heartIcon = document.createElement('img');
              const heartButton = getHeartIcon(heartIcon);
            
              const isAlreadyLiked = await isFavorited(json);
              console.log("isAlreadyLiked: ", isAlreadyLiked);
              console.log("test: ", isAlreadyLiked!=true)
              if (isAlreadyLiked == true){
                heartIcon.style.filter = 'none'; // red
                console.log("changing color");
              }else{
                heartIcon.style.filter = 'sepia(100%)'; // grey
                console.log("changing color");
              }
              recipeTitleHeader.appendChild(heartButton);
              
              // When heart buttton is cliked toggle
              heartButton.addEventListener('click', function() {
                const heartIcon = this.querySelector('img');              
                if (heartIcon.style.filter === 'sepia(100%)') { // add to favorites 
                  heartIcon.style.filter = 'none'; 
                  putToFavorites(json, ingredients, results);
                } 
                else {
                  heartIcon.style.filter = 'sepia(100%)';
                  deleteInFavorites(json, ingredients, results); // remove
                }
                console.log('Heart button clicked!');
              });
          });
      } catch (e) {
        console.log(e);
      }
    return false;
  }
    
  function setupRecipe(json){
    // Hide search results
    const recipeList = document.getElementById('recipe-list');
    recipeList.style.display = 'none';

    // Show recipe
    const selectedRecipeDetails = document.getElementById('selected-recipe-details');
    selectedRecipeDetails.style.display = 'block';

    const recipeTitleHeader = document.getElementById('recipe-name'); // Title of the recipe
    const ingredientsHeader = document.getElementById('ingredients'); // Name: ingredients
    const ingredientList = document.getElementById('ingredient-list'); // List of ingredients
    const directionsHeader = document.getElementById('directions'); // Name: directions
    const recipeImageContainer = document.getElementById('recipe-image'); // Container for the recipe image

    recipeTitleHeader.innerHTML = '';
    ingredientsHeader.innerHTML = '';
    ingredientList.innerHTML = '';
    directionsHeader.innerHTML = '';
    recipeImageContainer.innerHTML = ''; 

    const ingredients = [];
    json.recipe.ingredientLines.forEach(ingredient => {
        ingredients.push(ingredient);
    });

    recipeTitleHeader.innerHTML = json.recipe.label;

    if (json.recipe.image) {
        const recipeImage = document.createElement('img');
        recipeImage.src = json.recipe.image;
        recipeImage.alt = json.recipe.label;
        recipeImage.style.maxWidth = '100%';
        recipeImageContainer.appendChild(recipeImage);
    }

    // Display ingredients and directions
    ingredientsHeader.innerHTML = 'Ingredients';
    ingredientList.innerHTML = `<ul>${ingredients.map(item => `<li>${item}</li>`).join('')}</ul>`;
    directionsHeader.innerHTML = 'Directions';

    return ingredients;
}
  async function putToFavorites(json, ingredients, directions) {

    const newFavoritedRecipe = {
      recipeName: json.recipe.label,
      recipeIngredients: ingredients,
      recipeDirections: directions.join(", "), //Directions array to string
      recipeUri: json.recipe.uri,
      recipeImage: (typeof  json.recipe.images.LARGE.url === 'undefined') ? "" : json.recipe.images.LARGE.url,
    };
    console.log("adding to favorites: ", newFavoritedRecipe.recipeName);
    try {
      const username = await getUsername();
      const userId = await getUserId(username);

      const response = await fetch(`http://${host}/api/v1/users/${userId}/favorites`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ favorites: newFavoritedRecipe })
      });

      if (!response.ok) {
        throw new Error('There was a problem!!!');
      }

      const updatedUser = await response.json();
      console.log('Updated user favorites:', updatedUser);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  }

  async function deleteInFavorites(json, ingredients, directions) {

    const recipeToDelete = {
      recipeName: json.recipe.label,
      recipeIngredients: ingredients,
      recipeDirections: directions.join(", "), //Directions array to string
      recipeUri: json.recipe.uri,
      recipeImage: (typeof  json.recipe.images.LARGE.url === 'undefined') ? "" : json.recipe.images.LARGE.url,
    };
    
    try {
      const username = await getUsername();
      const userId = await getUserId(username);
  
      const response = await fetch(`http://${host}/api/v1/users/${userId}/favorites`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ favorites: recipeToDelete })
      });
  
      if (!response.ok) {
        throw new Error('There was a problem!!!');
      }
  
      const updatedUser = await response.json();
      console.log('Updated user favorites:', updatedUser);
    } catch (error) {
      console.error('There was a problem with the delete operation:', error);
    }
  }

  async function isFavorited(json) {
    const recipeToGet = {
      recipeName: json.recipe.label,
    };
    try {
      const username = await getUsername();
      const userId = await getUserId(username);
  
      const response = await fetch(`http://${host}/api/v1/users/${userId}/favorites`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ favorites: recipeToGet })
      });
      if (!response.ok) {
        throw new Error('There was a problem!!!');
      }
      const isFavorited = await response.json();
      return isFavorited;
    } catch (error) {
      console.error('There was a problem with the delete operation:', error);
    }
  }
  
  function getHeartIcon(heartIcon){
    const heartButton = document.createElement('button');
    heartButton.classList.add('heart-button');
    heartButton.type = 'button';
    heartIcon.src = './assets/heart.png';
    heartIcon.alt = 'Heart Icon';
    heartIcon.style.width = `${10}vw`;
    heartIcon.style.marginLeft = `${3}vw`;
    heartButton.style.background = 'none';
    heartIcon.style.filter = 'sepia(100%)';
    heartIcon.classList.add('original-color');
    heartButton.appendChild(heartIcon);

    return heartButton;
  }
  
  return {
    searchRecipe,
  }
})();