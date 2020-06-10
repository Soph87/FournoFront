export default function(titre = '', action){
    if (action.type == "ajoutTitre"){
        console.log(action.titre)
        return action.titre;
    } else {
        return titre;
    }
}