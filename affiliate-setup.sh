#!/bin/bash

# Amazon Associates Setup Verification & Configuration
echo "🛒 Amazon Associates Setup Verification"
echo "===================================="

echo "🔍 CHECKING AFFILIATE STATUS"
echo ""

# Test if the tracking ID is valid
echo "Testing affiliate tag: digitaldichot-20"
echo ""

# Create a test link to verify
TEST_LINK="https://www.amazon.com/dp/B0G1VDFFDH?tag=digitaldichot-20"

echo "📗 Test link created:"
echo "$TEST_LINK"
echo ""

echo "⚠️  CRITICAL VERIFICATION NEEDED:"
echo "=================================="
echo ""
echo "1. SIGN UP FOR AMAZON ASSOCIATES (If not done):"
echo "   → Go to: https://affiliate-program.amazon.com"
echo "   → Click 'Sign up'"
echo "   → Use website: https://digitaldichotomy.github.io"
echo "   → Wait for approval (usually 1-3 days)"
echo ""

echo "2. GET YOUR TRACKING ID:"
echo "   → After approval, login to Associates Central"
echo "   → Find your tracking ID in Account Settings"
echo "   → Format: 'yourtag-20'"
echo ""

echo "3. VERIFY YOUR TRACKING ID:"
echo "   → Replace 'digitaldichot-20' with your actual ID"
echo "   → Update all 14 links in index.html"
echo ""

echo "4. TEST YOUR LINKS:"
echo "   → Click your own affiliate links"
echo "   → Check if tag appears in Amazon URL"
echo "   → Make a test purchase (optional)"
echo ""

echo "🔧 CURRENT STATUS CHECK:"
echo "========================"

# Count current affiliate links
LINK_COUNT=$(grep -c "digitaldichot-20" index.html)
echo "Links with 'digitaldichot-20': $LINK_COUNT"

# Check if there are any other tracking IDs
OTHER_IDS=$(grep -o "tag=[a-zA-Z0-9-]*" index.html | sort | uniq)
echo "All tracking IDs found:"
echo "$OTHER_IDS"

echo ""
echo "📋 SETUP CHECKLIST:"
echo "=================="
echo ""

# Create interactive checklist
cat > 'affiliate-checklist.txt' << 'EOF'
□ Amazon Associates account created and approved
□ Tracking ID obtained from Associates Central
□ All 14 links updated with correct tracking ID
□ Test purchase made to verify tracking works
□ Amazon Associates dashboard monitored for clicks
□ Payment information set up (bank account or gift cards)
□ Tax information completed in Associates Central
□ Product compliance guidelines reviewed
□ Mobile app compliance checked (if using app)
□ Social media disclosure added (if promoting on social)

□ Website compliance verified:
  - Privacy policy created
  - Terms of service added  
  - Affiliate disclosure prominent
  - No prohibited content
  - No misleading claims
  - No price claims without "as of" date

□ Technical implementation:
  - All links use proper tag format
  - Product links use canonical URLs
  - No link cloaking or redirects
  - Mobile links work correctly
  - International traffic handled properly

□ Monitoring setup:
  - Google Analytics tracks affiliate clicks
  - Amazon Associates dashboard checked regularly
  - Conversion rate monitored
  - Top performing products identified
  - Seasonal trends tracked
EOF

echo "✅ Created affiliate-checklist.txt"
echo ""

echo "⚡ QUICK SETUP ACTIONS:"
echo "======================"
echo ""

# Create sed script to update tracking ID
cat > 'update-affiliate.sh' << 'EOF'
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
EOF

chmod +x update-affiliate.sh
echo "✅ Created update-affiliate.sh script"
echo ""

echo "📊 EXPECTED COMMISSION RATES:"
echo "==========================="
echo "Kindle eBooks: 4.0% - 10.0%"
echo "Physical Books: 4.5%"
echo "Electronics: 4.0%"
echo "Computers: 4.5%"
echo "Average across categories: ~4.5%"
echo ""

echo "💰 REVENUE PROJECTIONS:"
echo "======================"
echo "With 100 daily visitors and 2% CTR:"
echo "- 2 Amazon clicks per day"
echo "- 0.02-0.06 sales per day (1-3% conversion)"
echo "- \$0.50-\$3.00 daily revenue (at \$25 avg book price)"
echo "- \$15-\$90 monthly revenue"
echo ""

echo "With 1,000 daily visitors and 3% CTR:"
echo "- 30 Amazon clicks per day"
echo "- 0.3-0.9 sales per day"
echo "- \$7.50-\$22.50 daily revenue"
echo "- \$225-\$675 monthly revenue"
echo ""

echo "🎯 NEXT STEPS:"
echo "==============="
echo "1. Sign up for Amazon Associates Program"
echo "2. Get approved and receive your tracking ID"
echo "3. Run: ./update-affiliate.sh YOUR_TRACKING_ID"
echo "4. Test all links work correctly"
echo "5. Deploy changes to GitHub"
echo "6. Monitor Amazon Associates dashboard"
echo ""

echo "📞 AMAZON SUPPORT:"
echo "================="
echo "If you need help:"
echo "- Associates Central: https://affiliate-program.amazon.com"
echo "- Help pages: Available after login"
echo "- Email: Available through Associates Central"
echo "- Phone: Not typically available for Associates"
echo ""

echo "⚠️  IMPORTANT REMINDERS:"
echo "========================"
echo "- You MUST disclose affiliate relationship per FTC guidelines"
echo "- Amazon can terminate accounts for policy violations"
echo "- Payments are made ~60 days after month end"
echo "- Minimum payout threshold: \$10 (direct deposit) or \$100 (check)"
echo "- Tax forms required for earnings"
echo ""

echo "🚀 READY TO LAUNCH:"
echo "==================="
echo "Once you have your tracking ID:"
echo "1. Run: ./update-affiliate.sh YOUR_ID"
echo "2. Test: Click your links to verify tags"
echo "3. Deploy: git add . && git commit && git push"
echo "4. Monitor: Check Associates Central in 24 hours"
echo ""

echo "✅ Affiliate setup system ready!"
echo "Waiting for your Amazon Associates tracking ID..."