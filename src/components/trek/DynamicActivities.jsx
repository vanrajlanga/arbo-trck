import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit, Trash2, X, Check } from "lucide-react";

const DynamicActivities = ({ activities = [], onChange }) => {
    console.log("DynamicActivities - received activities:", activities);
    console.log("DynamicActivities - onChange function:", onChange);
    const [editingIndex, setEditingIndex] = useState(null);
    const [newActivity, setNewActivity] = useState({
        name: "",
    });

    const handleAddActivity = () => {
        if (newActivity.name.trim()) {
            const updatedActivities = [...activities, { ...newActivity }];
            console.log("DynamicActivities - adding activity:", newActivity);
            console.log(
                "DynamicActivities - updated activities:",
                updatedActivities
            );
            onChange(updatedActivities);
            setNewActivity({ name: "" });
        }
    };

    const handleEditActivity = (index) => {
        setEditingIndex(index);
        setNewActivity({ ...activities[index] });
    };

    const handleSaveEdit = () => {
        if (newActivity.name.trim() && editingIndex !== null) {
            const updatedActivities = [...activities];
            updatedActivities[editingIndex] = { ...newActivity };
            onChange(updatedActivities);
            setEditingIndex(null);
            setNewActivity({ name: "" });
        }
    };

    const handleCancelEdit = () => {
        setEditingIndex(null);
        setNewActivity({ name: "" });
    };

    const handleRemoveActivity = (index) => {
        const updatedActivities = activities.filter((_, i) => i !== index);
        onChange(updatedActivities);
    };

    const handleInputChange = (value) => {
        setNewActivity({ name: value });
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Trek Activities</h3>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAddActivity}
                    disabled={!newActivity.name.trim()}
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Activity
                </Button>
            </div>

            {/* Add/Edit Form */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-sm">
                        {editingIndex !== null
                            ? "Edit Activity"
                            : "Add New Activity"}
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Activity Name *
                        </label>
                        <Input
                            placeholder="e.g., Mountain Climbing, River Rafting"
                            value={newActivity.name}
                            onChange={(e) => handleInputChange(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2">
                        {editingIndex !== null ? (
                            <>
                                <Button
                                    type="button"
                                    onClick={handleSaveEdit}
                                    disabled={!newActivity.name.trim()}
                                >
                                    <Check className="h-4 w-4 mr-2" />
                                    Save Changes
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={handleCancelEdit}
                                >
                                    <X className="h-4 w-4 mr-2" />
                                    Cancel
                                </Button>
                            </>
                        ) : (
                            <Button
                                type="button"
                                onClick={handleAddActivity}
                                disabled={!newActivity.name.trim()}
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                Add Activity
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Activities List */}
            {activities.length > 0 && (
                <div className="space-y-3">
                    <h4 className="text-md font-medium">
                        Added Activities ({activities.length})
                    </h4>
                    {activities.map((activity, index) => (
                        <Card
                            key={index}
                            className="border-l-4 border-l-blue-500"
                        >
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <h5 className="font-medium">
                                            {activity.name}
                                        </h5>
                                    </div>
                                    <div className="flex gap-2 ml-4">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                handleEditActivity(index)
                                            }
                                        >
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                handleRemoveActivity(index)
                                            }
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            {activities.length === 0 && (
                <Card className="border-dashed">
                    <CardContent className="p-8 text-center">
                        <p className="text-gray-500">
                            No activities added yet. Add your first activity
                            above.
                        </p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default DynamicActivities;
