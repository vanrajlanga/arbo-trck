import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Plus, Search, Filter, Star, Edit, Trash2, ArrowUp, ArrowDown, Check, X, MessageSquare, Eye, StarHalf } from "lucide-react";
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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
  const [newReview, setNewReview] = useState({
    ...initialReview
  });
  const [selectedReview, setSelectedReview] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [sortDirection, setSortDirection] = useState("desc");

  // Load reviews from localStorage
  useEffect(() => {
    // Get treks for the dropdown
    const treksData = localStorage.getItem('vendorTreks');
    if (treksData) {
      const parsedTreks = JSON.parse(treksData).map(trek => ({
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
      const sampleReviews = [{
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
      }, {
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
      }, {
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
      }];
      setReviews(sampleReviews);
      localStorage.setItem('vendorReviews', JSON.stringify(sampleReviews));
    }
    setLoading(false);
  }, []);

  // Filter and sort reviews
  const filteredReviews = reviews.filter(review => {
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
    return review.customerName.toLowerCase().includes(searchLower) || review.trekName.toLowerCase().includes(searchLower) || review.title.toLowerCase().includes(searchLower) || review.comment.toLowerCase().includes(searchLower);
  }).sort((a, b) => {
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
    setNewReview({
      ...initialReview
    });
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
    const updatedReviews = reviews.map(review => review.id === selectedReview.id ? updatedReview : review);
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
    const updatedReviews = reviews.map(review => review.id === selectedReview.id ? updatedReview : review);
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
    const updatedReviews = reviews.map(r => r.id === review.id ? updatedReview : r);
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
  const handleSortChange = column => {
    if (sortBy === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortDirection('desc');
    }
  };

  // Render review stars
  const renderStars = rating => {
    return /*#__PURE__*/_jsx("div", {
      className: "flex",
      children: [1, 2, 3, 4, 5].map(star => /*#__PURE__*/_jsx(Star, {
        className: `h-4 w-4 ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`
      }, star))
    });
  };
  return /*#__PURE__*/_jsxs("div", {
    children: [/*#__PURE__*/_jsxs("div", {
      className: "flex flex-col md:flex-row md:items-center justify-between mb-6",
      children: [/*#__PURE__*/_jsx("h1", {
        className: "text-2xl font-bold mb-4 md:mb-0",
        children: "Reviews Management"
      }), /*#__PURE__*/_jsxs(Button, {
        onClick: () => {
          setNewReview({
            ...initialReview
          });
          setIsAddDialogOpen(true);
        },
        className: "flex items-center",
        children: [/*#__PURE__*/_jsx(Plus, {
          className: "h-4 w-4 mr-2"
        }), "Add New Review"]
      })]
    }), /*#__PURE__*/_jsx(Card, {
      className: "mb-6",
      children: /*#__PURE__*/_jsx(CardContent, {
        className: "pt-6",
        children: /*#__PURE__*/_jsxs("div", {
          className: "grid grid-cols-1 md:grid-cols-3 gap-4",
          children: [/*#__PURE__*/_jsxs("div", {
            className: "relative",
            children: [/*#__PURE__*/_jsx(Search, {
              className: "absolute left-2 top-2.5 h-4 w-4 text-gray-400"
            }), /*#__PURE__*/_jsx(Input, {
              placeholder: "Search reviews...",
              value: searchTerm,
              onChange: e => setSearchTerm(e.target.value),
              className: "pl-8"
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "flex items-center space-x-2",
            children: [/*#__PURE__*/_jsx(Filter, {
              className: "h-4 w-4 text-gray-400"
            }), /*#__PURE__*/_jsxs(Select, {
              value: statusFilter,
              onValueChange: setStatusFilter,
              children: [/*#__PURE__*/_jsx(SelectTrigger, {
                className: "w-full",
                children: /*#__PURE__*/_jsx(SelectValue, {
                  placeholder: "Filter by status"
                })
              }), /*#__PURE__*/_jsxs(SelectContent, {
                children: [/*#__PURE__*/_jsx(SelectItem, {
                  value: "all",
                  children: "All Statuses"
                }), /*#__PURE__*/_jsx(SelectItem, {
                  value: "published",
                  children: "Published"
                }), /*#__PURE__*/_jsx(SelectItem, {
                  value: "pending",
                  children: "Pending"
                }), /*#__PURE__*/_jsx(SelectItem, {
                  value: "rejected",
                  children: "Rejected"
                })]
              })]
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "flex items-center space-x-2",
            children: [/*#__PURE__*/_jsx(Star, {
              className: "h-4 w-4 text-gray-400"
            }), /*#__PURE__*/_jsxs(Select, {
              value: ratingFilter,
              onValueChange: setRatingFilter,
              children: [/*#__PURE__*/_jsx(SelectTrigger, {
                className: "w-full",
                children: /*#__PURE__*/_jsx(SelectValue, {
                  placeholder: "Filter by rating"
                })
              }), /*#__PURE__*/_jsxs(SelectContent, {
                children: [/*#__PURE__*/_jsx(SelectItem, {
                  value: "all",
                  children: "All Ratings"
                }), /*#__PURE__*/_jsx(SelectItem, {
                  value: "5",
                  children: "5 Stars"
                }), /*#__PURE__*/_jsx(SelectItem, {
                  value: "4",
                  children: "4 Stars"
                }), /*#__PURE__*/_jsx(SelectItem, {
                  value: "3",
                  children: "3 Stars"
                }), /*#__PURE__*/_jsx(SelectItem, {
                  value: "2",
                  children: "2 Stars"
                }), /*#__PURE__*/_jsx(SelectItem, {
                  value: "1",
                  children: "1 Star"
                })]
              })]
            })]
          })]
        })
      })
    }), /*#__PURE__*/_jsxs(Tabs, {
      value: activeTab,
      onValueChange: setActiveTab,
      className: "mb-6",
      children: [/*#__PURE__*/_jsxs(TabsList, {
        children: [/*#__PURE__*/_jsx(TabsTrigger, {
          value: "all",
          children: "All Reviews"
        }), /*#__PURE__*/_jsx(TabsTrigger, {
          value: "published",
          children: "Published"
        }), /*#__PURE__*/_jsx(TabsTrigger, {
          value: "pending",
          children: "Pending"
        }), /*#__PURE__*/_jsx(TabsTrigger, {
          value: "rejected",
          children: "Rejected"
        })]
      }), /*#__PURE__*/_jsx(TabsContent, {
        value: "all",
        className: "mt-6",
        children: /*#__PURE__*/_jsx(ReviewsTable, {
          reviews: filteredReviews,
          loading: loading,
          renderStars: renderStars,
          sortBy: sortBy,
          sortDirection: sortDirection,
          onSortChange: handleSortChange,
          onView: review => {
            setSelectedReview(review);
            setIsViewDialogOpen(true);
          },
          onEdit: review => {
            setSelectedReview({
              ...review
            });
            setIsEditDialogOpen(true);
          },
          onRespond: review => {
            setSelectedReview({
              ...review
            });
            setIsRespondDialogOpen(true);
          },
          onStatusChange: handleReviewStatusChange,
          onDelete: review => {
            setSelectedReview(review);
            setIsDeleteDialogOpen(true);
          }
        })
      }), /*#__PURE__*/_jsx(TabsContent, {
        value: "published",
        className: "mt-6",
        children: /*#__PURE__*/_jsx(ReviewsTable, {
          reviews: filteredReviews,
          loading: loading,
          renderStars: renderStars,
          sortBy: sortBy,
          sortDirection: sortDirection,
          onSortChange: handleSortChange,
          onView: review => {
            setSelectedReview(review);
            setIsViewDialogOpen(true);
          },
          onEdit: review => {
            setSelectedReview({
              ...review
            });
            setIsEditDialogOpen(true);
          },
          onRespond: review => {
            setSelectedReview({
              ...review
            });
            setIsRespondDialogOpen(true);
          },
          onStatusChange: handleReviewStatusChange,
          onDelete: review => {
            setSelectedReview(review);
            setIsDeleteDialogOpen(true);
          }
        })
      }), /*#__PURE__*/_jsx(TabsContent, {
        value: "pending",
        className: "mt-6",
        children: /*#__PURE__*/_jsx(ReviewsTable, {
          reviews: filteredReviews,
          loading: loading,
          renderStars: renderStars,
          sortBy: sortBy,
          sortDirection: sortDirection,
          onSortChange: handleSortChange,
          onView: review => {
            setSelectedReview(review);
            setIsViewDialogOpen(true);
          },
          onEdit: review => {
            setSelectedReview({
              ...review
            });
            setIsEditDialogOpen(true);
          },
          onRespond: review => {
            setSelectedReview({
              ...review
            });
            setIsRespondDialogOpen(true);
          },
          onStatusChange: handleReviewStatusChange,
          onDelete: review => {
            setSelectedReview(review);
            setIsDeleteDialogOpen(true);
          }
        })
      }), /*#__PURE__*/_jsx(TabsContent, {
        value: "rejected",
        className: "mt-6",
        children: /*#__PURE__*/_jsx(ReviewsTable, {
          reviews: filteredReviews,
          loading: loading,
          renderStars: renderStars,
          sortBy: sortBy,
          sortDirection: sortDirection,
          onSortChange: handleSortChange,
          onView: review => {
            setSelectedReview(review);
            setIsViewDialogOpen(true);
          },
          onEdit: review => {
            setSelectedReview({
              ...review
            });
            setIsEditDialogOpen(true);
          },
          onRespond: review => {
            setSelectedReview({
              ...review
            });
            setIsRespondDialogOpen(true);
          },
          onStatusChange: handleReviewStatusChange,
          onDelete: review => {
            setSelectedReview(review);
            setIsDeleteDialogOpen(true);
          }
        })
      })]
    }), /*#__PURE__*/_jsx(Dialog, {
      open: isAddDialogOpen,
      onOpenChange: setIsAddDialogOpen,
      children: /*#__PURE__*/_jsxs(DialogContent, {
        className: "max-w-lg",
        children: [/*#__PURE__*/_jsx(DialogHeader, {
          children: /*#__PURE__*/_jsx(DialogTitle, {
            children: "Add New Review"
          })
        }), /*#__PURE__*/_jsxs("div", {
          className: "grid grid-cols-1 gap-4",
          children: [/*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx(Label, {
              htmlFor: "trek",
              children: "Trek"
            }), /*#__PURE__*/_jsxs(Select, {
              value: String(newReview.trekId),
              onValueChange: value => setNewReview({
                ...newReview,
                trekId: Number(value)
              }),
              children: [/*#__PURE__*/_jsx(SelectTrigger, {
                id: "trek",
                className: "w-full mt-1",
                children: /*#__PURE__*/_jsx(SelectValue, {
                  placeholder: "Select Trek"
                })
              }), /*#__PURE__*/_jsx(SelectContent, {
                children: treks.map(trek => /*#__PURE__*/_jsx(SelectItem, {
                  value: String(trek.id),
                  children: trek.name
                }, trek.id))
              })]
            })]
          }), /*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx(Label, {
              htmlFor: "customerName",
              children: "Customer Name"
            }), /*#__PURE__*/_jsx(Input, {
              id: "customerName",
              value: newReview.customerName,
              onChange: e => setNewReview({
                ...newReview,
                customerName: e.target.value
              }),
              className: "mt-1"
            })]
          }), /*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx(Label, {
              htmlFor: "customerEmail",
              children: "Customer Email (Optional)"
            }), /*#__PURE__*/_jsx(Input, {
              id: "customerEmail",
              type: "email",
              value: newReview.customerEmail || "",
              onChange: e => setNewReview({
                ...newReview,
                customerEmail: e.target.value
              }),
              className: "mt-1"
            })]
          }), /*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx(Label, {
              htmlFor: "rating",
              children: "Rating"
            }), /*#__PURE__*/_jsx("div", {
              className: "flex items-center mt-1 space-x-2",
              children: [1, 2, 3, 4, 5].map(star => /*#__PURE__*/_jsx("button", {
                type: "button",
                onClick: () => setNewReview({
                  ...newReview,
                  rating: star
                }),
                className: "focus:outline-none",
                children: /*#__PURE__*/_jsx(Star, {
                  className: `h-6 w-6 ${star <= newReview.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`
                })
              }, star))
            })]
          }), /*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx(Label, {
              htmlFor: "title",
              children: "Review Title"
            }), /*#__PURE__*/_jsx(Input, {
              id: "title",
              value: newReview.title,
              onChange: e => setNewReview({
                ...newReview,
                title: e.target.value
              }),
              className: "mt-1"
            })]
          }), /*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx(Label, {
              htmlFor: "comment",
              children: "Review Comment"
            }), /*#__PURE__*/_jsx(Textarea, {
              id: "comment",
              rows: 5,
              value: newReview.comment,
              onChange: e => setNewReview({
                ...newReview,
                comment: e.target.value
              }),
              className: "mt-1"
            })]
          }), /*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx(Label, {
              htmlFor: "date",
              children: "Review Date"
            }), /*#__PURE__*/_jsx(Input, {
              id: "date",
              type: "date",
              value: newReview.date,
              onChange: e => setNewReview({
                ...newReview,
                date: e.target.value
              }),
              className: "mt-1"
            })]
          }), /*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx(Label, {
              htmlFor: "status",
              children: "Review Status"
            }), /*#__PURE__*/_jsxs(Select, {
              value: newReview.status,
              onValueChange: value => setNewReview({
                ...newReview,
                status: value
              }),
              children: [/*#__PURE__*/_jsx(SelectTrigger, {
                id: "status",
                className: "w-full mt-1",
                children: /*#__PURE__*/_jsx(SelectValue, {
                  placeholder: "Select Status"
                })
              }), /*#__PURE__*/_jsxs(SelectContent, {
                children: [/*#__PURE__*/_jsx(SelectItem, {
                  value: "published",
                  children: "Published"
                }), /*#__PURE__*/_jsx(SelectItem, {
                  value: "pending",
                  children: "Pending"
                }), /*#__PURE__*/_jsx(SelectItem, {
                  value: "rejected",
                  children: "Rejected"
                })]
              })]
            })]
          })]
        }), /*#__PURE__*/_jsxs(DialogFooter, {
          children: [/*#__PURE__*/_jsx(Button, {
            variant: "outline",
            onClick: () => setIsAddDialogOpen(false),
            children: "Cancel"
          }), /*#__PURE__*/_jsx(Button, {
            onClick: handleAddReview,
            children: "Add Review"
          })]
        })]
      })
    }), /*#__PURE__*/_jsx(Dialog, {
      open: isEditDialogOpen,
      onOpenChange: setIsEditDialogOpen,
      children: /*#__PURE__*/_jsxs(DialogContent, {
        className: "max-w-lg",
        children: [/*#__PURE__*/_jsx(DialogHeader, {
          children: /*#__PURE__*/_jsx(DialogTitle, {
            children: "Edit Review"
          })
        }), selectedReview && /*#__PURE__*/_jsxs("div", {
          className: "grid grid-cols-1 gap-4",
          children: [/*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx(Label, {
              htmlFor: "edit-trek",
              children: "Trek"
            }), /*#__PURE__*/_jsxs(Select, {
              value: String(selectedReview.trekId),
              onValueChange: value => setSelectedReview({
                ...selectedReview,
                trekId: Number(value)
              }),
              children: [/*#__PURE__*/_jsx(SelectTrigger, {
                id: "edit-trek",
                className: "w-full mt-1",
                children: /*#__PURE__*/_jsx(SelectValue, {
                  placeholder: "Select Trek"
                })
              }), /*#__PURE__*/_jsx(SelectContent, {
                children: treks.map(trek => /*#__PURE__*/_jsx(SelectItem, {
                  value: String(trek.id),
                  children: trek.name
                }, trek.id))
              })]
            })]
          }), /*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx(Label, {
              htmlFor: "edit-customerName",
              children: "Customer Name"
            }), /*#__PURE__*/_jsx(Input, {
              id: "edit-customerName",
              value: selectedReview.customerName,
              onChange: e => setSelectedReview({
                ...selectedReview,
                customerName: e.target.value
              }),
              className: "mt-1"
            })]
          }), /*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx(Label, {
              htmlFor: "edit-customerEmail",
              children: "Customer Email (Optional)"
            }), /*#__PURE__*/_jsx(Input, {
              id: "edit-customerEmail",
              type: "email",
              value: selectedReview.customerEmail || "",
              onChange: e => setSelectedReview({
                ...selectedReview,
                customerEmail: e.target.value
              }),
              className: "mt-1"
            })]
          }), /*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx(Label, {
              htmlFor: "edit-rating",
              children: "Rating"
            }), /*#__PURE__*/_jsx("div", {
              className: "flex items-center mt-1 space-x-2",
              children: [1, 2, 3, 4, 5].map(star => /*#__PURE__*/_jsx("button", {
                type: "button",
                onClick: () => setSelectedReview({
                  ...selectedReview,
                  rating: star
                }),
                className: "focus:outline-none",
                children: /*#__PURE__*/_jsx(Star, {
                  className: `h-6 w-6 ${star <= selectedReview.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`
                })
              }, star))
            })]
          }), /*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx(Label, {
              htmlFor: "edit-title",
              children: "Review Title"
            }), /*#__PURE__*/_jsx(Input, {
              id: "edit-title",
              value: selectedReview.title,
              onChange: e => setSelectedReview({
                ...selectedReview,
                title: e.target.value
              }),
              className: "mt-1"
            })]
          }), /*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx(Label, {
              htmlFor: "edit-comment",
              children: "Review Comment"
            }), /*#__PURE__*/_jsx(Textarea, {
              id: "edit-comment",
              rows: 5,
              value: selectedReview.comment,
              onChange: e => setSelectedReview({
                ...selectedReview,
                comment: e.target.value
              }),
              className: "mt-1"
            })]
          }), /*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx(Label, {
              htmlFor: "edit-date",
              children: "Review Date"
            }), /*#__PURE__*/_jsx(Input, {
              id: "edit-date",
              type: "date",
              value: selectedReview.date,
              onChange: e => setSelectedReview({
                ...selectedReview,
                date: e.target.value
              }),
              className: "mt-1"
            })]
          }), /*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx(Label, {
              htmlFor: "edit-status",
              children: "Review Status"
            }), /*#__PURE__*/_jsxs(Select, {
              value: selectedReview.status,
              onValueChange: value => setSelectedReview({
                ...selectedReview,
                status: value
              }),
              children: [/*#__PURE__*/_jsx(SelectTrigger, {
                id: "edit-status",
                className: "w-full mt-1",
                children: /*#__PURE__*/_jsx(SelectValue, {
                  placeholder: "Select Status"
                })
              }), /*#__PURE__*/_jsxs(SelectContent, {
                children: [/*#__PURE__*/_jsx(SelectItem, {
                  value: "published",
                  children: "Published"
                }), /*#__PURE__*/_jsx(SelectItem, {
                  value: "pending",
                  children: "Pending"
                }), /*#__PURE__*/_jsx(SelectItem, {
                  value: "rejected",
                  children: "Rejected"
                })]
              })]
            })]
          }), /*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx(Label, {
              htmlFor: "edit-response",
              children: "Response (Optional)"
            }), /*#__PURE__*/_jsx(Textarea, {
              id: "edit-response",
              rows: 3,
              value: selectedReview.response || "",
              onChange: e => setSelectedReview({
                ...selectedReview,
                response: e.target.value
              }),
              className: "mt-1",
              placeholder: "Enter your response to this review"
            })]
          })]
        }), /*#__PURE__*/_jsxs(DialogFooter, {
          children: [/*#__PURE__*/_jsx(Button, {
            variant: "outline",
            onClick: () => setIsEditDialogOpen(false),
            children: "Cancel"
          }), /*#__PURE__*/_jsx(Button, {
            onClick: handleUpdateReview,
            children: "Update Review"
          })]
        })]
      })
    }), /*#__PURE__*/_jsx(Dialog, {
      open: isViewDialogOpen,
      onOpenChange: setIsViewDialogOpen,
      children: /*#__PURE__*/_jsxs(DialogContent, {
        className: "max-w-lg",
        children: [/*#__PURE__*/_jsx(DialogHeader, {
          children: /*#__PURE__*/_jsx(DialogTitle, {
            children: "Review Details"
          })
        }), selectedReview && /*#__PURE__*/_jsxs("div", {
          className: "space-y-4",
          children: [/*#__PURE__*/_jsxs("div", {
            className: "space-y-2",
            children: [/*#__PURE__*/_jsxs("div", {
              className: "flex items-center justify-between",
              children: [/*#__PURE__*/_jsxs("div", {
                className: "flex items-center space-x-2",
                children: [/*#__PURE__*/_jsx("h3", {
                  className: "font-semibold",
                  children: selectedReview.title
                }), /*#__PURE__*/_jsx(Badge, {
                  className: selectedReview.status === "published" ? "bg-green-100 text-green-800" : selectedReview.status === "pending" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800",
                  children: selectedReview.status.charAt(0).toUpperCase() + selectedReview.status.slice(1)
                })]
              }), /*#__PURE__*/_jsx("p", {
                className: "text-sm text-gray-500",
                children: new Date(selectedReview.date).toLocaleDateString()
              })]
            }), /*#__PURE__*/_jsxs("div", {
              className: "flex items-center space-x-2",
              children: [renderStars(selectedReview.rating), /*#__PURE__*/_jsxs("span", {
                className: "font-medium",
                children: [selectedReview.rating, ".0"]
              })]
            }), /*#__PURE__*/_jsx("p", {
              className: "text-sm text-gray-700",
              children: selectedReview.comment
            }), /*#__PURE__*/_jsxs("div", {
              className: "pt-2",
              children: [/*#__PURE__*/_jsxs("p", {
                className: "text-sm font-semibold",
                children: ["Customer: ", selectedReview.customerName]
              }), selectedReview.customerEmail && /*#__PURE__*/_jsx("p", {
                className: "text-sm text-gray-500",
                children: selectedReview.customerEmail
              })]
            }), /*#__PURE__*/_jsxs("p", {
              className: "text-sm",
              children: [/*#__PURE__*/_jsx("span", {
                className: "font-medium",
                children: "Trek:"
              }), " ", selectedReview.trekName]
            })]
          }), selectedReview.response && /*#__PURE__*/_jsxs("div", {
            className: "bg-gray-50 p-4 rounded-md space-y-2 border-l-4 border-blue-500 mt-4",
            children: [/*#__PURE__*/_jsx("p", {
              className: "font-semibold text-sm",
              children: "Your Response:"
            }), /*#__PURE__*/_jsx("p", {
              className: "text-sm",
              children: selectedReview.response
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "flex justify-end space-x-2 pt-2",
            children: [/*#__PURE__*/_jsx(Button, {
              variant: "outline",
              onClick: () => setIsViewDialogOpen(false),
              children: "Close"
            }), /*#__PURE__*/_jsx(Button, {
              onClick: () => {
                setIsViewDialogOpen(false);
                setSelectedReview({
                  ...selectedReview
                });
                setIsEditDialogOpen(true);
              },
              children: "Edit"
            }), !selectedReview.response && /*#__PURE__*/_jsxs(Button, {
              variant: "outline",
              className: "flex items-center",
              onClick: () => {
                setIsViewDialogOpen(false);
                setSelectedReview({
                  ...selectedReview
                });
                setIsRespondDialogOpen(true);
              },
              children: [/*#__PURE__*/_jsx(MessageSquare, {
                className: "h-4 w-4 mr-2"
              }), "Respond"]
            })]
          })]
        })]
      })
    }), /*#__PURE__*/_jsx(Dialog, {
      open: isRespondDialogOpen,
      onOpenChange: setIsRespondDialogOpen,
      children: /*#__PURE__*/_jsxs(DialogContent, {
        className: "max-w-lg",
        children: [/*#__PURE__*/_jsx(DialogHeader, {
          children: /*#__PURE__*/_jsx(DialogTitle, {
            children: "Respond to Review"
          })
        }), selectedReview && /*#__PURE__*/_jsxs("div", {
          className: "space-y-4",
          children: [/*#__PURE__*/_jsxs("div", {
            className: "bg-gray-50 p-4 rounded-md space-y-2",
            children: [/*#__PURE__*/_jsxs("div", {
              className: "flex items-center space-x-2",
              children: [/*#__PURE__*/_jsx("h3", {
                className: "font-semibold",
                children: selectedReview.title
              }), renderStars(selectedReview.rating)]
            }), /*#__PURE__*/_jsx("p", {
              className: "text-sm text-gray-700",
              children: selectedReview.comment
            }), /*#__PURE__*/_jsxs("p", {
              className: "text-xs text-gray-500",
              children: ["by ", selectedReview.customerName, " \u2022 ", new Date(selectedReview.date).toLocaleDateString()]
            })]
          }), /*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx(Label, {
              htmlFor: "response-text",
              children: "Your Response"
            }), /*#__PURE__*/_jsx(Textarea, {
              id: "response-text",
              rows: 5,
              value: selectedReview.response || "",
              onChange: e => setSelectedReview({
                ...selectedReview,
                response: e.target.value
              }),
              className: "mt-1",
              placeholder: "Enter your response to this review"
            }), /*#__PURE__*/_jsx("p", {
              className: "text-xs text-gray-500 mt-2",
              children: "Your response will be visible to customers. Be polite, professional, and address any concerns raised in the review."
            })]
          })]
        }), /*#__PURE__*/_jsxs(DialogFooter, {
          children: [/*#__PURE__*/_jsx(Button, {
            variant: "outline",
            onClick: () => setIsRespondDialogOpen(false),
            children: "Cancel"
          }), /*#__PURE__*/_jsx(Button, {
            onClick: handleRespondToReview,
            children: "Submit Response"
          })]
        })]
      })
    }), /*#__PURE__*/_jsx(Dialog, {
      open: isDeleteDialogOpen,
      onOpenChange: setIsDeleteDialogOpen,
      children: /*#__PURE__*/_jsxs(DialogContent, {
        className: "max-w-md",
        children: [/*#__PURE__*/_jsx(DialogHeader, {
          children: /*#__PURE__*/_jsx(DialogTitle, {
            children: "Confirm Deletion"
          })
        }), /*#__PURE__*/_jsx("p", {
          children: "Are you sure you want to delete this review? This action cannot be undone."
        }), /*#__PURE__*/_jsxs(DialogFooter, {
          children: [/*#__PURE__*/_jsx(Button, {
            variant: "outline",
            onClick: () => setIsDeleteDialogOpen(false),
            children: "Cancel"
          }), /*#__PURE__*/_jsx(Button, {
            variant: "destructive",
            onClick: handleDeleteReview,
            children: "Delete"
          })]
        })]
      })
    })]
  });
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
    return /*#__PURE__*/_jsx("div", {
      className: "text-center p-8",
      children: "Loading..."
    });
  }
  if (reviews.length === 0) {
    return /*#__PURE__*/_jsxs("div", {
      className: "bg-white rounded-md shadow-sm p-8 text-center",
      children: [/*#__PURE__*/_jsx(StarHalf, {
        className: "h-16 w-16 mx-auto text-gray-300 mb-4"
      }), /*#__PURE__*/_jsx("h3", {
        className: "text-lg font-medium text-gray-900 mb-1",
        children: "No reviews found"
      }), /*#__PURE__*/_jsx("p", {
        className: "text-gray-500 mb-4",
        children: "There are no reviews matching your filters."
      })]
    });
  }

  // Render sort indicator
  const renderSortIndicator = column => {
    if (sortBy === column) {
      return sortDirection === 'asc' ? /*#__PURE__*/_jsx(ArrowUp, {
        className: "h-3 w-3 ml-1"
      }) : /*#__PURE__*/_jsx(ArrowDown, {
        className: "h-3 w-3 ml-1"
      });
    }
    return null;
  };
  return /*#__PURE__*/_jsx("div", {
    className: "rounded-md border",
    children: /*#__PURE__*/_jsxs(Table, {
      children: [/*#__PURE__*/_jsx(TableHeader, {
        children: /*#__PURE__*/_jsxs(TableRow, {
          children: [/*#__PURE__*/_jsx(TableHead, {
            className: "w-[80px]",
            children: /*#__PURE__*/_jsxs("button", {
              onClick: () => onSortChange('id'),
              className: "flex items-center focus:outline-none hover:text-black",
              children: ["ID ", renderSortIndicator('id')]
            })
          }), /*#__PURE__*/_jsx(TableHead, {
            children: /*#__PURE__*/_jsxs("button", {
              onClick: () => onSortChange('trekName'),
              className: "flex items-center focus:outline-none hover:text-black",
              children: ["Trek ", renderSortIndicator('trekName')]
            })
          }), /*#__PURE__*/_jsx(TableHead, {
            children: /*#__PURE__*/_jsxs("button", {
              onClick: () => onSortChange('customerName'),
              className: "flex items-center focus:outline-none hover:text-black",
              children: ["Customer ", renderSortIndicator('customerName')]
            })
          }), /*#__PURE__*/_jsx(TableHead, {
            children: /*#__PURE__*/_jsxs("button", {
              onClick: () => onSortChange('rating'),
              className: "flex items-center focus:outline-none hover:text-black",
              children: ["Rating ", renderSortIndicator('rating')]
            })
          }), /*#__PURE__*/_jsx(TableHead, {
            children: "Review"
          }), /*#__PURE__*/_jsx(TableHead, {
            children: /*#__PURE__*/_jsxs("button", {
              onClick: () => onSortChange('date'),
              className: "flex items-center focus:outline-none hover:text-black",
              children: ["Date ", renderSortIndicator('date')]
            })
          }), /*#__PURE__*/_jsx(TableHead, {
            children: "Status"
          }), /*#__PURE__*/_jsx(TableHead, {
            children: "Response"
          }), /*#__PURE__*/_jsx(TableHead, {
            className: "text-right",
            children: "Actions"
          })]
        })
      }), /*#__PURE__*/_jsx(TableBody, {
        children: reviews.map(review => /*#__PURE__*/_jsxs(TableRow, {
          children: [/*#__PURE__*/_jsxs(TableCell, {
            className: "font-medium",
            children: ["#", review.id]
          }), /*#__PURE__*/_jsx(TableCell, {
            className: "max-w-[120px] truncate",
            title: review.trekName,
            children: review.trekName
          }), /*#__PURE__*/_jsx(TableCell, {
            className: "max-w-[120px] truncate",
            title: review.customerName,
            children: review.customerName
          }), /*#__PURE__*/_jsx(TableCell, {
            children: renderStars(review.rating)
          }), /*#__PURE__*/_jsx(TableCell, {
            className: "max-w-[150px] truncate",
            title: review.title,
            children: /*#__PURE__*/_jsxs("div", {
              className: "flex flex-col",
              children: [/*#__PURE__*/_jsx("span", {
                className: "font-medium",
                children: review.title
              }), /*#__PURE__*/_jsx("span", {
                className: "text-xs text-gray-500 truncate",
                children: review.comment
              })]
            })
          }), /*#__PURE__*/_jsx(TableCell, {
            children: new Date(review.date).toLocaleDateString()
          }), /*#__PURE__*/_jsx(TableCell, {
            children: /*#__PURE__*/_jsx(Badge, {
              className: review.status === "published" ? "bg-green-100 text-green-800" : review.status === "pending" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800",
              children: review.status.charAt(0).toUpperCase() + review.status.slice(1)
            })
          }), /*#__PURE__*/_jsx(TableCell, {
            children: review.response ? /*#__PURE__*/_jsx(Badge, {
              variant: "outline",
              className: "bg-blue-50",
              children: "Responded"
            }) : /*#__PURE__*/_jsx(Badge, {
              variant: "outline",
              className: "bg-gray-50",
              children: "No Response"
            })
          }), /*#__PURE__*/_jsx(TableCell, {
            className: "text-right",
            children: /*#__PURE__*/_jsxs("div", {
              className: "flex justify-end space-x-1",
              children: [/*#__PURE__*/_jsx(Button, {
                variant: "ghost",
                size: "icon",
                onClick: () => onView(review),
                children: /*#__PURE__*/_jsx(Eye, {
                  className: "h-4 w-4"
                })
              }), /*#__PURE__*/_jsx(Button, {
                variant: "ghost",
                size: "icon",
                onClick: () => onEdit(review),
                children: /*#__PURE__*/_jsx(Edit, {
                  className: "h-4 w-4"
                })
              }), !review.response && /*#__PURE__*/_jsx(Button, {
                variant: "ghost",
                size: "icon",
                onClick: () => onRespond(review),
                children: /*#__PURE__*/_jsx(MessageSquare, {
                  className: "h-4 w-4"
                })
              }), review.status !== "published" && /*#__PURE__*/_jsx(Button, {
                variant: "ghost",
                size: "icon",
                className: "text-green-500",
                onClick: () => onStatusChange(review, "published"),
                title: "Approve",
                children: /*#__PURE__*/_jsx(Check, {
                  className: "h-4 w-4"
                })
              }), review.status !== "rejected" && /*#__PURE__*/_jsx(Button, {
                variant: "ghost",
                size: "icon",
                className: "text-red-500",
                onClick: () => onStatusChange(review, "rejected"),
                title: "Reject",
                children: /*#__PURE__*/_jsx(X, {
                  className: "h-4 w-4"
                })
              }), /*#__PURE__*/_jsx(Button, {
                variant: "ghost",
                size: "icon",
                className: "text-red-500",
                onClick: () => onDelete(review),
                children: /*#__PURE__*/_jsx(Trash2, {
                  className: "h-4 w-4"
                })
              })]
            })
          })]
        }, review.id))
      })]
    })
  });
};
export default Reviews;