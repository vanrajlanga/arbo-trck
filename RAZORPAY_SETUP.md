# Razorpay Payment Integration Setup

## Backend Setup

1. **Install Razorpay package:**

    ```bash
    npm install razorpay
    ```

2. **Add environment variables to `.env`:**

    ```env
    RAZORPAY_KEY_ID=rzp_test_YOUR_KEY_ID
    RAZORPAY_KEY_SECRET=YOUR_KEY_SECRET
    ```

3. **Create `.env` file in backend root directory** (see `backend/ENVIRONMENT_SETUP.md` for complete setup)

4. **Backend files created:**
    - `config/razorpay.js` - Razorpay configuration
    - `utils/razorpayUtils.js` - Payment utilities
    - Updated `controllers/bookingController.js` - Payment endpoints
    - Updated `routes/vendor/bookingRoutes.js` - Payment routes
    - `ENVIRONMENT_SETUP.md` - Environment variables guide

## Frontend Setup

1. **Install Razorpay package:**

    ```bash
    npm install razorpay
    ```

2. **Add environment variables to `.env`:**

    ```env
    VITE_RAZORPAY_KEY_ID=rzp_test_YOUR_KEY_ID
    ```

3. **Frontend files updated:**
    - `index.html` - Added Razorpay SDK script
    - `src/pages/vendor/Bookings.jsx` - Updated booking flow
    - `src/lib/api.js` - Added payment API methods

## Payment Flow

1. **User selects trek → fills details → taps Pay**
2. **Frontend calls:** `POST /api/vendor/bookings/create-trek-order`
3. **Backend creates Razorpay order → sends orderId**
4. **Frontend opens Razorpay checkout with orderId**
5. **Payment successful → Frontend sends paymentId, orderId, signature**
6. **Backend verifies Razorpay signature**
7. **If valid → marks booking as confirmed → sends confirmation**

## API Endpoints

### Create Payment Order

```
POST /api/vendor/bookings/create-trek-order
Body: {
  trekId: number,
  customerId: number,
  travelers: array,
  finalAmount: number
}
```

### Verify Payment

```
POST /api/vendor/bookings/verify-payment
Body: {
  orderId: string,
  paymentId: string,
  signature: string,
  trekId: number,
  customerId: number,
  travelers: array,
  finalAmount: number,
  pickupPointId: number,
  couponCode: string
}
```

## Testing

1. Use Razorpay test keys for development
2. Test with test card numbers provided by Razorpay
3. Verify payment flow end-to-end
4. Check booking creation and payment logs

## Security Notes

1. Always verify Razorpay signature on backend
2. Never expose secret key on frontend
3. Validate payment amount on backend
4. Check payment status before creating booking

## Troubleshooting

### "key_id or oauthToken is mandatory" Error

-   **Cause:** Razorpay environment variables not set
-   **Solution:** Add `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` to backend `.env` file

### "Razorpay is not configured" Error

-   **Cause:** Missing environment variables
-   **Solution:** Set up environment variables as described above

### Frontend Payment Not Working

-   **Cause:** Missing `VITE_RAZORPAY_KEY_ID` environment variable
-   **Solution:** Add the variable to frontend `.env` file

### Test Mode

-   Use Razorpay test keys for development
-   Test with card number: `4111 1111 1111 1111`
-   Any future expiry date and any CVV
