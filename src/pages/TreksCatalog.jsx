import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    Search,
    MapPin,
    Calendar,
    Users,
    Star,
    Filter,
    ArrowRight,
    Heart,
    Share2,
} from "lucide-react";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const TreksCatalog = () => {
    const [treks, setTreks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [difficultyFilter, setDifficultyFilter] = useState("all");
    const [priceFilter, setPriceFilter] = useState("all");
    const [locationFilter, setLocationFilter] = useState("all");
    const navigate = useNavigate();
    const { toast } = useToast();

    useEffect(() => {
        fetchTreks();
    }, []);

    const fetchTreks = async () => {
        try {
            console.log("Fetching treks...");

            // First fetch treks basic data
            const { data: treksData, error: treksError } = await supabase
                .from("treks")
                .select("*")
                .eq("is_active", true)
                .order("created_at", { ascending: false });

            if (treksError) {
                console.error("Error fetching treks:", treksError);
                throw treksError;
            }

            console.log("Fetched treks:", treksData);

            // Then fetch related data separately to avoid ambiguous relationships
            const treksWithRelations = await Promise.all(
                (treksData || []).map(async (trek) => {
                    const [locationData, categoryData, vendorData] =
                        await Promise.all([
                            trek.location_id
                                ? supabase
                                      .from("locations")
                                      .select("name, state")
                                      .eq("id", trek.location_id)
                                      .single()
                                : { data: null, error: null },
                            trek.category_id
                                ? supabase
                                      .from("trek_categories")
                                      .select("name")
                                      .eq("id", trek.category_id)
                                      .single()
                                : { data: null, error: null },
                            trek.vendor_id
                                ? supabase
                                      .from("vendors")
                                      .select("company_name")
                                      .eq("id", trek.vendor_id)
                                      .single()
                                : { data: null, error: null },
                        ]);

                    return {
                        ...trek,
                        location: locationData.data,
                        category: categoryData.data,
                        vendor: vendorData.data,
                    };
                })
            );

            setTreks(treksWithRelations);
        } catch (error) {
            console.error("Failed to fetch treks:", error);
            toast({
                title: "Error",
                description: "Failed to fetch treks. Please refresh the page.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const getDifficultyColor = (difficulty) => {
        switch (difficulty?.toLowerCase()) {
            case "easy":
                return "default";
            case "moderate":
                return "secondary";
            case "hard":
                return "destructive";
            default:
                return "outline";
        }
    };

    const uniqueStates = Array.from(
        new Set(treks.map((t) => t.location?.state).filter(Boolean))
    );

    // Filter treks based on search query, difficulty, price, and location
    const filteredTreks = treks.filter((trek) => {
        const matchesSearch =
            trek.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            trek.destination.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesDifficulty =
            difficultyFilter === "all" ||
            trek.difficulty_level?.toLowerCase() ===
                difficultyFilter.toLowerCase();

        const matchesLocation =
            locationFilter === "all" || trek.location?.state === locationFilter;

        let matchesPrice = true;
        if (priceFilter !== "all") {
            const price = trek.price;
            switch (priceFilter) {
                case "under-5000":
                    matchesPrice = price < 5000;
                    break;
                case "5000-10000":
                    matchesPrice = price >= 5000 && price <= 10000;
                    break;
                case "above-10000":
                    matchesPrice = price > 10000;
                    break;
            }
        }

        return (
            matchesSearch &&
            matchesDifficulty &&
            matchesLocation &&
            matchesPrice
        );
    });

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <Card key={i} className="animate-pulse">
                                <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                                <CardContent className="p-4">
                                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                                    <div className="h-3 bg-gray-200 rounded mb-4"></div>
                                    <div className="flex justify-between">
                                        <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                                        <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            Explore Amazing Treks
                        </h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Discover breathtaking trekking adventures across
                            India. Book your next adventure with experienced
                            guides and guaranteed safety.
                        </p>
                    </div>

                    {/* Search and Filters */}
                    <div className="flex flex-col lg:flex-row gap-4 mb-6">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <Input
                                placeholder="Search treks by name or destination..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 h-12"
                            />
                        </div>
                        <Select
                            value={difficultyFilter}
                            onValueChange={setDifficultyFilter}
                        >
                            <SelectTrigger className="w-48 h-12">
                                <SelectValue placeholder="Difficulty Level" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Levels</SelectItem>
                                <SelectItem value="easy">Easy</SelectItem>
                                <SelectItem value="moderate">
                                    Moderate
                                </SelectItem>
                                <SelectItem value="hard">Hard</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select
                            value={locationFilter}
                            onValueChange={setLocationFilter}
                        >
                            <SelectTrigger className="w-48 h-12">
                                <SelectValue placeholder="Location" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">
                                    All Locations
                                </SelectItem>
                                {uniqueStates.map((state) => (
                                    <SelectItem key={state} value={state}>
                                        {state}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Select
                            value={priceFilter}
                            onValueChange={setPriceFilter}
                        >
                            <SelectTrigger className="w-48 h-12">
                                <SelectValue placeholder="Price Range" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Prices</SelectItem>
                                <SelectItem value="under-5000">
                                    Under ₹5,000
                                </SelectItem>
                                <SelectItem value="5000-10000">
                                    ₹5,000 - ₹10,000
                                </SelectItem>
                                <SelectItem value="above-10000">
                                    Above ₹10,000
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                {filteredTreks.length === 0 ? (
                    <div className="text-center py-16">
                        <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                            {treks.length === 0
                                ? "No Active Treks Available"
                                : "No Treks Found"}
                        </h3>
                        <p className="text-gray-600 mb-8">
                            {treks.length === 0
                                ? "There are currently no active treks available. Please check back later or contact us for more information."
                                : "Try adjusting your search criteria or filters"}
                        </p>
                        {treks.length > 0 && (
                            <Button
                                onClick={() => {
                                    setSearchQuery("");
                                    setDifficultyFilter("all");
                                    setLocationFilter("all");
                                    setPriceFilter("all");
                                }}
                            >
                                Clear Filters
                            </Button>
                        )}
                        <Button onClick={fetchTreks} className="ml-2">
                            Refresh Data
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredTreks.map((trek) => (
                            <Card
                                key={trek.id}
                                className="group hover:shadow-lg transition-shadow overflow-hidden"
                            >
                                <div className="relative">
                                    <img
                                        src={
                                            trek.images?.[0] ||
                                            "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                                        }
                                        alt={trek.name}
                                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute top-3 right-3 flex gap-2">
                                        <Button
                                            size="sm"
                                            variant="secondary"
                                            className="h-8 w-8 p-0"
                                        >
                                            <Heart className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="secondary"
                                            className="h-8 w-8 p-0"
                                        >
                                            <Share2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <div className="absolute bottom-3 left-3">
                                        <Badge
                                            variant={getDifficultyColor(
                                                trek.difficulty_level
                                            )}
                                        >
                                            {trek.difficulty_level}
                                        </Badge>
                                    </div>
                                </div>
                                <CardContent className="p-4">
                                    <div className="mb-2">
                                        <h3 className="font-semibold text-lg text-gray-900 mb-1">
                                            {trek.name}
                                        </h3>
                                        <div className="flex items-center text-sm text-gray-600 mb-2">
                                            <MapPin className="h-4 w-4 mr-1" />
                                            {trek.destination},{" "}
                                            {trek.location?.state || "India"}
                                        </div>
                                    </div>

                                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                                        {trek.description}
                                    </p>

                                    <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                                        <div className="flex items-center">
                                            <Calendar className="h-4 w-4 mr-1" />
                                            {trek.duration_days} days
                                        </div>
                                        <div className="flex items-center">
                                            <Star className="h-4 w-4 mr-1 text-yellow-400" />
                                            4.5 (120)
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div>
                                            <span className="text-2xl font-bold text-gray-900">
                                                ₹{trek.price.toLocaleString()}
                                            </span>
                                            <span className="text-sm text-gray-600">
                                                /person
                                            </span>
                                        </div>
                                        <Button
                                            onClick={() =>
                                                navigate(`/trek/${trek.id}`)
                                            }
                                            className="bg-aorbo-teal hover:bg-aorbo-teal/90"
                                        >
                                            View Details
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TreksCatalog;
