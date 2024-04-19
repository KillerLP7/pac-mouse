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

let animationPrice = 1; // Initial price

function increasePrice(type, increment) {
    if (type === 'animation') {
        if (increment === 2) {
            animationPrice *= increment; // Multiply current price by 2
        } else {
            animationPrice += increment;
        }
        document.getElementById('animation-price').innerText = animationPrice;
        document.getElementById('current-dollar-number').innerText = animationPrice; // Update current dollar number
        document.getElementById('current-frame-number').innerText = animationPrice;
    }
}

function resetPrice(type) {
    if (type === 'animation') {
        animationPrice = 1;
        document.getElementById('animation-price').innerText = animationPrice;
        document.getElementById('current-dollar-number').innerText = animationPrice; // Update current dollar number
        document.getElementById('current-frame-number').innerText = animationPrice;
    }
}

function buyNow() {
    const animationQuantity = animationPrice; // Adjusting for the initial $1
    for (let i = 0; i < animationQuantity; i++) {
        window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
    }
}
