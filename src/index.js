function displayRecipe(response) {
    let recipeContainer = document.querySelector("#recipe");

    // Display the response in the recipe container using Typewriter effect
    new Typewriter(recipeContainer, {
      strings: [response.data.answer], // Ensure the answer is passed as an array for the effect
      autoStart: true,
      delay: 10,
      cursor: "",
    });
}

function generateRecipe(event) {
    event.preventDefault();

    let instructionsInput = document.querySelector("#user-instructions");
    let apiKey = "3ac3f10t353d97430b8cf7f93a0b8o4b";
    let context = `
      You are a recipe expert with a passion for crafting delicious and simple recipes. 
      Your mission is to generate a recipe in basic HTML, including a list of ingredients in an <ul> tag 
      and the steps to prepare it in an <ol> tag. 
      Sign the recipe with "Created by SheCodes AI" in a <strong> element at the end of the recipe.
    `;
    
    let prompt = `User instructions: Generate a recipe for ${instructionsInput.value}`;
    let apiURL = `https://api.shecodes.io/ai/v1/generate?prompt=${encodeURIComponent(prompt)}&context=${encodeURIComponent(context)}&key=${apiKey}`;
    
    let recipeElement = document.querySelector("#recipe");

    // Check if the recipe already exists to avoid overwriting
    if (recipeElement.innerHTML === '') {
        recipeElement.classList.remove("hidden");
        recipeElement.innerHTML = `<div class="generating">⏳ Generating a recipe for ${instructionsInput.value}</div>`;
    }
  
    axios.get(apiURL)
      .then(displayRecipe)
      .catch((error) => {
        recipeElement.innerHTML = "🚫 There was an error generating the recipe. Please try again.";
        console.error("API Error:", error);
      });
}

let recipeFormElement = document.querySelector("#recipe-generator-form");
recipeFormElement.addEventListener("submit", generateRecipe);
