#!/bin/bash
# Image Optimization Script for Digital Dichotomy
# Requires: ImageMagick (install with: sudo apt install imagemagick)

echo "=== Image Optimization Script ==="
echo "This script optimizes images for web performance"
echo ""

# Check for ImageMagick
if ! command -v convert &> /dev/null; then
    echo "Error: ImageMagick not found."
    echo "Install with: sudo apt install imagemagick (Linux) or brew install imagemagick (Mac)"
    exit 1
fi

# Optimize PNG files
echo "Optimizing PNG files..."
for img in *.png; do
    if [ -f "$img" ]; then
        original_size=$(stat -f%z "$img" 2>/dev/null || stat -c%s "$img" 2>/dev/null)
        echo "  Processing: $img"
        
        # Create backup
        cp "$img" "${img}.backup"
        
        # Optimize: resize if >1200px wide, compress to 85% quality
        convert "$img" \
            -resize '1200x1200>' \
            -strip \
            -interlace Plane \
            -quality 85 \
            "${img}.tmp"
        
        mv "${img}.tmp" "$img"
        
        new_size=$(stat -f%z "$img" 2>/dev/null || stat -c%s "$img" 2>/dev/null)
        savings=$(( (original_size - new_size) * 100 / original_size ))
        echo "    Saved: ${savings}% (${original_size} → ${new_size} bytes)"
    fi
done

# Optimize JPG files
echo ""
echo "Optimizing JPEG files..."
for img in *.jpg *.jpeg; do
    if [ -f "$img" ]; then
        original_size=$(stat -f%z "$img" 2>/dev/null || stat -c%s "$img" 2>/dev/null)
        echo "  Processing: $img"
        
        # Create backup
        cp "$img" "${img}.backup"
        
        # Optimize: resize if >1200px wide, compress to 80% quality
        convert "$img" \
            -resize '1200x1200>' \
            -strip \
            -interlace Plane \
            -quality 80 \
            "${img}.tmp"
        
        mv "${img}.tmp" "$img"
        
        new_size=$(stat -f%z "$img" 2>/dev/null || stat -c%s "$img" 2>/dev/null)
        savings=$(( (original_size - new_size) * 100 / original_size ))
        echo "    Saved: ${savings}% (${original_size} → ${new_size} bytes)"
    fi
done

echo ""
echo "=== Optimization Complete ==="
echo "Backup files saved with .backup extension"
echo "Review results and delete .backup files when satisfied"
