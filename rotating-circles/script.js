function changeToCMY() {
    changeClassesOfCircles("magenta", "cyan", "yellow");
}

function changeToRGB() {
    changeClassesOfCircles("blue", "red", "green");
}

function changeToPPY() {
    changeClassesOfCircles("bright-pink", "maximum-red-purple", "vivid-yellow");
}

function changeClassesOfCircles(circle1Class, circle2Class, circle3Class) {
    let circle1 = document.getElementById("circle1");
    let circle2 = document.getElementById("circle2");
    let circle3 = document.getElementById("circle3");
    circle1.classList.remove(circle1.classList[1]);
    circle1.classList.add(circle1Class);
    circle2.classList.remove(circle2.classList[1]);
    circle2.classList.add(circle2Class);
    circle3.classList.remove(circle3.classList[1]);
    circle3.classList.add(circle3Class);
}