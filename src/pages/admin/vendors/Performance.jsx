import { useState } from "react";
import { Search, TrendingUp, TrendingDown, Star, Users, DollarSign, Target, Activity, Award, AlertTriangle, MoreHorizontal, Eye, Download } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

// Mock data for vendor performance
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const vendorPerformanceData = [{
  id: "VEN001",
  name: "Adventure Trek Co.",
  rating: 4.8,
  totalBookings: 245,
  revenue: 2450000,
  completionRate: 96,
  cancellationRate: 4,
  responseTime: "2.5 hours",
  lastActive: "2025-06-03",
  performanceScore: 92,
  trend: "up",
  category: "mountain",
  location: "Mumbai"
}, {
  id: "VEN002",
  name: "Mountain Explorers",
  rating: 4.6,
  totalBookings: 189,
  revenue: 1890000,
  completionRate: 94,
  cancellationRate: 6,
  responseTime: "3.2 hours",
  lastActive: "2025-06-02",
  performanceScore: 88,
  trend: "up",
  category: "adventure",
  location: "Delhi"
}, {
  id: "VEN003",
  name: "Himalayan Adventures",
  rating: 4.2,
  totalBookings: 156,
  revenue: 1560000,
  completionRate: 89,
  cancellationRate: 11,
  responseTime: "4.8 hours",
  lastActive: "2025-06-01",
  performanceScore: 78,
  trend: "down",
  category: "trekking",
  location: "Dehradun"
}, {
  id: "VEN004",
  name: "Coastal Adventures",
  rating: 4.9,
  totalBookings: 312,
  revenue: 3120000,
  completionRate: 98,
  cancellationRate: 2,
  responseTime: "1.8 hours",
  lastActive: "2025-06-03",
  performanceScore: 96,
  trend: "up",
  category: "beach",
  location: "Goa"
}];
const AdminVendorPerformance = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [performanceFilter, setPerformanceFilter] = useState("all");
  const filteredVendors = vendorPerformanceData.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) || vendor.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || vendor.category === categoryFilter;
    const matchesPerformance = performanceFilter === "all" || performanceFilter === "excellent" && vendor.performanceScore >= 90 || performanceFilter === "good" && vendor.performanceScore >= 80 && vendor.performanceScore < 90 || performanceFilter === "average" && vendor.performanceScore >= 70 && vendor.performanceScore < 80 || performanceFilter === "poor" && vendor.performanceScore < 70;
    return matchesSearch && matchesCategory && matchesPerformance;
  });
  const getPerformanceColor = score => {
    if (score >= 90) return "text-green-600";
    if (score >= 80) return "text-blue-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };
  const getPerformanceBadge = score => {
    if (score >= 90) return /*#__PURE__*/_jsx(Badge, {
      className: "bg-green-100 text-green-800",
      children: "Excellent"
    });
    if (score >= 80) return /*#__PURE__*/_jsx(Badge, {
      className: "bg-blue-100 text-blue-800",
      children: "Good"
    });
    if (score >= 70) return /*#__PURE__*/_jsx(Badge, {
      className: "bg-yellow-100 text-yellow-800",
      children: "Average"
    });
    return /*#__PURE__*/_jsx(Badge, {
      className: "bg-red-100 text-red-800",
      children: "Needs Improvement"
    });
  };
  const getTrendIcon = trend => {
    return trend === "up" ? /*#__PURE__*/_jsx(TrendingUp, {
      className: "h-4 w-4 text-green-600"
    }) : /*#__PURE__*/_jsx(TrendingDown, {
      className: "h-4 w-4 text-red-600"
    });
  };
  const formatCurrency = amount => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };
  return /*#__PURE__*/_jsxs("div", {
    children: [/*#__PURE__*/_jsxs("div", {
      className: "flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8",
      children: [/*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx("h1", {
          className: "text-2xl font-bold",
          children: "Vendor Performance Analytics"
        }), /*#__PURE__*/_jsx("p", {
          className: "text-gray-500",
          children: "Monitor and analyze vendor performance metrics"
        })]
      }), /*#__PURE__*/_jsxs(Button, {
        variant: "outline",
        children: [/*#__PURE__*/_jsx(Download, {
          className: "mr-2 h-4 w-4"
        }), "Export Report"]
      })]
    }), /*#__PURE__*/_jsxs("div", {
      className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8",
      children: [/*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsxs(CardHeader, {
          className: "flex flex-row items-center justify-between pb-2",
          children: [/*#__PURE__*/_jsx(CardTitle, {
            className: "text-sm font-medium",
            children: "Avg Performance Score"
          }), /*#__PURE__*/_jsx(Target, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "88.5"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-xs text-muted-foreground",
            children: "+2.3% from last month"
          })]
        })]
      }), /*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsxs(CardHeader, {
          className: "flex flex-row items-center justify-between pb-2",
          children: [/*#__PURE__*/_jsx(CardTitle, {
            className: "text-sm font-medium",
            children: "Top Performers"
          }), /*#__PURE__*/_jsx(Award, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "8"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-xs text-muted-foreground",
            children: "Score above 90"
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
            children: "\u20B99.02M"
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
            children: "Needs Attention"
          }), /*#__PURE__*/_jsx(AlertTriangle, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "3"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-xs text-muted-foreground",
            children: "Performance below 70"
          })]
        })]
      })]
    }), /*#__PURE__*/_jsxs(Card, {
      children: [/*#__PURE__*/_jsxs(CardHeader, {
        children: [/*#__PURE__*/_jsx(CardTitle, {
          children: "Performance Dashboard"
        }), /*#__PURE__*/_jsx(CardDescription, {
          children: "Comprehensive vendor performance metrics and analytics"
        })]
      }), /*#__PURE__*/_jsxs(CardContent, {
        children: [/*#__PURE__*/_jsxs("div", {
          className: "flex flex-col lg:flex-row gap-4 mb-6",
          children: [/*#__PURE__*/_jsxs("div", {
            className: "relative flex-1",
            children: [/*#__PURE__*/_jsx(Search, {
              className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4"
            }), /*#__PURE__*/_jsx(Input, {
              placeholder: "Search vendors by name or location...",
              value: searchQuery,
              onChange: e => setSearchQuery(e.target.value),
              className: "pl-10"
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "flex flex-wrap gap-2",
            children: [/*#__PURE__*/_jsxs(Select, {
              value: categoryFilter,
              onValueChange: setCategoryFilter,
              children: [/*#__PURE__*/_jsx(SelectTrigger, {
                className: "w-32",
                children: /*#__PURE__*/_jsx(SelectValue, {
                  placeholder: "Category"
                })
              }), /*#__PURE__*/_jsxs(SelectContent, {
                children: [/*#__PURE__*/_jsx(SelectItem, {
                  value: "all",
                  children: "All Categories"
                }), /*#__PURE__*/_jsx(SelectItem, {
                  value: "mountain",
                  children: "Mountain"
                }), /*#__PURE__*/_jsx(SelectItem, {
                  value: "adventure",
                  children: "Adventure"
                }), /*#__PURE__*/_jsx(SelectItem, {
                  value: "trekking",
                  children: "Trekking"
                }), /*#__PURE__*/_jsx(SelectItem, {
                  value: "beach",
                  children: "Beach"
                })]
              })]
            }), /*#__PURE__*/_jsxs(Select, {
              value: performanceFilter,
              onValueChange: setPerformanceFilter,
              children: [/*#__PURE__*/_jsx(SelectTrigger, {
                className: "w-40",
                children: /*#__PURE__*/_jsx(SelectValue, {
                  placeholder: "Performance"
                })
              }), /*#__PURE__*/_jsxs(SelectContent, {
                children: [/*#__PURE__*/_jsx(SelectItem, {
                  value: "all",
                  children: "All Performance"
                }), /*#__PURE__*/_jsx(SelectItem, {
                  value: "excellent",
                  children: "Excellent (90+)"
                }), /*#__PURE__*/_jsx(SelectItem, {
                  value: "good",
                  children: "Good (80-89)"
                }), /*#__PURE__*/_jsx(SelectItem, {
                  value: "average",
                  children: "Average (70-79)"
                }), /*#__PURE__*/_jsx(SelectItem, {
                  value: "poor",
                  children: "Poor (<70)"
                })]
              })]
            })]
          })]
        }), /*#__PURE__*/_jsx("div", {
          className: "overflow-x-auto",
          children: /*#__PURE__*/_jsxs(Table, {
            children: [/*#__PURE__*/_jsx(TableHeader, {
              children: /*#__PURE__*/_jsxs(TableRow, {
                children: [/*#__PURE__*/_jsx(TableHead, {
                  children: "Vendor Details"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Performance Score"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Rating & Bookings"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Revenue"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Completion Rate"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Response Time"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Trend"
                }), /*#__PURE__*/_jsx(TableHead, {
                  className: "text-right",
                  children: "Actions"
                })]
              })
            }), /*#__PURE__*/_jsx(TableBody, {
              children: filteredVendors.map(vendor => /*#__PURE__*/_jsxs(TableRow, {
                children: [/*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsxs("div", {
                    children: [/*#__PURE__*/_jsx("div", {
                      className: "font-medium",
                      children: vendor.name
                    }), /*#__PURE__*/_jsx("div", {
                      className: "text-sm text-gray-500",
                      children: vendor.location
                    }), /*#__PURE__*/_jsx(Badge, {
                      variant: "outline",
                      className: "text-xs mt-1",
                      children: vendor.category
                    })]
                  })
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsxs("div", {
                    className: "space-y-2",
                    children: [/*#__PURE__*/_jsx("div", {
                      className: `text-lg font-bold ${getPerformanceColor(vendor.performanceScore)}`,
                      children: vendor.performanceScore
                    }), getPerformanceBadge(vendor.performanceScore)]
                  })
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsxs("div", {
                    children: [/*#__PURE__*/_jsxs("div", {
                      className: "flex items-center gap-1",
                      children: [/*#__PURE__*/_jsx(Star, {
                        className: "h-4 w-4 text-yellow-500 fill-current"
                      }), /*#__PURE__*/_jsx("span", {
                        className: "font-medium",
                        children: vendor.rating
                      })]
                    }), /*#__PURE__*/_jsxs("div", {
                      className: "text-sm text-gray-500",
                      children: [vendor.totalBookings, " bookings"]
                    })]
                  })
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsx("div", {
                    className: "font-medium",
                    children: formatCurrency(vendor.revenue)
                  })
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsxs("div", {
                    className: "space-y-1",
                    children: [/*#__PURE__*/_jsxs("div", {
                      className: "flex justify-between text-sm",
                      children: [/*#__PURE__*/_jsx("span", {
                        children: "Completion"
                      }), /*#__PURE__*/_jsxs("span", {
                        children: [vendor.completionRate, "%"]
                      })]
                    }), /*#__PURE__*/_jsx(Progress, {
                      value: vendor.completionRate,
                      className: "h-2"
                    }), /*#__PURE__*/_jsxs("div", {
                      className: "text-xs text-gray-500",
                      children: [vendor.cancellationRate, "% cancellation"]
                    })]
                  })
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsx("div", {
                    className: "text-sm",
                    children: vendor.responseTime
                  })
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsx("div", {
                    className: "flex items-center gap-1",
                    children: getTrendIcon(vendor.trend)
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
                        children: [/*#__PURE__*/_jsx(Eye, {
                          className: "mr-2 h-4 w-4"
                        }), "View Details"]
                      }), /*#__PURE__*/_jsxs(DropdownMenuItem, {
                        children: [/*#__PURE__*/_jsx(Activity, {
                          className: "mr-2 h-4 w-4"
                        }), "Performance History"]
                      }), /*#__PURE__*/_jsxs(DropdownMenuItem, {
                        children: [/*#__PURE__*/_jsx(Users, {
                          className: "mr-2 h-4 w-4"
                        }), "Customer Feedback"]
                      }), /*#__PURE__*/_jsx(DropdownMenuSeparator, {}), /*#__PURE__*/_jsx(DropdownMenuItem, {
                        children: "Send Performance Report"
                      })]
                    })]
                  })
                })]
              }, vendor.id))
            })]
          })
        })]
      })]
    }), /*#__PURE__*/_jsxs("div", {
      className: "grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8",
      children: [/*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsx(CardHeader, {
          children: /*#__PURE__*/_jsx(CardTitle, {
            children: "Performance Distribution"
          })
        }), /*#__PURE__*/_jsxs(CardContent, {
          className: "space-y-4",
          children: [/*#__PURE__*/_jsxs("div", {
            className: "flex items-center justify-between",
            children: [/*#__PURE__*/_jsx("span", {
              className: "text-sm",
              children: "Excellent (90+)"
            }), /*#__PURE__*/_jsx("span", {
              className: "font-medium",
              children: "25 vendors"
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "flex items-center justify-between",
            children: [/*#__PURE__*/_jsx("span", {
              className: "text-sm",
              children: "Good (80-89)"
            }), /*#__PURE__*/_jsx("span", {
              className: "font-medium",
              children: "18 vendors"
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "flex items-center justify-between",
            children: [/*#__PURE__*/_jsx("span", {
              className: "text-sm",
              children: "Average (70-79)"
            }), /*#__PURE__*/_jsx("span", {
              className: "font-medium",
              children: "12 vendors"
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "flex items-center justify-between",
            children: [/*#__PURE__*/_jsx("span", {
              className: "text-sm",
              children: "Needs Improvement (<70)"
            }), /*#__PURE__*/_jsx("span", {
              className: "font-medium text-red-600",
              children: "5 vendors"
            })]
          })]
        })]
      }), /*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsx(CardHeader, {
          children: /*#__PURE__*/_jsx(CardTitle, {
            children: "Top Performers"
          })
        }), /*#__PURE__*/_jsxs(CardContent, {
          className: "space-y-4",
          children: [/*#__PURE__*/_jsxs("div", {
            className: "flex items-center justify-between",
            children: [/*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx("p", {
                className: "font-medium",
                children: "Coastal Adventures"
              }), /*#__PURE__*/_jsx("p", {
                className: "text-sm text-gray-500",
                children: "Score: 96"
              })]
            }), /*#__PURE__*/_jsx(Badge, {
              className: "bg-green-100 text-green-800",
              children: "Top Performer"
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "flex items-center justify-between",
            children: [/*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx("p", {
                className: "font-medium",
                children: "Adventure Trek Co."
              }), /*#__PURE__*/_jsx("p", {
                className: "text-sm text-gray-500",
                children: "Score: 92"
              })]
            }), /*#__PURE__*/_jsx(Badge, {
              className: "bg-green-100 text-green-800",
              children: "Top Performer"
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "flex items-center justify-between",
            children: [/*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx("p", {
                className: "font-medium",
                children: "Mountain Explorers"
              }), /*#__PURE__*/_jsx("p", {
                className: "text-sm text-gray-500",
                children: "Score: 88"
              })]
            }), /*#__PURE__*/_jsx(Badge, {
              className: "bg-blue-100 text-blue-800",
              children: "High Performer"
            })]
          })]
        })]
      })]
    })]
  });
};
export default AdminVendorPerformance;