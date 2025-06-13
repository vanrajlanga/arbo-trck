import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
    Plus,
    Search,
    Filter,
    Star,
    Edit,
    Trash2,
    ArrowUp,
    ArrowDown,
    Check,
    X,
    MessageSquare,
    Eye,
    StarHalf,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";

const initialReview = {
    id: 0,
    trekId: 0,
    trekName: "",
    customerName: "",
    rating: 5,
    title: "",
    comment: "",
    date: new Date().toISOString().slice(0, 10),
    status: "published",
};

const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const [treks, setTreks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [ratingFilter, setRatingFilter] = useState("all");
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
    const [isRespondDialogOpen, setIsRespondDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [newReview, setNewReview] = useState({ ...initialReview });
    const [selectedReview, setSelectedReview] = useState(null);
    const [activeTab, setActiveTab] = useState("all");
    const [sortBy, setSortBy] = useState("date");
    const [sortDirection, setSortDirection] = useState("desc");

    // Load reviews from localStorage
    useEffect(() => {
        // Get treks for the dropdown
        const treksData = localStorage.getItem("vendorTreks");
        if (treksData) {
            const parsedTreks = JSON.parse(treksData).map((trek) => ({
                id: trek.id,
                name: trek.name,
            }));
            setTreks(parsedTreks);
        }

        // Get reviews
        const reviewsData = localStorage.getItem("vendorReviews");
        if (reviewsData) {
            setReviews(JSON.parse(reviewsData));
        } else {
            // Create sample reviews if none exist
            const sampleReviews = [
                {
                    id: 1,
                    trekId: 1,
                    trekName: "Himalayan Adventure",
                    customerName: "John Doe",
                    customerEmail: "john@example.com",
                    rating: 5,
                    title: "Amazing experience!",
                    comment:
                        "The trek was breathtaking and our guide was very knowledgeable. Would definitely recommend!",
                    date: "2025-05-10",
                    status: "published",
                    bookingId: 1,
                },
                {
                    id: 2,
                    trekId: 2,
                    trekName: "Valley Trek",
                    customerName: "Jane Smith",
                    rating: 4,
                    title: "Great trek but could be better",
                    comment:
                        "Beautiful scenery and good organization. The food could have been better quality.",
                    date: "2025-05-12",
                    status: "published",
                    response:
                        "Thank you for your feedback! We're working on improving our meal options.",
                    bookingId: 2,
                },
                {
                    id: 3,
                    trekId: 1,
                    trekName: "Himalayan Adventure",
                    customerName: "Mike Johnson",
                    rating: 3,
                    title: "Average experience",
                    comment:
                        "The trek was okay but not as advertised. The accommodations were basic.",
                    date: "2025-05-15",
                    status: "pending",
                    bookingId: 3,
                },
            ];
            setReviews(sampleReviews);
            localStorage.setItem(
                "vendorReviews",
                JSON.stringify(sampleReviews)
            );
        }
        setLoading(false);
    }, []);

    // Filter and sort reviews
    const filteredReviews = reviews
        .filter((review) => {
            // Filter by status
            if (statusFilter !== "all" && review.status !== statusFilter) {
                return false;
            }

            // Filter by rating
            if (ratingFilter !== "all") {
                const ratingNum = parseInt(ratingFilter);
                if (review.rating !== ratingNum) {
                    return false;
                }
            }

            // Filter by active tab
            if (activeTab === "published" && review.status !== "published")
                return false;
            if (activeTab === "pending" && review.status !== "pending")
                return false;
            if (activeTab === "rejected" && review.status !== "rejected")
                return false;

            // Filter by search term
            const searchLower = searchTerm.toLowerCase();
            return (
                review.customerName.toLowerCase().includes(searchLower) ||
                review.trekName.toLowerCase().includes(searchLower) ||
                review.title.toLowerCase().includes(searchLower) ||
                review.comment.toLowerCase().includes(searchLower)
            );
        })
        .sort((a, b) => {
            // Sort reviews
            let compareValue = 0;

            switch (sortBy) {
                case "date":
                    compareValue =
                        new Date(a.date).getTime() - new Date(b.date).getTime();
                    break;
                case "rating":
                    compareValue = a.rating - b.rating;
                    break;
                case "customerName":
                    compareValue = a.customerName.localeCompare(b.customerName);
                    break;
                case "trekName":
                    compareValue = a.trekName.localeCompare(b.trekName);
                    break;
                default:
                    compareValue = 0;
            }

            return sortDirection === "asc" ? compareValue : -compareValue;
        });

    // Handle adding new review
    const handleAddReview = () => {
        // Find trek name based on trek ID
        const selectedTrek = treks.find(
            (trek) => trek.id === Number(newReview.trekId)
        );
        const newId =
            reviews.length > 0 ? Math.max(...reviews.map((r) => r.id)) + 1 : 1;

        const reviewToAdd = {
            ...newReview,
            id: newId,
            trekName: selectedTrek?.name || "Unknown Trek",
        };

        const updatedReviews = [...reviews, reviewToAdd];
        localStorage.setItem("vendorReviews", JSON.stringify(updatedReviews));
        setReviews(updatedReviews);
        setNewReview({ ...initialReview });
        setIsAddDialogOpen(false);
        toast.success("Review added successfully!");
    };

    // Handle updating a review
    const handleUpdateReview = () => {
        if (!selectedReview) return;

        // Find trek name based on trek ID
        const selectedTrek = treks.find(
            (trek) => trek.id === Number(selectedReview.trekId)
        );

        const updatedReview = {
            ...selectedReview,
            trekName: selectedTrek?.name || selectedReview.trekName,
        };

        const updatedReviews = reviews.map((review) =>
            review.id === selectedReview.id ? updatedReview : review
        );

        localStorage.setItem("vendorReviews", JSON.stringify(updatedReviews));
        setReviews(updatedReviews);
        setSelectedReview(null);
        setIsEditDialogOpen(false);
        toast.success("Review updated successfully!");
    };

    // Handle responding to a review
    const handleRespondToReview = () => {
        if (!selectedReview) return;

        const updatedReview = {
            ...selectedReview,
        };

        const updatedReviews = reviews.map((review) =>
            review.id === selectedReview.id ? updatedReview : review
        );

        localStorage.setItem("vendorReviews", JSON.stringify(updatedReviews));
        setReviews(updatedReviews);
        setSelectedReview(null);
        setIsRespondDialogOpen(false);
        toast.success("Response added successfully!");
    };

    // Handle approval of a review
    const handleReviewStatusChange = (review, newStatus) => {
        const updatedReview = {
            ...review,
            status: newStatus,
        };

        const updatedReviews = reviews.map((r) =>
            r.id === review.id ? updatedReview : r
        );

        localStorage.setItem("vendorReviews", JSON.stringify(updatedReviews));
        setReviews(updatedReviews);
        toast.success(
            `Review ${
                newStatus === "published"
                    ? "published"
                    : newStatus === "rejected"
                    ? "rejected"
                    : "marked as pending"
            } successfully!`
        );
    };

    // Handle deleting a review
    const handleDeleteReview = () => {
        if (!selectedReview) return;

        const updatedReviews = reviews.filter(
            (review) => review.id !== selectedReview.id
        );
        localStorage.setItem("vendorReviews", JSON.stringify(updatedReviews));
        setReviews(updatedReviews);
        setSelectedReview(null);
        setIsDeleteDialogOpen(false);
        toast.success("Review deleted successfully!");
    };

    // Toggle sort direction when clicking the same sort column
    const handleSortChange = (column) => {
        if (sortBy === column) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortBy(column);
            setSortDirection("desc");
        }
    };

    // Render review stars
    const renderStars = (rating) => {
        return (
            <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        className={`h-4 w-4 ${
                            star <= rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                        }`}
                    />
                ))}
            </div>
        );
    };

    return (
        <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <h1 className="text-2xl font-bold mb-4 md:mb-0">
                    Reviews Management
                </h1>
                <Button
                    onClick={() => {
                        setNewReview({ ...initialReview });
                        setIsAddDialogOpen(true);
                    }}
                    className="flex items-center"
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Review
                </Button>
            </div>

            <Card className="mb-6">
                <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="relative">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="Search reviews..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-8"
                            />
                        </div>
                        <div className="flex items-center space-x-2">
                            <Filter className="h-4 w-4 text-gray-400" />
                            <Select
                                value={statusFilter}
                                onValueChange={setStatusFilter}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Filter by status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">
                                        All Statuses
                                    </SelectItem>
                                    <SelectItem value="published">
                                        Published
                                    </SelectItem>
                                    <SelectItem value="pending">
                                        Pending
                                    </SelectItem>
                                    <SelectItem value="rejected">
                                        Rejected
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Star className="h-4 w-4 text-gray-400" />
                            <Select
                                value={ratingFilter}
                                onValueChange={setRatingFilter}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Filter by rating" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">
                                        All Ratings
                                    </SelectItem>
                                    <SelectItem value="5">5 Stars</SelectItem>
                                    <SelectItem value="4">4 Stars</SelectItem>
                                    <SelectItem value="3">3 Stars</SelectItem>
                                    <SelectItem value="2">2 Stars</SelectItem>
                                    <SelectItem value="1">1 Star</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="mb-6"
            >
                <TabsList>
                    <TabsTrigger value="all">All Reviews</TabsTrigger>
                    <TabsTrigger value="published">Published</TabsTrigger>
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                    <TabsTrigger value="rejected">Rejected</TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="mt-6">
                    <ReviewsTable
                        reviews={filteredReviews}
                        loading={loading}
                        renderStars={renderStars}
                        sortBy={sortBy}
                        sortDirection={sortDirection}
                        onSortChange={handleSortChange}
                        onView={(review) => {
                            setSelectedReview(review);
                            setIsViewDialogOpen(true);
                        }}
                        onEdit={(review) => {
                            setSelectedReview({ ...review });
                            setIsEditDialogOpen(true);
                        }}
                        onRespond={(review) => {
                            setSelectedReview({ ...review });
                            setIsRespondDialogOpen(true);
                        }}
                        onStatusChange={handleReviewStatusChange}
                        onDelete={(review) => {
                            setSelectedReview(review);
                            setIsDeleteDialogOpen(true);
                        }}
                    />
                </TabsContent>
                <TabsContent value="published" className="mt-6">
                    <ReviewsTable
                        reviews={filteredReviews}
                        loading={loading}
                        renderStars={renderStars}
                        sortBy={sortBy}
                        sortDirection={sortDirection}
                        onSortChange={handleSortChange}
                        onView={(review) => {
                            setSelectedReview(review);
                            setIsViewDialogOpen(true);
                        }}
                        onEdit={(review) => {
                            setSelectedReview({ ...review });
                            setIsEditDialogOpen(true);
                        }}
                        onRespond={(review) => {
                            setSelectedReview({ ...review });
                            setIsRespondDialogOpen(true);
                        }}
                        onStatusChange={handleReviewStatusChange}
                        onDelete={(review) => {
                            setSelectedReview(review);
                            setIsDeleteDialogOpen(true);
                        }}
                    />
                </TabsContent>
                <TabsContent value="pending" className="mt-6">
                    <ReviewsTable
                        reviews={filteredReviews}
                        loading={loading}
                        renderStars={renderStars}
                        sortBy={sortBy}
                        sortDirection={sortDirection}
                        onSortChange={handleSortChange}
                        onView={(review) => {
                            setSelectedReview(review);
                            setIsViewDialogOpen(true);
                        }}
                        onEdit={(review) => {
                            setSelectedReview({ ...review });
                            setIsEditDialogOpen(true);
                        }}
                        onRespond={(review) => {
                            setSelectedReview({ ...review });
                            setIsRespondDialogOpen(true);
                        }}
                        onStatusChange={handleReviewStatusChange}
                        onDelete={(review) => {
                            setSelectedReview(review);
                            setIsDeleteDialogOpen(true);
                        }}
                    />
                </TabsContent>
                <TabsContent value="rejected" className="mt-6">
                    <ReviewsTable
                        reviews={filteredReviews}
                        loading={loading}
                        renderStars={renderStars}
                        sortBy={sortBy}
                        sortDirection={sortDirection}
                        onSortChange={handleSortChange}
                        onView={(review) => {
                            setSelectedReview(review);
                            setIsViewDialogOpen(true);
                        }}
                        onEdit={(review) => {
                            setSelectedReview({ ...review });
                            setIsEditDialogOpen(true);
                        }}
                        onRespond={(review) => {
                            setSelectedReview({ ...review });
                            setIsRespondDialogOpen(true);
                        }}
                        onStatusChange={handleReviewStatusChange}
                        onDelete={(review) => {
                            setSelectedReview(review);
                            setIsDeleteDialogOpen(true);
                        }}
                    />
                </TabsContent>
            </Tabs>

            {/* Add Review Dialog */}
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Add New Review</DialogTitle>
                    </DialogHeader>
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <Label htmlFor="trekSelect">Trek</Label>
                            <Select
                                value={
                                    newReview.trekId
                                        ? String(newReview.trekId)
                                        : ""
                                }
                                onValueChange={(value) =>
                                    setNewReview({
                                        ...newReview,
                                        trekId: parseInt(value),
                                    })
                                }
                            >
                                <SelectTrigger id="trekSelect">
                                    <SelectValue placeholder="Select a trek" />
                                </SelectTrigger>
                                <SelectContent>
                                    {treks.map((trek) => (
                                        <SelectItem
                                            key={trek.id}
                                            value={String(trek.id)}
                                        >
                                            {trek.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="customerName">Customer Name</Label>
                            <Input
                                id="customerName"
                                value={newReview.customerName}
                                onChange={(e) =>
                                    setNewReview({
                                        ...newReview,
                                        customerName: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div>
                            <Label htmlFor="rating">Rating</Label>
                            <Select
                                value={String(newReview.rating)}
                                onValueChange={(value) =>
                                    setNewReview({
                                        ...newReview,
                                        rating: parseInt(value),
                                    })
                                }
                            >
                                <SelectTrigger id="rating">
                                    <SelectValue placeholder="Select rating" />
                                </SelectTrigger>
                                <SelectContent>
                                    {[1, 2, 3, 4, 5].map((r) => (
                                        <SelectItem key={r} value={String(r)}>
                                            {r} Star{r !== 1 ? "s" : ""}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                value={newReview.title}
                                onChange={(e) =>
                                    setNewReview({
                                        ...newReview,
                                        title: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div>
                            <Label htmlFor="comment">Comment</Label>
                            <Textarea
                                id="comment"
                                value={newReview.comment}
                                onChange={(e) =>
                                    setNewReview({
                                        ...newReview,
                                        comment: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div>
                            <Label htmlFor="status">Status</Label>
                            <Select
                                value={newReview.status}
                                onValueChange={(value) =>
                                    setNewReview({
                                        ...newReview,
                                        status: value,
                                    })
                                }
                            >
                                <SelectTrigger id="status">
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="published">
                                        Published
                                    </SelectItem>
                                    <SelectItem value="pending">
                                        Pending
                                    </SelectItem>
                                    <SelectItem value="rejected">
                                        Rejected
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter className="mt-4">
                        <Button
                            variant="outline"
                            onClick={() => setIsAddDialogOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button onClick={handleAddReview}>Add Review</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Edit Review Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Edit Review</DialogTitle>
                    </DialogHeader>
                    {selectedReview && (
                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <Label htmlFor="editTrekSelect">Trek</Label>
                                <Select
                                    value={
                                        selectedReview.trekId
                                            ? String(selectedReview.trekId)
                                            : ""
                                    }
                                    onValueChange={(value) =>
                                        setSelectedReview({
                                            ...selectedReview,
                                            trekId: parseInt(value),
                                        })
                                    }
                                >
                                    <SelectTrigger id="editTrekSelect">
                                        <SelectValue placeholder="Select a trek" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {treks.map((trek) => (
                                            <SelectItem
                                                key={trek.id}
                                                value={String(trek.id)}
                                            >
                                                {trek.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="editCustomerName">
                                    Customer Name
                                </Label>
                                <Input
                                    id="editCustomerName"
                                    value={selectedReview.customerName}
                                    onChange={(e) =>
                                        setSelectedReview({
                                            ...selectedReview,
                                            customerName: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div>
                                <Label htmlFor="editRating">Rating</Label>
                                <Select
                                    value={String(selectedReview.rating)}
                                    onValueChange={(value) =>
                                        setSelectedReview({
                                            ...selectedReview,
                                            rating: parseInt(value),
                                        })
                                    }
                                >
                                    <SelectTrigger id="editRating">
                                        <SelectValue placeholder="Select rating" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {[1, 2, 3, 4, 5].map((r) => (
                                            <SelectItem
                                                key={r}
                                                value={String(r)}
                                            >
                                                {r} Star{r !== 1 ? "s" : ""}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="editTitle">Title</Label>
                                <Input
                                    id="editTitle"
                                    value={selectedReview.title}
                                    onChange={(e) =>
                                        setSelectedReview({
                                            ...selectedReview,
                                            title: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div>
                                <Label htmlFor="editComment">Comment</Label>
                                <Textarea
                                    id="editComment"
                                    value={selectedReview.comment}
                                    onChange={(e) =>
                                        setSelectedReview({
                                            ...selectedReview,
                                            comment: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div>
                                <Label htmlFor="editStatus">Status</Label>
                                <Select
                                    value={selectedReview.status}
                                    onValueChange={(value) =>
                                        setSelectedReview({
                                            ...selectedReview,
                                            status: value,
                                        })
                                    }
                                >
                                    <SelectTrigger id="editStatus">
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="published">
                                            Published
                                        </SelectItem>
                                        <SelectItem value="pending">
                                            Pending
                                        </SelectItem>
                                        <SelectItem value="rejected">
                                            Rejected
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    )}
                    <DialogFooter className="mt-4">
                        <Button
                            variant="outline"
                            onClick={() => setIsEditDialogOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button onClick={handleUpdateReview}>
                            Save Changes
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* View Review Dialog */}
            <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Review Details</DialogTitle>
                    </DialogHeader>
                    {selectedReview && (
                        <div className="space-y-4 py-4">
                            <div>
                                <h3 className="text-lg font-semibold">
                                    {selectedReview.title}
                                </h3>
                                <p className="text-sm text-gray-500">
                                    By {selectedReview.customerName} for{" "}
                                    {selectedReview.trekName}
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                {renderStars(selectedReview.rating)}
                                <Badge variant="outline">
                                    {selectedReview.rating} Stars
                                </Badge>
                                <Badge
                                    variant="outline"
                                    className={`
                    ${
                        selectedReview.status === "published"
                            ? "bg-green-100 text-green-800"
                            : selectedReview.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                    }
                  `}
                                >
                                    {selectedReview.status
                                        .charAt(0)
                                        .toUpperCase() +
                                        selectedReview.status.slice(1)}
                                </Badge>
                            </div>
                            <p className="text-gray-700">
                                {selectedReview.comment}
                            </p>
                            <p className="text-xs text-gray-500">
                                Reviewed on{" "}
                                {new Date(
                                    selectedReview.date
                                ).toLocaleDateString()}
                            </p>
                            {selectedReview.response && (
                                <Alert className="bg-blue-50 border-blue-200 text-blue-800">
                                    <MessageSquare className="h-4 w-4" />
                                    <AlertDescription>
                                        <span className="font-medium">
                                            Your Response:
                                        </span>{" "}
                                        {selectedReview.response}
                                    </AlertDescription>
                                </Alert>
                            )}
                        </div>
                    )}
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setIsViewDialogOpen(false)}
                        >
                            Close
                        </Button>
                        <Button
                            onClick={() => {
                                setSelectedReview({ ...selectedReview });
                                setIsViewDialogOpen(false);
                                setIsRespondDialogOpen(true);
                            }}
                            disabled={selectedReview?.status === "rejected"}
                        >
                            <MessageSquare className="h-4 w-4 mr-2" />
                            {selectedReview?.response
                                ? "Edit Response"
                                : "Add Response"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Respond to Review Dialog */}
            <Dialog
                open={isRespondDialogOpen}
                onOpenChange={setIsRespondDialogOpen}
            >
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Respond to Review</DialogTitle>
                    </DialogHeader>
                    {selectedReview && (
                        <div className="space-y-4 py-4">
                            <div>
                                <h3 className="text-lg font-semibold">
                                    {selectedReview.title}
                                </h3>
                                <p className="text-sm text-gray-500">
                                    By {selectedReview.customerName}
                                </p>
                            </div>
                            <div>
                                <Label htmlFor="responseComment">
                                    Your Response
                                </Label>
                                <Textarea
                                    id="responseComment"
                                    value={selectedReview.response || ""}
                                    onChange={(e) =>
                                        setSelectedReview({
                                            ...selectedReview,
                                            response: e.target.value,
                                        })
                                    }
                                    placeholder="Enter your response here..."
                                />
                            </div>
                        </div>
                    )}
                    <DialogFooter className="mt-4">
                        <Button
                            variant="outline"
                            onClick={() => setIsRespondDialogOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button onClick={handleRespondToReview}>
                            Save Response
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Review Dialog */}
            <Dialog
                open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
            >
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Confirm Deletion</DialogTitle>
                    </DialogHeader>

                    <p>
                        Are you sure you want to delete this review? This action
                        cannot be undone.
                    </p>

                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setIsDeleteDialogOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleDeleteReview}
                        >
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

const ReviewsTable = ({
    reviews,
    loading,
    renderStars,
    sortBy,
    sortDirection,
    onSortChange,
    onView,
    onEdit,
    onRespond,
    onStatusChange,
    onDelete,
}) => {
    if (loading) {
        return (
            <div className="text-center py-16">
                <p className="text-gray-500">Loading reviews...</p>
            </div>
        );
    }

    if (reviews.length === 0) {
        return (
            <div className="text-center py-16">
                <p className="text-gray-500">
                    No reviews found matching your filters.
                </p>
            </div>
        );
    }

    const renderSortIndicator = (column) => {
        if (sortBy === column) {
            return sortDirection === "asc" ? (
                <ArrowUp className="ml-1 h-3 w-3 inline" />
            ) : (
                <ArrowDown className="ml-1 h-3 w-3 inline" />
            );
        }
        return null;
    };

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead
                            className="cursor-pointer hover:text-gray-700"
                            onClick={() => onSortChange("trekName")}
                        >
                            Trek {renderSortIndicator("trekName")}
                        </TableHead>
                        <TableHead
                            className="cursor-pointer hover:text-gray-700"
                            onClick={() => onSortChange("customerName")}
                        >
                            Customer {renderSortIndicator("customerName")}
                        </TableHead>
                        <TableHead
                            className="cursor-pointer hover:text-gray-700"
                            onClick={() => onSortChange("rating")}
                        >
                            Rating {renderSortIndicator("rating")}
                        </TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead
                            className="cursor-pointer hover:text-gray-700"
                            onClick={() => onSortChange("date")}
                        >
                            Date {renderSortIndicator("date")}
                        </TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {reviews.map((review) => (
                        <TableRow key={review.id}>
                            <TableCell className="font-medium">
                                {review.trekName}
                            </TableCell>
                            <TableCell>{review.customerName}</TableCell>
                            <TableCell>{renderStars(review.rating)}</TableCell>
                            <TableCell className="font-medium">
                                {review.title}
                            </TableCell>
                            <TableCell>
                                {new Date(review.date).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                                <Badge
                                    variant="outline"
                                    className={`
                    ${
                        review.status === "published"
                            ? "bg-green-100 text-green-800"
                            : review.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                    }
                  `}
                                >
                                    {review.status.charAt(0).toUpperCase() +
                                        review.status.slice(1)}
                                </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                                <div className="flex justify-end space-x-2">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => onView(review)}
                                    >
                                        <Eye className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => onEdit(review)}
                                    >
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => onRespond(review)}
                                    >
                                        <MessageSquare className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() =>
                                            onStatusChange(review, "published")
                                        }
                                    >
                                        <Check className="h-4 w-4 text-green-500" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() =>
                                            onStatusChange(review, "rejected")
                                        }
                                    >
                                        <X className="h-4 w-4 text-red-500" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => onDelete(review)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default Reviews;
