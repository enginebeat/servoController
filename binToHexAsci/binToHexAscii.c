#include<stdio.h>

#include "binToHexAscii.h"

int valueDecimal = 100;


int main(){
  int code = binToHexAscii(valueDecimal);


  return 0;
}

// decValue needs to be between 0 and 255
unsigned int binToHexAscii(unsigned int decValue){
  unsigned int ln = decValue & 15; // mask to get just the lower nibble
  unsigned int hn = decValue & 240; // mask to get just the higher nibble
  printf("%i", ln);
  hn = hn >> 4;
  printf("%i",hn);
  //at this point ln and hn are now holding the two hex values
  char lnc = hexToAscii(ln);
  char hnc = hexToAscii(hn);
  printf("%c",lnc);
  printf("%c",hnc);
  return 0;

}

unsigned int hexToAscii(unsigned int hexValue){
  unsigned int asciiValue = 0;

  if(hexValue >= 0 && hexValue <= 9){
    asciiValue = hexValue + 48;
  }
  if(hexValue >= 10 && hexValue <= 15){
    asciiValue = hexValue + 55;
  }
  return asciiValue;
}

/*
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
*/
/*
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
*/
/*
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
*/
