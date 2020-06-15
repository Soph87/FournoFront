export default function(recette = 
    {
        categories: [], 
        titre: "", 
        prepa: {}, 
        ingredients: ["",], 
        etapes: [],
        photo: ""
    }, action){

    switch (action.type) {
        case "ajoutCategorie" :
            const addCatObj = {...recette};
            addCatObj.categories.push(action.cat);
            return addCatObj;
        case "suppCategorie" :
            const suppCatObj = {...recette};
            const index = suppCatObj.categories.indexOf(action.cat);
            suppCatObj.categories.splice(index, 1);
            return suppCatObj;
        case "ajoutTitre" :
            const addTitreObjet = {...recette};
            addTitreObjet.titre = action.titre;
            return addTitreObjet;
        case "ajoutPrepa" :
            const addPrepaObj = {...recette};
            addPrepaObj.prepa = action.prepa;
            return addPrepaObj;
        case "ajoutIngredient" :
            const addIngredientsObj = {...recette};
            addIngredientsObj.ingredients.push(action.ingredient);
            //console.log(addIngredientsObj.ingredients);
            return addIngredientsObj;
        case "ajoutEtapes" :
            const addEtapesObj = {...recette};
            addEtapesObj.etapes = action.etapes;
            return addEtapesObj;
        case "ajoutIng":
            let test = {...recette}
            test.ingredients.push(action.ingredient)
            return test
        case "killRecette" :
            const recetteVide = {
                categories: [], 
                titre: "", 
                prepa: {}, 
                ingredients: ["",], 
                etapes: [],
                photo: ""
            }
            return recetteVide;
        default:
            return recette;
    }
}