const lenis = new Lenis();

lenis.on('scroll', (e) => {
    // console.log(e)
    // console.log(e.animatedScroll);

    document.documentElement.style.setProperty('--scroll-pixels', e.animatedScroll);

    const height = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (e.animatedScroll / height) * 100;
    // Set the percentage of scroll as a css variable to the html element
    document.documentElement.style.setProperty('--scroll-percent', scrolled);
    const rotation = map(Math.min(window.innerHeight * 0.5, e.animatedScroll), 0, window.innerHeight * 0.5, 0, 180);
    document.documentElement.style.setProperty("--skate-rotation", `-${rotation}deg`);
});

// Map function
function map(value, start1, stop1, start2, stop2) {
    return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
}

function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}

requestAnimationFrame(raf);

function onScroll() {
    // Get the scroll position
    const scroll = window.scrollY;
    // Set the scroll position as a css variable to the html element
    // Calculate the percentage of scroll

}

// Add scroll event
window.addEventListener('scroll', onScroll);

function showAttributions() {
    const attributions = document.getElementById('attributions');
    attributions.classList.contains('show-attributions') ? attributions.classList.remove('show-attributions') : attributions.classList.toggle('show-attributions');
    const attributionsIcon = document.getElementById('attributions-icon');
    attributionsIcon.classList.contains('rotate-attributions-icon') ? attributionsIcon.classList.remove('rotate-attributions-icon') : attributionsIcon.classList.toggle('rotate-attributions-icon');
}

window.onload = function () {
    document.getElementById('attributions-title').addEventListener('click', showAttributions);
}