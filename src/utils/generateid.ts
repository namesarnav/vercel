export function generateId() {
    let id = ""
    for (let i=0; i<=10; i++) {
        
        var num = Math.floor((Math.random())*10);
        id = id+num.toString()
    }
    return id;
}

