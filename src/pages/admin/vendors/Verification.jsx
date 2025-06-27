import { useState } from "react";
import { Search, MoreHorizontal, Eye, Check, X, Download, FileText, CreditCard, Building, AlertTriangle, Clock, CheckCircle, XCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

// Mock data for vendor verification
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
const vendorData = [{
  id: "VEN001",
  name: "Adventure Trek Co.",
  email: "contact@adventuretrek.com",
  phone: "+91 9876543210",
  city: "Mumbai",
  state: "Maharashtra",
  submissionDate: "2025-06-01",
  status: "pending",
  documents: {
    businessLicense: {
      status: "uploaded",
      verified: false
    },
    gstCertificate: {
      status: "uploaded",
      verified: true
    },
    panCard: {
      status: "uploaded",
      verified: false
    },
    bankDetails: {
      status: "uploaded",
      verified: true
    },
    insuranceCertificate: {
      status: "missing",
      verified: false
    }
  },
  verificationNotes: "",
  assignedTo: "Verification Team A"
}, {
  id: "VEN002",
  name: "Mountain Explorers",
  email: "info@mountainexplorers.com",
  phone: "+91 8765432109",
  city: "Delhi",
  state: "Delhi",
  submissionDate: "2025-05-28",
  status: "approved",
  documents: {
    businessLicense: {
      status: "uploaded",
      verified: true
    },
    gstCertificate: {
      status: "uploaded",
      verified: true
    },
    panCard: {
      status: "uploaded",
      verified: true
    },
    bankDetails: {
      status: "uploaded",
      verified: true
    },
    insuranceCertificate: {
      status: "uploaded",
      verified: true
    }
  },
  verificationNotes: "All documents verified successfully",
  assignedTo: "Verification Team B"
}, {
  id: "VEN003",
  name: "Himalayan Adventures",
  email: "contact@himalayanadv.com",
  phone: "+91 7654321098",
  city: "Dehradun",
  state: "Uttarakhand",
  submissionDate: "2025-06-02",
  status: "rejected",
  documents: {
    businessLicense: {
      status: "uploaded",
      verified: false
    },
    gstCertificate: {
      status: "missing",
      verified: false
    },
    panCard: {
      status: "uploaded",
      verified: true
    },
    bankDetails: {
      status: "uploaded",
      verified: false
    },
    insuranceCertificate: {
      status: "missing",
      verified: false
    }
  },
  verificationNotes: "GST certificate and insurance documents missing. Business license appears to be invalid.",
  assignedTo: "Verification Team A"
}];
const AdminVendorVerification = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [verificationNotes, setVerificationNotes] = useState("");
  const filteredVendors = vendorData.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) || vendor.email.toLowerCase().includes(searchQuery.toLowerCase()) || vendor.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || vendor.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  const getStatusColor = status => {
    switch (status) {
      case "pending":
        return "default";
      case "approved":
        return "default";
      case "rejected":
        return "destructive";
      default:
        return "default";
    }
  };
  const getStatusIcon = status => {
    switch (status) {
      case "pending":
        return /*#__PURE__*/_jsx(Clock, {
          className: "h-4 w-4"
        });
      case "approved":
        return /*#__PURE__*/_jsx(CheckCircle, {
          className: "h-4 w-4"
        });
      case "rejected":
        return /*#__PURE__*/_jsx(XCircle, {
          className: "h-4 w-4"
        });
      default:
        return /*#__PURE__*/_jsx(Clock, {
          className: "h-4 w-4"
        });
    }
  };
  const getDocumentIcon = docType => {
    switch (docType) {
      case "businessLicense":
        return /*#__PURE__*/_jsx(Building, {
          className: "h-4 w-4"
        });
      case "gstCertificate":
        return /*#__PURE__*/_jsx(FileText, {
          className: "h-4 w-4"
        });
      case "panCard":
        return /*#__PURE__*/_jsx(CreditCard, {
          className: "h-4 w-4"
        });
      case "bankDetails":
        return /*#__PURE__*/_jsx(Building, {
          className: "h-4 w-4"
        });
      case "insuranceCertificate":
        return /*#__PURE__*/_jsx(FileText, {
          className: "h-4 w-4"
        });
      default:
        return /*#__PURE__*/_jsx(FileText, {
          className: "h-4 w-4"
        });
    }
  };
  const getDocumentName = docType => {
    switch (docType) {
      case "businessLicense":
        return "Business License";
      case "gstCertificate":
        return "GST Certificate";
      case "panCard":
        return "PAN Card";
      case "bankDetails":
        return "Bank Details";
      case "insuranceCertificate":
        return "Insurance Certificate";
      default:
        return docType;
    }
  };
  const getDocumentStatusBadge = doc => {
    if (doc.status === "missing") {
      return /*#__PURE__*/_jsx(Badge, {
        variant: "destructive",
        children: "Missing"
      });
    }
    if (doc.status === "uploaded" && doc.verified) {
      return /*#__PURE__*/_jsx(Badge, {
        variant: "default",
        children: "Verified"
      });
    }
    if (doc.status === "uploaded" && !doc.verified) {
      return /*#__PURE__*/_jsx(Badge, {
        variant: "secondary",
        children: "Pending"
      });
    }
    return /*#__PURE__*/_jsx(Badge, {
      variant: "secondary",
      children: "Unknown"
    });
  };
  const calculateCompletionPercentage = documents => {
    const totalDocs = Object.keys(documents).length;
    const verifiedDocs = Object.values(documents).filter(doc => doc.verified).length;
    return Math.round(verifiedDocs / totalDocs * 100);
  };
  return /*#__PURE__*/_jsxs("div", {
    children: [/*#__PURE__*/_jsxs("div", {
      className: "flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8",
      children: [/*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx("h1", {
          className: "text-2xl font-bold",
          children: "Vendor Document Verification"
        }), /*#__PURE__*/_jsx("p", {
          className: "text-gray-500",
          children: "Review and verify vendor documentation for approval"
        })]
      }), /*#__PURE__*/_jsxs(Button, {
        variant: "outline",
        children: [/*#__PURE__*/_jsx(Download, {
          className: "mr-2 h-4 w-4"
        }), "Export Report"]
      })]
    }), /*#__PURE__*/_jsxs("div", {
      className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8",
      children: [/*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsxs(CardHeader, {
          className: "flex flex-row items-center justify-between pb-2",
          children: [/*#__PURE__*/_jsx(CardTitle, {
            className: "text-sm font-medium",
            children: "Pending Verification"
          }), /*#__PURE__*/_jsx(Clock, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "15"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-xs text-muted-foreground",
            children: "Awaiting review"
          })]
        })]
      }), /*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsxs(CardHeader, {
          className: "flex flex-row items-center justify-between pb-2",
          children: [/*#__PURE__*/_jsx(CardTitle, {
            className: "text-sm font-medium",
            children: "Approved This Week"
          }), /*#__PURE__*/_jsx(CheckCircle, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "8"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-xs text-muted-foreground",
            children: "+25% from last week"
          })]
        })]
      }), /*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsxs(CardHeader, {
          className: "flex flex-row items-center justify-between pb-2",
          children: [/*#__PURE__*/_jsx(CardTitle, {
            className: "text-sm font-medium",
            children: "Rejected Applications"
          }), /*#__PURE__*/_jsx(XCircle, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "3"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-xs text-muted-foreground",
            children: "Needs resubmission"
          })]
        })]
      }), /*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsxs(CardHeader, {
          className: "flex flex-row items-center justify-between pb-2",
          children: [/*#__PURE__*/_jsx(CardTitle, {
            className: "text-sm font-medium",
            children: "Avg. Processing Time"
          }), /*#__PURE__*/_jsx(AlertTriangle, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "3.2"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-xs text-muted-foreground",
            children: "Days average"
          })]
        })]
      })]
    }), /*#__PURE__*/_jsxs(Card, {
      children: [/*#__PURE__*/_jsxs(CardHeader, {
        children: [/*#__PURE__*/_jsx(CardTitle, {
          children: "Vendor Applications"
        }), /*#__PURE__*/_jsx(CardDescription, {
          children: "Review vendor documentation and approve or reject applications"
        })]
      }), /*#__PURE__*/_jsxs(CardContent, {
        children: [/*#__PURE__*/_jsxs("div", {
          className: "flex flex-col lg:flex-row gap-4 mb-6",
          children: [/*#__PURE__*/_jsxs("div", {
            className: "relative flex-1",
            children: [/*#__PURE__*/_jsx(Search, {
              className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4"
            }), /*#__PURE__*/_jsx(Input, {
              placeholder: "Search vendors by name, email, or ID...",
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
                value: "pending",
                children: "Pending"
              }), /*#__PURE__*/_jsx(SelectItem, {
                value: "approved",
                children: "Approved"
              }), /*#__PURE__*/_jsx(SelectItem, {
                value: "rejected",
                children: "Rejected"
              })]
            })]
          })]
        }), /*#__PURE__*/_jsx("div", {
          className: "overflow-x-auto",
          children: /*#__PURE__*/_jsxs(Table, {
            children: [/*#__PURE__*/_jsx(TableHeader, {
              children: /*#__PURE__*/_jsxs(TableRow, {
                children: [/*#__PURE__*/_jsx(TableHead, {
                  children: "Vendor Details"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Location"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Submission Date"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Completion"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Status"
                }), /*#__PURE__*/_jsx(TableHead, {
                  children: "Assigned To"
                }), /*#__PURE__*/_jsx(TableHead, {
                  className: "text-right",
                  children: "Actions"
                })]
              })
            }), /*#__PURE__*/_jsx(TableBody, {
              children: filteredVendors.map(vendor => {
                const completionPercentage = calculateCompletionPercentage(vendor.documents);
                return /*#__PURE__*/_jsxs(TableRow, {
                  children: [/*#__PURE__*/_jsx(TableCell, {
                    children: /*#__PURE__*/_jsxs("div", {
                      children: [/*#__PURE__*/_jsx("div", {
                        className: "font-medium",
                        children: vendor.name
                      }), /*#__PURE__*/_jsx("div", {
                        className: "text-sm text-gray-500",
                        children: vendor.email
                      }), /*#__PURE__*/_jsx("div", {
                        className: "text-sm text-gray-500",
                        children: vendor.phone
                      })]
                    })
                  }), /*#__PURE__*/_jsx(TableCell, {
                    children: /*#__PURE__*/_jsxs("div", {
                      children: [/*#__PURE__*/_jsx("div", {
                        className: "font-medium",
                        children: vendor.city
                      }), /*#__PURE__*/_jsx("div", {
                        className: "text-sm text-gray-500",
                        children: vendor.state
                      })]
                    })
                  }), /*#__PURE__*/_jsx(TableCell, {
                    children: vendor.submissionDate
                  }), /*#__PURE__*/_jsx(TableCell, {
                    children: /*#__PURE__*/_jsxs("div", {
                      className: "flex items-center gap-2",
                      children: [/*#__PURE__*/_jsx("div", {
                        className: "w-16 bg-gray-200 rounded-full h-2",
                        children: /*#__PURE__*/_jsx("div", {
                          className: "bg-blue-600 h-2 rounded-full",
                          style: {
                            width: `${completionPercentage}%`
                          }
                        })
                      }), /*#__PURE__*/_jsxs("span", {
                        className: "text-sm",
                        children: [completionPercentage, "%"]
                      })]
                    })
                  }), /*#__PURE__*/_jsx(TableCell, {
                    children: /*#__PURE__*/_jsxs(Badge, {
                      variant: getStatusColor(vendor.status),
                      className: "flex items-center gap-1 w-fit",
                      children: [getStatusIcon(vendor.status), vendor.status]
                    })
                  }), /*#__PURE__*/_jsx(TableCell, {
                    children: vendor.assignedTo
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
                          onClick: () => {
                            setSelectedVendor(vendor);
                            setVerificationNotes(vendor.verificationNotes);
                            setIsDetailsOpen(true);
                          },
                          children: [/*#__PURE__*/_jsx(Eye, {
                            className: "mr-2 h-4 w-4"
                          }), "Review Documents"]
                        }), /*#__PURE__*/_jsxs(DropdownMenuItem, {
                          children: [/*#__PURE__*/_jsx(Check, {
                            className: "mr-2 h-4 w-4"
                          }), "Approve Vendor"]
                        }), /*#__PURE__*/_jsxs(DropdownMenuItem, {
                          children: [/*#__PURE__*/_jsx(X, {
                            className: "mr-2 h-4 w-4"
                          }), "Reject Application"]
                        })]
                      })]
                    })
                  })]
                }, vendor.id);
              })
            })]
          })
        })]
      })]
    }), /*#__PURE__*/_jsx(Dialog, {
      open: isDetailsOpen,
      onOpenChange: setIsDetailsOpen,
      children: /*#__PURE__*/_jsxs(DialogContent, {
        className: "max-w-4xl max-h-[80vh] overflow-y-auto",
        children: [/*#__PURE__*/_jsxs(DialogHeader, {
          children: [/*#__PURE__*/_jsxs(DialogTitle, {
            children: ["Document Verification - ", selectedVendor?.name]
          }), /*#__PURE__*/_jsx(DialogDescription, {
            children: "Review and verify vendor documentation"
          })]
        }), selectedVendor && /*#__PURE__*/_jsxs("div", {
          className: "space-y-6",
          children: [/*#__PURE__*/_jsxs("div", {
            className: "grid grid-cols-1 md:grid-cols-2 gap-4",
            children: [/*#__PURE__*/_jsxs("div", {
              className: "space-y-2",
              children: [/*#__PURE__*/_jsx("h4", {
                className: "font-medium",
                children: "Vendor Information"
              }), /*#__PURE__*/_jsxs("div", {
                className: "text-sm",
                children: [/*#__PURE__*/_jsxs("p", {
                  children: [/*#__PURE__*/_jsx("strong", {
                    children: "Name:"
                  }), " ", selectedVendor.name]
                }), /*#__PURE__*/_jsxs("p", {
                  children: [/*#__PURE__*/_jsx("strong", {
                    children: "Email:"
                  }), " ", selectedVendor.email]
                }), /*#__PURE__*/_jsxs("p", {
                  children: [/*#__PURE__*/_jsx("strong", {
                    children: "Phone:"
                  }), " ", selectedVendor.phone]
                }), /*#__PURE__*/_jsxs("p", {
                  children: [/*#__PURE__*/_jsx("strong", {
                    children: "Location:"
                  }), " ", selectedVendor.city, ", ", selectedVendor.state]
                })]
              })]
            }), /*#__PURE__*/_jsxs("div", {
              className: "space-y-2",
              children: [/*#__PURE__*/_jsx("h4", {
                className: "font-medium",
                children: "Application Details"
              }), /*#__PURE__*/_jsxs("div", {
                className: "text-sm",
                children: [/*#__PURE__*/_jsxs("p", {
                  children: [/*#__PURE__*/_jsx("strong", {
                    children: "Submission Date:"
                  }), " ", selectedVendor.submissionDate]
                }), /*#__PURE__*/_jsxs("p", {
                  children: [/*#__PURE__*/_jsx("strong", {
                    children: "Status:"
                  }), /*#__PURE__*/_jsx(Badge, {
                    variant: getStatusColor(selectedVendor.status),
                    className: "ml-2",
                    children: selectedVendor.status
                  })]
                }), /*#__PURE__*/_jsxs("p", {
                  children: [/*#__PURE__*/_jsx("strong", {
                    children: "Assigned To:"
                  }), " ", selectedVendor.assignedTo]
                })]
              })]
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "space-y-4",
            children: [/*#__PURE__*/_jsx("h4", {
              className: "font-medium",
              children: "Document Verification"
            }), /*#__PURE__*/_jsx("div", {
              className: "grid grid-cols-1 md:grid-cols-2 gap-4",
              children: Object.entries(selectedVendor.documents).map(([docType, doc]) => /*#__PURE__*/_jsxs("div", {
                className: "border rounded-lg p-4",
                children: [/*#__PURE__*/_jsxs("div", {
                  className: "flex items-center justify-between mb-2",
                  children: [/*#__PURE__*/_jsxs("div", {
                    className: "flex items-center gap-2",
                    children: [getDocumentIcon(docType), /*#__PURE__*/_jsx("span", {
                      className: "font-medium",
                      children: getDocumentName(docType)
                    })]
                  }), getDocumentStatusBadge(doc)]
                }), /*#__PURE__*/_jsx("div", {
                  className: "flex gap-2",
                  children: doc.status === "uploaded" ? /*#__PURE__*/_jsxs(_Fragment, {
                    children: [/*#__PURE__*/_jsxs(Button, {
                      size: "sm",
                      variant: "outline",
                      children: [/*#__PURE__*/_jsx(Eye, {
                        className: "mr-2 h-4 w-4"
                      }), "View"]
                    }), /*#__PURE__*/_jsxs(Button, {
                      size: "sm",
                      variant: "outline",
                      children: [/*#__PURE__*/_jsx(Download, {
                        className: "mr-2 h-4 w-4"
                      }), "Download"]
                    }), !doc.verified && /*#__PURE__*/_jsxs(Button, {
                      size: "sm",
                      children: [/*#__PURE__*/_jsx(Check, {
                        className: "mr-2 h-4 w-4"
                      }), "Verify"]
                    })]
                  }) : /*#__PURE__*/_jsx("p", {
                    className: "text-sm text-red-600",
                    children: "Document not uploaded"
                  })
                })]
              }, docType))
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "space-y-2",
            children: [/*#__PURE__*/_jsx("h4", {
              className: "font-medium",
              children: "Verification Notes"
            }), /*#__PURE__*/_jsx(Textarea, {
              value: verificationNotes,
              onChange: e => setVerificationNotes(e.target.value),
              placeholder: "Add notes about the verification process...",
              className: "min-h-[100px]"
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "flex gap-2",
            children: [/*#__PURE__*/_jsxs(Button, {
              children: [/*#__PURE__*/_jsx(Check, {
                className: "mr-2 h-4 w-4"
              }), "Approve Vendor"]
            }), /*#__PURE__*/_jsxs(Button, {
              variant: "destructive",
              children: [/*#__PURE__*/_jsx(X, {
                className: "mr-2 h-4 w-4"
              }), "Reject Application"]
            }), /*#__PURE__*/_jsx(Button, {
              variant: "outline",
              children: "Save Notes"
            })]
          })]
        })]
      })
    })]
  });
};
export default AdminVendorVerification;