window.onload = function () {
    const cells = document.querySelectorAll('.cell');
    for (let i = 0; i < cells.length; i++) {
        cells[i].style.animationDelay = `${i * 0.1}s`
    }
}