import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus, Edit, Trash2, RefreshCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

const AdminBannerManager = () => {
    const [banners, setBanners] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingBanner, setEditingBanner] = useState(null);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        background_image: "",
        banner_type: "whats_new",
        background_color: "#ffffff",
        text_color: "#000000",
        is_active: true,
        display_order: 0,
    });
    const { toast } = useToast();

    useEffect(() => {
        loadBanners();
    }, []);

    const loadBanners = async () => {
        try {
            setLoading(true);
            console.log("Loading banners...");

            const { data, error } = await supabase
                .from("banners")
                .select("*")
                .order("banner_type")
                .order("display_order");

            if (error) {
                console.error("Error loading banners:", error);
                throw error;
            }

            console.log("Banners loaded:", data?.length || 0);
            setBanners(data || []);
        } catch (error) {
            console.error("Failed to load banners:", error);
            toast({
                title: "Error",
                description: `Failed to load banners: ${error.message}`,
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setSubmitting(true);
            console.log("Submitting banner:", formData);

            if (editingBanner) {
                const { error } = await supabase
                    .from("banners")
                    .update(formData)
                    .eq("id", editingBanner.id);

                if (error) {
                    console.error("Error updating banner:", error);
                    throw error;
                }
                toast({ title: "Banner updated successfully" });
            } else {
                const { error } = await supabase
                    .from("banners")
                    .insert([formData]);

                if (error) {
                    console.error("Error creating banner:", error);
                    throw error;
                }
                toast({ title: "Banner created successfully" });
            }
            handleCloseDialog();
            loadBanners();
        } catch (error) {
            console.error("Banner operation failed:", error);
            toast({
                title: "Error",
                description: `Failed to save banner: ${error.message}`,
                variant: "destructive",
            });
        } finally {
            setSubmitting(false);
        }
    };

    const handleEdit = (bannerData) => {
        console.log("Editing banner:", bannerData);
        setEditingBanner(bannerData);
        setFormData({
            title: bannerData.title,
            description: bannerData.description || "",
            background_image: bannerData.background_image || "",
            banner_type: bannerData.banner_type,
            background_color: bannerData.background_color,
            text_color: bannerData.text_color,
            is_active: bannerData.is_active,
            display_order: bannerData.display_order,
        });
        setIsDialogOpen(true);
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this banner?")) return;

        try {
            console.log("Deleting banner:", id);

            const { error } = await supabase
                .from("banners")
                .delete()
                .eq("id", id);

            if (error) {
                console.error("Error deleting banner:", error);
                throw error;
            }

            toast({ title: "Banner deleted successfully" });
            loadBanners();
        } catch (error) {
            console.error("Failed to delete banner:", error);
            toast({
                title: "Error",
                description: `Failed to delete banner: ${error.message}`,
                variant: "destructive",
            });
        }
    };

    const resetForm = () => {
        setFormData({
            title: "",
            description: "",
            background_image: "",
            banner_type: "whats_new",
            background_color: "#ffffff",
            text_color: "#000000",
            is_active: true,
            display_order: 0,
        });
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setEditingBanner(null);
        resetForm();
    };

    const openCreateDialog = () => {
        console.log("Opening create dialog");
        setEditingBanner(null);
        resetForm();
        setIsDialogOpen(true);
    };

    const getBannerTypeLabel = (type) => {
        switch (type) {
            case "whats_new":
                return "What's New";
            case "top_trek":
                return "Top Trek";
            case "trek_short":
                return "Trek Short";
            case "seasonal_forecast":
                return "Seasonal Forecast";
            default:
                return type;
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">
                        Mobile Banner Manager
                    </h1>
                    <p className="text-gray-600">
                        Create and manage banners for mobile app
                    </p>
                </div>
                <div className="flex space-x-2">
                    <Button
                        onClick={loadBanners}
                        disabled={loading}
                        variant="outline"
                    >
                        <RefreshCw
                            className={`w-4 h-4 mr-2 ${
                                loading ? "animate-spin" : ""
                            }`}
                        />
                        Refresh
                    </Button>
                    <Button onClick={openCreateDialog}>
                        <Plus className="w-4 h-4 mr-2" />
                        Create New Banner
                    </Button>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Mobile Banners ({banners.length})</CardTitle>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="text-center py-8">
                            <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2" />
                            Loading banners...
                        </div>
                    ) : banners.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                            No banners found. Create your first banner!
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Title</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Order</TableHead>
                                        <TableHead>Created</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {banners.map((banner) => (
                                        <TableRow key={banner.id}>
                                            <TableCell>
                                                {getBannerTypeLabel(
                                                    banner.banner_type
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {banner.title}
                                            </TableCell>
                                            <TableCell>
                                                {banner.is_active ? (
                                                    <Badge>Active</Badge>
                                                ) : (
                                                    <Badge variant="secondary">
                                                        Inactive
                                                    </Badge>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {banner.display_order}
                                            </TableCell>
                                            <TableCell>
                                                {new Date(
                                                    banner.created_at
                                                ).toLocaleDateString()}
                                            </TableCell>
                                            <TableCell className="space-x-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() =>
                                                        handleEdit(banner)
                                                    }
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() =>
                                                        handleDelete(banner.id)
                                                    }
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </CardContent>
            </Card>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>
                            {editingBanner
                                ? "Edit Banner"
                                : "Create New Banner"}
                        </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="title" className="text-right">
                                Title
                            </Label>
                            <Input
                                id="title"
                                value={formData.title}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        title: e.target.value,
                                    })
                                }
                                className="col-span-3"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">
                                Description
                            </Label>
                            <Textarea
                                id="description"
                                value={formData.description}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        description: e.target.value,
                                    })
                                }
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                                htmlFor="backgroundImage"
                                className="text-right"
                            >
                                Background Image URL
                            </Label>
                            <Input
                                id="backgroundImage"
                                value={formData.background_image}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        background_image: e.target.value,
                                    })
                                }
                                className="col-span-3"
                                type="url"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="bannerType" className="text-right">
                                Banner Type
                            </Label>
                            <Select
                                value={formData.banner_type}
                                onValueChange={(value) =>
                                    setFormData({
                                        ...formData,
                                        banner_type: value,
                                    })
                                }
                            >
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select a banner type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="whats_new">
                                        What's New
                                    </SelectItem>
                                    <SelectItem value="top_trek">
                                        Top Trek
                                    </SelectItem>
                                    <SelectItem value="trek_short">
                                        Trek Short
                                    </SelectItem>
                                    <SelectItem value="seasonal_forecast">
                                        Seasonal Forecast
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                                htmlFor="backgroundColor"
                                className="text-right"
                            >
                                Background Color
                            </Label>
                            <Input
                                id="backgroundColor"
                                value={formData.background_color}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        background_color: e.target.value,
                                    })
                                }
                                className="col-span-3"
                                type="color"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="textColor" className="text-right">
                                Text Color
                            </Label>
                            <Input
                                id="textColor"
                                value={formData.text_color}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        text_color: e.target.value,
                                    })
                                }
                                className="col-span-3"
                                type="color"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="isActive" className="text-right">
                                Active
                            </Label>
                            <Switch
                                id="isActive"
                                checked={formData.is_active}
                                onCheckedChange={(checked) =>
                                    setFormData({
                                        ...formData,
                                        is_active: checked,
                                    })
                                }
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                                htmlFor="displayOrder"
                                className="text-right"
                            >
                                Display Order
                            </Label>
                            <Input
                                id="displayOrder"
                                value={formData.display_order}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        display_order:
                                            parseInt(e.target.value) || 0,
                                    })
                                }
                                className="col-span-3"
                                type="number"
                            />
                        </div>
                        <DialogFooter>
                            <Button type="submit" disabled={submitting}>
                                {submitting
                                    ? "Saving..."
                                    : editingBanner
                                    ? "Save Changes"
                                    : "Create Banner"}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleCloseDialog}
                            >
                                Cancel
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AdminBannerManager;
