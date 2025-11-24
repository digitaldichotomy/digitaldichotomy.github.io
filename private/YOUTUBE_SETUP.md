# YouTube Video Setup Guide

## Quick Setup for Your Website Videos

### Step 1: Get Your YouTube Video IDs

Go to your YouTube channel: https://www.youtube.com/channel/UCzTAqXczg006S7PwFQ5h1Mg

**To get video IDs:**
1. Click on any video on your channel
2. Look at the URL in your browser
3. The video ID is the part after `v=`

Example:
- URL: `https://www.youtube.com/watch?v=dQw4w9WgXcQ&feature=share`
- Video ID: `dQw4w9WgXcQ`

### Step 2: Update the Video IDs

Edit the `youtube-updater.js` file and replace the placeholder IDs:

```javascript
const VIDEO_IDS = {
    playlist: 'YOUR_PLAYLIST_ID', // Get from YouTube playlist URL
    featured: [
        'YOUR_FIRST_VIDEO_ID',
        'YOUR_SECOND_VIDEO_ID', 
        'YOUR_THIRD_VIDEO_ID'
    ]
};
```

**To get playlist ID:**
1. Go to your channel > Videos tab
2. Create a playlist or use existing one
3. Click on the playlist
4. Get ID from URL after `list=`

Example:
- URL: `https://www.youtube.com/playlist?list=PLrAXtmRdnEQyJQ47K4y5s0m2A2zJq7r7F`
- Playlist ID: `PLrAXtmRdnEQyJQ47K4y5s0m2A2zJq7r7F`

### Step 3: Alternative - Manual HTML Update

If you prefer not to use the JavaScript updater, you can directly edit the HTML:

1. Open `index.html`
2. Find the YouTube embed sections
3. Replace `VIDEO_ID_1`, `VIDEO_ID_2`, `VIDEO_ID_3` with actual video IDs
4. Update the playlist ID in the main embed

### Step 4: Test the Videos

1. Save your changes
2. Refresh your website
3. Videos should now play from your YouTube channel

### Benefits of YouTube Embed:

✅ No bandwidth usage on your hosting  
✅ YouTube handles all video processing  
✅ Works on all devices  
✅ Better SEO with YouTube metadata  
✅ Easy to update and manage  
✅ No broken video issues  

### Current Status

The website is now set up to display YouTube videos instead of the broken local MP4. The embeds are responsive and will work on all devices.

**Next Action:** Update the video IDs in `youtube-updater.js` with your actual YouTube video IDs.