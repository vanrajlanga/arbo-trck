import { useState } from "react";
import { Link } from "react-router-dom";
import { Users, Search, Filter, MoreHorizontal, Shield, ShieldOff, Eye, Mail, Phone } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

// Mock data
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const usersData = [{
  id: "USR001",
  name: "Rahul Sharma",
  email: "rahul@email.com",
  phone: "+91 9876543210",
  joinDate: "2025-01-15",
  totalBookings: 5,
  totalSpent: "₹45,000",
  status: "Active",
  lastLogin: "2025-06-01"
}, {
  id: "USR002",
  name: "Priya Patel",
  email: "priya@email.com",
  phone: "+91 8765432109",
  joinDate: "2025-02-20",
  totalBookings: 3,
  totalSpent: "₹27,000",
  status: "Active",
  lastLogin: "2025-05-30"
}, {
  id: "USR003",
  name: "Ankit Gupta",
  email: "ankit@email.com",
  phone: "+91 7654321098",
  joinDate: "2025-03-10",
  totalBookings: 1,
  totalSpent: "₹8,500",
  status: "Blocked",
  lastLogin: "2025-05-25"
}, {
  id: "USR004",
  name: "Neha Singh",
  email: "neha@email.com",
  phone: "+91 6543210987",
  joinDate: "2025-04-05",
  totalBookings: 7,
  totalSpent: "₹68,500",
  status: "Active",
  lastLogin: "2025-06-02"
}];
const AdminUsers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const filteredUsers = usersData.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) || user.email.toLowerCase().includes(searchQuery.toLowerCase()) || user.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || user.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });
  return /*#__PURE__*/_jsxs("div", {
    children: [/*#__PURE__*/_jsxs("div", {
      className: "flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8",
      children: [/*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx("h1", {
          className: "text-2xl font-bold",
          children: "User Management"
        }), /*#__PURE__*/_jsx("p", {
          className: "text-gray-500",
          children: "Manage all users, their activity and support tickets"
        })]
      }), /*#__PURE__*/_jsxs("div", {
        className: "mt-4 lg:mt-0 flex flex-col sm:flex-row gap-4",
        children: [/*#__PURE__*/_jsx(Link, {
          to: "/admin/users/tickets",
          className: "inline-flex",
          children: /*#__PURE__*/_jsxs(Button, {
            variant: "outline",
            children: [/*#__PURE__*/_jsx(Mail, {
              className: "mr-2 h-4 w-4"
            }), "Support Tickets"]
          })
        }), /*#__PURE__*/_jsx(Link, {
          to: "/admin/users/emergency",
          className: "inline-flex",
          children: /*#__PURE__*/_jsxs(Button, {
            variant: "outline",
            children: [/*#__PURE__*/_jsx(Phone, {
              className: "mr-2 h-4 w-4"
            }), "Emergency Contacts"]
          })
        })]
      })]
    }), /*#__PURE__*/_jsxs("div", {
      className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8",
      children: [/*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsxs(CardHeader, {
          className: "flex flex-row items-center justify-between pb-2",
          children: [/*#__PURE__*/_jsx(CardTitle, {
            className: "text-sm font-medium",
            children: "Total Users"
          }), /*#__PURE__*/_jsx(Users, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "1,247"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-xs text-muted-foreground",
            children: "+12% from last month"
          })]
        })]
      }), /*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsxs(CardHeader, {
          className: "flex flex-row items-center justify-between pb-2",
          children: [/*#__PURE__*/_jsx(CardTitle, {
            className: "text-sm font-medium",
            children: "Active Users"
          }), /*#__PURE__*/_jsx(Shield, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "1,189"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-xs text-muted-foreground",
            children: "95.3% of total users"
          })]
        })]
      }), /*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsxs(CardHeader, {
          className: "flex flex-row items-center justify-between pb-2",
          children: [/*#__PURE__*/_jsx(CardTitle, {
            className: "text-sm font-medium",
            children: "New Signups"
          }), /*#__PURE__*/_jsx(Users, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "89"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-xs text-muted-foreground",
            children: "This month"
          })]
        })]
      }), /*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsxs(CardHeader, {
          className: "flex flex-row items-center justify-between pb-2",
          children: [/*#__PURE__*/_jsx(CardTitle, {
            className: "text-sm font-medium",
            children: "Support Tickets"
          }), /*#__PURE__*/_jsx(Mail, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "23"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-xs text-muted-foreground",
            children: "5 pending review"
          })]
        })]
      })]
    }), /*#__PURE__*/_jsxs(Card, {
      className: "mb-6",
      children: [/*#__PURE__*/_jsxs(CardHeader, {
        children: [/*#__PURE__*/_jsx(CardTitle, {
          children: "Users List"
        }), /*#__PURE__*/_jsx(CardDescription, {
          children: "Manage all registered users and their account status"
        })]
      }), /*#__PURE__*/_jsxs(CardContent, {
        children: [/*#__PURE__*/_jsxs("div", {
          className: "flex flex-col sm:flex-row gap-4 mb-6",
          children: [/*#__PURE__*/_jsxs("div", {
            className: "relative flex-1",
            children: [/*#__PURE__*/_jsx(Search, {
              className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4"
            }), /*#__PURE__*/_jsx(Input, {
              placeholder: "Search users by name, email, or ID...",
              value: searchQuery,
              onChange: e => setSearchQuery(e.target.value),
              className: "pl-10"
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "flex gap-2",
            children: [/*#__PURE__*/_jsxs("select", {
              value: statusFilter,
              onChange: e => setStatusFilter(e.target.value),
              className: "px-3 py-2 border border-gray-300 rounded-md text-sm",
              children: [/*#__PURE__*/_jsx("option", {
                value: "all",
                children: "All Status"
              }), /*#__PURE__*/_jsx("option", {
                value: "active",
                children: "Active"
              }), /*#__PURE__*/_jsx("option", {
                value: "blocked",
                children: "Blocked"
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
                children: "User"
              }), /*#__PURE__*/_jsx(TableHead, {
                children: "Contact"
              }), /*#__PURE__*/_jsx(TableHead, {
                children: "Join Date"
              }), /*#__PURE__*/_jsx(TableHead, {
                children: "Bookings"
              }), /*#__PURE__*/_jsx(TableHead, {
                children: "Total Spent"
              }), /*#__PURE__*/_jsx(TableHead, {
                children: "Status"
              }), /*#__PURE__*/_jsx(TableHead, {
                children: "Last Login"
              }), /*#__PURE__*/_jsx(TableHead, {
                className: "text-right",
                children: "Actions"
              })]
            })
          }), /*#__PURE__*/_jsx(TableBody, {
            children: filteredUsers.map(user => /*#__PURE__*/_jsxs(TableRow, {
              children: [/*#__PURE__*/_jsx(TableCell, {
                children: /*#__PURE__*/_jsxs("div", {
                  children: [/*#__PURE__*/_jsx("div", {
                    className: "font-medium",
                    children: user.name
                  }), /*#__PURE__*/_jsx("div", {
                    className: "text-sm text-gray-500",
                    children: user.id
                  })]
                })
              }), /*#__PURE__*/_jsx(TableCell, {
                children: /*#__PURE__*/_jsxs("div", {
                  children: [/*#__PURE__*/_jsx("div", {
                    className: "text-sm",
                    children: user.email
                  }), /*#__PURE__*/_jsx("div", {
                    className: "text-sm text-gray-500",
                    children: user.phone
                  })]
                })
              }), /*#__PURE__*/_jsx(TableCell, {
                children: user.joinDate
              }), /*#__PURE__*/_jsx(TableCell, {
                children: user.totalBookings
              }), /*#__PURE__*/_jsx(TableCell, {
                children: user.totalSpent
              }), /*#__PURE__*/_jsx(TableCell, {
                children: /*#__PURE__*/_jsx(Badge, {
                  variant: user.status === "Active" ? "default" : "destructive",
                  children: user.status
                })
              }), /*#__PURE__*/_jsx(TableCell, {
                children: user.lastLogin
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
                      children: [/*#__PURE__*/_jsx(Eye, {
                        className: "mr-2 h-4 w-4"
                      }), "View Details"]
                    }), /*#__PURE__*/_jsxs(DropdownMenuItem, {
                      children: [/*#__PURE__*/_jsx(Mail, {
                        className: "mr-2 h-4 w-4"
                      }), "View Bookings"]
                    }), /*#__PURE__*/_jsx(DropdownMenuSeparator, {}), user.status === "Active" ? /*#__PURE__*/_jsxs(DropdownMenuItem, {
                      className: "text-red-600",
                      children: [/*#__PURE__*/_jsx(ShieldOff, {
                        className: "mr-2 h-4 w-4"
                      }), "Block User"]
                    }) : /*#__PURE__*/_jsxs(DropdownMenuItem, {
                      className: "text-green-600",
                      children: [/*#__PURE__*/_jsx(Shield, {
                        className: "mr-2 h-4 w-4"
                      }), "Activate User"]
                    })]
                  })]
                })
              })]
            }, user.id))
          })]
        })]
      })]
    }), /*#__PURE__*/_jsxs("div", {
      className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
      children: [/*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsx(CardHeader, {
          children: /*#__PURE__*/_jsx(CardTitle, {
            children: "Quick Actions"
          })
        }), /*#__PURE__*/_jsxs(CardContent, {
          className: "space-y-3",
          children: [/*#__PURE__*/_jsx(Link, {
            to: "/admin/users/activity",
            children: /*#__PURE__*/_jsxs(Button, {
              variant: "outline",
              className: "w-full justify-start",
              children: [/*#__PURE__*/_jsx(Eye, {
                className: "mr-2 h-4 w-4"
              }), "View User Activity"]
            })
          }), /*#__PURE__*/_jsx(Link, {
            to: "/admin/users/tickets",
            children: /*#__PURE__*/_jsxs(Button, {
              variant: "outline",
              className: "w-full justify-start",
              children: [/*#__PURE__*/_jsx(Mail, {
                className: "mr-2 h-4 w-4"
              }), "Support Tickets"]
            })
          }), /*#__PURE__*/_jsx(Link, {
            to: "/admin/users/emergency",
            children: /*#__PURE__*/_jsxs(Button, {
              variant: "outline",
              className: "w-full justify-start",
              children: [/*#__PURE__*/_jsx(Phone, {
                className: "mr-2 h-4 w-4"
              }), "Emergency Contacts"]
            })
          })]
        })]
      }), /*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsx(CardHeader, {
          children: /*#__PURE__*/_jsx(CardTitle, {
            children: "Recent Signups"
          })
        }), /*#__PURE__*/_jsx(CardContent, {
          children: /*#__PURE__*/_jsx("div", {
            className: "space-y-3",
            children: usersData.slice(0, 3).map(user => /*#__PURE__*/_jsxs("div", {
              className: "flex items-center justify-between",
              children: [/*#__PURE__*/_jsxs("div", {
                children: [/*#__PURE__*/_jsx("div", {
                  className: "font-medium text-sm",
                  children: user.name
                }), /*#__PURE__*/_jsx("div", {
                  className: "text-xs text-gray-500",
                  children: user.joinDate
                })]
              }), /*#__PURE__*/_jsx(Badge, {
                variant: "outline",
                children: "New"
              })]
            }, user.id))
          })
        })]
      }), /*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsx(CardHeader, {
          children: /*#__PURE__*/_jsx(CardTitle, {
            children: "Top Spenders"
          })
        }), /*#__PURE__*/_jsx(CardContent, {
          children: /*#__PURE__*/_jsx("div", {
            className: "space-y-3",
            children: usersData.sort((a, b) => parseInt(b.totalSpent.replace(/[^\d]/g, '')) - parseInt(a.totalSpent.replace(/[^\d]/g, ''))).slice(0, 3).map(user => /*#__PURE__*/_jsxs("div", {
              className: "flex items-center justify-between",
              children: [/*#__PURE__*/_jsxs("div", {
                children: [/*#__PURE__*/_jsx("div", {
                  className: "font-medium text-sm",
                  children: user.name
                }), /*#__PURE__*/_jsxs("div", {
                  className: "text-xs text-gray-500",
                  children: [user.totalBookings, " bookings"]
                })]
              }), /*#__PURE__*/_jsx("div", {
                className: "text-sm font-medium",
                children: user.totalSpent
              })]
            }, user.id))
          })
        })]
      })]
    })]
  });
};
export default AdminUsers;