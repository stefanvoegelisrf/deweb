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