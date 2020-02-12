//mocks => arreglos que simulan el funcionamiento de inserts y selects de BD
const list = [];

function addMessage(message){
    list.push(message);
}

function getMessage(){
    return list;
}

module.exports = {
    add: addMessage,
    list: getMessage,
    //get:
    //update:
    //delete:
}