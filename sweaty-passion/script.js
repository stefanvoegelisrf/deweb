let lightArray;

window.onload = function () {
    lightArray = new LightArray("container", 10, 10);
}

function topLeftToBottomRight() {
    lightArray.selectRowsFromBeginning(true, "2", .1, "flashing-light,light-magenta", .1, true, .05,);
    lightArray.selectRowsFromBeginning(false, "2", .1, "flashing-light,light-cyan", .1, true, .05);
}

function bottomRightToTopLeft() {
    lightArray.selectRowsFromEnd(true, "2", .1, "flashing-light,light-magenta", .1, true, .05);
    lightArray.selectRowsFromEnd(false, "2", .1, "flashing-light ,light-cyan", .1, true, .05);
}