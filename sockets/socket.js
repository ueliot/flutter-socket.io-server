const { io } = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new Bands();
 console.log('init server');

bands.addBand(new Band('Queen'));
bands.addBand(new Band("Bon Jovi"));
bands.addBand(new Band("Heroes del Silencio"));
bands.addBand(new Band("Metalica"));

//console.log(bands);

// Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado');

    client.emit('active-bands', bands.getBands());

    client.on('vote-band', payload =>{
        //console.log(payload)
        bands.voteBand(payload.id);
        io.emit("active-bands", bands.getBands());  
        //con esto informo que ha habido un cambio a los clientes conectados
    })

    client.on("add-band", (payload) => {
        const newBand = new Band(payload.name);      
      bands.addBand(newBand);
      io.emit("active-bands", bands.getBands());
     
    });


     client.on("delete-band", (payload) => {
       bands.deleteBand(payload.id);
       io.emit("active-bands", bands.getBands());
     });



    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
   

    client.on('mensaje', ( payload ) => {
        //console.log('Mensaje', payload);
        io.emit( 'mensaje', { admin: 'Nuevo mensaje' } );        
    });

    // client.on('emitir-mensaje', (payload)=>{
    //     //console.log(payload);
    //      //io.emit('nuevo-mensaje', payload); //emite a todos los clientes 
    //      client.broadcast.emit('emitir-mensaje', payload);  //emite a todos menos al que lo emitió   

    // })


});
