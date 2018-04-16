# servoController
Test Program for control of servos 

at This iteration the software works for all servos up to 18 of them, but seems to miss packets.
I am pushing the timing on the arduino so not quite sure how this will affect the program going forward.

I still need to add conversion from ascii to hex and then to binary and put the value on the servoValue variables.

Will branch now to save this iteration and be able come back to it.

on new Branch. 
It's working but not well... some issues with the binToHexAscii & asciiHexToBin... Nedd to check this again.

A number from 0 to 255 should result in 2 ascii characters, but I seem to have 4 ascii characters...
I'm actually going to test this part of the code independently as I am getting confused. I can get it to working 
independently and then transfer it to the main code. Need to take into account how javascript and the serial.io package deals with data.   

