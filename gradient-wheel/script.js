let previousGradientRotation = 0;
let previousGradientRotationTotal = 0;
let gradientCircleCollection = [];
let isDraggingRadialSlider = false;

window.onload = function () {
    let gradientCircles = document.getElementsByClassName('gradient-circle');
    let gradientCirclesArray = Array.from(gradientCircles);
    gradientCirclesArray = gradientCirclesArray.reverse();
    for (let gradientCirle of gradientCircles) {
        gradientCircleCollection.push(new GradientCircle(gradientCirle));
    }
    setInterval(updateGradientCircles, 10)
    let radialSlider = document.getElementById('radial-slider');
    radialSlider.addEventListener('mousedown', function (event) {
        isDraggingRadialSlider = true;
    });
    radialSlider.addEventListener('touchstart', function (event) {
        isDraggingRadialSlider = true;
    });
    document.addEventListener('mouseup', function (event) {
        isDraggingRadialSlider = false;
    });
    document.addEventListener('mouseup', function (event) {
        isDraggingRadialSlider = false;
    });
    window.addEventListener('mousemove', onDragSlider);
    window.addEventListener('touchmove', onDragSlider);
};

function onDragSlider(event) {
    let angle, centerX, centerY, radialSlider, deltaX, deltaY, positionX, positionY, touch, boundingRect;
    if (isDraggingRadialSlider) {
        radialSlider = document.getElementById('radial-slider');
        touch = void 0;
        if (event.touches) {
            touch = event.touches[0];
        }
        boundingRect = radialSlider.getBoundingClientRect();
        centerX = (boundingRect.width * 0.5) + boundingRect.left;
        centerY = (boundingRect.height * 0.5) + boundingRect.top;
        positionX = event.pageX || touch.pageX;
        positionY = event.pageY || touch.pageY;
        deltaY = centerY - positionY;
        deltaX = centerX - positionX;
        // Calculate Angle between circle center and mouse position
        angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
        angle -= 90;
        if (angle < 0) {
            angle = 360 + angle; // Always show angle positive
        }
        angle = Math.round(angle);
        onRotationChanged(angle);
        let radialSliderHandle = document.getElementById("radial-slider-handle");
        radialSliderHandle.style.rotate = `${angle}deg`;
    }
}

function onRotationChanged(rotation) {
    let differenceToPrevious = rotation - previousGradientRotation;
    if (differenceToPrevious > 300) {
        differenceToPrevious = 360 - differenceToPrevious;
    }
    else if (differenceToPrevious < -300) {
        differenceToPrevious = 360 + differenceToPrevious;
    }
    previousGradientRotation = rotation;
    previousGradientRotationTotal += differenceToPrevious;
}

function updateGradientCircles() {
    for (let i = 0; i < gradientCircleCollection.length; i++) {
        gradientCircleCollection[i].rotation = lerp(gradientCircleCollection[i].rotation, previousGradientRotationTotal, (i + 1) * 0.01);
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