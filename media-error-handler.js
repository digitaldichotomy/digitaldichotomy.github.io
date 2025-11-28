/**
 * Media Error Handler
 * Safely handles media loading errors and provides fallbacks
 */

(function() {
    'use strict';

    // Safe DOM manipulation utilities
    const safeDOM = {
        createElement: function(tag, attributes = {}, textContent = '') {
            const element = document.createElement(tag);
            Object.keys(attributes).forEach(key => {
                if (key === 'className') {
                    element.className = attributes[key];
                } else if (key.startsWith('data-')) {
                    element.setAttribute(key, attributes[key]);
                } else {
                    element[key] = attributes[key];
                }
            });
            if (textContent) {
                element.textContent = textContent;
            }
            return element;
        },

        replaceElement: function(oldElement, newElement) {
            if (oldElement && oldElement.parentNode && newElement) {
                oldElement.parentNode.replaceChild(newElement, oldElement);
            }
        },

        addClass: function(element, className) {
            if (element && className) {
                element.classList.add(className);
            }
        },

        removeClass: function(element, className) {
            if (element && className) {
                element.classList.remove(className);
            }
        }
    };

    // Media error handler class
    class MediaErrorHandler {
        constructor() {
            this.fallbackImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMCAyNkMxOC40MDg3IDI2IDE3IDI0LjU5MTMgMTcgMjNDMTcgMjEuNDA4NyAxOC40MDg3IDIwIDIwIDIwQzIxLjU5MTMgMjAgMjMgMjEuNDA4NyAyMyAyM0MyMyAyNC41OTEzIDIxLjU5MTMgMjYgMjAgMjZaIiBmaWxsPSIjOUNBM0FGIi8+CjxwYXRoIGQ9Ik0yMCAxNEMxOC40MDg3IDE0IDE3IDEyLjU5MTMgMTcgMTFDMTcgOS40MDg3IDE4LjQwODcgOCAyMCA4QzIxLjU5MTMgOCAyMyA5LjQwODcgMjMgMTFDMjMgMTIuNTkxMyAyMS41OTEzIDE0IDIwIDE0WiIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4=';
            this.init();
        }

        init() {
            this.handleImageErrors();
            this.handleVideoErrors();
            this.handleAudioErrors();
        }

        handleImageErrors() {
            const images = document.querySelectorAll('img');
            images.forEach(img => {
                if (!img.hasAttribute('data-error-handled')) {
                    img.addEventListener('error', (e) => {
                        this.handleImageError(e.target);
                    });
                    img.setAttribute('data-error-handled', 'true');
                }
            });
        }

        handleImageError(img) {
            if (!img || img.hasAttribute('data-fallback-applied')) return;

            // Apply fallback image
            const fallbackImg = safeDOM.createElement('img', {
                src: this.fallbackImage,
                alt: 'Image failed to load',
                className: img.className + ' media-fallback',
                'data-fallback-applied': 'true'
            });

            // Copy relevant attributes
            ['style', 'width', 'height', 'class'].forEach(attr => {
                if (img[attr]) {
                    fallbackImg[attr] = img[attr];
                }
            });

            safeDOM.replaceElement(img, fallbackImg);
        }

        handleVideoErrors() {
            const videos = document.querySelectorAll('video');
            videos.forEach(video => {
                if (!video.hasAttribute('data-error-handled')) {
                    video.addEventListener('error', (e) => {
                        this.handleVideoError(e.target);
                    });
                    video.setAttribute('data-error-handled', 'true');
                }
            });
        }

        handleVideoError(video) {
            if (!video || video.hasAttribute('data-fallback-applied')) return;

            const fallback = safeDOM.createElement('div', {
                className: 'video-fallback bg-gray-200 dark:bg-gray-700 rounded-lg p-4 text-center',
                'data-fallback-applied': 'true'
            });

            const icon = safeDOM.createElement('div', {
                className: 'text-gray-500 dark:text-gray-400 text-2xl mb-2'
            }, '▶️');

            const text = safeDOM.createElement('p', {
                className: 'text-gray-600 dark:text-gray-300 text-sm'
            }, 'Video failed to load');

            fallback.appendChild(icon);
            fallback.appendChild(text);

            // Copy video dimensions
            if (video.style.width) fallback.style.width = video.style.width;
            if (video.style.height) fallback.style.height = video.style.height;

            safeDOM.replaceElement(video, fallback);
        }

        handleAudioErrors() {
            const audios = document.querySelectorAll('audio');
            audios.forEach(audio => {
                if (!audio.hasAttribute('data-error-handled')) {
                    audio.addEventListener('error', (e) => {
                        this.handleAudioError(e.target);
                    });
                    audio.setAttribute('data-error-handled', 'true');
                }
            });
        }

        handleAudioError(audio) {
            if (!audio || audio.hasAttribute('data-fallback-applied')) return;

            const fallback = safeDOM.createElement('div', {
                className: 'audio-fallback bg-gray-200 dark:bg-gray-700 rounded p-3 text-center',
                'data-fallback-applied': 'true'
            });

            const icon = safeDOM.createElement('span', {
                className: 'text-gray-500 dark:text-gray-400 mr-2'
            }, '🔊');

            const text = safeDOM.createElement('span', {
                className: 'text-gray-600 dark:text-gray-300 text-sm'
            }, 'Audio failed to load');

            fallback.appendChild(icon);
            fallback.appendChild(text);

            safeDOM.replaceElement(audio, fallback);
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            new MediaErrorHandler();
        });
    } else {
        new MediaErrorHandler();
    }

    // Expose for potential external use
    window.MediaErrorHandler = MediaErrorHandler;
})();