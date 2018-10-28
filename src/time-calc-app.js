import timeCalcFactory from "./time-calc";
import MEASURES from "./enum/measuresEnum";

let hoursInput = document.getElementById("hrs-inpt");
let minutesInput = document.getElementById("m-inpt");
let secondsInput = document.getElementById("s-inpt");

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

function resetAndShowTime() {
    timeCalc.reset();

    showTime();
}

let switchTimeInput = (function() {
    let currentInputIndex = 2;
    let inputsArray = [hoursInput, minutesInput, secondsInput];

    return function(direction) {
        let index = currentInputIndex + direction;

        if (index < 0) {
            index = inputsArray.length - 1;
        }

        if (index > inputsArray.length - 1) {
            index = 0;
        }

        let input = inputsArray[index];

        input.focus();

        currentInputIndex = index;
    }
})();

function onKeyboardInput(event) {
    let key = event.keyCode;

    // plus
    if (key === 107) {
        event.preventDefault();

        addAndShowTime();
    }

    // minus
    if (key === 109) {
        event.preventDefault();

        subtractAndShowTime();
    }

    // esc
    if (key === 27) {
        resetAndShowTime();
    }

    // left
    if (key === 37) {
        switchTimeInput(-1);
    }

    // right
    if (key === 39) {
        switchTimeInput(1);
    }
}

function initEvents() {
    document.addEventListener("keydown", onKeyboardInput);
    plusActionButton.addEventListener("click", addAndShowTime);
    minusActionButton.addEventListener("click", subtractAndShowTime);
    resetActionButton.addEventListener("click", resetAndShowTime);
}

export default {
    start: function() {
        initEvents();

        secondsInput.focus();
    }
}
