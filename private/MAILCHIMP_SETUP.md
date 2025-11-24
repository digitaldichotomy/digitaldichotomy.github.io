# Mailchimp Setup Instructions

## Quick Setup Guide

### 1. Get Your Mailchimp IDs
1. Log in to [Mailchimp](https://mailchimp.com)
2. Go to Audience → Settings → Audience name and defaults
3. Copy your **Audience ID** (this is your `u` parameter)
4. Go to Audience → Signup forms → Embedded forms
5. Copy your **Form ID** (this is your `id` parameter)

### 2. Update the Code
Replace in `index.html`:
```javascript
const mailchimpUrl = 'https://digitaldichotomy.us21.list-manage.com/subscribe/post-json?u=YOUR_MAILCHIMP_U_ID&id=YOUR_MAILCHIMP_LIST_ID&c=?';
```

With your actual IDs:
```javascript
const mailchimpUrl = 'https://YOUR_SERVER.list-manage.com/subscribe/post-json?u=YOUR_ACTUAL_U_ID&id=YOUR_ACTUAL_LIST_ID&c=?';
```

### 3. Test the Integration
1. Open your website
2. Enter an email address in the newsletter form
3. Submit the form
4. Check if you receive a confirmation email

## Alternative: ConvertKit Setup

If using ConvertKit instead:
1. Get your ConvertKit Form ID
2. Replace the Mailchimp URL with:
```javascript
const convertkitUrl = 'https://api.convertkit.com/v3/forms/YOUR_FORM_ID/subscribe';
```

## Current Status
✅ Newsletter form is functional with local storage backup
⏳ Awaiting Mailchimp/ConvertKit API credentials for full integration

## Benefits of Email Marketing Integration
- Automated email sequences for new subscribers
- Weekly newsletter automation
- Book launch announcements
- Analytics and subscriber tracking
- Professional email templates