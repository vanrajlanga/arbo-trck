
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Calendar, Clock, MapPin, User, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DatePicker } from "@/components/ui/date-picker";



  id | number;
  pickupPointsckupPoint[];
  price | number;

  onSubmit: (booking) => void;
  onClose: () => void;

const BookingForm = ({ onSubmit, isOpen, onClose }okingFormProps) => {
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
          const formattedTreks = parsedTreks.map((trek) => ({
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
          setTreks([
            {
              id: "TRK-123456",
              serviceId: "TSRV-654321",
              name: "Himalayan Adventure",
              destination: "Manali",
              pickupPoints: [
                {
                  id: "pickup-1",
                  cityId: "1",
                  cityName: "Hyderabad",
                  locationDetails: "Madhapur Metro Station"
                },
                {
                  id: "pickup-2",
                  cityId: "2",
                  cityName: "Warangal", 
                  locationDetails: "Railway Station"
              ],
              price: 5000
            },
            {
              id: "TRK-234567",
              serviceId: "TSRV-765432",
              name: "Beach Paradise",
              destination: "Goa",
              pickupPoints: [
                {
                  id: "pickup-3",
                  cityId: "4",
                  cityName: "Vijayawada",
                  locationDetails: "Railway Station"
                },
                {
                  id: "pickup-4",
                  cityId: "7",
                  cityName: "Chennai",
                  locationDetails: "Central Station"
              ],
              price: 4000
          ]);

        // Load customers from localStorage
        const customersJson = localStorage.getItem('vendorCustomers');
        if (customersJson) {
          setCustomers(JSON.parse(customersJson));
        } else {
          // Demo customers if none exist
          const sampleCustomers = [
            { id: 1, name: "John Doe", email: "john@example.com", phone: "9876543210" },
            { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "9876543211" },
            { id: 3, name: "Mike Johnson", email: "mike@example.com", phone: "9876543212" }
          ];
          setCustomers(sampleCustomers);
          localStorage.setItem('vendorCustomers', JSON.stringify(sampleCustomers));
        
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load data");
      } finally {
      setLoading(false);
    }
        setLoading(false);
    };

    if (isOpen) {
      fetchData();
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
  }, [isOpen]);

  // Handle trek selection
  const handleTrekChange = (trekId) => {
    const trek = treks.find(t => t.id.toString() === trekId);
    if (trek) {
      setSelectedTrek(trek);
      
      setBooking(prev => ({
        ...prev,
        trekId: trek.id.toString(),
        trekName: trek.name,
        pickupPointId: "", // Reset pickup point when trek changes
        pickupPointDetails: "",
        amountmber(trek.price)
      }));
  };

  // Handle pickup point selection
  const handlePickupPointChange = (pickupPointId) => {
    if (selectedTrek && selectedTrek.pickupPoints && selectedTrek.pickupPoints.length > 0) {
      const pickupPoint = selectedTrek.pickupPoints.find(p => p.id === pickupPointId);
      if (pickupPoint) {
        setBooking(prev => ({
          ...prev,
          pickupPointId: pickupPointId,
          pickupPointDetails: `${pickupPoint.cityName} - ${pickupPoint.locationDetails}`
        }));
    } else {
      // For old treks without pickup points, allow manual entry
      setBooking(prev => ({
        ...prev,
        pickupPointId: "manual",
        pickupPointDetails: "Manual pickup arrangement"
      }));
  };

  // Handle customer selection
  const handleCustomerChange = (customerId) => {
    const customer = customers.find(c => c.id.toString() === customerId);
    if (customer) {
      setBooking(prev => ({
        ...prev,
        customerId: customerId,
        customerName: customer.name
      }));
  };

  // Handle date change
  const handleDateChange = (datete | undefined) => {
    if (date) {
      setBooking(prev => ({
        ...prev,
        date: date.toISOString().split('T')[0]
      }));
  };

  // Handle number of participants change
  const handleParticipantsChange = (e) => {
    const participants = parseInt(e.target.value) || 1;
    setBooking(prev => ({
      ...prev,
      numberOfParticipants: participants,
      amount: selectedTrek ? Number(selectedTrek.price) * participants : 0
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!booking.trekId) {
      toast.error("Please select a trek");
    
    // For treks with pickup points, require selection
    if (selectedTrek && selectedTrek.pickupPoints && selectedTrek.pickupPoints.length > 0 && !booking.pickupPointId) {
      toast.error("Please select a pickup point");
    
    if (!booking.customerId) {
      toast.error("Please select a customer");
    
    if (!booking.date) {
      toast.error("Please select a date");

    // For old treks without pickup points, set default pickup details
    let finalBooking = { ...booking };
    if (!selectedTrek?.pickupPoints || selectedTrek.pickupPoints.length === 0) {
      finalBooking.pickupPointId = "legacy";
      finalBooking.pickupPointDetails = "Legacy trek - pickup details to be arranged";

    // Generate a unique booking ID
    const bookingData = {
      ...finalBooking,
      id: `BK-${Math.floor(100000 + Math.random() * 900000)}`,
      createdAt: new Date().toISOString()
    };
    
    onSubmit(bookingData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Booking</DialogTitle>
          <DialogDescription>
            Enter the details to create a new booking for a customer.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {/* Trek Selection */}
            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="trek">Select Trek *</Label>
              <Select 
                value={booking.trekId} 
                onValueChange={handleTrekChange}
              >
                <SelectTrigger id="trek">
                  <SelectValue placeholder="Select trek" />
                </SelectTrigger>
                <SelectContent>
                  {treks.map((trek) => (
                    <SelectItem key={trek.id} value={trek.id.toString()}>
                      {trek.name} - {trek.destination}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Pickup Point Selection */}
            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="pickupPoint">
                Pickup Point {selectedTrek && selectedTrek.pickupPoints && selectedTrek.pickupPoints.length > 0 ? "*" : "(Optional)"}
              </Label>
              {selectedTrek && selectedTrek.pickupPoints && selectedTrek.pickupPoints.length > 0 ? (
                <Select 
                  value={booking.pickupPointId} 
                  onValueChange={handlePickupPointChange}
                  disabled={!selectedTrek}
                >
                  <SelectTrigger id="pickupPoint">
                    <SelectValue placeholder="Select pickup point" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedTrek.pickupPoints.map((point) => (
                      <SelectItem key={point.id} value={point.id}>
                        {point.cityName} - {point.locationDetails}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <div className="text-sm text-gray-500 p-3 border rounded">
                  {selectedTrek ? 
                    "This trek doesn't have predefined pickup points. Pickup details will be arranged manually." :
                    "Select a trek first"
                </div>
              )}
            </div>

            {/* Customer Selection */}
            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="customer">Select Customer *</Label>
              <Select 
                value={booking.customerId} 
                onValueChange={handleCustomerChange}
              >
                <SelectTrigger id="customer">
                  <SelectValue placeholder="Select customer" />
                </SelectTrigger>
                <SelectContent>
                  {customers.map((customer) => (
                    <SelectItem key={customer.id} value={customer.id.toString()}>
                      {customer.name} - {customer.phone}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Date */}
            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="date">Trek Date *</Label>
              <DatePicker
                date={booking.date ? new Date(booking.date) : undefined}
                setDate={handleDateChange}
              />
            </div>

            {/* Number of Participants */}
            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="participants">Number of Participants *</Label>
              <Input 
                id="participants"
                type="number"
                min="1"
                value={booking.numberOfParticipants}
                onChange={handleParticipantsChange}
              />
            </div>

            {/* Booking Status */}
            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="bookingStatus">Booking Status</Label>
              <Select 
                value={booking.bookingStatus} 
                onValueChange={(value) => setBooking({...booking, bookingStatus: value})}
              >
                <SelectTrigger id="bookingStatus">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Payment Status */}
            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="paymentStatus">Payment Status</Label>
              <Select 
                value={booking.paymentStatus} 
                onValueChange={(value) => setBooking({...booking, paymentStatus: value})}
              >
                <SelectTrigger id="paymentStatus">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="onsite">Pay Onsite</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Total Amount (Calculated) */}
            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="amount">Total Amount</Label>
              <Input 
                id="amount"
                type="number"
                value={booking.amount}
                onChange={(e) => setBooking({...booking, amountmber(e.target.value)})}
                className="font-medium text-lg"
              />
              <p className="text-xs text-gray-500">
                Auto-calculated based on trek price and number of participants
              </p>
            </div>

            {/* Selected Details Summary */}
            {selectedTrek && booking.customerId && (
              <div className="grid grid-cols-1 gap-2">
                <Label>Booking Summary</Label>
                <Card>
                  <CardContent className="p-4">
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">Trek:</span> {selectedTrek.name}</p>
                      <p><span className="font-medium">Destination:</span> {selectedTrek.destination}</p>
                      {booking.pickupPointDetails && (
                        <p><span className="font-medium">Pickup:</span> {booking.pickupPointDetails}</p>
                      )}
                      <p><span className="font-medium">Customer:</span> {booking.customerName}</p>
                      <p><span className="font-medium">Total Amount:</span> ₹{booking.amount}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              Create Booking
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingForm;
