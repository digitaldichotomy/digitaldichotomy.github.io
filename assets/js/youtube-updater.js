/**
 * YouTube Updater
 * Safely handles YouTube embeds and updates
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
                } else if (key === 'innerHTML') {
                    // Sanitize HTML content
                    element.innerHTML = this.sanitizeHTML(attributes[key]);
                } else {
                    element[key] = attributes[key];
                }
            });
            if (textContent) {
                element.textContent = textContent;
            }
            return element;
        },

        sanitizeHTML: function(html) {
            const div = document.createElement('div');
            div.textContent = html;
            return div.innerHTML;
        },

        replaceElement: function(oldElement, newElement) {
            if (oldElement && oldElement.parentNode && newElement) {
                oldElement.parentNode.replaceChild(newElement, oldElement);
            }
        }
    };

    // YouTube URL validator and converter
    const YouTubeUtils = {
        isValidYouTubeURL: function(url) {
            if (!url || typeof url !== 'string') return false;
            
            const patterns = [
                /^https?:\/\/(www\.)?youtube\.com\/watch\?v=[\w-]+/,
                /^https?:\/\/(www\.)?youtube\.com\/embed\/[\w-]+/,
                /^https?:\/\/youtu\.be\/[\w-]+/,
                /^https?:\/\/(www\.)?youtube\.com\/v\/[\w-]+/
            ];
            
            return patterns.some(pattern => pattern.test(url));
        },

        extractVideoID: function(url) {
            if (!url || typeof url !== 'string') return null;
            
            const patterns = {
                'watch': /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/)([a-zA-Z0-9_-]+)/
            };
            
            const match = url.match(patterns.watch);
            return match ? match[1] : null;
        },

        getEmbedURL: function(videoID, options = {}) {
            if (!videoID) return null;
            
            const params = new URLSearchParams({
                rel: options.rel || '0',
                showinfo: options.showinfo || '0',
                modestbranding: options.modestbranding || '1',
                enablejsapi: options.enablejsapi || '1'
            });
            
            if (options.start) {
                params.append('start', options.start);
            }
            
            return `https://www.youtube-nocookie.com/embed/${videoID}?${params.toString()}`;
        }
    };

    // YouTube embed manager
    class YouTubeUpdater {
        constructor() {
            this.embeds = new Map();
            this.init();
        }

        init() {
            this.processExistingEmbeds();
            this.setupDynamicEmbedHandling();
        }

        processExistingEmbeds() {
            // Process iframe embeds
            const iframes = document.querySelectorAll('iframe[src*="youtube"]');
            iframes.forEach(iframe => {
                this.processIframe(iframe);
            });

            // Process YouTube links that could be converted to embeds
            const links = document.querySelectorAll('a[href*="youtube"]');
            links.forEach(link => {
                this.processLink(link);
            });
        }

        processIframe(iframe) {
            if (!iframe || iframe.hasAttribute('data-youtube-processed')) return;

            const src = iframe.getAttribute('src');
            if (!src) return;

            // Convert to privacy-enhanced embed if needed
            if (src.includes('youtube.com/embed/') && !src.includes('youtube-nocookie.com')) {
                const newSrc = src.replace('youtube.com/embed/', 'youtube-nocookie.com/embed/');
                iframe.setAttribute('src', newSrc);
            }

            // Add security attributes
            iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-presentation');
            iframe.setAttribute('loading', 'lazy');
            iframe.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');
            iframe.setAttribute('data-youtube-processed', 'true');

            // Add error handling
            iframe.addEventListener('error', () => {
                this.handleEmbedError(iframe);
            });
        }

        processLink(link) {
            if (!link || link.hasAttribute('data-youtube-processed')) return;

            const href = link.getAttribute('href');
            if (!YouTubeUtils.isValidYouTubeURL(href)) return;

            // Check if link should be converted to embed
            if (link.hasAttribute('data-youtube-embed')) {
                this.convertLinkToEmbed(link);
            }

            link.setAttribute('data-youtube-processed', 'true');
        }

        convertLinkToEmbed(link) {
            const videoID = YouTubeUtils.extractVideoID(link.getAttribute('href'));
            if (!videoID) return;

            const embedURL = YouTubeUtils.getEmbedURL(videoID);
            
            const iframe = safeDOM.createElement('iframe', {
                src: embedURL,
                className: 'w-full h-64 rounded-lg shadow-lg',
                frameborder: '0',
                allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
                allowfullscreen: 'true',
                loading: 'lazy',
                'data-youtube-processed': 'true'
            });

            safeDOM.replaceElement(link, iframe);
        }

        setupDynamicEmbedHandling() {
            // Watch for dynamically added content
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            this.processNode(node);
                        }
                    });
                });
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        }

        processNode(node) {
            // Check if node is an iframe
            if (node.tagName === 'IFRAME' && node.src && node.src.includes('youtube')) {
                this.processIframe(node);
            }

            // Check child elements
            const iframes = node.querySelectorAll && node.querySelectorAll('iframe[src*="youtube"]');
            const links = node.querySelectorAll && node.querySelectorAll('a[href*="youtube"]');
            
            if (iframes) iframes.forEach(iframe => this.processIframe(iframe));
            if (links) links.forEach(link => this.processLink(link));
        }

        handleEmbedError(iframe) {
            if (!iframe || iframe.hasAttribute('data-error-handled')) return;

            const fallback = safeDOM.createElement('div', {
                className: 'youtube-fallback bg-gray-200 dark:bg-gray-700 rounded-lg p-4 text-center',
                'data-error-handled': 'true'
            });

            const icon = safeDOM.createElement('div', {
                className: 'text-gray-500 dark:text-gray-400 text-2xl mb-2'
            }, '▶️');

            const text = safeDOM.createElement('p', {
                className: 'text-gray-600 dark:text-gray-300 text-sm'
            }, 'YouTube video failed to load');

            fallback.appendChild(icon);
            fallback.appendChild(text);

            // Copy iframe dimensions
            if (iframe.style.width) fallback.style.width = iframe.style.width;
            if (iframe.style.height) fallback.style.height = iframe.style.height;

            safeDOM.replaceElement(iframe, fallback);
        }

        // Public method to update embeds
        updateEmbed(videoID, container, options = {}) {
            if (!videoID || !container) return false;

            const embedURL = YouTubeUtils.getEmbedURL(videoID, options);
            
            const iframe = safeDOM.createElement('iframe', {
                src: embedURL,
                className: 'w-full h-64 rounded-lg shadow-lg',
                frameborder: '0',
                allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
                allowfullscreen: 'true',
                loading: 'lazy',
                'data-youtube-processed': 'true'
            });

            // Clear container and add new embed
            while (container.firstChild) {
                container.removeChild(container.firstChild);
            }
            container.appendChild(iframe);

            return true;
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            new YouTubeUpdater();
        });
    } else {
        new YouTubeUpdater();
    }

    // Expose utilities for external use
    window.YouTubeUpdater = YouTubeUpdater;
    window.YouTubeUtils = YouTubeUtils;
})();