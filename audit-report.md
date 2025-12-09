# Audit Report
- **Total Files**: $(cat file-count.txt | awk '{print $1}')
- **Broken Links**: $(grep -c "error" link-errors.txt || echo "0")
- **Backup Branch**: [backup/restructure-2025-12-08](https://github.com/digitaldichotomy/just_research/tree/backup/restructure-2025-12-08)