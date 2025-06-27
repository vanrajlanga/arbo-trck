import { useState } from "react";
import { Calendar, DollarSign, TrendingUp, Users, Map } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart as RechartPieChart, Pie, Cell } from "recharts";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const AdminAnalytics = () => {
  const [timeframe, setTimeframe] = useState("month");

  // Sales data for charts
  const salesData = [{
    name: "Jan",
    amount: 25000
  }, {
    name: "Feb",
    amount: 32000
  }, {
    name: "Mar",
    amount: 43000
  }, {
    name: "Apr",
    amount: 51000
  }, {
    name: "May",
    amount: 47000
  }, {
    name: "Jun",
    amount: 58000
  }];

  // Bookings data for charts
  const bookingsData = [{
    name: "Jan",
    count: 32
  }, {
    name: "Feb",
    count: 45
  }, {
    name: "Mar",
    count: 61
  }, {
    name: "Apr",
    count: 75
  }, {
    name: "May",
    count: 68
  }, {
    name: "Jun",
    count: 84
  }];

  // Trek category data for pie chart
  const trekCategoryData = [{
    name: "Mountain",
    value: 45
  }, {
    name: "Waterfall",
    value: 20
  }, {
    name: "Valley",
    value: 15
  }, {
    name: "Beach",
    value: 10
  }, {
    name: "Forest",
    value: 10
  }];

  // Vendor performance data
  const vendorPerformanceData = [{
    name: "Mountain Explorers",
    treks: 12,
    bookings: 87,
    revenue: 345000
  }, {
    name: "Adventure Beyond",
    treks: 8,
    bookings: 65,
    revenue: 260000
  }, {
    name: "Trails & Peaks",
    treks: 6,
    bookings: 42,
    revenue: 168000
  }, {
    name: "Summit Seekers",
    treks: 5,
    bookings: 36,
    revenue: 144000
  }, {
    name: "Wilderness Wanderers",
    treks: 4,
    bookings: 28,
    revenue: 112000
  }];

  // Colors for pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
  return /*#__PURE__*/_jsxs("div", {
    children: [/*#__PURE__*/_jsxs("div", {
      className: "flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8",
      children: [/*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx("h1", {
          className: "text-2xl font-bold",
          children: "Analytics Dashboard"
        }), /*#__PURE__*/_jsx("p", {
          className: "text-gray-500",
          children: "Insights and statistics across the platform."
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
            children: "Total Revenue"
          }), /*#__PURE__*/_jsx(DollarSign, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "\u20B910,29,000"
          }), /*#__PURE__*/_jsxs("div", {
            className: "flex items-center pt-1 text-sm",
            children: [/*#__PURE__*/_jsx(TrendingUp, {
              className: "mr-1 h-4 w-4 text-green-600"
            }), /*#__PURE__*/_jsx("span", {
              className: "text-green-600 mr-2",
              children: "23%"
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
            children: "Total Bookings"
          }), /*#__PURE__*/_jsx(Calendar, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "258"
          }), /*#__PURE__*/_jsxs("div", {
            className: "flex items-center pt-1 text-sm",
            children: [/*#__PURE__*/_jsx(TrendingUp, {
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
            children: "Active Treks"
          }), /*#__PURE__*/_jsx(Map, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "35"
          }), /*#__PURE__*/_jsxs("div", {
            className: "flex items-center pt-1 text-sm",
            children: [/*#__PURE__*/_jsx(TrendingUp, {
              className: "mr-1 h-4 w-4 text-green-600"
            }), /*#__PURE__*/_jsx("span", {
              className: "text-green-600 mr-2",
              children: "7"
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
            children: [/*#__PURE__*/_jsx(TrendingUp, {
              className: "mr-1 h-4 w-4 text-green-600"
            }), /*#__PURE__*/_jsx("span", {
              className: "text-green-600 mr-2",
              children: "3"
            }), /*#__PURE__*/_jsxs("span", {
              className: "text-muted-foreground",
              children: ["new this ", timeframe]
            })]
          })]
        })]
      })]
    }), /*#__PURE__*/_jsxs(Tabs, {
      defaultValue: "overview",
      className: "mb-8",
      children: [/*#__PURE__*/_jsxs(TabsList, {
        children: [/*#__PURE__*/_jsx(TabsTrigger, {
          value: "overview",
          children: "Overview"
        }), /*#__PURE__*/_jsx(TabsTrigger, {
          value: "bookings",
          children: "Bookings"
        }), /*#__PURE__*/_jsx(TabsTrigger, {
          value: "treks",
          children: "Treks"
        }), /*#__PURE__*/_jsx(TabsTrigger, {
          value: "vendors",
          children: "Vendors"
        })]
      }), /*#__PURE__*/_jsxs(TabsContent, {
        value: "overview",
        className: "space-y-6",
        children: [/*#__PURE__*/_jsxs(Card, {
          className: "mt-6",
          children: [/*#__PURE__*/_jsxs(CardHeader, {
            children: [/*#__PURE__*/_jsx(CardTitle, {
              children: "Revenue Overview"
            }), /*#__PURE__*/_jsx(CardDescription, {
              children: "Monthly revenue trend over the past 6 months"
            })]
          }), /*#__PURE__*/_jsx(CardContent, {
            children: /*#__PURE__*/_jsx("div", {
              className: "h-[300px]",
              children: /*#__PURE__*/_jsx(ResponsiveContainer, {
                width: "100%",
                height: "100%",
                children: /*#__PURE__*/_jsxs(BarChart, {
                  data: salesData,
                  children: [/*#__PURE__*/_jsx(CartesianGrid, {
                    strokeDasharray: "3 3",
                    vertical: false
                  }), /*#__PURE__*/_jsx(XAxis, {
                    dataKey: "name"
                  }), /*#__PURE__*/_jsx(YAxis, {}), /*#__PURE__*/_jsx(Tooltip, {
                    formatter: value => [`₹${value}`, 'Revenue']
                  }), /*#__PURE__*/_jsx(Legend, {}), /*#__PURE__*/_jsx(Bar, {
                    dataKey: "amount",
                    name: "Revenue",
                    fill: "#1e40af",
                    radius: [4, 4, 0, 0]
                  })]
                })
              })
            })
          })]
        }), /*#__PURE__*/_jsxs("div", {
          className: "grid grid-cols-1 md:grid-cols-2 gap-6",
          children: [/*#__PURE__*/_jsxs(Card, {
            children: [/*#__PURE__*/_jsxs(CardHeader, {
              children: [/*#__PURE__*/_jsx(CardTitle, {
                children: "Trek Categories"
              }), /*#__PURE__*/_jsx(CardDescription, {
                children: "Distribution of treks by category"
              })]
            }), /*#__PURE__*/_jsx(CardContent, {
              children: /*#__PURE__*/_jsx("div", {
                className: "h-[300px]",
                children: /*#__PURE__*/_jsx(ResponsiveContainer, {
                  width: "100%",
                  height: "100%",
                  children: /*#__PURE__*/_jsxs(RechartPieChart, {
                    children: [/*#__PURE__*/_jsx(Pie, {
                      data: trekCategoryData,
                      cx: "50%",
                      cy: "50%",
                      labelLine: false,
                      label: ({
                        name,
                        percent
                      }) => `${name}: ${(percent * 100).toFixed(0)}%`,
                      outerRadius: 80,
                      fill: "#8884d8",
                      dataKey: "value",
                      children: trekCategoryData.map((entry, index) => /*#__PURE__*/_jsx(Cell, {
                        fill: COLORS[index % COLORS.length]
                      }, `cell-${index}`))
                    }), /*#__PURE__*/_jsx(Tooltip, {})]
                  })
                })
              })
            })]
          }), /*#__PURE__*/_jsxs(Card, {
            children: [/*#__PURE__*/_jsxs(CardHeader, {
              children: [/*#__PURE__*/_jsx(CardTitle, {
                children: "Monthly Bookings"
              }), /*#__PURE__*/_jsx(CardDescription, {
                children: "Number of bookings per month"
              })]
            }), /*#__PURE__*/_jsx(CardContent, {
              children: /*#__PURE__*/_jsx("div", {
                className: "h-[300px]",
                children: /*#__PURE__*/_jsx(ResponsiveContainer, {
                  width: "100%",
                  height: "100%",
                  children: /*#__PURE__*/_jsxs(BarChart, {
                    data: bookingsData,
                    children: [/*#__PURE__*/_jsx(CartesianGrid, {
                      strokeDasharray: "3 3",
                      vertical: false
                    }), /*#__PURE__*/_jsx(XAxis, {
                      dataKey: "name"
                    }), /*#__PURE__*/_jsx(YAxis, {}), /*#__PURE__*/_jsx(Tooltip, {}), /*#__PURE__*/_jsx(Legend, {}), /*#__PURE__*/_jsx(Bar, {
                      dataKey: "count",
                      name: "Bookings",
                      fill: "#10b981",
                      radius: [4, 4, 0, 0]
                    })]
                  })
                })
              })
            })]
          })]
        })]
      }), /*#__PURE__*/_jsx(TabsContent, {
        value: "bookings",
        className: "space-y-6",
        children: /*#__PURE__*/_jsxs(Card, {
          className: "mt-6",
          children: [/*#__PURE__*/_jsxs(CardHeader, {
            children: [/*#__PURE__*/_jsx(CardTitle, {
              children: "Booking Analytics"
            }), /*#__PURE__*/_jsx(CardDescription, {
              children: "Detailed booking statistics and trends"
            })]
          }), /*#__PURE__*/_jsxs(CardContent, {
            children: [/*#__PURE__*/_jsxs("div", {
              className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-6",
              children: [/*#__PURE__*/_jsxs(Card, {
                children: [/*#__PURE__*/_jsx(CardHeader, {
                  className: "pb-2",
                  children: /*#__PURE__*/_jsx(CardTitle, {
                    className: "text-sm font-medium",
                    children: "Conversion Rate"
                  })
                }), /*#__PURE__*/_jsxs(CardContent, {
                  children: [/*#__PURE__*/_jsx("div", {
                    className: "text-2xl font-bold",
                    children: "78%"
                  }), /*#__PURE__*/_jsx("div", {
                    className: "text-xs text-muted-foreground",
                    children: "Cart to checkout"
                  })]
                })]
              }), /*#__PURE__*/_jsxs(Card, {
                children: [/*#__PURE__*/_jsx(CardHeader, {
                  className: "pb-2",
                  children: /*#__PURE__*/_jsx(CardTitle, {
                    className: "text-sm font-medium",
                    children: "Average Group Size"
                  })
                }), /*#__PURE__*/_jsxs(CardContent, {
                  children: [/*#__PURE__*/_jsx("div", {
                    className: "text-2xl font-bold",
                    children: "3.4"
                  }), /*#__PURE__*/_jsx("div", {
                    className: "text-xs text-muted-foreground",
                    children: "Persons per booking"
                  })]
                })]
              }), /*#__PURE__*/_jsxs(Card, {
                children: [/*#__PURE__*/_jsx(CardHeader, {
                  className: "pb-2",
                  children: /*#__PURE__*/_jsx(CardTitle, {
                    className: "text-sm font-medium",
                    children: "Cancellation Rate"
                  })
                }), /*#__PURE__*/_jsxs(CardContent, {
                  children: [/*#__PURE__*/_jsx("div", {
                    className: "text-2xl font-bold",
                    children: "5.2%"
                  }), /*#__PURE__*/_jsx("div", {
                    className: "text-xs text-muted-foreground",
                    children: "Of total bookings"
                  })]
                })]
              })]
            }), /*#__PURE__*/_jsxs("div", {
              className: "h-[300px]",
              children: [/*#__PURE__*/_jsx("h3", {
                className: "text-lg font-semibold mb-4",
                children: "Booking Status Distribution"
              }), /*#__PURE__*/_jsx(ResponsiveContainer, {
                width: "100%",
                height: "100%",
                children: /*#__PURE__*/_jsxs(RechartPieChart, {
                  children: [/*#__PURE__*/_jsx(Pie, {
                    data: [{
                      name: 'Confirmed',
                      value: 65
                    }, {
                      name: 'Completed',
                      value: 15
                    }, {
                      name: 'Cancelled',
                      value: 5
                    }, {
                      name: 'Pending',
                      value: 10
                    }, {
                      name: 'Refunded',
                      value: 5
                    }],
                    cx: "50%",
                    cy: "50%",
                    labelLine: false,
                    label: ({
                      name,
                      percent
                    }) => `${name}: ${(percent * 100).toFixed(0)}%`,
                    outerRadius: 80,
                    fill: "#8884d8",
                    dataKey: "value",
                    children: [{
                      name: 'Confirmed',
                      value: 65
                    }, {
                      name: 'Completed',
                      value: 15
                    }, {
                      name: 'Cancelled',
                      value: 5
                    }, {
                      name: 'Pending',
                      value: 10
                    }, {
                      name: 'Refunded',
                      value: 5
                    }].map((entry, index) => /*#__PURE__*/_jsx(Cell, {
                      fill: COLORS[index % COLORS.length]
                    }, `cell-${index}`))
                  }), /*#__PURE__*/_jsx(Tooltip, {})]
                })
              })]
            })]
          })]
        })
      }), /*#__PURE__*/_jsx(TabsContent, {
        value: "treks",
        className: "space-y-6",
        children: /*#__PURE__*/_jsxs(Card, {
          className: "mt-6",
          children: [/*#__PURE__*/_jsxs(CardHeader, {
            children: [/*#__PURE__*/_jsx(CardTitle, {
              children: "Trek Analytics"
            }), /*#__PURE__*/_jsx(CardDescription, {
              children: "Insights into trek performance and popularity"
            })]
          }), /*#__PURE__*/_jsxs(CardContent, {
            children: [/*#__PURE__*/_jsxs("div", {
              className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-6",
              children: [/*#__PURE__*/_jsxs(Card, {
                children: [/*#__PURE__*/_jsx(CardHeader, {
                  className: "pb-2",
                  children: /*#__PURE__*/_jsx(CardTitle, {
                    className: "text-sm font-medium",
                    children: "Avg Rating"
                  })
                }), /*#__PURE__*/_jsxs(CardContent, {
                  children: [/*#__PURE__*/_jsx("div", {
                    className: "text-2xl font-bold",
                    children: "4.7/5"
                  }), /*#__PURE__*/_jsx("div", {
                    className: "text-xs text-muted-foreground",
                    children: "Based on 423 reviews"
                  })]
                })]
              }), /*#__PURE__*/_jsxs(Card, {
                children: [/*#__PURE__*/_jsx(CardHeader, {
                  className: "pb-2",
                  children: /*#__PURE__*/_jsx(CardTitle, {
                    className: "text-sm font-medium",
                    children: "Popular Difficulty"
                  })
                }), /*#__PURE__*/_jsxs(CardContent, {
                  children: [/*#__PURE__*/_jsx("div", {
                    className: "text-2xl font-bold",
                    children: "Moderate"
                  }), /*#__PURE__*/_jsx("div", {
                    className: "text-xs text-muted-foreground",
                    children: "48% of all treks"
                  })]
                })]
              }), /*#__PURE__*/_jsxs(Card, {
                children: [/*#__PURE__*/_jsx(CardHeader, {
                  className: "pb-2",
                  children: /*#__PURE__*/_jsx(CardTitle, {
                    className: "text-sm font-medium",
                    children: "Avg Trek Duration"
                  })
                }), /*#__PURE__*/_jsxs(CardContent, {
                  children: [/*#__PURE__*/_jsx("div", {
                    className: "text-2xl font-bold",
                    children: "2.8 Days"
                  }), /*#__PURE__*/_jsx("div", {
                    className: "text-xs text-muted-foreground",
                    children: "Across all treks"
                  })]
                })]
              })]
            }), /*#__PURE__*/_jsxs("div", {
              className: "h-[300px]",
              children: [/*#__PURE__*/_jsx("h3", {
                className: "text-lg font-semibold mb-4",
                children: "Top Performing Treks"
              }), /*#__PURE__*/_jsx(ResponsiveContainer, {
                width: "100%",
                height: "100%",
                children: /*#__PURE__*/_jsxs(BarChart, {
                  data: [{
                    name: 'Himalayan Adventure',
                    bookings: 87,
                    revenue: 435000
                  }, {
                    name: 'Valley Trek',
                    bookings: 65,
                    revenue: 325000
                  }, {
                    name: 'Mountain View Trek',
                    bookings: 54,
                    revenue: 270000
                  }, {
                    name: 'Forest Expedition',
                    bookings: 43,
                    revenue: 215000
                  }, {
                    name: 'Beach Trek',
                    bookings: 32,
                    revenue: 160000
                  }],
                  layout: "vertical",
                  margin: {
                    left: 120
                  },
                  children: [/*#__PURE__*/_jsx(CartesianGrid, {
                    horizontal: true,
                    vertical: false,
                    strokeDasharray: "3 3"
                  }), /*#__PURE__*/_jsx(XAxis, {
                    type: "number"
                  }), /*#__PURE__*/_jsx(YAxis, {
                    type: "category",
                    dataKey: "name",
                    width: 100
                  }), /*#__PURE__*/_jsx(Tooltip, {
                    formatter: (value, name) => [name === 'revenue' ? `₹${value}` : value, name === 'revenue' ? 'Revenue' : 'Bookings']
                  }), /*#__PURE__*/_jsx(Legend, {}), /*#__PURE__*/_jsx(Bar, {
                    dataKey: "bookings",
                    name: "Bookings",
                    fill: "#10b981"
                  }), /*#__PURE__*/_jsx(Bar, {
                    dataKey: "revenue",
                    name: "Revenue",
                    fill: "#1e40af"
                  })]
                })
              })]
            })]
          })]
        })
      }), /*#__PURE__*/_jsx(TabsContent, {
        value: "vendors",
        className: "space-y-6",
        children: /*#__PURE__*/_jsxs(Card, {
          className: "mt-6",
          children: [/*#__PURE__*/_jsxs(CardHeader, {
            children: [/*#__PURE__*/_jsx(CardTitle, {
              children: "Vendor Analytics"
            }), /*#__PURE__*/_jsx(CardDescription, {
              children: "Performance metrics for vendors on the platform"
            })]
          }), /*#__PURE__*/_jsxs(CardContent, {
            children: [/*#__PURE__*/_jsxs("div", {
              className: "h-[400px]",
              children: [/*#__PURE__*/_jsx("h3", {
                className: "text-lg font-semibold mb-4",
                children: "Top Performing Vendors"
              }), /*#__PURE__*/_jsx(ResponsiveContainer, {
                width: "100%",
                height: "100%",
                children: /*#__PURE__*/_jsxs(BarChart, {
                  data: vendorPerformanceData,
                  layout: "vertical",
                  margin: {
                    left: 160
                  },
                  children: [/*#__PURE__*/_jsx(CartesianGrid, {
                    horizontal: true,
                    vertical: false,
                    strokeDasharray: "3 3"
                  }), /*#__PURE__*/_jsx(XAxis, {
                    type: "number"
                  }), /*#__PURE__*/_jsx(YAxis, {
                    type: "category",
                    dataKey: "name",
                    width: 150
                  }), /*#__PURE__*/_jsx(Tooltip, {
                    formatter: (value, name) => {
                      if (name === 'revenue') return [`₹${value}`, 'Revenue'];
                      if (typeof name === 'string') {
                        return [value, name.charAt(0).toUpperCase() + name.slice(1)];
                      }
                      return [value, name];
                    }
                  }), /*#__PURE__*/_jsx(Legend, {}), /*#__PURE__*/_jsx(Bar, {
                    dataKey: "treks",
                    name: "Treks",
                    fill: "#8884d8"
                  }), /*#__PURE__*/_jsx(Bar, {
                    dataKey: "bookings",
                    name: "Bookings",
                    fill: "#10b981"
                  }), /*#__PURE__*/_jsx(Bar, {
                    dataKey: "revenue",
                    name: "Revenue (\u20B9)",
                    fill: "#1e40af"
                  })]
                })
              })]
            }), /*#__PURE__*/_jsxs("div", {
              className: "grid grid-cols-1 md:grid-cols-2 gap-6 mt-6",
              children: [/*#__PURE__*/_jsxs(Card, {
                children: [/*#__PURE__*/_jsx(CardHeader, {
                  className: "pb-2",
                  children: /*#__PURE__*/_jsx(CardTitle, {
                    className: "text-sm font-medium",
                    children: "Vendor Growth"
                  })
                }), /*#__PURE__*/_jsxs(CardContent, {
                  children: [/*#__PURE__*/_jsx("div", {
                    className: "text-2xl font-bold",
                    children: "+28%"
                  }), /*#__PURE__*/_jsx("div", {
                    className: "text-xs text-muted-foreground",
                    children: "New vendors this year"
                  })]
                })]
              }), /*#__PURE__*/_jsxs(Card, {
                children: [/*#__PURE__*/_jsx(CardHeader, {
                  className: "pb-2",
                  children: /*#__PURE__*/_jsx(CardTitle, {
                    className: "text-sm font-medium",
                    children: "Vendor Retention"
                  })
                }), /*#__PURE__*/_jsxs(CardContent, {
                  children: [/*#__PURE__*/_jsx("div", {
                    className: "text-2xl font-bold",
                    children: "92%"
                  }), /*#__PURE__*/_jsx("div", {
                    className: "text-xs text-muted-foreground",
                    children: "Year over year retention"
                  })]
                })]
              })]
            })]
          })]
        })
      })]
    }), /*#__PURE__*/_jsxs(Card, {
      children: [/*#__PURE__*/_jsxs(CardHeader, {
        children: [/*#__PURE__*/_jsx(CardTitle, {
          children: "Recent Activity"
        }), /*#__PURE__*/_jsx(CardDescription, {
          children: "Overview of recent platform activity"
        })]
      }), /*#__PURE__*/_jsx(CardContent, {
        children: /*#__PURE__*/_jsxs("div", {
          className: "space-y-4",
          children: [/*#__PURE__*/_jsxs("div", {
            className: "flex items-start space-x-4",
            children: [/*#__PURE__*/_jsx("div", {
              className: "bg-primary/10 p-2 rounded-full",
              children: /*#__PURE__*/_jsx(Users, {
                className: "h-4 w-4 text-primary"
              })
            }), /*#__PURE__*/_jsxs("div", {
              className: "space-y-1",
              children: [/*#__PURE__*/_jsx("p", {
                className: "text-sm font-medium",
                children: "New Vendor Registration"
              }), /*#__PURE__*/_jsx("p", {
                className: "text-sm text-muted-foreground",
                children: "Summit Seekers joined the platform"
              }), /*#__PURE__*/_jsx("p", {
                className: "text-xs text-muted-foreground",
                children: "3 hours ago"
              })]
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "flex items-start space-x-4",
            children: [/*#__PURE__*/_jsx("div", {
              className: "bg-primary/10 p-2 rounded-full",
              children: /*#__PURE__*/_jsx(Map, {
                className: "h-4 w-4 text-primary"
              })
            }), /*#__PURE__*/_jsxs("div", {
              className: "space-y-1",
              children: [/*#__PURE__*/_jsx("p", {
                className: "text-sm font-medium",
                children: "New Trek Added"
              }), /*#__PURE__*/_jsx("p", {
                className: "text-sm text-muted-foreground",
                children: "Mountain Explorers added \"Himalayan Summit Challenge\""
              }), /*#__PURE__*/_jsx("p", {
                className: "text-xs text-muted-foreground",
                children: "5 hours ago"
              })]
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "flex items-start space-x-4",
            children: [/*#__PURE__*/_jsx("div", {
              className: "bg-primary/10 p-2 rounded-full",
              children: /*#__PURE__*/_jsx(Calendar, {
                className: "h-4 w-4 text-primary"
              })
            }), /*#__PURE__*/_jsxs("div", {
              className: "space-y-1",
              children: [/*#__PURE__*/_jsx("p", {
                className: "text-sm font-medium",
                children: "High Booking Volume"
              }), /*#__PURE__*/_jsx("p", {
                className: "text-sm text-muted-foreground",
                children: "15 bookings in the last hour"
              }), /*#__PURE__*/_jsx("p", {
                className: "text-xs text-muted-foreground",
                children: "6 hours ago"
              })]
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "flex items-start space-x-4",
            children: [/*#__PURE__*/_jsx("div", {
              className: "bg-primary/10 p-2 rounded-full",
              children: /*#__PURE__*/_jsx(DollarSign, {
                className: "h-4 w-4 text-primary"
              })
            }), /*#__PURE__*/_jsxs("div", {
              className: "space-y-1",
              children: [/*#__PURE__*/_jsx("p", {
                className: "text-sm font-medium",
                children: "Revenue Milestone Reached"
              }), /*#__PURE__*/_jsx("p", {
                className: "text-sm text-muted-foreground",
                children: "Platform crossed \u20B910 Lakhs in monthly revenue"
              }), /*#__PURE__*/_jsx("p", {
                className: "text-xs text-muted-foreground",
                children: "12 hours ago"
              })]
            })]
          })]
        })
      })]
    })]
  });
};
export default AdminAnalytics;