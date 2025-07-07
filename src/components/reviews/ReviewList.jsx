import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThumbsUp, User } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const ReviewList = ({ trekId }) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        fetchReviews();
    }, [trekId, page]);

    const fetchReviews = async () => {
        try {
            const response = await fetch(
                `/api/v1/reviews/trek/${trekId}?page=${page}&limit=5`
            );
            const data = await response.json();

            if (data.success) {
                if (page === 1) {
                    setReviews(data.data.reviews);
                } else {
                    setReviews((prev) => [...prev, ...data.data.reviews]);
                }
                setHasMore(
                    data.data.pagination.currentPage <
                        data.data.pagination.totalPages
                );
            }
        } catch (error) {
            console.error("Error fetching reviews:", error);
            toast({
                title: "Error",
                description: "Failed to load reviews",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleMarkHelpful = async (reviewId) => {
        try {
            const response = await fetch(
                `/api/v1/reviews/${reviewId}/helpful`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );

            const data = await response.json();

            if (data.success) {
                setReviews((prev) =>
                    prev.map((review) =>
                        review.id === reviewId
                            ? { ...review, is_helpful: data.data.is_helpful }
                            : review
                    )
                );
                toast({
                    title: "Success",
                    description: "Review marked as helpful",
                });
            }
        } catch (error) {
            console.error("Error marking review helpful:", error);
            toast({
                title: "Error",
                description: "Failed to mark review as helpful",
                variant: "destructive",
            });
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    if (loading && page === 1) {
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
        <div className="space-y-6">
            {/* Reviews List */}
            <div className="space-y-4">
                <h3 className="text-xl font-semibold">Customer Reviews</h3>

                {reviews.length === 0 ? (
                    <Card>
                        <CardContent className="p-6 text-center text-gray-500">
                            No reviews yet. Be the first to review this trek!
                        </CardContent>
                    </Card>
                ) : (
                    reviews.map((review) => (
                        <Card key={review.id}>
                            <CardContent className="p-6">
                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                            <User className="w-5 h-5 text-gray-600" />
                                        </div>
                                        <div>
                                            <p className="font-medium">
                                                {review.customer?.name ||
                                                    "Anonymous"}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                {formatDate(review.created_at)}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        {review.is_verified && (
                                            <Badge
                                                variant="secondary"
                                                className="text-xs"
                                            >
                                                Verified Booking
                                            </Badge>
                                        )}
                                    </div>
                                </div>

                                {review.title && (
                                    <h4 className="font-medium mb-2">
                                        {review.title}
                                    </h4>
                                )}

                                <p className="text-gray-700 mb-4">
                                    {review.content}
                                </p>

                                <div className="flex justify-between items-center">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() =>
                                            handleMarkHelpful(review.id)
                                        }
                                        className="flex items-center gap-1"
                                    >
                                        <ThumbsUp className="w-4 h-4" />
                                        Helpful ({review.is_helpful})
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}

                {/* Load More Button */}
                {hasMore && (
                    <div className="text-center">
                        <Button
                            variant="outline"
                            onClick={() => setPage((prev) => prev + 1)}
                            disabled={loading}
                        >
                            {loading ? "Loading..." : "Load More Reviews"}
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReviewList;
