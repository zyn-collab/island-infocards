/**
 * Maldives Islands Information Website
 * Main JavaScript file for data loading, processing, and display
 * Shows ALL data from ALL datasets - no filtering or cherry-picking
 */

// Global data storage object to hold all parsed CSV data
const islandData = {
    atolls: [],
    islands: [],
    demographics2022: [],
    demographics2014: [],
    laborForce: [],
    households: [],
    activities: [],
    services: [],
    healthFacilities: [],
    socialServices: [],
    schoolStatistics: [],
    schools: [],
    csoOrganizations: [],
    csoIslands: [],
    islandDistances: [],
    accommodations: []
};

// Track loading state
let dataLoaded = false;

/**
 * Initialize the application when the page loads
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('Application starting...');
    loadAllData();
    setupEventListeners();
});

/**
 * Set up event listeners for user interactions
 */
function setupEventListeners() {
    document.getElementById('atollSelect').addEventListener('change', handleAtollChange);
    document.getElementById('islandSelect').addEventListener('change', handleIslandChange);
    document.getElementById('searchInput').addEventListener('input', handleSearch);
}

/**
 * Load all data from a single JSON file
 * Much faster and more reliable than loading 16 CSV files
 */
function loadAllData() {
    showLoading(true);
    console.log('Loading island data...');
    
    fetch('island_data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load data file: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Assign all data at once
            islandData.atolls = data.atolls || [];
            islandData.islands = data.islands || [];
            islandData.demographics2022 = data.demographics2022 || [];
            islandData.demographics2014 = data.demographics2014 || [];
            islandData.laborForce = data.laborForce || [];
            islandData.households = data.households || [];
            islandData.activities = data.activities || [];
            islandData.services = data.services || [];
            islandData.healthFacilities = data.healthFacilities || [];
            islandData.socialServices = data.socialServices || [];
            islandData.schoolStatistics = data.schoolStatistics || [];
            islandData.schools = data.schools || [];
            islandData.csoOrganizations = data.csoOrganizations || [];
            islandData.csoIslands = data.csoIslands || [];
            islandData.islandDistances = data.islandDistances || [];
            islandData.accommodations = data.accommodations || [];
            
            console.log('✓ All data loaded successfully');
            console.log('Data summary:', {
                atolls: islandData.atolls.length,
                islands: islandData.islands.length,
                demographics2022: islandData.demographics2022.length,
                activities: islandData.activities.length,
                accommodations: islandData.accommodations.length
            });
            
            if (islandData.islands.length === 0) {
                showError('No island data found in data file.');
                showLoading(false);
                return;
            }
            
            dataLoaded = true;
            populateAtollDropdown();
            showLoading(false);
        })
        .catch(error => {
            console.error('✗ Error loading data:', error);
            showError(`Failed to load data: ${error.message}. Make sure island_data.json exists.`);
            showLoading(false);
        });
}

/**
 * Populate the atoll dropdown
 */
function populateAtollDropdown() {
    const atollSelect = document.getElementById('atollSelect');
    atollSelect.innerHTML = '<option value="">-- Choose an Atoll --</option>';
    
    const sortedAtolls = [...islandData.atolls].sort((a, b) => 
        a.atoll_name.localeCompare(b.atoll_name)
    );
    
    sortedAtolls.forEach(atoll => {
        const option = document.createElement('option');
        option.value = atoll.atoll_id;
        option.textContent = `${atoll.atoll_name} (${atoll.abbreviation || ''})`;
        atollSelect.appendChild(option);
    });
}

/**
 * Handle atoll dropdown change
 */
function handleAtollChange(event) {
    const atollId = event.target.value;
    const islandSelect = document.getElementById('islandSelect');
    
    if (!atollId) {
        islandSelect.innerHTML = '<option value="">-- First select an Atoll --</option>';
        islandSelect.disabled = true;
        return;
    }
    
    islandSelect.disabled = false;
    islandSelect.innerHTML = '<option value="">-- Choose an Island --</option>';
    
    const islandsInAtoll = islandData.islands
        .filter(island => island.atoll_id === atollId)
        .sort((a, b) => a.island_name.localeCompare(b.island_name));
    
    islandsInAtoll.forEach(island => {
        const option = document.createElement('option');
        option.value = island.island_id;
        option.textContent = island.island_name;
        islandSelect.appendChild(option);
    });
}

/**
 * Handle island dropdown change
 */
function handleIslandChange(event) {
    const islandId = event.target.value;
    if (!islandId) {
        hideIslandCard();
        return;
    }
    displayIslandInfo(islandId);
}

/**
 * Handle search input
 */
function handleSearch(event) {
    const searchTerm = event.target.value.trim().toLowerCase();
    const searchResults = document.getElementById('searchResults');
    
    if (searchTerm.length < 2) {
        searchResults.style.display = 'none';
        return;
    }
    
    const matchingIslands = islandData.islands.filter(island => 
        island.island_name.toLowerCase().includes(searchTerm) ||
        island.island_name_dhivehi?.includes(searchTerm)
    ).slice(0, 10);
    
    if (matchingIslands.length > 0) {
        searchResults.innerHTML = '';
        searchResults.style.display = 'block';
        
        matchingIslands.forEach(island => {
            const item = document.createElement('a');
            item.href = '#';
            item.className = 'list-group-item list-group-item-action';
            
            const atoll = islandData.atolls.find(a => a.atoll_id === island.atoll_id);
            const atollName = atoll ? atoll.atoll_name : '';
            
            item.textContent = `${island.island_name} (${atollName})`;
            item.addEventListener('click', (e) => {
                e.preventDefault();
                displayIslandInfo(island.island_id);
                searchResults.style.display = 'none';
                document.getElementById('searchInput').value = island.island_name;
            });
            
            searchResults.appendChild(item);
        });
    } else {
        searchResults.innerHTML = '<div class="list-group-item">No islands found</div>';
        searchResults.style.display = 'block';
    }
}

/**
 * Normalize island_id for comparison (handles "189" vs "189.0")
 */
function normalizeId(id) {
    if (!id) return null;
    return parseFloat(id).toString();
}

/**
 * Display ALL information for a selected island - COMPREHENSIVE
 */
function displayIslandInfo(islandId) {
    const island = islandData.islands.find(i => i.island_id === islandId);
    
    if (!island) {
        showError('Island not found');
        return;
    }
    
    // Normalize the island_id for comparison across all datasets
    const normalizedIslandId = normalizeId(islandId);
    
    // Get ALL related data - using normalized ID comparison
    const atoll = islandData.atolls.find(a => a.atoll_id === island.atoll_id);
    const demographics2022 = islandData.demographics2022.find(d => normalizeId(d.island_id) === normalizedIslandId);
    const demographics2014 = islandData.demographics2014.find(d => normalizeId(d.island_id) === normalizedIslandId);
    const laborForce = islandData.laborForce.filter(l => normalizeId(l.island_id) === normalizedIslandId);
    const household = islandData.households.find(h => normalizeId(h.island_id) === normalizedIslandId);
    const activities = islandData.activities.filter(a => normalizeId(a.island_id) === normalizedIslandId);
    const services = islandData.services.find(s => normalizeId(s.island_id) === normalizedIslandId);
    const healthFacilities = islandData.healthFacilities.filter(h => normalizeId(h.island_id) === normalizedIslandId);
    const socialServices = islandData.socialServices.filter(s => normalizeId(s.island_id) === normalizedIslandId);
    const schoolStats = islandData.schoolStatistics.find(s => normalizeId(s.island_id) === normalizedIslandId);
    const schools = islandData.schools.filter(s => normalizeId(s.island_id) === normalizedIslandId);
    const distances = islandData.islandDistances.find(d => normalizeId(d.island_id) === normalizedIslandId);
    const accommodations = islandData.accommodations.filter(a => normalizeId(a.island_id) === normalizedIslandId);
    
    const csoLinks = islandData.csoIslands.filter(ci => normalizeId(ci.island_id) === normalizedIslandId);
    const csos = csoLinks.map(link => 
        islandData.csoOrganizations.find(org => normalizeId(org.cso_id) === normalizeId(link.cso_id))
    ).filter(cso => cso);
    
    // Debug logging to check what data we found
    console.log('Island ID:', islandId, '(normalized:', normalizedIslandId + ')');
    console.log('Health Facilities:', healthFacilities.length);
    console.log('Social Services:', socialServices.length);
    console.log('School Stats:', schoolStats ? 'Found' : 'Not found');
    console.log('Schools:', schools.length);
    console.log('Accommodations:', accommodations.length);
    console.log('CSOs:', csos.length);
    
    let content = '';
    
    // === GEOGRAPHIC INFORMATION ===
    content += buildSectionHeader('Geographic Information');
    content += '<div class="row">';
    content += buildInfoItem('Island Code', island.fcode, 'col-md-6');
    content += buildInfoItem('Atoll', atoll ? atoll.atoll_name : 'N/A', 'col-md-6');
    content += buildInfoItem('Atoll Capital', island.is_atoll_capital === 'True' || island.is_atoll_capital === true ? 'Yes' : 'No', 'col-md-6');
    content += buildInfoItem('Area (hectares)', island.area_hectares, 'col-md-6');
    content += buildInfoItem('Area (km²)', island.area_sqkm, 'col-md-6');
    content += buildInfoItem('Latitude', island.latitude, 'col-md-6');
    content += buildInfoItem('Longitude', island.longitude, 'col-md-6');
    content += '</div>';
    
    // === DISTANCES AND TRAVEL ===
    if (distances) {
        content += buildSectionHeader('Distance & Travel Information');
        content += '<div class="row">';
        Object.keys(distances).forEach(key => {
            if (key !== 'island_id' && key !== 'atoll_id' && key !== 'original_location' && distances[key]) {
                const label = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                content += buildInfoItem(label, distances[key], 'col-md-6');
            }
        });
        content += '</div>';
    }
    
    // === TRAVEL/SERVICES INFORMATION ===
    if (services) {
        content += buildSectionHeader('Travel & Contact Services');
        content += '<div class="row">';
        Object.keys(services).forEach(key => {
            if (key !== 'island_id' && key !== 'info_link' && services[key]) {
                const label = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                content += buildInfoItem(label, services[key], 'col-md-6');
            }
        });
        content += '</div>';
    }
    
    // === DEMOGRAPHICS 2022 - ALL FIELDS ===
    if (demographics2022) {
        content += buildSectionHeader('Demographics (2022 Census) - Complete Data');
        content += '<div class="row">';
        
        // Show ALL demographic fields
        const demoFields = {
            'Total Resident Population': 'total_resident_pop',
            'Male Resident Population': 'male_resident_pop',
            'Female Resident Population': 'female_resident_pop',
            'Total Maldivian Population': 'total_maldivian_pop',
            'Male Maldivian Population': 'male_maldivian_pop',
            'Female Maldivian Population': 'female_maldivian_pop',
            'Total Foreign Population': 'total_foreign_pop',
            'Male Foreign Population': 'male_foreign_pop',
            'Female Foreign Population': 'female_foreign_pop',
            'Children (0-17 years)': 'child_0_17',
            'Children (0-14 years)': 'child_0_14',
            'Adolescent (10-19 years)': 'adolescent_10_19',
            'Working Age (15-64 years)': 'working_age_15_64',
            'Youth (15-24 years)': 'youth_15_24',
            'Youth (18-35 years)': 'youth_18_35',
            'Elderly (65+ years)': 'elderly_65_plus',
            'Sex Ratio': 'sex_ratio',
            'Dependency Ratio': 'dependency_ratio',
            'Child Dependency Ratio': 'child_dependency_ratio',
            'Aged Dependency Ratio': 'aged_dependency_ratio',
            'Population Density (per km²)': 'pop_density_per_sqkm',
            'Median Age (Total)': 'median_age_total',
            'Median Age (Maldivian)': 'median_age_maldivian',
            'Median Age (Foreign)': 'median_age_foreign',
            'Foreign Population %': 'foreign_pop_percent',
            'Growth Rate from 2014 (%)': 'growth_rate_from_2014'
        };
        
        Object.keys(demoFields).forEach(label => {
            const field = demoFields[label];
            content += buildInfoItem(label, demographics2022[field], 'col-md-4');
        });
        
        content += '</div>';
        
        // Calculate change from 2014
        if (demographics2014) {
            content += '<div class="alert alert-info mt-3">';
            content += '<strong>Population Change (2014-2022):</strong><br>';
            const pop2022 = parseInt(demographics2022.total_resident_pop) || 0;
            const pop2014 = parseInt(demographics2014.total_maldivian_pop) || 0;
            const change = pop2022 - pop2014;
            const percentChange = pop2014 > 0 ? ((change / pop2014) * 100).toFixed(2) : 'N/A';
            content += `2014 Population: ${formatNumber(pop2014)} → 2022 Population: ${formatNumber(pop2022)}<br>`;
            content += `Change: ${change > 0 ? '+' : ''}${formatNumber(change)} (${percentChange}%)`;
            content += '</div>';
        }
    }
    
    // === LABOR FORCE - ALL DATA ===
    if (laborForce && laborForce.length > 0) {
        content += buildSectionHeader('Labor Force Statistics - Complete Data');
        
        // Group by population type and gender
        const groupedLabor = {};
        laborForce.forEach(lf => {
            const key = `${lf.population_type} - ${lf.gender}`;
            groupedLabor[key] = lf;
        });
        
        Object.keys(groupedLabor).forEach(key => {
            const lf = groupedLabor[key];
            content += `<h6 class="mt-3 text-capitalize">${key.replace(/_/g, ' ')}</h6>`;
            content += '<div class="row">';
            
            const laborFields = {
                'Labor Force Participation Rate (%)': 'labor_force_part_rate',
                'Employment to Population Ratio (%)': 'employment_to_pop_ratio',
                'Unemployment Rate (%)': 'unemployment_rate',
                'Inactivity Rate (%)': 'inactivity_rate',
                'Youth Unemployment 15-24 (%)': 'youth_unemp_15_24',
                'Youth Unemployment 18-35 (%)': 'youth_unemp_18_35',
                'NEET Rate 15-24 (%)': 'neet_rate_15_24',
                'NEET Rate 18-35 (%)': 'neet_rate_18_35',
                'Combined Unemploy. Potential LF (%)': 'combined_unemp_pot_lf'
            };
            
            Object.keys(laborFields).forEach(label => {
                const field = laborFields[label];
                content += buildInfoItem(label, lf[field], 'col-md-4');
            });
            
            content += '</div>';
        });
    }
    
    // === HOUSEHOLD STATISTICS - ALL FIELDS ===
    if (household) {
        content += buildSectionHeader('Household Statistics - Complete Data');
        content += '<div class="row">';
        
        const householdFields = {
            'Total Households': 'total_households',
            'Total Housing Units': 'total_housing_units',
            'Houses/Flats/Apartments': 'house_flat_apartment',
            'Boats/Mobile Units': 'boats_mobile_units',
            'Buildings Not Habitable': 'buildings_not_habitable',
            'Other Household Units': 'other_household_units',
            'Collective Living Quarters': 'collective_living_qtrs',
            'Labor/Staff Quarters': 'labor_staff_quarters',
            'Other CLQ': 'other_clq',
            'Average Household Size': 'avg_household_size'
        };
        
        Object.keys(householdFields).forEach(label => {
            const field = householdFields[label];
            content += buildInfoItem(label, household[field], 'col-md-4');
        });
        
        content += '</div>';
    }
    
    // === HEALTH FACILITIES - ALL DATA ===
    if (healthFacilities && healthFacilities.length > 0) {
        content += buildSectionHeader(`Health Facilities (${healthFacilities.length})`);
        healthFacilities.forEach(facility => {
            content += '<div class="facility-item">';
            content += `<h6>${facility.facility_name || 'Unnamed Facility'}</h6>`;
            content += '<div class="row">';
            Object.keys(facility).forEach(key => {
                if (key !== 'health_facility_id' && key !== 'island_id' && key !== 'atoll_id' && 
                    key !== 'original_location' && facility[key]) {
                    const label = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                    content += buildInfoItem(label, facility[key], 'col-md-6');
                }
            });
            content += '</div>';
            content += '</div>';
        });
    }
    
    // === SOCIAL SERVICES - ALL DATA ===
    if (socialServices && socialServices.length > 0) {
        content += buildSectionHeader(`Social Services (${socialServices.length})`);
        socialServices.forEach(service => {
            content += '<div class="facility-item">';
            content += `<h6>${service.provider_name || 'Unnamed Service'}</h6>`;
            content += '<div class="row">';
            Object.keys(service).forEach(key => {
                if (key !== 'social_service_id' && key !== 'island_id' && key !== 'atoll_id' && 
                    key !== 'original_atoll' && key !== 'original_island' && service[key]) {
                    const label = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                    content += buildInfoItem(label, service[key], 'col-md-6');
                }
            });
            content += '</div>';
            content += '</div>';
        });
    }
    
    // === SCHOOLS - ALL DATA ===
    if (schools && schools.length > 0) {
        content += buildSectionHeader(`Schools (${schools.length})`);
        schools.forEach(school => {
            content += '<div class="facility-item">';
            content += `<h6>${school.school_name || 'Unnamed School'}</h6>`;
            if (school.original_location) {
                content += `<p class="text-muted">${school.original_location}</p>`;
            }
            content += '</div>';
        });
    }
    
    // === SCHOOL STATISTICS - ALL DATA ===
    if (schoolStats) {
        content += buildSectionHeader('School Statistics - Complete Enrollment Data');
        content += '<div class="row">';
        
        // Show ALL fields from school statistics
        Object.keys(schoolStats).forEach(key => {
            if (key !== 'island_id' && key !== 'atoll_id' && key !== 'original_location' && schoolStats[key]) {
                const label = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                content += buildInfoItem(label, schoolStats[key], 'col-md-3');
            }
        });
        
        content += '</div>';
    }
    
    // === ACCOMMODATIONS (RESORTS, GUESTHOUSES) - ALL DATA ===
    if (accommodations && accommodations.length > 0) {
        content += buildSectionHeader(`Accommodations - Resorts & Guesthouses (${accommodations.length})`);
        accommodations.forEach(acc => {
            content += '<div class="facility-item">';
            content += `<h6>${acc.facility_name || 'Unnamed Facility'}</h6>`;
            if (acc.facility_type) {
                content += `<span class="badge bg-info text-capitalize">${acc.facility_type}</span>`;
            }
            content += '<div class="row mt-2">';
            
            // Show all accommodation details
            const accFields = {
                'Rooms': 'rooms',
                'Beds': 'beds',
                'Berths': 'berths',
                'Phone': 'phone',
                'Email': 'email',
                'Website': 'website',
                'Fax': 'fax',
                'Resort Phone': 'resort_phone',
                'Resort Email': 'resort_email',
                'Address': 'address',
                'Operator': 'operator',
                'Owner/Lessee': 'owner_lessee',
                'Management': 'management'
            };
            
            Object.keys(accFields).forEach(label => {
                const field = accFields[label];
                if (acc[field]) {
                    content += buildInfoItem(label, acc[field], 'col-md-6');
                }
            });
            
            content += '</div>';
            content += '</div>';
        });
    }
    
    // === ACTIVITIES - ALL DATA WITH ALL DETAILS ===
    if (activities && activities.length > 0) {
        content += buildSectionHeader(`Activities & Things To Do (${activities.length})`);
        
        // Group by category
        const groupedActivities = {};
        activities.forEach(activity => {
            const category = activity.category || 'other';
            if (!groupedActivities[category]) {
                groupedActivities[category] = [];
            }
            groupedActivities[category].push(activity);
        });
        
        Object.keys(groupedActivities).forEach(category => {
            content += `<h6 class="mt-3 text-capitalize">${category.replace(/_/g, ' ')}</h6>`;
            groupedActivities[category].forEach(activity => {
                content += '<div class="activity-item">';
                content += `<strong>${activity.name}</strong>`;
                if (activity.activity_id) {
                    content += ` <span class="text-muted">(ID: ${activity.activity_id})</span>`;
                }
                content += '</div>';
            });
        });
    }
    
    // === CSOs - ALL DATA ===
    if (csos && csos.length > 0) {
        content += buildSectionHeader(`Civil Society Organizations (${csos.length})`);
        csos.forEach(cso => {
            content += '<div class="facility-item">';
            content += `<h6>${cso.cso_name_english || cso.cso_name_dhivehi || 'Unnamed Organization'}</h6>`;
            if (cso.cso_name_dhivehi && cso.cso_name_english) {
                content += `<p class="text-muted mb-2">${cso.cso_name_dhivehi}</p>`;
            }
            content += '<div class="row">';
            
            const csoFields = {
                'Phone': 'phone',
                'Email': 'email',
                'Web Presence': 'web_presence',
                'Registration Number': 'registration_number'
            };
            
            Object.keys(csoFields).forEach(label => {
                const field = csoFields[label];
                if (cso[field]) {
                    content += buildInfoItem(label, cso[field], 'col-md-6');
                }
            });
            
            content += '</div>';
            content += '</div>';
        });
    }
    
    // Update the card
    document.getElementById('islandTitle').textContent = 
        `${island.island_name} ${island.island_name_dhivehi ? `(${island.island_name_dhivehi})` : ''}`;
    document.getElementById('islandSubtitle').textContent = 
        atoll ? `${atoll.atoll_name} Atoll` : '';
    document.getElementById('islandContent').innerHTML = content;
    
    document.getElementById('islandCard').style.display = 'block';
    document.getElementById('noDataMessage').style.display = 'none';
    
    document.getElementById('islandCard').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/**
 * Build a section header
 */
function buildSectionHeader(title) {
    return `<div class="section-header"><h4>${title}</h4></div>`;
}

/**
 * Build an information item with smart number formatting
 */
function buildInfoItem(label, value, colClass = 'col-md-12') {
    if (!value || value === 'N/A' || value === 'null' || value === 'undefined' || value === '') {
        value = '<span class="no-data-text">N/A</span>';
    } else {
        // Try to format as number if it looks like a number
        const num = parseFloat(value);
        if (!isNaN(num) && value.toString().trim() === num.toString()) {
            // It's a pure number, format it
            if (num === Math.floor(num)) {
                // Whole number - no decimals
                value = Math.floor(num).toLocaleString();
            } else {
                // Has decimals - keep them but format
                value = num.toLocaleString();
            }
        }
        // Otherwise keep as string (text, emails, etc.)
    }
    
    return `
        <div class="${colClass}">
            <div class="info-row">
                <div class="info-label">${label}</div>
                <div class="info-value">${value}</div>
            </div>
        </div>
    `;
}

/**
 * Format numbers with commas - shows whole numbers without decimals
 */
function formatNumber(num) {
    if (!num || num === 'null' || num === 'undefined' || num === '') return 'N/A';
    const parsed = parseFloat(num);
    if (isNaN(parsed)) return 'N/A';
    
    // If it's a whole number, show without decimals
    if (parsed === Math.floor(parsed)) {
        return Math.floor(parsed).toLocaleString();
    }
    // Otherwise show with appropriate decimal places
    return parsed.toLocaleString();
}

/**
 * Show or hide loading indicator
 */
function showLoading(show) {
    document.getElementById('loadingIndicator').style.display = show ? 'block' : 'none';
}

/**
 * Hide island card
 */
function hideIslandCard() {
    document.getElementById('islandCard').style.display = 'none';
    document.getElementById('noDataMessage').style.display = 'block';
}

/**
 * Display error message
 */
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert alert-danger alert-dismissible fade show';
    errorDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    document.querySelector('.container').insertBefore(errorDiv, document.querySelector('.container').firstChild);
}
