import { useState } from "react";
import { Search, Plus, MoreHorizontal, Phone, User, MapPin, Clock, AlertTriangle, Shield, Download } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock data for emergency contacts
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const emergencyContactsData = [{
  id: "1",
  userId: "USR001",
  userName: "Rahul Sharma",
  userPhone: "+91 9876543210",
  contactName: "Priya Sharma",
  contactPhone: "+91 9876543211",
  relationship: "spouse",
  isVerified: true,
  lastUpdated: "2025-05-15",
  currentTrek: "Himalayan Base Camp Trek",
  trekStatus: "active"
}, {
  id: "2",
  userId: "USR002",
  userName: "Anita Patel",
  userPhone: "+91 8765432109",
  contactName: "Rajesh Patel",
  contactPhone: "+91 8765432110",
  relationship: "father",
  isVerified: true,
  lastUpdated: "2025-05-20",
  currentTrek: null,
  trekStatus: "none"
}, {
  id: "3",
  userId: "USR003",
  userName: "Vikram Singh",
  userPhone: "+91 7654321098",
  contactName: "Sunita Singh",
  contactPhone: "+91 7654321099",
  relationship: "mother",
  isVerified: false,
  lastUpdated: "2025-06-01",
  currentTrek: "Western Ghats Adventure",
  trekStatus: "active"
}];
const AdminUserEmergency = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [relationshipFilter, setRelationshipFilter] = useState("all");
  const filteredContacts = emergencyContactsData.filter(contact => {
    const matchesSearch = contact.userName.toLowerCase().includes(searchQuery.toLowerCase()) || contact.contactName.toLowerCase().includes(searchQuery.toLowerCase()) || contact.userPhone.includes(searchQuery) || contact.contactPhone.includes(searchQuery);
    const matchesStatus = statusFilter === "all" || statusFilter === "verified" && contact.isVerified || statusFilter === "unverified" && !contact.isVerified;
    const matchesRelationship = relationshipFilter === "all" || contact.relationship === relationshipFilter;
    return matchesSearch && matchesStatus && matchesRelationship;
  });
  const getStatusColor = isVerified => {
    return isVerified ? "default" : "destructive";
  };
  const getTrekStatusColor = status => {
    switch (status) {
      case "active":
        return "destructive";
      case "completed":
        return "default";
      default:
        return "secondary";
    }
  };
  return /*#__PURE__*/_jsxs("div", {
    children: [/*#__PURE__*/_jsxs("div", {
      className: "flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8",
      children: [/*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx("h1", {
          className: "text-2xl font-bold",
          children: "Emergency Contacts"
        }), /*#__PURE__*/_jsx("p", {
          className: "text-gray-500",
          children: "Manage user emergency contact information for safety purposes"
        })]
      }), /*#__PURE__*/_jsxs("div", {
        className: "mt-4 lg:mt-0 flex gap-4",
        children: [/*#__PURE__*/_jsxs(Button, {
          variant: "outline",
          children: [/*#__PURE__*/_jsx(Download, {
            className: "mr-2 h-4 w-4"
          }), "Export Contacts"]
        }), /*#__PURE__*/_jsxs(Button, {
          children: [/*#__PURE__*/_jsx(Plus, {
            className: "mr-2 h-4 w-4"
          }), "Add Contact"]
        })]
      })]
    }), /*#__PURE__*/_jsxs("div", {
      className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8",
      children: [/*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsxs(CardHeader, {
          className: "flex flex-row items-center justify-between pb-2",
          children: [/*#__PURE__*/_jsx(CardTitle, {
            className: "text-sm font-medium",
            children: "Total Contacts"
          }), /*#__PURE__*/_jsx(User, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "248"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-xs text-muted-foreground",
            children: "Registered emergency contacts"
          })]
        })]
      }), /*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsxs(CardHeader, {
          className: "flex flex-row items-center justify-between pb-2",
          children: [/*#__PURE__*/_jsx(CardTitle, {
            className: "text-sm font-medium",
            children: "Verified Contacts"
          }), /*#__PURE__*/_jsx(Shield, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "189"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-xs text-muted-foreground",
            children: "76% verification rate"
          })]
        })]
      }), /*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsxs(CardHeader, {
          className: "flex flex-row items-center justify-between pb-2",
          children: [/*#__PURE__*/_jsx(CardTitle, {
            className: "text-sm font-medium",
            children: "Active Trek Users"
          }), /*#__PURE__*/_jsx(MapPin, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "23"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-xs text-muted-foreground",
            children: "Currently on treks"
          })]
        })]
      }), /*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsxs(CardHeader, {
          className: "flex flex-row items-center justify-between pb-2",
          children: [/*#__PURE__*/_jsx(CardTitle, {
            className: "text-sm font-medium",
            children: "Recent Updates"
          }), /*#__PURE__*/_jsx(Clock, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "12"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-xs text-muted-foreground",
            children: "Updated this week"
          })]
        })]
      })]
    }), /*#__PURE__*/_jsxs(Card, {
      children: [/*#__PURE__*/_jsxs(CardHeader, {
        children: [/*#__PURE__*/_jsx(CardTitle, {
          children: "Emergency Contact Management"
        }), /*#__PURE__*/_jsx(CardDescription, {
          children: "Monitor and manage emergency contacts for user safety"
        })]
      }), /*#__PURE__*/_jsxs(CardContent, {
        children: [/*#__PURE__*/_jsxs("div", {
          className: "flex flex-col lg:flex-row gap-4 mb-6",
          children: [/*#__PURE__*/_jsxs("div", {
            className: "relative flex-1",
            children: [/*#__PURE__*/_jsx(Search, {
              className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4"
            }), /*#__PURE__*/_jsx(Input, {
              placeholder: "Search by user name, contact name, or phone...",
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
                  value: "verified",
                  children: "Verified"
                }), /*#__PURE__*/_jsx(SelectItem, {
                  value: "unverified",
                  children: "Unverified"
                })]
              })]
            }), /*#__PURE__*/_jsxs(Select, {
              value: relationshipFilter,
              onValueChange: setRelationshipFilter,
              children: [/*#__PURE__*/_jsx(SelectTrigger, {
                className: "w-32",
                children: /*#__PURE__*/_jsx(SelectValue, {
                  placeholder: "Relationship"
                })
              }), /*#__PURE__*/_jsxs(SelectContent, {
                children: [/*#__PURE__*/_jsx(SelectItem, {
                  value: "all",
                  children: "All Relations"
                }), /*#__PURE__*/_jsx(SelectItem, {
                  value: "spouse",
                  children: "Spouse"
                }), /*#__PURE__*/_jsx(SelectItem, {
                  value: "parent",
                  children: "Parent"
                }), /*#__PURE__*/_jsx(SelectItem, {
                  value: "sibling",
                  children: "Sibling"
                }), /*#__PURE__*/_jsx(SelectItem, {
                  value: "friend",
                  children: "Friend"
                }), /*#__PURE__*/_jsx(SelectItem, {
                  value: "other",
                  children: "Other"
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
                  children: "User Information"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Emergency Contact"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Relationship"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Status"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Current Trek"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Last Updated"
                }), /*#__PURE__*/_jsx(TableHead, {
                  className: "text-right",
                  children: "Actions"
                })]
              })
            }), /*#__PURE__*/_jsx(TableBody, {
              children: filteredContacts.map(contact => /*#__PURE__*/_jsxs(TableRow, {
                children: [/*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsxs("div", {
                    children: [/*#__PURE__*/_jsx("div", {
                      className: "font-medium",
                      children: contact.userName
                    }), /*#__PURE__*/_jsxs("div", {
                      className: "text-sm text-gray-500 flex items-center gap-1",
                      children: [/*#__PURE__*/_jsx(Phone, {
                        className: "h-3 w-3"
                      }), contact.userPhone]
                    })]
                  })
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsxs("div", {
                    children: [/*#__PURE__*/_jsx("div", {
                      className: "font-medium",
                      children: contact.contactName
                    }), /*#__PURE__*/_jsxs("div", {
                      className: "text-sm text-gray-500 flex items-center gap-1",
                      children: [/*#__PURE__*/_jsx(Phone, {
                        className: "h-3 w-3"
                      }), contact.contactPhone]
                    })]
                  })
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsx(Badge, {
                    variant: "outline",
                    children: contact.relationship
                  })
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: /*#__PURE__*/_jsx(Badge, {
                    variant: getStatusColor(contact.isVerified),
                    children: contact.isVerified ? "Verified" : "Unverified"
                  })
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: contact.currentTrek ? /*#__PURE__*/_jsxs("div", {
                    children: [/*#__PURE__*/_jsx("div", {
                      className: "font-medium text-sm",
                      children: contact.currentTrek
                    }), /*#__PURE__*/_jsx(Badge, {
                      variant: getTrekStatusColor(contact.trekStatus),
                      className: "text-xs",
                      children: contact.trekStatus
                    })]
                  }) : /*#__PURE__*/_jsx("span", {
                    className: "text-gray-500",
                    children: "No active trek"
                  })
                }), /*#__PURE__*/_jsx(TableCell, {
                  children: contact.lastUpdated
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
                        children: [/*#__PURE__*/_jsx(Phone, {
                          className: "mr-2 h-4 w-4"
                        }), "Call Contact"]
                      }), /*#__PURE__*/_jsxs(DropdownMenuItem, {
                        children: [/*#__PURE__*/_jsx(User, {
                          className: "mr-2 h-4 w-4"
                        }), "View User Profile"]
                      }), !contact.isVerified && /*#__PURE__*/_jsxs(DropdownMenuItem, {
                        children: [/*#__PURE__*/_jsx(Shield, {
                          className: "mr-2 h-4 w-4"
                        }), "Verify Contact"]
                      }), /*#__PURE__*/_jsx(DropdownMenuSeparator, {}), /*#__PURE__*/_jsx(DropdownMenuItem, {
                        children: "Edit Contact"
                      })]
                    })]
                  })
                })]
              }, contact.id))
            })]
          })
        })]
      })]
    }), /*#__PURE__*/_jsxs("div", {
      className: "grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8",
      children: [/*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsx(CardHeader, {
          children: /*#__PURE__*/_jsx(CardTitle, {
            children: "Emergency Protocols"
          })
        }), /*#__PURE__*/_jsxs(CardContent, {
          className: "space-y-3",
          children: [/*#__PURE__*/_jsxs(Button, {
            variant: "outline",
            className: "w-full justify-start",
            children: [/*#__PURE__*/_jsx(AlertTriangle, {
              className: "mr-2 h-4 w-4"
            }), "Emergency Alert System"]
          }), /*#__PURE__*/_jsxs(Button, {
            variant: "outline",
            className: "w-full justify-start",
            children: [/*#__PURE__*/_jsx(Phone, {
              className: "mr-2 h-4 w-4"
            }), "Mass Contact System"]
          }), /*#__PURE__*/_jsxs(Button, {
            variant: "outline",
            className: "w-full justify-start",
            children: [/*#__PURE__*/_jsx(MapPin, {
              className: "mr-2 h-4 w-4"
            }), "Location Tracking"]
          })]
        })]
      }), /*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsx(CardHeader, {
          children: /*#__PURE__*/_jsx(CardTitle, {
            children: "Verification Status"
          })
        }), /*#__PURE__*/_jsx(CardContent, {
          children: /*#__PURE__*/_jsxs("div", {
            className: "space-y-3",
            children: [/*#__PURE__*/_jsxs("div", {
              className: "flex items-center justify-between text-sm",
              children: [/*#__PURE__*/_jsx("span", {
                children: "Verified Contacts"
              }), /*#__PURE__*/_jsx("span", {
                className: "font-medium text-green-600",
                children: "189 (76%)"
              })]
            }), /*#__PURE__*/_jsxs("div", {
              className: "flex items-center justify-between text-sm",
              children: [/*#__PURE__*/_jsx("span", {
                children: "Pending Verification"
              }), /*#__PURE__*/_jsx("span", {
                className: "font-medium text-yellow-600",
                children: "59 (24%)"
              })]
            }), /*#__PURE__*/_jsxs("div", {
              className: "flex items-center justify-between text-sm",
              children: [/*#__PURE__*/_jsx("span", {
                children: "Total Contacts"
              }), /*#__PURE__*/_jsx("span", {
                className: "font-medium",
                children: "248"
              })]
            })]
          })
        })]
      }), /*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsx(CardHeader, {
          children: /*#__PURE__*/_jsx(CardTitle, {
            children: "Safety Features"
          })
        }), /*#__PURE__*/_jsxs(CardContent, {
          className: "space-y-3",
          children: [/*#__PURE__*/_jsxs("div", {
            className: "flex items-center justify-between text-sm",
            children: [/*#__PURE__*/_jsx("span", {
              children: "Auto-notification on trek start"
            }), /*#__PURE__*/_jsx(Badge, {
              variant: "default",
              children: "Active"
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "flex items-center justify-between text-sm",
            children: [/*#__PURE__*/_jsx("span", {
              children: "Daily check-in reminders"
            }), /*#__PURE__*/_jsx(Badge, {
              variant: "default",
              children: "Active"
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "flex items-center justify-between text-sm",
            children: [/*#__PURE__*/_jsx("span", {
              children: "Emergency SOS button"
            }), /*#__PURE__*/_jsx(Badge, {
              variant: "default",
              children: "Active"
            })]
          })]
        })]
      })]
    })]
  });
};
export default AdminUserEmergency;