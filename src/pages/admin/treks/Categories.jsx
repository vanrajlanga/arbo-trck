import { useState } from "react";
import { Search, Plus, MoreHorizontal, Edit, Trash2, Mountain, MapPin, Users, Star, Eye, Activity } from "lucide-react";
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

// Mock data for trek categories
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const categoriesData = [{
  id: "CAT001",
  name: "Himalayan Treks",
  description: "High altitude treks in the Himalayan region with stunning mountain views",
  difficultyLevel: "Hard",
  averageDuration: "7-15 days",
  totalTreks: 45,
  activeTreks: 38,
  averageRating: 4.7,
  totalBookings: 1250,
  status: "active",
  createdAt: "2025-01-15",
  icon: "🏔️"
}, {
  id: "CAT002",
  name: "Coastal Adventures",
  description: "Beach and coastal treks with water activities and scenic coastlines",
  difficultyLevel: "Easy",
  averageDuration: "2-5 days",
  totalTreks: 28,
  activeTreks: 25,
  averageRating: 4.5,
  totalBookings: 890,
  status: "active",
  createdAt: "2025-02-01",
  icon: "🏖️"
}, {
  id: "CAT003",
  name: "Forest Trails",
  description: "Dense forest trekking with wildlife spotting and nature exploration",
  difficultyLevel: "Medium",
  averageDuration: "3-7 days",
  totalTreks: 32,
  activeTreks: 29,
  averageRating: 4.6,
  totalBookings: 760,
  status: "active",
  createdAt: "2025-01-20",
  icon: "🌲"
}, {
  id: "CAT004",
  name: "Desert Expeditions",
  description: "Desert trekking with camel rides and cultural experiences",
  difficultyLevel: "Medium",
  averageDuration: "4-8 days",
  totalTreks: 15,
  activeTreks: 12,
  averageRating: 4.4,
  totalBookings: 320,
  status: "inactive",
  createdAt: "2025-03-10",
  icon: "🏜️"
}];
const AdminTrekCategories = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    difficultyLevel: "Easy",
    averageDuration: "",
    icon: ""
  });
  const filteredCategories = categoriesData.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchQuery.toLowerCase()) || category.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || category.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  const getStatusColor = status => {
    switch (status) {
      case "active":
        return "default";
      case "inactive":
        return "secondary";
      default:
        return "default";
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
  return /*#__PURE__*/_jsxs("div", {
    children: [/*#__PURE__*/_jsxs("div", {
      className: "flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8",
      children: [/*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx("h1", {
          className: "text-2xl font-bold",
          children: "Trek Categories"
        }), /*#__PURE__*/_jsx("p", {
          className: "text-gray-500",
          children: "Manage and organize trek categories for better classification"
        })]
      }), /*#__PURE__*/_jsxs(Dialog, {
        open: isCreateOpen,
        onOpenChange: setIsCreateOpen,
        children: [/*#__PURE__*/_jsx(DialogTrigger, {
          asChild: true,
          children: /*#__PURE__*/_jsxs(Button, {
            children: [/*#__PURE__*/_jsx(Plus, {
              className: "mr-2 h-4 w-4"
            }), "Add Category"]
          })
        }), /*#__PURE__*/_jsxs(DialogContent, {
          className: "max-w-md",
          children: [/*#__PURE__*/_jsxs(DialogHeader, {
            children: [/*#__PURE__*/_jsx(DialogTitle, {
              children: "Add Trek Category"
            }), /*#__PURE__*/_jsx(DialogDescription, {
              children: "Create a new category to organize treks"
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "space-y-4",
            children: [/*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx(Label, {
                htmlFor: "name",
                children: "Category Name"
              }), /*#__PURE__*/_jsx(Input, {
                id: "name",
                value: newCategory.name,
                onChange: e => setNewCategory({
                  ...newCategory,
                  name: e.target.value
                }),
                placeholder: "e.g., Mountain Adventures"
              })]
            }), /*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx(Label, {
                htmlFor: "description",
                children: "Description"
              }), /*#__PURE__*/_jsx(Textarea, {
                id: "description",
                value: newCategory.description,
                onChange: e => setNewCategory({
                  ...newCategory,
                  description: e.target.value
                }),
                placeholder: "Describe this category..."
              })]
            }), /*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx(Label, {
                htmlFor: "difficulty",
                children: "Default Difficulty Level"
              }), /*#__PURE__*/_jsxs(Select, {
                value: newCategory.difficultyLevel,
                onValueChange: value => setNewCategory({
                  ...newCategory,
                  difficultyLevel: value
                }),
                children: [/*#__PURE__*/_jsx(SelectTrigger, {
                  children: /*#__PURE__*/_jsx(SelectValue, {})
                }), /*#__PURE__*/_jsxs(SelectContent, {
                  children: [/*#__PURE__*/_jsx(SelectItem, {
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
            }), /*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx(Label, {
                htmlFor: "duration",
                children: "Average Duration"
              }), /*#__PURE__*/_jsx(Input, {
                id: "duration",
                value: newCategory.averageDuration,
                onChange: e => setNewCategory({
                  ...newCategory,
                  averageDuration: e.target.value
                }),
                placeholder: "e.g., 3-5 days"
              })]
            }), /*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx(Label, {
                htmlFor: "icon",
                children: "Icon/Emoji"
              }), /*#__PURE__*/_jsx(Input, {
                id: "icon",
                value: newCategory.icon,
                onChange: e => setNewCategory({
                  ...newCategory,
                  icon: e.target.value
                }),
                placeholder: "\uD83C\uDFD4\uFE0F"
              })]
            }), /*#__PURE__*/_jsx(Button, {
              onClick: () => setIsCreateOpen(false),
              className: "w-full",
              children: "Create Category"
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
            children: "Total Categories"
          }), /*#__PURE__*/_jsx(Mountain, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "8"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-xs text-muted-foreground",
            children: "Active categories"
          })]
        })]
      }), /*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsxs(CardHeader, {
          className: "flex flex-row items-center justify-between pb-2",
          children: [/*#__PURE__*/_jsx(CardTitle, {
            className: "text-sm font-medium",
            children: "Total Treks"
          }), /*#__PURE__*/_jsx(MapPin, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "120"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-xs text-muted-foreground",
            children: "Across all categories"
          })]
        })]
      }), /*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsxs(CardHeader, {
          className: "flex flex-row items-center justify-between pb-2",
          children: [/*#__PURE__*/_jsx(CardTitle, {
            className: "text-sm font-medium",
            children: "Total Bookings"
          }), /*#__PURE__*/_jsx(Users, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "3,220"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-xs text-muted-foreground",
            children: "This year"
          })]
        })]
      }), /*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsxs(CardHeader, {
          className: "flex flex-row items-center justify-between pb-2",
          children: [/*#__PURE__*/_jsx(CardTitle, {
            className: "text-sm font-medium",
            children: "Avg Rating"
          }), /*#__PURE__*/_jsx(Star, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "4.6"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-xs text-muted-foreground",
            children: "Overall rating"
          })]
        })]
      })]
    }), /*#__PURE__*/_jsxs(Card, {
      children: [/*#__PURE__*/_jsxs(CardHeader, {
        children: [/*#__PURE__*/_jsx(CardTitle, {
          children: "Category Management"
        }), /*#__PURE__*/_jsx(CardDescription, {
          children: "Organize and manage trek categories for better user experience"
        })]
      }), /*#__PURE__*/_jsxs(CardContent, {
        children: [/*#__PURE__*/_jsxs("div", {
          className: "flex flex-col lg:flex-row gap-4 mb-6",
          children: [/*#__PURE__*/_jsxs("div", {
            className: "relative flex-1",
            children: [/*#__PURE__*/_jsx(Search, {
              className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4"
            }), /*#__PURE__*/_jsx(Input, {
              placeholder: "Search categories...",
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
          })]
        }), /*#__PURE__*/_jsx("div", {
          className: "overflow-x-auto",
          children: /*#__PURE__*/_jsxs(Table, {
            children: [/*#__PURE__*/_jsx(TableHeader, {
              children: /*#__PURE__*/_jsxs(TableRow, {
                children: [/*#__PURE__*/_jsx(TableHead, {
                  children: "Category Details"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Difficulty & Duration"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Trek Count"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Performance"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Status"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Created"
                }), /*#__PURE__*/_jsx(TableHead, {
                  className: "text-right",
                  children: "Actions"
                })]
              })
            }), /*#__PURE__*/_jsx(TableBody, {
              children: filteredCategories.map(category => /*#__PURE__*/_jsxs(TableRow, {
                children: [/*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsxs("div", {
                    className: "flex items-center gap-3",
                    children: [/*#__PURE__*/_jsx("span", {
                      className: "text-2xl",
                      children: category.icon
                    }), /*#__PURE__*/_jsxs("div", {
                      children: [/*#__PURE__*/_jsx("div", {
                        className: "font-medium",
                        children: category.name
                      }), /*#__PURE__*/_jsx("div", {
                        className: "text-sm text-gray-500 max-w-xs truncate",
                        children: category.description
                      })]
                    })]
                  })
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsxs("div", {
                    children: [/*#__PURE__*/_jsx(Badge, {
                      className: getDifficultyColor(category.difficultyLevel),
                      children: category.difficultyLevel
                    }), /*#__PURE__*/_jsx("div", {
                      className: "text-sm text-gray-500 mt-1",
                      children: category.averageDuration
                    })]
                  })
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsxs("div", {
                    children: [/*#__PURE__*/_jsxs("div", {
                      className: "font-medium",
                      children: [category.totalTreks, " total"]
                    }), /*#__PURE__*/_jsxs("div", {
                      className: "text-sm text-gray-500",
                      children: [category.activeTreks, " active"]
                    })]
                  })
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsxs("div", {
                    children: [/*#__PURE__*/_jsxs("div", {
                      className: "flex items-center gap-1",
                      children: [/*#__PURE__*/_jsx(Star, {
                        className: "h-4 w-4 text-yellow-500 fill-current"
                      }), /*#__PURE__*/_jsx("span", {
                        className: "font-medium",
                        children: category.averageRating
                      })]
                    }), /*#__PURE__*/_jsxs("div", {
                      className: "text-sm text-gray-500",
                      children: [category.totalBookings, " bookings"]
                    })]
                  })
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsx(Badge, {
                    variant: getStatusColor(category.status),
                    children: category.status
                  })
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: category.createdAt
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
                        }), "View Treks"]
                      }), /*#__PURE__*/_jsxs(DropdownMenuItem, {
                        children: [/*#__PURE__*/_jsx(Edit, {
                          className: "mr-2 h-4 w-4"
                        }), "Edit Category"]
                      }), /*#__PURE__*/_jsxs(DropdownMenuItem, {
                        children: [/*#__PURE__*/_jsx(Activity, {
                          className: "mr-2 h-4 w-4"
                        }), "View Analytics"]
                      }), /*#__PURE__*/_jsx(DropdownMenuSeparator, {}), /*#__PURE__*/_jsxs(DropdownMenuItem, {
                        className: "text-red-600",
                        children: [/*#__PURE__*/_jsx(Trash2, {
                          className: "mr-2 h-4 w-4"
                        }), "Delete"]
                      })]
                    })]
                  })
                })]
              }, category.id))
            })]
          })
        })]
      })]
    })]
  });
};
export default AdminTrekCategories;