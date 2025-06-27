import { useState } from "react";
import { Search, Plus, MoreHorizontal, Edit, Trash2, Users, Calendar, MapPin, Clock, CheckCircle, AlertCircle, XCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock data for trek batches
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const batchesData = [{
  id: "BATCH001",
  trekName: "Himalayan Base Camp Trek",
  batchCode: "HBC-2025-001",
  startDate: "2025-06-15",
  endDate: "2025-06-22",
  duration: "8 days",
  maxCapacity: 15,
  currentBookings: 12,
  vendor: "Adventure Trek Co.",
  guide: "Rajesh Kumar",
  status: "confirmed",
  price: 15000,
  difficulty: "Hard",
  location: "Himachal Pradesh"
}, {
  id: "BATCH002",
  trekName: "Gokarna Beach Trek",
  batchCode: "GBT-2025-003",
  startDate: "2025-06-20",
  endDate: "2025-06-23",
  duration: "4 days",
  maxCapacity: 20,
  currentBookings: 18,
  vendor: "Coastal Adventures",
  guide: "Priya Sharma",
  status: "confirmed",
  price: 8000,
  difficulty: "Easy",
  location: "Karnataka"
}, {
  id: "BATCH003",
  trekName: "Kudremukh Peak Trek",
  batchCode: "KPT-2025-002",
  startDate: "2025-06-25",
  endDate: "2025-06-27",
  duration: "3 days",
  maxCapacity: 12,
  currentBookings: 5,
  vendor: "Mountain Explorers",
  guide: "Ankit Gupta",
  status: "open",
  price: 6500,
  difficulty: "Medium",
  location: "Karnataka"
}, {
  id: "BATCH004",
  trekName: "Valley of Flowers Trek",
  batchCode: "VOF-2025-004",
  startDate: "2025-07-01",
  endDate: "2025-07-06",
  duration: "6 days",
  maxCapacity: 18,
  currentBookings: 0,
  vendor: "Himalayan Adventures",
  guide: "TBD",
  status: "draft",
  price: 12000,
  difficulty: "Medium",
  location: "Uttarakhand"
}, {
  id: "BATCH005",
  trekName: "Dandeli Adventure Trek",
  batchCode: "DAT-2025-001",
  startDate: "2025-05-28",
  endDate: "2025-05-30",
  duration: "3 days",
  maxCapacity: 16,
  currentBookings: 16,
  vendor: "Forest Trails",
  guide: "Suresh Patil",
  status: "completed",
  price: 5500,
  difficulty: "Easy",
  location: "Karnataka"
}];
const AdminTrekBatches = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newBatch, setNewBatch] = useState({
    trekName: "",
    startDate: "",
    endDate: "",
    maxCapacity: 15,
    vendor: "",
    guide: "",
    price: 0
  });
  const filteredBatches = batchesData.filter(batch => {
    const matchesSearch = batch.trekName.toLowerCase().includes(searchQuery.toLowerCase()) || batch.batchCode.toLowerCase().includes(searchQuery.toLowerCase()) || batch.vendor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || batch.status === statusFilter;
    const matchesDifficulty = difficultyFilter === "all" || batch.difficulty === difficultyFilter;
    return matchesSearch && matchesStatus && matchesDifficulty;
  });
  const getStatusColor = status => {
    switch (status) {
      case "confirmed":
        return "default";
      case "open":
        return "secondary";
      case "draft":
        return "outline";
      case "completed":
        return "default";
      case "cancelled":
        return "destructive";
      default:
        return "default";
    }
  };
  const getStatusIcon = status => {
    switch (status) {
      case "confirmed":
        return /*#__PURE__*/_jsx(CheckCircle, {
          className: "h-4 w-4 text-green-600"
        });
      case "open":
        return /*#__PURE__*/_jsx(Clock, {
          className: "h-4 w-4 text-blue-600"
        });
      case "completed":
        return /*#__PURE__*/_jsx(CheckCircle, {
          className: "h-4 w-4 text-green-600"
        });
      case "cancelled":
        return /*#__PURE__*/_jsx(XCircle, {
          className: "h-4 w-4 text-red-600"
        });
      default:
        return /*#__PURE__*/_jsx(AlertCircle, {
          className: "h-4 w-4 text-yellow-600"
        });
    }
  };
  const getDifficultyColor = difficulty => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "bg-green-100 text-green-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "hard":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  const getOccupancyPercentage = (current, max) => {
    return Math.round(current / max * 100);
  };
  const getOccupancyColor = percentage => {
    if (percentage >= 90) return "text-red-600";
    if (percentage >= 70) return "text-yellow-600";
    return "text-green-600";
  };
  const formatCurrency = amount => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };
  return /*#__PURE__*/_jsxs("div", {
    children: [/*#__PURE__*/_jsxs("div", {
      className: "flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8",
      children: [/*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx("h1", {
          className: "text-2xl font-bold",
          children: "Batch Management"
        }), /*#__PURE__*/_jsx("p", {
          className: "text-gray-500",
          children: "Manage trek batches, schedules, and capacity"
        })]
      }), /*#__PURE__*/_jsxs(Dialog, {
        open: isCreateOpen,
        onOpenChange: setIsCreateOpen,
        children: [/*#__PURE__*/_jsx(DialogTrigger, {
          asChild: true,
          children: /*#__PURE__*/_jsxs(Button, {
            children: [/*#__PURE__*/_jsx(Plus, {
              className: "mr-2 h-4 w-4"
            }), "Add Batch"]
          })
        }), /*#__PURE__*/_jsxs(DialogContent, {
          className: "max-w-md",
          children: [/*#__PURE__*/_jsxs(DialogHeader, {
            children: [/*#__PURE__*/_jsx(DialogTitle, {
              children: "Add Trek Batch"
            }), /*#__PURE__*/_jsx(DialogDescription, {
              children: "Create a new batch for a trek"
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "space-y-4",
            children: [/*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx(Label, {
                htmlFor: "trekName",
                children: "Trek Name"
              }), /*#__PURE__*/_jsxs(Select, {
                value: newBatch.trekName,
                onValueChange: value => setNewBatch({
                  ...newBatch,
                  trekName: value
                }),
                children: [/*#__PURE__*/_jsx(SelectTrigger, {
                  children: /*#__PURE__*/_jsx(SelectValue, {
                    placeholder: "Select trek"
                  })
                }), /*#__PURE__*/_jsxs(SelectContent, {
                  children: [/*#__PURE__*/_jsx(SelectItem, {
                    value: "Himalayan Base Camp Trek",
                    children: "Himalayan Base Camp Trek"
                  }), /*#__PURE__*/_jsx(SelectItem, {
                    value: "Gokarna Beach Trek",
                    children: "Gokarna Beach Trek"
                  }), /*#__PURE__*/_jsx(SelectItem, {
                    value: "Kudremukh Peak Trek",
                    children: "Kudremukh Peak Trek"
                  })]
                })]
              })]
            }), /*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx(Label, {
                htmlFor: "startDate",
                children: "Start Date"
              }), /*#__PURE__*/_jsx(Input, {
                id: "startDate",
                type: "date",
                value: newBatch.startDate,
                onChange: e => setNewBatch({
                  ...newBatch,
                  startDate: e.target.value
                })
              })]
            }), /*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx(Label, {
                htmlFor: "endDate",
                children: "End Date"
              }), /*#__PURE__*/_jsx(Input, {
                id: "endDate",
                type: "date",
                value: newBatch.endDate,
                onChange: e => setNewBatch({
                  ...newBatch,
                  endDate: e.target.value
                })
              })]
            }), /*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx(Label, {
                htmlFor: "capacity",
                children: "Max Capacity"
              }), /*#__PURE__*/_jsx(Input, {
                id: "capacity",
                type: "number",
                value: newBatch.maxCapacity,
                onChange: e => setNewBatch({
                  ...newBatch,
                  maxCapacity: Number(e.target.value)
                }),
                placeholder: "15"
              })]
            }), /*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx(Label, {
                htmlFor: "vendor",
                children: "Vendor"
              }), /*#__PURE__*/_jsxs(Select, {
                value: newBatch.vendor,
                onValueChange: value => setNewBatch({
                  ...newBatch,
                  vendor: value
                }),
                children: [/*#__PURE__*/_jsx(SelectTrigger, {
                  children: /*#__PURE__*/_jsx(SelectValue, {
                    placeholder: "Select vendor"
                  })
                }), /*#__PURE__*/_jsxs(SelectContent, {
                  children: [/*#__PURE__*/_jsx(SelectItem, {
                    value: "Adventure Trek Co.",
                    children: "Adventure Trek Co."
                  }), /*#__PURE__*/_jsx(SelectItem, {
                    value: "Mountain Explorers",
                    children: "Mountain Explorers"
                  }), /*#__PURE__*/_jsx(SelectItem, {
                    value: "Coastal Adventures",
                    children: "Coastal Adventures"
                  })]
                })]
              })]
            }), /*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx(Label, {
                htmlFor: "price",
                children: "Price (\u20B9)"
              }), /*#__PURE__*/_jsx(Input, {
                id: "price",
                type: "number",
                value: newBatch.price,
                onChange: e => setNewBatch({
                  ...newBatch,
                  price: Number(e.target.value)
                }),
                placeholder: "10000"
              })]
            }), /*#__PURE__*/_jsx(Button, {
              onClick: () => setIsCreateOpen(false),
              className: "w-full",
              children: "Create Batch"
            })]
          })]
        })]
      })]
    }), /*#__PURE__*/_jsxs("div", {
      className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8",
      children: [/*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsxs(CardHeader, {
          className: "flex flex-row items-center justify-between pb-2",
          children: [/*#__PURE__*/_jsx(CardTitle, {
            className: "text-sm font-medium",
            children: "Total Batches"
          }), /*#__PURE__*/_jsx(Calendar, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "45"
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
            children: "Active Batches"
          }), /*#__PURE__*/_jsx(Clock, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "18"
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
            children: "Total Participants"
          }), /*#__PURE__*/_jsx(Users, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "672"
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
            children: "Avg Occupancy"
          }), /*#__PURE__*/_jsx(CheckCircle, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "78%"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-xs text-muted-foreground",
            children: "Batch utilization"
          })]
        })]
      })]
    }), /*#__PURE__*/_jsxs(Card, {
      children: [/*#__PURE__*/_jsxs(CardHeader, {
        children: [/*#__PURE__*/_jsx(CardTitle, {
          children: "Batch Management"
        }), /*#__PURE__*/_jsx(CardDescription, {
          children: "Manage trek batches, schedules, and participant capacity"
        })]
      }), /*#__PURE__*/_jsxs(CardContent, {
        children: [/*#__PURE__*/_jsxs("div", {
          className: "flex flex-col lg:flex-row gap-4 mb-6",
          children: [/*#__PURE__*/_jsxs("div", {
            className: "relative flex-1",
            children: [/*#__PURE__*/_jsx(Search, {
              className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4"
            }), /*#__PURE__*/_jsx(Input, {
              placeholder: "Search batches...",
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
                  value: "confirmed",
                  children: "Confirmed"
                }), /*#__PURE__*/_jsx(SelectItem, {
                  value: "open",
                  children: "Open"
                }), /*#__PURE__*/_jsx(SelectItem, {
                  value: "draft",
                  children: "Draft"
                }), /*#__PURE__*/_jsx(SelectItem, {
                  value: "completed",
                  children: "Completed"
                })]
              })]
            }), /*#__PURE__*/_jsxs(Select, {
              value: difficultyFilter,
              onValueChange: setDifficultyFilter,
              children: [/*#__PURE__*/_jsx(SelectTrigger, {
                className: "w-32",
                children: /*#__PURE__*/_jsx(SelectValue, {
                  placeholder: "Difficulty"
                })
              }), /*#__PURE__*/_jsxs(SelectContent, {
                children: [/*#__PURE__*/_jsx(SelectItem, {
                  value: "all",
                  children: "All Levels"
                }), /*#__PURE__*/_jsx(SelectItem, {
                  value: "Easy",
                  children: "Easy"
                }), /*#__PURE__*/_jsx(SelectItem, {
                  value: "Medium",
                  children: "Medium"
                }), /*#__PURE__*/_jsx(SelectItem, {
                  value: "Hard",
                  children: "Hard"
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
                  children: "Trek Details"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Schedule"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Capacity"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Vendor & Guide"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Price"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Status"
                }), /*#__PURE__*/_jsx(TableHead, {
                  className: "text-right",
                  children: "Actions"
                })]
              })
            }), /*#__PURE__*/_jsx(TableBody, {
              children: filteredBatches.map(batch => {
                const occupancyPercentage = getOccupancyPercentage(batch.currentBookings, batch.maxCapacity);
                return /*#__PURE__*/_jsxs(TableRow, {
                  children: [/*#__PURE__*/_jsx(TableCell, {
                    children: /*#__PURE__*/_jsxs("div", {
                      children: [/*#__PURE__*/_jsx("div", {
                        className: "font-medium",
                        children: batch.trekName
                      }), /*#__PURE__*/_jsx("div", {
                        className: "text-sm text-gray-500",
                        children: batch.batchCode
                      }), /*#__PURE__*/_jsxs("div", {
                        className: "flex items-center gap-2 mt-1",
                        children: [/*#__PURE__*/_jsx(Badge, {
                          className: getDifficultyColor(batch.difficulty),
                          children: batch.difficulty
                        }), /*#__PURE__*/_jsxs(Badge, {
                          variant: "outline",
                          children: [/*#__PURE__*/_jsx(MapPin, {
                            className: "h-3 w-3 mr-1"
                          }), batch.location]
                        })]
                      })]
                    })
                  }), /*#__PURE__*/_jsx(TableCell, {
                    children: /*#__PURE__*/_jsxs("div", {
                      children: [/*#__PURE__*/_jsx("div", {
                        className: "font-medium",
                        children: batch.startDate
                      }), /*#__PURE__*/_jsxs("div", {
                        className: "text-sm text-gray-500",
                        children: ["to ", batch.endDate]
                      }), /*#__PURE__*/_jsx("div", {
                        className: "text-xs text-gray-400",
                        children: batch.duration
                      })]
                    })
                  }), /*#__PURE__*/_jsx(TableCell, {
                    children: /*#__PURE__*/_jsxs("div", {
                      children: [/*#__PURE__*/_jsxs("div", {
                        className: `font-medium ${getOccupancyColor(occupancyPercentage)}`,
                        children: [batch.currentBookings, "/", batch.maxCapacity]
                      }), /*#__PURE__*/_jsxs("div", {
                        className: "text-sm text-gray-500",
                        children: [occupancyPercentage, "% filled"]
                      })]
                    })
                  }), /*#__PURE__*/_jsx(TableCell, {
                    children: /*#__PURE__*/_jsxs("div", {
                      children: [/*#__PURE__*/_jsx("div", {
                        className: "font-medium text-sm",
                        children: batch.vendor
                      }), /*#__PURE__*/_jsxs("div", {
                        className: "text-sm text-gray-500",
                        children: ["Guide: ", batch.guide]
                      })]
                    })
                  }), /*#__PURE__*/_jsx(TableCell, {
                    children: /*#__PURE__*/_jsx("div", {
                      className: "font-medium",
                      children: formatCurrency(batch.price)
                    })
                  }), /*#__PURE__*/_jsx(TableCell, {
                    children: /*#__PURE__*/_jsxs("div", {
                      className: "flex items-center gap-2",
                      children: [getStatusIcon(batch.status), /*#__PURE__*/_jsx(Badge, {
                        variant: getStatusColor(batch.status),
                        children: batch.status
                      })]
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
                          children: [/*#__PURE__*/_jsx(Users, {
                            className: "mr-2 h-4 w-4"
                          }), "View Participants"]
                        }), /*#__PURE__*/_jsxs(DropdownMenuItem, {
                          children: [/*#__PURE__*/_jsx(Edit, {
                            className: "mr-2 h-4 w-4"
                          }), "Edit Batch"]
                        }), /*#__PURE__*/_jsxs(DropdownMenuItem, {
                          children: [/*#__PURE__*/_jsx(Calendar, {
                            className: "mr-2 h-4 w-4"
                          }), "Reschedule"]
                        }), /*#__PURE__*/_jsx(DropdownMenuSeparator, {}), /*#__PURE__*/_jsxs(DropdownMenuItem, {
                          className: "text-red-600",
                          children: [/*#__PURE__*/_jsx(Trash2, {
                            className: "mr-2 h-4 w-4"
                          }), "Cancel Batch"]
                        })]
                      })]
                    })
                  })]
                }, batch.id);
              })
            })]
          })
        })]
      })]
    })]
  });
};
export default AdminTrekBatches;