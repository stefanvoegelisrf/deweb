const images = [
    "20220327_ltx2-1.png",
]
let lightArray;

window.onload = function () {
    lightArray = new LightArray("container", 2, 2);
    changeImage();
    setInterval(function () {
        changeImage();
        topLeftToBottomRight();
        setTimeout(function () {
            bottomRightToTopLeft();
        }, 500);
    }, 1000);
}

function topLeftToBottomRight() {
    lightArray.selectRowsFromBeginning(true, "1", .1, "flashing-light,light-white", .1, true, .05,);
    lightArray.selectRowsFromBeginning(false, "1", .1, "flashing-light,light-white", .1, true, .05);
}

function bottomRightToTopLeft() {
    lightArray.selectRowsFromEnd(true, "1", .1, "flashing-light,light-white", .1, true, .05);
    lightArray.selectRowsFromEnd(false, "1", .1, "flashing-light ,light-white", .1, true, .05);
}

function changeImage() {
    const imagePreload = document.getElementById("image-preload");
    const images = imagePreload.querySelectorAll("img");
    const randomIndex = Math.floor(Math.random() * images.length);
    const imageContainer = document.getElementById("image-container");
    imageContainer.innerHTML = images[randomIndex].outerHTML;
}