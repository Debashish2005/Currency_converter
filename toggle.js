const checkbox = document.querySelector('#darkmode-toggle');

// Function to apply dark mode based on the stored preference
function applyDarkModePreference() {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.style.backgroundColor = '#242424';
        checkbox.checked = true;
    } else {
        document.body.style.backgroundColor = '#ebebeb';
        checkbox.checked = false;
    }
}

// Event listener to toggle dark mode and store preference
checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
        document.body.style.backgroundColor = '#242424';
        localStorage.setItem('darkMode', 'true');
    } else {
        document.body.style.backgroundColor = '#ebebeb';
        localStorage.setItem('darkMode', 'false');
    }
});

// Apply dark mode based on stored preference on page load
applyDarkModePreference();