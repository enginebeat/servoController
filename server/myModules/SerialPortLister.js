/* Very simple Module to give you a list of the available  Serial Ports */
var SerialPort = require('serialport');

function getSerialPortsList(portsCallback){
  var COMPortLista = [];
  SerialPort.list((err, ports)=>{
    ports.forEach((ports)=>{
      COMPortLista.push(ports.comName);
    });
    portsCallback(COMPortLista);
  });
};

module.exports = {
getSerialPortsList: getSerialPortsList
}
