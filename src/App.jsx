import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Protected from "./components/auth/Protected";
import AuthRedirect from "./components/auth/AuthRedirect";
import Index from "./pages/Index";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminVendors from "./pages/admin/Vendors";
import AdminTreks from "./pages/admin/Treks";
import AdminBookings from "./pages/admin/Bookings";
import VendorDashboard from "./pages/vendor/Dashboard";
import VendorTreks from "./pages/vendor/Treks";
import CreateTrek from "./pages/vendor/CreateTrek";
import EditTrek from "./pages/vendor/EditTrek";
import VendorBookings from "./pages/vendor/Bookings";
import Customers from "./pages/vendor/Customers";
import ManageLocations from "./pages/vendor/ManageLocations";
import Payments from "./pages/vendor/Payments";
import Reviews from "./pages/vendor/Reviews";
import Messages from "./pages/vendor/Messages";
import Reports from "./pages/vendor/Reports";
import VendorSettings from "./pages/vendor/Settings";
import NotFound from "./pages/NotFound";
import AdminLayout from "./layouts/AdminLayout";
import VendorLayout from "./layouts/VendorLayout";
import RegistrationFlow from "./pages/auth/RegistrationFlow";
import RegistrationSuccess from "./pages/auth/RegistrationSuccess";
import VendorWithdrawals from "./pages/vendor/Withdrawals";
import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Analytics from "./pages/admin/Analytics";
import AdminWithdrawals from "@/pages/admin/Withdrawals";
import AdminCoupons from "@/pages/admin/Coupons";
import VendorCoupons from "@/pages/vendor/Coupons";
import Destinations from "@/pages/vendor/Destinations";

// Import new admin pages
import AdminUsers from "./pages/admin/Users";
import AdminUserActivity from "./pages/admin/users/Activity";
import AdminUserTickets from "./pages/admin/users/Tickets";
import AdminUserEmergency from "./pages/admin/users/Emergency";
import AdminVendorVerification from "./pages/admin/vendors/Verification";
import AdminVendorPerformance from "./pages/admin/vendors/Performance";
import AdminVendorCommission from "./pages/admin/vendors/Commission";
import AdminTrekCategories from "./pages/admin/treks/Categories";
import AdminTrekSafety from "./pages/admin/treks/Safety";
import AdminTrekBatches from "./pages/admin/treks/Batches";
import AdminBookingCancellations from "./pages/admin/bookings/Cancellations";
import AdminBookingPaymentLogs from "./pages/admin/bookings/PaymentLogs";
import AdminBookingAdjustments from "./pages/admin/bookings/Adjustments";
import AdminBookingReconciliation from "./pages/admin/bookings/Reconciliation";
import AdminCouponTracking from "./pages/admin/coupons/Tracking";
import AdminCouponAssign from "./pages/admin/coupons/Assign";
import AdminCouponCampaigns from "./pages/admin/coupons/Campaigns";
import AdminCommunications from "./pages/admin/Communications";
import AdminCommunicationTemplates from "./pages/admin/communications/Templates";
import AdminCommunicationEmail from "./pages/admin/communications/Email";
import AdminCommunicationPush from "./pages/admin/communications/Push";
import AdminCommunicationScheduled from "./pages/admin/communications/Scheduled";
import AdminCommunicationAlerts from "./pages/admin/communications/Alerts";
import AdminSupport from "./pages/admin/Support";
import AdminSupportComplaints from "./pages/admin/support/Complaints";
import AdminSupportVendorIssues from "./pages/admin/support/VendorIssues";
import AdminSupportRefunds from "./pages/admin/support/Refunds";
import AdminSupportRouting from "./pages/admin/support/Routing";
import AdminLocations from "./pages/admin/Locations";
import AdminLocationCities from "./pages/admin/locations/Cities";
import AdminLocationMapping from "./pages/admin/locations/Mapping";
import AdminLocationPickup from "./pages/admin/locations/Pickup";
import AdminLocationWeather from "./pages/admin/locations/Weather";
import AdminFinance from "./pages/admin/Finance";
import AdminFinanceSales from "./pages/admin/finance/Sales";
import AdminFinanceSettlements from "./pages/admin/finance/Settlements";
import AdminFinanceTax from "./pages/admin/finance/Tax";
import AdminFinanceManualPayments from "./pages/admin/finance/ManualPayments";
import AdminRoles from "./pages/admin/Roles";
import AdminRolesAdmin from "./pages/admin/roles/Admin";
import AdminRolesPermissions from "./pages/admin/roles/Permissions";
import AdminRolesActivity from "./pages/admin/roles/Activity";
import AdminRoles2FA from "./pages/admin/roles/TwoFactorAuth";
import AdminSystem from "./pages/admin/System";
import AdminSystemApiKeys from "./pages/admin/system/ApiKeys";
import AdminSystemVersion from "./pages/admin/system/Version";
import AdminSystemMaintenance from "./pages/admin/system/Maintenance";
import AdminSystemPolicies from "./pages/admin/system/Policies";
import AdminSystemHealth from "./pages/admin/system/Health";
import AdminSettings from "./pages/admin/Settings";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const queryClient = new QueryClient();
function App() {
    return /*#__PURE__*/ _jsx(QueryClientProvider, {
        client: queryClient,
        children: /*#__PURE__*/ _jsx(AuthProvider, {
            children: /*#__PURE__*/ _jsx(BrowserRouter, {
                children: /*#__PURE__*/ _jsxs("div", {
                    className: "min-h-screen bg-gray-50",
                    children: [
                        /*#__PURE__*/ _jsxs(Routes, {
                            children: [
                                /*#__PURE__*/ _jsx(Route, {
                                    path: "/",
                                    element: /*#__PURE__*/ _jsx(Index, {}),
                                }),
                                /*#__PURE__*/ _jsx(Route, {
                                    path: "/login",
                                    element: /*#__PURE__*/ _jsx(AuthRedirect, {
                                        children: /*#__PURE__*/ _jsx(Login, {}),
                                    }),
                                }),
                                /*#__PURE__*/ _jsx(Route, {
                                    path: "/register",
                                    element: /*#__PURE__*/ _jsx(AuthRedirect, {
                                        children: /*#__PURE__*/ _jsx(
                                            Register,
                                            {}
                                        ),
                                    }),
                                }),
                                /*#__PURE__*/ _jsx(Route, {
                                    path: "/registration-flow",
                                    element: /*#__PURE__*/ _jsx(
                                        RegistrationFlow,
                                        {}
                                    ),
                                }),
                                /*#__PURE__*/ _jsx(Route, {
                                    path: "/registration-success",
                                    element: /*#__PURE__*/ _jsx(
                                        RegistrationSuccess,
                                        {}
                                    ),
                                }),
                                /*#__PURE__*/ _jsxs(Route, {
                                    path: "/admin",
                                    element: /*#__PURE__*/ _jsx(Protected, {
                                        children: /*#__PURE__*/ _jsx(
                                            AdminLayout,
                                            {}
                                        ),
                                    }),
                                    children: [
                                        /*#__PURE__*/ _jsx(Route, {
                                            index: true,
                                            element: /*#__PURE__*/ _jsx(
                                                AdminDashboard,
                                                {}
                                            ),
                                        }),
                                        /*#__PURE__*/ _jsx(Route, {
                                            path: "users",
                                            element: /*#__PURE__*/ _jsx(
                                                AdminUsers,
                                                {}
                                            ),
                                        }),
                                        /*#__PURE__*/ _jsx(Route, {
                                            path: "users/activity",
                                            element: /*#__PURE__*/ _jsx(
                                                AdminUserActivity,
                                                {}
                                            ),
                                        }),
                                        /*#__PURE__*/ _jsx(Route, {
                                            path: "users/tickets",
                                            element: /*#__PURE__*/ _jsx(
                                                AdminUserTickets,
                                                {}
                                            ),
                                        }),
                                        /*#__PURE__*/ _jsx(Route, {
                                            path: "users/emergency",
                                            element: /*#__PURE__*/ _jsx(
                                                AdminUserEmergency,
                                                {}
                                            ),
                                        }),
                                        /*#__PURE__*/ _jsx(Route, {
                                            path: "vendors",
                                            element: /*#__PURE__*/ _jsx(
                                                AdminVendors,
                                                {}
                                            ),
                                        }),
                                        /*#__PURE__*/ _jsx(Route, {
                                            path: "vendors/verification",
                                            element: /*#__PURE__*/ _jsx(
                                                AdminVendorVerification,
                                                {}
                                            ),
                                        }),
                                        /*#__PURE__*/ _jsx(Route, {
                                            path: "vendors/performance",
                                            element: /*#__PURE__*/ _jsx(
                                                AdminVendorPerformance,
                                                {}
                                            ),
                                        }),
                                        /*#__PURE__*/ _jsx(Route, {
                                            path: "vendors/commission",
                                            element: /*#__PURE__*/ _jsx(
                                                AdminVendorCommission,
                                                {}
                                            ),
                                        }),
                                        /*#__PURE__*/ _jsx(Route, {
                                            path: "treks",
                                            element: /*#__PURE__*/ _jsx(
                                                AdminTreks,
                                                {}
                                            ),
                                        }),
                                        /*#__PURE__*/ _jsx(Route, {
                                            path: "treks/categories",
                                            element: /*#__PURE__*/ _jsx(
                                                AdminTrekCategories,
                                                {}
                                            ),
                                        }),
                                        /*#__PURE__*/ _jsx(Route, {
                                            path: "treks/safety",
                                            element: /*#__PURE__*/ _jsx(
                                                AdminTrekSafety,
                                                {}
                                            ),
                                        }),
                                        /*#__PURE__*/ _jsx(Route, {
                                            path: "treks/batches",
                                            element: /*#__PURE__*/ _jsx(
                                                AdminTrekBatches,
                                                {}
                                            ),
                                        }),
                                        /*#__PURE__*/ _jsx(Route, {
                                            path: "bookings",
                                            element: /*#__PURE__*/ _jsx(
                                                AdminBookings,
                                                {}
                                            ),
                                        }),
                                        /*#__PURE__*/ _jsx(Route, {
                                            path: "bookings/cancellations",
                                            element: /*#__PURE__*/ _jsx(
                                                AdminBookingCancellations,
                                                {}
                                            ),
                                        }),
                                        /*#__PURE__*/ _jsx(Route, {
                                            path: "bookings/payment-logs",
                                            element: /*#__PURE__*/ _jsx(
                                                AdminBookingPaymentLogs,
                                                {}
                                            ),
                                        }),
                                        /*#__PURE__*/ _jsx(Route, {
                                            path: "bookings/adjustments",
                                            element: /*#__PURE__*/ _jsx(
                                                AdminBookingAdjustments,
                                                {}
                                            ),
                                        }),
                                        /*#__PURE__*/ _jsx(Route, {
                                            path: "bookings/reconciliation",
                                            element: /*#__PURE__*/ _jsx(
                                                AdminBookingReconciliation,
                                                {}
                                            ),
                                        }),
                                        /*#__PURE__*/ _jsx(Route, {
                                            path: "coupons",
                                            element: /*#__PURE__*/ _jsx(
                                                AdminCoupons,
                                                {}
                                            ),
                                        }),
                                        /*#__PURE__*/ _jsx(Route, {
                                            path: "coupons/tracking",
                                            element: /*#__PURE__*/ _jsx(
                                                AdminCouponTracking,
                                                {}
                                            ),
                                        }),
                                        /*#__PURE__*/ _jsx(Route, {
                                            path: "coupons/assign",
                                            element: /*#__PURE__*/ _jsx(
                                                AdminCouponAssign,
                                                {}
                                            ),
                                        }),
                                        /*#__PURE__*/ _jsx(Route, {
                                            path: "coupons/campaigns",
                                            element: /*#__PURE__*/ _jsx(
                                                AdminCouponCampaigns,
                                                {}
                                            ),
                                        }),
                                        /*#__PURE__*/ _jsx(Route, {
                                            path: "communications",
                                            element: /*#__PURE__*/ _jsx(
                                                AdminCommunications,
                                                {}
                                            ),
                                        }),
                                        /*#__PURE__*/ _jsx(Route, {
                                            path: "communications/templates",
                                            element: /*#__PURE__*/ _jsx(
                                                AdminCommunicationTemplates,
                                                {}
                                            ),
                                        }),
                                        /*#__PURE__*/ _jsx(Route, {
                                            path: "communications/email",
                                            element: /*#__PURE__*/ _jsx(
                                                AdminCommunicationEmail,
                                                {}
                                            ),
                                        }),
                                        /*#__PURE__*/ _jsx(Route, {
                                            path: "communications/push",
                                            element: /*#__PURE__*/ _jsx(
                                                AdminCommunicationPush,
                                                {}
                                            ),
                                        }),
                                        /*#__PURE__*/ _jsx(Route, {
                                            path: "communications/scheduled",
                                            element: /*#__PURE__*/ _jsx(
                                                AdminCommunicationScheduled,
                                                {}
                                            ),
                                        }),
                                        /*#__PURE__*/ _jsx(Route, {
                                            path: "communications/alerts",
                                            element: /*#__PURE__*/ _jsx(
                                                AdminCommunicationAlerts,
                                                {}
                                            ),
                                        }),
                                        /*#__PURE__*/ _jsx(Route, {
                                            path: "support",
                                            element: /*#__PURE__*/ _jsx(
                                                AdminSupport,
                                                {}
                                            ),
                                        }),
                                        /*#__PURE__*/ _jsx(Route, {
                                            path: "support/complaints",
                                            element: /*#__PURE__*/ _jsx(
                                                AdminSupportComplaints,
                                                {}
                                            ),
                                        }),
                                        /*#__PURE__*/ _jsx(Route, {
                                            path: "support/vendor-issues",
                                            element: /*#__PURE__*/ _jsx(
                                                AdminSupportVendorIssues,
                                                {}
                                            ),
                                        }),
                                        /*#__PURE__*/ _jsx(Route, {
                                            path: "support/refunds",
                                            element: /*#__PURE__*/ _jsx(
                                                AdminSupportRefunds,
                                                {}
                                            ),
                                        }),
                                        /*#__PURE__*/ _jsx(Route, {
                                            path: "support/routing",
                                            element: /*#__PURE__*/ _jsx(
                                                AdminSupportRouting,
                                                {}
                                            ),
                                        }),
                                        /*#__PURE__*/ _jsx(Route, {
                                            path: "locations",
                                            element: /*#__PURE__*/ _jsx(
                                                AdminLocations,
                                                {}
                                            ),
                                        }),
                                        /*#__PURE__*/ _jsx(Route, {
                                            path: "locations/cities",
                                            element: /*#__PURE__*/ _jsx(
                                                AdminLocationCities,
                                                {}
                                            ),
                                        }),
                                        /*#__PURE__*/ _jsx(Route, {
                                            path: "locations/mapping",
                                            element: /*#__PURE__*/ _jsx(
                                                AdminLocationMapping,
                                                {}
                                            ),
                                        }),
                                        /*#__PURE__*/ _jsx(Route, {
                                            path: "locations/pickup",
                                            element: /*#__PURE__*/ _jsx(
                                                AdminLocationPickup,
                                                {}
                                            ),
                                        }),
                                        /*#__PURE__*/ _jsx(Route, {
                                            path: "locations/weather",
                                            element: /*#__PURE__*/ _jsx(
                                                AdminLocationWeather,
                                                {}
                                            ),
                                        }),
                                        /*#__PURE__*/ _jsx(Route, {
                                            path: "finance",
                                            element: /*#__PURE__*/ _jsx(
                                                AdminFinance,
                                                {}
                                            ),
                                        }),
                                        /*#__PURE__*/ _jsx(Route, {
                                            path: "finance/sales",
                                            element: /*#__PURE__*/ _jsx(
                                                AdminFinanceSales,
                                                {}
                                            ),
                                        }),
                                        /*#__PURE__*/ _jsx(Route, {
                                            path: "finance/settlements",
                                            element: /*#__PURE__*/ _jsx(
                                                AdminFinanceSettlements,
                                                {}
                                            ),
                                        }),
                                        /*#__PURE__*/ _jsx(Route, {
                                            path: "finance/tax",
                                            element: /*#__PURE__*/ _jsx(
                                                AdminFinanceTax,
                                                {}
                                            ),
                                        }),
                                        /*#__PURE__*/ _jsx(Route, {
                                            path: "finance/manual-payments",
                                            element: /*#__PURE__*/ _jsx(
                                                AdminFinanceManualPayments,
                                                {}
                                            ),
                                        }),
                                        /*#__PURE__*/ _jsx(Route, {
                                            path: "roles",
                                            element: /*#__PURE__*/ _jsx(
                                                AdminRoles,
                                                {}
                                            ),
                                        }),
                                        /*#__PURE__*/ _jsx(Route, {
                                            path: "roles/admin",
                                            element: /*#__PURE__*/ _jsx(
                                                AdminRolesAdmin,
                                                {}
                                            ),
                                        }),
                                        /*#__PURE__*/ _jsx(Route, {
                                            path: "roles/permissions",
                                            element: /*#__PURE__*/ _jsx(
                                                AdminRolesPermissions,
                                                {}
                                            ),
                                        }),
                                        /*#__PURE__*/ _jsx(Route, {
                                            path: "roles/activity",
                                            element: /*#__PURE__*/ _jsx(
                                                AdminRolesActivity,
                                                {}
                                            ),
                                        }),
                                        /*#__PURE__*/ _jsx(Route, {
                                            path: "roles/2fa",
                                            element: /*#__PURE__*/ _jsx(
                                                AdminRoles2FA,
                                                {}
                                            ),
                                        }),
                                        /*#__PURE__*/ _jsx(Route, {
                                            path: "system",
                                            element: /*#__PURE__*/ _jsx(
                                                AdminSystem,
                                                {}
                                            ),
                                        }),
                                        /*#__PURE__*/ _jsx(Route, {
                                            path: "system/api-keys",
                                            element: /*#__PURE__*/ _jsx(
                                                AdminSystemApiKeys,
                                                {}
                                            ),
                                        }),
                                        /*#__PURE__*/ _jsx(Route, {
                                            path: "system/version",
                                            element: /*#__PURE__*/ _jsx(
                                                AdminSystemVersion,
                                                {}
                                            ),
                                        }),
                                        /*#__PURE__*/ _jsx(Route, {
                                            path: "system/maintenance",
                                            element: /*#__PURE__*/ _jsx(
                                                AdminSystemMaintenance,
                                                {}
                                            ),
                                        }),
                                        /*#__PURE__*/ _jsx(Route, {
                                            path: "system/policies",
                                            element: /*#__PURE__*/ _jsx(
                                                AdminSystemPolicies,
                                                {}
                                            ),
                                        }),
                                        /*#__PURE__*/ _jsx(Route, {
                                            path: "system/health",
                                            element: /*#__PURE__*/ _jsx(
                                                AdminSystemHealth,
                                                {}
                                            ),
                                        }),
                                        /*#__PURE__*/ _jsx(Route, {
                                            path: "withdrawals",
                                            element: /*#__PURE__*/ _jsx(
                                                AdminWithdrawals,
                                                {}
                                            ),
                                        }),
                                        /*#__PURE__*/ _jsx(Route, {
                                            path: "analytics",
                                            element: /*#__PURE__*/ _jsx(
                                                Analytics,
                                                {}
                                            ),
                                        }),
                                        /*#__PURE__*/ _jsx(Route, {
                                            path: "settings",
                                            element: /*#__PURE__*/ _jsx(
                                                AdminSettings,
                                                {}
                                            ),
                                        }),
                                    ],
                                }),
                                /*#__PURE__*/ _jsxs(Route, {
                                    path: "/vendor",
                                    element: /*#__PURE__*/ _jsx(Protected, {
                                        children: /*#__PURE__*/ _jsx(
                                            VendorLayout,
                                            {}
                                        ),
                                    }),
                                    children: [
                                        /*#__PURE__*/ _jsx(Route, {
                                            index: true,
                                            element: /*#__PURE__*/ _jsx(
                                                VendorDashboard,
                                                {}
                                            ),
                                        }),
                                        /*#__PURE__*/ _jsx(Route, {
                                            path: "treks",
                                            element: /*#__PURE__*/ _jsx(
                                                VendorTreks,
                                                {}
                                            ),
                                        }),
                                        /*#__PURE__*/ _jsx(Route, {
                                            path: "treks/create",
                                            element: /*#__PURE__*/ _jsx(
                                                CreateTrek,
                                                {}
                                            ),
                                        }),
                                        /*#__PURE__*/ _jsx(Route, {
                                            path: "treks/edit/:id",
                                            element: /*#__PURE__*/ _jsx(
                                                EditTrek,
                                                {}
                                            ),
                                        }),
                                        /*#__PURE__*/ _jsx(Route, {
                                            path: "bookings",
                                            element: /*#__PURE__*/ _jsx(
                                                VendorBookings,
                                                {}
                                            ),
                                        }),
                                        /*#__PURE__*/ _jsx(Route, {
                                            path: "customers",
                                            element: /*#__PURE__*/ _jsx(
                                                Customers,
                                                {}
                                            ),
                                        }),
                                        /*#__PURE__*/ _jsx(Route, {
                                            path: "locations",
                                            element: /*#__PURE__*/ _jsx(
                                                ManageLocations,
                                                {}
                                            ),
                                        }),
                                        /*#__PURE__*/ _jsx(Route, {
                                            path: "destinations",
                                            element: /*#__PURE__*/ _jsx(
                                                Destinations,
                                                {}
                                            ),
                                        }),
                                        /*#__PURE__*/ _jsx(Route, {
                                            path: "payments",
                                            element: /*#__PURE__*/ _jsx(
                                                Payments,
                                                {}
                                            ),
                                        }),
                                        /*#__PURE__*/ _jsx(Route, {
                                            path: "withdrawals",
                                            element: /*#__PURE__*/ _jsx(
                                                VendorWithdrawals,
                                                {}
                                            ),
                                        }),
                                        /*#__PURE__*/ _jsx(Route, {
                                            path: "coupons",
                                            element: /*#__PURE__*/ _jsx(
                                                VendorCoupons,
                                                {}
                                            ),
                                        }),
                                        /*#__PURE__*/ _jsx(Route, {
                                            path: "reviews",
                                            element: /*#__PURE__*/ _jsx(
                                                Reviews,
                                                {}
                                            ),
                                        }),
                                        /*#__PURE__*/ _jsx(Route, {
                                            path: "messages",
                                            element: /*#__PURE__*/ _jsx(
                                                Messages,
                                                {}
                                            ),
                                        }),
                                        /*#__PURE__*/ _jsx(Route, {
                                            path: "reports",
                                            element: /*#__PURE__*/ _jsx(
                                                Reports,
                                                {}
                                            ),
                                        }),
                                        /*#__PURE__*/ _jsx(Route, {
                                            path: "settings",
                                            element: /*#__PURE__*/ _jsx(
                                                VendorSettings,
                                                {}
                                            ),
                                        }),
                                    ],
                                }),
                                /*#__PURE__*/ _jsx(Route, {
                                    path: "*",
                                    element: /*#__PURE__*/ _jsx(NotFound, {}),
                                }),
                            ],
                        }),
                        /*#__PURE__*/ _jsx(Toaster, {}),
                    ],
                }),
            }),
        }),
    });
}
export default App;
