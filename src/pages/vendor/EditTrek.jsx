import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { ArrowLeft, Save, X, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import ImageUpload from "@/components/trek/ImageUpload";

const editTrekSchema = z.object({
    name: z.string().min(1, "Trek name is required"),
    destination: z.string().min(1, "Destination is required"),
    description: z
        .string()
        .min(10, "Description must be at least 10 characters"),
    duration: z.string().min(1, "Duration is required"),
    price: z.string().min(1, "Price is required"),
    difficulty: z.enum(["easy", "moderate", "hard"]),
    slots: z.object({
        total: z.number().min(1, "Must have at least 1 slot"),
        booked: z.number().min(0, "Booked slots cannot be negative"),
    }),
    startDate: z.string().min(1, "Start date is required"),
});

const EditTrek = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [images, setImages] = useState([]);
    const [itinerary, setItinerary] = useState([]);
    const [inclusions, setInclusions] = useState([]);
    const [exclusions, setExclusions] = useState([]);

    // Helper function to safely parse JSON arrays
    const safeParseArray = (data) => {
        if (!data) return [];
        if (Array.isArray(data)) return data;
        if (typeof data === "string") {
            try {
                const parsed = JSON.parse(data);
                return Array.isArray(parsed) ? parsed : [];
            } catch {
                return [];
            }
        }
        return [];
    };

    const form = useForm({
        resolver: zodResolver(editTrekSchema),
        defaultValues: {
            name: "",
            destination: "",
            description: "",
            duration: "",
            price: "",
            difficulty: "easy",
            slots: {
                total: 10,
                booked: 0,
            },
            startDate: "",
        },
    });

    useEffect(() => {
        if (!id) {
            toast.error("Invalid trek ID");
            navigate("/vendor/treks");
            return;
        }

        // Load trek data from localStorage
        const savedTreks = localStorage.getItem("vendorTreks");
        if (savedTreks) {
            const treks = JSON.parse(savedTreks);
            const trek = treks.find((t) => t.id.toString() === id);

            if (trek) {
                console.log("Found trek to edit:", trek);

                // Populate form with trek data
                form.reset({
                    name: trek.name || "",
                    destination:
                        trek.destination_city || trek.destination || "",
                    description: trek.description || "",
                    duration: trek.duration_days
                        ? `${trek.duration_days}D`
                        : trek.duration || "",
                    price:
                        trek.price_per_slot?.toString() ||
                        trek.price?.toString() ||
                        trek.base_price?.toString() ||
                        "",
                    difficulty:
                        trek.difficulty_level || trek.difficulty || "easy",
                    slots: {
                        total:
                            trek.available_slots ||
                            trek.slots?.total ||
                            trek.max_participants ||
                            10,
                        booked: trek.slots?.booked || 0,
                    },
                    startDate:
                        trek.departure_date ||
                        trek.start_date ||
                        trek.startDate ||
                        "",
                });

                // Set additional data
                setImages(trek.gallery_images || trek.images || []);
                setItinerary(safeParseArray(trek.itinerary));
                setInclusions(safeParseArray(trek.inclusions));
                setExclusions(safeParseArray(trek.exclusions));
            } else {
                toast.error("Trek not found");
                navigate("/vendor/treks");
            }
        } else {
            toast.error("No treks found");
            navigate("/vendor/treks");
        }

        setLoading(false);
    }, [id, form, navigate]);

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

    const onSubmit = async (data) => {
        try {
            console.log("Updating trek with data:", data);

            const savedTreks = localStorage.getItem("vendorTreks");
            if (!savedTreks) {
                toast.error("No treks found");
                return;
            }

            const treks = JSON.parse(savedTreks);
            const trekIndex = treks.findIndex((t) => t.id.toString() === id);

            if (trekIndex === -1) {
                toast.error("Trek not found");
                return;
            }

            // Update the trek
            const updatedTrek = {
                ...treks[trekIndex],
                name: data.name,
                destination_city: data.destination,
                destination: data.destination,
                description: data.description,
                duration: data.duration,
                price: data.price,
                price_per_slot: parseFloat(data.price),
                difficulty_level: data.difficulty,
                difficulty: data.difficulty,
                available_slots: data.slots.total,
                slots: data.slots,
                departure_date: data.startDate,
                start_date: data.startDate,
                startDate: data.startDate,
                gallery_images: images,
                images: images,
                itinerary: itinerary,
                inclusions: inclusions,
                exclusions: exclusions,
                updated_at: new Date().toISOString(),
            };

            treks[trekIndex] = updatedTrek;
            localStorage.setItem("vendorTreks", JSON.stringify(treks));

            toast.success("Trek updated successfully!");
            navigate("/vendor/treks");
        } catch (error) {
            console.error("Error updating trek:", error);
            toast.error("Failed to update trek. Please try again.");
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
                    <p className="mt-4">Loading trek details...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold">Edit Trek</h1>
                    <p className="text-gray-600">Update your trek details</p>
                </div>
                <Button
                    variant="outline"
                    onClick={() => navigate("/vendor/treks")}
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Treks
                </Button>
            </div>

            {/* Form */}
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                >
                    <Card>
                        <CardHeader>
                            <CardTitle>Basic Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Trek Name *</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter trek name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="destination"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Destination *</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter destination"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description *</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Enter trek description..."
                                                className="min-h-[120px]"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="duration"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Duration *</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="e.g., 3D/2N"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="price"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Price (₹) *</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter price"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="difficulty"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Difficulty *</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                value={field.value}
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
                                    name="startDate"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Start Date *</FormLabel>
                                            <FormControl>
                                                <Input type="date" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="slots.total"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Total Slots *</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                min="1"
                                                {...field}
                                                onChange={(e) =>
                                                    field.onChange(
                                                        parseInt(
                                                            e.target.value
                                                        ) || 1
                                                    )
                                                }
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Trek Images</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ImageUpload images={images} onChange={setImages} />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Inclusions & Exclusions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <label className="text-sm font-medium mb-2 block">
                                    Inclusions
                                </label>
                                {inclusions.length === 0 ? (
                                    <p className="text-gray-500 mb-4">
                                        No inclusions added.
                                    </p>
                                ) : (
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {inclusions.map((item, index) => (
                                            <Badge
                                                key={index}
                                                variant="secondary"
                                                className="px-3 py-1"
                                            >
                                                {item}
                                                <X
                                                    className="w-3 h-3 ml-2 cursor-pointer"
                                                    onClick={() =>
                                                        removeInclusion(index)
                                                    }
                                                />
                                            </Badge>
                                        ))}
                                    </div>
                                )}
                                <div className="flex gap-2">
                                    <Input
                                        placeholder="Add inclusion (press Enter)"
                                        onKeyPress={(e) => {
                                            if (e.key === "Enter") {
                                                e.preventDefault();
                                                const input = e.target;
                                                addInclusion(input.value);
                                                input.value = "";
                                            }
                                        }}
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => {
                                            const input =
                                                document.querySelector(
                                                    'input[placeholder="Add inclusion (press Enter)"]'
                                                );
                                            if (input?.value) {
                                                addInclusion(input.value);
                                                input.value = "";
                                            }
                                        }}
                                    >
                                        <Plus className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-medium mb-2 block">
                                    Exclusions
                                </label>
                                {exclusions.length === 0 ? (
                                    <p className="text-gray-500 mb-4">
                                        No exclusions added.
                                    </p>
                                ) : (
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {exclusions.map((item, index) => (
                                            <Badge
                                                key={index}
                                                variant="secondary"
                                                className="px-3 py-1"
                                            >
                                                {item}
                                                <X
                                                    className="w-3 h-3 ml-2 cursor-pointer"
                                                    onClick={() =>
                                                        removeExclusion(index)
                                                    }
                                                />
                                            </Badge>
                                        ))}
                                    </div>
                                )}
                                <div className="flex gap-2">
                                    <Input
                                        placeholder="Add exclusion (press Enter)"
                                        onKeyPress={(e) => {
                                            if (e.key === "Enter") {
                                                e.preventDefault();
                                                const input = e.target;
                                                addExclusion(input.value);
                                                input.value = "";
                                            }
                                        }}
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => {
                                            const input =
                                                document.querySelector(
                                                    'input[placeholder="Add exclusion (press Enter)"]'
                                                );
                                            if (input?.value) {
                                                addExclusion(input.value);
                                                input.value = "";
                                            }
                                        }}
                                    >
                                        <Plus className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <Button
                            type="submit"
                            className="bg-green-600 hover:bg-green-700"
                        >
                            <Save className="w-4 h-4 mr-2" />
                            Save Changes
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default EditTrek;
