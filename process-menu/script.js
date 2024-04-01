window.onload = function () {
    rotateArrow();
    window.addEventListener('resize', rotateArrow);
}

function rotateArrow() {
    let arrow = document.getElementById('arrow-icon');
    let angle = calculateRotation(window.innerWidth, window.innerHeight);
    arrow.style.transform = 'rotate(' + angle + 'deg)';
}

function calculateRotation(width, height) {
    var angle = 245 + Math.atan2(height, width) * (90 / Math.PI);
    return angle;
}