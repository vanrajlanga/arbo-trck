import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WithdrawalRequest from "@/components/withdrawals/WithdrawalRequest";

const Withdrawals = () => {
    const [bookings, setBookings] = useState([]);
    const [withdrawals, setWithdrawals] = useState([]);
    const [activeTab, setActiveTab] = useState("pending");

    // Load bookings and withdrawals from localStorage
    useEffect(() => {
        const fetchData = () => {
            // Load bookings
            const bookingsJson = localStorage.getItem("vendorBookings");
            if (bookingsJson) {
                setBookings(JSON.parse(bookingsJson));
            } else {
                // Demo data
                setBookings([
                    {
                        id: "BK-123456",
                        trekId: "TRK-123456",
                        trekName: "Himalayan Adventure",
                        customerName: "John Doe",
                        date: "2025-06-15",
                        paymentStatus: "paid",
                        amount: 5000,
                    },
                    {
                        id: "BK-234567",
                        trekId: "TRK-123456",
                        trekName: "Himalayan Adventure",
                        customerName: "Jane Smith",
                        date: "2025-06-15",
                        paymentStatus: "paid",
                        amount: 5000,
                    },
                    {
                        id: "BK-345678",
                        trekId: "TRK-234567",
                        trekName: "Beach Paradise",
                        customerName: "Alice Johnson",
                        date: "2025-06-20",
                        paymentStatus: "onsite",
                        amount: 4000,
                    },
                ]);
            }

            // Load withdrawals
            const withdrawalsJson = localStorage.getItem("vendorWithdrawals");
            if (withdrawalsJson) {
                setWithdrawals(JSON.parse(withdrawalsJson));
            } else {
                // Demo data
                setWithdrawals([
                    {
                        id: "W-123456",
                        bookingIds: ["BK-111111", "BK-222222"],
                        amount: 10000,
                        fees: 500,
                        netAmount: 9500,
                        status: "completed",
                        requestDate: "2025-05-10T10:30:00Z",
                        processedDate: "2025-05-12T14:25:00Z",
                        transactionDetails: "NEFT Transfer to XXXX1234",
                        selectedBookings: [
                            {
                                id: "BK-111111",
                                trekId: "TRK-111111",
                                trekName: "Historical Tour",
                                customerName: "Robert Brown",
                                date: "2025-05-05",
                                paymentStatus: "paid",
                                amount: 6000,
                            },
                            {
                                id: "BK-222222",
                                trekId: "TRK-111111",
                                trekName: "Historical Tour",
                                customerName: "Susan White",
                                date: "2025-05-05",
                                paymentStatus: "paid",
                                amount: 4000,
                            },
                        ],
                    },
                    {
                        id: "W-234567",
                        bookingIds: ["BK-333333"],
                        amount: 5000,
                        fees: 250,
                        netAmount: 4750,
                        status: "pending",
                        requestDate: "2025-05-15T09:15:00Z",
                        selectedBookings: [
                            {
                                id: "BK-333333",
                                trekId: "TRK-222222",
                                trekName: "Mountain Trek",
                                customerName: "Emily Davis",
                                date: "2025-05-10",
                                paymentStatus: "paid",
                                amount: 5000,
                            },
                        ],
                    },
                ]);
            }
        };

        fetchData();
    }, []);

    const handleWithdrawalRequest = (withdrawalData) => {
        const updatedWithdrawals = [...withdrawals, withdrawalData];
        setWithdrawals(updatedWithdrawals);

        // Save to localStorage
        localStorage.setItem(
            "vendorWithdrawals",
            JSON.stringify(updatedWithdrawals)
        );
    };

    const getStatusBadgeVariant = (status) => {
        switch (status) {
            case "pending":
                return "bg-yellow-100 text-yellow-800 border-yellow-300";
            case "approved":
                return "bg-blue-100 text-blue-800 border-blue-300";
            case "completed":
                return "bg-green-100 text-green-800 border-green-300";
            case "rejected":
                return "bg-red-100 text-red-800 border-red-300";
            default:
                return "";
        }
    };

    // Filter withdrawals based on active tab
    const filteredWithdrawals =
        activeTab === "all"
            ? withdrawals
            : withdrawals.filter((w) => w.status === activeTab);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Withdrawals</h1>
            </div>

            <WithdrawalRequest
                bookings={bookings}
                onRequestWithdrawal={handleWithdrawalRequest}
            />

            <Tabs
                defaultValue="pending"
                value={activeTab}
                onValueChange={setActiveTab}
            >
                <TabsList className="mb-4">
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                    <TabsTrigger value="approved">Approved</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                    <TabsTrigger value="rejected">Rejected</TabsTrigger>
                    <TabsTrigger value="all">All Requests</TabsTrigger>
                </TabsList>

                <TabsContent value={activeTab}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Withdrawal Requests</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {filteredWithdrawals.length === 0 ? (
                                <div className="text-center py-8">
                                    <p className="text-gray-500">
                                        No{" "}
                                        {activeTab === "all" ? "" : activeTab}{" "}
                                        withdrawal requests found.
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {filteredWithdrawals.map((withdrawal) => (
                                        <div
                                            key={withdrawal.id}
                                            className="border rounded-lg p-4"
                                        >
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <h3 className="font-semibold">
                                                            {withdrawal.id}
                                                        </h3>
                                                        <Badge
                                                            variant="outline"
                                                            className={getStatusBadgeVariant(
                                                                withdrawal.status
                                                            )}
                                                        >
                                                            {withdrawal.status
                                                                .charAt(0)
                                                                .toUpperCase() +
                                                                withdrawal.status.slice(
                                                                    1
                                                                )}
                                                        </Badge>
                                                    </div>
                                                    <p className="text-sm text-gray-500">
                                                        Requested on{" "}
                                                        {new Date(
                                                            withdrawal.requestDate
                                                        ).toLocaleDateString()}{" "}
                                                        •{" "}
                                                        {
                                                            withdrawal
                                                                .selectedBookings
                                                                .length
                                                        }{" "}
                                                        bookings
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-lg font-semibold">
                                                        ₹
                                                        {withdrawal.netAmount.toFixed(
                                                            2
                                                        )}
                                                    </div>
                                                    <div className="text-xs text-gray-500">
                                                        Total: ₹
                                                        {withdrawal.amount.toFixed(
                                                            2
                                                        )}{" "}
                                                        • Fee: ₹
                                                        {withdrawal.fees.toFixed(
                                                            2
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <div className="text-sm font-medium">
                                                    Bookings Included:
                                                </div>
                                                <div className="grid gap-2 mt-1">
                                                    {withdrawal.selectedBookings.map(
                                                        (booking) => (
                                                            <div
                                                                key={booking.id}
                                                                className="bg-gray-50 p-2 rounded-md flex justify-between items-center text-sm"
                                                            >
                                                                <div>
                                                                    <div className="font-medium">
                                                                        {
                                                                            booking.trekName
                                                                        }
                                                                    </div>
                                                                    <div className="text-gray-500">
                                                                        {
                                                                            booking.customerName
                                                                        }{" "}
                                                                        •{" "}
                                                                        {new Date(
                                                                            booking.date
                                                                        ).toLocaleDateString()}
                                                                    </div>
                                                                </div>
                                                                <span className="font-medium">
                                                                    ₹
                                                                    {
                                                                        booking.amount
                                                                    }
                                                                </span>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            </div>

                                            {withdrawal.notes && (
                                                <div className="mt-3 pt-3 border-t text-sm">
                                                    <div className="font-medium">
                                                        Notes:
                                                    </div>
                                                    <p className="text-gray-600">
                                                        {withdrawal.notes}
                                                    </p>
                                                </div>
                                            )}

                                            {withdrawal.status ===
                                                "completed" &&
                                                withdrawal.transactionDetails && (
                                                    <div className="mt-3 pt-3 border-t text-sm">
                                                        <div className="font-medium">
                                                            Transaction Details:
                                                        </div>
                                                        <p className="text-gray-600">
                                                            {
                                                                withdrawal.transactionDetails
                                                            }
                                                        </p>
                                                        <p className="text-gray-500">
                                                            Processed on{" "}
                                                            {withdrawal.processedDate
                                                                ? new Date(
                                                                      withdrawal.processedDate
                                                                  ).toLocaleDateString()
                                                                : "N/A"}
                                                        </p>
                                                    </div>
                                                )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default Withdrawals;
