function SocketController(){
  //Socket setup
  var socket = require("socket.io");
  var io = socket(server);

  io.on('connection', (socket)=>{
    console.log('new connection', socket.id);
    //Receive values from the client
    socket.on('servoValue', (data)=>{
      console.log(data.servoID);
      console.log(data.servoValue);


      /* Need to implement sending Data to the serial Port
         But only when the serialPort is created. */
      //serialPortController.sendData(data.servoValue);

    });

    // Start Serial Port and get data if available
    socket.on('sPortSettings', (data)=>{
      console.log(data.databitsValue);
      console.log(data.stopbitsValue);
      console.log(data.parityValue);
      console.log(data.baudrateValue);
      console.log(data.COMPortValue);
      var serialPortController = new SerialPortController(portSettings, (data)=>{
        console.log("received Data: ", data.toString());
        socket.emit('COMData', {
          sData: data.toString()
        });


      });
    });

    //serialPort.sendData('R');

    socket.on('COMListRequest', ()=>{
      SerialPortLister.getSerialPortsList((COMPortLista)=>{
        var lista = COMPortLista;
        console.log(lista);
        console.log('in it');
        socket.emit('COMList', {
          list: lista
        });
      });


        //COMPortList: getSerialPortsList

      console.log('Requesting COM List')
      //console.log(getSerialPortsList());
    });
  });

}
module.exports = SocketController;
