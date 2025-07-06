import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DatePicker } from "@/components/ui/date-picker";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const DynamicAccommodation = ({ duration, accommodations, onChange }) => {
    const [nights, setNights] = useState(0);
    useEffect(() => {
        // Extract number of nights from duration string (e.g., "3D/2N" -> 2)
        const nightMatch =
            duration && typeof duration === "string"
                ? duration.match(/(\d+)N/)
                : null;
        const extractedNights = nightMatch ? parseInt(nightMatch[1]) : 0;
        setNights(extractedNights);

        // Initialize accommodations if empty or nights changed
        if (
            extractedNights > 0 &&
            (accommodations.length === 0 ||
                accommodations.length !== extractedNights)
        ) {
            const newAccommodations = [];
            for (let i = 1; i <= extractedNights; i++) {
                newAccommodations.push({
                    night: i,
                    type: "",
                    date: "",
                    description: "",
                    location: "",
                });
            }
            onChange(newAccommodations);
        }
    }, [duration, accommodations.length, onChange]);
    const updateAccommodation = (nightIndex, field, value) => {
        const newAccommodations = [...accommodations];
        newAccommodations[nightIndex] = {
            ...newAccommodations[nightIndex],
            [field]: value,
        };
        onChange(newAccommodations);
    };
    if (nights === 0) {
        return /*#__PURE__*/ _jsx("div", {
            className: "text-center py-8 text-gray-500",
            children:
                "Please set the trek duration first to configure accommodations.",
        });
    }
    return /*#__PURE__*/ _jsx("div", {
        className: "space-y-6",
        children: accommodations.map((accommodation, nightIndex) =>
            /*#__PURE__*/ _jsxs(
                Card,
                {
                    className: "border-l-4 border-l-green-500",
                    children: [
                        /*#__PURE__*/ _jsx(CardHeader, {
                            children: /*#__PURE__*/ _jsxs(CardTitle, {
                                className: "text-lg",
                                children: ["Night ", accommodation.night],
                            }),
                        }),
                        /*#__PURE__*/ _jsxs(CardContent, {
                            className: "space-y-4",
                            children: [
                                /*#__PURE__*/ _jsxs("div", {
                                    className:
                                        "grid grid-cols-1 md:grid-cols-2 gap-4",
                                    children: [
                                        /*#__PURE__*/ _jsxs("div", {
                                            children: [
                                                /*#__PURE__*/ _jsx(Label, {
                                                    htmlFor: `type-${accommodation.night}`,
                                                    children:
                                                        "Accommodation Type",
                                                }),
                                                /*#__PURE__*/ _jsxs(Select, {
                                                    value: accommodation.type,
                                                    onValueChange: (value) =>
                                                        updateAccommodation(
                                                            nightIndex,
                                                            "type",
                                                            value
                                                        ),
                                                    children: [
                                                        /*#__PURE__*/ _jsx(
                                                            SelectTrigger,
                                                            {
                                                                id: `type-${accommodation.night}`,
                                                                children:
                                                                    /*#__PURE__*/ _jsx(
                                                                        SelectValue,
                                                                        {
                                                                            placeholder:
                                                                                "Select accommodation type",
                                                                        }
                                                                    ),
                                                            }
                                                        ),
                                                        /*#__PURE__*/ _jsxs(
                                                            SelectContent,
                                                            {
                                                                children: [
                                                                    /*#__PURE__*/ _jsx(
                                                                        SelectItem,
                                                                        {
                                                                            value: "hotel",
                                                                            children:
                                                                                "Hotel",
                                                                        }
                                                                    ),
                                                                    /*#__PURE__*/ _jsx(
                                                                        SelectItem,
                                                                        {
                                                                            value: "guesthouse",
                                                                            children:
                                                                                "Guest House",
                                                                        }
                                                                    ),
                                                                    /*#__PURE__*/ _jsx(
                                                                        SelectItem,
                                                                        {
                                                                            value: "tent",
                                                                            children:
                                                                                "Tent",
                                                                        }
                                                                    ),
                                                                    /*#__PURE__*/ _jsx(
                                                                        SelectItem,
                                                                        {
                                                                            value: "lodge",
                                                                            children:
                                                                                "Lodge",
                                                                        }
                                                                    ),
                                                                    /*#__PURE__*/ _jsx(
                                                                        SelectItem,
                                                                        {
                                                                            value: "homestay",
                                                                            children:
                                                                                "Homestay",
                                                                        }
                                                                    ),
                                                                    /*#__PURE__*/ _jsx(
                                                                        SelectItem,
                                                                        {
                                                                            value: "camp",
                                                                            children:
                                                                                "Camp",
                                                                        }
                                                                    ),
                                                                ],
                                                            }
                                                        ),
                                                    ],
                                                }),
                                            ],
                                        }),
                                        /*#__PURE__*/ _jsxs("div", {
                                            children: [
                                                /*#__PURE__*/ _jsx(Label, {
                                                    htmlFor: `date-${accommodation.night}`,
                                                    children:
                                                        "Accommodation Date",
                                                }),
                                                /*#__PURE__*/ _jsx(DatePicker, {
                                                    date: accommodation.date
                                                        ? new Date(
                                                              accommodation.date
                                                          )
                                                        : null,
                                                    setDate: (date) =>
                                                        updateAccommodation(
                                                            nightIndex,
                                                            "date",
                                                            date
                                                                ? date
                                                                      .toISOString()
                                                                      .split(
                                                                          "T"
                                                                      )[0]
                                                                : ""
                                                        ),
                                                }),
                                            ],
                                        }),
                                    ],
                                }),
                                /*#__PURE__*/ _jsxs("div", {
                                    children: [
                                        /*#__PURE__*/ _jsx(Label, {
                                            htmlFor: `location-${accommodation.night}`,
                                            children: "Location",
                                        }),
                                        /*#__PURE__*/ _jsx(Input, {
                                            id: `location-${accommodation.night}`,
                                            placeholder: "Enter location",
                                            value: accommodation.location,
                                            onChange: (e) =>
                                                updateAccommodation(
                                                    nightIndex,
                                                    "location",
                                                    e.target.value
                                                ),
                                        }),
                                    ],
                                }),
                                /*#__PURE__*/ _jsxs("div", {
                                    children: [
                                        /*#__PURE__*/ _jsx(Label, {
                                            htmlFor: `description-${accommodation.night}`,
                                            children: "Description",
                                        }),
                                        /*#__PURE__*/ _jsx(Textarea, {
                                            id: `description-${accommodation.night}`,
                                            placeholder:
                                                "Describe the accommodation details, amenities, etc.",
                                            value: accommodation.description,
                                            onChange: (e) =>
                                                updateAccommodation(
                                                    nightIndex,
                                                    "description",
                                                    e.target.value
                                                ),
                                            rows: 3,
                                        }),
                                    ],
                                }),
                            ],
                        }),
                    ],
                },
                accommodation.night
            )
        ),
    });
};
export default DynamicAccommodation;
