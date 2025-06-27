import { useState } from "react";
import { Search, Filter, MessageSquare, Clock, CheckCircle, AlertTriangle, Star, MoreHorizontal, Eye, MessageCircle, Phone } from "lucide-react";
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

// Mock data for user complaints
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const complaintsData = [{
  id: "COMP001",
  customerName: "John Doe",
  customerEmail: "john@example.com",
  customerPhone: "+91 98765 43210",
  trekName: "Everest Base Camp",
  bookingId: "BOOK001",
  subject: "Poor accommodation quality",
  description: "The accommodation provided was not as described in the booking. No hot water and dirty rooms.",
  category: "accommodation",
  priority: "high",
  status: "open",
  createdDate: "2025-05-20",
  assignedTo: "Support Team A",
  rating: 2,
  response: ""
}, {
  id: "COMP002",
  customerName: "Sarah Smith",
  customerEmail: "sarah@example.com",
  customerPhone: "+91 87654 32109",
  trekName: "Annapurna Circuit",
  bookingId: "BOOK002",
  subject: "Guide was unprofessional",
  description: "Our trek guide was frequently late and seemed unprepared. The safety briefing was inadequate.",
  category: "guide_service",
  priority: "medium",
  status: "in_progress",
  createdDate: "2025-05-18",
  assignedTo: "Support Team B",
  rating: 3,
  response: "We have contacted the vendor and are investigating this matter."
}, {
  id: "COMP003",
  customerName: "Mike Johnson",
  customerEmail: "mike@example.com",
  customerPhone: "+91 76543 21098",
  trekName: "Kilimanjaro Trek",
  bookingId: "BOOK003",
  subject: "Overcharged for extras",
  description: "I was charged extra for services that were supposed to be included in the package.",
  category: "billing",
  priority: "high",
  status: "resolved",
  createdDate: "2025-05-15",
  assignedTo: "Support Team A",
  rating: 1,
  response: "Refund processed for the incorrect charges. Apologies for the inconvenience."
}];
const AdminSupportComplaints = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isResponseDialogOpen, setIsResponseDialogOpen] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [adminResponse, setAdminResponse] = useState("");
  const filteredComplaints = complaintsData.filter(complaint => {
    const matchesSearch = complaint.customerName.toLowerCase().includes(searchQuery.toLowerCase()) || complaint.subject.toLowerCase().includes(searchQuery.toLowerCase()) || complaint.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || complaint.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || complaint.priority === priorityFilter;
    const matchesCategory = categoryFilter === "all" || complaint.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
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
      case "accommodation":
        return "bg-blue-100 text-blue-800";
      case "guide_service":
        return "bg-purple-100 text-purple-800";
      case "billing":
        return "bg-orange-100 text-orange-800";
      case "safety":
        return "bg-red-100 text-red-800";
      case "food":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  const getRatingStars = rating => {
    return Array.from({
      length: 5
    }, (_, i) => /*#__PURE__*/_jsx(Star, {
      className: `h-3 w-3 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`
    }, i));
  };
  const handleViewComplaint = complaint => {
    console.log("Viewing complaint:", complaint);
    setSelectedComplaint(complaint);
    setIsViewDialogOpen(true);
  };
  const handleAddResponse = complaint => {
    console.log("Adding response to complaint:", complaint);
    setSelectedComplaint(complaint);
    setAdminResponse("");
    setIsResponseDialogOpen(true);
  };
  const handleSubmitResponse = () => {
    console.log("Submitting response for complaint:", selectedComplaint?.id, adminResponse);
    setIsResponseDialogOpen(false);
    setSelectedComplaint(null);
    setAdminResponse("");
    alert("Response submitted successfully!");
  };
  const handleResolveComplaint = complaint => {
    console.log("Resolving complaint:", complaint);
    if (confirm(`Are you sure you want to mark complaint ${complaint.id} as resolved?`)) {
      alert("Complaint marked as resolved!");
    }
  };
  const handleContactCustomer = complaint => {
    console.log("Contacting customer:", complaint);
    const contactMethod = confirm("Choose contact method:\nOK for Phone Call\nCancel for Email");
    if (contactMethod) {
      alert(`Initiating phone call to ${complaint.customerPhone}`);
    } else {
      alert(`Sending email to ${complaint.customerEmail}`);
    }
  };
  return /*#__PURE__*/_jsxs("div", {
    children: [/*#__PURE__*/_jsx("div", {
      className: "flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8",
      children: /*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx("h1", {
          className: "text-2xl font-bold",
          children: "User Complaints"
        }), /*#__PURE__*/_jsx("p", {
          className: "text-gray-500",
          children: "Manage and resolve customer complaints and feedback"
        })]
      })
    }), /*#__PURE__*/_jsxs("div", {
      className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8",
      children: [/*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsxs(CardHeader, {
          className: "flex flex-row items-center justify-between pb-2",
          children: [/*#__PURE__*/_jsx(CardTitle, {
            className: "text-sm font-medium",
            children: "Total Complaints"
          }), /*#__PURE__*/_jsx(MessageSquare, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "156"
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
            children: "23"
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
            children: "2.5 days"
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
            children: "Resolution Rate"
          }), /*#__PURE__*/_jsx(CheckCircle, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "85.2%"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-xs text-muted-foreground",
            children: "Success rate"
          })]
        })]
      })]
    }), /*#__PURE__*/_jsxs(Card, {
      children: [/*#__PURE__*/_jsxs(CardHeader, {
        children: [/*#__PURE__*/_jsx(CardTitle, {
          children: "User Complaints"
        }), /*#__PURE__*/_jsx(CardDescription, {
          children: "View and manage all customer complaints and feedback"
        })]
      }), /*#__PURE__*/_jsxs(CardContent, {
        children: [/*#__PURE__*/_jsxs("div", {
          className: "flex flex-col lg:flex-row gap-4 mb-6",
          children: [/*#__PURE__*/_jsxs("div", {
            className: "relative flex-1",
            children: [/*#__PURE__*/_jsx(Search, {
              className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4"
            }), /*#__PURE__*/_jsx(Input, {
              placeholder: "Search by customer, subject, or trek...",
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
                value: "accommodation",
                children: "Accommodation"
              }), /*#__PURE__*/_jsx(SelectItem, {
                value: "guide_service",
                children: "Guide Service"
              }), /*#__PURE__*/_jsx(SelectItem, {
                value: "billing",
                children: "Billing"
              }), /*#__PURE__*/_jsx(SelectItem, {
                value: "safety",
                children: "Safety"
              }), /*#__PURE__*/_jsx(SelectItem, {
                value: "food",
                children: "Food"
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
                  children: "Customer Details"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Complaint Details"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Trek Info"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Category"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Priority"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Rating"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Status"
                }), /*#__PURE__*/_jsx(TableHead, {
                  className: "text-right",
                  children: "Actions"
                })]
              })
            }), /*#__PURE__*/_jsx(TableBody, {
              children: filteredComplaints.map(complaint => /*#__PURE__*/_jsxs(TableRow, {
                children: [/*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsxs("div", {
                    children: [/*#__PURE__*/_jsx("div", {
                      className: "font-medium",
                      children: complaint.customerName
                    }), /*#__PURE__*/_jsx("div", {
                      className: "text-sm text-gray-500",
                      children: complaint.customerEmail
                    }), /*#__PURE__*/_jsx("div", {
                      className: "text-xs text-gray-400",
                      children: complaint.customerPhone
                    })]
                  })
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsxs("div", {
                    children: [/*#__PURE__*/_jsx("div", {
                      className: "font-medium",
                      children: complaint.subject
                    }), /*#__PURE__*/_jsx("div", {
                      className: "text-sm text-gray-500 max-w-xs",
                      children: complaint.description.length > 60 ? `${complaint.description.substring(0, 60)}...` : complaint.description
                    }), /*#__PURE__*/_jsxs("div", {
                      className: "text-xs text-gray-400",
                      children: [complaint.createdDate, " \u2022 ID: ", complaint.id]
                    })]
                  })
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsxs("div", {
                    children: [/*#__PURE__*/_jsx("div", {
                      className: "font-medium",
                      children: complaint.trekName
                    }), /*#__PURE__*/_jsxs("div", {
                      className: "text-sm text-gray-500",
                      children: ["Booking: ", complaint.bookingId]
                    })]
                  })
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsx(Badge, {
                    className: getCategoryColor(complaint.category),
                    children: complaint.category.replace('_', ' ')
                  })
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsx(Badge, {
                    className: getPriorityColor(complaint.priority),
                    children: complaint.priority
                  })
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsx("div", {
                    className: "flex items-center gap-1",
                    children: getRatingStars(complaint.rating)
                  })
                }), /*#__PURE__*/_jsxs(TableCell, {
                  children: [/*#__PURE__*/_jsx(Badge, {
                    className: getStatusColor(complaint.status),
                    children: complaint.status.replace('_', ' ')
                  }), /*#__PURE__*/_jsx("div", {
                    className: "text-xs text-gray-400 mt-1",
                    children: complaint.assignedTo
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
                        onClick: () => handleViewComplaint(complaint),
                        children: [/*#__PURE__*/_jsx(Eye, {
                          className: "mr-2 h-4 w-4"
                        }), "View Details"]
                      }), /*#__PURE__*/_jsxs(DropdownMenuItem, {
                        onClick: () => handleAddResponse(complaint),
                        children: [/*#__PURE__*/_jsx(MessageCircle, {
                          className: "mr-2 h-4 w-4"
                        }), "Add Response"]
                      }), /*#__PURE__*/_jsxs(DropdownMenuItem, {
                        onClick: () => handleContactCustomer(complaint),
                        children: [/*#__PURE__*/_jsx(Phone, {
                          className: "mr-2 h-4 w-4"
                        }), "Contact Customer"]
                      }), /*#__PURE__*/_jsx(DropdownMenuSeparator, {}), /*#__PURE__*/_jsxs(DropdownMenuItem, {
                        onClick: () => handleResolveComplaint(complaint),
                        children: [/*#__PURE__*/_jsx(CheckCircle, {
                          className: "mr-2 h-4 w-4"
                        }), "Mark Resolved"]
                      })]
                    })]
                  })
                })]
              }, complaint.id))
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
            children: "Complaint Details"
          }), /*#__PURE__*/_jsx(DialogDescription, {
            children: "Full details of the customer complaint"
          })]
        }), selectedComplaint && /*#__PURE__*/_jsxs("div", {
          className: "py-4 space-y-4",
          children: [/*#__PURE__*/_jsxs("div", {
            className: "grid grid-cols-2 gap-4",
            children: [/*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx(Label, {
                className: "font-medium",
                children: "Customer Name"
              }), /*#__PURE__*/_jsx("p", {
                className: "text-sm",
                children: selectedComplaint.customerName
              })]
            }), /*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx(Label, {
                className: "font-medium",
                children: "Contact"
              }), /*#__PURE__*/_jsx("p", {
                className: "text-sm",
                children: selectedComplaint.customerEmail
              }), /*#__PURE__*/_jsx("p", {
                className: "text-sm",
                children: selectedComplaint.customerPhone
              })]
            }), /*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx(Label, {
                className: "font-medium",
                children: "Date Submitted"
              }), /*#__PURE__*/_jsx("p", {
                className: "text-sm",
                children: selectedComplaint.submittedDate
              })]
            }), /*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx(Label, {
                className: "font-medium",
                children: "Status"
              }), /*#__PURE__*/_jsx(Badge, {
                className: getStatusColor(selectedComplaint.status),
                children: selectedComplaint.status.replace('_', ' ')
              })]
            })]
          }), /*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx(Label, {
              className: "font-medium",
              children: "Subject"
            }), /*#__PURE__*/_jsx("p", {
              className: "text-sm",
              children: selectedComplaint.subject
            })]
          }), /*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx(Label, {
              className: "font-medium",
              children: "Description"
            }), /*#__PURE__*/_jsx("p", {
              className: "text-sm",
              children: selectedComplaint.description
            })]
          }), selectedComplaint.adminResponse && /*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx(Label, {
              className: "font-medium",
              children: "Admin Response"
            }), /*#__PURE__*/_jsx("p", {
              className: "text-sm bg-gray-50 p-3 rounded",
              children: selectedComplaint.adminResponse
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
            children: "Respond to the customer complaint"
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
export default AdminSupportComplaints;