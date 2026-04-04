/**
 * Digital Dichotomy - Main JavaScript
 * Unified site initialization and utilities
 */

// ===== DARK MODE TOGGLE =====
function toggleDarkMode() {
    const html = document.documentElement;
    const isDark = html.classList.contains('dark');

    if (isDark) {
        html.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        updateThemeIcon('sun');
    } else {
        html.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        updateThemeIcon('moon');
    }
}

function updateThemeIcon(icon) {
    const themeIcon = document.getElementById('theme-icon');
    if (themeIcon && typeof feather !== 'undefined') {
        if (icon === 'sun') {
            themeIcon.setAttribute('data-feather', 'sun');
        } else {
            themeIcon.setAttribute('data-feather', 'moon');
        }
        feather.replace();
    }
}

// Initialize theme from localStorage
(function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    const html = document.documentElement;

    if (savedTheme === 'dark') {
        html.classList.add('dark');
        updateThemeIcon('moon');
    } else {
        html.classList.remove('dark');
        updateThemeIcon('sun');
    }
})();

// ===== SCROLL PROGRESS BAR =====
(function initProgressBar() {
    const progressBar = document.getElementById('progress-fill');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
        const winScroll = document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
})();

// ===== SEARCH FUNCTIONALITY =====
let searchTimeout;

function handleSearch(event) {
    const input = event.target;
    const query = input.value.trim().toLowerCase();
    const resultsContainer = document.getElementById('search-results');

    if (!resultsContainer) return;

    // Clear previous timeout
    clearTimeout(searchTimeout);

    // Hide if empty
    if (!query) {
        resultsContainer.classList.add('hidden');
        return;
    }

    // Debounce search
    searchTimeout = setTimeout(() => {
        performSearch(query, resultsContainer);
    }, 200);
}

function performSearch(query, container) {
    // Placeholder for search implementation
    // This would integrate with a search index or client-side search
    console.log('Search query:', query);
    container.classList.add('hidden');
}

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
(function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
})();

// ===== LAZY LOAD IMAGES =====
(function initLazyLoad() {
    if ('loading' in HTMLImageElement.prototype) {
        // Browser supports native lazy loading
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.src;
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }
})();

// ===== EXPORT FOR GLOBAL ACCESS =====
window.toggleDarkMode = toggleDarkMode;
window.handleSearch = handleSearch;