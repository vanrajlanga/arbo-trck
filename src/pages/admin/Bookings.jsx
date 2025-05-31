import React, { useState, useEffect } from 'react';
import { Search, Filter, Calendar, Eye, MapPin, Users } from "lucide-react";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

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
      { id: 1, name: "Mountain Explorers" },
      { id: 2, name: "Adventure Beyond" },
      { id: 3, name: "Trails & Peaks" }
    ];
    setVendors(vendorsList);
    
    // Create sample bookings data
    const sampleBookings = [
      {
        id: "TBR5678",
        customer: {
          name: "Rahul Sharma",
          email: "rahul.sharma@example.com",
          phone: "+91 98765 43210"
        },
        trek: {
          id: 1,
          name: "Himalayan Adventure",
          image: "trek1.jpg",
          destination: "Himachal Pradesh"
        },
        vendor: {
          id: 1,
          name: "Mountain Explorers"
        },
        bookingDate: "2025-05-10",
        trekDate: "2025-06-15",
        amount: "₹15,000",
        status: "confirmed",
        participants: 3,
        paymentMethod: "Credit Card"
      },
      {
        id: "TBR5679",
        customer: {
          name: "Priya Patel",
          email: "priya.patel@example.com",
          phone: "+91 87654 32109"
        },
        trek: {
          id: 2,
          name: "Valley Trek",
          image: "trek2.jpg",
          destination: "Uttarakhand"
        },
        vendor: {
          id: 2,
          name: "Adventure Beyond"
        },
        bookingDate: "2025-05-12",
        trekDate: "2025-06-20",
        amount: "₹9,000",
        status: "pending",
        participants: 2,
        paymentMethod: "UPI"
      },
      {
        id: "TBR5680",
        customer: {
          name: "Vikram Singh",
          email: "vikram.singh@example.com",
          phone: "+91 76543 21098"
        },
        trek: {
          id: 1,
          name: "Himalayan Adventure",
          image: "trek1.jpg",
          destination: "Himachal Pradesh"
        },
        vendor: {
          id: 1,
          name: "Mountain Explorers"
        },
        bookingDate: "2025-05-08",
        trekDate: "2025-07-05",
        amount: "₹10,000",
        status: "confirmed",
        participants: 2,
        paymentMethod: "Net Banking"
      },
      {
        id: "TBR5681",
        customer: {
          name: "Neha Singh",
          email: "neha.singh@example.com",
          phone: "+91 65432 10987"
        },
        trek: {
          id: 3,
          name: "Mountain View Trek",
          image: "trek3.jpg",
          destination: "Sikkim"
        },
        vendor: {
          id: 3,
          name: "Trails & Peaks"
        },
        bookingDate: "2025-05-15",
        trekDate: "2025-06-28",
        amount: "₹12,500",
        status: "cancelled",
        participants: 2,
        paymentMethod: "Debit Card",
        notes: "Customer requested cancellation due to scheduling conflict."
      },
      {
        id: "TBR5682",
        customer: {
          name: "Ajay Kumar",
          email: "ajay.kumar@example.com",
          phone: "+91 54321 09876"
        },
        trek: {
          id: 2,
          name: "Valley Trek",
          image: "trek2.jpg",
          destination: "Uttarakhand"
        },
        vendor: {
          id: 2,
          name: "Adventure Beyond"
        },
        bookingDate: "2025-04-30",
        trekDate: "2025-05-25",
        amount: "₹13,500",
        status: "completed",
        participants: 3,
        paymentMethod: "Credit Card"
      },
      {
        id: "TBR5683",
        customer: {
          name: "Meera Verma",
          email: "meera.verma@example.com",
          phone: "+91 43210 98765"
        },
        trek: {
          id: 3,
          name: "Mountain View Trek",
          image: "trek3.jpg",
          destination: "Sikkim"
        },
        vendor: {
          id: 3,
          name: "Trails & Peaks"
        },
        bookingDate: "2025-05-05",
        trekDate: "2025-06-18",
        amount: "₹8,000",
        status: "refunded",
        participants: 1,
        paymentMethod: "UPI",
        notes: "Refunded due to bad weather conditions"
      }
    ];
    
    setBookings(sampleBookings);
    setLoading(false);
  }, []);

  // Filter bookings based on search term, status and vendor
  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.trek.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    const matchesVendor = vendorFilter === 'all' || String(booking.vendor.id) === vendorFilter;
    
    return matchesSearch && matchesStatus && matchesVendor;
  });

  // View booking details
  const viewBookingDetails = (booking) => {
    setSelectedBooking(booking);
    setIsViewDialogOpen(true);
  };

  // Get a placeholder image for treks
  const getTrekImage = (imageName) => {
    return 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?q=80&w=500&auto=format&fit=crop';
  };

  // Status badges
  const getStatusBadge = (status) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-green-100 text-green-800">Confirmed</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>;
      case 'completed':
        return <Badge className="bg-blue-100 text-blue-800">Completed</Badge>;
      case 'refunded':
        return <Badge className="bg-orange-100 text-orange-800">Refunded</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">All Bookings</h1>
      </div>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search bookings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="refunded">Refunded</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-gray-400" />
              <Select value={vendorFilter} onValueChange={setVendorFilter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Filter by vendor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Vendors</SelectItem>
                  {vendors.map(vendor => (
                    <SelectItem key={vendor.id} value={String(vendor.id)}>{vendor.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all" className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All Bookings</TabsTrigger>
          <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="others">Others</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Booking ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Trek</TableHead>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Trek Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">Loading bookings...</TableCell>
                  </TableRow>
                ) : filteredBookings.length > 0 ? (
                  filteredBookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell className="font-medium">{booking.id}</TableCell>
                      <TableCell>{booking.customer.name}</TableCell>
                      <TableCell>{booking.trek.name}</TableCell>
                      <TableCell>{booking.vendor.name}</TableCell>
                      <TableCell>{booking.trekDate}</TableCell>
                      <TableCell>{booking.amount}</TableCell>
                      <TableCell>{getStatusBadge(booking.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => viewBookingDetails(booking)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">No bookings found matching your filters.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="confirmed" className="mt-6">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Booking ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Trek</TableHead>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Trek Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">Loading bookings...</TableCell>
                  </TableRow>
                ) : filteredBookings.filter(booking => booking.status === 'confirmed').length > 0 ? (
                  filteredBookings.filter(booking => booking.status === 'confirmed').map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell className="font-medium">{booking.id}</TableCell>
                      <TableCell>{booking.customer.name}</TableCell>
                      <TableCell>{booking.trek.name}</TableCell>
                      <TableCell>{booking.vendor.name}</TableCell>
                      <TableCell>{booking.trekDate}</TableCell>
                      <TableCell>{booking.amount}</TableCell>
                      <TableCell>{getStatusBadge(booking.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => viewBookingDetails(booking)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">No confirmed bookings found.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="pending" className="mt-6">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Booking ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Trek</TableHead>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Trek Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">Loading bookings...</TableCell>
                  </TableRow>
                ) : filteredBookings.filter(booking => booking.status === 'pending').length > 0 ? (
                  filteredBookings.filter(booking => booking.status === 'pending').map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell className="font-medium">{booking.id}</TableCell>
                      <TableCell>{booking.customer.name}</TableCell>
                      <TableCell>{booking.trek.name}</TableCell>
                      <TableCell>{booking.vendor.name}</TableCell>
                      <TableCell>{booking.trekDate}</TableCell>
                      <TableCell>{booking.amount}</TableCell>
                      <TableCell>{getStatusBadge(booking.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => viewBookingDetails(booking)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">No pending bookings found.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="others" className="mt-6">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Booking ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Trek</TableHead>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Trek Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">Loading bookings...</TableCell>
                  </TableRow>
                ) : filteredBookings.filter(booking => !['confirmed', 'pending'].includes(booking.status)).length > 0 ? (
                  filteredBookings.filter(booking => !['confirmed', 'pending'].includes(booking.status)).map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell className="font-medium">{booking.id}</TableCell>
                      <TableCell>{booking.customer.name}</TableCell>
                      <TableCell>{booking.trek.name}</TableCell>
                      <TableCell>{booking.vendor.name}</TableCell>
                      <TableCell>{booking.trekDate}</TableCell>
                      <TableCell>{booking.amount}</TableCell>
                      <TableCell>{getStatusBadge(booking.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => viewBookingDetails(booking)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">No other bookings found.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>

      {/* View Booking Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Booking Details - {selectedBooking?.id}</DialogTitle>
          </DialogHeader>
          
          {selectedBooking && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Customer Information</h3>
                    <div className="bg-gray-50 p-4 rounded-md space-y-2">
                      <p><span className="font-medium">Name:</span> {selectedBooking.customer.name}</p>
                      <p><span className="font-medium">Email:</span> {selectedBooking.customer.email}</p>
                      <p><span className="font-medium">Phone:</span> {selectedBooking.customer.phone}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Booking Details</h3>
                    <div className="bg-gray-50 p-4 rounded-md space-y-2">
                      <p><span className="font-medium">Booking Date:</span> {selectedBooking.bookingDate}</p>
                      <p><span className="font-medium">Trek Date:</span> {selectedBooking.trekDate}</p>
                      <p><span className="font-medium">Participants:</span> {selectedBooking.participants}</p>
                      <p><span className="font-medium">Amount:</span> {selectedBooking.amount}</p>
                      <p><span className="font-medium">Payment Method:</span> {selectedBooking.paymentMethod}</p>
                      <p><span className="font-medium">Status:</span> {getStatusBadge(selectedBooking.status)}</p>
                      {selectedBooking.notes && (
                        <p><span className="font-medium">Notes:</span> {selectedBooking.notes}</p>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Trek Information</h3>
                    <div className="bg-gray-50 p-4 rounded-md overflow-hidden">
                      <div className="h-40 rounded-md overflow-hidden mb-4">
                        <img 
                          src={getTrekImage(selectedBooking.trek.image)} 
                          alt={selectedBooking.trek.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h4 className="font-medium text-lg">{selectedBooking.trek.name}</h4>
                      <div className="flex items-center text-gray-500 text-sm mt-1">
                        <MapPin className="h-4 w-4 mr-1" /> {selectedBooking.trek.destination}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Vendor Information</h3>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <h4 className="font-medium">{selectedBooking.vendor.name}</h4>
                      <p className="text-sm text-gray-500">Vendor ID: {selectedBooking.vendor.id}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end pt-4">
                <Button onClick={() => setIsViewDialogOpen(false)}>Close</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminBookings;
