import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {
    Plus,
    X,
    ArrowLeft,
    Save,
    Info,
    Clock,
    DollarSign,
    FileText,
    Loader2,
    Eye,
    FolderOpen,
    Trash2,
    ArrowUp,
    Mountain,
    Calendar,
    MapPin,
    Route,
    Bed,
    Users,
    Activity,
    Camera,
    Shield,
    CheckCircle,
} from "lucide-react";
import { apiVendor } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";
import ActivitySelector from "@/components/trek/ActivitySelector";
import { api } from "@/lib/api";

const initialFormData = {
    title: "",
    description: "",
    destination_id: "",
    city_id: "",
    duration: "",
    duration_days: "",
    duration_nights: "",
    base_price: "",
    maxParticipants: "",
    difficulty: "",
    trek_type: "",
    category: "",
    meeting_point: "",
    meeting_time: "",
    inclusions: [],
    exclusions: [],
    cancellation_policies: [],
    other_policies: [],
    activities: [],
    cancellation_policy_id: "",
    // New fields for additional sections
    trekStages: [],
    itineraryDays: [],
    accommodations: [],
    selectedActivities: [],
    customActivities: [],
    media: [],
};

const TrekForm = ({ mode = "create", trekId = null }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState(initialFormData);
    const [loading, setLoading] = useState(false);
    const [destinations, setDestinations] = useState([]);
    const [cities, setCities] = useState([]);
    const [cancellationPolicies, setCancellationPolicies] = useState([]);
    const [validationErrors, setValidationErrors] = useState({});
    const [backendErrors, setBackendErrors] = useState({});
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [activeAccordion, setActiveAccordion] = useState("basic-info");
    const { toast } = useToast();

    // Fetch destinations and cities from API on mount
    useEffect(() => {
        async function fetchData() {
            try {
                const [destRes, cityRes, policiesRes] = await Promise.all([
                    apiVendor.getDestinations({ status: "active" }),
                    apiVendor.getCities({ status: "active" }),
                    api.get("/admin/cancellation-policies/active"),
                ]);
                setDestinations(destRes.data?.destinations || []);
                setCities(cityRes.data?.cities || []);
                setCancellationPolicies(policiesRes.data?.data || []);
            } catch (err) {
                toast.error(
                    "Failed to load destinations, cities, or cancellation policies"
                );
            }
        }
        fetchData();
    }, []);

    // Load trek data for edit mode
    useEffect(() => {
        if (mode === "edit" && trekId) {
            loadTrek();
        }
    }, [mode, trekId]);

    const loadTrek = async () => {
        try {
            setLoading(true);
            const response = await apiVendor.getTrek(trekId);
            if (response.success) {
                const trekData = response.data;

                // Process activities to include activity details
                if (trekData.activities && trekData.activityDetails) {
                    trekData.activities = trekData.activityDetails.map(
                        (activity) => ({
                            id: activity.id,
                            name: activity.name,
                            category_name: activity.category_name,
                        })
                    );
                }

                setFormData(trekData);
                setIsDataLoaded(true);
            } else {
                toast.error("Failed to load trek data");
            }
        } catch (error) {
            console.error("Error loading trek:", error);
            toast.error("Failed to load trek data");
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
        setValidationErrors((prev) => ({
            ...prev,
            [field]: [],
        }));
        setBackendErrors((prev) => ({
            ...prev,
            [field]: [],
        }));
    };

    const handleSelectChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
        setValidationErrors((prev) => ({
            ...prev,
            [field]: [],
        }));
        setBackendErrors((prev) => ({
            ...prev,
            [field]: [],
        }));
    };

    const handleArrayChange = (arrayName, index, value) => {
        setFormData((prev) => ({
            ...prev,
            [arrayName]: prev[arrayName].map((item, i) =>
                i === index ? value : item
            ),
        }));
        setValidationErrors((prev) => ({
            ...prev,
            [arrayName]: prev[arrayName].map((item, i) =>
                i === index ? [] : []
            ),
        }));
        setBackendErrors((prev) => ({
            ...prev,
            [arrayName]: prev[arrayName].map((item, i) =>
                i === index ? [] : []
            ),
        }));
    };

    const handlePolicyChange = (arrayName, index, field, value) => {
        setFormData((prev) => ({
            ...prev,
            [arrayName]: prev[arrayName].map((policy, i) =>
                i === index ? { ...policy, [field]: value } : policy
            ),
        }));
        setValidationErrors((prev) => ({
            ...prev,
            [arrayName]: prev[arrayName].map((policy, i) =>
                i === index ? [] : []
            ),
        }));
        setBackendErrors((prev) => ({
            ...prev,
            [arrayName]: prev[arrayName].map((policy, i) =>
                i === index ? [] : []
            ),
        }));
    };

    const handlePolicyArrayChange = (
        arrayName,
        index,
        field,
        subIndex,
        value
    ) => {
        setFormData((prev) => ({
            ...prev,
            [arrayName]: prev[arrayName].map((policy, i) =>
                i === index
                    ? {
                          ...policy,
                          [field]: policy[field].map((item, j) =>
                              j === subIndex ? value : item
                          ),
                      }
                    : policy
            ),
        }));
        setValidationErrors((prev) => ({
            ...prev,
            [arrayName]: prev[arrayName].map((policy, i) =>
                i === index ? [] : []
            ),
        }));
        setBackendErrors((prev) => ({
            ...prev,
            [arrayName]: prev[arrayName].map((policy, i) =>
                i === index ? [] : []
            ),
        }));
    };

    const handleAddArrayItem = (arrayName, initialValue) => {
        setFormData((prev) => ({
            ...prev,
            [arrayName]: [...prev[arrayName], initialValue],
        }));
        setValidationErrors((prev) => ({
            ...prev,
            [arrayName]: [...(prev[arrayName] || []), []],
        }));
        setBackendErrors((prev) => ({
            ...prev,
            [arrayName]: [...(prev[arrayName] || []), []],
        }));
    };

    const handleRemoveArrayItem = (arrayName, index) => {
        setFormData((prev) => ({
            ...prev,
            [arrayName]: prev[arrayName].filter((_, i) => i !== index),
        }));
        setValidationErrors((prev) => ({
            ...prev,
            [arrayName]: (prev[arrayName] || []).filter((_, i) => i !== index),
        }));
        setBackendErrors((prev) => ({
            ...prev,
            [arrayName]: (prev[arrayName] || []).filter((_, i) => i !== index),
        }));
    };

    const handleAddPolicy = (arrayName) => {
        const newPolicy = {
            title: "",
            description: "",
            rules: [""],
            descriptionPoints: [""],
        };
        setFormData((prev) => ({
            ...prev,
            [arrayName]: [...prev[arrayName], newPolicy],
        }));
        setValidationErrors((prev) => ({
            ...prev,
            [arrayName]: [...(prev[arrayName] || []), []],
        }));
        setBackendErrors((prev) => ({
            ...prev,
            [arrayName]: [...(prev[arrayName] || []), []],
        }));
    };

    const handleRemovePolicyArrayItem = (arrayName, index, field, subIndex) => {
        setFormData((prev) => ({
            ...prev,
            [arrayName]: prev[arrayName].map((policy, i) =>
                i === index
                    ? {
                          ...policy,
                          [field]: policy[field].filter(
                              (_, j) => j !== subIndex
                          ),
                      }
                    : policy
            ),
        }));
    };

    const handleAddPolicyArrayItem = (
        arrayName,
        index,
        field,
        initialValue
    ) => {
        setFormData((prev) => ({
            ...prev,
            [arrayName]: prev[arrayName].map((policy, i) =>
                i === index
                    ? {
                          ...policy,
                          [field]: [...policy[field], initialValue],
                      }
                    : policy
            ),
        }));
    };

    const validateForm = () => {
        const errors = {};

        // Basic Info validation
        if (!formData.title?.trim()) {
            errors.title = ["Trek name is required"];
        }
        if (!formData.destination_id) {
            errors.destination_id = ["Destination is required"];
        }

        // Dates & Pricing validation
        if (!formData.duration_days || formData.duration_days <= 0) {
            errors.duration_days = ["Number of days must be greater than 0"];
        }
        if (!formData.base_price || formData.base_price <= 0) {
            errors.base_price = ["Price must be greater than 0"];
        }
        if (!formData.difficulty) {
            errors.difficulty = ["Difficulty level is required"];
        }
        if (!formData.maxParticipants || formData.maxParticipants <= 0) {
            errors.maxParticipants = [
                "Maximum participants must be greater than 0",
            ];
        }
        if (!formData.cancellation_policy_id) {
            errors.cancellation_policy_id = ["Cancellation policy is required"];
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const getFieldErrors = (fieldName) => {
        const localErrors = validationErrors[fieldName] || [];
        const serverErrors = backendErrors[fieldName] || [];
        return [...localErrors, ...serverErrors];
    };

    const hasFieldErrors = (fieldName) => {
        return getFieldErrors(fieldName).length > 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            toast.error("Please fix the validation errors before submitting");
            return;
        }

        try {
            setLoading(true);
            setBackendErrors({});

            const submitData = {
                ...formData,
                duration: `${formData.duration_days} days, ${formData.duration_nights} nights`,
            };

            let response;
            if (mode === "create") {
                response = await apiVendor.createTrek(submitData);
            } else {
                response = await apiVendor.updateTrek(trekId, submitData);
            }

            if (response.success) {
                toast.success(
                    mode === "create"
                        ? "Trek created successfully!"
                        : "Trek updated successfully!"
                );
                navigate("/vendor/treks");
            } else {
                if (response.errors) {
                    setBackendErrors(response.errors);
                    toast.error("Please fix the errors and try again");
                } else {
                    toast.error(
                        response.message ||
                            (mode === "create"
                                ? "Failed to create trek"
                                : "Failed to update trek")
                    );
                }
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            toast.error(
                mode === "create"
                    ? "Failed to create trek"
                    : "Failed to update trek"
            );
        } finally {
            setLoading(false);
        }
    };

    const handleSaveDraft = () => {
        const draftData = {
            ...formData,
            savedAt: new Date().toISOString(),
        };
        localStorage.setItem("trekDraft", JSON.stringify(draftData));
        toast.success("Draft saved successfully!");
    };

    const handleLoadDraft = () => {
        const draftData = localStorage.getItem("trekDraft");
        if (draftData) {
            try {
                const parsed = JSON.parse(draftData);
                setFormData(parsed);
                toast.success("Draft loaded successfully!");
            } catch (error) {
                toast.error("Failed to load draft");
            }
        } else {
            toast.error("No draft found");
        }
    };

    const calculateFormProgress = () => {
        const requiredFields = [
            "title",
            "destination_id",
            "duration_days",
            "base_price",
            "difficulty",
            "maxParticipants",
            "cancellation_policy_id",
        ];

        const arrayFields = [
            { field: "inclusions", minItems: 1 },
            { field: "exclusions", minItems: 1 },
            { field: "cancellation_policies", minItems: 1 },
            { field: "other_policies", minItems: 1 },
            { field: "activities", minItems: 1 },
        ];

        const totalFields = requiredFields.length + arrayFields.length;
        let completedFields = 0;

        requiredFields.forEach((field) => {
            const value = formData[field];
            if (value && (typeof value === "string" ? value.trim() : true)) {
                completedFields++;
            }
        });

        arrayFields.forEach(({ field, minItems }) => {
            const value = formData[field];
            if (value && Array.isArray(value) && value.length >= minItems) {
                completedFields++;
            }
        });

        return Math.round((completedFields / totalFields) * 100);
    };

    const formProgress = calculateFormProgress();

    // Show loading spinner while fetching trek data
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading trek details...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 relative">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">
                        {mode === "create" ? "Create Trek" : "Edit Trek"}
                    </h1>
                    <p className="text-gray-600">
                        {mode === "create"
                            ? "Fill in the details to create a new trek"
                            : "Update the trek information"}
                    </p>
                </div>
                <Button
                    variant="outline"
                    onClick={() => navigate("/vendor/treks")}
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Treks
                </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <Accordion
                    type="single"
                    collapsible
                    value={activeAccordion}
                    onValueChange={setActiveAccordion}
                    className="space-y-4"
                >
                    {/* 1. Basic Info */}
                    <Card>
                        <AccordionItem value="basic-info" className="border-0">
                            <AccordionTrigger className="text-lg font-semibold px-6 py-4">
                                <div className="flex items-center space-x-3 text-left">
                                    <MapPin className="w-5 h-5 text-blue-600" />
                                    <div>
                                        <div className="font-semibold">
                                            Basic Info
                                        </div>
                                        <div className="text-sm font-normal text-gray-500">
                                            Essential trek information and cover
                                            image
                                        </div>
                                    </div>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="px-6 pb-6">
                                <div className="space-y-4">
                                    <div>
                                        <Label htmlFor="name">
                                            Trek Name *
                                        </Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            value={formData.title}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "title",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Enter trek name"
                                            data-field="name"
                                            className={
                                                hasFieldErrors("title")
                                                    ? "border-red-500"
                                                    : ""
                                            }
                                        />
                                        {hasFieldErrors("title") && (
                                            <p className="text-red-500 text-xs mt-1">
                                                {getFieldErrors("title")[0]}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <Label htmlFor="destination">
                                            Destination *
                                        </Label>
                                        <Select
                                            value={
                                                formData.destination_id?.toString() ||
                                                ""
                                            }
                                            onValueChange={(value) =>
                                                handleSelectChange(
                                                    "destination_id",
                                                    parseInt(value)
                                                )
                                            }
                                            data-field="destination_id"
                                            className={
                                                hasFieldErrors("destination_id")
                                                    ? "border-red-500"
                                                    : ""
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select destination" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {(destinations || []).map(
                                                    (dest) => (
                                                        <SelectItem
                                                            key={dest.id}
                                                            value={String(
                                                                dest.id
                                                            )}
                                                        >
                                                            {dest.name}
                                                        </SelectItem>
                                                    )
                                                )}
                                            </SelectContent>
                                        </Select>
                                        {hasFieldErrors("destination_id") && (
                                            <p className="text-red-500 text-xs mt-1">
                                                {
                                                    getFieldErrors(
                                                        "destination_id"
                                                    )[0]
                                                }
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <Label htmlFor="description">
                                            Description
                                        </Label>
                                        <Textarea
                                            id="description"
                                            name="description"
                                            value={formData.description}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "description",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Enter trek description"
                                            rows={4}
                                            data-field="description"
                                            className={
                                                hasFieldErrors("description")
                                                    ? "border-red-500"
                                                    : ""
                                            }
                                        />
                                        {hasFieldErrors("description") && (
                                            <p className="text-red-500 text-xs mt-1">
                                                {
                                                    getFieldErrors(
                                                        "description"
                                                    )[0]
                                                }
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Card>

                    {/* 2. Dates & Pricing */}
                    <Card>
                        <AccordionItem
                            value="dates-pricing"
                            className="border-0"
                        >
                            <AccordionTrigger className="text-lg font-semibold px-6 py-4">
                                <div className="flex items-center space-x-3 text-left">
                                    <DollarSign className="w-5 h-5 text-orange-600" />
                                    <div>
                                        <div className="font-semibold">
                                            Dates & Pricing
                                        </div>
                                        <div className="text-sm font-normal text-gray-500">
                                            Schedule and cost information
                                        </div>
                                    </div>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="px-6 pb-6">
                                <div className="space-y-6">
                                    {/* Duration Section */}
                                    <div>
                                        <h4 className="text-md font-medium mb-4">
                                            Duration
                                        </h4>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div>
                                                <Label htmlFor="durationDays">
                                                    Number of Days *
                                                </Label>
                                                <Input
                                                    id="durationDays"
                                                    name="durationDays"
                                                    type="number"
                                                    value={
                                                        formData.duration_days
                                                    }
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            "duration_days",
                                                            parseInt(
                                                                e.target.value
                                                            )
                                                        )
                                                    }
                                                    placeholder="Enter days"
                                                    min="1"
                                                    data-field="duration_days"
                                                    className={
                                                        hasFieldErrors(
                                                            "duration_days"
                                                        )
                                                            ? "border-red-500"
                                                            : ""
                                                    }
                                                />
                                                {hasFieldErrors(
                                                    "duration_days"
                                                ) && (
                                                    <p className="text-red-500 text-xs mt-1">
                                                        {
                                                            getFieldErrors(
                                                                "duration_days"
                                                            )[0]
                                                        }
                                                    </p>
                                                )}
                                            </div>
                                            <div>
                                                <Label htmlFor="durationNights">
                                                    Number of Nights
                                                </Label>
                                                <Input
                                                    id="durationNights"
                                                    name="durationNights"
                                                    type="number"
                                                    value={
                                                        formData.duration_nights
                                                    }
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            "duration_nights",
                                                            parseInt(
                                                                e.target.value
                                                            )
                                                        )
                                                    }
                                                    placeholder="Enter nights"
                                                    min="0"
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="duration">
                                                    Duration (Auto-generated)
                                                </Label>
                                                <Input
                                                    id="duration"
                                                    name="duration"
                                                    value={formData.duration}
                                                    readOnly
                                                    className="bg-gray-50"
                                                />
                                                <p className="text-xs text-gray-500 mt-1">
                                                    This field is automatically
                                                    generated based on days and
                                                    nights
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Pricing Section */}
                                    <div>
                                        <h4 className="text-md font-medium mb-4">
                                            Pricing
                                        </h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <Label htmlFor="price">
                                                    Price per Person *
                                                </Label>
                                                <Input
                                                    id="price"
                                                    name="price"
                                                    type="number"
                                                    value={formData.base_price}
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            "base_price",
                                                            parseFloat(
                                                                e.target.value
                                                            ) || 0
                                                        )
                                                    }
                                                    placeholder="Enter price"
                                                    min="0"
                                                    step="0.01"
                                                    data-field="price"
                                                    className={
                                                        hasFieldErrors(
                                                            "base_price"
                                                        )
                                                            ? "border-red-500"
                                                            : ""
                                                    }
                                                />
                                                {hasFieldErrors(
                                                    "base_price"
                                                ) && (
                                                    <p className="text-red-500 text-xs mt-1">
                                                        {
                                                            getFieldErrors(
                                                                "base_price"
                                                            )[0]
                                                        }
                                                    </p>
                                                )}
                                            </div>
                                            <div>
                                                <Label>
                                                    Difficulty Level *
                                                </Label>
                                                <Select
                                                    value={formData.difficulty}
                                                    onValueChange={(value) =>
                                                        handleSelectChange(
                                                            "difficulty",
                                                            value
                                                        )
                                                    }
                                                    data-field="difficulty"
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select difficulty" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="easy">
                                                            Easy
                                                        </SelectItem>
                                                        <SelectItem value="moderate">
                                                            Moderate
                                                        </SelectItem>
                                                        <SelectItem value="difficult">
                                                            Difficult
                                                        </SelectItem>
                                                        <SelectItem value="expert">
                                                            Expert
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                {hasFieldErrors(
                                                    "difficulty"
                                                ) && (
                                                    <p className="text-red-500 text-xs mt-1">
                                                        {
                                                            getFieldErrors(
                                                                "difficulty"
                                                            )[0]
                                                        }
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Group Size */}
                                    <div>
                                        <h4 className="text-md font-medium mb-4">
                                            Group Information
                                        </h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <Label htmlFor="maxParticipants">
                                                    Maximum Participants *
                                                </Label>
                                                <Input
                                                    id="maxParticipants"
                                                    name="maxParticipants"
                                                    type="number"
                                                    value={
                                                        formData.maxParticipants
                                                    }
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            "maxParticipants",
                                                            parseInt(
                                                                e.target.value
                                                            ) || 0
                                                        )
                                                    }
                                                    placeholder="Enter max participants"
                                                    min="1"
                                                    data-field="maxParticipants"
                                                    className={
                                                        hasFieldErrors(
                                                            "maxParticipants"
                                                        )
                                                            ? "border-red-500"
                                                            : ""
                                                    }
                                                />
                                                {hasFieldErrors(
                                                    "maxParticipants"
                                                ) && (
                                                    <p className="text-red-500 text-xs mt-1">
                                                        {
                                                            getFieldErrors(
                                                                "maxParticipants"
                                                            )[0]
                                                        }
                                                    </p>
                                                )}
                                            </div>
                                            <div>
                                                <Label htmlFor="trekType">
                                                    Trek Type
                                                </Label>
                                                <Select
                                                    value={formData.trek_type}
                                                    onValueChange={(value) =>
                                                        handleSelectChange(
                                                            "trek_type",
                                                            value
                                                        )
                                                    }
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select trek type" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="trek">
                                                            Trek
                                                        </SelectItem>
                                                        <SelectItem value="hike">
                                                            Hike
                                                        </SelectItem>
                                                        <SelectItem value="expedition">
                                                            Expedition
                                                        </SelectItem>
                                                        <SelectItem value="camping">
                                                            Camping
                                                        </SelectItem>
                                                        <SelectItem value="backpacking">
                                                            Backpacking
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Card>

                    {/* 3. Trek Classification */}
                    <Card>
                        <AccordionItem
                            value="classification"
                            className="border-0"
                        >
                            <AccordionTrigger className="text-lg font-semibold px-6 py-4">
                                <div className="flex items-center space-x-3 text-left">
                                    <Mountain className="w-5 h-5 text-green-600" />
                                    <div>
                                        <div className="font-semibold">
                                            Trek Classification
                                        </div>
                                        <div className="text-sm font-normal text-gray-500">
                                            Type, difficulty, duration and group
                                            details
                                        </div>
                                    </div>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="px-6 pb-6">
                                <div className="space-y-4">
                                    <p className="text-sm text-gray-600">
                                        This section is already covered in the
                                        Dates & Pricing section above.
                                    </p>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Card>

                    {/* 4. Trek Stages & Route */}
                    <Card>
                        <AccordionItem value="stages" className="border-0">
                            <AccordionTrigger className="text-lg font-semibold px-6 py-4">
                                <div className="flex items-center space-x-3 text-left">
                                    <Route className="w-5 h-5 text-purple-600" />
                                    <div>
                                        <div className="font-semibold">
                                            Trek Stages & Route
                                        </div>
                                        <div className="text-sm font-normal text-gray-500">
                                            Transportation stages and route
                                            planning
                                        </div>
                                    </div>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="px-6 pb-6">
                                <div className="space-y-4">
                                    <p className="text-sm text-gray-600">
                                        This section will be implemented for
                                        transportation stages and route
                                        planning.
                                    </p>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Card>

                    {/* 5. Day-wise Itinerary */}
                    <Card>
                        <AccordionItem value="itinerary" className="border-0">
                            <AccordionTrigger className="text-lg font-semibold px-6 py-4">
                                <div className="flex items-center space-x-3 text-left">
                                    <Clock className="w-5 h-5 text-indigo-600" />
                                    <div>
                                        <div className="font-semibold">
                                            Day-wise Itinerary
                                        </div>
                                        <div className="text-sm font-normal text-gray-500">
                                            Detailed daily activities (max 5
                                            points per day)
                                        </div>
                                    </div>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="px-6 pb-6">
                                <div className="space-y-4">
                                    <p className="text-sm text-gray-600">
                                        This section will be implemented for
                                        detailed daily activities.
                                    </p>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Card>

                    {/* 6. Stays & Accommodations */}
                    <Card>
                        <AccordionItem value="logistics" className="border-0">
                            <AccordionTrigger className="text-lg font-semibold px-6 py-4">
                                <div className="flex items-center space-x-3 text-left">
                                    <Bed className="w-5 h-5 text-teal-600" />
                                    <div>
                                        <div className="font-semibold">
                                            Stays & Accommodations
                                        </div>
                                        <div className="text-sm font-normal text-gray-500">
                                            Night-wise accommodation details
                                        </div>
                                    </div>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="px-6 pb-6">
                                <div className="space-y-4">
                                    <p className="text-sm text-gray-600">
                                        This section will be implemented for
                                        accommodation details.
                                    </p>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Card>

                    {/* 7. Inclusions & Exclusions */}
                    <Card>
                        <AccordionItem value="inclusions" className="border-0">
                            <AccordionTrigger className="text-lg font-semibold px-6 py-4">
                                <div className="flex items-center space-x-3 text-left">
                                    <Users className="w-5 h-5 text-cyan-600" />
                                    <div>
                                        <div className="font-semibold">
                                            Inclusions & Exclusions
                                        </div>
                                        <div className="text-sm font-normal text-gray-500">
                                            What's included and excluded in the
                                            package
                                        </div>
                                    </div>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="px-6 pb-6">
                                <div className="space-y-4">
                                    <p className="text-sm text-gray-600">
                                        This section will be implemented for
                                        inclusions and exclusions.
                                    </p>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Card>

                    {/* 8. Activities Offered */}
                    <Card>
                        <AccordionItem value="activities" className="border-0">
                            <AccordionTrigger className="text-lg font-semibold px-6 py-4">
                                <div className="flex items-center space-x-3 text-left">
                                    <Activity className="w-5 h-5 text-emerald-600" />
                                    <div>
                                        <div className="font-semibold">
                                            Activities Offered
                                        </div>
                                        <div className="text-sm font-normal text-gray-500">
                                            Adventure activities and experiences
                                            available
                                        </div>
                                    </div>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="px-6 pb-6">
                                <ActivitySelector
                                    selectedActivities={
                                        formData.activities || []
                                    }
                                    onChange={(activities) =>
                                        handleInputChange(
                                            "activities",
                                            activities
                                        )
                                    }
                                />
                            </AccordionContent>
                        </AccordionItem>
                    </Card>

                    {/* 9. Media & Visuals */}
                    <Card>
                        <AccordionItem value="media" className="border-0">
                            <AccordionTrigger className="text-lg font-semibold px-6 py-4">
                                <div className="flex items-center space-x-3 text-left">
                                    <Camera className="w-5 h-5 text-pink-600" />
                                    <div>
                                        <div className="font-semibold">
                                            Media & Visuals
                                        </div>
                                        <div className="text-sm font-normal text-gray-500">
                                            Photos and videos (Premium feature
                                            for videos)
                                        </div>
                                    </div>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="px-6 pb-6">
                                <div className="space-y-4">
                                    <p className="text-sm text-gray-600">
                                        This section will be implemented for
                                        media uploads.
                                    </p>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Card>

                    {/* 10. Trek Policies */}
                    <Card>
                        <AccordionItem value="policies" className="border-0">
                            <AccordionTrigger className="text-lg font-semibold px-6 py-4">
                                <div className="flex items-center space-x-3 text-left">
                                    <Shield className="w-5 h-5 text-red-600" />
                                    <div>
                                        <div className="font-semibold">
                                            Trek Policies
                                        </div>
                                        <div className="text-sm font-normal text-gray-500">
                                            Rules, safety protocols and
                                            cancellation policy
                                        </div>
                                    </div>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="px-6 pb-6">
                                <div className="space-y-6">
                                    {/* Cancellation Policy Selection */}
                                    <div>
                                        <Label htmlFor="cancellation_policy">
                                            Cancellation Policy *
                                        </Label>
                                        <Select
                                            value={
                                                formData.cancellation_policy_id?.toString() ||
                                                ""
                                            }
                                            onValueChange={(value) =>
                                                handleSelectChange(
                                                    "cancellation_policy_id",
                                                    parseInt(value)
                                                )
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select cancellation policy" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {cancellationPolicies.map(
                                                    (policy) => (
                                                        <SelectItem
                                                            key={policy.id}
                                                            value={policy.id.toString()}
                                                        >
                                                            <div className="flex flex-col">
                                                                <span className="font-medium">
                                                                    {
                                                                        policy.title
                                                                    }
                                                                </span>
                                                                <span className="text-xs text-gray-500">
                                                                    {
                                                                        policy.description
                                                                    }
                                                                </span>
                                                            </div>
                                                        </SelectItem>
                                                    )
                                                )}
                                            </SelectContent>
                                        </Select>
                                        {hasFieldErrors(
                                            "cancellation_policy_id"
                                        ) && (
                                            <p className="text-red-500 text-xs mt-1">
                                                {
                                                    getFieldErrors(
                                                        "cancellation_policy_id"
                                                    )[0]
                                                }
                                            </p>
                                        )}
                                    </div>

                                    {/* Other Policies */}
                                    <div>
                                        <Label>Other Policies</Label>
                                        <div className="space-y-2">
                                            {formData.other_policies.map(
                                                (policy, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex gap-2"
                                                    >
                                                        <Input
                                                            placeholder="Policy title"
                                                            value={
                                                                policy.title ||
                                                                ""
                                                            }
                                                            onChange={(e) =>
                                                                handlePolicyChange(
                                                                    "other_policies",
                                                                    index,
                                                                    "title",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                        <Textarea
                                                            placeholder="Policy description"
                                                            value={
                                                                policy.description ||
                                                                ""
                                                            }
                                                            onChange={(e) =>
                                                                handlePolicyChange(
                                                                    "other_policies",
                                                                    index,
                                                                    "description",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            rows={2}
                                                        />
                                                        <Button
                                                            type="button"
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() =>
                                                                handleRemoveArrayItem(
                                                                    "other_policies",
                                                                    index
                                                                )
                                                            }
                                                        >
                                                            <X className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                )
                                            )}
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() =>
                                                    handleAddArrayItem(
                                                        "other_policies",
                                                        {
                                                            title: "",
                                                            description: "",
                                                        }
                                                    )
                                                }
                                            >
                                                <Plus className="h-4 w-4 mr-2" />
                                                Add Policy
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Card>

                    {/* 11. Review & Publish */}
                    <Card>
                        <AccordionItem value="review" className="border-0">
                            <AccordionTrigger className="text-lg font-semibold px-6 py-4">
                                <div className="flex items-center space-x-3 text-left">
                                    <Eye className="w-5 h-5 text-gray-600" />
                                    <div>
                                        <div className="font-semibold">
                                            Review & Publish
                                        </div>
                                        <div className="text-sm font-normal text-gray-500">
                                            Final review and publishing options
                                        </div>
                                    </div>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="px-6 pb-6">
                                <div className="space-y-4">
                                    <p className="text-sm text-gray-600">
                                        This section will be implemented for
                                        final review and publishing.
                                    </p>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Card>
                </Accordion>

                {/* Form Actions */}
                <div className="flex justify-between items-center pt-6 border-t">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => navigate("/vendor/treks")}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        disabled={loading}
                        className="min-w-[120px]"
                    >
                        {loading ? (
                            <div className="flex items-center">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                {mode === "create"
                                    ? "Creating..."
                                    : "Updating..."}
                            </div>
                        ) : (
                            <>
                                <Save className="w-4 h-4 mr-2" />
                                {mode === "create"
                                    ? "Create Trek"
                                    : "Update Trek"}
                            </>
                        )}
                    </Button>
                </div>
            </form>

            {/* Floating Action Buttons */}
            <div className="fixed bottom-6 right-6 z-50">
                {/* Floating Create/Update Button */}
                <Button
                    onClick={(e) => {
                        e.preventDefault();
                        handleSubmit(e);
                    }}
                    disabled={loading}
                    className="shadow-lg hover:shadow-xl transition-all duration-200 min-w-[140px] h-12 rounded-full md:min-w-[140px] min-w-[120px]"
                    size="lg"
                >
                    {loading ? (
                        <div className="flex items-center">
                            <Loader2 className="w-5 h-5 animate-spin mr-2" />
                            <span className="hidden md:inline">
                                {mode === "create"
                                    ? "Creating..."
                                    : "Updating..."}
                            </span>
                            <span className="md:hidden">
                                {mode === "create" ? "Create" : "Update"}
                            </span>
                        </div>
                    ) : (
                        <div className="flex items-center">
                            <Save className="w-5 h-5 mr-2" />
                            <span className="hidden md:inline">
                                {mode === "create"
                                    ? "Create Trek"
                                    : "Update Trek"}
                            </span>
                            <span className="md:hidden">
                                {mode === "create" ? "Create" : "Update"}
                            </span>
                        </div>
                    )}
                </Button>
            </div>

            {/* Floating Progress Indicator */}
            {loading && (
                <div className="fixed top-4 right-4 z-50">
                    <div className="bg-white rounded-lg shadow-lg p-4 border">
                        <div className="flex items-center space-x-3">
                            <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                            <div>
                                <p className="text-sm font-medium text-gray-900">
                                    {mode === "create"
                                        ? "Creating Trek..."
                                        : "Updating Trek..."}
                                </p>
                                <p className="text-xs text-gray-500">
                                    Please wait while we process your request
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Floating Form Progress Indicator */}
            <div className="fixed top-4 left-4 z-50">
                <div className="bg-white rounded-lg shadow-lg p-4 border">
                    <div className="flex items-center space-x-3">
                        <div className="relative">
                            <div className="w-12 h-12 rounded-full border-4 border-gray-200 flex items-center justify-center">
                                <div
                                    className="absolute inset-0 rounded-full border-4 border-transparent"
                                    style={{
                                        background: `conic-gradient(#3b82f6 ${
                                            formProgress * 3.6
                                        }deg, #e5e7eb 0deg)`,
                                    }}
                                ></div>
                                <span className="text-xs font-bold text-gray-700 relative z-10">
                                    {formProgress}%
                                </span>
                            </div>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-900">
                                Form Progress
                            </p>
                            <p className="text-xs text-gray-500">
                                {formProgress === 100
                                    ? "Complete!"
                                    : `${formProgress}% completed`}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrekForm;
