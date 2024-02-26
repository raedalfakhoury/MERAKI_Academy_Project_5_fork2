const socketCi =(socket, next) => {
    if(socket[0] !== "message"){
        next(new Error("socket middleware Error"))
    }else{
        console.log("socket",socket);
        next();
    }
 
  }


  module.exports = socketCi