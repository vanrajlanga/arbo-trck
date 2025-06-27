import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
const WithdrawalRequest = ({
  bookings,
  onRequestWithdrawal
}) => {
  const [selectedBookings, setSelectedBookings] = useState([]);
  const [notes, setNotes] = useState('');
  const paidBookings = bookings.filter(booking => booking.paymentStatus === 'paid');
  const toggleBookingSelection = bookingId => {
    if (selectedBookings.includes(bookingId)) {
      setSelectedBookings(selectedBookings.filter(id => id !== bookingId));
    } else {
      setSelectedBookings([...selectedBookings, bookingId]);
    }
  };
  const calculateTotalAmount = () => {
    return paidBookings.filter(booking => selectedBookings.includes(booking.id)).reduce((total, booking) => total + booking.amount, 0);
  };
  const handleSubmitRequest = () => {
    if (selectedBookings.length === 0) {
      toast.error("Please select at least one booking for withdrawal");
      return;
    }
    const withdrawalData = {
      id: `W-${Math.floor(100000 + Math.random() * 900000)}`,
      bookingIds: selectedBookings,
      amount: calculateTotalAmount(),
      fees: calculateTotalAmount() * 0.05,
      // 5% fees, this would be configured by admin in a real app
      netAmount: calculateTotalAmount() * 0.95,
      // Net amount after fees
      status: 'pending',
      notes: notes,
      requestDate: new Date().toISOString(),
      selectedBookings: paidBookings.filter(booking => selectedBookings.includes(booking.id))
    };
    onRequestWithdrawal(withdrawalData);
    setSelectedBookings([]);
    setNotes('');
    toast.success("Withdrawal request submitted successfully");
  };
  return /*#__PURE__*/_jsxs(Card, {
    className: "mb-6",
    children: [/*#__PURE__*/_jsxs(CardHeader, {
      children: [/*#__PURE__*/_jsx(CardTitle, {
        children: "Request Withdrawal"
      }), /*#__PURE__*/_jsx(CardDescription, {
        children: "Select bookings with \"Paid\" payment status to request a withdrawal"
      })]
    }), /*#__PURE__*/_jsx(CardContent, {
      children: paidBookings.length === 0 ? /*#__PURE__*/_jsx("div", {
        className: "text-center py-8",
        children: /*#__PURE__*/_jsx("p", {
          className: "text-gray-500",
          children: "No paid bookings available for withdrawal."
        })
      }) : /*#__PURE__*/_jsx(_Fragment, {
        children: /*#__PURE__*/_jsxs("div", {
          className: "space-y-4",
          children: [/*#__PURE__*/_jsx("div", {
            className: "text-sm font-medium",
            children: "Eligible Bookings"
          }), /*#__PURE__*/_jsx("div", {
            className: "grid gap-2",
            children: paidBookings.map(booking => /*#__PURE__*/_jsxs("div", {
              className: `border p-3 rounded-md flex items-center justify-between cursor-pointer ${selectedBookings.includes(booking.id) ? 'bg-blue-50 border-blue-300' : ''}`,
              onClick: () => toggleBookingSelection(booking.id),
              children: [/*#__PURE__*/_jsxs("div", {
                children: [/*#__PURE__*/_jsx("div", {
                  className: "font-medium",
                  children: booking.trekName
                }), /*#__PURE__*/_jsxs("div", {
                  className: "text-sm text-gray-500",
                  children: [booking.customerName, " \u2022 ", new Date(booking.date).toLocaleDateString()]
                })]
              }), /*#__PURE__*/_jsxs("div", {
                className: "flex items-center gap-3",
                children: [/*#__PURE__*/_jsx(Badge, {
                  variant: "outline",
                  className: "bg-green-50 text-green-700 border-green-300",
                  children: "Paid"
                }), /*#__PURE__*/_jsxs("span", {
                  className: "font-medium",
                  children: ["\u20B9", booking.amount]
                }), /*#__PURE__*/_jsx("input", {
                  type: "checkbox",
                  checked: selectedBookings.includes(booking.id),
                  onChange: () => {},
                  className: "h-5 w-5 rounded border-gray-300"
                })]
              })]
            }, booking.id))
          }), selectedBookings.length > 0 && /*#__PURE__*/_jsxs("div", {
            className: "mt-6 space-y-4",
            children: [/*#__PURE__*/_jsx("div", {
              className: "text-sm font-medium",
              children: "Additional Notes"
            }), /*#__PURE__*/_jsx(Textarea, {
              placeholder: "Add any notes or comments for the admin (optional)",
              value: notes,
              onChange: e => setNotes(e.target.value)
            }), /*#__PURE__*/_jsxs("div", {
              className: "bg-gray-50 p-4 rounded-md mt-4",
              children: [/*#__PURE__*/_jsxs("div", {
                className: "flex justify-between text-sm",
                children: [/*#__PURE__*/_jsx("span", {
                  children: "Selected Bookings:"
                }), /*#__PURE__*/_jsx("span", {
                  children: selectedBookings.length
                })]
              }), /*#__PURE__*/_jsxs("div", {
                className: "flex justify-between text-sm",
                children: [/*#__PURE__*/_jsx("span", {
                  children: "Total Amount:"
                }), /*#__PURE__*/_jsxs("span", {
                  children: ["\u20B9", calculateTotalAmount()]
                })]
              }), /*#__PURE__*/_jsxs("div", {
                className: "flex justify-between text-sm",
                children: [/*#__PURE__*/_jsx("span", {
                  children: "Platform Fee (5%):"
                }), /*#__PURE__*/_jsxs("span", {
                  children: ["\u20B9", (calculateTotalAmount() * 0.05).toFixed(2)]
                })]
              }), /*#__PURE__*/_jsxs("div", {
                className: "flex justify-between font-medium mt-2 pt-2 border-t",
                children: [/*#__PURE__*/_jsx("span", {
                  children: "Net Withdrawal Amount:"
                }), /*#__PURE__*/_jsxs("span", {
                  children: ["\u20B9", (calculateTotalAmount() * 0.95).toFixed(2)]
                })]
              })]
            })]
          })]
        })
      })
    }), /*#__PURE__*/_jsx(CardFooter, {
      className: "justify-end",
      children: /*#__PURE__*/_jsx(Button, {
        onClick: handleSubmitRequest,
        disabled: selectedBookings.length === 0,
        children: "Submit Withdrawal Request"
      })
    })]
  });
};
export default WithdrawalRequest;