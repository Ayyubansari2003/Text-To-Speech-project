const speech = new SpeechSynthesisUtterance();
const voiceSelect = document.getElementById('voiceSelect');

function populateVoices() {
    const voices = window.speechSynthesis.getVoices();
    voiceSelect.innerHTML = '';
    voices.forEach((voice) => {
        const option = document.createElement('option');
        option.value = voice.name;
        option.innerText = `${voice.name} (${voice.lang})`;
        voiceSelect.appendChild(option);
    });
}

populateVoices();
window.speechSynthesis.onvoiceschanged = populateVoices;

function speak() {
    const text = document.getElementById("textTospeak").value;
    const pitch = document.getElementById("pitch").value;
    const rate = document.getElementById("rate").value;
    const volume = document.getElementById("volume").value;

    speech.text = text;
    speech.pitch = pitch;
    speech.rate = rate;
    speech.volume = volume;

    const selectedVoice = voiceSelect.value;
    const voices = window.speechSynthesis.getVoices();
    speech.voice = voices.find((voice) => voice.name === selectedVoice);

    window.speechSynthesis.speak(speech);

    // Button glow effect
    const btn = document.getElementById("speakBtn");
    btn.classList.add("active-speaking");
    speech.onend = () => btn.classList.remove("active-speaking");
}

// Live update of slider values
['pitch', 'rate', 'volume'].forEach(id => {
    document.getElementById(id).addEventListener('input', function() {
        document.getElementById(id + 'Value').innerText = this.value;
    });
});
