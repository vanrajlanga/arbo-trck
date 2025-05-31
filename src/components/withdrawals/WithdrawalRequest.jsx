import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
// import { toast } from "sonner";

// interface Booking {
//   id: string;
//   trekId: string;
//   trekName: string;
//   customerName: string;
//   date: string;
//   paymentStatus: string;
//   amount: number;
// }

// interface WithdrawalRequestProps {
//   bookings: Booking[];
//   onRequestWithdrawal: (withdrawalData: any) => void;
// }

const WithdrawalRequest = ({ bookings, onRequestWithdrawal }) => {
  const [selectedBookings, setSelectedBookings] = useState([]);
  const [notes, setNotes] = useState('');

  const paidBookings = bookings.filter(booking => booking.paymentStatus === 'paid');
  
  const toggleBookingSelection = (bookingId) => {
    if (selectedBookings.includes(bookingId)) {
      setSelectedBookings(selectedBookings.filter(id => id !== bookingId));
    } else {
      setSelectedBookings([...selectedBookings, bookingId]);
    }
  };

  const calculateTotalAmount = () => {
    return paidBookings
      .filter(booking => selectedBookings.includes(booking.id))
      .reduce((total, booking) => total + booking.amount, 0);
  };

  const handleSubmitRequest = () => {
    if (selectedBookings.length === 0) {
      // toast.error("Please select at least one booking for withdrawal");
      return;
    }

    const withdrawalData = {
      id: `W-${Math.floor(100000 + Math.random() * 900000)}`,
      bookingIds: selectedBookings,
      amount: calculateTotalAmount(),
      fees: calculateTotalAmount() * 0.05, // 5% fees, this would be configured by admin in a real app
      netAmount: calculateTotalAmount() * 0.95, // Net amount after fees
      status: 'pending',
      notes: notes,
      requestDate: new Date().toISOString(),
      selectedBookings: paidBookings.filter(booking => selectedBookings.includes(booking.id))
    };

    onRequestWithdrawal(withdrawalData);
    setSelectedBookings([]);
    setNotes('');
    // toast.success("Withdrawal request submitted successfully");
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Request Withdrawal</CardTitle>
        <CardDescription>
          Select bookings with "Paid" payment status to request a withdrawal
        </CardDescription>
      </CardHeader>
      <CardContent>
        {paidBookings.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No paid bookings available for withdrawal.</p>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              <div className="text-sm font-medium">Eligible Bookings</div>
              <div className="grid gap-2">
                {paidBookings.map(booking => (
                  <div 
                    key={booking.id} 
                    className={`border p-3 rounded-md flex items-center justify-between cursor-pointer ${
                      selectedBookings.includes(booking.id) ? 'bg-blue-50 border-blue-300' : ''
                    }`}
                    onClick={() => toggleBookingSelection(booking.id)}
                  >
                    <div>
                      <div className="font-medium">{booking.trekName}</div>
                      <div className="text-sm text-gray-500">
                        {booking.customerName} • {new Date(booking.date).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">
                        Paid
                      </Badge>
                      <span className="font-medium">₹{booking.amount}</span>
                      <input 
                        type="checkbox" 
                        checked={selectedBookings.includes(booking.id)}
                        onChange={() => {}} 
                        className="h-5 w-5 rounded border-gray-300"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {selectedBookings.length > 0 && (
                <div className="mt-6 space-y-4">
                  <div className="text-sm font-medium">Additional Notes</div>
                  <Textarea 
                    placeholder="Add any notes or comments for the admin (optional)"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                  
                  <div className="bg-gray-50 p-4 rounded-md mt-4">
                    <div className="flex justify-between text-sm">
                      <span>Selected Bookings:</span>
                      <span>{selectedBookings.length}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Total Amount:</span>
                      <span>₹{calculateTotalAmount()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Platform Fee (5%):</span>
                      <span>₹{(calculateTotalAmount() * 0.05).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-medium mt-2 pt-2 border-t">
                      <span>Net Withdrawal Amount:</span>
                      <span>₹{(calculateTotalAmount() * 0.95).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </CardContent>
      <CardFooter className="justify-end">
        <Button 
          onClick={handleSubmitRequest}
          disabled={selectedBookings.length === 0}
        >
          Submit Withdrawal Request
        </Button>
      </CardFooter>
    </Card>
  );
};

export default WithdrawalRequest;
