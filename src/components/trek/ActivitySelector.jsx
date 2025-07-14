import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, X, Check } from "lucide-react";
import { apiVendor } from "@/lib/api";

const ActivitySelector = ({ selectedActivities = [], onChange }) => {
    const [allActivities, setAllActivities] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [loading, setLoading] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

    // Fetch all activities and categories
    useEffect(() => {
        fetchActivities();
        fetchCategories();
    }, []);

    const fetchActivities = async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams();
            if (searchTerm) params.append("search", searchTerm);
            if (selectedCategory !== "all")
                params.append("category", selectedCategory);

            const response = await apiVendor.get(`/activities?${params}`);
            if (response.success) {
                setAllActivities(response.data);
            }
        } catch (error) {
            console.error("Error fetching activities:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await apiVendor.get("/activities/categories");
            if (response.success) {
                setCategories(response.data);
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    // Filter activities based on search and category
    useEffect(() => {
        fetchActivities();
    }, [searchTerm, selectedCategory]);

    const handleAddActivity = (activity) => {
        const isAlreadySelected = selectedActivities.some(
            (selected) => selected.id === activity.id
        );

        if (!isAlreadySelected) {
            const updatedActivities = [
                ...selectedActivities,
                {
                    id: activity.id,
                    name: activity.name,
                    category_name: activity.category_name,
                },
            ];
            onChange(updatedActivities);
        }
        setShowDropdown(false);
        setSearchTerm("");
    };

    const handleRemoveActivity = (activityId) => {
        const updatedActivities = selectedActivities.filter(
            (activity) => activity.id !== activityId
        );
        onChange(updatedActivities);
    };

    const filteredActivities = allActivities.filter((activity) => {
        const matchesSearch = activity.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        const matchesCategory =
            selectedCategory === "all" ||
            activity.category_name === selectedCategory;
        const isNotSelected = !selectedActivities.some(
            (selected) => selected.id === activity.id
        );

        return matchesSearch && matchesCategory && isNotSelected;
    });

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Trek Activities</h3>
                <div className="text-sm text-gray-500">
                    {selectedActivities.length} selected
                </div>
            </div>

            {/* Search and Filter */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-sm">Select Activities</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="relative">
                        <div className="flex gap-2">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    placeholder="Search activities..."
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    onFocus={() => setShowDropdown(true)}
                                    className="pl-10"
                                />
                            </div>
                            <select
                                value={selectedCategory}
                                onChange={(e) =>
                                    setSelectedCategory(e.target.value)
                                }
                                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="all">All Categories</option>
                                {categories.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Dropdown */}
                        {showDropdown &&
                            (searchTerm || selectedCategory !== "all") && (
                                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                                    {loading ? (
                                        <div className="p-4 text-center text-gray-500">
                                            Loading activities...
                                        </div>
                                    ) : filteredActivities.length > 0 ? (
                                        filteredActivities.map((activity) => (
                                            <div
                                                key={activity.id}
                                                className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                                                onClick={() =>
                                                    handleAddActivity(activity)
                                                }
                                            >
                                                <div className="font-medium">
                                                    {activity.name}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {activity.category_name}
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="p-4 text-center text-gray-500">
                                            No activities found
                                        </div>
                                    )}
                                </div>
                            )}
                    </div>
                </CardContent>
            </Card>

            {/* Selected Activities */}
            {selectedActivities.length > 0 && (
                <div className="space-y-3">
                    <h4 className="text-md font-medium">Selected Activities</h4>
                    <div className="grid gap-3">
                        {selectedActivities.map((activity) => (
                            <Card
                                key={activity.id}
                                className="border-l-4 border-l-green-500"
                            >
                                <CardContent className="p-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1">
                                            <h5 className="font-medium">
                                                {activity.name}
                                            </h5>
                                            <div className="flex items-center gap-2 mt-1">
                                                <Badge
                                                    variant="secondary"
                                                    className="text-xs"
                                                >
                                                    {activity.category_name}
                                                </Badge>
                                            </div>
                                        </div>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                handleRemoveActivity(
                                                    activity.id
                                                )
                                            }
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            )}

            {selectedActivities.length === 0 && (
                <Card className="border-dashed">
                    <CardContent className="p-8 text-center">
                        <p className="text-gray-500">
                            No activities selected. Search and select activities
                            above.
                        </p>
                    </CardContent>
                </Card>
            )}

            {/* Click outside to close dropdown */}
            {showDropdown && (
                <div
                    className="fixed inset-0 z-0"
                    onClick={() => setShowDropdown(false)}
                />
            )}
        </div>
    );
};

export default ActivitySelector;
