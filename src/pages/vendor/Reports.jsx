import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart as ChartIcon, TrendingUp, Users, Calendar, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";

// Mock data for charts
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const bookingsData = [{
  name: 'Jan',
  bookings: 65,
  revenue: 42000
}, {
  name: 'Feb',
  bookings: 80,
  revenue: 52000
}, {
  name: 'Mar',
  bookings: 95,
  revenue: 62000
}, {
  name: 'Apr',
  bookings: 78,
  revenue: 51000
}, {
  name: 'May',
  bookings: 92,
  revenue: 60000
}, {
  name: 'Jun',
  bookings: 130,
  revenue: 84000
}];
const trekPopularityData = [{
  name: 'Dandeli Adventure Trek',
  value: 55
}, {
  name: 'Gokarna Beach Trek',
  value: 43
}, {
  name: 'Kudremukh Peak Trek',
  value: 28
}, {
  name: 'Vibhuti Waterfalls Trek',
  value: 15
}, {
  name: 'Other Treks',
  value: 12
}];
const customerDemographicsData = [{
  name: 'Bangalore',
  value: 42
}, {
  name: 'Mumbai',
  value: 23
}, {
  name: 'Delhi',
  value: 18
}, {
  name: 'Chennai',
  value: 11
}, {
  name: 'Other',
  value: 6
}];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

// Analysis cards data
const analysisCards = [{
  title: "Total Bookings",
  value: "453",
  change: "+12.5%",
  timeframe: "vs. last month",
  trend: "up",
  icon: Calendar
}, {
  title: "Revenue",
  value: "₹2,95,000",
  change: "+8.2%",
  timeframe: "vs. last month",
  trend: "up",
  icon: TrendingUp
}, {
  title: "Customers",
  value: "382",
  change: "+15.3%",
  timeframe: "vs. last month",
  trend: "up",
  icon: Users
}, {
  title: "Avg. Booking Value",
  value: "₹6,512",
  change: "-2.1%",
  timeframe: "vs. last month",
  trend: "down",
  icon: ChartIcon
}];
const VendorReports = () => {
  const [timeFrame, setTimeFrame] = useState("6months");
  return /*#__PURE__*/_jsxs("div", {
    children: [/*#__PURE__*/_jsxs("div", {
      className: "flex flex-col md:flex-row justify-between items-start md:items-center mb-6",
      children: [/*#__PURE__*/_jsx("h1", {
        className: "text-2xl font-bold mb-2 md:mb-0",
        children: "Reports"
      }), /*#__PURE__*/_jsxs("div", {
        className: "flex items-center gap-2",
        children: [/*#__PURE__*/_jsxs(Select, {
          defaultValue: timeFrame,
          onValueChange: setTimeFrame,
          children: [/*#__PURE__*/_jsx(SelectTrigger, {
            className: "w-[180px]",
            children: /*#__PURE__*/_jsx(SelectValue, {
              placeholder: "Time Frame"
            })
          }), /*#__PURE__*/_jsxs(SelectContent, {
            children: [/*#__PURE__*/_jsx(SelectItem, {
              value: "30days",
              children: "Last 30 Days"
            }), /*#__PURE__*/_jsx(SelectItem, {
              value: "3months",
              children: "Last 3 Months"
            }), /*#__PURE__*/_jsx(SelectItem, {
              value: "6months",
              children: "Last 6 Months"
            }), /*#__PURE__*/_jsx(SelectItem, {
              value: "1year",
              children: "Last Year"
            })]
          })]
        }), /*#__PURE__*/_jsxs(Button, {
          variant: "outline",
          className: "flex items-center gap-2",
          children: [/*#__PURE__*/_jsx(Download, {
            className: "h-4 w-4"
          }), "Export"]
        })]
      })]
    }), /*#__PURE__*/_jsx("div", {
      className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6",
      children: analysisCards.map((card, index) => /*#__PURE__*/_jsx(Card, {
        children: /*#__PURE__*/_jsx(CardContent, {
          className: "p-6",
          children: /*#__PURE__*/_jsxs("div", {
            className: "flex justify-between items-start",
            children: [/*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx("p", {
                className: "text-sm text-gray-500",
                children: card.title
              }), /*#__PURE__*/_jsx("h3", {
                className: "text-2xl font-bold mt-1",
                children: card.value
              }), /*#__PURE__*/_jsxs("p", {
                className: `text-xs mt-1 flex items-center ${card.trend === 'up' ? 'text-green-600' : 'text-red-600'}`,
                children: [card.change, " ", /*#__PURE__*/_jsx("span", {
                  className: "text-gray-500 ml-1",
                  children: card.timeframe
                })]
              })]
            }), /*#__PURE__*/_jsx("div", {
              className: "bg-gray-100 p-2 rounded-md",
              children: /*#__PURE__*/_jsx(card.icon, {
                className: "h-5 w-5 text-gray-500"
              })
            })]
          })
        })
      }, index))
    }), /*#__PURE__*/_jsxs(Tabs, {
      defaultValue: "bookings",
      children: [/*#__PURE__*/_jsxs(TabsList, {
        className: "mb-4",
        children: [/*#__PURE__*/_jsx(TabsTrigger, {
          value: "bookings",
          children: "Bookings & Revenue"
        }), /*#__PURE__*/_jsx(TabsTrigger, {
          value: "treks",
          children: "Trek Analytics"
        }), /*#__PURE__*/_jsx(TabsTrigger, {
          value: "customers",
          children: "Customer Analytics"
        })]
      }), /*#__PURE__*/_jsxs(TabsContent, {
        value: "bookings",
        children: [/*#__PURE__*/_jsxs(Card, {
          children: [/*#__PURE__*/_jsxs(CardHeader, {
            children: [/*#__PURE__*/_jsx(CardTitle, {
              children: "Bookings & Revenue Analysis"
            }), /*#__PURE__*/_jsx(CardDescription, {
              children: "View your booking trends and revenue generation"
            })]
          }), /*#__PURE__*/_jsx(CardContent, {
            className: "pt-2",
            children: /*#__PURE__*/_jsx("div", {
              className: "h-[400px]",
              children: /*#__PURE__*/_jsx(ResponsiveContainer, {
                width: "100%",
                height: "100%",
                children: /*#__PURE__*/_jsxs(BarChart, {
                  data: bookingsData,
                  margin: {
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5
                  },
                  children: [/*#__PURE__*/_jsx(CartesianGrid, {
                    strokeDasharray: "3 3"
                  }), /*#__PURE__*/_jsx(XAxis, {
                    dataKey: "name"
                  }), /*#__PURE__*/_jsx(YAxis, {
                    yAxisId: "left",
                    orientation: "left",
                    stroke: "#8884d8"
                  }), /*#__PURE__*/_jsx(YAxis, {
                    yAxisId: "right",
                    orientation: "right",
                    stroke: "#82ca9d"
                  }), /*#__PURE__*/_jsx(Tooltip, {}), /*#__PURE__*/_jsx(Legend, {}), /*#__PURE__*/_jsx(Bar, {
                    yAxisId: "left",
                    dataKey: "bookings",
                    name: "Bookings",
                    fill: "#8884d8"
                  }), /*#__PURE__*/_jsx(Bar, {
                    yAxisId: "right",
                    dataKey: "revenue",
                    name: "Revenue (\u20B9)",
                    fill: "#82ca9d"
                  })]
                })
              })
            })
          })]
        }), /*#__PURE__*/_jsxs("div", {
          className: "grid grid-cols-1 md:grid-cols-2 gap-4 mt-4",
          children: [/*#__PURE__*/_jsxs(Card, {
            children: [/*#__PURE__*/_jsxs(CardHeader, {
              children: [/*#__PURE__*/_jsx(CardTitle, {
                children: "Booking Trend"
              }), /*#__PURE__*/_jsx(CardDescription, {
                children: "Month-wise booking trend analysis"
              })]
            }), /*#__PURE__*/_jsx(CardContent, {
              children: /*#__PURE__*/_jsx("div", {
                className: "h-[300px]",
                children: /*#__PURE__*/_jsx(ResponsiveContainer, {
                  width: "100%",
                  height: "100%",
                  children: /*#__PURE__*/_jsxs(LineChart, {
                    data: bookingsData,
                    margin: {
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5
                    },
                    children: [/*#__PURE__*/_jsx(CartesianGrid, {
                      strokeDasharray: "3 3"
                    }), /*#__PURE__*/_jsx(XAxis, {
                      dataKey: "name"
                    }), /*#__PURE__*/_jsx(YAxis, {}), /*#__PURE__*/_jsx(Tooltip, {}), /*#__PURE__*/_jsx(Legend, {}), /*#__PURE__*/_jsx(Line, {
                      type: "monotone",
                      dataKey: "bookings",
                      name: "Bookings",
                      stroke: "#8884d8",
                      activeDot: {
                        r: 8
                      }
                    })]
                  })
                })
              })
            })]
          }), /*#__PURE__*/_jsxs(Card, {
            children: [/*#__PURE__*/_jsxs(CardHeader, {
              children: [/*#__PURE__*/_jsx(CardTitle, {
                children: "Revenue Analysis"
              }), /*#__PURE__*/_jsx(CardDescription, {
                children: "Month-wise revenue analysis"
              })]
            }), /*#__PURE__*/_jsx(CardContent, {
              children: /*#__PURE__*/_jsx("div", {
                className: "h-[300px]",
                children: /*#__PURE__*/_jsx(ResponsiveContainer, {
                  width: "100%",
                  height: "100%",
                  children: /*#__PURE__*/_jsxs(LineChart, {
                    data: bookingsData,
                    margin: {
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5
                    },
                    children: [/*#__PURE__*/_jsx(CartesianGrid, {
                      strokeDasharray: "3 3"
                    }), /*#__PURE__*/_jsx(XAxis, {
                      dataKey: "name"
                    }), /*#__PURE__*/_jsx(YAxis, {}), /*#__PURE__*/_jsx(Tooltip, {}), /*#__PURE__*/_jsx(Legend, {}), /*#__PURE__*/_jsx(Line, {
                      type: "monotone",
                      dataKey: "revenue",
                      name: "Revenue (\u20B9)",
                      stroke: "#82ca9d",
                      activeDot: {
                        r: 8
                      }
                    })]
                  })
                })
              })
            })]
          })]
        })]
      }), /*#__PURE__*/_jsx(TabsContent, {
        value: "treks",
        children: /*#__PURE__*/_jsxs("div", {
          className: "grid grid-cols-1 md:grid-cols-2 gap-4",
          children: [/*#__PURE__*/_jsxs(Card, {
            children: [/*#__PURE__*/_jsxs(CardHeader, {
              children: [/*#__PURE__*/_jsx(CardTitle, {
                children: "Trek Popularity"
              }), /*#__PURE__*/_jsx(CardDescription, {
                children: "Comparison of trek bookings"
              })]
            }), /*#__PURE__*/_jsx(CardContent, {
              children: /*#__PURE__*/_jsx("div", {
                className: "h-[300px]",
                children: /*#__PURE__*/_jsx(ResponsiveContainer, {
                  width: "100%",
                  height: "100%",
                  children: /*#__PURE__*/_jsxs(PieChart, {
                    children: [/*#__PURE__*/_jsx(Pie, {
                      data: trekPopularityData,
                      cx: "50%",
                      cy: "50%",
                      labelLine: false,
                      outerRadius: 80,
                      fill: "#8884d8",
                      dataKey: "value",
                      label: ({
                        name,
                        percent
                      }) => `${name}: ${(percent * 100).toFixed(0)}%`,
                      children: trekPopularityData.map((entry, index) => /*#__PURE__*/_jsx(Cell, {
                        fill: COLORS[index % COLORS.length]
                      }, `cell-${index}`))
                    }), /*#__PURE__*/_jsx(Tooltip, {}), /*#__PURE__*/_jsx(Legend, {})]
                  })
                })
              })
            })]
          }), /*#__PURE__*/_jsxs(Card, {
            children: [/*#__PURE__*/_jsxs(CardHeader, {
              children: [/*#__PURE__*/_jsx(CardTitle, {
                children: "Trek Performance"
              }), /*#__PURE__*/_jsx(CardDescription, {
                children: "Revenue generation by trek"
              })]
            }), /*#__PURE__*/_jsx(CardContent, {
              children: /*#__PURE__*/_jsx("div", {
                className: "h-[300px]",
                children: /*#__PURE__*/_jsx(ResponsiveContainer, {
                  width: "100%",
                  height: "100%",
                  children: /*#__PURE__*/_jsxs(BarChart, {
                    layout: "vertical",
                    data: trekPopularityData,
                    margin: {
                      top: 5,
                      right: 30,
                      left: 70,
                      bottom: 5
                    },
                    children: [/*#__PURE__*/_jsx(CartesianGrid, {
                      strokeDasharray: "3 3"
                    }), /*#__PURE__*/_jsx(XAxis, {
                      type: "number"
                    }), /*#__PURE__*/_jsx(YAxis, {
                      type: "category",
                      dataKey: "name"
                    }), /*#__PURE__*/_jsx(Tooltip, {}), /*#__PURE__*/_jsx(Legend, {}), /*#__PURE__*/_jsx(Bar, {
                      dataKey: "value",
                      name: "Bookings",
                      fill: "#8884d8"
                    })]
                  })
                })
              })
            })]
          })]
        })
      }), /*#__PURE__*/_jsx(TabsContent, {
        value: "customers",
        children: /*#__PURE__*/_jsxs("div", {
          className: "grid grid-cols-1 md:grid-cols-2 gap-4",
          children: [/*#__PURE__*/_jsxs(Card, {
            children: [/*#__PURE__*/_jsxs(CardHeader, {
              children: [/*#__PURE__*/_jsx(CardTitle, {
                children: "Customer Demographics"
              }), /*#__PURE__*/_jsx(CardDescription, {
                children: "Distribution of customers by location"
              })]
            }), /*#__PURE__*/_jsx(CardContent, {
              children: /*#__PURE__*/_jsx("div", {
                className: "h-[300px]",
                children: /*#__PURE__*/_jsx(ResponsiveContainer, {
                  width: "100%",
                  height: "100%",
                  children: /*#__PURE__*/_jsxs(PieChart, {
                    children: [/*#__PURE__*/_jsx(Pie, {
                      data: customerDemographicsData,
                      cx: "50%",
                      cy: "50%",
                      labelLine: false,
                      outerRadius: 80,
                      fill: "#8884d8",
                      dataKey: "value",
                      label: ({
                        name,
                        percent
                      }) => `${name}: ${(percent * 100).toFixed(0)}%`,
                      children: customerDemographicsData.map((entry, index) => /*#__PURE__*/_jsx(Cell, {
                        fill: COLORS[index % COLORS.length]
                      }, `cell-${index}`))
                    }), /*#__PURE__*/_jsx(Tooltip, {}), /*#__PURE__*/_jsx(Legend, {})]
                  })
                })
              })
            })]
          }), /*#__PURE__*/_jsxs(Card, {
            children: [/*#__PURE__*/_jsxs(CardHeader, {
              children: [/*#__PURE__*/_jsx(CardTitle, {
                children: "Customer Acquisition"
              }), /*#__PURE__*/_jsx(CardDescription, {
                children: "New customer signups over time"
              })]
            }), /*#__PURE__*/_jsx(CardContent, {
              children: /*#__PURE__*/_jsx("div", {
                className: "h-[300px]",
                children: /*#__PURE__*/_jsx(ResponsiveContainer, {
                  width: "100%",
                  height: "100%",
                  children: /*#__PURE__*/_jsxs(LineChart, {
                    data: bookingsData,
                    margin: {
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5
                    },
                    children: [/*#__PURE__*/_jsx(CartesianGrid, {
                      strokeDasharray: "3 3"
                    }), /*#__PURE__*/_jsx(XAxis, {
                      dataKey: "name"
                    }), /*#__PURE__*/_jsx(YAxis, {}), /*#__PURE__*/_jsx(Tooltip, {}), /*#__PURE__*/_jsx(Legend, {}), /*#__PURE__*/_jsx(Line, {
                      type: "monotone",
                      dataKey: "bookings",
                      name: "New Customers",
                      stroke: "#FF8042",
                      activeDot: {
                        r: 8
                      }
                    })]
                  })
                })
              })
            })]
          })]
        })
      })]
    })]
  });
};
export default VendorReports;