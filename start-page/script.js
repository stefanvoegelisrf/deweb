window.onload = function () {
    window.addEventListener("mousemove", function (event) {
        const cursor = document.querySelector("#cursor");
        cursor.style.left = event.clientX + "px";
        cursor.style.top = event.clientY + "px";
        cursor.style.opacity = 1;
    });

    document.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetUrl = link.getAttribute('href');
            link.classList.add("link-activated");
            setTimeout(() => {
                window.location.href = targetUrl;
            }, 750);
        });
    });
}