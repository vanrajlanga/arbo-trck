import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WithdrawalRequest from "@/components/withdrawals/WithdrawalRequest";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const Withdrawals = () => {
  const [bookings, setBookings] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);
  const [activeTab, setActiveTab] = useState("pending");

  // Load bookings and withdrawals from localStorage
  useEffect(() => {
    const fetchData = () => {
      // Load bookings
      const bookingsJson = localStorage.getItem('vendorBookings');
      if (bookingsJson) {
        setBookings(JSON.parse(bookingsJson));
      } else {
        // Demo data
        setBookings([{
          id: "BK-123456",
          trekId: "TRK-123456",
          trekName: "Himalayan Adventure",
          customerName: "John Doe",
          date: "2025-06-15",
          paymentStatus: "paid",
          amount: 5000
        }, {
          id: "BK-234567",
          trekId: "TRK-123456",
          trekName: "Himalayan Adventure",
          customerName: "Jane Smith",
          date: "2025-06-15",
          paymentStatus: "paid",
          amount: 5000
        }, {
          id: "BK-345678",
          trekId: "TRK-234567",
          trekName: "Beach Paradise",
          customerName: "Alice Johnson",
          date: "2025-06-20",
          paymentStatus: "onsite",
          amount: 4000
        }]);
      }

      // Load withdrawals
      const withdrawalsJson = localStorage.getItem('vendorWithdrawals');
      if (withdrawalsJson) {
        setWithdrawals(JSON.parse(withdrawalsJson));
      } else {
        // Demo data
        setWithdrawals([{
          id: "W-123456",
          bookingIds: ["BK-111111", "BK-222222"],
          amount: 10000,
          fees: 500,
          netAmount: 9500,
          status: "completed",
          requestDate: "2025-05-10T10:30:00Z",
          processedDate: "2025-05-12T14:25:00Z",
          transactionDetails: "NEFT Transfer to XXXX1234",
          selectedBookings: [{
            id: "BK-111111",
            trekId: "TRK-111111",
            trekName: "Historical Tour",
            customerName: "Robert Brown",
            date: "2025-05-05",
            paymentStatus: "paid",
            amount: 6000
          }, {
            id: "BK-222222",
            trekId: "TRK-111111",
            trekName: "Historical Tour",
            customerName: "Susan White",
            date: "2025-05-05",
            paymentStatus: "paid",
            amount: 4000
          }]
        }, {
          id: "W-234567",
          bookingIds: ["BK-333333"],
          amount: 5000,
          fees: 250,
          netAmount: 4750,
          status: "pending",
          requestDate: "2025-05-15T09:15:00Z",
          selectedBookings: [{
            id: "BK-333333",
            trekId: "TRK-222222",
            trekName: "Mountain Trek",
            customerName: "Emily Davis",
            date: "2025-05-10",
            paymentStatus: "paid",
            amount: 5000
          }]
        }]);
      }
    };
    fetchData();
  }, []);
  const handleWithdrawalRequest = withdrawalData => {
    const updatedWithdrawals = [...withdrawals, withdrawalData];
    setWithdrawals(updatedWithdrawals);

    // Save to localStorage
    localStorage.setItem('vendorWithdrawals', JSON.stringify(updatedWithdrawals));
  };
  const getStatusBadgeVariant = status => {
    switch (status) {
      case 'pending':
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case 'approved':
        return "bg-blue-100 text-blue-800 border-blue-300";
      case 'completed':
        return "bg-green-100 text-green-800 border-green-300";
      case 'rejected':
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "";
    }
  };

  // Filter withdrawals based on active tab
  const filteredWithdrawals = activeTab === 'all' ? withdrawals : withdrawals.filter(w => w.status === activeTab);
  return /*#__PURE__*/_jsxs("div", {
    className: "space-y-6",
    children: [/*#__PURE__*/_jsx("div", {
      className: "flex justify-between items-center",
      children: /*#__PURE__*/_jsx("h1", {
        className: "text-3xl font-bold",
        children: "Withdrawals"
      })
    }), /*#__PURE__*/_jsx(WithdrawalRequest, {
      bookings: bookings,
      onRequestWithdrawal: handleWithdrawalRequest
    }), /*#__PURE__*/_jsxs(Tabs, {
      defaultValue: "pending",
      value: activeTab,
      onValueChange: setActiveTab,
      children: [/*#__PURE__*/_jsxs(TabsList, {
        className: "mb-4",
        children: [/*#__PURE__*/_jsx(TabsTrigger, {
          value: "pending",
          children: "Pending"
        }), /*#__PURE__*/_jsx(TabsTrigger, {
          value: "approved",
          children: "Approved"
        }), /*#__PURE__*/_jsx(TabsTrigger, {
          value: "completed",
          children: "Completed"
        }), /*#__PURE__*/_jsx(TabsTrigger, {
          value: "rejected",
          children: "Rejected"
        }), /*#__PURE__*/_jsx(TabsTrigger, {
          value: "all",
          children: "All Requests"
        })]
      }), /*#__PURE__*/_jsx(TabsContent, {
        value: activeTab,
        children: /*#__PURE__*/_jsxs(Card, {
          children: [/*#__PURE__*/_jsx(CardHeader, {
            children: /*#__PURE__*/_jsx(CardTitle, {
              children: "Withdrawal Requests"
            })
          }), /*#__PURE__*/_jsx(CardContent, {
            children: filteredWithdrawals.length === 0 ? /*#__PURE__*/_jsx("div", {
              className: "text-center py-8",
              children: /*#__PURE__*/_jsxs("p", {
                className: "text-gray-500",
                children: ["No ", activeTab === 'all' ? '' : activeTab, " withdrawal requests found."]
              })
            }) : /*#__PURE__*/_jsx("div", {
              className: "space-y-4",
              children: filteredWithdrawals.map(withdrawal => /*#__PURE__*/_jsxs("div", {
                className: "border rounded-lg p-4",
                children: [/*#__PURE__*/_jsxs("div", {
                  className: "flex justify-between items-start mb-4",
                  children: [/*#__PURE__*/_jsxs("div", {
                    children: [/*#__PURE__*/_jsxs("div", {
                      className: "flex items-center gap-2",
                      children: [/*#__PURE__*/_jsx("h3", {
                        className: "font-semibold",
                        children: withdrawal.id
                      }), /*#__PURE__*/_jsx(Badge, {
                        variant: "outline",
                        className: getStatusBadgeVariant(withdrawal.status),
                        children: withdrawal.status.charAt(0).toUpperCase() + withdrawal.status.slice(1)
                      })]
                    }), /*#__PURE__*/_jsxs("p", {
                      className: "text-sm text-gray-500",
                      children: ["Requested on ", new Date(withdrawal.requestDate).toLocaleDateString(), " \u2022 ", withdrawal.selectedBookings.length, " bookings"]
                    })]
                  }), /*#__PURE__*/_jsxs("div", {
                    className: "text-right",
                    children: [/*#__PURE__*/_jsxs("div", {
                      className: "text-lg font-semibold",
                      children: ["\u20B9", withdrawal.netAmount.toFixed(2)]
                    }), /*#__PURE__*/_jsxs("div", {
                      className: "text-xs text-gray-500",
                      children: ["Total: \u20B9", withdrawal.amount.toFixed(2), " \u2022 Fee: \u20B9", withdrawal.fees.toFixed(2)]
                    })]
                  })]
                }), /*#__PURE__*/_jsxs("div", {
                  className: "space-y-2",
                  children: [/*#__PURE__*/_jsx("div", {
                    className: "text-sm font-medium",
                    children: "Bookings Included:"
                  }), /*#__PURE__*/_jsx("div", {
                    className: "grid gap-2 mt-1",
                    children: withdrawal.selectedBookings.map(booking => /*#__PURE__*/_jsxs("div", {
                      className: "bg-gray-50 p-2 rounded-md flex justify-between items-center text-sm",
                      children: [/*#__PURE__*/_jsxs("div", {
                        children: [/*#__PURE__*/_jsx("div", {
                          className: "font-medium",
                          children: booking.trekName
                        }), /*#__PURE__*/_jsxs("div", {
                          className: "text-gray-500",
                          children: [booking.customerName, " \u2022 ", new Date(booking.date).toLocaleDateString()]
                        })]
                      }), /*#__PURE__*/_jsxs("span", {
                        className: "font-medium",
                        children: ["\u20B9", booking.amount]
                      })]
                    }, booking.id))
                  })]
                }), withdrawal.notes && /*#__PURE__*/_jsxs("div", {
                  className: "mt-3 pt-3 border-t text-sm",
                  children: [/*#__PURE__*/_jsx("div", {
                    className: "font-medium",
                    children: "Notes:"
                  }), /*#__PURE__*/_jsx("p", {
                    className: "text-gray-600",
                    children: withdrawal.notes
                  })]
                }), withdrawal.status === 'completed' && withdrawal.transactionDetails && /*#__PURE__*/_jsxs("div", {
                  className: "mt-3 pt-3 border-t text-sm",
                  children: [/*#__PURE__*/_jsx("div", {
                    className: "font-medium",
                    children: "Transaction Details:"
                  }), /*#__PURE__*/_jsx("p", {
                    className: "text-gray-600",
                    children: withdrawal.transactionDetails
                  }), /*#__PURE__*/_jsxs("p", {
                    className: "text-gray-500",
                    children: ["Processed on ", withdrawal.processedDate ? new Date(withdrawal.processedDate).toLocaleDateString() : 'N/A']
                  })]
                })]
              }, withdrawal.id))
            })
          })]
        })
      })]
    })]
  });
};
export default Withdrawals;