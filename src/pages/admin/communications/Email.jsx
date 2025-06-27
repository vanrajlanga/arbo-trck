import { useState } from "react";
import { Search, Filter, Download, Plus, Edit, Trash2, Eye, Send, Mail, Users, CheckCircle, MoreHorizontal } from "lucide-react";
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

// Mock data for email templates
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const emailTemplatesData = [{
  id: "TPL001",
  name: "Registration Welcome",
  subject: "Welcome to Aorbo Adventures!",
  category: "user",
  type: "registration",
  status: "active",
  lastModified: "2025-05-20",
  usage: 1250,
  content: "Welcome {{user_name}} to our platform..."
}, {
  id: "TPL002",
  name: "Password Reset",
  subject: "Reset Your Password",
  category: "user",
  type: "password_reset",
  status: "active",
  lastModified: "2025-05-18",
  usage: 450,
  content: "Hi {{user_name}}, you requested a password reset..."
}, {
  id: "TPL003",
  name: "Booking Confirmation",
  subject: "Your Trek Booking is Confirmed",
  category: "customer",
  type: "booking_confirmation",
  status: "active",
  lastModified: "2025-05-22",
  usage: 890,
  content: "Dear {{customer_name}}, your booking for {{trek_name}} is confirmed..."
}, {
  id: "TPL004",
  name: "Vendor Registration",
  subject: "Vendor Account Created",
  category: "vendor",
  type: "vendor_registration",
  status: "active",
  lastModified: "2025-05-15",
  usage: 125,
  content: "Welcome {{vendor_name}} to our vendor platform..."
}];
const AdminCommunicationEmail = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [newTemplate, setNewTemplate] = useState({
    name: "",
    subject: "",
    category: "user",
    type: "",
    content: "",
    status: "active"
  });
  const filteredTemplates = emailTemplatesData.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) || template.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || template.category === categoryFilter;
    const matchesStatus = statusFilter === "all" || template.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });
  const getStatusColor = status => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  const getCategoryColor = category => {
    switch (category) {
      case "user":
        return "bg-blue-100 text-blue-800";
      case "customer":
        return "bg-purple-100 text-purple-800";
      case "vendor":
        return "bg-orange-100 text-orange-800";
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
          children: "Email Templates"
        }), /*#__PURE__*/_jsx("p", {
          className: "text-gray-500",
          children: "Manage email templates for customer and vendor communications"
        })]
      }), /*#__PURE__*/_jsxs("div", {
        className: "flex gap-2 mt-4 lg:mt-0",
        children: [/*#__PURE__*/_jsxs(Button, {
          variant: "outline",
          children: [/*#__PURE__*/_jsx(Download, {
            className: "mr-2 h-4 w-4"
          }), "Export Templates"]
        }), /*#__PURE__*/_jsxs(Button, {
          onClick: () => setIsCreateDialogOpen(true),
          children: [/*#__PURE__*/_jsx(Plus, {
            className: "mr-2 h-4 w-4"
          }), "Create Template"]
        })]
      })]
    }), /*#__PURE__*/_jsxs("div", {
      className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8",
      children: [/*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsxs(CardHeader, {
          className: "flex flex-row items-center justify-between pb-2",
          children: [/*#__PURE__*/_jsx(CardTitle, {
            className: "text-sm font-medium",
            children: "Total Templates"
          }), /*#__PURE__*/_jsx(Mail, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "24"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-xs text-muted-foreground",
            children: "All categories"
          })]
        })]
      }), /*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsxs(CardHeader, {
          className: "flex flex-row items-center justify-between pb-2",
          children: [/*#__PURE__*/_jsx(CardTitle, {
            className: "text-sm font-medium",
            children: "Active Templates"
          }), /*#__PURE__*/_jsx(CheckCircle, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "20"
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
            children: "Total Emails Sent"
          }), /*#__PURE__*/_jsx(Send, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "12.5K"
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
            children: "Most Used"
          }), /*#__PURE__*/_jsx(Users, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "Registration"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-xs text-muted-foreground",
            children: "1,250 uses"
          })]
        })]
      })]
    }), /*#__PURE__*/_jsxs(Card, {
      children: [/*#__PURE__*/_jsxs(CardHeader, {
        children: [/*#__PURE__*/_jsx(CardTitle, {
          children: "Email Templates"
        }), /*#__PURE__*/_jsx(CardDescription, {
          children: "Manage templates for registration, booking confirmations, password resets, and other operational activities"
        })]
      }), /*#__PURE__*/_jsxs(CardContent, {
        children: [/*#__PURE__*/_jsxs("div", {
          className: "flex flex-col lg:flex-row gap-4 mb-6",
          children: [/*#__PURE__*/_jsxs("div", {
            className: "relative flex-1",
            children: [/*#__PURE__*/_jsx(Search, {
              className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4"
            }), /*#__PURE__*/_jsx(Input, {
              placeholder: "Search templates...",
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
                value: "user",
                children: "User"
              }), /*#__PURE__*/_jsx(SelectItem, {
                value: "customer",
                children: "Customer"
              }), /*#__PURE__*/_jsx(SelectItem, {
                value: "vendor",
                children: "Vendor"
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
                value: "draft",
                children: "Draft"
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
                  children: "Template Details"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Category"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Type"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Usage Stats"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Status"
                }), /*#__PURE__*/_jsx(TableHead, {
                  className: "text-right",
                  children: "Actions"
                })]
              })
            }), /*#__PURE__*/_jsx(TableBody, {
              children: filteredTemplates.map(template => /*#__PURE__*/_jsxs(TableRow, {
                children: [/*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsxs("div", {
                    children: [/*#__PURE__*/_jsx("div", {
                      className: "font-medium",
                      children: template.name
                    }), /*#__PURE__*/_jsx("div", {
                      className: "text-sm text-gray-500",
                      children: template.subject
                    }), /*#__PURE__*/_jsxs("div", {
                      className: "text-xs text-gray-400",
                      children: ["ID: ", template.id]
                    })]
                  })
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsx(Badge, {
                    className: getCategoryColor(template.category),
                    children: template.category
                  })
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsx("div", {
                    className: "text-sm",
                    children: template.type.replace('_', ' ')
                  })
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsxs("div", {
                    children: [/*#__PURE__*/_jsxs("div", {
                      className: "font-medium",
                      children: [template.usage.toLocaleString(), " uses"]
                    }), /*#__PURE__*/_jsxs("div", {
                      className: "text-xs text-gray-500",
                      children: ["Modified: ", template.lastModified]
                    })]
                  })
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsx(Badge, {
                    className: getStatusColor(template.status),
                    children: template.status
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
                        children: [/*#__PURE__*/_jsx(Eye, {
                          className: "mr-2 h-4 w-4"
                        }), "Preview"]
                      }), /*#__PURE__*/_jsxs(DropdownMenuItem, {
                        children: [/*#__PURE__*/_jsx(Edit, {
                          className: "mr-2 h-4 w-4"
                        }), "Edit Template"]
                      }), /*#__PURE__*/_jsxs(DropdownMenuItem, {
                        children: [/*#__PURE__*/_jsx(Send, {
                          className: "mr-2 h-4 w-4"
                        }), "Test Send"]
                      }), /*#__PURE__*/_jsx(DropdownMenuSeparator, {}), /*#__PURE__*/_jsxs(DropdownMenuItem, {
                        className: "text-red-600",
                        children: [/*#__PURE__*/_jsx(Trash2, {
                          className: "mr-2 h-4 w-4"
                        }), "Delete"]
                      })]
                    })]
                  })
                })]
              }, template.id))
            })]
          })
        })]
      })]
    }), /*#__PURE__*/_jsx(Dialog, {
      open: isCreateDialogOpen,
      onOpenChange: setIsCreateDialogOpen,
      children: /*#__PURE__*/_jsxs(DialogContent, {
        className: "max-w-3xl",
        children: [/*#__PURE__*/_jsxs(DialogHeader, {
          children: [/*#__PURE__*/_jsx(DialogTitle, {
            children: "Create Email Template"
          }), /*#__PURE__*/_jsx(DialogDescription, {
            children: "Create a new email template for customer or vendor communications"
          })]
        }), /*#__PURE__*/_jsxs("div", {
          className: "grid grid-cols-1 md:grid-cols-2 gap-4 py-4",
          children: [/*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx(Label, {
              htmlFor: "name",
              children: "Template Name"
            }), /*#__PURE__*/_jsx(Input, {
              id: "name",
              value: newTemplate.name,
              onChange: e => setNewTemplate({
                ...newTemplate,
                name: e.target.value
              }),
              placeholder: "e.g., Welcome Email"
            })]
          }), /*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx(Label, {
              htmlFor: "category",
              children: "Category"
            }), /*#__PURE__*/_jsxs(Select, {
              value: newTemplate.category,
              onValueChange: value => setNewTemplate({
                ...newTemplate,
                category: value
              }),
              children: [/*#__PURE__*/_jsx(SelectTrigger, {
                children: /*#__PURE__*/_jsx(SelectValue, {})
              }), /*#__PURE__*/_jsxs(SelectContent, {
                children: [/*#__PURE__*/_jsx(SelectItem, {
                  value: "user",
                  children: "User"
                }), /*#__PURE__*/_jsx(SelectItem, {
                  value: "customer",
                  children: "Customer"
                }), /*#__PURE__*/_jsx(SelectItem, {
                  value: "vendor",
                  children: "Vendor"
                })]
              })]
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "md:col-span-2",
            children: [/*#__PURE__*/_jsx(Label, {
              htmlFor: "subject",
              children: "Email Subject"
            }), /*#__PURE__*/_jsx(Input, {
              id: "subject",
              value: newTemplate.subject,
              onChange: e => setNewTemplate({
                ...newTemplate,
                subject: e.target.value
              }),
              placeholder: "Email subject line"
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "md:col-span-2",
            children: [/*#__PURE__*/_jsx(Label, {
              htmlFor: "content",
              children: "Email Content"
            }), /*#__PURE__*/_jsx(Textarea, {
              id: "content",
              value: newTemplate.content,
              onChange: e => setNewTemplate({
                ...newTemplate,
                content: e.target.value
              }),
              placeholder: "Email content... Use {{variable_name}} for dynamic content",
              rows: 8
            })]
          })]
        }), /*#__PURE__*/_jsxs(DialogFooter, {
          children: [/*#__PURE__*/_jsx(Button, {
            variant: "outline",
            onClick: () => setIsCreateDialogOpen(false),
            children: "Cancel"
          }), /*#__PURE__*/_jsx(Button, {
            children: "Create Template"
          })]
        })]
      })
    })]
  });
};
export default AdminCommunicationEmail;