window.onload = function () {
    const cells = document.querySelectorAll('.cell');
    for (let i = 0; i < cells.length; i++) {
        cells[i].style.animationDelay = `${i * 0.015}s`
    }
    document.getElementById("play").addEventListener("click", () => {
        togglePlayPause(true);
        playAudio();
    });
    document.getElementById("pause").addEventListener("click", () => {
        togglePlayPause(false);
        pauseAudio();
    });
    document.getElementById("mute").addEventListener("click", () => toggleMuteUnmute(true));
    document.getElementById("unmute").addEventListener("click", () => toggleMuteUnmute(false));
}

function togglePlayPause(play) {
    if (play) {
        document.getElementById("play").style.display = "none";
        document.getElementById("pause").style.display = "block";
        document.getElementById("details").style.animationPlayState = "running";
    } else {
        document.getElementById("play").style.display = "block";
        document.getElementById("pause").style.display = "none";
        document.getElementById("details").style.animationPlayState = "paused";
    }
}

function playAudio() {
    var audio = document.getElementById("musicplayer");
    audio.play();
}

function pauseAudio() {
    var audio = document.getElementById("musicplayer");
    audio.pause();
}

function toggleMuteUnmute(mute) {
    if (mute) {
        document.getElementById("musicplayer").muted = true;
        document.getElementById("mute").style.display = "none";
        document.getElementById("unmute").style.display = "block";
    } else {
        document.getElementById("musicplayer").muted = false;
        document.getElementById("mute").style.display = "block";
        document.getElementById("unmute").style.display = "none";
    }
}