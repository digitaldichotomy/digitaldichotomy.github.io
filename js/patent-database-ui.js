/**
 * Sentinel Patent Database UI - Interactive Interface for Patent Intelligence
 * Handles search, filtering, modal display, and user interactions
 */

class PatentDatabaseUI {
    constructor() {
        this.patents = PATENTS_DATABASE.patents;
        this.countermeasures = COUNTERMEASURES_DATABASE;
        this.filteredPatents = [...this.patents];
        this.selectedPatent = null;
        this.currentView = 'grid';
        this.activeFilters = {
            search: '',
            threat: '',
            category: '',
            assignee: ''
        };
        
        this.init();
    }

    init() {
        this.renderPatentGrid();
        this.setupEventListeners();
        this.updateStatistics();
        this.hideLoadingState();
    }

    renderPatentGrid() {
        const grid = document.getElementById('patent-grid');
        const noResults = document.getElementById('no-results');
        
        if (this.filteredPatents.length === 0) {
            grid.innerHTML = '';
            noResults.classList.remove('hidden');
            this.updateResultsCount(0);
            return;
        }
        
        noResults.classList.add('hidden');
        grid.innerHTML = this.filteredPatents.map(patent => this.createPatentCard(patent)).join('');
        this.updateResultsCount(this.filteredPatents.length);
        
        // Re-initialize feather icons for new content
        setTimeout(() => feather.replace(), 100);
    }

    createPatentCard(patent) {
        const threatColor = this.getThreatColor(patent.threatLevel);
        const threatBorder = this.getThreatBorder(patent.threatLevel);
        const feasibilityStars = this.getFeasibilityStars(patent.countermeasures);
        
        return `
            <article class="patent-card rounded-lg p-6 border-2 ${threatBorder} hover:shadow-xl transition-all duration-300 cursor-pointer focus-visible" 
                 tabindex="0"
                 role="button"
                 aria-label="View details for ${patent.title}"
                 onclick="patentDB.showPatentDetail('${patent.id}')"
                 onkeypress="patentDB.handleCardKeypress(event, '${patent.id}')">
                
                <!-- Patent Number Header -->
                <div class="bg-gradient-to-r from-gray-800 to-gray-900 -mx-6 -mt-6 px-6 py-3 mb-4 rounded-t-lg border-b ${threatBorder}">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-3">
                            <div class="text-lg font-bold text-red-400 font-mono tracking-wider">
                                ${patent.id}
                            </div>
                            <div class="text-xs px-2 py-1 bg-red-900/50 text-red-300 rounded border border-red-700/50">
                                PATENT
                            </div>
                        </div>
                        <div class="flex items-center gap-2">
                            <span class="text-xs text-gray-400">Rank</span>
                            <span class="text-sm font-bold text-white bg-gray-700 px-2 py-1 rounded">#${patent.rank}</span>
                        </div>
                    </div>
                </div>
                
                <!-- Assignee & Threat -->
                <div class="flex justify-between items-start mb-4">
                    <div class="flex-1">
                        <div class="text-sm text-gray-300 font-semibold mb-1">${patent.assignee}</div>
                        <div class="text-xs text-gray-500">Filed: ${patent.filingDate || 'Unknown'}</div>
                    </div>
                    <div class="flex flex-col items-end gap-2">
                        <span class="px-3 py-1 rounded text-xs font-bold ${threatColor} ${patent.threatLevel === 'CRITICAL' ? 'threat-critical animate-pulse' : ''}">
                            ${patent.threatLevel}
                        </span>
                    </div>
                </div>
                
                <!-- Content -->
                <h3 class="text-lg font-bold text-white mb-3 line-clamp-2">${patent.title}</h3>
                
                <div class="flex items-center gap-2 mb-3">
                    <span class="text-xs px-2 py-1 bg-gray-700 rounded text-gray-300">${patent.category}</span>
                    <span class="text-xs px-2 py-1 ${patent.deploymentStatus.includes('active') ? 'bg-green-900/50 text-green-300' : 'bg-yellow-900/50 text-yellow-300'} rounded">
                        ${patent.deploymentStatus}
                    </span>
                </div>
                
                <p class="text-sm text-gray-400 mb-4 line-clamp-3 leading-relaxed">
                    <span class="text-blue-400 mr-1">●</span>
                    ${patent.alarmingReason}
                </p>
                
                <!-- Technical Details Preview -->
                <div class="bg-gray-800/50 rounded p-3 mb-4">
                    <div class="text-xs text-gray-500 mb-1">Technical Detail:</div>
                    <div class="text-xs text-gray-300 line-clamp-2">${patent.technicalDetail}</div>
                </div>
                
                <!-- Footer -->
                <div class="flex justify-between items-center pt-4 border-t border-gray-700">
                    <div class="flex items-center gap-3">
                        <div class="text-xs text-gray-500">
                            <i data-feather="shield" class="w-3 h-3 inline mr-1"></i>
                            ${patent.countermeasures.length} Defenses
                        </div>
                        <div class="text-xs text-gray-500">
                            <i data-feather="trending-up" class="w-3 h-3 inline mr-1"></i>
                            Impact: ${patent.impactScore}/10
                        </div>
                    </div>
                    <button class="text-red-400 hover:text-red-300 text-sm font-semibold transition-colors flex items-center gap-1 focus-visible" aria-label="View patent details">
                        View Details
                        <i data-feather="arrow-right" class="w-4 h-4"></i>
                    </button>
                </div>
            </article>
        `;
    }

    getThreatColor(threatLevel) {
        const colors = {
            'CRITICAL': 'bg-red-900 text-red-300',
            'HIGH': 'bg-orange-900 text-orange-300',
            'MEDIUM': 'bg-yellow-900 text-yellow-300',
            'LOW': 'bg-green-900 text-green-300'
        };
        return colors[threatLevel] || colors['MEDIUM'];
    }

    getThreatBorder(threatLevel) {
        const borders = {
            'CRITICAL': 'border-red-600 bg-red-950/20',
            'HIGH': 'border-orange-600 bg-orange-950/20',
            'MEDIUM': 'border-yellow-600 bg-yellow-950/20',
            'LOW': 'border-green-600 bg-green-950/20'
        };
        return borders[threatLevel] || borders['MEDIUM'];
    }

    getFeasibilityStars(countermeasures) {
        if (!countermeasures || countermeasures.length === 0) return '';
        
        const avgFeasibility = countermeasures.reduce((sum, cm) => {
            const stars = (cm.feasibility || '★☆☆').match(/★/g) || [];
            return sum + stars.length;
        }, 0) / countermeasures.length;
        
        const fullStars = Math.floor(avgFeasibility);
        const emptyStars = 3 - fullStars;
        
        return '★'.repeat(fullStars) + '☆'.repeat(emptyStars);
    }

    showPatentDetail(patentId) {
        const patent = this.patents.find(p => p.id === patentId);
        if (!patent) return;

        this.selectedPatent = patent;
        const modal = document.getElementById('patent-modal');
        const modalContent = modal.querySelector('.modal-content');
        
        modalContent.innerHTML = this.createPatentModal(patent);
        modal.classList.remove('hidden');
        
        // Re-initialize feather icons for modal content
        setTimeout(() => feather.replace(), 100);
        
        // Focus management for accessibility
        modalContent.focus();
        document.body.style.overflow = 'hidden';
    }

    createPatentModal(patent) {
        const threatColor = this.getThreatColor(patent.threatLevel);
        const relatedPatents = this.getRelatedPatents(patent);
        
        return `
            <div class="relative">
                <!-- Close Button -->
                <button onclick="patentDB.closeModal()" 
                        class="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10 focus-visible"
                        aria-label="Close modal">
                    <i data-feather="x" class="w-6 h-6"></i>
                </button>
                
                <!-- Modal Header -->
                <div class="bg-gradient-to-r from-gray-800 to-gray-900 p-6 border-b border-gray-700">
                    <!-- Patent Number Bar -->
                    <div class="bg-black/50 rounded-lg p-4 mb-4 border border-gray-600">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-4">
                                <div class="text-2xl font-bold text-red-400 font-mono tracking-wider">
                                    ${patent.id}
                                </div>
                                <div class="flex items-center gap-2">
                                    <div class="px-3 py-1 bg-red-900/50 text-red-300 rounded text-sm font-semibold border border-red-700/50">
                                        PATENT
                                    </div>
                                    <div class="px-3 py-1 bg-gray-700 text-gray-300 rounded text-sm">
                                        Filed: ${patent.filingDate || 'Unknown'}
                                    </div>
                                </div>
                            </div>
                            <div class="flex items-center gap-3">
                                <span class="px-4 py-2 rounded text-sm font-bold ${threatColor} ${patent.threatLevel === 'CRITICAL' ? 'animate-pulse' : ''}">
                                    ${patent.threatLevel}
                                </span>
                                <div class="text-center">
                                    <div class="text-xs text-gray-500">RANK</div>
                                    <div class="text-lg font-bold text-white">#${patent.rank}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Title and Meta -->
                    <h2 class="text-2xl font-bold text-white mb-3">${patent.title}</h2>
                    <div class="flex items-center gap-6 text-sm text-gray-400">
                        <div class="flex items-center gap-2">
                            <i data-feather="building" class="w-4 h-4"></i>
                            <span class="text-gray-300 font-semibold">${patent.assignee}</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <i data-feather="folder" class="w-4 h-4"></i>
                            <span>${patent.category}</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <i data-feather="activity" class="w-4 h-4"></i>
                            <span>Impact: ${patent.impactScore}/10</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <i data-feather="zap" class="w-4 h-4"></i>
                            <span class="${patent.deploymentStatus.includes('active') ? 'text-green-400' : 'text-yellow-400'}">${patent.deploymentStatus}</span>
                        </div>
                    </div>
                </div>

                <!-- Modal Body -->
                <div class="p-6 space-y-6">
                    <!-- Threat Analysis -->
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div class="bg-gray-800 p-4 rounded-lg border border-gray-600">
                            <h3 class="text-gray-300 font-bold mb-3 flex items-center gap-2">
                                <i data-feather="info" class="w-5 h-5"></i>
                                Technical Assessment
                            </h3>
                            <p class="text-sm text-gray-200 leading-relaxed">${patent.alarmingReason}</p>
                        </div>
                        
                        <div class="bg-gray-700 p-4 rounded-lg border border-gray-600">
                            <h3 class="text-gray-300 font-bold mb-3 flex items-center gap-2">
                                <i data-feather="cpu" class="w-5 h-5"></i>
                                Technical Details
                            </h3>
                            <p class="text-sm text-gray-200 font-mono leading-relaxed">${patent.technicalDetail}</p>
                        </div>
                    </div>

                    <!-- Static Analysis -->
                    <div class="bg-gray-800 p-4 rounded-lg border border-gray-600">
                        <h3 class="text-gray-300 font-bold mb-3 flex items-center gap-2">
                            <i data-feather="file-text" class="w-5 h-5"></i>
                            Intelligence Analysis
                        </h3>
                        <p class="text-sm text-gray-200 leading-relaxed">${patent.staticAnalysis}</p>
                    </div>

                    <!-- Defense Countermeasures -->
                    <div>
                        <h3 class="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <i data-feather="shield" class="w-5 h-5 text-blue-400"></i>
                            Mitigation Protocols (${patent.countermeasures.length} documented)
                        </h3>
                        <div class="space-y-4">
                            ${patent.countermeasures.map(cm => this.createCountermeasureCard(cm)).join('')}
                        </div>
                    </div>

                    <!-- Related Patents -->
                    ${relatedPatents.length > 0 ? `
                        <div>
                            <h3 class="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                <i data-feather="link" class="w-5 h-5 text-blue-400"></i>
                                Related Patents
                            </h3>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                ${relatedPatents.map(related => this.createRelatedPatentCard(related)).join('')}
                            </div>
                        </div>
                    ` : ''}
                </div>

                <!-- Modal Footer -->
                <div class="p-6 border-t border-gray-700 bg-gray-800/50">
                    <div class="flex justify-between items-center">
                        <div class="text-sm text-gray-400">
                            <i data-feather="info" class="w-4 h-4 inline mr-1"></i>
                            This intelligence is for educational and defensive purposes only
                        </div>
                        <div class="flex gap-3">
                            <button onclick="patentDB.exportPatent('${patent.id}')" 
                                    class="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm transition-colors focus-visible">
                                <i data-feather="download" class="w-4 h-4 inline mr-1"></i>
                                Export
                            </button>
                            <button onclick="patentDB.closeModal()" 
                                    class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm transition-colors focus-visible">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    createCountermeasureCard(countermeasure) {
        const typeColor = this.getCountermeasureTypeColor(countermeasure.type);
        const feasibilityStars = this.getFeasibilityStars([countermeasure]);
        
        return `
                <div class="p-4 rounded-lg border ${typeColor} bg-gray-700/50">
                <div class="flex justify-between items-start mb-3">
                    <h4 class="font-bold text-gray-100 flex items-center gap-2">
                        ${this.getCountermeasureIcon(countermeasure.type)}
                        ${countermeasure.protocol}
                    </h4>
                    <div class="flex items-center gap-2">
                        <span class="text-xs px-2 py-1 rounded ${typeColor}">${countermeasure.type}</span>
                        <span class="text-xs" title="Feasibility">${feasibilityStars}</span>
                    </div>
                </div>
                <p class="text-sm text-gray-200 mb-3 leading-relaxed">${countermeasure.description}</p>
                <div class="text-xs text-gray-400 italic mb-3">${countermeasure.evidence}</p>
                <div class="flex justify-between items-center text-xs">
                    <div class="text-gray-300">
                        <i data-feather="dollar-sign" class="w-3 h-3 inline mr-1"></i>
                        ${countermeasure.cost}
                    </div>
                    <div class="text-gray-300">
                        <i data-feather="alert-circle" class="w-3 h-3 inline mr-1"></i>
                        Difficulty: ${countermeasure.difficulty}
                    </div>
                </div>
            </div>
        `;
    }

    getCountermeasureTypeColor(type) {
        const colors = {
            'Technical': 'border-blue-800 bg-blue-900/20',
            'Legal': 'border-green-800 bg-green-900/20',
            'Behavioral': 'border-purple-800 bg-purple-900/20'
        };
        return colors[type] || colors['Technical'];
    }

    getCountermeasureIcon(type) {
        const icons = {
            'Technical': '<i data-feather="settings" class="w-4 h-4 text-blue-400"></i>',
            'Legal': '<i data-feather="gavel" class="w-4 h-4 text-green-400"></i>',
            'Behavioral': '<i data-feather="user" class="w-4 h-4 text-purple-400"></i>'
        };
        return icons[type] || icons['Technical'];
    }

    createRelatedPatentCard(patent) {
        const threatColor = this.getThreatColor(patent.threatLevel);
        
        return `
                <div class="p-3 bg-gray-700 rounded-lg border border-gray-600 hover:border-gray-500 transition-colors cursor-pointer"
                 onclick="patentDB.showPatentDetail('${patent.id}')">
                    <div class="flex justify-between items-start mb-2">
                        <span class="text-xs font-mono text-gray-400">${patent.id}</span>
                        <span class="text-xs px-2 py-1 rounded ${threatColor}">${patent.threatLevel}</span>
                    </div>
                    <h4 class="text-sm font-semibold text-gray-100 mb-1 line-clamp-2">${patent.title}</h4>
                    <div class="text-xs text-gray-400">${patent.assignee}</div>
                </div>
        `;
    }

    getRelatedPatents(patent) {
        return this.patents.filter(p => 
            p.id !== patent.id && (
                p.category === patent.category ||
                p.assignee === patent.assignee ||
                (Math.abs(p.rank - patent.rank) <= 2)
            )
        ).slice(0, 4);
    }

    setupEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('patent-search');
        searchInput.addEventListener('input', (e) => {
            this.activeFilters.search = e.target.value.toLowerCase();
            this.filterPatents();
        });

        // Filter functionality
        document.getElementById('threat-filter').addEventListener('change', (e) => {
            this.activeFilters.threat = e.target.value;
            this.filterPatents();
        });

        document.getElementById('category-filter').addEventListener('change', (e) => {
            this.activeFilters.category = e.target.value;
            this.filterPatents();
        });

        document.getElementById('assignee-filter').addEventListener('change', (e) => {
            this.activeFilters.assignee = e.target.value;
            this.filterPatents();
        });

        // Clear filters
        document.getElementById('clear-filters').addEventListener('click', () => {
            this.clearAllFilters();
        });

        // View toggle
        document.getElementById('grid-view').addEventListener('click', () => {
            this.setView('grid');
        });

        document.getElementById('list-view').addEventListener('click', () => {
            this.setView('list');
        });

        // Modal close on background click
        document.getElementById('patent-modal').addEventListener('click', (e) => {
            if (e.target.id === 'patent-modal' || e.target.classList.contains('modal-backdrop')) {
                this.closeModal();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !document.getElementById('patent-modal').classList.contains('hidden')) {
                this.closeModal();
            }
        });
    }

    filterPatents() {
        this.filteredPatents = this.patents.filter(patent => {
            const matchesSearch = !this.activeFilters.search || 
                patent.title.toLowerCase().includes(this.activeFilters.search) ||
                patent.assignee.toLowerCase().includes(this.activeFilters.search) ||
                patent.alarmingReason.toLowerCase().includes(this.activeFilters.search) ||
                patent.technicalDetail.toLowerCase().includes(this.activeFilters.search) ||
                patent.id.toLowerCase().includes(this.activeFilters.search);
            
            const matchesThreat = !this.activeFilters.threat || patent.threatLevel === this.activeFilters.threat;
            const matchesCategory = !this.activeFilters.category || patent.category === this.activeFilters.category;
            const matchesAssignee = !this.activeFilters.assignee || patent.assignee === this.activeFilters.assignee;

            return matchesSearch && matchesThreat && matchesCategory && matchesAssignee;
        });

        this.renderPatentGrid();
        this.updateActiveFiltersDisplay();
    }

    clearAllFilters() {
        this.activeFilters = {
            search: '',
            threat: '',
            category: '',
            assignee: ''
        };
        
        document.getElementById('patent-search').value = '';
        document.getElementById('threat-filter').value = '';
        document.getElementById('category-filter').value = '';
        document.getElementById('assignee-filter').value = '';
        
        this.filterPatents();
    }

    updateActiveFiltersDisplay() {
        const container = document.getElementById('active-filters');
        const filters = [];
        
        if (this.activeFilters.search) filters.push(`Search: "${this.activeFilters.search}"`);
        if (this.activeFilters.threat) filters.push(`Threat: ${this.activeFilters.threat}`);
        if (this.activeFilters.category) filters.push(`Category: ${this.activeFilters.category}`);
        if (this.activeFilters.assignee) filters.push(`Assignee: ${this.activeFilters.assignee}`);
        
        if (filters.length === 0) {
            container.classList.add('hidden');
            return;
        }
        
        container.classList.remove('hidden');
        container.innerHTML = filters.map(filter => `
            <span class="px-3 py-1 bg-red-900 text-red-300 rounded-full text-xs">
                ${filter}
                <button onclick="patentDB.removeFilter('${filter.split(':')[0].trim().toLowerCase()}')" 
                        class="ml-2 text-red-400 hover:text-red-200">×</button>
            </span>
        `).join('');
    }

    removeFilter(filterType) {
        switch(filterType) {
            case 'search':
                this.activeFilters.search = '';
                document.getElementById('patent-search').value = '';
                break;
            case 'threat':
                this.activeFilters.threat = '';
                document.getElementById('threat-filter').value = '';
                break;
            case 'category':
                this.activeFilters.category = '';
                document.getElementById('category-filter').value = '';
                break;
            case 'assignee':
                this.activeFilters.assignee = '';
                document.getElementById('assignee-filter').value = '';
                break;
        }
        this.filterPatents();
    }

    setView(view) {
        this.currentView = view;
        const gridBtn = document.getElementById('grid-view');
        const listBtn = document.getElementById('list-view');
        const grid = document.getElementById('patent-grid');
        
        if (view === 'grid') {
            gridBtn.className = 'px-3 py-1 bg-red-600 text-white rounded text-sm';
            listBtn.className = 'px-3 py-1 bg-gray-600 hover:bg-gray-500 text-white rounded text-sm';
            grid.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';
        } else {
            gridBtn.className = 'px-3 py-1 bg-gray-600 hover:bg-gray-500 text-white rounded text-sm';
            listBtn.className = 'px-3 py-1 bg-red-600 text-white rounded text-sm';
            grid.className = 'space-y-4';
        }
    }

    updateResultsCount(count) {
        document.getElementById('results-count').textContent = count;
    }

    updateStatistics() {
        // Update statistics if needed
        const criticalCount = this.patents.filter(p => p.threatLevel === 'CRITICAL').length;
        const highCount = this.patents.filter(p => p.threatLevel === 'HIGH').length;
        
        // Could update dashboard stats here if needed
    }

    closeModal() {
        const modal = document.getElementById('patent-modal');
        modal.classList.add('hidden');
        document.body.style.overflow = '';
        this.selectedPatent = null;
    }

    exportPatent(patentId) {
        const patent = this.patents.find(p => p.id === patentId);
        if (!patent) return;
        
        const exportData = {
            patent: patent,
            exportDate: new Date().toISOString(),
            source: 'Digital Dichotomy Sentinel Patent Database'
        };
        
        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `patent-${patent.id}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    handleCardKeypress(event, patentId) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            this.showPatentDetail(patentId);
        }
    }

    showLoadingState() {
        document.getElementById('loading-state').classList.remove('hidden');
        document.getElementById('patent-grid').classList.add('hidden');
    }

    hideLoadingState() {
        document.getElementById('loading-state').classList.add('hidden');
        document.getElementById('patent-grid').classList.remove('hidden');
    }
}

// Export for global access
window.PatentDatabaseUI = PatentDatabaseUI;