function onScroll() {
    // Get the scroll position
    const scroll = window.scrollY;
    // Set the scroll position as a css variable to the html element
    document.documentElement.style.setProperty('--scroll-pixels', scroll);
    // Calculate the percentage of scroll
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (scroll / height) * 100;
    // Set the percentage of scroll as a css variable to the html element
    document.documentElement.style.setProperty('--scroll-percent', scrolled);
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