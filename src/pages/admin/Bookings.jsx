import { useState, useEffect } from "react";
import { Search, Filter, Eye, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getTrekImageUrl } from "@/lib/trekUtils";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const AdminBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [vendorFilter, setVendorFilter] = useState("all");
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
    const [vendors, setVendors] = useState([]);
    useEffect(() => {
        // In a real app, this would be an API call to fetch all bookings
        // For now we'll create sample data

        // Create sample vendor data
        const vendorsList = [
            {
                id: 1,
                name: "Mountain Explorers",
            },
            {
                id: 2,
                name: "Adventure Beyond",
            },
            {
                id: 3,
                name: "Trails & Peaks",
            },
        ];
        setVendors(vendorsList);

        // Create sample bookings data
        const sampleBookings = [
            {
                id: "TBR5678",
                customer: {
                    name: "Rahul Sharma",
                    email: "rahul.sharma@example.com",
                    phone: "+91 98765 43210",
                },
                trek: {
                    id: 1,
                    name: "Himalayan Adventure",
                    image: "trek1.jpg",
                    destination: "Himachal Pradesh",
                },
                vendor: {
                    id: 1,
                    name: "Mountain Explorers",
                },
                bookingDate: "2025-05-10",
                trekDate: "2025-06-15",
                amount: "₹15,000",
                status: "confirmed",
                participants: 3,
                paymentMethod: "Credit Card",
            },
            {
                id: "TBR5679",
                customer: {
                    name: "Priya Patel",
                    email: "priya.patel@example.com",
                    phone: "+91 87654 32109",
                },
                trek: {
                    id: 2,
                    name: "Valley Trek",
                    image: "trek2.jpg",
                    destination: "Uttarakhand",
                },
                vendor: {
                    id: 2,
                    name: "Adventure Beyond",
                },
                bookingDate: "2025-05-12",
                trekDate: "2025-06-20",
                amount: "₹9,000",
                status: "pending",
                participants: 2,
                paymentMethod: "UPI",
            },
            {
                id: "TBR5680",
                customer: {
                    name: "Vikram Singh",
                    email: "vikram.singh@example.com",
                    phone: "+91 76543 21098",
                },
                trek: {
                    id: 1,
                    name: "Himalayan Adventure",
                    image: "trek1.jpg",
                    destination: "Himachal Pradesh",
                },
                vendor: {
                    id: 1,
                    name: "Mountain Explorers",
                },
                bookingDate: "2025-05-08",
                trekDate: "2025-07-05",
                amount: "₹10,000",
                status: "confirmed",
                participants: 2,
                paymentMethod: "Net Banking",
            },
            {
                id: "TBR5681",
                customer: {
                    name: "Neha Singh",
                    email: "neha.singh@example.com",
                    phone: "+91 65432 10987",
                },
                trek: {
                    id: 3,
                    name: "Mountain View Trek",
                    image: "trek3.jpg",
                    destination: "Sikkim",
                },
                vendor: {
                    id: 3,
                    name: "Trails & Peaks",
                },
                bookingDate: "2025-05-15",
                trekDate: "2025-06-28",
                amount: "₹12,500",
                status: "cancelled",
                participants: 2,
                paymentMethod: "Debit Card",
                notes: "Customer requested cancellation due to scheduling conflict.",
            },
            {
                id: "TBR5682",
                customer: {
                    name: "Ajay Kumar",
                    email: "ajay.kumar@example.com",
                    phone: "+91 54321 09876",
                },
                trek: {
                    id: 2,
                    name: "Valley Trek",
                    image: "trek2.jpg",
                    destination: "Uttarakhand",
                },
                vendor: {
                    id: 2,
                    name: "Adventure Beyond",
                },
                bookingDate: "2025-04-30",
                trekDate: "2025-05-25",
                amount: "₹13,500",
                status: "completed",
                participants: 3,
                paymentMethod: "Credit Card",
            },
            {
                id: "TBR5683",
                customer: {
                    name: "Meera Verma",
                    email: "meera.verma@example.com",
                    phone: "+91 43210 98765",
                },
                trek: {
                    id: 3,
                    name: "Mountain View Trek",
                    image: "trek3.jpg",
                    destination: "Sikkim",
                },
                vendor: {
                    id: 3,
                    name: "Trails & Peaks",
                },
                bookingDate: "2025-05-05",
                trekDate: "2025-06-18",
                amount: "₹8,000",
                status: "refunded",
                participants: 1,
                paymentMethod: "UPI",
                notes: "Refunded due to bad weather conditions",
            },
        ];
        setBookings(sampleBookings);
        setLoading(false);
    }, []);

    // Filter bookings based on search term, status and vendor
    const filteredBookings = bookings.filter((booking) => {
        const matchesSearch =
            booking.customer.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            booking.trek.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            booking.id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus =
            statusFilter === "all" || booking.status === statusFilter;
        const matchesVendor =
            vendorFilter === "all" ||
            String(booking.vendor.id) === vendorFilter;
        return matchesSearch && matchesStatus && matchesVendor;
    });

    // View booking details
    const viewBookingDetails = (booking) => {
        setSelectedBooking(booking);
        setIsViewDialogOpen(true);
    };

    // Get a placeholder image for treks
    const getTrekImage = (imageName) => {
        return getTrekImageUrl(imageName);
    };

    // Status badges
    const getStatusBadge = (status) => {
        switch (status) {
            case "confirmed":
                return /*#__PURE__*/ _jsx(Badge, {
                    className: "bg-green-100 text-green-800",
                    children: "Confirmed",
                });
            case "pending":
                return /*#__PURE__*/ _jsx(Badge, {
                    className: "bg-yellow-100 text-yellow-800",
                    children: "Pending",
                });
            case "cancelled":
                return /*#__PURE__*/ _jsx(Badge, {
                    className: "bg-red-100 text-red-800",
                    children: "Cancelled",
                });
            case "completed":
                return /*#__PURE__*/ _jsx(Badge, {
                    className: "bg-blue-100 text-blue-800",
                    children: "Completed",
                });
            case "refunded":
                return /*#__PURE__*/ _jsx(Badge, {
                    className: "bg-orange-100 text-orange-800",
                    children: "Refunded",
                });
            default:
                return /*#__PURE__*/ _jsx(Badge, {
                    children: status,
                });
        }
    };
    return /*#__PURE__*/ _jsxs("div", {
        children: [
            /*#__PURE__*/ _jsx("div", {
                className:
                    "flex flex-col md:flex-row md:items-center justify-between mb-6",
                children: /*#__PURE__*/ _jsx("h1", {
                    className: "text-2xl font-bold mb-4 md:mb-0",
                    children: "All Bookings",
                }),
            }),
            /*#__PURE__*/ _jsx(Card, {
                className: "mb-6",
                children: /*#__PURE__*/ _jsx(CardContent, {
                    className: "pt-6",
                    children: /*#__PURE__*/ _jsxs("div", {
                        className: "grid grid-cols-1 md:grid-cols-3 gap-4",
                        children: [
                            /*#__PURE__*/ _jsxs("div", {
                                className: "relative",
                                children: [
                                    /*#__PURE__*/ _jsx(Search, {
                                        className:
                                            "absolute left-2 top-2.5 h-4 w-4 text-gray-400",
                                    }),
                                    /*#__PURE__*/ _jsx(Input, {
                                        placeholder: "Search bookings...",
                                        value: searchTerm,
                                        onChange: (e) =>
                                            setSearchTerm(e.target.value),
                                        className: "pl-8",
                                    }),
                                ],
                            }),
                            /*#__PURE__*/ _jsxs("div", {
                                className: "flex items-center space-x-2",
                                children: [
                                    /*#__PURE__*/ _jsx(Filter, {
                                        className: "h-4 w-4 text-gray-400",
                                    }),
                                    /*#__PURE__*/ _jsxs(Select, {
                                        value: statusFilter,
                                        onValueChange: setStatusFilter,
                                        children: [
                                            /*#__PURE__*/ _jsx(SelectTrigger, {
                                                className: "w-full",
                                                children: /*#__PURE__*/ _jsx(
                                                    SelectValue,
                                                    {
                                                        placeholder:
                                                            "Filter by status",
                                                    }
                                                ),
                                            }),
                                            /*#__PURE__*/ _jsxs(SelectContent, {
                                                children: [
                                                    /*#__PURE__*/ _jsx(
                                                        SelectItem,
                                                        {
                                                            value: "all",
                                                            children:
                                                                "All Statuses",
                                                        }
                                                    ),
                                                    /*#__PURE__*/ _jsx(
                                                        SelectItem,
                                                        {
                                                            value: "confirmed",
                                                            children:
                                                                "Confirmed",
                                                        }
                                                    ),
                                                    /*#__PURE__*/ _jsx(
                                                        SelectItem,
                                                        {
                                                            value: "pending",
                                                            children: "Pending",
                                                        }
                                                    ),
                                                    /*#__PURE__*/ _jsx(
                                                        SelectItem,
                                                        {
                                                            value: "cancelled",
                                                            children:
                                                                "Cancelled",
                                                        }
                                                    ),
                                                    /*#__PURE__*/ _jsx(
                                                        SelectItem,
                                                        {
                                                            value: "completed",
                                                            children:
                                                                "Completed",
                                                        }
                                                    ),
                                                    /*#__PURE__*/ _jsx(
                                                        SelectItem,
                                                        {
                                                            value: "refunded",
                                                            children:
                                                                "Refunded",
                                                        }
                                                    ),
                                                ],
                                            }),
                                        ],
                                    }),
                                ],
                            }),
                            /*#__PURE__*/ _jsxs("div", {
                                className: "flex items-center space-x-2",
                                children: [
                                    /*#__PURE__*/ _jsx(Users, {
                                        className: "h-4 w-4 text-gray-400",
                                    }),
                                    /*#__PURE__*/ _jsxs(Select, {
                                        value: vendorFilter,
                                        onValueChange: setVendorFilter,
                                        children: [
                                            /*#__PURE__*/ _jsx(SelectTrigger, {
                                                className: "w-full",
                                                children: /*#__PURE__*/ _jsx(
                                                    SelectValue,
                                                    {
                                                        placeholder:
                                                            "Filter by vendor",
                                                    }
                                                ),
                                            }),
                                            /*#__PURE__*/ _jsxs(SelectContent, {
                                                children: [
                                                    /*#__PURE__*/ _jsx(
                                                        SelectItem,
                                                        {
                                                            value: "all",
                                                            children:
                                                                "All Vendors",
                                                        }
                                                    ),
                                                    vendors.map((vendor) =>
                                                        /*#__PURE__*/ _jsx(
                                                            SelectItem,
                                                            {
                                                                value: String(
                                                                    vendor.id
                                                                ),
                                                                children:
                                                                    vendor.name,
                                                            },
                                                            vendor.id
                                                        )
                                                    ),
                                                ],
                                            }),
                                        ],
                                    }),
                                ],
                            }),
                        ],
                    }),
                }),
            }),
            /*#__PURE__*/ _jsxs(Tabs, {
                defaultValue: "all",
                className: "mb-6",
                children: [
                    /*#__PURE__*/ _jsxs(TabsList, {
                        children: [
                            /*#__PURE__*/ _jsx(TabsTrigger, {
                                value: "all",
                                children: "All Bookings",
                            }),
                            /*#__PURE__*/ _jsx(TabsTrigger, {
                                value: "confirmed",
                                children: "Confirmed",
                            }),
                            /*#__PURE__*/ _jsx(TabsTrigger, {
                                value: "pending",
                                children: "Pending",
                            }),
                            /*#__PURE__*/ _jsx(TabsTrigger, {
                                value: "others",
                                children: "Others",
                            }),
                        ],
                    }),
                    /*#__PURE__*/ _jsx(TabsContent, {
                        value: "all",
                        className: "mt-6",
                        children: /*#__PURE__*/ _jsx("div", {
                            className: "rounded-md border",
                            children: /*#__PURE__*/ _jsxs(Table, {
                                children: [
                                    /*#__PURE__*/ _jsx(TableHeader, {
                                        children: /*#__PURE__*/ _jsxs(
                                            TableRow,
                                            {
                                                children: [
                                                    /*#__PURE__*/ _jsx(
                                                        TableHead,
                                                        {
                                                            children:
                                                                "Booking ID",
                                                        }
                                                    ),
                                                    /*#__PURE__*/ _jsx(
                                                        TableHead,
                                                        {
                                                            children:
                                                                "Customer",
                                                        }
                                                    ),
                                                    /*#__PURE__*/ _jsx(
                                                        TableHead,
                                                        {
                                                            children: "Trek",
                                                        }
                                                    ),
                                                    /*#__PURE__*/ _jsx(
                                                        TableHead,
                                                        {
                                                            children: "Vendor",
                                                        }
                                                    ),
                                                    /*#__PURE__*/ _jsx(
                                                        TableHead,
                                                        {
                                                            children:
                                                                "Trek Date",
                                                        }
                                                    ),
                                                    /*#__PURE__*/ _jsx(
                                                        TableHead,
                                                        {
                                                            children: "Amount",
                                                        }
                                                    ),
                                                    /*#__PURE__*/ _jsx(
                                                        TableHead,
                                                        {
                                                            children: "Status",
                                                        }
                                                    ),
                                                    /*#__PURE__*/ _jsx(
                                                        TableHead,
                                                        {
                                                            className:
                                                                "text-right",
                                                            children: "Actions",
                                                        }
                                                    ),
                                                ],
                                            }
                                        ),
                                    }),
                                    /*#__PURE__*/ _jsx(TableBody, {
                                        children: loading
                                            ? /*#__PURE__*/ _jsx(TableRow, {
                                                  children: /*#__PURE__*/ _jsx(
                                                      TableCell,
                                                      {
                                                          colSpan: 8,
                                                          className:
                                                              "text-center py-8",
                                                          children:
                                                              "Loading bookings...",
                                                      }
                                                  ),
                                              })
                                            : filteredBookings.length > 0
                                            ? filteredBookings.map((booking) =>
                                                  /*#__PURE__*/ _jsxs(
                                                      TableRow,
                                                      {
                                                          children: [
                                                              /*#__PURE__*/ _jsx(
                                                                  TableCell,
                                                                  {
                                                                      className:
                                                                          "font-medium",
                                                                      children:
                                                                          booking.id,
                                                                  }
                                                              ),
                                                              /*#__PURE__*/ _jsx(
                                                                  TableCell,
                                                                  {
                                                                      children:
                                                                          booking
                                                                              .customer
                                                                              .name,
                                                                  }
                                                              ),
                                                              /*#__PURE__*/ _jsx(
                                                                  TableCell,
                                                                  {
                                                                      children:
                                                                          booking
                                                                              .trek
                                                                              .name,
                                                                  }
                                                              ),
                                                              /*#__PURE__*/ _jsx(
                                                                  TableCell,
                                                                  {
                                                                      children:
                                                                          booking
                                                                              .vendor
                                                                              .name,
                                                                  }
                                                              ),
                                                              /*#__PURE__*/ _jsx(
                                                                  TableCell,
                                                                  {
                                                                      children:
                                                                          booking.trekDate,
                                                                  }
                                                              ),
                                                              /*#__PURE__*/ _jsx(
                                                                  TableCell,
                                                                  {
                                                                      children:
                                                                          booking.amount,
                                                                  }
                                                              ),
                                                              /*#__PURE__*/ _jsx(
                                                                  TableCell,
                                                                  {
                                                                      children:
                                                                          getStatusBadge(
                                                                              booking.status
                                                                          ),
                                                                  }
                                                              ),
                                                              /*#__PURE__*/ _jsx(
                                                                  TableCell,
                                                                  {
                                                                      className:
                                                                          "text-right",
                                                                      children:
                                                                          /*#__PURE__*/ _jsx(
                                                                              Button,
                                                                              {
                                                                                  variant:
                                                                                      "ghost",
                                                                                  size: "icon",
                                                                                  onClick:
                                                                                      () =>
                                                                                          viewBookingDetails(
                                                                                              booking
                                                                                          ),
                                                                                  children:
                                                                                      /*#__PURE__*/ _jsx(
                                                                                          Eye,
                                                                                          {
                                                                                              className:
                                                                                                  "h-4 w-4",
                                                                                          }
                                                                                      ),
                                                                              }
                                                                          ),
                                                                  }
                                                              ),
                                                          ],
                                                      },
                                                      booking.id
                                                  )
                                              )
                                            : /*#__PURE__*/ _jsx(TableRow, {
                                                  children: /*#__PURE__*/ _jsx(
                                                      TableCell,
                                                      {
                                                          colSpan: 8,
                                                          className:
                                                              "text-center py-8",
                                                          children:
                                                              "No bookings found matching your filters.",
                                                      }
                                                  ),
                                              }),
                                    }),
                                ],
                            }),
                        }),
                    }),
                    /*#__PURE__*/ _jsx(TabsContent, {
                        value: "confirmed",
                        className: "mt-6",
                        children: /*#__PURE__*/ _jsx("div", {
                            className: "rounded-md border",
                            children: /*#__PURE__*/ _jsxs(Table, {
                                children: [
                                    /*#__PURE__*/ _jsx(TableHeader, {
                                        children: /*#__PURE__*/ _jsxs(
                                            TableRow,
                                            {
                                                children: [
                                                    /*#__PURE__*/ _jsx(
                                                        TableHead,
                                                        {
                                                            children:
                                                                "Booking ID",
                                                        }
                                                    ),
                                                    /*#__PURE__*/ _jsx(
                                                        TableHead,
                                                        {
                                                            children:
                                                                "Customer",
                                                        }
                                                    ),
                                                    /*#__PURE__*/ _jsx(
                                                        TableHead,
                                                        {
                                                            children: "Trek",
                                                        }
                                                    ),
                                                    /*#__PURE__*/ _jsx(
                                                        TableHead,
                                                        {
                                                            children: "Vendor",
                                                        }
                                                    ),
                                                    /*#__PURE__*/ _jsx(
                                                        TableHead,
                                                        {
                                                            children:
                                                                "Trek Date",
                                                        }
                                                    ),
                                                    /*#__PURE__*/ _jsx(
                                                        TableHead,
                                                        {
                                                            children: "Amount",
                                                        }
                                                    ),
                                                    /*#__PURE__*/ _jsx(
                                                        TableHead,
                                                        {
                                                            children: "Status",
                                                        }
                                                    ),
                                                    /*#__PURE__*/ _jsx(
                                                        TableHead,
                                                        {
                                                            className:
                                                                "text-right",
                                                            children: "Actions",
                                                        }
                                                    ),
                                                ],
                                            }
                                        ),
                                    }),
                                    /*#__PURE__*/ _jsx(TableBody, {
                                        children: loading
                                            ? /*#__PURE__*/ _jsx(TableRow, {
                                                  children: /*#__PURE__*/ _jsx(
                                                      TableCell,
                                                      {
                                                          colSpan: 8,
                                                          className:
                                                              "text-center py-8",
                                                          children:
                                                              "Loading bookings...",
                                                      }
                                                  ),
                                              })
                                            : filteredBookings.filter(
                                                  (booking) =>
                                                      booking.status ===
                                                      "confirmed"
                                              ).length > 0
                                            ? filteredBookings
                                                  .filter(
                                                      (booking) =>
                                                          booking.status ===
                                                          "confirmed"
                                                  )
                                                  .map((booking) =>
                                                      /*#__PURE__*/ _jsxs(
                                                          TableRow,
                                                          {
                                                              children: [
                                                                  /*#__PURE__*/ _jsx(
                                                                      TableCell,
                                                                      {
                                                                          className:
                                                                              "font-medium",
                                                                          children:
                                                                              booking.id,
                                                                      }
                                                                  ),
                                                                  /*#__PURE__*/ _jsx(
                                                                      TableCell,
                                                                      {
                                                                          children:
                                                                              booking
                                                                                  .customer
                                                                                  .name,
                                                                      }
                                                                  ),
                                                                  /*#__PURE__*/ _jsx(
                                                                      TableCell,
                                                                      {
                                                                          children:
                                                                              booking
                                                                                  .trek
                                                                                  .name,
                                                                      }
                                                                  ),
                                                                  /*#__PURE__*/ _jsx(
                                                                      TableCell,
                                                                      {
                                                                          children:
                                                                              booking
                                                                                  .vendor
                                                                                  .name,
                                                                      }
                                                                  ),
                                                                  /*#__PURE__*/ _jsx(
                                                                      TableCell,
                                                                      {
                                                                          children:
                                                                              booking.trekDate,
                                                                      }
                                                                  ),
                                                                  /*#__PURE__*/ _jsx(
                                                                      TableCell,
                                                                      {
                                                                          children:
                                                                              booking.amount,
                                                                      }
                                                                  ),
                                                                  /*#__PURE__*/ _jsx(
                                                                      TableCell,
                                                                      {
                                                                          children:
                                                                              getStatusBadge(
                                                                                  booking.status
                                                                              ),
                                                                      }
                                                                  ),
                                                                  /*#__PURE__*/ _jsx(
                                                                      TableCell,
                                                                      {
                                                                          className:
                                                                              "text-right",
                                                                          children:
                                                                              /*#__PURE__*/ _jsx(
                                                                                  Button,
                                                                                  {
                                                                                      variant:
                                                                                          "ghost",
                                                                                      size: "icon",
                                                                                      onClick:
                                                                                          () =>
                                                                                              viewBookingDetails(
                                                                                                  booking
                                                                                              ),
                                                                                      children:
                                                                                          /*#__PURE__*/ _jsx(
                                                                                              Eye,
                                                                                              {
                                                                                                  className:
                                                                                                      "h-4 w-4",
                                                                                              }
                                                                                          ),
                                                                                  }
                                                                              ),
                                                                      }
                                                                  ),
                                                              ],
                                                          },
                                                          booking.id
                                                      )
                                                  )
                                            : /*#__PURE__*/ _jsx(TableRow, {
                                                  children: /*#__PURE__*/ _jsx(
                                                      TableCell,
                                                      {
                                                          colSpan: 8,
                                                          className:
                                                              "text-center py-8",
                                                          children:
                                                              "No confirmed bookings found.",
                                                      }
                                                  ),
                                              }),
                                    }),
                                ],
                            }),
                        }),
                    }),
                    /*#__PURE__*/ _jsx(TabsContent, {
                        value: "pending",
                        className: "mt-6",
                        children: /*#__PURE__*/ _jsx("div", {
                            className: "rounded-md border",
                            children: /*#__PURE__*/ _jsxs(Table, {
                                children: [
                                    /*#__PURE__*/ _jsx(TableHeader, {
                                        children: /*#__PURE__*/ _jsxs(
                                            TableRow,
                                            {
                                                children: [
                                                    /*#__PURE__*/ _jsx(
                                                        TableHead,
                                                        {
                                                            children:
                                                                "Booking ID",
                                                        }
                                                    ),
                                                    /*#__PURE__*/ _jsx(
                                                        TableHead,
                                                        {
                                                            children:
                                                                "Customer",
                                                        }
                                                    ),
                                                    /*#__PURE__*/ _jsx(
                                                        TableHead,
                                                        {
                                                            children: "Trek",
                                                        }
                                                    ),
                                                    /*#__PURE__*/ _jsx(
                                                        TableHead,
                                                        {
                                                            children: "Vendor",
                                                        }
                                                    ),
                                                    /*#__PURE__*/ _jsx(
                                                        TableHead,
                                                        {
                                                            children:
                                                                "Trek Date",
                                                        }
                                                    ),
                                                    /*#__PURE__*/ _jsx(
                                                        TableHead,
                                                        {
                                                            children: "Amount",
                                                        }
                                                    ),
                                                    /*#__PURE__*/ _jsx(
                                                        TableHead,
                                                        {
                                                            children: "Status",
                                                        }
                                                    ),
                                                    /*#__PURE__*/ _jsx(
                                                        TableHead,
                                                        {
                                                            className:
                                                                "text-right",
                                                            children: "Actions",
                                                        }
                                                    ),
                                                ],
                                            }
                                        ),
                                    }),
                                    /*#__PURE__*/ _jsx(TableBody, {
                                        children: loading
                                            ? /*#__PURE__*/ _jsx(TableRow, {
                                                  children: /*#__PURE__*/ _jsx(
                                                      TableCell,
                                                      {
                                                          colSpan: 8,
                                                          className:
                                                              "text-center py-8",
                                                          children:
                                                              "Loading bookings...",
                                                      }
                                                  ),
                                              })
                                            : filteredBookings.filter(
                                                  (booking) =>
                                                      booking.status ===
                                                      "pending"
                                              ).length > 0
                                            ? filteredBookings
                                                  .filter(
                                                      (booking) =>
                                                          booking.status ===
                                                          "pending"
                                                  )
                                                  .map((booking) =>
                                                      /*#__PURE__*/ _jsxs(
                                                          TableRow,
                                                          {
                                                              children: [
                                                                  /*#__PURE__*/ _jsx(
                                                                      TableCell,
                                                                      {
                                                                          className:
                                                                              "font-medium",
                                                                          children:
                                                                              booking.id,
                                                                      }
                                                                  ),
                                                                  /*#__PURE__*/ _jsx(
                                                                      TableCell,
                                                                      {
                                                                          children:
                                                                              booking
                                                                                  .customer
                                                                                  .name,
                                                                      }
                                                                  ),
                                                                  /*#__PURE__*/ _jsx(
                                                                      TableCell,
                                                                      {
                                                                          children:
                                                                              booking
                                                                                  .trek
                                                                                  .name,
                                                                      }
                                                                  ),
                                                                  /*#__PURE__*/ _jsx(
                                                                      TableCell,
                                                                      {
                                                                          children:
                                                                              booking
                                                                                  .vendor
                                                                                  .name,
                                                                      }
                                                                  ),
                                                                  /*#__PURE__*/ _jsx(
                                                                      TableCell,
                                                                      {
                                                                          children:
                                                                              booking.trekDate,
                                                                      }
                                                                  ),
                                                                  /*#__PURE__*/ _jsx(
                                                                      TableCell,
                                                                      {
                                                                          children:
                                                                              booking.amount,
                                                                      }
                                                                  ),
                                                                  /*#__PURE__*/ _jsx(
                                                                      TableCell,
                                                                      {
                                                                          children:
                                                                              getStatusBadge(
                                                                                  booking.status
                                                                              ),
                                                                      }
                                                                  ),
                                                                  /*#__PURE__*/ _jsx(
                                                                      TableCell,
                                                                      {
                                                                          className:
                                                                              "text-right",
                                                                          children:
                                                                              /*#__PURE__*/ _jsx(
                                                                                  Button,
                                                                                  {
                                                                                      variant:
                                                                                          "ghost",
                                                                                      size: "icon",
                                                                                      onClick:
                                                                                          () =>
                                                                                              viewBookingDetails(
                                                                                                  booking
                                                                                              ),
                                                                                      children:
                                                                                          /*#__PURE__*/ _jsx(
                                                                                              Eye,
                                                                                              {
                                                                                                  className:
                                                                                                      "h-4 w-4",
                                                                                              }
                                                                                          ),
                                                                                  }
                                                                              ),
                                                                      }
                                                                  ),
                                                              ],
                                                          },
                                                          booking.id
                                                      )
                                                  )
                                            : /*#__PURE__*/ _jsx(TableRow, {
                                                  children: /*#__PURE__*/ _jsx(
                                                      TableCell,
                                                      {
                                                          colSpan: 8,
                                                          className:
                                                              "text-center py-8",
                                                          children:
                                                              "No pending bookings found.",
                                                      }
                                                  ),
                                              }),
                                    }),
                                ],
                            }),
                        }),
                    }),
                    /*#__PURE__*/ _jsx(TabsContent, {
                        value: "others",
                        className: "mt-6",
                        children: /*#__PURE__*/ _jsx("div", {
                            className: "rounded-md border",
                            children: /*#__PURE__*/ _jsxs(Table, {
                                children: [
                                    /*#__PURE__*/ _jsx(TableHeader, {
                                        children: /*#__PURE__*/ _jsxs(
                                            TableRow,
                                            {
                                                children: [
                                                    /*#__PURE__*/ _jsx(
                                                        TableHead,
                                                        {
                                                            children:
                                                                "Booking ID",
                                                        }
                                                    ),
                                                    /*#__PURE__*/ _jsx(
                                                        TableHead,
                                                        {
                                                            children:
                                                                "Customer",
                                                        }
                                                    ),
                                                    /*#__PURE__*/ _jsx(
                                                        TableHead,
                                                        {
                                                            children: "Trek",
                                                        }
                                                    ),
                                                    /*#__PURE__*/ _jsx(
                                                        TableHead,
                                                        {
                                                            children: "Vendor",
                                                        }
                                                    ),
                                                    /*#__PURE__*/ _jsx(
                                                        TableHead,
                                                        {
                                                            children:
                                                                "Trek Date",
                                                        }
                                                    ),
                                                    /*#__PURE__*/ _jsx(
                                                        TableHead,
                                                        {
                                                            children: "Amount",
                                                        }
                                                    ),
                                                    /*#__PURE__*/ _jsx(
                                                        TableHead,
                                                        {
                                                            children: "Status",
                                                        }
                                                    ),
                                                    /*#__PURE__*/ _jsx(
                                                        TableHead,
                                                        {
                                                            className:
                                                                "text-right",
                                                            children: "Actions",
                                                        }
                                                    ),
                                                ],
                                            }
                                        ),
                                    }),
                                    /*#__PURE__*/ _jsx(TableBody, {
                                        children: loading
                                            ? /*#__PURE__*/ _jsx(TableRow, {
                                                  children: /*#__PURE__*/ _jsx(
                                                      TableCell,
                                                      {
                                                          colSpan: 8,
                                                          className:
                                                              "text-center py-8",
                                                          children:
                                                              "Loading bookings...",
                                                      }
                                                  ),
                                              })
                                            : filteredBookings.filter(
                                                  (booking) =>
                                                      ![
                                                          "confirmed",
                                                          "pending",
                                                      ].includes(booking.status)
                                              ).length > 0
                                            ? filteredBookings
                                                  .filter(
                                                      (booking) =>
                                                          ![
                                                              "confirmed",
                                                              "pending",
                                                          ].includes(
                                                              booking.status
                                                          )
                                                  )
                                                  .map((booking) =>
                                                      /*#__PURE__*/ _jsxs(
                                                          TableRow,
                                                          {
                                                              children: [
                                                                  /*#__PURE__*/ _jsx(
                                                                      TableCell,
                                                                      {
                                                                          className:
                                                                              "font-medium",
                                                                          children:
                                                                              booking.id,
                                                                      }
                                                                  ),
                                                                  /*#__PURE__*/ _jsx(
                                                                      TableCell,
                                                                      {
                                                                          children:
                                                                              booking
                                                                                  .customer
                                                                                  .name,
                                                                      }
                                                                  ),
                                                                  /*#__PURE__*/ _jsx(
                                                                      TableCell,
                                                                      {
                                                                          children:
                                                                              booking
                                                                                  .trek
                                                                                  .name,
                                                                      }
                                                                  ),
                                                                  /*#__PURE__*/ _jsx(
                                                                      TableCell,
                                                                      {
                                                                          children:
                                                                              booking
                                                                                  .vendor
                                                                                  .name,
                                                                      }
                                                                  ),
                                                                  /*#__PURE__*/ _jsx(
                                                                      TableCell,
                                                                      {
                                                                          children:
                                                                              booking.trekDate,
                                                                      }
                                                                  ),
                                                                  /*#__PURE__*/ _jsx(
                                                                      TableCell,
                                                                      {
                                                                          children:
                                                                              booking.amount,
                                                                      }
                                                                  ),
                                                                  /*#__PURE__*/ _jsx(
                                                                      TableCell,
                                                                      {
                                                                          children:
                                                                              getStatusBadge(
                                                                                  booking.status
                                                                              ),
                                                                      }
                                                                  ),
                                                                  /*#__PURE__*/ _jsx(
                                                                      TableCell,
                                                                      {
                                                                          className:
                                                                              "text-right",
                                                                          children:
                                                                              /*#__PURE__*/ _jsx(
                                                                                  Button,
                                                                                  {
                                                                                      variant:
                                                                                          "ghost",
                                                                                      size: "icon",
                                                                                      onClick:
                                                                                          () =>
                                                                                              viewBookingDetails(
                                                                                                  booking
                                                                                              ),
                                                                                      children:
                                                                                          /*#__PURE__*/ _jsx(
                                                                                              Eye,
                                                                                              {
                                                                                                  className:
                                                                                                      "h-4 w-4",
                                                                                              }
                                                                                          ),
                                                                                  }
                                                                              ),
                                                                      }
                                                                  ),
                                                              ],
                                                          },
                                                          booking.id
                                                      )
                                                  )
                                            : /*#__PURE__*/ _jsx(TableRow, {
                                                  children: /*#__PURE__*/ _jsx(
                                                      TableCell,
                                                      {
                                                          colSpan: 8,
                                                          className:
                                                              "text-center py-8",
                                                          children:
                                                              "No other bookings found.",
                                                      }
                                                  ),
                                              }),
                                    }),
                                ],
                            }),
                        }),
                    }),
                ],
            }),
            /*#__PURE__*/ _jsx(Dialog, {
                open: isViewDialogOpen,
                onOpenChange: setIsViewDialogOpen,
                children: /*#__PURE__*/ _jsxs(DialogContent, {
                    className: "max-w-3xl max-h-[90vh] overflow-y-auto",
                    children: [
                        /*#__PURE__*/ _jsx(DialogHeader, {
                            children: /*#__PURE__*/ _jsxs(DialogTitle, {
                                children: [
                                    "Booking Details - ",
                                    selectedBooking?.id,
                                ],
                            }),
                        }),
                        selectedBooking &&
                            /*#__PURE__*/ _jsxs("div", {
                                className: "space-y-6",
                                children: [
                                    /*#__PURE__*/ _jsxs("div", {
                                        className:
                                            "grid grid-cols-1 md:grid-cols-2 gap-6",
                                        children: [
                                            /*#__PURE__*/ _jsxs("div", {
                                                className: "space-y-4",
                                                children: [
                                                    /*#__PURE__*/ _jsxs("div", {
                                                        children: [
                                                            /*#__PURE__*/ _jsx(
                                                                "h3",
                                                                {
                                                                    className:
                                                                        "text-lg font-semibold mb-2",
                                                                    children:
                                                                        "Customer Information",
                                                                }
                                                            ),
                                                            /*#__PURE__*/ _jsxs(
                                                                "div",
                                                                {
                                                                    className:
                                                                        "bg-gray-50 p-4 rounded-md space-y-2",
                                                                    children: [
                                                                        /*#__PURE__*/ _jsxs(
                                                                            "p",
                                                                            {
                                                                                children:
                                                                                    [
                                                                                        /*#__PURE__*/ _jsx(
                                                                                            "span",
                                                                                            {
                                                                                                className:
                                                                                                    "font-medium",
                                                                                                children:
                                                                                                    "Name:",
                                                                                            }
                                                                                        ),
                                                                                        " ",
                                                                                        selectedBooking
                                                                                            .customer
                                                                                            .name,
                                                                                    ],
                                                                            }
                                                                        ),
                                                                        /*#__PURE__*/ _jsxs(
                                                                            "p",
                                                                            {
                                                                                children:
                                                                                    [
                                                                                        /*#__PURE__*/ _jsx(
                                                                                            "span",
                                                                                            {
                                                                                                className:
                                                                                                    "font-medium",
                                                                                                children:
                                                                                                    "Email:",
                                                                                            }
                                                                                        ),
                                                                                        " ",
                                                                                        selectedBooking
                                                                                            .customer
                                                                                            .email,
                                                                                    ],
                                                                            }
                                                                        ),
                                                                        /*#__PURE__*/ _jsxs(
                                                                            "p",
                                                                            {
                                                                                children:
                                                                                    [
                                                                                        /*#__PURE__*/ _jsx(
                                                                                            "span",
                                                                                            {
                                                                                                className:
                                                                                                    "font-medium",
                                                                                                children:
                                                                                                    "Phone:",
                                                                                            }
                                                                                        ),
                                                                                        " ",
                                                                                        selectedBooking
                                                                                            .customer
                                                                                            .phone,
                                                                                    ],
                                                                            }
                                                                        ),
                                                                    ],
                                                                }
                                                            ),
                                                        ],
                                                    }),
                                                    /*#__PURE__*/ _jsxs("div", {
                                                        children: [
                                                            /*#__PURE__*/ _jsx(
                                                                "h3",
                                                                {
                                                                    className:
                                                                        "text-lg font-semibold mb-2",
                                                                    children:
                                                                        "Booking Details",
                                                                }
                                                            ),
                                                            /*#__PURE__*/ _jsxs(
                                                                "div",
                                                                {
                                                                    className:
                                                                        "bg-gray-50 p-4 rounded-md space-y-2",
                                                                    children: [
                                                                        /*#__PURE__*/ _jsxs(
                                                                            "p",
                                                                            {
                                                                                children:
                                                                                    [
                                                                                        /*#__PURE__*/ _jsx(
                                                                                            "span",
                                                                                            {
                                                                                                className:
                                                                                                    "font-medium",
                                                                                                children:
                                                                                                    "Booking Date:",
                                                                                            }
                                                                                        ),
                                                                                        " ",
                                                                                        selectedBooking.bookingDate,
                                                                                    ],
                                                                            }
                                                                        ),
                                                                        /*#__PURE__*/ _jsxs(
                                                                            "p",
                                                                            {
                                                                                children:
                                                                                    [
                                                                                        /*#__PURE__*/ _jsx(
                                                                                            "span",
                                                                                            {
                                                                                                className:
                                                                                                    "font-medium",
                                                                                                children:
                                                                                                    "Trek Date:",
                                                                                            }
                                                                                        ),
                                                                                        " ",
                                                                                        selectedBooking.trekDate,
                                                                                    ],
                                                                            }
                                                                        ),
                                                                        /*#__PURE__*/ _jsxs(
                                                                            "p",
                                                                            {
                                                                                children:
                                                                                    [
                                                                                        /*#__PURE__*/ _jsx(
                                                                                            "span",
                                                                                            {
                                                                                                className:
                                                                                                    "font-medium",
                                                                                                children:
                                                                                                    "Participants:",
                                                                                            }
                                                                                        ),
                                                                                        " ",
                                                                                        selectedBooking.participants,
                                                                                    ],
                                                                            }
                                                                        ),
                                                                        /*#__PURE__*/ _jsxs(
                                                                            "p",
                                                                            {
                                                                                children:
                                                                                    [
                                                                                        /*#__PURE__*/ _jsx(
                                                                                            "span",
                                                                                            {
                                                                                                className:
                                                                                                    "font-medium",
                                                                                                children:
                                                                                                    "Amount:",
                                                                                            }
                                                                                        ),
                                                                                        " ",
                                                                                        selectedBooking.amount,
                                                                                    ],
                                                                            }
                                                                        ),
                                                                        /*#__PURE__*/ _jsxs(
                                                                            "p",
                                                                            {
                                                                                children:
                                                                                    [
                                                                                        /*#__PURE__*/ _jsx(
                                                                                            "span",
                                                                                            {
                                                                                                className:
                                                                                                    "font-medium",
                                                                                                children:
                                                                                                    "Payment Method:",
                                                                                            }
                                                                                        ),
                                                                                        " ",
                                                                                        selectedBooking.paymentMethod,
                                                                                    ],
                                                                            }
                                                                        ),
                                                                        /*#__PURE__*/ _jsxs(
                                                                            "p",
                                                                            {
                                                                                children:
                                                                                    [
                                                                                        /*#__PURE__*/ _jsx(
                                                                                            "span",
                                                                                            {
                                                                                                className:
                                                                                                    "font-medium",
                                                                                                children:
                                                                                                    "Status:",
                                                                                            }
                                                                                        ),
                                                                                        " ",
                                                                                        getStatusBadge(
                                                                                            selectedBooking.status
                                                                                        ),
                                                                                    ],
                                                                            }
                                                                        ),
                                                                        selectedBooking.notes &&
                                                                            /*#__PURE__*/ _jsxs(
                                                                                "p",
                                                                                {
                                                                                    children:
                                                                                        [
                                                                                            /*#__PURE__*/ _jsx(
                                                                                                "span",
                                                                                                {
                                                                                                    className:
                                                                                                        "font-medium",
                                                                                                    children:
                                                                                                        "Notes:",
                                                                                                }
                                                                                            ),
                                                                                            " ",
                                                                                            selectedBooking.notes,
                                                                                        ],
                                                                                }
                                                                            ),
                                                                    ],
                                                                }
                                                            ),
                                                        ],
                                                    }),
                                                ],
                                            }),
                                            /*#__PURE__*/ _jsxs("div", {
                                                className: "space-y-4",
                                                children: [
                                                    /*#__PURE__*/ _jsxs("div", {
                                                        children: [
                                                            /*#__PURE__*/ _jsx(
                                                                "h3",
                                                                {
                                                                    className:
                                                                        "text-lg font-semibold mb-2",
                                                                    children:
                                                                        "Trek Information",
                                                                }
                                                            ),
                                                            /*#__PURE__*/ _jsxs(
                                                                "div",
                                                                {
                                                                    className:
                                                                        "bg-gray-50 p-4 rounded-md overflow-hidden",
                                                                    children: [
                                                                        /*#__PURE__*/ _jsx(
                                                                            "div",
                                                                            {
                                                                                className:
                                                                                    "h-40 rounded-md overflow-hidden mb-4",
                                                                                children:
                                                                                    /*#__PURE__*/ _jsx(
                                                                                        "img",
                                                                                        {
                                                                                            src: getTrekImage(
                                                                                                selectedBooking
                                                                                                    .trek
                                                                                                    .image
                                                                                            ),
                                                                                            alt: selectedBooking
                                                                                                .trek
                                                                                                .name,
                                                                                            className:
                                                                                                "w-full h-full object-cover",
                                                                                        }
                                                                                    ),
                                                                            }
                                                                        ),
                                                                        /*#__PURE__*/ _jsx(
                                                                            "h4",
                                                                            {
                                                                                className:
                                                                                    "font-medium text-lg",
                                                                                children:
                                                                                    selectedBooking
                                                                                        .trek
                                                                                        .name,
                                                                            }
                                                                        ),
                                                                        /*#__PURE__*/ _jsxs(
                                                                            "div",
                                                                            {
                                                                                className:
                                                                                    "flex items-center text-gray-500 text-sm mt-1",
                                                                                children:
                                                                                    [
                                                                                        /*#__PURE__*/ _jsx(
                                                                                            MapPin,
                                                                                            {
                                                                                                className:
                                                                                                    "h-4 w-4 mr-1",
                                                                                            }
                                                                                        ),
                                                                                        " ",
                                                                                        selectedBooking
                                                                                            .trek
                                                                                            .destination,
                                                                                    ],
                                                                            }
                                                                        ),
                                                                    ],
                                                                }
                                                            ),
                                                        ],
                                                    }),
                                                    /*#__PURE__*/ _jsxs("div", {
                                                        children: [
                                                            /*#__PURE__*/ _jsx(
                                                                "h3",
                                                                {
                                                                    className:
                                                                        "text-lg font-semibold mb-2",
                                                                    children:
                                                                        "Vendor Information",
                                                                }
                                                            ),
                                                            /*#__PURE__*/ _jsxs(
                                                                "div",
                                                                {
                                                                    className:
                                                                        "bg-gray-50 p-4 rounded-md",
                                                                    children: [
                                                                        /*#__PURE__*/ _jsx(
                                                                            "h4",
                                                                            {
                                                                                className:
                                                                                    "font-medium",
                                                                                children:
                                                                                    selectedBooking
                                                                                        .vendor
                                                                                        .name,
                                                                            }
                                                                        ),
                                                                        /*#__PURE__*/ _jsxs(
                                                                            "p",
                                                                            {
                                                                                className:
                                                                                    "text-sm text-gray-500",
                                                                                children:
                                                                                    [
                                                                                        "Vendor ID: ",
                                                                                        selectedBooking
                                                                                            .vendor
                                                                                            .id,
                                                                                    ],
                                                                            }
                                                                        ),
                                                                    ],
                                                                }
                                                            ),
                                                        ],
                                                    }),
                                                ],
                                            }),
                                        ],
                                    }),
                                    /*#__PURE__*/ _jsx("div", {
                                        className: "flex justify-end pt-4",
                                        children: /*#__PURE__*/ _jsx(Button, {
                                            onClick: () =>
                                                setIsViewDialogOpen(false),
                                            children: "Close",
                                        }),
                                    }),
                                ],
                            }),
                    ],
                }),
            }),
        ],
    });
};
export default AdminBookings;
