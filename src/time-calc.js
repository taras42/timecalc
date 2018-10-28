import MEASURES from "./enum/measuresEnum";

let MAX_HOURS = 23,
    ONE_HOUR_IN_SECONDS = 3600,
    ONE_HOUR_IN_MINUTES = 60,
    ONE_MINUTE_IN_SECONDS = 60,
    MAX_TIME = (MAX_HOURS * ONE_HOUR_IN_SECONDS)
        + ((ONE_HOUR_IN_MINUTES - 1) * ONE_MINUTE_IN_SECONDS)
        + (ONE_MINUTE_IN_SECONDS - 1);

function normalizeValue(value, measure) {
    value = value || 0;

    if (measure === MEASURES.hours) {
        value = value * ONE_HOUR_IN_SECONDS;
    } else if (measure === MEASURES.minutes) {
        value = value * ONE_MINUTE_IN_SECONDS;
    }

    return value;
}

export default {
    create: function() {
        var timeInSeconds = 0;

        return {
            getTime: function() {
                var hours = 0,
                    minutes = 0,
                    seconds = 0;

                var minutesLeft,
                    secondsLeft;

                if (timeInSeconds >= ONE_HOUR_IN_SECONDS) {
                    hours = Math.floor(timeInSeconds/ONE_HOUR_IN_SECONDS);
                    minutesLeft = timeInSeconds%ONE_HOUR_IN_SECONDS;
                    minutes = Math.floor(minutesLeft/ONE_MINUTE_IN_SECONDS);
                    secondsLeft = minutesLeft%ONE_MINUTE_IN_SECONDS;
                    seconds = secondsLeft;
                } else if (timeInSeconds >= ONE_MINUTE_IN_SECONDS) {
                    minutes = Math.floor(timeInSeconds/ONE_MINUTE_IN_SECONDS);
                    secondsLeft = timeInSeconds%ONE_MINUTE_IN_SECONDS;
                    seconds = secondsLeft;
                } else {
                    seconds = timeInSeconds;
                }

                return {
                    hours: hours,
                    minutes: minutes,
                    seconds: seconds
                }
            },

            add: function(value, measure) {
                value = normalizeValue(value, measure);

                value = timeInSeconds + value;

                if (value <= MAX_TIME) {
                    timeInSeconds = value;
                }
            },

            subtract: function(value, measure) {
                value = normalizeValue(value, measure);

                value = timeInSeconds - value;

                if (value >= 0) {
                    timeInSeconds = value;
                }
            },

            reset: function() {
                timeInSeconds = 0;
            }
        }
    }
};
