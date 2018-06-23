---
layout: blog
title: Manhattan Mapper Build
author: frankleonrose
tags:
  - Node
  - Hardware
images: /img/2018-06-14-manhattan-mapper/
---
The ManhattanMapper is a custom built mapping device used to measure network coverage from a car driving around New York City. It was constructed using Adafruit Feather boards with software written for the Arduino framework. The following describes the process of building the device and discusses the hardware and software involved.

Shortcuts / [User Scenario](#user-scenario) / [Hardware](#hardware) / [Software](#software) / [Next Steps](#next-steps)

## Background
The Things Network New York is one of 600 communities around the world collaborating to build a free and open LoRaWAN network that is owned and operated by its users. The first city covered by TTN was Amsterdam - it took 10 gateways to establish complete network coverage. With a city as large, dense, and tall as New York, it will take a few hundred gateways. How many will it take, exactly? We don't know. Therefore, the process is going to be iterative - we deploy some gateways, measure the coverage, plan how to most efficiently fill in the gaps, and repeat.

Right now (June 2018) there are fewer than 20 gateways deployed around the city, many without rooftop antennas. Any new gateway not immediately next to an existing one will expand the coverage significantly.

[![NYC Map]({{ page.images -}} nyc-map.png){: style="margin: auto; display: block;" height="100%" width="100%"}](https://map.thethings.nyc/#40.7245,-73.9957,13)

## User Scenario
The basic idea is that the user of the ManhattanMapper will put the device in a car that regularly travels around New York City. The device is plugged in to a USB port for power, but has a small rechargeable battery which can power it for a few hours or more if necessary.

There is no need to interact with the device during normal operation. It simply locates itself in space via GPS and transmits a packet of bytes encoded with that location periodically to The Things Network. When the location packet arrives at the server, we know there is network coverage in that location.

The device has a display and four buttons as well as a number of LED's that comprise its user interface. The display shows a splash screen on startup and status information as directed by the buttons.

- Button 1 cycles the display through 3 status "pages": fixed parameters, operational parameters, and errors.
- Button 2 cycles the display through the individual parameters on each of the pages, since the display can show only one parameter label/value pair at a time. For instance, on the operational parameters page the button cycles throught GPS location, GPS time, the frame counter for TTN transmissions, time of last transmission, etc.
- Button 3 currently does nothing. It is intended to be used to change parameter values and clear error messages.

## Hardware
The basic hardware is an assembly of 4 feather form-factor boards from Adafruit:
  - [Feather M0 LoRa](https://www.adafruit.com/product/3178) - µCU (ARM SAMD21g) and LoRa radio (RFM95)
  - [Adalogger FeatherWing](https://www.adafruit.com/product/2922) - SD card and real-time clock
  - [Ultimate GPS FeatherWing](https://www.adafruit.com/product/3133) - GPS with built in antenna and battery backup
  - [FeatherWing OLED](https://www.adafruit.com/product/2900) - 32x128 OLED display with 3 buttons

Additional hardware includes
  - [FeatherWing Doubler](https://www.adafruit.com/product/2890)
  - LoRa antenna
  - [GPS antenna](https://www.adafruit.com/product/960) (optional)
  - [Hammond enclosure](https://www.mouser.com/ProductDetail/hammond/1593ktbu/)
  - [uFL to SMA](https://www.adafruit.com/product/851) cables - one for GPS antenna and another for the LoRa radio. (One is SMA and the other is SMA-RP, so if you connect both you'll know you have them on the right connectors.)
  - [Toggle switch for power](https://www.digikey.com/product-detail/en/TMS6T3B1M1QE/450-2071-ND/5055862)
  - [150 mAh LiPoly Battery](https://www.adafruit.com/product/1317)
  - 3-D printed button tops to raise buttons out of enclosure (Thanks [Raul](http://rauloaida.com/) for printing those!)
  - [USB Power Switch IC](https://www.digikey.com/product-detail/en/RT9742JNGV/1028-1439-1-ND/5880369)
  - Two 33k resistors for divider at VUSB
  - Miscellaneous headers
  - Miscellaneous small bolts, spacers, washers, and nuts

### Physical Arrangement
The original sketch had the boards organized thusly:
![Board Sketch]({{ page.images -}} board-sketch.png){: style="margin: auto; display: block;" height="50%" width="50%"}

I ended up moving the GPS to be on top of the datalogger because I wanted the GPS' built-in antenna to abut the top of the enclosure, exposing it to the sky (albeit through plastic). Also, a battery cannot fit between the board assembly and the bottom of the enclosure. I used a much smaller battery and it fits nicely on its side next to the boards.

![Hardware Stacked]({{ page.images -}} stacked.png){: style="margin: auto; display: block;" height="50%" width="50%"}

The boards communicate thusly:
![Hardware Sketch]({{ page.images -}} hardware-sketch.png){: style="margin: auto; display: block;" height="50%" width="50%"}

Here they are breadboarded (clockwise from upper left: Feather LoRa, OLED, Adalogger, GPS):
![Breadboarded]({{ page.images -}} breadboarded.png){: style="margin: auto; display: block;" height="50%" width="50%"}

I put the hardware together tentatively, with some fear about soldering things together wrong and having to either do a lot of solder rework or buy new boards. I employed a strategy of soldering pins to the doubler only when I needed to (or when further assembly was going to prohibit access to the pin). The filled in symbols on the sketch below indicate soldered pins.

![Wiring Sketch]({{ page.images -}} wiring-sketch.png){: style="margin: auto; display: block;" height="50%" width="50%"}

All signal lines go from the µCU board to one of the three FeatherWings. There are no signals between the daughterboards. By the nature of the assembly, any signals going to the OLED board need not be soldered to the doubler board, because the signals are conveyed directly by pins in headers. Any pin conveying a signal to either the GPS or Adalogger needed to be soldered both to the OLED board and the GPS board (the top boards have the pins for soldering). Signals to the Adalogger travel up the header from the µCU, into the OLED pin, into the doubler crossover, into the GPS pin, and finally down the header into the Adalogger.

A late addition was a USB regulator. The Feather LoRa has no diode on VUSB meaning it is possible for battery current to back up into VUSB. I saw some odd behavior where the unit failed to get USB power after turning my car off. I had a hypothesis that it was related to this and so installed a USB power regulator. It didn't change the odd behavior, but I feel better knowing it's in there. Why did I use an SMD part? That's what I was looking at on Digikey and it seemed like it would fit.

To wire in the regulator I had to cut the trace from the micro-USB connector to VUSB. Now where to pick off that incoming 5v? I removed the USB-power LED and got myself a nice little pad. I feed the output of the regulator onto the Feather-standard VUSB pin.

![USB regulator]({{ page.images -}} usb-regulator.png){: style="margin: auto; display: block;" height="50%" width="50%"}

(The pair of resistors is a divider from VBAT feeding into an analog input pin for battery level testing.)

## Software
The Manhattan Mapper is an Arduino sketch that relies on a stack of libraries to do all the detailed work.
<table class="fixed-width" width="100%">
<tr><td colspan="5">
  <div markdown="1">
  [Manhattan Mapper](https://github.com/frankleonrose/ManhattanMapper)
  <div class="text-left" markdown="1">
  - Configures TTN with app ID and device ID
  - Defines Respire mode control structure
  - Input functions reading current state of the world: GPS and buttons
  - Output functions performing actions triggered by Respire: Sending packets, updating screen, writing to SD card
  </div>
  </div>
</td></tr>
<tr>
  <td colspan="1"><div markdown="1">
  [LoRaStack](https://github.com/frankleonrose/LoRaStack)
  <div class="text-left" markdown="1">
  - LoRaWAN library presenting an API comparable to [TTN Arduino Device Lib](https://github.com/TheThingsNetwork/arduino-device-lib/blob/master/src/TheThingsNetwork.h#L46) on devices using SX1276 chips.
  </div>
  </div></td>
  <td><div markdown="1">
  [Respire](https://github.com/frankleonrose/Respire)
  <div class="text-left" markdown="1">
  - A state management library
  - Declarative expression of application behavior
  - Isolation of input and output operations
  </div>
  </div></td>
  <td><div markdown="1">
  [Adafruit GPS](https://github.com/adafruit/Adafruit_GPS)
  <div class="text-left" markdown="1">
  - Parses serial text stream from GPS unit.
  </div>
  </div></td>
  <td><div markdown="1">
  [SdFat](https://github.com/greiman/SdFat)
  <div class="text-left" markdown="1">
  - The SD card library to use.
  - The Arduino default library is simply broken in the context of shared SPI lines.
  </div>
  </div></td>
</tr>
<tr>
  <td colspan="2"><div markdown="1">
  [MCCI LoRaWAN](https://github.com/mcci-catena/arduino-lorawan)
  <div class="text-left" markdown="1">
  - LoRaWAN class library the encapsulates much of the process flow required to use LMiC.
  </div>
  </div></td>
  <td colspan="3"><div markdown="1">
  [Parameter Store](https://github.com/frankleonrose/ParameterStore)
  <div class="text-left" markdown="1">
  - General purpose Arduino library for storing parameter values by keyword.
  - Writes to FRAM, Bluetooth NVRAM
  - Manhattan Mapper writes to RAM and then load/stores a serialized version from/to SD card
  </div>
  </div></td>
</tr>
<tr>
  <td colspan="3"><div markdown="1">
  [MCCI LMiC](https://github.com/mcci-catena/arduino-lmic)
  <div class="text-left" markdown="1">
  - Core LoRaWAN code from IBM adapted by Matthijs Kooijman and enhanced greatly by Terry Moore.
  </div>
  </div></td>
  <td colspan="2"><div markdown="1">
  [Timer](https://github.com/JChristensen/Timer)
  <div class="text-left" markdown="1">
  - Basic timer library.
  </div>
  </div></td>
</tr>
</table>

The top level code is at [https://github.com/frankleonrose/ManhattanMapper](https://github.com/frankleonrose/ManhattanMapper).

### Building
The project has a `platformio.ini` file that specifies all dependencies as well as build flags. Running `platformio run` will download all packages into a project-local subdirectory and build the project. I highly recommend installing [PlatformIO](https://platformio.org/) and using it. No need to integrate it with your editor, but you can if you like. Of course it is possible to build the project using the Arduino IDE as well. You'll have to hunt for the repos using the GUI. I leave that as an unpleasant exercise for the reader.

### Code Structure
After setup, the primary loop is concise because it relies on subsystems to take care of themselves. It looks like this:

```c++
void loop() {
  lorawan.loop();
  uiLoop();
  if (!ModeSend.isActive(gState) && !ModeAttemptJoin.isActive(gState)) {
    // Do parsing and timer optional things that could throw off LoRa timing
    // only while NOT sending.
    gTimer.update();
    gpsLoop(Serial);
    gState.setGpsFix(gpsHasFix()); // Quick if value didn't change
  }
  gRespire.loop();
}
```

The basic application state is represented by a single struct that holds the variables that change as the device moves through space and time and a user operates on it. You can see a reference to `gState` in the `loop()` code above.

```c++
bool _usbPower;
float _batteryVolts;
bool _gpsFix;

GpsSample _gpsSample;
uint32_t _gpsSampleExpiry;

uint32_t _ttnFrameCounter;
uint32_t _ttnLastSend;
bool _joined = false;

// Display states
uint8_t _page = 0;
uint8_t _field = 0;
bool _buttonPage = false;
bool _buttonField = false;
bool _buttonChange = false;
bool _redisplayRequested = false; // Toggle this to trigger redisplay.
```

The behavior of the application is specified by a hierarchy of Respire "Modes" defined in [mm_state.cpp](https://github.com/frankleonrose/ManhattanMapper/blob/master/src/mm_state.cpp). The Modes activate and deactivate based on changes in application state, the passage of time, and the activation of parent and child modes.

The Respire framework simplifies application development by clearly separating concerns.
- Input functions detect the state of the world and set the global state accordingly.
- Output functions are called upon to perform an action based on an immutable view of the current global state.
- Dynamic operation like periodic functions and state sequences are represented declaratively in the static Mode hierarchy.

## Next Steps
- Install the device on a car that regularly drives around the city
- Feed data samples to both [TTN Mapper](https://ttnmapper.org) as well as [Map The Things](https://map.thethings.nyc).
- Deploy more gateways and light up the map!

[![NYC Map]({{ page.images -}} nyc-map.png){: style="margin: auto; display: block;" height="100%" width="100%"}](https://map.thethings.nyc/#40.7245,-73.9957,13)
