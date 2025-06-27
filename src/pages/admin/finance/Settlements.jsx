import { useState } from "react";
import { Search, Filter, Clock, CheckCircle, XCircle, DollarSign, Calendar, AlertTriangle, Eye, Download, MoreHorizontal } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock data for vendor settlements
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const settlementsData = [{
  id: "SET001",
  vendorName: "Mountain Adventures Pvt Ltd",
  vendorId: "VEND001",
  settlementPeriod: "May 2025",
  totalEarnings: 125000,
  commissionDeducted: 18750,
  taxDeducted: 2500,
  netPayable: 103750,
  status: "pending",
  bookingsCount: 45,
  dueDate: "2025-06-05",
  processedDate: null,
  paymentMethod: "Bank Transfer"
}, {
  id: "SET002",
  vendorName: "Himalayan Expeditions",
  vendorId: "VEND002",
  settlementPeriod: "May 2025",
  totalEarnings: 89000,
  commissionDeducted: 13350,
  taxDeducted: 1780,
  netPayable: 73870,
  status: "processed",
  bookingsCount: 32,
  dueDate: "2025-06-05",
  processedDate: "2025-06-04",
  paymentMethod: "UPI"
}, {
  id: "SET003",
  vendorName: "Adventure Seekers",
  vendorId: "VEND003",
  settlementPeriod: "May 2025",
  totalEarnings: 156000,
  commissionDeducted: 23400,
  taxDeducted: 3120,
  netPayable: 129480,
  status: "on_hold",
  bookingsCount: 58,
  dueDate: "2025-06-05",
  processedDate: null,
  paymentMethod: "Bank Transfer"
}];
const AdminFinanceSettlements = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [periodFilter, setPeriodFilter] = useState("all");
  const filteredSettlements = settlementsData.filter(settlement => {
    const matchesSearch = settlement.vendorName.toLowerCase().includes(searchQuery.toLowerCase()) || settlement.vendorId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || settlement.status === statusFilter;
    const matchesPeriod = periodFilter === "all" || settlement.settlementPeriod.includes(periodFilter);
    return matchesSearch && matchesStatus && matchesPeriod;
  });
  const getStatusColor = status => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processed":
        return "bg-green-100 text-green-800";
      case "on_hold":
        return "bg-red-100 text-red-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  const getStatusIcon = status => {
    switch (status) {
      case "pending":
        return /*#__PURE__*/_jsx(Clock, {
          className: "h-4 w-4"
        });
      case "processed":
        return /*#__PURE__*/_jsx(CheckCircle, {
          className: "h-4 w-4"
        });
      case "on_hold":
        return /*#__PURE__*/_jsx(AlertTriangle, {
          className: "h-4 w-4"
        });
      case "failed":
        return /*#__PURE__*/_jsx(XCircle, {
          className: "h-4 w-4"
        });
      default:
        return /*#__PURE__*/_jsx(Clock, {
          className: "h-4 w-4"
        });
    }
  };
  const isOverdue = (dueDate, status) => {
    if (status === "processed") return false;
    return new Date(dueDate) < new Date();
  };
  return /*#__PURE__*/_jsxs("div", {
    children: [/*#__PURE__*/_jsxs("div", {
      className: "flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8",
      children: [/*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx("h1", {
          className: "text-2xl font-bold",
          children: "Vendor Settlements"
        }), /*#__PURE__*/_jsx("p", {
          className: "text-gray-500",
          children: "Manage vendor payments and commission settlements"
        })]
      }), /*#__PURE__*/_jsxs("div", {
        className: "flex gap-2 mt-4 lg:mt-0",
        children: [/*#__PURE__*/_jsxs(Button, {
          variant: "outline",
          children: [/*#__PURE__*/_jsx(Download, {
            className: "mr-2 h-4 w-4"
          }), "Export Settlements"]
        }), /*#__PURE__*/_jsxs(Button, {
          children: [/*#__PURE__*/_jsx(DollarSign, {
            className: "mr-2 h-4 w-4"
          }), "Process Payments"]
        })]
      })]
    }), /*#__PURE__*/_jsxs("div", {
      className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8",
      children: [/*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsxs(CardHeader, {
          className: "flex flex-row items-center justify-between pb-2",
          children: [/*#__PURE__*/_jsx(CardTitle, {
            className: "text-sm font-medium",
            children: "Total Pending"
          }), /*#__PURE__*/_jsx(Clock, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "\u20B93.2L"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-xs text-muted-foreground",
            children: "15 vendors"
          })]
        })]
      }), /*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsxs(CardHeader, {
          className: "flex flex-row items-center justify-between pb-2",
          children: [/*#__PURE__*/_jsx(CardTitle, {
            className: "text-sm font-medium",
            children: "Processed This Month"
          }), /*#__PURE__*/_jsx(CheckCircle, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "\u20B98.9L"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-xs text-muted-foreground",
            children: "42 settlements"
          })]
        })]
      }), /*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsxs(CardHeader, {
          className: "flex flex-row items-center justify-between pb-2",
          children: [/*#__PURE__*/_jsx(CardTitle, {
            className: "text-sm font-medium",
            children: "On Hold"
          }), /*#__PURE__*/_jsx(AlertTriangle, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "\u20B91.3L"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-xs text-muted-foreground",
            children: "3 vendors"
          })]
        })]
      }), /*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsxs(CardHeader, {
          className: "flex flex-row items-center justify-between pb-2",
          children: [/*#__PURE__*/_jsx(CardTitle, {
            className: "text-sm font-medium",
            children: "Avg Settlement Time"
          }), /*#__PURE__*/_jsx(Calendar, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "2.5 days"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-xs text-muted-foreground",
            children: "Processing time"
          })]
        })]
      })]
    }), /*#__PURE__*/_jsxs(Card, {
      children: [/*#__PURE__*/_jsxs(CardHeader, {
        children: [/*#__PURE__*/_jsx(CardTitle, {
          children: "Settlement Management"
        }), /*#__PURE__*/_jsx(CardDescription, {
          children: "Track and process vendor commission settlements and payments"
        })]
      }), /*#__PURE__*/_jsxs(CardContent, {
        children: [/*#__PURE__*/_jsxs("div", {
          className: "flex flex-col lg:flex-row gap-4 mb-6",
          children: [/*#__PURE__*/_jsxs("div", {
            className: "relative flex-1",
            children: [/*#__PURE__*/_jsx(Search, {
              className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4"
            }), /*#__PURE__*/_jsx(Input, {
              placeholder: "Search by vendor name or ID...",
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
                value: "pending",
                children: "Pending"
              }), /*#__PURE__*/_jsx(SelectItem, {
                value: "processed",
                children: "Processed"
              }), /*#__PURE__*/_jsx(SelectItem, {
                value: "on_hold",
                children: "On Hold"
              }), /*#__PURE__*/_jsx(SelectItem, {
                value: "failed",
                children: "Failed"
              })]
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
                value: "May",
                children: "May 2025"
              }), /*#__PURE__*/_jsx(SelectItem, {
                value: "April",
                children: "April 2025"
              }), /*#__PURE__*/_jsx(SelectItem, {
                value: "March",
                children: "March 2025"
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
                  children: "Vendor Details"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Settlement Period"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Earnings Breakdown"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Net Payable"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Due Date"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Payment Method"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Status"
                }), /*#__PURE__*/_jsx(TableHead, {
                  className: "text-right",
                  children: "Actions"
                })]
              })
            }), /*#__PURE__*/_jsx(TableBody, {
              children: filteredSettlements.map(settlement => /*#__PURE__*/_jsxs(TableRow, {
                children: [/*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsxs("div", {
                    children: [/*#__PURE__*/_jsx("div", {
                      className: "font-medium",
                      children: settlement.vendorName
                    }), /*#__PURE__*/_jsx("div", {
                      className: "text-sm text-gray-500",
                      children: settlement.vendorId
                    }), /*#__PURE__*/_jsxs("div", {
                      className: "text-xs text-gray-400",
                      children: [settlement.bookingsCount, " bookings"]
                    })]
                  })
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsxs("div", {
                    children: [/*#__PURE__*/_jsx("div", {
                      className: "font-medium",
                      children: settlement.settlementPeriod
                    }), /*#__PURE__*/_jsxs("div", {
                      className: "text-xs text-gray-400",
                      children: ["ID: ", settlement.id]
                    })]
                  })
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsxs("div", {
                    children: [/*#__PURE__*/_jsxs("div", {
                      className: "font-medium",
                      children: ["\u20B9", settlement.totalEarnings.toLocaleString()]
                    }), /*#__PURE__*/_jsxs("div", {
                      className: "text-xs text-gray-500",
                      children: ["Commission: -\u20B9", settlement.commissionDeducted.toLocaleString()]
                    }), /*#__PURE__*/_jsxs("div", {
                      className: "text-xs text-gray-500",
                      children: ["Tax: -\u20B9", settlement.taxDeducted.toLocaleString()]
                    })]
                  })
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsxs("div", {
                    className: "font-medium text-green-600",
                    children: ["\u20B9", settlement.netPayable.toLocaleString()]
                  })
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsxs("div", {
                    children: [/*#__PURE__*/_jsx("div", {
                      className: `text-sm ${isOverdue(settlement.dueDate, settlement.status) ? 'text-red-600 font-medium' : ''}`,
                      children: settlement.dueDate
                    }), settlement.processedDate && /*#__PURE__*/_jsxs("div", {
                      className: "text-xs text-gray-500",
                      children: ["Processed: ", settlement.processedDate]
                    }), isOverdue(settlement.dueDate, settlement.status) && /*#__PURE__*/_jsx(Badge, {
                      className: "bg-red-100 text-red-800 text-xs",
                      children: "Overdue"
                    })]
                  })
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsx("div", {
                    className: "text-sm",
                    children: settlement.paymentMethod
                  })
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsx(Badge, {
                    className: getStatusColor(settlement.status),
                    children: /*#__PURE__*/_jsxs("div", {
                      className: "flex items-center gap-1",
                      children: [getStatusIcon(settlement.status), settlement.status.replace('_', ' ')]
                    })
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
                        children: [/*#__PURE__*/_jsx(Download, {
                          className: "mr-2 h-4 w-4"
                        }), "Download Invoice"]
                      }), settlement.status === "pending" && /*#__PURE__*/_jsxs(DropdownMenuItem, {
                        children: [/*#__PURE__*/_jsx(CheckCircle, {
                          className: "mr-2 h-4 w-4"
                        }), "Process Payment"]
                      }), settlement.status === "on_hold" && /*#__PURE__*/_jsxs(DropdownMenuItem, {
                        children: [/*#__PURE__*/_jsx(CheckCircle, {
                          className: "mr-2 h-4 w-4"
                        }), "Release Hold"]
                      })]
                    })]
                  })
                })]
              }, settlement.id))
            })]
          })
        })]
      })]
    })]
  });
};
export default AdminFinanceSettlements;