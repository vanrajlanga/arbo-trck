import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, MoreHorizontal, Eye, MessageSquare, Clock, CheckCircle, XCircle, AlertCircle, Plus, Download, ArrowUpDown, User, Tag } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock data for tickets
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const ticketsData = [{
  id: "TKT001",
  userId: "USR001",
  userName: "Rahul Sharma",
  userEmail: "rahul@email.com",
  subject: "Payment not reflected after booking",
  category: "Payment",
  priority: "High",
  status: "Open",
  createdDate: "2025-06-01",
  lastUpdated: "2025-06-02",
  description: "I made a payment for trek booking but it's not showing as confirmed. Transaction ID: TXN123456",
  assignedTo: "Support Team A",
  responseTime: "2 hours",
  trekName: "Himalayan Base Camp Trek"
}, {
  id: "TKT002",
  userId: "USR002",
  userName: "Priya Patel",
  userEmail: "priya@email.com",
  subject: "Unable to cancel booking",
  category: "Booking",
  priority: "Medium",
  status: "In Progress",
  createdDate: "2025-06-01",
  lastUpdated: "2025-06-03",
  description: "I'm trying to cancel my trek booking but the cancel button is not working.",
  assignedTo: "Support Team B",
  responseTime: "4 hours",
  trekName: "Goa Beach Trek"
}, {
  id: "TKT003",
  userId: "USR003",
  userName: "Ankit Gupta",
  userEmail: "ankit@email.com",
  subject: "Refund not processed",
  category: "Refund",
  priority: "High",
  status: "Resolved",
  createdDate: "2025-05-28",
  lastUpdated: "2025-05-30",
  description: "My trek was cancelled but refund hasn't been processed after 5 days.",
  assignedTo: "Finance Team",
  responseTime: "1 hour",
  trekName: "Western Ghats Trek"
}, {
  id: "TKT004",
  userId: "USR004",
  userName: "Neha Singh",
  userEmail: "neha@email.com",
  subject: "Wrong pickup point information",
  category: "Information",
  priority: "Low",
  status: "Closed",
  createdDate: "2025-05-25",
  lastUpdated: "2025-05-26",
  description: "The pickup point address provided is incorrect. Please update.",
  assignedTo: "Operations Team",
  responseTime: "6 hours",
  trekName: "Sahyadri Range Trek"
}];
const AdminUserTickets = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [sortBy, setSortBy] = useState("createdDate");
  const [sortOrder, setSortOrder] = useState("desc");
  const filteredTickets = ticketsData.filter(ticket => {
    const matchesSearch = ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) || ticket.userName.toLowerCase().includes(searchQuery.toLowerCase()) || ticket.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || ticket.status.toLowerCase() === statusFilter;
    const matchesPriority = priorityFilter === "all" || ticket.priority.toLowerCase() === priorityFilter;
    const matchesCategory = categoryFilter === "all" || ticket.category.toLowerCase() === categoryFilter;
    return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
  }).sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];
    if (sortOrder === "asc") {
      return aValue > bValue ? 1 : -1;
    }
    return aValue < bValue ? 1 : -1;
  });
  const getStatusIcon = status => {
    switch (status.toLowerCase()) {
      case "open":
        return /*#__PURE__*/_jsx(AlertCircle, {
          className: "h-4 w-4"
        });
      case "in progress":
        return /*#__PURE__*/_jsx(Clock, {
          className: "h-4 w-4"
        });
      case "resolved":
        return /*#__PURE__*/_jsx(CheckCircle, {
          className: "h-4 w-4"
        });
      case "closed":
        return /*#__PURE__*/_jsx(XCircle, {
          className: "h-4 w-4"
        });
      default:
        return /*#__PURE__*/_jsx(AlertCircle, {
          className: "h-4 w-4"
        });
    }
  };
  const getStatusColor = status => {
    switch (status.toLowerCase()) {
      case "open":
        return "destructive";
      case "in progress":
        return "default";
      case "resolved":
        return "default";
      case "closed":
        return "secondary";
      default:
        return "default";
    }
  };
  const getPriorityColor = priority => {
    switch (priority.toLowerCase()) {
      case "high":
        return "destructive";
      case "medium":
        return "default";
      case "low":
        return "secondary";
      default:
        return "default";
    }
  };
  const handleSort = field => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
  };
  return /*#__PURE__*/_jsxs("div", {
    children: [/*#__PURE__*/_jsxs("div", {
      className: "flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8",
      children: [/*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx("h1", {
          className: "text-2xl font-bold",
          children: "Support Tickets"
        }), /*#__PURE__*/_jsx("p", {
          className: "text-gray-500",
          children: "Manage user support tickets and complaints"
        })]
      }), /*#__PURE__*/_jsxs("div", {
        className: "mt-4 lg:mt-0 flex flex-col sm:flex-row gap-4",
        children: [/*#__PURE__*/_jsxs(Button, {
          variant: "outline",
          children: [/*#__PURE__*/_jsx(Download, {
            className: "mr-2 h-4 w-4"
          }), "Export"]
        }), /*#__PURE__*/_jsxs(Button, {
          children: [/*#__PURE__*/_jsx(Plus, {
            className: "mr-2 h-4 w-4"
          }), "Create Ticket"]
        })]
      })]
    }), /*#__PURE__*/_jsxs("div", {
      className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8",
      children: [/*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsxs(CardHeader, {
          className: "flex flex-row items-center justify-between pb-2",
          children: [/*#__PURE__*/_jsx(CardTitle, {
            className: "text-sm font-medium",
            children: "Total Tickets"
          }), /*#__PURE__*/_jsx(MessageSquare, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "156"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-xs text-muted-foreground",
            children: "+12 from last week"
          })]
        })]
      }), /*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsxs(CardHeader, {
          className: "flex flex-row items-center justify-between pb-2",
          children: [/*#__PURE__*/_jsx(CardTitle, {
            className: "text-sm font-medium",
            children: "Open Tickets"
          }), /*#__PURE__*/_jsx(AlertCircle, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "23"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-xs text-muted-foreground",
            children: "Requires attention"
          })]
        })]
      }), /*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsxs(CardHeader, {
          className: "flex flex-row items-center justify-between pb-2",
          children: [/*#__PURE__*/_jsx(CardTitle, {
            className: "text-sm font-medium",
            children: "Avg Response Time"
          }), /*#__PURE__*/_jsx(Clock, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "3.2h"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-xs text-muted-foreground",
            children: "-15% from last week"
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
            children: "94.5%"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-xs text-muted-foreground",
            children: "+2.1% from last month"
          })]
        })]
      })]
    }), /*#__PURE__*/_jsxs(Card, {
      className: "mb-6",
      children: [/*#__PURE__*/_jsxs(CardHeader, {
        children: [/*#__PURE__*/_jsx(CardTitle, {
          children: "Tickets Management"
        }), /*#__PURE__*/_jsx(CardDescription, {
          children: "View and manage all user support tickets"
        })]
      }), /*#__PURE__*/_jsxs(CardContent, {
        children: [/*#__PURE__*/_jsxs("div", {
          className: "flex flex-col lg:flex-row gap-4 mb-6",
          children: [/*#__PURE__*/_jsxs("div", {
            className: "relative flex-1",
            children: [/*#__PURE__*/_jsx(Search, {
              className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4"
            }), /*#__PURE__*/_jsx(Input, {
              placeholder: "Search tickets by ID, subject, or user...",
              value: searchQuery,
              onChange: e => setSearchQuery(e.target.value),
              className: "pl-10"
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "flex flex-wrap gap-2",
            children: [/*#__PURE__*/_jsxs(Select, {
              value: statusFilter,
              onValueChange: setStatusFilter,
              children: [/*#__PURE__*/_jsx(SelectTrigger, {
                className: "w-32",
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
                  value: "in progress",
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
                className: "w-32",
                children: /*#__PURE__*/_jsx(SelectValue, {
                  placeholder: "Priority"
                })
              }), /*#__PURE__*/_jsxs(SelectContent, {
                children: [/*#__PURE__*/_jsx(SelectItem, {
                  value: "all",
                  children: "All Priority"
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
            }), /*#__PURE__*/_jsxs(Select, {
              value: categoryFilter,
              onValueChange: setCategoryFilter,
              children: [/*#__PURE__*/_jsx(SelectTrigger, {
                className: "w-32",
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
                  value: "booking",
                  children: "Booking"
                }), /*#__PURE__*/_jsx(SelectItem, {
                  value: "refund",
                  children: "Refund"
                }), /*#__PURE__*/_jsx(SelectItem, {
                  value: "information",
                  children: "Information"
                })]
              })]
            })]
          })]
        }), /*#__PURE__*/_jsx("div", {
          className: "overflow-x-auto",
          children: /*#__PURE__*/_jsxs(Table, {
            children: [/*#__PURE__*/_jsx(TableHeader, {
              children: /*#__PURE__*/_jsxs(TableRow, {
                children: [/*#__PURE__*/_jsx(TableHead, {
                  className: "cursor-pointer",
                  onClick: () => handleSort("id"),
                  children: /*#__PURE__*/_jsxs("div", {
                    className: "flex items-center",
                    children: ["Ticket ID", /*#__PURE__*/_jsx(ArrowUpDown, {
                      className: "ml-2 h-4 w-4"
                    })]
                  })
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "User"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Subject"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Category"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Priority"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Status"
                }), /*#__PURE__*/_jsx(TableHead, {
                  className: "cursor-pointer",
                  onClick: () => handleSort("createdDate"),
                  children: /*#__PURE__*/_jsxs("div", {
                    className: "flex items-center",
                    children: ["Created", /*#__PURE__*/_jsx(ArrowUpDown, {
                      className: "ml-2 h-4 w-4"
                    })]
                  })
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Response Time"
                }), /*#__PURE__*/_jsx(TableHead, {
                  className: "text-right",
                  children: "Actions"
                })]
              })
            }), /*#__PURE__*/_jsx(TableBody, {
              children: filteredTickets.map(ticket => /*#__PURE__*/_jsxs(TableRow, {
                children: [/*#__PURE__*/_jsx(TableCell, {
                  className: "font-medium",
                  children: ticket.id
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsxs("div", {
                    children: [/*#__PURE__*/_jsx("div", {
                      className: "font-medium",
                      children: ticket.userName
                    }), /*#__PURE__*/_jsx("div", {
                      className: "text-sm text-gray-500",
                      children: ticket.userEmail
                    })]
                  })
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsxs("div", {
                    className: "max-w-xs",
                    children: [/*#__PURE__*/_jsx("div", {
                      className: "font-medium truncate",
                      children: ticket.subject
                    }), /*#__PURE__*/_jsx("div", {
                      className: "text-sm text-gray-500",
                      children: ticket.trekName
                    })]
                  })
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsx(Badge, {
                    variant: "outline",
                    children: ticket.category
                  })
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsx(Badge, {
                    variant: getPriorityColor(ticket.priority),
                    children: ticket.priority
                  })
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsxs(Badge, {
                    variant: getStatusColor(ticket.status),
                    className: "flex items-center gap-1 w-fit",
                    children: [getStatusIcon(ticket.status), ticket.status]
                  })
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: ticket.createdDate
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: ticket.responseTime
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
                        onClick: () => {
                          setSelectedTicket(ticket);
                          setIsDetailsOpen(true);
                        },
                        children: [/*#__PURE__*/_jsx(Eye, {
                          className: "mr-2 h-4 w-4"
                        }), "View Details"]
                      }), /*#__PURE__*/_jsxs(DropdownMenuItem, {
                        children: [/*#__PURE__*/_jsx(User, {
                          className: "mr-2 h-4 w-4"
                        }), "View User Profile"]
                      }), /*#__PURE__*/_jsxs(DropdownMenuItem, {
                        children: [/*#__PURE__*/_jsx(MessageSquare, {
                          className: "mr-2 h-4 w-4"
                        }), "Add Response"]
                      }), /*#__PURE__*/_jsx(DropdownMenuSeparator, {}), /*#__PURE__*/_jsxs(DropdownMenuItem, {
                        children: [/*#__PURE__*/_jsx(CheckCircle, {
                          className: "mr-2 h-4 w-4"
                        }), "Mark as Resolved"]
                      })]
                    })]
                  })
                })]
              }, ticket.id))
            })]
          })
        })]
      })]
    }), /*#__PURE__*/_jsx(Dialog, {
      open: isDetailsOpen,
      onOpenChange: setIsDetailsOpen,
      children: /*#__PURE__*/_jsxs(DialogContent, {
        className: "max-w-4xl max-h-[80vh] overflow-y-auto",
        children: [/*#__PURE__*/_jsxs(DialogHeader, {
          children: [/*#__PURE__*/_jsxs(DialogTitle, {
            children: ["Ticket Details - ", selectedTicket?.id]
          }), /*#__PURE__*/_jsx(DialogDescription, {
            children: "View and manage ticket information"
          })]
        }), selectedTicket && /*#__PURE__*/_jsxs("div", {
          className: "space-y-6",
          children: [/*#__PURE__*/_jsxs("div", {
            className: "grid grid-cols-1 md:grid-cols-2 gap-4",
            children: [/*#__PURE__*/_jsxs("div", {
              className: "space-y-2",
              children: [/*#__PURE__*/_jsx("h4", {
                className: "font-medium",
                children: "User Information"
              }), /*#__PURE__*/_jsxs("div", {
                className: "text-sm",
                children: [/*#__PURE__*/_jsxs("p", {
                  children: [/*#__PURE__*/_jsx("strong", {
                    children: "Name:"
                  }), " ", selectedTicket.userName]
                }), /*#__PURE__*/_jsxs("p", {
                  children: [/*#__PURE__*/_jsx("strong", {
                    children: "Email:"
                  }), " ", selectedTicket.userEmail]
                }), /*#__PURE__*/_jsxs("p", {
                  children: [/*#__PURE__*/_jsx("strong", {
                    children: "User ID:"
                  }), " ", selectedTicket.userId]
                })]
              })]
            }), /*#__PURE__*/_jsxs("div", {
              className: "space-y-2",
              children: [/*#__PURE__*/_jsx("h4", {
                className: "font-medium",
                children: "Ticket Information"
              }), /*#__PURE__*/_jsxs("div", {
                className: "text-sm",
                children: [/*#__PURE__*/_jsxs("p", {
                  children: [/*#__PURE__*/_jsx("strong", {
                    children: "Created:"
                  }), " ", selectedTicket.createdDate]
                }), /*#__PURE__*/_jsxs("p", {
                  children: [/*#__PURE__*/_jsx("strong", {
                    children: "Last Updated:"
                  }), " ", selectedTicket.lastUpdated]
                }), /*#__PURE__*/_jsxs("p", {
                  children: [/*#__PURE__*/_jsx("strong", {
                    children: "Assigned To:"
                  }), " ", selectedTicket.assignedTo]
                })]
              })]
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "space-y-2",
            children: [/*#__PURE__*/_jsx("h4", {
              className: "font-medium",
              children: "Subject"
            }), /*#__PURE__*/_jsx("p", {
              className: "text-sm bg-gray-50 p-3 rounded-md",
              children: selectedTicket.subject
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "space-y-2",
            children: [/*#__PURE__*/_jsx("h4", {
              className: "font-medium",
              children: "Description"
            }), /*#__PURE__*/_jsx("p", {
              className: "text-sm bg-gray-50 p-3 rounded-md",
              children: selectedTicket.description
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "flex flex-wrap gap-4",
            children: [/*#__PURE__*/_jsxs("div", {
              className: "flex items-center gap-2",
              children: [/*#__PURE__*/_jsx(Tag, {
                className: "h-4 w-4"
              }), /*#__PURE__*/_jsx("span", {
                className: "text-sm",
                children: "Category:"
              }), /*#__PURE__*/_jsx(Badge, {
                variant: "outline",
                children: selectedTicket.category
              })]
            }), /*#__PURE__*/_jsxs("div", {
              className: "flex items-center gap-2",
              children: [/*#__PURE__*/_jsx(AlertCircle, {
                className: "h-4 w-4"
              }), /*#__PURE__*/_jsx("span", {
                className: "text-sm",
                children: "Priority:"
              }), /*#__PURE__*/_jsx(Badge, {
                variant: getPriorityColor(selectedTicket.priority),
                children: selectedTicket.priority
              })]
            }), /*#__PURE__*/_jsxs("div", {
              className: "flex items-center gap-2",
              children: [getStatusIcon(selectedTicket.status), /*#__PURE__*/_jsx("span", {
                className: "text-sm",
                children: "Status:"
              }), /*#__PURE__*/_jsx(Badge, {
                variant: getStatusColor(selectedTicket.status),
                children: selectedTicket.status
              })]
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "space-y-2",
            children: [/*#__PURE__*/_jsx("h4", {
              className: "font-medium",
              children: "Add Response"
            }), /*#__PURE__*/_jsx(Textarea, {
              placeholder: "Type your response here...",
              className: "min-h-[100px]"
            }), /*#__PURE__*/_jsxs("div", {
              className: "flex gap-2",
              children: [/*#__PURE__*/_jsx(Button, {
                children: "Send Response"
              }), /*#__PURE__*/_jsx(Button, {
                variant: "outline",
                children: "Save as Draft"
              })]
            })]
          })]
        })]
      })
    }), /*#__PURE__*/_jsxs("div", {
      className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
      children: [/*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsx(CardHeader, {
          children: /*#__PURE__*/_jsx(CardTitle, {
            children: "Quick Actions"
          })
        }), /*#__PURE__*/_jsxs(CardContent, {
          className: "space-y-3",
          children: [/*#__PURE__*/_jsxs(Button, {
            variant: "outline",
            className: "w-full justify-start",
            children: [/*#__PURE__*/_jsx(Plus, {
              className: "mr-2 h-4 w-4"
            }), "Create New Ticket"]
          }), /*#__PURE__*/_jsxs(Button, {
            variant: "outline",
            className: "w-full justify-start",
            children: [/*#__PURE__*/_jsx(Download, {
              className: "mr-2 h-4 w-4"
            }), "Export Reports"]
          }), /*#__PURE__*/_jsx(Link, {
            to: "/admin/users/emergency",
            children: /*#__PURE__*/_jsxs(Button, {
              variant: "outline",
              className: "w-full justify-start",
              children: [/*#__PURE__*/_jsx(AlertCircle, {
                className: "mr-2 h-4 w-4"
              }), "Emergency Contacts"]
            })
          })]
        })]
      }), /*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsx(CardHeader, {
          children: /*#__PURE__*/_jsx(CardTitle, {
            children: "Recent Activity"
          })
        }), /*#__PURE__*/_jsx(CardContent, {
          children: /*#__PURE__*/_jsxs("div", {
            className: "space-y-3",
            children: [/*#__PURE__*/_jsxs("div", {
              className: "flex items-center justify-between text-sm",
              children: [/*#__PURE__*/_jsx("span", {
                children: "TKT001 - Response added"
              }), /*#__PURE__*/_jsx("span", {
                className: "text-gray-500",
                children: "2h ago"
              })]
            }), /*#__PURE__*/_jsxs("div", {
              className: "flex items-center justify-between text-sm",
              children: [/*#__PURE__*/_jsx("span", {
                children: "TKT005 - Status changed"
              }), /*#__PURE__*/_jsx("span", {
                className: "text-gray-500",
                children: "4h ago"
              })]
            }), /*#__PURE__*/_jsxs("div", {
              className: "flex items-center justify-between text-sm",
              children: [/*#__PURE__*/_jsx("span", {
                children: "TKT003 - Resolved"
              }), /*#__PURE__*/_jsx("span", {
                className: "text-gray-500",
                children: "1d ago"
              })]
            })]
          })
        })]
      }), /*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsx(CardHeader, {
          children: /*#__PURE__*/_jsx(CardTitle, {
            children: "Team Performance"
          })
        }), /*#__PURE__*/_jsx(CardContent, {
          children: /*#__PURE__*/_jsxs("div", {
            className: "space-y-3",
            children: [/*#__PURE__*/_jsxs("div", {
              className: "flex items-center justify-between text-sm",
              children: [/*#__PURE__*/_jsx("span", {
                children: "Support Team A"
              }), /*#__PURE__*/_jsx("span", {
                className: "font-medium",
                children: "12 tickets"
              })]
            }), /*#__PURE__*/_jsxs("div", {
              className: "flex items-center justify-between text-sm",
              children: [/*#__PURE__*/_jsx("span", {
                children: "Support Team B"
              }), /*#__PURE__*/_jsx("span", {
                className: "font-medium",
                children: "8 tickets"
              })]
            }), /*#__PURE__*/_jsxs("div", {
              className: "flex items-center justify-between text-sm",
              children: [/*#__PURE__*/_jsx("span", {
                children: "Finance Team"
              }), /*#__PURE__*/_jsx("span", {
                className: "font-medium",
                children: "3 tickets"
              })]
            })]
          })
        })]
      })]
    })]
  });
};
export default AdminUserTickets;