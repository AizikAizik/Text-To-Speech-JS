const btn  = document.querySelector(".s-btn");
const input_box = document.getElementById("say-input")

let voices = [];
window.speechSynthesis.onvoiceschanged = function() {
    voices= window.speechSynthesis.getVoices();
};

const speech = new SpeechSynthesisUtterance();


console.log(voices);
console.log(speech);

btn.addEventListener("click", sayIt)

input_box.addEventListener("keypress", function(e){
    if(e.keyCode === 13){
        sayIt();
    }
})

function finishLoading(){
    const message = "Hello user. Please enter some text into the text field and click say it, then i will handle the rest from there";

    speech.lang = "en-US";
        // set the text and voice attributes

        // filter female voices only and pick the first
        const female = voices.filter(voice => {
            return voice.name == 'Microsoft Zira Desktop - English (United States)';
       })[0];
       console.log(female);
        speech.voice = female;
        speech.volume = 2;
        speech.rate = 0.4;
        speech.pitch = 1;
        speech.text = message;

        window.speechSynthesis.speak(speech);
}

document.addEventListener('DOMContentLoaded', async function(){
    // let voices = [];
    // window.speechSynthesis.onvoiceschanged = function() {
    //     voices=window.speechSynthesis.getVoices();
    // }; 
    speech.onstart =  function(e){
        voices= window.speechSynthesis.getVoices();
        const female = voices.filter(voice => {
            return voice.name == 'Microsoft Zira Desktop - English (United States)';
       })[0];
       speech.voice = female;
       console.log(voices);
    }

    finishLoading();
}, true);

function sayIt(){
    const text = input_box.value;

    console.log(speech);
    console.log(voices);

    if(text){
        //set default language to english
        speech.lang = "en-US";
    
        // set the text and voice attributes

        // filter female voices only and pick the first
        const female = voices.filter(voice => {
             return voice.name == 'Microsoft Zira Desktop - English (United States)';
        })[0];
        speech.voice = female;
        speech.text = text;
        speech.volume = 2;
        speech.rate = 0.4;
        speech.pitch = 1;
        speech.onstart = function(e){
            input_box.setAttribute("disabled", "disabled")
        }
        speech.onend = function(e){
            input_box.removeAttribute("disabled")
        }
    
        window.speechSynthesis.speak(speech);
    }else{
        speech.lang = "en-US";
        // set the text and voice attributes

        // filter female voices only and pick the first
        const female = voices.filter(voice => {
            return voice.name == 'Microsoft Zira Desktop - English (United States)';
       })[0];
        speech.voice = female;
        speech.volume = 2;
        speech.rate = 1;
        speech.pitch = 1;
        speech.text = "no input entered by you. Don't be dumb and try again";
        speech.onstart = function(e){
            input_box.setAttribute("disabled", "disabled")
        }
        speech.onend = function(e){
            input_box.removeAttribute("disabled")
        }

        window.speechSynthesis.speak(speech);
    }
}