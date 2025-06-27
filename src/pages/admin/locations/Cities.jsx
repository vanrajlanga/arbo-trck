import { useState } from "react";
import { Search, Filter, Plus, MapPin, Users, Building2, TrendingUp, Edit, Trash2, Eye, MoreHorizontal } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock data for operating cities
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
const operatingCitiesData = [{
  id: "CITY001",
  cityName: "Delhi",
  stateName: "Delhi",
  region: "North",
  status: "active",
  launchDate: "2023-01-15",
  totalCustomers: 2450,
  totalVendors: 25,
  totalBookings: 1890,
  avgRating: 4.2,
  popularTreks: ["Kedarnath", "Valley of Flowers", "Roopkund"]
}, {
  id: "CITY002",
  cityName: "Mumbai",
  stateName: "Maharashtra",
  region: "West",
  status: "active",
  launchDate: "2023-02-20",
  totalCustomers: 3200,
  totalVendors: 18,
  totalBookings: 2650,
  avgRating: 4.5,
  popularTreks: ["Annapurna Circuit", "Everest Base Camp", "Manaslu"]
}, {
  id: "CITY003",
  cityName: "Bangalore",
  stateName: "Karnataka",
  region: "South",
  status: "active",
  launchDate: "2023-03-10",
  totalCustomers: 1800,
  totalVendors: 15,
  totalBookings: 1450,
  avgRating: 4.3,
  popularTreks: ["Kilimanjaro", "Inca Trail", "Mont Blanc"]
}, {
  id: "CITY004",
  cityName: "Kolkata",
  stateName: "West Bengal",
  region: "East",
  status: "planning",
  launchDate: "2025-07-01",
  totalCustomers: 0,
  totalVendors: 0,
  totalBookings: 0,
  avgRating: 0,
  popularTreks: []
}];
const AdminLocationCities = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [regionFilter, setRegionFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newCity, setNewCity] = useState({
    cityName: "",
    stateName: "",
    region: "North",
    status: "planning",
    launchDate: ""
  });
  const filteredCities = operatingCitiesData.filter(city => {
    const matchesSearch = city.cityName.toLowerCase().includes(searchQuery.toLowerCase()) || city.stateName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion = regionFilter === "all" || city.region === regionFilter;
    const matchesStatus = statusFilter === "all" || city.status === statusFilter;
    return matchesSearch && matchesRegion && matchesStatus;
  });
  const getStatusColor = status => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "planning":
        return "bg-yellow-100 text-yellow-800";
      case "suspended":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  const getRegionColor = region => {
    switch (region) {
      case "North":
        return "bg-blue-100 text-blue-800";
      case "South":
        return "bg-green-100 text-green-800";
      case "East":
        return "bg-orange-100 text-orange-800";
      case "West":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  return /*#__PURE__*/_jsxs("div", {
    children: [/*#__PURE__*/_jsxs("div", {
      className: "flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8",
      children: [/*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx("h1", {
          className: "text-2xl font-bold",
          children: "Operating Cities"
        }), /*#__PURE__*/_jsx("p", {
          className: "text-gray-500",
          children: "Manage cities and states where services are provided"
        })]
      }), /*#__PURE__*/_jsx("div", {
        className: "flex gap-2 mt-4 lg:mt-0",
        children: /*#__PURE__*/_jsxs(Button, {
          onClick: () => setIsCreateDialogOpen(true),
          children: [/*#__PURE__*/_jsx(Plus, {
            className: "mr-2 h-4 w-4"
          }), "Add City"]
        })
      })]
    }), /*#__PURE__*/_jsxs("div", {
      className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8",
      children: [/*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsxs(CardHeader, {
          className: "flex flex-row items-center justify-between pb-2",
          children: [/*#__PURE__*/_jsx(CardTitle, {
            className: "text-sm font-medium",
            children: "Total Cities"
          }), /*#__PURE__*/_jsx(MapPin, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "12"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-xs text-muted-foreground",
            children: "Across India"
          })]
        })]
      }), /*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsxs(CardHeader, {
          className: "flex flex-row items-center justify-between pb-2",
          children: [/*#__PURE__*/_jsx(CardTitle, {
            className: "text-sm font-medium",
            children: "Active Cities"
          }), /*#__PURE__*/_jsx(Building2, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "9"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-xs text-muted-foreground",
            children: "Currently operational"
          })]
        })]
      }), /*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsxs(CardHeader, {
          className: "flex flex-row items-center justify-between pb-2",
          children: [/*#__PURE__*/_jsx(CardTitle, {
            className: "text-sm font-medium",
            children: "Total Customers"
          }), /*#__PURE__*/_jsx(Users, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "7,450"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-xs text-muted-foreground",
            children: "All cities combined"
          })]
        })]
      }), /*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsxs(CardHeader, {
          className: "flex flex-row items-center justify-between pb-2",
          children: [/*#__PURE__*/_jsx(CardTitle, {
            className: "text-sm font-medium",
            children: "Growth Rate"
          }), /*#__PURE__*/_jsx(TrendingUp, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "23%"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-xs text-muted-foreground",
            children: "Monthly growth"
          })]
        })]
      })]
    }), /*#__PURE__*/_jsxs(Card, {
      children: [/*#__PURE__*/_jsxs(CardHeader, {
        children: [/*#__PURE__*/_jsx(CardTitle, {
          children: "Operating Cities"
        }), /*#__PURE__*/_jsx(CardDescription, {
          children: "Manage cities and states where Aorbo provides trek booking services"
        })]
      }), /*#__PURE__*/_jsxs(CardContent, {
        children: [/*#__PURE__*/_jsxs("div", {
          className: "flex flex-col lg:flex-row gap-4 mb-6",
          children: [/*#__PURE__*/_jsxs("div", {
            className: "relative flex-1",
            children: [/*#__PURE__*/_jsx(Search, {
              className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4"
            }), /*#__PURE__*/_jsx(Input, {
              placeholder: "Search cities or states...",
              value: searchQuery,
              onChange: e => setSearchQuery(e.target.value),
              className: "pl-10"
            })]
          }), /*#__PURE__*/_jsxs(Select, {
            value: regionFilter,
            onValueChange: setRegionFilter,
            children: [/*#__PURE__*/_jsx(SelectTrigger, {
              className: "w-40",
              children: /*#__PURE__*/_jsx(SelectValue, {
                placeholder: "Region"
              })
            }), /*#__PURE__*/_jsxs(SelectContent, {
              children: [/*#__PURE__*/_jsx(SelectItem, {
                value: "all",
                children: "All Regions"
              }), /*#__PURE__*/_jsx(SelectItem, {
                value: "North",
                children: "North"
              }), /*#__PURE__*/_jsx(SelectItem, {
                value: "South",
                children: "South"
              }), /*#__PURE__*/_jsx(SelectItem, {
                value: "East",
                children: "East"
              }), /*#__PURE__*/_jsx(SelectItem, {
                value: "West",
                children: "West"
              })]
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
                value: "planning",
                children: "Planning"
              }), /*#__PURE__*/_jsx(SelectItem, {
                value: "suspended",
                children: "Suspended"
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
                  children: "City Details"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Region"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Launch Date"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Customer Base"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Vendors"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Performance"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Status"
                }), /*#__PURE__*/_jsx(TableHead, {
                  className: "text-right",
                  children: "Actions"
                })]
              })
            }), /*#__PURE__*/_jsx(TableBody, {
              children: filteredCities.map(city => /*#__PURE__*/_jsxs(TableRow, {
                children: [/*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsxs("div", {
                    children: [/*#__PURE__*/_jsx("div", {
                      className: "font-medium",
                      children: city.cityName
                    }), /*#__PURE__*/_jsx("div", {
                      className: "text-sm text-gray-500",
                      children: city.stateName
                    }), /*#__PURE__*/_jsxs("div", {
                      className: "text-xs text-gray-400",
                      children: ["ID: ", city.id]
                    })]
                  })
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsx(Badge, {
                    className: getRegionColor(city.region),
                    children: city.region
                  })
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsx("div", {
                    className: "text-sm",
                    children: city.launchDate
                  })
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsxs("div", {
                    children: [/*#__PURE__*/_jsx("div", {
                      className: "font-medium",
                      children: city.totalCustomers.toLocaleString()
                    }), /*#__PURE__*/_jsxs("div", {
                      className: "text-xs text-gray-500",
                      children: [city.totalBookings.toLocaleString(), " bookings"]
                    })]
                  })
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsx("div", {
                    className: "font-medium",
                    children: city.totalVendors
                  })
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsx("div", {
                    children: city.avgRating > 0 ? /*#__PURE__*/_jsxs(_Fragment, {
                      children: [/*#__PURE__*/_jsxs("div", {
                        className: "font-medium",
                        children: [city.avgRating, "/5.0"]
                      }), /*#__PURE__*/_jsx("div", {
                        className: "text-xs text-gray-500",
                        children: "Avg rating"
                      })]
                    }) : /*#__PURE__*/_jsx("div", {
                      className: "text-sm text-gray-400",
                      children: "No data"
                    })
                  })
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsx(Badge, {
                    className: getStatusColor(city.status),
                    children: city.status
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
                        }), "View Analytics"]
                      }), /*#__PURE__*/_jsxs(DropdownMenuItem, {
                        children: [/*#__PURE__*/_jsx(Edit, {
                          className: "mr-2 h-4 w-4"
                        }), "Edit City"]
                      }), /*#__PURE__*/_jsx(DropdownMenuSeparator, {}), /*#__PURE__*/_jsxs(DropdownMenuItem, {
                        className: "text-red-600",
                        children: [/*#__PURE__*/_jsx(Trash2, {
                          className: "mr-2 h-4 w-4"
                        }), "Remove City"]
                      })]
                    })]
                  })
                })]
              }, city.id))
            })]
          })
        })]
      })]
    }), /*#__PURE__*/_jsx(Dialog, {
      open: isCreateDialogOpen,
      onOpenChange: setIsCreateDialogOpen,
      children: /*#__PURE__*/_jsxs(DialogContent, {
        className: "max-w-2xl",
        children: [/*#__PURE__*/_jsxs(DialogHeader, {
          children: [/*#__PURE__*/_jsx(DialogTitle, {
            children: "Add New City"
          }), /*#__PURE__*/_jsx(DialogDescription, {
            children: "Add a new city to expand service coverage"
          })]
        }), /*#__PURE__*/_jsxs("div", {
          className: "grid grid-cols-1 md:grid-cols-2 gap-4 py-4",
          children: [/*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx(Label, {
              htmlFor: "cityName",
              children: "City Name"
            }), /*#__PURE__*/_jsx(Input, {
              id: "cityName",
              value: newCity.cityName,
              onChange: e => setNewCity({
                ...newCity,
                cityName: e.target.value
              }),
              placeholder: "e.g., Pune"
            })]
          }), /*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx(Label, {
              htmlFor: "stateName",
              children: "State Name"
            }), /*#__PURE__*/_jsx(Input, {
              id: "stateName",
              value: newCity.stateName,
              onChange: e => setNewCity({
                ...newCity,
                stateName: e.target.value
              }),
              placeholder: "e.g., Maharashtra"
            })]
          }), /*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx(Label, {
              htmlFor: "region",
              children: "Region"
            }), /*#__PURE__*/_jsxs(Select, {
              value: newCity.region,
              onValueChange: value => setNewCity({
                ...newCity,
                region: value
              }),
              children: [/*#__PURE__*/_jsx(SelectTrigger, {
                children: /*#__PURE__*/_jsx(SelectValue, {})
              }), /*#__PURE__*/_jsxs(SelectContent, {
                children: [/*#__PURE__*/_jsx(SelectItem, {
                  value: "North",
                  children: "North"
                }), /*#__PURE__*/_jsx(SelectItem, {
                  value: "South",
                  children: "South"
                }), /*#__PURE__*/_jsx(SelectItem, {
                  value: "East",
                  children: "East"
                }), /*#__PURE__*/_jsx(SelectItem, {
                  value: "West",
                  children: "West"
                })]
              })]
            })]
          }), /*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx(Label, {
              htmlFor: "status",
              children: "Status"
            }), /*#__PURE__*/_jsxs(Select, {
              value: newCity.status,
              onValueChange: value => setNewCity({
                ...newCity,
                status: value
              }),
              children: [/*#__PURE__*/_jsx(SelectTrigger, {
                children: /*#__PURE__*/_jsx(SelectValue, {})
              }), /*#__PURE__*/_jsxs(SelectContent, {
                children: [/*#__PURE__*/_jsx(SelectItem, {
                  value: "planning",
                  children: "Planning"
                }), /*#__PURE__*/_jsx(SelectItem, {
                  value: "active",
                  children: "Active"
                })]
              })]
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "md:col-span-2",
            children: [/*#__PURE__*/_jsx(Label, {
              htmlFor: "launchDate",
              children: "Launch Date"
            }), /*#__PURE__*/_jsx(Input, {
              id: "launchDate",
              type: "date",
              value: newCity.launchDate,
              onChange: e => setNewCity({
                ...newCity,
                launchDate: e.target.value
              })
            })]
          })]
        }), /*#__PURE__*/_jsxs(DialogFooter, {
          children: [/*#__PURE__*/_jsx(Button, {
            variant: "outline",
            onClick: () => setIsCreateDialogOpen(false),
            children: "Cancel"
          }), /*#__PURE__*/_jsx(Button, {
            children: "Add City"
          })]
        })]
      })
    })]
  });
};
export default AdminLocationCities;