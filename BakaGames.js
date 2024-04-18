// Function to change the volume of the audio
function changeVolume(volume) {
    var audio = document.getElementById('bg-music');
    var volumeLabel = document.getElementById('volume-label');
    audio.volume = volume;
    var volumePercentage = Math.round(volume * 100); // Convert volume to percentage
    volumeLabel.textContent = volumePercentage + '%';
}

// Update volume when slider value changes
document.addEventListener('DOMContentLoaded', function() {
    var volumeSlider = document.querySelector('.volume-slider');
    var volumeLabel = document.getElementById('volume-label');
    
    volumeSlider.addEventListener('input', function() {
        var volume = parseFloat(this.value);
        changeVolume(volume);
        volumeLabel.textContent = Math.round(volume * 100) + '%';
    });
});


function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}
