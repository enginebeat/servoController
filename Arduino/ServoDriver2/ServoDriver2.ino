int count = 0;
int tickDelay = 5;
int mainDelay = 3600; //18mS
int minDelay = 200; //1mS
int maxDelay = 400; //2mS

int servo1Value = 1500 * 5;
int servo2Value = 1500 * 5;
int servo3Value = 1500 * 5;

int timerBaseLine = 0;
int dataProcessTime = 4000;
int totalCountAvailableForProcess = 12000;
//times turned into count
// countNow = micros();
// countFromStartOfInterval =  countNow - timerBaseLine;
// countEndStop = countNow + totalCountAvailableForProcess; //need to deal with overflow

int dataBuffer[78];
int servoValues[18];

int servoInitValue = 300;
unsigned int data[2] = {8,12};


void checkandProcessData();
void servoDriver(); 
unsigned int getServoValue(unsigned int data);
 
void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);
  //int count = 0;
  pinMode(A0, OUTPUT);
  pinMode(A1, OUTPUT);
  pinMode(A2, OUTPUT);
  
  //Init Servo values
  for(int i = 0; i <= 17; i++){
     servoValues[i] = servoInitValue;
  }

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
  while(micros() <= (countEndStop - dataProcessTime)){
    /* Inside here I need to deal with the packet and get
     *  values for the servos
     * 
     */
     
    if (Serial.available() > 0){
      // get incoming byte:
      int inByte = Serial.read();
      
      switch(stateFlag){
        case 0: 
          //start of packet not received
          count = 0;
          if(inByte == 40){
            Serial.println("A)");
            dataBuffer[count] = inByte;
            count++;
            stateFlag = 1; //start of packet received
          };
          break;
        case 1:
          //start of packet received getting all the data in
          if(inByte != 40 || inByte != 41){
            Serial.println("B)");
            dataBuffer[count] = inByte;
            count++;
          };
          if(inByte == 41){
            Serial.println("C)");
            dataBuffer[count] = inByte;
            stateFlag = 2;
          };
          break;
        case 2:
          for(int i = 0; i < 18; i++){
            Serial.print(dataBuffer[i]);
          }
          stateFlag = 0;
          //packet is in and end of packet received
          if(count == 18){
            
            //Serial.println(getServoValue(data));
            
          }
          break;
        default:
          stateFlag = 0;
          break;
      }      
    }
    
     
  }
  //Serial.println(count);
  if(count == 78){
    Serial.println("(D)");
    //Serial.print("(");
    //Serial.print(getServoValue(data));
    //Serial.println(")");
  }
  //Serial.println(micros()); 
  
}

void servoDriver(){
  


}

unsigned int getServoValue(unsigned int data[2]){
  unsigned int servoValue= 0;
  int hn = data[1] << 4;

  servoValue = data[0] | hn;
  
  return servoValue;
}

