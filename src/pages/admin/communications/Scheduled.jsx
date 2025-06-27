import { useState } from "react";
import { Search, Filter, Plus, Clock, Calendar, Users, Edit, Trash2, Play, Pause, MoreHorizontal } from "lucide-react";
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

// Mock data for scheduled notifications
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
const scheduledNotificationsData = [{
  id: "SCH001",
  title: "Weekly Trek Digest",
  message: "Check out this week's featured treks and special offers!",
  audience: "customers",
  status: "active",
  frequency: "weekly",
  nextRun: "2025-05-26 09:00",
  lastRun: "2025-05-19 09:00",
  totalSent: 15,
  recipients: 1250
}, {
  id: "SCH002",
  title: "Monthly Commission Report",
  message: "Your monthly commission report is ready for review.",
  audience: "vendors",
  status: "active",
  frequency: "monthly",
  nextRun: "2025-06-01 10:00",
  lastRun: "2025-05-01 10:00",
  totalSent: 3,
  recipients: 45
}, {
  id: "SCH003",
  title: "Booking Reminder",
  message: "Don't forget about your upcoming trek in 3 days!",
  audience: "customers",
  status: "paused",
  frequency: "trigger-based",
  nextRun: "Trigger based",
  lastRun: "2025-05-20 14:30",
  totalSent: 89,
  recipients: 450
}];
const AdminCommunicationScheduled = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [audienceFilter, setAudienceFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newScheduled, setNewScheduled] = useState({
    title: "",
    message: "",
    audience: "customers",
    frequency: "weekly",
    scheduleTime: "",
    status: "active"
  });
  const filteredScheduled = scheduledNotificationsData.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchQuery.toLowerCase()) || notification.message.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAudience = audienceFilter === "all" || notification.audience === audienceFilter;
    const matchesStatus = statusFilter === "all" || notification.status === statusFilter;
    return matchesSearch && matchesAudience && matchesStatus;
  });
  const getStatusColor = status => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "paused":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
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
  const getFrequencyColor = frequency => {
    switch (frequency) {
      case "daily":
        return "bg-red-100 text-red-800";
      case "weekly":
        return "bg-blue-100 text-blue-800";
      case "monthly":
        return "bg-green-100 text-green-800";
      case "trigger-based":
        return "bg-purple-100 text-purple-800";
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
          children: "Scheduled Notifications"
        }), /*#__PURE__*/_jsx("p", {
          className: "text-gray-500",
          children: "Manage automated recurring notifications for customers and vendors"
        })]
      }), /*#__PURE__*/_jsx("div", {
        className: "flex gap-2 mt-4 lg:mt-0",
        children: /*#__PURE__*/_jsxs(Button, {
          onClick: () => setIsCreateDialogOpen(true),
          children: [/*#__PURE__*/_jsx(Plus, {
            className: "mr-2 h-4 w-4"
          }), "Schedule Notification"]
        })
      })]
    }), /*#__PURE__*/_jsxs("div", {
      className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8",
      children: [/*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsxs(CardHeader, {
          className: "flex flex-row items-center justify-between pb-2",
          children: [/*#__PURE__*/_jsx(CardTitle, {
            className: "text-sm font-medium",
            children: "Active Schedules"
          }), /*#__PURE__*/_jsx(Clock, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "8"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-xs text-muted-foreground",
            children: "Currently running"
          })]
        })]
      }), /*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsxs(CardHeader, {
          className: "flex flex-row items-center justify-between pb-2",
          children: [/*#__PURE__*/_jsx(CardTitle, {
            className: "text-sm font-medium",
            children: "Total Sent"
          }), /*#__PURE__*/_jsx(Calendar, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "2,450"
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
            children: "Next Delivery"
          }), /*#__PURE__*/_jsx(Clock, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "2h 15m"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-xs text-muted-foreground",
            children: "Weekly digest"
          })]
        })]
      }), /*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsxs(CardHeader, {
          className: "flex flex-row items-center justify-between pb-2",
          children: [/*#__PURE__*/_jsx(CardTitle, {
            className: "text-sm font-medium",
            children: "Success Rate"
          }), /*#__PURE__*/_jsx(Users, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "98.5%"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-xs text-muted-foreground",
            children: "Delivery success"
          })]
        })]
      })]
    }), /*#__PURE__*/_jsxs(Card, {
      children: [/*#__PURE__*/_jsxs(CardHeader, {
        children: [/*#__PURE__*/_jsx(CardTitle, {
          children: "Scheduled Notifications"
        }), /*#__PURE__*/_jsx(CardDescription, {
          children: "Manage automated notifications and recurring messages"
        })]
      }), /*#__PURE__*/_jsxs(CardContent, {
        children: [/*#__PURE__*/_jsxs("div", {
          className: "flex flex-col lg:flex-row gap-4 mb-6",
          children: [/*#__PURE__*/_jsxs("div", {
            className: "relative flex-1",
            children: [/*#__PURE__*/_jsx(Search, {
              className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4"
            }), /*#__PURE__*/_jsx(Input, {
              placeholder: "Search scheduled notifications...",
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
                value: "active",
                children: "Active"
              }), /*#__PURE__*/_jsx(SelectItem, {
                value: "paused",
                children: "Paused"
              }), /*#__PURE__*/_jsx(SelectItem, {
                value: "completed",
                children: "Completed"
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
                  children: "Frequency"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Schedule Info"
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
              children: filteredScheduled.map(notification => /*#__PURE__*/_jsxs(TableRow, {
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
                    className: getFrequencyColor(notification.frequency),
                    children: notification.frequency
                  })
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsxs("div", {
                    children: [/*#__PURE__*/_jsxs("div", {
                      className: "text-sm font-medium",
                      children: ["Next: ", notification.nextRun]
                    }), /*#__PURE__*/_jsxs("div", {
                      className: "text-xs text-gray-500",
                      children: ["Last: ", notification.lastRun]
                    })]
                  })
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsxs("div", {
                    children: [/*#__PURE__*/_jsxs("div", {
                      className: "font-medium",
                      children: [notification.totalSent, " sent"]
                    }), /*#__PURE__*/_jsx("div", {
                      className: "text-xs text-gray-500",
                      children: "Total deliveries"
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
                        children: [/*#__PURE__*/_jsx(Edit, {
                          className: "mr-2 h-4 w-4"
                        }), "Edit Schedule"]
                      }), /*#__PURE__*/_jsx(DropdownMenuItem, {
                        children: notification.status === "active" ? /*#__PURE__*/_jsxs(_Fragment, {
                          children: [/*#__PURE__*/_jsx(Pause, {
                            className: "mr-2 h-4 w-4"
                          }), "Pause"]
                        }) : /*#__PURE__*/_jsxs(_Fragment, {
                          children: [/*#__PURE__*/_jsx(Play, {
                            className: "mr-2 h-4 w-4"
                          }), "Resume"]
                        })
                      }), /*#__PURE__*/_jsx(DropdownMenuSeparator, {}), /*#__PURE__*/_jsxs(DropdownMenuItem, {
                        className: "text-red-600",
                        children: [/*#__PURE__*/_jsx(Trash2, {
                          className: "mr-2 h-4 w-4"
                        }), "Delete"]
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
            children: "Schedule Notification"
          }), /*#__PURE__*/_jsx(DialogDescription, {
            children: "Create a recurring notification schedule"
          })]
        }), /*#__PURE__*/_jsxs("div", {
          className: "space-y-4 py-4",
          children: [/*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx(Label, {
              htmlFor: "title",
              children: "Notification Title"
            }), /*#__PURE__*/_jsx(Input, {
              id: "title",
              value: newScheduled.title,
              onChange: e => setNewScheduled({
                ...newScheduled,
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
              value: newScheduled.message,
              onChange: e => setNewScheduled({
                ...newScheduled,
                message: e.target.value
              }),
              placeholder: "Notification message",
              rows: 3
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "grid grid-cols-2 gap-4",
            children: [/*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx(Label, {
                htmlFor: "audience",
                children: "Audience"
              }), /*#__PURE__*/_jsxs(Select, {
                value: newScheduled.audience,
                onValueChange: value => setNewScheduled({
                  ...newScheduled,
                  audience: value
                }),
                children: [/*#__PURE__*/_jsx(SelectTrigger, {
                  children: /*#__PURE__*/_jsx(SelectValue, {})
                }), /*#__PURE__*/_jsxs(SelectContent, {
                  children: [/*#__PURE__*/_jsx(SelectItem, {
                    value: "customers",
                    children: "Customers"
                  }), /*#__PURE__*/_jsx(SelectItem, {
                    value: "vendors",
                    children: "Vendors"
                  }), /*#__PURE__*/_jsx(SelectItem, {
                    value: "all",
                    children: "All Users"
                  })]
                })]
              })]
            }), /*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx(Label, {
                htmlFor: "frequency",
                children: "Frequency"
              }), /*#__PURE__*/_jsxs(Select, {
                value: newScheduled.frequency,
                onValueChange: value => setNewScheduled({
                  ...newScheduled,
                  frequency: value
                }),
                children: [/*#__PURE__*/_jsx(SelectTrigger, {
                  children: /*#__PURE__*/_jsx(SelectValue, {})
                }), /*#__PURE__*/_jsxs(SelectContent, {
                  children: [/*#__PURE__*/_jsx(SelectItem, {
                    value: "daily",
                    children: "Daily"
                  }), /*#__PURE__*/_jsx(SelectItem, {
                    value: "weekly",
                    children: "Weekly"
                  }), /*#__PURE__*/_jsx(SelectItem, {
                    value: "monthly",
                    children: "Monthly"
                  }), /*#__PURE__*/_jsx(SelectItem, {
                    value: "trigger-based",
                    children: "Trigger Based"
                  })]
                })]
              })]
            })]
          }), /*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx(Label, {
              htmlFor: "scheduleTime",
              children: "Schedule Time"
            }), /*#__PURE__*/_jsx(Input, {
              id: "scheduleTime",
              type: "datetime-local",
              value: newScheduled.scheduleTime,
              onChange: e => setNewScheduled({
                ...newScheduled,
                scheduleTime: e.target.value
              })
            })]
          })]
        }), /*#__PURE__*/_jsxs(DialogFooter, {
          children: [/*#__PURE__*/_jsx(Button, {
            variant: "outline",
            onClick: () => setIsCreateDialogOpen(false),
            children: "Cancel"
          }), /*#__PURE__*/_jsxs(Button, {
            children: [/*#__PURE__*/_jsx(Clock, {
              className: "mr-2 h-4 w-4"
            }), "Schedule Notification"]
          })]
        })]
      })
    })]
  });
};
export default AdminCommunicationScheduled;