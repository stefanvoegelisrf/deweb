window.onload = function () {
    window.addEventListener("mousemove", function (event) {
        const cursor = document.querySelector("#cursor");
        cursor.style.left = event.clientX + "px";
        cursor.style.top = event.clientY + "px";
        cursor.style.opacity = 1;
        const name = document.querySelector("#name");
        const nameBoundingRect = name.getBoundingClientRect();
        // Check if cursor is inside name
        if (event.clientX > nameBoundingRect.left && event.clientX < nameBoundingRect.right && event.clientY > nameBoundingRect.top && event.clientY < nameBoundingRect.bottom) {
            cursor.classList.add("cursor-inside-name");
        } else {
            cursor.classList.remove("cursor-inside-name");
        }
    });

    setInterval(highlighProjects, 5000)

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
    highlighProjects();
}

function highlighProjects() {
    const projects = document.querySelectorAll(".project");
    for (let i = 0; i < projects.length; i++) {
        setTimeout(() => {
            if (projects[i].matches(":hover"))
                return;
            projects[i].classList.add("highlight-project");
            setTimeout(() => {
                projects[i].classList.remove("highlight-project");
            }, 1000);
        }, 100 * i);
    }
}