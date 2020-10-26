// Init BLE services
bluetooth.startIOPinService();
bluetooth.startAccelerometerService();
input.onGesture(Gesture.FreeFall, function () {
    bluetooth.uartWriteString("fall;");
})

basic.forever(function () {
	drawLEDs()
})
function drawLEDs () {
    let pins_data = [
        pins.analogReadPin(AnalogPin.P0), 
        pins.analogReadPin(AnalogPin.P1), 
        pins.analogReadPin(AnalogPin.P2), 
        pins.analogReadPin(AnalogPin.P3), 
        pins.analogReadPin(AnalogPin.P4)
    ];
    basic.clearScreen();
    for (let i=1; i<=5; i++) {
        pins_data.forEach((val, index) => {
            if (val / 200 >= i) led.plot(index, 5-i);
        });
    }
}