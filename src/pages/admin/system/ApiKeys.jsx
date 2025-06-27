import { useState } from "react";
import { Search, Plus, MoreHorizontal, Eye, EyeOff, Copy, Trash2, Key, Shield, Activity, AlertTriangle, CheckCircle, RefreshCw } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

// Mock data for API keys
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const apiKeysData = [{
  id: "1",
  name: "SMS Service API",
  service: "SMS Gateway",
  key: "sk_live_51234567890abcdef",
  maskedKey: "sk_live_...cdef",
  status: "active",
  createdAt: "2025-05-15",
  lastUsed: "2025-06-02",
  usage: 2450,
  limit: 5000,
  expiresAt: "2025-12-31"
}, {
  id: "2",
  name: "WhatsApp Business API",
  service: "WhatsApp",
  key: "whatsapp_key_98765432109876",
  maskedKey: "whatsapp_key_...9876",
  status: "active",
  createdAt: "2025-04-20",
  lastUsed: "2025-06-03",
  usage: 1890,
  limit: 3000,
  expiresAt: "2025-11-30"
}, {
  id: "3",
  name: "Payment Gateway",
  service: "Razorpay",
  key: "rzp_live_abcdef123456789",
  maskedKey: "rzp_live_...6789",
  status: "active",
  createdAt: "2025-03-10",
  lastUsed: "2025-06-03",
  usage: 4500,
  limit: 10000,
  expiresAt: "2026-03-10"
}, {
  id: "4",
  name: "Email Service",
  service: "SendGrid",
  key: "SG.abcdef123456789.xyz",
  maskedKey: "SG.abcd...xyz",
  status: "inactive",
  createdAt: "2025-02-01",
  lastUsed: "2025-05-20",
  usage: 150,
  limit: 1000,
  expiresAt: "2025-08-01"
}];
const AdminSystemApiKeys = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [visibleKeys, setVisibleKeys] = useState(new Set());
  const [newApiKey, setNewApiKey] = useState({
    name: "",
    service: "",
    key: "",
    expiresAt: "",
    isActive: true
  });
  const {
    toast
  } = useToast();
  const filteredKeys = apiKeysData.filter(key => {
    const matchesSearch = key.name.toLowerCase().includes(searchQuery.toLowerCase()) || key.service.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || key.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  const toggleKeyVisibility = keyId => {
    const newVisible = new Set(visibleKeys);
    if (newVisible.has(keyId)) {
      newVisible.delete(keyId);
    } else {
      newVisible.add(keyId);
    }
    setVisibleKeys(newVisible);
  };
  const copyToClipboard = text => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "API key has been copied to your clipboard."
    });
  };
  const getStatusColor = status => {
    switch (status) {
      case "active":
        return "default";
      case "inactive":
        return "secondary";
      case "expired":
        return "destructive";
      default:
        return "default";
    }
  };
  const getUsagePercentage = (usage, limit) => {
    return Math.round(usage / limit * 100);
  };
  const getUsageColor = percentage => {
    if (percentage >= 90) return "text-red-600";
    if (percentage >= 70) return "text-yellow-600";
    return "text-green-600";
  };
  const handleCreateApiKey = () => {
    console.log("Creating new API key:", newApiKey);
    toast({
      title: "API Key Created",
      description: "New API key has been created successfully."
    });
    setIsCreateOpen(false);
    setNewApiKey({
      name: "",
      service: "",
      key: "",
      expiresAt: "",
      isActive: true
    });
  };
  return /*#__PURE__*/_jsxs("div", {
    children: [/*#__PURE__*/_jsxs("div", {
      className: "flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8",
      children: [/*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx("h1", {
          className: "text-2xl font-bold",
          children: "API Key Management"
        }), /*#__PURE__*/_jsx("p", {
          className: "text-gray-500",
          children: "Manage API keys for external services and integrations"
        })]
      }), /*#__PURE__*/_jsxs(Dialog, {
        open: isCreateOpen,
        onOpenChange: setIsCreateOpen,
        children: [/*#__PURE__*/_jsx(DialogTrigger, {
          asChild: true,
          children: /*#__PURE__*/_jsxs(Button, {
            children: [/*#__PURE__*/_jsx(Plus, {
              className: "mr-2 h-4 w-4"
            }), "Add API Key"]
          })
        }), /*#__PURE__*/_jsxs(DialogContent, {
          className: "max-w-md",
          children: [/*#__PURE__*/_jsxs(DialogHeader, {
            children: [/*#__PURE__*/_jsx(DialogTitle, {
              children: "Add New API Key"
            }), /*#__PURE__*/_jsx(DialogDescription, {
              children: "Add a new API key for external service integration"
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "space-y-4",
            children: [/*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx(Label, {
                htmlFor: "name",
                children: "Key Name"
              }), /*#__PURE__*/_jsx(Input, {
                id: "name",
                value: newApiKey.name,
                onChange: e => setNewApiKey({
                  ...newApiKey,
                  name: e.target.value
                }),
                placeholder: "e.g., SMS Service API"
              })]
            }), /*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx(Label, {
                htmlFor: "service",
                children: "Service Type"
              }), /*#__PURE__*/_jsxs(Select, {
                value: newApiKey.service,
                onValueChange: value => setNewApiKey({
                  ...newApiKey,
                  service: value
                }),
                children: [/*#__PURE__*/_jsx(SelectTrigger, {
                  children: /*#__PURE__*/_jsx(SelectValue, {
                    placeholder: "Select service type"
                  })
                }), /*#__PURE__*/_jsxs(SelectContent, {
                  children: [/*#__PURE__*/_jsx(SelectItem, {
                    value: "sms",
                    children: "SMS Gateway"
                  }), /*#__PURE__*/_jsx(SelectItem, {
                    value: "whatsapp",
                    children: "WhatsApp"
                  }), /*#__PURE__*/_jsx(SelectItem, {
                    value: "email",
                    children: "Email Service"
                  }), /*#__PURE__*/_jsx(SelectItem, {
                    value: "payment",
                    children: "Payment Gateway"
                  }), /*#__PURE__*/_jsx(SelectItem, {
                    value: "push",
                    children: "Push Notifications"
                  }), /*#__PURE__*/_jsx(SelectItem, {
                    value: "other",
                    children: "Other"
                  })]
                })]
              })]
            }), /*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx(Label, {
                htmlFor: "key",
                children: "API Key"
              }), /*#__PURE__*/_jsx(Input, {
                id: "key",
                type: "password",
                value: newApiKey.key,
                onChange: e => setNewApiKey({
                  ...newApiKey,
                  key: e.target.value
                }),
                placeholder: "Enter API key"
              })]
            }), /*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx(Label, {
                htmlFor: "expires",
                children: "Expires At"
              }), /*#__PURE__*/_jsx(Input, {
                id: "expires",
                type: "date",
                value: newApiKey.expiresAt,
                onChange: e => setNewApiKey({
                  ...newApiKey,
                  expiresAt: e.target.value
                })
              })]
            }), /*#__PURE__*/_jsxs("div", {
              className: "flex items-center space-x-2",
              children: [/*#__PURE__*/_jsx(Switch, {
                id: "active",
                checked: newApiKey.isActive,
                onCheckedChange: checked => setNewApiKey({
                  ...newApiKey,
                  isActive: checked
                })
              }), /*#__PURE__*/_jsx(Label, {
                htmlFor: "active",
                children: "Active"
              })]
            }), /*#__PURE__*/_jsx(Button, {
              onClick: handleCreateApiKey,
              className: "w-full",
              children: "Create API Key"
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
            children: "Total API Keys"
          }), /*#__PURE__*/_jsx(Key, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "4"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-xs text-muted-foreground",
            children: "Across all services"
          })]
        })]
      }), /*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsxs(CardHeader, {
          className: "flex flex-row items-center justify-between pb-2",
          children: [/*#__PURE__*/_jsx(CardTitle, {
            className: "text-sm font-medium",
            children: "Active Keys"
          }), /*#__PURE__*/_jsx(CheckCircle, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "3"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-xs text-muted-foreground",
            children: "Currently active"
          })]
        })]
      }), /*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsxs(CardHeader, {
          className: "flex flex-row items-center justify-between pb-2",
          children: [/*#__PURE__*/_jsx(CardTitle, {
            className: "text-sm font-medium",
            children: "Total Usage"
          }), /*#__PURE__*/_jsx(Activity, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "8,990"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-xs text-muted-foreground",
            children: "API calls this month"
          })]
        })]
      }), /*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsxs(CardHeader, {
          className: "flex flex-row items-center justify-between pb-2",
          children: [/*#__PURE__*/_jsx(CardTitle, {
            className: "text-sm font-medium",
            children: "Expiring Soon"
          }), /*#__PURE__*/_jsx(AlertTriangle, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "1"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-xs text-muted-foreground",
            children: "Within 30 days"
          })]
        })]
      })]
    }), /*#__PURE__*/_jsxs(Card, {
      children: [/*#__PURE__*/_jsxs(CardHeader, {
        children: [/*#__PURE__*/_jsx(CardTitle, {
          children: "API Keys"
        }), /*#__PURE__*/_jsx(CardDescription, {
          children: "Manage your API keys for various external services"
        })]
      }), /*#__PURE__*/_jsxs(CardContent, {
        children: [/*#__PURE__*/_jsxs("div", {
          className: "flex flex-col lg:flex-row gap-4 mb-6",
          children: [/*#__PURE__*/_jsxs("div", {
            className: "relative flex-1",
            children: [/*#__PURE__*/_jsx(Search, {
              className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4"
            }), /*#__PURE__*/_jsx(Input, {
              placeholder: "Search API keys...",
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
                value: "active",
                children: "Active"
              }), /*#__PURE__*/_jsx(SelectItem, {
                value: "inactive",
                children: "Inactive"
              }), /*#__PURE__*/_jsx(SelectItem, {
                value: "expired",
                children: "Expired"
              })]
            })]
          })]
        }), /*#__PURE__*/_jsx("div", {
          className: "overflow-x-auto",
          children: /*#__PURE__*/_jsxs(Table, {
            children: [/*#__PURE__*/_jsx(TableHeader, {
              children: /*#__PURE__*/_jsxs(TableRow, {
                children: [/*#__PURE__*/_jsx(TableHead, {
                  children: "Name & Service"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "API Key"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Status"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Usage"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Last Used"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Expires"
                }), /*#__PURE__*/_jsx(TableHead, {
                  className: "text-right",
                  children: "Actions"
                })]
              })
            }), /*#__PURE__*/_jsx(TableBody, {
              children: filteredKeys.map(apiKey => {
                const usagePercent = getUsagePercentage(apiKey.usage, apiKey.limit);
                return /*#__PURE__*/_jsxs(TableRow, {
                  children: [/*#__PURE__*/_jsx(TableCell, {
                    children: /*#__PURE__*/_jsxs("div", {
                      children: [/*#__PURE__*/_jsx("div", {
                        className: "font-medium",
                        children: apiKey.name
                      }), /*#__PURE__*/_jsx("div", {
                        className: "text-sm text-gray-500",
                        children: apiKey.service
                      })]
                    })
                  }), /*#__PURE__*/_jsx(TableCell, {
                    children: /*#__PURE__*/_jsxs("div", {
                      className: "flex items-center gap-2",
                      children: [/*#__PURE__*/_jsx("code", {
                        className: "bg-gray-100 px-2 py-1 rounded text-sm",
                        children: visibleKeys.has(apiKey.id) ? apiKey.key : apiKey.maskedKey
                      }), /*#__PURE__*/_jsx(Button, {
                        variant: "ghost",
                        size: "sm",
                        onClick: () => toggleKeyVisibility(apiKey.id),
                        children: visibleKeys.has(apiKey.id) ? /*#__PURE__*/_jsx(EyeOff, {
                          className: "h-4 w-4"
                        }) : /*#__PURE__*/_jsx(Eye, {
                          className: "h-4 w-4"
                        })
                      }), /*#__PURE__*/_jsx(Button, {
                        variant: "ghost",
                        size: "sm",
                        onClick: () => copyToClipboard(apiKey.key),
                        children: /*#__PURE__*/_jsx(Copy, {
                          className: "h-4 w-4"
                        })
                      })]
                    })
                  }), /*#__PURE__*/_jsx(TableCell, {
                    children: /*#__PURE__*/_jsx(Badge, {
                      variant: getStatusColor(apiKey.status),
                      children: apiKey.status
                    })
                  }), /*#__PURE__*/_jsx(TableCell, {
                    children: /*#__PURE__*/_jsxs("div", {
                      children: [/*#__PURE__*/_jsxs("div", {
                        className: `font-medium ${getUsageColor(usagePercent)}`,
                        children: [apiKey.usage.toLocaleString(), " / ", apiKey.limit.toLocaleString()]
                      }), /*#__PURE__*/_jsxs("div", {
                        className: "text-sm text-gray-500",
                        children: [usagePercent, "% used"]
                      })]
                    })
                  }), /*#__PURE__*/_jsx(TableCell, {
                    children: apiKey.lastUsed
                  }), /*#__PURE__*/_jsx(TableCell, {
                    children: apiKey.expiresAt
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
                          children: [/*#__PURE__*/_jsx(RefreshCw, {
                            className: "mr-2 h-4 w-4"
                          }), "Regenerate Key"]
                        }), /*#__PURE__*/_jsxs(DropdownMenuItem, {
                          children: [/*#__PURE__*/_jsx(Shield, {
                            className: "mr-2 h-4 w-4"
                          }), "View Usage Stats"]
                        }), /*#__PURE__*/_jsx(DropdownMenuSeparator, {}), /*#__PURE__*/_jsxs(DropdownMenuItem, {
                          className: "text-red-600",
                          children: [/*#__PURE__*/_jsx(Trash2, {
                            className: "mr-2 h-4 w-4"
                          }), "Delete"]
                        })]
                      })]
                    })
                  })]
                }, apiKey.id);
              })
            })]
          })
        })]
      })]
    }), /*#__PURE__*/_jsxs("div", {
      className: "grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8",
      children: [/*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsx(CardHeader, {
          children: /*#__PURE__*/_jsx(CardTitle, {
            children: "Service Configuration"
          })
        }), /*#__PURE__*/_jsxs(CardContent, {
          className: "space-y-4",
          children: [/*#__PURE__*/_jsxs("div", {
            className: "flex items-center justify-between",
            children: [/*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx("p", {
                className: "font-medium",
                children: "SMS Gateway"
              }), /*#__PURE__*/_jsx("p", {
                className: "text-sm text-gray-500",
                children: "Configure SMS service settings"
              })]
            }), /*#__PURE__*/_jsx(Button, {
              variant: "outline",
              size: "sm",
              children: "Configure"
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "flex items-center justify-between",
            children: [/*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx("p", {
                className: "font-medium",
                children: "Payment Gateway"
              }), /*#__PURE__*/_jsx("p", {
                className: "text-sm text-gray-500",
                children: "Razorpay integration settings"
              })]
            }), /*#__PURE__*/_jsx(Button, {
              variant: "outline",
              size: "sm",
              children: "Configure"
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "flex items-center justify-between",
            children: [/*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx("p", {
                className: "font-medium",
                children: "WhatsApp Business"
              }), /*#__PURE__*/_jsx("p", {
                className: "text-sm text-gray-500",
                children: "WhatsApp API configuration"
              })]
            }), /*#__PURE__*/_jsx(Button, {
              variant: "outline",
              size: "sm",
              children: "Configure"
            })]
          })]
        })]
      }), /*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsx(CardHeader, {
          children: /*#__PURE__*/_jsx(CardTitle, {
            children: "Security Settings"
          })
        }), /*#__PURE__*/_jsxs(CardContent, {
          className: "space-y-4",
          children: [/*#__PURE__*/_jsxs("div", {
            className: "flex items-center justify-between",
            children: [/*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx("p", {
                className: "font-medium",
                children: "Key Rotation"
              }), /*#__PURE__*/_jsx("p", {
                className: "text-sm text-gray-500",
                children: "Auto-rotate keys every 90 days"
              })]
            }), /*#__PURE__*/_jsx(Switch, {})]
          }), /*#__PURE__*/_jsxs("div", {
            className: "flex items-center justify-between",
            children: [/*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx("p", {
                className: "font-medium",
                children: "Usage Alerts"
              }), /*#__PURE__*/_jsx("p", {
                className: "text-sm text-gray-500",
                children: "Alert when usage exceeds 80%"
              })]
            }), /*#__PURE__*/_jsx(Switch, {
              defaultChecked: true
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "flex items-center justify-between",
            children: [/*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx("p", {
                className: "font-medium",
                children: "Expiry Notifications"
              }), /*#__PURE__*/_jsx("p", {
                className: "text-sm text-gray-500",
                children: "Notify 30 days before expiry"
              })]
            }), /*#__PURE__*/_jsx(Switch, {
              defaultChecked: true
            })]
          })]
        })]
      })]
    })]
  });
};
export default AdminSystemApiKeys;