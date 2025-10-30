// Sample Data
const adminCredentials = {
  username: 'ADMIN001',
  password: 'admin123',
  name: 'Admin'
};

let surveyorCredentials = [
  { 
    id: 'SUR001', 
    name: 'Rajesh Verma', 
    email: 'rajesh.verma@electricity.com',
    mobile: '9876543210',
    password: 'survey123', 
    dc: 'DC-N01',
    status: 'Active',
    surveys_total: 145,
    surveys_today: 5,
    surveys_week: 28,
    surveys_month: 120,
    last_active: '2025-10-30 17:45',
    average_accuracy: 97.8,
    created_date: '2025-01-15'
  },
  { 
    id: 'SUR002', 
    name: 'Priya Singh',
    email: 'priya.singh@electricity.com',
    mobile: '9123456789',
    password: 'survey456', 
    dc: 'DC-N02',
    status: 'Active',
    surveys_total: 168,
    surveys_today: 8,
    surveys_week: 35,
    surveys_month: 142,
    last_active: '2025-10-30 18:20',
    average_accuracy: 98.5,
    created_date: '2025-01-10'
  },
  { 
    id: 'SUR003', 
    name: 'Arun Kumar',
    email: 'arun.kumar@electricity.com',
    mobile: '9987654321',
    password: 'survey789', 
    dc: 'DC-S01',
    status: 'Active',
    surveys_total: 112,
    surveys_today: 3,
    surveys_week: 18,
    surveys_month: 98,
    last_active: '2025-10-30 16:30',
    average_accuracy: 96.2,
    created_date: '2025-02-01'
  },
  { 
    id: 'SUR004', 
    name: 'Meera Patel',
    email: 'meera.patel@electricity.com',
    mobile: '8765432109',
    password: 'survey321', 
    dc: 'DC-E01',
    status: 'Inactive',
    surveys_total: 89,
    surveys_today: 0,
    surveys_week: 0,
    surveys_month: 45,
    last_active: '2025-10-15 14:00',
    average_accuracy: 95.1,
    created_date: '2025-02-15'
  }
];

let dcMasterData = [
  { code: 'DC-N01', name: 'DC-North-01', manager: 'Sharma', contact: '9876543210', email: 'dcn01@electricity.com', address: 'North Zone, Delhi', status: 'Active' },
  { code: 'DC-N02', name: 'DC-North-02', manager: 'Kumar', contact: '9123456789', email: 'dcn02@electricity.com', address: 'North Zone 2, Delhi', status: 'Active' },
  { code: 'DC-S01', name: 'DC-South-01', manager: 'Patel', contact: '9987654321', email: 'dcs01@electricity.com', address: 'South Zone, Delhi', status: 'Active' },
  { code: 'DC-E01', name: 'DC-East-01', manager: 'Singh', contact: '8765432109', email: 'dce01@electricity.com', address: 'East Zone, Delhi', status: 'Active' }
];

let feederMasterData = [
  { code: 'F001', name: 'Main Feeder North-01', dc_code: 'DC-N01', voltage_level: '11kV', line_length_km: 12.5, description: 'Main supply feeder', status: 'Active' },
  { code: 'F002', name: 'Secondary Feeder North-01', dc_code: 'DC-N01', voltage_level: '11kV', line_length_km: 8.3, description: 'Secondary feeder', status: 'Active' },
  { code: 'F003', name: 'Feeder North-01 Extension', dc_code: 'DC-N02', voltage_level: '11kV', line_length_km: 15.0, description: 'Extension feeder', status: 'Active' },
  { code: 'F004', name: 'Main Feeder South-01', dc_code: 'DC-S01', voltage_level: '11kV', line_length_km: 10.2, description: 'South zone main', status: 'Active' },
  { code: 'F005', name: 'Feeder East-01', dc_code: 'DC-E01', voltage_level: '33kV', line_length_km: 18.7, description: 'East zone feeder', status: 'Active' }
];

let transformers = [
  { code: 'DTR001', name: 'Substation-A', feeder_code: 'F001', description: 'Primary substation' },
  { code: 'DTR002', name: 'Substation-B', feeder_code: 'F001', description: 'Secondary substation' },
  { code: 'DTR003', name: 'Substation-C', feeder_code: 'F002', description: 'North-01 Extension' },
  { code: 'DTR004', name: 'Substation-D', feeder_code: 'F003', description: 'North-02 Main' },
  { code: 'DTR005', name: 'Substation-E', feeder_code: 'F004', description: 'South Main' }
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
let reportCharts = {};
let todayStats = {
  totalSurveys: 0,
  consumersIndexed: 0,
  lastSubmission: null
};

// Initialize App
function initApp() {
  attachEventListeners();
  showScreen('login-screen');
  updateMasterDataStats();
  generateSampleSurveys();
}

// Generate Sample Survey Data for Reports
function generateSampleSurveys() {
  // Generate 50 sample surveys over the last 30 days
  const surveyorIds = ['SUR001', 'SUR002', 'SUR003', 'SUR004'];
  const dcCodes = ['DC-N01', 'DC-N02', 'DC-S01'];
  const feederCodes = ['F001', 'F002', 'F003'];
  const dtrCodes = ['DTR001', 'DTR002', 'DTR003'];
  
  for (let i = 0; i < 50; i++) {
    // Random date in last 30 days
    const daysAgo = Math.floor(Math.random() * 30);
    const surveyDate = new Date();
    surveyDate.setDate(surveyDate.getDate() - daysAgo);
    surveyDate.setHours(Math.floor(Math.random() * 12) + 8); // 8 AM to 8 PM
    surveyDate.setMinutes(Math.floor(Math.random() * 60));
    
    const surveyorId = surveyorIds[Math.floor(Math.random() * surveyorIds.length)];
    const surveyor = surveyorCredentials.find(s => s.id === surveyorId);
    
    // Pick a consumer that hasn't been surveyed yet or allow resurvey
    const consumerIndex = Math.floor(Math.random() * Math.min(sampleConsumers.length, 20));
    const consumer = sampleConsumers[consumerIndex];
    
    if (!consumer) continue;
    
    const gpsAccuracy = Math.floor(Math.random() * 60) + 5; // 5-65 meters
    
    const survey = {
      reference: `SUR-2025-10-${String(i + 1).padStart(3, '0')}`,
      surveyor: surveyor.name,
      surveyorId: surveyorId,
      consumer: { ...consumer },
      surveyData: {
        dc: dcCodes[Math.floor(Math.random() * dcCodes.length)],
        feeder: feederCodes[Math.floor(Math.random() * feederCodes.length)],
        dtr: dtrCodes[Math.floor(Math.random() * dtrCodes.length)],
        mobile: Math.random() > 0.2 ? `98765${String(Math.floor(Math.random() * 100000)).padStart(5, '0')}` : '',
        load: consumer.load,
        tariff: consumer.tariff,
        meterMake: consumer.meter_make,
        address: consumer.address,
        notes: '',
        photos: [],
        verifications: {
          meter: true,
          consumer: true,
          address: true,
          load: true
        },
        gpsLocation: {
          latitude: (28.6 + Math.random() * 0.3).toFixed(6),
          longitude: (77.2 + Math.random() * 0.3).toFixed(6),
          accuracy: gpsAccuracy.toString(),
          timestamp: surveyDate.toLocaleString()
        }
      },
      timestamp: surveyDate.toLocaleString(),
      timestampISO: surveyDate.toISOString(),
      status: 'Synced'
    };
    
    surveyHistory.push(survey);
  }
  
  // Sort by date
  surveyHistory.sort((a, b) => new Date(b.timestampISO) - new Date(a.timestampISO));
}

// Screen Navigation
function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(screenId).classList.add('active');
}

// Helper function to get DC by code
function getDCByCode(code) {
  return dcMasterData.find(dc => dc.code === code);
}

// Helper function to get Feeder by code
function getFeederByCode(code) {
  return feederMasterData.find(f => f.code === code);
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
  document.getElementById('admin-reports-btn').addEventListener('click', showReportsAnalytics);
  document.getElementById('admin-surveyor-mgmt-btn').addEventListener('click', showSurveyorManagement);
  
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
  
  // Admin Surveyor Management
  document.getElementById('admin-surveyor-mgmt-btn').addEventListener('click', showSurveyorManagement);
  document.getElementById('surveyor-mgmt-back-btn').addEventListener('click', () => showScreen('admin-dashboard-screen'));
  document.getElementById('add-surveyor-btn').addEventListener('click', openAddSurveyorModal);
  document.getElementById('surveyor-search').addEventListener('input', renderSurveyorList);
  document.getElementById('surveyor-dc-filter').addEventListener('change', renderSurveyorList);
  document.getElementById('surveyor-status-filter').addEventListener('change', renderSurveyorList);
  document.getElementById('close-surveyor-modal').addEventListener('click', closeSurveyorModal);
  document.getElementById('cancel-surveyor-btn').addEventListener('click', closeSurveyorModal);
  document.getElementById('save-surveyor-btn').addEventListener('click', saveSurveyor);
  document.getElementById('close-surveyor-details-modal').addEventListener('click', closeSurveyorDetailsModal);
  document.getElementById('edit-surveyor-from-profile-btn').addEventListener('click', editSurveyorFromProfile);
  document.getElementById('reset-surveyor-password-btn').addEventListener('click', resetSurveyorPassword);
  
  // DC Management
  document.getElementById('admin-dc-mgmt-btn').addEventListener('click', showDCManagement);
  document.getElementById('dc-mgmt-back-btn').addEventListener('click', () => showScreen('admin-dashboard-screen'));
  document.getElementById('add-dc-btn').addEventListener('click', openAddDCModal);
  document.getElementById('dc-search').addEventListener('input', renderDCList);
  document.getElementById('dc-status-filter').addEventListener('change', renderDCList);
  document.getElementById('close-dc-modal').addEventListener('click', closeDCModal);
  document.getElementById('cancel-dc-btn').addEventListener('click', closeDCModal);
  document.getElementById('save-dc-btn').addEventListener('click', saveDC);
  
  // Feeder Management
  document.getElementById('admin-feeder-mgmt-btn').addEventListener('click', showFeederManagement);
  document.getElementById('feeder-mgmt-back-btn').addEventListener('click', () => showScreen('admin-dashboard-screen'));
  document.getElementById('add-feeder-btn').addEventListener('click', openAddFeederModal);
  document.getElementById('feeder-search').addEventListener('input', renderFeederList);
  document.getElementById('feeder-dc-filter').addEventListener('change', renderFeederList);
  document.getElementById('feeder-status-filter').addEventListener('change', renderFeederList);
  document.getElementById('close-feeder-modal').addEventListener('click', closeFeederModal);
  document.getElementById('cancel-feeder-btn').addEventListener('click', closeFeederModal);
  document.getElementById('save-feeder-btn').addEventListener('click', saveFeeder);
  
  // Admin Reports & Analytics
  document.getElementById('admin-reports-btn').addEventListener('click', showReportsAnalytics);
  document.getElementById('reports-back-btn').addEventListener('click', () => showScreen('admin-dashboard-screen'));
  document.getElementById('export-all-data-btn').addEventListener('click', exportAllData);
  document.getElementById('refresh-reports-btn').addEventListener('click', showReportsAnalytics);
  
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
    document.getElementById('admin-id').required = false;
  } else if (role === 'admin') {
    surveyorFields.style.display = 'none';
    adminFields.style.display = 'block';
    document.getElementById('surveyor-id').required = false;
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
    
    const user = surveyorCredentials.find(u => u.id === surveyorId && u.password === password);
    
    if (user) {
      currentUser = user;
      currentUserRole = 'surveyor';
      updateDashboard();
      showScreen('dashboard-screen');
      document.getElementById('login-form').reset();
      document.getElementById('login-error').style.display = 'none';
    } else {
      showError('Invalid credentials. Please check Surveyor ID and Password.');
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
  
  // Get DC for current surveyor
  const userDC = getDCByCode(currentUser.dc);
  document.getElementById('current-dc').textContent = userDC ? userDC.name : currentUser.dc;
  
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
  
  const dc = getDCByCode(consumer.dc);
  document.getElementById('detail-dc').textContent = dc ? dc.name : consumer.dc;
  
  const feeder = getFeederByCode(consumer.feeder_assigned);
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
  
  // Show only the surveyor's assigned DC
  const userDC = getDCByCode(currentUser.dc);
  if (userDC) {
    const option = document.createElement('option');
    option.value = userDC.code;
    option.textContent = `${userDC.code} - ${userDC.name}`;
    select.appendChild(option);
  }
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
  
  const dcFeeders = feederMasterData.filter(f => f.dc_code === surveyData.dc && f.status === 'Active');
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
    const dc = getDCByCode(survey.surveyData.dc);
    const feeder = getFeederByCode(survey.surveyData.feeder);
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
  document.getElementById('stat-divisions').textContent = 0; // No divisions
  document.getElementById('stat-dcs').textContent = dcMasterData.length;
  document.getElementById('stat-feeders').textContent = feederMasterData.length;
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
  
  // Instructions Sheet
  const instructionsData = [
    ['FEEDER MASTER TEMPLATE - INSTRUCTIONS'],
    [''],
    ['This template is used to upload Feeder and Distribution Transformer (DTR) master data.'],
    ['Please follow the instructions carefully to ensure successful data import.'],
    [''],
    ['COLUMN DESCRIPTIONS:'],
    ['Column Name', 'Description', 'Format', 'Required', 'Example'],
    ['DC_Code', 'Unique code for Distribution Center', 'Text', 'Yes', 'DC-N01'],
    ['DC_Name', 'Name of the Distribution Center', 'Text', 'Yes', 'DC-North-01'],
    ['Feeder_Code', 'Unique code for Feeder', 'Text', 'Yes', 'F001'],
    ['Feeder_Name', 'Name of the Feeder', 'Text', 'Yes', 'Main Feeder North'],
    ['DTR_Code', 'Unique code for DTR', 'Text', 'Yes', 'DTR001'],
    ['DTR_Name', 'Name of the DTR/Substation', 'Text', 'Yes', 'Substation-A'],
    ['Voltage_Level', 'Voltage level (optional)', 'Text', 'No', '11kV'],
    ['Line_Length_km', 'Line length in km (optional)', 'Number', 'No', '12.5'],
    [''],
    ['IMPORTANT NOTES:'],
    ['1. Do not modify column headers in the template sheet'],
    ['2. All codes must be unique within their category'],
    ['3. Each row represents one DTR assignment'],
    ['4. Multiple DTRs can belong to the same Feeder'],
    ['5. Save the file in Excel format (.xlsx) before uploading'],
    [''],
    ['TIPS:'],
    ['- Fill in all yellow highlighted cells with your data'],
    ['- Remove sample rows before uploading your actual data'],
    ['- Ensure no empty rows between data entries'],
    ['- Use consistent naming conventions'],
    [''],
    ['For assistance, contact: admin@electricity.com']
  ];
  
  const wsInstructions = XLSX.utils.aoa_to_sheet(instructionsData);
  XLSX.utils.book_append_sheet(wb, wsInstructions, 'Instructions');
  
  // Template Sheet with Sample Data
  const templateData = [
    ['DC_Code', 'DC_Name', 'Feeder_Code', 'Feeder_Name', 'DTR_Code', 'DTR_Name', 'Voltage_Level', 'Line_Length_km'],
    ['DC-N01', 'DC-North-01', 'F001', 'Main Feeder North-01', 'DTR001', 'Substation-A', '11kV', '12.5'],
    ['DC-N01', 'DC-North-01', 'F001', 'Main Feeder North-01', 'DTR002', 'Substation-B', '11kV', '12.5'],
    ['DC-N01', 'DC-North-01', 'F002', 'Secondary Feeder North-01', 'DTR003', 'Substation-C', '11kV', '8.3'],
    ['DC-S01', 'DC-South-01', 'F004', 'Main Feeder South-01', 'DTR004', 'Substation-D', '11kV', '10.2'],
    ['DC-S01', 'DC-South-01', 'F004', 'Main Feeder South-01', 'DTR005', 'Substation-E', '11kV', '10.2']
  ];
  
  const wsTemplate = XLSX.utils.aoa_to_sheet(templateData);
  XLSX.utils.book_append_sheet(wb, wsTemplate, 'Feeder_Master_Template');
  
  const fileName = `Feeder_Master_Template_${new Date().toISOString().split('T')[0]}.xlsx`;
  XLSX.writeFile(wb, fileName);
}

function downloadConsumerTemplate() {
  const wb = XLSX.utils.book_new();
  
  // Instructions Sheet
  const instructionsData = [
    ['CONSUMER MASTER TEMPLATE - INSTRUCTIONS'],
    [''],
    ['This template is used to upload Consumer master data into the system.'],
    ['Please follow the instructions carefully to ensure successful data import.'],
    [''],
    ['COLUMN DESCRIPTIONS:'],
    ['Column Name', 'Description', 'Format', 'Required', 'Example'],
    ['DC_Code', 'Code of Distribution Center', 'Text', 'Yes', 'DC-N01'],
    ['DC_Name', 'Name of Distribution Center', 'Text', 'Yes', 'DC-North-01'],
    ['Consumer_No', 'Unique Consumer Number', 'Text', 'Yes', 'C001'],
    ['Consumer_Name', 'Full name of consumer', 'Text', 'Yes', 'Rajesh Kumar'],
    ['Address', 'Complete address', 'Text', 'Yes', '123 Main Street, Delhi'],
    ['Mobile_Number', 'Mobile number (10 digits)', 'Number', 'Optional', '9876543210'],
    ['Connected_Load', 'Load in kW', 'Number', 'Yes', '2.5'],
    ['Tariff', 'Tariff category', 'Text', 'Yes', 'LV2'],
    ['Meter_Number', 'Unique meter number', 'Text', 'Yes', 'MET001'],
    ['Meter_Make', 'Manufacturer of meter', 'Text', 'Yes', 'Siemens'],
    [''],
    ['TARIFF CATEGORIES:'],
    ['LV1 - Domestic Low Voltage Category 1'],
    ['LV2 - Domestic Low Voltage Category 2'],
    ['LV3 - Commercial Low Voltage'],
    ['LV4 - Industrial Low Voltage'],
    ['LV5 - General Purpose Low Voltage'],
    ['LV6 - Street Lighting'],
    ['AG - Agriculture'],
    ['HT - High Tension'],
    [''],
    ['IMPORTANT NOTES:'],
    ['1. Consumer_No and Meter_Number must be unique'],
    ['2. Mobile_Number should be 10 digits (without country code)'],
    ['3. Connected_Load should be in kW (e.g., 2.5, 3.0)'],
    ['4. Do not modify column headers'],
    ['5. Remove sample rows before uploading actual data'],
    [''],
    ['TIPS:'],
    ['- Fill in all yellow highlighted cells'],
    ['- Ensure no duplicate Consumer Numbers'],
    ['- Verify DC codes match your Feeder Master'],
    ['- Save file in Excel format (.xlsx)'],
    [''],
    ['For assistance, contact: admin@electricity.com']
  ];
  
  const wsInstructions = XLSX.utils.aoa_to_sheet(instructionsData);
  XLSX.utils.book_append_sheet(wb, wsInstructions, 'Instructions');
  
  // Template Sheet with Sample Data
  const templateData = [
    ['DC_Code', 'DC_Name', 'Consumer_No', 'Consumer_Name', 'Address', 'Mobile_Number', 'Connected_Load', 'Tariff', 'Meter_Number', 'Meter_Make'],
    ['DC-N01', 'DC-North-01', 'C001', 'Rajesh Kumar', '123 Main Street, North Delhi', '9876543210', '2.5', 'LV2', 'MET001', 'Siemens'],
    ['DC-N01', 'DC-North-01', 'C002', 'Priya Sharma', '456 Park Avenue, North Delhi', '9123456789', '3.0', 'LV3', 'MET002', 'ABB'],
    ['DC-N02', 'DC-North-02', 'C003', 'Arun Singh', 'Farm House, Village Haryana', '9987654321', '5.0', 'AG', 'MET003', 'L&T'],
    ['DC-S01', 'DC-South-01', 'C004', 'Meera Patel', '789 Market Road, South Delhi', '8765432109', '4.5', 'LV3', 'MET004', 'Genus'],
    ['DC-S01', 'DC-South-01', 'C005', 'Amit Verma', '321 Garden Lane, South Delhi', '7654321098', '2.0', 'LV2', 'MET005', 'Siemens'],
    ['DC-N01', 'DC-North-01', 'C006', 'Sunita Devi', '555 Temple Street, North Delhi', '', '1.5', 'LV1', 'MET006', 'HPL'],
    ['DC-S01', 'DC-South-01', 'C007', 'Vikram Rao', '888 Industrial Area, South', '9112233445', '10.0', 'LV4', 'MET007', 'ABB'],
    ['DC-N02', 'DC-North-02', 'C008', 'Lakshmi Reddy', '999 Residential Complex', '8899776655', '3.5', 'LV2', 'MET008', 'Secure']
  ];
  
  const wsTemplate = XLSX.utils.aoa_to_sheet(templateData);
  XLSX.utils.book_append_sheet(wb, wsTemplate, 'Consumer_Master_Template');
  
  const fileName = `Consumer_Master_Template_${new Date().toISOString().split('T')[0]}.xlsx`;
  XLSX.writeFile(wb, fileName);
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
        // Add to DCs if not exists
        if (!dcMasterData.find(d => d.code === row.DC_Code)) {
          dcMasterData.push({ code: row.DC_Code, name: row.DC_Name, status: 'Active' });
        }
        // Add to feeders if not exists
        if (!feederMasterData.find(f => f.code === row.Feeder_Code)) {
          feederMasterData.push({ 
            code: row.Feeder_Code, 
            name: row.Feeder_Name, 
            dc_code: row.DC_Code,
            voltage_level: row.Voltage_Level || '',
            line_length_km: row.Line_Length_km || null,
            status: 'Active'
          });
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

// Surveyor Management Functions
function showSurveyorManagement() {
  showScreen('admin-surveyor-screen');
  populateSurveyorFilters();
  renderSurveyorList();
}

function populateSurveyorFilters() {
  const dcFilter = document.getElementById('surveyor-dc-filter');
  dcFilter.innerHTML = '<option value="">All DCs</option>';
  dcMasterData.forEach(dc => {
    const option = document.createElement('option');
    option.value = dc.code;
    option.textContent = `${dc.code} - ${dc.name}`;
    dcFilter.appendChild(option);
  });
}

function renderSurveyorList() {
  const container = document.getElementById('surveyor-list');
  const searchTerm = document.getElementById('surveyor-search').value.toLowerCase();
  const dcFilter = document.getElementById('surveyor-dc-filter').value;
  const statusFilter = document.getElementById('surveyor-status-filter').value;
  
  let filtered = surveyorCredentials;
  
  if (searchTerm) {
    filtered = filtered.filter(s => 
      s.id.toLowerCase().includes(searchTerm) ||
      s.name.toLowerCase().includes(searchTerm) ||
      s.email.toLowerCase().includes(searchTerm) ||
      s.mobile.includes(searchTerm)
    );
  }
  
  if (dcFilter) {
    filtered = filtered.filter(s => s.dc === dcFilter);
  }
  
  if (statusFilter) {
    filtered = filtered.filter(s => s.status === statusFilter);
  }
  
  if (filtered.length === 0) {
    container.innerHTML = '<div class="empty-state">No surveyors found</div>';
    return;
  }
  
  container.innerHTML = filtered.map(surveyor => {
    const dc = getDCByCode(surveyor.dc);
    const statusClass = surveyor.status.toLowerCase();
    
    return `
      <div class="surveyor-card">
        <div class="card-header">
          <div class="surveyor-info">
            <div class="surveyor-name">${surveyor.name}</div>
            <div class="surveyor-id">${surveyor.id}</div>
          </div>
          <div class="status-badge ${statusClass}">${surveyor.status}</div>
        </div>
        <div class="card-details">✉️ ${surveyor.email}</div>
        <div class="card-details">📱 ${surveyor.mobile}</div>
        <div class="card-details">🏢 DC: ${dc ? dc.name : surveyor.dc}</div>
        <div class="card-details">📊 Total Surveys: ${surveyor.surveys_total} | Today: ${surveyor.surveys_today} | Accuracy: ${surveyor.average_accuracy}%</div>
        <div class="card-details">🕒 Last Active: ${surveyor.last_active}</div>
        <div class="card-actions">
          <button class="btn-small btn-view" onclick="viewSurveyorProfile('${surveyor.id}')">View Profile</button>
          <button class="btn-small btn-edit" onclick="editSurveyor('${surveyor.id}')">Edit</button>
          ${surveyor.status === 'Active' ? 
            `<button class="btn-small btn-deactivate" onclick="toggleSurveyorStatus('${surveyor.id}')">Deactivate</button>` :
            `<button class="btn-small btn-activate" onclick="toggleSurveyorStatus('${surveyor.id}')">Activate</button>`
          }
        </div>
      </div>
    `;
  }).join('');  
}

function openAddSurveyorModal() {
  document.getElementById('surveyor-modal-title').textContent = 'Add New Surveyor';
  document.getElementById('surveyor-form').reset();
  document.getElementById('surveyor-edit-id').value = '';
  
  // Generate new surveyor ID
  const newId = `SUR${String(surveyorCredentials.length + 1).padStart(3, '0')}`;
  document.getElementById('surveyor-id-input').value = newId;
  
  // Generate password
  const password = generatePassword();
  document.getElementById('surveyor-password-input').value = password;
  
  // Populate DCs
  const dcSelect = document.getElementById('surveyor-dc-input');
  dcSelect.innerHTML = '<option value="">-- Select DC --</option>';
  dcMasterData.forEach(dc => {
    const option = document.createElement('option');
    option.value = dc.code;
    option.textContent = `${dc.code} - ${dc.name}`;
    dcSelect.appendChild(option);
  });
  
  document.getElementById('surveyor-modal').classList.add('active');
}

function editSurveyor(surveyorId) {
  const surveyor = surveyorCredentials.find(s => s.id === surveyorId);
  if (!surveyor) return;
  
  document.getElementById('surveyor-modal-title').textContent = 'Edit Surveyor';
  document.getElementById('surveyor-edit-id').value = surveyor.id;
  document.getElementById('surveyor-id-input').value = surveyor.id;
  document.getElementById('surveyor-name-input').value = surveyor.name;
  document.getElementById('surveyor-email-input').value = surveyor.email;
  document.getElementById('surveyor-mobile-input').value = surveyor.mobile;
  document.getElementById('surveyor-status-input').value = surveyor.status;
  document.getElementById('surveyor-password-input').value = surveyor.password;
  
  // Populate DCs
  const dcSelect = document.getElementById('surveyor-dc-input');
  dcSelect.innerHTML = '<option value="">-- Select DC --</option>';
  dcMasterData.forEach(dc => {
    const option = document.createElement('option');
    option.value = dc.code;
    option.textContent = `${dc.code} - ${dc.name}`;
    if (dc.code === surveyor.dc) option.selected = true;
    dcSelect.appendChild(option);
  });
  
  document.getElementById('surveyor-modal').classList.add('active');
}

function saveSurveyor() {
  const editId = document.getElementById('surveyor-edit-id').value;
  const surveyorData = {
    id: document.getElementById('surveyor-id-input').value,
    name: document.getElementById('surveyor-name-input').value,
    email: document.getElementById('surveyor-email-input').value,
    mobile: document.getElementById('surveyor-mobile-input').value,
    dc: document.getElementById('surveyor-dc-input').value,
    status: document.getElementById('surveyor-status-input').value,
    password: document.getElementById('surveyor-password-input').value
  };
  
  // Validation
  if (!surveyorData.name || !surveyorData.email || !surveyorData.mobile || !surveyorData.dc) {
    alert('Please fill all required fields');
    return;
  }
  
  if (surveyorData.mobile.length !== 10) {
    alert('Mobile number must be 10 digits');
    return;
  }
  
  if (editId) {
    // Edit existing
    const index = surveyorCredentials.findIndex(s => s.id === editId);
    if (index !== -1) {
      surveyorCredentials[index] = { ...surveyorCredentials[index], ...surveyorData };
      alert(`Surveyor ${surveyorData.name} updated successfully!`);
    }
  } else {
    // Add new
    surveyorCredentials.push({
      ...surveyorData,
      surveys_total: 0,
      surveys_today: 0,
      surveys_week: 0,
      surveys_month: 0,
      last_active: 'Never',
      average_accuracy: 0,
      created_date: new Date().toLocaleDateString()
    });
    alert(`Surveyor ${surveyorData.name} created successfully!\nID: ${surveyorData.id}\nPassword: ${surveyorData.password}`);
  }
  
  closeSurveyorModal();
  renderSurveyorList();
}

function closeSurveyorModal() {
  document.getElementById('surveyor-modal').classList.remove('active');
}

function viewSurveyorProfile(surveyorId) {
  const surveyor = surveyorCredentials.find(s => s.id === surveyorId);
  if (!surveyor) return;
  
  const dc = getDCByCode(surveyor.dc);
  
  const profileHTML = `
    <div class="profile-section">
      <h4>Personal Information</h4>
      <div class="profile-item">
        <span class="profile-label">Surveyor ID:</span>
        <span class="profile-value">${surveyor.id}</span>
      </div>
      <div class="profile-item">
        <span class="profile-label">Name:</span>
        <span class="profile-value">${surveyor.name}</span>
      </div>
      <div class="profile-item">
        <span class="profile-label">Email:</span>
        <span class="profile-value">${surveyor.email}</span>
      </div>
      <div class="profile-item">
        <span class="profile-label">Mobile:</span>
        <span class="profile-value">${surveyor.mobile}</span>
      </div>
      <div class="profile-item">
        <span class="profile-label">Status:</span>
        <span class="profile-value"><span class="status-badge ${surveyor.status.toLowerCase()}">${surveyor.status}</span></span>
      </div>
    </div>
    
    <div class="profile-section">
      <h4>Assignment</h4>
      <div class="profile-item">
        <span class="profile-label">DC:</span>
        <span class="profile-value">${dc ? dc.name : surveyor.dc}</span>
      </div>
    </div>
    
    <div class="profile-section">
      <h4>Performance Statistics</h4>
      <div class="profile-item">
        <span class="profile-label">Total Surveys:</span>
        <span class="profile-value">${surveyor.surveys_total}</span>
      </div>
      <div class="profile-item">
        <span class="profile-label">Surveys Today:</span>
        <span class="profile-value">${surveyor.surveys_today}</span>
      </div>
      <div class="profile-item">
        <span class="profile-label">Surveys This Week:</span>
        <span class="profile-value">${surveyor.surveys_week}</span>
      </div>
      <div class="profile-item">
        <span class="profile-label">Surveys This Month:</span>
        <span class="profile-value">${surveyor.surveys_month}</span>
      </div>
      <div class="profile-item">
        <span class="profile-label">Average Accuracy:</span>
        <span class="profile-value">${surveyor.average_accuracy}%</span>
      </div>
    </div>
    
    <div class="profile-section">
      <h4>Account Information</h4>
      <div class="profile-item">
        <span class="profile-label">Created Date:</span>
        <span class="profile-value">${surveyor.created_date}</span>
      </div>
      <div class="profile-item">
        <span class="profile-label">Last Active:</span>
        <span class="profile-value">${surveyor.last_active}</span>
      </div>
    </div>
  `;
  
  document.getElementById('surveyor-profile-content').innerHTML = profileHTML;
  document.getElementById('surveyor-details-modal').classList.add('active');
  document.getElementById('surveyor-details-modal').dataset.surveyorId = surveyorId;
}

function closeSurveyorDetailsModal() {
  document.getElementById('surveyor-details-modal').classList.remove('active');
}

function editSurveyorFromProfile() {
  const surveyorId = document.getElementById('surveyor-details-modal').dataset.surveyorId;
  closeSurveyorDetailsModal();
  editSurveyor(surveyorId);
}

function resetSurveyorPassword() {
  const surveyorId = document.getElementById('surveyor-details-modal').dataset.surveyorId;
  const surveyor = surveyorCredentials.find(s => s.id === surveyorId);
  if (!surveyor) return;
  
  const newPassword = generatePassword();
  surveyor.password = newPassword;
  
  alert(`Password reset successful for ${surveyor.name}\nNew Password: ${newPassword}`);
  closeSurveyorDetailsModal();
}

function toggleSurveyorStatus(surveyorId) {
  const surveyor = surveyorCredentials.find(s => s.id === surveyorId);
  if (!surveyor) return;
  
  const newStatus = surveyor.status === 'Active' ? 'Inactive' : 'Active';
  const action = newStatus === 'Active' ? 'activate' : 'deactivate';
  
  if (confirm(`Are you sure you want to ${action} ${surveyor.name}?`)) {
    surveyor.status = newStatus;
    alert(`Surveyor ${surveyor.name} has been ${action}d successfully.`);
    renderSurveyorList();
  }
}

function generatePassword() {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let password = '';
  for (let i = 0; i < 8; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

// Reports & Analytics Functions
function showReportsAnalytics() {
  showScreen('admin-reports-screen');
  updateReportStats();
  renderReportCharts();
}

function updateReportStats() {
  const totalSurveys = surveyHistory.length;
  const totalConsumers = sampleConsumers.length;
  const surveyedConsumers = sampleConsumers.filter(c => c.survey_status === 'Surveyed').length;
  const completionRate = totalConsumers > 0 ? Math.round((surveyedConsumers / totalConsumers) * 100) : 0;
  
  // Calculate average accuracy
  const accuracies = surveyHistory.map(s => {
    const gpsAcc = parseFloat(s.surveyData.gpsLocation.accuracy);
    return isNaN(gpsAcc) ? 50 : gpsAcc;
  });
  const avgAccuracy = accuracies.length > 0 ? 
    Math.round((accuracies.filter(a => a <= 50).length / accuracies.length) * 100) : 0;
  
  // Calculate mobile collection rate
  const withMobile = surveyHistory.filter(s => s.surveyData.mobile && s.surveyData.mobile.length === 10).length;
  const mobileRate = totalSurveys > 0 ? Math.round((withMobile / totalSurveys) * 100) : 0;
  
  document.getElementById('report-total-surveys').textContent = totalSurveys;
  document.getElementById('report-completion-rate').textContent = `${completionRate}%`;
  document.getElementById('report-avg-accuracy').textContent = `${avgAccuracy}%`;
  document.getElementById('report-mobile-rate').textContent = `${mobileRate}%`;
}

function renderReportCharts() {
  // Destroy existing charts
  Object.values(reportCharts).forEach(chart => {
    if (chart) chart.destroy();
  });
  reportCharts = {};
  
  // Generate sample data for last 30 days
  const trendData = generateTrendData();
  const surveyorData = generateSurveyorData();
  const divisionData = generateDivisionData();
  const dcData = generateDCData();
  const gpsData = generateGPSData();
  
  // Chart colors
  const chartColors = ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545', '#D2BA4C', '#964325', '#944454', '#13343B'];
  
  // Trend Chart
  const trendCtx = document.getElementById('trendChart');
  if (trendCtx) {
    reportCharts.trend = new Chart(trendCtx, {
      type: 'line',
      data: {
        labels: trendData.labels,
        datasets: [{
          label: 'Surveys Completed',
          data: trendData.values,
          borderColor: chartColors[0],
          backgroundColor: chartColors[0] + '33',
          tension: 0.4,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: true,
            position: 'top'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1
            }
          }
        }
      }
    });
  }
  
  // Surveyor Chart
  const surveyorCtx = document.getElementById('surveyorChart');
  if (surveyorCtx) {
    reportCharts.surveyor = new Chart(surveyorCtx, {
      type: 'bar',
      data: {
        labels: surveyorData.labels,
        datasets: [{
          label: 'Surveys',
          data: surveyorData.values,
          backgroundColor: chartColors.slice(0, surveyorData.labels.length)
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        indexAxis: 'y',
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          x: {
            beginAtZero: true
          }
        }
      }
    });
  }
  
  // Division Chart
  const divisionCtx = document.getElementById('divisionChart');
  if (divisionCtx) {
    reportCharts.division = new Chart(divisionCtx, {
      type: 'pie',
      data: {
        labels: divisionData.labels,
        datasets: [{
          data: divisionData.values,
          backgroundColor: chartColors.slice(0, divisionData.labels.length)
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: true,
            position: 'bottom'
          }
        }
      }
    });
  }
  
  // DC Chart
  const dcCtx = document.getElementById('dcChart');
  if (dcCtx) {
    reportCharts.dc = new Chart(dcCtx, {
      type: 'bar',
      data: {
        labels: dcData.labels,
        datasets: [{
          label: 'Surveys by DC',
          data: dcData.values,
          backgroundColor: chartColors[0]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  
  // GPS Chart
  const gpsCtx = document.getElementById('gpsChart');
  if (gpsCtx) {
    reportCharts.gps = new Chart(gpsCtx, {
      type: 'bar',
      data: {
        labels: gpsData.labels,
        datasets: [{
          label: 'GPS Accuracy Distribution',
          data: gpsData.values,
          backgroundColor: [
            '#32b8c6',
            '#5D878F',
            '#f39c12',
            '#e74c3c'
          ]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}

function generateTrendData() {
  const labels = [];
  const values = [];
  
  // Generate last 30 days
  for (let i = 29; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
    
    // Count surveys for this date
    const dayStart = new Date(date.setHours(0, 0, 0, 0));
    const dayEnd = new Date(date.setHours(23, 59, 59, 999));
    const count = surveyHistory.filter(s => {
      const surveyDate = new Date(s.timestampISO);
      return surveyDate >= dayStart && surveyDate <= dayEnd;
    }).length;
    
    values.push(count);
  }
  
  return { labels, values };
}

function generateSurveyorData() {
  const surveyorCounts = {};
  
  surveyorCredentials.forEach(surveyor => {
    const count = surveyHistory.filter(s => s.surveyorId === surveyor.id).length;
    if (count > 0 || surveyor.status === 'Active') {
      surveyorCounts[surveyor.name] = count;
    }
  });
  
  const sorted = Object.entries(surveyorCounts).sort((a, b) => b[1] - a[1]);
  
  return {
    labels: sorted.map(s => s[0]),
    values: sorted.map(s => s[1])
  };
}

function generateDivisionData() {
  const dcCounts = {};
  
  dcMasterData.forEach(dc => {
    dcCounts[dc.name] = 0;
  });
  
  surveyHistory.forEach(survey => {
    const dcCode = survey.surveyData.dc;
    const dc = getDCByCode(dcCode);
    if (dc) {
      dcCounts[dc.name]++;
    }
  });
  
  // Filter out DCs with 0 surveys
  const filtered = Object.entries(dcCounts).filter(d => d[1] > 0);
  
  return {
    labels: filtered.map(d => d[0]),
    values: filtered.map(d => d[1])
  };
}

function generateDCData() {
  const feederCounts = {};
  
  surveyHistory.forEach(survey => {
    const feederCode = survey.surveyData.feeder;
    const feeder = getFeederByCode(feederCode);
    const feederName = feeder ? feeder.name : feederCode;
    feederCounts[feederName] = (feederCounts[feederName] || 0) + 1;
  });
  
  const sorted = Object.entries(feederCounts).sort((a, b) => b[1] - a[1]).slice(0, 10);
  
  return {
    labels: sorted.map(d => d[0]),
    values: sorted.map(d => d[1])
  };
}

function generateGPSData() {
  const ranges = {
    '0-10m': 0,
    '10-30m': 0,
    '30-50m': 0,
    '50m+': 0
  };
  
  surveyHistory.forEach(survey => {
    const accuracy = parseFloat(survey.surveyData.gpsLocation.accuracy);
    if (isNaN(accuracy)) return;
    
    if (accuracy <= 10) ranges['0-10m']++;
    else if (accuracy <= 30) ranges['10-30m']++;
    else if (accuracy <= 50) ranges['30-50m']++;
    else ranges['50m+']++;
  });
  
  return {
    labels: Object.keys(ranges),
    values: Object.values(ranges)
  };
}

function exportAllData() {
  const wb = XLSX.utils.book_new();
  
  // Survey Summary Sheet
  const surveyData = surveyHistory.map(s => ({
    'Reference': s.reference,
    'Date': new Date(s.timestampISO).toLocaleDateString(),
    'Time': new Date(s.timestampISO).toLocaleTimeString(),
    'Surveyor': s.surveyor,
    'Surveyor ID': s.surveyorId,
    'Consumer Number': s.consumer.consumer_no,
    'Consumer Name': s.consumer.name,
    'Mobile': s.surveyData.mobile || s.consumer.mobile,
    'DC': s.surveyData.dc,
    'Feeder': s.surveyData.feeder,
    'DTR': s.surveyData.dtr,
    'GPS Lat': s.surveyData.gpsLocation.latitude,
    'GPS Lng': s.surveyData.gpsLocation.longitude,
    'GPS Accuracy': s.surveyData.gpsLocation.accuracy,
    'Status': s.status
  }));
  
  const wsSurveys = XLSX.utils.json_to_sheet(surveyData);
  XLSX.utils.book_append_sheet(wb, wsSurveys, 'All Surveys');
  
  // Consumer Status Sheet
  const consumerData = sampleConsumers.map(c => ({
    'Consumer No': c.consumer_no,
    'Name': c.name,
    'Address': c.address,
    'Mobile': c.mobile,
    'Division': c.division,
    'DC': c.dc,
    'Survey Status': c.survey_status,
    'Last Survey Date': c.last_survey_date || 'N/A',
    'Last Surveyor': c.last_surveyor || 'N/A'
  }));
  
  const wsConsumers = XLSX.utils.json_to_sheet(consumerData);
  XLSX.utils.book_append_sheet(wb, wsConsumers, 'Consumer Status');
  
  // Surveyor Performance Sheet
  const surveyorData = surveyorCredentials.map(s => ({
    'Surveyor ID': s.id,
    'Name': s.name,
    'Email': s.email,
    'Mobile': s.mobile,
    'Division': s.division,
    'DC': s.dc,
    'Status': s.status,
    'Total Surveys': s.surveys_total,
    'Surveys Today': s.surveys_today,
    'Surveys This Week': s.surveys_week,
    'Surveys This Month': s.surveys_month,
    'Avg Accuracy': s.average_accuracy + '%',
    'Last Active': s.last_active
  }));
  
  const wsSurveyors = XLSX.utils.json_to_sheet(surveyorData);
  XLSX.utils.book_append_sheet(wb, wsSurveyors, 'Surveyor Performance');
  
  const fileName = `Survey_Report_Complete_${new Date().toISOString().split('T')[0]}.xlsx`;
  XLSX.writeFile(wb, fileName);
  
  alert('All data exported successfully!');
}

// DC Management Functions
function showDCManagement() {
  showScreen('admin-dc-screen');
  renderDCList();
}

function renderDCList() {
  const container = document.getElementById('dc-list');
  const searchTerm = document.getElementById('dc-search').value.toLowerCase();
  const statusFilter = document.getElementById('dc-status-filter').value;
  
  let filtered = dcMasterData;
  
  if (searchTerm) {
    filtered = filtered.filter(dc => 
      dc.code.toLowerCase().includes(searchTerm) ||
      dc.name.toLowerCase().includes(searchTerm)
    );
  }
  
  if (statusFilter) {
    filtered = filtered.filter(dc => dc.status === statusFilter);
  }
  
  if (filtered.length === 0) {
    container.innerHTML = '<div class="empty-state">No DCs found</div>';
    return;
  }
  
  container.innerHTML = filtered.map(dc => {
    const statusClass = dc.status.toLowerCase();
    const feedersCount = feederMasterData.filter(f => f.dc_code === dc.code).length;
    const consumersCount = sampleConsumers.filter(c => c.dc === dc.code).length;
    const surveyorsCount = surveyorCredentials.filter(s => s.dc === dc.code).length;
    
    return `
      <div class="surveyor-card">
        <div class="card-header">
          <div class="surveyor-info">
            <div class="surveyor-name">${dc.name}</div>
            <div class="surveyor-id">${dc.code}</div>
          </div>
          <div class="status-badge ${statusClass}">${dc.status}</div>
        </div>
        <div class="card-details">👤 Manager: ${dc.manager || 'N/A'}</div>
        <div class="card-details">📱 Contact: ${dc.contact || 'N/A'}</div>
        <div class="card-details">✉️ ${dc.email || 'N/A'}</div>
        <div class="card-details">📍 ${dc.address || 'N/A'}</div>
        <div class="card-details">⚡ Feeders: ${feedersCount} | 👥 Consumers: ${consumersCount} | 🔍 Surveyors: ${surveyorsCount}</div>
        <div class="card-actions">
          <button class="btn-small btn-view" onclick="viewDCDetails('${dc.code}')">View Details</button>
          <button class="btn-small btn-edit" onclick="editDC('${dc.code}')">Edit</button>
          ${dc.status === 'Active' ? 
            `<button class="btn-small btn-deactivate" onclick="toggleDCStatus('${dc.code}')">Deactivate</button>` :
            `<button class="btn-small btn-activate" onclick="toggleDCStatus('${dc.code}')">Activate</button>`
          }
        </div>
      </div>
    `;
  }).join('');
}

function openAddDCModal() {
  document.getElementById('dc-modal-title').textContent = 'Add New DC';
  document.getElementById('dc-form').reset();
  document.getElementById('dc-edit-code').value = '';
  document.getElementById('dc-modal').classList.add('active');
}

function editDC(dcCode) {
  const dc = getDCByCode(dcCode);
  if (!dc) return;
  
  document.getElementById('dc-modal-title').textContent = 'Edit DC';
  document.getElementById('dc-edit-code').value = dc.code;
  document.getElementById('dc-code-input').value = dc.code;
  document.getElementById('dc-code-input').readOnly = true; // Can't change code when editing
  document.getElementById('dc-name-input').value = dc.name;
  document.getElementById('dc-manager-input').value = dc.manager || '';
  document.getElementById('dc-contact-person-input').value = dc.contact_person || '';
  document.getElementById('dc-phone-input').value = dc.contact || '';
  document.getElementById('dc-email-input').value = dc.email || '';
  document.getElementById('dc-address-input').value = dc.address || '';
  document.getElementById('dc-status-input').value = dc.status;
  document.getElementById('dc-modal').classList.add('active');
}

function saveDC() {
  const editCode = document.getElementById('dc-edit-code').value;
  const dcData = {
    code: document.getElementById('dc-code-input').value.trim(),
    name: document.getElementById('dc-name-input').value.trim(),
    manager: document.getElementById('dc-manager-input').value.trim(),
    contact_person: document.getElementById('dc-contact-person-input').value.trim(),
    contact: document.getElementById('dc-phone-input').value.trim(),
    email: document.getElementById('dc-email-input').value.trim(),
    address: document.getElementById('dc-address-input').value.trim(),
    status: document.getElementById('dc-status-input').value
  };
  
  // Validation
  if (!dcData.code || !dcData.name) {
    alert('Please fill in DC Code and Name (required fields)');
    return;
  }
  
  if (editCode) {
    // Edit existing
    const index = dcMasterData.findIndex(dc => dc.code === editCode);
    if (index !== -1) {
      dcMasterData[index] = { ...dcMasterData[index], ...dcData };
      alert(`DC ${dcData.name} updated successfully!`);
    }
  } else {
    // Add new - check for duplicate
    if (dcMasterData.find(dc => dc.code === dcData.code)) {
      alert('Error: DC Code already exists. Please use a unique code.');
      return;
    }
    dcMasterData.push(dcData);
    alert(`DC ${dcData.name} created successfully!`);
  }
  
  closeDCModal();
  renderDCList();
  updateMasterDataStats();
}

function closeDCModal() {
  document.getElementById('dc-modal').classList.remove('active');
  document.getElementById('dc-code-input').readOnly = false;
}

function viewDCDetails(dcCode) {
  const dc = getDCByCode(dcCode);
  if (!dc) return;
  
  const feeders = feederMasterData.filter(f => f.dc_code === dc.code);
  const consumers = sampleConsumers.filter(c => c.dc === dc.code);
  const surveyors = surveyorCredentials.filter(s => s.dc === dc.code);
  
  alert(`DC Details: ${dc.name}\n\nCode: ${dc.code}\nManager: ${dc.manager || 'N/A'}\nContact: ${dc.contact || 'N/A'}\n\nFeeders: ${feeders.length}\nConsumers: ${consumers.length}\nSurveyors: ${surveyors.length}`);
}

function toggleDCStatus(dcCode) {
  const dc = getDCByCode(dcCode);
  if (!dc) return;
  
  const newStatus = dc.status === 'Active' ? 'Inactive' : 'Active';
  const action = newStatus === 'Active' ? 'activate' : 'deactivate';
  
  if (confirm(`Are you sure you want to ${action} ${dc.name}?`)) {
    dc.status = newStatus;
    alert(`DC ${dc.name} has been ${action}d successfully.`);
    renderDCList();
  }
}

// Feeder Management Functions
function showFeederManagement() {
  showScreen('admin-feeder-screen');
  populateFeederFilters();
  renderFeederList();
}

function populateFeederFilters() {
  const dcFilter = document.getElementById('feeder-dc-filter');
  dcFilter.innerHTML = '<option value="">All DCs</option>';
  dcMasterData.forEach(dc => {
    const option = document.createElement('option');
    option.value = dc.code;
    option.textContent = `${dc.code} - ${dc.name}`;
    dcFilter.appendChild(option);
  });
}

function renderFeederList() {
  const container = document.getElementById('feeder-list');
  const searchTerm = document.getElementById('feeder-search').value.toLowerCase();
  const dcFilter = document.getElementById('feeder-dc-filter').value;
  const statusFilter = document.getElementById('feeder-status-filter').value;
  
  let filtered = feederMasterData;
  
  if (searchTerm) {
    filtered = filtered.filter(f => 
      f.code.toLowerCase().includes(searchTerm) ||
      f.name.toLowerCase().includes(searchTerm)
    );
  }
  
  if (dcFilter) {
    filtered = filtered.filter(f => f.dc_code === dcFilter);
  }
  
  if (statusFilter) {
    filtered = filtered.filter(f => f.status === statusFilter);
  }
  
  if (filtered.length === 0) {
    container.innerHTML = '<div class="empty-state">No feeders found</div>';
    return;
  }
  
  container.innerHTML = filtered.map(feeder => {
    const statusClass = feeder.status.toLowerCase();
    const dc = getDCByCode(feeder.dc_code);
    const dtrsCount = transformers.filter(t => t.feeder_code === feeder.code).length;
    const consumersCount = sampleConsumers.filter(c => c.feeder_assigned === feeder.code).length;
    
    return `
      <div class="surveyor-card">
        <div class="card-header">
          <div class="surveyor-info">
            <div class="surveyor-name">${feeder.name}</div>
            <div class="surveyor-id">${feeder.code}</div>
          </div>
          <div class="status-badge ${statusClass}">${feeder.status}</div>
        </div>
        <div class="card-details">🏢 DC: ${dc ? dc.name : feeder.dc_code}</div>
        <div class="card-details">⚡ Voltage: ${feeder.voltage_level || 'N/A'} | Length: ${feeder.line_length_km || 'N/A'} km</div>
        <div class="card-details">📝 ${feeder.description || 'No description'}</div>
        <div class="card-details">🔌 DTRs: ${dtrsCount} | 👥 Consumers: ${consumersCount}</div>
        <div class="card-actions">
          <button class="btn-small btn-view" onclick="viewFeederDetails('${feeder.code}')">View Details</button>
          <button class="btn-small btn-edit" onclick="editFeeder('${feeder.code}')">Edit</button>
          ${feeder.status === 'Active' ? 
            `<button class="btn-small btn-deactivate" onclick="toggleFeederStatus('${feeder.code}')">Deactivate</button>` :
            `<button class="btn-small btn-activate" onclick="toggleFeederStatus('${feeder.code}')">Activate</button>`
          }
        </div>
      </div>
    `;
  }).join('');
}

function openAddFeederModal() {
  document.getElementById('feeder-modal-title').textContent = 'Add New Feeder';
  document.getElementById('feeder-form').reset();
  document.getElementById('feeder-edit-code').value = '';
  
  // Populate DCs
  const dcSelect = document.getElementById('feeder-dc-input');
  dcSelect.innerHTML = '<option value="">-- Select DC --</option>';
  dcMasterData.forEach(dc => {
    const option = document.createElement('option');
    option.value = dc.code;
    option.textContent = `${dc.code} - ${dc.name}`;
    dcSelect.appendChild(option);
  });
  
  document.getElementById('feeder-modal').classList.add('active');
}

function editFeeder(feederCode) {
  const feeder = getFeederByCode(feederCode);
  if (!feeder) return;
  
  document.getElementById('feeder-modal-title').textContent = 'Edit Feeder';
  document.getElementById('feeder-edit-code').value = feeder.code;
  document.getElementById('feeder-code-input').value = feeder.code;
  document.getElementById('feeder-code-input').readOnly = true;
  document.getElementById('feeder-name-input').value = feeder.name;
  document.getElementById('feeder-description-input').value = feeder.description || '';
  document.getElementById('feeder-voltage-input').value = feeder.voltage_level || '';
  document.getElementById('feeder-length-input').value = feeder.line_length_km || '';
  document.getElementById('feeder-status-input').value = feeder.status;
  
  // Populate DCs
  const dcSelect = document.getElementById('feeder-dc-input');
  dcSelect.innerHTML = '<option value="">-- Select DC --</option>';
  dcMasterData.forEach(dc => {
    const option = document.createElement('option');
    option.value = dc.code;
    option.textContent = `${dc.code} - ${dc.name}`;
    if (dc.code === feeder.dc_code) option.selected = true;
    dcSelect.appendChild(option);
  });
  
  document.getElementById('feeder-modal').classList.add('active');
}

function saveFeeder() {
  const editCode = document.getElementById('feeder-edit-code').value;
  const feederData = {
    code: document.getElementById('feeder-code-input').value.trim(),
    name: document.getElementById('feeder-name-input').value.trim(),
    dc_code: document.getElementById('feeder-dc-input').value,
    description: document.getElementById('feeder-description-input').value.trim(),
    voltage_level: document.getElementById('feeder-voltage-input').value,
    line_length_km: parseFloat(document.getElementById('feeder-length-input').value) || null,
    status: document.getElementById('feeder-status-input').value
  };
  
  // Validation
  if (!feederData.code || !feederData.name || !feederData.dc_code) {
    alert('Please fill in Feeder Code, Name, and DC (required fields)');
    return;
  }
  
  if (editCode) {
    // Edit existing
    const index = feederMasterData.findIndex(f => f.code === editCode);
    if (index !== -1) {
      feederMasterData[index] = { ...feederMasterData[index], ...feederData };
      alert(`Feeder ${feederData.name} updated successfully!`);
    }
  } else {
    // Add new - check for duplicate
    if (feederMasterData.find(f => f.code === feederData.code)) {
      alert('Error: Feeder Code already exists. Please use a unique code.');
      return;
    }
    feederMasterData.push(feederData);
    alert(`Feeder ${feederData.name} created successfully!`);
  }
  
  closeFeederModal();
  renderFeederList();
  updateMasterDataStats();
}

function closeFeederModal() {
  document.getElementById('feeder-modal').classList.remove('active');
  document.getElementById('feeder-code-input').readOnly = false;
}

function viewFeederDetails(feederCode) {
  const feeder = getFeederByCode(feederCode);
  if (!feeder) return;
  
  const dc = getDCByCode(feeder.dc_code);
  const dtrs = transformers.filter(t => t.feeder_code === feeder.code);
  const consumers = sampleConsumers.filter(c => c.feeder_assigned === feeder.code);
  
  alert(`Feeder Details: ${feeder.name}\n\nCode: ${feeder.code}\nDC: ${dc ? dc.name : feeder.dc_code}\nVoltage: ${feeder.voltage_level || 'N/A'}\nLength: ${feeder.line_length_km || 'N/A'} km\n\nDTRs: ${dtrs.length}\nConsumers: ${consumers.length}`);
}

function toggleFeederStatus(feederCode) {
  const feeder = getFeederByCode(feederCode);
  if (!feeder) return;
  
  const newStatus = feeder.status === 'Active' ? 'Inactive' : 'Active';
  const action = newStatus === 'Active' ? 'activate' : 'deactivate';
  
  if (confirm(`Are you sure you want to ${action} ${feeder.name}?`)) {
    feeder.status = newStatus;
    alert(`Feeder ${feeder.name} has been ${action}d successfully.`);
    renderFeederList();
  }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', initApp);