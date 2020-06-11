export default function(etapes = [], action){
    if (action.type == "ajoutEtapes"){
        let etapesCopie = [...etapes, ...action.etapes];
        console.log(etapesCopie)
        return etapesCopie;
    } else {
        return etapes;
    }
}