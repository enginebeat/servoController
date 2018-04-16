#include "binToHexAscii.h"

dataBuffer


int main()
{
  dataBuffer[0] = "(";
  dataBuffer[1] = "0";
  dataBuffer[2] = "0";
  dataBuffer[3] = "0";
  dataBuffer[4] = "1";
  //servo 1
  dataBuffer[5] = "52";
  dataBuffer[6] = "54";
  //servo 2
  dataBuffer[7] = "52";
  dataBuffer[8] = "54";
  //servo 3
  dataBuffer[9] = "52";
  dataBuffer[10] = "54";
  //servo 4
  dataBuffer[11] = "52";
  dataBuffer[12] = "54";
  //servo 5
  dataBuffer[13] = "52";
  dataBuffer[14] = "54";
  //servo 6
  dataBuffer[15] = "52";
  dataBuffer[16] = "54";
  //servo 7
  dataBuffer[17] = "52";
  dataBuffer[18] = "54";
  //servo 8
  dataBuffer[19] = "52";
  dataBuffer[20] = "54";
  //servo 9
  dataBuffer[21] = "52";
  dataBuffer[22] = "54";

  dataBuffer[23] = "52";
  dataBuffer[10] = "54";

  dataBuffer[9] = "52";
  dataBuffer[10] = "54";


  return 0;
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
