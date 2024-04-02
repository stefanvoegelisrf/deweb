window.onload = function () {
    window.addEventListener("mousemove", function (event) {
        const cursor = document.querySelector("#cursor");
        cursor.style.left = event.clientX + "px";
        cursor.style.top = event.clientY + "px";
        cursor.style.opacity = 1;
    });
}