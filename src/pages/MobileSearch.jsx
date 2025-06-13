import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Calendar, Users, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { BannerSlider } from "@/components/mobile/BannerSlider";
import { TrekShorts } from "@/components/mobile/TrekShorts";
import { useToast } from "@/hooks/use-toast";

const MobileSearch = () => {
    const [locations, setLocations] = useState([]);
    const [fromCity, setFromCity] = useState("");
    const [toCity, setToCity] = useState("");
    const [travelDate, setTravelDate] = useState("");
    const [travelers, setTravelers] = useState("1");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { toast } = useToast();

    useEffect(() => {
        loadLocationsWithActiveTreks();
    }, []);

    const loadLocationsWithActiveTreks = async () => {
        try {
            setLoading(true);
            console.log("Loading locations with active treks...");

            // First get all active treks
            const { data: treksData, error: treksError } = await supabase
                .from("treks")
                .select("location_id")
                .eq("is_active", true);

            if (treksError) {
                console.error("Error fetching treks:", treksError);
                throw treksError;

            console.log("Active treks data:", treksData?.length);

            if (treksData && treksData.length > 0) {
                // Get unique location IDs from active treks
                const locationIds = [
                    ...new Set(
                        treksData
                            .map((trek) => trek.location_id)
                            .filter(Boolean)
                    ),
                ];
                console.log("Unique location IDs from treks:", locationIds);

                if (locationIds.length > 0) {
                    // Now get the location details for these IDs
                    const { data: locationsData, error: locationsError } =
                        await supabase
                            .from("locations")
                            .select("id, name, state")
                            .in("id", locationIds)
                            .eq("is_active", true);

                    if (locationsError) {
                        console.error(
                            "Error fetching locations:",
                            locationsError
                        );
                        throw locationsError;

                    console.log("Locations data:", locationsData);

                    if (locationsData && locationsData.length > 0) {
                        const formattedLocations = locationsData.map(
                            (location) => ({
                                id: location.id,
                                name: location.name,
                                state: location.state,
                                display_name: `${location.name}, ${location.state}`,
                            })
                        );

                        // Sort alphabetically
                        formattedLocations.sort((a, b) =>
                            a.display_name.localeCompare(b.display_name)
                        );

                        console.log(
                            "Formatted locations:",
                            formattedLocations.length
                        );
                        setLocations(formattedLocations);
                    } else {
                        console.log("No locations found for active treks");
                        setLocations([]);
                } else {
                    console.log("No location IDs found in active treks");
                    setLocations([]);
            } else {
                console.log("No active treks found");
                setLocations([]);
        } catch (error) {
            console.error("Error loading locations:", error);
            toast({
                title: "Error",
                description: `Failed to load locations: ${error.message}`,
                variant: "destructive",
            });
            setLocations([]);
        } finally {
      setLoading(false);
    }
            setLoading(false);
    };

    const handleSearch = () => {
        console.log("Search params:", {
            fromCity,
            toCity,
            travelDate,
            travelers,
        });

        if (!fromCity) {
            toast({
                title: "Missing Information",
                description: "Please select departure city",
                variant: "destructive",
            });

        if (!toCity) {
            toast({
                title: "Missing Information",
                description: "Please select destination",
                variant: "destructive",
            });

        if (!travelDate) {
            toast({
                title: "Missing Information",
                description: "Please select travel date",
                variant: "destructive",
            });

        // Navigate to results page with search parameters
        const searchParams = new URLSearchParams({
            from: fromCity,
            to: toCity,
            date: travelDate,
            travelers: travelers,
        });

        console.log(
            "Navigating to results with params:",
            searchParams.toString()
        );
        navigate(`/mobile-results?${searchParams.toString()}`);
    };

    const getTodayDate = () => {
        return new Date().toISOString().split("T")[0];
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-bold text-gray-800">
                            Trek Hub
                        </h1>
                        <p className="text-sm text-gray-600">
                            Find your next adventure
                        </p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                        <span className="text-white font-semibold">T</span>
                    </div>
                </div>
            </div>

            {/* Search Section */}
            <div className="p-4">
                <Card>
                    <CardContent className="p-4 space-y-4">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold">
                                Search Treks
                            </h2>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={loadLocationsWithActiveTreks}
                                disabled={loading}
                            >
                                <RefreshCw
                                    className={`w-4 h-4 mr-1 ${
                                        loading ? "animate-spin" : ""
                                    }`}
                                />
                                Refresh
                            </Button>
                        </div>

                        {loading && (
                            <div className="text-center py-4 text-gray-500">
                                <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2" />
                                Loading locations...
                            </div>
                        )}

                        <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                                <MapPin className="w-5 h-5 text-green-500" />
                                <span className="text-sm font-medium text-gray-700">
                                    From (Departure)
                                </span>
                            </div>
                            <Select
                                value={fromCity}
                                onValueChange={setFromCity}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select departure city" />
                                </SelectTrigger>
                                <SelectContent>
                                    {locations.length === 0 ? (
                                        <SelectItem
                                            value="no-locations"
                                            disabled
                                        >
                                            {loading
                                                ? "Loading..."
                                                : "No locations available"}
                                        </SelectItem>
                                    ) : (
                                        locations.map((location) => (
                                            <SelectItem
                                                key={`from-${location.id}`}
                                                value={location.id}
                                            >
                                                {location.display_name}
                                            </SelectItem>
                                        ))
                                    )}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                                <MapPin className="w-5 h-5 text-blue-500" />
                                <span className="text-sm font-medium text-gray-700">
                                    To (Destination)
                                </span>
                            </div>
                            <Select value={toCity} onValueChange={setToCity}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select destination" />
                                </SelectTrigger>
                                <SelectContent>
                                    {locations.length === 0 ? (
                                        <SelectItem
                                            value="no-locations"
                                            disabled
                                        >
                                            {loading
                                                ? "Loading..."
                                                : "No locations available"}
                                        </SelectItem>
                                    ) : (
                                        locations.map((location) => (
                                            <SelectItem
                                                key={`to-${location.id}`}
                                                value={location.id}
                                            >
                                                {location.display_name}
                                            </SelectItem>
                                        ))
                                    )}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                    <Calendar className="w-4 h-4 text-orange-500" />
                                    <span className="text-sm font-medium text-gray-700">
                                        Date
                                    </span>
                                </div>
                                <Input
                                    type="date"
                                    value={travelDate}
                                    onChange={(e) =>
                                        setTravelDate(e.target.value)
                                    min={getTodayDate()}
                                />
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                    <Users className="w-4 h-4 text-purple-500" />
                                    <span className="text-sm font-medium text-gray-700">
                                        Travelers
                                    </span>
                                </div>
                                <Select
                                    value={travelers}
                                    onValueChange={setTravelers}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                                            <SelectItem
                                                key={num}
                                                value={num.toString()}
                                            >
                                                {num}{" "}
                                                {num === 1
                                                    ? "Person"
                                                    : "People"}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <Button
                            onClick={handleSearch}
                            className="w-full"
                            size="lg"
                        >
                            <Search className="w-5 h-5 mr-2" />
                            Search Treks
                        </Button>

                        {locations.length === 0 && !loading && (
                            <div className="text-center text-sm text-gray-500 mt-4 p-4 bg-yellow-50 rounded-lg">
                                <p className="font-medium">
                                    No active trek locations found
                                </p>
                                <p>
                                    Please contact admin or try refreshing the
                                    page.
                                </p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Banner Sections */}
            <div className="px-4 mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-3">
                    What's New
                </h2>
                <BannerSlider bannerType="whats_new" />
            </div>

            <div className="px-4 mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-3">
                    Top Treks
                </h2>
                <BannerSlider bannerType="top_trek" />
            </div>

            <div className="px-4 mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-3">
                    Trek Shorts
                </h2>
                <TrekShorts />
            </div>

            <div className="px-4 mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-3">
                    Seasonal Forecast
                </h2>
                <BannerSlider bannerType="seasonal_forecast" />
            </div>
        </div>
    );
};

export default MobileSearch;
