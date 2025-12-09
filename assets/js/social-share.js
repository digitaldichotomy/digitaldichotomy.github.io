/**
 * Social Share Buttons - Privacy First Implementation
 * No tracking, no user data collection, no third-party SDKs
 */

(function() {
    'use strict';

    // Share button configuration
    const ShareConfig = {
        // Get current page metadata
        getPageData: function() {
            return {
                url: window.location.href,
                title: document.title,
                description: this.getMetaDescription(),
                image: this.getMetaImage()
            };
        },

        // Get meta description for sharing
        getMetaDescription: function() {
            const metaDesc = document.querySelector('meta[name="description"]');
            return metaDesc ? metaDesc.getAttribute('content') : '';
        },

        // Get meta image for sharing
        getMetaImage: function() {
            const metaImage = document.querySelector('meta[property="og:image"]');
            return metaImage ? metaImage.getAttribute('content') : '';
        },

        // Share to Twitter/X
        shareToTwitter: function() {
            const pageData = this.getPageData();
            const text = encodeURIComponent(pageData.title);
            const url = encodeURIComponent(pageData.url);
            const via = 'DigitalDichotomy'; // Your Twitter handle
            
            window.open(
                `https://twitter.com/intent/tweet?text=${text}&url=${url}&via=${via}`,
                '_blank',
                'width=550,height=420,resizable=yes,scrollbars=yes'
            );
        },

        // Share to Facebook
        shareToFacebook: function() {
            const pageData = this.getPageData();
            const url = encodeURIComponent(pageData.url);
            
            window.open(
                `https://www.facebook.com/sharer/sharer.php?u=${url}`,
                '_blank',
                'width=580,height=400,resizable=yes,scrollbars=yes'
            );
        },

        // Share to LinkedIn
        shareToLinkedIn: function() {
            const pageData = this.getPageData();
            const url = encodeURIComponent(pageData.url);
            const title = encodeURIComponent(pageData.title);
            const summary = encodeURIComponent(pageData.description);
            
            window.open(
                `https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}&summary=${summary}`,
                '_blank',
                'width=600,height=450,resizable=yes,scrollbars=yes'
            );
        },

        // Share to Reddit
        shareToReddit: function() {
            const pageData = this.getPageData();
            const url = encodeURIComponent(pageData.url);
            const title = encodeURIComponent(pageData.title);
            
            window.open(
                `https://reddit.com/submit?url=${url}&title=${title}`,
                '_blank',
                'width=600,height=500,resizable=yes,scrollbars=yes'
            );
        },

        // Copy link to clipboard
        copyLink: function() {
            const pageData = this.getPageData();
            
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(pageData.url).then(() => {
                    this.showCopyFeedback();
                }).catch(() => {
                    this.fallbackCopyToClipboard(pageData.url);
                });
            } else {
                this.fallbackCopyToClipboard(pageData.url);
            }
        },

        // Fallback for older browsers
        fallbackCopyToClipboard: function(text) {
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            textArea.style.top = '-999999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            
            try {
                document.execCommand('copy');
                this.showCopyFeedback();
            } catch (err) {
                console.warn('Failed to copy text: ', err);
            }
            
            document.body.removeChild(textArea);
        },

        // Show copy feedback
        showCopyFeedback: function() {
            // Find and update copy button
            const copyBtn = document.querySelector('[onclick*="copyLink"]');
            if (copyBtn) {
                const originalText = copyBtn.innerHTML;
                copyBtn.innerHTML = '<i data-feather="check"></i> Copied!';
                copyBtn.classList.add('bg-green-600', 'hover:bg-green-700');
                copyBtn.classList.remove('bg-gray-600', 'hover:bg-gray-700');
                
                // Re-initialize feather icons
                if (typeof feather !== 'undefined') {
                    feather.replace();
                }
                
                // Reset after 3 seconds
                setTimeout(() => {
                    copyBtn.innerHTML = originalText;
                    copyBtn.classList.remove('bg-green-600', 'hover:bg-green-700');
                    copyBtn.classList.add('bg-gray-600', 'hover:bg-gray-700');
                    if (typeof feather !== 'undefined') {
                        feather.replace();
                    }
                }, 3000);
            }
        },

        // Share calculator results
        shareCalculatorResults: function(results) {
            const text = encodeURIComponent(`I just calculated my Data Starvation impact: ${results.annualImpact} annually. Join the resistance!`);
            const url = encodeURIComponent(window.location.href);
            
            window.open(
                `https://twitter.com/intent/tweet?text=${text}&url=${url}&via=DigitalDichotomy`,
                '_blank',
                'width=550,height=420,resizable=yes,scrollbars=yes'
            );
        },

        // Share timer completion
        shareTimerCompletion: function() {
            const text = encodeURIComponent(`I just completed the 15-Second Dwell training! Algorithmic poisoning works. #DigitalSovereignty`);
            const url = encodeURIComponent(window.location.href);
            
            window.open(
                `https://twitter.com/intent/tweet?text=${text}&url=${url}&via=DigitalDichotomy`,
                '_blank',
                'width=550,height=420,resizable=yes,scrollbars=yes'
            );
        },

        // Initialize share buttons
        init: function() {
            // Make functions globally available
            window.shareToTwitter = () => this.shareToTwitter();
            window.shareToFacebook = () => this.shareToFacebook();
            window.shareToLinkedIn = () => this.shareToLinkedIn();
            window.shareToReddit = () => this.shareToReddit();
            window.copyLink = () => this.copyLink();
            window.shareCalculatorResults = (results) => this.shareCalculatorResults(results);
            window.shareTimerCompletion = () => this.shareTimerCompletion();
        }
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            ShareConfig.init();
        });
    } else {
        ShareConfig.init();
    }

    // Expose for potential external use
    window.ShareConfig = ShareConfig;
})();