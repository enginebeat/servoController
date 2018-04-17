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

Solved the proble with the conversions!
the problem was the way I was doing it. In javascript for values from 1 to 9 no conversion is required as the values are forced to strings whn you concatenate it with the string. with values above 9 I d need to tell it it's hex value as a string i.e. A to F.

I still seem to be missing packets but most likely is the one coming back as the processor runs out of time... need to check how it will affect the overall system. 

