import { useState } from "react";
import { Search, Plus, Users, Building2, MapPin, Star, CheckCircle, MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

// Mock data for coupon assignments
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const couponAssignments = [{
  id: "ASG001",
  couponCode: "SAVE20",
  couponDescription: "20% off on all treks",
  assignedVendors: [{
    id: "V001",
    name: "Mountain Adventures",
    location: "Manali",
    rating: 4.8
  }, {
    id: "V002",
    name: "Himalayan Expeditions",
    location: "Dehradun",
    rating: 4.6
  }, {
    id: "V003",
    name: "Trek Masters",
    location: "Rishikesh",
    rating: 4.7
  }],
  totalVendors: 3,
  assignmentDate: "2025-05-15",
  status: "active",
  usageCount: 145,
  expiryDate: "2025-06-15"
}, {
  id: "ASG002",
  couponCode: "FIRST500",
  couponDescription: "₹500 off for first-time users",
  assignedVendors: [{
    id: "V004",
    name: "Adventure Seekers",
    location: "Shimla",
    rating: 4.5
  }, {
    id: "V005",
    name: "Peak Climbers",
    location: "Uttarkashi",
    rating: 4.9
  }],
  totalVendors: 2,
  assignmentDate: "2025-05-10",
  status: "active",
  usageCount: 89,
  expiryDate: "2025-12-31"
}];

// Mock data for available vendors
const availableVendors = [{
  id: "V006",
  name: "Wild Trails",
  location: "Manali",
  rating: 4.6,
  trekCount: 25
}, {
  id: "V007",
  name: "Summit Adventures",
  location: "Leh",
  rating: 4.8,
  trekCount: 18
}, {
  id: "V008",
  name: "Valley Explorers",
  location: "Kasol",
  rating: 4.4,
  trekCount: 32
}, {
  id: "V009",
  name: "High Altitude Tours",
  location: "Gangotri",
  rating: 4.7,
  trekCount: 15
}];

// Mock data for available coupons
const availableCoupons = [{
  id: "CUP001",
  code: "SUMMER30",
  description: "Summer special 30% discount"
}, {
  id: "CUP002",
  code: "MONSOON25",
  description: "Monsoon special 25% off"
}, {
  id: "CUP003",
  code: "WEEKEND15",
  description: "Weekend getaway 15% discount"
}];
const AdminCouponAssign = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAssignOpen, setIsAssignOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState("");
  const [selectedVendors, setSelectedVendors] = useState([]);
  const filteredAssignments = couponAssignments.filter(assignment => assignment.couponCode.toLowerCase().includes(searchQuery.toLowerCase()) || assignment.couponDescription.toLowerCase().includes(searchQuery.toLowerCase()));
  const getStatusColor = status => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      case "expired":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  const handleVendorSelection = (vendorId, checked) => {
    if (checked) {
      setSelectedVendors([...selectedVendors, vendorId]);
    } else {
      setSelectedVendors(selectedVendors.filter(id => id !== vendorId));
    }
  };
  const handleAssignCoupon = () => {
    console.log("Assigning coupon:", selectedCoupon, "to vendors:", selectedVendors);
    setIsAssignOpen(false);
    setSelectedCoupon("");
    setSelectedVendors([]);
  };
  return /*#__PURE__*/_jsxs("div", {
    children: [/*#__PURE__*/_jsxs("div", {
      className: "flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8",
      children: [/*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx("h1", {
          className: "text-2xl font-bold",
          children: "Assign Coupons to Vendors"
        }), /*#__PURE__*/_jsx("p", {
          className: "text-gray-500",
          children: "Manage coupon assignments to specific vendors"
        })]
      }), /*#__PURE__*/_jsxs(Dialog, {
        open: isAssignOpen,
        onOpenChange: setIsAssignOpen,
        children: [/*#__PURE__*/_jsx(DialogTrigger, {
          asChild: true,
          children: /*#__PURE__*/_jsxs(Button, {
            children: [/*#__PURE__*/_jsx(Plus, {
              className: "mr-2 h-4 w-4"
            }), "Assign Coupon"]
          })
        }), /*#__PURE__*/_jsxs(DialogContent, {
          className: "max-w-2xl",
          children: [/*#__PURE__*/_jsxs(DialogHeader, {
            children: [/*#__PURE__*/_jsx(DialogTitle, {
              children: "Assign Coupon to Vendors"
            }), /*#__PURE__*/_jsx(DialogDescription, {
              children: "Select a coupon and vendors to create a new assignment"
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "space-y-6",
            children: [/*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx(Label, {
                htmlFor: "coupon",
                children: "Select Coupon"
              }), /*#__PURE__*/_jsxs(Select, {
                value: selectedCoupon,
                onValueChange: setSelectedCoupon,
                children: [/*#__PURE__*/_jsx(SelectTrigger, {
                  children: /*#__PURE__*/_jsx(SelectValue, {
                    placeholder: "Choose a coupon"
                  })
                }), /*#__PURE__*/_jsx(SelectContent, {
                  children: availableCoupons.map(coupon => /*#__PURE__*/_jsx(SelectItem, {
                    value: coupon.id,
                    children: /*#__PURE__*/_jsxs("div", {
                      children: [/*#__PURE__*/_jsx("div", {
                        className: "font-medium",
                        children: coupon.code
                      }), /*#__PURE__*/_jsx("div", {
                        className: "text-sm text-gray-500",
                        children: coupon.description
                      })]
                    })
                  }, coupon.id))
                })]
              })]
            }), /*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx(Label, {
                children: "Select Vendors"
              }), /*#__PURE__*/_jsx("div", {
                className: "mt-2 max-h-60 overflow-y-auto border rounded-md p-4",
                children: availableVendors.map(vendor => /*#__PURE__*/_jsxs("div", {
                  className: "flex items-center space-x-3 py-2",
                  children: [/*#__PURE__*/_jsx(Checkbox, {
                    id: vendor.id,
                    checked: selectedVendors.includes(vendor.id),
                    onCheckedChange: checked => handleVendorSelection(vendor.id, checked)
                  }), /*#__PURE__*/_jsx("label", {
                    htmlFor: vendor.id,
                    className: "flex-1 cursor-pointer",
                    children: /*#__PURE__*/_jsxs("div", {
                      className: "flex items-center justify-between",
                      children: [/*#__PURE__*/_jsxs("div", {
                        children: [/*#__PURE__*/_jsx("div", {
                          className: "font-medium",
                          children: vendor.name
                        }), /*#__PURE__*/_jsxs("div", {
                          className: "text-sm text-gray-500 flex items-center gap-2",
                          children: [/*#__PURE__*/_jsx(MapPin, {
                            className: "h-3 w-3"
                          }), vendor.location, /*#__PURE__*/_jsx("span", {
                            children: "\u2022"
                          }), vendor.trekCount, " treks"]
                        })]
                      }), /*#__PURE__*/_jsxs("div", {
                        className: "flex items-center gap-1",
                        children: [/*#__PURE__*/_jsx(Star, {
                          className: "h-4 w-4 text-yellow-500 fill-current"
                        }), /*#__PURE__*/_jsx("span", {
                          className: "text-sm",
                          children: vendor.rating
                        })]
                      })]
                    })
                  })]
                }, vendor.id))
              })]
            }), /*#__PURE__*/_jsxs(Button, {
              onClick: handleAssignCoupon,
              className: "w-full",
              disabled: !selectedCoupon || selectedVendors.length === 0,
              children: ["Assign to ", selectedVendors.length, " Vendor", selectedVendors.length !== 1 ? 's' : '']
            })]
          })]
        })]
      })]
    }), /*#__PURE__*/_jsxs("div", {
      className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8",
      children: [/*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsxs(CardHeader, {
          className: "flex flex-row items-center justify-between pb-2",
          children: [/*#__PURE__*/_jsx(CardTitle, {
            className: "text-sm font-medium",
            children: "Active Assignments"
          }), /*#__PURE__*/_jsx(CheckCircle, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "15"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-xs text-muted-foreground",
            children: "Currently active"
          })]
        })]
      }), /*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsxs(CardHeader, {
          className: "flex flex-row items-center justify-between pb-2",
          children: [/*#__PURE__*/_jsx(CardTitle, {
            className: "text-sm font-medium",
            children: "Total Vendors"
          }), /*#__PURE__*/_jsx(Building2, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "28"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-xs text-muted-foreground",
            children: "With coupon access"
          })]
        })]
      }), /*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsxs(CardHeader, {
          className: "flex flex-row items-center justify-between pb-2",
          children: [/*#__PURE__*/_jsx(CardTitle, {
            className: "text-sm font-medium",
            children: "Total Usage"
          }), /*#__PURE__*/_jsx(Users, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "1,234"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-xs text-muted-foreground",
            children: "Coupon redemptions"
          })]
        })]
      }), /*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsxs(CardHeader, {
          className: "flex flex-row items-center justify-between pb-2",
          children: [/*#__PURE__*/_jsx(CardTitle, {
            className: "text-sm font-medium",
            children: "Avg Usage Rate"
          }), /*#__PURE__*/_jsx(Star, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "68%"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-xs text-muted-foreground",
            children: "Per assignment"
          })]
        })]
      })]
    }), /*#__PURE__*/_jsxs(Card, {
      children: [/*#__PURE__*/_jsxs(CardHeader, {
        children: [/*#__PURE__*/_jsx(CardTitle, {
          children: "Coupon Assignments"
        }), /*#__PURE__*/_jsx(CardDescription, {
          children: "View and manage coupon assignments to vendors"
        })]
      }), /*#__PURE__*/_jsxs(CardContent, {
        children: [/*#__PURE__*/_jsx("div", {
          className: "flex flex-col lg:flex-row gap-4 mb-6",
          children: /*#__PURE__*/_jsxs("div", {
            className: "relative flex-1",
            children: [/*#__PURE__*/_jsx(Search, {
              className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4"
            }), /*#__PURE__*/_jsx(Input, {
              placeholder: "Search assignments...",
              value: searchQuery,
              onChange: e => setSearchQuery(e.target.value),
              className: "pl-10"
            })]
          })
        }), /*#__PURE__*/_jsx("div", {
          className: "overflow-x-auto",
          children: /*#__PURE__*/_jsxs(Table, {
            children: [/*#__PURE__*/_jsx(TableHeader, {
              children: /*#__PURE__*/_jsxs(TableRow, {
                children: [/*#__PURE__*/_jsx(TableHead, {
                  children: "Coupon Details"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Assigned Vendors"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Assignment Info"
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
              children: filteredAssignments.map(assignment => /*#__PURE__*/_jsxs(TableRow, {
                children: [/*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsxs("div", {
                    children: [/*#__PURE__*/_jsx("div", {
                      className: "font-medium text-lg",
                      children: assignment.couponCode
                    }), /*#__PURE__*/_jsx("div", {
                      className: "text-sm text-gray-500 max-w-xs",
                      children: assignment.couponDescription
                    })]
                  })
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsxs("div", {
                    children: [/*#__PURE__*/_jsxs("div", {
                      className: "font-medium mb-2",
                      children: [assignment.totalVendors, " Vendors"]
                    }), /*#__PURE__*/_jsxs("div", {
                      className: "space-y-1",
                      children: [assignment.assignedVendors.slice(0, 2).map(vendor => /*#__PURE__*/_jsxs("div", {
                        className: "text-sm text-gray-600 flex items-center gap-2",
                        children: [/*#__PURE__*/_jsx(Building2, {
                          className: "h-3 w-3"
                        }), vendor.name, /*#__PURE__*/_jsxs("span", {
                          className: "text-xs text-gray-400",
                          children: ["(", vendor.location, ")"]
                        })]
                      }, vendor.id)), assignment.assignedVendors.length > 2 && /*#__PURE__*/_jsxs("div", {
                        className: "text-xs text-gray-400",
                        children: ["+", assignment.assignedVendors.length - 2, " more vendors"]
                      })]
                    })]
                  })
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsxs("div", {
                    children: [/*#__PURE__*/_jsxs("div", {
                      className: "text-sm",
                      children: [/*#__PURE__*/_jsx("span", {
                        className: "font-medium",
                        children: "Assigned:"
                      }), " ", assignment.assignmentDate]
                    }), /*#__PURE__*/_jsxs("div", {
                      className: "text-sm",
                      children: [/*#__PURE__*/_jsx("span", {
                        className: "font-medium",
                        children: "Expires:"
                      }), " ", assignment.expiryDate]
                    })]
                  })
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsxs("div", {
                    children: [/*#__PURE__*/_jsxs("div", {
                      className: "font-medium text-green-600",
                      children: [assignment.usageCount, " uses"]
                    }), /*#__PURE__*/_jsxs("div", {
                      className: "text-sm text-gray-500",
                      children: ["Avg rating: ", (assignment.assignedVendors.reduce((acc, v) => acc + v.rating, 0) / assignment.assignedVendors.length).toFixed(1)]
                    })]
                  })
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsx(Badge, {
                    className: getStatusColor(assignment.status),
                    children: assignment.status
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
                        children: [/*#__PURE__*/_jsx(Edit, {
                          className: "mr-2 h-4 w-4"
                        }), "Edit Assignment"]
                      }), /*#__PURE__*/_jsxs(DropdownMenuItem, {
                        children: [/*#__PURE__*/_jsx(Users, {
                          className: "mr-2 h-4 w-4"
                        }), "Manage Vendors"]
                      }), /*#__PURE__*/_jsx(DropdownMenuSeparator, {}), /*#__PURE__*/_jsxs(DropdownMenuItem, {
                        className: "text-red-600",
                        children: [/*#__PURE__*/_jsx(Trash2, {
                          className: "mr-2 h-4 w-4"
                        }), "Remove Assignment"]
                      })]
                    })]
                  })
                })]
              }, assignment.id))
            })]
          })
        })]
      })]
    })]
  });
};
export default AdminCouponAssign;