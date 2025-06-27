# Backend Development Plan

This document outlines the plan for developing a Node.js backend using Express.js, MySQL (via Sequelize), and JWT-based authentication to support the existing frontend modules dynamically.

---

## 1. Tech Stack

-   **Runtime & Framework**: Node.js, Express.js
-   **Database**: MySQL (MariaDB compatible)
-   **ORM**: Sequelize
-   **Authentication**: JSON Web Tokens (JWT), bcrypt for password hashing
-   **Validation**: Joi or express-validator
-   **Logging**: Winston or morgan
-   **Environment**: dotenv for configuration
-   **Project Structure**: MVC (Models, Views, Controllers) with Routes and Middleware

---

## 2. Architecture & Directory Structure

```
backend/
├── config/                # App environment and DB config
│   └── config.js          # Sequelize and environment settings
├── controllers/           # Request handlers for each module
│   ├── authController.js
│   ├── userController.js
│   ├── trekController.js
│   ├── bookingController.js
│   └── ...
├── middleware/            # Auth checks, error handling, logging
│   ├── authMiddleware.js
│   ├── errorMiddleware.js
│   └── validationMiddleware.js
├── models/                # Sequelize models and associations
│   ├── User.js
│   ├── Role.js
│   ├── Trek.js
│   ├── Booking.js
│   └── ...
├── routes/                # Express route definitions
│   ├── authRoutes.js
│   ├── userRoutes.js
│   ├── trekRoutes.js
│   ├── bookingRoutes.js
│   └── ...
├── services/ (optional)   # Business logic and DB operations
│   ├── authService.js
│   └── emailService.js
├── utils/                 # Utility functions (e.g., email template, JWT helper)
│   └── jwt.js
├── storage/               # File uploads (trek images)
│   └── trek-images/
├── app.js                 # Express app setup and middleware
├── server.js              # Server bootstrap
└── package.json
```

---

## 3. Common Modules

### 3.1 Authentication Module

-   **Model**: `User` (id, name, email, passwordHash, roleId, status, createdAt, updatedAt)
-   **Controllers**:
    -   `register` (POST `/api/auth/register`)
    -   `login` (POST `/api/auth/login`)
    -   `logout` (POST `/api/auth/logout`)
    -   `refreshToken` (POST `/api/auth/refresh`)
-   **Routes**: `authRoutes.js`
-   **Middleware**: `validateRegistration`, `validateLogin`, `protectRoute`

---

## 4. Feature Modules

### 4.1 User Management

-   **Model**: `User`, `Role` (hasMany Users)
-   **Controllers**:
    -   `getAllUsers` (GET `/api/users`)
    -   `getUserById` (GET `/api/users/:id`)
    -   `updateUser` (PUT `/api/users/:id`)
    -   `deleteUser` (DELETE `/api/users/:id`)
-   **Routes**: `userRoutes.js`
-   **Notes**: Admin-only endpoints, include filtering by status/role

### 4.2 Vendor Management

-   **Model**: `Vendor` (id, userId, companyInfo, status)
-   **Controllers**:
    -   `createVendor`
    -   `getVendors`
    -   `updateVendorStatus`
-   **Routes**: `vendorRoutes.js`

### 4.3 Trek Management ✅ COMPLETED

-   **Models**: `Trek`, `TrekImage`, `ItineraryItem`, `Accommodation`, `Category`, `Batch`, `SafetyGuideline`
-   **Controllers**:
    -   `createTrek` (POST `/api/vendor/treks`) - Create new trek with images and itinerary
    -   `getVendorTreks` (GET `/api/vendor/treks`) - Get vendor's treks
    -   `getTrekById` (GET `/api/vendor/treks/:id`) - Get single trek details
    -   `updateTrek` (PUT `/api/vendor/treks/:id`) - Update trek with cascade updates
    -   `deleteTrek` (DELETE `/api/vendor/treks/:id`) - Delete trek with cleanup
    -   `toggleTrekStatus` (PATCH `/api/vendor/treks/:id/status`) - Toggle published/draft
    -   `getAllTreks` (GET `/api/admin/treks`) - Admin view of all treks
-   **Routes**: `trekRoutes.js`
-   **Features**:
    -   Multi-step trek creation (12 steps)
    -   Image upload support (base64 handling, 50MB limit)
    -   Dynamic itinerary management
    -   Inclusions/exclusions handling
    -   Meeting points and pickup locations
    -   Accommodation management
    -   Status management (published/draft)
    -   Vendor isolation (each vendor sees only their treks)

### 4.4 Booking Module

-   **Models**: `Booking`, `PaymentLog`, `Adjustment`, `Cancellation`, `Reconciliation`
-   **Controllers**:
    -   `createBooking` (POST `/api/bookings`)
    -   `getBookings` (GET `/api/bookings`)
    -   `getBookingById`
    -   `updateBooking`
    -   `cancelBooking`
    -   `addAdjustment`
    -   `getPaymentLogs`
    -   `runReconciliation`
-   **Routes**: `bookingRoutes.js`

### 4.5 Coupon & Campaign Module

-   **Models**: `Coupon`, `Campaign`, `CouponAssignment`, `Tracking`
-   **Controllers**:
    -   `createCoupon`, `getCoupons`
    -   `assignCoupon`
    -   `trackCouponUsage`
-   **Routes**: `couponRoutes.js`

### 4.6 Communication Module

-   **Models**: `Alert`, `EmailTemplate`, `PushNotification`, `ScheduledMessage`
-   **Controllers**:
    -   `sendAlert`, `sendEmail`, `sendPush`
    -   `scheduleMessage`
    -   `manageTemplates`
-   **Routes**: `communicationRoutes.js`

### 4.7 Finance Module

-   **Models**: `ManualPayment`, `Sale`, `Settlement`, `TaxRecord`
-   **Controllers**:
    -   `recordManualPayment`
    -   `getSales`, `getSettlements`, `calculateTax`
-   **Routes**: `financeRoutes.js`

### 4.8 Location Module

-   **Models**: `City`, `Mapping`, `PickupPoint`, `WeatherLog`
-   **Controllers**:
    -   `getCities`, `addCity`
    -   `mapLocations`, `getPickupPoints`
    -   `fetchWeather`
-   **Routes**: `locationRoutes.js`

### 4.9 Role & Permission Module

-   **Models**: `Role`, `Permission`, `RolePermission`
-   **Controllers**:
    -   `createRole`, `assignPermissions`
    -   `getRoles`, `getPermissions`
-   **Routes**: `roleRoutes.js`

### 4.10 System & Admin Utilities

-   **Models**: `ApiKey`, `MaintenanceLog`, `Policy`, `VersionInfo`
-   **Controllers**:
    -   `generateApiKey`, `getHealthStatus`
    -   `toggleMaintenanceMode`, `getVersion`
-   **Routes**: `systemRoutes.js`

### 4.11 Withdrawal Module

-   **Models**: `WithdrawalRequest`, `WithdrawalLog`
-   **Controllers**:
    -   `requestWithdrawal`, `approveWithdrawal`, `getRequests`
-   **Routes**: `withdrawalRoutes.js`

### Trek-Related Models

#### Trek.js

-   Fields: id, name, destination, description, vendor_id, trekType, category, duration, durationDays, durationNights, price, difficulty, maxParticipants, bookedSlots, startDate, endDate, meetingPoint, meetingTime, inclusions, exclusions, status
-   Associations: belongsTo(Vendor), hasMany(TrekImage, ItineraryItem, Accommodation, Booking)

#### TrekImage.js

-   Fields: id, trek_id, url, caption
-   Associations: belongsTo(Trek)

#### ItineraryItem.js

-   Fields: id, trek_id, day_number, activities
-   Associations: belongsTo(Trek)

#### Accommodation.js

-   Fields: id, trek_id, type, details
-   Associations: belongsTo(Trek)

#### Category.js

-   Fields: id, trek_id, name
-   Associations: belongsTo(Trek)

#### Batch.js

-   Fields: id, trek_id, start_date, end_date, capacity
-   Associations: belongsTo(Trek)

#### SafetyGuideline.js

-   Fields: id, trek_id, guideline
-   Associations: belongsTo(Trek)

### Booking-Related Models

#### Booking.js

-   Fields: id, user_id, trek_id, batch_id, total_amount, status, booking_date
-   Associations: belongsTo(User, Trek, Batch), hasMany(PaymentLog, Adjustment), hasOne(Cancellation)

#### PaymentLog.js

-   Fields: id, booking_id, amount, payment_method, transaction_id, status
-   Associations: belongsTo(Booking)

#### Adjustment.js

-   Fields: id, booking_id, amount, type, reason
-   Associations: belongsTo(Booking)

#### Cancellation.js

-   Fields: id, booking_id, reason, refund_amount, cancelled_at
-   Associations: belongsTo(Booking)

#### Reconciliation.js

-   Fields: id, period_start, period_end, total_bookings, total_amount, status
-   Associations: None (aggregated data)

### Coupon-Related Models

#### Coupon.js

-   Fields: id, code, discount_type, discount_value, min_amount, max_uses, current_uses, valid_from, valid_until, status
-   Associations: belongsToMany(User, { through: CouponAssignment })

#### Campaign.js

-   Fields: id, name, description, start_date, end_date, status
-   Associations: None (standalone campaigns)

#### CouponAssignment.js

-   Fields: id, coupon_id, user_id, assigned_at, used_at
-   Associations: belongsTo(Coupon, User), hasMany(Tracking)

#### Tracking.js

-   Fields: id, assignment_id, event_type, event_data, tracked_at
-   Associations: belongsTo(CouponAssignment)

---

## 5. Security & Middleware

-   **JWT Protection** on secure routes
-   **Role-based Access Control** in middleware
-   **Input Validation** for request bodies
-   **Error Handling** central middleware
-   **Rate Limiting** and **CORS**
-   **File Upload Security** with size limits and type validation

---

## 6. Deployment & Configuration

-   Use **dotenv** for environment variables
-   Setup **PM2** or **Docker** for process management
-   CI/CD: GitHub Actions for testing & deployment

---

## 7. Next Steps

1. Initialize `package.json` and install dependencies ✅
2. Setup Sequelize and database migrations ✅
3. Create directory scaffolding ✅
4. Implement Auth module end-to-end ✅
5. Implement Trek Management module ✅
6. Begin Location Management module 🔄 NEXT

---

## 8. Database Schema & Entities

Based on the frontend modules, the following tables and relationships will form our database:

-   roles ✅
-   permissions ✅
-   role_permissions ✅
-   users ✅
-   vendors ✅
-   treks ✅
-   trek_images ✅
-   itinerary_items ✅
-   accommodations ✅
-   categories
-   batches
-   safety_guidelines
-   bookings
-   payment_logs
-   adjustments
-   cancellations
-   reconciliations
-   coupons
-   campaigns
-   coupon_assignments
-   tracking
-   alerts
-   email_templates
-   push_notifications
-   scheduled_messages
-   manual_payments
-   sales
-   settlements
-   tax_records
-   cities
-   mappings
-   pickup_points
-   weather_logs
-   api_keys
-   maintenance_logs
-   policies
-   version_info
-   withdrawal_requests
-   withdrawal_logs

### Key Relationships

-   roles (1) ←→ (M) users ✅
-   roles (M) ←→ (M) permissions via role_permissions ✅
-   users (1) ←→ (M) bookings
-   users (1) ←→ (M) coupon_assignments
-   vendors extends users with company_info and status ✅
-   vendors (1) ←→ (M) treks ✅
-   treks (1) ←→ (M) trek_images, itinerary_items, accommodations ✅
-   treks (1) ←→ (M) batches, categories, safety_guidelines
-   treks (1) ←→ (M) bookings
-   bookings (1) ←→ (M) payment_logs
-   bookings (1) ←→ (M) adjustments
-   bookings (1) ←→ (1) cancellations
-   bookings grouped into reconciliations by period
-   coupons (M) ←→ (M) users via coupon_assignments
-   coupon_assignments (1) ←→ (M) tracking
-   communication tables (alerts, email_templates, push_notifications, scheduled_messages) operate independently
-   finance tables (manual_payments, sales, settlements, tax_records) track monetary flows
-   location tables (cities, mappings, pickup_points, weather_logs) support geographic data
-   system tables (api_keys, maintenance_logs, policies, version_info) power admin utilities
-   withdrawal_requests (1) ←→ (M) withdrawal_logs

Note: Unique constraints and indexes are declared in the initial migrations. Model definitions omit `unique: true` to prevent duplicate index creation when running the sync script.

---

## 9. Model Definitions

We will implement Sequelize model files under `backend/models/` corresponding to each table:

-   Role.js ✅
-   Permission.js ✅
-   RolePermission.js ✅
-   User.js ✅
-   Vendor.js ✅
-   Trek.js ✅
-   TrekImage.js ✅
-   ItineraryItem.js ✅
-   Accommodation.js ✅
-   Category.js
-   Batch.js
-   SafetyGuideline.js
-   Booking.js
-   PaymentLog.js
-   Adjustment.js
-   Cancellation.js
-   Reconciliation.js
-   Coupon.js
-   Campaign.js
-   CouponAssignment.js
-   Tracking.js
-   Alert.js
-   EmailTemplate.js
-   PushNotification.js
-   ScheduledMessage.js
-   ManualPayment.js
-   Sale.js
-   Settlement.js
-   TaxRecord.js
-   City.js
-   Mapping.js
-   PickupPoint.js
-   WeatherLog.js
-   ApiKey.js
-   MaintenanceLog.js
-   Policy.js
-   VersionInfo.js
-   WithdrawalRequest.js
-   WithdrawalLog.js

Each model will define its attributes, tableName, and associations as outlined in the Database Schema section.

### Vendor.js

Fields:

-   id: INTEGER PK
-   user_id: INTEGER FK → users.id (unique)
-   company_info: JSON
-   status: ENUM('active','inactive','suspended')

Associations:

-   Vendor.belongsTo(User, { as: 'user' })
-   Vendor.hasMany(Trek, { as: 'treks' })

---

## 10. Controllers & Routes

We will create controller and route files under `backend/controllers/` and `backend/routes/` for each feature.

### 10.1 User Management

Files:

-   `backend/controllers/userController.js` ✅
-   `backend/routes/userRoutes.js` ✅

API Endpoints:

-   GET `/api/users` → getAllUsers (protected, admin) ✅
-   GET `/api/users/:id` → getUserById (protected, admin) ✅
-   PUT `/api/users/:id` → updateUser (protected, admin) ✅
-   DELETE `/api/users/:id` → deleteUser (protected, admin) ✅

Express Mount:

-   `app.use('/api/users', userRoutes);` ✅

### 10.2 Vendor Management

Files:

-   `backend/controllers/vendorController.js` ✅
-   `backend/routes/vendorRoutes.js` ✅

API Endpoints:

-   GET `/api/vendors` → getVendors (protected) ✅
-   POST `/api/vendors` → createVendor (protected) ✅
-   PATCH `/api/vendors/:id/status` → updateVendorStatus (protected) ✅

Express Mount:

-   `app.use('/api/vendors', vendorRoutes);` ✅

### 10.3 Trek Management

Files:

-   `backend/controllers/trekController.js` ✅
-   `backend/routes/trekRoutes.js` ✅

API Endpoints:

-   POST `/api/vendor/treks` → createTrek (vendor protected) ✅
-   GET `/api/vendor/treks` → getVendorTreks (vendor protected) ✅
-   GET `/api/vendor/treks/:id` → getTrekById (vendor protected) ✅
-   PUT `/api/vendor/treks/:id` → updateTrek (vendor protected) ✅
-   DELETE `/api/vendor/treks/:id` → deleteTrek (vendor protected) ✅
-   PATCH `/api/vendor/treks/:id/status` → toggleTrekStatus (vendor protected) ✅
-   GET `/api/admin/treks` → getAllTreks (admin protected) ✅

Express Mount:

-   `app.use('/api', trekRoutes);` ✅

---

## 11. Development Sequence Plan

Based on frontend analysis, here's the strategic development sequence prioritizing dependencies and business impact:

### Phase 1: Foundation (Week 1-2) ✅ COMPLETED

1. **Authentication System** ✅

    - JWT-based auth with login/register
    - Role-based access control
    - Frontend AuthContext integration

2. **User Management** ✅

    - Admin user CRUD operations
    - User listing and filtering
    - Basic user profile management

3. **Vendor Management** ✅
    - Vendor registration and approval workflow
    - Vendor status management
    - Basic vendor operations

### Phase 2: Core Business Logic (Week 3-4) ✅ COMPLETED

4. **Trek Management** ✅ COMPLETED

    - Create/Edit/Delete treks (Vendor) ✅
    - Trek categories and batches ✅
    - Trek images and itinerary management ✅
    - Safety guidelines and accommodations ✅
    - Admin trek oversight and approval ✅
    - Multi-step form with 12 comprehensive steps ✅
    - Image upload with 50MB payload support ✅
    - Dynamic itinerary and accommodation management ✅
    - Form submission fixes (prevent premature submission) ✅

5. **Location Management** 🔄 NEXT
    - Cities and pickup points
    - Location mapping
    - Weather integration (optional)

### Phase 3: Booking System (Week 5-6)

6. **Booking Engine**

    - Booking creation and management
    - Payment logging and tracking
    - Booking status workflow
    - Cancellation and refund handling

7. **Customer Management**
    - Customer profiles and preferences
    - Booking history
    - Emergency contacts

### Phase 4: Business Operations (Week 7-8)

8. **Financial Management**

    - Revenue tracking and analytics
    - Commission calculations
    - Settlement management
    - Manual payment processing

9. **Coupon & Campaign System**
    - Coupon creation and management
    - Campaign tracking
    - User assignment and usage tracking

### Phase 5: Communication & Support (Week 9-10)

10. **Communication System**

    -   Email templates and notifications
    -   Push notifications
    -   Scheduled messaging
    -   Alert system

11. **Support & Reviews**
    -   Customer support tickets
    -   Review and rating system
    -   Complaint handling
    -   Vendor issue management

### Phase 6: Advanced Features (Week 11-12)

12. **Analytics & Reporting**

    -   Dashboard analytics
    -   Performance metrics
    -   Revenue reports
    -   Vendor performance tracking

13. **System Administration**
    -   API key management
    -   System health monitoring
    -   Maintenance mode
    -   Version control

### Phase 7: Final Integration (Week 13-14)

14. **Withdrawal System**

    -   Vendor withdrawal requests
    -   Approval workflow
    -   Payment processing integration

15. **Advanced Admin Features**
    -   Role and permission management
    -   Advanced user management
    -   System policies and settings

### Development Priorities by Frontend Pages:

**High Priority (Core Business)**:

-   `/admin/dashboard` - Overview metrics and KPIs
-   `/admin/vendors` - Vendor management and verification ✅
-   `/admin/treks` - Trek approval and management ✅
-   `/admin/bookings` - Booking oversight and management
-   `/vendor/dashboard` - Vendor overview and metrics
-   `/vendor/treks` - Trek creation and management ✅
-   `/vendor/create-trek` - New trek creation ✅
-   `/vendor/edit-trek` - Trek editing ✅
-   `/vendor/bookings` - Booking management

**Medium Priority (Operations)**:

-   `/admin/users` - User management ✅
-   `/admin/coupons` - Coupon and campaign management
-   `/admin/finance` - Financial operations
-   `/admin/analytics` - Business intelligence
-   `/vendor/customers` - Customer relationship management
-   `/vendor/reviews` - Review management

**Lower Priority (Support & Admin)**:

-   `/admin/communications` - Communication management
-   `/admin/support` - Support ticket system
-   `/admin/locations` - Location management 🔄 NEXT
-   `/admin/system` - System administration
-   `/vendor/messages` - Vendor communication
-   `/vendor/reports` - Vendor reporting
-   `/vendor/withdrawals` - Withdrawal management

### Current Status:

-   ✅ **Phase 1 COMPLETE**: Authentication, User Management, Basic Vendor Management

    -   ✅ **Authentication System**: Fully functional with JWT tokens, role-based routing
        -   Login/Register with phone field support
        -   Role-based redirection (admin → /admin, vendor → /vendor, user → /)
        -   Token persistence and validation
        -   Test accounts: admin@aorbo.com / admin123
        -   Direct API calls to backend (no proxy)
        -   Environment-based configuration (.env files)
    -   ✅ **User Management**: Admin CRUD operations working
    -   ✅ **Vendor Management**: Basic vendor operations implemented
    -   ✅ **API Configuration**:
        -   Frontend: http://localhost:8080 → Backend: http://localhost:5000
        -   CORS properly configured
        -   Environment variables for all configurations

-   ✅ **Phase 2 COMPLETE**: Core Business Logic

    -   ✅ **Trek Management**: Fully implemented with comprehensive features
        -   Multi-step trek creation (12 steps) with form submission fixes
        -   Image upload support (base64 handling, 50MB payload limit)
        -   Dynamic itinerary management (day-wise activities)
        -   Inclusions/exclusions handling
        -   Meeting points and pickup locations
        -   Accommodation management
        -   Trek status management (published/draft)
        -   Vendor isolation (each vendor sees only their treks)
        -   CRUD operations: Create, Read, Update, Delete
        -   Admin oversight (view all treks)
        -   Form navigation fixes (prevent premature submission on images step)

-   🔄 **Phase 3 Ready**: Location Management module
    -   📋 **Next Steps**: Implement Cities, Pickup Points, and Location Mapping

### Environment Configuration:

**Frontend (.env):**

```
VITE_API_BASE_URL=http://localhost:5000
```

**Backend (.env):**

```
NODE_ENV=development
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=aorbo_trekking
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
FRONTEND_URL=http://localhost:8080
```

**API Utility:**

-   Centralized API calls in `/src/lib/api.js`
-   Automatic JWT token inclusion
-   Environment-based base URL configuration
-   Error handling and response parsing

### Recent Fixes Applied:

**Trek Form Navigation Issue** ✅ RESOLVED:

-   **Problem**: Clicking "Next" on images step was triggering form submission instead of proceeding to final step
-   **Solution**:
    -   Added form-level `onKeyDown` handler to prevent Enter key submission except on final step
    -   Enhanced Next button with explicit `e.preventDefault()` and `e.stopPropagation()`
    -   Applied fixes to both CreateTrek and EditTrek components
-   **Result**: Users can now properly navigate through all 12 steps without premature form submission

_Document Version: 2.0_
