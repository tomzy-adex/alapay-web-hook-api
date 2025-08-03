const axios = require('axios');

// Configuration
const API_BASE_URL = 'http://localhost:3000/hmo';
const ADMIN_TOKEN = 'your-admin-token'; // Replace with actual admin token
const ADMIN_ID = 'd3b07384-d9a0-4f5c-a3dd-9b3786cb1df0'; // Replace with actual admin ID

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Authorization': `Bearer ${ADMIN_TOKEN}`,
    'Content-Type': 'application/json'
  },
  timeout: 10000
});

// Utility function to handle API responses
function handleResponse(response, operation) {
  console.log(`✅ ${operation} successful:`, response.data);
  return response.data;
}

function handleError(error, operation) {
  console.error(`❌ ${operation} failed:`, {
    status: error.response?.status,
    message: error.response?.data?.message || error.message
  });
  throw error;
}

// HMO Management Functions
async function createHMO() {
  try {
    const hmoData = {
      name: 'HealthCare Plus',
      email: 'contact@healthcareplus.com',
      phoneNumber: '+2348012345678',
      address: '123 Healthcare Street, Lagos, Nigeria',
      image: 'https://example.com/healthcare-plus-logo.png'
    };
    
    const response = await api.post('/', hmoData);
    return handleResponse(response, 'Create HMO');
  } catch (error) {
    handleError(error, 'Create HMO');
  }
}

async function getAllHMOs() {
  try {
    const response = await api.get('/', {
      params: {
        adminId: ADMIN_ID,
        page: 1,
        limit: 10
      }
    });
    return handleResponse(response, 'Get All HMOs');
  } catch (error) {
    handleError(error, 'Get All HMOs');
  }
}

async function getHMOById(hmoId) {
  try {
    const response = await api.get(`/${hmoId}`, {
      params: {
        adminId: ADMIN_ID,
        hmoId: hmoId
      }
    });
    return handleResponse(response, 'Get HMO by ID');
  } catch (error) {
    handleError(error, 'Get HMO by ID');
  }
}

async function updateHMO(hmoId) {
  try {
    const updateData = {
      name: 'HealthCare Plus Updated',
      email: 'newcontact@healthcareplus.com',
      phoneNumber: '+2348012345679',
      address: '456 New Healthcare Street, Lagos, Nigeria',
      image: 'https://example.com/healthcare-plus-logo-updated.png'
    };
    
    const response = await api.put(`/${hmoId}`, updateData);
    return handleResponse(response, 'Update HMO');
  } catch (error) {
    handleError(error, 'Update HMO');
  }
}

// Healthcare Plans Functions
async function createHealthcarePlan(hmoId) {
  try {
    const planData = {
      name: 'Premium Health Plan',
      description: 'Comprehensive health coverage with premium benefits',
      coverageType: 'COMPREHENSIVE',
      premiumAmount: 50000,
      coverageLimit: 1000000,
      deductible: 10000,
      coPayPercentage: 20,
      features: ['Dental', 'Vision', 'Mental Health'],
      exclusions: ['Cosmetic Surgery', 'Experimental Treatments'],
      waitingPeriod: 30,
      renewalTerms: 'Annual renewal with 30-day notice'
    };
    
    const response = await api.post(`/${hmoId}/plans`, planData);
    return handleResponse(response, 'Create Healthcare Plan');
  } catch (error) {
    handleError(error, 'Create Healthcare Plan');
  }
}

async function getHealthcarePlans(hmoId) {
  try {
    const response = await api.get(`/${hmoId}/plans`, {
      params: {
        adminId: ADMIN_ID,
        page: 1,
        limit: 10
      }
    });
    return handleResponse(response, 'Get Healthcare Plans');
  } catch (error) {
    handleError(error, 'Get Healthcare Plans');
  }
}

// Account Tiers Functions
async function createAccountTier(hmoId) {
  try {
    const tierData = {
      name: 'Gold Tier',
      description: 'Premium account tier with enhanced benefits',
      benefits: ['Priority Support', 'Extended Coverage', 'Lower Deductibles'],
      requirements: ['Minimum 6 months enrollment', 'No claims in last 3 months'],
      discountPercentage: 15,
      annualFee: 25000
    };
    
    const response = await api.post(`/${hmoId}/account-tiers`, tierData);
    return handleResponse(response, 'Create Account Tier');
  } catch (error) {
    handleError(error, 'Create Account Tier');
  }
}

async function getAccountTiers(hmoId) {
  try {
    const response = await api.get(`/${hmoId}/account-tiers`, {
      params: {
        adminId: ADMIN_ID,
        page: 1,
        limit: 10
      }
    });
    return handleResponse(response, 'Get Account Tiers');
  } catch (error) {
    handleError(error, 'Get Account Tiers');
  }
}

// Dashboard Functions
async function getDashboard(hmoId) {
  try {
    const response = await api.get(`/${hmoId}/dashboard`, {
      params: {
        adminId: ADMIN_ID,
        startDate: '2024-01-01',
        endDate: '2024-01-31'
      }
    });
    return handleResponse(response, 'Get Dashboard');
  } catch (error) {
    handleError(error, 'Get Dashboard');
  }
}

// Hospital Management Functions
async function getHospitals(hmoId) {
  try {
    const response = await api.get(`/${hmoId}/hospitals`, {
      params: {
        adminId: ADMIN_ID,
        page: 1,
        limit: 10
      }
    });
    return handleResponse(response, 'Get Hospitals');
  } catch (error) {
    handleError(error, 'Get Hospitals');
  }
}

async function associateHospital(hmoId, hospitalId) {
  try {
    const response = await api.post(`/${hmoId}/hospitals/${hospitalId}`);
    return handleResponse(response, 'Associate Hospital');
  } catch (error) {
    handleError(error, 'Associate Hospital');
  }
}

// Enrollment Functions
async function getEnrollments(hmoId) {
  try {
    const response = await api.get(`/${hmoId}/enrollments`, {
      params: {
        adminId: ADMIN_ID,
        page: 1,
        limit: 10
      }
    });
    return handleResponse(response, 'Get Enrollments');
  } catch (error) {
    handleError(error, 'Get Enrollments');
  }
}

// Main test function
async function runTests() {
  console.log('🚀 Starting HMO API Tests...\n');
  
  try {
    // Test 1: Create HMO
    console.log('📝 Test 1: Creating HMO...');
    const hmo = await createHMO();
    const hmoId = hmo.id;
    
    // Test 2: Get All HMOs
    console.log('\n📋 Test 2: Getting all HMOs...');
    await getAllHMOs();
    
    // Test 3: Get HMO by ID
    console.log('\n🔍 Test 3: Getting HMO by ID...');
    await getHMOById(hmoId);
    
    // Test 4: Update HMO
    console.log('\n✏️ Test 4: Updating HMO...');
    await updateHMO(hmoId);
    
    // Test 5: Create Healthcare Plan
    console.log('\n🏥 Test 5: Creating Healthcare Plan...');
    const plan = await createHealthcarePlan(hmoId);
    
    // Test 6: Get Healthcare Plans
    console.log('\n📋 Test 6: Getting Healthcare Plans...');
    await getHealthcarePlans(hmoId);
    
    // Test 7: Create Account Tier
    console.log('\n⭐ Test 7: Creating Account Tier...');
    await createAccountTier(hmoId);
    
    // Test 8: Get Account Tiers
    console.log('\n📋 Test 8: Getting Account Tiers...');
    await getAccountTiers(hmoId);
    
    // Test 9: Get Dashboard
    console.log('\n📊 Test 9: Getting Dashboard...');
    await getDashboard(hmoId);
    
    // Test 10: Get Hospitals
    console.log('\n🏥 Test 10: Getting Hospitals...');
    await getHospitals(hmoId);
    
    // Test 11: Get Enrollments
    console.log('\n📋 Test 11: Getting Enrollments...');
    await getEnrollments(hmoId);
    
    console.log('\n✅ All tests completed successfully!');
    
  } catch (error) {
    console.error('\n❌ Test suite failed:', error.message);
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  // Check if required environment variables are set
  if (ADMIN_TOKEN === 'your-admin-token') {
    console.error('❌ Please set ADMIN_TOKEN in the script before running tests');
    process.exit(1);
  }
  
  if (ADMIN_ID === 'd3b07384-d9a0-4f5c-a3dd-9b3786cb1df0') {
    console.error('❌ Please set ADMIN_ID in the script before running tests');
    process.exit(1);
  }
  
  runTests();
}

// Export functions for use in other modules
module.exports = {
  createHMO,
  getAllHMOs,
  getHMOById,
  updateHMO,
  createHealthcarePlan,
  getHealthcarePlans,
  createAccountTier,
  getAccountTiers,
  getDashboard,
  getHospitals,
  associateHospital,
  getEnrollments
}; 