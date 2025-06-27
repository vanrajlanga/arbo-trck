import { useState } from "react";
import { toast } from "sonner";
import { Search, FileEdit, CheckCircle, XCircle, AlertCircle, MoreHorizontal, Download, Filter, Eye, Ban } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// Mock data
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
const vendorsData = [{
  id: 1,
  name: "Mountain Explorers",
  owner: "Vikram Singh",
  contact: "+91 9823456780",
  email: "info@mountainexplorers.com",
  joinDate: "Jan 15, 2025",
  treks: 5,
  revenue: "₹145,000",
  status: "Active"
}, {
  id: 2,
  name: "Adventure Beyond",
  owner: "Ananya Sharma",
  contact: "+91 8745123690",
  email: "contact@adventurebeyond.in",
  joinDate: "Feb 3, 2025",
  treks: 3,
  revenue: "₹87,500",
  status: "Active"
}, {
  id: 3,
  name: "Trails & Peaks",
  owner: "Rahul Mehta",
  contact: "+91 9912345678",
  email: "info@trailspeaks.co.in",
  joinDate: "Mar 10, 2025",
  treks: 2,
  revenue: "₹62,000",
  status: "Pending"
}, {
  id: 4,
  name: "Himalayan Journeys",
  owner: "Priya Kapoor",
  contact: "+91 8876543210",
  email: "support@himalayanjourney.com",
  joinDate: "Mar 22, 2025",
  treks: 0,
  revenue: "₹0",
  status: "Under Review"
}, {
  id: 5,
  name: "Summit Seekers",
  owner: "Arjun Patel",
  contact: "+91 7789012345",
  email: "info@summitseekers.net",
  joinDate: "Apr 5, 2025",
  treks: 0,
  revenue: "₹0",
  status: "Under Review"
}, {
  id: 6,
  name: "Wild Wanderers",
  owner: "Maya Reddy",
  contact: "+91 9988776655",
  email: "admin@wildwanderers.com",
  joinDate: "Apr 8, 2025",
  treks: 0,
  revenue: "₹0",
  status: "New"
}, {
  id: 7,
  name: "Trek Masters",
  owner: "Karthik Iyer",
  contact: "+91 8123456789",
  email: "hello@trekmasters.in",
  joinDate: "Jan 30, 2025",
  treks: 4,
  revenue: "₹92,500",
  status: "Active"
}, {
  id: 8,
  name: "Valley Voyagers",
  owner: "Neha Gupta",
  contact: "+91 9765432180",
  email: "bookings@valleyvoyagers.com",
  joinDate: "Feb 15, 2025",
  treks: 3,
  revenue: "₹78,000",
  status: "Active"
}, {
  id: 9,
  name: "Outdoor Odyssey",
  owner: "Rohan Joshi",
  contact: "+91 7712345678",
  email: "info@outdoorodyssey.co.in",
  joinDate: "Mar 18, 2025",
  treks: 1,
  revenue: "₹28,500",
  status: "Suspended"
}];
const AdminVendors = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [viewDetailsOpen, setViewDetailsOpen] = useState(false);
  const handleApproveVendor = vendorId => {
    // In a real app, make API call to approve vendor
    toast.success("Vendor approved successfully");
  };
  const handleRejectVendor = vendorId => {
    // In a real app, make API call to reject vendor
    toast.success("Vendor application rejected");
  };
  const handleSuspendVendor = vendorId => {
    // In a real app, make API call to suspend vendor
    toast.success("Vendor account suspended");
  };
  const handleReactivateVendor = vendorId => {
    // In a real app, make API call to reactivate vendor
    toast.success("Vendor account reactivated");
  };
  const handleViewDetails = vendor => {
    setSelectedVendor(vendor);
    setViewDetailsOpen(true);
  };

  // Filter vendors based on search term and status
  const filteredVendors = vendorsData.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) || vendor.email.toLowerCase().includes(searchTerm.toLowerCase()) || vendor.owner.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || vendor.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });
  return /*#__PURE__*/_jsxs("div", {
    children: [/*#__PURE__*/_jsxs("div", {
      className: "flex flex-col md:flex-row items-start md:items-center justify-between mb-8",
      children: [/*#__PURE__*/_jsx("h1", {
        className: "text-2xl font-bold",
        children: "Vendor Management"
      }), /*#__PURE__*/_jsxs("div", {
        className: "flex flex-col sm:flex-row gap-2 mt-4 md:mt-0",
        children: [/*#__PURE__*/_jsxs(Button, {
          variant: "outline",
          children: [/*#__PURE__*/_jsx(Filter, {
            className: "mr-2 h-4 w-4"
          }), "Advanced Filters"]
        }), /*#__PURE__*/_jsxs(Button, {
          variant: "outline",
          children: [/*#__PURE__*/_jsx(Download, {
            className: "mr-2 h-4 w-4"
          }), "Export"]
        })]
      })]
    }), /*#__PURE__*/_jsxs("div", {
      className: "mb-6 flex flex-col sm:flex-row gap-4",
      children: [/*#__PURE__*/_jsxs("div", {
        className: "flex-1 relative",
        children: [/*#__PURE__*/_jsx(Search, {
          className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500"
        }), /*#__PURE__*/_jsx(Input, {
          placeholder: "Search vendors by name, email, or owner...",
          className: "pl-9",
          value: searchTerm,
          onChange: e => setSearchTerm(e.target.value)
        })]
      }), /*#__PURE__*/_jsxs(Select, {
        value: statusFilter,
        onValueChange: setStatusFilter,
        children: [/*#__PURE__*/_jsx(SelectTrigger, {
          className: "w-full sm:w-[180px]",
          children: /*#__PURE__*/_jsx(SelectValue, {
            placeholder: "Filter by status"
          })
        }), /*#__PURE__*/_jsxs(SelectContent, {
          children: [/*#__PURE__*/_jsx(SelectItem, {
            value: "all",
            children: "All Vendors"
          }), /*#__PURE__*/_jsx(SelectItem, {
            value: "active",
            children: "Active"
          }), /*#__PURE__*/_jsx(SelectItem, {
            value: "pending",
            children: "Pending"
          }), /*#__PURE__*/_jsx(SelectItem, {
            value: "new",
            children: "New"
          }), /*#__PURE__*/_jsx(SelectItem, {
            value: "under review",
            children: "Under Review"
          }), /*#__PURE__*/_jsx(SelectItem, {
            value: "suspended",
            children: "Suspended"
          })]
        })]
      })]
    }), /*#__PURE__*/_jsxs(Card, {
      children: [/*#__PURE__*/_jsxs(CardHeader, {
        children: [/*#__PURE__*/_jsx(CardTitle, {
          children: "Vendors"
        }), /*#__PURE__*/_jsx(CardDescription, {
          children: "Manage all vendors registered on the platform"
        })]
      }), /*#__PURE__*/_jsx(CardContent, {
        children: filteredVendors.length > 0 ? /*#__PURE__*/_jsxs(Table, {
          children: [/*#__PURE__*/_jsx(TableHeader, {
            children: /*#__PURE__*/_jsxs(TableRow, {
              children: [/*#__PURE__*/_jsx(TableHead, {
                children: "Vendor Name"
              }), /*#__PURE__*/_jsx(TableHead, {
                children: "Owner"
              }), /*#__PURE__*/_jsx(TableHead, {
                className: "hidden md:table-cell",
                children: "Email"
              }), /*#__PURE__*/_jsx(TableHead, {
                className: "hidden md:table-cell",
                children: "Join Date"
              }), /*#__PURE__*/_jsx(TableHead, {
                className: "hidden lg:table-cell",
                children: "Treks"
              }), /*#__PURE__*/_jsx(TableHead, {
                className: "hidden lg:table-cell",
                children: "Revenue"
              }), /*#__PURE__*/_jsx(TableHead, {
                children: "Status"
              }), /*#__PURE__*/_jsx(TableHead, {
                className: "text-right",
                children: "Actions"
              })]
            })
          }), /*#__PURE__*/_jsx(TableBody, {
            children: filteredVendors.map(vendor => /*#__PURE__*/_jsxs(TableRow, {
              children: [/*#__PURE__*/_jsx(TableCell, {
                className: "font-medium",
                children: vendor.name
              }), /*#__PURE__*/_jsx(TableCell, {
                children: vendor.owner
              }), /*#__PURE__*/_jsx(TableCell, {
                className: "hidden md:table-cell",
                children: vendor.email
              }), /*#__PURE__*/_jsx(TableCell, {
                className: "hidden md:table-cell",
                children: vendor.joinDate
              }), /*#__PURE__*/_jsx(TableCell, {
                className: "hidden lg:table-cell",
                children: vendor.treks
              }), /*#__PURE__*/_jsx(TableCell, {
                className: "hidden lg:table-cell",
                children: vendor.revenue
              }), /*#__PURE__*/_jsx(TableCell, {
                children: /*#__PURE__*/_jsxs("div", {
                  className: "flex items-center",
                  children: [vendor.status === "Active" && /*#__PURE__*/_jsxs("span", {
                    className: "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800",
                    children: [/*#__PURE__*/_jsx(CheckCircle, {
                      className: "mr-1 h-3 w-3"
                    }), " Active"]
                  }), vendor.status === "Pending" && /*#__PURE__*/_jsxs("span", {
                    className: "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800",
                    children: [/*#__PURE__*/_jsx(AlertCircle, {
                      className: "mr-1 h-3 w-3"
                    }), " Pending"]
                  }), vendor.status === "New" && /*#__PURE__*/_jsx("span", {
                    className: "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-800",
                    children: "New"
                  }), vendor.status === "Under Review" && /*#__PURE__*/_jsx("span", {
                    className: "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-purple-100 text-purple-800",
                    children: "Under Review"
                  }), vendor.status === "Suspended" && /*#__PURE__*/_jsxs("span", {
                    className: "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-red-100 text-red-800",
                    children: [/*#__PURE__*/_jsx(XCircle, {
                      className: "mr-1 h-3 w-3"
                    }), " Suspended"]
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
                    children: [/*#__PURE__*/_jsxs(DropdownMenuItem, {
                      onClick: () => handleViewDetails(vendor),
                      children: [/*#__PURE__*/_jsx(Eye, {
                        className: "mr-2 h-4 w-4"
                      }), " View Details"]
                    }), /*#__PURE__*/_jsxs(DropdownMenuItem, {
                      children: [/*#__PURE__*/_jsx(FileEdit, {
                        className: "mr-2 h-4 w-4"
                      }), " Edit"]
                    }), /*#__PURE__*/_jsx(DropdownMenuSeparator, {}), (vendor.status === "New" || vendor.status === "Pending" || vendor.status === "Under Review") && /*#__PURE__*/_jsxs(_Fragment, {
                      children: [/*#__PURE__*/_jsxs(DropdownMenuItem, {
                        onClick: () => handleApproveVendor(vendor.id),
                        children: [/*#__PURE__*/_jsx(CheckCircle, {
                          className: "mr-2 h-4 w-4"
                        }), " Approve"]
                      }), /*#__PURE__*/_jsxs(DropdownMenuItem, {
                        onClick: () => handleRejectVendor(vendor.id),
                        children: [/*#__PURE__*/_jsx(XCircle, {
                          className: "mr-2 h-4 w-4"
                        }), " Reject"]
                      })]
                    }), vendor.status === "Active" && /*#__PURE__*/_jsxs(AlertDialog, {
                      children: [/*#__PURE__*/_jsx(AlertDialogTrigger, {
                        asChild: true,
                        children: /*#__PURE__*/_jsxs(DropdownMenuItem, {
                          onSelect: e => e.preventDefault(),
                          children: [/*#__PURE__*/_jsx(Ban, {
                            className: "mr-2 h-4 w-4"
                          }), " Suspend"]
                        })
                      }), /*#__PURE__*/_jsxs(AlertDialogContent, {
                        children: [/*#__PURE__*/_jsxs(AlertDialogHeader, {
                          children: [/*#__PURE__*/_jsx(AlertDialogTitle, {
                            children: "Suspend Vendor Account?"
                          }), /*#__PURE__*/_jsxs(AlertDialogDescription, {
                            children: ["This will immediately suspend ", vendor.name, "'s account and all their active treks. They will not be able to accept new bookings until reactivated."]
                          })]
                        }), /*#__PURE__*/_jsxs(AlertDialogFooter, {
                          children: [/*#__PURE__*/_jsx(AlertDialogCancel, {
                            children: "Cancel"
                          }), /*#__PURE__*/_jsx(AlertDialogAction, {
                            onClick: () => handleSuspendVendor(vendor.id),
                            className: "bg-red-600 hover:bg-red-700",
                            children: "Suspend"
                          })]
                        })]
                      })]
                    }), vendor.status === "Suspended" && /*#__PURE__*/_jsxs(DropdownMenuItem, {
                      onClick: () => handleReactivateVendor(vendor.id),
                      children: [/*#__PURE__*/_jsx(CheckCircle, {
                        className: "mr-2 h-4 w-4"
                      }), " Reactivate"]
                    })]
                  })]
                })
              })]
            }, vendor.id))
          })]
        }) : /*#__PURE__*/_jsx("div", {
          className: "flex flex-col items-center justify-center py-10",
          children: /*#__PURE__*/_jsxs("div", {
            className: "text-center",
            children: [/*#__PURE__*/_jsx(Search, {
              className: "mx-auto h-12 w-12 text-gray-400"
            }), /*#__PURE__*/_jsx("h3", {
              className: "mt-2 text-lg font-medium",
              children: "No vendors found"
            }), /*#__PURE__*/_jsx("p", {
              className: "mt-1 text-sm text-gray-500",
              children: "Try adjusting your search or filter to find what you're looking for."
            })]
          })
        })
      })]
    }), selectedVendor && /*#__PURE__*/_jsx(Dialog, {
      open: viewDetailsOpen,
      onOpenChange: setViewDetailsOpen,
      children: /*#__PURE__*/_jsxs(DialogContent, {
        className: "sm:max-w-[625px]",
        children: [/*#__PURE__*/_jsxs(DialogHeader, {
          children: [/*#__PURE__*/_jsx(DialogTitle, {
            children: "Vendor Details"
          }), /*#__PURE__*/_jsx(DialogDescription, {
            children: "View complete information about this vendor."
          })]
        }), /*#__PURE__*/_jsxs("div", {
          className: "grid gap-6 py-4",
          children: [/*#__PURE__*/_jsxs("div", {
            className: "flex justify-between items-center",
            children: [/*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx("h2", {
                className: "text-xl font-semibold",
                children: selectedVendor.name
              }), /*#__PURE__*/_jsxs("p", {
                className: "text-gray-500",
                children: ["Joined ", selectedVendor.joinDate]
              })]
            }), selectedVendor.status === "Active" ? /*#__PURE__*/_jsxs("span", {
              className: "inline-flex items-center rounded-full px-2.5 py-0.5 text-sm font-medium bg-green-100 text-green-800",
              children: [/*#__PURE__*/_jsx(CheckCircle, {
                className: "mr-1 h-4 w-4"
              }), " Active"]
            }) : selectedVendor.status === "Suspended" ? /*#__PURE__*/_jsxs("span", {
              className: "inline-flex items-center rounded-full px-2.5 py-0.5 text-sm font-medium bg-red-100 text-red-800",
              children: [/*#__PURE__*/_jsx(XCircle, {
                className: "mr-1 h-4 w-4"
              }), " Suspended"]
            }) : /*#__PURE__*/_jsxs("span", {
              className: "inline-flex items-center rounded-full px-2.5 py-0.5 text-sm font-medium bg-yellow-100 text-yellow-800",
              children: [/*#__PURE__*/_jsx(AlertCircle, {
                className: "mr-1 h-4 w-4"
              }), " ", selectedVendor.status]
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "grid grid-cols-2 gap-4",
            children: [/*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx("h3", {
                className: "text-sm font-medium text-gray-500",
                children: "Contact Information"
              }), /*#__PURE__*/_jsxs("div", {
                className: "mt-2 space-y-1",
                children: [/*#__PURE__*/_jsxs("p", {
                  children: [/*#__PURE__*/_jsx("span", {
                    className: "font-medium",
                    children: "Owner:"
                  }), " ", selectedVendor.owner]
                }), /*#__PURE__*/_jsxs("p", {
                  children: [/*#__PURE__*/_jsx("span", {
                    className: "font-medium",
                    children: "Email:"
                  }), " ", selectedVendor.email]
                }), /*#__PURE__*/_jsxs("p", {
                  children: [/*#__PURE__*/_jsx("span", {
                    className: "font-medium",
                    children: "Phone:"
                  }), " ", selectedVendor.contact]
                })]
              })]
            }), /*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx("h3", {
                className: "text-sm font-medium text-gray-500",
                children: "Performance Metrics"
              }), /*#__PURE__*/_jsxs("div", {
                className: "mt-2 space-y-1",
                children: [/*#__PURE__*/_jsxs("p", {
                  children: [/*#__PURE__*/_jsx("span", {
                    className: "font-medium",
                    children: "Active Treks:"
                  }), " ", selectedVendor.treks]
                }), /*#__PURE__*/_jsxs("p", {
                  children: [/*#__PURE__*/_jsx("span", {
                    className: "font-medium",
                    children: "Total Revenue:"
                  }), " ", selectedVendor.revenue]
                }), /*#__PURE__*/_jsxs("p", {
                  children: [/*#__PURE__*/_jsx("span", {
                    className: "font-medium",
                    children: "Rating:"
                  }), " 4.7/5 (23 reviews)"]
                })]
              })]
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "space-y-2",
            children: [/*#__PURE__*/_jsx("h3", {
              className: "text-sm font-medium text-gray-500",
              children: "Recent Activity"
            }), /*#__PURE__*/_jsxs("div", {
              className: "space-y-2 text-sm",
              children: [/*#__PURE__*/_jsxs("div", {
                className: "p-2 rounded bg-gray-50",
                children: [/*#__PURE__*/_jsx("p", {
                  className: "font-medium",
                  children: "Trek Added: Wayanad Wildlife Trek"
                }), /*#__PURE__*/_jsx("p", {
                  className: "text-gray-500",
                  children: "Apr 12, 2025"
                })]
              }), /*#__PURE__*/_jsxs("div", {
                className: "p-2 rounded bg-gray-50",
                children: [/*#__PURE__*/_jsx("p", {
                  className: "font-medium",
                  children: "New Booking: TBR5682"
                }), /*#__PURE__*/_jsx("p", {
                  className: "text-gray-500",
                  children: "Apr 8, 2025"
                })]
              }), /*#__PURE__*/_jsxs("div", {
                className: "p-2 rounded bg-gray-50",
                children: [/*#__PURE__*/_jsx("p", {
                  className: "font-medium",
                  children: "Profile Updated"
                }), /*#__PURE__*/_jsx("p", {
                  className: "text-gray-500",
                  children: "Apr 2, 2025"
                })]
              })]
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "space-y-2",
            children: [/*#__PURE__*/_jsx("h3", {
              className: "text-sm font-medium text-gray-500",
              children: "Documents"
            }), /*#__PURE__*/_jsxs("div", {
              className: "grid grid-cols-2 gap-2",
              children: [/*#__PURE__*/_jsxs("div", {
                className: "p-2 rounded border flex justify-between items-center",
                children: [/*#__PURE__*/_jsx("span", {
                  children: "Business Registration"
                }), /*#__PURE__*/_jsx(Button, {
                  variant: "outline",
                  size: "sm",
                  children: "View"
                })]
              }), /*#__PURE__*/_jsxs("div", {
                className: "p-2 rounded border flex justify-between items-center",
                children: [/*#__PURE__*/_jsx("span", {
                  children: "GST Certificate"
                }), /*#__PURE__*/_jsx(Button, {
                  variant: "outline",
                  size: "sm",
                  children: "View"
                })]
              }), /*#__PURE__*/_jsxs("div", {
                className: "p-2 rounded border flex justify-between items-center",
                children: [/*#__PURE__*/_jsx("span", {
                  children: "ID Proof"
                }), /*#__PURE__*/_jsx(Button, {
                  variant: "outline",
                  size: "sm",
                  children: "View"
                })]
              }), /*#__PURE__*/_jsxs("div", {
                className: "p-2 rounded border flex justify-between items-center",
                children: [/*#__PURE__*/_jsx("span", {
                  children: "Bank Details"
                }), /*#__PURE__*/_jsx(Button, {
                  variant: "outline",
                  size: "sm",
                  children: "View"
                })]
              })]
            })]
          })]
        }), /*#__PURE__*/_jsxs(DialogFooter, {
          children: [/*#__PURE__*/_jsx(Button, {
            variant: "outline",
            onClick: () => setViewDetailsOpen(false),
            children: "Close"
          }), selectedVendor.status === "Active" ? /*#__PURE__*/_jsx(Button, {
            variant: "destructive",
            children: "Suspend Vendor"
          }) : selectedVendor.status === "Suspended" ? /*#__PURE__*/_jsx(Button, {
            className: "bg-green-600 hover:bg-green-700",
            children: "Reactivate Vendor"
          }) : /*#__PURE__*/_jsx(Button, {
            className: "bg-blue-600 hover:bg-blue-700",
            children: "Approve Vendor"
          })]
        })]
      })
    })]
  });
};
export default AdminVendors;