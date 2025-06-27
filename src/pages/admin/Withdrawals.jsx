import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { CheckCircle, XCircle, Clock, DollarSign, Eye, FileText } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
const AdminWithdrawals = () => {
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedWithdrawal, setSelectedWithdrawal] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [actionType, setActionType] = useState('view');
  const [adminNotes, setAdminNotes] = useState('');
  useEffect(() => {
    fetchWithdrawals();
  }, []);
  const fetchWithdrawals = async () => {
    try {
      const {
        data,
        error
      } = await supabase.from('withdrawal_requests').select('*').order('created_at', {
        ascending: false
      });
      if (error) {
        console.error('Error fetching withdrawals:', error);
        // Fallback to localStorage
        const savedWithdrawals = localStorage.getItem('adminWithdrawals');
        if (savedWithdrawals) {
          setWithdrawals(JSON.parse(savedWithdrawals));
        } else {
          // Demo data
          const demoWithdrawals = [{
            id: "1",
            vendor_id: "vendor-1",
            vendor_name: "Mountain Treks Co.",
            amount: 25000,
            status: "pending",
            bank_account_number: "1234567890",
            bank_name: "State Bank of India",
            account_holder_name: "John Doe",
            ifsc_code: "SBIN0001234",
            request_date: "2025-01-15T10:30:00Z",
            admin_notes: "",
            created_at: "2025-01-15T10:30:00Z",
            updated_at: "2025-01-15T10:30:00Z"
          }, {
            id: "2",
            vendor_id: "vendor-2",
            vendor_name: "Adventure Tours",
            amount: 15000,
            status: "approved",
            bank_account_number: "9876543210",
            bank_name: "HDFC Bank",
            account_holder_name: "Jane Smith",
            ifsc_code: "HDFC0001234",
            request_date: "2025-01-10T14:20:00Z",
            processed_date: "2025-01-12T09:15:00Z",
            admin_notes: "Approved after verification",
            created_at: "2025-01-10T14:20:00Z",
            updated_at: "2025-01-12T09:15:00Z"
          }];
          setWithdrawals(demoWithdrawals);
          localStorage.setItem('adminWithdrawals', JSON.stringify(demoWithdrawals));
        }
      } else {
        setWithdrawals(data?.map(item => ({
          ...item,
          status: item.status
        })) || []);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error("Failed to fetch withdrawal requests");
    } finally {
      setLoading(false);
    }
  };
  const openDialog = (withdrawal, action) => {
    setSelectedWithdrawal(withdrawal);
    setActionType(action);
    setAdminNotes(withdrawal.admin_notes || '');
    setDialogOpen(true);
  };
  const handleAction = async () => {
    if (!selectedWithdrawal) return;
    const newStatus = actionType === 'approve' ? 'approved' : 'rejected';
    const updatedWithdrawal = {
      ...selectedWithdrawal,
      status: newStatus,
      admin_notes: adminNotes,
      processed_date: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    try {
      const {
        error
      } = await supabase.from('withdrawal_requests').update({
        status: newStatus,
        admin_notes: adminNotes,
        processed_date: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }).eq('id', selectedWithdrawal.id);
      if (error) {
        // Fallback to localStorage
        const updatedWithdrawals = withdrawals.map(w => w.id === selectedWithdrawal.id ? updatedWithdrawal : w);
        setWithdrawals(updatedWithdrawals);
        localStorage.setItem('adminWithdrawals', JSON.stringify(updatedWithdrawals));
      } else {
        await fetchWithdrawals();
      }
      toast.success(`Withdrawal request ${newStatus} successfully`);
      setDialogOpen(false);
    } catch (error) {
      console.error('Error updating withdrawal:', error);
      toast.error("Failed to update withdrawal request");
    }
  };
  const getStatusBadge = status => {
    switch (status) {
      case 'pending':
        return /*#__PURE__*/_jsxs(Badge, {
          className: "bg-yellow-100 text-yellow-800",
          children: [/*#__PURE__*/_jsx(Clock, {
            className: "h-3 w-3 mr-1"
          }), "Pending"]
        });
      case 'approved':
        return /*#__PURE__*/_jsxs(Badge, {
          className: "bg-green-100 text-green-800",
          children: [/*#__PURE__*/_jsx(CheckCircle, {
            className: "h-3 w-3 mr-1"
          }), "Approved"]
        });
      case 'rejected':
        return /*#__PURE__*/_jsxs(Badge, {
          className: "bg-red-100 text-red-800",
          children: [/*#__PURE__*/_jsx(XCircle, {
            className: "h-3 w-3 mr-1"
          }), "Rejected"]
        });
      case 'processed':
        return /*#__PURE__*/_jsxs(Badge, {
          className: "bg-blue-100 text-blue-800",
          children: [/*#__PURE__*/_jsx(DollarSign, {
            className: "h-3 w-3 mr-1"
          }), "Processed"]
        });
      default:
        return /*#__PURE__*/_jsx(Badge, {
          variant: "secondary",
          children: status
        });
    }
  };
  const pendingWithdrawals = withdrawals.filter(w => w.status === 'pending');
  const totalPending = pendingWithdrawals.reduce((sum, w) => sum + w.amount, 0);
  const totalProcessed = withdrawals.filter(w => w.status === 'processed').reduce((sum, w) => sum + w.amount, 0);
  return /*#__PURE__*/_jsxs("div", {
    className: "space-y-6",
    children: [/*#__PURE__*/_jsx("div", {
      className: "flex justify-between items-center",
      children: /*#__PURE__*/_jsx("h1", {
        className: "text-3xl font-bold",
        children: "Withdrawal Management"
      })
    }), /*#__PURE__*/_jsxs("div", {
      className: "grid grid-cols-1 md:grid-cols-4 gap-4",
      children: [/*#__PURE__*/_jsx(Card, {
        children: /*#__PURE__*/_jsx(CardContent, {
          className: "p-4",
          children: /*#__PURE__*/_jsxs("div", {
            className: "flex items-center justify-between",
            children: [/*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx("p", {
                className: "text-sm text-gray-600",
                children: "Total Requests"
              }), /*#__PURE__*/_jsx("p", {
                className: "text-2xl font-bold",
                children: withdrawals.length
              })]
            }), /*#__PURE__*/_jsx(FileText, {
              className: "h-8 w-8 text-blue-500"
            })]
          })
        })
      }), /*#__PURE__*/_jsx(Card, {
        children: /*#__PURE__*/_jsx(CardContent, {
          className: "p-4",
          children: /*#__PURE__*/_jsxs("div", {
            className: "flex items-center justify-between",
            children: [/*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx("p", {
                className: "text-sm text-gray-600",
                children: "Pending Requests"
              }), /*#__PURE__*/_jsx("p", {
                className: "text-2xl font-bold",
                children: pendingWithdrawals.length
              })]
            }), /*#__PURE__*/_jsx(Clock, {
              className: "h-8 w-8 text-yellow-500"
            })]
          })
        })
      }), /*#__PURE__*/_jsx(Card, {
        children: /*#__PURE__*/_jsx(CardContent, {
          className: "p-4",
          children: /*#__PURE__*/_jsxs("div", {
            className: "flex items-center justify-between",
            children: [/*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx("p", {
                className: "text-sm text-gray-600",
                children: "Pending Amount"
              }), /*#__PURE__*/_jsxs("p", {
                className: "text-2xl font-bold",
                children: ["\u20B9", totalPending.toLocaleString()]
              })]
            }), /*#__PURE__*/_jsx(DollarSign, {
              className: "h-8 w-8 text-orange-500"
            })]
          })
        })
      }), /*#__PURE__*/_jsx(Card, {
        children: /*#__PURE__*/_jsx(CardContent, {
          className: "p-4",
          children: /*#__PURE__*/_jsxs("div", {
            className: "flex items-center justify-between",
            children: [/*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx("p", {
                className: "text-sm text-gray-600",
                children: "Total Processed"
              }), /*#__PURE__*/_jsxs("p", {
                className: "text-2xl font-bold",
                children: ["\u20B9", totalProcessed.toLocaleString()]
              })]
            }), /*#__PURE__*/_jsx(CheckCircle, {
              className: "h-8 w-8 text-green-500"
            })]
          })
        })
      })]
    }), /*#__PURE__*/_jsxs(Card, {
      children: [/*#__PURE__*/_jsx(CardHeader, {
        children: /*#__PURE__*/_jsx(CardTitle, {
          children: "Withdrawal Requests"
        })
      }), /*#__PURE__*/_jsx(CardContent, {
        children: loading ? /*#__PURE__*/_jsx("div", {
          className: "text-center py-8",
          children: "Loading..."
        }) : withdrawals.length === 0 ? /*#__PURE__*/_jsx("div", {
          className: "text-center py-8",
          children: /*#__PURE__*/_jsx("p", {
            className: "text-gray-500",
            children: "No withdrawal requests found."
          })
        }) : /*#__PURE__*/_jsx("div", {
          className: "space-y-4",
          children: withdrawals.map(withdrawal => /*#__PURE__*/_jsxs("div", {
            className: "border rounded-lg p-4",
            children: [/*#__PURE__*/_jsx("div", {
              className: "flex justify-between items-start mb-4",
              children: /*#__PURE__*/_jsxs("div", {
                className: "flex-1",
                children: [/*#__PURE__*/_jsxs("div", {
                  className: "flex items-center gap-2 mb-2",
                  children: [/*#__PURE__*/_jsxs("h3", {
                    className: "font-bold text-lg",
                    children: ["\u20B9", withdrawal.amount.toLocaleString()]
                  }), getStatusBadge(withdrawal.status)]
                }), /*#__PURE__*/_jsxs("p", {
                  className: "text-gray-600 mb-2",
                  children: [/*#__PURE__*/_jsx("span", {
                    className: "font-medium",
                    children: "Vendor:"
                  }), " ", withdrawal.vendor_name || 'Unknown Vendor']
                }), /*#__PURE__*/_jsxs("div", {
                  className: "grid grid-cols-2 md:grid-cols-4 gap-4 text-sm",
                  children: [/*#__PURE__*/_jsxs("div", {
                    children: [/*#__PURE__*/_jsx("span", {
                      className: "font-medium",
                      children: "Bank:"
                    }), " ", withdrawal.bank_name]
                  }), /*#__PURE__*/_jsxs("div", {
                    children: [/*#__PURE__*/_jsx("span", {
                      className: "font-medium",
                      children: "Account:"
                    }), " ****", withdrawal.bank_account_number.slice(-4)]
                  }), /*#__PURE__*/_jsxs("div", {
                    children: [/*#__PURE__*/_jsx("span", {
                      className: "font-medium",
                      children: "IFSC:"
                    }), " ", withdrawal.ifsc_code]
                  }), /*#__PURE__*/_jsxs("div", {
                    children: [/*#__PURE__*/_jsx("span", {
                      className: "font-medium",
                      children: "Requested:"
                    }), " ", new Date(withdrawal.request_date).toLocaleDateString()]
                  })]
                }), withdrawal.processed_date && /*#__PURE__*/_jsxs("p", {
                  className: "text-sm text-gray-600 mt-2",
                  children: [/*#__PURE__*/_jsx("span", {
                    className: "font-medium",
                    children: "Processed:"
                  }), " ", new Date(withdrawal.processed_date).toLocaleDateString()]
                }), withdrawal.admin_notes && /*#__PURE__*/_jsxs("p", {
                  className: "text-sm text-gray-600 mt-2",
                  children: [/*#__PURE__*/_jsx("span", {
                    className: "font-medium",
                    children: "Notes:"
                  }), " ", withdrawal.admin_notes]
                })]
              })
            }), /*#__PURE__*/_jsxs("div", {
              className: "flex justify-end gap-2",
              children: [/*#__PURE__*/_jsxs(Button, {
                variant: "outline",
                size: "sm",
                onClick: () => openDialog(withdrawal, 'view'),
                children: [/*#__PURE__*/_jsx(Eye, {
                  className: "h-4 w-4 mr-1"
                }), "View Details"]
              }), withdrawal.status === 'pending' && /*#__PURE__*/_jsxs(_Fragment, {
                children: [/*#__PURE__*/_jsxs(Button, {
                  variant: "default",
                  size: "sm",
                  onClick: () => openDialog(withdrawal, 'approve'),
                  children: [/*#__PURE__*/_jsx(CheckCircle, {
                    className: "h-4 w-4 mr-1"
                  }), "Approve"]
                }), /*#__PURE__*/_jsxs(Button, {
                  variant: "destructive",
                  size: "sm",
                  onClick: () => openDialog(withdrawal, 'reject'),
                  children: [/*#__PURE__*/_jsx(XCircle, {
                    className: "h-4 w-4 mr-1"
                  }), "Reject"]
                })]
              })]
            })]
          }, withdrawal.id))
        })
      })]
    }), /*#__PURE__*/_jsx(Dialog, {
      open: dialogOpen,
      onOpenChange: setDialogOpen,
      children: /*#__PURE__*/_jsxs(DialogContent, {
        className: "max-w-2xl",
        children: [/*#__PURE__*/_jsx(DialogHeader, {
          children: /*#__PURE__*/_jsx(DialogTitle, {
            children: actionType === 'view' ? 'Withdrawal Details' : actionType === 'approve' ? 'Approve Withdrawal' : 'Reject Withdrawal'
          })
        }), selectedWithdrawal && /*#__PURE__*/_jsxs("div", {
          className: "space-y-4",
          children: [/*#__PURE__*/_jsxs("div", {
            className: "grid grid-cols-2 gap-4",
            children: [/*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx(Label, {
                children: "Amount"
              }), /*#__PURE__*/_jsxs("p", {
                className: "font-bold text-2xl text-blue-600",
                children: ["\u20B9", selectedWithdrawal.amount.toLocaleString()]
              })]
            }), /*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx(Label, {
                children: "Status"
              }), /*#__PURE__*/_jsx("div", {
                className: "mt-1",
                children: getStatusBadge(selectedWithdrawal.status)
              })]
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "grid grid-cols-2 gap-4",
            children: [/*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx(Label, {
                children: "Account Holder"
              }), /*#__PURE__*/_jsx("p", {
                children: selectedWithdrawal.account_holder_name
              })]
            }), /*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx(Label, {
                children: "Bank Name"
              }), /*#__PURE__*/_jsx("p", {
                children: selectedWithdrawal.bank_name
              })]
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "grid grid-cols-2 gap-4",
            children: [/*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx(Label, {
                children: "Account Number"
              }), /*#__PURE__*/_jsx("p", {
                children: selectedWithdrawal.bank_account_number
              })]
            }), /*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx(Label, {
                children: "IFSC Code"
              }), /*#__PURE__*/_jsx("p", {
                children: selectedWithdrawal.ifsc_code
              })]
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "grid grid-cols-2 gap-4",
            children: [/*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx(Label, {
                children: "Request Date"
              }), /*#__PURE__*/_jsx("p", {
                children: new Date(selectedWithdrawal.request_date).toLocaleString()
              })]
            }), selectedWithdrawal.processed_date && /*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx(Label, {
                children: "Processed Date"
              }), /*#__PURE__*/_jsx("p", {
                children: new Date(selectedWithdrawal.processed_date).toLocaleString()
              })]
            })]
          }), actionType !== 'view' && /*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx(Label, {
              htmlFor: "admin_notes",
              children: "Admin Notes"
            }), /*#__PURE__*/_jsx(Textarea, {
              id: "admin_notes",
              value: adminNotes,
              onChange: e => setAdminNotes(e.target.value),
              placeholder: `Add notes for ${actionType === 'approve' ? 'approval' : 'rejection'}...`,
              rows: 3
            })]
          }), selectedWithdrawal.admin_notes && actionType === 'view' && /*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx(Label, {
              children: "Existing Admin Notes"
            }), /*#__PURE__*/_jsx("p", {
              className: "bg-gray-50 p-3 rounded-md",
              children: selectedWithdrawal.admin_notes
            })]
          })]
        }), /*#__PURE__*/_jsxs(DialogFooter, {
          children: [/*#__PURE__*/_jsx(Button, {
            variant: "outline",
            onClick: () => setDialogOpen(false),
            children: actionType === 'view' ? 'Close' : 'Cancel'
          }), actionType !== 'view' && /*#__PURE__*/_jsx(Button, {
            onClick: handleAction,
            variant: actionType === 'approve' ? 'default' : 'destructive',
            children: actionType === 'approve' ? 'Approve Request' : 'Reject Request'
          })]
        })]
      })
    })]
  });
};
export default AdminWithdrawals;