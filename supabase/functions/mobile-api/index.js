
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    )

    const url = new URL(req.url);
    const path = url.pathname.replace('/functions/v1', '');
    const method = req.method;

    console.log(`Mobile API Request: ${method} ${path}`);

    // Route all mobile-api requests
    if (path.startsWith('/mobile-api/')) {
      const apiPath = path.replace('/mobile-api', '');
      
      // Authentication endpoints
      if (apiPath === '/auth/login-signup' && method === 'POST') {
        return await handleLoginSignup(req);
      }
      
      if (apiPath === '/auth/logout' && method === 'POST') {
        return await handleLogout(req);
      }

      // Location endpoints
      if (apiPath === '/locations/from-cities' && method === 'GET') {
        return await handleFromCities(supabaseClient);
      }
      
      if (apiPath === '/locations/to-destinations' && method === 'GET') {
        return await handleToDestinations(supabaseClient);
      }

      // Content endpoints
      if (apiPath === '/whats-new' && method === 'GET') {
        return await handleWhatsNew(supabaseClient);
      }
      
      const whatsNewMatch = apiPath.match(/^\/whats-new\/([^\/]+)$/);
      if (whatsNewMatch && method === 'GET') {
        return await handleWhatsNewById(supabaseClient, whatsNewMatch[1]);
      }
      
      if (apiPath === '/top-treks' && method === 'GET') {
        return await handleTopTreks(supabaseClient);
      }
      
      if (apiPath === '/trek-shorts' && method === 'GET') {
        return await handleTrekShorts(supabaseClient);
      }
      
      if (apiPath === '/seasonal-forecast' && method === 'GET') {
        return await handleSeasonalForecast(supabaseClient);
      }

      // Trek management endpoints
      if (apiPath === '/treks/search' && method === 'POST') {
        return await handleTrekSearch(req, supabaseClient);
      }
      
      if (apiPath === '/treks/filters' && method === 'GET') {
        return await handleTrekFilters(supabaseClient);
      }
      
      const trekReviewMatch = apiPath.match(/^\/treks\/([^\/]+)\/reviews$/);
      if (trekReviewMatch && method === 'POST') {
        return await handleTrekReviews(req, supabaseClient, trekReviewMatch[1]);
      }

      // Booking endpoints
      if (apiPath === '/bookings' && method === 'POST') {
        return await handleCreateBooking(req, supabaseClient);
      }
      
      if (apiPath === '/bookings' && method === 'GET') {
        return await handleGetBookings(supabaseClient, req);
      }
      
      const bookingMatch = apiPath.match(/^\/bookings\/([^\/]+)$/);
      if (bookingMatch && method === 'GET') {
        return await handleGetBookingById(supabaseClient, bookingMatch[1]);
      }
      
      if (bookingMatch && method === 'DELETE') {
        return await handleCancelBooking(supabaseClient, bookingMatch[1]);
      }
      
      const ticketMatch = apiPath.match(/^\/tickets\/([^\/]+)$/);
      if (ticketMatch && method === 'GET') {
        return await handleGetTicket(supabaseClient, ticketMatch[1]);
      }

      // User profile endpoints
      if (apiPath === '/traveller-details' && method === 'PUT') {
        return await handleUpdateTravellerDetails(req, supabaseClient);
      }
      
      if (apiPath === '/traveller-details' && method === 'GET') {
        return await handleGetTravellerDetails(supabaseClient, req);
      }

      // Coupon endpoints
      if (apiPath === '/coupons' && method === 'GET') {
        return await handleGetCoupons(supabaseClient);
      }
      
      const couponMatch = apiPath.match(/^\/coupons\/([^\/]+)$/);
      if (couponMatch && method === 'GET') {
        return await handleGetCouponById(supabaseClient, couponMatch[1]);
      }

      // Safety & Communication endpoints
      if (apiPath === '/safety-contacts' && method === 'POST') {
        return await handleCreateSafetyContact(req, supabaseClient);
      }
      
      if (apiPath === '/safety-contacts' && method === 'GET') {
        return await handleGetSafetyContacts(supabaseClient, req);
      }
      
      if (apiPath === '/notifications' && method === 'GET') {
        return await handleGetNotifications(supabaseClient, req);
      }
      
      if (apiPath === '/notifications' && method === 'POST') {
        return await handleCreateNotification(req, supabaseClient);
      }

      // General information endpoints
      if (apiPath === '/about-us' && method === 'GET') {
        return await handleAboutUs(supabaseClient);
      }
    }

    // Default 404 response
    return new Response(
      JSON.stringify({ 
        error: 'Endpoint not found', 
        path: path,
        method: method,
        message: 'The requested endpoint does not exist'
      }),
      { 
        status: 404, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Mobile API Error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error', 
        message: error.message,
        timestamp: new Date().toISOString()
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});

// Authentication handlers
async function handleLoginSignup(req: Request) {
  try {
    const body = await req.text();
    const requestData = body ? JSON.parse(body) : {};
    const { phone, email } = requestData;
    
    console.log('Login/Signup request:', { phone, email });
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'OTP sent successfully',
        otp: '123456', // Mock OTP for testing
        phone: phone || email,
        user_id: 'user_' + Date.now()
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Login signup error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Invalid request body',
        message: 'Please provide valid phone or email'
      }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
}

async function handleLogout(req: Request) {
  return new Response(
    JSON.stringify({ 
      success: true, 
      message: 'Logged out successfully',
      timestamp: new Date().toISOString()
    }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

// Location handlers
async function handleFromCities(supabase: any) {
  try {
    const { data, error } = await supabase
      .from('locations')
      .select('*')
      .eq('is_active', true)
      .limit(20);

    const cities = data || [
      { id: '1', name: 'Mumbai', state: 'Maharashtra', country: 'India' },
      { id: '2', name: 'Bangalore', state: 'Karnataka', country: 'India' },
      { id: '3', name: 'Delhi', state: 'Delhi', country: 'India' },
      { id: '4', name: 'Chennai', state: 'Tamil Nadu', country: 'India' },
      { id: '5', name: 'Kolkata', state: 'West Bengal', country: 'India' },
      { id: '6', name: 'Pune', state: 'Maharashtra', country: 'India' },
      { id: '7', name: 'Hyderabad', state: 'Telangana', country: 'India' },
      { id: '8', name: 'Ahmedabad', state: 'Gujarat', country: 'India' }
    ];

    return new Response(
      JSON.stringify({ 
        success: true,
        cities: cities,
        total: cities.length
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('From cities error:', error);
    return new Response(
      JSON.stringify({ 
        success: true,
        cities: [
          { id: '1', name: 'Mumbai', state: 'Maharashtra', country: 'India' },
          { id: '2', name: 'Bangalore', state: 'Karnataka', country: 'India' }
        ],
        total: 2
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
}

async function handleToDestinations(supabase: any) {
  try {
    const { data, error } = await supabase
      .from('locations')
      .select('*')
      .eq('is_active', true)
      .limit(20);

    const destinations = data || [
      { id: '1', name: 'Himachal Pradesh', type: 'mountain', popularity: 'high' },
      { id: '2', name: 'Uttarakhand', type: 'mountain', popularity: 'high' },
      { id: '3', name: 'Kashmir', type: 'mountain', popularity: 'medium' },
      { id: '4', name: 'Ladakh', type: 'desert_mountain', popularity: 'high' },
      { id: '5', name: 'Sikkim', type: 'mountain', popularity: 'medium' },
      { id: '6', name: 'Arunachal Pradesh', type: 'mountain', popularity: 'low' },
      { id: '7', name: 'Kerala', type: 'backwater', popularity: 'high' },
      { id: '8', name: 'Rajasthan', type: 'desert', popularity: 'medium' }
    ];

    return new Response(
      JSON.stringify({ 
        success: true,
        destinations: destinations,
        total: destinations.length
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('To destinations error:', error);
    return new Response(
      JSON.stringify({ 
        success: true,
        destinations: [
          { id: '1', name: 'Himachal Pradesh', type: 'mountain', popularity: 'high' },
          { id: '2', name: 'Uttarakhand', type: 'mountain', popularity: 'high' }
        ],
        total: 2
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
}

// Content handlers
async function handleWhatsNew(supabase: any) {
  const cards = [
    {
      id: '1',
      title: "New Trek Route: Himalayan Adventure",
      subtitle: "Discover our latest trek route through the pristine Himalayas",
      imagePath: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
      customGradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      textColor: "#ffffff",
      date: "2024-06-07",
      category: "new_routes"
    },
    {
      id: '2',
      title: "Winter Special Packages",
      subtitle: "Experience the beauty of snow-capped mountains",
      imagePath: "https://images.unsplash.com/photo-1551632811-561732d1e306",
      customGradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      textColor: "#ffffff",
      date: "2024-06-05",
      category: "offers"
    },
    {
      id: '3',
      title: "Safety Guidelines Update",
      subtitle: "Important safety measures for all trekkers",
      imagePath: "https://images.unsplash.com/photo-1551524164-687a55dd1126",
      customGradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      textColor: "#ffffff",
      date: "2024-06-03",
      category: "safety"
    }
  ];

  return new Response(
    JSON.stringify({
      success: true,
      cards: cards,
      total: cards.length
    }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

async function handleWhatsNewById(supabase: any, newsId: string) {
  const newsItem = {
    id: newsId,
    title: "New Trek Route: Himalayan Adventure",
    subtitle: "Discover our latest trek route through the pristine Himalayas",
    content: `
      <h2>Himalayan Adventure Trek</h2>
      <p>We are excited to announce our newest trek route that takes you through some of the most breathtaking landscapes in the Himalayas.</p>
      
      <h3>What's Special:</h3>
      <ul>
        <li>7-day guided expedition</li>
        <li>Professional mountain guides</li>
        <li>All safety equipment provided</li>
        <li>Stunning mountain views</li>
        <li>Cultural experiences with local communities</li>
      </ul>
      
      <h3>Difficulty Level:</h3>
      <p>Moderate to challenging - suitable for experienced trekkers</p>
      
      <h3>Best Time to Visit:</h3>
      <p>March to June and September to November</p>
    `,
    imagePath: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
    date: "2024-06-07",
    category: "new_routes",
    author: "Aorbo Treks Team",
    read_time: "5 min read"
  };

  return new Response(
    JSON.stringify({ 
      success: true,
      news: newsItem 
    }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

async function handleTopTreks(supabase: any) {
  const cards = [
    {
      id: '1',
      title: "Himalayan Base Camp Trek",
      description: "Experience the ultimate adventure to the base camp",
      imagePath: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      isFavorite: true,
      price: 25000,
      duration: "12 days",
      difficulty: "challenging",
      rating: 4.8
    },
    {
      id: '2',
      title: "Valley of Flowers",
      description: "Discover the UNESCO World Heritage site",
      imagePath: "https://images.unsplash.com/photo-1551632811-561732d1e306",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      isFavorite: false,
      price: 18000,
      duration: "7 days",
      difficulty: "moderate",
      rating: 4.6
    },
    {
      id: '3',
      title: "Kedarnath Trek",
      description: "Spiritual journey to the sacred temple",
      imagePath: "https://images.unsplash.com/photo-1551524164-6ca04ac833fb",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      isFavorite: true,
      price: 15000,
      duration: "5 days",
      difficulty: "moderate",
      rating: 4.7
    }
  ];

  return new Response(
    JSON.stringify({
      success: true,
      cards: cards,
      total: cards.length
    }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

async function handleTrekShorts(supabase: any) {
  const cards = [
    {
      id: '1',
      title: "Quick Trek Tips",
      description: "Essential tips for first-time trekkers",
      imagePath: "https://images.unsplash.com/photo-1551632811-561732d1e306",
      duration: "2 min",
      views: 1250,
      likes: 89
    },
    {
      id: '2',
      title: "Packing Essentials",
      description: "What to pack for your next adventure",
      imagePath: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
      duration: "3 min",
      views: 980,
      likes: 76
    },
    {
      id: '3',
      title: "Mountain Safety",
      description: "Stay safe on your mountain adventures",
      imagePath: "https://images.unsplash.com/photo-1551524164-687a55dd1126",
      duration: "4 min",
      views: 1450,
      likes: 112
    }
  ];

  return new Response(
    JSON.stringify({
      success: true,
      cards: cards,
      total: cards.length
    }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

async function handleSeasonalForecast(supabase: any) {
  const cards = [
    {
      id: '1',
      title: "Winter Forecast",
      description: "Perfect time for valley treks with clear skies",
      imagePath: "https://images.unsplash.com/photo-1551632811-561732d1e306",
      color: "#3B82F6",
      season: "winter",
      temperature: "-5°C to 15°C",
      conditions: "Clear skies, low humidity",
      recommendation: "Excellent for valley treks"
    },
    {
      id: '2',
      title: "Spring Season",
      description: "Ideal weather for high altitude treks",
      imagePath: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
      color: "#10B981",
      season: "spring",
      temperature: "10°C to 25°C",
      conditions: "Moderate weather, blooming flowers",
      recommendation: "Perfect for high altitude adventures"
    },
    {
      id: '3',
      title: "Monsoon Alert",
      description: "Limited trekking due to heavy rainfall",
      imagePath: "https://images.unsplash.com/photo-1551524164-687a55dd1126",
      color: "#F59E0B",
      season: "monsoon",
      temperature: "20°C to 30°C",
      conditions: "Heavy rainfall, landslide risk",
      recommendation: "Avoid high altitude treks"
    }
  ];

  return new Response(
    JSON.stringify({
      success: true,
      cards: cards,
      total: cards.length
    }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

// Trek management handlers
async function handleTrekSearch(req: Request, supabase: any) {
  try {
    const body = await req.text();
    const requestData = body ? JSON.parse(body) : {};
    const { from, to, date, filters } = requestData;
    
    console.log('Trek search request:', { from, to, date, filters });

    const mockTreks = [
      {
        id: '1',
        name: 'Himalayan Adventure Trek',
        isPopular: true,
        subtitle: 'Experience the majestic Himalayas',
        imagePath: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
        price: 15000,
        hasDiscount: true,
        discountText: '20% OFF',
        duration: '7 days',
        rating: 4.8,
        numberOfRatings: 245,
        numberOfReviews: 89,
        peopleLikeRatings: 92,
        departureDate: '2024-07-15',
        slotsLeft: 8,
        trekRoute: `${from || 'Mumbai'} → Manali → Rohtang Pass → ${from || 'Mumbai'}`,
        boardingPoint: `${from || 'Mumbai'} Central Station`,
        destination: to || 'Himachal Pradesh',
        difficulty: 'moderate',
        maxAltitude: '4200m'
      },
      {
        id: '2',
        name: 'Valley of Flowers Trek',
        isPopular: false,
        subtitle: 'Discover the beauty of alpine flowers',
        imagePath: 'https://images.unsplash.com/photo-1551632811-561732d1e306',
        price: 12000,
        hasDiscount: false,
        discountText: '',
        duration: '5 days',
        rating: 4.6,
        numberOfRatings: 156,
        numberOfReviews: 67,
        peopleLikeRatings: 88,
        departureDate: '2024-08-10',
        slotsLeft: 12,
        trekRoute: `${from || 'Delhi'} → Haridwar → Valley of Flowers → ${from || 'Delhi'}`,
        boardingPoint: `${from || 'Delhi'} Railway Station`,
        destination: to || 'Uttarakhand',
        difficulty: 'easy',
        maxAltitude: '3800m'
      }
    ];

    return new Response(
      JSON.stringify({ 
        success: true,
        treks: mockTreks,
        total: mockTreks.length,
        search_params: { from, to, date, filters }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Trek search error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Invalid request body for trek search',
        message: 'Please provide valid search parameters'
      }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
}

async function handleTrekFilters(supabase: any) {
  return new Response(
    JSON.stringify({
      success: true,
      filters: [
        {
          id: 'sort',
          title: 'Sort by',
          svgPath: 'M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12',
          options: [
            'Relevance', 
            'Price ~ Low to high', 
            'Price ~ High to low', 
            'Newest on Top', 
            'Female-Exclusive', 
            'High Rated Treks'
          ],
          isSelected: false
        },
        {
          id: 'difficulty',
          title: 'Difficulty Level',
          svgPath: 'M13 10V3L4 14h7v7l9-11h-7z',
          options: [
            'Easy',
            'Moderate', 
            'Challenging',
            'Expert'
          ],
          isSelected: false
        },
        {
          id: 'duration',
          title: 'Duration',
          svgPath: 'M12 2v10l4 4-4 4v-4H8v4l-4-4 4-4V2z',
          options: [
            '1-3 days',
            '4-7 days',
            '8-14 days',
            '15+ days'
          ],
          isSelected: false
        }
      ]
    }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

async function handleTrekReviews(req: Request, supabase: any, trekId: string) {
  try {
    const body = await req.text();
    const { rating, review_type, message } = body ? JSON.parse(body) : {};
    
    const reviewData = {
      id: 'review_' + Date.now(),
      trek_id: trekId,
      rating: rating,
      review_type: review_type,
      message: message,
      user_name: 'Anonymous User',
      created_at: new Date().toISOString()
    };
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Review submitted successfully',
        review: reviewData
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ 
        error: 'Invalid request body for review',
        message: 'Please provide rating and review message'
      }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
}

// Booking handlers
async function handleCreateBooking(req: Request, supabase: any) {
  try {
    const body = await req.text();
    const bookingData = body ? JSON.parse(body) : {};
    
    const mockBooking = {
      id: 'booking_' + Date.now(),
      trek_id: bookingData.trek_id || '1',
      user_id: bookingData.user_id || 'user_123',
      participants: bookingData.participants || 1,
      total_amount: bookingData.total_amount || 15000,
      booking_date: bookingData.booking_date || new Date().toISOString().split('T')[0],
      status: 'confirmed',
      payment_status: 'pending',
      created_at: new Date().toISOString()
    };

    return new Response(
      JSON.stringify({ 
        success: true,
        booking: mockBooking,
        message: 'Booking created successfully' 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ 
        error: 'Invalid request body for booking',
        message: 'Please provide valid booking details'
      }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
}

async function handleGetBookings(supabase: any, req: Request) {
  const url = new URL(req.url);
  const userId = url.searchParams.get('user_id');
  
  const mockBookings = [
    {
      id: 'booking_1',
      trek_name: 'Himalayan Adventure Trek',
      status: 'confirmed',
      departure_date: '2024-07-15',
      amount: 15000,
      participants: 2,
      user_id: userId || 'user_123'
    },
    {
      id: 'booking_2', 
      trek_name: 'Valley of Flowers Trek',
      status: 'pending',
      departure_date: '2024-08-10',
      amount: 12000,
      participants: 1,
      user_id: userId || 'user_123'
    }
  ];

  return new Response(
    JSON.stringify({ 
      success: true,
      bookings: mockBookings,
      total: mockBookings.length
    }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

async function handleGetBookingById(supabase: any, bookingId: string) {
  const mockBooking = {
    id: bookingId,
    trek_name: 'Himalayan Adventure Trek',
    status: 'confirmed',
    departure_date: '2024-07-15',
    amount: 15000,
    participants: ['John Doe', 'Jane Smith'],
    trek_details: {
      duration: '7 days',
      difficulty: 'moderate',
      pickup_point: 'Mumbai Central Station'
    },
    payment_details: {
      total_amount: 15000,
      paid_amount: 5000,
      remaining_amount: 10000,
      payment_status: 'partial'
    }
  };

  return new Response(
    JSON.stringify({ 
      success: true,
      booking: mockBooking 
    }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

async function handleCancelBooking(supabase: any, bookingId: string) {
  return new Response(
    JSON.stringify({ 
      success: true, 
      message: 'Booking cancelled successfully',
      booking_id: bookingId,
      cancellation_date: new Date().toISOString(),
      refund_status: 'processing'
    }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

async function handleGetTicket(supabase: any, ticketId: string) {
  const mockTicket = {
    id: ticketId,
    booking_id: 'booking_123',
    trek_name: 'Himalayan Adventure Trek',
    departure_date: '2024-07-15',
    boarding_point: 'Mumbai Central Station',
    participants: [
      { name: 'John Doe', age: 28, gender: 'Male' },
      { name: 'Jane Smith', age: 25, gender: 'Female' }
    ],
    total_amount: 15000,
    booking_status: 'confirmed',
    qr_code: 'QR123456789',
    instructions: [
      'Arrive 30 minutes before departure',
      'Carry valid ID proof',
      'Follow safety guidelines'
    ]
  };

  return new Response(
    JSON.stringify({ 
      success: true,
      ticket: mockTicket 
    }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

// User profile handlers
async function handleUpdateTravellerDetails(req: Request, supabase: any) {
  try {
    const body = await req.text();
    const travellerData = body ? JSON.parse(body) : {};
    
    const updatedData = {
      id: travellerData.id || 'traveller_' + Date.now(),
      name: travellerData.name,
      age: travellerData.age,
      gender: travellerData.gender,
      phone: travellerData.phone,
      email: travellerData.email,
      emergency_contact: travellerData.emergency_contact,
      updated_at: new Date().toISOString()
    };
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Traveller details updated successfully',
        data: updatedData
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ 
        error: 'Invalid request body for traveller details',
        message: 'Please provide valid traveller information'
      }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
}

async function handleGetTravellerDetails(supabase: any, req: Request) {
  const url = new URL(req.url);
  const userId = url.searchParams.get('user_id');
  
  const mockTravellerDetails = [
    {
      id: '1',
      name: 'John Doe',
      age: 28,
      gender: 'Male',
      phone: '+91-9876543210',
      email: 'john@example.com',
      emergency_contact: {
        name: 'Jane Doe',
        phone: '+91-9876543211'
      },
      user_id: userId || 'user_123'
    },
    {
      id: '2',
      name: 'Jane Smith',
      age: 25,
      gender: 'Female',
      phone: '+91-9876543212',
      email: 'jane@example.com',
      emergency_contact: {
        name: 'John Smith',
        phone: '+91-9876543213'
      },
      user_id: userId || 'user_123'
    }
  ];

  return new Response(
    JSON.stringify({ 
      success: true,
      traveller_details: mockTravellerDetails,
      total: mockTravellerDetails.length
    }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

// Coupon handlers
async function handleGetCoupons(supabase: any) {
  const mockCoupons = [
    {
      id: '1',
      title: "First Trek Discount",
      subtitle: "Special offer for new trekkers",
      color: "#FF6B6B",
      code: "FIRST20",
      offerAmount: "20% OFF",
      imagePath: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
      min_amount: 10000,
      max_discount: 3000,
      valid_until: "2024-12-31",
      is_active: true
    },
    {
      id: '2',
      title: "Group Booking Offer",
      subtitle: "Book for 4+ people and save",
      color: "#4ECDC4",
      code: "GROUP15",
      offerAmount: "15% OFF",
      imagePath: "https://images.unsplash.com/photo-1551632811-561732d1e306",
      min_amount: 20000,
      max_discount: 5000,
      valid_until: "2024-11-30",
      is_active: true
    },
    {
      id: '3',
      title: "Weekend Special",
      subtitle: "Weekend trek discount",
      color: "#45B7D1",
      code: "WEEKEND10",
      offerAmount: "10% OFF",
      imagePath: "https://images.unsplash.com/photo-1551524164-687a55dd1126",
      min_amount: 5000,
      max_discount: 2000,
      valid_until: "2024-10-31",
      is_active: true
    }
  ];

  return new Response(
    JSON.stringify({ 
      success: true,
      coupons: mockCoupons,
      total: mockCoupons.length
    }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

async function handleGetCouponById(supabase: any, couponId: string) {
  const mockCoupon = {
    id: couponId,
    title: "First Trek Discount",
    subtitle: "Special offer for new trekkers",
    color: "#FF6B6B",
    code: "FIRST20",
    offerAmount: "20% OFF",
    imagePath: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
    terms: [
      "Valid for first-time users only",
      "Cannot be combined with other offers",
      "Minimum booking amount: ₹10,000"
    ],
    expiry: "2024-12-31",
    min_amount: 10000,
    max_discount: 3000,
    usage_limit: 100,
    used_count: 25
  };

  return new Response(
    JSON.stringify({ 
      success: true,
      coupon: mockCoupon 
    }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

// Safety & Communication handlers
async function handleCreateSafetyContact(req: Request, supabase: any) {
  try {
    const body = await req.text();
    const contactData = body ? JSON.parse(body) : {};
    
    const safetyContact = {
      id: 'contact_' + Date.now(),
      name: contactData.name,
      number: contactData.number,
      relationship: contactData.relationship || 'emergency',
      user_id: contactData.user_id,
      created_at: new Date().toISOString()
    };
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Safety contact added successfully',
        contact: safetyContact
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ 
        error: 'Invalid request body for safety contact',
        message: 'Please provide name and phone number'
      }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
}

async function handleGetSafetyContacts(supabase: any, req: Request) {
  const url = new URL(req.url);
  const userId = url.searchParams.get('user_id');
  
  const mockContacts = [
    { 
      id: '1', 
      name: 'John Doe', 
      number: '+91-9876543210', 
      relationship: 'father',
      user_id: userId || 'user_123' 
    },
    { 
      id: '2', 
      name: 'Jane Smith', 
      number: '+91-9876543211', 
      relationship: 'spouse',
      user_id: userId || 'user_123' 
    }
  ];
  
  return new Response(
    JSON.stringify({ 
      success: true,
      contacts: mockContacts,
      total: mockContacts.length
    }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

async function handleGetNotifications(supabase: any, req: Request) {
  const url = new URL(req.url);
  const userId = url.searchParams.get('user_id');
  
  const mockNotifications = [
    {
      id: '1',
      title: 'Booking Confirmed',
      message: 'Your trek booking has been confirmed',
      type: 'booking',
      read: false,
      user_id: userId || 'user_123',
      created_at: '2024-06-07T10:00:00Z'
    },
    {
      id: '2',
      title: 'Weather Update',
      message: 'Good weather conditions for your upcoming trek',
      type: 'weather',
      read: true,
      user_id: userId || 'user_123',
      created_at: '2024-06-06T15:30:00Z'
    },
    {
      id: '3',
      title: 'Payment Reminder',
      message: 'Complete your payment to secure your booking',
      type: 'payment',
      read: false,
      user_id: userId || 'user_123',
      created_at: '2024-06-05T09:15:00Z'
    }
  ];
  
  return new Response(
    JSON.stringify({ 
      success: true,
      notifications: mockNotifications,
      total: mockNotifications.length,
      unread_count: mockNotifications.filter(n => !n.read).length
    }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

async function handleCreateNotification(req: Request, supabase: any) {
  try {
    const body = await req.text();
    const notificationData = body ? JSON.parse(body) : {};
    
    const notification = {
      id: 'notification_' + Date.now(),
      title: notificationData.title,
      message: notificationData.message,
      type: notificationData.type || 'general',
      user_id: notificationData.user_id,
      read: false,
      created_at: new Date().toISOString()
    };
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Notification created successfully',
        notification: notification
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ 
        error: 'Invalid request body for notification',
        message: 'Please provide title and message'
      }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
}

// General information handlers
async function handleAboutUs(supabase: any) {
  return new Response(
    JSON.stringify({
      success: true,
      company: "Aorbo Treks",
      description: "Your trusted partner for amazing trekking adventures across India. We provide safe, guided, and memorable trekking experiences for adventurers of all levels.",
      mission: "To make trekking accessible to everyone while promoting sustainable tourism and preserving the natural beauty of our mountains.",
      vision: "To be India's leading adventure travel company that inspires people to explore the great outdoors responsibly.",
      founded: "2020",
      total_treks: 150,
      happy_customers: 5000,
      expert_guides: 25,
      contact: {
        email: "info@aorbotreks.com",
        phone: "+91-9876543210",
        whatsapp: "+91-9876543210",
        address: "123 Adventure Street, Mumbai, Maharashtra, India - 400001"
      },
      social: {
        facebook: "https://facebook.com/aorbotreks",
        instagram: "https://instagram.com/aorbotreks",
        twitter: "https://twitter.com/aorbotreks",
        youtube: "https://youtube.com/aorbotreks"
      },
      features: [
        "Professional mountain guides",
        "All safety equipment provided", 
        "Small group sizes",
        "Eco-friendly practices",
        "24/7 customer support",
        "Insurance coverage"
      ],
      certifications: [
        "Adventure Tour Operators Association of India (ATOAI)",
        "Indian Mountaineering Foundation (IMF)",
        "ISO 9001:2015 Certified"
      ]
    }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}
