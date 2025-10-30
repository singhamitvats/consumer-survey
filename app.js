// Sample Data
const adminCredentials = {
  username: 'ADMIN001',
  password: 'admin123',
  name: 'Admin'
};

const surveyorCredentials = [
  { id: 'SUR001', name: 'Rajesh Verma', password: 'survey123', division: 'DIV001', status: 'Active' },
  { id: 'SUR002', name: 'Priya Singh', password: 'survey456', division: 'DIV002', status: 'Active' }
];

const divisions = [
  { code: 'DIV001', name: 'North Division' },
  { code: 'DIV002', name: 'South Division' },
  { code: 'DIV003', name: 'East Division' },
  { code: 'DIV004', name: 'West Division' }
];

const dcs = [
  { code: 'DC-N01', name: 'DC-North-01', division: 'DIV001' },
  { code: 'DC-N02', name: 'DC-North-02', division: 'DIV001' },
  { code: 'DC-S01', name: 'DC-South-01', division: 'DIV002' }
];

const feeders = [
  { code: 'F001', name: 'Main Feeder North-01', dc_code: 'DC-N01' },
  { code: 'F002', name: 'Secondary Feeder North-01', dc_code: 'DC-N01' },
  { code: 'F003', name: 'Feeder South-01', dc_code: 'DC-S01' }
];

const transformers = [
  { code: 'DTR001', name: 'Substation-A', feeder_code: 'F001' },
  { code: 'DTR002', name: 'Substation-B', feeder_code: 'F001' },
  { code: 'DTR003', name: 'Substation-C', feeder_code: 'F002' }
];

let sampleConsumers = [
  {
    consumer_no: 'C001',
    name: 'Rajesh Kumar',
    address: '123, Main Street, North Delhi',
    mobile: '9876543210',
    load: 2.5,
    tariff: 'LV2',
    meter_no: 'MET001',
    meter_make: 'Siemens',
    division: 'DIV001',
    dc: 'DC-N01',
    feeder_assigned: 'F001',
    dtr_assigned: 'DTR001',
    survey_status: 'Not Surveyed',
    last_survey_date: null,
    last_surveyor: null
  },
  {
    consumer_no: 'C002',
    name: 'Priya Sharma',
    address: '456, Park Avenue, North Delhi',
    mobile: '',
    load: 3.0,
    tariff: 'LV3',
    meter_no: 'MET002',
    meter_make: 'ABB',
    division: 'DIV001',
    dc: 'DC-N01',
    feeder_assigned: '',
    dtr_assigned: '',
    survey_status: 'Not Surveyed',
    last_survey_date: null,
    last_surveyor: null
  },
  {
    consumer_no: 'C003',
    name: 'Arun Singh',
    address: 'Farm, Village Haryana',
    mobile: '9123456789',
    load: 5.0,
    tariff: 'AG',
    meter_no: 'MET003',
    meter_make: 'L&T',
    division: 'DIV001',
    dc: 'DC-N01',
    feeder_assigned: 'F001',
    dtr_assigned: 'DTR002',
    survey_status: 'Not Surveyed',
    last_survey_date: null,
    last_surveyor: null
  }
];

// Application State (in-memory)
let currentUser = null;
let currentUserRole = null;
let currentConsumer = null;
let lastSubmittedSurvey = null;
let surveyData = {
  dc: null,
  feeder: null,
  dtr: null,
  mobile: '',
  load: '',
  tariff: '',
  meterMake: '',
  address: '',
  notes: '',
  photos: [],
  verifications: {},
  gpsLocation: null
};
let surveyHistory = [];
let todayStats = {
  totalSurveys: 0,
  consumersIndexed: 0,
  lastSubmission: null
};

// Initialize App
function initApp() {
  populateDivisions();
  attachEventListeners();
  showScreen('login-screen');
  updateMasterDataStats();
}

// Screen Navigation
function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(screenId).classList.add('active');
}

// Populate Divisions
function populateDivisions() {
  const select = document.getElementById('division');
  divisions.forEach(div => {
    const option = document.createElement('option');
    option.value = div.code;
    option.textContent = `${div.code} - ${div.name}`;
    select.appendChild(option);
  });
}

// Event Listeners
function attachEventListeners() {
  // Role selection
  document.getElementById('role-select').addEventListener('change', handleRoleChange);
  
  // Login
  document.getElementById('login-form').addEventListener('submit', handleLogin);
  
  // Dashboard
  document.getElementById('logout-btn').addEventListener('click', handleLogout);
  document.getElementById('start-survey-btn').addEventListener('click', () => showScreen('search-screen'));
  document.getElementById('view-history-btn').addEventListener('click', showHistory);
  document.getElementById('sync-data-btn').addEventListener('click', syncData);
  
  // Survey status filter
  document.getElementById('survey-status-filter').addEventListener('change', handleSearch);
  
  // Search
  document.getElementById('search-back-btn').addEventListener('click', () => showScreen('dashboard-screen'));
  document.getElementById('search-input').addEventListener('input', handleSearch);
  document.querySelectorAll('.search-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.search-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      handleSearch();
    });
  });
  
  // Consumer Details
  document.getElementById('details-back-btn').addEventListener('click', () => showScreen('search-screen'));
  document.getElementById('collect-data-btn').addEventListener('click', startDataCollection);
  
  // Network Selection
  document.getElementById('network-back-btn').addEventListener('click', () => showScreen('consumer-details-screen'));
  document.getElementById('dc-select').addEventListener('change', handleDCSelect);
  document.getElementById('dc-next-btn').addEventListener('click', () => goToNetworkStep(2));
  document.getElementById('feeder-select').addEventListener('change', handleFeederSelect);
  document.getElementById('feeder-back-btn').addEventListener('click', () => goToNetworkStep(1));
  document.getElementById('feeder-next-btn').addEventListener('click', () => goToNetworkStep(3));
  document.getElementById('dtr-select').addEventListener('change', handleDTRSelect);
  document.getElementById('dtr-back-btn').addEventListener('click', () => goToNetworkStep(2));
  document.getElementById('dtr-next-btn').addEventListener('click', () => showScreen('data-entry-screen'));
  
  // Data Entry
  document.getElementById('entry-back-btn').addEventListener('click', () => showScreen('network-selection-screen'));
  document.getElementById('capture-photo-btn').addEventListener('click', () => document.getElementById('photo-input').click());
  document.getElementById('photo-input').addEventListener('change', handlePhotoCapture);
  document.getElementById('proceed-gps-btn').addEventListener('click', () => {
    collectDataEntry();
    showScreen('gps-screen');
    getGPSLocation();
  });
  
  // Expandable sections
  document.querySelectorAll('.expandable-header').forEach(header => {
    header.addEventListener('click', () => {
      const target = header.dataset.target;
      const content = document.getElementById(target);
      header.classList.toggle('active');
      content.classList.toggle('active');
    });
  });
  
  // GPS
  document.getElementById('gps-back-btn').addEventListener('click', () => showScreen('data-entry-screen'));
  document.getElementById('refresh-gps-btn').addEventListener('click', getGPSLocation);
  document.getElementById('manual-gps-btn').addEventListener('click', manualGPS);
  document.getElementById('proceed-review-btn').addEventListener('click', () => {
    showScreen('review-screen');
    populateReview();
  });
  
  // Review
  document.getElementById('review-back-btn').addEventListener('click', () => showScreen('gps-screen'));
  document.getElementById('edit-data-btn').addEventListener('click', () => showScreen('data-entry-screen'));
  document.getElementById('final-submit-btn').addEventListener('click', submitSurvey);
  
  // Confirmation checkboxes
  document.querySelectorAll('#review-screen .form-check input').forEach(checkbox => {
    checkbox.addEventListener('change', updateSubmitButton);
  });
  
  // Success
  document.getElementById('download-excel-btn').addEventListener('click', downloadSurveyExcel);
  document.getElementById('download-pdf-btn').addEventListener('click', downloadSurveyPDF);
  document.getElementById('new-survey-btn').addEventListener('click', () => {
    resetSurvey();
    showScreen('search-screen');
  });
  document.getElementById('view-history-from-success-btn').addEventListener('click', showHistory);
  document.getElementById('dashboard-from-success-btn').addEventListener('click', () => showScreen('dashboard-screen'));
  
  // Admin Dashboard
  document.getElementById('admin-logout-btn').addEventListener('click', handleLogout);
  document.getElementById('admin-upload-data-btn').addEventListener('click', () => showScreen('admin-upload-screen'));
  document.getElementById('admin-view-surveys-btn').addEventListener('click', showAdminSurveys);
  document.getElementById('admin-manage-consumers-btn').addEventListener('click', showAdminConsumers);
  
  // Admin Upload
  document.getElementById('upload-back-btn').addEventListener('click', () => showScreen('admin-dashboard-screen'));
  document.getElementById('feeder-file-input').addEventListener('change', (e) => {
    document.getElementById('upload-feeder-btn').disabled = !e.target.files.length;
  });
  document.getElementById('consumer-file-input').addEventListener('change', (e) => {
    document.getElementById('upload-consumer-btn').disabled = !e.target.files.length;
  });
  document.getElementById('upload-feeder-btn').addEventListener('click', uploadFeederMaster);
  document.getElementById('upload-consumer-btn').addEventListener('click', uploadConsumerMaster);
  document.getElementById('download-feeder-template-btn').addEventListener('click', downloadFeederTemplate);
  document.getElementById('download-consumer-template-btn').addEventListener('click', downloadConsumerTemplate);
  
  // Admin Surveys
  document.getElementById('surveys-back-btn').addEventListener('click', () => showScreen('admin-dashboard-screen'));
  document.getElementById('admin-survey-date-filter').addEventListener('change', renderAdminSurveys);
  document.getElementById('admin-surveyor-filter').addEventListener('change', renderAdminSurveys);
  
  // Admin Consumers
  document.getElementById('consumers-back-btn').addEventListener('click', () => showScreen('admin-dashboard-screen'));
  document.getElementById('admin-consumer-search').addEventListener('input', renderAdminConsumers);
  document.getElementById('admin-consumer-status-filter').addEventListener('change', renderAdminConsumers);
  
  // History
  document.getElementById('history-back-btn').addEventListener('click', () => showScreen('dashboard-screen'));
  document.getElementById('history-date-filter').addEventListener('change', renderHistory);
  document.getElementById('history-status-filter').addEventListener('change', renderHistory);
}

// Role Change Handler
function handleRoleChange(e) {
  const role = e.target.value;
  const surveyorFields = document.getElementById('surveyor-fields');
  const adminFields = document.getElementById('admin-fields');
  
  if (role === 'surveyor') {
    surveyorFields.style.display = 'block';
    adminFields.style.display = 'none';
    document.getElementById('surveyor-id').required = true;
    document.getElementById('division').required = true;
    document.getElementById('admin-id').required = false;
  } else if (role === 'admin') {
    surveyorFields.style.display = 'none';
    adminFields.style.display = 'block';
    document.getElementById('surveyor-id').required = false;
    document.getElementById('division').required = false;
    document.getElementById('admin-id').required = true;
  }
}

// Login Handler
function handleLogin(e) {
  e.preventDefault();
  
  const role = document.getElementById('role-select').value;
  const password = document.getElementById('password').value;
  
  if (!role) {
    showError('Please select a role');
    return;
  }
  
  if (role === 'surveyor') {
    const surveyorId = document.getElementById('surveyor-id').value;
    const division = document.getElementById('division').value;
    
    const user = surveyorCredentials.find(u => u.id === surveyorId && u.password === password && u.division === division);
    
    if (user) {
      currentUser = user;
      currentUserRole = 'surveyor';
      updateDashboard();
      showScreen('dashboard-screen');
      document.getElementById('login-form').reset();
      document.getElementById('login-error').style.display = 'none';
    } else {
      showError('Invalid credentials. Please check Surveyor ID, Password, and Division.');
    }
  } else if (role === 'admin') {
    const adminId = document.getElementById('admin-id').value;
    
    if (adminId === adminCredentials.username && password === adminCredentials.password) {
      currentUser = adminCredentials;
      currentUserRole = 'admin';
      updateAdminDashboard();
      showScreen('admin-dashboard-screen');
      document.getElementById('login-form').reset();
      document.getElementById('login-error').style.display = 'none';
    } else {
      showError('Invalid admin credentials.');
    }
  }
}

function showError(message) {
  const errorDiv = document.getElementById('login-error');
  errorDiv.textContent = message;
  errorDiv.style.display = 'block';
}

// Logout
function handleLogout() {
  if (confirm('Are you sure you want to logout?')) {
    currentUser = null;
    resetSurvey();
    showScreen('login-screen');
  }
}

// Update Dashboard
function updateDashboard() {
  document.getElementById('surveyor-name').textContent = currentUser.name;
  const division = divisions.find(d => d.code === currentUser.division);
  document.getElementById('current-division').textContent = division ? division.name : currentUser.division;
  
  // Get DC for current division
  const userDC = dcs.find(dc => dc.division === currentUser.division);
  document.getElementById('current-dc').textContent = userDC ? userDC.name : 'N/A';
  
  // Update stats
  document.getElementById('total-surveys-today').textContent = todayStats.totalSurveys;
  document.getElementById('consumers-indexed').textContent = todayStats.consumersIndexed;
  document.getElementById('last-submission').textContent = todayStats.lastSubmission || '--:--';
  document.getElementById('gps-status').textContent = 'Ready';
}

// Search Handler
function handleSearch() {
  const searchTerm = document.getElementById('search-input').value.toLowerCase();
  const activeTab = document.querySelector('.search-tab.active').dataset.type;
  const statusFilter = document.getElementById('survey-status-filter').value;
  
  if (searchTerm.length < 2) {
    document.getElementById('search-results').innerHTML = '<div class="empty-state">Enter at least 2 characters to search</div>';
    return;
  }
  
  let results = sampleConsumers.filter(consumer => {
    // Filter by survey status
    if (statusFilter === 'not-surveyed' && consumer.survey_status !== 'Not Surveyed') return false;
    if (statusFilter === 'surveyed' && consumer.survey_status !== 'Surveyed') return false;
    
    // Filter by search term
    if (activeTab === 'all') {
      return consumer.consumer_no.toLowerCase().includes(searchTerm) ||
             consumer.name.toLowerCase().includes(searchTerm) ||
             consumer.address.toLowerCase().includes(searchTerm) ||
             consumer.meter_no.toLowerCase().includes(searchTerm) ||
             consumer.mobile.includes(searchTerm);
    } else if (activeTab === 'id') {
      return consumer.consumer_no.toLowerCase().includes(searchTerm);
    } else if (activeTab === 'name') {
      return consumer.name.toLowerCase().includes(searchTerm);
    } else if (activeTab === 'address') {
      return consumer.address.toLowerCase().includes(searchTerm);
    } else if (activeTab === 'meter') {
      return consumer.meter_no.toLowerCase().includes(searchTerm);
    } else if (activeTab === 'mobile') {
      return consumer.mobile.includes(searchTerm);
    }
    return false;
  });
  
  displaySearchResults(results);
}

// Display Search Results
function displaySearchResults(results) {
  const container = document.getElementById('search-results');
  
  if (results.length === 0) {
    container.innerHTML = '<div class="empty-state">No consumers found</div>';
    return;
  }
  
  container.innerHTML = results.map(consumer => {
    const isSurveyed = consumer.survey_status === 'Surveyed';
    const statusClass = consumer.survey_status.toLowerCase().replace(/ /g, '-');
    const disabledClass = isSurveyed ? 'disabled' : '';
    const onclickAttr = isSurveyed ? '' : `onclick="showConsumerDetails('${consumer.consumer_no}')"`;
    
    return `
      <div class="result-card ${disabledClass}" ${onclickAttr}>
        <div class="result-header">
          <div>
            <div class="result-name">${consumer.name}</div>
            <div class="result-id">${consumer.consumer_no}</div>
          </div>
          <div class="status-badge ${statusClass}">${consumer.survey_status}</div>
        </div>
        <div class="result-info">📍 ${consumer.address}</div>
        <div class="result-info">⚡ ${consumer.meter_no} | ${consumer.tariff}</div>
        ${consumer.mobile ? `<div class="result-info">📱 ${consumer.mobile}</div>` : ''}
        ${isSurveyed ? `<div class="result-info" style="color: var(--color-text-light); font-style: italic;">Surveyed on ${consumer.last_survey_date}</div>` : ''}
      </div>
    `;
  }).join('');
}

// Show Consumer Details
function showConsumerDetails(consumerNo) {
  const consumer = sampleConsumers.find(c => c.consumer_no === consumerNo);
  if (!consumer) return;
  
  currentConsumer = consumer;
  
  document.getElementById('consumer-name-header').textContent = consumer.name;
  document.getElementById('detail-consumer-no').textContent = consumer.consumer_no;
  document.getElementById('detail-address').textContent = consumer.address;
  document.getElementById('detail-mobile').textContent = consumer.mobile || 'Not provided';
  document.getElementById('detail-load').textContent = consumer.load + ' kW';
  document.getElementById('detail-tariff').textContent = consumer.tariff;
  document.getElementById('detail-meter-no').textContent = consumer.meter_no;
  document.getElementById('detail-meter-make').textContent = consumer.meter_make;
  
  const division = divisions.find(d => d.code === consumer.division);
  document.getElementById('detail-division').textContent = division ? division.name : consumer.division;
  
  const dc = dcs.find(d => d.code === consumer.dc);
  document.getElementById('detail-dc').textContent = dc ? dc.name : consumer.dc;
  
  const feeder = feeders.find(f => f.code === consumer.feeder_assigned);
  document.getElementById('detail-feeder').textContent = feeder ? `${feeder.code} - ${feeder.name}` : 'Not assigned';
  
  const dtr = transformers.find(t => t.code === consumer.dtr_assigned);
  document.getElementById('detail-dtr').textContent = dtr ? `${dtr.code} - ${dtr.name}` : 'Not assigned';
  
  showScreen('consumer-details-screen');
}

// Start Data Collection
function startDataCollection() {
  populateDCDropdown();
  showScreen('network-selection-screen');
  goToNetworkStep(1);
}

// Populate DC Dropdown
function populateDCDropdown() {
  const select = document.getElementById('dc-select');
  select.innerHTML = '<option value="">-- Select DC --</option>';
  
  const userDCs = dcs.filter(dc => dc.division === currentUser.division);
  userDCs.forEach(dc => {
    const option = document.createElement('option');
    option.value = dc.code;
    option.textContent = `${dc.code} - ${dc.name}`;
    select.appendChild(option);
  });
}

// Handle DC Select
function handleDCSelect(e) {
  const dcCode = e.target.value;
  surveyData.dc = dcCode;
  document.getElementById('dc-next-btn').disabled = !dcCode;
}

// Go to Network Step
function goToNetworkStep(step) {
  document.querySelectorAll('.network-step').forEach(s => s.classList.remove('active'));
  document.getElementById(`network-step-${step}`).classList.add('active');
  
  document.querySelectorAll('.wizard-step').forEach((s, i) => {
    s.classList.remove('active', 'completed');
    if (i + 1 === step) s.classList.add('active');
    else if (i + 1 < step) s.classList.add('completed');
  });
  
  if (step === 2) {
    populateFeederDropdown();
  } else if (step === 3) {
    populateDTRDropdown();
  }
}

// Populate Feeder Dropdown
function populateFeederDropdown() {
  const select = document.getElementById('feeder-select');
  select.innerHTML = '<option value="">-- Select Feeder --</option>';
  
  const dcFeeders = feeders.filter(f => f.dc_code === surveyData.dc);
  dcFeeders.forEach(feeder => {
    const option = document.createElement('option');
    option.value = feeder.code;
    option.textContent = `${feeder.code} - ${feeder.name}`;
    select.appendChild(option);
  });
}

// Handle Feeder Select
function handleFeederSelect(e) {
  const feederCode = e.target.value;
  surveyData.feeder = feederCode;
  document.getElementById('feeder-next-btn').disabled = !feederCode;
}

// Populate DTR Dropdown
function populateDTRDropdown() {
  const select = document.getElementById('dtr-select');
  select.innerHTML = '<option value="">-- Select DTR --</option>';
  
  const feederDTRs = transformers.filter(t => t.feeder_code === surveyData.feeder);
  feederDTRs.forEach(dtr => {
    const option = document.createElement('option');
    option.value = dtr.code;
    option.textContent = `${dtr.code} - ${dtr.name}`;
    select.appendChild(option);
  });
}

// Handle DTR Select
function handleDTRSelect(e) {
  const dtrCode = e.target.value;
  surveyData.dtr = dtrCode;
  document.getElementById('dtr-next-btn').disabled = !dtrCode;
}

// Collect Data Entry
function collectDataEntry() {
  surveyData.mobile = document.getElementById('mobile-input').value;
  surveyData.load = document.getElementById('load-input').value;
  surveyData.tariff = document.getElementById('tariff-input').value;
  surveyData.meterMake = document.getElementById('meter-make-input').value;
  surveyData.address = document.getElementById('address-input').value;
  surveyData.notes = document.getElementById('notes-input').value;
  
  surveyData.verifications = {
    meter: document.getElementById('verify-meter').checked,
    consumer: document.getElementById('verify-consumer').checked,
    address: document.getElementById('verify-address').checked,
    load: document.getElementById('verify-load').checked
  };
  
  // Pre-fill with current consumer data
  document.getElementById('previous-mobile').textContent = currentConsumer.mobile || 'None';
  document.getElementById('load-input').value = currentConsumer.load;
  document.getElementById('tariff-input').value = currentConsumer.tariff;
  document.getElementById('meter-make-input').value = currentConsumer.meter_make;
  document.getElementById('address-input').value = currentConsumer.address;
}

// Handle Photo Capture
function handlePhotoCapture(e) {
  const files = Array.from(e.target.files);
  const maxPhotos = 3;
  
  if (surveyData.photos.length + files.length > maxPhotos) {
    alert(`You can only upload a maximum of ${maxPhotos} photos`);
    return;
  }
  
  files.forEach(file => {
    const reader = new FileReader();
    reader.onload = (event) => {
      surveyData.photos.push(event.target.result);
      renderPhotos();
    };
    reader.readAsDataURL(file);
  });
}

// Render Photos
function renderPhotos() {
  const container = document.getElementById('photo-preview');
  container.innerHTML = surveyData.photos.map((photo, index) => `
    <div class="photo-item">
      <img src="${photo}" alt="Photo ${index + 1}">
      <button class="photo-remove" onclick="removePhoto(${index})" type="button">×</button>
    </div>
  `).join('');
}

// Remove Photo
function removePhoto(index) {
  surveyData.photos.splice(index, 1);
  renderPhotos();
}

// Get GPS Location
function getGPSLocation() {
  document.getElementById('gps-status-text').textContent = 'Acquiring GPS...';
  document.getElementById('gps-icon').style.animation = 'pulse 2s infinite';
  document.getElementById('proceed-review-btn').disabled = true;
  
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        surveyData.gpsLocation = {
          latitude: position.coords.latitude.toFixed(6),
          longitude: position.coords.longitude.toFixed(6),
          accuracy: position.coords.accuracy.toFixed(0),
          timestamp: new Date().toLocaleString()
        };
        
        document.getElementById('gps-status-text').textContent = 'GPS: Located';
        document.getElementById('gps-lat').textContent = surveyData.gpsLocation.latitude;
        document.getElementById('gps-lng').textContent = surveyData.gpsLocation.longitude;
        document.getElementById('gps-accuracy').textContent = `±${surveyData.gpsLocation.accuracy}m`;
        document.getElementById('gps-timestamp').textContent = surveyData.gpsLocation.timestamp;
        
        const accuracy = parseFloat(surveyData.gpsLocation.accuracy);
        const messageDiv = document.getElementById('gps-message');
        
        if (accuracy > 50) {
          messageDiv.className = 'gps-message warning';
          messageDiv.textContent = '⚠️ GPS accuracy is low. Ensure you are outdoors with clear sky view.';
        } else {
          messageDiv.className = 'gps-message success';
          messageDiv.textContent = '✓ GPS accuracy is good. Ready to proceed.';
          document.getElementById('proceed-review-btn').disabled = false;
        }
      },
      (error) => {
        document.getElementById('gps-status-text').textContent = 'GPS: Error';
        const messageDiv = document.getElementById('gps-message');
        messageDiv.className = 'gps-message warning';
        messageDiv.textContent = `GPS Error: ${error.message}. You can enter coordinates manually.`;
      },
      { enableHighAccuracy: true, timeout: 30000, maximumAge: 0 }
    );
  } else {
    document.getElementById('gps-status-text').textContent = 'GPS: Not supported';
    alert('Geolocation is not supported by your device');
  }
}

// Manual GPS Entry
function manualGPS() {
  const lat = prompt('Enter Latitude:');
  const lng = prompt('Enter Longitude:');
  
  if (lat && lng) {
    surveyData.gpsLocation = {
      latitude: parseFloat(lat).toFixed(6),
      longitude: parseFloat(lng).toFixed(6),
      accuracy: 'Manual',
      timestamp: new Date().toLocaleString()
    };
    
    document.getElementById('gps-status-text').textContent = 'GPS: Manual Entry';
    document.getElementById('gps-lat').textContent = surveyData.gpsLocation.latitude;
    document.getElementById('gps-lng').textContent = surveyData.gpsLocation.longitude;
    document.getElementById('gps-accuracy').textContent = 'Manual';
    document.getElementById('gps-timestamp').textContent = surveyData.gpsLocation.timestamp;
    document.getElementById('proceed-review-btn').disabled = false;
  }
}

// Populate Review
function populateReview() {
  document.getElementById('review-consumer-no').textContent = currentConsumer.consumer_no;
  document.getElementById('review-name').textContent = currentConsumer.name;
  document.getElementById('review-mobile').textContent = surveyData.mobile || currentConsumer.mobile || 'Not provided';
  
  const dc = dcs.find(d => d.code === surveyData.dc);
  document.getElementById('review-dc').textContent = dc ? `${dc.code} - ${dc.name}` : surveyData.dc;
  
  const feeder = feeders.find(f => f.code === surveyData.feeder);
  document.getElementById('review-feeder').textContent = feeder ? `${feeder.code} - ${feeder.name}` : surveyData.feeder;
  
  const dtr = transformers.find(t => t.code === surveyData.dtr);
  document.getElementById('review-dtr').textContent = dtr ? `${dtr.code} - ${dtr.name}` : surveyData.dtr;
  
  if (surveyData.gpsLocation) {
    document.getElementById('review-gps').textContent = `${surveyData.gpsLocation.latitude}, ${surveyData.gpsLocation.longitude}`;
    document.getElementById('review-accuracy').textContent = `±${surveyData.gpsLocation.accuracy}m`;
  }
  
  document.getElementById('review-photos').textContent = surveyData.photos.length > 0 ? `${surveyData.photos.length} photo(s)` : 'None';
}

// Update Submit Button
function updateSubmitButton() {
  const allChecked = document.querySelectorAll('#review-screen .form-check input:checked').length === 4;
  document.getElementById('final-submit-btn').disabled = !allChecked;
}

// Submit Survey
function submitSurvey() {
  const refNumber = `SUR-${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')}-${String(surveyHistory.length + 1).padStart(3, '0')}`;
  
  const submission = {
    reference: refNumber,
    surveyor: currentUser.name,
    surveyorId: currentUser.id,
    consumer: { ...currentConsumer },
    surveyData: { ...surveyData },
    timestamp: new Date().toLocaleString(),
    timestampISO: new Date().toISOString(),
    status: 'Synced'
  };
  
  surveyHistory.push(submission);
  lastSubmittedSurvey = submission;
  
  // Mark consumer as surveyed
  const consumerIndex = sampleConsumers.findIndex(c => c.consumer_no === currentConsumer.consumer_no);
  if (consumerIndex !== -1) {
    sampleConsumers[consumerIndex].survey_status = 'Surveyed';
    sampleConsumers[consumerIndex].last_survey_date = new Date().toLocaleDateString();
    sampleConsumers[consumerIndex].last_surveyor = `${currentUser.id} - ${currentUser.name}`;
    sampleConsumers[consumerIndex].feeder_assigned = surveyData.feeder;
    sampleConsumers[consumerIndex].dtr_assigned = surveyData.dtr;
  }
  
  // Update stats
  todayStats.totalSurveys++;
  todayStats.consumersIndexed++;
  todayStats.lastSubmission = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  
  // Show success
  document.getElementById('success-ref').textContent = refNumber;
  document.getElementById('success-time').textContent = submission.timestamp;
  document.getElementById('success-coords').textContent = `${surveyData.gpsLocation.latitude}, ${surveyData.gpsLocation.longitude}`;
  
  const dtr = transformers.find(t => t.code === surveyData.dtr);
  document.getElementById('success-message').textContent = `Survey completed and consumer locked for future surveys. Consumer ${currentConsumer.name} successfully indexed to DTR ${dtr ? dtr.name : surveyData.dtr}.`;
  
  showScreen('success-screen');
}

// Reset Survey
function resetSurvey() {
  surveyData = {
    dc: null,
    feeder: null,
    dtr: null,
    mobile: '',
    load: '',
    tariff: '',
    meterMake: '',
    address: '',
    notes: '',
    photos: [],
    verifications: {},
    gpsLocation: null
  };
  currentConsumer = null;
  
  // Reset forms
  document.getElementById('data-entry-form').reset();
  document.getElementById('photo-preview').innerHTML = '';
  document.querySelectorAll('#review-screen .form-check input').forEach(cb => cb.checked = false);
}

// Show History
function showHistory() {
  showScreen('history-screen');
  renderHistory();
}

// Render History
function renderHistory() {
  const container = document.getElementById('history-list');
  const dateFilter = document.getElementById('history-date-filter').value;
  const statusFilter = document.getElementById('history-status-filter').value;
  
  let filtered = surveyHistory;
  
  if (dateFilter) {
    filtered = filtered.filter(s => s.timestamp.startsWith(dateFilter));
  }
  
  if (statusFilter) {
    filtered = filtered.filter(s => s.status === statusFilter);
  }
  
  if (filtered.length === 0) {
    container.innerHTML = '<div class="empty-state">No survey records found</div>';
    return;
  }
  
  container.innerHTML = filtered.map(survey => {
    const dc = dcs.find(d => d.code === survey.surveyData.dc);
    const feeder = feeders.find(f => f.code === survey.surveyData.feeder);
    const dtr = transformers.find(t => t.code === survey.surveyData.dtr);
    
    return `
      <div class="history-card">
        <div class="history-header">
          <div class="history-consumer">${survey.consumer.name}</div>
          <div class="history-status ${survey.status.toLowerCase()}">${survey.status}</div>
        </div>
        <div class="history-detail">📋 ${survey.reference}</div>
        <div class="history-detail">🆔 ${survey.consumer.consumer_no}</div>
        <div class="history-detail">📍 DC: ${dc ? dc.name : survey.surveyData.dc}</div>
        <div class="history-detail">⚡ Feeder: ${feeder ? feeder.name : survey.surveyData.feeder}</div>
        <div class="history-detail">🔌 DTR: ${dtr ? dtr.name : survey.surveyData.dtr}</div>
        <div class="history-detail">🕐 ${survey.timestamp}</div>
        <div class="history-detail">📍 GPS: ${survey.surveyData.gpsLocation.latitude}, ${survey.surveyData.gpsLocation.longitude}</div>
      </div>
    `;
  }).join('');
}

// Sync Data
function syncData() {
  alert('Syncing data... All surveys are up to date!');
}

// Admin Dashboard Functions
function updateAdminDashboard() {
  const totalConsumers = sampleConsumers.length;
  const surveyedConsumers = sampleConsumers.filter(c => c.survey_status === 'Surveyed').length;
  const totalSurveys = surveyHistory.length;
  const completionRate = totalConsumers > 0 ? Math.round((surveyedConsumers / totalConsumers) * 100) : 0;
  
  document.getElementById('admin-total-consumers').textContent = totalConsumers;
  document.getElementById('admin-surveyed-consumers').textContent = surveyedConsumers;
  document.getElementById('admin-total-surveys').textContent = totalSurveys;
  document.getElementById('admin-completion-rate').textContent = `${completionRate}%`;
}

function updateMasterDataStats() {
  document.getElementById('stat-divisions').textContent = divisions.length;
  document.getElementById('stat-dcs').textContent = dcs.length;
  document.getElementById('stat-feeders').textContent = feeders.length;
  document.getElementById('stat-dtrs').textContent = transformers.length;
  document.getElementById('stat-consumers').textContent = sampleConsumers.length;
}

// Excel Download Functions
function downloadSurveyExcel() {
  if (!lastSubmittedSurvey) return;
  
  const wb = XLSX.utils.book_new();
  
  // Sheet 1: Survey Summary
  const summaryData = [
    ['Consumer Survey Report'],
    [''],
    ['Survey Reference Number', lastSubmittedSurvey.reference],
    ['Date', new Date(lastSubmittedSurvey.timestampISO).toLocaleDateString()],
    ['Time', new Date(lastSubmittedSurvey.timestampISO).toLocaleTimeString()],
    ['Surveyor', lastSubmittedSurvey.surveyor],
    ['Surveyor ID', lastSubmittedSurvey.surveyorId],
    [''],
    ['Consumer Details'],
    ['Consumer Number', lastSubmittedSurvey.consumer.consumer_no],
    ['Consumer Name', lastSubmittedSurvey.consumer.name],
    ['Address', lastSubmittedSurvey.consumer.address],
    ['Mobile', lastSubmittedSurvey.surveyData.mobile || lastSubmittedSurvey.consumer.mobile],
    [''],
    ['Network Assignment'],
    ['DC', lastSubmittedSurvey.surveyData.dc],
    ['Feeder', lastSubmittedSurvey.surveyData.feeder],
    ['DTR', lastSubmittedSurvey.surveyData.dtr],
    [''],
    ['Load & Tariff'],
    ['Connected Load', lastSubmittedSurvey.surveyData.load || lastSubmittedSurvey.consumer.load],
    ['Tariff', lastSubmittedSurvey.surveyData.tariff || lastSubmittedSurvey.consumer.tariff],
    [''],
    ['GPS Location'],
    ['Latitude', lastSubmittedSurvey.surveyData.gpsLocation.latitude],
    ['Longitude', lastSubmittedSurvey.surveyData.gpsLocation.longitude],
    ['Accuracy', lastSubmittedSurvey.surveyData.gpsLocation.accuracy],
    [''],
    ['Verification'],
    ['Meter Verified', lastSubmittedSurvey.surveyData.verifications.meter ? 'Yes' : 'No'],
    ['Consumer Verified', lastSubmittedSurvey.surveyData.verifications.consumer ? 'Yes' : 'No'],
    ['Address Verified', lastSubmittedSurvey.surveyData.verifications.address ? 'Yes' : 'No'],
    ['Load Verified', lastSubmittedSurvey.surveyData.verifications.load ? 'Yes' : 'No']
  ];
  
  const ws = XLSX.utils.aoa_to_sheet(summaryData);
  XLSX.utils.book_append_sheet(wb, ws, 'Survey Summary');
  
  const fileName = `Survey_${lastSubmittedSurvey.reference}_${new Date().toISOString().split('T')[0]}.xlsx`;
  XLSX.writeFile(wb, fileName);
}

function downloadSurveyPDF() {
  if (!lastSubmittedSurvey) return;
  
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  
  let yPos = 20;
  
  // Header
  doc.setFontSize(20);
  doc.setFont(undefined, 'bold');
  doc.text('Consumer Survey Report', 105, yPos, { align: 'center' });
  yPos += 10;
  
  doc.setFontSize(14);
  doc.text(lastSubmittedSurvey.reference, 105, yPos, { align: 'center' });
  yPos += 15;
  
  // Survey Info
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  doc.text(`Date: ${new Date(lastSubmittedSurvey.timestampISO).toLocaleDateString()}`, 20, yPos);
  doc.text(`Time: ${new Date(lastSubmittedSurvey.timestampISO).toLocaleTimeString()}`, 120, yPos);
  yPos += 10;
  doc.text(`Surveyor: ${lastSubmittedSurvey.surveyor} (${lastSubmittedSurvey.surveyorId})`, 20, yPos);
  yPos += 15;
  
  // Consumer Information
  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text('Consumer Information', 20, yPos);
  yPos += 8;
  
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  doc.text(`Consumer Number: ${lastSubmittedSurvey.consumer.consumer_no}`, 20, yPos);
  yPos += 6;
  doc.text(`Name: ${lastSubmittedSurvey.consumer.name}`, 20, yPos);
  yPos += 6;
  doc.text(`Address: ${lastSubmittedSurvey.consumer.address}`, 20, yPos);
  yPos += 6;
  doc.text(`Mobile: ${lastSubmittedSurvey.surveyData.mobile || lastSubmittedSurvey.consumer.mobile || 'N/A'}`, 20, yPos);
  yPos += 6;
  doc.text(`Load: ${lastSubmittedSurvey.surveyData.load || lastSubmittedSurvey.consumer.load} kW`, 20, yPos);
  yPos += 6;
  doc.text(`Tariff: ${lastSubmittedSurvey.surveyData.tariff || lastSubmittedSurvey.consumer.tariff}`, 20, yPos);
  yPos += 6;
  doc.text(`Meter: ${lastSubmittedSurvey.consumer.meter_no} (${lastSubmittedSurvey.consumer.meter_make})`, 20, yPos);
  yPos += 12;
  
  // Network Assignment
  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text('Network Assignment', 20, yPos);
  yPos += 8;
  
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  doc.text(`DC: ${lastSubmittedSurvey.surveyData.dc}`, 20, yPos);
  yPos += 6;
  doc.text(`Feeder: ${lastSubmittedSurvey.surveyData.feeder}`, 20, yPos);
  yPos += 6;
  doc.text(`DTR: ${lastSubmittedSurvey.surveyData.dtr}`, 20, yPos);
  yPos += 12;
  
  // GPS Location
  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text('GPS Location', 20, yPos);
  yPos += 8;
  
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  doc.text(`Latitude: ${lastSubmittedSurvey.surveyData.gpsLocation.latitude}`, 20, yPos);
  yPos += 6;
  doc.text(`Longitude: ${lastSubmittedSurvey.surveyData.gpsLocation.longitude}`, 20, yPos);
  yPos += 6;
  doc.text(`Accuracy: ${lastSubmittedSurvey.surveyData.gpsLocation.accuracy}`, 20, yPos);
  yPos += 12;
  
  // Verification
  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text('Verification Checklist', 20, yPos);
  yPos += 8;
  
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  doc.text(`Meter Verified: ${lastSubmittedSurvey.surveyData.verifications.meter ? 'Yes' : 'No'}`, 20, yPos);
  yPos += 6;
  doc.text(`Consumer Verified: ${lastSubmittedSurvey.surveyData.verifications.consumer ? 'Yes' : 'No'}`, 20, yPos);
  yPos += 6;
  doc.text(`Address Verified: ${lastSubmittedSurvey.surveyData.verifications.address ? 'Yes' : 'No'}`, 20, yPos);
  yPos += 6;
  doc.text(`Load Verified: ${lastSubmittedSurvey.surveyData.verifications.load ? 'Yes' : 'No'}`, 20, yPos);
  
  const fileName = `Survey_${lastSubmittedSurvey.reference}.pdf`;
  doc.save(fileName);
}

// Template Download Functions
function downloadFeederTemplate() {
  const wb = XLSX.utils.book_new();
  
  const templateData = [
    ['Division_Code', 'Division_Name', 'DC_Code', 'DC_Name', 'Feeder_Code', 'Feeder_Name', 'DTR_Code', 'DTR_Name'],
    ['DIV001', 'North Division', 'DC-N01', 'DC-North-01', 'F001', 'Main Feeder', 'DTR001', 'Substation-A'],
    ['DIV001', 'North Division', 'DC-N01', 'DC-North-01', 'F001', 'Main Feeder', 'DTR002', 'Substation-B']
  ];
  
  const ws = XLSX.utils.aoa_to_sheet(templateData);
  XLSX.utils.book_append_sheet(wb, ws, 'Feeder Master');
  XLSX.writeFile(wb, 'Feeder_Master_Template.xlsx');
}

function downloadConsumerTemplate() {
  const wb = XLSX.utils.book_new();
  
  const templateData = [
    ['Division_Code', 'Division_Name', 'DC_Code', 'DC_Name', 'Consumer_No', 'Consumer_Name', 'Address', 'Mobile_Number', 'Connected_Load', 'Tariff', 'Meter_Number', 'Meter_Make', 'Other_Details'],
    ['DIV001', 'North Division', 'DC-N01', 'DC-North-01', 'C001', 'John Doe', '123 Main St', '9876543210', '2.5', 'LV2', 'MET001', 'Siemens', ''],
    ['DIV001', 'North Division', 'DC-N01', 'DC-North-01', 'C002', 'Jane Smith', '456 Park Ave', '9123456789', '3.0', 'LV3', 'MET002', 'ABB', '']
  ];
  
  const ws = XLSX.utils.aoa_to_sheet(templateData);
  XLSX.utils.book_append_sheet(wb, ws, 'Consumer Master');
  XLSX.writeFile(wb, 'Consumer_Master_Template.xlsx');
}

// Upload Master Data Functions
function uploadFeederMaster() {
  const fileInput = document.getElementById('feeder-file-input');
  const file = fileInput.files[0];
  const statusDiv = document.getElementById('feeder-upload-status');
  
  if (!file) {
    statusDiv.className = 'upload-status error';
    statusDiv.textContent = 'Please select a file first.';
    return;
  }
  
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(firstSheet);
      
      // Validate and process data
      let addedCount = 0;
      jsonData.forEach(row => {
        // Add to divisions if not exists
        if (!divisions.find(d => d.code === row.Division_Code)) {
          divisions.push({ code: row.Division_Code, name: row.Division_Name });
        }
        // Add to DCs if not exists
        if (!dcs.find(d => d.code === row.DC_Code)) {
          dcs.push({ code: row.DC_Code, name: row.DC_Name, division: row.Division_Code });
        }
        // Add to feeders if not exists
        if (!feeders.find(f => f.code === row.Feeder_Code)) {
          feeders.push({ code: row.Feeder_Code, name: row.Feeder_Name, dc_code: row.DC_Code });
        }
        // Add to transformers if not exists
        if (!transformers.find(t => t.code === row.DTR_Code)) {
          transformers.push({ code: row.DTR_Code, name: row.DTR_Name, feeder_code: row.Feeder_Code });
          addedCount++;
        }
      });
      
      statusDiv.className = 'upload-status success';
      statusDiv.textContent = `Feeder Master uploaded successfully! Added ${addedCount} new DTRs.`;
      updateMasterDataStats();
      fileInput.value = '';
      document.getElementById('upload-feeder-btn').disabled = true;
    } catch (error) {
      statusDiv.className = 'upload-status error';
      statusDiv.textContent = `Error: ${error.message}`;
    }
  };
  reader.readAsArrayBuffer(file);
}

function uploadConsumerMaster() {
  const fileInput = document.getElementById('consumer-file-input');
  const file = fileInput.files[0];
  const statusDiv = document.getElementById('consumer-upload-status');
  
  if (!file) {
    statusDiv.className = 'upload-status error';
    statusDiv.textContent = 'Please select a file first.';
    return;
  }
  
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(firstSheet);
      
      let addedCount = 0;
      let updatedCount = 0;
      
      jsonData.forEach(row => {
        const existingIndex = sampleConsumers.findIndex(c => c.consumer_no === row.Consumer_No);
        
        const consumer = {
          consumer_no: row.Consumer_No,
          name: row.Consumer_Name,
          address: row.Address,
          mobile: row.Mobile_Number || '',
          load: parseFloat(row.Connected_Load) || 0,
          tariff: row.Tariff,
          meter_no: row.Meter_Number,
          meter_make: row.Meter_Make,
          division: row.Division_Code,
          dc: row.DC_Code,
          feeder_assigned: '',
          dtr_assigned: '',
          survey_status: 'Not Surveyed',
          last_survey_date: null,
          last_surveyor: null
        };
        
        if (existingIndex === -1) {
          sampleConsumers.push(consumer);
          addedCount++;
        } else {
          sampleConsumers[existingIndex] = { ...sampleConsumers[existingIndex], ...consumer };
          updatedCount++;
        }
      });
      
      statusDiv.className = 'upload-status success';
      statusDiv.textContent = `Consumer Master uploaded successfully! Added ${addedCount} new consumers, Updated ${updatedCount} consumers.`;
      updateMasterDataStats();
      if (currentUserRole === 'admin') updateAdminDashboard();
      fileInput.value = '';
      document.getElementById('upload-consumer-btn').disabled = true;
    } catch (error) {
      statusDiv.className = 'upload-status error';
      statusDiv.textContent = `Error: ${error.message}`;
    }
  };
  reader.readAsArrayBuffer(file);
}

// Admin View Surveys
function showAdminSurveys() {
  showScreen('admin-surveys-screen');
  renderAdminSurveys();
}

function renderAdminSurveys() {
  const container = document.getElementById('admin-surveys-list');
  const dateFilter = document.getElementById('admin-survey-date-filter').value;
  const surveyorFilter = document.getElementById('admin-surveyor-filter').value;
  
  let filtered = surveyHistory;
  
  if (dateFilter) {
    filtered = filtered.filter(s => s.timestamp.startsWith(dateFilter));
  }
  
  if (surveyorFilter) {
    filtered = filtered.filter(s => s.surveyorId === surveyorFilter);
  }
  
  if (filtered.length === 0) {
    container.innerHTML = '<div class="empty-state">No surveys found</div>';
    return;
  }
  
  container.innerHTML = filtered.map(survey => `
    <div class="consumer-admin-card">
      <div class="card-header">
        <div class="consumer-info">
          <div class="consumer-name">${survey.consumer.name}</div>
          <div class="consumer-id">${survey.reference}</div>
        </div>
        <div class="status-badge surveyed">Completed</div>
      </div>
      <div class="card-details">🆔 Consumer: ${survey.consumer.consumer_no}</div>
      <div class="card-details">👤 Surveyor: ${survey.surveyor}</div>
      <div class="card-details">📍 DC: ${survey.surveyData.dc} | Feeder: ${survey.surveyData.feeder} | DTR: ${survey.surveyData.dtr}</div>
      <div class="card-details">🕐 ${survey.timestamp}</div>
      <div class="card-details">📍 GPS: ${survey.surveyData.gpsLocation.latitude}, ${survey.surveyData.gpsLocation.longitude}</div>
    </div>
  `).join('');
}

// Admin Manage Consumers
function showAdminConsumers() {
  showScreen('admin-consumers-screen');
  renderAdminConsumers();
}

function renderAdminConsumers() {
  const container = document.getElementById('admin-consumers-list');
  const searchTerm = document.getElementById('admin-consumer-search').value.toLowerCase();
  const statusFilter = document.getElementById('admin-consumer-status-filter').value;
  
  let filtered = sampleConsumers;
  
  if (searchTerm) {
    filtered = filtered.filter(c => 
      c.consumer_no.toLowerCase().includes(searchTerm) ||
      c.name.toLowerCase().includes(searchTerm) ||
      c.address.toLowerCase().includes(searchTerm)
    );
  }
  
  if (statusFilter === 'surveyed') {
    filtered = filtered.filter(c => c.survey_status === 'Surveyed');
  } else if (statusFilter === 'not-surveyed') {
    filtered = filtered.filter(c => c.survey_status === 'Not Surveyed');
  }
  
  if (filtered.length === 0) {
    container.innerHTML = '<div class="empty-state">No consumers found</div>';
    return;
  }
  
  container.innerHTML = filtered.map(consumer => {
    const statusClass = consumer.survey_status.toLowerCase().replace(/ /g, '-');
    const canReset = consumer.survey_status === 'Surveyed';
    
    return `
      <div class="consumer-admin-card">
        <div class="card-header">
          <div class="consumer-info">
            <div class="consumer-name">${consumer.name}</div>
            <div class="consumer-id">${consumer.consumer_no}</div>
          </div>
          <div class="status-badge ${statusClass}">${consumer.survey_status}</div>
        </div>
        <div class="card-details">📍 ${consumer.address}</div>
        <div class="card-details">📱 ${consumer.mobile || 'No mobile'}</div>
        <div class="card-details">⚡ ${consumer.meter_no} | ${consumer.tariff} | Load: ${consumer.load} kW</div>
        <div class="card-details">🏢 DC: ${consumer.dc} | DTR: ${consumer.dtr_assigned || 'Not assigned'}</div>
        ${consumer.last_survey_date ? `<div class="card-details">📅 Last Survey: ${consumer.last_survey_date} by ${consumer.last_surveyor}</div>` : ''}
        <div class="card-actions">
          ${canReset ? `<button class="btn-small btn-reset" onclick="resetSurveyFlag('${consumer.consumer_no}')">Reset Survey Flag</button>` : ''}
        </div>
      </div>
    `;
  }).join('');
}

function resetSurveyFlag(consumerNo) {
  if (!confirm(`Reset survey flag for this consumer? This will make the consumer available for resurvey.`)) {
    return;
  }
  
  const consumerIndex = sampleConsumers.findIndex(c => c.consumer_no === consumerNo);
  if (consumerIndex !== -1) {
    sampleConsumers[consumerIndex].survey_status = 'Not Surveyed';
    sampleConsumers[consumerIndex].last_survey_date = null;
    sampleConsumers[consumerIndex].last_surveyor = null;
    
    alert(`Survey flag reset. Consumer ${sampleConsumers[consumerIndex].name} is now available for resurvey.`);
    renderAdminConsumers();
    updateAdminDashboard();
  }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', initApp);