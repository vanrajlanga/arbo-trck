import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    MapPin,
    Calendar,
    Users,
    Star,
    Clock,
    Mountain,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const MobileResults = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { toast } = useToast();

    const [treks, setTreks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [fromLocation, setFromLocation] = useState("");
    const [toLocation, setToLocation] = useState("");

    const fromId = searchParams.get("from");
    const toId = searchParams.get("to");
    const date = searchParams.get("date");
    const travelers = searchParams.get("travelers");

    useEffect(() => {
        if (fromId && toId && date) {
            loadSearchResults();
            loadLocationNames();
    }, [fromId, toId, date]);

    const loadLocationNames = async () => {
        try {
            if (fromId) {
                const { data: fromData } = await supabase
                    .from("locations")
                    .select("name, state")
                    .eq("id", fromId)
                    .maybeSingle();

                if (fromData) {
                    setFromLocation(`${fromData.name}, ${fromData.state}`);

            if (toId && toId !== fromId) {
                const { data: toData } = await supabase
                    .from("locations")
                    .select("name, state")
                    .eq("id", toId)
                    .maybeSingle();

                if (toData) {
                    setToLocation(`${toData.name}, ${toData.state}`);
            } else {
                setToLocation(fromLocation);
        } catch (error) {
            console.error("Error loading location names:", error);
    };

    const loadSearchResults = async () => {
        try {
            setLoading(true);
            console.log("Loading search results for:", {
                fromId,
                toId,
                date,
                travelers,
            });

            // Get treks for the destination location
            const { data: treksData, error: treksError } = await supabase
                .from("treks")
                .select("*")
                .eq("location_id", toId)
                .eq("is_active", true);

            if (treksError) {
                console.error("Error loading treks:", treksError);
                throw treksError;

            console.log("Found treks:", treksData?.length);

            if (treksData && treksData.length > 0) {
                // Enrich with vendor and location data
                const enrichedTreks = await Promise.all(
                    treksData.map(async (trek) => {
                        // Get vendor name
                        let vendorName = "Unknown Vendor";
                        if (trek.vendor_id) {
                            const { data: vendorData } = await supabase
                                .from("vendors")
                                .select("company_name")
                                .eq("id", trek.vendor_id)
                                .maybeSingle();

                            if (vendorData) {
                                vendorName = vendorData.company_name;

                        // Get location details
                        let locationName = "Unknown Location";
                        let locationState = "Unknown State";
                        if (trek.location_id) {
                            const { data: locationData } = await supabase
                                .from("locations")
                                .select("name, state")
                                .eq("id", trek.location_id)
                                .maybeSingle();

                            if (locationData) {
                                locationName = locationData.name;
                                locationState = locationData.state;

                        return {
                            id: trek.id,
                            name: trek.name,
                            destination: trek.destination,
                            description: trek.description,
                            price: trek.price,
                            duration_days: trek.duration_days,
                            max_participants: trek.max_participants,
                            difficulty_level: trek.difficulty_level,
                            images: trek.images || [],
                            vendor_name: vendorName,
                            location_name: locationName,
                            location_state: locationState,
                        };
                    })
                );

                setTreks(enrichedTreks);
            } else {
                setTreks([]);
        } catch (error) {
            console.error("Error loading search results:", error);
            toast({
                title: "Error",
                description: `Failed to load search results: ${error.message}`,
                variant: "destructive",
            });
        } finally {
      setLoading(false);
    }
            setLoading(false);
    };

    const getDifficultyColor = (difficulty) => {
        switch (difficulty?.toLowerCase()) {
            case "easy":
                return "bg-green-100 text-green-800";
            case "moderate":
                return "bg-yellow-100 text-yellow-800";
            case "difficult":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
    };

    const handleTrekClick = (trekId) => {
        navigate(`/trek/${trekId}`);
    };

    const handleBackClick = () => {
        navigate("/mobile/search");
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm p-4">
                <div className="flex items-center space-x-3">
                    <Button variant="ghost" size="sm" onClick={handleBackClick}>
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <div className="flex-1">
                        <h1 className="text-lg font-semibold text-gray-800">
                            Search Results
                        </h1>
                        <p className="text-sm text-gray-600">
                            {fromLocation} → {toLocation}
                        </p>
                    </div>
                </div>
            </div>

            {/* Search Summary */}
            <div className="p-4 bg-white border-b">
                <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-blue-500" />
                        <span>{date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-green-500" />
                        <span>
                            {travelers}{" "}
                            {travelers === "1" ? "Person" : "People"}
                        </span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Mountain className="w-4 h-4 text-purple-500" />
                        <span>{treks.length} Treks</span>
                    </div>
                </div>
            </div>

            {/* Results */}
            <div className="p-4">
                {loading ? (
                    <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading treks...</p>
                    </div>
                ) : treks.length === 0 ? (
                    <div className="text-center py-8">
                        <Mountain className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                            No Treks Found
                        </h3>
                        <p className="text-gray-600 mb-4">
                            No treks available for your selected criteria.
                        </p>
                        <Button onClick={handleBackClick} variant="outline">
                            Modify Search
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold text-gray-800">
                            Available Treks ({treks.length})
                        </h2>

                        {treks.map((trek) => (
                            <Card key={trek.id} className="overflow-hidden">
                                <CardContent className="p-0">
                                    <div
                                        onClick={() => handleTrekClick(trek.id)}
                                        className="cursor-pointer"
                                    >
                                        {/* Trek Image */}
                                        <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 relative">
                                            {trek.images.length > 0 ? (
                                                <img
                                                    src={trek.images[0]}
                                                    alt={trek.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <Mountain className="w-12 h-12 text-white" />
                                                </div>
                                            )}
                                            <div className="absolute top-3 right-3">
                                                <Badge
                                                    className={getDifficultyColor(
                                                        trek.difficulty_level
                                                    )}
                                                >
                                                    {trek.difficulty_level ||
                                                        "Moderate"}
                                                </Badge>
                                            </div>
                                        </div>

                                        {/* Trek Details */}
                                        <div className="p-4">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="text-lg font-semibold text-gray-800 flex-1">
                                                    {trek.name}
                                                </h3>
                                                <div className="text-right ml-2">
                                                    <p className="text-xl font-bold text-green-600">
                                                        ₹
                                                        {trek.price?.toLocaleString()}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        per person
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                                                <MapPin className="w-4 h-4" />
                                                <span>{trek.destination}</span>
                                            </div>

                                            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                                                <div className="flex items-center space-x-1">
                                                    <Clock className="w-4 h-4" />
                                                    <span>
                                                        {trek.duration_days}{" "}
                                                        days
                                                    </span>
                                                </div>
                                                <div className="flex items-center space-x-1">
                                                    <Users className="w-4 h-4" />
                                                    <span>
                                                        Max{" "}
                                                        {trek.max_participants}
                                                    </span>
                                                </div>
                                            </div>

                                            {trek.description && (
                                                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                                    {trek.description}
                                                </p>
                                            )}

                                            <div className="flex justify-between items-center">
                                                <span className="text-xs text-gray-500">
                                                    by {trek.vendor_name}
                                                </span>
                                                <Button
                                                    size="sm"
                                                    className="bg-blue-600 hover:bg-blue-700"
                                                >
                                                    View Details
                                                </Button>
                                            </div>
                                        </div>
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

export default MobileResults;
