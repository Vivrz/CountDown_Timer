let timerInterval;
let startDate;
let endDate;

const startButton = document.getElementById("start-button");
const datetimeInput = document.getElementById("datetime-input");

startButton.addEventListener("click", function () {
    if (timerInterval) {
        clearInterval(timerInterval);
    }

   
    const selectedDate = datetimeInput.value;
    if (!selectedDate) {
        alert("Please select a date and time!");
        return;
    }

    endDate = new Date(selectedDate).getTime();
    startDate = new Date().getTime();

    if (endDate <= startDate) {
        alert("Please select a future date and time!");
        return;
    }

    timerInterval = setInterval(updateTimer, 1000);
    updateTimer();
});

function updateTimer() {
    const currDate = new Date().getTime();
    const dist_cov = currDate - startDate;
    const dist_pending = endDate - currDate;

    if (dist_pending < 0) {
        clearInterval(timerInterval);
        document.getElementById("countdown").innerHTML = "EXPIRED";
        document.getElementById("progress-bar").style.width = "100%";
        return;
    }

    const days = Math.floor(dist_pending / (24 * 60 * 60 * 1000));
    const hrs = Math.floor((dist_pending % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    const mins = Math.floor((dist_pending % (60 * 60 * 1000)) / (60 * 1000));
    const secs = Math.floor((dist_pending % (60 * 1000)) / 1000);

    document.getElementById("Days").querySelector("span").innerHTML = days;
    document.getElementById("hours").querySelector("span").innerHTML = hrs;
    document.getElementById("minutes").querySelector("span").innerHTML = mins;
    document.getElementById("seconds").querySelector("span").innerHTML = secs;

    const total_dist = endDate - startDate;
    const percentage_width = (dist_cov / total_dist) * 100;
    document.getElementById("progress-bar").style.width = percentage_width + "%";
}
