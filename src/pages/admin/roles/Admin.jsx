import { useState } from "react";
import { Search, Filter, Plus, Shield, User, Settings, CheckCircle, Edit, Trash2, Key, MoreHorizontal } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock data for admin roles
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const adminRolesData = [{
  id: "ROLE001",
  roleName: "Super Admin",
  description: "Full system access with all permissions",
  permissions: ["users", "vendors", "treks", "bookings", "finance", "settings", "roles"],
  userCount: 2,
  status: "active",
  createdDate: "2023-01-15",
  createdBy: "System",
  lastModified: "2025-05-20"
}, {
  id: "ROLE002",
  roleName: "Finance Manager",
  description: "Access to financial modules and reports",
  permissions: ["bookings", "finance", "vendors"],
  userCount: 3,
  status: "active",
  createdDate: "2023-02-20",
  createdBy: "Admin",
  lastModified: "2025-05-18"
}, {
  id: "ROLE003",
  roleName: "Content Manager",
  description: "Manage treks, vendors, and content",
  permissions: ["treks", "vendors", "users"],
  userCount: 5,
  status: "active",
  createdDate: "2023-03-10",
  createdBy: "Super Admin",
  lastModified: "2025-05-15"
}, {
  id: "ROLE004",
  roleName: "Support Lead",
  description: "Customer support and user management",
  permissions: ["users", "bookings"],
  userCount: 8,
  status: "active",
  createdDate: "2023-04-05",
  createdBy: "Admin",
  lastModified: "2025-05-12"
}];
const availablePermissions = [{
  id: "users",
  name: "User Management",
  description: "Manage customers and user accounts"
}, {
  id: "vendors",
  name: "Vendor Management",
  description: "Manage vendor accounts and verification"
}, {
  id: "treks",
  name: "Trek Management",
  description: "Manage treks, categories, and safety rules"
}, {
  id: "bookings",
  name: "Booking & Payments",
  description: "Handle bookings, cancellations, and payments"
}, {
  id: "finance",
  name: "Finance & Reports",
  description: "Access financial reports and settlements"
}, {
  id: "communications",
  name: "Communications",
  description: "Manage notifications and templates"
}, {
  id: "support",
  name: "Support & Tickets",
  description: "Handle customer support and complaints"
}, {
  id: "locations",
  name: "Location Management",
  description: "Manage cities and operating regions"
}, {
  id: "coupons",
  name: "Coupons & Campaigns",
  description: "Manage discount codes and marketing"
}, {
  id: "analytics",
  name: "Analytics",
  description: "Access analytics and performance reports"
}, {
  id: "settings",
  name: "System Settings",
  description: "Configure system and app settings"
}, {
  id: "roles",
  name: "Role Management",
  description: "Manage admin roles and permissions"
}];
const AdminRolesAdmin = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [newRole, setNewRole] = useState({
    roleName: "",
    description: "",
    permissions: [],
    status: "active"
  });
  const filteredRoles = adminRolesData.filter(role => {
    const matchesSearch = role.roleName.toLowerCase().includes(searchQuery.toLowerCase()) || role.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || role.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  const getStatusColor = status => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  const handlePermissionChange = (permissionId, checked) => {
    if (checked) {
      setNewRole({
        ...newRole,
        permissions: [...newRole.permissions, permissionId]
      });
    } else {
      setNewRole({
        ...newRole,
        permissions: newRole.permissions.filter(p => p !== permissionId)
      });
    }
  };
  return /*#__PURE__*/_jsxs("div", {
    children: [/*#__PURE__*/_jsxs("div", {
      className: "flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8",
      children: [/*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx("h1", {
          className: "text-2xl font-bold",
          children: "Admin Role Management"
        }), /*#__PURE__*/_jsx("p", {
          className: "text-gray-500",
          children: "Create and manage admin roles with specific module access permissions"
        })]
      }), /*#__PURE__*/_jsx("div", {
        className: "flex gap-2 mt-4 lg:mt-0",
        children: /*#__PURE__*/_jsxs(Button, {
          onClick: () => setIsCreateDialogOpen(true),
          children: [/*#__PURE__*/_jsx(Plus, {
            className: "mr-2 h-4 w-4"
          }), "Create Role"]
        })
      })]
    }), /*#__PURE__*/_jsxs("div", {
      className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8",
      children: [/*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsxs(CardHeader, {
          className: "flex flex-row items-center justify-between pb-2",
          children: [/*#__PURE__*/_jsx(CardTitle, {
            className: "text-sm font-medium",
            children: "Total Roles"
          }), /*#__PURE__*/_jsx(Shield, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "8"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-xs text-muted-foreground",
            children: "Admin roles"
          })]
        })]
      }), /*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsxs(CardHeader, {
          className: "flex flex-row items-center justify-between pb-2",
          children: [/*#__PURE__*/_jsx(CardTitle, {
            className: "text-sm font-medium",
            children: "Active Roles"
          }), /*#__PURE__*/_jsx(CheckCircle, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "7"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-xs text-muted-foreground",
            children: "Currently in use"
          })]
        })]
      }), /*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsxs(CardHeader, {
          className: "flex flex-row items-center justify-between pb-2",
          children: [/*#__PURE__*/_jsx(CardTitle, {
            className: "text-sm font-medium",
            children: "Total Admin Users"
          }), /*#__PURE__*/_jsx(User, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "24"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-xs text-muted-foreground",
            children: "Across all roles"
          })]
        })]
      }), /*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsxs(CardHeader, {
          className: "flex flex-row items-center justify-between pb-2",
          children: [/*#__PURE__*/_jsx(CardTitle, {
            className: "text-sm font-medium",
            children: "Available Modules"
          }), /*#__PURE__*/_jsx(Settings, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "12"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-xs text-muted-foreground",
            children: "Permission modules"
          })]
        })]
      })]
    }), /*#__PURE__*/_jsxs(Card, {
      children: [/*#__PURE__*/_jsxs(CardHeader, {
        children: [/*#__PURE__*/_jsx(CardTitle, {
          children: "Admin Roles"
        }), /*#__PURE__*/_jsx(CardDescription, {
          children: "Manage admin roles and their access permissions to different modules"
        })]
      }), /*#__PURE__*/_jsxs(CardContent, {
        children: [/*#__PURE__*/_jsxs("div", {
          className: "flex flex-col lg:flex-row gap-4 mb-6",
          children: [/*#__PURE__*/_jsxs("div", {
            className: "relative flex-1",
            children: [/*#__PURE__*/_jsx(Search, {
              className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4"
            }), /*#__PURE__*/_jsx(Input, {
              placeholder: "Search roles...",
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
                  children: "Role Details"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Permissions"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Users"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Created"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Status"
                }), /*#__PURE__*/_jsx(TableHead, {
                  className: "text-right",
                  children: "Actions"
                })]
              })
            }), /*#__PURE__*/_jsx(TableBody, {
              children: filteredRoles.map(role => /*#__PURE__*/_jsxs(TableRow, {
                children: [/*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsxs("div", {
                    children: [/*#__PURE__*/_jsx("div", {
                      className: "font-medium",
                      children: role.roleName
                    }), /*#__PURE__*/_jsx("div", {
                      className: "text-sm text-gray-500 max-w-xs",
                      children: role.description
                    }), /*#__PURE__*/_jsxs("div", {
                      className: "text-xs text-gray-400",
                      children: ["ID: ", role.id]
                    })]
                  })
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsxs("div", {
                    className: "flex flex-wrap gap-1",
                    children: [role.permissions.slice(0, 3).map(permission => /*#__PURE__*/_jsx(Badge, {
                      variant: "outline",
                      className: "text-xs",
                      children: permission
                    }, permission)), role.permissions.length > 3 && /*#__PURE__*/_jsxs(Badge, {
                      variant: "outline",
                      className: "text-xs",
                      children: ["+", role.permissions.length - 3, " more"]
                    })]
                  })
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsxs("div", {
                    className: "font-medium",
                    children: [role.userCount, " users"]
                  })
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsxs("div", {
                    children: [/*#__PURE__*/_jsx("div", {
                      className: "text-sm",
                      children: role.createdDate
                    }), /*#__PURE__*/_jsxs("div", {
                      className: "text-xs text-gray-500",
                      children: ["by ", role.createdBy]
                    })]
                  })
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsx(Badge, {
                    className: getStatusColor(role.status),
                    children: role.status
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
                        }), "Edit Role"]
                      }), /*#__PURE__*/_jsxs(DropdownMenuItem, {
                        children: [/*#__PURE__*/_jsx(User, {
                          className: "mr-2 h-4 w-4"
                        }), "Manage Users"]
                      }), /*#__PURE__*/_jsxs(DropdownMenuItem, {
                        children: [/*#__PURE__*/_jsx(Key, {
                          className: "mr-2 h-4 w-4"
                        }), "Edit Permissions"]
                      }), /*#__PURE__*/_jsx(DropdownMenuSeparator, {}), /*#__PURE__*/_jsxs(DropdownMenuItem, {
                        className: "text-red-600",
                        children: [/*#__PURE__*/_jsx(Trash2, {
                          className: "mr-2 h-4 w-4"
                        }), "Delete Role"]
                      })]
                    })]
                  })
                })]
              }, role.id))
            })]
          })
        })]
      })]
    }), /*#__PURE__*/_jsx(Dialog, {
      open: isCreateDialogOpen,
      onOpenChange: setIsCreateDialogOpen,
      children: /*#__PURE__*/_jsxs(DialogContent, {
        className: "max-w-4xl max-h-[80vh] overflow-y-auto",
        children: [/*#__PURE__*/_jsxs(DialogHeader, {
          children: [/*#__PURE__*/_jsx(DialogTitle, {
            children: "Create New Admin Role"
          }), /*#__PURE__*/_jsx(DialogDescription, {
            children: "Create a new role and select which modules users with this role can access"
          })]
        }), /*#__PURE__*/_jsxs("div", {
          className: "space-y-6 py-4",
          children: [/*#__PURE__*/_jsxs("div", {
            className: "grid grid-cols-1 md:grid-cols-2 gap-4",
            children: [/*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx(Label, {
                htmlFor: "roleName",
                children: "Role Name"
              }), /*#__PURE__*/_jsx(Input, {
                id: "roleName",
                value: newRole.roleName,
                onChange: e => setNewRole({
                  ...newRole,
                  roleName: e.target.value
                }),
                placeholder: "e.g., Marketing Manager"
              })]
            }), /*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx(Label, {
                htmlFor: "status",
                children: "Status"
              }), /*#__PURE__*/_jsxs(Select, {
                value: newRole.status,
                onValueChange: value => setNewRole({
                  ...newRole,
                  status: value
                }),
                children: [/*#__PURE__*/_jsx(SelectTrigger, {
                  children: /*#__PURE__*/_jsx(SelectValue, {})
                }), /*#__PURE__*/_jsxs(SelectContent, {
                  children: [/*#__PURE__*/_jsx(SelectItem, {
                    value: "active",
                    children: "Active"
                  }), /*#__PURE__*/_jsx(SelectItem, {
                    value: "inactive",
                    children: "Inactive"
                  })]
                })]
              })]
            })]
          }), /*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx(Label, {
              htmlFor: "description",
              children: "Description"
            }), /*#__PURE__*/_jsx(Input, {
              id: "description",
              value: newRole.description,
              onChange: e => setNewRole({
                ...newRole,
                description: e.target.value
              }),
              placeholder: "Brief description of the role"
            })]
          }), /*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx(Label, {
              className: "text-base font-medium",
              children: "Module Permissions"
            }), /*#__PURE__*/_jsx("p", {
              className: "text-sm text-gray-500 mb-4",
              children: "Select which modules users with this role can access"
            }), /*#__PURE__*/_jsx("div", {
              className: "grid grid-cols-1 md:grid-cols-2 gap-4",
              children: availablePermissions.map(permission => /*#__PURE__*/_jsxs("div", {
                className: "flex items-start space-x-3 p-3 border rounded-lg",
                children: [/*#__PURE__*/_jsx(Checkbox, {
                  id: permission.id,
                  checked: newRole.permissions.includes(permission.id),
                  onCheckedChange: checked => handlePermissionChange(permission.id, checked),
                  className: "mt-1"
                }), /*#__PURE__*/_jsxs("div", {
                  className: "flex-1",
                  children: [/*#__PURE__*/_jsx(Label, {
                    htmlFor: permission.id,
                    className: "font-medium",
                    children: permission.name
                  }), /*#__PURE__*/_jsx("p", {
                    className: "text-xs text-gray-500 mt-1",
                    children: permission.description
                  })]
                })]
              }, permission.id))
            })]
          })]
        }), /*#__PURE__*/_jsxs(DialogFooter, {
          children: [/*#__PURE__*/_jsx(Button, {
            variant: "outline",
            onClick: () => setIsCreateDialogOpen(false),
            children: "Cancel"
          }), /*#__PURE__*/_jsx(Button, {
            children: "Create Role"
          })]
        })]
      })
    })]
  });
};
export default AdminRolesAdmin;