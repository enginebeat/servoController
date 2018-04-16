#include "ServoDriver2.h"
 
void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);
  setPinModes();
  initServoValues();
  

}

void loop() {
  
  checkandProcessData();
  servoDriver();
}


void checkandProcessData(){
  int countNow = micros();
  int countEndStop = countNow + totalCountAvailableForProcess;
  int stopCheckFlag = 0;
  count = 0;
  Serial.print("(R)");
  int stateFlag = 0;
  //while(stopCheckFlag == 0){
  while(micros() <= (countEndStop - dataProcessTime)){
    /* Inside here I need to deal with the packet and get
     *  values for the servos
     */
    if (Serial.available() > 0){
      // get incoming byte:
      int inByte = Serial.read();
      
      switch(stateFlag){
        case 0: 
          //start of packet not received
          count = 0;
          if(inByte == 40){
            dataBuffer[count] = inByte;
            count++;
            stateFlag = 1; //start of packet received
          };
          break;
        case 1:
          //start of packet received getting all the data in
          if(inByte != 40 || inByte != 41){
            dataBuffer[count] = inByte;
            count++;
          };
          //end of packet received
          if(inByte == 41){
            dataBuffer[count] = inByte;
            stateFlag = 2;
          };
          if(inByte == 40){
            stateFlag = 0; //discard and start again.
          };
          break;
        default:
          stateFlag = 0;
          break;
      }
      if(stateFlag == 2){
        Serial.println("D)");
        
        setServoValues();
        
        Serial.print("(");
        for(int i = 0; i < 18; i++){
            Serial.print(servoValues[i]);
        };
        Serial.println(")");
        stateFlag = 0;
        //packet is in and end of packet received
        
        if(count == 18){
          //Serial.println(getServoValue(data));
          //stopCheckFlag = 1;  
        }; 
      };
              
    } 
  }  
}

void servoDriver(){
  


}

void setPinModes(){
  pinMode(servo1_pin, OUTPUT);
  pinMode(servo2_pin, OUTPUT);
  pinMode(servo3_pin, OUTPUT);
  pinMode(servo4_pin, OUTPUT);
  pinMode(servo5_pin, OUTPUT);
  pinMode(servo6_pin, OUTPUT);
  //pinMode(servo7_pin, OUTPUT);
  //pinMode(servo8_pin, OUTPUT);
  //pinMode(servo9_pin, OUTPUT);
  //pinMode(servo10_pin, OUTPUT);
  //pinMode(servo11_pin, OUTPUT);
  //pinMode(servo12_pin, OUTPUT);
  //pinMode(servo13_pin, OUTPUT);
  //pinMode(servo14_pin, OUTPUT);
  //pinMode(servo15_pin, OUTPUT);
  //pinMode(servo16_pin, OUTPUT);
  //pinMode(servo17_pin, OUTPUT);
  //pinMode(servo18_pin, OUTPUT);
}

void initServoValues(){
  //Init Servo values
  for(int i = 0; i <= 17; i++){
     servoValues[i] = servoInitValue;
  }
}

void setServoValues(){
  unsigned int servoValue = 0;
  unsigned int hn = 0;
  unsigned int ln = 0;
  int servoCount = 0;
  for(int i = 5; i < 42; i++){
    ln = getHexValue(dataBuffer[i]);
    
    i++; //just checking if this works.
    hn = (getHexValue(dataBuffer[i])) << 4;
    servoValues[servoCount] = hn | ln;
    servoCount++;  
  }
}

unsigned int getHexValue(unsigned int value){
  unsigned int hexValue = 0;
  if(value >= 48 and value <=57){
    hexValue = value - 48;
  }
  if(value >= 65 and value <= 70){
    hexValue = value - 55;
  };
  return hexValue;
}

/*
unsigned int getServoValue(unsigned int data[2]){
  unsigned int servoValue= 0;
  int hn = data[1] << 4;
  servoValue = data[0] | hn;
  return servoValue;
}
*/
