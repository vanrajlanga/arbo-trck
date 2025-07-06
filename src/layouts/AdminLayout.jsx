import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
    Menu,
    Home,
    Users,
    Map,
    Calendar,
    BarChart,
    Settings,
    LogOut,
    Wallet,
    Percent,
    Building2,
    MapPin,
    CreditCard,
    MessageSquare,
    Headphones,
    Shield,
    Server,
    ChevronDown,
    ChevronRight,
} from "lucide-react";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const AdminLayout = () => {
    const { user, logout } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [expandedMenus, setExpandedMenus] = useState([]);
    const location = useLocation();
    const toggleMenu = (menuId) => {
        setExpandedMenus((prev) =>
            prev.includes(menuId)
                ? prev.filter((id) => id !== menuId)
                : [...prev, menuId]
        );
    };
    const menuItems = [
        {
            id: "dashboard",
            title: "Dashboard",
            icon: Home,
            path: "/admin",
            subItems: [],
        },
        {
            id: "users",
            title: "User Management",
            icon: Users,
            path: "/admin/users",
            subItems: [
                {
                    title: "All Users",
                    path: "/admin/users",
                },
                {
                    title: "User Activity",
                    path: "/admin/users/activity",
                },
                {
                    title: "Support Tickets",
                    path: "/admin/users/tickets",
                },
                {
                    title: "Emergency Contacts",
                    path: "/admin/users/emergency",
                },
            ],
        },
        {
            id: "vendors",
            title: "Vendor Management",
            icon: Building2,
            path: "/admin/vendors",
            subItems: [
                {
                    title: "All Vendors",
                    path: "/admin/vendors",
                },
                {
                    title: "Document Verification",
                    path: "/admin/vendors/verification",
                },
                {
                    title: "Performance Review",
                    path: "/admin/vendors/performance",
                },
                {
                    title: "Commission Settings",
                    path: "/admin/vendors/commission",
                },
            ],
        },
        {
            id: "treks",
            title: "Trek Control Panel",
            icon: Map,
            path: "/admin/treks",
            subItems: [
                {
                    title: "All Treks",
                    path: "/admin/treks",
                },
                {
                    title: "Trek Categories",
                    path: "/admin/treks/categories",
                },
                {
                    title: "Safety Rules",
                    path: "/admin/treks/safety",
                },
                {
                    title: "Batch Management",
                    path: "/admin/treks/batches",
                },
            ],
        },
        {
            id: "bookings",
            title: "Booking & Payment",
            icon: Calendar,
            path: "/admin/bookings",
            subItems: [
                {
                    title: "All Bookings",
                    path: "/admin/bookings",
                },
                {
                    title: "Cancellations & Refunds",
                    path: "/admin/bookings/cancellations",
                },
                {
                    title: "Payment Gateway Logs",
                    path: "/admin/bookings/payment-logs",
                },
                {
                    title: "Manual Adjustments",
                    path: "/admin/bookings/adjustments",
                },
                {
                    title: "Reconciliation Reports",
                    path: "/admin/bookings/reconciliation",
                },
            ],
        },
        {
            id: "coupons",
            title: "Coupons & Campaigns",
            icon: Percent,
            path: "/admin/coupons",
            subItems: [
                {
                    title: "Manage Coupons",
                    path: "/admin/coupons",
                },
                {
                    title: "Usage Tracking",
                    path: "/admin/coupons/tracking",
                },
                {
                    title: "Assign to Vendors",
                    path: "/admin/coupons/assign",
                },
                {
                    title: "Campaign Management",
                    path: "/admin/coupons/campaigns",
                },
            ],
        },
        {
            id: "communications",
            title: "Communication & Notifications",
            icon: MessageSquare,
            path: "/admin/communications",
            subItems: [
                {
                    title: "SMS/WhatsApp Templates",
                    path: "/admin/communications/templates",
                },
                {
                    title: "Email Templates",
                    path: "/admin/communications/email",
                },
                {
                    title: "Push Notifications",
                    path: "/admin/communications/push",
                },
                {
                    title: "Scheduled Notifications",
                    path: "/admin/communications/scheduled",
                },
                {
                    title: "System Alerts",
                    path: "/admin/communications/alerts",
                },
            ],
        },
        {
            id: "support",
            title: "Support & Tickets",
            icon: Headphones,
            path: "/admin/support",
            subItems: [
                {
                    title: "User Complaints",
                    path: "/admin/support/complaints",
                },
                {
                    title: "Vendor Issues",
                    path: "/admin/support/vendor-issues",
                },
                {
                    title: "Refund Escalations",
                    path: "/admin/support/refunds",
                },
                {
                    title: "Team Routing",
                    path: "/admin/support/routing",
                },
            ],
        },
        {
            id: "locations",
            title: "Location Management",
            icon: MapPin,
            path: "/admin/locations",
            subItems: [
                {
                    title: "States",
                    path: "/admin/locations/states",
                },
                {
                    title: "Operating Cities",
                    path: "/admin/locations/cities",
                },
                {
                    title: "Trek Mapping",
                    path: "/admin/locations/mapping",
                },
                {
                    title: "Pickup Points",
                    path: "/admin/locations/pickup",
                },
                {
                    title: "Weather Input",
                    path: "/admin/locations/weather",
                },
            ],
        },
        {
            id: "finance",
            title: "Finance & Reports",
            icon: CreditCard,
            path: "/admin/finance",
            subItems: [
                {
                    title: "Sales Reports",
                    path: "/admin/finance/sales",
                },
                {
                    title: "Vendor Settlements",
                    path: "/admin/finance/settlements",
                },
                {
                    title: "Tax Reports",
                    path: "/admin/finance/tax",
                },
                {
                    title: "Manual Payment Logs",
                    path: "/admin/finance/manual-payments",
                },
            ],
        },
        {
            id: "withdrawals",
            title: "Withdrawals",
            icon: Wallet,
            path: "/admin/withdrawals",
            subItems: [],
        },
        {
            id: "roles",
            title: "Roles & Permissions",
            icon: Shield,
            path: "/admin/roles",
            subItems: [
                {
                    title: "Admin Roles",
                    path: "/admin/roles/admin",
                },
                {
                    title: "Permission Settings",
                    path: "/admin/roles/permissions",
                },
                {
                    title: "Activity Log",
                    path: "/admin/roles/activity",
                },
                {
                    title: "Two-Step Auth",
                    path: "/admin/roles/2fa",
                },
            ],
        },
        {
            id: "analytics",
            title: "Analytics",
            icon: BarChart,
            path: "/admin/analytics",
            subItems: [],
        },
        {
            id: "system",
            title: "App & System Settings",
            icon: Server,
            path: "/admin/system",
            subItems: [
                {
                    title: "API Key Management",
                    path: "/admin/system/api-keys",
                },
                {
                    title: "Version Control",
                    path: "/admin/system/version",
                },
                {
                    title: "Maintenance Mode",
                    path: "/admin/system/maintenance",
                },
                {
                    title: "Legal Policies",
                    path: "/admin/system/policies",
                },
                {
                    title: "Server Health",
                    path: "/admin/system/health",
                },
            ],
        },
        {
            id: "settings",
            title: "Settings",
            icon: Settings,
            path: "/admin/settings",
            subItems: [],
        },
    ];
    const isMenuActive = (item) => {
        if (item.subItems && item.subItems.length > 0) {
            return item.subItems.some(
                (subItem) => location.pathname === subItem.path
            );
        }
        return location.pathname === item.path;
    };
    const isSubItemActive = (path) => {
        return location.pathname === path;
    };
    return /*#__PURE__*/ _jsxs("div", {
        className: "flex min-h-screen",
        children: [
            /*#__PURE__*/ _jsx("div", {
                className: "fixed inset-0 z-20 bg-black/50 lg:hidden",
                onClick: () => setSidebarOpen(false),
                style: {
                    display: sidebarOpen ? "block" : "none",
                },
            }),
            /*#__PURE__*/ _jsxs("aside", {
                className: `fixed inset-y-0 left-0 z-30 w-64 transform bg-gray-900 text-white transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-auto ${
                    sidebarOpen ? "translate-x-0" : "-translate-x-full"
                }`,
                children: [
                    /*#__PURE__*/ _jsx("div", {
                        className:
                            "flex h-16 items-center justify-center px-4 bg-gray-800",
                        children: /*#__PURE__*/ _jsxs(Link, {
                            to: "/admin",
                            className: "flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ _jsx("div", {
                                    className:
                                        "w-10 h-10 rounded-full bg-aorbo-yellow flex items-center justify-center",
                                    children: /*#__PURE__*/ _jsx("span", {
                                        className:
                                            "text-black font-bold text-lg",
                                        children: "A",
                                    }),
                                }),
                                /*#__PURE__*/ _jsx("span", {
                                    className: "text-xl font-bold",
                                    children: "Aorbo Admin",
                                }),
                            ],
                        }),
                    }),
                    /*#__PURE__*/ _jsxs("nav", {
                        className:
                            "mt-5 px-2 h-[calc(100vh-5rem)] overflow-y-auto",
                        children: [
                            menuItems.map((item) =>
                                /*#__PURE__*/ _jsx(
                                    "div",
                                    {
                                        className: "mb-1",
                                        children:
                                            item.subItems &&
                                            item.subItems.length > 0
                                                ? /*#__PURE__*/ _jsxs(
                                                      Collapsible,
                                                      {
                                                          open: expandedMenus.includes(
                                                              item.id
                                                          ),
                                                          onOpenChange: () =>
                                                              toggleMenu(
                                                                  item.id
                                                              ),
                                                          children: [
                                                              /*#__PURE__*/ _jsxs(
                                                                  CollapsibleTrigger,
                                                                  {
                                                                      className: `w-full group flex items-center justify-between px-4 py-3 text-white hover:bg-white hover:bg-opacity-10 rounded-md transition-all ${
                                                                          isMenuActive(
                                                                              item
                                                                          )
                                                                              ? "bg-white bg-opacity-10"
                                                                              : ""
                                                                      }`,
                                                                      children:
                                                                          [
                                                                              /*#__PURE__*/ _jsxs(
                                                                                  "div",
                                                                                  {
                                                                                      className:
                                                                                          "flex items-center",
                                                                                      children:
                                                                                          [
                                                                                              /*#__PURE__*/ _jsx(
                                                                                                  item.icon,
                                                                                                  {
                                                                                                      className:
                                                                                                          "mr-3 h-5 w-5",
                                                                                                  }
                                                                                              ),
                                                                                              /*#__PURE__*/ _jsx(
                                                                                                  "span",
                                                                                                  {
                                                                                                      children:
                                                                                                          item.title,
                                                                                                  }
                                                                                              ),
                                                                                          ],
                                                                                  }
                                                                              ),
                                                                              expandedMenus.includes(
                                                                                  item.id
                                                                              )
                                                                                  ? /*#__PURE__*/ _jsx(
                                                                                        ChevronDown,
                                                                                        {
                                                                                            className:
                                                                                                "h-4 w-4",
                                                                                        }
                                                                                    )
                                                                                  : /*#__PURE__*/ _jsx(
                                                                                        ChevronRight,
                                                                                        {
                                                                                            className:
                                                                                                "h-4 w-4",
                                                                                        }
                                                                                    ),
                                                                          ],
                                                                  }
                                                              ),
                                                              /*#__PURE__*/ _jsx(
                                                                  CollapsibleContent,
                                                                  {
                                                                      className:
                                                                          "ml-4 mt-1",
                                                                      children:
                                                                          item.subItems.map(
                                                                              (
                                                                                  subItem
                                                                              ) =>
                                                                                  /*#__PURE__*/ _jsx(
                                                                                      Link,
                                                                                      {
                                                                                          to: subItem.path,
                                                                                          className: `block px-4 py-2 text-sm text-gray-300 hover:bg-white hover:bg-opacity-10 rounded-md transition-all ${
                                                                                              isSubItemActive(
                                                                                                  subItem.path
                                                                                              )
                                                                                                  ? "bg-white bg-opacity-10 text-white"
                                                                                                  : ""
                                                                                          }`,
                                                                                          children:
                                                                                              subItem.title,
                                                                                      },
                                                                                      subItem.path
                                                                                  )
                                                                          ),
                                                                  }
                                                              ),
                                                          ],
                                                      }
                                                  )
                                                : /*#__PURE__*/ _jsxs(Link, {
                                                      to: item.path,
                                                      className: `group flex items-center px-4 py-3 text-white hover:bg-white hover:bg-opacity-10 rounded-md transition-all ${
                                                          isMenuActive(item)
                                                              ? "bg-white bg-opacity-10"
                                                              : ""
                                                      }`,
                                                      children: [
                                                          /*#__PURE__*/ _jsx(
                                                              item.icon,
                                                              {
                                                                  className:
                                                                      "mr-3 h-5 w-5",
                                                              }
                                                          ),
                                                          /*#__PURE__*/ _jsx(
                                                              "span",
                                                              {
                                                                  children:
                                                                      item.title,
                                                              }
                                                          ),
                                                      ],
                                                  }),
                                    },
                                    item.id
                                )
                            ),
                            /*#__PURE__*/ _jsxs("button", {
                                onClick: logout,
                                className:
                                    "w-full mt-4 group flex items-center px-4 py-3 text-white hover:bg-white hover:bg-opacity-10 rounded-md transition-all",
                                children: [
                                    /*#__PURE__*/ _jsx(LogOut, {
                                        className: "mr-3 h-5 w-5",
                                    }),
                                    /*#__PURE__*/ _jsx("span", {
                                        children: "Logout",
                                    }),
                                ],
                            }),
                        ],
                    }),
                ],
            }),
            /*#__PURE__*/ _jsxs("div", {
                className: "flex-1",
                children: [
                    /*#__PURE__*/ _jsxs("header", {
                        className:
                            "bg-white border-b h-16 flex items-center justify-between px-4 lg:px-8",
                        children: [
                            /*#__PURE__*/ _jsx("button", {
                                onClick: () => setSidebarOpen(true),
                                className:
                                    "block lg:hidden p-2 rounded-md text-gray-800 hover:bg-gray-100",
                                children: /*#__PURE__*/ _jsx(Menu, {
                                    className: "h-6 w-6",
                                }),
                            }),
                            /*#__PURE__*/ _jsx("div", {
                                className: "lg:hidden text-center flex-1",
                                children: /*#__PURE__*/ _jsx("span", {
                                    className: "font-semibold text-lg",
                                    children: "Aorbo Admin",
                                }),
                            }),
                            /*#__PURE__*/ _jsxs("div", {
                                className: "flex items-center space-x-4",
                                children: [
                                    /*#__PURE__*/ _jsx("div", {
                                        className: "hidden md:block",
                                        children: /*#__PURE__*/ _jsx("span", {
                                            className: "text-sm font-medium",
                                            children: user?.name,
                                        }),
                                    }),
                                    /*#__PURE__*/ _jsx("div", {
                                        className:
                                            "h-8 w-8 rounded-full bg-gray-900 text-white flex items-center justify-center",
                                        children: /*#__PURE__*/ _jsx("span", {
                                            className: "font-medium",
                                            children: user?.name?.[0] || "A",
                                        }),
                                    }),
                                ],
                            }),
                        ],
                    }),
                    /*#__PURE__*/ _jsx("main", {
                        className:
                            "flex-1 p-4 lg:p-8 bg-gray-50 min-h-[calc(100vh-4rem)]",
                        children: /*#__PURE__*/ _jsx(Outlet, {}),
                    }),
                ],
            }),
        ],
    });
};
export default AdminLayout;
