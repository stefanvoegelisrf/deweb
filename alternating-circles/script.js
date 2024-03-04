window.onload = function () {
    let alternatingCirclesContainer = document.getElementById("alternating-circles-container");
    let firstCircle = document.createElement("div");
    firstCircle.classList.add("alternating-circles-box");
    alternatingCirclesContainer.appendChild(firstCircle);
    setTimeout(() => {
        let secondCircle = document.createElement("div");
        secondCircle.classList.add("alternating-circles-box");
        alternatingCirclesContainer.appendChild(secondCircle);
    }, 1000);
    setTimeout(() => {
        let thirdCircle = document.createElement("div");
        thirdCircle.classList.add("alternating-circles-box");
        alternatingCirclesContainer.appendChild(thirdCircle);
    }, 1500);

}