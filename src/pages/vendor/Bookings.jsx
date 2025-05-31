import React, { useState, useEffect } from 'react';
import { toast } from "sonner";
import { 
  Plus, 
  Search, 
  Filter, 
  Calendar, 
  Users,
  Edit,
  Trash2,
  Eye,
  Check,
  X,
  CalendarIcon,
  CreditCard,
  Loader2
} from "lucide-react";
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
      setTreks(parsedTreks.map((trek) => ({
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
      const sampleCustomers = [
        { id: 1, name: "John Doe", email: "john@example.com", phone: "9876543210" },
        { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "9876543211" }
      ];
      setCustomers(sampleCustomers);
      localStorage.setItem('vendorCustomers', JSON.stringify(sampleCustomers));
    }
    
    // Load bookings
    if (savedBookings) {
      setBookings(JSON.parse(savedBookings));
    } else {
      // Create sample bookings if none exist
      const sampleBookings = [
        {
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
        },
        {
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
        }
      ];
      
      setBookings(sampleBookings);
      localStorage.setItem('vendorBookings', JSON.stringify(sampleBookings));
    }
    
    setIsLoading(false);
  }, []);
  
  // Filter bookings based on search term and status
  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.trekName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      booking.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  // Handle form input changes for new booking
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBooking({
      ...newBooking,
      [name]: name === 'participants' ? parseInt(value) : value
    });
  };
  
  // Get customer by ID
  const getCustomerById = (id) => {
    return customers.find(customer => customer.id === id);
  };
  
  // Get trek by ID
  const getTrekById = (id) => {
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
      id: Math.floor(Math.random() * 1000) + 3, // Generate random ID
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
  const viewBooking = (booking) => {
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
  
  // Edit booking
  const editBooking = (booking) => {
    setSelectedBooking(booking);
    // Initialize edit form with current booking data
    setEditedBooking({
      trekId: booking.trekId,
      customerId: booking.customerId,
      trekDate: booking.trekDate,
      participants: booking.participants,
      status: booking.status,
      paymentStatus: booking.paymentStatus,
    });
    setIsEditDialogOpen(true);
  };

  // Handle edit form input changes
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditedBooking({
      ...editedBooking,
      [name]: name === 'participants' ? parseInt(value) : value
    });
  };

  // Update booking
  const updateBooking = () => {
    if (!selectedBooking) return;
    
    // Update booking in bookings array
    const updatedBookings = bookings.map(booking => 
      booking.id === selectedBooking.id ? editedBooking : booking
    );
    
    setBookings(updatedBookings);
    localStorage.setItem('vendorBookings', JSON.stringify(updatedBookings));
    
    setIsEditDialogOpen(false);
    setSelectedBooking(null);
    toast.success("Booking updated successfully");
  };
  
  // Get status badge color
  const getStatusBadgeColor = (status) => {
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
  const getPaymentBadgeColor = (status) => {
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Bookings Management</h1>
        <Button 
          onClick={() => setIsNewBookingDialogOpen(true)}
          className="flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Booking
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by trek or customer name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <div className="flex items-center space-x-2 min-w-[200px]">
              <Filter className="h-4 w-4 text-gray-400" />
              <Select 
                value={statusFilter} 
                onValueChange={setStatusFilter}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All Bookings</TabsTrigger>
              <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-6">
              <BookingsTable 
                bookings={filteredBookings}
                isLoading={isLoading}
                onView={viewBooking}
                onEdit={editBooking}
                onDelete={deleteBooking}
                getStatusBadgeColor={getStatusBadgeColor}
                getPaymentBadgeColor={getPaymentBadgeColor}
              />
            </TabsContent>
            
            <TabsContent value="confirmed" className="mt-6">
              <BookingsTable 
                bookings={filteredBookings.filter(b => b.status === 'confirmed')}
                isLoading={isLoading}
                onView={viewBooking}
                onEdit={editBooking}
                onDelete={deleteBooking}
                getStatusBadgeColor={getStatusBadgeColor}
                getPaymentBadgeColor={getPaymentBadgeColor}
              />
            </TabsContent>
            
            <TabsContent value="pending" className="mt-6">
              <BookingsTable 
                bookings={filteredBookings.filter(b => b.status === 'pending')}
                isLoading={isLoading}
                onView={viewBooking}
                onEdit={editBooking}
                onDelete={deleteBooking}
                getStatusBadgeColor={getStatusBadgeColor}
                getPaymentBadgeColor={getPaymentBadgeColor}
              />
            </TabsContent>
            
            <TabsContent value="completed" className="mt-6">
              <BookingsTable 
                bookings={filteredBookings.filter(b => b.status === 'completed')}
                isLoading={isLoading}
                onView={viewBooking}
                onEdit={editBooking}
                onDelete={deleteBooking}
                getStatusBadgeColor={getStatusBadgeColor}
                getPaymentBadgeColor={getPaymentBadgeColor}
              />
            </TabsContent>
            
            <TabsContent value="cancelled" className="mt-6">
              <BookingsTable 
                bookings={filteredBookings.filter(b => b.status === 'cancelled')}
                isLoading={isLoading}
                onView={viewBooking}
                onEdit={editBooking}
                onDelete={deleteBooking}
                getStatusBadgeColor={getStatusBadgeColor}
                getPaymentBadgeColor={getPaymentBadgeColor}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* New Booking Dialog */}
      <Dialog open={isNewBookingDialogOpen} onOpenChange={setIsNewBookingDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Booking</DialogTitle>
            <DialogDescription>Create a new booking for a customer</DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
            <div>
              <Label htmlFor="trekId" className="mb-2 block">Select Trek *</Label>
              <Select
                value={newBooking.trekId ? String(newBooking.trekId) : ""}
                onValueChange={(value) => setNewBooking({...newBooking, trekId: parseInt(value)})}
              >
                <SelectTrigger id="trekId">
                  <SelectValue placeholder="Select a trek" />
                </SelectTrigger>
                <SelectContent>
                  {treks.map((trek) => (
                    <SelectItem key={trek.id} value={String(trek.id)}>
                      {trek.name} - {trek.destination}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {newBooking.trekId > 0 && (
                <div className="mt-4 p-4 bg-gray-50 rounded-md">
                  <h4 className="font-medium mb-2">Trek Details</h4>
                  {(() => {
                    const trek = getTrekById(newBooking.trekId);
                    if (!trek) return <p>Trek not found</p>;
                    
                    return (
                      <div className="space-y-2 text-sm">
                        <p><span className="font-medium">Price:</span> ₹{trek.price} per person</p>
                        <p><span className="font-medium">Duration:</span> {trek.duration}</p>
                        <p><span className="font-medium">Available Slots:</span> {trek.slots.total - trek.slots.booked}</p>
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>
            
            <div>
              <Label htmlFor="customerId" className="mb-2 block">Select Customer *</Label>
              <Select
                value={newBooking.customerId ? String(newBooking.customerId) : ""}
                onValueChange={(value) => setNewBooking({...newBooking, customerId: parseInt(value)})}
              >
                <SelectTrigger id="customerId">
                  <SelectValue placeholder="Select a customer" />
                </SelectTrigger>
                <SelectContent>
                  {customers.map((customer) => (
                    <SelectItem key={customer.id} value={String(customer.id)}>
                      {customer.name} - {customer.phone}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="trekDate" className="mb-2 block">Trek Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                    disabled={newBooking.trekId === 0}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {newBooking.trekDate ? format(new Date(newBooking.trekDate), 'PP') : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <CalendarComponent
                    mode="single"
                    selected={newBooking.trekDate ? new Date(newBooking.trekDate) : undefined}
                    onSelect={(date) => {
                      if (date) {
                        setNewBooking({...newBooking, trekDate: format(date, 'yyyy-MM-dd')});
                      }
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div>
              <Label htmlFor="participants" className="mb-2 block">Number of Participants *</Label>
              <Input
                id="participants"
                name="participants"
                type="number"
                min="1"
                max={(() => {
                  const trek = getTrekById(newBooking.trekId);
                  return trek ? trek.slots.total - trek.slots.booked : 1;
                })()}
                value={newBooking.participants}
                onChange={handleInputChange}
                className="mt-1"
                disabled={newBooking.trekId === 0}
              />
            </div>
            
            <div>
              <Label htmlFor="status" className="mb-2 block">Booking Status</Label>
              <Select
                value={newBooking.status}
                onValueChange={(value) => setNewBooking({...newBooking, status: value})}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="paymentStatus" className="mb-2 block">Payment Status</Label>
              <Select
                value={newBooking.paymentStatus}
                onValueChange={(value) => setNewBooking({...newBooking, paymentStatus: value})}
              >
                <SelectTrigger id="paymentStatus">
                  <SelectValue placeholder="Select payment status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="md:col-span-2">
              <Card>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Total Amount:</h4>
                    <span className="text-xl font-bold">₹{calculateTotalAmount()}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewBookingDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleCreateBooking}>Create Booking</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Booking Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Booking Details</DialogTitle>
          </DialogHeader>
          
          {selectedBooking && (
            <div className="py-4 space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{selectedBooking.trekName}</h3>
                <div className="flex space-x-2">
                  <Badge className={getStatusBadgeColor(selectedBooking.status)}>
                    {selectedBooking.status.charAt(0).toUpperCase() + selectedBooking.status.slice(1)}
                  </Badge>
                  <Badge className={getPaymentBadgeColor(selectedBooking.paymentStatus)}>
                    {selectedBooking.paymentStatus.charAt(0).toUpperCase() + selectedBooking.paymentStatus.slice(1)}
                  </Badge>
                </div>
              </div>
              
              <Separator />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
                <div>
                  <h4 className="font-medium text-gray-500 mb-1">Customer</h4>
                  <p>{selectedBooking.customerName}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-500 mb-1">Booking Date</h4>
                  <p>{format(new Date(selectedBooking.bookingDate), 'MMM d, yyyy')}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-500 mb-1">Trek Date</h4>
                  <p>{format(new Date(selectedBooking.trekDate), 'MMM d, yyyy')}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-500 mb-1">Participants</h4>
                  <p>{selectedBooking.participants}</p>
                </div>
                <div className="md:col-span-2">
                  <h4 className="font-medium text-gray-500 mb-1">Total Amount</h4>
                  <p className="text-xl font-bold">₹{selectedBooking.totalAmount}</p>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsViewDialogOpen(false);
                if (selectedBooking) {
                  setSelectedBooking(selectedBooking);
                  setIsEditDialogOpen(true);
                }
              }}
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <Button onClick={() => setIsViewDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Booking Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Booking</DialogTitle>
          </DialogHeader>
          
          {selectedBooking && (
            <div className="py-4 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <p className="text-lg font-medium">{selectedBooking.trekName}</p>
                <p className="text-sm text-gray-500">Customer: {selectedBooking.customerName}</p>
              </div>
              
              <div>
                <Label htmlFor="edit-status" className="mb-2 block">Booking Status</Label>
                <Select
                  value={selectedBooking.status}
                  onValueChange={(value) => setSelectedBooking({
                    ...selectedBooking, 
                    status: value
                  })}
                >
                  <SelectTrigger id="edit-status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="edit-payment" className="mb-2 block">Payment Status</Label>
                <Select
                  value={selectedBooking.paymentStatus}
                  onValueChange={(value) => setSelectedBooking({
                    ...selectedBooking, 
                    paymentStatus: value
                  })}
                >
                  <SelectTrigger id="edit-payment">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="refunded">Refunded</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="edit-date" className="mb-2 block">Trek Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {format(new Date(selectedBooking.trekDate), 'PP')}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent
                      mode="single"
                      selected={new Date(selectedBooking.trekDate)}
                      onSelect={(date) => {
                        if (date) {
                          setSelectedBooking({
                            ...selectedBooking,
                            trekDate: format(date, 'yyyy-MM-dd')
                          });
                        }
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div>
                <Label htmlFor="edit-participants" className="mb-2 block">Participants</Label>
                <Input
                  id="edit-participants"
                  type="number"
                  min="1"
                  value={selectedBooking.participants}
                  onChange={(e) => setSelectedBooking({
                    ...selectedBooking,
                    participants: parseInt(e.target.value),
                    totalAmount: parseInt(e.target.value) * (selectedBooking.totalAmount / selectedBooking.participants)
                  })}
                />
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={updateBooking}>Update Booking</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Booking Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          
          <p>Are you sure you want to delete this booking? This action cannot be undone.</p>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={deleteBooking}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
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
    return (
      <div className="flex justify-center items-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="text-center py-16">
        <Calendar className="h-12 w-12 mx-auto text-gray-300 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-1">No bookings found</h3>
        <p className="text-gray-500">There are no bookings matching your filters.</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Trek</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Trek Date</TableHead>
            <TableHead>Participants</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Payment</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell>#{booking.id}</TableCell>
              <TableCell className="font-medium">{booking.trekName}</TableCell>
              <TableCell>{booking.customerName}</TableCell>
              <TableCell>{format(new Date(booking.trekDate), 'MMM d, yyyy')}</TableCell>
              <TableCell>{booking.participants}</TableCell>
              <TableCell>₹{booking.totalAmount}</TableCell>
              <TableCell>
                <Badge className={getStatusBadgeColor(booking.status)}>
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge className={getPaymentBadgeColor(booking.paymentStatus)}>
                  {booking.paymentStatus.charAt(0).toUpperCase() + booking.paymentStatus.slice(1)}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  <Button variant="ghost" size="icon" onClick={() => onView(booking)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => onEdit(booking)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-red-500" onClick={() => onDelete(booking)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Bookings;
