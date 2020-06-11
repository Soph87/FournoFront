export default function(photo = "", action){
    if (action.type == "addPhoto"){
        return action.photo
    } else if (action.type === "killPhoto"){
        return ""
    } else {
        return photo
    }
}