/******************* SerialPortController ******************/
function SerialPortController(portSettings, portAsClosed, dataReceived){
  var myPort;
  const SerialPort = require('serialport');
  const DelimiterParser = SerialPort.parsers.Delimiter;

  /* Should intialise the port with the passed settings */
  function InitPort(){

  }
  myPort = new SerialPort(portSettings.COMPortValue, {
    baudRate: Number(portSettings.baudrateValue),
    stopBits: Number(portSettings.stopbitsValue),
    dataBits: Number(portSettings.databitsValue),
    parity: portSettings.parityValue
  });

  const delimiterParser = myPort.pipe(new DelimiterParser({delimiter: ')'}));
  /* Should send back to the controller that the port is open */
  myPort.on('open', ()=>{
    console.log("Serial Port is Open");
    sendData('R');
    console.log(getPortInfo());
  });

  /* Deals with the data received */
  delimiterParser.on('data', (data)=>{
    dataReceived(data);
  });

  /* Need to use this for errors */
  myPort.on('err', (err)=>{
    console.log(err.message);
  });

  myPort.on('close', ()=>{
    portAsClosed();
  });

    /* writes data to the serial port. needs to report errors */
  function sendData(data){
      //myPort.write(data, onError); need to have a look at the error
      myPort.write(data);
  }

  function closePort(){
    myPort.close();

  }
  /* to get some info from the port */
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
    sendData: sendData,
    getPortInfo: getPortInfo,
    closePort: closePort
  }
}
module.exports = SerialPortController;
/******************* ~ SerialPortController **************/
