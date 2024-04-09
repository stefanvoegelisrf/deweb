const animationBaseDuration = 6;
let iteration = 0;
window.onload = function () {
    document.addEventListener("animationend", function (event) {
        // Get element that triggered the event
        const element = event.target;
        // remove element from the DOM
        element.remove();
    });
    setInterval(function () {
        iteration++;
        const containerInner = document.querySelector('.container-inner');
        const rectangle = document.createElement("div");
        rectangle.classList.add("rectangle");
        if (iteration % 2 == 0) {
            rectangle.style.animationName = "rotate-rectangle-counter-clockwise";
        }
        else {
            rectangle.style.animationName = "rotate-rectangle-clockwise";
        }
        containerInner.prepend(rectangle);
    }, 1500);
}