import { useState } from "react";
import { Link } from "react-router-dom";
import { Users, TrendingUp, Map, BarChart, Clock, X, CheckCheck, Plus } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
const VendorDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data
  const upcomingTreks = [{
    id: 1,
    name: "Dandeli Adventure Trek",
    date: "May 25, 2025",
    slots: {
      total: 15,
      booked: 12
    },
    revenue: "₹36,000",
    status: "Active"
  }, {
    id: 2,
    name: "Gokarna Beach Trek",
    date: "Jun 10, 2025",
    slots: {
      total: 20,
      booked: 8
    },
    revenue: "₹24,000",
    status: "Active"
  }, {
    id: 3,
    name: "Vibhuti Waterfalls Trek",
    date: "Jun 18, 2025",
    slots: {
      total: 12,
      booked: 3
    },
    revenue: "₹9,000",
    status: "Active"
  }];
  const recentBookings = [{
    id: "TBR5678",
    customerName: "Rahul Sharma",
    trek: "Dandeli Adventure Trek",
    date: "May 25, 2025",
    amount: "₹3,000",
    participants: 1,
    status: "Confirmed"
  }, {
    id: "TBR5679",
    customerName: "Priya Patel",
    trek: "Dandeli Adventure Trek",
    date: "May 25, 2025",
    amount: "₹6,000",
    participants: 2,
    status: "Confirmed"
  }, {
    id: "TBR5680",
    customerName: "Ankit Gupta",
    trek: "Gokarna Beach Trek",
    date: "Jun 10, 2025",
    amount: "₹3,000",
    participants: 1,
    status: "Pending"
  }, {
    id: "TBR5681",
    customerName: "Neha Singh",
    trek: "Vibhuti Waterfalls Trek",
    date: "Jun 18, 2025",
    amount: "₹3,000",
    participants: 1,
    status: "Confirmed"
  }, {
    id: "TBR5682",
    customerName: "Vivek Kumar",
    trek: "Dandeli Adventure Trek",
    date: "May 25, 2025",
    amount: "₹3,000",
    participants: 1,
    status: "Cancelled"
  }];
  const recentReviews = [{
    id: 1,
    customerName: "Arun Mehta",
    trek: "Dandeli Adventure Trek",
    date: "Apr 15, 2025",
    rating: 5,
    comment: "Amazing experience! The guide was very knowledgeable and the trek was beautiful. Will definitely recommend."
  }, {
    id: 2,
    customerName: "Suman Joshi",
    trek: "Gokarna Beach Trek",
    date: "Apr 10, 2025",
    rating: 4,
    comment: "Great trek with beautiful views. The food could have been better, but overall a good experience."
  }, {
    id: 3,
    customerName: "Vikram Singh",
    trek: "Dandeli Adventure Trek",
    date: "Apr 05, 2025",
    rating: 5,
    comment: "One of the best treks I've ever been on! The arrangements were perfect and the guide was excellent."
  }];
  const alerts = [{
    id: 1,
    type: "refund",
    message: "New refund request for booking #TBR5682",
    time: "2 hours ago"
  }, {
    id: 2,
    type: "review",
    message: "New 5-star review from Arun Mehta",
    time: "5 hours ago"
  }, {
    id: 3,
    type: "booking",
    message: "3 new bookings for Dandeli Adventure Trek",
    time: "1 day ago"
  }];

  // Function to render star rating
  const renderRating = rating => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(/*#__PURE__*/_jsx("span", {
        className: i < rating ? "text-yellow-500" : "text-gray-300",
        children: "\u2605"
      }, i));
    }
    return stars;
  };

  // Function to calculate progress percentage
  const calculateProgress = (booked, total) => {
    return booked / total * 100;
  };
  return /*#__PURE__*/_jsxs("div", {
    children: [/*#__PURE__*/_jsxs("div", {
      className: "flex flex-col md:flex-row items-start md:items-center justify-between mb-8",
      children: [/*#__PURE__*/_jsx("h1", {
        className: "text-2xl font-bold",
        children: "Welcome to your Vendor Dashboard"
      }), /*#__PURE__*/_jsxs(Button, {
        className: "mt-4 md:mt-0 bg-aorbo-teal hover:bg-aorbo-teal/90",
        children: [/*#__PURE__*/_jsx(Plus, {
          className: "mr-2 h-4 w-4"
        }), "Add New Trek"]
      })]
    }), /*#__PURE__*/_jsxs("div", {
      className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8",
      children: [/*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsxs(CardHeader, {
          className: "flex flex-row items-center justify-between pb-2",
          children: [/*#__PURE__*/_jsx(CardTitle, {
            className: "text-sm font-medium",
            children: "Active Treks"
          }), /*#__PURE__*/_jsx(Map, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "3"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-xs text-muted-foreground",
            children: "+1 from last month"
          })]
        })]
      }), /*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsxs(CardHeader, {
          className: "flex flex-row items-center justify-between pb-2",
          children: [/*#__PURE__*/_jsx(CardTitle, {
            className: "text-sm font-medium",
            children: "Total Bookings"
          }), /*#__PURE__*/_jsx(Users, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "23"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-xs text-muted-foreground",
            children: "+8 from last month"
          })]
        })]
      }), /*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsxs(CardHeader, {
          className: "flex flex-row items-center justify-between pb-2",
          children: [/*#__PURE__*/_jsx(CardTitle, {
            className: "text-sm font-medium",
            children: "Monthly Revenue"
          }), /*#__PURE__*/_jsx(TrendingUp, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "\u20B969,000"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-xs text-muted-foreground",
            children: "+\u20B924,000 from last month"
          })]
        })]
      }), /*#__PURE__*/_jsxs(Card, {
        children: [/*#__PURE__*/_jsxs(CardHeader, {
          className: "flex flex-row items-center justify-between pb-2",
          children: [/*#__PURE__*/_jsx(CardTitle, {
            className: "text-sm font-medium",
            children: "Average Rating"
          }), /*#__PURE__*/_jsx(BarChart, {
            className: "h-4 w-4 text-muted-foreground"
          })]
        }), /*#__PURE__*/_jsxs(CardContent, {
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-2xl font-bold",
            children: "4.7/5"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-xs text-muted-foreground",
            children: "Based on 18 reviews"
          })]
        })]
      })]
    }), /*#__PURE__*/_jsxs(Tabs, {
      defaultValue: "overview",
      className: "mb-8",
      onValueChange: setActiveTab,
      children: [/*#__PURE__*/_jsxs(TabsList, {
        className: "grid w-full grid-cols-4 mb-4",
        children: [/*#__PURE__*/_jsx(TabsTrigger, {
          value: "overview",
          children: "Overview"
        }), /*#__PURE__*/_jsx(TabsTrigger, {
          value: "bookings",
          children: "Bookings"
        }), /*#__PURE__*/_jsx(TabsTrigger, {
          value: "reviews",
          children: "Reviews"
        }), /*#__PURE__*/_jsx(TabsTrigger, {
          value: "alerts",
          children: "Alerts"
        })]
      }), /*#__PURE__*/_jsx(TabsContent, {
        value: "overview",
        children: /*#__PURE__*/_jsxs("div", {
          className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
          children: [/*#__PURE__*/_jsxs("div", {
            className: "lg:col-span-2 space-y-6",
            children: [/*#__PURE__*/_jsxs(Card, {
              children: [/*#__PURE__*/_jsxs(CardHeader, {
                children: [/*#__PURE__*/_jsx(CardTitle, {
                  children: "Upcoming Treks"
                }), /*#__PURE__*/_jsx(CardDescription, {
                  children: "Overview of your upcoming scheduled treks"
                })]
              }), /*#__PURE__*/_jsxs(CardContent, {
                children: [/*#__PURE__*/_jsxs(Table, {
                  children: [/*#__PURE__*/_jsx(TableHeader, {
                    children: /*#__PURE__*/_jsxs(TableRow, {
                      children: [/*#__PURE__*/_jsx(TableHead, {
                        children: "Trek Name"
                      }), /*#__PURE__*/_jsx(TableHead, {
                        children: "Date"
                      }), /*#__PURE__*/_jsx(TableHead, {
                        className: "hidden md:table-cell",
                        children: "Slots"
                      }), /*#__PURE__*/_jsx(TableHead, {
                        className: "text-right",
                        children: "Status"
                      })]
                    })
                  }), /*#__PURE__*/_jsx(TableBody, {
                    children: upcomingTreks.map(trek => /*#__PURE__*/_jsxs(TableRow, {
                      children: [/*#__PURE__*/_jsx(TableCell, {
                        className: "font-medium",
                        children: trek.name
                      }), /*#__PURE__*/_jsx(TableCell, {
                        children: trek.date
                      }), /*#__PURE__*/_jsx(TableCell, {
                        className: "hidden md:table-cell",
                        children: /*#__PURE__*/_jsxs("div", {
                          className: "flex items-center space-x-2",
                          children: [/*#__PURE__*/_jsx(Progress, {
                            value: calculateProgress(trek.slots.booked, trek.slots.total),
                            className: "h-2"
                          }), /*#__PURE__*/_jsxs("span", {
                            className: "text-xs text-muted-foreground whitespace-nowrap",
                            children: [trek.slots.booked, "/", trek.slots.total]
                          })]
                        })
                      }), /*#__PURE__*/_jsx(TableCell, {
                        className: "text-right",
                        children: /*#__PURE__*/_jsx("span", {
                          className: "inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800",
                          children: trek.status
                        })
                      })]
                    }, trek.id))
                  })]
                }), /*#__PURE__*/_jsx("div", {
                  className: "mt-4 text-center",
                  children: /*#__PURE__*/_jsx(Link, {
                    to: "/vendor/treks",
                    className: "text-sm text-aorbo-teal hover:underline",
                    children: "View all treks"
                  })
                })]
              })]
            }), /*#__PURE__*/_jsxs(Card, {
              children: [/*#__PURE__*/_jsxs(CardHeader, {
                children: [/*#__PURE__*/_jsx(CardTitle, {
                  children: "Recent Bookings"
                }), /*#__PURE__*/_jsx(CardDescription, {
                  children: "Recent trek bookings and their status"
                })]
              }), /*#__PURE__*/_jsxs(CardContent, {
                children: [/*#__PURE__*/_jsxs(Table, {
                  children: [/*#__PURE__*/_jsx(TableHeader, {
                    children: /*#__PURE__*/_jsxs(TableRow, {
                      children: [/*#__PURE__*/_jsx(TableHead, {
                        children: "Booking ID"
                      }), /*#__PURE__*/_jsx(TableHead, {
                        children: "Customer"
                      }), /*#__PURE__*/_jsx(TableHead, {
                        className: "hidden md:table-cell",
                        children: "Trek"
                      }), /*#__PURE__*/_jsx(TableHead, {
                        className: "text-right",
                        children: "Status"
                      })]
                    })
                  }), /*#__PURE__*/_jsx(TableBody, {
                    children: recentBookings.slice(0, 3).map(booking => /*#__PURE__*/_jsxs(TableRow, {
                      children: [/*#__PURE__*/_jsx(TableCell, {
                        className: "font-medium",
                        children: booking.id
                      }), /*#__PURE__*/_jsx(TableCell, {
                        children: booking.customerName
                      }), /*#__PURE__*/_jsx(TableCell, {
                        className: "hidden md:table-cell",
                        children: booking.trek
                      }), /*#__PURE__*/_jsx(TableCell, {
                        className: "text-right",
                        children: /*#__PURE__*/_jsx("span", {
                          className: `inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${booking.status === "Confirmed" ? "bg-green-100 text-green-800" : booking.status === "Pending" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}`,
                          children: booking.status
                        })
                      })]
                    }, booking.id))
                  })]
                }), /*#__PURE__*/_jsx("div", {
                  className: "mt-4 text-center",
                  children: /*#__PURE__*/_jsx(Link, {
                    to: "/vendor/bookings",
                    className: "text-sm text-aorbo-teal hover:underline",
                    children: "View all bookings"
                  })
                })]
              })]
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "space-y-6",
            children: [/*#__PURE__*/_jsxs(Card, {
              children: [/*#__PURE__*/_jsxs(CardHeader, {
                children: [/*#__PURE__*/_jsx(CardTitle, {
                  children: "Alerts"
                }), /*#__PURE__*/_jsx(CardDescription, {
                  children: "Recent notifications and alerts"
                })]
              }), /*#__PURE__*/_jsx(CardContent, {
                children: /*#__PURE__*/_jsx("div", {
                  className: "space-y-4",
                  children: alerts.map(alert => /*#__PURE__*/_jsxs("div", {
                    className: "flex items-start space-x-4 p-3 rounded-md bg-slate-50",
                    children: [/*#__PURE__*/_jsx("div", {
                      className: `w-8 h-8 rounded-full flex items-center justify-center 
                          ${alert.type === 'refund' ? 'bg-amber-100 text-amber-600' : alert.type === 'review' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}`,
                      children: alert.type === 'refund' ? /*#__PURE__*/_jsx(Clock, {
                        className: "h-4 w-4"
                      }) : alert.type === 'review' ? /*#__PURE__*/_jsx(BarChart, {
                        className: "h-4 w-4"
                      }) : /*#__PURE__*/_jsx(Users, {
                        className: "h-4 w-4"
                      })
                    }), /*#__PURE__*/_jsxs("div", {
                      className: "flex-1",
                      children: [/*#__PURE__*/_jsx("p", {
                        className: "text-sm font-medium",
                        children: alert.message
                      }), /*#__PURE__*/_jsx("p", {
                        className: "text-xs text-gray-500 mt-1",
                        children: alert.time
                      })]
                    })]
                  }, alert.id))
                })
              })]
            }), /*#__PURE__*/_jsxs(Card, {
              children: [/*#__PURE__*/_jsxs(CardHeader, {
                children: [/*#__PURE__*/_jsx(CardTitle, {
                  children: "Recent Reviews"
                }), /*#__PURE__*/_jsx(CardDescription, {
                  children: "Latest customer feedback"
                })]
              }), /*#__PURE__*/_jsx(CardContent, {
                children: /*#__PURE__*/_jsxs("div", {
                  className: "space-y-4",
                  children: [recentReviews.slice(0, 2).map(review => /*#__PURE__*/_jsxs("div", {
                    className: "p-3 rounded-md bg-slate-50",
                    children: [/*#__PURE__*/_jsxs("div", {
                      className: "flex justify-between items-start",
                      children: [/*#__PURE__*/_jsx("h4", {
                        className: "font-medium text-sm",
                        children: review.customerName
                      }), /*#__PURE__*/_jsx("div", {
                        className: "text-sm",
                        children: renderRating(review.rating)
                      })]
                    }), /*#__PURE__*/_jsxs("p", {
                      className: "text-xs text-gray-500 mt-1",
                      children: [review.trek, " \u2022 ", review.date]
                    }), /*#__PURE__*/_jsx("p", {
                      className: "text-sm mt-2",
                      children: review.comment
                    })]
                  }, review.id)), /*#__PURE__*/_jsx("div", {
                    className: "text-center",
                    children: /*#__PURE__*/_jsx(Link, {
                      to: "/vendor/reviews",
                      className: "text-sm text-aorbo-teal hover:underline",
                      children: "View all reviews"
                    })
                  })]
                })
              })]
            })]
          })]
        })
      }), /*#__PURE__*/_jsx(TabsContent, {
        value: "bookings",
        children: /*#__PURE__*/_jsxs(Card, {
          children: [/*#__PURE__*/_jsxs(CardHeader, {
            children: [/*#__PURE__*/_jsx(CardTitle, {
              children: "Recent Bookings"
            }), /*#__PURE__*/_jsx(CardDescription, {
              children: "Complete list of recent trek bookings"
            })]
          }), /*#__PURE__*/_jsx(CardContent, {
            children: /*#__PURE__*/_jsxs(Table, {
              children: [/*#__PURE__*/_jsx(TableHeader, {
                children: /*#__PURE__*/_jsxs(TableRow, {
                  children: [/*#__PURE__*/_jsx(TableHead, {
                    children: "Booking ID"
                  }), /*#__PURE__*/_jsx(TableHead, {
                    children: "Customer"
                  }), /*#__PURE__*/_jsx(TableHead, {
                    children: "Trek"
                  }), /*#__PURE__*/_jsx(TableHead, {
                    children: "Date"
                  }), /*#__PURE__*/_jsx(TableHead, {
                    children: "Amount"
                  }), /*#__PURE__*/_jsx(TableHead, {
                    children: "Participants"
                  }), /*#__PURE__*/_jsx(TableHead, {
                    className: "text-right",
                    children: "Status"
                  })]
                })
              }), /*#__PURE__*/_jsx(TableBody, {
                children: recentBookings.map(booking => /*#__PURE__*/_jsxs(TableRow, {
                  children: [/*#__PURE__*/_jsx(TableCell, {
                    className: "font-medium",
                    children: booking.id
                  }), /*#__PURE__*/_jsx(TableCell, {
                    children: booking.customerName
                  }), /*#__PURE__*/_jsx(TableCell, {
                    children: booking.trek
                  }), /*#__PURE__*/_jsx(TableCell, {
                    children: booking.date
                  }), /*#__PURE__*/_jsx(TableCell, {
                    children: booking.amount
                  }), /*#__PURE__*/_jsx(TableCell, {
                    children: booking.participants
                  }), /*#__PURE__*/_jsx(TableCell, {
                    className: "text-right",
                    children: /*#__PURE__*/_jsx("span", {
                      className: `inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${booking.status === "Confirmed" ? "bg-green-100 text-green-800" : booking.status === "Pending" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}`,
                      children: booking.status
                    })
                  })]
                }, booking.id))
              })]
            })
          })]
        })
      }), /*#__PURE__*/_jsx(TabsContent, {
        value: "reviews",
        children: /*#__PURE__*/_jsxs(Card, {
          children: [/*#__PURE__*/_jsxs(CardHeader, {
            children: [/*#__PURE__*/_jsx(CardTitle, {
              children: "Customer Reviews"
            }), /*#__PURE__*/_jsx(CardDescription, {
              children: "All reviews from your customers"
            })]
          }), /*#__PURE__*/_jsx(CardContent, {
            children: /*#__PURE__*/_jsx("div", {
              className: "grid grid-cols-1 md:grid-cols-2 gap-6",
              children: recentReviews.map(review => /*#__PURE__*/_jsx(Card, {
                className: "border",
                children: /*#__PURE__*/_jsxs(CardContent, {
                  className: "p-6",
                  children: [/*#__PURE__*/_jsxs("div", {
                    className: "flex justify-between items-start mb-4",
                    children: [/*#__PURE__*/_jsxs("div", {
                      children: [/*#__PURE__*/_jsx("h4", {
                        className: "font-medium",
                        children: review.customerName
                      }), /*#__PURE__*/_jsxs("p", {
                        className: "text-sm text-gray-500",
                        children: [review.trek, " \u2022 ", review.date]
                      })]
                    }), /*#__PURE__*/_jsx("div", {
                      className: "text-lg",
                      children: renderRating(review.rating)
                    })]
                  }), /*#__PURE__*/_jsx("p", {
                    className: "text-sm",
                    children: review.comment
                  }), /*#__PURE__*/_jsx("div", {
                    className: "mt-4 flex justify-end space-x-2",
                    children: /*#__PURE__*/_jsx(Button, {
                      variant: "outline",
                      size: "sm",
                      children: "Reply"
                    })
                  })]
                })
              }, review.id))
            })
          })]
        })
      }), /*#__PURE__*/_jsx(TabsContent, {
        value: "alerts",
        children: /*#__PURE__*/_jsxs(Card, {
          children: [/*#__PURE__*/_jsxs(CardHeader, {
            children: [/*#__PURE__*/_jsx(CardTitle, {
              children: "Alerts & Notifications"
            }), /*#__PURE__*/_jsx(CardDescription, {
              children: "Recent alerts and notifications that require your attention"
            })]
          }), /*#__PURE__*/_jsx(CardContent, {
            children: /*#__PURE__*/_jsx("div", {
              className: "space-y-4",
              children: alerts.map(alert => /*#__PURE__*/_jsxs("div", {
                className: "flex items-start space-x-4 p-4 rounded-md border",
                children: [/*#__PURE__*/_jsx("div", {
                  className: `w-10 h-10 rounded-full flex items-center justify-center 
                      ${alert.type === 'refund' ? 'bg-amber-100 text-amber-600' : alert.type === 'review' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}`,
                  children: alert.type === 'refund' ? /*#__PURE__*/_jsx(Clock, {
                    className: "h-5 w-5"
                  }) : alert.type === 'review' ? /*#__PURE__*/_jsx(BarChart, {
                    className: "h-5 w-5"
                  }) : /*#__PURE__*/_jsx(Users, {
                    className: "h-5 w-5"
                  })
                }), /*#__PURE__*/_jsxs("div", {
                  className: "flex-1",
                  children: [/*#__PURE__*/_jsxs("div", {
                    className: "flex justify-between",
                    children: [/*#__PURE__*/_jsx("p", {
                      className: "font-medium",
                      children: alert.message
                    }), /*#__PURE__*/_jsx("span", {
                      className: "text-sm text-gray-500",
                      children: alert.time
                    })]
                  }), /*#__PURE__*/_jsxs("div", {
                    className: "mt-4 flex items-center space-x-2",
                    children: [alert.type === 'refund' && /*#__PURE__*/_jsxs(_Fragment, {
                      children: [/*#__PURE__*/_jsxs(Button, {
                        size: "sm",
                        variant: "outline",
                        className: "border-green-500 text-green-600 hover:bg-green-50",
                        children: [/*#__PURE__*/_jsx(CheckCheck, {
                          className: "mr-1 h-4 w-4"
                        }), " Approve"]
                      }), /*#__PURE__*/_jsxs(Button, {
                        size: "sm",
                        variant: "outline",
                        className: "border-red-500 text-red-600 hover:bg-red-50",
                        children: [/*#__PURE__*/_jsx(X, {
                          className: "mr-1 h-4 w-4"
                        }), " Reject"]
                      })]
                    }), alert.type === 'review' && /*#__PURE__*/_jsx(Button, {
                      size: "sm",
                      variant: "outline",
                      children: "View Review"
                    }), alert.type === 'booking' && /*#__PURE__*/_jsx(Button, {
                      size: "sm",
                      variant: "outline",
                      children: "View Bookings"
                    }), /*#__PURE__*/_jsx(Button, {
                      size: "sm",
                      variant: "ghost",
                      children: "Dismiss"
                    })]
                  })]
                })]
              }, alert.id))
            })
          })]
        })
      })]
    })]
  });
};
export default VendorDashboard;