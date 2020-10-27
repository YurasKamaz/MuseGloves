// Initial sleep state
let sleep = true;
// Turn off screen
led.enable(false);

input.onButtonPressed(Button.A, function () {
    if (sleep) {
        // Boot up
        led.enable(true);
        if (Math.randomBoolean()) {
            // Animation 1
            for (let i=-5; i<10; i++) {
                for (let x=0; x<5; x++) {
                    console.log(x);
                    let max = Math.abs(x - i)
                    for (let y=4; y>=0; y--) {
                        console.log(y);
                        if (y >= max) led.plot(x, y);
                        else led.unplot(x, y);
                    }
                }
                basic.pause(100);
            }
        } else {
            // Animation 2
            for (let i=0; i<9; i++) {
                for (let x=0; x<5; x++) {
                    led.plot(x, i-x);
                }
                basic.pause(100);
            }
        }
        basic.clearScreen();

        // Init BLE services
        bluetooth.startIOPinService();
        bluetooth.startAccelerometerService();
        bluetooth.startUartService();
        input.onGesture(Gesture.Shake, function () {
            bluetooth.uartWriteLine("catcat");
            basic.showIcon(IconNames.Heart);
            pause(1000);
            basic.clearScreen();
        })
        basic.forever(function () {
            drawLEDs();
        })

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