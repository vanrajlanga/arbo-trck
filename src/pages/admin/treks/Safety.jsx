import { useState } from "react";
import { Search, Plus, MoreHorizontal, Edit, Trash2, Shield, AlertTriangle, CheckCircle, FileText, Activity } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock data for safety rules
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const safetyRulesData = [{
  id: "SR001",
  title: "Emergency Contact Protocol",
  description: "All trekkers must provide emergency contact details and carry communication devices",
  category: "communication",
  priority: "high",
  applicableFor: ["all"],
  status: "active",
  lastUpdated: "2025-05-15",
  compliance: 95,
  violations: 3,
  createdBy: "Safety Team"
}, {
  id: "SR002",
  title: "Medical Certificate Requirement",
  description: "Mandatory medical fitness certificate for treks above 3000m altitude",
  category: "medical",
  priority: "high",
  applicableFor: ["high-altitude"],
  status: "active",
  lastUpdated: "2025-04-20",
  compliance: 87,
  violations: 8,
  createdBy: "Medical Team"
}, {
  id: "SR003",
  title: "Weather Monitoring Protocol",
  description: "Continuous weather monitoring and trek cancellation in adverse conditions",
  category: "weather",
  priority: "critical",
  applicableFor: ["mountain", "high-altitude"],
  status: "active",
  lastUpdated: "2025-06-01",
  compliance: 98,
  violations: 1,
  createdBy: "Operations Team"
}, {
  id: "SR004",
  title: "Group Size Limitations",
  description: "Maximum group size of 15 participants per guide for safety management",
  category: "logistics",
  priority: "medium",
  applicableFor: ["all"],
  status: "active",
  lastUpdated: "2025-03-10",
  compliance: 92,
  violations: 5,
  createdBy: "Safety Team"
}, {
  id: "SR005",
  title: "Night Trek Restrictions",
  description: "Night trekking prohibited without proper lighting and safety equipment",
  category: "equipment",
  priority: "high",
  applicableFor: ["night-treks"],
  status: "inactive",
  lastUpdated: "2025-02-15",
  compliance: 78,
  violations: 12,
  createdBy: "Safety Team"
}];
const AdminTrekSafety = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newRule, setNewRule] = useState({
    title: "",
    description: "",
    category: "safety",
    priority: "medium",
    applicableFor: ["all"]
  });
  const filteredRules = safetyRulesData.filter(rule => {
    const matchesSearch = rule.title.toLowerCase().includes(searchQuery.toLowerCase()) || rule.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || rule.category === categoryFilter;
    const matchesPriority = priorityFilter === "all" || rule.priority === priorityFilter;
    return matchesSearch && matchesCategory && matchesPriority;
  });
  const getPriorityColor = priority => {
    switch (priority) {
      case "critical":
        return "bg-red-100 text-red-800";
      case "high":
        return "bg-orange-100 text-orange-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  const getStatusColor = status => {
    switch (status) {
      case "active":
        return "default";
      case "inactive":
        return "secondary";
      case "draft":
        return "outline";
      default:
        return "default";
    }
  };
  const getComplianceColor = compliance => {
    if (compliance >= 95) return "text-green-600";
    if (compliance >= 85) return "text-yellow-600";
    return "text-red-600";
  };
  return /*#__PURE__*/_jsxs("div", {
    children: [/*#__PURE__*/_jsxs("div", {
      className: "flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8",
      children: [/*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx("h1", {
          className: "text-2xl font-bold",
          children: "Safety Rules"
        }), /*#__PURE__*/_jsx("p", {
          className: "text-gray-500",
          children: "Manage trek safety rules and compliance protocols"
        })]
      }), /*#__PURE__*/_jsxs(Dialog, {
        open: isCreateOpen,
        onOpenChange: setIsCreateOpen,
        children: [/*#__PURE__*/_jsx(DialogTrigger, {
          asChild: true,
          children: /*#__PURE__*/_jsxs(Button, {
            children: [/*#__PURE__*/_jsx(Plus, {
              className: "mr-2 h-4 w-4"
            }), "Add Safety Rule"]
          })
        }), /*#__PURE__*/_jsxs(DialogContent, {
          className: "max-w-md",
          children: [/*#__PURE__*/_jsxs(DialogHeader, {
            children: [/*#__PURE__*/_jsx(DialogTitle, {
              children: "Add Safety Rule"
            }), /*#__PURE__*/_jsx(DialogDescription, {
              children: "Create a new safety rule for trek operations"
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "space-y-4",
            children: [/*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx(Label, {
                htmlFor: "title",
                children: "Rule Title"
              }), /*#__PURE__*/_jsx(Input, {
                id: "title",
                value: newRule.title,
                onChange: e => setNewRule({
                  ...newRule,
                  title: e.target.value
                }),
                placeholder: "e.g., Emergency Contact Protocol"
              })]
            }), /*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx(Label, {
                htmlFor: "description",
                children: "Description"
              }), /*#__PURE__*/_jsx(Textarea, {
                id: "description",
                value: newRule.description,
                onChange: e => setNewRule({
                  ...newRule,
                  description: e.target.value
                }),
                placeholder: "Detailed rule description..."
              })]
            }), /*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx(Label, {
                htmlFor: "category",
                children: "Category"
              }), /*#__PURE__*/_jsxs(Select, {
                value: newRule.category,
                onValueChange: value => setNewRule({
                  ...newRule,
                  category: value
                }),
                children: [/*#__PURE__*/_jsx(SelectTrigger, {
                  children: /*#__PURE__*/_jsx(SelectValue, {})
                }), /*#__PURE__*/_jsxs(SelectContent, {
                  children: [/*#__PURE__*/_jsx(SelectItem, {
                    value: "safety",
                    children: "Safety"
                  }), /*#__PURE__*/_jsx(SelectItem, {
                    value: "medical",
                    children: "Medical"
                  }), /*#__PURE__*/_jsx(SelectItem, {
                    value: "equipment",
                    children: "Equipment"
                  }), /*#__PURE__*/_jsx(SelectItem, {
                    value: "weather",
                    children: "Weather"
                  }), /*#__PURE__*/_jsx(SelectItem, {
                    value: "logistics",
                    children: "Logistics"
                  }), /*#__PURE__*/_jsx(SelectItem, {
                    value: "communication",
                    children: "Communication"
                  })]
                })]
              })]
            }), /*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx(Label, {
                htmlFor: "priority",
                children: "Priority Level"
              }), /*#__PURE__*/_jsxs(Select, {
                value: newRule.priority,
                onValueChange: value => setNewRule({
                  ...newRule,
                  priority: value
                }),
                children: [/*#__PURE__*/_jsx(SelectTrigger, {
                  children: /*#__PURE__*/_jsx(SelectValue, {})
                }), /*#__PURE__*/_jsxs(SelectContent, {
                  children: [/*#__PURE__*/_jsx(SelectItem, {
                    value: "critical",
                    children: "Critical"
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
              })]
            }), /*#__PURE__*/_jsx(Button, {
              onClick: () => setIsCreateOpen(false),
              className: "w-full",
              children: "Create Safety Rule"
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
            children: "Total Rules"
          }), /*#__PURE__*/_jsx(Shield, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "24"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-xs text-muted-foreground",
            children: "Active safety rules"
          })]
        })]
      }), /*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsxs(CardHeader, {
          className: "flex flex-row items-center justify-between pb-2",
          children: [/*#__PURE__*/_jsx(CardTitle, {
            className: "text-sm font-medium",
            children: "Compliance Rate"
          }), /*#__PURE__*/_jsx(CheckCircle, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "92%"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-xs text-muted-foreground",
            children: "Overall compliance"
          })]
        })]
      }), /*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsxs(CardHeader, {
          className: "flex flex-row items-center justify-between pb-2",
          children: [/*#__PURE__*/_jsx(CardTitle, {
            className: "text-sm font-medium",
            children: "Violations"
          }), /*#__PURE__*/_jsx(AlertTriangle, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "29"
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
            children: "Critical Rules"
          }), /*#__PURE__*/_jsx(Activity, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "6"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-xs text-muted-foreground",
            children: "High priority"
          })]
        })]
      })]
    }), /*#__PURE__*/_jsxs(Card, {
      children: [/*#__PURE__*/_jsxs(CardHeader, {
        children: [/*#__PURE__*/_jsx(CardTitle, {
          children: "Safety Rules Management"
        }), /*#__PURE__*/_jsx(CardDescription, {
          children: "Manage and monitor trek safety rules and compliance"
        })]
      }), /*#__PURE__*/_jsxs(CardContent, {
        children: [/*#__PURE__*/_jsxs("div", {
          className: "flex flex-col lg:flex-row gap-4 mb-6",
          children: [/*#__PURE__*/_jsxs("div", {
            className: "relative flex-1",
            children: [/*#__PURE__*/_jsx(Search, {
              className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4"
            }), /*#__PURE__*/_jsx(Input, {
              placeholder: "Search safety rules...",
              value: searchQuery,
              onChange: e => setSearchQuery(e.target.value),
              className: "pl-10"
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "flex flex-wrap gap-2",
            children: [/*#__PURE__*/_jsxs(Select, {
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
                  value: "safety",
                  children: "Safety"
                }), /*#__PURE__*/_jsx(SelectItem, {
                  value: "medical",
                  children: "Medical"
                }), /*#__PURE__*/_jsx(SelectItem, {
                  value: "equipment",
                  children: "Equipment"
                }), /*#__PURE__*/_jsx(SelectItem, {
                  value: "weather",
                  children: "Weather"
                }), /*#__PURE__*/_jsx(SelectItem, {
                  value: "logistics",
                  children: "Logistics"
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
                  value: "critical",
                  children: "Critical"
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
            })]
          })]
        }), /*#__PURE__*/_jsx("div", {
          className: "overflow-x-auto",
          children: /*#__PURE__*/_jsxs(Table, {
            children: [/*#__PURE__*/_jsx(TableHeader, {
              children: /*#__PURE__*/_jsxs(TableRow, {
                children: [/*#__PURE__*/_jsx(TableHead, {
                  children: "Rule Details"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Category & Priority"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Compliance"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Violations"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Status"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Last Updated"
                }), /*#__PURE__*/_jsx(TableHead, {
                  className: "text-right",
                  children: "Actions"
                })]
              })
            }), /*#__PURE__*/_jsx(TableBody, {
              children: filteredRules.map(rule => /*#__PURE__*/_jsxs(TableRow, {
                children: [/*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsxs("div", {
                    children: [/*#__PURE__*/_jsx("div", {
                      className: "font-medium",
                      children: rule.title
                    }), /*#__PURE__*/_jsx("div", {
                      className: "text-sm text-gray-500 max-w-xs truncate",
                      children: rule.description
                    }), /*#__PURE__*/_jsxs("div", {
                      className: "text-xs text-gray-400 mt-1",
                      children: ["By ", rule.createdBy]
                    })]
                  })
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsxs("div", {
                    children: [/*#__PURE__*/_jsx(Badge, {
                      variant: "outline",
                      className: "mb-1",
                      children: rule.category
                    }), /*#__PURE__*/_jsx("div", {
                      children: /*#__PURE__*/_jsx(Badge, {
                        className: getPriorityColor(rule.priority),
                        children: rule.priority
                      })
                    })]
                  })
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsxs("div", {
                    className: `font-medium ${getComplianceColor(rule.compliance)}`,
                    children: [rule.compliance, "%"]
                  })
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsx("div", {
                    className: "font-medium text-red-600",
                    children: rule.violations
                  })
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsx(Badge, {
                    variant: getStatusColor(rule.status),
                    children: rule.status
                  })
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: rule.lastUpdated
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
                        children: [/*#__PURE__*/_jsx(FileText, {
                          className: "mr-2 h-4 w-4"
                        }), "View Details"]
                      }), /*#__PURE__*/_jsxs(DropdownMenuItem, {
                        children: [/*#__PURE__*/_jsx(Edit, {
                          className: "mr-2 h-4 w-4"
                        }), "Edit Rule"]
                      }), /*#__PURE__*/_jsxs(DropdownMenuItem, {
                        children: [/*#__PURE__*/_jsx(Activity, {
                          className: "mr-2 h-4 w-4"
                        }), "Compliance Report"]
                      }), /*#__PURE__*/_jsx(DropdownMenuSeparator, {}), /*#__PURE__*/_jsxs(DropdownMenuItem, {
                        className: "text-red-600",
                        children: [/*#__PURE__*/_jsx(Trash2, {
                          className: "mr-2 h-4 w-4"
                        }), "Delete"]
                      })]
                    })]
                  })
                })]
              }, rule.id))
            })]
          })
        })]
      })]
    })]
  });
};
export default AdminTrekSafety;