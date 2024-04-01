let lightArray;

window.onload = function () {
    lightArray = new LightArray("container", 10, 10);

    setInterval(() => {
        lightArray.alternating(false, "5", .1, "flashing-light,light-cyan");
        lightArray.alternating(true, "5", .1, "flashing-light,light-magenta");
        setTimeout(() => {
            topLeftToBottomRight();
            setTimeout(() => {
                bottomRightToTopLeft();
                setTimeout(() => {
                    lightArray.selectFromTop("3", .1, "flashing-light,light-cyan", .1, true, .05);
                    lightArray.selectFromBottom("F", .1, "flashing-light,light-magenta", .1, true, .05);
                }, 1000)
            }, 1000);
        }, 1000)
    }, 5000);
    setTimeout(() => {
        lightArray.selectFromTop("3", .1, "flashing-light,light-cyan", .1, true, .05);
        lightArray.selectFromBottom("3", .1, "flashing-light,light-magenta", .1, true, .05);
        setTimeout(() => {
            lightArray.selectFromTop("3", .1, "flashing-light,light-cyan", .1, true, .05);
            lightArray.selectFromBottom("3", .1, "flashing-light,light-magenta", .1, true, .05);
            setTimeout(() => {
                lightArray.selectFromTop("3", .1, "flashing-light,light-cyan", .1, true, .05);
                lightArray.selectFromBottom("3", .1, "flashing-light,light-magenta", .1, true, .05);
                setTimeout(() => {
                    lightArray.selectFromTop("3", .1, "flashing-light,light-cyan", .1, true, .05);
                    lightArray.selectFromBottom("3", .1, "flashing-light,light-magenta", .1, true, .05);
                    setTimeout(() => {
                        lightArray.selectFromTop("3", .1, "flashing-light,light-cyan", .1, true, .05);
                        lightArray.selectFromBottom("3", .1, "flashing-light,light-magenta", .1, true, .05);
                        setTimeout(() => {
                            lightArray.selectFromTop("3", .1, "flashing-light,light-cyan", .1, true, .05);
                            lightArray.selectFromBottom("3", .1, "flashing-light,light-magenta", .1, true, .05);
                        }, 500)
                    }, 500)
                }, 1000)
            }, 500)
        }, 500)
    }, 500)
}

function topLeftToBottomRight() {
    lightArray.selectRowsFromBeginning(true, "2", .1, "flashing-light,light-magenta", .1, true, .05,);
    lightArray.selectRowsFromBeginning(false, "2", .1, "flashing-light,light-cyan", .1, true, .05);
}

function bottomRightToTopLeft() {
    lightArray.selectRowsFromEnd(true, "2", .1, "flashing-light,light-magenta", .1, true, .05);
    lightArray.selectRowsFromEnd(false, "2", .1, "flashing-light ,light-cyan", .1, true, .05);
}