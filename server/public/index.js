//Make connection
var serverIPAddress = location.hostname;
var serverPort = location.port;
var socket = io.connect('http://' + serverIPAddress + ':' + serverPort);



/* DOM Strings */
var DOMStrings = {  
  baudrate: document.getElementById('baudrate_select'),
  COMPort: document.getElementById('COMPort_select'),
  portStatus: document.getElementById('portStatus'),
  dataBitsSel: document.getElementsByName('databits'),
  stopBitsSel: document.getElementsByName('stopbits'),
  paritySel: document.getElementsByName('parity'), 
  // Not sure if this ones should be here
  databits: document.querySelector('input[name="databits"]:checked'),
  stopbits: document.querySelector('input[name="stopbits"]:checked'),
  parity: document.querySelector('input[name="parity"]:checked'),
  serialPort_container: document.getElementById('serialPort_container'),
  
  r_servo1: document.getElementById('r_servo1'),
  servo1_Value: document.getElementById('servo1_Value'),
  r_servo2: document.getElementById('r_servo2'),
  servo2_Value: document.getElementById('servo2_Value'),
  r_servo3: document.getElementById('r_servo3'),
  servo3_Value: document.getElementById('servo3_Value'),

  text1: document.getElementById('text1'),
  text2: document.getElementById('text2'),
  
  connectBtn : document.getElementById('connect_btn'),
  sendBtn : document.getElementById('sendBtn'),
  
}

/* Client function to populate the port settings */
function populateSerialPortSettings(portInfo){
  // Request List of available ports
  socket.emit('COMListRequest', {});
  console.log('requesting port List');
  // if portInfo is null then the port is not open
  if(portInfo == null){
    console.log('No port connected.');
    (()=>{
      // Default Values      
      document.querySelector("#db" + 8).checked = true;  // set databits = 8  
      document.querySelector("#stopbits" + 1).checked = true; // set stopbits = 1
      document.querySelector("#p" + "none").checked = true; // set parity = None
      document.querySelector("#br" + 115200).selected = true; // set baudrate = 115200
      DOMStrings.COMPort.value = "COM1"; // set COM port = COM1 This is not working quite as expected...
      portStatus.innerHTML = 'Serial Port Status: Disconnected'; // update Status
      DOMStrings.connectBtn.value = "Connect"; // change Text on connect Button to connect
    })();
  }else{
    //if we have data in portInfo then the port is open already 
    //set returned values and change status to connected
    // change connect btn to Disconnect
    (()=>{ 
      document.querySelector("#db" + portInfo.dataBits).checked = true;  // set databits
      document.querySelector("#stopbits" + portInfo.stopBits).checked = true; // set stopbits
      document.querySelector("#p" + portInfo.parity).checked = true; // set parity
      document.querySelector("#br" + portInfo.baudRate).selected = true; // set baudrate
      DOMStrings.COMPort.value = portInfo.COMName; //Set COM port
      portStatus.innerHTML = 'Serial Port Status: Connected on ' + portInfo.COMName; // update Status
      DOMStrings.connectBtn.value = "Disconnect"; // change Text on connect Button to Disconnect
    })();
  }
}

/* Window load method */

/* It should be the starting point for all the application
It should trigger a request for port connected info and/or port list
to initiate connection. */
window.onload = function(){
  console.log('window loaded');
  /* New client created. Requests info on if the server is already 
  connected to a port or not */
  socket.emit('portInfoRequest', {});
  console.log('Emited request for info');

};


// Servo driver Range Controls
DOMStrings.r_servo1.addEventListener('input', ()=>{
  //sendServoDataToServer(DOMStrings.r_servo1,DOMStrings.r_servo1.value);
  sendServoDataToServer();
});
DOMStrings.r_servo2.addEventListener('input', ()=>{
  //sendServoDataToServer(DOMStrings.r_servo2,DOMStrings.r_servo2.value);
  sendServoDataToServer();
});
DOMStrings.r_servo3.addEventListener('input', ()=>{
  //sendServoDataToServer(DOMStrings.r_servo3,DOMStrings.r_servo3.value);
  sendServoDataToServer();

});

/* wil need refacturing to streamline it and add the other servos. */
//var sendServoDataToServer = (servo, value)=>{
var sendServoDataToServer = ()=>{
  let servoValues = {
    servo1: 0,
    servo2: 0,
    servo3: 0,
    //servo4: 0,
    //servo5: 0,
    //servo6: 0,
    //servo7: 0,
    //servo8: 0,
    //servo9: 0,
    //servo10: 0,
    //servo11: 0,
    //servo12: 0,
    //servo13: 0,
    //servo14: 0,
    //servo15: 0,
    //servo16: 0,
    //servo17: 0,
    //servo18: 0,
  }

  /* this is the way I want to go but it a problem with setting the 
  servoX_Value... need to find a way */
  for( let servoValue in servoValues){    
    servoValues[servoValue] = (Math.round(150 + 
      (5 * document.getElementById(`r_${servoValue}`).value)/9));
      document.getElementById(`${servoValue}_Value`).innerHTML = servoValues[servoValue];
  };
  socket.emit('servoValue', servoValues);
    

  
   
  
  /*
  //console.log(servo.id, value);
  switch(servo.id){
    case 'r_servo1':
      //console.log("servo1");
      servo1_Value.innerHTML = value;
      break;
    case 'r_servo2':
      servo2_Value.innerHTML = value;
      break;
    case 'r_servo3':
      servo3_Value.innerHTML = value;
      break;
    default:
      console.log("in Default");
      break;
  }

  // send value for one servo to the server
  //socket.emit('servoValue', {
    //servoID: servo.id,
    //servoValue: (Math.round(150 + (5 * value)/9))
  //});
  */
};

function writeReceivedData(receivedData){
  text1.value = receivedData.rxData;
};

DOMStrings.connectBtn.addEventListener('click', ()=>{
  if(DOMStrings.connectBtn.value === "Connect"){
    socket.emit('openPortRequest', {
      databitsValue: document.querySelector('input[name="databits"]:checked').value,
      stopbitsValue: document.querySelector('input[name="stopbits"]:checked').value,
      parityValue: document.querySelector('input[name="parity"]:checked').value,
      baudrateValue: DOMStrings.baudrate.value,
      COMPortValue: DOMStrings.COMPort.value,
      /* need to check this  it doesn't seem to be in the right place*/
      dataCallback: writeReceivedData
    });
  }else if(DOMStrings.connectBtn.value === "Disconnect"){
    //send Request to server to disconnect from current COM port
    var closeChoice = confirm('Are you sure you want close ' + DOMStrings.COMPort.value + '?');
    if(closeChoice){
      socket.emit('closePortRequest', {});

    }
  }
  
  // this shouldn't be here needs check for Port Connected.
  //portStatus.innerHTML = 'Serial Port Status: Connected on ' + DOMStrings.COMPort.value;
});

socket.on('COMList', (data)=>{
  var list = data.list;
  for(var i = DOMStrings.COMPort.length - 1; i >= 0; i--){
    DOMStrings.COMPort.remove(i);
  };
  list.forEach((list)=>{
    option = document.createElement( 'option' );
    option.value = option.text = list;
    DOMStrings.COMPort.add( option );

  });
});

socket.on('COMData', (data)=>{
  text2.value = data.sData;
});

DOMStrings.sendBtn.addEventListener('click', ()=>{
  socket.emit('textData', {textData: DOMStrings.text1.value});
  console.log('Emitting');
});

/* return from a portInfoRequest */
socket.on('portSettings', (infoData)=>{
  populateSerialPortSettings(infoData.portInfo);
  
});

socket.on('portCloseReply', ()=>{
  populateSerialPortSettings(null);
  console.log('Closing Port');
})
