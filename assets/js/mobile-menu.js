/**
 * Mobile Menu Functionality - Privacy First Implementation
 * No tracking, no external dependencies
 */

(function() {
    'use strict';

    // Mobile Menu State
    const MobileMenu = {
        isOpen: false,
        menuBtn: null,
        menuOverlay: null,
        menu: null,
        closeBtn: null,
        searchInput: null,
        
        // Initialize mobile menu
        init: function() {
            // Get DOM elements
            this.menuBtn = document.getElementById('mobile-menu-btn');
            this.menuOverlay = document.getElementById('mobile-menu-overlay');
            this.menu = document.getElementById('mobile-menu');
            this.closeBtn = document.querySelector('.mobile-menu-close');
            this.searchInput = document.getElementById('mobile-search-input');
            
            // Check if elements exist
            if (!this.menuBtn || !this.menuOverlay || !this.menu || !this.closeBtn) {
                console.warn('Mobile menu elements not found');
                return;
            }
            
            // Add event listeners
            this.menuBtn.addEventListener('click', () => this.toggle());
            this.closeBtn.addEventListener('click', () => this.close());
            this.menuOverlay.addEventListener('click', () => this.close());
            
            // Close menu when clicking on links
            const menuLinks = this.menu.querySelectorAll('.mobile-menu-link');
            menuLinks.forEach(link => {
                link.addEventListener('click', () => this.close());
            });
            
            // Close menu on escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.isOpen) {
                    this.close();
                }
            });
            
            // Initialize feather icons
            this.initFeatherIcons();
        },
        
        // Toggle mobile menu
        toggle: function() {
            if (this.isOpen) {
                this.close();
            } else {
                this.open();
            }
        },
        
        // Open mobile menu
        open: function() {
            this.isOpen = true;
            this.menuOverlay.classList.add('open');
            this.menu.classList.add('open');
            document.body.classList.add('mobile-menu-open');
            this.menuBtn.setAttribute('aria-expanded', 'true');
            this.menuBtn.classList.add('active');
            
            // Focus search input for better UX
            if (this.searchInput) {
                setTimeout(() => this.searchInput.focus(), 300);
            }
        },
        
        // Close mobile menu
        close: function() {
            this.isOpen = false;
            this.menuOverlay.classList.remove('open');
            this.menu.classList.remove('open');
            document.body.classList.remove('mobile-menu-open');
            this.menuBtn.setAttribute('aria-expanded', 'false');
            this.menuBtn.classList.remove('active');
        },
        
        // Initialize feather icons
        initFeatherIcons: function() {
            if (typeof feather !== 'undefined') {
                feather.replace();
            }
        }
    };
    
    // Dark Mode Toggle
    const DarkMode = {
        init: function() {
            const toggleBtn = document.querySelector('[onclick*="toggleDarkMode"]');
            if (toggleBtn) {
                toggleBtn.addEventListener('click', () => this.toggle());
            }
            
            // Initialize based on system preference
            this.initializeDarkMode();
        },
        
        toggle: function() {
            const isDark = document.documentElement.classList.toggle('dark');
            localStorage.setItem('darkMode', isDark);
            this.updateIcon(isDark);
        },
        
        initializeDarkMode: function() {
            // Check localStorage first
            const savedMode = localStorage.getItem('darkMode');
            if (savedMode !== null) {
                const isDark = savedMode === 'true';
                if (isDark) {
                    document.documentElement.classList.add('dark');
                }
                this.updateIcon(isDark);
                return;
            }
            
            // Fallback to system preference
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (prefersDark) {
                document.documentElement.classList.add('dark');
                this.updateIcon(true);
            }
        },
        
        updateIcon: function(isDark) {
            const icon = document.getElementById('theme-icon');
            if (icon && typeof feather !== 'undefined') {
                if (isDark) {
                    icon.setAttribute('data-feather', 'sun');
                } else {
                    icon.setAttribute('data-feather', 'moon');
                }
                feather.replace();
            }
        }
    };
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            MobileMenu.init();
            DarkMode.init();
        });
    } else {
        MobileMenu.init();
        DarkMode.init();
    }
    
    // Make functions globally available
    window.toggleMobileMenu = () => MobileMenu.toggle();
    window.closeMobileMenu = () => MobileMenu.close();
    window.toggleDarkMode = () => DarkMode.toggle();

})();
