import { useState } from "react";
import { Link } from "react-router-dom";
import { Users, Map, Calendar, BarChart, ArrowUp, ArrowDown, DollarSign } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock data
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const vendorsData = [{
  id: 1,
  name: "Mountain Explorers",
  joinDate: "Jan 15, 2025",
  treks: 5,
  revenue: "₹145,000",
  status: "Active"
}, {
  id: 2,
  name: "Adventure Beyond",
  joinDate: "Feb 3, 2025",
  treks: 3,
  revenue: "₹87,500",
  status: "Active"
}, {
  id: 3,
  name: "Trails & Peaks",
  joinDate: "Mar 10, 2025",
  treks: 2,
  revenue: "₹62,000",
  status: "Pending"
}, {
  id: 4,
  name: "Himalayan Journeys",
  joinDate: "Mar 22, 2025",
  treks: 0,
  revenue: "₹0",
  status: "Under Review"
}];
const treksData = [{
  id: 1,
  name: "Dandeli Adventure Trek",
  vendor: "Mountain Explorers",
  bookings: 42,
  revenue: "₹126,000",
  rating: 4.8
}, {
  id: 2,
  name: "Gokarna Beach Trek",
  vendor: "Adventure Beyond",
  bookings: 35,
  revenue: "₹105,000",
  rating: 4.5
}, {
  id: 3,
  name: "Vibhuti Waterfalls Trek",
  vendor: "Mountain Explorers",
  bookings: 19,
  revenue: "₹38,000",
  rating: 4.7
}, {
  id: 4,
  name: "Kudremukh Peak Trek",
  vendor: "Trails & Peaks",
  bookings: 28,
  revenue: "₹78,400",
  rating: 4.6
}];
const bookingsData = [{
  id: "TBR5678",
  customer: "Rahul Sharma",
  trek: "Dandeli Adventure Trek",
  vendor: "Mountain Explorers",
  date: "May 25, 2025",
  amount: "₹6,000",
  status: "Confirmed"
}, {
  id: "TBR5679",
  customer: "Priya Patel",
  trek: "Gokarna Beach Trek",
  vendor: "Adventure Beyond",
  date: "Jun 10, 2025",
  amount: "₹9,000",
  status: "Confirmed"
}, {
  id: "TBR5680",
  customer: "Ankit Gupta",
  trek: "Vibhuti Waterfalls Trek",
  vendor: "Mountain Explorers",
  date: "Jun 18, 2025",
  amount: "₹3,000",
  status: "Pending"
}, {
  id: "TBR5681",
  customer: "Neha Singh",
  trek: "Kudremukh Peak Trek",
  vendor: "Trails & Peaks",
  date: "Jul 05, 2025",
  amount: "₹5,600",
  status: "Refund Requested"
}];
const AdminDashboard = () => {
  const [timeframe, setTimeframe] = useState("month");
  return /*#__PURE__*/_jsxs("div", {
    children: [/*#__PURE__*/_jsxs("div", {
      className: "flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8",
      children: [/*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx("h1", {
          className: "text-2xl font-bold",
          children: "Admin Dashboard"
        }), /*#__PURE__*/_jsx("p", {
          className: "text-gray-500",
          children: "Welcome back, Admin. Here's what's happening."
        })]
      }), /*#__PURE__*/_jsx("div", {
        className: "mt-4 lg:mt-0",
        children: /*#__PURE__*/_jsxs(Select, {
          value: timeframe,
          onValueChange: setTimeframe,
          children: [/*#__PURE__*/_jsx(SelectTrigger, {
            className: "w-[180px]",
            children: /*#__PURE__*/_jsx(SelectValue, {
              placeholder: "Select timeframe"
            })
          }), /*#__PURE__*/_jsxs(SelectContent, {
            children: [/*#__PURE__*/_jsx(SelectItem, {
              value: "week",
              children: "Last 7 days"
            }), /*#__PURE__*/_jsx(SelectItem, {
              value: "month",
              children: "Last 30 days"
            }), /*#__PURE__*/_jsx(SelectItem, {
              value: "quarter",
              children: "Last 90 days"
            }), /*#__PURE__*/_jsx(SelectItem, {
              value: "year",
              children: "Last 12 months"
            })]
          })]
        })
      })]
    }), /*#__PURE__*/_jsxs("div", {
      className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8",
      children: [/*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsxs(CardHeader, {
          className: "flex flex-row items-center justify-between pb-2",
          children: [/*#__PURE__*/_jsx(CardTitle, {
            className: "text-sm font-medium",
            children: "Total Bookings"
          }), /*#__PURE__*/_jsx(Calendar, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "124"
          }), /*#__PURE__*/_jsxs("div", {
            className: "flex items-center pt-1 text-sm",
            children: [/*#__PURE__*/_jsx(ArrowUp, {
              className: "mr-1 h-4 w-4 text-green-600"
            }), /*#__PURE__*/_jsx("span", {
              className: "text-green-600 mr-2",
              children: "12%"
            }), /*#__PURE__*/_jsxs("span", {
              className: "text-muted-foreground",
              children: ["from last ", timeframe]
            })]
          })]
        })]
      }), /*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsxs(CardHeader, {
          className: "flex flex-row items-center justify-between pb-2",
          children: [/*#__PURE__*/_jsx(CardTitle, {
            className: "text-sm font-medium",
            children: "Total Revenue"
          }), /*#__PURE__*/_jsx(DollarSign, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "\u20B9347,500"
          }), /*#__PURE__*/_jsxs("div", {
            className: "flex items-center pt-1 text-sm",
            children: [/*#__PURE__*/_jsx(ArrowUp, {
              className: "mr-1 h-4 w-4 text-green-600"
            }), /*#__PURE__*/_jsx("span", {
              className: "text-green-600 mr-2",
              children: "18%"
            }), /*#__PURE__*/_jsxs("span", {
              className: "text-muted-foreground",
              children: ["from last ", timeframe]
            })]
          })]
        })]
      }), /*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsxs(CardHeader, {
          className: "flex flex-row items-center justify-between pb-2",
          children: [/*#__PURE__*/_jsx(CardTitle, {
            className: "text-sm font-medium",
            children: "Active Vendors"
          }), /*#__PURE__*/_jsx(Users, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "13"
          }), /*#__PURE__*/_jsxs("div", {
            className: "flex items-center pt-1 text-sm",
            children: [/*#__PURE__*/_jsx(ArrowUp, {
              className: "mr-1 h-4 w-4 text-green-600"
            }), /*#__PURE__*/_jsx("span", {
              className: "text-green-600 mr-2",
              children: "4"
            }), /*#__PURE__*/_jsxs("span", {
              className: "text-muted-foreground",
              children: ["new this ", timeframe]
            })]
          })]
        })]
      }), /*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsxs(CardHeader, {
          className: "flex flex-row items-center justify-between pb-2",
          children: [/*#__PURE__*/_jsx(CardTitle, {
            className: "text-sm font-medium",
            children: "Active Treks"
          }), /*#__PURE__*/_jsx(Map, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "28"
          }), /*#__PURE__*/_jsxs("div", {
            className: "flex items-center pt-1 text-sm",
            children: [/*#__PURE__*/_jsx(ArrowDown, {
              className: "mr-1 h-4 w-4 text-red-600"
            }), /*#__PURE__*/_jsx("span", {
              className: "text-red-600 mr-2",
              children: "2"
            }), /*#__PURE__*/_jsxs("span", {
              className: "text-muted-foreground",
              children: ["from last ", timeframe]
            })]
          })]
        })]
      })]
    }), /*#__PURE__*/_jsxs("div", {
      className: "grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6",
      children: [/*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsxs(CardHeader, {
          children: [/*#__PURE__*/_jsx(CardTitle, {
            children: "Popular Treks"
          }), /*#__PURE__*/_jsx(CardDescription, {
            children: "Top performing treks by bookings and revenue"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsxs(Table, {
            children: [/*#__PURE__*/_jsx(TableHeader, {
              children: /*#__PURE__*/_jsxs(TableRow, {
                children: [/*#__PURE__*/_jsx(TableHead, {
                  children: "Trek Name"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Bookings"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Revenue"
                }), /*#__PURE__*/_jsx(TableHead, {
                  className: "text-right",
                  children: "Rating"
                })]
              })
            }), /*#__PURE__*/_jsx(TableBody, {
              children: treksData.map(trek => /*#__PURE__*/_jsxs(TableRow, {
                children: [/*#__PURE__*/_jsx(TableCell, {
                  className: "font-medium",
                  children: trek.name
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: trek.bookings
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: trek.revenue
                }), /*#__PURE__*/_jsx(TableCell, {
                  className: "text-right",
                  children: /*#__PURE__*/_jsxs("div", {
                    className: "flex items-center justify-end",
                    children: [/*#__PURE__*/_jsx("span", {
                      className: "font-medium",
                      children: trek.rating
                    }), /*#__PURE__*/_jsx("span", {
                      className: "text-yellow-500 ml-1",
                      children: "\u2605"
                    })]
                  })
                })]
              }, trek.id))
            })]
          }), /*#__PURE__*/_jsx("div", {
            className: "mt-4 text-center",
            children: /*#__PURE__*/_jsx(Link, {
              to: "/admin/treks",
              className: "text-sm text-blue-600 hover:underline",
              children: "View all treks"
            })
          })]
        })]
      }), /*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsxs(CardHeader, {
          children: [/*#__PURE__*/_jsx(CardTitle, {
            children: "Recent Bookings"
          }), /*#__PURE__*/_jsx(CardDescription, {
            children: "Latest bookings across all vendors"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsxs(Table, {
            children: [/*#__PURE__*/_jsx(TableHeader, {
              children: /*#__PURE__*/_jsxs(TableRow, {
                children: [/*#__PURE__*/_jsx(TableHead, {
                  children: "ID"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Customer"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Amount"
                }), /*#__PURE__*/_jsx(TableHead, {
                  className: "text-right",
                  children: "Status"
                })]
              })
            }), /*#__PURE__*/_jsx(TableBody, {
              children: bookingsData.map(booking => /*#__PURE__*/_jsxs(TableRow, {
                children: [/*#__PURE__*/_jsx(TableCell, {
                  className: "font-medium",
                  children: booking.id
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: booking.customer
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: booking.amount
                }), /*#__PURE__*/_jsx(TableCell, {
                  className: "text-right",
                  children: /*#__PURE__*/_jsx("span", {
                    className: `inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${booking.status === "Confirmed" ? "bg-green-100 text-green-800" : booking.status === "Pending" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}`,
                    children: booking.status
                  })
                })]
              }, booking.id))
            })]
          }), /*#__PURE__*/_jsx("div", {
            className: "mt-4 text-center",
            children: /*#__PURE__*/_jsx(Link, {
              to: "/admin/bookings",
              className: "text-sm text-blue-600 hover:underline",
              children: "View all bookings"
            })
          })]
        })]
      })]
    }), /*#__PURE__*/_jsxs(Card, {
      className: "mb-6",
      children: [/*#__PURE__*/_jsxs(CardHeader, {
        children: [/*#__PURE__*/_jsx(CardTitle, {
          children: "Recent Vendors"
        }), /*#__PURE__*/_jsx(CardDescription, {
          children: "Recently joined or updated vendor accounts"
        })]
      }), /*#__PURE__*/_jsxs(CardContent, {
        children: [/*#__PURE__*/_jsxs(Table, {
          children: [/*#__PURE__*/_jsx(TableHeader, {
            children: /*#__PURE__*/_jsxs(TableRow, {
              children: [/*#__PURE__*/_jsx(TableHead, {
                children: "Vendor Name"
              }), /*#__PURE__*/_jsx(TableHead, {
                children: "Join Date"
              }), /*#__PURE__*/_jsx(TableHead, {
                children: "Trek Count"
              }), /*#__PURE__*/_jsx(TableHead, {
                children: "Total Revenue"
              }), /*#__PURE__*/_jsx(TableHead, {
                children: "Status"
              }), /*#__PURE__*/_jsx(TableHead, {
                className: "text-right",
                children: "Actions"
              })]
            })
          }), /*#__PURE__*/_jsx(TableBody, {
            children: vendorsData.map(vendor => /*#__PURE__*/_jsxs(TableRow, {
              children: [/*#__PURE__*/_jsx(TableCell, {
                className: "font-medium",
                children: vendor.name
              }), /*#__PURE__*/_jsx(TableCell, {
                children: vendor.joinDate
              }), /*#__PURE__*/_jsx(TableCell, {
                children: vendor.treks
              }), /*#__PURE__*/_jsx(TableCell, {
                children: vendor.revenue
              }), /*#__PURE__*/_jsx(TableCell, {
                children: /*#__PURE__*/_jsx("span", {
                  className: `inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${vendor.status === "Active" ? "bg-green-100 text-green-800" : vendor.status === "Pending" ? "bg-yellow-100 text-yellow-800" : "bg-blue-100 text-blue-800"}`,
                  children: vendor.status
                })
              }), /*#__PURE__*/_jsx(TableCell, {
                className: "text-right",
                children: /*#__PURE__*/_jsx(Button, {
                  variant: "ghost",
                  size: "sm",
                  children: "View Details"
                })
              })]
            }, vendor.id))
          })]
        }), /*#__PURE__*/_jsx("div", {
          className: "mt-4 text-center",
          children: /*#__PURE__*/_jsx(Link, {
            to: "/admin/vendors",
            className: "text-sm text-blue-600 hover:underline",
            children: "View all vendors"
          })
        })]
      })]
    }), /*#__PURE__*/_jsxs("div", {
      className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
      children: [/*#__PURE__*/_jsxs(Card, {
        className: "lg:col-span-2",
        children: [/*#__PURE__*/_jsxs(CardHeader, {
          children: [/*#__PURE__*/_jsx(CardTitle, {
            children: "Monthly Revenue"
          }), /*#__PURE__*/_jsx(CardDescription, {
            children: "Revenue trends over the past 6 months"
          })]
        }), /*#__PURE__*/_jsx(CardContent, {
          children: /*#__PURE__*/_jsx("div", {
            className: "h-[300px] flex items-center justify-center bg-slate-50 rounded-md",
            children: /*#__PURE__*/_jsx(BarChart, {
              className: "h-16 w-16 text-slate-300"
            })
          })
        })]
      }), /*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsxs(CardHeader, {
          children: [/*#__PURE__*/_jsx(CardTitle, {
            children: "Vendor Applications"
          }), /*#__PURE__*/_jsx(CardDescription, {
            children: "New vendors awaiting approval"
          })]
        }), /*#__PURE__*/_jsx(CardContent, {
          children: /*#__PURE__*/_jsxs("div", {
            className: "space-y-4",
            children: [/*#__PURE__*/_jsxs("div", {
              className: "p-3 rounded-md bg-slate-50",
              children: [/*#__PURE__*/_jsxs("div", {
                className: "flex justify-between items-start",
                children: [/*#__PURE__*/_jsxs("div", {
                  children: [/*#__PURE__*/_jsx("h4", {
                    className: "font-medium",
                    children: "Summit Seekers"
                  }), /*#__PURE__*/_jsx("p", {
                    className: "text-xs text-gray-500",
                    children: "Applied 2 days ago"
                  })]
                }), /*#__PURE__*/_jsx("span", {
                  className: "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-800",
                  children: "New"
                })]
              }), /*#__PURE__*/_jsxs("div", {
                className: "flex justify-between mt-3",
                children: [/*#__PURE__*/_jsx(Button, {
                  variant: "outline",
                  size: "sm",
                  children: "View"
                }), /*#__PURE__*/_jsxs("div", {
                  className: "space-x-2",
                  children: [/*#__PURE__*/_jsx(Button, {
                    variant: "destructive",
                    size: "sm",
                    children: "Reject"
                  }), /*#__PURE__*/_jsx(Button, {
                    variant: "default",
                    size: "sm",
                    children: "Approve"
                  })]
                })]
              })]
            }), /*#__PURE__*/_jsxs("div", {
              className: "p-3 rounded-md bg-slate-50",
              children: [/*#__PURE__*/_jsxs("div", {
                className: "flex justify-between items-start",
                children: [/*#__PURE__*/_jsxs("div", {
                  children: [/*#__PURE__*/_jsx("h4", {
                    className: "font-medium",
                    children: "Wild Wanderers"
                  }), /*#__PURE__*/_jsx("p", {
                    className: "text-xs text-gray-500",
                    children: "Applied 3 days ago"
                  })]
                }), /*#__PURE__*/_jsx("span", {
                  className: "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-800",
                  children: "New"
                })]
              }), /*#__PURE__*/_jsxs("div", {
                className: "flex justify-between mt-3",
                children: [/*#__PURE__*/_jsx(Button, {
                  variant: "outline",
                  size: "sm",
                  children: "View"
                }), /*#__PURE__*/_jsxs("div", {
                  className: "space-x-2",
                  children: [/*#__PURE__*/_jsx(Button, {
                    variant: "destructive",
                    size: "sm",
                    children: "Reject"
                  }), /*#__PURE__*/_jsx(Button, {
                    variant: "default",
                    size: "sm",
                    children: "Approve"
                  })]
                })]
              })]
            }), /*#__PURE__*/_jsxs("div", {
              className: "p-3 rounded-md bg-slate-50",
              children: [/*#__PURE__*/_jsxs("div", {
                className: "flex justify-between items-start",
                children: [/*#__PURE__*/_jsxs("div", {
                  children: [/*#__PURE__*/_jsx("h4", {
                    className: "font-medium",
                    children: "Peak Pioneers"
                  }), /*#__PURE__*/_jsx("p", {
                    className: "text-xs text-gray-500",
                    children: "Applied 5 days ago"
                  })]
                }), /*#__PURE__*/_jsx("span", {
                  className: "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800",
                  children: "In Review"
                })]
              }), /*#__PURE__*/_jsxs("div", {
                className: "flex justify-between mt-3",
                children: [/*#__PURE__*/_jsx(Button, {
                  variant: "outline",
                  size: "sm",
                  children: "View"
                }), /*#__PURE__*/_jsxs("div", {
                  className: "space-x-2",
                  children: [/*#__PURE__*/_jsx(Button, {
                    variant: "destructive",
                    size: "sm",
                    children: "Reject"
                  }), /*#__PURE__*/_jsx(Button, {
                    variant: "default",
                    size: "sm",
                    children: "Approve"
                  })]
                })]
              })]
            }), /*#__PURE__*/_jsx("div", {
              className: "mt-4 text-center",
              children: /*#__PURE__*/_jsx(Link, {
                to: "/admin/vendors/applications",
                className: "text-sm text-blue-600 hover:underline",
                children: "View all applications"
              })
            })]
          })
        })]
      })]
    })]
  });
};
export default AdminDashboard;