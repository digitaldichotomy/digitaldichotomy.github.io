/**
 * Comprehensive Media Error Handling System
 * Digital Dichotomy Website
 * Provides robust error handling for all images and videos
 */

class MediaErrorHandler {
    constructor() {
        this.initialized = false;
        this.errorCount = 0;
        this.maxErrors = 10; // Prevent infinite loops
    }

    init() {
        if (this.initialized) return;
        
        this.handleImages();
        this.handleVideos();
        this.addErrorStyles();
        this.initialized = true;
        
        console.log('Media error handling initialized');
    }

    handleImages() {
        document.querySelectorAll('img').forEach(img => {
            // Add loading="lazy" if not present
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }

            // Skip if already processed
            if (img.dataset.errorHandled) return;
            img.dataset.errorHandled = 'true';

            // Enhanced error handling
            img.addEventListener('error', (e) => {
                if (this.errorCount >= this.maxErrors) {
                    console.warn('Max error count reached, stopping further error handling');
                    return;
                }
                this.errorCount++;
                this.handleImageError(img);
            });

            // Load success handling
            img.addEventListener('load', () => {
                img.classList.remove('img-error');
                img.style.opacity = '1';
            });

            // Improve alt text if missing or generic
            if (!img.alt || img.alt.trim() === '') {
                img.alt = this.generateAltText(img);
            }

            // Add focus handling for accessibility
            img.addEventListener('focus', () => {
                img.style.outline = '2px solid #dc2626';
                img.style.outlineOffset = '2px';
            });

            img.addEventListener('blur', () => {
                img.style.outline = 'none';
            });
        });
    }

    handleVideos() {
        document.querySelectorAll('video').forEach(video => {
            // Skip if already processed
            if (video.dataset.errorHandled) return;
            video.dataset.errorHandled = 'true';

            // Enhanced error handling
            video.addEventListener('error', () => {
                this.handleVideoError(video);
            });

            // Handle source errors
            video.querySelectorAll('source').forEach(source => {
                source.addEventListener('error', () => {
                    this.handleVideoError(video);
                });
            });

            // Loading states
            video.addEventListener('loadstart', () => {
                video.parentElement.classList.add('video-loading');
            });

            video.addEventListener('canplay', () => {
                video.parentElement.classList.remove('video-loading');
            });

            video.addEventListener('stalled', () => {
                console.warn('Video playback stalled:', video.src);
            });

            video.addEventListener('abort', () => {
                console.warn('Video loading aborted:', video.src);
            });

            // Add focus handling for accessibility
            video.addEventListener('focus', () => {
                video.style.outline = '2px solid #dc2626';
                video.style.outlineOffset = '2px';
            });

            video.addEventListener('blur', () => {
                video.style.outline = 'none';
            });
        });
    }

    handleImageError(img) {
        if (img.classList.contains('img-error')) return;

        img.classList.add('img-error');
        
        // Create fallback based on image context
        const fallbackSrc = this.generateFallbackImage(img);
        if (fallbackSrc && img.src !== fallbackSrc) {
            img.src = fallbackSrc;
        }

        // Add error title for accessibility
        img.title = 'Image failed to load - fallback image shown';
        
        // Log error for debugging
        console.warn('Image failed to load:', img.src);
    }

    handleVideoError(video) {
        if (video.classList.contains('video-error')) return;

        video.classList.add('video-error');
        video.style.display = 'none';

        // Create error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'media-error-message video-error';
        errorDiv.innerHTML = `
            <div class="media-error-icon">⚠️</div>
            <h3>Video Unavailable</h3>
            <p>The video content could not be loaded. This may be due to network issues or an unsupported format.</p>
            <button onclick="this.parentElement.style.display='none';document.querySelector('video').style.display='block';document.querySelector('video').play();" 
                    class="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors">
                Try Again
            </button>
        `;

        video.parentElement.appendChild(errorDiv);
        console.error('Video failed to load:', video.src);
    }

    generateFallbackImage(img) {
        const width = img.naturalWidth || 300;
        const height = img.naturalHeight || 450;
        const alt = img.alt || 'Image';
        
        // Generate contextual fallback text
        let fallbackText = 'Image+Unavailable';
        if (alt.includes('Book') || alt.includes('book')) {
            fallbackText = 'Book+Cover';
        } else if (alt.includes('Fin') || alt.includes('Nyx')) {
            fallbackText = 'Fin+Nyx';
        } else if (alt.includes('Architecture')) {
            fallbackText = 'Architecture+Cover';
        } else if (alt.includes('Shadow')) {
            fallbackText = 'Book+Cover';
        } else if (alt.includes('Protocol')) {
            fallbackText = 'Protocol+Cover';
        }
        
        return `https://placehold.co/${width}x${height}/444444/FFFFFF?text=${fallbackText}`;
    }

    generateAltText(img) {
        const src = img.src.toLowerCase();
        if (src.includes('book') || src.includes('cover')) {
            return 'Book cover image';
        } else if (src.includes('fin') || src.includes('nyx')) {
            return 'Fin Nyx author image';
        } else if (src.includes('architecture')) {
            return 'Architecture diagram or illustration';
        } else if (src.includes('protocol')) {
            return 'Protocol visualization';
        } else if (src.includes('shadow')) {
            return 'Book cover image';
        } else {
            return 'Content image';
        }
    }

    addErrorStyles() {
        // Only add styles if not already present
        if (document.getElementById('media-error-styles')) return;

        const style = document.createElement('style');
        style.id = 'media-error-styles';
        style.textContent = `
            /* Error handling styles */
            .img-error {
                opacity: 0.7 !important;
                border: 2px dashed #dc2626 !important;
                background: #f8f8f8 !important;
            }
            
            .video-error {
                background: linear-gradient(135deg, #1f2937 0%, #374151 100%) !important;
                border: 2px dashed #dc2626 !important;
            }
            
            .media-error-message {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                padding: 2rem;
                color: #9ca3af;
                text-align: center;
                min-height: 200px;
            }
            
            .media-error-icon {
                font-size: 3rem;
                margin-bottom: 1rem;
                opacity: 0.7;
            }
            
            /* Loading states */
            .video-loading {
                background: linear-gradient(90deg, #333 25%, #444 50%, #333 75%);
                background-size: 200% 100%;
                animation: videoLoading 1.5s infinite;
            }
            
            @keyframes videoLoading {
                0% { background-position: 200% 0; }
                100% { background-position: -200% 0; }
            }
            
            /* Accessibility improvements */
            img[alt] {
                transition: opacity 0.3s ease;
            }
            
            img:focus, video:focus {
                outline: 2px solid #dc2626;
                outline-offset: 2px;
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize when DOM is ready
const mediaErrorHandler = new MediaErrorHandler();

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => mediaErrorHandler.init());
} else {
    mediaErrorHandler.init();
}

// Also initialize after dynamic content loads
window.addEventListener('load', () => {
    setTimeout(() => mediaErrorHandler.init(), 1000);
});

// Re-initialize when new content is added (for dynamic pages)
const observer = new MutationObserver((mutations) => {
    let shouldReinit = false;
    mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === 1) { // Element node
                    if (node.tagName === 'IMG' || node.tagName === 'VIDEO') {
                        shouldReinit = true;
                    } else if (node.querySelector && (node.querySelector('img') || node.querySelector('video'))) {
                        shouldReinit = true;
                    }
                }
            });
        }
    });
    
    if (shouldReinit) {
        setTimeout(() => mediaErrorHandler.init(), 100);
    }
});

// Start observing the document body
if (document.body) {
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

// Export for manual initialization if needed
window.MediaErrorHandler = MediaErrorHandler;