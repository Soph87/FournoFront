export default function(category = "", action){
    if (action.type == "selectCat"){
        return action.category
    } else {
        return category
    }
}