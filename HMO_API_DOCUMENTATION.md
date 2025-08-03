# HMO API Documentation

## Overview

The HMO (Health Maintenance Organization) API provides comprehensive management capabilities for healthcare organizations, including HMO management, healthcare plans, account tiers, hospital associations, and analytics.

## Base URL
```
http://localhost:3000/hmo
```

## Authentication
All endpoints require admin authentication. Include the Bearer token in the Authorization header:
```
Authorization: Bearer <your-admin-token>
```

## API Endpoints

### 1. HMO Management

#### Create HMO
**POST** `/hmo`

Creates a new HMO organization.

**Request Body:**
```json
{
  "name": "HealthCare Plus",
  "email": "contact@healthcareplus.com",
  "phoneNumber": "+2348012345678",
  "address": "123 Healthcare Street, Lagos, Nigeria",
  "image": "https://example.com/hmo-logo.png"
}
```

**Response (201):**
```json
{
  "id": "d3b07384-d9a0-4f5c-a3dd-9b3786cb1df0",
  "name": "HealthCare Plus",
  "email": "contact@healthcareplus.com",
  "phoneNumber": "+2348012345678",
  "address": "123 Healthcare Street, Lagos, Nigeria",
  "image": "https://example.com/hmo-logo.png",
  "status": "PENDING",
  "accountStatus": "DORMANT",
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

#### Get All HMOs
**GET** `/hmo`

Retrieves all HMOs with pagination and filtering.

**Query Parameters:**
- `adminId` (required): Admin user ID
- `hmoId` (optional): Filter by specific HMO ID
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `search` (optional): Search term for name, email, or phone
- `sortBy` (optional): Field to sort by
- `sortOrder` (optional): ASC or DESC

**Example Request:**
```
GET /hmo?adminId=d3b07384-d9a0-4f5c-a3dd-9b3786cb1df0&page=1&limit=10&search=HealthCare
```

**Response (200):**
```json
{
  "data": [
    {
      "id": "d3b07384-d9a0-4f5c-a3dd-9b3786cb1df0",
      "name": "HealthCare Plus",
      "email": "contact@healthcareplus.com",
      "phoneNumber": "+2348012345678",
      "address": "123 Healthcare Street, Lagos, Nigeria",
      "image": "https://example.com/hmo-logo.png",
      "status": "PENDING",
      "accountStatus": "DORMANT",
      "plans": [],
      "accountTiers": [],
      "hospitals": [],
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "totalPages": 1
  }
}
```

#### Get HMO by ID
**GET** `/hmo/:id`

Retrieves a specific HMO by ID.

**Query Parameters:**
- `adminId` (required): Admin user ID
- `hmoId` (required): HMO ID

**Example Request:**
```
GET /hmo/d3b07384-d9a0-4f5c-a3dd-9b3786cb1df0?adminId=d3b07384-d9a0-4f5c-a3dd-9b3786cb1df0&hmoId=d3b07384-d9a0-4f5c-a3dd-9b3786cb1df0
```

**Response (200):**
```json
{
  "id": "d3b07384-d9a0-4f5c-a3dd-9b3786cb1df0",
  "name": "HealthCare Plus",
  "email": "contact@healthcareplus.com",
  "phoneNumber": "+2348012345678",
  "address": "123 Healthcare Street, Lagos, Nigeria",
  "image": "https://example.com/hmo-logo.png",
  "status": "PENDING",
  "accountStatus": "DORMANT",
  "plans": [],
  "accountTiers": [],
  "hospitals": [],
  "organizations": [],
  "providerClaims": [],
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

#### Update HMO
**PUT** `/hmo/:id`

Updates an existing HMO.

**Request Body:**
```json
{
  "name": "HealthCare Plus Updated",
  "email": "newcontact@healthcareplus.com",
  "phoneNumber": "+2348012345679",
  "address": "456 New Healthcare Street, Lagos, Nigeria",
  "image": "https://example.com/hmo-logo-updated.png"
}
```

**Response (200):**
```json
{
  "id": "d3b07384-d9a0-4f5c-a3dd-9b3786cb1df0",
  "name": "HealthCare Plus Updated",
  "email": "newcontact@healthcareplus.com",
  "phoneNumber": "+2348012345679",
  "address": "456 New Healthcare Street, Lagos, Nigeria",
  "image": "https://example.com/hmo-logo-updated.png",
  "status": "PENDING",
  "accountStatus": "DORMANT",
  "updatedAt": "2024-01-15T11:30:00Z"
}
```

#### Delete HMO
**DELETE** `/hmo/:id`

Deletes an HMO.

**Response (204):** No content

### 2. Healthcare Plans Management

#### Create Healthcare Plan
**POST** `/hmo/:hmoId/plans`

Creates a new healthcare plan for an HMO.

**Request Body:**
```json
{
  "name": "Premium Health Plan",
  "description": "Comprehensive health coverage with premium benefits",
  "coverageType": "COMPREHENSIVE",
  "premiumAmount": 50000,
  "coverageLimit": 1000000,
  "deductible": 10000,
  "coPayPercentage": 20,
  "features": ["Dental", "Vision", "Mental Health"],
  "exclusions": ["Cosmetic Surgery", "Experimental Treatments"],
  "waitingPeriod": 30,
  "renewalTerms": "Annual renewal with 30-day notice"
}
```

**Response (201):**
```json
{
  "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "name": "Premium Health Plan",
  "description": "Comprehensive health coverage with premium benefits",
  "coverageType": "COMPREHENSIVE",
  "premiumAmount": 50000,
  "coverageLimit": 1000000,
  "deductible": 10000,
  "coPayPercentage": 20,
  "features": ["Dental", "Vision", "Mental Health"],
  "exclusions": ["Cosmetic Surgery", "Experimental Treatments"],
  "waitingPeriod": 30,
  "renewalTerms": "Annual renewal with 30-day notice",
  "hmo": {
    "id": "d3b07384-d9a0-4f5c-a3dd-9b3786cb1df0",
    "name": "HealthCare Plus"
  },
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

#### Get Healthcare Plans
**GET** `/hmo/:hmoId/plans`

Retrieves all healthcare plans for an HMO.

**Query Parameters:**
- `adminId` (required): Admin user ID
- `page` (optional): Page number
- `limit` (optional): Items per page
- `search` (optional): Search term
- `sortBy` (optional): Field to sort by
- `sortOrder` (optional): ASC or DESC

**Example Request:**
```
GET /hmo/d3b07384-d9a0-4f5c-a3dd-9b3786cb1df0/plans?adminId=d3b07384-d9a0-4f5c-a3dd-9b3786cb1df0&page=1&limit=10
```

#### Get Healthcare Plan by ID
**GET** `/hmo/:hmoId/plans/:planId`

Retrieves a specific healthcare plan.

**Query Parameters:**
- `adminId` (required): Admin user ID
- `hmoId` (required): HMO ID
- `planId` (required): Plan ID

#### Update Healthcare Plan
**PUT** `/hmo/:hmoId/plans/:planId`

Updates a healthcare plan.

#### Delete Healthcare Plan
**DELETE** `/hmo/:hmoId/plans/:planId`

Deletes a healthcare plan.

### 3. Account Tiers Management

#### Create Account Tier
**POST** `/hmo/:hmoId/account-tiers`

Creates a new account tier for an HMO.

**Request Body:**
```json
{
  "name": "Gold Tier",
  "description": "Premium account tier with enhanced benefits",
  "benefits": ["Priority Support", "Extended Coverage", "Lower Deductibles"],
  "requirements": ["Minimum 6 months enrollment", "No claims in last 3 months"],
  "discountPercentage": 15,
  "annualFee": 25000
}
```

#### Get Account Tiers
**GET** `/hmo/:hmoId/account-tiers`

Retrieves all account tiers for an HMO.

#### Get Account Tier by ID
**GET** `/hmo/:hmoId/account-tiers/:tierId`

Retrieves a specific account tier.

#### Update Account Tier
**PUT** `/hmo/:hmoId/account-tiers/:tierId`

Updates an account tier.

#### Delete Account Tier
**DELETE** `/hmo/:hmoId/account-tiers/:tierId`

Deletes an account tier.

### 4. Dashboard and Analytics

#### Get Dashboard Data
**GET** `/hmo/:hmoId/dashboard`

Retrieves comprehensive dashboard data for an HMO.

**Query Parameters:**
- `adminId` (required): Admin user ID
- `startDate` (optional): Start date for analytics
- `endDate` (optional): End date for analytics

**Example Request:**
```
GET /hmo/d3b07384-d9a0-4f5c-a3dd-9b3786cb1df0/dashboard?adminId=d3b07384-d9a0-4f5c-a3dd-9b3786cb1df0&startDate=2024-01-01&endDate=2024-01-31
```

**Response (200):**
```json
{
  "hmoId": "d3b07384-d9a0-4f5c-a3dd-9b3786cb1df0",
  "summary": {
    "totalPlans": 5,
    "totalAccountTiers": 3,
    "totalHospitals": 25,
    "totalSubscriptions": 1500,
    "activeSubscriptions": 1200,
    "inactiveSubscriptions": 300
  },
  "preAuthRequests": {
    "total": 450,
    "approved": 380,
    "rejected": 45,
    "pending": 25
  },
  "recentActivity": {
    "lastUpdated": "2024-01-15T12:00:00Z"
  }
}
```

### 5. Enrollment Management

#### Get Enrollments
**GET** `/hmo/:hmoId/enrollments`

Retrieves provider enrollments for an HMO.

**Query Parameters:**
- `adminId` (required): Admin user ID
- `page` (optional): Page number
- `limit` (optional): Items per page
- `status` (optional): Filter by status
- `startDate` (optional): Start date filter
- `endDate` (optional): End date filter

### 6. Hospital Management

#### Get Hospitals
**GET** `/hmo/:hmoId/hospitals`

Retrieves hospitals associated with an HMO.

**Query Parameters:**
- `adminId` (required): Admin user ID
- `page` (optional): Page number
- `limit` (optional): Items per page
- `search` (optional): Search term
- `sortBy` (optional): Field to sort by
- `sortOrder` (optional): ASC or DESC

#### Associate Hospital
**POST** `/hmo/:hmoId/hospitals/:hospitalId`

Associates a hospital with an HMO.

**Response (201):** No content

#### Remove Hospital Association
**DELETE** `/hmo/:hmoId/hospitals/:hospitalId`

Removes hospital association with an HMO.

**Response (204):** No content

## Error Responses

### 400 Bad Request
```json
{
  "statusCode": 400,
  "message": ["Phone number must be in international format (e.g., +2348012345678)"],
  "error": "Bad Request"
}
```

### 401 Unauthorized
```json
{
  "statusCode": 401,
  "message": "Unauthorized",
  "error": "Unauthorized"
}
```

### 404 Not Found
```json
{
  "statusCode": 404,
  "message": "HMO with ID d3b07384-d9a0-4f5c-a3dd-9b3786cb1df0 not found",
  "error": "Not Found"
}
```

## Usage Examples

### JavaScript/Node.js Example
```javascript
const axios = require('axios');

const API_BASE_URL = 'http://localhost:3000/hmo';
const ADMIN_TOKEN = 'your-admin-token';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Authorization': `Bearer ${ADMIN_TOKEN}`,
    'Content-Type': 'application/json'
  }
});

// Create HMO
async function createHMO() {
  try {
    const response = await api.post('/', {
      name: 'HealthCare Plus',
      email: 'contact@healthcareplus.com',
      phoneNumber: '+2348012345678',
      address: '123 Healthcare Street, Lagos, Nigeria',
      image: 'https://example.com/hmo-logo.png'
    });
    console.log('HMO created:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating HMO:', error.response.data);
  }
}

// Get all HMOs
async function getAllHMOs() {
  try {
    const response = await api.get('/', {
      params: {
        adminId: 'd3b07384-d9a0-4f5c-a3dd-9b3786cb1df0',
        page: 1,
        limit: 10
      }
    });
    console.log('HMOs:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching HMOs:', error.response.data);
  }
}

// Create healthcare plan
async function createHealthcarePlan(hmoId) {
  try {
    const response = await api.post(`/${hmoId}/plans`, {
      name: 'Premium Health Plan',
      description: 'Comprehensive health coverage',
      coverageType: 'COMPREHENSIVE',
      premiumAmount: 50000,
      coverageLimit: 1000000,
      deductible: 10000,
      coPayPercentage: 20
    });
    console.log('Healthcare plan created:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating healthcare plan:', error.response.data);
  }
}

// Get dashboard data
async function getDashboard(hmoId) {
  try {
    const response = await api.get(`/${hmoId}/dashboard`, {
      params: {
        adminId: 'd3b07384-d9a0-4f5c-a3dd-9b3786cb1df0',
        startDate: '2024-01-01',
        endDate: '2024-01-31'
      }
    });
    console.log('Dashboard data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard:', error.response.data);
  }
}
```

### cURL Examples

#### Create HMO
```bash
curl -X POST http://localhost:3000/hmo \
  -H "Authorization: Bearer your-admin-token" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "HealthCare Plus",
    "email": "contact@healthcareplus.com",
    "phoneNumber": "+2348012345678",
    "address": "123 Healthcare Street, Lagos, Nigeria",
    "image": "https://example.com/hmo-logo.png"
  }'
```

#### Get All HMOs
```bash
curl -X GET "http://localhost:3000/hmo?adminId=d3b07384-d9a0-4f5c-a3dd-9b3786cb1df0&page=1&limit=10" \
  -H "Authorization: Bearer your-admin-token"
```

#### Create Healthcare Plan
```bash
curl -X POST http://localhost:3000/hmo/d3b07384-d9a0-4f5c-a3dd-9b3786cb1df0/plans \
  -H "Authorization: Bearer your-admin-token" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Premium Health Plan",
    "description": "Comprehensive health coverage",
    "coverageType": "COMPREHENSIVE",
    "premiumAmount": 50000,
    "coverageLimit": 1000000,
    "deductible": 10000,
    "coPayPercentage": 20
  }'
```

#### Get Dashboard
```bash
curl -X GET "http://localhost:3000/hmo/d3b07384-d9a0-4f5c-a3dd-9b3786cb1df0/dashboard?adminId=d3b07384-d9a0-4f5c-a3dd-9b3786cb1df0&startDate=2024-01-01&endDate=2024-01-31" \
  -H "Authorization: Bearer your-admin-token"
```

## Data Models

### HMO Entity
```typescript
{
  id: string;
  name: string;
  description?: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
  image?: string;
  status: ProcessStatus;
  accountStatus: Status;
  verificationComments?: string;
  plans: HealthcarePlan[];
  accountTiers: AccountTier[];
  hospitals: Hospital[];
  organizations: Organization[];
  providerClaims: ProviderClaim[];
  createdAt: Date;
  updatedAt: Date;
}
```

### Healthcare Plan Entity
```typescript
{
  id: string;
  name: string;
  description?: string;
  coverageType: string;
  premiumAmount: number;
  coverageLimit: number;
  deductible: number;
  coPayPercentage: number;
  features: string[];
  exclusions: string[];
  waitingPeriod: number;
  renewalTerms: string;
  hmo: Hmo;
  subscriptions: PlanSubscription[];
  createdAt: Date;
  updatedAt: Date;
}
```

### Account Tier Entity
```typescript
{
  id: string;
  name: string;
  description?: string;
  benefits: string[];
  requirements: string[];
  discountPercentage: number;
  annualFee: number;
  hmo: Hmo;
  createdAt: Date;
  updatedAt: Date;
}
```

## Status Enums

### ProcessStatus
- `PENDING`
- `APPROVED`
- `REJECTED`
- `CANCELLED`

### Status
- `ACTIVE`
- `INACTIVE`
- `DORMANT`
- `SUSPENDED`

## Rate Limiting

The API implements rate limiting:
- 10 requests per minute per IP address
- Rate limit headers are included in responses

## Pagination

All list endpoints support pagination with the following parameters:
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10, max: 100)

Response includes metadata:
```json
{
  "data": [...],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  }
}
```

## Search and Filtering

Most endpoints support search and filtering:
- `search`: Text search across relevant fields
- `sortBy`: Field to sort by
- `sortOrder`: ASC or DESC
- Date range filtering where applicable

## Best Practices

1. **Authentication**: Always include valid admin token
2. **Validation**: Validate request data before sending
3. **Error Handling**: Implement proper error handling for all API calls
4. **Rate Limiting**: Respect rate limits and implement retry logic
5. **Pagination**: Use pagination for large datasets
6. **Caching**: Cache frequently accessed data
7. **Logging**: Log API interactions for debugging
8. **Security**: Never expose admin tokens in client-side code 