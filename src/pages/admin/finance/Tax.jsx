import { useState } from "react";
import { Search, Filter, Download, Calculator, Receipt, DollarSign, TrendingUp, Calendar, Eye, MoreHorizontal } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock data for tax management
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const taxData = [{
  id: "TAX001",
  period: "May 2025",
  gstCollected: 186000,
  tdsDeducted: 45000,
  vendorTds: 32000,
  customerGst: 154000,
  totalTaxLiability: 231000,
  filedStatus: "pending",
  dueDate: "2025-06-20",
  filedDate: null,
  refundDue: 0,
  penaltyAmount: 0
}, {
  id: "TAX002",
  period: "April 2025",
  gstCollected: 162000,
  tdsDeducted: 38000,
  vendorTds: 28000,
  customerGst: 134000,
  totalTaxLiability: 200000,
  filedStatus: "filed",
  dueDate: "2025-05-20",
  filedDate: "2025-05-18",
  refundDue: 0,
  penaltyAmount: 0
}, {
  id: "TAX003",
  period: "March 2025",
  gstCollected: 145000,
  tdsDeducted: 35000,
  vendorTds: 25000,
  customerGst: 120000,
  totalTaxLiability: 180000,
  filedStatus: "filed",
  dueDate: "2025-04-20",
  filedDate: "2025-04-15",
  refundDue: 5000,
  penaltyAmount: 0
}];
const AdminFinanceTax = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [periodFilter, setPeriodFilter] = useState("all");
  const filteredTax = taxData.filter(tax => {
    const matchesSearch = tax.period.toLowerCase().includes(searchQuery.toLowerCase()) || tax.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || tax.filedStatus === statusFilter;
    const matchesPeriod = periodFilter === "all" || tax.period.includes(periodFilter);
    return matchesSearch && matchesStatus && matchesPeriod;
  });
  const getStatusColor = status => {
    switch (status) {
      case "filed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "overdue":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  const isOverdue = (dueDate, status) => {
    if (status === "filed") return false;
    return new Date(dueDate) < new Date();
  };
  const getTaxType = type => {
    switch (type) {
      case "gst":
        return "bg-blue-100 text-blue-800";
      case "tds":
        return "bg-purple-100 text-purple-800";
      case "income":
        return "bg-green-100 text-green-800";
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
          children: "Tax Management"
        }), /*#__PURE__*/_jsx("p", {
          className: "text-gray-500",
          children: "Manage taxes and charges collected from vendors and customers"
        })]
      }), /*#__PURE__*/_jsxs("div", {
        className: "flex gap-2 mt-4 lg:mt-0",
        children: [/*#__PURE__*/_jsxs(Button, {
          variant: "outline",
          children: [/*#__PURE__*/_jsx(Download, {
            className: "mr-2 h-4 w-4"
          }), "Export Tax Report"]
        }), /*#__PURE__*/_jsxs(Button, {
          children: [/*#__PURE__*/_jsx(Calculator, {
            className: "mr-2 h-4 w-4"
          }), "Calculate Tax"]
        })]
      })]
    }), /*#__PURE__*/_jsxs("div", {
      className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8",
      children: [/*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsxs(CardHeader, {
          className: "flex flex-row items-center justify-between pb-2",
          children: [/*#__PURE__*/_jsx(CardTitle, {
            className: "text-sm font-medium",
            children: "Total GST Collected"
          }), /*#__PURE__*/_jsx(Receipt, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "\u20B94.9L"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-xs text-muted-foreground",
            children: "This quarter"
          })]
        })]
      }), /*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsxs(CardHeader, {
          className: "flex flex-row items-center justify-between pb-2",
          children: [/*#__PURE__*/_jsx(CardTitle, {
            className: "text-sm font-medium",
            children: "TDS Deducted"
          }), /*#__PURE__*/_jsx(DollarSign, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "\u20B91.2L"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-xs text-muted-foreground",
            children: "From vendors"
          })]
        })]
      }), /*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsxs(CardHeader, {
          className: "flex flex-row items-center justify-between pb-2",
          children: [/*#__PURE__*/_jsx(CardTitle, {
            className: "text-sm font-medium",
            children: "Pending Filings"
          }), /*#__PURE__*/_jsx(Calendar, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "2"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-xs text-muted-foreground",
            children: "Due this month"
          })]
        })]
      }), /*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsxs(CardHeader, {
          className: "flex flex-row items-center justify-between pb-2",
          children: [/*#__PURE__*/_jsx(CardTitle, {
            className: "text-sm font-medium",
            children: "Tax Liability"
          }), /*#__PURE__*/_jsx(TrendingUp, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "\u20B92.3L"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-xs text-muted-foreground",
            children: "Current month"
          })]
        })]
      })]
    }), /*#__PURE__*/_jsxs(Card, {
      children: [/*#__PURE__*/_jsxs(CardHeader, {
        children: [/*#__PURE__*/_jsx(CardTitle, {
          children: "Tax Reports"
        }), /*#__PURE__*/_jsx(CardDescription, {
          children: "Monthly tax calculations, filings, and compliance tracking"
        })]
      }), /*#__PURE__*/_jsxs(CardContent, {
        children: [/*#__PURE__*/_jsxs("div", {
          className: "flex flex-col lg:flex-row gap-4 mb-6",
          children: [/*#__PURE__*/_jsxs("div", {
            className: "relative flex-1",
            children: [/*#__PURE__*/_jsx(Search, {
              className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4"
            }), /*#__PURE__*/_jsx(Input, {
              placeholder: "Search by period or tax ID...",
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
                value: "filed",
                children: "Filed"
              }), /*#__PURE__*/_jsx(SelectItem, {
                value: "overdue",
                children: "Overdue"
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
                value: "2025",
                children: "2025"
              }), /*#__PURE__*/_jsx(SelectItem, {
                value: "May",
                children: "May 2025"
              }), /*#__PURE__*/_jsx(SelectItem, {
                value: "April",
                children: "April 2025"
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
                  children: "Tax Period"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "GST Details"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "TDS Details"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Total Liability"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Filing Info"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Status"
                }), /*#__PURE__*/_jsx(TableHead, {
                  className: "text-right",
                  children: "Actions"
                })]
              })
            }), /*#__PURE__*/_jsx(TableBody, {
              children: filteredTax.map(tax => /*#__PURE__*/_jsxs(TableRow, {
                children: [/*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsxs("div", {
                    children: [/*#__PURE__*/_jsx("div", {
                      className: "font-medium",
                      children: tax.period
                    }), /*#__PURE__*/_jsxs("div", {
                      className: "text-xs text-gray-400",
                      children: ["ID: ", tax.id]
                    })]
                  })
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsxs("div", {
                    children: [/*#__PURE__*/_jsxs("div", {
                      className: "font-medium",
                      children: ["\u20B9", tax.gstCollected.toLocaleString()]
                    }), /*#__PURE__*/_jsxs("div", {
                      className: "text-xs text-gray-500",
                      children: ["Customer GST: \u20B9", tax.customerGst.toLocaleString()]
                    })]
                  })
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsxs("div", {
                    children: [/*#__PURE__*/_jsxs("div", {
                      className: "font-medium",
                      children: ["\u20B9", tax.tdsDeducted.toLocaleString()]
                    }), /*#__PURE__*/_jsxs("div", {
                      className: "text-xs text-gray-500",
                      children: ["Vendor TDS: \u20B9", tax.vendorTds.toLocaleString()]
                    })]
                  })
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsxs("div", {
                    children: [/*#__PURE__*/_jsxs("div", {
                      className: "font-medium",
                      children: ["\u20B9", tax.totalTaxLiability.toLocaleString()]
                    }), tax.refundDue > 0 && /*#__PURE__*/_jsxs("div", {
                      className: "text-xs text-green-600",
                      children: ["Refund: \u20B9", tax.refundDue.toLocaleString()]
                    }), tax.penaltyAmount > 0 && /*#__PURE__*/_jsxs("div", {
                      className: "text-xs text-red-600",
                      children: ["Penalty: \u20B9", tax.penaltyAmount.toLocaleString()]
                    })]
                  })
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsxs("div", {
                    children: [/*#__PURE__*/_jsxs("div", {
                      className: "text-sm",
                      children: ["Due: ", tax.dueDate]
                    }), tax.filedDate && /*#__PURE__*/_jsxs("div", {
                      className: "text-xs text-gray-500",
                      children: ["Filed: ", tax.filedDate]
                    }), isOverdue(tax.dueDate, tax.filedStatus) && /*#__PURE__*/_jsx(Badge, {
                      className: "bg-red-100 text-red-800 text-xs mt-1",
                      children: "Overdue"
                    })]
                  })
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsx(Badge, {
                    className: getStatusColor(isOverdue(tax.dueDate, tax.filedStatus) ? "overdue" : tax.filedStatus),
                    children: isOverdue(tax.dueDate, tax.filedStatus) ? "overdue" : tax.filedStatus
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
                        }), "Download Report"]
                      }), tax.filedStatus === "pending" && /*#__PURE__*/_jsxs(DropdownMenuItem, {
                        children: [/*#__PURE__*/_jsx(Receipt, {
                          className: "mr-2 h-4 w-4"
                        }), "File Returns"]
                      }), /*#__PURE__*/_jsxs(DropdownMenuItem, {
                        children: [/*#__PURE__*/_jsx(Calculator, {
                          className: "mr-2 h-4 w-4"
                        }), "Recalculate"]
                      })]
                    })]
                  })
                })]
              }, tax.id))
            })]
          })
        })]
      })]
    })]
  });
};
export default AdminFinanceTax;