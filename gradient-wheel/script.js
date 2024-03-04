window.onload = function() {
    let rotationSlider= document.getElementById('rotation-slider');
    rotationSlider.addEventListener('input', onRotationChanged)
};

function onRotationChanged(event) {
    let rotation = event.target.value;
    let gradientCircles = document.getElementsByClassName('gradient-circle');
    for(let gradientCirle of gradientCircles) {
        gradientCirle.style.rotate = `${rotation}deg`
    }
}