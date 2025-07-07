import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { apiVendor } from "@/lib/api";
import {
    formatTrekDataForAPI,
    formatTrekDataForForm,
    processInclusions,
    processExclusions,
    processBatches,
    processCancellationPolicy,
    processActivities,
} from "@/lib/trekUtils";
import { Card, CardContent } from "@/components/ui/card";
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
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, X, MapPin, ArrowLeft, ArrowRight, Save } from "lucide-react";
import DynamicItinerary from "@/components/trek/DynamicItinerary";
import DynamicAccommodation from "@/components/trek/DynamicAccommodation";
import DynamicActivities from "@/components/trek/DynamicActivities";
import ImageUpload from "@/components/trek/ImageUpload";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Checkbox } from "@/components/ui/checkbox";
import { DateTimePicker } from "@/components/ui/date-time-picker";

const EditTrek = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [cities, setCities] = useState([]);
    const [destinations, setDestinations] = useState([]);
    const [currentStep, setCurrentStep] = useState("basic-info");

    // Trek data state matching CreateTrek structure
    const [trek, setTrek] = useState({
        name: "",
        destination_id: "",
        city_id: "",
        description: "",
        trekType: "",
        category: "",
        duration: "",
        durationDays: "",
        durationNights: "",
        price: "",
        difficulty: "moderate",
        status: "deactive",
        discountValue: 0.0,
        discountType: "percentage",
        hasDiscount: false,
        inclusions: [],
        exclusions: [],
        meetingPoint: "",
        meetingTime: "",
        itinerary: [],
        accommodations: [],
        trekStages: [],
        images: [],
        batches: [],
        cancellationPolicies: [],
        otherPolicies: [],
        activities: [],
    });
    const [trekStages, setTrekStages] = useState([]);
    const [inclusions, setInclusions] = useState([]);
    const [exclusions, setExclusions] = useState([]);
    const [batches, setBatches] = useState([
        { startDate: "", endDate: "", capacity: 20 },
    ]);
    const [meetingPoint, setMeetingPoint] = useState({
        id: "",
        cityId: "",
        cityName: "",
        locationDetails: "",
        time: "",
    });
    const [pickupPoints, setPickupPoints] = useState([]);
    const [policies, setPolicies] = useState([]);
    const [cancellationPolicies, setCancellationPolicies] = useState([]);
    const [otherPolicies, setOtherPolicies] = useState([]);
    const [itinerary, setItinerary] = useState([]);
    const [accommodations, setAccommodations] = useState([]);
    const [activities, setActivities] = useState([]);
    const [images, setImages] = useState([]);
    const [cancellationPolicy, setCancellationPolicy] = useState({
        title: "Cancellation Policy",
        description: "Standard cancellation terms and conditions",
        rules: [
            { rule: "Full refund", deduction: "0%" },
            { rule: "Partial refund", deduction: "50%" },
            { rule: "No refund", deduction: "100%" },
        ],
        descriptionPoints: [
            "Cancellation must be made in writing",
            "Refunds processed within 5-7 business days",
            "Force majeure events may affect cancellation terms",
        ],
    });

    // Helper function to convert 12-hour time to 24-hour format
    const convertTimeFormat = (time) => {
        if (!time) return "";

        // If already in 24-hour format (HH:MM), return as is
        if (/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(time)) {
            return time;
        }

        // Convert 12-hour format (HH:MM AM/PM) to 24-hour format
        const timeRegex = /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i;
        const match = time.match(timeRegex);

        if (match) {
            let hours = parseInt(match[1]);
            const minutes = match[2];
            const period = match[3].toUpperCase();

            if (period === "PM" && hours !== 12) {
                hours += 12;
            } else if (period === "AM" && hours === 12) {
                hours = 0;
            }

            return `${hours.toString().padStart(2, "0")}:${minutes}`;
        }

        return time; // Return original if no conversion possible
    };

    // Helper function to convert 24-hour time to 12-hour format
    const convertTo12HourFormat = (time) => {
        if (!time) return "";

        // If already in 12-hour format, return as is
        if (/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i.test(time)) {
            return time;
        }

        // Convert 24-hour format (HH:MM) to 12-hour format
        const timeRegex = /^([01]?[0-9]|2[0-3]):([0-5][0-9])$/;
        const match = time.match(timeRegex);

        if (match) {
            let hours = parseInt(match[1]);
            const minutes = match[2];
            const period = hours >= 12 ? "PM" : "AM";

            if (hours > 12) {
                hours -= 12;
            } else if (hours === 0) {
                hours = 12;
            }

            return `${hours}:${minutes} ${period}`;
        }

        return time; // Return original if no conversion possible
    };

    // Load cities and trek data on component mount
    useEffect(() => {
        // Fetch destinations and cities from API
        async function fetchData() {
            try {
                const [destRes, cityRes] = await Promise.all([
                    apiVendor.getDestinations({ status: "active" }),
                    apiVendor.getCities({ status: "active" }),
                ]);
                setDestinations(destRes.data?.destinations || []);
                setCities(cityRes.data?.cities || []);
            } catch (err) {
                toast.error("Failed to load destinations or cities");
            }
        }
        fetchData();

        // Load trek data
        const loadTrek = async () => {
            if (!id) return;

            try {
                setLoading(true);
                const response = await apiVendor.getTrekById(id);

                if (response.success) {
                    const trekData = response.data;
                    console.log("Loaded trek data:", trekData);

                    // Map basic trek data using utility function
                    setTrek(formatTrekDataForForm(trekData));

                    // Map inclusions and exclusions using utility functions
                    setInclusions(processInclusions(trekData.inclusions));
                    setExclusions(processExclusions(trekData.exclusions));

                    // Map meeting point
                    console.log(
                        "Setting meeting point with city_id:",
                        trekData.city_id
                    );
                    setMeetingPoint({
                        id: "",
                        cityId: trekData.city_id
                            ? String(trekData.city_id)
                            : "",
                        cityName: trekData.city?.cityName || "",
                        locationDetails: trekData.meetingPoint || "",
                        time: convertTimeFormat(trekData.meetingTime) || "",
                    });
                    console.log("Meeting point set to:", {
                        cityId: trekData.city_id
                            ? String(trekData.city_id)
                            : "",
                        cityName: trekData.city?.cityName || "",
                        time: convertTimeFormat(trekData.meetingTime) || "",
                    });

                    // Map itinerary with proper structure for DynamicItinerary component
                    const processItinerary = (itinerary) => {
                        if (!itinerary || !Array.isArray(itinerary)) return [];

                        return itinerary.map((dayData) => ({
                            day: dayData.day,
                            activities: Array.isArray(dayData.activities)
                                ? dayData.activities.map((activity, index) => ({
                                      id: `day${dayData.day}-activity${
                                          index + 1
                                      }`,
                                      activity:
                                          typeof activity === "string"
                                              ? activity
                                              : activity.activity ||
                                                activity.name ||
                                                "",
                                  }))
                                : [],
                        }));
                    };

                    setItinerary(processItinerary(trekData.itinerary));
                    console.log(
                        "Processed itinerary:",
                        processItinerary(trekData.itinerary)
                    );

                    // Map trek stages
                    setTrekStages(trekData.trekStages || []);

                    // Map images
                    setImages(trekData.images || []);

                    // Map accommodations
                    console.log(
                        "Accommodations data from backend:",
                        trekData.accommodations
                    );
                    setAccommodations(trekData.accommodations || []);

                    // Map activities using utility function
                    console.log(
                        "Activities data from backend:",
                        trekData.activities
                    );
                    setActivities(processActivities(trekData.activities));

                    // Load policies using utility function
                    setCancellationPolicy(
                        processCancellationPolicy(trekData.cancellationPolicies)
                    );
                    setOtherPolicies(trekData.otherPolicies || []);

                    // Set batches using utility function
                    setBatches(processBatches(trekData.batches));
                } else {
                    toast.error("Failed to load trek data");
                    navigate("/vendor/treks");
                }
            } catch (error) {
                console.error("Error loading trek:", error);
                toast.error("Failed to load trek");
                navigate("/vendor/treks");
            } finally {
                setLoading(false);
            }
        };

        loadTrek();
    }, [id, navigate]);

    // Debug logging for cities and meeting point
    useEffect(() => {
        console.log(
            "Cities loaded:",
            cities.length,
            cities.map((c) => ({ id: c.id, name: c.cityName }))
        );
    }, [cities]);

    useEffect(() => {
        console.log("Meeting point changed:", meetingPoint);
    }, [meetingPoint]);

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTrek((prev) => ({ ...prev, [name]: value }));
    };

    // Handle select changes
    const handleSelectChange = (name, value) => {
        setTrek((prev) => ({ ...prev, [name]: value }));
    };

    // Auto-generate duration based on days and nights
    useEffect(() => {
        const days = parseInt(trek.durationDays);
        const nights = parseInt(trek.durationNights);
        if (!isNaN(days) && days > 0) {
            let generatedDuration = `${days} Day${days > 1 ? "s" : ""}`;
            if (!isNaN(nights) && nights > 0) {
                generatedDuration += ` / ${nights} Night${
                    nights > 1 ? "s" : ""
                }`;
            }
            setTrek((prev) => ({
                ...prev,
                duration: generatedDuration,
            }));
        } else {
            setTrek((prev) => ({
                ...prev,
                duration: "",
            }));
        }
    }, [trek.durationDays, trek.durationNights]);

    // Trek stages functions
    const addTrekStage = () => {
        const newStage = {
            id: `stage-${Date.now()}`,
            stage_name: "",
            means_of_transport: "",
            date_time: "",
        };
        setTrekStages((prev) => [...prev, newStage]);
    };

    const updateTrekStage = (index, field, value) => {
        setTrekStages((prev) =>
            prev.map((stage, i) =>
                i === index ? { ...stage, [field]: value } : stage
            )
        );
    };

    const removeTrekStage = (index) => {
        setTrekStages((prev) => prev.filter((_, i) => i !== index));
    };

    // Inclusions functions
    const addInclusion = () => {
        setInclusions((prev) => [
            ...prev,
            { id: `inclusion-${Date.now()}`, item: "" },
        ]);
    };

    const updateInclusion = (index, value) => {
        setInclusions((prev) =>
            prev.map((inclusion, i) =>
                i === index ? { ...inclusion, item: value } : inclusion
            )
        );
    };

    const removeInclusion = (index) => {
        setInclusions((prev) => prev.filter((_, i) => i !== index));
    };

    // Exclusions functions
    const addExclusion = () => {
        setExclusions((prev) => [
            ...prev,
            { id: `exclusion-${Date.now()}`, item: "" },
        ]);
    };

    const updateExclusion = (index, value) => {
        setExclusions((prev) =>
            prev.map((exclusion, i) =>
                i === index ? { ...exclusion, item: value } : exclusion
            )
        );
    };

    const removeExclusion = (index) => {
        setExclusions((prev) => prev.filter((_, i) => i !== index));
    };

    // Meeting point functions
    const updateMeetingPoint = (field, value) => {
        setMeetingPoint((prev) => ({ ...prev, [field]: value }));

        // Auto-populate city name when city is selected
        if (field === "cityId") {
            const selectedCity = cities.find(
                (city) => String(city.id) === String(value)
            );
            if (selectedCity) {
                setMeetingPoint((prev) => ({
                    ...prev,
                    cityName: selectedCity.cityName,
                }));
            }
        }
    };

    // Pickup points functions
    const addPickupPoint = () => {
        setPickupPoints((prev) => [
            ...prev,
            {
                id: `pickup-${Date.now()}`,
                cityId: "",
                cityName: "",
                locationDetails: "",
                time: "",
            },
        ]);
    };

    const updatePickupPoint = (index, field, value) => {
        setPickupPoints((prev) =>
            prev.map((point, i) => {
                if (i === index) {
                    const updated = { ...point, [field]: value };
                    // Auto-populate city name when city is selected
                    if (field === "cityId") {
                        const selectedCity = cities.find(
                            (city) => String(city.id) === String(value)
                        );
                        if (selectedCity) {
                            updated.cityName = selectedCity.cityName;
                        }
                    }
                    return updated;
                }
                return point;
            })
        );
    };

    const removePickupPoint = (index) => {
        setPickupPoints((prev) => prev.filter((_, i) => i !== index));
    };

    // Policy functions
    const addPolicy = () => {
        setPolicies((prev) => [
            ...prev,
            { id: `policy-${Date.now()}`, title: "", description: "" },
        ]);
    };

    const updatePolicy = (index, field, value) => {
        setPolicies((prev) =>
            prev.map((policy, i) =>
                i === index ? { ...policy, [field]: value } : policy
            )
        );
    };

    const removePolicy = (index) => {
        setPolicies((prev) => prev.filter((_, i) => i !== index));
    };

    // Handle itinerary changes for a specific day
    const handleItineraryChange = (newItinerary) => {
        setItinerary(newItinerary);
    };

    // Add new activity day
    const addActivityDay = () => {
        const newItinerary = [...itinerary];
        newItinerary.push({
            activities: [],
        });
        setItinerary(newItinerary);
    };

    // Handle resort changes
    const handleResortChange = (index, field, value) => {
        const newResorts = [...accommodations];
        if (!newResorts[index]) {
            newResorts[index] = {
                day: index + 1,
                name: "",
                location: "",
                mapLink: "",
                image: null,
            };
        }
        newResorts[index] = {
            ...newResorts[index],
            [field]: value,
        };
        setAccommodations(newResorts);
    };

    // Add a new resort
    const addResort = () => {
        const newResorts = [...accommodations];
        newResorts.push({
            day: newResorts.length + 1,
            name: "",
            location: "",
            mapLink: "",
            image: null,
        });
        setAccommodations(newResorts);
    };

    // Toggle service day
    const toggleServiceDay = (dayIndex) => {
        const newServiceDays = [...trek.serviceDays];
        newServiceDays[dayIndex] = !newServiceDays[dayIndex];
        setTrek({
            ...trek,
            serviceDays: newServiceDays,
        });
    };

    // Handle route changes
    const handleRouteChange = (index, field, value) => {
        const newRoute = [...trekStages];
        if (!newRoute[index]) {
            newRoute[index] = {
                stage: index + 1,
                departure: "",
                destination: "",
                arrivalTime: "",
                transportation: "",
            };
        }
        newRoute[index] = {
            ...newRoute[index],
            [field]: value,
        };
        setTrekStages(newRoute);
    };

    // Add multiple route stages based on input count
    const addMultipleRouteStages = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (trekStages.length <= 0) {
            toast.error("Please enter a valid number of stages");
            return;
        }

        // Create new route array with the specified number of stages
        const newRoute = [];

        // Keep existing stages if any
        for (let i = 0; i < trekStages.length; i++) {
            newRoute.push(trekStages[i]);
        }

        // Add new stages as needed
        for (let i = trekStages.length; i < trekStages.length; i++) {
            newRoute.push({
                stage: i + 1,
                departure: "",
                destination: "",
                arrivalTime: "",
                transportation: "",
            });
        }
        setTrekStages(newRoute);
    };

    // Add a new route stage
    const addRouteStage = () => {
        const newRoute = [...trekStages];
        newRoute.push({
            stage: newRoute.length + 1,
            departure: "",
            destination: "",
            arrivalTime: "",
            transportation: "",
        });
        setTrekStages(newRoute);
    };

    // Add a new cancellation policy
    const addCancellationPolicy = () => {
        const newPolicy = {
            id: Date.now(),
            title: "",
            description: "",
        };
        setCancellationPolicies((prev) => [...prev, newPolicy]);
    };

    const addOtherPolicy = () => {
        const newPolicy = {
            id: Date.now(),
            title: "",
            description: "",
        };
        setOtherPolicies((prev) => [...prev, newPolicy]);
    };

    // Update cancellation policy
    const updateCancellationPolicy = (index, field, value) => {
        setCancellationPolicies((prev) =>
            prev.map((policy, i) =>
                i === index ? { ...policy, [field]: value } : policy
            )
        );
    };

    const updateOtherPolicy = (index, field, value) => {
        setOtherPolicies((prev) =>
            prev.map((policy, i) =>
                i === index ? { ...policy, [field]: value } : policy
            )
        );
    };

    // Remove cancellation policy
    const removeCancellationPolicy = (index) => {
        setCancellationPolicies((prev) => prev.filter((_, i) => i !== index));
    };

    const removeOtherPolicy = (index) => {
        setOtherPolicies((prev) => prev.filter((_, i) => i !== index));
    };

    // Add cancellation rule
    const addCancellationRule = () => {
        setCancellationPolicy((prev) => ({
            ...prev,
            rules: [...prev.rules, { rule: "", deduction: "" }],
        }));
    };

    // Update cancellation rule
    const updateCancellationRule = (index, field, value) => {
        setCancellationPolicy((prev) => ({
            ...prev,
            rules: prev.rules.map((rule, i) =>
                i === index ? { ...rule, [field]: value } : rule
            ),
        }));
    };

    // Remove cancellation rule
    const removeCancellationRule = (index) => {
        setCancellationPolicy((prev) => ({
            ...prev,
            rules: prev.rules.filter((_, i) => i !== index),
        }));
    };

    // Add description point
    const addDescriptionPoint = () => {
        setCancellationPolicy((prev) => ({
            ...prev,
            descriptionPoints: [...prev.descriptionPoints, ""],
        }));
    };

    // Update description point
    const updateDescriptionPoint = (index, value) => {
        setCancellationPolicy((prev) => ({
            ...prev,
            descriptionPoints: prev.descriptionPoints.map((point, i) =>
                i === index ? value : point
            ),
        }));
    };

    // Remove description point
    const removeDescriptionPoint = (index) => {
        setCancellationPolicy((prev) => ({
            ...prev,
            descriptionPoints: prev.descriptionPoints.filter(
                (_, i) => i !== index
            ),
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!trek.name || !trek.destination_id || !trek.price) {
            toast.error("Please fill in all required fields");
            return;
        }

        try {
            setSaving(true);

            // Use the utility function to format data for API
            const formData = formatTrekDataForAPI({
                trekData: trek,
                inclusions,
                exclusions,
                itinerary,
                accommodations,
                trekStages,
                batches,
                activities,
                cancellationPolicy,
                otherPolicies,
                images,
                meetingPoint,
            });

            console.log("Submitting trek data:", formData);

            const response = await apiVendor.updateTrek(id, formData);

            if (response.success) {
                toast.success("Trek updated successfully!");
                navigate("/vendor/treks");
            } else {
                toast.error(response.message || "Failed to update trek");
            }
        } catch (error) {
            console.error("Error updating trek:", error);
            toast.error("Failed to update trek: " + error.message);
        } finally {
            setSaving(false);
        }
    };

    // Validation function
    const canProceed = (step) => {
        switch (step) {
            case "basic-info":
                return trek.name && trek.destination_id && trek.description;
            case "trek-type":
                return trek.trekType && trek.category;
            case "duration":
                return trek.durationDays;
            case "pricing":
                return trek.price;
            case "dates":
                return batches.length > 0 && batches.every((b) => b.startDate);
            case "activities":
                return activities.length > 0;
            case "itinerary":
                return itinerary.length > 0;
            case "inclusions":
                return inclusions.length > 0;
            case "meeting-point":
                return trek.meetingPoint;
            case "cancellation":
                return (
                    cancellationPolicy.title &&
                    cancellationPolicy.description &&
                    cancellationPolicy.rules.length > 0 &&
                    cancellationPolicy.rules.every(
                        (rule) => rule.rule && rule.deduction
                    ) &&
                    cancellationPolicy.descriptionPoints.length > 0 &&
                    cancellationPolicy.descriptionPoints.every(
                        (point) => point.trim() !== ""
                    )
                );
            case "trek-stages":
                return (
                    trekStages.length > 0 &&
                    trekStages.every(
                        (stage) =>
                            (stage.stage_name || stage.name) && stage.date_time
                    )
                );
            default:
                return true;
        }
    };

    // Navigation functions
    const nextStep = () => {
        const steps = [
            "basic-info",
            "trek-type",
            "duration",
            "trek-stages",
            "pricing",
            "dates",
            "activities",
            "itinerary",
            "inclusions",
            "meeting-point",
            "accommodation",
            "images",
            "cancellation",
        ];
        const currentIndex = steps.indexOf(currentStep);
        if (currentIndex < steps.length - 1) {
            setCurrentStep(steps[currentIndex + 1]);
        }
    };

    const prevStep = () => {
        const steps = [
            "basic-info",
            "trek-type",
            "duration",
            "trek-stages",
            "pricing",
            "dates",
            "activities",
            "itinerary",
            "inclusions",
            "meeting-point",
            "accommodation",
            "images",
            "cancellation",
        ];
        const currentIndex = steps.indexOf(currentStep);
        if (currentIndex > 0) {
            setCurrentStep(steps[currentIndex - 1]);
        }
    };

    const getCurrentStepNumber = () => {
        const steps = [
            "basic-info",
            "trek-type",
            "duration",
            "trek-stages",
            "pricing",
            "dates",
            "activities",
            "itinerary",
            "inclusions",
            "meeting-point",
            "accommodation",
            "images",
            "cancellation",
        ];
        return steps.indexOf(currentStep) + 1;
    };

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
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Edit Trek</h1>
                    <p className="text-gray-600">
                        Step {getCurrentStepNumber()} of 13
                    </p>
                </div>
                <Button
                    variant="outline"
                    onClick={() => navigate("/vendor/treks")}
                >
                    Back to Treks
                </Button>
            </div>

            <Card>
                <CardContent className="p-6">
                    <Tabs
                        value={currentStep}
                        onValueChange={setCurrentStep}
                        className="w-full"
                    >
                        <TabsList className="grid w-full grid-cols-6 lg:grid-cols-12">
                            <TabsTrigger value="basic-info" className="text-xs">
                                Basic Info
                            </TabsTrigger>
                            <TabsTrigger value="trek-type" className="text-xs">
                                Type
                            </TabsTrigger>
                            <TabsTrigger value="duration" className="text-xs">
                                Duration
                            </TabsTrigger>
                            <TabsTrigger
                                value="trek-stages"
                                className="text-xs"
                            >
                                Stages
                            </TabsTrigger>
                            <TabsTrigger value="pricing" className="text-xs">
                                Pricing
                            </TabsTrigger>
                            <TabsTrigger value="dates" className="text-xs">
                                Dates
                            </TabsTrigger>
                            <TabsTrigger value="activities" className="text-xs">
                                Activities
                            </TabsTrigger>
                            <TabsTrigger value="itinerary" className="text-xs">
                                Itinerary
                            </TabsTrigger>
                            <TabsTrigger value="inclusions" className="text-xs">
                                Inclusions
                            </TabsTrigger>
                            <TabsTrigger
                                value="meeting-point"
                                className="text-xs"
                            >
                                Meeting
                            </TabsTrigger>
                            <TabsTrigger
                                value="accommodation"
                                className="text-xs"
                            >
                                Stay
                            </TabsTrigger>
                            <TabsTrigger value="images" className="text-xs">
                                Images
                            </TabsTrigger>
                            <TabsTrigger
                                value="cancellation"
                                className="text-xs"
                            >
                                Policies
                            </TabsTrigger>
                        </TabsList>

                        <form
                            onSubmit={handleSubmit}
                            onKeyDown={(e) => {
                                // Prevent Enter key from submitting form unless we're on the final step
                                if (
                                    e.key === "Enter" &&
                                    currentStep !== "cancellation"
                                ) {
                                    e.preventDefault();
                                }
                            }}
                            className="mt-6"
                        >
                            {/* Basic Info Tab */}
                            <TabsContent
                                value="basic-info"
                                className="space-y-4"
                            >
                                <div className="space-y-4">
                                    <div>
                                        <Label htmlFor="name">
                                            Trek Name *
                                        </Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            value={trek.name}
                                            onChange={handleInputChange}
                                            placeholder="Enter trek name"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="destination">
                                            Destination *
                                        </Label>
                                        <Select
                                            value={trek.destination_id}
                                            onValueChange={(value) =>
                                                handleSelectChange(
                                                    "destination_id",
                                                    value
                                                )
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
                                    </div>
                                    <div>
                                        <Label htmlFor="description">
                                            Description *
                                        </Label>
                                        <Textarea
                                            id="description"
                                            name="description"
                                            value={trek.description}
                                            onChange={handleInputChange}
                                            placeholder="Enter trek description"
                                            rows={5}
                                            required
                                        />
                                    </div>
                                </div>
                            </TabsContent>

                            {/* Trek Type Tab */}
                            <TabsContent
                                value="trek-type"
                                className="space-y-4"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label>Trek Type *</Label>
                                        <Select
                                            value={trek.trekType || ""}
                                            onValueChange={(value) =>
                                                handleSelectChange(
                                                    "trekType",
                                                    value
                                                )
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select trek type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="mountain">
                                                    Mountain Trek
                                                </SelectItem>
                                                <SelectItem value="forest">
                                                    Forest Trek
                                                </SelectItem>
                                                <SelectItem value="desert">
                                                    Desert Trek
                                                </SelectItem>
                                                <SelectItem value="coastal">
                                                    Coastal Trek
                                                </SelectItem>
                                                <SelectItem value="hill-station">
                                                    Hill Station
                                                </SelectItem>
                                                <SelectItem value="adventure">
                                                    Adventure Trek
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <Label>Category *</Label>
                                        <Select
                                            value={trek.category || ""}
                                            onValueChange={(value) =>
                                                handleSelectChange(
                                                    "category",
                                                    value
                                                )
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="mountain">
                                                    Mountain
                                                </SelectItem>
                                                <SelectItem value="forest">
                                                    Forest
                                                </SelectItem>
                                                <SelectItem value="desert">
                                                    Desert
                                                </SelectItem>
                                                <SelectItem value="coastal">
                                                    Coastal
                                                </SelectItem>
                                                <SelectItem value="hill-station">
                                                    Hill Station
                                                </SelectItem>
                                                <SelectItem value="adventure">
                                                    Adventure
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </TabsContent>

                            {/* Duration Tab */}
                            <TabsContent value="duration" className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <Label htmlFor="duration">
                                            Duration (Auto-generated) *
                                        </Label>
                                        <Input
                                            id="duration"
                                            name="duration"
                                            value={trek.duration}
                                            onChange={handleInputChange}
                                            placeholder="Will be generated automatically"
                                            readOnly
                                            className="bg-gray-50 cursor-not-allowed"
                                        />
                                        <p className="text-xs text-gray-500 mt-1">
                                            This field is automatically
                                            generated based on days and nights
                                        </p>
                                    </div>
                                    <div>
                                        <Label htmlFor="durationDays">
                                            Number of Days *
                                        </Label>
                                        <Input
                                            id="durationDays"
                                            name="durationDays"
                                            type="number"
                                            value={trek.durationDays}
                                            onChange={handleInputChange}
                                            placeholder="Enter days"
                                            min="1"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="durationNights">
                                            Number of Nights
                                        </Label>
                                        <Input
                                            id="durationNights"
                                            name="durationNights"
                                            type="number"
                                            value={trek.durationNights}
                                            onChange={handleInputChange}
                                            placeholder="Enter nights"
                                            min="0"
                                        />
                                    </div>
                                </div>
                            </TabsContent>

                            {/* Trek Stages Tab */}
                            <TabsContent
                                value="trek-stages"
                                className="space-y-4"
                            >
                                <div className="flex justify-between items-center">
                                    <Label>Trek Stages</Label>
                                    <Button
                                        type="button"
                                        onClick={addTrekStage}
                                        size="sm"
                                    >
                                        <Plus className="w-4 h-4 mr-2" />
                                        Add Stage
                                    </Button>
                                </div>
                                <div className="space-y-4">
                                    {trekStages.map((stage, index) => (
                                        <div
                                            key={stage.id}
                                            className="border p-4 rounded-lg"
                                        >
                                            <div className="flex justify-between items-start mb-4">
                                                <h4 className="font-medium">
                                                    Stage {index + 1}
                                                </h4>
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() =>
                                                        removeTrekStage(index)
                                                    }
                                                >
                                                    <X className="w-4 h-4" />
                                                </Button>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <Label>Stage Name *</Label>
                                                    <Input
                                                        value={
                                                            stage.stage_name ||
                                                            stage.name ||
                                                            ""
                                                        }
                                                        onChange={(e) =>
                                                            updateTrekStage(
                                                                index,
                                                                "stage_name",
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="e.g., Base Camp to Summit"
                                                    />
                                                </div>
                                                <div>
                                                    <Label>
                                                        Means of Transport
                                                    </Label>
                                                    <Input
                                                        value={
                                                            stage.means_of_transport ||
                                                            ""
                                                        }
                                                        onChange={(e) =>
                                                            updateTrekStage(
                                                                index,
                                                                "means_of_transport",
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="e.g., Walking, Bus, Train"
                                                    />
                                                </div>
                                                <div>
                                                    <Label>
                                                        Date and Time *
                                                    </Label>
                                                    <DateTimePicker
                                                        date={
                                                            stage.date_time
                                                                ? new Date(
                                                                      stage.date_time
                                                                  )
                                                                : null
                                                        }
                                                        setDate={(date) =>
                                                            updateTrekStage(
                                                                index,
                                                                "date_time",
                                                                date
                                                                    ? date.toISOString()
                                                                    : ""
                                                            )
                                                        }
                                                        placeholder="Select date and time"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </TabsContent>

                            {/* Pricing Tab */}
                            <TabsContent value="pricing" className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="price">
                                            Price per Person *
                                        </Label>
                                        <Input
                                            id="price"
                                            name="price"
                                            type="number"
                                            value={trek.price}
                                            onChange={handleInputChange}
                                            placeholder="0"
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <Label>Difficulty Level *</Label>
                                    <Select
                                        value={trek.difficulty || ""}
                                        onValueChange={(value) =>
                                            handleSelectChange(
                                                "difficulty",
                                                value
                                            )
                                        }
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
                                            <SelectItem value="extreme">
                                                Extreme
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Discount Section */}
                                <div className="border-t pt-4">
                                    <h3 className="text-lg font-semibold mb-4">
                                        Discount
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                        <div>
                                            <Label htmlFor="discountValue">
                                                Discount Value
                                            </Label>
                                            <Input
                                                id="discountValue"
                                                name="discountValue"
                                                type="number"
                                                step="0.01"
                                                min="0"
                                                value={trek.discountValue}
                                                onChange={handleInputChange}
                                                placeholder="0.00"
                                            />
                                        </div>
                                        <div>
                                            <Label>Discount Type</Label>
                                            <Select
                                                value={
                                                    trek.discountType ||
                                                    "percentage"
                                                }
                                                onValueChange={(value) =>
                                                    handleSelectChange(
                                                        "discountType",
                                                        value
                                                    )
                                                }
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="percentage">
                                                        Percentage (%)
                                                    </SelectItem>
                                                    <SelectItem value="fixed">
                                                        Fixed Amount
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="hasDiscount"
                                                checked={trek.hasDiscount}
                                                onCheckedChange={(checked) =>
                                                    handleSelectChange(
                                                        "hasDiscount",
                                                        checked
                                                    )
                                                }
                                            />
                                            <Label htmlFor="hasDiscount">
                                                Has Discount
                                            </Label>
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>

                            {/* Dates Tab */}
                            <TabsContent value="dates" className="space-y-4">
                                <div className="space-y-4">
                                    {batches.map((range, idx) => (
                                        <div
                                            key={idx}
                                            className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end"
                                        >
                                            <div>
                                                <Label>Start Date *</Label>
                                                <Input
                                                    type="date"
                                                    value={range.startDate}
                                                    onChange={(e) => {
                                                        const newDates = [
                                                            ...batches,
                                                        ];
                                                        newDates[
                                                            idx
                                                        ].startDate =
                                                            e.target.value;
                                                        setBatches(newDates);
                                                    }}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <Label>End Date</Label>
                                                <Input
                                                    type="date"
                                                    value={range.endDate}
                                                    onChange={(e) => {
                                                        const newDates = [
                                                            ...batches,
                                                        ];
                                                        newDates[idx].endDate =
                                                            e.target.value;
                                                        setBatches(newDates);
                                                    }}
                                                />
                                            </div>
                                            <div className="flex gap-2">
                                                {batches.length > 1 && (
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() =>
                                                            setBatches(
                                                                batches.filter(
                                                                    (_, i) =>
                                                                        i !==
                                                                        idx
                                                                )
                                                            )
                                                        }
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </Button>
                                                )}
                                                {idx === batches.length - 1 && (
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() =>
                                                            setBatches([
                                                                ...batches,
                                                                {
                                                                    startDate:
                                                                        "",
                                                                    endDate: "",
                                                                    capacity: 20,
                                                                },
                                                            ])
                                                        }
                                                    >
                                                        <Plus className="w-4 h-4 mr-1" />
                                                        Add Date Range
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </TabsContent>

                            {/* Activities Tab */}
                            <TabsContent
                                value="activities"
                                className="space-y-4"
                            >
                                <DynamicActivities
                                    activities={activities}
                                    onChange={setActivities}
                                />
                            </TabsContent>

                            {/* Itinerary Tab */}
                            <TabsContent
                                value="itinerary"
                                className="space-y-4"
                            >
                                <DynamicItinerary
                                    duration={
                                        trek.duration || "3 Days / 2 Nights"
                                    }
                                    itinerary={itinerary}
                                    onChange={handleItineraryChange}
                                />
                            </TabsContent>

                            {/* Inclusions Tab */}
                            <TabsContent
                                value="inclusions"
                                className="space-y-4"
                            >
                                <div className="space-y-6">
                                    <div>
                                        <div className="flex justify-between items-center mb-4">
                                            <Label>What's Included</Label>
                                            <Button
                                                type="button"
                                                onClick={addInclusion}
                                                size="sm"
                                            >
                                                <Plus className="w-4 h-4 mr-2" />
                                                Add Inclusion
                                            </Button>
                                        </div>
                                        <div className="space-y-2">
                                            {inclusions.map(
                                                (inclusion, index) => (
                                                    <div
                                                        key={inclusion.id}
                                                        className="flex gap-2"
                                                    >
                                                        <Input
                                                            value={
                                                                inclusion.item
                                                            }
                                                            onChange={(e) =>
                                                                updateInclusion(
                                                                    index,
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            placeholder={`Inclusion ${
                                                                index + 1
                                                            }`}
                                                        />
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() =>
                                                                removeInclusion(
                                                                    index
                                                                )
                                                            }
                                                        >
                                                            <X className="w-4 h-4" />
                                                        </Button>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex justify-between items-center mb-4">
                                            <Label>What's Not Included</Label>
                                            <Button
                                                type="button"
                                                onClick={addExclusion}
                                                size="sm"
                                            >
                                                <Plus className="w-4 h-4 mr-2" />
                                                Add Exclusion
                                            </Button>
                                        </div>
                                        <div className="space-y-2">
                                            {exclusions.map(
                                                (exclusion, index) => (
                                                    <div
                                                        key={exclusion.id}
                                                        className="flex gap-2"
                                                    >
                                                        <Input
                                                            value={
                                                                exclusion.item
                                                            }
                                                            onChange={(e) =>
                                                                updateExclusion(
                                                                    index,
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            placeholder={`Exclusion ${
                                                                index + 1
                                                            }`}
                                                        />
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() =>
                                                                removeExclusion(
                                                                    index
                                                                )
                                                            }
                                                        >
                                                            <X className="w-4 h-4" />
                                                        </Button>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>

                            {/* Meeting Point Tab */}
                            <TabsContent
                                value="meeting-point"
                                className="space-y-4"
                            >
                                <div className="space-y-4">
                                    <div>
                                        <Label>Meeting City</Label>
                                        <Select
                                            value={meetingPoint.cityId}
                                            onValueChange={(value) =>
                                                updateMeetingPoint(
                                                    "cityId",
                                                    value
                                                )
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select city" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {cities.map((city) => (
                                                    <SelectItem
                                                        key={city.id}
                                                        value={String(city.id)}
                                                    >
                                                        {city.cityName},{" "}
                                                        {city.state?.name ||
                                                            "Unknown State"}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <Label>Meeting Point Details *</Label>
                                        <Textarea
                                            value={meetingPoint.locationDetails}
                                            onChange={(e) =>
                                                updateMeetingPoint(
                                                    "locationDetails",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Enter detailed meeting point location"
                                            rows={3}
                                        />
                                    </div>
                                    <div>
                                        <Label>Meeting Time</Label>
                                        <Input
                                            type="time"
                                            value={meetingPoint.time}
                                            onChange={(e) =>
                                                updateMeetingPoint(
                                                    "time",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                </div>

                                {/* Pickup Points */}
                                <div className="border-t pt-6">
                                    <div className="flex justify-between items-center mb-4">
                                        <Label>Additional Pickup Points</Label>
                                        <Button
                                            type="button"
                                            onClick={addPickupPoint}
                                            size="sm"
                                        >
                                            <Plus className="w-4 h-4 mr-2" />
                                            Add Pickup Point
                                        </Button>
                                    </div>
                                    <div className="space-y-4">
                                        {pickupPoints.map((point, index) => (
                                            <div
                                                key={point.id}
                                                className="border p-4 rounded-lg"
                                            >
                                                <div className="flex justify-between items-start mb-4">
                                                    <h4 className="font-medium">
                                                        Pickup Point {index + 1}
                                                    </h4>
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() =>
                                                            removePickupPoint(
                                                                index
                                                            )
                                                        }
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <Select
                                                        value={point.cityId}
                                                        onValueChange={(
                                                            value
                                                        ) =>
                                                            updatePickupPoint(
                                                                index,
                                                                "cityId",
                                                                value
                                                            )
                                                        }
                                                    >
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select city" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {cities.map(
                                                                (city) => (
                                                                    <SelectItem
                                                                        key={
                                                                            city.id
                                                                        }
                                                                        value={String(
                                                                            city.id
                                                                        )}
                                                                    >
                                                                        {
                                                                            city.cityName
                                                                        }
                                                                        ,{" "}
                                                                        {city
                                                                            .state
                                                                            ?.name ||
                                                                            "Unknown State"}
                                                                    </SelectItem>
                                                                )
                                                            )}
                                                        </SelectContent>
                                                    </Select>
                                                    <Input
                                                        type="time"
                                                        value={point.time}
                                                        onChange={(e) =>
                                                            updatePickupPoint(
                                                                index,
                                                                "time",
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="Pickup time"
                                                    />
                                                </div>
                                                <Textarea
                                                    value={
                                                        point.locationDetails
                                                    }
                                                    onChange={(e) =>
                                                        updatePickupPoint(
                                                            index,
                                                            "locationDetails",
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="Pickup point details"
                                                    rows={2}
                                                    className="mt-4"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </TabsContent>

                            {/* Accommodation Tab */}
                            <TabsContent
                                value="accommodation"
                                className="space-y-4"
                            >
                                <DynamicAccommodation
                                    duration={
                                        trek.duration || "3 Days / 2 Nights"
                                    }
                                    accommodations={accommodations}
                                    onChange={setAccommodations}
                                />
                            </TabsContent>

                            {/* Images Tab */}
                            <TabsContent value="images" className="space-y-4">
                                <ImageUpload
                                    images={images}
                                    onChange={setImages}
                                />
                            </TabsContent>

                            {/* Cancellation Tab */}
                            <TabsContent
                                value="cancellation"
                                className="space-y-6"
                            >
                                {/* Cancellation Policy Section */}
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <Label className="text-lg font-medium text-red-600">
                                                Cancellation Policy *
                                            </Label>
                                            <p className="text-sm text-gray-600">
                                                Define cancellation rules and
                                                terms
                                            </p>
                                        </div>
                                    </div>

                                    <div className="border border-red-200 rounded-lg p-4 bg-red-50">
                                        <div className="space-y-4">
                                            <div>
                                                <Label className="text-red-700">
                                                    Policy Title *
                                                </Label>
                                                <Input
                                                    value={
                                                        cancellationPolicy.title
                                                    }
                                                    onChange={(e) =>
                                                        setCancellationPolicy(
                                                            (prev) => ({
                                                                ...prev,
                                                                title: e.target
                                                                    .value,
                                                            })
                                                        )
                                                    }
                                                    placeholder="e.g., Cancellation Policy"
                                                    className="border-red-300"
                                                />
                                            </div>
                                            <div>
                                                <Label className="text-red-700">
                                                    Policy Description *
                                                </Label>
                                                <Textarea
                                                    value={
                                                        cancellationPolicy.description
                                                    }
                                                    onChange={(e) =>
                                                        setCancellationPolicy(
                                                            (prev) => ({
                                                                ...prev,
                                                                description:
                                                                    e.target
                                                                        .value,
                                                            })
                                                        )
                                                    }
                                                    placeholder="Describe the cancellation policy overview"
                                                    rows={3}
                                                    className="border-red-300"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Cancellation Rules Section */}
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <h4 className="text-md font-medium text-red-600">
                                                    Cancellation Rules *
                                                </h4>
                                                <p className="text-sm text-gray-600">
                                                    Define rules with their
                                                    corresponding deductions
                                                </p>
                                            </div>
                                            <Button
                                                type="button"
                                                onClick={addCancellationRule}
                                                size="sm"
                                            >
                                                <Plus className="w-4 h-4 mr-2" />
                                                Add Rule
                                            </Button>
                                        </div>

                                        {cancellationPolicy.rules.length ===
                                        0 ? (
                                            <div className="text-center py-6 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
                                                <p>
                                                    No cancellation rules added
                                                </p>
                                                <p className="text-sm">
                                                    At least one rule is
                                                    required
                                                </p>
                                            </div>
                                        ) : (
                                            <div className="space-y-3">
                                                {cancellationPolicy.rules.map(
                                                    (rule, index) => (
                                                        <div
                                                            key={index}
                                                            className="border border-red-200 rounded-lg p-4 bg-white"
                                                        >
                                                            <div className="flex justify-between items-start mb-3">
                                                                <h5 className="font-medium text-red-800">
                                                                    Rule{" "}
                                                                    {index + 1}
                                                                </h5>
                                                                <Button
                                                                    type="button"
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    onClick={() =>
                                                                        removeCancellationRule(
                                                                            index
                                                                        )
                                                                    }
                                                                    disabled={
                                                                        cancellationPolicy
                                                                            .rules
                                                                            .length ===
                                                                        1
                                                                    }
                                                                >
                                                                    <X className="w-4 h-4" />
                                                                </Button>
                                                            </div>
                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                                <div>
                                                                    <Label className="text-red-700">
                                                                        Rule *
                                                                    </Label>
                                                                    <Input
                                                                        value={
                                                                            rule.rule
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            updateCancellationRule(
                                                                                index,
                                                                                "rule",
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            )
                                                                        }
                                                                        placeholder="e.g., Full refund if cancelled 7 days before"
                                                                        className="border-red-300"
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <Label className="text-red-700">
                                                                        Deduction
                                                                        *
                                                                    </Label>
                                                                    <Input
                                                                        value={
                                                                            rule.deduction
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            updateCancellationRule(
                                                                                index,
                                                                                "deduction",
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            )
                                                                        }
                                                                        placeholder="e.g., 0%, 50%, 100%"
                                                                        className="border-red-300"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    {/* Description Points Section */}
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <h4 className="text-md font-medium text-red-600">
                                                    Description Points *
                                                </h4>
                                                <p className="text-sm text-gray-600">
                                                    Additional important points
                                                    about the policy
                                                </p>
                                            </div>
                                            <Button
                                                type="button"
                                                onClick={addDescriptionPoint}
                                                size="sm"
                                            >
                                                <Plus className="w-4 h-4 mr-2" />
                                                Add Point
                                            </Button>
                                        </div>

                                        {cancellationPolicy.descriptionPoints
                                            .length === 0 ? (
                                            <div className="text-center py-6 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
                                                <p>
                                                    No description points added
                                                </p>
                                                <p className="text-sm">
                                                    At least one point is
                                                    required
                                                </p>
                                            </div>
                                        ) : (
                                            <div className="space-y-3">
                                                {cancellationPolicy.descriptionPoints.map(
                                                    (point, index) => (
                                                        <div
                                                            key={index}
                                                            className="border border-red-200 rounded-lg p-4 bg-white"
                                                        >
                                                            <div className="flex justify-between items-start">
                                                                <div className="flex-1">
                                                                    <Label className="text-red-700">
                                                                        Point{" "}
                                                                        {index +
                                                                            1}{" "}
                                                                        *
                                                                    </Label>
                                                                    <Input
                                                                        value={
                                                                            point
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            updateDescriptionPoint(
                                                                                index,
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            )
                                                                        }
                                                                        placeholder="e.g., Cancellation must be made in writing"
                                                                        className="border-red-300"
                                                                    />
                                                                </div>
                                                                <Button
                                                                    type="button"
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    onClick={() =>
                                                                        removeDescriptionPoint(
                                                                            index
                                                                        )
                                                                    }
                                                                    disabled={
                                                                        cancellationPolicy
                                                                            .descriptionPoints
                                                                            .length ===
                                                                        1
                                                                    }
                                                                    className="ml-3"
                                                                >
                                                                    <X className="w-4 h-4" />
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Other Policies Section */}
                                <div className="space-y-4 pt-6 border-t">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <Label className="text-lg font-medium text-blue-600">
                                                Other Policies
                                            </Label>
                                            <p className="text-sm text-gray-600">
                                                Additional policies (optional)
                                            </p>
                                        </div>
                                        <Button
                                            type="button"
                                            onClick={addOtherPolicy}
                                            size="sm"
                                        >
                                            <Plus className="w-4 h-4 mr-2" />
                                            Add Other Policy
                                        </Button>
                                    </div>
                                    <div className="space-y-4">
                                        {otherPolicies.length === 0 ? (
                                            <div className="text-center py-6 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
                                                <p>No other policies added</p>
                                                <p className="text-sm">
                                                    Optional additional policies
                                                </p>
                                            </div>
                                        ) : (
                                            otherPolicies.map(
                                                (policy, index) => (
                                                    <div
                                                        key={policy.id}
                                                        className="border border-blue-200 p-4 rounded-lg bg-blue-50"
                                                    >
                                                        <div className="flex justify-between items-start mb-4">
                                                            <h4 className="font-medium text-blue-800">
                                                                Other Policy{" "}
                                                                {index + 1}
                                                            </h4>
                                                            <Button
                                                                type="button"
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() =>
                                                                    removeOtherPolicy(
                                                                        index
                                                                    )
                                                                }
                                                            >
                                                                <X className="w-4 h-4" />
                                                            </Button>
                                                        </div>
                                                        <div className="space-y-3">
                                                            <Input
                                                                value={
                                                                    policy.title
                                                                }
                                                                onChange={(e) =>
                                                                    updateOtherPolicy(
                                                                        index,
                                                                        "title",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                placeholder="Policy title"
                                                                className="border-blue-300"
                                                            />
                                                            <Textarea
                                                                value={
                                                                    policy.description
                                                                }
                                                                onChange={(e) =>
                                                                    updateOtherPolicy(
                                                                        index,
                                                                        "description",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                placeholder="Policy description"
                                                                rows={3}
                                                                className="border-blue-300"
                                                            />
                                                        </div>
                                                    </div>
                                                )
                                            )
                                        )}
                                    </div>
                                </div>
                            </TabsContent>

                            {/* Navigation Buttons */}
                            <div className="flex justify-between pt-6 border-t">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={prevStep}
                                    disabled={currentStep === "basic-info"}
                                >
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Previous
                                </Button>

                                {currentStep === "cancellation" ? (
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                                Updating...
                                            </>
                                        ) : (
                                            <>
                                                <Save className="w-4 h-4 mr-2" />
                                                Update Trek
                                            </>
                                        )}
                                    </Button>
                                ) : (
                                    <Button
                                        type="button"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            nextStep();
                                        }}
                                        disabled={!canProceed(currentStep)}
                                    >
                                        Next
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                )}
                            </div>
                        </form>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
};
export default EditTrek;
