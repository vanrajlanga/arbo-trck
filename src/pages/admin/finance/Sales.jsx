import { useState } from "react";
import { Search, Filter, Download, TrendingUp, TrendingDown, DollarSign, Users, Calendar, BarChart3, Eye, MoreHorizontal } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock data for sales analytics
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const salesData = [{
  id: "SAL001",
  period: "May 2025",
  totalRevenue: 2450000,
  totalBookings: 1250,
  avgOrderValue: 1960,
  commission: 367500,
  netRevenue: 2082500,
  growth: 15.4,
  topTrek: "Everest Base Camp",
  topVendor: "Mountain Adventures",
  customerAcquisition: 450
}, {
  id: "SAL002",
  period: "April 2025",
  totalRevenue: 2120000,
  totalBookings: 1150,
  avgOrderValue: 1843,
  commission: 318000,
  netRevenue: 1802000,
  growth: 8.2,
  topTrek: "Annapurna Circuit",
  topVendor: "Himalayan Expeditions",
  customerAcquisition: 380
}, {
  id: "SAL003",
  period: "March 2025",
  totalRevenue: 1960000,
  totalBookings: 980,
  avgOrderValue: 2000,
  commission: 294000,
  netRevenue: 1666000,
  growth: -5.3,
  topTrek: "Kilimanjaro Trek",
  topVendor: "Adventure Seekers",
  customerAcquisition: 320
}];
const AdminFinanceSales = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [periodFilter, setPeriodFilter] = useState("all");
  const filteredSales = salesData.filter(sale => {
    const matchesSearch = sale.period.toLowerCase().includes(searchQuery.toLowerCase()) || sale.topTrek.toLowerCase().includes(searchQuery.toLowerCase()) || sale.topVendor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPeriod = periodFilter === "all" || sale.period.includes(periodFilter);
    return matchesSearch && matchesPeriod;
  });
  const getGrowthColor = growth => {
    if (growth > 0) return "text-green-600";
    if (growth < 0) return "text-red-600";
    return "text-gray-600";
  };
  const getGrowthIcon = growth => {
    if (growth > 0) return /*#__PURE__*/_jsx(TrendingUp, {
      className: "h-4 w-4"
    });
    if (growth < 0) return /*#__PURE__*/_jsx(TrendingDown, {
      className: "h-4 w-4"
    });
    return null;
  };
  return /*#__PURE__*/_jsxs("div", {
    children: [/*#__PURE__*/_jsxs("div", {
      className: "flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8",
      children: [/*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx("h1", {
          className: "text-2xl font-bold",
          children: "Sales Analytics"
        }), /*#__PURE__*/_jsx("p", {
          className: "text-gray-500",
          children: "Comprehensive sales reports and revenue analytics"
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
          }), "Generate Report"]
        })]
      })]
    }), /*#__PURE__*/_jsxs("div", {
      className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8",
      children: [/*#__PURE__*/_jsxs(Card, {
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
            children: "\u20B924.5L"
          }), /*#__PURE__*/_jsxs("p", {
            className: "text-xs text-muted-foreground flex items-center",
            children: [/*#__PURE__*/_jsx(TrendingUp, {
              className: "h-3 w-3 mr-1"
            }), "+15.4% from last month"]
          })]
        })]
      }), /*#__PURE__*/_jsxs(Card, {
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
            children: "1,250"
          }), /*#__PURE__*/_jsxs("p", {
            className: "text-xs text-muted-foreground flex items-center",
            children: [/*#__PURE__*/_jsx(TrendingUp, {
              className: "h-3 w-3 mr-1"
            }), "+8.7% from last month"]
          })]
        })]
      }), /*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsxs(CardHeader, {
          className: "flex flex-row items-center justify-between pb-2",
          children: [/*#__PURE__*/_jsx(CardTitle, {
            className: "text-sm font-medium",
            children: "Avg Order Value"
          }), /*#__PURE__*/_jsx(BarChart3, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "\u20B91,960"
          }), /*#__PURE__*/_jsxs("p", {
            className: "text-xs text-muted-foreground flex items-center",
            children: [/*#__PURE__*/_jsx(TrendingUp, {
              className: "h-3 w-3 mr-1"
            }), "+6.3% from last month"]
          })]
        })]
      }), /*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsxs(CardHeader, {
          className: "flex flex-row items-center justify-between pb-2",
          children: [/*#__PURE__*/_jsx(CardTitle, {
            className: "text-sm font-medium",
            children: "New Customers"
          }), /*#__PURE__*/_jsx(Users, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "450"
          }), /*#__PURE__*/_jsxs("p", {
            className: "text-xs text-muted-foreground flex items-center",
            children: [/*#__PURE__*/_jsx(TrendingUp, {
              className: "h-3 w-3 mr-1"
            }), "+18.4% from last month"]
          })]
        })]
      })]
    }), /*#__PURE__*/_jsxs(Card, {
      children: [/*#__PURE__*/_jsxs(CardHeader, {
        children: [/*#__PURE__*/_jsx(CardTitle, {
          children: "Sales Reports"
        }), /*#__PURE__*/_jsx(CardDescription, {
          children: "Monthly and quarterly sales performance analytics"
        })]
      }), /*#__PURE__*/_jsxs(CardContent, {
        children: [/*#__PURE__*/_jsxs("div", {
          className: "flex flex-col lg:flex-row gap-4 mb-6",
          children: [/*#__PURE__*/_jsxs("div", {
            className: "relative flex-1",
            children: [/*#__PURE__*/_jsx(Search, {
              className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4"
            }), /*#__PURE__*/_jsx(Input, {
              placeholder: "Search by period, trek, or vendor...",
              value: searchQuery,
              onChange: e => setSearchQuery(e.target.value),
              className: "pl-10"
            })]
          }), /*#__PURE__*/_jsxs(Select, {
            value: periodFilter,
            onValueChange: setPeriodFilter,
            children: [/*#__PURE__*/_jsx(SelectTrigger, {
              className: "w-40",
              children: /*#__PURE__*/_jsx(SelectValue, {
                placeholder: "Period"
              })
            }), /*#__PURE__*/_jsxs(SelectContent, {
              children: [/*#__PURE__*/_jsx(SelectItem, {
                value: "all",
                children: "All Periods"
              }), /*#__PURE__*/_jsx(SelectItem, {
                value: "2025",
                children: "2025"
              }), /*#__PURE__*/_jsx(SelectItem, {
                value: "2024",
                children: "2024"
              }), /*#__PURE__*/_jsx(SelectItem, {
                value: "May",
                children: "May"
              }), /*#__PURE__*/_jsx(SelectItem, {
                value: "April",
                children: "April"
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
                  children: "Period"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Revenue"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Bookings"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Commission"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Net Revenue"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Growth"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Top Performers"
                }), /*#__PURE__*/_jsx(TableHead, {
                  className: "text-right",
                  children: "Actions"
                })]
              })
            }), /*#__PURE__*/_jsx(TableBody, {
              children: filteredSales.map(sale => /*#__PURE__*/_jsxs(TableRow, {
                children: [/*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsxs("div", {
                    children: [/*#__PURE__*/_jsx("div", {
                      className: "font-medium",
                      children: sale.period
                    }), /*#__PURE__*/_jsxs("div", {
                      className: "text-xs text-gray-400",
                      children: ["ID: ", sale.id]
                    })]
                  })
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsxs("div", {
                    children: [/*#__PURE__*/_jsxs("div", {
                      className: "font-medium",
                      children: ["\u20B9", (sale.totalRevenue / 100000).toFixed(1), "L"]
                    }), /*#__PURE__*/_jsxs("div", {
                      className: "text-xs text-gray-500",
                      children: ["AOV: \u20B9", sale.avgOrderValue.toLocaleString()]
                    })]
                  })
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsxs("div", {
                    children: [/*#__PURE__*/_jsx("div", {
                      className: "font-medium",
                      children: sale.totalBookings.toLocaleString()
                    }), /*#__PURE__*/_jsxs("div", {
                      className: "text-xs text-gray-500",
                      children: ["New customers: ", sale.customerAcquisition]
                    })]
                  })
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsxs("div", {
                    className: "font-medium",
                    children: ["\u20B9", (sale.commission / 100000).toFixed(1), "L"]
                  })
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsxs("div", {
                    className: "font-medium",
                    children: ["\u20B9", (sale.netRevenue / 100000).toFixed(1), "L"]
                  })
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsxs("div", {
                    className: `flex items-center gap-1 font-medium ${getGrowthColor(sale.growth)}`,
                    children: [getGrowthIcon(sale.growth), sale.growth > 0 ? '+' : '', sale.growth, "%"]
                  })
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsxs("div", {
                    children: [/*#__PURE__*/_jsxs("div", {
                      className: "text-sm font-medium",
                      children: ["Trek: ", sale.topTrek]
                    }), /*#__PURE__*/_jsxs("div", {
                      className: "text-xs text-gray-500",
                      children: ["Vendor: ", sale.topVendor]
                    })]
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
                        children: [/*#__PURE__*/_jsx(BarChart3, {
                          className: "mr-2 h-4 w-4"
                        }), "Detailed Analytics"]
                      }), /*#__PURE__*/_jsxs(DropdownMenuItem, {
                        children: [/*#__PURE__*/_jsx(Download, {
                          className: "mr-2 h-4 w-4"
                        }), "Export Data"]
                      })]
                    })]
                  })
                })]
              }, sale.id))
            })]
          })
        })]
      })]
    })]
  });
};
export default AdminFinanceSales;