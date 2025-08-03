# HMO JSON Samples with Images

## 🏥 Real Nigerian HMO Examples with Image URLs

Here are 6 JSON samples for creating HMOs with image URLs for logos and branding:

### **1. Reliance HMO**
```json
{
  "name": "Reliance HMO",
  "email": "info@reliancehmo.com",
  "phoneNumber": "+2347000000000",
  "address": "Reliance House, 2-4 Oba Akinjobi Way, GRA, Ikeja, Lagos, Nigeria",
  "image": "https://example.com/images/reliance-hmo-logo.png"
}
```

### **2. AXA Mansard Health**
```json
{
  "name": "AXA Mansard Health",
  "email": "health@axamansard.com",
  "phoneNumber": "+2347000000001",
  "address": "AXA Mansard House, 24 Campbell Street, Lagos Island, Lagos, Nigeria",
  "image": "https://example.com/images/axa-mansard-logo.png"
}
```

### **3. Leadway Health**
```json
{
  "name": "Leadway Health",
  "email": "health@leadway.com",
  "phoneNumber": "+2347000000002",
  "address": "Leadway House, 45/47 Marina, Lagos Island, Lagos, Nigeria",
  "image": "https://example.com/images/leadway-health-logo.png"
}
```

### **4. Hygeia HMO**
```json
{
  "name": "Hygeia HMO",
  "email": "info@hygeiahmo.com",
  "phoneNumber": "+2347000000003",
  "address": "Hygeia House, 1-3 Oba Akinjobi Way, GRA, Ikeja, Lagos, Nigeria",
  "image": "https://example.com/images/hygeia-hmo-logo.png"
}
```

### **5. Clearline HMO**
```json
{
  "name": "Clearline HMO",
  "email": "contact@clearlinehmo.com",
  "phoneNumber": "+2347000000004",
  "address": "Clearline House, 15 Ahmadu Bello Way, Victoria Island, Lagos, Nigeria",
  "image": "https://example.com/images/clearline-hmo-logo.png"
}
```

### **6. Total Health Trust (THT)**
```json
{
  "name": "Total Health Trust",
  "email": "info@tht.com.ng",
  "phoneNumber": "+2347000000005",
  "address": "THT House, 1-3 Oba Akinjobi Way, GRA, Ikeja, Lagos, Nigeria",
  "image": "https://example.com/images/tht-logo.png"
}
```

## 🎨 Generic HMO Examples with Different Image Types

### **7. Premium Healthcare with Logo**
```json
{
  "name": "Premium Healthcare Services",
  "email": "contact@premiumhealth.com",
  "phoneNumber": "+2347000000006",
  "address": "Premium Plaza, 123 Victoria Island, Lagos, Nigeria",
  "image": "https://cdn.example.com/logos/premium-healthcare-logo.jpg"
}
```

### **8. Regional HMO with Facility Image**
```json
{
  "name": "Northern Health Network",
  "email": "admin@northernhealth.ng",
  "phoneNumber": "+2347000000007",
  "address": "Regional Plaza, Kaduna Central, Kaduna State, Nigeria",
  "image": "https://cdn.example.com/facilities/northern-health-building.jpg"
}
```

### **9. Corporate HMO with Brand Image**
```json
{
  "name": "Business Health Solutions",
  "email": "corporate@businesshealth.com",
  "phoneNumber": "+2347000000008",
  "address": "Corporate Drive, Lekki Phase 1, Lagos, Nigeria",
  "image": "https://cdn.example.com/brands/business-health-brand.png"
}
```

### **10. Family-Focused HMO**
```json
{
  "name": "Family Care Network",
  "email": "support@familycare.ng",
  "phoneNumber": "+2347000000009",
  "address": "Family Center, Surulere, Lagos, Nigeria",
  "image": "https://cdn.example.com/logos/family-care-logo.svg"
}
```

### **11. Specialized Pediatric HMO**
```json
{
  "name": "Pediatric Health Alliance",
  "email": "care@pediatricalliance.com",
  "phoneNumber": "+2347000000010",
  "address": "Children's Hospital Road, Ikeja, Lagos, Nigeria",
  "image": "https://cdn.example.com/specialized/pediatric-alliance-logo.png"
}
```

### **12. Digital-First HMO**
```json
{
  "name": "Digital Health Solutions",
  "email": "hello@digitalhealth.ng",
  "phoneNumber": "+2347000000011",
  "address": "Tech Hub, Yaba, Lagos, Nigeria",
  "image": "https://cdn.example.com/digital/digital-health-logo.webp"
}
```

## 🚀 How to Use These Samples

### **Using cURL:**
```bash
# Create Reliance HMO with image
curl -X POST http://localhost:3000/hmo \
  -H "Authorization: Bearer your-admin-token" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Reliance HMO",
    "email": "info@reliancehmo.com",
    "phoneNumber": "+2347000000000",
    "address": "Reliance House, 2-4 Oba Akinjobi Way, GRA, Ikeja, Lagos, Nigeria",
    "image": "https://example.com/images/reliance-hmo-logo.png"
  }'
```

### **Using Postman:**
1. Import the Postman collection
2. Use the "Create HMO" endpoint
3. Replace the request body with any sample above
4. Set your admin token

### **Using JavaScript:**
```javascript
const hmoData = {
  name: "Reliance HMO",
  email: "info@reliancehmo.com",
  phoneNumber: "+2347000000000",
  address: "Reliance House, 2-4 Oba Akinjobi Way, GRA, Ikeja, Lagos, Nigeria",
  image: "https://example.com/images/reliance-hmo-logo.png"
};

const response = await api.post('/hmo', hmoData);
```

## 📋 Image URL Best Practices

### **Supported Image Formats:**
- ✅ PNG (recommended for logos)
- ✅ JPG/JPEG (good for photos)
- ✅ SVG (scalable vector graphics)
- ✅ WebP (modern web format)

### **Image URL Requirements:**
- Must be a valid HTTP/HTTPS URL
- Should be publicly accessible
- Recommended size: 200x200px to 800x800px
- File size: Under 2MB for optimal performance

### **Example Image URLs:**
```javascript
// CDN URLs (recommended)
"https://cdn.example.com/logos/hmo-logo.png"
"https://images.example.com/brands/healthcare-logo.jpg"

// Direct hosting
"https://example.com/assets/images/hmo-logo.svg"
"https://healthcare.com/static/images/logo.webp"

// Cloud storage
"https://storage.googleapis.com/hmo-logos/reliance-logo.png"
"https://s3.amazonaws.com/healthcare-assets/axa-logo.jpg"
```

## 🔄 Batch Creation Script

```javascript
const hmoSamples = [
  {
    name: "Reliance HMO",
    email: "info@reliancehmo.com",
    phoneNumber: "+2347000000000",
    address: "Reliance House, 2-4 Oba Akinjobi Way, GRA, Ikeja, Lagos, Nigeria",
    image: "https://example.com/images/reliance-hmo-logo.png"
  },
  {
    name: "AXA Mansard Health",
    email: "health@axamansard.com",
    phoneNumber: "+2347000000001",
    address: "AXA Mansard House, 24 Campbell Street, Lagos Island, Lagos, Nigeria",
    image: "https://example.com/images/axa-mansard-logo.png"
  },
  // ... add more samples
];

async function createMultipleHMOs() {
  for (const hmoData of hmoSamples) {
    try {
      const response = await api.post('/', hmoData);
      console.log(`✅ Created: ${hmoData.name} with image: ${hmoData.image}`);
    } catch (error) {
      console.error(`❌ Failed to create ${hmoData.name}:`, error.response?.data);
    }
  }
}
```

## 📊 Expected Response with Image

```json
{
  "id": "d3b07384-d9a0-4f5c-a3dd-9b3786cb1df0",
  "name": "Reliance HMO",
  "email": "info@reliancehmo.com",
  "phoneNumber": "+2347000000000",
  "address": "Reliance House, 2-4 Oba Akinjobi Way, GRA, Ikeja, Lagos, Nigeria",
  "image": "https://example.com/images/reliance-hmo-logo.png",
  "status": "PENDING",
  "accountStatus": "DORMANT",
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

## ⚠️ Validation Rules

- **name**: Required, minimum 3 characters
- **email**: Required, valid email format
- **phoneNumber**: Required, international format
- **address**: Required, string
- **image**: Optional, valid URL format

The image field is now fully integrated into your HMO API and ready to use! 