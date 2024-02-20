function onRedSquareClick() {
    let block = document.getElementsByClassName("block-1")[0];
    block.classList.add("fade-block-out");
    let body = document.getElementsByTagName("body")[0];
    body.classList.add("rotate-body");
}