export default function(prenom = "", action){
    if (action.type == "addPrenom"){
        return action.prenom
    } else {
        return prenom
    }
}