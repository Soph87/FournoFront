export default function(categories = [], action){
    if (action.type == "ajoutCat"){
        catsCopie = [...categories];
        catsCopie.push(action.cat);
        return catsCopie;
    } else if(action.type == "suppCat") {
        catsCopie = [...categories];
        let index = catsCopie.indexOf(action.cat);
        catsCopie.splice(index, 1);
        return catsCopie;
    } else {
        return categories;
    }
}