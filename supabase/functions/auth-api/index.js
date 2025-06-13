
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    )

    const url = new URL(req.url)
    const path = url.pathname.replace('/functions/v1/auth-api', '')
    
    console.log('Auth API Request:', req.method, path, 'Full URL:', req.url)

    // Handle root path
    if (path === '' || path === '/') {
      return new Response(
        JSON.stringify({ message: 'Auth API is running', available_endpoints: ['/register', '/login', '/logout', '/reset-password', '/update-password', '/verify-session'] }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    switch (path) {
      case '/register':
        return handleRegister(supabaseClient, req)
      
      case '/login':
        return handleLogin(supabaseClient, req)
      
      case '/logout':
        return handleLogout(supabaseClient, req)
      
      case '/reset-password':
        return handleResetPassword(supabaseClient, req)
      
      case '/update-password':
        return handleUpdatePassword(supabaseClient, req)
      
      case '/verify-session':
        return handleVerifySession(supabaseClient, req)
      
      default:
        return new Response(
          JSON.stringify({ error: 'Endpoint not found', path: path, available_endpoints: ['/register', '/login', '/logout', '/reset-password', '/update-password', '/verify-session'] }),
          { 
            status: 404, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        )
    }
  } catch (error) {
    console.error('Auth API Error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})

// User registration
async function handleRegister(supabase: any, req: Request) {
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }

  const body = await req.json()
  const { email, password, full_name, phone } = body

  if (!email || !password) {
    return new Response(
      JSON.stringify({ error: 'Email and password are required' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: full_name || '',
        phone: phone || ''
      }
    }
  })

  if (error) {
    console.error('Registration error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }

  return new Response(
    JSON.stringify({ 
      message: 'Registration successful',
      user: data.user,
      session: data.session
    }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  )
}

// User login
async function handleLogin(supabase: any, req: Request) {
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }

  const body = await req.json()
  const { email, password } = body

  if (!email || !password) {
    return new Response(
      JSON.stringify({ error: 'Email and password are required' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) {
    console.error('Login error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }

  return new Response(
    JSON.stringify({ 
      message: 'Login successful',
      user: data.user,
      session: data.session
    }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  )
}

// User logout
async function handleLogout(supabase: any, req: Request) {
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }

  const authHeader = req.headers.get('Authorization')
  if (authHeader) {
    supabase.auth.setSession({
      access_token: authHeader.replace('Bearer ', ''),
      refresh_token: ''
    })
  }

  const { error } = await supabase.auth.signOut()

  if (error) {
    console.error('Logout error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }

  return new Response(
    JSON.stringify({ message: 'Logout successful' }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  )
}

// Reset password
async function handleResetPassword(supabase: any, req: Request) {
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }

  const body = await req.json()
  const { email } = body

  if (!email) {
    return new Response(
      JSON.stringify({ error: 'Email is required' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email)

  if (error) {
    console.error('Reset password error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }

  return new Response(
    JSON.stringify({ message: 'Password reset email sent' }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  )
}

// Update password
async function handleUpdatePassword(supabase: any, req: Request) {
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }

  const authHeader = req.headers.get('Authorization')
  if (!authHeader) {
    return new Response(
      JSON.stringify({ error: 'Authorization header required' }),
      { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }

  supabase.auth.setSession({
    access_token: authHeader.replace('Bearer ', ''),
    refresh_token: ''
  })

  const body = await req.json()
  const { password } = body

  if (!password) {
    return new Response(
      JSON.stringify({ error: 'New password is required' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }

  const { error } = await supabase.auth.updateUser({ password })

  if (error) {
    console.error('Update password error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }

  return new Response(
    JSON.stringify({ message: 'Password updated successfully' }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  )
}

// Verify session
async function handleVerifySession(supabase: any, req: Request) {
  if (req.method !== 'GET') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }

  const authHeader = req.headers.get('Authorization')
  if (!authHeader) {
    return new Response(
      JSON.stringify({ error: 'Authorization header required' }),
      { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }

  supabase.auth.setSession({
    access_token: authHeader.replace('Bearer ', ''),
    refresh_token: ''
  })

  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    return new Response(
      JSON.stringify({ error: 'Invalid session' }),
      { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }

  return new Response(
    JSON.stringify({ 
      valid: true,
      user: user
    }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  )
}
