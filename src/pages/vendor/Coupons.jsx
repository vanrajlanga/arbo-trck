import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Percent, Calendar, DollarSign, Copy, CheckCircle, XCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const VendorCoupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [treks, setTreks] = useState([]);
  const [trekCoupons, setTrekCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTrek, setSelectedTrek] = useState('all');
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      // Fetch coupons from Supabase
      const {
        data: couponsData,
        error: couponsError
      } = await supabase.from('coupon_codes').select('*').eq('is_active', true).order('created_at', {
        ascending: false
      });

      // Fetch trek coupons
      const {
        data: trekCouponsData,
        error: trekCouponsError
      } = await supabase.from('trek_coupons').select('*');
      if (couponsError || trekCouponsError) {
        console.error('Error fetching data:', couponsError || trekCouponsError);
        // Fallback to localStorage
        const savedCoupons = localStorage.getItem('adminCoupons');
        const savedTrekCoupons = localStorage.getItem('vendorTrekCoupons');
        if (savedCoupons) {
          const parsedCoupons = JSON.parse(savedCoupons);
          setCoupons(parsedCoupons.filter(c => c.is_active));
        } else {
          // Demo coupon data
          const demoCoupons = [{
            id: "1",
            code: "WELCOME10",
            description: "Welcome discount for new users",
            discount_type: "percentage",
            discount_value: 10,
            min_order_amount: 500,
            max_discount_amount: 1000,
            usage_limit: 100,
            used_count: 25,
            valid_from: "2025-01-01T00:00:00Z",
            valid_until: "2025-12-31T23:59:59Z",
            is_active: true
          }, {
            id: "2",
            code: "SAVE500",
            description: "Fixed discount on all treks",
            discount_type: "fixed",
            discount_value: 500,
            min_order_amount: 2000,
            usage_limit: 50,
            used_count: 12,
            valid_from: "2025-01-01T00:00:00Z",
            valid_until: "2025-06-30T23:59:59Z",
            is_active: true
          }];
          setCoupons(demoCoupons);
        }
        if (savedTrekCoupons) {
          setTrekCoupons(JSON.parse(savedTrekCoupons));
        } else {
          setTrekCoupons([]);
        }
      } else {
        const formattedCoupons = couponsData?.map(item => ({
          ...item,
          discount_type: item.discount_type
        })) || [];
        setCoupons(formattedCoupons);
        setTrekCoupons(trekCouponsData || []);

        // Save to localStorage as backup
        localStorage.setItem('adminCoupons', JSON.stringify(formattedCoupons));
        localStorage.setItem('vendorTrekCoupons', JSON.stringify(trekCouponsData || []));
      }

      // Load treks from localStorage
      const savedTreks = localStorage.getItem('vendorTreks');
      if (savedTreks) {
        setTreks(JSON.parse(savedTreks));
      } else {
        // Demo trek data
        const demoTreks = [{
          id: 1,
          name: "Himalayan Adventure",
          destination: "Manali"
        }, {
          id: 2,
          name: "Beach Paradise",
          destination: "Goa"
        }];
        setTreks(demoTreks);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };
  const isCouponActiveForTrek = (couponId, trekId) => {
    return trekCoupons.some(tc => tc.coupon_id === couponId && tc.trek_id === trekId && tc.is_active);
  };
  const toggleCouponForTrek = async (couponId, trekId, isActive) => {
    try {
      if (isActive) {
        // Add coupon to trek
        const newTrekCoupon = {
          id: Math.random().toString(36).substr(2, 9),
          trek_id: trekId,
          coupon_id: couponId,
          vendor_id: 'current-vendor-id',
          // In real app, get from auth
          is_active: true
        };
        const {
          error
        } = await supabase.from('trek_coupons').insert([newTrekCoupon]);
        if (error) {
          // Fallback to localStorage
          const updatedTrekCoupons = [...trekCoupons, newTrekCoupon];
          setTrekCoupons(updatedTrekCoupons);
          localStorage.setItem('vendorTrekCoupons', JSON.stringify(updatedTrekCoupons));
        } else {
          await fetchData();
        }
      } else {
        // Remove coupon from trek
        const {
          error
        } = await supabase.from('trek_coupons').delete().eq('coupon_id', couponId).eq('trek_id', trekId);
        if (error) {
          // Fallback to localStorage
          const updatedTrekCoupons = trekCoupons.filter(tc => !(tc.coupon_id === couponId && tc.trek_id === trekId));
          setTrekCoupons(updatedTrekCoupons);
          localStorage.setItem('vendorTrekCoupons', JSON.stringify(updatedTrekCoupons));
        } else {
          await fetchData();
        }
      }
      toast.success(isActive ? "Coupon activated for trek" : "Coupon deactivated for trek");
    } catch (error) {
      console.error('Error toggling coupon:', error);
      toast.error("Failed to update coupon status");
    }
  };
  const copyToClipboard = code => {
    navigator.clipboard.writeText(code);
    toast.success("Coupon code copied to clipboard");
  };
  const getDiscountDisplay = coupon => {
    if (coupon.discount_type === 'percentage') {
      return `${coupon.discount_value}%`;
    } else {
      return `₹${coupon.discount_value}`;
    }
  };
  const isExpired = validUntil => {
    return new Date(validUntil) < new Date();
  };
  const getActiveCouponsForTrek = trekId => {
    return trekCoupons.filter(tc => tc.trek_id === trekId && tc.is_active).length;
  };
  const filteredCoupons = coupons.filter(coupon => !isExpired(coupon.valid_until));
  const activeCouponsCount = trekCoupons.filter(tc => tc.is_active).length;
  return /*#__PURE__*/_jsxs("div", {
    className: "space-y-6",
    children: [/*#__PURE__*/_jsx("div", {
      className: "flex justify-between items-center",
      children: /*#__PURE__*/_jsx("h1", {
        className: "text-3xl font-bold",
        children: "Coupon Management"
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
                children: "Available Coupons"
              }), /*#__PURE__*/_jsx("p", {
                className: "text-2xl font-bold",
                children: filteredCoupons.length
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
                children: "Active on Treks"
              }), /*#__PURE__*/_jsx("p", {
                className: "text-2xl font-bold",
                children: activeCouponsCount
              })]
            }), /*#__PURE__*/_jsx(CheckCircle, {
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
                children: "My Treks"
              }), /*#__PURE__*/_jsx("p", {
                className: "text-2xl font-bold",
                children: treks.length
              })]
            }), /*#__PURE__*/_jsx(Calendar, {
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
                children: "Trek Coverage"
              }), /*#__PURE__*/_jsxs("p", {
                className: "text-2xl font-bold",
                children: [treks.length > 0 ? Math.round(treks.filter(t => getActiveCouponsForTrek(t.id) > 0).length / treks.length * 100) : 0, "%"]
              })]
            }), /*#__PURE__*/_jsx(DollarSign, {
              className: "h-8 w-8 text-orange-500"
            })]
          })
        })
      })]
    }), /*#__PURE__*/_jsxs(Card, {
      children: [/*#__PURE__*/_jsx(CardHeader, {
        children: /*#__PURE__*/_jsxs("div", {
          className: "flex justify-between items-center",
          children: [/*#__PURE__*/_jsx(CardTitle, {
            children: "Manage Coupons for Your Treks"
          }), /*#__PURE__*/_jsxs(Select, {
            value: selectedTrek,
            onValueChange: setSelectedTrek,
            children: [/*#__PURE__*/_jsx(SelectTrigger, {
              className: "w-48",
              children: /*#__PURE__*/_jsx(SelectValue, {
                placeholder: "Filter by trek"
              })
            }), /*#__PURE__*/_jsxs(SelectContent, {
              children: [/*#__PURE__*/_jsx(SelectItem, {
                value: "all",
                children: "All Treks"
              }), treks.map(trek => /*#__PURE__*/_jsx(SelectItem, {
                value: trek.id.toString(),
                children: trek.name
              }, trek.id))]
            })]
          })]
        })
      }), /*#__PURE__*/_jsx(CardContent, {
        children: loading ? /*#__PURE__*/_jsx("div", {
          className: "text-center py-8",
          children: "Loading..."
        }) : filteredCoupons.length === 0 ? /*#__PURE__*/_jsx("div", {
          className: "text-center py-8",
          children: /*#__PURE__*/_jsx("p", {
            className: "text-gray-500",
            children: "No active coupons available from admin."
          })
        }) : /*#__PURE__*/_jsx("div", {
          className: "space-y-4",
          children: filteredCoupons.map(coupon => /*#__PURE__*/_jsxs("div", {
            className: "border rounded-lg p-4",
            children: [/*#__PURE__*/_jsxs("div", {
              className: "flex justify-between items-start mb-4",
              children: [/*#__PURE__*/_jsxs("div", {
                className: "flex-1",
                children: [/*#__PURE__*/_jsxs("div", {
                  className: "flex items-center gap-2 mb-2",
                  children: [/*#__PURE__*/_jsx("h3", {
                    className: "font-bold text-lg",
                    children: coupon.code
                  }), /*#__PURE__*/_jsx(Button, {
                    variant: "ghost",
                    size: "sm",
                    onClick: () => copyToClipboard(coupon.code),
                    children: /*#__PURE__*/_jsx(Copy, {
                      className: "h-4 w-4"
                    })
                  }), /*#__PURE__*/_jsx(Badge, {
                    className: "bg-green-100 text-green-800",
                    children: "Active"
                  })]
                }), /*#__PURE__*/_jsx("p", {
                  className: "text-gray-600 mb-3",
                  children: coupon.description
                }), /*#__PURE__*/_jsxs("div", {
                  className: "grid grid-cols-2 md:grid-cols-4 gap-4 text-sm",
                  children: [/*#__PURE__*/_jsxs("div", {
                    children: [/*#__PURE__*/_jsx("span", {
                      className: "font-medium",
                      children: "Discount:"
                    }), " ", getDiscountDisplay(coupon)]
                  }), /*#__PURE__*/_jsxs("div", {
                    children: [/*#__PURE__*/_jsx("span", {
                      className: "font-medium",
                      children: "Min Order:"
                    }), " \u20B9", coupon.min_order_amount]
                  }), /*#__PURE__*/_jsxs("div", {
                    children: [/*#__PURE__*/_jsx("span", {
                      className: "font-medium",
                      children: "Usage:"
                    }), " ", coupon.used_count, "/", coupon.usage_limit || '∞']
                  }), /*#__PURE__*/_jsxs("div", {
                    children: [/*#__PURE__*/_jsx("span", {
                      className: "font-medium",
                      children: "Valid Until:"
                    }), " ", new Date(coupon.valid_until).toLocaleDateString()]
                  })]
                })]
              }), /*#__PURE__*/_jsxs("div", {
                className: "text-right ml-4",
                children: [/*#__PURE__*/_jsx("div", {
                  className: "text-2xl font-bold text-blue-600",
                  children: getDiscountDisplay(coupon)
                }), /*#__PURE__*/_jsx("div", {
                  className: "text-xs text-gray-500",
                  children: coupon.discount_type === 'percentage' ? 'Percentage' : 'Fixed Amount'
                })]
              })]
            }), /*#__PURE__*/_jsxs("div", {
              className: "border-t pt-4",
              children: [/*#__PURE__*/_jsx("h4", {
                className: "font-medium mb-3",
                children: "Activate for Your Treks:"
              }), /*#__PURE__*/_jsx("div", {
                className: "grid grid-cols-1 md:grid-cols-2 gap-3",
                children: treks.filter(trek => selectedTrek === 'all' || trek.id.toString() === selectedTrek).map(trek => {
                  const isActive = isCouponActiveForTrek(coupon.id, trek.id);
                  return /*#__PURE__*/_jsxs("div", {
                    className: "flex items-center justify-between p-3 border rounded-md",
                    children: [/*#__PURE__*/_jsxs("div", {
                      children: [/*#__PURE__*/_jsx("p", {
                        className: "font-medium",
                        children: trek.name
                      }), /*#__PURE__*/_jsx("p", {
                        className: "text-sm text-gray-500",
                        children: trek.destination
                      })]
                    }), /*#__PURE__*/_jsxs("div", {
                      className: "flex items-center gap-2",
                      children: [isActive ? /*#__PURE__*/_jsx(CheckCircle, {
                        className: "h-4 w-4 text-green-500"
                      }) : /*#__PURE__*/_jsx(XCircle, {
                        className: "h-4 w-4 text-gray-400"
                      }), /*#__PURE__*/_jsx(Switch, {
                        checked: isActive,
                        onCheckedChange: checked => toggleCouponForTrek(coupon.id, trek.id, checked)
                      })]
                    })]
                  }, trek.id);
                })
              })]
            })]
          }, coupon.id))
        })
      })]
    }), /*#__PURE__*/_jsxs(Card, {
      children: [/*#__PURE__*/_jsx(CardHeader, {
        children: /*#__PURE__*/_jsx(CardTitle, {
          children: "Trek Coupon Summary"
        })
      }), /*#__PURE__*/_jsx(CardContent, {
        children: /*#__PURE__*/_jsx("div", {
          className: "space-y-3",
          children: treks.map(trek => {
            const activeCoupons = getActiveCouponsForTrek(trek.id);
            return /*#__PURE__*/_jsxs("div", {
              className: "flex justify-between items-center p-3 border rounded-md",
              children: [/*#__PURE__*/_jsxs("div", {
                children: [/*#__PURE__*/_jsx("p", {
                  className: "font-medium",
                  children: trek.name
                }), /*#__PURE__*/_jsx("p", {
                  className: "text-sm text-gray-500",
                  children: trek.destination
                })]
              }), /*#__PURE__*/_jsx("div", {
                className: "text-right",
                children: /*#__PURE__*/_jsxs(Badge, {
                  variant: activeCoupons > 0 ? "default" : "secondary",
                  children: [activeCoupons, " Coupon", activeCoupons !== 1 ? 's' : '', " Active"]
                })
              })]
            }, trek.id);
          })
        })
      })]
    })]
  });
};
export default VendorCoupons;