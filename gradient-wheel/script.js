let previousGradientRotationValue = 0;
let gradientCircleCollection = [];
window.onload = function () {
    let rotationSlider = document.getElementById('rotation-slider');
    rotationSlider.addEventListener('input', onRotationChanged);
    let gradientCircles = document.getElementsByClassName('gradient-circle');
    let gradientCirclesArray = Array.from(gradientCircles);
    gradientCirclesArray = gradientCirclesArray.reverse();
    for (let gradientCirle of gradientCircles) {
        gradientCircleCollection.push(new GradientCircle(gradientCirle));
    }
    setInterval(updateGradientCircles, 10)
};

function onRotationChanged(event) {
    let rotation = event.target.value;
    previousGradientRotationValue = rotation;
    console.log(rotation);
}

function updateGradientCircles() {
    for (let i = 0; i < gradientCircleCollection.length; i++) {
        gradientCircleCollection[i].rotation = lerp(gradientCircleCollection[i].rotation, previousGradientRotationValue, (i + 1) * 0.01);
        gradientCircleCollection[i].update();
    }
}

function lerp(start, end, amt) {
    return (1 - amt) * start + amt * end;
}

class GradientCircle {
    element;
    rotation = 0;
    constructor(element) {
        this.element = element;
    }
    update() {
        this.element.style.rotate = `${this.rotation}deg`;
    }
}