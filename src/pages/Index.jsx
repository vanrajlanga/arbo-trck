import { Link } from "react-router-dom";
import React from 'react';
import { useAuth } from "@/contexts/AuthContext";
import { FileText, User, Globe, Award, CheckCircle, ChevronRight, Calendar, BarChart } from "lucide-react";

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header className="bg-aorbo-teal py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-aorbo-yellow flex items-center justify-center">
              <span className="text-black font-bold text-lg">A</span>
            </div>
            <span className="text-white text-xl font-bold">Aorbo Treks</span>
          </div>
          <nav>
            {user ? (
              <Link
                to={user.role === "admin" ? "/admin" : "/vendor"}
                className="bg-white text-aorbo-teal px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors"
              >
                Dashboard
              </Link>
            ) : (
              <div className="space-x-4">
                <Link
                  to="/login"
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-white text-aorbo-teal px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-aorbo-teal text-white py-16 md:py-24">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Ignite travel dreams and bring adventure to life for countless explorers!
            </h1>
            <p className="text-lg md:text-xl opacity-90">
              Join Aorbo, The India's Trek Ticket Booking Platform, and unlock exclusive benefits, tools, and growth opportunities.
            </p>
            <div>
              <Link
                to="/register"
                className="inline-flex items-center bg-aorbo-yellow text-black px-6 py-3 rounded-md font-medium hover:bg-opacity-90 transition-colors"
              >
                Become a Partner <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="rounded-lg overflow-hidden shadow-xl transform translate-y-4 relative bg-white p-4">
              <div className="absolute -right-12 -top-12 w-24 h-24 rounded-full bg-aorbo-yellow opacity-50"></div>
              <div className="relative z-10">
                <img 
                  src="https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&w=600&q=80" 
                  alt="Trekking adventure" 
                  className="rounded-md mb-4" 
                />
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-8 h-8 rounded-full bg-aorbo-teal flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <span className="font-medium">Verified Partner Program</span>
                </div>
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-8 h-8 rounded-full bg-aorbo-teal flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <span className="font-medium">Simplified Booking Management</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-aorbo-teal flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <span className="font-medium">Increased Visibility</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Increase your trek's visibility with Aorbo's wide reach</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow animate-scale-in">
              <div className="w-12 h-12 bg-aorbo-lightBlue rounded-lg flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-aorbo-teal" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expedite slot reservations</h3>
              <p className="text-gray-600">Expedite slot reservations to increase booking volume and optimize availability.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow animate-scale-in">
              <div className="w-12 h-12 bg-aorbo-lightBlue rounded-lg flex items-center justify-center mb-4">
                <BarChart className="h-6 w-6 text-aorbo-teal" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Business analytics</h3>
              <p className="text-gray-600">Utilize business analytics to gain valuable insights and enhance decision-making.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow animate-scale-in">
              <div className="w-12 h-12 bg-aorbo-lightBlue rounded-lg flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-aorbo-teal" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Reliability</h3>
              <p className="text-gray-600">Experience unmatched reliability with Aorbo's seamless operations and support.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">What are the key benefits of partnering with Aorbo?</h3>
              <p className="text-gray-600">
                Partnering with Aorbo elevates your trekking business by increasing visibility, streamlining bookings, and ensuring secure payments. Benefit from verified listings, customer reviews, and data insights to optimize your services. Expand globally, scale cost-effectively, and focus on delivering exceptional experiences while Aorbo manages the digital side.
              </p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">What are the steps for trek organizers to join Aorbo?</h3>
              <ol className="text-gray-600 space-y-2 list-decimal pl-5">
                <li><strong>Application:</strong> Submit your application with the required documents.</li>
                <li><strong>Vetting process:</strong> Trek organizers will hear from our team shortly.</li>
                <li><strong>Validation:</strong> Internal departments will check the application for approval.</li>
                <li><strong>Account activation:</strong> The tech team ensures API integration and organizer login setup.</li>
                <li><strong>T&C Approval:</strong> Agree to terms and conditions, get approved.</li>
                <li><strong>Dashboard:</strong> Once T&C are approved, the dashboard goes live on Aorbo.</li>
              </ol>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">Is there any registration fee for Aorbo partners?</h3>
              <p className="text-gray-600">
                There is no registration fee for Aorbo partners. We only charge a minimal commission on each ticket sold through the Aorbo platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-aorbo-teal text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to grow your trekking business?</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Join Aorbo today and expand your reach to thousands of adventure enthusiasts across India.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center bg-aorbo-yellow text-black px-6 py-3 rounded-md font-medium hover:bg-opacity-90 transition-colors"
          >
            Register Now <ChevronRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between mb-8">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-full bg-aorbo-yellow flex items-center justify-center">
                  <span className="text-black font-bold text-lg">A</span>
                </div>
                <span className="text-xl font-bold">Aorbo Treks</span>
              </div>
              <p className="max-w-xs text-gray-400">
                India's premier platform for connecting trek enthusiasts with verified trek organizers.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Company</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Support</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">For Trekkers</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Find Treks</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Reviews</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Gift Cards</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">For Vendors</h3>
                <ul className="space-y-2">
                  <li><Link to="/register" className="text-gray-400 hover:text-white transition-colors">Join as Partner</Link></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Resources</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Community</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Aorbo Treks. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
