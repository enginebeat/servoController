
/***************** ServerController **************/
var ServerController = (()=>{
  //MyModules Require
  var SerialPortController = require('./myModules/SerialPortController');
  var SerialPortLister = require('./myModules/SerialPortLister');
  //var ServerController = require('./myModules/ServerController');
  //var SocketController = require('./myModules/SocketController');
  var serialPortController;

  var express = require('express');
  var app = express();
  app.use(express.static('server/public'));

  var socket = require("socket.io");

  var server = app.listen(9000, ()=>{
    console.log('server started on port 9000')

  });


  //Socket setup
  var io = socket(server);

  io.on('connection', (socket)=>{
    console.log('new connection', socket.id);
    //Receive values from the client
    socket.on('servoValue', (data)=>{
      console.log(data.servoID);
      console.log(data.servoValue);

      //decimal to ascii hex conversion
      var decimalValue = data.servoValue;
      var ln = decimalValue & 15;

      console.log('ln:',hexToAscii(ln));
      var hn = (decimalValue & 240) >> 4;
      console.log('hn:',hexToAscii(hn));

      /* Need to implement sending Data to the serial Port
         But only when the serialPort is created. */
      if(serialPortController != null){
        serialPortController.sendData(ln.toString());
        serialPortController.sendData(hn.toString());
      }
    });
    
    /* Sends Message when port is opened */
    function portWasOpen(){
      console.log("Serial Port is Open");
    };

    /* hopefully for detection of port closure */
    function portAsClosed(){
      serialPortController = null;
      console.log('port As closed');
      //sendPortInfo();
    };

    function portDataReceived(data){
      console.log("received Data: ", data.toString());
        socket.emit('COMData', {
          sData: data.toString()
        });
    };

    // Start Serial Port and get data if available
    socket.on('openPortRequest', (sSettingsData)=>{
      //Go and create a new SerialPortController and pass it the callback functions
      serialPortController = new SerialPortController(sSettingsData, portWasOpen, portAsClosed, portDataReceived);
      console.log('creating port');
      sendPortInfo();
    });
    
    
    // Sends port Info when port is open or null if not. 
    function sendPortInfo(){
      var portInfo = null;
      if(serialPortController != null){
        portInfo = serialPortController.getPortInfo();
        console.log('serialPortController is not null');
      }
      socket.emit('portSettings', {
        portInfo: portInfo
      });
    };
    

    socket.on('COMListRequest', ()=>{
      SerialPortLister.getSerialPortsList((COMPortLista)=>{
        var lista = COMPortLista;
        console.log(lista);
        console.log('in it');
        socket.emit('COMList', {
          list: lista
        });
      });
      console.log('Requesting COM List')
    });

    socket.on('textData', (data)=>{
      console.log(data.textData);
      if(serialPortController!= null){
        serialPortController.sendData(data.textData);
      }
      
    });
    
    /* When a client connects this will always be fired
    It always needs to return something either a valid port/settings
    or a null object. */
    socket.on('portInfoRequest', ()=>{
      console.log('getting PortSettings');
      sendPortInfo();
      
    });

    /* Deals with a request to close the port 
    need to check this one... at the moment I am sending 
    the port info to reset everything, but in the future I will 
    want to reset everything on the client's to the initial position*/
    socket.on('closePortRequest', ()=>{
      serialPortController.closePort();
      serialPortController = null;
      console.log('port closed');
      //socket.emit('closePortReply', {});
      sendPortInfo();

    });
  });

  function hexToAscii(hexValue){
    if(hexValue >= 0 && hexValue <= 9){
      return hexValue + 48;
    } else if(hexValue >= 10 && hexValue <= 15){
      return hexValue + 55;
    } else{
      return NaN;
    }
  }

})();
