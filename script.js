let timerInterval;
let startDate;
let endDate;
let text = `बज रहल बा मोबाइलवा  
घंटा नइखे त जइसे तोर दिलवा!  
कंबल में मत छुपा लाला,  
नींद के ड्रामा अब बंद कर भैया!

मुंह धो ला, ब्रश पकड़,  
चाय बिना दुनिया लागे सड़!  
भाग स्कूलवा या जॉबवा पकड़,  
सपना में ना उड़ अब मटरगश्ती कर!

अम्मा कहेली – उठ जा बेटा,  
वरना खैनी भी ना मिलेगा रेटा!  
नींद छोड़, जागा फुल जोश में,  
वरना बॉस काढ़ी देगा तेरी होश में`
const startButton = document.getElementById("start-button");
const datetimeInput = document.getElementById("datetime-input");


async function Speak(text , voiceId = 'en-US-natalie'){
            try{
                const res = await fetch("https://api.murf.ai/v1/speech/generate" , {
                    method : 'POST',
                    headers : {
                        'Content-Type' : 'application/json',
                        'api-key' : "ap2_594d3137-7496-4c35-ba53-e5e1efd23001"
                    },
                    body : JSON.stringify({
                        text : text,
                        voiceId : voiceId
                    })
                })
                const result = await res.json();
                const audioURL = result.audioFile;
                if(audioURL){
                    new Audio(audioURL).play();
                }
                else{
                    console.log("invalid URL");
                }
            }
            catch(error){
                console.log("There's is some error here " , error);
            }
        }

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
        Speak(text);
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
