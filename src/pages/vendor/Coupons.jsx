import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
    Percent,
    Calendar,
    DollarSign,
    Copy,
    CheckCircle,
    XCircle,
} from "lucide-react";
import { apiVendor } from "@/lib/api";

const VendorCoupons = () => {
    const [coupons, setCoupons] = useState([]);
    const [treks, setTreks] = useState([]);
    const [trekCoupons, setTrekCoupons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedTrek, setSelectedTrek] = useState("all");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [couponsResponse, treksResponse] = await Promise.all([
                apiVendor.getCoupons(),
                apiVendor.getTreks(),
            ]);

            setCoupons(couponsResponse.data || []);
            setTreks(treksResponse.data || []);

            // For now, we'll simulate trek-coupon assignments
            // In a real implementation, this would come from the backend
            const mockTrekCoupons =
                couponsResponse.data?.map((coupon) => ({
                    id: Math.random(),
                    coupon_id: coupon.id,
                    trek_id: treksResponse.data?.[0]?.id || 1,
                    is_active: Math.random() > 0.5,
                    assigned_at: new Date().toISOString(),
                })) || [];

            setTrekCoupons(mockTrekCoupons);
        } catch (error) {
            console.error("Error fetching data:", error);
            toast.error("Failed to fetch data");
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            toast.success("Coupon code copied to clipboard!");
        } catch (error) {
            console.error("Failed to copy:", error);
            toast.error("Failed to copy coupon code");
        }
    };

    const toggleCouponForTrek = async (couponId, trekId, isActive) => {
        try {
            // In a real implementation, this would call the backend API
            setTrekCoupons((prev) =>
                prev.map((tc) =>
                    tc.coupon_id === couponId && tc.trek_id === trekId
                        ? { ...tc, is_active: !isActive }
                        : tc
                )
            );
            toast.success(
                `Coupon ${isActive ? "deactivated" : "activated"} for trek`
            );
        } catch (error) {
            console.error("Error toggling coupon:", error);
            toast.error("Failed to update coupon status");
        }
    };

    const getDiscountDisplay = (coupon) => {
        return coupon.discount_type === "percentage"
            ? `${coupon.discount_value}%`
            : `₹${coupon.discount_value}`;
    };

    const isExpired = (validUntil) => {
        return new Date(validUntil) < new Date();
    };

    const getActiveCouponsForTrek = (trekId) => {
        return trekCoupons.filter((tc) => tc.trek_id === trekId && tc.is_active)
            .length;
    };

    const filteredCoupons = coupons.filter(
        (coupon) => !isExpired(coupon.valid_until)
    );
    const activeCouponsCount = trekCoupons.filter((tc) => tc.is_active).length;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Coupon Management</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">
                                    Available Coupons
                                </p>
                                <p className="text-2xl font-bold">
                                    {filteredCoupons.length}
                                </p>
                            </div>
                            <Percent className="h-8 w-8 text-blue-500" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">
                                    Active Assignments
                                </p>
                                <p className="text-2xl font-bold">
                                    {activeCouponsCount}
                                </p>
                            </div>
                            <CheckCircle className="h-8 w-8 text-green-500" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">
                                    Total Treks
                                </p>
                                <p className="text-2xl font-bold">
                                    {treks.length}
                                </p>
                            </div>
                            <Calendar className="h-8 w-8 text-purple-500" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">
                                    Avg Discount
                                </p>
                                <p className="text-2xl font-bold">
                                    {filteredCoupons.length > 0
                                        ? Math.round(
                                              filteredCoupons.reduce(
                                                  (sum, c) =>
                                                      sum + c.discount_value,
                                                  0
                                              ) / filteredCoupons.length
                                          )
                                        : 0}
                                    %
                                </p>
                            </div>
                            <DollarSign className="h-8 w-8 text-orange-500" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Available Coupons */}
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Available Coupons</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {loading ? (
                                <div className="text-center py-8">
                                    Loading...
                                </div>
                            ) : filteredCoupons.length === 0 ? (
                                <div className="text-center py-8">
                                    <p className="text-gray-500">
                                        No active coupons available from admin.
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {filteredCoupons.map((coupon) => (
                                        <div
                                            key={coupon.id}
                                            className="border rounded-lg p-4"
                                        >
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <h3 className="font-bold text-lg">
                                                            {coupon.code}
                                                        </h3>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() =>
                                                                copyToClipboard(
                                                                    coupon.code
                                                                )
                                                            }
                                                        >
                                                            <Copy className="h-4 w-4" />
                                                        </Button>
                                                        <Badge className="bg-green-100 text-green-800">
                                                            Active
                                                        </Badge>
                                                    </div>
                                                    <p className="text-gray-600 mb-3">
                                                        {coupon.description}
                                                    </p>
                                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                                        <div>
                                                            <span className="font-medium">
                                                                Discount:
                                                            </span>{" "}
                                                            {getDiscountDisplay(
                                                                coupon
                                                            )}
                                                        </div>
                                                        <div>
                                                            <span className="font-medium">
                                                                Min Order:
                                                            </span>{" "}
                                                            ₹
                                                            {
                                                                coupon.min_order_amount
                                                            }
                                                        </div>
                                                        <div>
                                                            <span className="font-medium">
                                                                Usage:
                                                            </span>{" "}
                                                            {coupon.current_uses ||
                                                                0}
                                                            /
                                                            {coupon.usage_limit ||
                                                                "∞"}
                                                        </div>
                                                        <div>
                                                            <span className="font-medium">
                                                                Valid Until:
                                                            </span>{" "}
                                                            {new Date(
                                                                coupon.valid_until
                                                            ).toLocaleDateString()}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-right ml-4">
                                                    <div className="text-2xl font-bold text-blue-600">
                                                        {getDiscountDisplay(
                                                            coupon
                                                        )}
                                                    </div>
                                                    <div className="text-xs text-gray-500">
                                                        {coupon.discount_type ===
                                                        "percentage"
                                                            ? "Percentage"
                                                            : "Fixed Amount"}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Trek Assignment */}
                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Trek Assignment</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium">
                                        Filter by Trek
                                    </label>
                                    <Select
                                        value={selectedTrek}
                                        onValueChange={setSelectedTrek}
                                    >
                                        <SelectTrigger className="mt-1">
                                            <SelectValue placeholder="Select trek" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">
                                                All Treks
                                            </SelectItem>
                                            {treks.map((trek) => (
                                                <SelectItem
                                                    key={trek.id}
                                                    value={trek.id.toString()}
                                                >
                                                    {trek.title}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-3">
                                    {treks
                                        .filter(
                                            (trek) =>
                                                selectedTrek === "all" ||
                                                trek.id.toString() ===
                                                    selectedTrek
                                        )
                                        .map((trek) => (
                                            <div
                                                key={trek.id}
                                                className="border rounded-lg p-3"
                                            >
                                                <div className="flex items-center justify-between mb-2">
                                                    <h4 className="font-medium text-sm">
                                                        {trek.title}
                                                    </h4>
                                                    <Badge
                                                        variant="outline"
                                                        className="text-xs"
                                                    >
                                                        {getActiveCouponsForTrek(
                                                            trek.id
                                                        )}{" "}
                                                        active
                                                    </Badge>
                                                </div>
                                                <div className="space-y-2">
                                                    {filteredCoupons.map(
                                                        (coupon) => {
                                                            const assignment =
                                                                trekCoupons.find(
                                                                    (tc) =>
                                                                        tc.coupon_id ===
                                                                            coupon.id &&
                                                                        tc.trek_id ===
                                                                            trek.id
                                                                );
                                                            const isActive =
                                                                assignment?.is_active ||
                                                                false;

                                                            return (
                                                                <div
                                                                    key={
                                                                        coupon.id
                                                                    }
                                                                    className="flex items-center justify-between text-xs"
                                                                >
                                                                    <span className="truncate flex-1">
                                                                        {
                                                                            coupon.code
                                                                        }
                                                                    </span>
                                                                    <Switch
                                                                        checked={
                                                                            isActive
                                                                        }
                                                                        onCheckedChange={() =>
                                                                            toggleCouponForTrek(
                                                                                coupon.id,
                                                                                trek.id,
                                                                                isActive
                                                                            )
                                                                        }
                                                                        className="ml-2"
                                                                    />
                                                                </div>
                                                            );
                                                        }
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default VendorCoupons;
