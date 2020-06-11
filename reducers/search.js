export default function(recherche = "", action){
    if (action.type == "sendSearch"){
        return action.searchText
    } else {
        return recherche
    }
}