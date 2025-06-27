import { useState } from "react";
import { Activity, Calendar, MapPin, CreditCard, User, Clock, Filter, Search } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

// Mock data
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const activityData = [{
  id: "ACT001",
  userId: "USR001",
  userName: "Rahul Sharma",
  action: "Booking Created",
  details: "Booked Dandeli Adventure Trek for 2 people",
  timestamp: "2025-06-03 10:30:00",
  type: "booking",
  amount: "₹12,000"
}, {
  id: "ACT002",
  userId: "USR002",
  userName: "Priya Patel",
  action: "Payment Completed",
  details: "Payment for Gokarna Beach Trek",
  timestamp: "2025-06-03 09:15:00",
  type: "payment",
  amount: "₹9,000"
}, {
  id: "ACT003",
  userId: "USR001",
  userName: "Rahul Sharma",
  action: "Profile Updated",
  details: "Updated contact information",
  timestamp: "2025-06-03 08:45:00",
  type: "profile",
  amount: null
}, {
  id: "ACT004",
  userId: "USR003",
  userName: "Ankit Gupta",
  action: "Booking Cancelled",
  details: "Cancelled Kudremukh Peak Trek",
  timestamp: "2025-06-02 16:20:00",
  type: "cancellation",
  amount: "₹5,600"
}, {
  id: "ACT005",
  userId: "USR004",
  userName: "Neha Singh",
  action: "Review Posted",
  details: "Posted review for Vibhuti Waterfalls Trek",
  timestamp: "2025-06-02 14:10:00",
  type: "review",
  amount: null
}];
const AdminUserActivity = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const filteredActivity = activityData.filter(activity => {
    const matchesSearch = activity.userName.toLowerCase().includes(searchQuery.toLowerCase()) || activity.action.toLowerCase().includes(searchQuery.toLowerCase()) || activity.details.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || activity.type === typeFilter;
    return matchesSearch && matchesType;
  });
  const getActionIcon = type => {
    switch (type) {
      case "booking":
        return /*#__PURE__*/_jsx(Calendar, {
          className: "h-4 w-4 text-blue-500"
        });
      case "payment":
        return /*#__PURE__*/_jsx(CreditCard, {
          className: "h-4 w-4 text-green-500"
        });
      case "profile":
        return /*#__PURE__*/_jsx(User, {
          className: "h-4 w-4 text-orange-500"
        });
      case "cancellation":
        return /*#__PURE__*/_jsx(MapPin, {
          className: "h-4 w-4 text-red-500"
        });
      case "review":
        return /*#__PURE__*/_jsx(Activity, {
          className: "h-4 w-4 text-purple-500"
        });
      default:
        return /*#__PURE__*/_jsx(Activity, {
          className: "h-4 w-4 text-gray-500"
        });
    }
  };
  const getActionBadge = type => {
    const colors = {
      booking: "bg-blue-100 text-blue-800",
      payment: "bg-green-100 text-green-800",
      profile: "bg-orange-100 text-orange-800",
      cancellation: "bg-red-100 text-red-800",
      review: "bg-purple-100 text-purple-800"
    };
    return colors[type] || "bg-gray-100 text-gray-800";
  };
  return /*#__PURE__*/_jsxs("div", {
    children: [/*#__PURE__*/_jsxs("div", {
      className: "flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8",
      children: [/*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx("h1", {
          className: "text-2xl font-bold",
          children: "User Activity"
        }), /*#__PURE__*/_jsx("p", {
          className: "text-gray-500",
          children: "Monitor all user actions and system interactions"
        })]
      }), /*#__PURE__*/_jsx("div", {
        className: "mt-4 lg:mt-0",
        children: /*#__PURE__*/_jsxs(Button, {
          children: [/*#__PURE__*/_jsx(Clock, {
            className: "mr-2 h-4 w-4"
          }), "Real-time View"]
        })
      })]
    }), /*#__PURE__*/_jsxs("div", {
      className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8",
      children: [/*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsxs(CardHeader, {
          className: "flex flex-row items-center justify-between pb-2",
          children: [/*#__PURE__*/_jsx(CardTitle, {
            className: "text-sm font-medium",
            children: "Total Activities"
          }), /*#__PURE__*/_jsx(Activity, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "2,847"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-xs text-muted-foreground",
            children: "Today"
          })]
        })]
      }), /*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsxs(CardHeader, {
          className: "flex flex-row items-center justify-between pb-2",
          children: [/*#__PURE__*/_jsx(CardTitle, {
            className: "text-sm font-medium",
            children: "New Bookings"
          }), /*#__PURE__*/_jsx(Calendar, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "47"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-xs text-muted-foreground",
            children: "+8% from yesterday"
          })]
        })]
      }), /*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsxs(CardHeader, {
          className: "flex flex-row items-center justify-between pb-2",
          children: [/*#__PURE__*/_jsx(CardTitle, {
            className: "text-sm font-medium",
            children: "Payments"
          }), /*#__PURE__*/_jsx(CreditCard, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "\u20B92,34,500"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-xs text-muted-foreground",
            children: "Today's transactions"
          })]
        })]
      }), /*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsxs(CardHeader, {
          className: "flex flex-row items-center justify-between pb-2",
          children: [/*#__PURE__*/_jsx(CardTitle, {
            className: "text-sm font-medium",
            children: "Active Users"
          }), /*#__PURE__*/_jsx(User, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "342"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-xs text-muted-foreground",
            children: "Currently online"
          })]
        })]
      })]
    }), /*#__PURE__*/_jsxs(Card, {
      children: [/*#__PURE__*/_jsxs(CardHeader, {
        children: [/*#__PURE__*/_jsx(CardTitle, {
          children: "Activity Log"
        }), /*#__PURE__*/_jsx(CardDescription, {
          children: "Real-time user activity across the platform"
        })]
      }), /*#__PURE__*/_jsxs(CardContent, {
        children: [/*#__PURE__*/_jsxs("div", {
          className: "flex flex-col sm:flex-row gap-4 mb-6",
          children: [/*#__PURE__*/_jsxs("div", {
            className: "relative flex-1",
            children: [/*#__PURE__*/_jsx(Search, {
              className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4"
            }), /*#__PURE__*/_jsx(Input, {
              placeholder: "Search activities...",
              value: searchQuery,
              onChange: e => setSearchQuery(e.target.value),
              className: "pl-10"
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "flex gap-2",
            children: [/*#__PURE__*/_jsxs("select", {
              value: typeFilter,
              onChange: e => setTypeFilter(e.target.value),
              className: "px-3 py-2 border border-gray-300 rounded-md text-sm",
              children: [/*#__PURE__*/_jsx("option", {
                value: "all",
                children: "All Types"
              }), /*#__PURE__*/_jsx("option", {
                value: "booking",
                children: "Bookings"
              }), /*#__PURE__*/_jsx("option", {
                value: "payment",
                children: "Payments"
              }), /*#__PURE__*/_jsx("option", {
                value: "profile",
                children: "Profile"
              }), /*#__PURE__*/_jsx("option", {
                value: "cancellation",
                children: "Cancellations"
              }), /*#__PURE__*/_jsx("option", {
                value: "review",
                children: "Reviews"
              })]
            }), /*#__PURE__*/_jsxs(Button, {
              variant: "outline",
              children: [/*#__PURE__*/_jsx(Filter, {
                className: "mr-2 h-4 w-4"
              }), "More Filters"]
            })]
          })]
        }), /*#__PURE__*/_jsxs(Table, {
          children: [/*#__PURE__*/_jsx(TableHeader, {
            children: /*#__PURE__*/_jsxs(TableRow, {
              children: [/*#__PURE__*/_jsx(TableHead, {
                children: "Action"
              }), /*#__PURE__*/_jsx(TableHead, {
                children: "User"
              }), /*#__PURE__*/_jsx(TableHead, {
                children: "Details"
              }), /*#__PURE__*/_jsx(TableHead, {
                children: "Amount"
              }), /*#__PURE__*/_jsx(TableHead, {
                children: "Time"
              }), /*#__PURE__*/_jsx(TableHead, {
                children: "Type"
              })]
            })
          }), /*#__PURE__*/_jsx(TableBody, {
            children: filteredActivity.map(activity => /*#__PURE__*/_jsxs(TableRow, {
              children: [/*#__PURE__*/_jsx(TableCell, {
                children: /*#__PURE__*/_jsxs("div", {
                  className: "flex items-center gap-2",
                  children: [getActionIcon(activity.type), /*#__PURE__*/_jsx("span", {
                    className: "font-medium",
                    children: activity.action
                  })]
                })
              }), /*#__PURE__*/_jsx(TableCell, {
                children: /*#__PURE__*/_jsxs("div", {
                  children: [/*#__PURE__*/_jsx("div", {
                    className: "font-medium",
                    children: activity.userName
                  }), /*#__PURE__*/_jsx("div", {
                    className: "text-sm text-gray-500",
                    children: activity.userId
                  })]
                })
              }), /*#__PURE__*/_jsx(TableCell, {
                children: /*#__PURE__*/_jsx("div", {
                  className: "max-w-xs truncate",
                  children: activity.details
                })
              }), /*#__PURE__*/_jsx(TableCell, {
                children: activity.amount ? /*#__PURE__*/_jsx("span", {
                  className: "font-medium",
                  children: activity.amount
                }) : /*#__PURE__*/_jsx("span", {
                  className: "text-gray-400",
                  children: "-"
                })
              }), /*#__PURE__*/_jsx(TableCell, {
                children: /*#__PURE__*/_jsx("div", {
                  className: "text-sm",
                  children: new Date(activity.timestamp).toLocaleString()
                })
              }), /*#__PURE__*/_jsx(TableCell, {
                children: /*#__PURE__*/_jsx(Badge, {
                  className: getActionBadge(activity.type),
                  children: activity.type
                })
              })]
            }, activity.id))
          })]
        })]
      })]
    })]
  });
};
export default AdminUserActivity;