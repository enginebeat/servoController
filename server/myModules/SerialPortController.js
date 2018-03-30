/******************* SerialPortController ******************/
function SerialPortController(portSettings, portWasOpen, portAsClosed, portDataReceived){
  var myPort;
  const SerialPort = require('serialport');
  const DelimiterParser = SerialPort.parsers.Delimiter;

  /* Should intialise the port with the passed settings */
  function initPort(){
    myPort = new SerialPort(portSettings.COMPortValue, {
      baudRate: Number(portSettings.baudrateValue),
      stopBits: Number(portSettings.stopbitsValue),
      dataBits: Number(portSettings.databitsValue),
      parity: portSettings.parityValue
    });
    
  }

  initPort();
  const delimiterParser = myPort.pipe(new DelimiterParser({delimiter: ')'}));
  
  
  
  /* Should send back to the controller that the port is open */
  myPort.on('open', ()=>{
    portWasOpen();
    //console.log("Serial Port is Open");
    //sendData('R');
    //console.log(getPortInfo());
  });

  /* Deals with the data received */
  delimiterParser.on('data', (data)=>{
    portDataReceived(data);
  });

  /* Need to use this for errors 
  
  needs to be improved to check for errors on the port*/
  myPort.on('err', (err)=>{
    console.log(err.message);
  });

  /* closes the port and fires the portAsClosed function */
  myPort.on('close', ()=>{
    portAsClosed();
  });

    /* writes data to the serial port. needs to report errors */
  function sendData(data){
      //myPort.write(data, onError); need to have a look at the error
      myPort.write(data);
  }
  /* provides functionality for closing associated port */
  function closePort(){
    myPort.close();

  }
  /* to get info from the port if it's open
  if not open then it will send null*/
  function getPortInfo(){
    if(myPort.open){
      var portSettings = {
        COMName: myPort.path,
        baudRate: myPort.settings.baudRate,
        stopBits: myPort.settings.stopBits,
        dataBits: myPort.settings.dataBits,
        parity: myPort.settings.parity,
        open: myPort.open //seems redundant...
      };
      return portSettings;
    } else{
      return null;
    } 
  };

  return {
    initPort:initPort,
    sendData: sendData,
    getPortInfo: getPortInfo,
    closePort: closePort
  }
}
module.exports = SerialPortController;
/******************* ~ SerialPortController **************/
