
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Scan } from "lucide-react";
import { ApiEndpoint, HttpMethod } from "@/types/api-hub";
import { toast } from "sonner";

// Mobile app APIs that will be used for auto-discovery
const mobileAppApisrtial<ApiEndpoint>[] = [
  // User Authentication & Profile
  {
    name: "Login/Signup with Phone",
    endpoint: "/auth/login-signup",
    method: "POST",
    description: "Handles user login or signup using a phone number and OTP.",
    requestBodySchemaON.stringify({
      phoneNumber: "string (e.g., +919876543210)"
    }, null, 2),
    responseBodySchemaON.stringify({
      message: "string",
      userId: "string (optional, if you track session before OTP verification)"
    }, null, 2),
    requestSamples: [
      {
        name: "Login Request",
        description: "Sample login request with phone number",
        bodyON.stringify({
          "phoneNumber": "+919876543210"
        }, null, 2)
    ],
    responseSamples: [
      {
        name: "OTP Sent Response",
        description: "Response after OTP is sent successfully",
        bodyON.stringify({
          "message": "OTP sent successfully",
          "userId": "user_12345"
        }, null, 2),
        statusCode: 200
    ],
    tags: ["authentication", "mobile"]
  },
  {
    name: "Verify OTP",
    endpoint: "/auth/verify-otp",
    method: "POST",
    description: "Verifies the OTP sent to the phone number for login/signup.",
    requestBodySchemaON.stringify({
      phoneNumber: "string",
      otp: "string"
    }, null, 2),
    responseBodySchemaON.stringify({
      message: "string",
      token: "string (JWT or similar auth token)",
      user: {
        id: "string",
        name: "string",
        email: "string",
        phoneNumber: "string"
    }, null, 2),
    requestSamples: [
      {
        name: "OTP Verification",
        description: "Sample OTP verification request",
        bodyON.stringify({
          "phoneNumber": "+919876543210",
          "otp": "123456"
        }, null, 2)
    ],
    responseSamples: [
      {
        name: "Successful Login",
        description: "Response after successful OTP verification",
        bodyON.stringify({
          "message": "Login successful",
          "token": "eyJhbGciOiJIUzI1Ni...",
          "user": {
            "id": "user_12345",
            "name": "John Doe",
            "email": "john.doe@example.com",
            "phoneNumber": "+919876543210"
        }, null, 2),
        statusCode: 200
    ],
    tags: ["authentication", "mobile"]
  },
  
  // Trek Discovery & Information
  {
    name: "Get Treks by City",
    endpoint: "/treks/cities/{cityId}/treks",
    method: "GET",
    description: "Retrieves a list of treks available in a specific city/location.",
    parameters: [
      { name: "cityId", value: "Mumbai", type: "string", required: true, description: "City ID or name to find treks for" }
    ],
    responseBodySchemaON.stringify([
      {
        id: "string",
        name: "string",
        subtitle: "string",
        imagePath: "string",
        price: "number",
        duration: "string",
        rating: "number",
        numberOfRatings: "number",
        isPopular: "boolean"
    ], null, 2),
    responseSamples: [
      {
        name: "Trek List by City",
        description: "Sample response for treks in Mumbai",
        bodyON.stringify([
          {
            "id": "trek_001",
            "name": "Coorg - The Scotland of India",
            "subtitle": "Misty hills, lush coffee plantations & serene waterfalls.",
            "imagePath": "https://example.com/images/coorg.jpg",
            "price": 12000,
            "duration": "3 Days / 2 Nights",
            "rating": 4.8,
            "numberOfRatings": 250,
            "isPopular": true
          },
          {
            "id": "trek_002",
            "name": "Ladakh Trek",
            "subtitle": "Experience extreme cold in winter, with temperatures dropping below freezing.",
            "imagePath": "https://example.com/images/ladakh.jpg",
            "price": 25000,
            "duration": "7 Days / 6 Nights",
            "rating": 4.5,
            "numberOfRatings": 180,
            "isPopular": false
        ], null, 2),
        statusCode: 200
    ],
    tags: ["treks", "discovery", "mobile"]
  },
  {
    name: "What's New",
    endpoint: "/whats-new",
    method: "GET",
    description: "Fetches a list of \"What's New\" promotional cards for the app.",
    responseBodySchemaON.stringify([
      {
        id: "string",
        title: "string",
        subtitle: "string",
        imagePath: "string",
        customGradient: "string",
        textColor: "string"
    ], null, 2),
    responseSamples: [
      {
        name: "What's New Cards",
        description: "Sample response with promotional cards",
        bodyON.stringify([
          {
            "id": "wn_001",
            "title": "Variety of Treks",
            "subtitle": "From Serene trails to thrilling climbs, find treks that match your vibes!",
            "imagePath": "https://example.com/images/knowmore1.png",
            "customGradient": "gradientYellow",
            "textColor": "#000000"
          },
          {
            "id": "wn_002",
            "title": "New Destination Unlocked!",
            "subtitle": "Explore the untouched beauty of the Himalayas.",
            "imagePath": "https://example.com/images/new_destination.png",
            "customGradient": "gradientBlue",
            "textColor": "#FFFFFF"
        ], null, 2),
        statusCode: 200
    ],
    tags: ["content", "mobile"]
  },
  {
    name: "Top Treks",
    endpoint: "/top-treks",
    method: "GET",
    description: "Retrieves a list of top-rated or popular treks.",
    responseBodySchemaON.stringify([
      {
        id: "string",
        title: "string",
        description: "string",
        imagePath: "string",
        gradient: "string",
        isFavorite: "boolean"
    ], null, 2),
    responseSamples: [
      {
        name: "Top Treks List",
        description: "Sample response with top treks",
        bodyON.stringify([
          {
            "id": "tt_001",
            "title": "Coorg",
            "description": "The SCOTLAND of India, offers misty hills, lush coffee plantations & serene waterfalls.",
            "imagePath": "https://example.com/images/coorg_thumbnail.jpg",
            "gradient": "gradientYellow",
            "isFavorite": false
          },
          {
            "id": "tt_002",
            "title": "Manali",
            "description": "Gateway to adventure, known for its snowy peaks and vibrant culture.",
            "imagePath": "https://example.com/images/manali_thumbnail.jpg",
            "gradient": "gradientGreen",
            "isFavorite": true
        ], null, 2),
        statusCode: 200
    ],
    tags: ["treks", "featured", "mobile"]
  },
  {
    name: "Trek Shorts",
    endpoint: "/trek-shorts",
    method: "GET",
    description: "Fetches a list of short video content or snippets related to treks.",
    responseBodySchemaON.stringify([
      {
        id: "string",
        title: "string",
        description: "string",
        imagePath: "string",
        videoUrl: "string"
    ], null, 2),
    responseSamples: [
      {
        name: "Trek Shorts List",
        description: "Sample response with trek shorts",
        bodyON.stringify([
          {
            "id": "ts_001",
            "title": "Lorem ipsum | Sit amet | consectetur adipiscing elit..",
            "description": "24M views",
            "imagePath": "https://example.com/images/shorts1.jpg",
            "videoUrl": "https://example.com/videos/short1.mp4"
          },
          {
            "id": "ts_002",
            "title": "Hiking Hacksay Safe on Trails",
            "description": "1.5M views",
            "imagePath": "https://example.com/images/shorts2.jpg",
            "videoUrl": "https://example.com/videos/short2.mp4"
        ], null, 2),
        statusCode: 200
    ],
    tags: ["content", "videos", "mobile"]
  },
  {
    name: "Seasonal Forecast",
    endpoint: "/seasonal-forecast",
    method: "GET",
    description: "Provides seasonal weather forecasts or recommendations for different trek regions.",
    responseBodySchemaON.stringify([
      {
        id: "string",
        title: "string",
        description: "string",
        imagePath: "string",
        color: "string"
    ], null, 2),
    responseSamples: [
      {
        name: "Seasonal Forecast List",
        description: "Sample response with seasonal forecasts",
        bodyON.stringify([
          {
            "id": "sf_001",
            "title": "Ladakh Trek",
            "description": "Ladakh experiences extreme cold in winter, with temperatures dropping below freezing. Best to visit in summer.",
            "imagePath": "https://example.com/images/himalayas.jpg",
            "color": "#FFC107"
          },
          {
            "id": "sf_002",
            "title": "Western Ghats Monsoon",
            "description": "Lush green landscapes and waterfalls, but expect heavy rainfall. Ideal for rain-lovers.",
            "imagePath": "https://example.com/images/western_ghats.jpg",
            "color": "#4CAF50"
        ], null, 2),
        statusCode: 200
    ],
    tags: ["weather", "seasonal", "mobile"]
  },
  {
    name: "Trek Search",
    endpoint: "/treks/search",
    method: "POST",
    description: "Searches for treks based on \"From,\" \"To,\" and \"Date\" criteria.",
    requestBodySchemaON.stringify({
      fromLocation: "string",
      toLocation: "string",
      departureDate: "string (YYYY-MM-DD)"
    }, null, 2),
    responseBodySchemaON.stringify([
      {
        id: "string",
        name: "string",
        isPopular: "boolean",
        subtitle: "string",
        imagePath: "string",
        price: "number",
        hasDiscount: "boolean",
        discountText: "string",
        duration: "string",
        rating: "number",
        numberOfRatings: "number",
        numberOfReviews: "number",
        peopleLikeRatings: "number",
        departureDate: "string",
        slotsLeft: "number",
        itinerary: "array",
        trekRoute: "array",
        activities: "array of strings",
        reviews: "array",
        resorts: "array",
        inclusions: "array of strings",
        exclusions: "array of strings",
        imageUrls: "array of strings",
        boardingPoint: "string",
        cancellationPolicy: "string",
        otherPolicies: "string"
    ], null, 2),
    requestSamples: [
      {
        name: "Trek Search",
        description: "Sample trek search request",
        bodyON.stringify({
          "fromLocation": "Mumbai",
          "toLocation": "Leh",
          "departureDate": "2025-07-15"
        }, null, 2)
    ],
    responseSamples: [
      {
        name: "Trek Search Results",
        description: "Sample search results for treks",
        bodyON.stringify([
          {
            "id": "trek_found_001",
            "name": "Ladakh Adventure Trek",
            "isPopular": true,
            "subtitle": "An exhilarating journey through the high altitudes of Ladakh.",
            "imagePath": "https://example.com/images/ladakh_adventure.jpg",
            "price": 28000,
            "hasDiscount": true,
            "discountText": "10% Off",
            "duration": "7 Days / 6 Nights",
            "rating": 4.9,
            "numberOfRatings": 350,
            "numberOfReviews": 120,
            "peopleLikeRatings": 95,
            "departureDate": "2025-07-15",
            "slotsLeft": 15,
            "itinerary": ["Day 1rival in Leh", "Day 2climatization"],
            "activities": ["Hiking", "Camping", "Photography"],
            "inclusions": ["Accommodation", "Meals", "Guide"],
            "exclusions": ["Flights", "Personal Expenses"],
            "imageUrls": ["url1", "url2"],
            "boardingPoint": "Delhi",
            "cancellationPolicy": "Flexible"
        ], null, 2),
        statusCode: 200
    ],
    tags: ["search", "treks", "mobile"]
  },
  
  // Coupons & Discounts
  {
    name: "Coupon List",
    endpoint: "/coupons",
    method: "GET",
    description: "Retrieves a list of available discount coupons.",
    responseBodySchemaON.stringify([
      {
        id: "string",
        title: "string",
        subtitle: "string",
        color: "string",
        code: "string",
        offerAmount: "number",
        imagePath: "string"
    ], null, 2),
    responseSamples: [
      {
        name: "Coupon List",
        description: "Sample response with available coupons",
        bodyON.stringify([
          {
            "id": "coupon_001",
            "title": "Monsoon Madness",
            "subtitle": "Get 20% off on all monsoon treks!",
            "color": "#ADD8E6",
            "code": "MONSOON20",
            "offerAmount": 20,
            "imagePath": "https://example.com/images/coupon_monsoon.png"
          },
          {
            "id": "coupon_002",
            "title": "First Timer Discount",
            "subtitle": "Flat INR 500 off on your first booking.",
            "color": "#FFD700",
            "code": "WELCOME500",
            "offerAmount": 500,
            "imagePath": "https://example.com/images/coupon_welcome.png"
        ], null, 2),
        statusCode: 200
    ],
    tags: ["coupons", "discounts", "mobile"]
  },
  {
    name: "Coupon by ID",
    endpoint: "/coupons/{id}",
    method: "GET",
    description: "Retrieves details of a specific coupon by its ID.",
    parameters: [
      { name: "id", value: "coupon_001", type: "string", required: true, description: "Coupon ID" }
    ],
    responseBodySchemaON.stringify({
      id: "string",
      title: "string",
      subtitle: "string",
      color: "string",
      code: "string",
      offerAmount: "number",
      imagePath: "string"
    }, null, 2),
    responseSamples: [
      {
        name: "Coupon Details",
        description: "Sample response for a specific coupon",
        bodyON.stringify({
          "id": "coupon_001",
          "title": "Monsoon Madness",
          "subtitle": "Get 20% off on all monsoon treks!",
          "color": "#ADD8E6",
          "code": "MONSOON20",
          "offerAmount": 20,
          "imagePath": "https://example.com/images/coupon_monsoon.png"
        }, null, 2),
        statusCode: 200
    ],
    tags: ["coupons", "discounts", "mobile"]
  },
  
  // Filtering & Sorting
  {
    name: "Trek Filters",
    endpoint: "/treks/filters",
    method: "GET",
    description: "Provides available filter categories and options for trek listings.",
    responseBodySchemaON.stringify([
      {
        title: "string",
        svgPath: "string",
        options: [
          {
            name: "string",
            value: "string",
            isSelected: "boolean"
        ]
    ], null, 2),
    responseSamples: [
      {
        name: "Trek Filters",
        description: "Sample response with filter options",
        bodyON.stringify([
          {
            "title": "Sort",
            "svgPath": "assets/images/sort.svg",
            "options": [
              { "name": "Relevance", "value": "relevance", "isSelected": true },
              { "name": "Price ~ Low to high", "value": "price_asc", "isSelected": false },
              { "name": "Price ~ High to low", "value": "price_desc", "isSelected": false },
              { "name": "Newest on Top", "value": "newest", "isSelected": false },
              { "name": "Female-Exclusive", "value": "female_exclusive", "isSelected": false },
              { "name": "High Rated Treks", "value": "high_rated", "isSelected": false }
            ]
          },
          {
            "title": "Duration",
            "svgPath": "assets/images/duration.svg",
            "options": [
              { "name": "1-3 Days", "value": "1-3", "isSelected": false },
              { "name": "4-7 Days", "value": "4-7", "isSelected": false }
            ]
        ], null, 2),
        statusCode: 200
    ],
    tags: ["filters", "mobile"]
  },
  
  // Booking & Payments
  {
    name: "Create Booking",
    endpoint: "/bookings",
    method: "POST",
    description: "Initiates a trek booking with detailed traveler and payment information.",
    requestBodySchemaON.stringify({
      trekDetailId: "string",
      travellerDetails: [
        {
          name: "string",
          age: "number",
          gender: "string"
      ],
      travellerCount: "number",
      contactDetail: {
        name: "string",
        email: "string",
        phoneNumber: "string"
      },
      paymentType: "string ('full' or 'advance')",
      isFreeCancellation: "boolean",
      travelInsurance: "boolean",
      appliedCouponCode: "string (optional)"
    }, null, 2),
    responseBodySchemaON.stringify({
      message: "string",
      bookingId: "string",
      status: "string",
      totalAmount: "number",
      payableAmount: "number",
      paymentGatewayUrl: "string (optional)"
    }, null, 2),
    requestSamples: [
      {
        name: "Create Booking",
        description: "Sample booking creation request",
        bodyON.stringify({
          "trekDetailId": "trek_found_001",
          "travellerDetails": [
            { "name": "Alice Smith", "age": 28, "gender": "Female" },
            { "name": "Bob Johnson", "age": 30, "gender": "Male" }
          ],
          "travellerCount": 2,
          "contactDetail": {
            "name": "Alice Smith",
            "email": "alice.smith@example.com",
            "phoneNumber": "+919988776655"
          },
          "paymentType": "full",
          "isFreeCancellation": true,
          "travelInsurance": false,
          "appliedCouponCode": "WELCOME500"
        }, null, 2)
    ],
    responseSamples: [
      {
        name: "Booking Confirmation",
        description: "Sample booking confirmation response",
        bodyON.stringify({
          "message": "Booking initiated successfully",
          "bookingId": "booking_XYZ789",
          "status": "pending_payment",
          "totalAmount": 28000,
          "payableAmount": 27500,
          "paymentGatewayUrl": "https://payment.gateway.com/pay?bookingId=booking_XYZ789"
        }, null, 2),
        statusCode: 201
    ],
    tags: ["booking", "payments", "mobile"]
  },
  {
    name: "Update Traveller Details",
    endpoint: "/bookings/{bookingId}/travellers",
    method: "POST",
    description: "Updates or adds individual traveller details for an ongoing booking.",
    parameters: [
      { name: "bookingId", value: "booking_XYZ789", type: "string", required: true, description: "Booking ID" }
    ],
    requestBodySchemaON.stringify({
      name: "string",
      age: "number",
      gender: "string"
    }, null, 2),
    responseBodySchemaON.stringify({
      message: "string",
      travellerId: "string",
      bookingId: "string"
    }, null, 2),
    requestSamples: [
      {
        name: "Add Traveller",
        description: "Sample request to add a traveller",
        bodyON.stringify({
          "name": "Charlie Brown",
          "age": 25,
          "gender": "Male"
        }, null, 2)
    ],
    responseSamples: [
      {
        name: "Traveller Added",
        description: "Sample response after adding a traveller",
        bodyON.stringify({
          "message": "Traveller details added successfully",
          "travellerId": "traveller_003",
          "bookingId": "booking_XYZ789"
        }, null, 2),
        statusCode: 200
    ],
    tags: ["booking", "travellers", "mobile"]
  },
  {
    name: "Get Trek Ticket",
    endpoint: "/tickets/{ticketId}",
    method: "GET",
    description: "Retrieves the details of a confirmed trek ticket.",
    parameters: [
      { name: "ticketId", value: "ticket_ABC123", type: "string", required: true, description: "Ticket ID" }
    ],
    responseBodySchemaON.stringify({
      ticketId: "string",
      bookingId: "string",
      trekName: "string",
      departureDate: "string",
      totalTravellers: "number",
      travellerDetails: [
        {
          name: "string",
          gender: "string",
          age: "number"
      ],
      qrCodeUrl: "string",
      status: "string",
      boardingPoint: "string"
    }, null, 2),
    responseSamples: [
      {
        name: "Ticket Details",
        description: "Sample response with ticket details",
        bodyON.stringify({
          "ticketId": "ticket_ABC123",
          "bookingId": "booking_XYZ789",
          "trekName": "Ladakh Adventure Trek",
          "departureDate": "2025-07-15",
          "totalTravellers": 2,
          "travellerDetails": [
            { "name": "Alice Smith", "gender": "Female", "age": 28 },
            { "name": "Bob Johnson", "gender": "Male", "age": 30 }
          ],
          "qrCodeUrl": "https://example.com/qrcodes/ticket_ABC123.png",
          "status": "confirmed",
          "boardingPoint": "Delhi"
        }, null, 2),
        statusCode: 200
    ],
    tags: ["tickets", "booking", "mobile"]
  },
  {
    name: "Cancel Booking",
    endpoint: "/bookings/{id}",
    method: "DELETE",
    description: "Cancels a specific trek booking.",
    parameters: [
      { name: "id", value: "booking_XYZ789", type: "string", required: true, description: "Booking ID" }
    ],
    responseBodySchemaON.stringify({
      message: "string",
      bookingId: "string",
      status: "string",
      refundAmount: "number (if applicable)"
    }, null, 2),
    responseSamples: [
      {
        name: "Booking Cancellation",
        description: "Sample response after cancelling a booking",
        bodyON.stringify({
          "message": "Booking cancelled successfully",
          "bookingId": "booking_XYZ789",
          "status": "cancelled",
          "refundAmount": 20000
        }, null, 2),
        statusCode: 200
    ],
    tags: ["booking", "cancellation", "mobile"]
  },
  
  // Reviews & Feedback
  {
    name: "Submit Trek Review",
    endpoint: "/treks/{trekId}/reviews",
    method: "POST",
    description: "Submits a review and rating for a specific trek.",
    parameters: [
      { name: "trekId", value: "trek_found_001", type: "string", required: true, description: "Trek ID" }
    ],
    requestBodySchemaON.stringify({
      rating: "number (1-5)",
      reviewType: "string",
      message: "string"
    }, null, 2),
    responseBodySchemaON.stringify({
      message: "string",
      reviewId: "string",
      trekId: "string"
    }, null, 2),
    requestSamples: [
      {
        name: "Submit Review",
        description: "Sample review submission request",
        bodyON.stringify({
          "rating": 5,
          "reviewType": "trek_experience",
          "message": "Absolutely loved the trek! The views were breathtaking and the guide was excellent."
        }, null, 2)
    ],
    responseSamples: [
      {
        name: "Review Submitted",
        description: "Sample response after submitting a review",
        bodyON.stringify({
          "message": "Review submitted successfully",
          "reviewId": "review_456",
          "trekId": "trek_found_001"
        }, null, 2),
        statusCode: 201
    ],
    tags: ["reviews", "feedback", "mobile"]
  },
  
  // General App Features
  {
    name: "Get User's Travellers",
    endpoint: "/users/{userId}/travellers",
    method: "GET",
    description: "Retrieves all saved traveller profiles for the logged-in user.",
    parameters: [
      { name: "userId", value: "user_12345", type: "string", required: true, description: "User ID" }
    ],
    responseBodySchemaON.stringify([
      {
        id: "string",
        name: "string",
        age: "number",
        gender: "string"
    ], null, 2),
    responseSamples: [
      {
        name: "User's Travellers",
        description: "Sample response with user's saved travellers",
        bodyON.stringify([
          { "id": "trav_001", "name": "Alice Smith", "age": 28, "gender": "Female" },
          { "id": "trav_002", "name": "Bob Johnson", "age": 30, "gender": "Male" }
        ], null, 2),
        statusCode: 200
    ],
    tags: ["users", "travellers", "mobile"]
  },
  {
    name: "Get User's Bookings",
    endpoint: "/users/{userId}/bookings",
    method: "GET",
    description: "Fetches all bookings made by the logged-in user.",
    parameters: [
      { name: "userId", value: "user_12345", type: "string", required: true, description: "User ID" }
    ],
    responseBodySchemaON.stringify([
      {
        bookingId: "string",
        trekName: "string",
        departureDate: "string",
        status: "string",
        totalAmount: "number",
        ticketsCount: "number",
        image: "string"
    ], null, 2),
    responseSamples: [
      {
        name: "User's Bookings",
        description: "Sample response with user's bookings",
        bodyON.stringify([
          {
            "bookingId": "booking_XYZ789",
            "trekName": "Ladakh Adventure Trek",
            "departureDate": "2025-07-15",
            "status": "confirmed",
            "totalAmount": 27500,
            "ticketsCount": 2,
            "image": "https://example.com/images/ladakh_thumbnail.jpg"
          },
          {
            "bookingId": "booking_PQR321",
            "trekName": "Coorg Misty Trails",
            "departureDate": "2025-08-01",
            "status": "completed",
            "totalAmount": 12000,
            "ticketsCount": 1,
            "image": "https://example.com/images/coorg_thumbnail.jpg"
        ], null, 2),
        statusCode: 200
    ],
    tags: ["bookings", "users", "mobile"]
  },
  {
    name: "Get Safety Contacts",
    endpoint: "/safety-contacts",
    method: "GET",
    description: "Retrieves saved emergency/safety contacts for the user.",
    responseBodySchemaON.stringify([
      {
        id: "string",
        name: "string",
        number: "string"
    ], null, 2),
    responseSamples: [
      {
        name: "Safety Contacts",
        description: "Sample response with user's safety contacts",
        bodyON.stringify([
          { "id": "sc_001", "name": "Emergency Contact 1", "number": "+911234567890" },
          { "id": "sc_002", "name": "Family Member", "number": "+919988776655" }
        ], null, 2),
        statusCode: 200
    ],
    tags: ["safety", "contacts", "mobile"]
  },
  {
    name: "Add Safety Contact",
    endpoint: "/safety-contacts",
    method: "POST",
    description: "Adds a new emergency/safety contact for the user.",
    requestBodySchemaON.stringify({
      name: "string",
      number: "string",
      userId: "string"
    }, null, 2),
    responseBodySchemaON.stringify({
      id: "string",
      message: "string",
      name: "string",
      number: "string"
    }, null, 2),
    requestSamples: [
      {
        name: "Add Safety Contact",
        description: "Sample request to add a safety contact",
        bodyON.stringify({
          "name": "Emergency Contact 1",
          "number": "+911234567890",
          "userId": "user_12345"
        }, null, 2)
    ],
    responseSamples: [
      {
        name: "Safety Contact Added",
        description: "Sample response after adding a safety contact",
        bodyON.stringify({
          "id": "sc_001",
          "message": "Safety contact added successfully",
          "name": "Emergency Contact 1",
          "number": "+911234567890"
        }, null, 2),
        statusCode: 201
    ],
    tags: ["safety", "contacts", "mobile"]
  },
  {
    name: "Get Notifications",
    endpoint: "/notifications",
    method: "GET",
    description: "Retrieves user notifications (e.g., push notifications, in-app messages).",
    responseBodySchemaON.stringify([
      {
        id: "string",
        title: "string",
        message: "string",
        timestamp: "string (ISO 8601 format)",
        read: "boolean"
    ], null, 2),
    responseSamples: [
      {
        name: "User Notifications",
        description: "Sample response with user notifications",
        bodyON.stringify([
          {
            "id": "notif_001",
            "title": "Welcome to TrekApp!",
            "message": "Explore amazing treks across India.",
            "timestamp": "2025-06-01T10:00:00Z",
            "read": false
          },
          {
            "id": "notif_002",
            "title": "New Trek Added!",
            "message": "Discover the hidden trails of Spiti Valley.",
            "timestamp": "2025-06-05T14:30:00Z",
            "read": true
        ], null, 2),
        statusCode: 200
    ],
    tags: ["notifications", "mobile"]
  },
  {
    name: "Send Notification",
    endpoint: "/notifications",
    method: "POST",
    description: "Sends a notification to a specific user (for admin testing).",
    requestBodySchemaON.stringify({
      userId: "string",
      title: "string",
      message: "string",
      type: "string",
      link: "string (optional)"
    }, null, 2),
    responseBodySchemaON.stringify({
      id: "string",
      message: "string",
      userId: "string"
    }, null, 2),
    requestSamples: [
      {
        name: "Send Notification",
        description: "Sample request to send a notification",
        bodyON.stringify({
          "userId": "user_12345",
          "title": "Booking Reminder",
          "message": "Your trek to Ladakh is starting tomorrow! Don't forget your essentials.",
          "type": "reminder",
          "link": "/bookings/booking_XYZ789"
        }, null, 2)
    ],
    responseSamples: [
      {
        name: "Notification Sent",
        description: "Sample response after sending a notification",
        bodyON.stringify({
          "id": "notif_003",
          "message": "Notification sent successfully",
          "userId": "user_12345"
        }, null, 2),
        statusCode: 201
    ],
    tags: ["notifications", "admin", "mobile"]
  },
  {
    name: "About Us",
    endpoint: "/about-us",
    method: "GET",
    description: "Retrieves \"About Us\" content for the application.",
    responseBodySchemaON.stringify({
      title: "string",
      content: "string",
      version: "string",
      contactEmail: "string",
      website: "string"
    }, null, 2),
    responseSamples: [
      {
        name: "About Us Content",
        description: "Sample response with app information",
        bodyON.stringify({
          "title": "About TrekApp",
          "content": "TrekApp is your ultimate companion for exploring the beautiful treks of India. We connect adventurers with curated trekking experiences, expert guides, and unforgettable journeys.",
          "version": "1.0.0",
          "contactEmail": "support@trekapp.com",
          "website": "https://www.trekapp.com"
        }, null, 2),
        statusCode: 200
    ],
    tags: ["content", "info", "mobile"]
  },
  {
    name: "Logout",
    endpoint: "/auth/logout",
    method: "POST",
    description: "Invalidates the user's current session/token.",
    requestBodySchemaON.stringify({}, null, 2),
    responseBodySchemaON.stringify({
      message: "string"
    }, null, 2),
    requestSamples: [
      {
        name: "Logout Request",
        description: "Sample logout request (usually empty)",
        bodyON.stringify({}, null, 2)
    ],
    responseSamples: [
      {
        name: "Logout Success",
        description: "Sample response after successful logout",
        bodyON.stringify({
          "message": "Logged out successfully"
        }, null, 2),
        statusCode: 200
    ],
    tags: ["authentication", "mobile"]
  },
  {
    name: "Get Booking Details",
    endpoint: "/bookings/{id}",
    method: "GET",
    description: "Retrieves details for a specific booking by its ID.",
    parameters: [
      { name: "id", value: "booking_XYZ789", type: "string", required: true, description: "Booking ID" }
    ],
    responseBodySchemaON.stringify({
      id: "string",
      userId: "string",
      trekId: "string",
      trekName: "string",
      departureDate: "string",
      status: "string",
      totalAmount: "number",
      payableAmount: "number",
      paymentStatus: "string",
      travellers: "array",
      createdAt: "string",
      updatedAt: "string"
    }, null, 2),
    responseSamples: [
      {
        name: "Booking Details",
        description: "Sample response with detailed booking information",
        bodyON.stringify({
          "id": "booking_XYZ789",
          "userId": "user_12345",
          "trekId": "trek_found_001",
          "trekName": "Ladakh Adventure Trek",
          "departureDate": "2025-07-15",
          "status": "confirmed",
          "totalAmount": 28000,
          "payableAmount": 27500,
          "paymentStatus": "paid",
          "travellers": [
            { "name": "Alice Smith", "age": 28, "gender": "Female" },
            { "name": "Bob Johnson", "age": 30, "gender": "Male" }
          ],
          "createdAt": "2025-06-01T12:00:00Z",
          "updatedAt": "2025-06-01T12:30:00Z"
        }, null, 2),
        statusCode: 200
    ],
    tags: ["booking", "details", "mobile"]
  },
  {
    name: "Get What's New Details",
    endpoint: "/whats-new/{id}",
    method: "GET",
    description: "Retrieves details for a specific \"What's New\" card by its ID.",
    parameters: [
      { name: "id", value: "wn_001", type: "string", required: true, description: "What's New ID" }
    ],
    responseBodySchemaON.stringify({
      id: "string",
      title: "string",
      subtitle: "string",
      content: "string",
      imagePath: "string",
      customGradient: "string",
      textColor: "string",
      createdAt: "string"
    }, null, 2),
    responseSamples: [
      {
        name: "What's New Details",
        description: "Sample response with detailed what's new card information",
        bodyON.stringify({
          "id": "wn_001",
          "title": "Variety of Treks",
          "subtitle": "From Serene trails to thrilling climbs, find treks that match your vibes!",
          "content": "TrekApp now offers over 100 unique treks across different terrains, difficulty levels, and durations. Whether you're a beginner looking for a gentle hike or an experienced trekker seeking a challenge, we have something for everyone.",
          "imagePath": "https://example.com/images/knowmore1.png",
          "customGradient": "gradientYellow",
          "textColor": "#000000",
          "createdAt": "2025-05-15T08:30:00Z"
        }, null, 2),
        statusCode: 200
    ],
    tags: ["content", "details", "mobile"]
];

// Mock data for previously discovered APIs
const mockDiscoveredApisrtial<ApiEndpoint>[] = [
  // Import the existing mock data here
  {
    name: "Get User Profile",
    endpoint: "/api/users/profile",
    method: "GET",
    description: "Retrieves the current user's profile information",
    parameters: [
      { name: "include_preferences", value: "true", type: "boolean", required: false, description: "Include user preferences in response" }
    ]
  },
  {
    name: "Update User Profile",
    endpoint: "/api/users/profile",
    method: "PUT",
    description: "Updates the current user's profile information",
    requestBodySchemaON.stringify({
      name: "string",
      bio: "string",
      preferences: { theme: "string", notifications: "boolean" }
    }, null, 2)
  },
  {
    name: "List Bookings",
    endpoint: "/api/bookings",
    method: "GET",
    description: "List all bookings for the current user",
    parameters: [
      { name: "status", value: "active", type: "string", required: false, description: "Filter by booking status" },
      { name: "limit", value: "10", type: "number", required: false, description: "Number of results to return" },
      { name: "offset", value: "0", type: "number", required: false, description: "Number of results to skip" }
    ]
  },
  {
    name: "Create Booking",
    endpoint: "/api/bookings",
    method: "POST",
    description: "Create a new booking",
    requestBodySchemaON.stringify({
      trek_id: "number",
      trek_date: "string (YYYY-MM-DD)",
      participants: "number",
      pickup_point_id: "string"
    }, null, 2)
  },
  {
    name: "Get Available Trek Dates",
    endpoint: "/api/treks/{id}/dates",
    method: "GET",
    description: "Get available dates for a specific trek",
    parameters: [
      { name: "id", value: "1", type: "number", required: true, description: "Trek ID" },
      { name: "month", value: "6", type: "number", required: false, description: "Month (1-12)" },
      { name: "year", value: "2025", type: "number", required: false, description: "Year" }
    ]
  },
  {
    name: "Check Coupon Validity",
    endpoint: "/api/coupons/check",
    method: "POST",
    description: "Check if a coupon code is valid and get discount information",
    requestBodySchemaON.stringify({
      code: "string",
      trek_id: "number",
      amount: "number"
    }, null, 2)
  },
  {
    name: "Mobile App Configuration",
    endpoint: "/api/mobile/config",
    method: "GET",
    description: "Get configuration for mobile app",
    parameters: [
      { name: "version", value: "1.0.0", type: "string", required: false, description: "App version" },
      { name: "platform", value: "ios", type: "string", required: false, description: "Mobile platform (ios/android)" }
    ],
    tags: ["mobile"]
];

// Combine all APIs for discovery
const combinedDiscoverableApis = [...mockDiscoveredApis, ...mobileAppApis];

  onApiDiscovered: (apiiEndpoint) => void;
  id;

const ApiDiscoveryTool = ({ onApiDiscovered, id }iDiscoveryToolProps) => {
  const [isDiscovering, setIsDiscovering] = useState(false);

  const handleDiscover = async () => {
    setIsDiscovering(true);
    
    try {
      // Simulate API discovery with a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Process each discovered API
      let discoveredCount = 0;
      
      for (const api of combinedDiscoverableApis) {
        if (api.name || !api.endpoint || !api.method) continue;
        
        // Create a complete API endpoint object
        const apiEndpointiEndpoint = {
          name: api.name,
          endpoint: api.endpoint,
          method: api.method,
          description: api.description,
          parameters: api.parameters,
          requestBodySchema: api.requestBodySchema,
          responseBodySchema: api.responseBodySchema,
          requestSamples: api.requestSamples,
          responseSamples: api.responseSamples,
          tags: api.tags,
          is_internal: true,
          is_documented: false
        };
        
        // Pass the discovered API to the parent component
        onApiDiscovered(apiEndpoint);
        discoveredCount++;
      
      toast.success(`Discovered ${discoveredCount} APIs`);
    } catch (error) {
      console.error("Error discovering APIs:", error);
      toast.error("Failed to discover APIs");
    } finally {
      setLoading(false);
    }
      setIsDiscovering(false);
  };

  return (
    <Button 
      onClick={handleDiscover} 
      disabled={isDiscovering}
      id={id}
      className="flex items-center gap-2"
    >
      <Scan className={`h-4 w-4 ${isDiscovering ? 'animate-spin' : ''}`} />
      {isDiscovering ? "Discovering..." : "Discover APIs"}
    </Button>
  );
};

export default ApiDiscoveryTool;
