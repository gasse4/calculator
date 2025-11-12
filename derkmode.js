let darkmode = localStorage.getItem('darkmode');
const themeSwitch = document.getElementById('theme-toggle');

const enableDarkMode = () => {
    document.body.classList.add('darkmode');
    if (themeSwitch) {
        themeSwitch.setAttribute('aria-pressed', 'true');
        themeSwitch.title = 'Switch to light theme';
    }
    localStorage.setItem('darkmode', 'active');
}

const disableDarkMode = () => {
    document.body.classList.remove('darkmode');
    if (themeSwitch) {
        themeSwitch.setAttribute('aria-pressed', 'false');
        themeSwitch.title = 'Switch to dark theme';
    }
    localStorage.setItem('darkmode', 'null');
}

if (themeSwitch) {
    themeSwitch.addEventListener('click', function() {
        darkmode = localStorage.getItem('darkmode');
        darkmode !== "active" ? enableDarkMode() : disableDarkMode();
    });
}

// Initialize UI state based on stored value
if (darkmode === "active") {
    enableDarkMode();
} else {
    disableDarkMode();
}
