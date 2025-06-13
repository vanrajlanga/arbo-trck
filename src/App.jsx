import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext.new";

// Import pages
import Index from "@/pages/Index";
import TreksCatalog from "@/pages/TreksCatalog";
import TrekDetails from "@/pages/TrekDetails";
import BookTrek from "@/pages/BookTrek";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import ApiTest from "@/pages/ApiTest";

// Admin Layout and pages
import AdminLayout from "@/layouts/AdminLayout";
import AdminDashboard from "@/pages/admin/Dashboard";
import AdminTreks from "@/pages/admin/Treks";
import AdminBookings from "@/pages/admin/Bookings";
import AdminVendors from "@/pages/admin/Vendors";
import AdminLocations from "@/pages/admin/Locations";
import AdminAnalytics from "@/pages/admin/Analytics";
import AdminCoupons from "@/pages/admin/Coupons";
import AdminWithdrawals from "@/pages/admin/Withdrawals";
import AdminRoles from "@/pages/admin/Roles";
import AdminSettings from "@/pages/admin/Settings";
import AdminCommunications from "@/pages/admin/Communications";
import AdminSystem from "@/pages/admin/System";
import AdminBannerManager from "@/pages/admin/BannerManager";
import AdminApiHub from "@/pages/admin/ApiHub";
import AdminUsers from "@/pages/admin/Users";
import AdminSupport from "@/pages/admin/Support";
import AdminFinance from "@/pages/admin/Finance";

// Admin Users sub-pages
import AdminUsersActivity from "@/pages/admin/users/Activity";
import AdminUsersTickets from "@/pages/admin/users/Tickets";
import AdminUsersEmergency from "@/pages/admin/users/Emergency";

// Vendor Layout and pages
import VendorLayout from "@/layouts/VendorLayout";
import VendorDashboard from "@/pages/vendor/Dashboard";
import VendorTreks from "@/pages/vendor/Treks";
import VendorBookings from "@/pages/vendor/Bookings";
import VendorPayments from "@/pages/vendor/Payments";
import VendorReviews from "@/pages/vendor/Reviews";
import VendorCustomers from "@/pages/vendor/Customers";
import VendorReports from "@/pages/vendor/Reports";
import VendorSettings from "@/pages/vendor/Settings";
import VendorMessages from "@/pages/vendor/Messages";
import VendorCoupons from "@/pages/vendor/Coupons";
import VendorWithdrawals from "@/pages/vendor/Withdrawals";
import ManageLocations from "@/pages/vendor/ManageLocations";
import CreateTrek from "@/pages/vendor/CreateTrek";
import EditTrek from "@/pages/vendor/EditTrek";

// Vendor sub-pages
import VendorCommission from "@/pages/admin/vendors/Commission";
import VendorPerformance from "@/pages/admin/vendors/Performance";
import VendorVerification from "@/pages/admin/vendors/Verification";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 60 * 1000,
        },
    },
});

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <TooltipProvider>
                <AuthProvider>
                    <Router>
                        <div className="min-h-screen bg-background">
                            <Routes>
                                {/* Public Routes */}
                                <Route path="/" element={<Index />} />
                                <Route
                                    path="/treks"
                                    element={<TreksCatalog />}
                                />
                                <Route
                                    path="/trek/:id"
                                    element={<TrekDetails />}
                                />
                                <Route
                                    path="/book-trek/:id"
                                    element={<BookTrek />}
                                />
                                <Route path="/login" element={<Login />} />
                                <Route
                                    path="/register"
                                    element={<Register />}
                                />
                                <Route path="/api-test" element={<ApiTest />} />

                                {/* Admin Routes */}
                                <Route path="/admin" element={<AdminLayout />}>
                                    <Route index element={<AdminDashboard />} />
                                    <Route
                                        path="treks"
                                        element={<AdminTreks />}
                                    />
                                    <Route
                                        path="bookings"
                                        element={<AdminBookings />}
                                    />
                                    <Route
                                        path="vendors"
                                        element={<AdminVendors />}
                                    />
                                    <Route
                                        path="locations"
                                        element={<AdminLocations />}
                                    />
                                    <Route
                                        path="analytics"
                                        element={<AdminAnalytics />}
                                    />
                                    <Route
                                        path="coupons"
                                        element={<AdminCoupons />}
                                    />
                                    <Route
                                        path="withdrawals"
                                        element={<AdminWithdrawals />}
                                    />
                                    <Route
                                        path="roles"
                                        element={<AdminRoles />}
                                    />
                                    <Route
                                        path="settings"
                                        element={<AdminSettings />}
                                    />
                                    <Route
                                        path="communications"
                                        element={<AdminCommunications />}
                                    />
                                    <Route
                                        path="system"
                                        element={<AdminSystem />}
                                    />
                                    <Route
                                        path="banners"
                                        element={<AdminBannerManager />}
                                    />
                                    <Route
                                        path="api-hub"
                                        element={<AdminApiHub />}
                                    />
                                    <Route
                                        path="users"
                                        element={<AdminUsers />}
                                    />
                                    <Route
                                        path="users/activity"
                                        element={<AdminUsersActivity />}
                                    />
                                    <Route
                                        path="users/tickets"
                                        element={<AdminUsersTickets />}
                                    />
                                    <Route
                                        path="users/emergency"
                                        element={<AdminUsersEmergency />}
                                    />
                                    <Route
                                        path="vendors/commission"
                                        element={<VendorCommission />}
                                    />
                                    <Route
                                        path="vendors/performance"
                                        element={<VendorPerformance />}
                                    />
                                    <Route
                                        path="vendors/verification"
                                        element={<VendorVerification />}
                                    />
                                    <Route
                                        path="support"
                                        element={<AdminSupport />}
                                    />
                                    <Route
                                        path="finance"
                                        element={<AdminFinance />}
                                    />
                                </Route>

                                {/* Vendor Routes */}
                                <Route
                                    path="/vendor"
                                    element={<VendorLayout />}
                                >
                                    <Route
                                        index
                                        element={<VendorDashboard />}
                                    />
                                    <Route
                                        path="treks"
                                        element={<VendorTreks />}
                                    />
                                    <Route
                                        path="treks/create"
                                        element={<CreateTrek />}
                                    />
                                    <Route
                                        path="treks/edit/:id"
                                        element={<EditTrek />}
                                    />
                                    <Route
                                        path="bookings"
                                        element={<VendorBookings />}
                                    />
                                    <Route
                                        path="payments"
                                        element={<VendorPayments />}
                                    />
                                    <Route
                                        path="reviews"
                                        element={<VendorReviews />}
                                    />
                                    <Route
                                        path="customers"
                                        element={<VendorCustomers />}
                                    />
                                    <Route
                                        path="reports"
                                        element={<VendorReports />}
                                    />
                                    <Route
                                        path="settings"
                                        element={<VendorSettings />}
                                    />
                                    <Route
                                        path="messages"
                                        element={<VendorMessages />}
                                    />
                                    <Route
                                        path="coupons"
                                        element={<VendorCoupons />}
                                    />
                                    <Route
                                        path="withdrawals"
                                        element={<VendorWithdrawals />}
                                    />
                                    <Route
                                        path="locations"
                                        element={<ManageLocations />}
                                    />
                                </Route>
                            </Routes>
                        </div>
                        <Toaster />
                        <Sonner />
                    </Router>
                </AuthProvider>
            </TooltipProvider>
        </QueryClientProvider>
    );
}

export default App;
