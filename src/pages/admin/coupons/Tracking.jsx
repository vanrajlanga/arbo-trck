import { useState } from "react";
import { Search, Filter, Download, TrendingUp, TrendingDown, Users, Percent, Calendar, BarChart3, Eye, MoreHorizontal } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock data for coupon usage tracking
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const couponUsageData = [{
  id: "CUP001",
  code: "SAVE20",
  description: "20% off on all treks",
  totalUsage: 245,
  usageLimit: 500,
  discountValue: 20,
  discountType: "percentage",
  totalDiscount: 125000,
  avgOrderValue: 15000,
  conversionRate: 78.5,
  status: "active",
  createdDate: "2025-01-15",
  expiryDate: "2025-06-15",
  topTreks: ["Everest Base Camp", "Annapurna Circuit", "Manaslu Trek"]
}, {
  id: "CUP002",
  code: "FIRST500",
  description: "₹500 off for first-time users",
  totalUsage: 156,
  usageLimit: 1000,
  discountValue: 500,
  discountType: "fixed",
  totalDiscount: 78000,
  avgOrderValue: 12500,
  conversionRate: 85.2,
  status: "active",
  createdDate: "2025-02-01",
  expiryDate: "2025-12-31",
  topTreks: ["Kedarnath Trek", "Valley of Flowers", "Roopkund Trek"]
}, {
  id: "CUP003",
  code: "SUMMER30",
  description: "Summer special 30% discount",
  totalUsage: 89,
  usageLimit: 200,
  discountValue: 30,
  discountType: "percentage",
  totalDiscount: 267000,
  avgOrderValue: 18000,
  conversionRate: 72.1,
  status: "expired",
  createdDate: "2025-03-01",
  expiryDate: "2025-05-31",
  topTreks: ["Ladakh Expedition", "Spiti Valley", "Kashmir Trek"]
}];
const AdminCouponTracking = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [timeFilter, setTimeFilter] = useState("all");
  const filteredCoupons = couponUsageData.filter(coupon => {
    const matchesSearch = coupon.code.toLowerCase().includes(searchQuery.toLowerCase()) || coupon.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || coupon.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  const getStatusColor = status => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "expired":
        return "bg-red-100 text-red-800";
      case "paused":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  const getUsagePercentage = (used, limit) => {
    return (used / limit * 100).toFixed(1);
  };
  return /*#__PURE__*/_jsxs("div", {
    children: [/*#__PURE__*/_jsxs("div", {
      className: "flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8",
      children: [/*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx("h1", {
          className: "text-2xl font-bold",
          children: "Coupon Usage Analytics"
        }), /*#__PURE__*/_jsx("p", {
          className: "text-gray-500",
          children: "Track coupon performance and usage statistics"
        })]
      }), /*#__PURE__*/_jsxs("div", {
        className: "flex gap-2 mt-4 lg:mt-0",
        children: [/*#__PURE__*/_jsxs(Button, {
          variant: "outline",
          children: [/*#__PURE__*/_jsx(Download, {
            className: "mr-2 h-4 w-4"
          }), "Export Report"]
        }), /*#__PURE__*/_jsxs(Button, {
          children: [/*#__PURE__*/_jsx(BarChart3, {
            className: "mr-2 h-4 w-4"
          }), "View Analytics"]
        })]
      })]
    }), /*#__PURE__*/_jsxs("div", {
      className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8",
      children: [/*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsxs(CardHeader, {
          className: "flex flex-row items-center justify-between pb-2",
          children: [/*#__PURE__*/_jsx(CardTitle, {
            className: "text-sm font-medium",
            children: "Total Coupons Used"
          }), /*#__PURE__*/_jsx(Users, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "490"
          }), /*#__PURE__*/_jsxs("p", {
            className: "text-xs text-muted-foreground flex items-center",
            children: [/*#__PURE__*/_jsx(TrendingUp, {
              className: "h-3 w-3 mr-1"
            }), "+12% from last month"]
          })]
        })]
      }), /*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsxs(CardHeader, {
          className: "flex flex-row items-center justify-between pb-2",
          children: [/*#__PURE__*/_jsx(CardTitle, {
            className: "text-sm font-medium",
            children: "Total Discount Given"
          }), /*#__PURE__*/_jsx(Percent, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "\u20B94.7L"
          }), /*#__PURE__*/_jsxs("p", {
            className: "text-xs text-muted-foreground flex items-center",
            children: [/*#__PURE__*/_jsx(TrendingUp, {
              className: "h-3 w-3 mr-1"
            }), "+8% from last month"]
          })]
        })]
      }), /*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsxs(CardHeader, {
          className: "flex flex-row items-center justify-between pb-2",
          children: [/*#__PURE__*/_jsx(CardTitle, {
            className: "text-sm font-medium",
            children: "Avg Conversion Rate"
          }), /*#__PURE__*/_jsx(TrendingUp, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "78.6%"
          }), /*#__PURE__*/_jsxs("p", {
            className: "text-xs text-muted-foreground flex items-center",
            children: [/*#__PURE__*/_jsx(TrendingDown, {
              className: "h-3 w-3 mr-1"
            }), "-2% from last month"]
          })]
        })]
      }), /*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsxs(CardHeader, {
          className: "flex flex-row items-center justify-between pb-2",
          children: [/*#__PURE__*/_jsx(CardTitle, {
            className: "text-sm font-medium",
            children: "Active Coupons"
          }), /*#__PURE__*/_jsx(Calendar, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "12"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-xs text-muted-foreground",
            children: "Currently running"
          })]
        })]
      })]
    }), /*#__PURE__*/_jsxs(Card, {
      children: [/*#__PURE__*/_jsxs(CardHeader, {
        children: [/*#__PURE__*/_jsx(CardTitle, {
          children: "Coupon Performance"
        }), /*#__PURE__*/_jsx(CardDescription, {
          children: "Detailed analytics and usage statistics for all coupons"
        })]
      }), /*#__PURE__*/_jsxs(CardContent, {
        children: [/*#__PURE__*/_jsxs("div", {
          className: "flex flex-col lg:flex-row gap-4 mb-6",
          children: [/*#__PURE__*/_jsxs("div", {
            className: "relative flex-1",
            children: [/*#__PURE__*/_jsx(Search, {
              className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4"
            }), /*#__PURE__*/_jsx(Input, {
              placeholder: "Search by coupon code or description...",
              value: searchQuery,
              onChange: e => setSearchQuery(e.target.value),
              className: "pl-10"
            })]
          }), /*#__PURE__*/_jsxs(Select, {
            value: statusFilter,
            onValueChange: setStatusFilter,
            children: [/*#__PURE__*/_jsx(SelectTrigger, {
              className: "w-40",
              children: /*#__PURE__*/_jsx(SelectValue, {
                placeholder: "Status"
              })
            }), /*#__PURE__*/_jsxs(SelectContent, {
              children: [/*#__PURE__*/_jsx(SelectItem, {
                value: "all",
                children: "All Status"
              }), /*#__PURE__*/_jsx(SelectItem, {
                value: "active",
                children: "Active"
              }), /*#__PURE__*/_jsx(SelectItem, {
                value: "expired",
                children: "Expired"
              }), /*#__PURE__*/_jsx(SelectItem, {
                value: "paused",
                children: "Paused"
              })]
            })]
          }), /*#__PURE__*/_jsxs(Select, {
            value: timeFilter,
            onValueChange: setTimeFilter,
            children: [/*#__PURE__*/_jsx(SelectTrigger, {
              className: "w-40",
              children: /*#__PURE__*/_jsx(SelectValue, {
                placeholder: "Time Period"
              })
            }), /*#__PURE__*/_jsxs(SelectContent, {
              children: [/*#__PURE__*/_jsx(SelectItem, {
                value: "all",
                children: "All Time"
              }), /*#__PURE__*/_jsx(SelectItem, {
                value: "7d",
                children: "Last 7 days"
              }), /*#__PURE__*/_jsx(SelectItem, {
                value: "30d",
                children: "Last 30 days"
              }), /*#__PURE__*/_jsx(SelectItem, {
                value: "90d",
                children: "Last 90 days"
              })]
            })]
          }), /*#__PURE__*/_jsxs(Button, {
            variant: "outline",
            children: [/*#__PURE__*/_jsx(Filter, {
              className: "mr-2 h-4 w-4"
            }), "More Filters"]
          })]
        }), /*#__PURE__*/_jsx("div", {
          className: "overflow-x-auto",
          children: /*#__PURE__*/_jsxs(Table, {
            children: [/*#__PURE__*/_jsx(TableHeader, {
              children: /*#__PURE__*/_jsxs(TableRow, {
                children: [/*#__PURE__*/_jsx(TableHead, {
                  children: "Coupon Details"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Usage Statistics"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Performance Metrics"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Popular Treks"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Status"
                }), /*#__PURE__*/_jsx(TableHead, {
                  className: "text-right",
                  children: "Actions"
                })]
              })
            }), /*#__PURE__*/_jsx(TableBody, {
              children: filteredCoupons.map(coupon => /*#__PURE__*/_jsxs(TableRow, {
                children: [/*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsxs("div", {
                    children: [/*#__PURE__*/_jsx("div", {
                      className: "font-medium text-lg",
                      children: coupon.code
                    }), /*#__PURE__*/_jsx("div", {
                      className: "text-sm text-gray-500 max-w-xs",
                      children: coupon.description
                    }), /*#__PURE__*/_jsx("div", {
                      className: "text-xs text-gray-400 mt-1",
                      children: coupon.discountType === "percentage" ? `${coupon.discountValue}% off` : `₹${coupon.discountValue} off`
                    })]
                  })
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsxs("div", {
                    children: [/*#__PURE__*/_jsxs("div", {
                      className: "font-medium",
                      children: [coupon.totalUsage, " / ", coupon.usageLimit, " uses"]
                    }), /*#__PURE__*/_jsxs("div", {
                      className: "text-sm text-gray-500",
                      children: [getUsagePercentage(coupon.totalUsage, coupon.usageLimit), "% utilized"]
                    }), /*#__PURE__*/_jsx("div", {
                      className: "w-full bg-gray-200 rounded-full h-2 mt-2",
                      children: /*#__PURE__*/_jsx("div", {
                        className: "bg-blue-600 h-2 rounded-full",
                        style: {
                          width: `${getUsagePercentage(coupon.totalUsage, coupon.usageLimit)}%`
                        }
                      })
                    })]
                  })
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsxs("div", {
                    children: [/*#__PURE__*/_jsxs("div", {
                      className: "font-medium text-green-600",
                      children: ["\u20B9", coupon.totalDiscount.toLocaleString(), " saved"]
                    }), /*#__PURE__*/_jsxs("div", {
                      className: "text-sm text-gray-500",
                      children: ["Avg order: \u20B9", coupon.avgOrderValue.toLocaleString()]
                    }), /*#__PURE__*/_jsxs("div", {
                      className: "text-sm text-gray-500",
                      children: ["Conversion: ", coupon.conversionRate, "%"]
                    })]
                  })
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsxs("div", {
                    className: "max-w-xs",
                    children: [coupon.topTreks.slice(0, 2).map((trek, index) => /*#__PURE__*/_jsxs("div", {
                      className: "text-sm text-gray-600",
                      children: ["\u2022 ", trek]
                    }, index)), coupon.topTreks.length > 2 && /*#__PURE__*/_jsxs("div", {
                      className: "text-xs text-gray-400",
                      children: ["+", coupon.topTreks.length - 2, " more"]
                    })]
                  })
                }), /*#__PURE__*/_jsxs(TableCell, {
                  children: [/*#__PURE__*/_jsx(Badge, {
                    className: getStatusColor(coupon.status),
                    children: coupon.status
                  }), /*#__PURE__*/_jsxs("div", {
                    className: "text-xs text-gray-400 mt-1",
                    children: ["Expires: ", coupon.expiryDate]
                  })]
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
                        children: [/*#__PURE__*/_jsx(BarChart3, {
                          className: "mr-2 h-4 w-4"
                        }), "Analytics Report"]
                      }), /*#__PURE__*/_jsxs(DropdownMenuItem, {
                        children: [/*#__PURE__*/_jsx(Download, {
                          className: "mr-2 h-4 w-4"
                        }), "Export Usage Data"]
                      })]
                    })]
                  })
                })]
              }, coupon.id))
            })]
          })
        })]
      })]
    })]
  });
};
export default AdminCouponTracking;