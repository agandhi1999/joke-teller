const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Disable/Enable Button
function toggleButton(){
    button.disabled = !button.disabled;
}

text = ''

async function getJokes() {
    try {
        
        const reponse = await fetch('https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit');
        joke = await reponse.json();
        
        joke.type === 'single' ? text = joke.joke : text = joke.setup  + " " + joke.delivery
        await getSpeech();
        
        audioText = await fetch('https://joke-teller-backend.herokuapp.com/', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                text: text,
            })
        }).then(response => response.text()).then(data => audioElement.src = data);
        // console.log(audioText.text());
        
        await audioElement.play();
        toggleButton();
    } catch (error) {
        button.disabled = false
        console.log('Whoops: ', error);
    }

}



function getSpeech() {
    VoiceRSS.speech({
        src: text,
        hl: 'en-us',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
};

// Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);