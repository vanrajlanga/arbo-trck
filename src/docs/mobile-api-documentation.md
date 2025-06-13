
# Mobile API Documentation for Flutter App

This document outlines all the API endpoints available for the Flutter mobile application.

## Base URLs

- **Production**: `https://fktdctzrtesjyvpjnsdl.supabase.co/functions/v1/`
- **Development**: `http://localhost:54326/functions/v1/`

## Authentication API Endpoints

### 1. User Registration
**POST** `/auth-api/register`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "full_name": "John Doe",
  "phone": "+1234567890"
}
```

**Response:**
```json
{
  "message": "Registration successful",
  "user": {...},
  "session": {...}
}
```

### 2. User Login
**POST** `/auth-api/login`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "user": {...},
  "session": {...}
}
```

### 3. User Logout
**POST** `/auth-api/logout`

**Headers:**
```
Authorization: Bearer {access_token}
```

**Response:**
```json
{
  "message": "Logout successful"
}
```

### 4. Reset Password
**POST** `/auth-api/reset-password`

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "message": "Password reset email sent"
}
```

### 5. Update Password
**POST** `/auth-api/update-password`

**Headers:**
```
Authorization: Bearer {access_token}
```

**Request Body:**
```json
{
  "password": "newpassword123"
}
```

**Response:**
```json
{
  "message": "Password updated successfully"
}
```

### 6. Verify Session
**GET** `/auth-api/verify-session`

**Headers:**
```
Authorization: Bearer {access_token}
```

**Response:**
```json
{
  "valid": true,
  "user": {...}
}
```

## Mobile App API Endpoints

### 1. Get Trek Categories
**GET** `/mobile-api/categories`

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "name": "Himalayan Treks",
      "description": "High altitude mountain treks",
      "image_url": "...",
      "is_active": true
    }
  ]
}
```

### 2. Get Treks (with filtering and pagination)
**GET** `/mobile-api/treks`

**Query Parameters:**
- `page` (default: 1)
- `limit` (default: 10)
- `search` (optional)
- `category` (optional)
- `difficulty` (optional: easy, moderate, hard, extreme)
- `min_price` (optional)
- `max_price` (optional)

**Example:** `/mobile-api/treks?page=1&limit=10&difficulty=moderate&search=everest`

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "name": "Everest Base Camp",
      "description": "Amazing trek to Everest Base Camp",
      "destination": "Nepal",
      "price": 25000.00,
      "duration_days": 14,
      "difficulty_level": "hard",
      "max_participants": 20,
      "images": ["url1", "url2"],
      "is_active": true
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3
  }
}
```

### 3. Get Trek Details
**GET** `/mobile-api/trek-details?id={trek_id}`

**Response:**
```json
{
  "data": {
    "id": 1,
    "name": "Everest Base Camp",
    "description": "Complete description...",
    "destination": "Nepal",
    "price": 25000.00,
    "duration_days": 14,
    "difficulty_level": "hard",
    "max_participants": 20,
    "images": ["url1", "url2"],
    "inclusions": ["Food", "Accommodation"],
    "exclusions": ["Personal expenses"],
    "itinerary": {...},
    "pickup_points": {...},
    "vendor_id": "uuid",
    "is_active": true
  }
}
```

### 4. Get User Profile
**GET** `/mobile-api/profile`

**Headers:**
```
Authorization: Bearer {access_token}
```

**Response:**
```json
{
  "data": {
    "id": "uuid",
    "user_id": "uuid",
    "full_name": "John Doe",
    "phone": "+1234567890",
    "emergency_contact_name": "Jane Doe",
    "emergency_contact_phone": "+1234567891",
    "created_at": "2025-01-01T00:00:00Z",
    "updated_at": "2025-01-01T00:00:00Z"
  }
}
```

### 5. Update User Profile
**PUT** `/mobile-api/profile`

**Headers:**
```
Authorization: Bearer {access_token}
```

**Request Body:**
```json
{
  "full_name": "John Smith",
  "phone": "+1234567890",
  "emergency_contact_name": "Jane Smith",
  "emergency_contact_phone": "+1234567891"
}
```

**Response:**
```json
{
  "data": {
    "id": "uuid",
    "user_id": "uuid",
    "full_name": "John Smith",
    "phone": "+1234567890",
    "emergency_contact_name": "Jane Smith",
    "emergency_contact_phone": "+1234567891",
    "updated_at": "2025-01-01T00:00:00Z"
  }
}
```

### 6. Get User Bookings
**GET** `/mobile-api/bookings`

**Headers:**
```
Authorization: Bearer {access_token}
```

**Query Parameters:**
- `status` (optional: pending, confirmed, cancelled)

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "user_id": "uuid",
      "trek_id": 1,
      "trek_name": "Everest Base Camp",
      "pickup_point_id": "point1",
      "pickup_point_details": "Main Gate",
      "trek_date": "2025-06-15",
      "number_of_participants": 2,
      "total_amount": 50000.00,
      "booking_status": "confirmed",
      "payment_status": "paid",
      "created_at": "2025-01-01T00:00:00Z"
    }
  ]
}
```

### 7. Create Booking
**POST** `/mobile-api/create-booking`

**Headers:**
```
Authorization: Bearer {access_token}
```

**Request Body:**
```json
{
  "trek_id": 1,
  "trek_date": "2025-06-15",
  "number_of_participants": 2,
  "pickup_point_id": "point1",
  "pickup_point_details": "Main Gate, Delhi"
}
```

**Response:**
```json
{
  "data": {
    "id": "uuid",
    "user_id": "uuid",
    "trek_id": 1,
    "trek_name": "Everest Base Camp",
    "pickup_point_id": "point1",
    "pickup_point_details": "Main Gate, Delhi",
    "trek_date": "2025-06-15",
    "number_of_participants": 2,
    "total_amount": 50000.00,
    "booking_status": "pending",
    "payment_status": "pending",
    "created_at": "2025-01-01T00:00:00Z"
  }
}
```

## Error Responses

All endpoints return errors in the following format:

```json
{
  "error": "Error message description"
}
```

**Common HTTP Status Codes:**
- `200` - Success
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (invalid/missing auth token)
- `404` - Not Found
- `405` - Method Not Allowed
- `500` - Internal Server Error

## Authentication Flow for Flutter

1. **Registration/Login**: Use auth endpoints to get access token
2. **Store Token**: Save the access token securely in Flutter (using flutter_secure_storage)
3. **API Calls**: Include token in Authorization header for protected endpoints
4. **Token Refresh**: Handle token expiration and refresh as needed
5. **Logout**: Call logout endpoint and clear stored tokens

## Example Flutter HTTP Request

```dart
import 'package:http/http.dart' as http;
import 'dart:convert';

// Get treks example
Future<Map<String, dynamic>> getTreks({
  int page = 1,
  int limit = 10,
  String? search,
  String? difficulty
}) async {
  final uri = Uri.parse('https://fktdctzrtesjyvpjnsdl.supabase.co/functions/v1/mobile-api/treks')
      .replace(queryParameters: {
    'page': page.toString(),
    'limit': limit.toString(),
    if (search != null) 'search': search,
    if (difficulty != null) 'difficulty': difficulty,
  });

  final response = await http.get(uri);
  
  if (response.statusCode == 200) {
    return json.decode(response.body);
  } else {
    throw Exception('Failed to load treks');
  }
}

// Create booking example (requires authentication)
Future<Map<String, dynamic>> createBooking({
  required String accessToken,
  required int trekId,
  required String trekDate,
  required int participants,
  String? pickupPointId,
  String? pickupPointDetails,
}) async {
  final response = await http.post(
    Uri.parse('https://fktdctzrtesjyvpjnsdl.supabase.co/functions/v1/mobile-api/create-booking'),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer $accessToken',
    },
    body: json.encode({
      'trek_id': trekId,
      'trek_date': trekDate,
      'number_of_participants': participants,
      'pickup_point_id': pickupPointId,
      'pickup_point_details': pickupPointDetails,
    }),
  );

  if (response.statusCode == 200) {
    return json.decode(response.body);
  } else {
    throw Exception('Failed to create booking');
  }
}
```

## Notes

1. **Authentication**: Most endpoints require authentication via Bearer token in the Authorization header
2. **CORS**: All endpoints support CORS for cross-origin requests
3. **Rate Limiting**: Consider implementing rate limiting on the client side
4. **Error Handling**: Always handle potential network errors and API error responses
5. **Data Validation**: Validate input data on the client side before making API calls
