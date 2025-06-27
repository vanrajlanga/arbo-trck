import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DatePicker } from "@/components/ui/date-picker";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const BookingForm = ({
  onSubmit,
  isOpen,
  onClose
}) => {
  const [treks, setTreks] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState({
    trekId: "",
    trekName: "",
    pickupPointId: "",
    pickupPointDetails: "",
    customerId: "",
    customerName: "",
    date: "",
    numberOfParticipants: 1,
    bookingStatus: "confirmed",
    paymentStatus: "paid",
    amount: 0
  });
  const [selectedTrek, setSelectedTrek] = useState(null);

  // Fetch treks and customers
  useEffect(() => {
    const fetchData = () => {
      try {
        // Load treks from localStorage
        const treksJson = localStorage.getItem('vendorTreks');
        if (treksJson) {
          const parsedTreks = JSON.parse(treksJson);
          const formattedTreks = parsedTreks.map(trek => ({
            id: trek.id?.toString() || `TRK-${Math.floor(100000 + Math.random() * 900000)}`,
            serviceId: trek.serviceId || `TSRV-${Math.floor(100000 + Math.random() * 900000)}`,
            name: trek.name,
            destination: trek.destination,
            // Handle both old treks without pickup points and new treks with pickup points
            pickupPoints: trek.pickupPoints || [],
            price: trek.price
          }));
          setTreks(formattedTreks);
        } else {
          // Demo data if no treks in localStorage
          setTreks([{
            id: "TRK-123456",
            serviceId: "TSRV-654321",
            name: "Himalayan Adventure",
            destination: "Manali",
            pickupPoints: [{
              id: "pickup-1",
              cityId: "1",
              cityName: "Hyderabad",
              locationDetails: "Madhapur Metro Station"
            }, {
              id: "pickup-2",
              cityId: "2",
              cityName: "Warangal",
              locationDetails: "Railway Station"
            }],
            price: 5000
          }, {
            id: "TRK-234567",
            serviceId: "TSRV-765432",
            name: "Beach Paradise",
            destination: "Goa",
            pickupPoints: [{
              id: "pickup-3",
              cityId: "4",
              cityName: "Vijayawada",
              locationDetails: "Railway Station"
            }, {
              id: "pickup-4",
              cityId: "7",
              cityName: "Chennai",
              locationDetails: "Central Station"
            }],
            price: 4000
          }]);
        }

        // Load customers from localStorage
        const customersJson = localStorage.getItem('vendorCustomers');
        if (customersJson) {
          setCustomers(JSON.parse(customersJson));
        } else {
          // Demo customers if none exist
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
          }, {
            id: 3,
            name: "Mike Johnson",
            email: "mike@example.com",
            phone: "9876543212"
          }];
          setCustomers(sampleCustomers);
          localStorage.setItem('vendorCustomers', JSON.stringify(sampleCustomers));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load data");
      } finally {
        setLoading(false);
      }
    };
    if (isOpen) {
      fetchData();
    }
  }, [isOpen]);

  // Reset form when dialog closes
  useEffect(() => {
    if (!isOpen) {
      setBooking({
        trekId: "",
        trekName: "",
        pickupPointId: "",
        pickupPointDetails: "",
        customerId: "",
        customerName: "",
        date: "",
        numberOfParticipants: 1,
        bookingStatus: "confirmed",
        paymentStatus: "paid",
        amount: 0
      });
      setSelectedTrek(null);
    }
  }, [isOpen]);

  // Handle trek selection
  const handleTrekChange = trekId => {
    const trek = treks.find(t => t.id.toString() === trekId);
    if (trek) {
      setSelectedTrek(trek);
      setBooking(prev => ({
        ...prev,
        trekId: trek.id.toString(),
        trekName: trek.name,
        pickupPointId: "",
        // Reset pickup point when trek changes
        pickupPointDetails: "",
        amount: Number(trek.price)
      }));
    }
  };

  // Handle pickup point selection
  const handlePickupPointChange = pickupPointId => {
    if (selectedTrek && selectedTrek.pickupPoints && selectedTrek.pickupPoints.length > 0) {
      const pickupPoint = selectedTrek.pickupPoints.find(p => p.id === pickupPointId);
      if (pickupPoint) {
        setBooking(prev => ({
          ...prev,
          pickupPointId: pickupPointId,
          pickupPointDetails: `${pickupPoint.cityName} - ${pickupPoint.locationDetails}`
        }));
      }
    } else {
      // For old treks without pickup points, allow manual entry
      setBooking(prev => ({
        ...prev,
        pickupPointId: "manual",
        pickupPointDetails: "Manual pickup arrangement"
      }));
    }
  };

  // Handle customer selection
  const handleCustomerChange = customerId => {
    const customer = customers.find(c => c.id.toString() === customerId);
    if (customer) {
      setBooking(prev => ({
        ...prev,
        customerId: customerId,
        customerName: customer.name
      }));
    }
  };

  // Handle date change
  const handleDateChange = date => {
    if (date) {
      setBooking(prev => ({
        ...prev,
        date: date.toISOString().split('T')[0]
      }));
    }
  };

  // Handle number of participants change
  const handleParticipantsChange = e => {
    const participants = parseInt(e.target.value) || 1;
    setBooking(prev => ({
      ...prev,
      numberOfParticipants: participants,
      amount: selectedTrek ? Number(selectedTrek.price) * participants : 0
    }));
  };

  // Handle form submission
  const handleSubmit = e => {
    e.preventDefault();
    if (!booking.trekId) {
      toast.error("Please select a trek");
      return;
    }

    // For treks with pickup points, require selection
    if (selectedTrek && selectedTrek.pickupPoints && selectedTrek.pickupPoints.length > 0 && !booking.pickupPointId) {
      toast.error("Please select a pickup point");
      return;
    }
    if (!booking.customerId) {
      toast.error("Please select a customer");
      return;
    }
    if (!booking.date) {
      toast.error("Please select a date");
      return;
    }

    // For old treks without pickup points, set default pickup details
    let finalBooking = {
      ...booking
    };
    if (!selectedTrek?.pickupPoints || selectedTrek.pickupPoints.length === 0) {
      finalBooking.pickupPointId = "legacy";
      finalBooking.pickupPointDetails = "Legacy trek - pickup details to be arranged";
    }

    // Generate a unique booking ID
    const bookingData = {
      ...finalBooking,
      id: `BK-${Math.floor(100000 + Math.random() * 900000)}`,
      createdAt: new Date().toISOString()
    };
    onSubmit(bookingData);
    onClose();
  };
  return /*#__PURE__*/_jsx(Dialog, {
    open: isOpen,
    onOpenChange: onClose,
    children: /*#__PURE__*/_jsxs(DialogContent, {
      className: "sm:max-w-[600px] max-h-[90vh] overflow-y-auto",
      children: [/*#__PURE__*/_jsxs(DialogHeader, {
        children: [/*#__PURE__*/_jsx(DialogTitle, {
          children: "Create New Booking"
        }), /*#__PURE__*/_jsx(DialogDescription, {
          children: "Enter the details to create a new booking for a customer."
        })]
      }), /*#__PURE__*/_jsxs("form", {
        onSubmit: handleSubmit,
        children: [/*#__PURE__*/_jsxs("div", {
          className: "grid gap-4 py-4",
          children: [/*#__PURE__*/_jsxs("div", {
            className: "grid grid-cols-1 gap-2",
            children: [/*#__PURE__*/_jsx(Label, {
              htmlFor: "trek",
              children: "Select Trek *"
            }), /*#__PURE__*/_jsxs(Select, {
              value: booking.trekId,
              onValueChange: handleTrekChange,
              children: [/*#__PURE__*/_jsx(SelectTrigger, {
                id: "trek",
                children: /*#__PURE__*/_jsx(SelectValue, {
                  placeholder: "Select trek"
                })
              }), /*#__PURE__*/_jsx(SelectContent, {
                children: treks.map(trek => /*#__PURE__*/_jsxs(SelectItem, {
                  value: trek.id.toString(),
                  children: [trek.name, " - ", trek.destination]
                }, trek.id))
              })]
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "grid grid-cols-1 gap-2",
            children: [/*#__PURE__*/_jsxs(Label, {
              htmlFor: "pickupPoint",
              children: ["Pickup Point ", selectedTrek && selectedTrek.pickupPoints && selectedTrek.pickupPoints.length > 0 ? "*" : "(Optional)"]
            }), selectedTrek && selectedTrek.pickupPoints && selectedTrek.pickupPoints.length > 0 ? /*#__PURE__*/_jsxs(Select, {
              value: booking.pickupPointId,
              onValueChange: handlePickupPointChange,
              disabled: !selectedTrek,
              children: [/*#__PURE__*/_jsx(SelectTrigger, {
                id: "pickupPoint",
                children: /*#__PURE__*/_jsx(SelectValue, {
                  placeholder: "Select pickup point"
                })
              }), /*#__PURE__*/_jsx(SelectContent, {
                children: selectedTrek.pickupPoints.map(point => /*#__PURE__*/_jsxs(SelectItem, {
                  value: point.id,
                  children: [point.cityName, " - ", point.locationDetails]
                }, point.id))
              })]
            }) : /*#__PURE__*/_jsx("div", {
              className: "text-sm text-gray-500 p-3 border rounded",
              children: selectedTrek ? "This trek doesn't have predefined pickup points. Pickup details will be arranged manually." : "Select a trek first"
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "grid grid-cols-1 gap-2",
            children: [/*#__PURE__*/_jsx(Label, {
              htmlFor: "customer",
              children: "Select Customer *"
            }), /*#__PURE__*/_jsxs(Select, {
              value: booking.customerId,
              onValueChange: handleCustomerChange,
              children: [/*#__PURE__*/_jsx(SelectTrigger, {
                id: "customer",
                children: /*#__PURE__*/_jsx(SelectValue, {
                  placeholder: "Select customer"
                })
              }), /*#__PURE__*/_jsx(SelectContent, {
                children: customers.map(customer => /*#__PURE__*/_jsxs(SelectItem, {
                  value: customer.id.toString(),
                  children: [customer.name, " - ", customer.phone]
                }, customer.id))
              })]
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "grid grid-cols-1 gap-2",
            children: [/*#__PURE__*/_jsx(Label, {
              htmlFor: "date",
              children: "Trek Date *"
            }), /*#__PURE__*/_jsx(DatePicker, {
              date: booking.date ? new Date(booking.date) : undefined,
              setDate: handleDateChange
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "grid grid-cols-1 gap-2",
            children: [/*#__PURE__*/_jsx(Label, {
              htmlFor: "participants",
              children: "Number of Participants *"
            }), /*#__PURE__*/_jsx(Input, {
              id: "participants",
              type: "number",
              min: "1",
              value: booking.numberOfParticipants,
              onChange: handleParticipantsChange
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "grid grid-cols-1 gap-2",
            children: [/*#__PURE__*/_jsx(Label, {
              htmlFor: "bookingStatus",
              children: "Booking Status"
            }), /*#__PURE__*/_jsxs(Select, {
              value: booking.bookingStatus,
              onValueChange: value => setBooking({
                ...booking,
                bookingStatus: value
              }),
              children: [/*#__PURE__*/_jsx(SelectTrigger, {
                id: "bookingStatus",
                children: /*#__PURE__*/_jsx(SelectValue, {})
              }), /*#__PURE__*/_jsxs(SelectContent, {
                children: [/*#__PURE__*/_jsx(SelectItem, {
                  value: "pending",
                  children: "Pending"
                }), /*#__PURE__*/_jsx(SelectItem, {
                  value: "confirmed",
                  children: "Confirmed"
                }), /*#__PURE__*/_jsx(SelectItem, {
                  value: "cancelled",
                  children: "Cancelled"
                })]
              })]
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "grid grid-cols-1 gap-2",
            children: [/*#__PURE__*/_jsx(Label, {
              htmlFor: "paymentStatus",
              children: "Payment Status"
            }), /*#__PURE__*/_jsxs(Select, {
              value: booking.paymentStatus,
              onValueChange: value => setBooking({
                ...booking,
                paymentStatus: value
              }),
              children: [/*#__PURE__*/_jsx(SelectTrigger, {
                id: "paymentStatus",
                children: /*#__PURE__*/_jsx(SelectValue, {})
              }), /*#__PURE__*/_jsxs(SelectContent, {
                children: [/*#__PURE__*/_jsx(SelectItem, {
                  value: "paid",
                  children: "Paid"
                }), /*#__PURE__*/_jsx(SelectItem, {
                  value: "onsite",
                  children: "Pay Onsite"
                })]
              })]
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "grid grid-cols-1 gap-2",
            children: [/*#__PURE__*/_jsx(Label, {
              htmlFor: "amount",
              children: "Total Amount"
            }), /*#__PURE__*/_jsx(Input, {
              id: "amount",
              type: "number",
              value: booking.amount,
              onChange: e => setBooking({
                ...booking,
                amount: Number(e.target.value)
              }),
              className: "font-medium text-lg"
            }), /*#__PURE__*/_jsx("p", {
              className: "text-xs text-gray-500",
              children: "Auto-calculated based on trek price and number of participants"
            })]
          }), selectedTrek && booking.customerId && /*#__PURE__*/_jsxs("div", {
            className: "grid grid-cols-1 gap-2",
            children: [/*#__PURE__*/_jsx(Label, {
              children: "Booking Summary"
            }), /*#__PURE__*/_jsx(Card, {
              children: /*#__PURE__*/_jsx(CardContent, {
                className: "p-4",
                children: /*#__PURE__*/_jsxs("div", {
                  className: "space-y-2 text-sm",
                  children: [/*#__PURE__*/_jsxs("p", {
                    children: [/*#__PURE__*/_jsx("span", {
                      className: "font-medium",
                      children: "Trek:"
                    }), " ", selectedTrek.name]
                  }), /*#__PURE__*/_jsxs("p", {
                    children: [/*#__PURE__*/_jsx("span", {
                      className: "font-medium",
                      children: "Destination:"
                    }), " ", selectedTrek.destination]
                  }), booking.pickupPointDetails && /*#__PURE__*/_jsxs("p", {
                    children: [/*#__PURE__*/_jsx("span", {
                      className: "font-medium",
                      children: "Pickup:"
                    }), " ", booking.pickupPointDetails]
                  }), /*#__PURE__*/_jsxs("p", {
                    children: [/*#__PURE__*/_jsx("span", {
                      className: "font-medium",
                      children: "Customer:"
                    }), " ", booking.customerName]
                  }), /*#__PURE__*/_jsxs("p", {
                    children: [/*#__PURE__*/_jsx("span", {
                      className: "font-medium",
                      children: "Total Amount:"
                    }), " \u20B9", booking.amount]
                  })]
                })
              })
            })]
          })]
        }), /*#__PURE__*/_jsxs(DialogFooter, {
          children: [/*#__PURE__*/_jsx(Button, {
            type: "button",
            variant: "outline",
            onClick: onClose,
            children: "Cancel"
          }), /*#__PURE__*/_jsx(Button, {
            type: "submit",
            disabled: loading,
            children: "Create Booking"
          })]
        })]
      })]
    })
  });
};
export default BookingForm;