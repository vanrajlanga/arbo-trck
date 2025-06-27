import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, Edit, Trash2, Calendar, DollarSign, Percent, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const AdminCoupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [newCoupon, setNewCoupon] = useState({
    code: '',
    description: '',
    discount_type: 'percentage',
    discount_value: 0,
    min_order_amount: 0,
    max_discount_amount: 0,
    usage_limit: 100,
    valid_from: '',
    valid_until: '',
    is_active: true
  });
  useEffect(() => {
    fetchCoupons();
  }, []);
  const fetchCoupons = async () => {
    try {
      const {
        data,
        error
      } = await supabase.from('coupon_codes').select('*').order('created_at', {
        ascending: false
      });
      if (error) {
        console.error('Error fetching coupons:', error);
        // Fallback to localStorage
        const savedCoupons = localStorage.getItem('adminCoupons');
        if (savedCoupons) {
          setCoupons(JSON.parse(savedCoupons));
        }
      } else {
        const formattedCoupons = data?.map(item => ({
          ...item,
          discount_type: item.discount_type
        })) || [];
        setCoupons(formattedCoupons);
        // Also save to localStorage as backup
        localStorage.setItem('adminCoupons', JSON.stringify(formattedCoupons));
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error("Failed to fetch coupons");
    } finally {
      setLoading(false);
    }
  };
  const resetForm = () => {
    setNewCoupon({
      code: '',
      description: '',
      discount_type: 'percentage',
      discount_value: 0,
      min_order_amount: 0,
      max_discount_amount: 0,
      usage_limit: 100,
      valid_from: '',
      valid_until: '',
      is_active: true
    });
  };
  const handleCreateCoupon = async () => {
    try {
      if (!newCoupon.code || !newCoupon.valid_from || !newCoupon.valid_until || newCoupon.discount_value <= 0) {
        toast.error("Please fill all required fields");
        return;
      }

      // Don't include the id in the insert - let Supabase generate it
      const couponData = {
        code: newCoupon.code,
        description: newCoupon.description,
        discount_type: newCoupon.discount_type,
        discount_value: newCoupon.discount_value,
        min_order_amount: newCoupon.min_order_amount,
        max_discount_amount: newCoupon.max_discount_amount || null,
        usage_limit: newCoupon.usage_limit,
        used_count: 0,
        valid_from: newCoupon.valid_from,
        valid_until: newCoupon.valid_until,
        is_active: newCoupon.is_active,
        created_by_admin: true
      };
      const {
        data,
        error
      } = await supabase.from('coupon_codes').insert([couponData]).select().single();
      if (error) {
        console.error('Error creating coupon:', error);
        toast.error("Failed to create coupon: " + error.message);
        return;
      }
      toast.success("Coupon created successfully");
      setIsCreateDialogOpen(false);
      resetForm();

      // Refresh the list to show the new coupon
      await fetchCoupons();
    } catch (error) {
      console.error('Error creating coupon:', error);
      toast.error("Failed to create coupon");
    }
  };
  const handleEditCoupon = async () => {
    if (!selectedCoupon) return;
    try {
      const {
        error
      } = await supabase.from('coupon_codes').update({
        ...selectedCoupon,
        updated_at: new Date().toISOString()
      }).eq('id', selectedCoupon.id);
      if (error) {
        console.error('Error updating coupon:', error);
        // Fallback to localStorage
        const updatedCoupons = coupons.map(coupon => coupon.id === selectedCoupon.id ? selectedCoupon : coupon);
        setCoupons(updatedCoupons);
        localStorage.setItem('adminCoupons', JSON.stringify(updatedCoupons));
      } else {
        await fetchCoupons(); // Refresh the list
      }
      toast.success("Coupon updated successfully");
      setIsEditDialogOpen(false);
      setSelectedCoupon(null);
    } catch (error) {
      console.error('Error updating coupon:', error);
      toast.error("Failed to update coupon");
    }
  };
  const handleDeleteCoupon = async () => {
    if (!selectedCoupon) return;
    try {
      const {
        error
      } = await supabase.from('coupon_codes').delete().eq('id', selectedCoupon.id);
      if (error) {
        console.error('Error deleting coupon:', error);
        // Fallback to localStorage
        const updatedCoupons = coupons.filter(coupon => coupon.id !== selectedCoupon.id);
        setCoupons(updatedCoupons);
        localStorage.setItem('adminCoupons', JSON.stringify(updatedCoupons));
      } else {
        await fetchCoupons(); // Refresh the list
      }
      toast.success("Coupon deleted successfully");
      setIsDeleteDialogOpen(false);
      setSelectedCoupon(null);
    } catch (error) {
      console.error('Error deleting coupon:', error);
      toast.error("Failed to delete coupon");
    }
  };
  const getDiscountDisplay = coupon => {
    return coupon.discount_type === 'percentage' ? `${coupon.discount_value}%` : `₹${coupon.discount_value}`;
  };
  const isExpired = validUntil => {
    return new Date(validUntil) < new Date();
  };
  const activeCoupons = coupons.filter(c => c.is_active && !isExpired(c.valid_until));
  const totalUsage = coupons.reduce((sum, coupon) => sum + coupon.used_count, 0);
  return /*#__PURE__*/_jsxs("div", {
    className: "space-y-6",
    children: [/*#__PURE__*/_jsxs("div", {
      className: "flex justify-between items-center",
      children: [/*#__PURE__*/_jsx("h1", {
        className: "text-3xl font-bold",
        children: "Coupon Management"
      }), /*#__PURE__*/_jsxs(Button, {
        onClick: () => setIsCreateDialogOpen(true),
        children: [/*#__PURE__*/_jsx(Plus, {
          className: "h-4 w-4 mr-2"
        }), "Create Coupon"]
      })]
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
                children: "Total Coupons"
              }), /*#__PURE__*/_jsx("p", {
                className: "text-2xl font-bold",
                children: coupons.length
              })]
            }), /*#__PURE__*/_jsx(Percent, {
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
                children: "Active Coupons"
              }), /*#__PURE__*/_jsx("p", {
                className: "text-2xl font-bold",
                children: activeCoupons.length
              })]
            }), /*#__PURE__*/_jsx(Calendar, {
              className: "h-8 w-8 text-green-500"
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
                children: "Total Usage"
              }), /*#__PURE__*/_jsx("p", {
                className: "text-2xl font-bold",
                children: totalUsage
              })]
            }), /*#__PURE__*/_jsx(Users, {
              className: "h-8 w-8 text-purple-500"
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
                children: "Active Rate"
              }), /*#__PURE__*/_jsxs("p", {
                className: "text-2xl font-bold",
                children: [coupons.length > 0 ? Math.round(activeCoupons.length / coupons.length * 100) : 0, "%"]
              })]
            }), /*#__PURE__*/_jsx(DollarSign, {
              className: "h-8 w-8 text-orange-500"
            })]
          })
        })
      })]
    }), /*#__PURE__*/_jsxs(Card, {
      children: [/*#__PURE__*/_jsx(CardHeader, {
        children: /*#__PURE__*/_jsx(CardTitle, {
          children: "All Coupons"
        })
      }), /*#__PURE__*/_jsx(CardContent, {
        children: loading ? /*#__PURE__*/_jsx("div", {
          className: "text-center py-8",
          children: "Loading..."
        }) : coupons.length === 0 ? /*#__PURE__*/_jsx("div", {
          className: "text-center py-8",
          children: /*#__PURE__*/_jsx("p", {
            className: "text-gray-500",
            children: "No coupons created yet."
          })
        }) : /*#__PURE__*/_jsxs(Table, {
          children: [/*#__PURE__*/_jsx(TableHeader, {
            children: /*#__PURE__*/_jsxs(TableRow, {
              children: [/*#__PURE__*/_jsx(TableHead, {
                children: "Code"
              }), /*#__PURE__*/_jsx(TableHead, {
                children: "Type"
              }), /*#__PURE__*/_jsx(TableHead, {
                children: "Discount"
              }), /*#__PURE__*/_jsx(TableHead, {
                children: "Min Order"
              }), /*#__PURE__*/_jsx(TableHead, {
                children: "Usage"
              }), /*#__PURE__*/_jsx(TableHead, {
                children: "Valid Until"
              }), /*#__PURE__*/_jsx(TableHead, {
                children: "Status"
              }), /*#__PURE__*/_jsx(TableHead, {
                children: "Actions"
              })]
            })
          }), /*#__PURE__*/_jsx(TableBody, {
            children: coupons.map(coupon => /*#__PURE__*/_jsxs(TableRow, {
              children: [/*#__PURE__*/_jsx(TableCell, {
                className: "font-medium",
                children: coupon.code
              }), /*#__PURE__*/_jsx(TableCell, {
                className: "capitalize",
                children: coupon.discount_type
              }), /*#__PURE__*/_jsx(TableCell, {
                children: getDiscountDisplay(coupon)
              }), /*#__PURE__*/_jsxs(TableCell, {
                children: ["\u20B9", coupon.min_order_amount]
              }), /*#__PURE__*/_jsxs(TableCell, {
                children: [coupon.used_count, "/", coupon.usage_limit || '∞']
              }), /*#__PURE__*/_jsx(TableCell, {
                children: new Date(coupon.valid_until).toLocaleDateString()
              }), /*#__PURE__*/_jsx(TableCell, {
                children: /*#__PURE__*/_jsx(Badge, {
                  className: !coupon.is_active ? "bg-gray-100 text-gray-800" : isExpired(coupon.valid_until) ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800",
                  children: !coupon.is_active ? "Inactive" : isExpired(coupon.valid_until) ? "Expired" : "Active"
                })
              }), /*#__PURE__*/_jsx(TableCell, {
                children: /*#__PURE__*/_jsxs("div", {
                  className: "flex space-x-2",
                  children: [/*#__PURE__*/_jsx(Button, {
                    variant: "ghost",
                    size: "sm",
                    onClick: () => {
                      setSelectedCoupon(coupon);
                      setIsEditDialogOpen(true);
                    },
                    children: /*#__PURE__*/_jsx(Edit, {
                      className: "h-4 w-4"
                    })
                  }), /*#__PURE__*/_jsx(Button, {
                    variant: "ghost",
                    size: "sm",
                    onClick: () => {
                      setSelectedCoupon(coupon);
                      setIsDeleteDialogOpen(true);
                    },
                    className: "text-red-500 hover:text-red-700",
                    children: /*#__PURE__*/_jsx(Trash2, {
                      className: "h-4 w-4"
                    })
                  })]
                })
              })]
            }, coupon.id))
          })]
        })
      })]
    }), /*#__PURE__*/_jsx(Dialog, {
      open: isCreateDialogOpen,
      onOpenChange: setIsCreateDialogOpen,
      children: /*#__PURE__*/_jsxs(DialogContent, {
        className: "max-w-2xl",
        children: [/*#__PURE__*/_jsxs(DialogHeader, {
          children: [/*#__PURE__*/_jsx(DialogTitle, {
            children: "Create New Coupon"
          }), /*#__PURE__*/_jsx(DialogDescription, {
            children: "Add a new coupon code for customers to use"
          })]
        }), /*#__PURE__*/_jsxs("div", {
          className: "grid grid-cols-1 md:grid-cols-2 gap-4 py-4",
          children: [/*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx(Label, {
              htmlFor: "code",
              children: "Coupon Code *"
            }), /*#__PURE__*/_jsx(Input, {
              id: "code",
              value: newCoupon.code,
              onChange: e => setNewCoupon({
                ...newCoupon,
                code: e.target.value.toUpperCase()
              }),
              placeholder: "e.g., SAVE20"
            })]
          }), /*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx(Label, {
              htmlFor: "discount_type",
              children: "Discount Type *"
            }), /*#__PURE__*/_jsxs(Select, {
              value: newCoupon.discount_type,
              onValueChange: value => setNewCoupon({
                ...newCoupon,
                discount_type: value
              }),
              children: [/*#__PURE__*/_jsx(SelectTrigger, {
                children: /*#__PURE__*/_jsx(SelectValue, {})
              }), /*#__PURE__*/_jsxs(SelectContent, {
                children: [/*#__PURE__*/_jsx(SelectItem, {
                  value: "percentage",
                  children: "Percentage"
                }), /*#__PURE__*/_jsx(SelectItem, {
                  value: "fixed",
                  children: "Fixed Amount"
                })]
              })]
            })]
          }), /*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsxs(Label, {
              htmlFor: "discount_value",
              children: ["Discount Value * ", newCoupon.discount_type === 'percentage' ? '(%)' : '(₹)']
            }), /*#__PURE__*/_jsx(Input, {
              id: "discount_value",
              type: "number",
              min: "0",
              value: newCoupon.discount_value,
              onChange: e => setNewCoupon({
                ...newCoupon,
                discount_value: Number(e.target.value)
              })
            })]
          }), /*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx(Label, {
              htmlFor: "min_order_amount",
              children: "Minimum Order Amount (\u20B9)"
            }), /*#__PURE__*/_jsx(Input, {
              id: "min_order_amount",
              type: "number",
              min: "0",
              value: newCoupon.min_order_amount,
              onChange: e => setNewCoupon({
                ...newCoupon,
                min_order_amount: Number(e.target.value)
              })
            })]
          }), /*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx(Label, {
              htmlFor: "max_discount_amount",
              children: "Maximum Discount Amount (\u20B9)"
            }), /*#__PURE__*/_jsx(Input, {
              id: "max_discount_amount",
              type: "number",
              min: "0",
              value: newCoupon.max_discount_amount,
              onChange: e => setNewCoupon({
                ...newCoupon,
                max_discount_amount: Number(e.target.value)
              }),
              placeholder: "Leave empty for no limit"
            })]
          }), /*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx(Label, {
              htmlFor: "usage_limit",
              children: "Usage Limit"
            }), /*#__PURE__*/_jsx(Input, {
              id: "usage_limit",
              type: "number",
              min: "1",
              value: newCoupon.usage_limit,
              onChange: e => setNewCoupon({
                ...newCoupon,
                usage_limit: Number(e.target.value)
              })
            })]
          }), /*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx(Label, {
              htmlFor: "valid_from",
              children: "Valid From *"
            }), /*#__PURE__*/_jsx(Input, {
              id: "valid_from",
              type: "date",
              value: newCoupon.valid_from,
              onChange: e => setNewCoupon({
                ...newCoupon,
                valid_from: e.target.value
              })
            })]
          }), /*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx(Label, {
              htmlFor: "valid_until",
              children: "Valid Until *"
            }), /*#__PURE__*/_jsx(Input, {
              id: "valid_until",
              type: "date",
              value: newCoupon.valid_until,
              onChange: e => setNewCoupon({
                ...newCoupon,
                valid_until: e.target.value
              })
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "md:col-span-2",
            children: [/*#__PURE__*/_jsx(Label, {
              htmlFor: "description",
              children: "Description"
            }), /*#__PURE__*/_jsx(Textarea, {
              id: "description",
              value: newCoupon.description,
              onChange: e => setNewCoupon({
                ...newCoupon,
                description: e.target.value
              }),
              placeholder: "Brief description of the coupon",
              rows: 3
            })]
          })]
        }), /*#__PURE__*/_jsxs(DialogFooter, {
          children: [/*#__PURE__*/_jsx(Button, {
            variant: "outline",
            onClick: () => {
              setIsCreateDialogOpen(false);
              resetForm();
            },
            children: "Cancel"
          }), /*#__PURE__*/_jsx(Button, {
            onClick: handleCreateCoupon,
            children: "Create Coupon"
          })]
        })]
      })
    }), /*#__PURE__*/_jsx(Dialog, {
      open: isEditDialogOpen,
      onOpenChange: setIsEditDialogOpen,
      children: /*#__PURE__*/_jsxs(DialogContent, {
        className: "max-w-2xl",
        children: [/*#__PURE__*/_jsx(DialogHeader, {
          children: /*#__PURE__*/_jsx(DialogTitle, {
            children: "Edit Coupon"
          })
        }), selectedCoupon && /*#__PURE__*/_jsxs("div", {
          className: "grid grid-cols-1 md:grid-cols-2 gap-4 py-4",
          children: [/*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx(Label, {
              htmlFor: "edit_code",
              children: "Coupon Code *"
            }), /*#__PURE__*/_jsx(Input, {
              id: "edit_code",
              value: selectedCoupon.code,
              onChange: e => setSelectedCoupon({
                ...selectedCoupon,
                code: e.target.value.toUpperCase()
              })
            })]
          }), /*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx(Label, {
              htmlFor: "edit_discount_type",
              children: "Discount Type *"
            }), /*#__PURE__*/_jsxs(Select, {
              value: selectedCoupon.discount_type,
              onValueChange: value => setSelectedCoupon({
                ...selectedCoupon,
                discount_type: value
              }),
              children: [/*#__PURE__*/_jsx(SelectTrigger, {
                children: /*#__PURE__*/_jsx(SelectValue, {})
              }), /*#__PURE__*/_jsxs(SelectContent, {
                children: [/*#__PURE__*/_jsx(SelectItem, {
                  value: "percentage",
                  children: "Percentage"
                }), /*#__PURE__*/_jsx(SelectItem, {
                  value: "fixed",
                  children: "Fixed Amount"
                })]
              })]
            })]
          }), /*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsxs(Label, {
              htmlFor: "edit_discount_value",
              children: ["Discount Value * ", selectedCoupon.discount_type === 'percentage' ? '(%)' : '(₹)']
            }), /*#__PURE__*/_jsx(Input, {
              id: "edit_discount_value",
              type: "number",
              min: "0",
              value: selectedCoupon.discount_value,
              onChange: e => setSelectedCoupon({
                ...selectedCoupon,
                discount_value: Number(e.target.value)
              })
            })]
          }), /*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx(Label, {
              htmlFor: "edit_min_order_amount",
              children: "Minimum Order Amount (\u20B9)"
            }), /*#__PURE__*/_jsx(Input, {
              id: "edit_min_order_amount",
              type: "number",
              min: "0",
              value: selectedCoupon.min_order_amount,
              onChange: e => setSelectedCoupon({
                ...selectedCoupon,
                min_order_amount: Number(e.target.value)
              })
            })]
          }), /*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx(Label, {
              htmlFor: "edit_max_discount_amount",
              children: "Maximum Discount Amount (\u20B9)"
            }), /*#__PURE__*/_jsx(Input, {
              id: "edit_max_discount_amount",
              type: "number",
              min: "0",
              value: selectedCoupon.max_discount_amount || 0,
              onChange: e => setSelectedCoupon({
                ...selectedCoupon,
                max_discount_amount: Number(e.target.value)
              })
            })]
          }), /*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx(Label, {
              htmlFor: "edit_usage_limit",
              children: "Usage Limit"
            }), /*#__PURE__*/_jsx(Input, {
              id: "edit_usage_limit",
              type: "number",
              min: "1",
              value: selectedCoupon.usage_limit || 0,
              onChange: e => setSelectedCoupon({
                ...selectedCoupon,
                usage_limit: Number(e.target.value)
              })
            })]
          }), /*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx(Label, {
              htmlFor: "edit_valid_from",
              children: "Valid From *"
            }), /*#__PURE__*/_jsx(Input, {
              id: "edit_valid_from",
              type: "date",
              value: selectedCoupon.valid_from.split('T')[0],
              onChange: e => setSelectedCoupon({
                ...selectedCoupon,
                valid_from: e.target.value
              })
            })]
          }), /*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx(Label, {
              htmlFor: "edit_valid_until",
              children: "Valid Until *"
            }), /*#__PURE__*/_jsx(Input, {
              id: "edit_valid_until",
              type: "date",
              value: selectedCoupon.valid_until.split('T')[0],
              onChange: e => setSelectedCoupon({
                ...selectedCoupon,
                valid_until: e.target.value
              })
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "md:col-span-2",
            children: [/*#__PURE__*/_jsx(Label, {
              htmlFor: "edit_description",
              children: "Description"
            }), /*#__PURE__*/_jsx(Textarea, {
              id: "edit_description",
              value: selectedCoupon.description || '',
              onChange: e => setSelectedCoupon({
                ...selectedCoupon,
                description: e.target.value
              }),
              rows: 3
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "flex items-center space-x-2",
            children: [/*#__PURE__*/_jsx("input", {
              type: "checkbox",
              id: "edit_is_active",
              checked: selectedCoupon.is_active,
              onChange: e => setSelectedCoupon({
                ...selectedCoupon,
                is_active: e.target.checked
              })
            }), /*#__PURE__*/_jsx(Label, {
              htmlFor: "edit_is_active",
              children: "Active"
            })]
          })]
        }), /*#__PURE__*/_jsxs(DialogFooter, {
          children: [/*#__PURE__*/_jsx(Button, {
            variant: "outline",
            onClick: () => {
              setIsEditDialogOpen(false);
              setSelectedCoupon(null);
            },
            children: "Cancel"
          }), /*#__PURE__*/_jsx(Button, {
            onClick: handleEditCoupon,
            children: "Update Coupon"
          })]
        })]
      })
    }), /*#__PURE__*/_jsx(Dialog, {
      open: isDeleteDialogOpen,
      onOpenChange: setIsDeleteDialogOpen,
      children: /*#__PURE__*/_jsxs(DialogContent, {
        children: [/*#__PURE__*/_jsxs(DialogHeader, {
          children: [/*#__PURE__*/_jsx(DialogTitle, {
            children: "Delete Coupon"
          }), /*#__PURE__*/_jsxs(DialogDescription, {
            children: ["Are you sure you want to delete the coupon \"", selectedCoupon?.code, "\"? This action cannot be undone."]
          })]
        }), /*#__PURE__*/_jsxs(DialogFooter, {
          children: [/*#__PURE__*/_jsx(Button, {
            variant: "outline",
            onClick: () => {
              setIsDeleteDialogOpen(false);
              setSelectedCoupon(null);
            },
            children: "Cancel"
          }), /*#__PURE__*/_jsx(Button, {
            variant: "destructive",
            onClick: handleDeleteCoupon,
            children: "Delete"
          })]
        })]
      })
    })]
  });
};
export default AdminCoupons;