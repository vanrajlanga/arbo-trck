import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, StarFilled } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const RatingDisplay = ({ trekId }) => {
    const [trekRating, setTrekRating] = useState({
        overall: 0,
        categories: {},
        ratingCount: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTrekRatings();
    }, [trekId]);

    const fetchTrekRatings = async () => {
        try {
            const response = await fetch(
                `/api/v1/reviews/trek/${trekId}/ratings`
            );
            const data = await response.json();

            if (data.success) {
                setTrekRating(data.data.trekRating);
            }
        } catch (error) {
            console.error("Error fetching trek ratings:", error);
            toast({
                title: "Error",
                description: "Failed to load ratings",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const renderStars = (rating) => {
        return (
            <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="text-yellow-400">
                        {star <= rating ? (
                            <StarFilled className="w-4 h-4" />
                        ) : (
                            <Star className="w-4 h-4" />
                        )}
                    </span>
                ))}
            </div>
        );
    };

    if (loading) {
        return (
            <Card>
                <CardContent className="p-6">
                    <div className="animate-pulse space-y-4">
                        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <StarFilled className="w-5 h-5 text-yellow-400" />
                    Trek Ratings
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-4 mb-6">
                    <div className="text-3xl font-bold">
                        {trekRating.overall}
                    </div>
                    <div>
                        {renderStars(trekRating.overall)}
                        <p className="text-sm text-gray-600">
                            Based on {trekRating.ratingCount} ratings
                        </p>
                    </div>
                </div>

                {/* Category Ratings */}
                {Object.keys(trekRating.categories).length > 0 && (
                    <div className="space-y-3">
                        <h4 className="font-medium">Category Ratings:</h4>
                        {Object.entries(trekRating.categories).map(
                            ([category, rating]) => (
                                <div
                                    key={category}
                                    className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                                >
                                    <span className="text-sm font-medium">
                                        {category}
                                    </span>
                                    <div className="flex items-center gap-2">
                                        {renderStars(rating)}
                                        <span className="text-sm font-medium">
                                            {rating}/5
                                        </span>
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                )}

                {trekRating.ratingCount === 0 && (
                    <div className="text-center text-gray-500 py-4">
                        No ratings yet. Be the first to rate this trek!
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default RatingDisplay;
