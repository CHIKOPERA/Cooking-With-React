import React, { useContext } from "react";
import RecipeIngredientEdit from "./RecipeIngredientEdit";
import { RecipeContect } from "./App";
import { v4 as uuidv4 } from "uuid";

export default function RecipeEdit({ recipe }) {
    const {handleRecipeChange,handleIngredientSelect} = useContext(RecipeContect);

function handleChange(changes){
    handleRecipeChange(recipe.id, {...recipe,...changes})
}

function handleIngredientChange(id,ingredient){
    const newIngredients = [...recipe.ingredients];
    const index = newIngredients.findIndex(x => x.id ===id);
    newIngredients[index]=ingredient;
    handleChange({ingredient:newIngredients})
}

function handleIngredientDelete(id){
    handleChange({ingredient:recipe.ingredients.filter(x => x.id !== id)})
}

function handleIngredientAdd(){
    const newIngredient ={
        id :uuidv4(),
        name:'',
        amount:''
    }
    handleChange({ingredients:[...recipe.ingredients,newIngredient]})
}
  return (
    <div className="recipe-edit">
      <div className="recipe-edit__remove-button-container">
        <button 
        className="btn recipe-edit__remove-button"
        onClick={()=> handleIngredientSelect(undefined)}
        
        >&times;</button>
      </div>
      <div className="recipe-edit__details-grid">
        <label className="form-label recipe_edit__label" htmlFor="name">
          Name
        </label>
        <input
          className="form-control recipe_edit__input"
          type="text"
          name="name"
          id="name"
          onInput={e => handleChange({name:e.target.value})}
          value={recipe.name}
        />
        <label className="form-label" htmlFor="cookTime">
          Cook time
        </label>
        <input
          className="form-control recipe_edit__input"
          type="text"
          name="cookTime"
          id="cookTime"
          value={recipe.cookTime}
          onInput={e => handleChange({cookTime:e.target.value})}

        />
        <label className="form-label recipe_edit__label" htmlFor="servings">
          Servings
        </label>
        <input
          className="form-control recipe_edit__input"
          type="number"
          min="1"
          name="servings"
          id="servings"
          value={recipe.servings}
          onInput={e => handleChange({servings:parseInt(e.target.value)|| ''})}

        />
        <label className="form-label recipe_edit__label" htmlFor="instructions">
          Instructions
        </label>
        <textarea
          className="form-control recipe_edit__input"
          type="text"
          name="instructions"
          id="instructions"
          value={recipe.instructions}
          onInput={e => handleChange({instructions:e.target.value})}

        />
      </div>
      <br />
      <label className="form-label recipe_edit__label">Ingredients</label>
      <div className="recipe-edit__ingredient-grid">
        <div>Name</div>
        <div>Amount</div>
        <div></div>
        {
            recipe.ingredients.map(ingredient => (
                <RecipeIngredientEdit 
                key={ingredient.id} 
                ingredient= {ingredient} 
                handleIngredientChange={handleIngredientChange}
                handleIngredientDelete={handleIngredientDelete}
                />
            ))
        }




      </div>
      <div className="recipe-edit__add-ingredient-btn-container">
        <button className="btn btn-primary"
        onClick={()=> handleIngredientAdd()}
        
        >Add ingredients</button>
      </div>
    </div>
  );
}
