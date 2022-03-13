//Para crear los id usaremos un paquete de js que se llama uuid
//este creará ids unicos e irrepetibles que usaremos en nuestra base de datos
// >npm i uuid
const { v4: uuidV4 } = require('uuid');

class Band {

    constructor (name = 'no-name'){
        this.id = uuidV4();
        this.name = name;
        this.votes=0;
    }

}

module.exports =  Band;