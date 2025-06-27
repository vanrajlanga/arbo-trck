import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { Menu, Home, Map, Calendar, Users, Settings, LogOut, CreditCard, MessageCircle, Star, FileText, MapPin, Wallet, Percent } from "lucide-react";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const VendorLayout = () => {
  const {
    user,
    logout
  } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  const isActive = path => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };
  return /*#__PURE__*/_jsxs("div", {
    className: "flex min-h-screen",
    children: [/*#__PURE__*/_jsx("div", {
      className: "fixed inset-0 z-20 bg-black/50 lg:hidden",
      onClick: () => setSidebarOpen(false),
      style: {
        display: sidebarOpen ? "block" : "none"
      }
    }), /*#__PURE__*/_jsxs("aside", {
      className: `fixed inset-y-0 left-0 z-30 w-64 transform bg-aorbo-teal text-white transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-auto ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`,
      children: [/*#__PURE__*/_jsx("div", {
        className: "flex h-16 items-center justify-center px-4 bg-aorbo-teal",
        children: /*#__PURE__*/_jsxs(Link, {
          to: "/vendor",
          className: "flex items-center gap-2",
          children: [/*#__PURE__*/_jsx("div", {
            className: "w-10 h-10 rounded-full bg-aorbo-yellow flex items-center justify-center",
            children: /*#__PURE__*/_jsx("span", {
              className: "text-black font-bold text-lg",
              children: "A"
            })
          }), /*#__PURE__*/_jsx("span", {
            className: "text-xl font-bold",
            children: "Aorbo Treks"
          })]
        })
      }), /*#__PURE__*/_jsxs("nav", {
        className: "mt-5 px-2",
        children: [/*#__PURE__*/_jsxs(Link, {
          to: "/vendor",
          className: `group flex items-center px-4 py-3 rounded-md transition-all ${isActive('/vendor') && !isActive('/vendor/treks') && !isActive('/vendor/bookings') && !isActive('/vendor/customers') && !isActive('/vendor/payments') && !isActive('/vendor/reviews') && !isActive('/vendor/messages') && !isActive('/vendor/reports') && !isActive('/vendor/settings') && !isActive('/vendor/locations') && !isActive('/vendor/withdrawals') && !isActive('/vendor/coupons') ? 'bg-white bg-opacity-20 text-white' : 'text-white hover:bg-white hover:bg-opacity-10'}`,
          children: [/*#__PURE__*/_jsx(Home, {
            className: "mr-3 h-5 w-5"
          }), /*#__PURE__*/_jsx("span", {
            children: "Dashboard"
          })]
        }), /*#__PURE__*/_jsxs(Link, {
          to: "/vendor/treks",
          className: `group flex items-center px-4 py-3 rounded-md transition-all ${isActive('/vendor/treks') ? 'bg-white bg-opacity-20 text-white' : 'text-white hover:bg-white hover:bg-opacity-10'}`,
          children: [/*#__PURE__*/_jsx(Map, {
            className: "mr-3 h-5 w-5"
          }), /*#__PURE__*/_jsx("span", {
            children: "Trek Management"
          })]
        }), /*#__PURE__*/_jsxs(Link, {
          to: "/vendor/bookings",
          className: `group flex items-center px-4 py-3 rounded-md transition-all ${isActive('/vendor/bookings') ? 'bg-white bg-opacity-20 text-white' : 'text-white hover:bg-white hover:bg-opacity-10'}`,
          children: [/*#__PURE__*/_jsx(Calendar, {
            className: "mr-3 h-5 w-5"
          }), /*#__PURE__*/_jsx("span", {
            children: "Bookings"
          })]
        }), /*#__PURE__*/_jsxs(Link, {
          to: "/vendor/customers",
          className: `group flex items-center px-4 py-3 rounded-md transition-all ${isActive('/vendor/customers') ? 'bg-white bg-opacity-20 text-white' : 'text-white hover:bg-white hover:bg-opacity-10'}`,
          children: [/*#__PURE__*/_jsx(Users, {
            className: "mr-3 h-5 w-5"
          }), /*#__PURE__*/_jsx("span", {
            children: "Customers"
          })]
        }), /*#__PURE__*/_jsxs(Link, {
          to: "/vendor/locations",
          className: `group flex items-center px-4 py-3 rounded-md transition-all ${isActive('/vendor/locations') ? 'bg-white bg-opacity-20 text-white' : 'text-white hover:bg-white hover:bg-opacity-10'}`,
          children: [/*#__PURE__*/_jsx(MapPin, {
            className: "mr-3 h-5 w-5"
          }), /*#__PURE__*/_jsx("span", {
            children: "Manage Location"
          })]
        }), /*#__PURE__*/_jsxs(Link, {
          to: "/vendor/payments",
          className: `group flex items-center px-4 py-3 rounded-md transition-all ${isActive('/vendor/payments') ? 'bg-white bg-opacity-20 text-white' : 'text-white hover:bg-white hover:bg-opacity-10'}`,
          children: [/*#__PURE__*/_jsx(CreditCard, {
            className: "mr-3 h-5 w-5"
          }), /*#__PURE__*/_jsx("span", {
            children: "Payments"
          })]
        }), /*#__PURE__*/_jsxs(Link, {
          to: "/vendor/withdrawals",
          className: `group flex items-center px-4 py-3 rounded-md transition-all ${isActive('/vendor/withdrawals') ? 'bg-white bg-opacity-20 text-white' : 'text-white hover:bg-white hover:bg-opacity-10'}`,
          children: [/*#__PURE__*/_jsx(Wallet, {
            className: "mr-3 h-5 w-5"
          }), /*#__PURE__*/_jsx("span", {
            children: "Withdrawals"
          })]
        }), /*#__PURE__*/_jsxs(Link, {
          to: "/vendor/coupons",
          className: `group flex items-center px-4 py-3 rounded-md transition-all ${isActive('/vendor/coupons') ? 'bg-white bg-opacity-20 text-white' : 'text-white hover:bg-white hover:bg-opacity-10'}`,
          children: [/*#__PURE__*/_jsx(Percent, {
            className: "mr-3 h-5 w-5"
          }), /*#__PURE__*/_jsx("span", {
            children: "Coupons"
          })]
        }), /*#__PURE__*/_jsxs(Link, {
          to: "/vendor/reviews",
          className: `group flex items-center px-4 py-3 rounded-md transition-all ${isActive('/vendor/reviews') ? 'bg-white bg-opacity-20 text-white' : 'text-white hover:bg-white hover:bg-opacity-10'}`,
          children: [/*#__PURE__*/_jsx(Star, {
            className: "mr-3 h-5 w-5"
          }), /*#__PURE__*/_jsx("span", {
            children: "Reviews"
          })]
        }), /*#__PURE__*/_jsxs(Link, {
          to: "/vendor/messages",
          className: `group flex items-center px-4 py-3 rounded-md transition-all ${isActive('/vendor/messages') ? 'bg-white bg-opacity-20 text-white' : 'text-white hover:bg-white hover:bg-opacity-10'}`,
          children: [/*#__PURE__*/_jsx(MessageCircle, {
            className: "mr-3 h-5 w-5"
          }), /*#__PURE__*/_jsx("span", {
            children: "Messages"
          })]
        }), /*#__PURE__*/_jsxs(Link, {
          to: "/vendor/reports",
          className: `group flex items-center px-4 py-3 rounded-md transition-all ${isActive('/vendor/reports') ? 'bg-white bg-opacity-20 text-white' : 'text-white hover:bg-white hover:bg-opacity-10'}`,
          children: [/*#__PURE__*/_jsx(FileText, {
            className: "mr-3 h-5 w-5"
          }), /*#__PURE__*/_jsx("span", {
            children: "Reports"
          })]
        }), /*#__PURE__*/_jsxs(Link, {
          to: "/vendor/settings",
          className: `group flex items-center px-4 py-3 rounded-md transition-all ${isActive('/vendor/settings') ? 'bg-white bg-opacity-20 text-white' : 'text-white hover:bg-white hover:bg-opacity-10'}`,
          children: [/*#__PURE__*/_jsx(Settings, {
            className: "mr-3 h-5 w-5"
          }), /*#__PURE__*/_jsx("span", {
            children: "Settings"
          })]
        }), /*#__PURE__*/_jsxs("button", {
          onClick: handleLogout,
          className: "w-full group flex items-center px-4 py-3 text-white hover:bg-white hover:bg-opacity-10 rounded-md transition-all",
          children: [/*#__PURE__*/_jsx(LogOut, {
            className: "mr-3 h-5 w-5"
          }), /*#__PURE__*/_jsx("span", {
            children: "Logout"
          })]
        })]
      })]
    }), /*#__PURE__*/_jsxs("div", {
      className: "flex-1",
      children: [/*#__PURE__*/_jsxs("header", {
        className: "bg-white border-b h-16 flex items-center justify-between px-4 lg:px-8",
        children: [/*#__PURE__*/_jsx("button", {
          onClick: () => setSidebarOpen(true),
          className: "block lg:hidden p-2 rounded-md text-gray-800 hover:bg-gray-100",
          children: /*#__PURE__*/_jsx(Menu, {
            className: "h-6 w-6"
          })
        }), /*#__PURE__*/_jsx("div", {
          className: "lg:hidden text-center flex-1",
          children: /*#__PURE__*/_jsx("span", {
            className: "font-semibold text-lg",
            children: "Aorbo Treks"
          })
        }), /*#__PURE__*/_jsxs("div", {
          className: "flex items-center space-x-4",
          children: [/*#__PURE__*/_jsx("div", {
            className: "hidden md:block",
            children: /*#__PURE__*/_jsx("span", {
              className: "text-sm font-medium",
              children: user?.name
            })
          }), /*#__PURE__*/_jsx("div", {
            className: "h-8 w-8 rounded-full bg-aorbo-teal text-white flex items-center justify-center",
            children: /*#__PURE__*/_jsx("span", {
              className: "font-medium",
              children: user?.name?.[0] || 'U'
            })
          })]
        })]
      }), /*#__PURE__*/_jsx("main", {
        className: "flex-1 p-4 lg:p-8 bg-gray-50 min-h-[calc(100vh-4rem)]",
        children: /*#__PURE__*/_jsx(Outlet, {})
      })]
    })]
  });
};
export default VendorLayout;