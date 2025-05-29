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
  StarHalf
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  status: "published"
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
  const [newReview, setNewReview] = useState({...initialReview});
  const [selectedReview, setSelectedReview] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [sortDirection, setSortDirection] = useState("desc");

  // Load reviews from localStorage
  useEffect(() => {
    // Get treks for the dropdown
    const treksData = localStorage.getItem('vendorTreks');
    if (treksData) {
      const parsedTreks = JSON.parse(treksData).map((trek) => ({
        id: trek.id,
        name: trek.name
      }));
      setTreks(parsedTreks);
    }

    // Get reviews
    const reviewsData = localStorage.getItem('vendorReviews');
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
          comment: "The trek was breathtaking and our guide was very knowledgeable. Would definitely recommend!",
          date: "2025-05-10",
          status: "published",
          bookingId: 1
        },
        {
          id: 2,
          trekId: 2,
          trekName: "Valley Trek",
          customerName: "Jane Smith",
          rating: 4,
          title: "Great trek but could be better",
          comment: "Beautiful scenery and good organization. The food could have been better quality.",
          date: "2025-05-12",
          status: "published",
          response: "Thank you for your feedback! We're working on improving our meal options.",
          bookingId: 2
        },
        {
          id: 3,
          trekId: 1,
          trekName: "Himalayan Adventure",
          customerName: "Mike Johnson",
          rating: 3,
          title: "Average experience",
          comment: "The trek was okay but not as advertised. The accommodations were basic.",
          date: "2025-05-15",
          status: "pending",
          bookingId: 3
        }
      ];
      setReviews(sampleReviews);
      localStorage.setItem('vendorReviews', JSON.stringify(sampleReviews));
    }
    setLoading(false);
  }, []);

  // Filter and sort reviews
  const filteredReviews = reviews
    .filter(review => {
      // Filter by status
      if (statusFilter !== 'all' && review.status !== statusFilter) {
        return false;
      }
      
      // Filter by rating
      if (ratingFilter !== 'all') {
        const ratingNum = parseInt(ratingFilter);
        if (review.rating !== ratingNum) {
          return false;
        }
      }
      
      // Filter by active tab
      if (activeTab === 'published' && review.status !== 'published') return false;
      if (activeTab === 'pending' && review.status !== 'pending') return false;
      if (activeTab === 'rejected' && review.status !== 'rejected') return false;
      
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
        case 'date':
          compareValue = new Date(a.date).getTime() - new Date(b.date).getTime();
          break;
        case 'rating':
          compareValue = a.rating - b.rating;
          break;
        case 'customerName':
          compareValue = a.customerName.localeCompare(b.customerName);
          break;
        case 'trekName':
          compareValue = a.trekName.localeCompare(b.trekName);
          break;
        default:
          compareValue = 0;
      }
      
      return sortDirection === 'asc' ? compareValue : -compareValue;
    });

  // Handle adding new review
  const handleAddReview = () => {
    // Find trek name based on trek ID
    const selectedTrek = treks.find(trek => trek.id === Number(newReview.trekId));
    const newId = reviews.length > 0 ? Math.max(...reviews.map(r => r.id)) + 1 : 1;
    
    const reviewToAdd = {
      ...newReview,
      id: newId,
      trekName: selectedTrek?.name || "Unknown Trek"
    };
    
    const updatedReviews = [...reviews, reviewToAdd];
    localStorage.setItem('vendorReviews', JSON.stringify(updatedReviews));
    setReviews(updatedReviews);
    setNewReview({...initialReview});
    setIsAddDialogOpen(false);
    toast.success("Review added successfully!");
  };

  // Handle updating a review
  const handleUpdateReview = () => {
    if (!selectedReview) return;
    
    // Find trek name based on trek ID
    const selectedTrek = treks.find(trek => trek.id === Number(selectedReview.trekId));
    
    const updatedReview = {
      ...selectedReview,
      trekName: selectedTrek?.name || selectedReview.trekName
    };
    
    const updatedReviews = reviews.map(review => 
      review.id === selectedReview.id ? updatedReview : review
    );
    
    localStorage.setItem('vendorReviews', JSON.stringify(updatedReviews));
    setReviews(updatedReviews);
    setSelectedReview(null);
    setIsEditDialogOpen(false);
    toast.success("Review updated successfully!");
  };

  // Handle responding to a review
  const handleRespondToReview = () => {
    if (!selectedReview) return;
    
    const updatedReview = {
      ...selectedReview
    };
    
    const updatedReviews = reviews.map(review => 
      review.id === selectedReview.id ? updatedReview : review
    );
    
    localStorage.setItem('vendorReviews', JSON.stringify(updatedReviews));
    setReviews(updatedReviews);
    setSelectedReview(null);
    setIsRespondDialogOpen(false);
    toast.success("Response added successfully!");
  };

  // Handle approval of a review
  const handleReviewStatusChange = (review, newStatus) => {
    const updatedReview = {
      ...review,
      status: newStatus
    };
    
    const updatedReviews = reviews.map(r => 
      r.id === review.id ? updatedReview : r
    );
    
    localStorage.setItem('vendorReviews', JSON.stringify(updatedReviews));
    setReviews(updatedReviews);
    toast.success(`Review ${newStatus === "published" ? "published" : newStatus === "rejected" ? "rejected" : "marked as pending"} successfully!`);
  };

  // Handle deleting a review
  const handleDeleteReview = () => {
    if (!selectedReview) return;
    
    const updatedReviews = reviews.filter(review => review.id !== selectedReview.id);
    localStorage.setItem('vendorReviews', JSON.stringify(updatedReviews));
    setReviews(updatedReviews);
    setSelectedReview(null);
    setIsDeleteDialogOpen(false);
    toast.success("Review deleted successfully!");
  };

  // Toggle sort direction when clicking the same sort column
  const handleSortChange = (column) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortDirection('desc');
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
              star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`} 
          />
        ))}
      </div>
    );
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Reviews Management</h1>
        <Button 
          onClick={() => {
            setNewReview({...initialReview});
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
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="h-4 w-4 text-gray-400" />
              <Select value={ratingFilter} onValueChange={setRatingFilter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Filter by rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ratings</SelectItem>
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
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
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
              setSelectedReview({...review});
              setIsEditDialogOpen(true);
            }}
            onRespond={(review) => {
              setSelectedReview({...review});
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
              setSelectedReview({...review});
              setIsEditDialogOpen(true);
            }}
            onRespond={(review) => {
              setSelectedReview({...review});
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
              setSelectedReview({...review});
              setIsEditDialogOpen(true);
            }}
            onRespond={(review) => {
              setSelectedReview({...review});
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
              setSelectedReview({...review});
              setIsEditDialogOpen(true);
            }}
            onRespond={(review) => {
              setSelectedReview({...review});
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
              <Label htmlFor="trek">Trek</Label>
              <Select value={String(newReview.trekId)} onValueChange={(value) => setNewReview({...newReview, trekId: Number(value)})}>
                <SelectTrigger id="trek" className="w-full mt-1">
                  <SelectValue placeholder="Select Trek" />
                </SelectTrigger>
                <SelectContent>
                  {treks.map(trek => (
                    <SelectItem key={trek.id} value={String(trek.id)}>
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
                onChange={(e) => setNewReview({...newReview, customerName: e.target.value})} 
                className="mt-1" 
              />
            </div>
            
            <div>
              <Label htmlFor="customerEmail">Customer Email (Optional)</Label>
              <Input 
                id="customerEmail" 
                type="email" 
                value={newReview.customerEmail || ""} 
                onChange={(e) => setNewReview({...newReview, customerEmail: e.target.value})} 
                className="mt-1" 
              />
            </div>
            
            <div>
              <Label htmlFor="rating">Rating</Label>
              <div className="flex items-center mt-1 space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setNewReview({...newReview, rating: star})}
                    className="focus:outline-none"
                  >
                    <Star 
                      className={`h-6 w-6 ${
                        star <= newReview.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <Label htmlFor="title">Review Title</Label>
              <Input 
                id="title" 
                value={newReview.title} 
                onChange={(e) => setNewReview({...newReview, title: e.target.value})} 
                className="mt-1" 
              />
            </div>
            
            <div>
              <Label htmlFor="comment">Review Comment</Label>
              <Textarea 
                id="comment"
                rows={5}
                value={newReview.comment} 
                onChange={(e) => setNewReview({...newReview, comment: e.target.value})} 
                className="mt-1" 
              />
            </div>
            
            <div>
              <Label htmlFor="date">Review Date</Label>
              <Input 
                id="date" 
                type="date" 
                value={newReview.date} 
                onChange={(e) => setNewReview({...newReview, date: e.target.value})} 
                className="mt-1" 
              />
            </div>
            
            <div>
              <Label htmlFor="status">Review Status</Label>
              <Select value={newReview.status} onValueChange={(value) => setNewReview({...newReview, status: value})}>
                <SelectTrigger id="status" className="w-full mt-1">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
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
                <Label htmlFor="edit-trek">Trek</Label>
                <Select value={String(selectedReview.trekId)} onValueChange={(value) => setSelectedReview({...selectedReview, trekId: Number(value)})}>
                  <SelectTrigger id="edit-trek" className="w-full mt-1">
                    <SelectValue placeholder="Select Trek" />
                  </SelectTrigger>
                  <SelectContent>
                    {treks.map(trek => (
                      <SelectItem key={trek.id} value={String(trek.id)}>
                        {trek.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="edit-customerName">Customer Name</Label>
                <Input 
                  id="edit-customerName" 
                  value={selectedReview.customerName} 
                  onChange={(e) => setSelectedReview({...selectedReview, customerName: e.target.value})} 
                  className="mt-1" 
                />
              </div>
              
              <div>
                <Label htmlFor="edit-customerEmail">Customer Email (Optional)</Label>
                <Input 
                  id="edit-customerEmail" 
                  type="email" 
                  value={selectedReview.customerEmail || ""} 
                  onChange={(e) => setSelectedReview({...selectedReview, customerEmail: e.target.value})} 
                  className="mt-1" 
                />
              </div>
              
              <div>
                <Label htmlFor="edit-rating">Rating</Label>
                <div className="flex items-center mt-1 space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setSelectedReview({...selectedReview, rating: star})}
                      className="focus:outline-none"
                    >
                      <Star 
                        className={`h-6 w-6 ${
                          star <= selectedReview.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <Label htmlFor="edit-title">Review Title</Label>
                <Input 
                  id="edit-title" 
                  value={selectedReview.title} 
                  onChange={(e) => setSelectedReview({...selectedReview, title: e.target.value})} 
                  className="mt-1" 
                />
              </div>
              
              <div>
                <Label htmlFor="edit-comment">Review Comment</Label>
                <Textarea 
                  id="edit-comment"
                  rows={5}
                  value={selectedReview.comment} 
                  onChange={(e) => setSelectedReview({...selectedReview, comment: e.target.value})} 
                  className="mt-1" 
                />
              </div>
              
              <div>
                <Label htmlFor="edit-date">Review Date</Label>
                <Input 
                  id="edit-date" 
                  type="date" 
                  value={selectedReview.date} 
                  onChange={(e) => setSelectedReview({...selectedReview, date: e.target.value})} 
                  className="mt-1" 
                />
              </div>
              
              <div>
                <Label htmlFor="edit-status">Review Status</Label>
                <Select value={selectedReview.status} onValueChange={(value) => setSelectedReview({...selectedReview, status: value})}>
                  <SelectTrigger id="edit-status" className="w-full mt-1">
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="edit-response">Response (Optional)</Label>
                <Textarea 
                  id="edit-response"
                  rows={3}
                  value={selectedReview.response || ""} 
                  onChange={(e) => setSelectedReview({...selectedReview, response: e.target.value})} 
                  className="mt-1" 
                  placeholder="Enter your response to this review"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleUpdateReview}>Update Review</Button>
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
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold">{selectedReview.title}</h3>
                    <Badge className={
                      selectedReview.status === "published" ? "bg-green-100 text-green-800" :
                      selectedReview.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                      "bg-red-100 text-red-800"
                    }>
                      {selectedReview.status.charAt(0).toUpperCase() + selectedReview.status.slice(1)}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500">{new Date(selectedReview.date).toLocaleDateString()}</p>
                </div>
                
                <div className="flex items-center space-x-2">
                  {renderStars(selectedReview.rating)}
                  <span className="font-medium">{selectedReview.rating}.0</span>
                </div>
                
                <p className="text-sm text-gray-700">{selectedReview.comment}</p>
                
                <div className="pt-2">
                  <p className="text-sm font-semibold">Customer: {selectedReview.customerName}</p>
                  {selectedReview.customerEmail && (
                    <p className="text-sm text-gray-500">{selectedReview.customerEmail}</p>
                  )}
                </div>
                
                <p className="text-sm">
                  <span className="font-medium">Trek:</span> {selectedReview.trekName}
                </p>
              </div>
              
              {selectedReview.response && (
                <div className="bg-gray-50 p-4 rounded-md space-y-2 border-l-4 border-blue-500 mt-4">
                  <p className="font-semibold text-sm">Your Response:</p>
                  <p className="text-sm">{selectedReview.response}</p>
                </div>
              )}
              
              <div className="flex justify-end space-x-2 pt-2">
                <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>Close</Button>
                <Button onClick={() => {
                  setIsViewDialogOpen(false);
                  setSelectedReview({...selectedReview});
                  setIsEditDialogOpen(true);
                }}>Edit</Button>
                {!selectedReview.response && (
                  <Button 
                    variant="outline" 
                    className="flex items-center" 
                    onClick={() => {
                      setIsViewDialogOpen(false);
                      setSelectedReview({...selectedReview});
                      setIsRespondDialogOpen(true);
                    }}
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Respond
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Respond to Review Dialog */}
      <Dialog open={isRespondDialogOpen} onOpenChange={setIsRespondDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Respond to Review</DialogTitle>
          </DialogHeader>
          {selectedReview && (
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-md space-y-2">
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold">{selectedReview.title}</h3>
                  {renderStars(selectedReview.rating)}
                </div>
                <p className="text-sm text-gray-700">{selectedReview.comment}</p>
                <p className="text-xs text-gray-500">
                  by {selectedReview.customerName} • {new Date(selectedReview.date).toLocaleDateString()}
                </p>
              </div>
              
              <div>
                <Label htmlFor="response-text">Your Response</Label>
                <Textarea 
                  id="response-text"
                  rows={5}
                  value={selectedReview.response || ""} 
                  onChange={(e) => setSelectedReview({...selectedReview, response: e.target.value})} 
                  className="mt-1" 
                  placeholder="Enter your response to this review"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Your response will be visible to customers. Be polite, professional, and address any concerns raised in the review.
                </p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRespondDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleRespondToReview}>Submit Response</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Review Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this review? This action cannot be undone.</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteReview}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Reviews Table Component
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
  onDelete
}) => {
  if (loading) {
    return <div className="text-center p-8">Loading...</div>;
  }

  if (reviews.length === 0) {
    return (
      <div className="bg-white rounded-md shadow-sm p-8 text-center">
        <StarHalf className="h-16 w-16 mx-auto text-gray-300 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-1">No reviews found</h3>
        <p className="text-gray-500 mb-4">There are no reviews matching your filters.</p>
      </div>
    );
  }

  // Render sort indicator
  const renderSortIndicator = (column) => {
    if (sortBy === column) {
      return sortDirection === 'asc' ? (
        <ArrowUp className="h-3 w-3 ml-1" />
      ) : (
        <ArrowDown className="h-3 w-3 ml-1" />
      );
    }
    return null;
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">
              <button 
                onClick={() => onSortChange('id')} 
                className="flex items-center focus:outline-none hover:text-black"
              >
                ID {renderSortIndicator('id')}
              </button>
            </TableHead>
            <TableHead>
              <button 
                onClick={() => onSortChange('trekName')} 
                className="flex items-center focus:outline-none hover:text-black"
              >
                Trek {renderSortIndicator('trekName')}
              </button>
            </TableHead>
            <TableHead>
              <button 
                onClick={() => onSortChange('customerName')} 
                className="flex items-center focus:outline-none hover:text-black"
              >
                Customer {renderSortIndicator('customerName')}
              </button>
            </TableHead>
            <TableHead>
              <button 
                onClick={() => onSortChange('rating')} 
                className="flex items-center focus:outline-none hover:text-black"
              >
                Rating {renderSortIndicator('rating')}
              </button>
            </TableHead>
            <TableHead>Review</TableHead>
            <TableHead>
              <button 
                onClick={() => onSortChange('date')} 
                className="flex items-center focus:outline-none hover:text-black"
              >
                Date {renderSortIndicator('date')}
              </button>
            </TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Response</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reviews.map(review => (
            <TableRow key={review.id}>
              <TableCell className="font-medium">#{review.id}</TableCell>
              <TableCell className="max-w-[120px] truncate" title={review.trekName}>
                {review.trekName}
              </TableCell>
              <TableCell className="max-w-[120px] truncate" title={review.customerName}>
                {review.customerName}
              </TableCell>
              <TableCell>{renderStars(review.rating)}</TableCell>
              <TableCell className="max-w-[150px] truncate" title={review.title}>
                <div className="flex flex-col">
                  <span className="font-medium">{review.title}</span>
                  <span className="text-xs text-gray-500 truncate">{review.comment}</span>
                </div>
              </TableCell>
              <TableCell>{new Date(review.date).toLocaleDateString()}</TableCell>
              <TableCell>
                <Badge className={
                  review.status === "published" ? "bg-green-100 text-green-800" :
                  review.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                  "bg-red-100 text-red-800"
                }>
                  {review.status.charAt(0).toUpperCase() + review.status.slice(1)}
                </Badge>
              </TableCell>
              <TableCell>
                {review.response ? (
                  <Badge variant="outline" className="bg-blue-50">
                    Responded
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-gray-50">
                    No Response
                  </Badge>
                )}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-1">
                  <Button variant="ghost" size="icon" onClick={() => onView(review)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => onEdit(review)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  {!review.response && (
                    <Button variant="ghost" size="icon" onClick={() => onRespond(review)}>
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  )}
                  {review.status !== "published" && (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-green-500" 
                      onClick={() => onStatusChange(review, "published")}
                      title="Approve"
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                  )}
                  {review.status !== "rejected" && (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-red-500" 
                      onClick={() => onStatusChange(review, "rejected")}
                      title="Reject"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-red-500" 
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
