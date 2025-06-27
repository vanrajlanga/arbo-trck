import { useState } from "react";
import { Search, Filter, Plus, AlertTriangle, Info, CheckCircle, XCircle, Bell, Users, Clock, MoreHorizontal } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock data for system alerts
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const systemAlertsData = [{
  id: "ALT001",
  title: "Payment Gateway Maintenance",
  message: "Payment processing will be temporarily unavailable from 2-4 AM.",
  type: "warning",
  audience: "all",
  status: "active",
  createdDate: "2025-05-22",
  expiryDate: "2025-05-26",
  priority: "high",
  views: 1250,
  dismissed: 890
}, {
  id: "ALT002",
  title: "New Feature Release",
  message: "Check out our new trek filtering feature in the customer portal!",
  type: "info",
  audience: "customers",
  status: "active",
  createdDate: "2025-05-20",
  expiryDate: "2025-06-20",
  priority: "medium",
  views: 856,
  dismissed: 234
}, {
  id: "ALT003",
  title: "Commission Structure Update",
  message: "Important updates to vendor commission rates effective next month.",
  type: "error",
  audience: "vendors",
  status: "expired",
  createdDate: "2025-05-15",
  expiryDate: "2025-05-22",
  priority: "high",
  views: 45,
  dismissed: 45
}];
const AdminCommunicationAlerts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newAlert, setNewAlert] = useState({
    title: "",
    message: "",
    type: "info",
    audience: "all",
    priority: "medium",
    expiryDate: ""
  });
  const filteredAlerts = systemAlertsData.filter(alert => {
    const matchesSearch = alert.title.toLowerCase().includes(searchQuery.toLowerCase()) || alert.message.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || alert.type === typeFilter;
    const matchesStatus = statusFilter === "all" || alert.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });
  const getTypeColor = type => {
    switch (type) {
      case "info":
        return "bg-blue-100 text-blue-800";
      case "warning":
        return "bg-yellow-100 text-yellow-800";
      case "error":
        return "bg-red-100 text-red-800";
      case "success":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  const getTypeIcon = type => {
    switch (type) {
      case "info":
        return /*#__PURE__*/_jsx(Info, {
          className: "h-4 w-4"
        });
      case "warning":
        return /*#__PURE__*/_jsx(AlertTriangle, {
          className: "h-4 w-4"
        });
      case "error":
        return /*#__PURE__*/_jsx(XCircle, {
          className: "h-4 w-4"
        });
      case "success":
        return /*#__PURE__*/_jsx(CheckCircle, {
          className: "h-4 w-4"
        });
      default:
        return /*#__PURE__*/_jsx(Bell, {
          className: "h-4 w-4"
        });
    }
  };
  const getStatusColor = status => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "expired":
        return "bg-red-100 text-red-800";
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  const getAudienceColor = audience => {
    switch (audience) {
      case "customers":
        return "bg-purple-100 text-purple-800";
      case "vendors":
        return "bg-orange-100 text-orange-800";
      case "all":
        return "bg-blue-100 text-blue-800";
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
  return /*#__PURE__*/_jsxs("div", {
    children: [/*#__PURE__*/_jsxs("div", {
      className: "flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8",
      children: [/*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx("h1", {
          className: "text-2xl font-bold",
          children: "System Alerts"
        }), /*#__PURE__*/_jsx("p", {
          className: "text-gray-500",
          children: "Manage system-wide alerts and notifications displayed on user dashboards"
        })]
      }), /*#__PURE__*/_jsx("div", {
        className: "flex gap-2 mt-4 lg:mt-0",
        children: /*#__PURE__*/_jsxs(Button, {
          onClick: () => setIsCreateDialogOpen(true),
          children: [/*#__PURE__*/_jsx(Plus, {
            className: "mr-2 h-4 w-4"
          }), "Create Alert"]
        })
      })]
    }), /*#__PURE__*/_jsxs("div", {
      className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8",
      children: [/*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsxs(CardHeader, {
          className: "flex flex-row items-center justify-between pb-2",
          children: [/*#__PURE__*/_jsx(CardTitle, {
            className: "text-sm font-medium",
            children: "Active Alerts"
          }), /*#__PURE__*/_jsx(Bell, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "5"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-xs text-muted-foreground",
            children: "Currently showing"
          })]
        })]
      }), /*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsxs(CardHeader, {
          className: "flex flex-row items-center justify-between pb-2",
          children: [/*#__PURE__*/_jsx(CardTitle, {
            className: "text-sm font-medium",
            children: "Total Views"
          }), /*#__PURE__*/_jsx(Users, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "2,151"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-xs text-muted-foreground",
            children: "All alerts"
          })]
        })]
      }), /*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsxs(CardHeader, {
          className: "flex flex-row items-center justify-between pb-2",
          children: [/*#__PURE__*/_jsx(CardTitle, {
            className: "text-sm font-medium",
            children: "Dismissal Rate"
          }), /*#__PURE__*/_jsx(XCircle, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "52.4%"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-xs text-muted-foreground",
            children: "Average rate"
          })]
        })]
      }), /*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsxs(CardHeader, {
          className: "flex flex-row items-center justify-between pb-2",
          children: [/*#__PURE__*/_jsx(CardTitle, {
            className: "text-sm font-medium",
            children: "High Priority"
          }), /*#__PURE__*/_jsx(AlertTriangle, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "2"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-xs text-muted-foreground",
            children: "Urgent alerts"
          })]
        })]
      })]
    }), /*#__PURE__*/_jsxs(Card, {
      children: [/*#__PURE__*/_jsxs(CardHeader, {
        children: [/*#__PURE__*/_jsx(CardTitle, {
          children: "System Alerts"
        }), /*#__PURE__*/_jsx(CardDescription, {
          children: "Manage and monitor system-wide alerts and notifications"
        })]
      }), /*#__PURE__*/_jsxs(CardContent, {
        children: [/*#__PURE__*/_jsxs("div", {
          className: "flex flex-col lg:flex-row gap-4 mb-6",
          children: [/*#__PURE__*/_jsxs("div", {
            className: "relative flex-1",
            children: [/*#__PURE__*/_jsx(Search, {
              className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4"
            }), /*#__PURE__*/_jsx(Input, {
              placeholder: "Search alerts...",
              value: searchQuery,
              onChange: e => setSearchQuery(e.target.value),
              className: "pl-10"
            })]
          }), /*#__PURE__*/_jsxs(Select, {
            value: typeFilter,
            onValueChange: setTypeFilter,
            children: [/*#__PURE__*/_jsx(SelectTrigger, {
              className: "w-40",
              children: /*#__PURE__*/_jsx(SelectValue, {
                placeholder: "Type"
              })
            }), /*#__PURE__*/_jsxs(SelectContent, {
              children: [/*#__PURE__*/_jsx(SelectItem, {
                value: "all",
                children: "All Types"
              }), /*#__PURE__*/_jsx(SelectItem, {
                value: "info",
                children: "Info"
              }), /*#__PURE__*/_jsx(SelectItem, {
                value: "warning",
                children: "Warning"
              }), /*#__PURE__*/_jsx(SelectItem, {
                value: "error",
                children: "Error"
              }), /*#__PURE__*/_jsx(SelectItem, {
                value: "success",
                children: "Success"
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
                value: "active",
                children: "Active"
              }), /*#__PURE__*/_jsx(SelectItem, {
                value: "expired",
                children: "Expired"
              }), /*#__PURE__*/_jsx(SelectItem, {
                value: "scheduled",
                children: "Scheduled"
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
                  children: "Alert Details"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Type"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Audience"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Priority"
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
              children: filteredAlerts.map(alert => /*#__PURE__*/_jsxs(TableRow, {
                children: [/*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsxs("div", {
                    children: [/*#__PURE__*/_jsx("div", {
                      className: "font-medium",
                      children: alert.title
                    }), /*#__PURE__*/_jsx("div", {
                      className: "text-sm text-gray-500 max-w-xs",
                      children: alert.message
                    }), /*#__PURE__*/_jsxs("div", {
                      className: "text-xs text-gray-400",
                      children: ["Created: ", alert.createdDate, " \u2022 Expires: ", alert.expiryDate]
                    })]
                  })
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsx(Badge, {
                    className: getTypeColor(alert.type),
                    children: /*#__PURE__*/_jsxs("div", {
                      className: "flex items-center gap-1",
                      children: [getTypeIcon(alert.type), alert.type]
                    })
                  })
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsx(Badge, {
                    className: getAudienceColor(alert.audience),
                    children: alert.audience
                  })
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsx(Badge, {
                    className: getPriorityColor(alert.priority),
                    children: alert.priority
                  })
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsxs("div", {
                    children: [/*#__PURE__*/_jsxs("div", {
                      className: "font-medium",
                      children: [alert.views, " views"]
                    }), /*#__PURE__*/_jsxs("div", {
                      className: "text-xs text-gray-500",
                      children: [alert.dismissed, " dismissed"]
                    })]
                  })
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsx(Badge, {
                    className: getStatusColor(alert.status),
                    children: alert.status
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
                        children: [/*#__PURE__*/_jsx(Bell, {
                          className: "mr-2 h-4 w-4"
                        }), "View Details"]
                      }), /*#__PURE__*/_jsxs(DropdownMenuItem, {
                        children: [/*#__PURE__*/_jsx(Clock, {
                          className: "mr-2 h-4 w-4"
                        }), "Extend Expiry"]
                      }), /*#__PURE__*/_jsx(DropdownMenuSeparator, {}), /*#__PURE__*/_jsxs(DropdownMenuItem, {
                        className: "text-red-600",
                        children: [/*#__PURE__*/_jsx(XCircle, {
                          className: "mr-2 h-4 w-4"
                        }), "Dismiss"]
                      })]
                    })]
                  })
                })]
              }, alert.id))
            })]
          })
        })]
      })]
    }), /*#__PURE__*/_jsx(Dialog, {
      open: isCreateDialogOpen,
      onOpenChange: setIsCreateDialogOpen,
      children: /*#__PURE__*/_jsxs(DialogContent, {
        className: "max-w-2xl",
        children: [/*#__PURE__*/_jsxs(DialogHeader, {
          children: [/*#__PURE__*/_jsx(DialogTitle, {
            children: "Create System Alert"
          }), /*#__PURE__*/_jsx(DialogDescription, {
            children: "Create a new system-wide alert notification"
          })]
        }), /*#__PURE__*/_jsxs("div", {
          className: "space-y-4 py-4",
          children: [/*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx(Label, {
              htmlFor: "title",
              children: "Alert Title"
            }), /*#__PURE__*/_jsx(Input, {
              id: "title",
              value: newAlert.title,
              onChange: e => setNewAlert({
                ...newAlert,
                title: e.target.value
              }),
              placeholder: "Alert title"
            })]
          }), /*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx(Label, {
              htmlFor: "message",
              children: "Message"
            }), /*#__PURE__*/_jsx(Textarea, {
              id: "message",
              value: newAlert.message,
              onChange: e => setNewAlert({
                ...newAlert,
                message: e.target.value
              }),
              placeholder: "Alert message",
              rows: 3
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "grid grid-cols-3 gap-4",
            children: [/*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx(Label, {
                htmlFor: "type",
                children: "Alert Type"
              }), /*#__PURE__*/_jsxs(Select, {
                value: newAlert.type,
                onValueChange: value => setNewAlert({
                  ...newAlert,
                  type: value
                }),
                children: [/*#__PURE__*/_jsx(SelectTrigger, {
                  children: /*#__PURE__*/_jsx(SelectValue, {})
                }), /*#__PURE__*/_jsxs(SelectContent, {
                  children: [/*#__PURE__*/_jsx(SelectItem, {
                    value: "info",
                    children: "Info"
                  }), /*#__PURE__*/_jsx(SelectItem, {
                    value: "warning",
                    children: "Warning"
                  }), /*#__PURE__*/_jsx(SelectItem, {
                    value: "error",
                    children: "Error"
                  }), /*#__PURE__*/_jsx(SelectItem, {
                    value: "success",
                    children: "Success"
                  })]
                })]
              })]
            }), /*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx(Label, {
                htmlFor: "audience",
                children: "Audience"
              }), /*#__PURE__*/_jsxs(Select, {
                value: newAlert.audience,
                onValueChange: value => setNewAlert({
                  ...newAlert,
                  audience: value
                }),
                children: [/*#__PURE__*/_jsx(SelectTrigger, {
                  children: /*#__PURE__*/_jsx(SelectValue, {})
                }), /*#__PURE__*/_jsxs(SelectContent, {
                  children: [/*#__PURE__*/_jsx(SelectItem, {
                    value: "all",
                    children: "All Users"
                  }), /*#__PURE__*/_jsx(SelectItem, {
                    value: "customers",
                    children: "Customers"
                  }), /*#__PURE__*/_jsx(SelectItem, {
                    value: "vendors",
                    children: "Vendors"
                  })]
                })]
              })]
            }), /*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx(Label, {
                htmlFor: "priority",
                children: "Priority"
              }), /*#__PURE__*/_jsxs(Select, {
                value: newAlert.priority,
                onValueChange: value => setNewAlert({
                  ...newAlert,
                  priority: value
                }),
                children: [/*#__PURE__*/_jsx(SelectTrigger, {
                  children: /*#__PURE__*/_jsx(SelectValue, {})
                }), /*#__PURE__*/_jsxs(SelectContent, {
                  children: [/*#__PURE__*/_jsx(SelectItem, {
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
              })]
            })]
          }), /*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx(Label, {
              htmlFor: "expiryDate",
              children: "Expiry Date"
            }), /*#__PURE__*/_jsx(Input, {
              id: "expiryDate",
              type: "datetime-local",
              value: newAlert.expiryDate,
              onChange: e => setNewAlert({
                ...newAlert,
                expiryDate: e.target.value
              })
            })]
          })]
        }), /*#__PURE__*/_jsxs(DialogFooter, {
          children: [/*#__PURE__*/_jsx(Button, {
            variant: "outline",
            onClick: () => setIsCreateDialogOpen(false),
            children: "Cancel"
          }), /*#__PURE__*/_jsxs(Button, {
            children: [/*#__PURE__*/_jsx(Plus, {
              className: "mr-2 h-4 w-4"
            }), "Create Alert"]
          })]
        })]
      })
    })]
  });
};
export default AdminCommunicationAlerts;