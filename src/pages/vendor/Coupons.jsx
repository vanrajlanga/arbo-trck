import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Percent, Calendar, DollarSign, Copy, Eye, CheckCircle, XCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

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
      const { data: couponsData, error: couponsError } = await supabase
        .from('coupon_codes')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      // Fetch trek coupons
      const { data: trekCouponsData, error: trekCouponsError } = await supabase
        .from('trek_coupons')
        .select('*');

      if (couponsError || trekCouponsError) {
        console.error('Error fetching data:', couponsError || trekCouponsError);
        // Fallback to localStorage
        const savedCoupons = localStorage.getItem('adminCoupons');
        const savedTrekCoupons = localStorage.getItem('vendorTrekCoupons');

        if (savedCoupons) {
          const parsedCoupons = JSON.parse(savedCoupons);
          setCoupons(parsedCoupons.filter((c) => c.is_active));
        } else {
          // Demo coupon data
          const demoCoupons = [
            {
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
            },
            {
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
            }
          ];
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
        const demoTreks = [
          { id: 1, name: "Himalayan Adventure", destination: "Manali" },
          { id: 2, name: "Beach Paradise", destination: "Goa" }
        ];
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
    return trekCoupons.some(tc => 
      tc.coupon_id === couponId && 
      tc.trek_id === trekId && 
      tc.is_active
    );
  };

  const toggleCouponForTrek = async (couponId, trekId, isActive) => {
    try {
      if (isActive) {
        // Add coupon to trek
        const newTrekCoupon = {
          id: Math.random().toString(36).substr(2, 9),
          trek_id: trekId,
          coupon_id: couponId,
          vendor_id: 'current-vendor-id', // In real app, get from auth
          is_active: true
        };

        const { error } = await supabase
          .from('trek_coupons')
          .insert([newTrekCoupon]);

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
        const { error } = await supabase
          .from('trek_coupons')
          .delete()
          .eq('coupon_id', couponId)
          .eq('trek_id', trekId);

        if (error) {
          // Fallback to localStorage
          const updatedTrekCoupons = trekCoupons.filter(tc => 
            !(tc.coupon_id === couponId && tc.trek_id === trekId)
          );
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

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    toast.success("Coupon code copied to clipboard");
  };

  const getDiscountDisplay = (coupon) => {
    if (coupon.discount_type === 'percentage') {
      return `${coupon.discount_value}%`;
    } else {
      return `₹${coupon.discount_value}`;
    }
  };

  const isExpired = (validUntil) => {
    return new Date(validUntil) < new Date();
  };

  const getActiveCouponsForTrek = (trekId) => {
    return trekCoupons.filter(tc => tc.trek_id === trekId && tc.is_active).length;
  };

  const filteredCoupons = coupons.filter(coupon => !isExpired(coupon.valid_until));
  const activeCouponsCount = trekCoupons.filter(tc => tc.is_active).length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Coupon Management</h1>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Available Coupons</p>
                <p className="text-2xl font-bold">{filteredCoupons.length}</p>
              </div>
              <Percent className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active on Treks</p>
                <p className="text-2xl font-bold">{activeCouponsCount}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">My Treks</p>
                <p className="text-2xl font-bold">{treks.length}</p>
              </div>
              <Calendar className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Trek Coverage</p>
                <p className="text-2xl font-bold">
                  {treks.length > 0 ? Math.round((treks.filter(t => getActiveCouponsForTrek(t.id) > 0).length / treks.length) * 100) : 0}%
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Trek Filter */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Manage Coupons for Your Treks</CardTitle>
            <Select value={selectedTrek} onValueChange={setSelectedTrek}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by trek" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Treks</SelectItem>
                {treks.map((trek) => (
                  <SelectItem key={trek.id} value={trek.id.toString()}>
                    {trek.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Loading...</div>
          ) : filteredCoupons.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No active coupons available from admin.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredCoupons.map((coupon) => (
                <div key={coupon.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-bold text-lg">{coupon.code}</h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(coupon.code)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Badge className="bg-green-100 text-green-800">Active</Badge>
                      </div>
                      <p className="text-gray-600 mb-3">{coupon.description}</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Discount:</span> {getDiscountDisplay(coupon)}
                        </div>
                        <div>
                          <span className="font-medium">Min Order:</span> ₹{coupon.min_order_amount}
                        </div>
                        <div>
                          <span className="font-medium">Usage:</span> {coupon.used_count}/{coupon.usage_limit || '∞'}
                        </div>
                        <div>
                          <span className="font-medium">Valid Until:</span> {new Date(coupon.valid_until).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <div className="text-2xl font-bold text-blue-600">{getDiscountDisplay(coupon)}</div>
                      <div className="text-xs text-gray-500">
                        {coupon.discount_type === 'percentage' ? 'Percentage' : 'Fixed Amount'}
                      </div>
                    </div>
                  </div>

                  {/* Trek Activation */}
                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-3">Activate for Your Treks:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {treks
                        .filter(trek => selectedTrek === 'all' || trek.id.toString() === selectedTrek)
                        .map((trek) => {
                          const isActive = isCouponActiveForTrek(coupon.id, trek.id);
                          return (
                            <div key={trek.id} className="flex items-center justify-between p-3 border rounded-md">
                              <div>
                                <p className="font-medium">{trek.name}</p>
                                <p className="text-sm text-gray-500">{trek.destination}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                {isActive ? (
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                ) : (
                                  <XCircle className="h-4 w-4 text-gray-400" />
                                )}
                                <Switch
                                  checked={isActive}
                                  onCheckedChange={(checked) => toggleCouponForTrek(coupon.id, trek.id, checked)}
                                />
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Trek Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Trek Coupon Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {treks.map((trek) => {
              const activeCoupons = getActiveCouponsForTrek(trek.id);
              return (
                <div key={trek.id} className="flex justify-between items-center p-3 border rounded-md">
                  <div>
                    <p className="font-medium">{trek.name}</p>
                    <p className="text-sm text-gray-500">{trek.destination}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant={activeCoupons > 0 ? "default" : "secondary"}>
                      {activeCoupons} Coupon{activeCoupons !== 1 ? 's' : ''} Active
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VendorCoupons;
