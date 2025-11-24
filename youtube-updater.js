/**
 * YouTube Video Updater for Digital Dichotomy Website
 * 
 * This script helps you easily update YouTube video IDs on the website
 * 
 * Instructions:
 * 1. Get YouTube video IDs from your channel URLs
 *    - Example: https://www.youtube.com/watch?v=dQw4w9WgXcQ
 *    - Video ID is: dQw4w9WgXcQ
 * 
 * 2. Update the VIDEO_IDS array below with your actual video IDs
 * 3. Run this script or manually update the HTML
 */

const VIDEO_IDS = {
    // Using your channel's upload playlist
    playlist: 'UUzTAqXczg006S7PwFQ5h1Mg', // Your channel uploads playlist
    featured: [
        'UUzTAqXczg006S7PwFQ5h1Mg', // Channel uploads
        'UUzTAqXczg006S7PwFQ5h1Mg', // Channel uploads
        'UUzTAqXczg006S7PwFQ5h1Mg'  // Channel uploads
    ]
};

// Function to update video embeds
function updateVideoEmbeds() {
    // Update main playlist embed
    const playlistEmbed = document.querySelector('iframe[src*="videoseries"]');
    if (playlistEmbed && VIDEO_IDS.playlist) {
        playlistEmbed.src = `https://www.youtube.com/embed/videoseries?list=${VIDEO_IDS.playlist}`;
    }
    
    // Update featured video embeds
    const featuredEmbeds = document.querySelectorAll('.grid iframe[src*="VIDEO_ID"]');
    VIDEO_IDS.featured.forEach((videoId, index) => {
        if (featuredEmbeds[index] && videoId && videoId !== 'VIDEO_ID_' + (index + 1)) {
            featuredEmbeds[index].src = `https://www.youtube.com/embed/${videoId}`;
        }
    });
}

// Auto-update when page loads
document.addEventListener('DOMContentLoaded', updateVideoEmbeds);

// Export for manual use
window.updateYouTubeVideos = updateVideoEmbeds;

console.log('YouTube Video Updater loaded');
console.log('Current video IDs:', VIDEO_IDS);
console.log('To update videos, modify VIDEO_IDS in this script or call updateYouTubeVideos()');