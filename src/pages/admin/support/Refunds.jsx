import { useState } from "react";
import { Search, Filter, RefreshCw, Clock, CheckCircle, XCircle, DollarSign, AlertTriangle, MoreHorizontal, Eye, MessageSquare, MessageCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// Mock data for refund escalations
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const refundEscalationsData = [{
  id: "REF001",
  customerName: "John Doe",
  customerEmail: "john@example.com",
  bookingId: "BOOK001",
  trekName: "Everest Base Camp",
  originalAmount: 25000,
  refundAmount: 15000,
  reason: "Medical emergency - hospital documents provided",
  escalationReason: "Customer disputes 40% cancellation fee",
  status: "pending_review",
  priority: "high",
  requestDate: "2025-05-20",
  escalationDate: "2025-05-22",
  assignedTo: "Senior Support",
  customerResponse: "I provided medical documents but still charged heavy cancellation fee."
}, {
  id: "REF002",
  customerName: "Sarah Smith",
  customerEmail: "sarah@example.com",
  bookingId: "BOOK002",
  trekName: "Annapurna Circuit",
  originalAmount: 12000,
  refundAmount: 8000,
  reason: "Trek cancelled by vendor due to weather",
  escalationReason: "Partial refund despite vendor cancellation",
  status: "under_investigation",
  priority: "medium",
  requestDate: "2025-05-18",
  escalationDate: "2025-05-20",
  assignedTo: "Refund Team",
  customerResponse: "Weather cancellation should be full refund as per policy."
}, {
  id: "REF003",
  customerName: "Mike Johnson",
  customerEmail: "mike@example.com",
  bookingId: "BOOK003",
  trekName: "Kilimanjaro Trek",
  originalAmount: 35000,
  refundAmount: 30000,
  reason: "Vendor provided poor service",
  escalationReason: "Refund amount insufficient for damages",
  status: "resolved",
  priority: "low",
  requestDate: "2025-05-15",
  escalationDate: "2025-05-17",
  assignedTo: "Senior Support",
  customerResponse: "Additional compensation requested for poor accommodation."
}];
const AdminSupportRefunds = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isResponseDialogOpen, setIsResponseDialogOpen] = useState(false);
  const [selectedRefund, setSelectedRefund] = useState(null);
  const [adminResponse, setAdminResponse] = useState("");
  const filteredRefunds = refundEscalationsData.filter(refund => {
    const matchesSearch = refund.customerName.toLowerCase().includes(searchQuery.toLowerCase()) || refund.bookingId.toLowerCase().includes(searchQuery.toLowerCase()) || refund.trekName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || refund.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || refund.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });
  const getStatusColor = status => {
    switch (status) {
      case "pending_review":
        return "bg-yellow-100 text-yellow-800";
      case "under_investigation":
        return "bg-blue-100 text-blue-800";
      case "resolved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  const getPriorityColor = priority => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  const getStatusIcon = status => {
    switch (status) {
      case "pending_review":
        return /*#__PURE__*/_jsx(Clock, {
          className: "h-4 w-4"
        });
      case "under_investigation":
        return /*#__PURE__*/_jsx(RefreshCw, {
          className: "h-4 w-4"
        });
      case "resolved":
        return /*#__PURE__*/_jsx(CheckCircle, {
          className: "h-4 w-4"
        });
      case "rejected":
        return /*#__PURE__*/_jsx(XCircle, {
          className: "h-4 w-4"
        });
      default:
        return /*#__PURE__*/_jsx(AlertTriangle, {
          className: "h-4 w-4"
        });
    }
  };
  const handleViewRefund = refund => {
    console.log("Viewing refund details:", refund);
    setSelectedRefund(refund);
    setIsViewDialogOpen(true);
  };
  const handleViewCustomerResponse = refund => {
    console.log("Viewing customer response:", refund);
    alert(`Customer Response:\n\n${refund.customerResponse}`);
  };
  const handleApproveRefund = refund => {
    console.log("Approving additional refund:", refund);
    const additionalAmount = prompt("Enter additional refund amount:");
    if (additionalAmount && !isNaN(Number(additionalAmount))) {
      if (confirm(`Approve additional refund of ₹${additionalAmount} for ${refund.customerName}?`)) {
        alert("Additional refund approved and processed!");
      }
    }
  };
  const handleRejectEscalation = refund => {
    console.log("Rejecting escalation:", refund);
    const reason = prompt("Enter reason for rejection:");
    if (reason) {
      if (confirm(`Reject escalation for ${refund.customerName}?\nReason: ${reason}`)) {
        alert("Escalation rejected!");
      }
    }
  };
  const handleAddResponse = refund => {
    console.log("Adding response to refund:", refund);
    setSelectedRefund(refund);
    setAdminResponse("");
    setIsResponseDialogOpen(true);
  };
  const handleSubmitResponse = () => {
    console.log("Submitting response for refund:", selectedRefund?.id, adminResponse);
    setIsResponseDialogOpen(false);
    setSelectedRefund(null);
    setAdminResponse("");
    alert("Response submitted successfully!");
  };
  return /*#__PURE__*/_jsxs("div", {
    children: [/*#__PURE__*/_jsx("div", {
      className: "flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8",
      children: /*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx("h1", {
          className: "text-2xl font-bold",
          children: "Refund Escalations"
        }), /*#__PURE__*/_jsx("p", {
          className: "text-gray-500",
          children: "Manage escalated refund requests from customers"
        })]
      })
    }), /*#__PURE__*/_jsxs("div", {
      className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8",
      children: [/*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsxs(CardHeader, {
          className: "flex flex-row items-center justify-between pb-2",
          children: [/*#__PURE__*/_jsx(CardTitle, {
            className: "text-sm font-medium",
            children: "Total Escalations"
          }), /*#__PURE__*/_jsx(AlertTriangle, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "47"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-xs text-muted-foreground",
            children: "All time"
          })]
        })]
      }), /*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsxs(CardHeader, {
          className: "flex flex-row items-center justify-between pb-2",
          children: [/*#__PURE__*/_jsx(CardTitle, {
            className: "text-sm font-medium",
            children: "Pending Review"
          }), /*#__PURE__*/_jsx(Clock, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "8"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-xs text-muted-foreground",
            children: "Awaiting decision"
          })]
        })]
      }), /*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsxs(CardHeader, {
          className: "flex flex-row items-center justify-between pb-2",
          children: [/*#__PURE__*/_jsx(CardTitle, {
            className: "text-sm font-medium",
            children: "Amount in Dispute"
          }), /*#__PURE__*/_jsx(DollarSign, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "\u20B91.2L"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-xs text-muted-foreground",
            children: "Total disputed"
          })]
        })]
      }), /*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsxs(CardHeader, {
          className: "flex flex-row items-center justify-between pb-2",
          children: [/*#__PURE__*/_jsx(CardTitle, {
            className: "text-sm font-medium",
            children: "Resolution Rate"
          }), /*#__PURE__*/_jsx(CheckCircle, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "78.3%"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-xs text-muted-foreground",
            children: "Success rate"
          })]
        })]
      })]
    }), /*#__PURE__*/_jsxs(Card, {
      children: [/*#__PURE__*/_jsxs(CardHeader, {
        children: [/*#__PURE__*/_jsx(CardTitle, {
          children: "Refund Escalations"
        }), /*#__PURE__*/_jsx(CardDescription, {
          children: "Review and resolve escalated refund requests requiring senior attention"
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
                value: "pending_review",
                children: "Pending Review"
              }), /*#__PURE__*/_jsx(SelectItem, {
                value: "under_investigation",
                children: "Under Investigation"
              }), /*#__PURE__*/_jsx(SelectItem, {
                value: "resolved",
                children: "Resolved"
              }), /*#__PURE__*/_jsx(SelectItem, {
                value: "rejected",
                children: "Rejected"
              })]
            })]
          }), /*#__PURE__*/_jsxs(Select, {
            value: priorityFilter,
            onValueChange: setPriorityFilter,
            children: [/*#__PURE__*/_jsx(SelectTrigger, {
              className: "w-40",
              children: /*#__PURE__*/_jsx(SelectValue, {
                placeholder: "Priority"
              })
            }), /*#__PURE__*/_jsxs(SelectContent, {
              children: [/*#__PURE__*/_jsx(SelectItem, {
                value: "all",
                children: "All Priorities"
              }), /*#__PURE__*/_jsx(SelectItem, {
                value: "high",
                children: "High"
              }), /*#__PURE__*/_jsx(SelectItem, {
                value: "medium",
                children: "Medium"
              }), /*#__PURE__*/_jsx(SelectItem, {
                value: "low",
                children: "Low"
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
                  children: "Customer Details"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Booking Info"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Refund Details"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Escalation Info"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Priority"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Status"
                }), /*#__PURE__*/_jsx(TableHead, {
                  className: "text-right",
                  children: "Actions"
                })]
              })
            }), /*#__PURE__*/_jsx(TableBody, {
              children: filteredRefunds.map(refund => /*#__PURE__*/_jsxs(TableRow, {
                children: [/*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsxs("div", {
                    children: [/*#__PURE__*/_jsx("div", {
                      className: "font-medium",
                      children: refund.customerName
                    }), /*#__PURE__*/_jsx("div", {
                      className: "text-sm text-gray-500",
                      children: refund.customerEmail
                    })]
                  })
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsxs("div", {
                    children: [/*#__PURE__*/_jsx("div", {
                      className: "font-medium",
                      children: refund.bookingId
                    }), /*#__PURE__*/_jsx("div", {
                      className: "text-sm text-gray-500",
                      children: refund.trekName
                    }), /*#__PURE__*/_jsxs("div", {
                      className: "text-xs text-gray-400",
                      children: ["Requested: ", refund.requestDate]
                    })]
                  })
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsxs("div", {
                    children: [/*#__PURE__*/_jsxs("div", {
                      className: "font-medium",
                      children: ["\u20B9", refund.refundAmount.toLocaleString()]
                    }), /*#__PURE__*/_jsxs("div", {
                      className: "text-sm text-gray-500",
                      children: ["Original: \u20B9", refund.originalAmount.toLocaleString()]
                    }), /*#__PURE__*/_jsx("div", {
                      className: "text-xs text-gray-400",
                      children: refund.reason
                    })]
                  })
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsxs("div", {
                    children: [/*#__PURE__*/_jsxs("div", {
                      className: "text-sm font-medium",
                      children: ["Escalated: ", refund.escalationDate]
                    }), /*#__PURE__*/_jsx("div", {
                      className: "text-xs text-gray-500 max-w-xs",
                      children: refund.escalationReason
                    }), /*#__PURE__*/_jsxs("div", {
                      className: "text-xs text-gray-400",
                      children: ["Assigned: ", refund.assignedTo]
                    })]
                  })
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsx(Badge, {
                    className: getPriorityColor(refund.priority),
                    children: refund.priority
                  })
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsx(Badge, {
                    className: getStatusColor(refund.status),
                    children: /*#__PURE__*/_jsxs("div", {
                      className: "flex items-center gap-1",
                      children: [getStatusIcon(refund.status), refund.status.replace('_', ' ')]
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
                        onClick: () => handleViewRefund(refund),
                        children: [/*#__PURE__*/_jsx(Eye, {
                          className: "mr-2 h-4 w-4"
                        }), "View Full Details"]
                      }), /*#__PURE__*/_jsxs(DropdownMenuItem, {
                        onClick: () => handleViewCustomerResponse(refund),
                        children: [/*#__PURE__*/_jsx(MessageSquare, {
                          className: "mr-2 h-4 w-4"
                        }), "Customer Response"]
                      }), /*#__PURE__*/_jsxs(DropdownMenuItem, {
                        onClick: () => handleAddResponse(refund),
                        children: [/*#__PURE__*/_jsx(MessageCircle, {
                          className: "mr-2 h-4 w-4"
                        }), "Add Response"]
                      }), /*#__PURE__*/_jsx(DropdownMenuSeparator, {}), /*#__PURE__*/_jsxs(DropdownMenuItem, {
                        onClick: () => handleApproveRefund(refund),
                        children: [/*#__PURE__*/_jsx(CheckCircle, {
                          className: "mr-2 h-4 w-4"
                        }), "Approve Additional Refund"]
                      }), /*#__PURE__*/_jsxs(DropdownMenuItem, {
                        onClick: () => handleRejectEscalation(refund),
                        className: "text-red-600",
                        children: [/*#__PURE__*/_jsx(XCircle, {
                          className: "mr-2 h-4 w-4"
                        }), "Reject Escalation"]
                      })]
                    })]
                  })
                })]
              }, refund.id))
            })]
          })
        })]
      })]
    }), /*#__PURE__*/_jsx(Dialog, {
      open: isViewDialogOpen,
      onOpenChange: setIsViewDialogOpen,
      children: /*#__PURE__*/_jsxs(DialogContent, {
        className: "max-w-4xl",
        children: [/*#__PURE__*/_jsxs(DialogHeader, {
          children: [/*#__PURE__*/_jsx(DialogTitle, {
            children: "Refund Escalation Details"
          }), /*#__PURE__*/_jsx(DialogDescription, {
            children: "Complete details of the refund escalation"
          })]
        }), selectedRefund && /*#__PURE__*/_jsxs("div", {
          className: "py-4 space-y-4",
          children: [/*#__PURE__*/_jsxs("div", {
            className: "grid grid-cols-2 gap-4",
            children: [/*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx(Label, {
                className: "font-medium",
                children: "Customer Name"
              }), /*#__PURE__*/_jsx("p", {
                className: "text-sm",
                children: selectedRefund.customerName
              })]
            }), /*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx(Label, {
                className: "font-medium",
                children: "Customer Email"
              }), /*#__PURE__*/_jsx("p", {
                className: "text-sm",
                children: selectedRefund.customerEmail
              })]
            }), /*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx(Label, {
                className: "font-medium",
                children: "Booking ID"
              }), /*#__PURE__*/_jsx("p", {
                className: "text-sm",
                children: selectedRefund.bookingId
              })]
            }), /*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx(Label, {
                className: "font-medium",
                children: "Trek Name"
              }), /*#__PURE__*/_jsx("p", {
                className: "text-sm",
                children: selectedRefund.trekName
              })]
            }), /*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx(Label, {
                className: "font-medium",
                children: "Original Amount"
              }), /*#__PURE__*/_jsxs("p", {
                className: "text-sm",
                children: ["\u20B9", selectedRefund.originalAmount.toLocaleString()]
              })]
            }), /*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx(Label, {
                className: "font-medium",
                children: "Refund Amount"
              }), /*#__PURE__*/_jsxs("p", {
                className: "text-sm",
                children: ["\u20B9", selectedRefund.refundAmount.toLocaleString()]
              })]
            }), /*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx(Label, {
                className: "font-medium",
                children: "Request Date"
              }), /*#__PURE__*/_jsx("p", {
                className: "text-sm",
                children: selectedRefund.requestDate
              })]
            }), /*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx(Label, {
                className: "font-medium",
                children: "Escalation Date"
              }), /*#__PURE__*/_jsx("p", {
                className: "text-sm",
                children: selectedRefund.escalationDate
              })]
            }), /*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx(Label, {
                className: "font-medium",
                children: "Priority"
              }), /*#__PURE__*/_jsx(Badge, {
                className: getPriorityColor(selectedRefund.priority),
                children: selectedRefund.priority
              })]
            }), /*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx(Label, {
                className: "font-medium",
                children: "Status"
              }), /*#__PURE__*/_jsx(Badge, {
                className: getStatusColor(selectedRefund.status),
                children: selectedRefund.status.replace('_', ' ')
              })]
            })]
          }), /*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx(Label, {
              className: "font-medium",
              children: "Original Reason"
            }), /*#__PURE__*/_jsx("p", {
              className: "text-sm bg-gray-50 p-3 rounded",
              children: selectedRefund.reason
            })]
          }), /*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx(Label, {
              className: "font-medium",
              children: "Escalation Reason"
            }), /*#__PURE__*/_jsx("p", {
              className: "text-sm bg-yellow-50 p-3 rounded",
              children: selectedRefund.escalationReason
            })]
          }), /*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx(Label, {
              className: "font-medium",
              children: "Customer Response"
            }), /*#__PURE__*/_jsx("p", {
              className: "text-sm bg-blue-50 p-3 rounded",
              children: selectedRefund.customerResponse
            })]
          }), /*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx(Label, {
              className: "font-medium",
              children: "Assigned To"
            }), /*#__PURE__*/_jsx("p", {
              className: "text-sm",
              children: selectedRefund.assignedTo
            })]
          })]
        }), /*#__PURE__*/_jsx(DialogFooter, {
          children: /*#__PURE__*/_jsx(Button, {
            variant: "outline",
            onClick: () => setIsViewDialogOpen(false),
            children: "Close"
          })
        })]
      })
    }), /*#__PURE__*/_jsx(Dialog, {
      open: isResponseDialogOpen,
      onOpenChange: setIsResponseDialogOpen,
      children: /*#__PURE__*/_jsxs(DialogContent, {
        className: "max-w-2xl",
        children: [/*#__PURE__*/_jsxs(DialogHeader, {
          children: [/*#__PURE__*/_jsx(DialogTitle, {
            children: "Add Response"
          }), /*#__PURE__*/_jsx(DialogDescription, {
            children: "Respond to the refund escalation"
          })]
        }), /*#__PURE__*/_jsxs("div", {
          className: "py-4",
          children: [/*#__PURE__*/_jsx(Label, {
            htmlFor: "response",
            children: "Your Response"
          }), /*#__PURE__*/_jsx(Textarea, {
            id: "response",
            value: adminResponse,
            onChange: e => setAdminResponse(e.target.value),
            placeholder: "Enter your response to the customer...",
            rows: 6
          })]
        }), /*#__PURE__*/_jsxs(DialogFooter, {
          children: [/*#__PURE__*/_jsx(Button, {
            variant: "outline",
            onClick: () => setIsResponseDialogOpen(false),
            children: "Cancel"
          }), /*#__PURE__*/_jsx(Button, {
            onClick: handleSubmitResponse,
            children: "Submit Response"
          })]
        })]
      })
    })]
  });
};
export default AdminSupportRefunds;