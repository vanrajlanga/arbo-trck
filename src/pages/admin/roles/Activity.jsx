import { useState } from "react";
import { Search, Filter, Activity, User, Building2, Shield, Mountain, CreditCard, Calendar, Eye, MoreHorizontal, Download } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock data for activity log
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const activityLogData = [{
  id: "ACT001",
  timestamp: "2025-06-03 14:30:22",
  userType: "admin",
  userId: "ADM001",
  userName: "John Admin",
  userEmail: "john@admin.com",
  action: "user_login",
  description: "Admin user logged into the system",
  ipAddress: "192.168.1.100",
  userAgent: "Chrome 125.0.0.0",
  module: "authentication",
  severity: "info",
  details: {
    sessionId: "sess_abc123",
    location: "Mumbai, India"
  }
}, {
  id: "ACT002",
  timestamp: "2025-06-03 14:25:15",
  userType: "vendor",
  userId: "VEN001",
  userName: "Mountain Adventures",
  userEmail: "contact@mountainadv.com",
  action: "trek_created",
  description: "New trek 'Everest Base Camp' created",
  ipAddress: "203.194.15.45",
  userAgent: "Safari 17.4.1",
  module: "trek_management",
  severity: "info",
  details: {
    trekId: "TRK001",
    trekName: "Everest Base Camp",
    price: 25000
  }
}, {
  id: "ACT003",
  timestamp: "2025-06-03 14:20:08",
  userType: "customer",
  userId: "CUST001",
  userName: "Sarah Smith",
  userEmail: "sarah@example.com",
  action: "user_registered",
  description: "New customer account created",
  ipAddress: "157.32.198.22",
  userAgent: "Chrome 125.0.0.0",
  module: "user_management",
  severity: "info",
  details: {
    registrationMethod: "email",
    referralSource: "google"
  }
}, {
  id: "ACT004",
  timestamp: "2025-06-03 14:15:33",
  userType: "customer",
  userId: "CUST002",
  userName: "Mike Johnson",
  userEmail: "mike@example.com",
  action: "booking_created",
  description: "New booking created for Annapurna Circuit",
  ipAddress: "98.139.180.12",
  userAgent: "Firefox 126.0",
  module: "booking_management",
  severity: "info",
  details: {
    bookingId: "BOOK001",
    trekName: "Annapurna Circuit",
    amount: 15000
  }
}, {
  id: "ACT005",
  timestamp: "2025-06-03 14:10:45",
  userType: "admin",
  userId: "ADM002",
  userName: "Admin Sarah",
  userEmail: "sarah@admin.com",
  action: "user_suspended",
  description: "Vendor account suspended for policy violation",
  ipAddress: "192.168.1.101",
  userAgent: "Chrome 125.0.0.0",
  module: "user_management",
  severity: "warning",
  details: {
    suspendedUserId: "VEN002",
    reason: "Multiple customer complaints",
    duration: "30 days"
  }
}];
const AdminRolesActivity = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [userTypeFilter, setUserTypeFilter] = useState("all");
  const [moduleFilter, setModuleFilter] = useState("all");
  const [severityFilter, setSeverityFilter] = useState("all");
  const filteredActivities = activityLogData.filter(activity => {
    const matchesSearch = activity.userName.toLowerCase().includes(searchQuery.toLowerCase()) || activity.action.toLowerCase().includes(searchQuery.toLowerCase()) || activity.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesUserType = userTypeFilter === "all" || activity.userType === userTypeFilter;
    const matchesModule = moduleFilter === "all" || activity.module === moduleFilter;
    const matchesSeverity = severityFilter === "all" || activity.severity === severityFilter;
    return matchesSearch && matchesUserType && matchesModule && matchesSeverity;
  });
  const getUserTypeColor = userType => {
    switch (userType) {
      case "admin":
        return "bg-purple-100 text-purple-800";
      case "vendor":
        return "bg-blue-100 text-blue-800";
      case "customer":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  const getSeverityColor = severity => {
    switch (severity) {
      case "info":
        return "bg-blue-100 text-blue-800";
      case "warning":
        return "bg-yellow-100 text-yellow-800";
      case "error":
        return "bg-red-100 text-red-800";
      case "success":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  const getActionIcon = action => {
    if (action.includes("login")) return /*#__PURE__*/_jsx(User, {
      className: "h-4 w-4"
    });
    if (action.includes("trek")) return /*#__PURE__*/_jsx(Mountain, {
      className: "h-4 w-4"
    });
    if (action.includes("booking")) return /*#__PURE__*/_jsx(Calendar, {
      className: "h-4 w-4"
    });
    if (action.includes("payment")) return /*#__PURE__*/_jsx(CreditCard, {
      className: "h-4 w-4"
    });
    return /*#__PURE__*/_jsx(Activity, {
      className: "h-4 w-4"
    });
  };
  const viewActivityDetails = activity => {
    console.log("Viewing activity details:", activity);
    // Here you would implement a modal or detailed view
    alert(`Activity Details:\n\nUser: ${activity.userName}\nAction: ${activity.action}\nTime: ${activity.timestamp}\nIP: ${activity.ipAddress}\nDetails: ${JSON.stringify(activity.details, null, 2)}`);
  };
  return /*#__PURE__*/_jsxs("div", {
    children: [/*#__PURE__*/_jsxs("div", {
      className: "flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8",
      children: [/*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx("h1", {
          className: "text-2xl font-bold",
          children: "Activity Log"
        }), /*#__PURE__*/_jsx("p", {
          className: "text-gray-500",
          children: "Track all user activities including logins, registrations, and system actions"
        })]
      }), /*#__PURE__*/_jsx("div", {
        className: "flex gap-2 mt-4 lg:mt-0",
        children: /*#__PURE__*/_jsxs(Button, {
          variant: "outline",
          children: [/*#__PURE__*/_jsx(Download, {
            className: "mr-2 h-4 w-4"
          }), "Export Log"]
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
            children: "2,547"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-xs text-muted-foreground",
            children: "Last 24 hours"
          })]
        })]
      }), /*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsxs(CardHeader, {
          className: "flex flex-row items-center justify-between pb-2",
          children: [/*#__PURE__*/_jsx(CardTitle, {
            className: "text-sm font-medium",
            children: "User Logins"
          }), /*#__PURE__*/_jsx(User, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "847"
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
            children: "New Registrations"
          }), /*#__PURE__*/_jsx(Building2, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "156"
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
            children: "System Warnings"
          }), /*#__PURE__*/_jsx(Shield, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "12"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-xs text-muted-foreground",
            children: "Needs attention"
          })]
        })]
      })]
    }), /*#__PURE__*/_jsxs(Card, {
      children: [/*#__PURE__*/_jsxs(CardHeader, {
        children: [/*#__PURE__*/_jsx(CardTitle, {
          children: "Activity Log"
        }), /*#__PURE__*/_jsx(CardDescription, {
          children: "Comprehensive log of all user activities across the platform"
        })]
      }), /*#__PURE__*/_jsxs(CardContent, {
        children: [/*#__PURE__*/_jsxs("div", {
          className: "flex flex-col lg:flex-row gap-4 mb-6",
          children: [/*#__PURE__*/_jsxs("div", {
            className: "relative flex-1",
            children: [/*#__PURE__*/_jsx(Search, {
              className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4"
            }), /*#__PURE__*/_jsx(Input, {
              placeholder: "Search by user, action, or description...",
              value: searchQuery,
              onChange: e => setSearchQuery(e.target.value),
              className: "pl-10"
            })]
          }), /*#__PURE__*/_jsxs(Select, {
            value: userTypeFilter,
            onValueChange: setUserTypeFilter,
            children: [/*#__PURE__*/_jsx(SelectTrigger, {
              className: "w-40",
              children: /*#__PURE__*/_jsx(SelectValue, {
                placeholder: "User Type"
              })
            }), /*#__PURE__*/_jsxs(SelectContent, {
              children: [/*#__PURE__*/_jsx(SelectItem, {
                value: "all",
                children: "All Users"
              }), /*#__PURE__*/_jsx(SelectItem, {
                value: "admin",
                children: "Admin"
              }), /*#__PURE__*/_jsx(SelectItem, {
                value: "vendor",
                children: "Vendor"
              }), /*#__PURE__*/_jsx(SelectItem, {
                value: "customer",
                children: "Customer"
              })]
            })]
          }), /*#__PURE__*/_jsxs(Select, {
            value: moduleFilter,
            onValueChange: setModuleFilter,
            children: [/*#__PURE__*/_jsx(SelectTrigger, {
              className: "w-40",
              children: /*#__PURE__*/_jsx(SelectValue, {
                placeholder: "Module"
              })
            }), /*#__PURE__*/_jsxs(SelectContent, {
              children: [/*#__PURE__*/_jsx(SelectItem, {
                value: "all",
                children: "All Modules"
              }), /*#__PURE__*/_jsx(SelectItem, {
                value: "authentication",
                children: "Authentication"
              }), /*#__PURE__*/_jsx(SelectItem, {
                value: "user_management",
                children: "User Management"
              }), /*#__PURE__*/_jsx(SelectItem, {
                value: "trek_management",
                children: "Trek Management"
              }), /*#__PURE__*/_jsx(SelectItem, {
                value: "booking_management",
                children: "Booking Management"
              })]
            })]
          }), /*#__PURE__*/_jsxs(Select, {
            value: severityFilter,
            onValueChange: setSeverityFilter,
            children: [/*#__PURE__*/_jsx(SelectTrigger, {
              className: "w-40",
              children: /*#__PURE__*/_jsx(SelectValue, {
                placeholder: "Severity"
              })
            }), /*#__PURE__*/_jsxs(SelectContent, {
              children: [/*#__PURE__*/_jsx(SelectItem, {
                value: "all",
                children: "All Severities"
              }), /*#__PURE__*/_jsx(SelectItem, {
                value: "info",
                children: "Info"
              }), /*#__PURE__*/_jsx(SelectItem, {
                value: "warning",
                children: "Warning"
              }), /*#__PURE__*/_jsx(SelectItem, {
                value: "error",
                children: "Error"
              }), /*#__PURE__*/_jsx(SelectItem, {
                value: "success",
                children: "Success"
              })]
            })]
          }), /*#__PURE__*/_jsxs(Button, {
            variant: "outline",
            children: [/*#__PURE__*/_jsx(Filter, {
              className: "mr-2 h-4 w-4"
            }), "Filters"]
          })]
        }), /*#__PURE__*/_jsx("div", {
          className: "overflow-x-auto",
          children: /*#__PURE__*/_jsxs(Table, {
            children: [/*#__PURE__*/_jsx(TableHeader, {
              children: /*#__PURE__*/_jsxs(TableRow, {
                children: [/*#__PURE__*/_jsx(TableHead, {
                  children: "Timestamp"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "User Details"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Action"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Module"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "IP Address"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Severity"
                }), /*#__PURE__*/_jsx(TableHead, {
                  className: "text-right",
                  children: "Actions"
                })]
              })
            }), /*#__PURE__*/_jsx(TableBody, {
              children: filteredActivities.map(activity => /*#__PURE__*/_jsxs(TableRow, {
                children: [/*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsxs("div", {
                    children: [/*#__PURE__*/_jsx("div", {
                      className: "font-medium",
                      children: activity.timestamp
                    }), /*#__PURE__*/_jsxs("div", {
                      className: "text-xs text-gray-400",
                      children: ["ID: ", activity.id]
                    })]
                  })
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsxs("div", {
                    children: [/*#__PURE__*/_jsxs("div", {
                      className: "flex items-center gap-2",
                      children: [/*#__PURE__*/_jsx(Badge, {
                        className: getUserTypeColor(activity.userType),
                        children: activity.userType
                      }), /*#__PURE__*/_jsx("span", {
                        className: "font-medium",
                        children: activity.userName
                      })]
                    }), /*#__PURE__*/_jsx("div", {
                      className: "text-sm text-gray-500",
                      children: activity.userEmail
                    }), /*#__PURE__*/_jsxs("div", {
                      className: "text-xs text-gray-400",
                      children: ["ID: ", activity.userId]
                    })]
                  })
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsxs("div", {
                    className: "flex items-center gap-2",
                    children: [getActionIcon(activity.action), /*#__PURE__*/_jsxs("div", {
                      children: [/*#__PURE__*/_jsx("div", {
                        className: "font-medium",
                        children: activity.action.replace('_', ' ')
                      }), /*#__PURE__*/_jsx("div", {
                        className: "text-sm text-gray-500 max-w-xs",
                        children: activity.description
                      })]
                    })]
                  })
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsx("div", {
                    className: "text-sm",
                    children: activity.module.replace('_', ' ')
                  })
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsxs("div", {
                    children: [/*#__PURE__*/_jsx("div", {
                      className: "text-sm",
                      children: activity.ipAddress
                    }), /*#__PURE__*/_jsx("div", {
                      className: "text-xs text-gray-500",
                      children: activity.userAgent
                    })]
                  })
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsx(Badge, {
                    className: getSeverityColor(activity.severity),
                    children: activity.severity
                  })
                }), /*#__PURE__*/_jsx(TableCell, {
                  className: "text-right",
                  children: /*#__PURE__*/_jsxs(DropdownMenu, {
                    children: [/*#__PURE__*/_jsx(DropdownMenuTrigger, {
                      asChild: true,
                      children: /*#__PURE__*/_jsx(Button, {
                        variant: "ghost",
                        size: "sm",
                        children: /*#__PURE__*/_jsx(MoreHorizontal, {
                          className: "h-4 w-4"
                        })
                      })
                    }), /*#__PURE__*/_jsxs(DropdownMenuContent, {
                      align: "end",
                      children: [/*#__PURE__*/_jsx(DropdownMenuLabel, {
                        children: "Actions"
                      }), /*#__PURE__*/_jsx(DropdownMenuSeparator, {}), /*#__PURE__*/_jsxs(DropdownMenuItem, {
                        onClick: () => viewActivityDetails(activity),
                        children: [/*#__PURE__*/_jsx(Eye, {
                          className: "mr-2 h-4 w-4"
                        }), "View Details"]
                      })]
                    })]
                  })
                })]
              }, activity.id))
            })]
          })
        })]
      })]
    })]
  });
};
export default AdminRolesActivity;