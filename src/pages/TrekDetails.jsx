import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    MapPin,
    Calendar,
    Users,
    Star,
    Clock,
    Shield,
    Mountain,
    Camera,
    ArrowLeft,
    Heart,
    Share2,
    CheckCircle,
    XCircle,
} from "lucide-react";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const TrekDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { toast } = useToast();

    const [trek, setTrek] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            fetchTrekDetails();
        }
    }, [id]);

    const fetchTrekDetails = async () => {
        try {
            const { data, error } = await supabase
                .from("treks")
                .select(
                    `
          *,
          location:locations!treks_location_id_fkey(name, state),
          category:trek_categories!treks_category_id_fkey(name),
          trek_dates(*)
        `
                )
                .eq("id", parseInt(id))
                .eq("is_active", true)
                .single();

            if (error) throw error;

            let vendorData = null;
            if (data.vendor_id) {
                const { data: vendor } = await supabase
                    .from("vendors")
                    .select("company_name, contact_phone")
                    .eq("id", data.vendor_id)
                    .single();
                vendorData = vendor;
            }

            const transformedTrek = {
                ...data,
                location: data.location
                    ? {
                          name: data.location.name || "",
                          state: data.location.state || "",
                      }
                    : { name: "", state: "" },
                category: data.category
                    ? {
                          name: data.category.name || "",
                      }
                    : { name: "" },
                vendor: vendorData
                    ? {
                          company_name: vendorData.company_name || "",
                          contact_phone: vendorData.contact_phone || "",
                      }
                    : null,
            };

            setTrek(transformedTrek);
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to fetch trek details",
                variant: "destructive",
            });
            navigate("/treks");
        } finally {
            setLoading(false);
        }
    };

    const handleBookNow = () => {
        if (!selectedDate) {
            toast({
                title: "Please select a date",
                description: "Choose a trek date to proceed with booking",
                variant: "destructive",
            });
            return;
        }
        navigate(`/book-trek/${id}?date=${selectedDate}`);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-aorbo-teal mx-auto mb-4"></div>
                    <p>Loading trek details...</p>
                </div>
            </div>
        );
    }

    if (!trek) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Trek Not Found</h2>
                    <Button onClick={() => navigate("/treks")}>
                        Back to Treks
                    </Button>
                </div>
            </div>
        );
    }

    const getDifficultyColor = (difficulty) => {
        switch (difficulty?.toLowerCase()) {
            case "easy":
                return "default";
            case "moderate":
                return "secondary";
            case "difficult":
                return "destructive";
            default:
                return "outline";
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <Button
                        variant="ghost"
                        onClick={() => navigate("/treks")}
                        className="mb-4"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Treks
                    </Button>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <div className="mb-8">
                            <div className="relative rounded-lg overflow-hidden mb-4">
                                <img
                                    src={
                                        trek.images?.[0] ||
                                        "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                                    }
                                    alt={trek.name}
                                    className="w-full h-96 object-cover"
                                />
                                <div className="absolute top-4 right-4 flex gap-2">
                                    <Button size="sm" variant="secondary">
                                        <Heart className="h-4 w-4" />
                                    </Button>
                                    <Button size="sm" variant="secondary">
                                        <Share2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="mb-8">
                            <div className="flex items-center gap-2 mb-4">
                                <Badge
                                    variant={getDifficultyColor(
                                        trek.difficulty_level
                                    )}
                                >
                                    {trek.difficulty_level}
                                </Badge>
                                <Badge variant="outline">
                                    {trek.category?.name}
                                </Badge>
                            </div>

                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                {trek.name}
                            </h1>

                            <div className="flex items-center text-gray-600 mb-4">
                                <MapPin className="h-5 w-5 mr-2" />
                                {trek.destination},{" "}
                                {trek.location?.state || "Location TBD"}
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                <div className="flex items-center">
                                    <Clock className="h-5 w-5 mr-2 text-aorbo-teal" />
                                    <div>
                                        <div className="font-medium">
                                            {trek.duration_days} Days
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            Duration
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <Mountain className="h-5 w-5 mr-2 text-aorbo-teal" />
                                    <div>
                                        <div className="font-medium">
                                            {trek.difficulty_level}
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            Difficulty
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <Star className="h-5 w-5 mr-2 text-yellow-400" />
                                    <div>
                                        <div className="font-medium">4.5/5</div>
                                        <div className="text-sm text-gray-600">
                                            Rating
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <Shield className="h-5 w-5 mr-2 text-aorbo-teal" />
                                    <div>
                                        <div className="font-medium">
                                            Insured
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            Safety
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <p className="text-gray-700 text-lg leading-relaxed">
                                {trek.description}
                            </p>
                        </div>

                        <Tabs defaultValue="itinerary" className="mb-8">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="itinerary">
                                    Itinerary
                                </TabsTrigger>
                                <TabsTrigger value="inclusions">
                                    Inclusions
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="itinerary" className="mt-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Trek Itinerary</CardTitle>
                                        <CardDescription>
                                            Day-wise breakdown of your trek
                                            experience
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-gray-600">
                                            Detailed itinerary will be provided
                                            upon booking.
                                        </p>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="inclusions" className="mt-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center text-green-600">
                                            <CheckCircle className="mr-2 h-5 w-5" />
                                            What's Included
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-gray-600">
                                            Inclusion details will be provided
                                            upon booking.
                                        </p>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>

                    <div className="lg:col-span-1">
                        <Card className="sticky top-4">
                            <CardHeader>
                                <CardTitle>Book This Trek</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-aorbo-teal mb-2">
                                        ₹{trek.price?.toLocaleString() || "TBD"}
                                    </div>
                                    <p className="text-gray-600">per person</p>
                                </div>

                                {trek.trek_dates &&
                                    trek.trek_dates.length > 0 && (
                                        <div>
                                            <label className="block text-sm font-medium mb-2">
                                                Select Date
                                            </label>
                                            <select
                                                className="w-full p-2 border rounded-md"
                                                value={selectedDate || ""}
                                                onChange={(e) =>
                                                    setSelectedDate(
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option value="">
                                                    Choose a date
                                                </option>
                                                {trek.trek_dates.map((date) => (
                                                    <option
                                                        key={date.id}
                                                        value={date.id}
                                                    >
                                                        {new Date(
                                                            date.start_date
                                                        ).toLocaleDateString()}{" "}
                                                        -
                                                        {new Date(
                                                            date.end_date
                                                        ).toLocaleDateString()}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    )}

                                <Button
                                    onClick={handleBookNow}
                                    className="w-full bg-aorbo-teal hover:bg-aorbo-teal/90"
                                    size="lg"
                                >
                                    Book Now
                                </Button>

                                <div className="text-xs text-gray-600">
                                    <p>• Free cancellation up to 48 hours</p>
                                    <p>• Instant confirmation</p>
                                    <p>• 24/7 support</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrekDetails;
