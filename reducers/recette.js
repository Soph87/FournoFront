export default function(recette = [], action){
    if (action.type == "selectRecette"){
        return action.recette
    } else {
        return recette
    }
}