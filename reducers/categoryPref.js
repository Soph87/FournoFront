export default function(categoryPref = [], action){
    if (action.type == "addToPref"){
        let newCatPref = [...categoryPref]
        newCatPref.push(action.categoryPref)
        return newCatPref
    } else if (action.type == 'replacePref'){
        return action.categorys
    } else {
        return categoryPref
    }
}