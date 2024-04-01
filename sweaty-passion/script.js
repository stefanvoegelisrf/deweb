const images = [
    "20220327_ltx2-1.png",
]
let lightArray;

window.onload = function () {
    lightArray = new LightArray("container", 5, 5);
    changeImage();
    setInterval(function () {
        changeImage();
        topLeftToBottomRight();
    }, 1000);
}

function topLeftToBottomRight() {
    lightArray.selectRowsFromBeginning(true, "2", .1, "flashing-light,light-white", .1, true, .05,);
    lightArray.selectRowsFromBeginning(false, "2", .1, "flashing-light,light-white", .1, true, .05);
}

function bottomRightToTopLeft() {
    lightArray.selectRowsFromEnd(true, "2", .1, "flashing-light,light-white", .1, true, .05);
    lightArray.selectRowsFromEnd(false, "2", .1, "flashing-light ,light-white", .1, true, .05);
}

function changeImage() {
    const imagePreload = document.getElementById("image-preload");
    const images = imagePreload.querySelectorAll("img");
    const randomIndex = Math.floor(Math.random() * images.length);
    const imageContainer = document.getElementById("image-container");
    imageContainer.innerHTML = images[randomIndex].outerHTML;
}