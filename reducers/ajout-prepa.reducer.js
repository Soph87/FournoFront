export default function(prepa = '', action){
    if (action.type == "ajoutPrepa"){
        console.log(action.prepa)
        return action.prepa;
    } else {
        return prepa;
    }
}