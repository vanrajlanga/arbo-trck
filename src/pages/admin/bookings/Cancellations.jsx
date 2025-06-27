import { useState } from "react";
import { Search, Filter, Download, RefreshCw, CheckCircle, XCircle, Clock, DollarSign, MoreHorizontal, Eye, MessageSquare } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock data for cancellations and refunds
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const cancellationsData = [{
  id: "BOOK001",
  customerName: "John Doe",
  customerEmail: "john@example.com",
  trekName: "Everest Base Camp",
  bookingDate: "2025-05-15",
  cancellationDate: "2025-05-20",
  refundAmount: 15000,
  originalAmount: 25000,
  status: "pending",
  reason: "Medical emergency",
  refundMethod: "Original payment method",
  processingTime: "3-5 business days"
}, {
  id: "BOOK002",
  customerName: "Sarah Smith",
  customerEmail: "sarah@example.com",
  trekName: "Annapurna Circuit",
  bookingDate: "2025-04-10",
  cancellationDate: "2025-04-25",
  refundAmount: 8000,
  originalAmount: 12000,
  status: "approved",
  reason: "Change of plans",
  refundMethod: "Bank transfer",
  processingTime: "2-3 business days"
}, {
  id: "BOOK003",
  customerName: "Mike Johnson",
  customerEmail: "mike@example.com",
  trekName: "Kilimanjaro Trek",
  bookingDate: "2025-03-20",
  cancellationDate: "2025-03-22",
  refundAmount: 20000,
  originalAmount: 22000,
  status: "completed",
  reason: "Weather conditions",
  refundMethod: "Credit card",
  processingTime: "1-2 business days"
}, {
  id: "BOOK004",
  customerName: "Emma Wilson",
  customerEmail: "emma@example.com",
  trekName: "Inca Trail",
  bookingDate: "2025-02-15",
  cancellationDate: "2025-02-28",
  refundAmount: 0,
  originalAmount: 18000,
  status: "rejected",
  reason: "Late cancellation",
  refundMethod: "N/A",
  processingTime: "N/A"
}];
const AdminBookingCancellations = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const filteredCancellations = cancellationsData.filter(cancellation => {
    const matchesSearch = cancellation.customerName.toLowerCase().includes(searchQuery.toLowerCase()) || cancellation.trekName.toLowerCase().includes(searchQuery.toLowerCase()) || cancellation.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || cancellation.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  const getStatusColor = status => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "approved":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "rejected":
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
      case "approved":
        return /*#__PURE__*/_jsx(CheckCircle, {
          className: "h-4 w-4"
        });
      case "completed":
        return /*#__PURE__*/_jsx(CheckCircle, {
          className: "h-4 w-4"
        });
      case "rejected":
        return /*#__PURE__*/_jsx(XCircle, {
          className: "h-4 w-4"
        });
      default:
        return /*#__PURE__*/_jsx(Clock, {
          className: "h-4 w-4"
        });
    }
  };
  return /*#__PURE__*/_jsxs("div", {
    children: [/*#__PURE__*/_jsxs("div", {
      className: "flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8",
      children: [/*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx("h1", {
          className: "text-2xl font-bold",
          children: "Cancellations & Refunds"
        }), /*#__PURE__*/_jsx("p", {
          className: "text-gray-500",
          children: "Manage booking cancellations and process refunds"
        })]
      }), /*#__PURE__*/_jsxs("div", {
        className: "flex gap-2 mt-4 lg:mt-0",
        children: [/*#__PURE__*/_jsxs(Button, {
          variant: "outline",
          children: [/*#__PURE__*/_jsx(Download, {
            className: "mr-2 h-4 w-4"
          }), "Export Report"]
        }), /*#__PURE__*/_jsxs(Button, {
          children: [/*#__PURE__*/_jsx(RefreshCw, {
            className: "mr-2 h-4 w-4"
          }), "Refresh"]
        })]
      })]
    }), /*#__PURE__*/_jsxs("div", {
      className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8",
      children: [/*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsxs(CardHeader, {
          className: "flex flex-row items-center justify-between pb-2",
          children: [/*#__PURE__*/_jsx(CardTitle, {
            className: "text-sm font-medium",
            children: "Total Cancellations"
          }), /*#__PURE__*/_jsx(XCircle, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "247"
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
            children: "Pending Refunds"
          }), /*#__PURE__*/_jsx(Clock, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "32"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-xs text-muted-foreground",
            children: "Awaiting approval"
          })]
        })]
      }), /*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsxs(CardHeader, {
          className: "flex flex-row items-center justify-between pb-2",
          children: [/*#__PURE__*/_jsx(CardTitle, {
            className: "text-sm font-medium",
            children: "Total Refunded"
          }), /*#__PURE__*/_jsx(DollarSign, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "\u20B98.5L"
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
            children: "Avg Processing Time"
          }), /*#__PURE__*/_jsx(RefreshCw, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "2.5 days"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-xs text-muted-foreground",
            children: "Average time"
          })]
        })]
      })]
    }), /*#__PURE__*/_jsxs(Card, {
      children: [/*#__PURE__*/_jsxs(CardHeader, {
        children: [/*#__PURE__*/_jsx(CardTitle, {
          children: "Cancellation Requests"
        }), /*#__PURE__*/_jsx(CardDescription, {
          children: "Review and process booking cancellations and refund requests"
        })]
      }), /*#__PURE__*/_jsxs(CardContent, {
        children: [/*#__PURE__*/_jsxs("div", {
          className: "flex flex-col lg:flex-row gap-4 mb-6",
          children: [/*#__PURE__*/_jsxs("div", {
            className: "relative flex-1",
            children: [/*#__PURE__*/_jsx(Search, {
              className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4"
            }), /*#__PURE__*/_jsx(Input, {
              placeholder: "Search by customer, booking ID, or trek...",
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
                value: "approved",
                children: "Approved"
              }), /*#__PURE__*/_jsx(SelectItem, {
                value: "completed",
                children: "Completed"
              }), /*#__PURE__*/_jsx(SelectItem, {
                value: "rejected",
                children: "Rejected"
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
                  children: "Booking Details"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Customer"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Cancellation Info"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Refund Details"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Status"
                }), /*#__PURE__*/_jsx(TableHead, {
                  className: "text-right",
                  children: "Actions"
                })]
              })
            }), /*#__PURE__*/_jsx(TableBody, {
              children: filteredCancellations.map(cancellation => /*#__PURE__*/_jsxs(TableRow, {
                children: [/*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsxs("div", {
                    children: [/*#__PURE__*/_jsx("div", {
                      className: "font-medium",
                      children: cancellation.id
                    }), /*#__PURE__*/_jsx("div", {
                      className: "text-sm text-gray-500",
                      children: cancellation.trekName
                    }), /*#__PURE__*/_jsxs("div", {
                      className: "text-xs text-gray-400",
                      children: ["Booked: ", cancellation.bookingDate]
                    })]
                  })
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsxs("div", {
                    children: [/*#__PURE__*/_jsx("div", {
                      className: "font-medium",
                      children: cancellation.customerName
                    }), /*#__PURE__*/_jsx("div", {
                      className: "text-sm text-gray-500",
                      children: cancellation.customerEmail
                    })]
                  })
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsxs("div", {
                    children: [/*#__PURE__*/_jsxs("div", {
                      className: "text-sm font-medium",
                      children: ["Cancelled: ", cancellation.cancellationDate]
                    }), /*#__PURE__*/_jsxs("div", {
                      className: "text-xs text-gray-500 max-w-xs",
                      children: ["Reason: ", cancellation.reason]
                    })]
                  })
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsxs("div", {
                    children: [/*#__PURE__*/_jsxs("div", {
                      className: "font-medium",
                      children: ["\u20B9", cancellation.refundAmount.toLocaleString()]
                    }), /*#__PURE__*/_jsxs("div", {
                      className: "text-xs text-gray-500",
                      children: ["Original: \u20B9", cancellation.originalAmount.toLocaleString()]
                    }), /*#__PURE__*/_jsx("div", {
                      className: "text-xs text-gray-400",
                      children: cancellation.refundMethod
                    })]
                  })
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsx(Badge, {
                    className: getStatusColor(cancellation.status),
                    children: /*#__PURE__*/_jsxs("div", {
                      className: "flex items-center gap-1",
                      children: [getStatusIcon(cancellation.status), cancellation.status]
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
                        children: [/*#__PURE__*/_jsx(CheckCircle, {
                          className: "mr-2 h-4 w-4"
                        }), "Approve Refund"]
                      }), /*#__PURE__*/_jsxs(DropdownMenuItem, {
                        children: [/*#__PURE__*/_jsx(MessageSquare, {
                          className: "mr-2 h-4 w-4"
                        }), "Contact Customer"]
                      }), /*#__PURE__*/_jsx(DropdownMenuSeparator, {}), /*#__PURE__*/_jsxs(DropdownMenuItem, {
                        className: "text-red-600",
                        children: [/*#__PURE__*/_jsx(XCircle, {
                          className: "mr-2 h-4 w-4"
                        }), "Reject Request"]
                      })]
                    })]
                  })
                })]
              }, cancellation.id))
            })]
          })
        })]
      })]
    })]
  });
};
export default AdminBookingCancellations;