#!/bin/bash

# Usage: ./update-affiliate.sh YOUR_TRACKING_ID

if [ -z "$1" ]; then
    echo "Usage: ./update-affiliate.sh YOUR_TRACKING_ID"
    echo "Example: ./update-affiliate.sh mytag-20"
    exit 1
fi

NEW_ID="$1"
echo "Updating all affiliate links to use: $NEW_ID"

# Backup original file
cp index.html index.html.backup

# Replace all instances of digitaldichot-20
sed -i "s/digitaldichot-20/$NEW_ID/g" index.html

echo "✅ Updated index.html"
echo "Links updated: $(grep -c "$NEW_ID" index.html)"
echo "Backup saved as: index.html.backup"
echo ""
echo "⚠️  TEST YOUR LINKS BEFORE DEPLOYING!"
