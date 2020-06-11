export default function(newRecette = [], action){
    if (action.type == "addMarmiton"){
        return action.newRecette
    } else {
        return newRecette
    }
}