import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, StarFilled } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const RatingForm = ({ trekId, onSubmit, onCancel }) => {
    const [ratingCategories, setRatingCategories] = useState([]);
    const [ratings, setRatings] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchRatingCategories();
    }, []);

    const fetchRatingCategories = async () => {
        try {
            const response = await fetch("/api/v1/reviews/categories");
            const data = await response.json();

            if (data.success) {
                setRatingCategories(data.data);
                // Initialize ratings for each category
                const initialRatings = data.data.map((category) => ({
                    category_id: category.id,
                    rating_value: 0,
                    comment: "",
                }));
                setRatings(initialRatings);
            }
        } catch (error) {
            console.error("Error fetching rating categories:", error);
            toast({
                title: "Error",
                description: "Failed to load rating categories",
                variant: "destructive",
            });
        }
    };

    const handleCategoryRatingChange = (categoryId, rating) => {
        setRatings((prev) =>
            prev.map((r) =>
                r.category_id === categoryId
                    ? { ...r, rating_value: rating }
                    : r
            )
        );
    };

    const handleCategoryCommentChange = (categoryId, comment) => {
        setRatings((prev) =>
            prev.map((r) =>
                r.category_id === categoryId ? { ...r, comment } : r
            )
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const submittedRatings = ratings.filter((r) => r.rating_value > 0);

        if (submittedRatings.length === 0) {
            toast({
                title: "Error",
                description: "Please provide ratings for at least one category",
                variant: "destructive",
            });
            return;
        }

        setLoading(true);
        try {
            const response = await fetch("/api/v1/reviews/ratings", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                    trek_id: trekId,
                    ratings: submittedRatings,
                }),
            });

            const data = await response.json();

            if (data.success) {
                toast({
                    title: "Success",
                    description: "Ratings submitted successfully",
                });
                onSubmit && onSubmit(data.data);
            } else {
                toast({
                    title: "Error",
                    description: data.message || "Failed to submit ratings",
                    variant: "destructive",
                });
            }
        } catch (error) {
            console.error("Error submitting ratings:", error);
            toast({
                title: "Error",
                description: "Failed to submit ratings",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const renderStars = (rating, onRatingChange) => {
        return (
            <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type="button"
                        onClick={() => onRatingChange(star)}
                        className="text-yellow-400 hover:text-yellow-500"
                    >
                        {star <= rating ? (
                            <StarFilled className="w-5 h-5" />
                        ) : (
                            <Star className="w-5 h-5" />
                        )}
                    </button>
                ))}
            </div>
        );
    };

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>Rate This Trek</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <Label>Rate by Category</Label>
                        <div className="space-y-4 mt-2">
                            {ratingCategories.map((category) => {
                                const rating =
                                    ratings.find(
                                        (r) => r.category_id === category.id
                                    )?.rating_value || 0;

                                return (
                                    <div
                                        key={category.id}
                                        className="border rounded-lg p-4"
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h4 className="font-medium">
                                                    {category.name}
                                                </h4>
                                                <p className="text-sm text-gray-600">
                                                    {category.description}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-sm font-medium">
                                                    {rating}/5
                                                </span>
                                            </div>
                                        </div>

                                        {renderStars(rating, (newRating) =>
                                            handleCategoryRatingChange(
                                                category.id,
                                                newRating
                                            )
                                        )}

                                        <div className="mt-3">
                                            <Input
                                                placeholder="Add a comment for this category (optional)"
                                                value={
                                                    ratings.find(
                                                        (r) =>
                                                            r.category_id ===
                                                            category.id
                                                    )?.comment || ""
                                                }
                                                onChange={(e) =>
                                                    handleCategoryCommentChange(
                                                        category.id,
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="flex gap-3 justify-end">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onCancel}
                            disabled={loading}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? "Submitting..." : "Submit Ratings"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};

export default RatingForm;
