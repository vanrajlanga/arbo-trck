import { useState } from "react";
import { Search, Plus, MoreHorizontal, Edit, Trash2, DollarSign, TrendingUp, Users, Calculator } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock data for vendor commissions
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const commissionData = [{
  id: "COM001",
  vendorId: "VEN001",
  vendorName: "Adventure Trek Co.",
  category: "mountain",
  commissionType: "percentage",
  commissionRate: 15,
  minimumAmount: 1000,
  maximumAmount: null,
  totalBookings: 245,
  totalRevenue: 2450000,
  commissionEarned: 367500,
  status: "active",
  effectiveFrom: "2025-01-01",
  lastUpdated: "2025-05-15"
}, {
  id: "COM002",
  vendorId: "VEN002",
  vendorName: "Mountain Explorers",
  category: "adventure",
  commissionType: "fixed",
  commissionRate: 500,
  minimumAmount: 2000,
  maximumAmount: 10000,
  totalBookings: 189,
  totalRevenue: 1890000,
  commissionEarned: 94500,
  status: "active",
  effectiveFrom: "2025-02-01",
  lastUpdated: "2025-06-01"
}, {
  id: "COM003",
  vendorId: "VEN003",
  vendorName: "Himalayan Adventures",
  category: "trekking",
  commissionType: "tiered",
  commissionRate: 12,
  minimumAmount: 500,
  maximumAmount: null,
  totalBookings: 156,
  totalRevenue: 1560000,
  commissionEarned: 187200,
  status: "inactive",
  effectiveFrom: "2025-01-15",
  lastUpdated: "2025-05-20"
}];
const AdminVendorCommission = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newCommission, setNewCommission] = useState({
    vendorName: "",
    category: "",
    commissionType: "percentage",
    commissionRate: 0,
    minimumAmount: 0,
    maximumAmount: null,
    effectiveFrom: ""
  });
  const filteredCommissions = commissionData.filter(commission => {
    const matchesSearch = commission.vendorName.toLowerCase().includes(searchQuery.toLowerCase()) || commission.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || commission.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  const getStatusColor = status => {
    switch (status) {
      case "active":
        return "default";
      case "inactive":
        return "secondary";
      case "pending":
        return "outline";
      default:
        return "default";
    }
  };
  const formatCurrency = amount => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };
  const formatCommissionRate = (type, rate) => {
    if (type === "percentage") {
      return `${rate}%`;
    } else if (type === "fixed") {
      return formatCurrency(rate);
    }
    return `${rate}%`;
  };
  return /*#__PURE__*/_jsxs("div", {
    children: [/*#__PURE__*/_jsxs("div", {
      className: "flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8",
      children: [/*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx("h1", {
          className: "text-2xl font-bold",
          children: "Commission Settings"
        }), /*#__PURE__*/_jsx("p", {
          className: "text-gray-500",
          children: "Manage vendor commission rates and structures"
        })]
      }), /*#__PURE__*/_jsxs(Dialog, {
        open: isCreateOpen,
        onOpenChange: setIsCreateOpen,
        children: [/*#__PURE__*/_jsx(DialogTrigger, {
          asChild: true,
          children: /*#__PURE__*/_jsxs(Button, {
            children: [/*#__PURE__*/_jsx(Plus, {
              className: "mr-2 h-4 w-4"
            }), "Add Commission Rule"]
          })
        }), /*#__PURE__*/_jsxs(DialogContent, {
          className: "max-w-md",
          children: [/*#__PURE__*/_jsxs(DialogHeader, {
            children: [/*#__PURE__*/_jsx(DialogTitle, {
              children: "Add Commission Rule"
            }), /*#__PURE__*/_jsx(DialogDescription, {
              children: "Create a new commission structure for a vendor"
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "space-y-4",
            children: [/*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx(Label, {
                htmlFor: "vendor",
                children: "Vendor"
              }), /*#__PURE__*/_jsxs(Select, {
                value: newCommission.vendorName,
                onValueChange: value => setNewCommission({
                  ...newCommission,
                  vendorName: value
                }),
                children: [/*#__PURE__*/_jsx(SelectTrigger, {
                  children: /*#__PURE__*/_jsx(SelectValue, {
                    placeholder: "Select vendor"
                  })
                }), /*#__PURE__*/_jsxs(SelectContent, {
                  children: [/*#__PURE__*/_jsx(SelectItem, {
                    value: "Adventure Trek Co.",
                    children: "Adventure Trek Co."
                  }), /*#__PURE__*/_jsx(SelectItem, {
                    value: "Mountain Explorers",
                    children: "Mountain Explorers"
                  }), /*#__PURE__*/_jsx(SelectItem, {
                    value: "Himalayan Adventures",
                    children: "Himalayan Adventures"
                  })]
                })]
              })]
            }), /*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx(Label, {
                htmlFor: "category",
                children: "Category"
              }), /*#__PURE__*/_jsxs(Select, {
                value: newCommission.category,
                onValueChange: value => setNewCommission({
                  ...newCommission,
                  category: value
                }),
                children: [/*#__PURE__*/_jsx(SelectTrigger, {
                  children: /*#__PURE__*/_jsx(SelectValue, {
                    placeholder: "Select category"
                  })
                }), /*#__PURE__*/_jsxs(SelectContent, {
                  children: [/*#__PURE__*/_jsx(SelectItem, {
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
              })]
            }), /*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx(Label, {
                htmlFor: "type",
                children: "Commission Type"
              }), /*#__PURE__*/_jsxs(Select, {
                value: newCommission.commissionType,
                onValueChange: value => setNewCommission({
                  ...newCommission,
                  commissionType: value
                }),
                children: [/*#__PURE__*/_jsx(SelectTrigger, {
                  children: /*#__PURE__*/_jsx(SelectValue, {})
                }), /*#__PURE__*/_jsxs(SelectContent, {
                  children: [/*#__PURE__*/_jsx(SelectItem, {
                    value: "percentage",
                    children: "Percentage"
                  }), /*#__PURE__*/_jsx(SelectItem, {
                    value: "fixed",
                    children: "Fixed Amount"
                  }), /*#__PURE__*/_jsx(SelectItem, {
                    value: "tiered",
                    children: "Tiered"
                  })]
                })]
              })]
            }), /*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx(Label, {
                htmlFor: "rate",
                children: "Commission Rate"
              }), /*#__PURE__*/_jsx(Input, {
                id: "rate",
                type: "number",
                value: newCommission.commissionRate,
                onChange: e => setNewCommission({
                  ...newCommission,
                  commissionRate: Number(e.target.value)
                }),
                placeholder: newCommission.commissionType === "percentage" ? "15" : "500"
              })]
            }), /*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx(Label, {
                htmlFor: "minAmount",
                children: "Minimum Amount"
              }), /*#__PURE__*/_jsx(Input, {
                id: "minAmount",
                type: "number",
                value: newCommission.minimumAmount,
                onChange: e => setNewCommission({
                  ...newCommission,
                  minimumAmount: Number(e.target.value)
                }),
                placeholder: "1000"
              })]
            }), /*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx(Label, {
                htmlFor: "effectiveFrom",
                children: "Effective From"
              }), /*#__PURE__*/_jsx(Input, {
                id: "effectiveFrom",
                type: "date",
                value: newCommission.effectiveFrom,
                onChange: e => setNewCommission({
                  ...newCommission,
                  effectiveFrom: e.target.value
                })
              })]
            }), /*#__PURE__*/_jsx(Button, {
              onClick: () => setIsCreateOpen(false),
              className: "w-full",
              children: "Create Commission Rule"
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
            children: "Total Commission Paid"
          }), /*#__PURE__*/_jsx(DollarSign, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "\u20B96,49,200"
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
            children: "Active Vendors"
          }), /*#__PURE__*/_jsx(Users, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "18"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-xs text-muted-foreground",
            children: "With commission rules"
          })]
        })]
      }), /*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsxs(CardHeader, {
          className: "flex flex-row items-center justify-between pb-2",
          children: [/*#__PURE__*/_jsx(CardTitle, {
            className: "text-sm font-medium",
            children: "Avg Commission Rate"
          }), /*#__PURE__*/_jsx(Calculator, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "13.5%"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-xs text-muted-foreground",
            children: "Across all vendors"
          })]
        })]
      }), /*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsxs(CardHeader, {
          className: "flex flex-row items-center justify-between pb-2",
          children: [/*#__PURE__*/_jsx(CardTitle, {
            className: "text-sm font-medium",
            children: "Growth"
          }), /*#__PURE__*/_jsx(TrendingUp, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "+12.3%"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-xs text-muted-foreground",
            children: "vs last month"
          })]
        })]
      })]
    }), /*#__PURE__*/_jsxs(Card, {
      children: [/*#__PURE__*/_jsxs(CardHeader, {
        children: [/*#__PURE__*/_jsx(CardTitle, {
          children: "Commission Management"
        }), /*#__PURE__*/_jsx(CardDescription, {
          children: "Manage vendor commission rates and payment structures"
        })]
      }), /*#__PURE__*/_jsxs(CardContent, {
        children: [/*#__PURE__*/_jsxs("div", {
          className: "flex flex-col lg:flex-row gap-4 mb-6",
          children: [/*#__PURE__*/_jsxs("div", {
            className: "relative flex-1",
            children: [/*#__PURE__*/_jsx(Search, {
              className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4"
            }), /*#__PURE__*/_jsx(Input, {
              placeholder: "Search vendors or categories...",
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
                value: "inactive",
                children: "Inactive"
              }), /*#__PURE__*/_jsx(SelectItem, {
                value: "pending",
                children: "Pending"
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
                  children: "Commission Structure"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Performance"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Commission Earned"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Status"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Effective Date"
                }), /*#__PURE__*/_jsx(TableHead, {
                  className: "text-right",
                  children: "Actions"
                })]
              })
            }), /*#__PURE__*/_jsx(TableBody, {
              children: filteredCommissions.map(commission => /*#__PURE__*/_jsxs(TableRow, {
                children: [/*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsxs("div", {
                    children: [/*#__PURE__*/_jsx("div", {
                      className: "font-medium",
                      children: commission.vendorName
                    }), /*#__PURE__*/_jsx(Badge, {
                      variant: "outline",
                      className: "text-xs mt-1",
                      children: commission.category
                    })]
                  })
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsxs("div", {
                    children: [/*#__PURE__*/_jsx("div", {
                      className: "font-medium",
                      children: formatCommissionRate(commission.commissionType, commission.commissionRate)
                    }), /*#__PURE__*/_jsx("div", {
                      className: "text-sm text-gray-500 capitalize",
                      children: commission.commissionType
                    }), /*#__PURE__*/_jsxs("div", {
                      className: "text-xs text-gray-400",
                      children: ["Min: ", formatCurrency(commission.minimumAmount)]
                    })]
                  })
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsxs("div", {
                    children: [/*#__PURE__*/_jsxs("div", {
                      className: "text-sm font-medium",
                      children: [commission.totalBookings, " bookings"]
                    }), /*#__PURE__*/_jsx("div", {
                      className: "text-sm text-gray-500",
                      children: formatCurrency(commission.totalRevenue)
                    })]
                  })
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsx("div", {
                    className: "font-medium text-green-600",
                    children: formatCurrency(commission.commissionEarned)
                  })
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsx(Badge, {
                    variant: getStatusColor(commission.status),
                    children: commission.status
                  })
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: commission.effectiveFrom
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
                        children: [/*#__PURE__*/_jsx(Edit, {
                          className: "mr-2 h-4 w-4"
                        }), "Edit Commission"]
                      }), /*#__PURE__*/_jsxs(DropdownMenuItem, {
                        children: [/*#__PURE__*/_jsx(Calculator, {
                          className: "mr-2 h-4 w-4"
                        }), "View Calculations"]
                      }), /*#__PURE__*/_jsx(DropdownMenuSeparator, {}), /*#__PURE__*/_jsxs(DropdownMenuItem, {
                        className: "text-red-600",
                        children: [/*#__PURE__*/_jsx(Trash2, {
                          className: "mr-2 h-4 w-4"
                        }), "Delete"]
                      })]
                    })]
                  })
                })]
              }, commission.id))
            })]
          })
        })]
      })]
    })]
  });
};
export default AdminVendorCommission;