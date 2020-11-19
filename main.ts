// Initial sleep state
let sleep = true;
let uart_busy = false;
// Turn off screen
led.enable(false);

input.onButtonPressed(Button.A, function () {
    if (sleep) {
        // Boot up
        led.enable(true);
        // Animation
        for (let i=0; i<9; i++) {
            for (let x=0; x<5; x++) {
                led.plot(x, i-x);
            }
            basic.pause(100);
        }
        basic.clearScreen();

        // Init BLE services
        //bluetooth.startIOPinService();
        bluetooth.startAccelerometerService();
        bluetooth.startUartService();
        bluetooth.onBluetoothConnected(function () {
            basic.showIcon(IconNames.Heart);
            uart_busy = true;
            for (let i=0; i<10; i++) {
                pause(1000);
                bluetooth.uartWriteString("MUSE-TEST");
            }
            uart_busy = false;
        })
        input.onGesture(Gesture.Shake, function () {
            if (!uart_busy) bluetooth.uartWriteString("shaked");
        })

        basic.forever(drawLEDs);

        sleep = false;
    } else control.reset();
})

function drawLEDs () {
    let pins_data = [
        //pins.analogReadPin(AnalogPin.P0), 
        Math.abs(input.acceleration(Dimension.X)),
        //pins.analogReadPin(AnalogPin.P1),
        Math.abs(input.acceleration(Dimension.Y)),
        //pins.analogReadPin(AnalogPin.P2), 
        Math.abs(input.acceleration(Dimension.Z)),
        //pins.analogReadPin(AnalogPin.P3), 
        //pins.analogReadPin(AnalogPin.P4)
    ];
    for (let i=1; i<=5; i++) {
        pins_data.forEach((val, index) => {
            if (val / 200 >= i) led.plot(index, 5-i);
            else led.unplot(index, 5-i);
        });
    }
}