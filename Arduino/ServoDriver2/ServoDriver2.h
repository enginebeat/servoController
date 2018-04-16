#define servo1_pin A0
#define servo2_pin A1
#define servo3_pin A2
#define servo4_pin A3
#define servo5_pin A4
#define servo6_pin A5
#define servo7_pin A6
//#define servo8_pin A0
//#define servo9_pin A0
//#define servo10_pin A0
//#define servo11_pin A0
//#define servo12_pin A0
//#define servo13_pin A0
//#define servo14_pin A0
//#define servo15_pin A0
//#define servo16_pin A0
//#define servo17_pin A0
//#define servo18_pin A0


int count = 0;

//times turned into count
int tickDelay = 5;
int mainDelay = 3600; //18mS
int minDelay = 200; //1mS
int maxDelay = 400; //2mS

int servo1Value = 1500 * 5;
int servo2Value = 1500 * 5;
int servo3Value = 1500 * 5;

//countNow = micros();
//countFromStartOfInterval =  countNow - timerBaseLine;
//countEndStop = countNow + totalCountAvailableForProcess; 
//need to deal with overflow


int timerBaseLine = 0;
int dataProcessTime = 4000;
int totalCountAvailableForProcess = 12000;

unsigned int dataBuffer[78];
unsigned int servoValues[18];

int servoInitValue = 300;
unsigned int data[2] = {8,12};


void checkandProcessData();
void servoDriver(); 
unsigned int getServoValue(unsigned int data);
void setPinModes();
void initServoValues();
unsigned int getHexValue(unsigned int value);
