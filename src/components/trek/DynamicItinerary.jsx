import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

const DynamicItinerary = ({ duration, itinerary, onChange }) => {
    const [days, setDays] = useState(0);

    useEffect(() => {
        // Extract number of days from duration string
        // Handle both new format "X Days / Y Nights" and old format "XD/YN"
        let extractedDays = 0;

        if (duration && typeof duration === "string") {
            // Try new format first: "X Days / Y Nights"
            const newFormatMatch = duration.match(/(\d+)\s*Days?/i);
            if (newFormatMatch) {
                extractedDays = parseInt(newFormatMatch[1]);
            } else {
                // Fallback to old format: "XD/YN"
                const oldFormatMatch = duration.match(/(\d+)D/);
                if (oldFormatMatch) {
                    extractedDays = parseInt(oldFormatMatch[1]);
                }
            }
        }

        setDays(extractedDays);

        // Initialize itinerary if empty or days changed
        if (
            extractedDays > 0 &&
            (itinerary.length === 0 || itinerary.length !== extractedDays)
        ) {
            const newItinerary = [];
            for (let i = 1; i <= extractedDays; i++) {
                newItinerary.push({
                    day: i,
                    activities: [
                        {
                            id: `day${i}-activity1`,
                            activity: "",
                        },
                    ],
                });
            }
            onChange(newItinerary);
        }
    }, [duration, itinerary.length, onChange]);

    const addActivity = (dayIndex) => {
        const newItinerary = [...itinerary];
        const activityId = `day${dayIndex + 1}-activity${
            newItinerary[dayIndex].activities.length + 1
        }`;
        newItinerary[dayIndex].activities.push({
            id: activityId,
            activity: "",
        });
        onChange(newItinerary);
    };

    const removeActivity = (dayIndex, activityIndex) => {
        const newItinerary = [...itinerary];
        if (newItinerary[dayIndex].activities.length > 1) {
            newItinerary[dayIndex].activities.splice(activityIndex, 1);
            onChange(newItinerary);
        }
    };

    const updateActivity = (dayIndex, activityIndex, value) => {
        const newItinerary = [...itinerary];
        newItinerary[dayIndex].activities[activityIndex].activity = value;
        onChange(newItinerary);
    };

    if (days === 0) {
        return /*#__PURE__*/ _jsx("div", {
            className: "text-center py-8 text-gray-500",
            children:
                "Please set the trek duration first to configure the itinerary.",
        });
    }

    return /*#__PURE__*/ _jsx("div", {
        className: "space-y-6",
        children: itinerary.map((day, dayIndex) => {
            // Add defensive programming and debugging
            console.log(`Processing day ${dayIndex + 1}:`, day);
            console.log(`Activities for day ${dayIndex + 1}:`, day.activities);

            // Ensure activities is always an array
            const activities = Array.isArray(day.activities)
                ? day.activities
                : [];

            return /*#__PURE__*/ _jsxs(
                Card,
                {
                    className: "border-l-4 border-l-blue-500",
                    children: [
                        /*#__PURE__*/ _jsx(CardHeader, {
                            children: /*#__PURE__*/ _jsxs(CardTitle, {
                                className: "text-lg",
                                children: ["Day ", day.day || dayIndex + 1],
                            }),
                        }),
                        /*#__PURE__*/ _jsxs(CardContent, {
                            className: "space-y-4",
                            children: [
                                activities.map((activity, activityIndex) =>
                                    /*#__PURE__*/ _jsxs(
                                        "div",
                                        {
                                            className: "flex gap-2 items-end",
                                            children: [
                                                /*#__PURE__*/ _jsxs("div", {
                                                    className: "flex-1",
                                                    children: [
                                                        /*#__PURE__*/ _jsxs(
                                                            Label,
                                                            {
                                                                htmlFor: `activity-${
                                                                    day.day ||
                                                                    dayIndex + 1
                                                                }-${activityIndex}`,
                                                                children: [
                                                                    "Activity ",
                                                                    activityIndex +
                                                                        1,
                                                                ],
                                                            }
                                                        ),
                                                        /*#__PURE__*/ _jsx(
                                                            Textarea,
                                                            {
                                                                id: `activity-${
                                                                    day.day ||
                                                                    dayIndex + 1
                                                                }-${activityIndex}`,
                                                                placeholder:
                                                                    "Describe the activity for this day",
                                                                value:
                                                                    activity.activity ||
                                                                    "",
                                                                onChange: (e) =>
                                                                    updateActivity(
                                                                        dayIndex,
                                                                        activityIndex,
                                                                        e.target
                                                                            .value
                                                                    ),
                                                                rows: 2,
                                                            }
                                                        ),
                                                    ],
                                                }),
                                                /*#__PURE__*/ _jsx(Button, {
                                                    type: "button",
                                                    variant: "outline",
                                                    size: "icon",
                                                    onClick: () =>
                                                        removeActivity(
                                                            dayIndex,
                                                            activityIndex
                                                        ),
                                                    disabled:
                                                        activities.length === 1,
                                                    children:
                                                        /*#__PURE__*/ _jsx(
                                                            Trash2,
                                                            {
                                                                className:
                                                                    "h-4 w-4",
                                                            }
                                                        ),
                                                }),
                                            ],
                                        },
                                        activity.id ||
                                            `activity-${dayIndex}-${activityIndex}`
                                    )
                                ),
                                /*#__PURE__*/ _jsxs(Button, {
                                    type: "button",
                                    variant: "outline",
                                    onClick: () => addActivity(dayIndex),
                                    className: "w-full",
                                    children: [
                                        /*#__PURE__*/ _jsx(Plus, {
                                            className: "h-4 w-4 mr-2",
                                        }),
                                        "Add Activity for Day ",
                                        day.day || dayIndex + 1,
                                    ],
                                }),
                            ],
                        }),
                    ],
                },
                day.day || dayIndex + 1
            );
        }),
    });
};

export default DynamicItinerary;
