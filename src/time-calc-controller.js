import timeCalcFactory from "./time-calc";
import MEASURES from "./enum/measuresEnum";

let hoursInput = document.getElementById("hrs-inpt");
let minutesInput = document.getElementById("m-inpt");
let secondsInput = document.getElementById("s-inpt");

secondsInput.focus();

let timeOutput = document.getElementById("time-output");

let plusActionButton = document.getElementById("plus-action");
let minusActionButton = document.getElementById("minus-action");
let resetActionButton = document.getElementById("reset-action");

let timeCalc = timeCalcFactory.create();

function getFormattedTimeMeasure(measure) {
    let stringMeasure = String(measure);

    return stringMeasure.length < 2 ? `0${stringMeasure}` : stringMeasure;
}

function formatTime(timeObject) {
    let hours = getFormattedTimeMeasure(timeObject.hours);
    let minutes = getFormattedTimeMeasure(timeObject.minutes);
    let seconds = getFormattedTimeMeasure(timeObject.seconds);

    return `${hours}:${minutes}:${seconds}`;
}

function resetInputs() {
    hoursInput.value = "";
    minutesInput.value = "";
    secondsInput.value = "";
}

function showTime() {
    let timeObject = timeCalc.getTime();

    timeOutput.innerText = formatTime(timeObject);

    resetInputs();
}

function readValuesFromInputs() {
    return {
        hours: parseInt(hoursInput.value) || 0,
        minutes: parseInt(minutesInput.value) || 0,
        seconds: parseInt(secondsInput.value) || 0
    }
}

function addAndShowTime() {
    let values = readValuesFromInputs();

    timeCalc.add(values.hours, MEASURES.hours);
    timeCalc.add(values.minutes, MEASURES.minutes);
    timeCalc.add(values.seconds);

    showTime();
}

function subtractAndShowTime() {
    let values = readValuesFromInputs();

    timeCalc.subtract(values.hours, MEASURES.hours);
    timeCalc.subtract(values.minutes, MEASURES.minutes);
    timeCalc.subtract(values.seconds);

    showTime();
}

document.addEventListener("keydown", function(event) {
    if (event.keyCode === 107) {
        event.preventDefault();

        addAndShowTime();
    }

    if (event.keyCode === 109) {
        event.preventDefault();

        subtractAndShowTime();
    }
});

plusActionButton.addEventListener("click", addAndShowTime);
minusActionButton.addEventListener("click", subtractAndShowTime);

resetActionButton.addEventListener("click", function() {
    timeCalc.reset();

    showTime();
});
