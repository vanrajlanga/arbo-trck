import { useState, useEffect } from 'react';
import { toast } from "sonner";
import { Plus, Search, Filter, Calendar, Edit, Trash2, Eye, CalendarIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { format } from 'date-fns';
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [treks, setTreks] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isNewBookingDialogOpen, setIsNewBookingDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // New booking form state
  const [newBooking, setNewBooking] = useState({
    trekId: 0,
    customerId: 0,
    trekDate: '',
    participants: 1,
    status: 'confirmed',
    paymentStatus: 'paid'
  });
  useEffect(() => {
    // Load bookings from localStorage or create sample data
    const savedBookings = localStorage.getItem('vendorBookings');
    const savedTreks = localStorage.getItem('vendorTreks');
    const savedCustomers = localStorage.getItem('vendorCustomers');

    // Load treks
    if (savedTreks) {
      const parsedTreks = JSON.parse(savedTreks);
      setTreks(parsedTreks.map(trek => ({
        id: trek.id,
        name: trek.name,
        destination: trek.destination,
        price: trek.price,
        slots: trek.slots,
        startDate: trek.startDate,
        duration: trek.duration
      })));
    }

    // Load customers
    if (savedCustomers) {
      setCustomers(JSON.parse(savedCustomers));
    } else {
      const sampleCustomers = [{
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        phone: "9876543210"
      }, {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        phone: "9876543211"
      }];
      setCustomers(sampleCustomers);
      localStorage.setItem('vendorCustomers', JSON.stringify(sampleCustomers));
    }

    // Load bookings
    if (savedBookings) {
      setBookings(JSON.parse(savedBookings));
    } else {
      // Create sample bookings if none exist
      const sampleBookings = [{
        id: 1,
        trekId: 1,
        trekName: "Himalayan Adventure",
        customerId: 1,
        customerName: "John Doe",
        bookingDate: "2025-05-01",
        trekDate: "2025-06-15",
        participants: 2,
        totalAmount: 10000,
        status: 'confirmed',
        paymentStatus: 'paid'
      }, {
        id: 2,
        trekId: 2,
        trekName: "Valley Trek",
        customerId: 2,
        customerName: "Jane Smith",
        bookingDate: "2025-05-05",
        trekDate: "2025-06-20",
        participants: 3,
        totalAmount: 9000,
        status: 'pending',
        paymentStatus: 'pending'
      }];
      setBookings(sampleBookings);
      localStorage.setItem('vendorBookings', JSON.stringify(sampleBookings));
    }
    setIsLoading(false);
  }, []);

  // Filter bookings based on search term and status
  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.trekName.toLowerCase().includes(searchTerm.toLowerCase()) || booking.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Handle form input changes for new booking
  const handleInputChange = e => {
    const {
      name,
      value
    } = e.target;
    setNewBooking({
      ...newBooking,
      [name]: name === 'participants' ? parseInt(value) : value
    });
  };

  // Get customer by ID
  const getCustomerById = id => {
    return customers.find(customer => customer.id === id);
  };

  // Get trek by ID
  const getTrekById = id => {
    return treks.find(trek => trek.id === id);
  };

  // Calculate total amount based on trek price and participants
  const calculateTotalAmount = () => {
    const selectedTrek = getTrekById(newBooking.trekId);
    if (selectedTrek) {
      return parseInt(selectedTrek.price) * newBooking.participants;
    }
    return 0;
  };

  // Create new booking
  const handleCreateBooking = () => {
    // Validate required fields
    if (!newBooking.trekId || !newBooking.customerId || !newBooking.trekDate) {
      toast.error("Please fill all required fields");
      return;
    }
    const selectedTrek = getTrekById(newBooking.trekId);
    const selectedCustomer = getCustomerById(newBooking.customerId);
    if (!selectedTrek || !selectedCustomer) {
      toast.error("Trek or customer not found");
      return;
    }
    const totalAmount = calculateTotalAmount();

    // Create new booking object
    const booking = {
      id: Math.floor(Math.random() * 1000) + 3,
      // Generate random ID
      trekId: newBooking.trekId,
      trekName: selectedTrek.name,
      customerId: newBooking.customerId,
      customerName: selectedCustomer.name,
      bookingDate: format(new Date(), 'yyyy-MM-dd'),
      trekDate: newBooking.trekDate,
      participants: newBooking.participants,
      totalAmount,
      status: newBooking.status,
      paymentStatus: newBooking.paymentStatus
    };

    // Add to bookings array and update localStorage
    const updatedBookings = [...bookings, booking];
    setBookings(updatedBookings);
    localStorage.setItem('vendorBookings', JSON.stringify(updatedBookings));

    // Update trek's booked slots
    const updatedTreks = treks.map(trek => {
      if (trek.id === newBooking.trekId) {
        return {
          ...trek,
          slots: {
            ...trek.slots,
            booked: trek.slots.booked + newBooking.participants
          }
        };
      }
      return trek;
    });
    setTreks(updatedTreks);
    localStorage.setItem('vendorTreks', JSON.stringify(updatedTreks));

    // Reset form and close dialog
    setNewBooking({
      trekId: 0,
      customerId: 0,
      trekDate: '',
      participants: 1,
      status: 'confirmed',
      paymentStatus: 'paid'
    });
    setIsNewBookingDialogOpen(false);
    toast.success("Booking created successfully");
  };

  // View booking details
  const viewBooking = booking => {
    setSelectedBooking(booking);
    setIsViewDialogOpen(true);
  };

  // Delete booking
  const deleteBooking = () => {
    if (!selectedBooking) return;

    // Remove booking from bookings array
    const updatedBookings = bookings.filter(booking => booking.id !== selectedBooking.id);
    setBookings(updatedBookings);
    localStorage.setItem('vendorBookings', JSON.stringify(updatedBookings));

    // Update trek's booked slots
    const updatedTreks = treks.map(trek => {
      if (trek.id === selectedBooking.trekId) {
        return {
          ...trek,
          slots: {
            ...trek.slots,
            booked: Math.max(0, trek.slots.booked - selectedBooking.participants)
          }
        };
      }
      return trek;
    });
    setTreks(updatedTreks);
    localStorage.setItem('vendorTreks', JSON.stringify(updatedTreks));
    setIsDeleteDialogOpen(false);
    setSelectedBooking(null);
    toast.success("Booking deleted successfully");
  };

  // Update booking
  const updateBooking = () => {
    if (!selectedBooking) return;

    // Update booking in bookings array
    const updatedBookings = bookings.map(booking => booking.id === selectedBooking.id ? selectedBooking : booking);
    setBookings(updatedBookings);
    localStorage.setItem('vendorBookings', JSON.stringify(updatedBookings));
    setIsEditDialogOpen(false);
    setSelectedBooking(null);
    toast.success("Booking updated successfully");
  };

  // Get status badge color
  const getStatusBadgeColor = status => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get payment status badge color
  const getPaymentBadgeColor = status => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'refunded':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  return /*#__PURE__*/_jsxs("div", {
    className: "space-y-6",
    children: [/*#__PURE__*/_jsxs("div", {
      className: "flex flex-col md:flex-row md:items-center justify-between",
      children: [/*#__PURE__*/_jsx("h1", {
        className: "text-2xl font-bold mb-4 md:mb-0",
        children: "Bookings Management"
      }), /*#__PURE__*/_jsxs(Button, {
        onClick: () => setIsNewBookingDialogOpen(true),
        className: "flex items-center",
        children: [/*#__PURE__*/_jsx(Plus, {
          className: "h-4 w-4 mr-2"
        }), "Add New Booking"]
      })]
    }), /*#__PURE__*/_jsx(Card, {
      children: /*#__PURE__*/_jsxs(CardContent, {
        className: "p-6",
        children: [/*#__PURE__*/_jsxs("div", {
          className: "flex flex-col md:flex-row gap-4 mb-6",
          children: [/*#__PURE__*/_jsxs("div", {
            className: "relative flex-grow",
            children: [/*#__PURE__*/_jsx(Search, {
              className: "absolute left-2 top-2.5 h-4 w-4 text-gray-400"
            }), /*#__PURE__*/_jsx(Input, {
              placeholder: "Search by trek or customer name...",
              value: searchTerm,
              onChange: e => setSearchTerm(e.target.value),
              className: "pl-8"
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "flex items-center space-x-2 min-w-[200px]",
            children: [/*#__PURE__*/_jsx(Filter, {
              className: "h-4 w-4 text-gray-400"
            }), /*#__PURE__*/_jsxs(Select, {
              value: statusFilter,
              onValueChange: setStatusFilter,
              children: [/*#__PURE__*/_jsx(SelectTrigger, {
                children: /*#__PURE__*/_jsx(SelectValue, {
                  placeholder: "Filter by status"
                })
              }), /*#__PURE__*/_jsxs(SelectContent, {
                children: [/*#__PURE__*/_jsx(SelectItem, {
                  value: "all",
                  children: "All Status"
                }), /*#__PURE__*/_jsx(SelectItem, {
                  value: "confirmed",
                  children: "Confirmed"
                }), /*#__PURE__*/_jsx(SelectItem, {
                  value: "pending",
                  children: "Pending"
                }), /*#__PURE__*/_jsx(SelectItem, {
                  value: "cancelled",
                  children: "Cancelled"
                }), /*#__PURE__*/_jsx(SelectItem, {
                  value: "completed",
                  children: "Completed"
                })]
              })]
            })]
          })]
        }), /*#__PURE__*/_jsxs(Tabs, {
          defaultValue: "all",
          children: [/*#__PURE__*/_jsxs(TabsList, {
            children: [/*#__PURE__*/_jsx(TabsTrigger, {
              value: "all",
              children: "All Bookings"
            }), /*#__PURE__*/_jsx(TabsTrigger, {
              value: "confirmed",
              children: "Confirmed"
            }), /*#__PURE__*/_jsx(TabsTrigger, {
              value: "pending",
              children: "Pending"
            }), /*#__PURE__*/_jsx(TabsTrigger, {
              value: "completed",
              children: "Completed"
            }), /*#__PURE__*/_jsx(TabsTrigger, {
              value: "cancelled",
              children: "Cancelled"
            })]
          }), /*#__PURE__*/_jsx(TabsContent, {
            value: "all",
            className: "mt-6",
            children: /*#__PURE__*/_jsx(BookingsTable, {
              bookings: filteredBookings,
              isLoading: isLoading,
              onView: viewBooking,
              onEdit: booking => {
                setSelectedBooking(booking);
                setIsEditDialogOpen(true);
              },
              onDelete: booking => {
                setSelectedBooking(booking);
                setIsDeleteDialogOpen(true);
              },
              getStatusBadgeColor: getStatusBadgeColor,
              getPaymentBadgeColor: getPaymentBadgeColor
            })
          }), /*#__PURE__*/_jsx(TabsContent, {
            value: "confirmed",
            className: "mt-6",
            children: /*#__PURE__*/_jsx(BookingsTable, {
              bookings: filteredBookings.filter(b => b.status === 'confirmed'),
              isLoading: isLoading,
              onView: viewBooking,
              onEdit: booking => {
                setSelectedBooking(booking);
                setIsEditDialogOpen(true);
              },
              onDelete: booking => {
                setSelectedBooking(booking);
                setIsDeleteDialogOpen(true);
              },
              getStatusBadgeColor: getStatusBadgeColor,
              getPaymentBadgeColor: getPaymentBadgeColor
            })
          }), /*#__PURE__*/_jsx(TabsContent, {
            value: "pending",
            className: "mt-6",
            children: /*#__PURE__*/_jsx(BookingsTable, {
              bookings: filteredBookings.filter(b => b.status === 'pending'),
              isLoading: isLoading,
              onView: viewBooking,
              onEdit: booking => {
                setSelectedBooking(booking);
                setIsEditDialogOpen(true);
              },
              onDelete: booking => {
                setSelectedBooking(booking);
                setIsDeleteDialogOpen(true);
              },
              getStatusBadgeColor: getStatusBadgeColor,
              getPaymentBadgeColor: getPaymentBadgeColor
            })
          }), /*#__PURE__*/_jsx(TabsContent, {
            value: "completed",
            className: "mt-6",
            children: /*#__PURE__*/_jsx(BookingsTable, {
              bookings: filteredBookings.filter(b => b.status === 'completed'),
              isLoading: isLoading,
              onView: viewBooking,
              onEdit: booking => {
                setSelectedBooking(booking);
                setIsEditDialogOpen(true);
              },
              onDelete: booking => {
                setSelectedBooking(booking);
                setIsDeleteDialogOpen(true);
              },
              getStatusBadgeColor: getStatusBadgeColor,
              getPaymentBadgeColor: getPaymentBadgeColor
            })
          }), /*#__PURE__*/_jsx(TabsContent, {
            value: "cancelled",
            className: "mt-6",
            children: /*#__PURE__*/_jsx(BookingsTable, {
              bookings: filteredBookings.filter(b => b.status === 'cancelled'),
              isLoading: isLoading,
              onView: viewBooking,
              onEdit: booking => {
                setSelectedBooking(booking);
                setIsEditDialogOpen(true);
              },
              onDelete: booking => {
                setSelectedBooking(booking);
                setIsDeleteDialogOpen(true);
              },
              getStatusBadgeColor: getStatusBadgeColor,
              getPaymentBadgeColor: getPaymentBadgeColor
            })
          })]
        })]
      })
    }), /*#__PURE__*/_jsx(Dialog, {
      open: isNewBookingDialogOpen,
      onOpenChange: setIsNewBookingDialogOpen,
      children: /*#__PURE__*/_jsxs(DialogContent, {
        className: "max-w-2xl",
        children: [/*#__PURE__*/_jsxs(DialogHeader, {
          children: [/*#__PURE__*/_jsx(DialogTitle, {
            children: "Add New Booking"
          }), /*#__PURE__*/_jsx(DialogDescription, {
            children: "Create a new booking for a customer"
          })]
        }), /*#__PURE__*/_jsxs("div", {
          className: "grid grid-cols-1 md:grid-cols-2 gap-6 py-4",
          children: [/*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx(Label, {
              htmlFor: "trekId",
              className: "mb-2 block",
              children: "Select Trek *"
            }), /*#__PURE__*/_jsxs(Select, {
              value: newBooking.trekId ? String(newBooking.trekId) : "",
              onValueChange: value => setNewBooking({
                ...newBooking,
                trekId: parseInt(value)
              }),
              children: [/*#__PURE__*/_jsx(SelectTrigger, {
                id: "trekId",
                children: /*#__PURE__*/_jsx(SelectValue, {
                  placeholder: "Select a trek"
                })
              }), /*#__PURE__*/_jsx(SelectContent, {
                children: treks.map(trek => /*#__PURE__*/_jsxs(SelectItem, {
                  value: String(trek.id),
                  children: [trek.name, " - ", trek.destination]
                }, trek.id))
              })]
            }), newBooking.trekId > 0 && /*#__PURE__*/_jsxs("div", {
              className: "mt-4 p-4 bg-gray-50 rounded-md",
              children: [/*#__PURE__*/_jsx("h4", {
                className: "font-medium mb-2",
                children: "Trek Details"
              }), (() => {
                const trek = getTrekById(newBooking.trekId);
                if (!trek) return /*#__PURE__*/_jsx("p", {
                  children: "Trek not found"
                });
                return /*#__PURE__*/_jsxs("div", {
                  className: "space-y-2 text-sm",
                  children: [/*#__PURE__*/_jsxs("p", {
                    children: [/*#__PURE__*/_jsx("span", {
                      className: "font-medium",
                      children: "Price:"
                    }), " \u20B9", trek.price, " per person"]
                  }), /*#__PURE__*/_jsxs("p", {
                    children: [/*#__PURE__*/_jsx("span", {
                      className: "font-medium",
                      children: "Duration:"
                    }), " ", trek.duration]
                  }), /*#__PURE__*/_jsxs("p", {
                    children: [/*#__PURE__*/_jsx("span", {
                      className: "font-medium",
                      children: "Available Slots:"
                    }), " ", trek.slots.total - trek.slots.booked]
                  })]
                });
              })()]
            })]
          }), /*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx(Label, {
              htmlFor: "customerId",
              className: "mb-2 block",
              children: "Select Customer *"
            }), /*#__PURE__*/_jsxs(Select, {
              value: newBooking.customerId ? String(newBooking.customerId) : "",
              onValueChange: value => setNewBooking({
                ...newBooking,
                customerId: parseInt(value)
              }),
              children: [/*#__PURE__*/_jsx(SelectTrigger, {
                id: "customerId",
                children: /*#__PURE__*/_jsx(SelectValue, {
                  placeholder: "Select a customer"
                })
              }), /*#__PURE__*/_jsx(SelectContent, {
                children: customers.map(customer => /*#__PURE__*/_jsxs(SelectItem, {
                  value: String(customer.id),
                  children: [customer.name, " - ", customer.phone]
                }, customer.id))
              })]
            })]
          }), /*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx(Label, {
              htmlFor: "trekDate",
              className: "mb-2 block",
              children: "Trek Date *"
            }), /*#__PURE__*/_jsxs(Popover, {
              children: [/*#__PURE__*/_jsx(PopoverTrigger, {
                asChild: true,
                children: /*#__PURE__*/_jsxs(Button, {
                  variant: "outline",
                  className: "w-full justify-start text-left font-normal",
                  disabled: newBooking.trekId === 0,
                  children: [/*#__PURE__*/_jsx(CalendarIcon, {
                    className: "mr-2 h-4 w-4"
                  }), newBooking.trekDate ? format(new Date(newBooking.trekDate), 'PP') : /*#__PURE__*/_jsx("span", {
                    children: "Pick a date"
                  })]
                })
              }), /*#__PURE__*/_jsx(PopoverContent, {
                className: "w-auto p-0",
                children: /*#__PURE__*/_jsx(CalendarComponent, {
                  mode: "single",
                  selected: newBooking.trekDate ? new Date(newBooking.trekDate) : undefined,
                  onSelect: date => {
                    if (date) {
                      setNewBooking({
                        ...newBooking,
                        trekDate: format(date, 'yyyy-MM-dd')
                      });
                    }
                  },
                  initialFocus: true
                })
              })]
            })]
          }), /*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx(Label, {
              htmlFor: "participants",
              className: "mb-2 block",
              children: "Number of Participants *"
            }), /*#__PURE__*/_jsx(Input, {
              id: "participants",
              name: "participants",
              type: "number",
              min: "1",
              max: (() => {
                const trek = getTrekById(newBooking.trekId);
                return trek ? trek.slots.total - trek.slots.booked : 1;
              })(),
              value: newBooking.participants,
              onChange: handleInputChange,
              className: "mt-1",
              disabled: newBooking.trekId === 0
            })]
          }), /*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx(Label, {
              htmlFor: "status",
              className: "mb-2 block",
              children: "Booking Status"
            }), /*#__PURE__*/_jsxs(Select, {
              value: newBooking.status,
              onValueChange: value => setNewBooking({
                ...newBooking,
                status: value
              }),
              children: [/*#__PURE__*/_jsx(SelectTrigger, {
                id: "status",
                children: /*#__PURE__*/_jsx(SelectValue, {
                  placeholder: "Select status"
                })
              }), /*#__PURE__*/_jsxs(SelectContent, {
                children: [/*#__PURE__*/_jsx(SelectItem, {
                  value: "confirmed",
                  children: "Confirmed"
                }), /*#__PURE__*/_jsx(SelectItem, {
                  value: "pending",
                  children: "Pending"
                })]
              })]
            })]
          }), /*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx(Label, {
              htmlFor: "paymentStatus",
              className: "mb-2 block",
              children: "Payment Status"
            }), /*#__PURE__*/_jsxs(Select, {
              value: newBooking.paymentStatus,
              onValueChange: value => setNewBooking({
                ...newBooking,
                paymentStatus: value
              }),
              children: [/*#__PURE__*/_jsx(SelectTrigger, {
                id: "paymentStatus",
                children: /*#__PURE__*/_jsx(SelectValue, {
                  placeholder: "Select payment status"
                })
              }), /*#__PURE__*/_jsxs(SelectContent, {
                children: [/*#__PURE__*/_jsx(SelectItem, {
                  value: "paid",
                  children: "Paid"
                }), /*#__PURE__*/_jsx(SelectItem, {
                  value: "pending",
                  children: "Pending"
                })]
              })]
            })]
          }), /*#__PURE__*/_jsx("div", {
            className: "md:col-span-2",
            children: /*#__PURE__*/_jsx(Card, {
              children: /*#__PURE__*/_jsx(CardContent, {
                className: "p-4",
                children: /*#__PURE__*/_jsxs("div", {
                  className: "flex justify-between items-center",
                  children: [/*#__PURE__*/_jsx("h4", {
                    className: "font-medium",
                    children: "Total Amount:"
                  }), /*#__PURE__*/_jsxs("span", {
                    className: "text-xl font-bold",
                    children: ["\u20B9", calculateTotalAmount()]
                  })]
                })
              })
            })
          })]
        }), /*#__PURE__*/_jsxs(DialogFooter, {
          children: [/*#__PURE__*/_jsx(Button, {
            variant: "outline",
            onClick: () => setIsNewBookingDialogOpen(false),
            children: "Cancel"
          }), /*#__PURE__*/_jsx(Button, {
            onClick: handleCreateBooking,
            children: "Create Booking"
          })]
        })]
      })
    }), /*#__PURE__*/_jsx(Dialog, {
      open: isViewDialogOpen,
      onOpenChange: setIsViewDialogOpen,
      children: /*#__PURE__*/_jsxs(DialogContent, {
        className: "max-w-2xl",
        children: [/*#__PURE__*/_jsx(DialogHeader, {
          children: /*#__PURE__*/_jsx(DialogTitle, {
            children: "Booking Details"
          })
        }), selectedBooking && /*#__PURE__*/_jsxs("div", {
          className: "py-4 space-y-6",
          children: [/*#__PURE__*/_jsxs("div", {
            className: "flex justify-between items-center",
            children: [/*#__PURE__*/_jsx("h3", {
              className: "text-lg font-semibold",
              children: selectedBooking.trekName
            }), /*#__PURE__*/_jsxs("div", {
              className: "flex space-x-2",
              children: [/*#__PURE__*/_jsx(Badge, {
                className: getStatusBadgeColor(selectedBooking.status),
                children: selectedBooking.status.charAt(0).toUpperCase() + selectedBooking.status.slice(1)
              }), /*#__PURE__*/_jsx(Badge, {
                className: getPaymentBadgeColor(selectedBooking.paymentStatus),
                children: selectedBooking.paymentStatus.charAt(0).toUpperCase() + selectedBooking.paymentStatus.slice(1)
              })]
            })]
          }), /*#__PURE__*/_jsx(Separator, {}), /*#__PURE__*/_jsxs("div", {
            className: "grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6",
            children: [/*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx("h4", {
                className: "font-medium text-gray-500 mb-1",
                children: "Customer"
              }), /*#__PURE__*/_jsx("p", {
                children: selectedBooking.customerName
              })]
            }), /*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx("h4", {
                className: "font-medium text-gray-500 mb-1",
                children: "Booking Date"
              }), /*#__PURE__*/_jsx("p", {
                children: format(new Date(selectedBooking.bookingDate), 'MMM d, yyyy')
              })]
            }), /*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx("h4", {
                className: "font-medium text-gray-500 mb-1",
                children: "Trek Date"
              }), /*#__PURE__*/_jsx("p", {
                children: format(new Date(selectedBooking.trekDate), 'MMM d, yyyy')
              })]
            }), /*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx("h4", {
                className: "font-medium text-gray-500 mb-1",
                children: "Participants"
              }), /*#__PURE__*/_jsx("p", {
                children: selectedBooking.participants
              })]
            }), /*#__PURE__*/_jsxs("div", {
              className: "md:col-span-2",
              children: [/*#__PURE__*/_jsx("h4", {
                className: "font-medium text-gray-500 mb-1",
                children: "Total Amount"
              }), /*#__PURE__*/_jsxs("p", {
                className: "text-xl font-bold",
                children: ["\u20B9", selectedBooking.totalAmount]
              })]
            })]
          })]
        }), /*#__PURE__*/_jsxs(DialogFooter, {
          children: [/*#__PURE__*/_jsxs(Button, {
            variant: "outline",
            onClick: () => {
              setIsViewDialogOpen(false);
              if (selectedBooking) {
                setSelectedBooking(selectedBooking);
                setIsEditDialogOpen(true);
              }
            },
            children: [/*#__PURE__*/_jsx(Edit, {
              className: "h-4 w-4 mr-2"
            }), "Edit"]
          }), /*#__PURE__*/_jsx(Button, {
            onClick: () => setIsViewDialogOpen(false),
            children: "Close"
          })]
        })]
      })
    }), /*#__PURE__*/_jsx(Dialog, {
      open: isEditDialogOpen,
      onOpenChange: setIsEditDialogOpen,
      children: /*#__PURE__*/_jsxs(DialogContent, {
        className: "max-w-2xl",
        children: [/*#__PURE__*/_jsx(DialogHeader, {
          children: /*#__PURE__*/_jsx(DialogTitle, {
            children: "Edit Booking"
          })
        }), selectedBooking && /*#__PURE__*/_jsxs("div", {
          className: "py-4 grid grid-cols-1 md:grid-cols-2 gap-6",
          children: [/*#__PURE__*/_jsxs("div", {
            className: "md:col-span-2",
            children: [/*#__PURE__*/_jsx("p", {
              className: "text-lg font-medium",
              children: selectedBooking.trekName
            }), /*#__PURE__*/_jsxs("p", {
              className: "text-sm text-gray-500",
              children: ["Customer: ", selectedBooking.customerName]
            })]
          }), /*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx(Label, {
              htmlFor: "edit-status",
              className: "mb-2 block",
              children: "Booking Status"
            }), /*#__PURE__*/_jsxs(Select, {
              value: selectedBooking.status,
              onValueChange: value => setSelectedBooking({
                ...selectedBooking,
                status: value
              }),
              children: [/*#__PURE__*/_jsx(SelectTrigger, {
                id: "edit-status",
                children: /*#__PURE__*/_jsx(SelectValue, {})
              }), /*#__PURE__*/_jsxs(SelectContent, {
                children: [/*#__PURE__*/_jsx(SelectItem, {
                  value: "confirmed",
                  children: "Confirmed"
                }), /*#__PURE__*/_jsx(SelectItem, {
                  value: "pending",
                  children: "Pending"
                }), /*#__PURE__*/_jsx(SelectItem, {
                  value: "cancelled",
                  children: "Cancelled"
                }), /*#__PURE__*/_jsx(SelectItem, {
                  value: "completed",
                  children: "Completed"
                })]
              })]
            })]
          }), /*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx(Label, {
              htmlFor: "edit-payment",
              className: "mb-2 block",
              children: "Payment Status"
            }), /*#__PURE__*/_jsxs(Select, {
              value: selectedBooking.paymentStatus,
              onValueChange: value => setSelectedBooking({
                ...selectedBooking,
                paymentStatus: value
              }),
              children: [/*#__PURE__*/_jsx(SelectTrigger, {
                id: "edit-payment",
                children: /*#__PURE__*/_jsx(SelectValue, {})
              }), /*#__PURE__*/_jsxs(SelectContent, {
                children: [/*#__PURE__*/_jsx(SelectItem, {
                  value: "paid",
                  children: "Paid"
                }), /*#__PURE__*/_jsx(SelectItem, {
                  value: "pending",
                  children: "Pending"
                }), /*#__PURE__*/_jsx(SelectItem, {
                  value: "refunded",
                  children: "Refunded"
                })]
              })]
            })]
          }), /*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx(Label, {
              htmlFor: "edit-date",
              className: "mb-2 block",
              children: "Trek Date"
            }), /*#__PURE__*/_jsxs(Popover, {
              children: [/*#__PURE__*/_jsx(PopoverTrigger, {
                asChild: true,
                children: /*#__PURE__*/_jsxs(Button, {
                  variant: "outline",
                  className: "w-full justify-start text-left font-normal",
                  children: [/*#__PURE__*/_jsx(CalendarIcon, {
                    className: "mr-2 h-4 w-4"
                  }), format(new Date(selectedBooking.trekDate), 'PP')]
                })
              }), /*#__PURE__*/_jsx(PopoverContent, {
                className: "w-auto p-0",
                children: /*#__PURE__*/_jsx(CalendarComponent, {
                  mode: "single",
                  selected: new Date(selectedBooking.trekDate),
                  onSelect: date => {
                    if (date) {
                      setSelectedBooking({
                        ...selectedBooking,
                        trekDate: format(date, 'yyyy-MM-dd')
                      });
                    }
                  },
                  initialFocus: true
                })
              })]
            })]
          }), /*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx(Label, {
              htmlFor: "edit-participants",
              className: "mb-2 block",
              children: "Participants"
            }), /*#__PURE__*/_jsx(Input, {
              id: "edit-participants",
              type: "number",
              min: "1",
              value: selectedBooking.participants,
              onChange: e => setSelectedBooking({
                ...selectedBooking,
                participants: parseInt(e.target.value),
                totalAmount: parseInt(e.target.value) * (selectedBooking.totalAmount / selectedBooking.participants)
              })
            })]
          })]
        }), /*#__PURE__*/_jsxs(DialogFooter, {
          children: [/*#__PURE__*/_jsx(Button, {
            variant: "outline",
            onClick: () => setIsEditDialogOpen(false),
            children: "Cancel"
          }), /*#__PURE__*/_jsx(Button, {
            onClick: updateBooking,
            children: "Update Booking"
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
          children: "Are you sure you want to delete this booking? This action cannot be undone."
        }), /*#__PURE__*/_jsxs(DialogFooter, {
          children: [/*#__PURE__*/_jsx(Button, {
            variant: "outline",
            onClick: () => setIsDeleteDialogOpen(false),
            children: "Cancel"
          }), /*#__PURE__*/_jsx(Button, {
            variant: "destructive",
            onClick: deleteBooking,
            children: "Delete"
          })]
        })]
      })
    })]
  });
};

// Bookings Table Component

const BookingsTable = ({
  bookings,
  isLoading,
  onView,
  onEdit,
  onDelete,
  getStatusBadgeColor,
  getPaymentBadgeColor
}) => {
  if (isLoading) {
    return /*#__PURE__*/_jsx("div", {
      className: "flex justify-center items-center py-16",
      children: /*#__PURE__*/_jsx(Loader2, {
        className: "h-8 w-8 animate-spin text-gray-400"
      })
    });
  }
  if (bookings.length === 0) {
    return /*#__PURE__*/_jsxs("div", {
      className: "text-center py-16",
      children: [/*#__PURE__*/_jsx(Calendar, {
        className: "h-12 w-12 mx-auto text-gray-300 mb-4"
      }), /*#__PURE__*/_jsx("h3", {
        className: "text-lg font-medium text-gray-900 mb-1",
        children: "No bookings found"
      }), /*#__PURE__*/_jsx("p", {
        className: "text-gray-500",
        children: "There are no bookings matching your filters."
      })]
    });
  }
  return /*#__PURE__*/_jsx("div", {
    className: "rounded-md border",
    children: /*#__PURE__*/_jsxs(Table, {
      children: [/*#__PURE__*/_jsx(TableHeader, {
        children: /*#__PURE__*/_jsxs(TableRow, {
          children: [/*#__PURE__*/_jsx(TableHead, {
            children: "ID"
          }), /*#__PURE__*/_jsx(TableHead, {
            children: "Trek"
          }), /*#__PURE__*/_jsx(TableHead, {
            children: "Customer"
          }), /*#__PURE__*/_jsx(TableHead, {
            children: "Trek Date"
          }), /*#__PURE__*/_jsx(TableHead, {
            children: "Participants"
          }), /*#__PURE__*/_jsx(TableHead, {
            children: "Amount"
          }), /*#__PURE__*/_jsx(TableHead, {
            children: "Status"
          }), /*#__PURE__*/_jsx(TableHead, {
            children: "Payment"
          }), /*#__PURE__*/_jsx(TableHead, {
            className: "text-right",
            children: "Actions"
          })]
        })
      }), /*#__PURE__*/_jsx(TableBody, {
        children: bookings.map(booking => /*#__PURE__*/_jsxs(TableRow, {
          children: [/*#__PURE__*/_jsxs(TableCell, {
            children: ["#", booking.id]
          }), /*#__PURE__*/_jsx(TableCell, {
            className: "font-medium",
            children: booking.trekName
          }), /*#__PURE__*/_jsx(TableCell, {
            children: booking.customerName
          }), /*#__PURE__*/_jsx(TableCell, {
            children: format(new Date(booking.trekDate), 'MMM d, yyyy')
          }), /*#__PURE__*/_jsx(TableCell, {
            children: booking.participants
          }), /*#__PURE__*/_jsxs(TableCell, {
            children: ["\u20B9", booking.totalAmount]
          }), /*#__PURE__*/_jsx(TableCell, {
            children: /*#__PURE__*/_jsx(Badge, {
              className: getStatusBadgeColor(booking.status),
              children: booking.status.charAt(0).toUpperCase() + booking.status.slice(1)
            })
          }), /*#__PURE__*/_jsx(TableCell, {
            children: /*#__PURE__*/_jsx(Badge, {
              className: getPaymentBadgeColor(booking.paymentStatus),
              children: booking.paymentStatus.charAt(0).toUpperCase() + booking.paymentStatus.slice(1)
            })
          }), /*#__PURE__*/_jsx(TableCell, {
            className: "text-right",
            children: /*#__PURE__*/_jsxs("div", {
              className: "flex justify-end space-x-2",
              children: [/*#__PURE__*/_jsx(Button, {
                variant: "ghost",
                size: "icon",
                onClick: () => onView(booking),
                children: /*#__PURE__*/_jsx(Eye, {
                  className: "h-4 w-4"
                })
              }), /*#__PURE__*/_jsx(Button, {
                variant: "ghost",
                size: "icon",
                onClick: () => onEdit(booking),
                children: /*#__PURE__*/_jsx(Edit, {
                  className: "h-4 w-4"
                })
              }), /*#__PURE__*/_jsx(Button, {
                variant: "ghost",
                size: "icon",
                className: "text-red-500",
                onClick: () => onDelete(booking),
                children: /*#__PURE__*/_jsx(Trash2, {
                  className: "h-4 w-4"
                })
              })]
            })
          })]
        }, booking.id))
      })]
    })
  });
};
export default Bookings;