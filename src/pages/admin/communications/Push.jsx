import { useState } from "react";
import { Search, Filter, Plus, Send, Users, Clock, Bell, MoreHorizontal } from "lucide-react";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Mock data for push notifications
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const notificationsData = [{
  id: "PUSH001",
  title: "New Trek Added",
  message: "Check out the new Everest Base Camp trek available now!",
  audience: "customers",
  status: "sent",
  sentDate: "2025-05-22",
  recipients: 1250,
  clickRate: 15.4,
  priority: "medium"
}, {
  id: "PUSH002",
  title: "Commission Update",
  message: "Your commission structure has been updated. Please review.",
  audience: "vendors",
  status: "sent",
  sentDate: "2025-05-20",
  recipients: 45,
  clickRate: 85.2,
  priority: "high"
}, {
  id: "PUSH003",
  title: "System Maintenance",
  message: "Platform will be under maintenance from 2-4 AM tonight.",
  audience: "all",
  status: "scheduled",
  sentDate: "2025-05-25",
  recipients: 1295,
  clickRate: 0,
  priority: "high"
}];
const AdminCommunicationPush = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [audienceFilter, setAudienceFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newNotification, setNewNotification] = useState({
    title: "",
    message: "",
    audience: "customers",
    priority: "medium",
    sendNow: "now"
  });
  const filteredNotifications = notificationsData.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchQuery.toLowerCase()) || notification.message.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAudience = audienceFilter === "all" || notification.audience === audienceFilter;
    const matchesStatus = statusFilter === "all" || notification.status === statusFilter;
    return matchesSearch && matchesAudience && matchesStatus;
  });
  const getStatusColor = status => {
    switch (status) {
      case "sent":
        return "bg-green-100 text-green-800";
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
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
          children: "Push Notifications"
        }), /*#__PURE__*/_jsx("p", {
          className: "text-gray-500",
          children: "Send quick notifications to vendors or customers displayed on their dashboards"
        })]
      }), /*#__PURE__*/_jsx("div", {
        className: "flex gap-2 mt-4 lg:mt-0",
        children: /*#__PURE__*/_jsxs(Button, {
          onClick: () => setIsCreateDialogOpen(true),
          children: [/*#__PURE__*/_jsx(Plus, {
            className: "mr-2 h-4 w-4"
          }), "Send Notification"]
        })
      })]
    }), /*#__PURE__*/_jsxs("div", {
      className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8",
      children: [/*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsxs(CardHeader, {
          className: "flex flex-row items-center justify-between pb-2",
          children: [/*#__PURE__*/_jsx(CardTitle, {
            className: "text-sm font-medium",
            children: "Total Sent"
          }), /*#__PURE__*/_jsx(Send, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "156"
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
            children: "Active Recipients"
          }), /*#__PURE__*/_jsx(Users, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "1,295"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-xs text-muted-foreground",
            children: "Total users"
          })]
        })]
      }), /*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsxs(CardHeader, {
          className: "flex flex-row items-center justify-between pb-2",
          children: [/*#__PURE__*/_jsx(CardTitle, {
            className: "text-sm font-medium",
            children: "Avg Click Rate"
          }), /*#__PURE__*/_jsx(Bell, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "32.4%"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-xs text-muted-foreground",
            children: "Last 30 days"
          })]
        })]
      }), /*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsxs(CardHeader, {
          className: "flex flex-row items-center justify-between pb-2",
          children: [/*#__PURE__*/_jsx(CardTitle, {
            className: "text-sm font-medium",
            children: "Scheduled"
          }), /*#__PURE__*/_jsx(Clock, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "3"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-xs text-muted-foreground",
            children: "Pending delivery"
          })]
        })]
      })]
    }), /*#__PURE__*/_jsxs(Card, {
      children: [/*#__PURE__*/_jsxs(CardHeader, {
        children: [/*#__PURE__*/_jsx(CardTitle, {
          children: "Push Notifications"
        }), /*#__PURE__*/_jsx(CardDescription, {
          children: "Manage and send push notifications to customers and vendors"
        })]
      }), /*#__PURE__*/_jsxs(CardContent, {
        children: [/*#__PURE__*/_jsxs("div", {
          className: "flex flex-col lg:flex-row gap-4 mb-6",
          children: [/*#__PURE__*/_jsxs("div", {
            className: "relative flex-1",
            children: [/*#__PURE__*/_jsx(Search, {
              className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4"
            }), /*#__PURE__*/_jsx(Input, {
              placeholder: "Search notifications...",
              value: searchQuery,
              onChange: e => setSearchQuery(e.target.value),
              className: "pl-10"
            })]
          }), /*#__PURE__*/_jsxs(Select, {
            value: audienceFilter,
            onValueChange: setAudienceFilter,
            children: [/*#__PURE__*/_jsx(SelectTrigger, {
              className: "w-40",
              children: /*#__PURE__*/_jsx(SelectValue, {
                placeholder: "Audience"
              })
            }), /*#__PURE__*/_jsxs(SelectContent, {
              children: [/*#__PURE__*/_jsx(SelectItem, {
                value: "all",
                children: "All Audiences"
              }), /*#__PURE__*/_jsx(SelectItem, {
                value: "customers",
                children: "Customers"
              }), /*#__PURE__*/_jsx(SelectItem, {
                value: "vendors",
                children: "Vendors"
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
                value: "sent",
                children: "Sent"
              }), /*#__PURE__*/_jsx(SelectItem, {
                value: "scheduled",
                children: "Scheduled"
              }), /*#__PURE__*/_jsx(SelectItem, {
                value: "draft",
                children: "Draft"
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
                  children: "Notification Details"
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
              children: filteredNotifications.map(notification => /*#__PURE__*/_jsxs(TableRow, {
                children: [/*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsxs("div", {
                    children: [/*#__PURE__*/_jsx("div", {
                      className: "font-medium",
                      children: notification.title
                    }), /*#__PURE__*/_jsx("div", {
                      className: "text-sm text-gray-500 max-w-xs",
                      children: notification.message
                    }), /*#__PURE__*/_jsxs("div", {
                      className: "text-xs text-gray-400",
                      children: ["ID: ", notification.id]
                    })]
                  })
                }), /*#__PURE__*/_jsxs(TableCell, {
                  children: [/*#__PURE__*/_jsx(Badge, {
                    className: getAudienceColor(notification.audience),
                    children: notification.audience
                  }), /*#__PURE__*/_jsxs("div", {
                    className: "text-xs text-gray-500 mt-1",
                    children: [notification.recipients.toLocaleString(), " recipients"]
                  })]
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsx(Badge, {
                    className: getPriorityColor(notification.priority),
                    children: notification.priority
                  })
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsxs("div", {
                    children: [/*#__PURE__*/_jsxs("div", {
                      className: "font-medium",
                      children: [notification.clickRate, "% CTR"]
                    }), /*#__PURE__*/_jsxs("div", {
                      className: "text-xs text-gray-500",
                      children: ["Sent: ", notification.sentDate]
                    })]
                  })
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsx(Badge, {
                    className: getStatusColor(notification.status),
                    children: notification.status
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
                        children: [/*#__PURE__*/_jsx(Send, {
                          className: "mr-2 h-4 w-4"
                        }), "Resend"]
                      }), /*#__PURE__*/_jsxs(DropdownMenuItem, {
                        children: [/*#__PURE__*/_jsx(Users, {
                          className: "mr-2 h-4 w-4"
                        }), "View Recipients"]
                      })]
                    })]
                  })
                })]
              }, notification.id))
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
            children: "Send Push Notification"
          }), /*#__PURE__*/_jsx(DialogDescription, {
            children: "Send a notification to customers or vendors"
          })]
        }), /*#__PURE__*/_jsxs("div", {
          className: "space-y-4 py-4",
          children: [/*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx(Label, {
              htmlFor: "title",
              children: "Notification Title"
            }), /*#__PURE__*/_jsx(Input, {
              id: "title",
              value: newNotification.title,
              onChange: e => setNewNotification({
                ...newNotification,
                title: e.target.value
              }),
              placeholder: "Notification title"
            })]
          }), /*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx(Label, {
              htmlFor: "message",
              children: "Message"
            }), /*#__PURE__*/_jsx(Textarea, {
              id: "message",
              value: newNotification.message,
              onChange: e => setNewNotification({
                ...newNotification,
                message: e.target.value
              }),
              placeholder: "Notification message",
              rows: 3
            })]
          }), /*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx(Label, {
              children: "Audience"
            }), /*#__PURE__*/_jsxs(RadioGroup, {
              value: newNotification.audience,
              onValueChange: value => setNewNotification({
                ...newNotification,
                audience: value
              }),
              className: "mt-2",
              children: [/*#__PURE__*/_jsxs("div", {
                className: "flex items-center space-x-2",
                children: [/*#__PURE__*/_jsx(RadioGroupItem, {
                  value: "customers",
                  id: "customers"
                }), /*#__PURE__*/_jsx(Label, {
                  htmlFor: "customers",
                  children: "Customers Only"
                })]
              }), /*#__PURE__*/_jsxs("div", {
                className: "flex items-center space-x-2",
                children: [/*#__PURE__*/_jsx(RadioGroupItem, {
                  value: "vendors",
                  id: "vendors"
                }), /*#__PURE__*/_jsx(Label, {
                  htmlFor: "vendors",
                  children: "Vendors Only"
                })]
              }), /*#__PURE__*/_jsxs("div", {
                className: "flex items-center space-x-2",
                children: [/*#__PURE__*/_jsx(RadioGroupItem, {
                  value: "all",
                  id: "all"
                }), /*#__PURE__*/_jsx(Label, {
                  htmlFor: "all",
                  children: "All Users"
                })]
              })]
            })]
          }), /*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx(Label, {
              htmlFor: "priority",
              children: "Priority"
            }), /*#__PURE__*/_jsxs(Select, {
              value: newNotification.priority,
              onValueChange: value => setNewNotification({
                ...newNotification,
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
        }), /*#__PURE__*/_jsxs(DialogFooter, {
          children: [/*#__PURE__*/_jsx(Button, {
            variant: "outline",
            onClick: () => setIsCreateDialogOpen(false),
            children: "Cancel"
          }), /*#__PURE__*/_jsxs(Button, {
            children: [/*#__PURE__*/_jsx(Send, {
              className: "mr-2 h-4 w-4"
            }), "Send Now"]
          })]
        })]
      })
    })]
  });
};
export default AdminCommunicationPush;