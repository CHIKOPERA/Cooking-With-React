import React, { useState, useEffect } from "react";
import RecipeList from "./RecipeList";
import "../css/App.css";
import { v4 as uuidv4 } from "uuid";
import RecipeEdit from "./RecipeEdit";

export const RecipeContect = React.createContext();
const LOCAL_STORAGE_KEY = "cookingWithReact.recipes";

function App() {
  const [recipes, setRecipes] = useState(sampleRecipes);
  const [selectedRecipeId,setSelectedRecipeId] = useState();
  const selectedRecipe = recipes.find(recipe=> recipe.id == selectedRecipeId);
  //////hooks
  useEffect(() => {
    const recipesJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (recipesJSON != null) {
      setRecipes(JSON.parse(recipesJSON));
    }
  }, []);

  useEffect(() => {
    console.log("logged");
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes));
  }, [recipes]);

  const functions = {
    handleRecipeAdd,
    handleRecipeDelete,
    handleRecipeSelect,
    handleRecipeChange
  };
  /////Functions
  function handleRecipeAdd() {
    const newRecipe = {
      id: uuidv4(),
      name: "new ",
      cookTime: "0.00",
      instructions: "No instructions",
      ingredients: [{ id: uuidv4(), name: "name", amount: "1Tbs" }],
    };

    setSelectedRecipeId(newRecipe.id);
    setRecipes([...recipes, newRecipe]);
  }
  function handleRecipeDelete(deleteId) {
    setRecipes(recipes.filter((recipe) => recipe.id !== deleteId));
  }
  function handleRecipeSelect(id){
    setSelectedRecipeId(id);
  }

  //Update recipe
  function handleRecipeChange(id,recipe){
    const newRecipes = [...recipes];
    const index = newRecipes.findIndex(x => x.id ===id);
    newRecipes[index]=recipe;
    setRecipes(newRecipes);

  }
  return (
    <RecipeContect.Provider value={functions}>
      <div>
        <RecipeList recipes={recipes} />
       { selectedRecipe && <RecipeEdit recipe={selectedRecipe} />}
      </div>
    </RecipeContect.Provider>
  );
}

const sampleRecipes = [
  {
    id: 1,
    name: "Plain chicken",
    servings: 3,
    cookTime: "1.45",
    instructions:
      "1. Put Tanya on the map\n 2. Be the best bad ass \n 3. Chow the chicks",
    ingredients: [
      { id: 1, name: "beef", amount: "4 KG" },
      { id: 2, name: "Salt", amount: "2 Ts" },
    ],
  },
  {
    id: 2,
    name: "Plain pork",
    servings: 5,
    cookTime: "0.45",
    instructions:
      "1. Put port in oven \n 2. Roast that dirty animal \n 3. Chow the swine",
    ingredients: [
      { id: 1, name: "pork", amount: "3 KG" },
      { id: 2, name: "Paprika", amount: "2 Tbs" },
    ],
  },
];
export default App;
