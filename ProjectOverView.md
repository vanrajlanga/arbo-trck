# Aorbo Treks - Backend Development Requirements

## Project Overview

**Application Purpose**: Aorbo Treks is a comprehensive trekking booking platform that connects adventure enthusiasts with verified trek organizers across India. It functions as a marketplace where vendors (trek organizers) can list their treks, manage bookings, and handle customer relationships, while administrators oversee the entire platform.

**Main Features**:
- Multi-role authentication system (Admin, Vendor)
- Trek listing and management system
- Booking and payment processing
- Vendor onboarding and verification
- Customer management system
- Review and rating system
- Coupon and promotional management
- Analytics and reporting
- Financial management (payments, withdrawals)
- Communication system (messages)

**Technology Stack**: 
 - FrontEnd : React.js
 - Backend : Node.js with sequelize
 - Database : MySQL 

---

## Module Identification & Description

### 1. **Authentication & Authorization Module**
**Purpose**: Manages user registration, login, role-based access control, and session management.
**Entities**: Users, Sessions, Roles, Permissions

### 2. **Vendor Management Module**
**Purpose**: Handles vendor onboarding, verification, profile management, and business operations.
**Entities**: Vendors, Vendor Profiles, Business Documents, Verification Status

### 3. **Trek Management Module**
**Purpose**: Comprehensive trek listing, scheduling, and inventory management system.
**Entities**: Treks, Trek Details, Itineraries, Accommodations, Images, Pricing, Availability

### 4. **Booking & Reservation Module**
**Purpose**: Handles trek bookings, participant management, and booking lifecycle.
**Entities**: Bookings, Participants, Booking Status, Cancellations

### 5. **Customer Management Module**
**Purpose**: Manages customer profiles, booking history, and communication.
**Entities**: Customers, Customer Profiles, Booking History, Preferences

### 6. **Payment & Financial Module**
**Purpose**: Processes payments, manages vendor earnings, and handles financial transactions.
**Entities**: Payments, Transactions, Vendor Earnings, Withdrawals, Commission

### 7. **Review & Rating Module**
**Purpose**: Manages customer reviews, ratings, and vendor responses.
**Entities**: Reviews, Ratings, Review Responses, Review Moderation

### 8. **Coupon & Promotion Module**
**Purpose**: Handles discount codes, promotional campaigns, and usage tracking.
**Entities**: Coupons, Coupon Usage, Promotions, Discount Rules

### 9. **Location Management Module**
**Purpose**: Manages cities, pickup points, and meeting locations for treks.
**Entities**: Cities, Locations, Pickup Points, Meeting Points

### 10. **Communication Module**
**Purpose**: Handles messaging between vendors, customers, and administrators.
**Entities**: Messages, Conversations, Notifications

### 11. **Analytics & Reporting Module**
**Purpose**: Provides business insights, performance metrics, and financial reports.
**Entities**: Analytics Data, Reports, Metrics, KPIs

---

## Functionality Extraction & Data Requirements

### Authentication & Authorization
**Functionalities**:
- User registration with role assignment
- Login/logout with session management
- Password reset and recovery
- Role-based access control

**Data Operations**:
- **Create**: User accounts (name, email, password_hash, role, created_at, verification_status)
- **Read**: User profile, role permissions, session data
- **Update**: User profile, password, last_login, verification_status
- **Delete**: User accounts (soft delete), expired sessions

### Vendor Management
**Functionalities**:
- Vendor registration and onboarding
- Business profile management
- Document upload and verification
- Vendor approval/rejection workflow
- Business settings and configurations

**Data Operations**:
- **Create**: Vendor profiles (business_name, contact_info, documents, bank_details)
- **Read**: Vendor list, vendor details, verification status, business metrics
- **Update**: Vendor profile, verification_status, approval_status, business_settings
- **Delete**: Vendor deactivation (soft delete)

### Trek Management
**Functionalities**:
- Trek creation with detailed information
- Multi-day itinerary planning
- Accommodation management
- Image gallery management
- Pricing and availability setup
- Trek categorization and filtering

**Data Operations**:
- **Create**: Treks (name, description, difficulty, duration, price, max_participants, vendor_id)
- **Create**: Trek stages, itineraries, accommodations, images, inclusions/exclusions
- **Read**: Trek listings with filters, trek details, availability, vendor treks
- **Update**: Trek information, pricing, availability, status (active/inactive)
- **Delete**: Trek deactivation, image removal

### Booking & Reservation
**Functionalities**:
- Trek booking with participant details
- Booking confirmation and notifications
- Booking modification and cancellation
- Waitlist management
- Booking status tracking

**Data Operations**:
- **Create**: Bookings (customer_id, trek_id, booking_date, participants, total_amount, status)
- **Create**: Participant details, special requirements
- **Read**: Booking history, upcoming bookings, booking details, vendor bookings
- **Update**: Booking status, participant information, modifications
- **Delete**: Booking cancellation (with refund processing)

### Customer Management
**Functionalities**:
- Customer profile creation
- Booking history tracking
- Customer communication
- Preference management
- Customer analytics

**Data Operations**:
- **Create**: Customer profiles (name, email, phone, emergency_contact, preferences)
- **Read**: Customer list, customer details, booking history, analytics
- **Update**: Customer profile, preferences, contact information
- **Delete**: Customer account deactivation

### Payment & Financial
**Functionalities**:
- Payment processing for bookings
- Vendor earning calculations
- Commission management
- Refund processing
- Withdrawal requests
- Financial reporting

**Data Operations**:
- **Create**: Payment transactions, vendor earnings, withdrawal requests
- **Read**: Payment history, vendor earnings, commission reports, financial analytics
- **Update**: Payment status, withdrawal approval, commission rates
- **Delete**: Failed transaction cleanup

### Review & Rating
**Functionalities**:
- Customer review submission
- Rating system (1-5 stars)
- Vendor response to reviews
- Review moderation and approval
- Review analytics

**Data Operations**:
- **Create**: Reviews (customer_id, trek_id, rating, title, comment, booking_id)
- **Create**: Vendor responses to reviews
- **Read**: Trek reviews, vendor reviews, review analytics, pending reviews
- **Update**: Review status (published/pending/rejected), vendor responses
- **Delete**: Inappropriate review removal

### Coupon & Promotion
**Functionalities**:
- Coupon code creation and management
- Discount rule configuration
- Usage tracking and limits
- Coupon validation
- Promotional campaign management

**Data Operations**:
- **Create**: Coupons (code, discount_type, discount_value, validity, usage_limit)
- **Read**: Available coupons, coupon usage history, promotional analytics
- **Update**: Coupon status, usage count, validity dates
- **Delete**: Expired coupon cleanup

---

## Proposed API Endpoints (Conceptual)

### Authentication Endpoints
```
POST /api/auth/register          # User registration
POST /api/auth/login            # User login
POST /api/auth/logout           # User logout
POST /api/auth/forgot-password  # Password reset request
POST /api/auth/reset-password   # Password reset confirmation
GET  /api/auth/profile          # Get current user profile
PUT  /api/auth/profile          # Update user profile
```

### Vendor Management Endpoints
```
GET    /api/vendors                    # List all vendors (admin)
GET    /api/vendors/:id               # Get vendor details
POST   /api/vendors                   # Create vendor profile
PUT    /api/vendors/:id               # Update vendor profile
DELETE /api/vendors/:id               # Deactivate vendor
PUT    /api/vendors/:id/verify        # Verify vendor (admin)
GET    /api/vendors/:id/analytics     # Vendor performance analytics
```

### Trek Management Endpoints
```
GET    /api/treks                     # List treks with filters
GET    /api/treks/:id                 # Get trek details
POST   /api/treks                     # Create new trek
PUT    /api/treks/:id                 # Update trek
DELETE /api/treks/:id                 # Delete trek
GET    /api/treks/:id/availability    # Check trek availability
PUT    /api/treks/:id/availability    # Update trek availability
POST   /api/treks/:id/images          # Upload trek images
DELETE /api/treks/:id/images/:imageId # Delete trek image
```

### Booking Management Endpoints
```
GET    /api/bookings                  # List bookings
GET    /api/bookings/:id              # Get booking details
POST   /api/bookings                  # Create new booking
PUT    /api/bookings/:id              # Update booking
DELETE /api/bookings/:id              # Cancel booking
GET    /api/bookings/user/:userId     # Get user bookings
GET    /api/bookings/vendor/:vendorId # Get vendor bookings
```

### Customer Management Endpoints
```
GET    /api/customers                 # List customers
GET    /api/customers/:id             # Get customer details
POST   /api/customers                 # Create customer profile
PUT    /api/customers/:id             # Update customer profile
DELETE /api/customers/:id             # Deactivate customer
GET    /api/customers/:id/bookings    # Get customer booking history
```

### Payment Endpoints
```
POST   /api/payments/process          # Process payment
GET    /api/payments/:bookingId       # Get payment details
POST   /api/payments/refund           # Process refund
GET    /api/payments/vendor/:vendorId # Get vendor payments
POST   /api/withdrawals               # Request withdrawal
GET    /api/withdrawals               # List withdrawal requests
PUT    /api/withdrawals/:id/approve   # Approve withdrawal (admin)
```

### Review Management Endpoints
```
GET    /api/reviews                   # List reviews
GET    /api/reviews/trek/:trekId      # Get trek reviews
POST   /api/reviews                   # Submit review
PUT    /api/reviews/:id               # Update review
DELETE /api/reviews/:id               # Delete review
POST   /api/reviews/:id/respond       # Vendor response to review
PUT    /api/reviews/:id/moderate      # Moderate review (admin)
```

### Coupon Management Endpoints
```
GET    /api/coupons                   # List coupons
GET    /api/coupons/:code/validate    # Validate coupon code
POST   /api/coupons                   # Create coupon (admin/vendor)
PUT    /api/coupons/:id               # Update coupon
DELETE /api/coupons/:id               # Delete coupon
POST   /api/coupons/:id/apply         # Apply coupon to booking
```

### Location Management Endpoints
```
GET    /api/locations/cities          # Get available cities
POST   /api/locations/cities          # Add new city
GET    /api/locations/pickup-points   # Get pickup points
POST   /api/locations/pickup-points   # Add pickup point
PUT    /api/locations/pickup-points/:id # Update pickup point
```

### Analytics Endpoints
```
GET    /api/analytics/dashboard       # Dashboard analytics
GET    /api/analytics/bookings        # Booking analytics
GET    /api/analytics/revenue         # Revenue analytics
GET    /api/analytics/vendors         # Vendor performance
GET    /api/analytics/customers       # Customer analytics
```

---

## Potential Database Schema Considerations (High-Level)

### Core Entity Tables

#### Users Table
```sql
users (
  id (PK),
  name,
  email (unique),
  password_hash,
  role (enum: admin, vendor, customer),
  phone,
  is_verified,
  verification_token,
  created_at,
  updated_at,
  last_login,
  status (enum: active, inactive, suspended)
)
```

#### Vendors Table
```sql
vendors (
  id (PK),
  user_id (FK -> users.id),
  business_name,
  business_type,
  registration_number,
  contact_person,
  business_address,
  bank_account_details,
  tax_information,
  verification_status (enum: pending, verified, rejected),
  approval_status (enum: pending, approved, rejected),
  commission_rate,
  created_at,
  updated_at
)
```

#### Treks Table
```sql
treks (
  id (PK),
  vendor_id (FK -> vendors.id),
  name,
  description,
  destination,
  trek_type (enum: easy, moderate, difficult, expert),
  duration_days,
  duration_nights,
  price,
  max_participants,
  min_participants,
  start_date,
  end_date,
  difficulty_level,
  cancellation_policy,
  status (enum: draft, active, inactive, cancelled),
  created_at,
  updated_at
)
```

#### Trek_Itineraries Table
```sql
trek_itineraries (
  id (PK),
  trek_id (FK -> treks.id),
  day_number,
  activities (JSON or TEXT),
  accommodation_details,
  meals_included,
  created_at
)
```

#### Trek_Images Table
```sql
trek_images (
  id (PK),
  trek_id (FK -> treks.id),
  image_url,
  image_caption,
  is_primary,
  upload_date
)
```

#### Bookings Table
```sql
bookings (
  id (PK),
  booking_reference (unique),
  customer_id (FK -> users.id),
  trek_id (FK -> treks.id),
  vendor_id (FK -> vendors.id),
  booking_date,
  trek_start_date,
  participants_count,
  total_amount,
  discount_amount,
  final_amount,
  booking_status (enum: pending, confirmed, cancelled, completed, refunded),
  payment_status (enum: pending, paid, failed, refunded),
  special_requirements (TEXT),
  created_at,
  updated_at
)
```

#### Booking_Participants Table
```sql
booking_participants (
  id (PK),
  booking_id (FK -> bookings.id),
  participant_name,
  participant_age,
  participant_gender,
  emergency_contact,
  medical_conditions,
  dietary_requirements
)
```

#### Payments Table
```sql
payments (
  id (PK),
  booking_id (FK -> bookings.id),
  payment_method (enum: credit_card, debit_card, upi, net_banking, wallet),
  payment_gateway_transaction_id,
  amount,
  currency,
  payment_status (enum: pending, success, failed, refunded),
  payment_date,
  gateway_response (JSON),
  created_at
)
```

#### Reviews Table
```sql
reviews (
  id (PK),
  booking_id (FK -> bookings.id),
  customer_id (FK -> users.id),
  trek_id (FK -> treks.id),
  vendor_id (FK -> vendors.id),
  rating (1-5),
  title,
  comment (TEXT),
  review_status (enum: pending, published, rejected),
  created_at,
  updated_at
)
```

#### Review_Responses Table
```sql
review_responses (
  id (PK),
  review_id (FK -> reviews.id),
  vendor_id (FK -> vendors.id),
  response_text (TEXT),
  created_at
)
```

#### Coupon_Codes Table
```sql
coupon_codes (
  id (PK),
  code (unique),
  description,
  discount_type (enum: percentage, fixed_amount),
  discount_value,
  min_order_amount,
  max_discount_amount,
  usage_limit,
  used_count,
  valid_from,
  valid_until,
  is_active,
  created_by_admin,
  vendor_id (FK -> vendors.id, nullable),
  created_at,
  updated_at
)
```

#### Coupon_Usage Table
```sql
coupon_usage (
  id (PK),
  coupon_id (FK -> coupon_codes.id),
  booking_id (FK -> bookings.id),
  user_id (FK -> users.id),
  discount_applied,
  used_at
)
```

#### Cities Table
```sql
cities (
  id (PK),
  name,
  state,
  country,
  is_active,
  created_at
)
```

#### Pickup_Points Table
```sql
pickup_points (
  id (PK),
  trek_id (FK -> treks.id),
  city_id (FK -> cities.id),
  location_details,
  pickup_time,
  is_active
)
```

#### Messages Table
```sql
messages (
  id (PK),
  sender_id (FK -> users.id),
  receiver_id (FK -> users.id),
  subject,
  message_body (TEXT),
  is_read,
  created_at,
  updated_at
)
```

#### Vendor_Earnings Table
```sql
vendor_earnings (
  id (PK),
  vendor_id (FK -> vendors.id),
  booking_id (FK -> bookings.id),
  gross_amount,
  commission_amount,
  net_earnings,
  earnings_date,
  status (enum: pending, paid, on_hold)
)
```

#### Withdrawals Table
```sql
withdrawals (
  id (PK),
  vendor_id (FK -> vendors.id),
  amount,
  withdrawal_method,
  bank_details (JSON),
  status (enum: pending, approved, rejected, processed),
  requested_at,
  processed_at,
  admin_notes
)
```

### Key Relationships
- **One-to-Many**: Vendor → Treks, Trek → Bookings, User → Bookings, Booking → Participants
- **One-to-Many**: Trek → Reviews, Trek → Images, Trek → Itineraries
- **Many-to-Many**: Trek → Cities (via pickup_points), Coupon → Bookings (via coupon_usage)
- **One-to-One**: Booking → Payment, User → Vendor (for vendor users)

---

## Authentication and Authorization Points

### Authentication Required Endpoints
- All `/api/vendors/*` endpoints
- All `/api/bookings/*` endpoints  
- All `/api/payments/*` endpoints
- All `/api/reviews/*` (except GET for public viewing)
- All `/api/analytics/*` endpoints
- User profile endpoints

### Role-Based Authorization

#### Admin-Only Access
- `/api/vendors/*/verify` - Vendor verification
- `/api/analytics/*` - System-wide analytics
- `/api/withdrawals/*/approve` - Withdrawal approvals
- `/api/reviews/*/moderate` - Review moderation
- Global coupon management
- User management operations

#### Vendor-Only Access
- `/api/treks` (POST, PUT, DELETE for own treks)
- `/api/bookings/vendor/:vendorId` (only own bookings)
- `/api/customers` (only own customers)
- `/api/reviews/*/respond` (only for own treks)
- Vendor-specific analytics
- Own profile management

#### Customer Access
- Own booking history and details
- Review submission for completed bookings
- Profile management
- Payment history

#### Public Access (No Authentication)
- Trek listings and details (GET)
- Public reviews (GET)
- Location information (GET)
- Coupon validation for booking process

---

## Key Takeaways for Backend Developer

### Critical Design Decisions

1. **Multi-Tenant Architecture**: The system supports multiple vendors, requiring proper data isolation and access controls.

2. **Complex Booking Workflow**: Implement state machine for booking status transitions (pending → confirmed → completed/cancelled/refunded).

3. **Financial Transaction Handling**: Robust payment processing with proper error handling, refund management, and commission calculations.

4. **File Management**: Implement secure file upload system for trek images and vendor documents with proper validation and storage.

5. **Real-time Features**: Consider implementing real-time notifications for booking confirmations, messages, and status updates.

6. **Data Validation**: Implement comprehensive validation for:
   - Trek dates and availability
   - Participant limits and requirements
   - Payment amounts and calculations
   - Coupon validity and usage limits

7. **Audit Trail**: Implement logging for critical operations (bookings, payments, status changes) for compliance and debugging.

8. **Performance Considerations**:
   - Implement caching for frequently accessed data (trek listings, reviews)
   - Database indexing for search and filter operations
   - Pagination for large data sets
   - Image optimization and CDN integration

9. **Security Priorities**:
   - Secure payment processing with PCI compliance
   - Role-based access control implementation
   - Data encryption for sensitive information
   - Rate limiting for API endpoints
   - Input sanitization and SQL injection prevention

10. **Integration Points**:
    - Payment gateway integration (Razorpay, Stripe, PayU)
    - Email service for notifications
    - SMS service for booking confirmations
    - File storage service (AWS S3, Cloudinary)
    - Analytics and reporting tools

### Recommended Development Approach

1. **Start with Core Entities**: Users, Vendors, Treks, Bookings
2. **Implement Authentication/Authorization Layer**: Essential for all subsequent features
3. **Build Payment Integration**: Critical for platform functionality
4. **Add Business Logic Layer**: Booking workflows, commission calculations
5. **Implement Analytics**: For business intelligence and decision making
6. **Add Communication Features**: Messages, notifications
7. **Performance Optimization**: Caching, indexing, optimization

### Potential Complexities

- **Booking Conflicts**: Handle simultaneous bookings for limited capacity treks
- **Partial Refunds**: Complex refund calculations based on cancellation policies
- **Commission Models**: Flexible commission structures for different vendor tiers
- **Seasonal Pricing**: Dynamic pricing based on seasons, demand, and availability
- **Multi-Currency Support**: If expanding internationally
- **Inventory Management**: Real-time availability tracking across multiple booking channels 