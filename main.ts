bluetooth.startIOPinService()
bluetooth.startAccelerometerService()
input.onGesture(Gesture.FreeFall, function () {
    bluetooth.uartWriteString("fall;")
})
function jopa () {
    pins_data = [
        pins.analogReadPin(AnalogPin.P0), 
        pins.analogReadPin(AnalogPin.P1), 
        pins.analogReadPin(AnalogPin.P2), 
        pins.analogReadPin(AnalogPin.P3), 
        pins.analogReadPin(AnalogPin.P4)
    ]
}
let pins_data: number[] = []
