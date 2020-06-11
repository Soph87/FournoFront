export default function(ingredients = [], action){
    if (action.type == "ajoutIngredients"){
        let ingredientsCopie = [...ingredients, ...action.ingredients];
        console.log(ingredientsCopie)
        return ingredientsCopie;
    } else {
        return ingredients;
    }
}