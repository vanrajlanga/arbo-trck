import { useState } from "react";
import { Search, Filter, Building2, Clock, CheckCircle, AlertTriangle, DollarSign, MoreHorizontal, Eye, MessageCircle, Phone } from "lucide-react";
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

// Mock data for vendor issues
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const vendorIssuesData = [{
  id: "VEND001",
  vendorName: "Mountain Adventures Pvt Ltd",
  vendorEmail: "contact@mountainadv.com",
  vendorPhone: "+91 98765 43210",
  contactPerson: "Raj Kumar",
  subject: "Payment delay issue",
  description: "Commission payments have been delayed for the last 2 months. Need immediate resolution.",
  category: "payment",
  priority: "high",
  status: "open",
  createdDate: "2025-05-20",
  assignedTo: "Finance Team",
  affectedAmount: 125000,
  response: ""
}, {
  id: "VEND002",
  vendorName: "Himalayan Treks Co.",
  vendorEmail: "info@himalayantrek.com",
  vendorPhone: "+91 87654 32109",
  contactPerson: "Priya Sharma",
  subject: "Platform commission rate dispute",
  description: "The commission rate being charged is different from what was agreed upon during onboarding.",
  category: "commission",
  priority: "medium",
  status: "in_progress",
  createdDate: "2025-05-18",
  assignedTo: "Vendor Relations",
  affectedAmount: 45000,
  response: "We are reviewing the commission structure and will get back to you within 48 hours."
}, {
  id: "VEND003",
  vendorName: "Adventure Seekers",
  vendorEmail: "support@adventureseekers.in",
  vendorPhone: "+91 76543 21098",
  contactPerson: "Amit Singh",
  subject: "Booking cancellation policy",
  description: "Customer cancelled 2 days before trek but we're being charged full cancellation fees.",
  category: "policy",
  priority: "low",
  status: "resolved",
  createdDate: "2025-05-15",
  assignedTo: "Support Team",
  affectedAmount: 15000,
  response: "Policy clarified. Partial refund has been processed as per T&C."
}];
const AdminSupportVendorIssues = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isResponseDialogOpen, setIsResponseDialogOpen] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [adminResponse, setAdminResponse] = useState("");
  const filteredIssues = vendorIssuesData.filter(issue => {
    const matchesSearch = issue.vendorName.toLowerCase().includes(searchQuery.toLowerCase()) || issue.subject.toLowerCase().includes(searchQuery.toLowerCase()) || issue.contactPerson.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || issue.category === categoryFilter;
    const matchesStatus = statusFilter === "all" || issue.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || issue.priority === priorityFilter;
    return matchesSearch && matchesCategory && matchesStatus && matchesPriority;
  });
  const getStatusColor = status => {
    switch (status) {
      case "open":
        return "bg-red-100 text-red-800";
      case "in_progress":
        return "bg-yellow-100 text-yellow-800";
      case "resolved":
        return "bg-green-100 text-green-800";
      case "closed":
        return "bg-gray-100 text-gray-800";
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
  const getCategoryColor = category => {
    switch (category) {
      case "payment":
        return "bg-orange-100 text-orange-800";
      case "commission":
        return "bg-blue-100 text-blue-800";
      case "policy":
        return "bg-purple-100 text-purple-800";
      case "technical":
        return "bg-green-100 text-green-800";
      case "legal":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  const handleViewIssue = issue => {
    console.log("Viewing issue:", issue);
    setSelectedIssue(issue);
    setIsViewDialogOpen(true);
  };
  const handleAddResponse = issue => {
    console.log("Adding response to issue:", issue);
    setSelectedIssue(issue);
    setAdminResponse(issue.response || "");
    setIsResponseDialogOpen(true);
  };
  const handleSubmitResponse = () => {
    console.log("Submitting response for issue:", selectedIssue?.id, adminResponse);
    setIsResponseDialogOpen(false);
    setSelectedIssue(null);
    setAdminResponse("");
    alert("Response submitted successfully!");
  };
  const handleContactVendor = issue => {
    console.log("Contacting vendor:", issue);
    const contactMethod = confirm("Choose contact method:\nOK for Phone Call\nCancel for Email");
    if (contactMethod) {
      alert(`Initiating phone call to ${issue.vendorPhone}`);
    } else {
      alert(`Sending email to ${issue.vendorEmail}`);
    }
  };
  const handleMarkResolved = issue => {
    console.log("Marking issue as resolved:", issue);
    if (confirm(`Are you sure you want to mark issue ${issue.id} as resolved?`)) {
      alert("Issue marked as resolved!");
    }
  };
  return /*#__PURE__*/_jsxs("div", {
    children: [/*#__PURE__*/_jsx("div", {
      className: "flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8",
      children: /*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx("h1", {
          className: "text-2xl font-bold",
          children: "Vendor Issues"
        }), /*#__PURE__*/_jsx("p", {
          className: "text-gray-500",
          children: "Manage and resolve vendor complaints and disputes"
        })]
      })
    }), /*#__PURE__*/_jsxs("div", {
      className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8",
      children: [/*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsxs(CardHeader, {
          className: "flex flex-row items-center justify-between pb-2",
          children: [/*#__PURE__*/_jsx(CardTitle, {
            className: "text-sm font-medium",
            children: "Total Issues"
          }), /*#__PURE__*/_jsx(Building2, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "89"
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
            children: "Open Cases"
          }), /*#__PURE__*/_jsx(AlertTriangle, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "12"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-xs text-muted-foreground",
            children: "Pending resolution"
          })]
        })]
      }), /*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsxs(CardHeader, {
          className: "flex flex-row items-center justify-between pb-2",
          children: [/*#__PURE__*/_jsx(CardTitle, {
            className: "text-sm font-medium",
            children: "Avg Resolution Time"
          }), /*#__PURE__*/_jsx(Clock, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "1.8 days"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-xs text-muted-foreground",
            children: "Average time"
          })]
        })]
      }), /*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsxs(CardHeader, {
          className: "flex flex-row items-center justify-between pb-2",
          children: [/*#__PURE__*/_jsx(CardTitle, {
            className: "text-sm font-medium",
            children: "Affected Amount"
          }), /*#__PURE__*/_jsx(DollarSign, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "\u20B92.8L"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-xs text-muted-foreground",
            children: "In dispute"
          })]
        })]
      })]
    }), /*#__PURE__*/_jsxs(Card, {
      children: [/*#__PURE__*/_jsxs(CardHeader, {
        children: [/*#__PURE__*/_jsx(CardTitle, {
          children: "Vendor Issues"
        }), /*#__PURE__*/_jsx(CardDescription, {
          children: "View and manage all vendor complaints and disputes"
        })]
      }), /*#__PURE__*/_jsxs(CardContent, {
        children: [/*#__PURE__*/_jsxs("div", {
          className: "flex flex-col lg:flex-row gap-4 mb-6",
          children: [/*#__PURE__*/_jsxs("div", {
            className: "relative flex-1",
            children: [/*#__PURE__*/_jsx(Search, {
              className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4"
            }), /*#__PURE__*/_jsx(Input, {
              placeholder: "Search by vendor, contact person, or subject...",
              value: searchQuery,
              onChange: e => setSearchQuery(e.target.value),
              className: "pl-10"
            })]
          }), /*#__PURE__*/_jsxs(Select, {
            value: categoryFilter,
            onValueChange: setCategoryFilter,
            children: [/*#__PURE__*/_jsx(SelectTrigger, {
              className: "w-40",
              children: /*#__PURE__*/_jsx(SelectValue, {
                placeholder: "Category"
              })
            }), /*#__PURE__*/_jsxs(SelectContent, {
              children: [/*#__PURE__*/_jsx(SelectItem, {
                value: "all",
                children: "All Categories"
              }), /*#__PURE__*/_jsx(SelectItem, {
                value: "payment",
                children: "Payment"
              }), /*#__PURE__*/_jsx(SelectItem, {
                value: "commission",
                children: "Commission"
              }), /*#__PURE__*/_jsx(SelectItem, {
                value: "policy",
                children: "Policy"
              }), /*#__PURE__*/_jsx(SelectItem, {
                value: "technical",
                children: "Technical"
              }), /*#__PURE__*/_jsx(SelectItem, {
                value: "legal",
                children: "Legal"
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
                value: "open",
                children: "Open"
              }), /*#__PURE__*/_jsx(SelectItem, {
                value: "in_progress",
                children: "In Progress"
              }), /*#__PURE__*/_jsx(SelectItem, {
                value: "resolved",
                children: "Resolved"
              }), /*#__PURE__*/_jsx(SelectItem, {
                value: "closed",
                children: "Closed"
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
                  children: "Vendor Details"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Issue Details"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Contact Person"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Category"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Priority"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Affected Amount"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Status"
                }), /*#__PURE__*/_jsx(TableHead, {
                  className: "text-right",
                  children: "Actions"
                })]
              })
            }), /*#__PURE__*/_jsx(TableBody, {
              children: filteredIssues.map(issue => /*#__PURE__*/_jsxs(TableRow, {
                children: [/*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsxs("div", {
                    children: [/*#__PURE__*/_jsx("div", {
                      className: "font-medium",
                      children: issue.vendorName
                    }), /*#__PURE__*/_jsx("div", {
                      className: "text-sm text-gray-500",
                      children: issue.vendorEmail
                    }), /*#__PURE__*/_jsx("div", {
                      className: "text-xs text-gray-400",
                      children: issue.vendorPhone
                    })]
                  })
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsxs("div", {
                    children: [/*#__PURE__*/_jsx("div", {
                      className: "font-medium",
                      children: issue.subject
                    }), /*#__PURE__*/_jsx("div", {
                      className: "text-sm text-gray-500 max-w-xs",
                      children: issue.description.length > 60 ? `${issue.description.substring(0, 60)}...` : issue.description
                    }), /*#__PURE__*/_jsxs("div", {
                      className: "text-xs text-gray-400",
                      children: [issue.createdDate, " \u2022 ID: ", issue.id]
                    })]
                  })
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsxs("div", {
                    children: [/*#__PURE__*/_jsx("div", {
                      className: "font-medium",
                      children: issue.contactPerson
                    }), /*#__PURE__*/_jsx("div", {
                      className: "text-xs text-gray-500",
                      children: "Primary Contact"
                    })]
                  })
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsx(Badge, {
                    className: getCategoryColor(issue.category),
                    children: issue.category
                  })
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsx(Badge, {
                    className: getPriorityColor(issue.priority),
                    children: issue.priority
                  })
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsxs("div", {
                    className: "font-medium",
                    children: ["\u20B9", issue.affectedAmount.toLocaleString()]
                  })
                }), /*#__PURE__*/_jsxs(TableCell, {
                  children: [/*#__PURE__*/_jsx(Badge, {
                    className: getStatusColor(issue.status),
                    children: issue.status.replace('_', ' ')
                  }), /*#__PURE__*/_jsx("div", {
                    className: "text-xs text-gray-400 mt-1",
                    children: issue.assignedTo
                  })]
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
                        onClick: () => handleViewIssue(issue),
                        children: [/*#__PURE__*/_jsx(Eye, {
                          className: "mr-2 h-4 w-4"
                        }), "View Details"]
                      }), /*#__PURE__*/_jsxs(DropdownMenuItem, {
                        onClick: () => handleAddResponse(issue),
                        children: [/*#__PURE__*/_jsx(MessageCircle, {
                          className: "mr-2 h-4 w-4"
                        }), "Add Response"]
                      }), /*#__PURE__*/_jsxs(DropdownMenuItem, {
                        onClick: () => handleContactVendor(issue),
                        children: [/*#__PURE__*/_jsx(Phone, {
                          className: "mr-2 h-4 w-4"
                        }), "Contact Vendor"]
                      }), /*#__PURE__*/_jsx(DropdownMenuSeparator, {}), /*#__PURE__*/_jsxs(DropdownMenuItem, {
                        onClick: () => handleMarkResolved(issue),
                        children: [/*#__PURE__*/_jsx(CheckCircle, {
                          className: "mr-2 h-4 w-4"
                        }), "Mark Resolved"]
                      })]
                    })]
                  })
                })]
              }, issue.id))
            })]
          })
        })]
      })]
    }), /*#__PURE__*/_jsx(Dialog, {
      open: isViewDialogOpen,
      onOpenChange: setIsViewDialogOpen,
      children: /*#__PURE__*/_jsxs(DialogContent, {
        className: "max-w-3xl",
        children: [/*#__PURE__*/_jsxs(DialogHeader, {
          children: [/*#__PURE__*/_jsx(DialogTitle, {
            children: "Issue Details"
          }), /*#__PURE__*/_jsx(DialogDescription, {
            children: "Full details of the vendor issue"
          })]
        }), selectedIssue && /*#__PURE__*/_jsxs("div", {
          className: "py-4 space-y-4",
          children: [/*#__PURE__*/_jsxs("div", {
            className: "grid grid-cols-2 gap-4",
            children: [/*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx(Label, {
                className: "font-medium",
                children: "Vendor Name"
              }), /*#__PURE__*/_jsx("p", {
                className: "text-sm",
                children: selectedIssue.vendorName
              })]
            }), /*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx(Label, {
                className: "font-medium",
                children: "Contact Person"
              }), /*#__PURE__*/_jsx("p", {
                className: "text-sm",
                children: selectedIssue.contactPerson
              })]
            }), /*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx(Label, {
                className: "font-medium",
                children: "Email"
              }), /*#__PURE__*/_jsx("p", {
                className: "text-sm",
                children: selectedIssue.vendorEmail
              })]
            }), /*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx(Label, {
                className: "font-medium",
                children: "Phone"
              }), /*#__PURE__*/_jsx("p", {
                className: "text-sm",
                children: selectedIssue.vendorPhone
              })]
            }), /*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx(Label, {
                className: "font-medium",
                children: "Category"
              }), /*#__PURE__*/_jsx(Badge, {
                className: getCategoryColor(selectedIssue.category),
                children: selectedIssue.category
              })]
            }), /*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx(Label, {
                className: "font-medium",
                children: "Priority"
              }), /*#__PURE__*/_jsx(Badge, {
                className: getPriorityColor(selectedIssue.priority),
                children: selectedIssue.priority
              })]
            }), /*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx(Label, {
                className: "font-medium",
                children: "Affected Amount"
              }), /*#__PURE__*/_jsxs("p", {
                className: "text-sm",
                children: ["\u20B9", selectedIssue.affectedAmount.toLocaleString()]
              })]
            }), /*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx(Label, {
                className: "font-medium",
                children: "Date Created"
              }), /*#__PURE__*/_jsx("p", {
                className: "text-sm",
                children: selectedIssue.createdDate
              })]
            })]
          }), /*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx(Label, {
              className: "font-medium",
              children: "Subject"
            }), /*#__PURE__*/_jsx("p", {
              className: "text-sm",
              children: selectedIssue.subject
            })]
          }), /*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx(Label, {
              className: "font-medium",
              children: "Description"
            }), /*#__PURE__*/_jsx("p", {
              className: "text-sm",
              children: selectedIssue.description
            })]
          }), selectedIssue.response && /*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx(Label, {
              className: "font-medium",
              children: "Admin Response"
            }), /*#__PURE__*/_jsx("p", {
              className: "text-sm bg-gray-50 p-3 rounded",
              children: selectedIssue.response
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
            children: "Respond to the vendor issue"
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
            placeholder: "Enter your response to the vendor...",
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
export default AdminSupportVendorIssues;