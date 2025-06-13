import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import {
    ArrowLeft,
    ArrowRight,
    Check,
    Plus,
    X,
    MapPin,
    Calendar,
    Clock,
    AlertCircle,
    Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import ImageUpload from "@/components/trek/ImageUpload";

const createTrekSchema = z.object({
    name: z.string().min(1, "Trek name is required"),
    from_city: z.string().min(1, "From city is required"),
    destination_city: z.string().min(1, "Destination city is required"),
    description: z
        .string()
        .min(10, "Description must be at least 10 characters"),
    trek_type: z.enum([
        "himalayan",
        "western_ghats",
        "adventure",
        "spiritual",
        "wildlife",
    ]),
    duration_days: z.number().min(1, "Duration must be at least 1 day"),
    duration_nights: z.number().min(0, "Nights cannot be negative"),
    price_per_slot: z.number().min(1, "Price must be greater than 0"),
    difficulty_level: z.enum(["easy", "moderate", "hard"]),
    available_slots: z.number().min(1, "Must have at least 1 available slot"),
    departure_date: z.string().min(1, "Departure date is required"),
    end_date: z.string().min(1, "End date is required"),
    meeting_city: z.string().min(1, "Meeting city is required"),
    meeting_location: z.string().min(1, "Meeting location is required"),
    meeting_time: z.string().min(1, "Meeting time is required"),
});

const CreateTrek = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [stages, setStages] = useState([]);
    const [stageCount, setStageCount] = useState(1);
    const [itinerary, setItinerary] = useState([]);
    const [inclusions, setInclusions] = useState([]);
    const [exclusions, setExclusions] = useState([]);
    const [pickupPoints, setPickupPoints] = useState([]);
    const [accommodations, setAccommodations] = useState([]);
    const [galleryImages, setGalleryImages] = useState([]);
    const [policies, setPolicies] = useState([]);
    const [cities, setCities] = useState([
        "Mumbai",
        "Delhi",
        "Bangalore",
        "Pune",
        "Chennai",
    ]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [validationErrors, setValidationErrors] = useState([]);

    const form = useForm({
        resolver: zodResolver(createTrekSchema),
        defaultValues: {
            name: "",
            from_city: "",
            destination_city: "",
            description: "",
            trek_type: "himalayan",
            duration_days: 1,
            duration_nights: 0,
            price_per_slot: 0,
            difficulty_level: "easy",
            available_slots: 10,
            departure_date: "",
            end_date: "",
            meeting_city: "",
            meeting_location: "",
            meeting_time: "",
        },
    });

    const watchedDays = form.watch("duration_days");
    const watchedNights = form.watch("duration_nights");

    // Update itinerary when days change
    useEffect(() => {
        if (watchedDays && watchedDays > 0) {
            const newItinerary = [];
            for (let i = 1; i <= watchedDays; i++) {
                const existingDay = itinerary.find((day) => day.day === i);
                newItinerary.push({
                    day: i,
                    activities: existingDay?.activities || [
                        { id: `day${i}-activity1`, activity: "" },
                    ],
                });
            }
            setItinerary(newItinerary);
        }
    }, [watchedDays]);

    // Update accommodations when nights change
    useEffect(() => {
        if (watchedNights && watchedNights > 0) {
            const newAccommodations = [];
            for (let i = 1; i <= watchedNights; i++) {
                const existing = accommodations.find((acc) => acc.night === i);
                newAccommodations.push({
                    night: i,
                    type: existing?.type || "",
                    name: existing?.name || "",
                    location: existing?.location || "",
                    description: existing?.description || "",
                    images: existing?.images || [],
                });
            }
            setAccommodations(newAccommodations);
        }
    }, [watchedNights]);

    const steps = [
        { number: 1, title: "Basic Info" },
        { number: 2, title: "Trek Type" },
        { number: 3, title: "Duration" },
        { number: 4, title: "Stages/Route" },
        { number: 5, title: "Pricing" },
        { number: 6, title: "Dates" },
        { number: 7, title: "Itinerary" },
        { number: 8, title: "Inclusions" },
        { number: 9, title: "Meeting" },
        { number: 10, title: "Stay" },
        { number: 11, title: "Gallery" },
        { number: 12, title: "Policy" },
    ];

    const addStages = () => {
        const newStages = [];
        for (let i = 1; i <= stageCount; i++) {
            const existing = stages.find((stage) => stage.id === `stage-${i}`);
            newStages.push({
                id: `stage-${i}`,
                name: existing?.name || "",
                distance: existing?.distance || "",
                duration: existing?.duration || "",
                description: existing?.description || "",
            });
        }
        setStages(newStages);
    };

    const updateStage = (stageId, field, value) => {
        setStages(
            stages.map((stage) =>
                stage.id === stageId ? { ...stage, [field]: value } : stage
            )
        );
    };

    const addActivity = (dayIndex) => {
        const newItinerary = [...itinerary];
        const activityId = `day${dayIndex + 1}-activity${
            newItinerary[dayIndex].activities.length + 1
        }`;
        newItinerary[dayIndex].activities.push({
            id: activityId,
            activity: "",
        });
        setItinerary(newItinerary);
    };

    const updateActivity = (dayIndex, activityIndex, value) => {
        const newItinerary = [...itinerary];
        newItinerary[dayIndex].activities[activityIndex].activity = value;
        setItinerary(newItinerary);
    };

    const removeActivity = (dayIndex, activityIndex) => {
        const newItinerary = [...itinerary];
        if (newItinerary[dayIndex].activities.length > 1) {
            newItinerary[dayIndex].activities.splice(activityIndex, 1);
            setItinerary(newItinerary);
        }
    };

    const addInclusion = (item) => {
        if (item.trim() && !inclusions.includes(item.trim())) {
            setInclusions([...inclusions, item.trim()]);
        }
    };

    const removeInclusion = (index) => {
        setInclusions(inclusions.filter((_, i) => i !== index));
    };

    const addExclusion = (item) => {
        if (item.trim() && !exclusions.includes(item.trim())) {
            setExclusions([...exclusions, item.trim()]);
        }
    };

    const removeExclusion = (index) => {
        setExclusions(exclusions.filter((_, i) => i !== index));
    };

    const addPickupPoint = () => {
        const newPickupPoint = {
            id: `pickup-${Date.now()}`,
            city: "",
            location: "",
            time: "",
        };
        setPickupPoints([...pickupPoints, newPickupPoint]);
    };

    const updatePickupPoint = (id, field, value) => {
        setPickupPoints(
            pickupPoints.map((point) =>
                point.id === id ? { ...point, [field]: value } : point
            )
        );
    };

    const removePickupPoint = (id) => {
        setPickupPoints(pickupPoints.filter((point) => point.id !== id));
    };

    const updateAccommodation = (night, field, value) => {
        setAccommodations(
            accommodations.map((acc) =>
                acc.night === night ? { ...acc, [field]: value } : acc
            )
        );
    };

    const addPolicy = () => {
        const newPolicy = {
            id: `policy-${Date.now()}`,
            policy: "",
        };
        setPolicies([...policies, newPolicy]);
    };

    const updatePolicy = (id, value) => {
        setPolicies(
            policies.map((policy) =>
                policy.id === id ? { ...policy, policy: value } : policy
            )
        );
    };

    const removePolicy = (id) => {
        setPolicies(policies.filter((policy) => policy.id !== id));
    };

    const validateCurrentStep = () => {
        setValidationErrors([]);
        let errors = [];

        switch (currentStep) {
            case 1: // Basic Info
                if (!form.getValues("name"))
                    errors.push("Trek name is required.");
                if (!form.getValues("from_city"))
                    errors.push("From city is required.");
                if (!form.getValues("destination_city"))
                    errors.push("Destination city is required.");
                if (
                    !form.getValues("description") ||
                    form.getValues("description").length < 10
                )
                    errors.push("Description must be at least 10 characters.");
                break;
            case 2: // Trek Type
                if (!form.getValues("trek_type"))
                    errors.push("Trek type is required.");
                break;
            case 3: // Duration
                if (
                    !form.getValues("duration_days") ||
                    form.getValues("duration_days") < 1
                )
                    errors.push("Duration days must be at least 1.");
                if (form.getValues("duration_nights") < 0)
                    errors.push("Duration nights cannot be negative.");
                break;
            case 4: // Stages/Route
                if (stages.length === 0)
                    errors.push("At least one stage is required.");
                if (
                    stages.some(
                        (stage) =>
                            !stage.name ||
                            !stage.distance ||
                            !stage.duration ||
                            !stage.description
                    )
                ) {
                    errors.push("All stage fields must be filled.");
                }
                break;
            case 5: // Pricing
                if (
                    !form.getValues("price_per_slot") ||
                    form.getValues("price_per_slot") < 1
                )
                    errors.push("Price per slot must be greater than 0.");
                if (!form.getValues("difficulty_level"))
                    errors.push("Difficulty level is required.");
                if (
                    !form.getValues("available_slots") ||
                    form.getValues("available_slots") < 1
                )
                    errors.push("Available slots must be at least 1.");
                break;
            case 6: // Dates
                if (!form.getValues("departure_date"))
                    errors.push("Departure date is required.");
                if (!form.getValues("end_date"))
                    errors.push("End date is required.");
                if (
                    form.getValues("departure_date") &&
                    form.getValues("end_date") &&
                    new Date(form.getValues("departure_date")) >
                        new Date(form.getValues("end_date"))
                ) {
                    errors.push("End date cannot be before departure date.");
                }
                break;
            case 7: // Itinerary
                if (
                    itinerary.some((day) =>
                        day.activities.some((activity) => !activity.activity)
                    )
                ) {
                    errors.push("All itinerary activities must be filled.");
                }
                break;
            case 8: // Inclusions
                if (inclusions.length === 0)
                    errors.push("At least one inclusion is recommended.");
                break;
            case 9: // Meeting
                if (!form.getValues("meeting_city"))
                    errors.push("Meeting city is required.");
                if (!form.getValues("meeting_location"))
                    errors.push("Meeting location is required.");
                if (!form.getValues("meeting_time"))
                    errors.push("Meeting time is required.");
                break;
            case 10: // Stay
                if (accommodations.length === 0)
                    errors.push("At least one accommodation is recommended.");
                if (
                    accommodations.some(
                        (acc) => !acc.type || !acc.name || !acc.location
                    )
                ) {
                    errors.push(
                        "Accommodation type, name, and location are required."
                    );
                }
                break;
            case 11: // Gallery
                if (galleryImages.length === 0)
                    errors.push("At least one gallery image is required.");
                break;
            case 12: // Policy
                if (policies.length === 0)
                    errors.push("At least one policy is recommended.");
                if (policies.some((policy) => !policy.policy)) {
                    errors.push("All policy fields must be filled.");
                }
                break;
        }
        setValidationErrors(errors);
        return errors.length === 0;
    };

    const nextStep = async () => {
        if (!validateCurrentStep()) {
            toast.error("Validation Error", {
                description: validationErrors.join(", "),
            });
            return;
        }

        if (currentStep < steps.length) {
            if (
                currentStep === 1 &&
                form.getValues("departure_date") &&
                form.getValues("end_date")
            ) {
                const departure = new Date(form.getValues("departure_date"));
                const end = new Date(form.getValues("end_date"));
                const diffTime = Math.abs(end.getTime() - departure.getTime());
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                form.setValue("duration_days", diffDays + 1);
                form.setValue("duration_nights", diffDays);
            }
            setCurrentStep(currentStep + 1);
        } else {
            // Final step, submit the form
            await form.handleSubmit(onSubmit)();
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            // Here you would integrate with your Supabase client to save the trek data
            console.log("Submitting Trek Data:", data);
            console.log("Stages:", stages);
            console.log("Itinerary:", itinerary);
            console.log("Inclusions:", inclusions);
            console.log("Exclusions:", exclusions);
            console.log("Pickup Points:", pickupPoints);
            console.log("Accommodations:", accommodations);
            console.log("Gallery Images:", galleryImages);
            console.log("Policies:", policies);

            // Example of saving to Supabase (replace with actual Supabase logic)
            // const { data: newTrek, error } = await supabase.from('treks').insert([{
            //   ...data,
            //   stages,
            //   itinerary,
            //   inclusions,
            //   exclusions,
            //   pickup_points: pickupPoints,
            //   accommodations,
            //   gallery_images: galleryImages,
            //   policies,
            //   vendor_id: user.id, // Assuming vendor_id is from auth context
            // }]);

            // if (error) {
            //   throw error;
            // }

            toast.success("Trek created successfully!");
            navigate("/vendor/treks"); // Navigate to treks listing page
        } catch (error) {
            console.error("Failed to create trek:", error);
            toast.error("Error creating trek", {
                description: error.message || "An unexpected error occurred.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div>
                        <h2 className="text-2xl font-bold mb-4">
                            Basic Information
                        </h2>
                        <div className="grid gap-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Trek Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="E.g., Everest Base Camp Trek"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="from_city"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>From City</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a city" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {cities.map((city) => (
                                                    <SelectItem
                                                        key={city}
                                                        value={city}
                                                    >
                                                        {city}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="destination_city"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Destination City</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a city" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {cities.map((city) => (
                                                    <SelectItem
                                                        key={city}
                                                        value={city}
                                                    >
                                                        {city}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Describe the trek"
                                                {...field}
                                                rows={5}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Trek Type</h2>
                        <FormField
                            control={form.control}
                            name="trek_type"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Trek Type</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select trek type" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="himalayan">
                                                Himalayan
                                            </SelectItem>
                                            <SelectItem value="western_ghats">
                                                Western Ghats
                                            </SelectItem>
                                            <SelectItem value="adventure">
                                                Adventure
                                            </SelectItem>
                                            <SelectItem value="spiritual">
                                                Spiritual
                                            </SelectItem>
                                            <SelectItem value="wildlife">
                                                Wildlife
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                );
            case 3:
                return (
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Duration</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="duration_days"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Duration (Days)</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="Days"
                                                {...field}
                                                onChange={(e) =>
                                                    field.onChange(
                                                        parseInt(
                                                            e.target.value
                                                        ) || 0
                                                    )
                                                }
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="duration_nights"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Duration (Nights)</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="Nights"
                                                {...field}
                                                onChange={(e) =>
                                                    field.onChange(
                                                        parseInt(
                                                            e.target.value
                                                        ) || 0
                                                    )
                                                }
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div>
                        <h2 className="text-2xl font-bold mb-4">
                            Stages/Route
                        </h2>
                        <p className="text-sm text-muted-foreground mb-4">
                            Define the key stages or points along the trek
                            route.
                        </p>
                        <div className="flex justify-between items-center mb-4">
                            <Label htmlFor="stageCount">
                                Number of Stages:
                            </Label>
                            <Input
                                id="stageCount"
                                type="number"
                                value={stageCount}
                                onChange={(e) =>
                                    setStageCount(parseInt(e.target.value) || 0)
                                }
                                className="w-24"
                            />
                            <Button onClick={addStages}>
                                Generate Stage Fields
                            </Button>
                        </div>
                        {stages.map((stage, index) => (
                            <Card key={stage.id} className="mb-4">
                                <CardHeader>
                                    <CardTitle>Stage {index + 1}</CardTitle>
                                </CardHeader>
                                <CardContent className="grid gap-4">
                                    <div>
                                        <Label htmlFor={`stage-name-${index}`}>
                                            Name
                                        </Label>
                                        <Input
                                            id={`stage-name-${index}`}
                                            value={stage.name}
                                            onChange={(e) =>
                                                updateStage(
                                                    stage.id,
                                                    "name",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="e.g., Base Camp"
                                        />
                                    </div>
                                    <div>
                                        <Label
                                            htmlFor={`stage-distance-${index}`}
                                        >
                                            Distance (KM)
                                        </Label>
                                        <Input
                                            id={`stage-distance-${index}`}
                                            value={stage.distance}
                                            onChange={(e) =>
                                                updateStage(
                                                    stage.id,
                                                    "distance",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="e.g., 10 km"
                                        />
                                    </div>
                                    <div>
                                        <Label
                                            htmlFor={`stage-duration-${index}`}
                                        >
                                            Duration (Hours)
                                        </Label>
                                        <Input
                                            id={`stage-duration-${index}`}
                                            value={stage.duration}
                                            onChange={(e) =>
                                                updateStage(
                                                    stage.id,
                                                    "duration",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="e.g., 5 hours"
                                        />
                                    </div>
                                    <div>
                                        <Label
                                            htmlFor={`stage-description-${index}`}
                                        >
                                            Description
                                        </Label>
                                        <Textarea
                                            id={`stage-description-${index}`}
                                            value={stage.description}
                                            onChange={(e) =>
                                                updateStage(
                                                    stage.id,
                                                    "description",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Brief description of this stage"
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                );
            case 5:
                return (
                    <div>
                        <h2 className="text-2xl font-bold mb-4">
                            Pricing & Difficulty
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="price_per_slot"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Price Per Slot (₹)
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="Price"
                                                {...field}
                                                onChange={(e) =>
                                                    field.onChange(
                                                        parseFloat(
                                                            e.target.value
                                                        ) || 0
                                                    )
                                                }
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="difficulty_level"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Difficulty Level</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select difficulty" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="easy">
                                                    Easy
                                                </SelectItem>
                                                <SelectItem value="moderate">
                                                    Moderate
                                                </SelectItem>
                                                <SelectItem value="hard">
                                                    Hard
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="available_slots"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Available Slots</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="Number of slots"
                                                {...field}
                                                onChange={(e) =>
                                                    field.onChange(
                                                        parseInt(
                                                            e.target.value
                                                        ) || 0
                                                    )
                                                }
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                );
            case 6:
                return (
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Dates</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="departure_date"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Departure Date</FormLabel>
                                        <FormControl>
                                            <Input type="date" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="end_date"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>End Date</FormLabel>
                                        <FormControl>
                                            <Input type="date" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                );
            case 7:
                return (
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Itinerary</h2>
                        <p className="text-sm text-muted-foreground mb-4">
                            Outline the activities for each day of the trek.
                        </p>
                        {itinerary.map((dayData, dayIndex) => (
                            <Card key={dayData.day} className="mb-4">
                                <CardHeader>
                                    <CardTitle>Day {dayData.day}</CardTitle>
                                </CardHeader>
                                <CardContent className="grid gap-4">
                                    {dayData.activities.map(
                                        (activity, activityIndex) => (
                                            <div
                                                key={activity.id}
                                                className="flex items-center space-x-2"
                                            >
                                                <Input
                                                    value={activity.activity}
                                                    onChange={(e) =>
                                                        updateActivity(
                                                            dayIndex,
                                                            activityIndex,
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder={`Activity for Day ${dayData.day}`}
                                                    className="flex-1"
                                                />
                                                {dayData.activities.length >
                                                    1 && (
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        onClick={() =>
                                                            removeActivity(
                                                                dayIndex,
                                                                activityIndex
                                                            )
                                                        }
                                                    >
                                                        <X className="h-4 w-4" />
                                                    </Button>
                                                )}
                                            </div>
                                        )
                                    )}
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => addActivity(dayIndex)}
                                    >
                                        <Plus className="h-4 w-4 mr-2" /> Add
                                        Activity
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                );
            case 8:
                return (
                    <div>
                        <h2 className="text-2xl font-bold mb-4">
                            Inclusions & Exclusions
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-lg font-semibold mb-2">
                                    Inclusions
                                </h3>
                                <Input
                                    placeholder="Add inclusion (e.g., Meals, Accommodation)"
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            e.preventDefault();
                                            addInclusion(e.target.value);
                                            e.target.value = "";
                                        }
                                    }}
                                />
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {inclusions.map((item, index) => (
                                        <Badge
                                            key={index}
                                            className="flex items-center gap-1"
                                        >
                                            {item}
                                            <X
                                                className="h-3 w-3 cursor-pointer"
                                                onClick={() =>
                                                    removeInclusion(index)
                                                }
                                            />
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-2">
                                    Exclusions
                                </h3>
                                <Input
                                    placeholder="Add exclusion (e.g., Personal Expenses)"
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            e.preventDefault();
                                            addExclusion(e.target.value);
                                            e.target.value = "";
                                        }
                                    }}
                                />
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {exclusions.map((item, index) => (
                                        <Badge
                                            key={index}
                                            variant="secondary"
                                            className="flex items-center gap-1"
                                        >
                                            {item}
                                            <X
                                                className="h-3 w-3 cursor-pointer"
                                                onClick={() =>
                                                    removeExclusion(index)
                                                }
                                            />
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 9:
                return (
                    <div>
                        <h2 className="text-2xl font-bold mb-4">
                            Meeting Information
                        </h2>
                        <p className="text-sm text-muted-foreground mb-4">
                            Specify where and when participants will meet for
                            the trek.
                        </p>
                        {pickupPoints.map((point, index) => (
                            <Card key={point.id} className="mb-4">
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <CardTitle>
                                        Pickup Point {index + 1}
                                    </CardTitle>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                            removePickupPoint(point.id)
                                        }
                                    >
                                        <Trash2 className="h-4 w-4 mr-2" />{" "}
                                        Remove
                                    </Button>
                                </CardHeader>
                                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <Label
                                            htmlFor={`pickup-city-${point.id}`}
                                        >
                                            City
                                        </Label>
                                        <Select
                                            onValueChange={(value) =>
                                                updatePickupPoint(
                                                    point.id,
                                                    "city",
                                                    value
                                                )
                                            }
                                            defaultValue={point.city}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a city" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {cities.map((city) => (
                                                    <SelectItem
                                                        key={city}
                                                        value={city}
                                                    >
                                                        {city}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <Label
                                            htmlFor={`pickup-location-${point.id}`}
                                        >
                                            Location
                                        </Label>
                                        <Input
                                            id={`pickup-location-${point.id}`}
                                            value={point.location}
                                            onChange={(e) =>
                                                updatePickupPoint(
                                                    point.id,
                                                    "location",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="e.g., Pune Railway Station"
                                        />
                                    </div>
                                    <div>
                                        <Label
                                            htmlFor={`pickup-time-${point.id}`}
                                        >
                                            Time
                                        </Label>
                                        <Input
                                            id={`pickup-time-${point.id}`}
                                            type="time"
                                            value={point.time}
                                            onChange={(e) =>
                                                updatePickupPoint(
                                                    point.id,
                                                    "time",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                        <Button onClick={addPickupPoint} className="mt-4">
                            <Plus className="h-4 w-4 mr-2" /> Add Pickup Point
                        </Button>
                    </div>
                );
            case 10:
                return (
                    <div>
                        <h2 className="text-2xl font-bold mb-4">
                            Accommodation & Stay
                        </h2>
                        <p className="text-sm text-muted-foreground mb-4">
                            Detail the overnight stays during the trek.
                        </p>
                        {Array.from({ length: watchedNights || 0 }).map(
                            (_, nightIndex) => {
                                const accommodation =
                                    accommodations[nightIndex] || {};
                                return (
                                    <Card key={nightIndex} className="mb-4">
                                        <CardHeader>
                                            <CardTitle>
                                                Night {nightIndex + 1}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="grid gap-4">
                                            <div>
                                                <Label
                                                    htmlFor={`accommodation-type-${nightIndex}`}
                                                >
                                                    Type
                                                </Label>
                                                <Input
                                                    id={`accommodation-type-${nightIndex}`}
                                                    value={
                                                        accommodation.type || ""
                                                    }
                                                    onChange={(e) =>
                                                        updateAccommodation(
                                                            nightIndex + 1,
                                                            "type",
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="e.g., Tent, Guesthouse"
                                                />
                                            </div>
                                            <div>
                                                <Label
                                                    htmlFor={`accommodation-name-${nightIndex}`}
                                                >
                                                    Name
                                                </Label>
                                                <Input
                                                    id={`accommodation-name-${nightIndex}`}
                                                    value={
                                                        accommodation.name || ""
                                                    }
                                                    onChange={(e) =>
                                                        updateAccommodation(
                                                            nightIndex + 1,
                                                            "name",
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="e.g., Camp XYZ, Mountain Lodge"
                                                />
                                            </div>
                                            <div>
                                                <Label
                                                    htmlFor={`accommodation-location-${nightIndex}`}
                                                >
                                                    Location
                                                </Label>
                                                <Input
                                                    id={`accommodation-location-${nightIndex}`}
                                                    value={
                                                        accommodation.location ||
                                                        ""
                                                    }
                                                    onChange={(e) =>
                                                        updateAccommodation(
                                                            nightIndex + 1,
                                                            "location",
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="e.g., Near ABC Peak"
                                                />
                                            </div>
                                            <div>
                                                <Label
                                                    htmlFor={`accommodation-description-${nightIndex}`}
                                                >
                                                    Description
                                                </Label>
                                                <Textarea
                                                    id={`accommodation-description-${nightIndex}`}
                                                    value={
                                                        accommodation.description ||
                                                        ""
                                                    }
                                                    onChange={(e) =>
                                                        updateAccommodation(
                                                            nightIndex + 1,
                                                            "description",
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="Brief description of the accommodation"
                                                />
                                            </div>
                                            <div>
                                                <ImageUpload
                                                    images={
                                                        accommodation.images ||
                                                        []
                                                    }
                                                    onChange={(newImages) =>
                                                        updateAccommodation(
                                                            nightIndex + 1,
                                                            "images",
                                                            newImages
                                                        )
                                                    }
                                                />
                                            </div>
                                        </CardContent>
                                    </Card>
                                );
                            }
                        )}
                    </div>
                );
            case 11:
                return (
                    <div>
                        <h2 className="text-2xl font-bold mb-4">
                            Trek Gallery
                        </h2>
                        <p className="text-sm text-muted-foreground mb-4">
                            Upload inspiring images for your trek.
                        </p>
                        <ImageUpload
                            images={galleryImages}
                            onChange={setGalleryImages}
                        />
                    </div>
                );
            case 12:
                return (
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Policies</h2>
                        <p className="text-sm text-muted-foreground mb-4">
                            Define important policies for participants (e.g.,
                            cancellation, refund).
                        </p>
                        {policies.map((policy, index) => (
                            <div
                                key={policy.id}
                                className="flex items-center space-x-2 mb-2"
                            >
                                <Textarea
                                    value={policy.policy}
                                    onChange={(e) =>
                                        updatePolicy(policy.id, e.target.value)
                                    }
                                    placeholder={`Policy ${index + 1}`}
                                    rows={3}
                                    className="flex-1"
                                />
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => removePolicy(policy.id)}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                        <Button onClick={addPolicy} className="mt-4">
                            <Plus className="h-4 w-4 mr-2" /> Add Policy
                        </Button>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold">Create New Trek</h1>
                    <p className="text-gray-600">
                        Step {currentStep} of {steps.length}
                    </p>
                </div>
                <Button
                    variant="outline"
                    onClick={() => navigate("/vendor/treks")}
                >
                    Back to Treks
                </Button>
            </div>

            {/* Progress Steps */}
            <div className="mb-8">
                <div className="flex flex-wrap gap-2">
                    {steps.map((step) => (
                        <Button
                            key={step.number}
                            variant={
                                currentStep === step.number
                                    ? "default"
                                    : currentStep > step.number
                                    ? "secondary"
                                    : "outline"
                            }
                            size="sm"
                            className={`text-xs ${
                                currentStep === step.number
                                    ? "bg-blue-500 text-white"
                                    : currentStep > step.number
                                    ? "bg-green-500 text-white"
                                    : "text-gray-500"
                            }`}
                            onClick={() => setCurrentStep(step.number)}
                        >
                            {step.number}. {step.title}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Validation Errors */}
            {validationErrors.length > 0 && (
                <Alert variant="destructive" className="mb-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                        <h4 className="font-medium">
                            Please fix the following issues:
                        </h4>
                        <ul className="list-disc pl-5 mt-2">
                            {validationErrors.map((error, index) => (
                                <li key={index}>{error}</li>
                            ))}
                        </ul>
                    </AlertDescription>
                </Alert>
            )}

            {/* Form Content */}
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                >
                    <Card>
                        <CardContent className="pt-6 min-h-[400px]">
                            {renderStepContent()}
                        </CardContent>
                    </Card>

                    {/* Navigation Buttons */}
                    <div className="flex justify-between">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={prevStep}
                            disabled={currentStep === 1 || isSubmitting}
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Previous
                        </Button>

                        {currentStep < 12 ? (
                            <Button
                                type="button"
                                onClick={nextStep}
                                className="bg-teal-600 hover:bg-teal-700 text-white"
                                disabled={isSubmitting}
                            >
                                Next
                                <ArrowRight className="h-4 w-4 ml-2" />
                            </Button>
                        ) : (
                            <Button
                                type="submit"
                                className="bg-green-600 hover:bg-green-700"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                        Submitting...
                                    </>
                                ) : (
                                    <>
                                        <Check className="h-4 w-4 mr-2" />
                                        Save Trek & Send for Approval
                                    </>
                                )}
                            </Button>
                        )}
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default CreateTrek;
