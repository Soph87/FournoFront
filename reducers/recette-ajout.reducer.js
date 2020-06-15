export default function(recette = 
    {
        categories: [], 
        titre: "", 
        prepa: {}, 
        ingredients: [], 
        etapes: [],
        photo: ""
    }, action){
    switch (action.type) {
        case "ajoutCategorie" :
            let addCatObj = {...recette};
            addCatObj.categories.push(action.cat);
            return addCatObj;
        case "suppCategorie" :
            let suppCatObj = {...recette};
            const index = suppCatObj.categories.indexOf(action.cat);
            suppCatObj.categories.splice(index, 1);
            return suppCatObj;
        case "ajoutTitre" :
            let addTitreObjet = {...recette};
            addTitreObjet.titre = action.titre;
            return addTitreObjet;
        case "ajoutPrepa" :
            let addPrepaObj = {...recette};
            addPrepaObj.prepa = action.prepa;
            return addPrepaObj;
        case "ajoutIngredients" :
            let addIngredientsObj = {...recette};
            addIngredientsObj.ingredients = action.ingredients;
            return addIngredientsObj;
        case "ajoutEtapes" :
            let addEtapesObj = {...recette};
            addEtapesObj.etapes = action.etapes;
            return addEtapesObj;
        case "ajoutIng":
            let test = {...recette}
            test.ingredients.push(action.ingredient)
            return test
        case "killRecette" :
            return recette;
        default:
            return recette;
    }
}