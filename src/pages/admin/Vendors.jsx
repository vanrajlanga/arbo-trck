import React, { useState } from "react";
import { toast } from "sonner";
import {
  Search,
  FileEdit,
  CheckCircle,
  XCircle,
  AlertCircle,
  ChevronDown,
  MoreHorizontal,
  Download,
  Filter,
  Eye,
  Ban
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Mock data
const vendorsData = [
  {
    id: 1,
    name: "Mountain Explorers",
    owner: "Vikram Singh",
    contact: "+91 9823456780",
    email: "info@mountainexplorers.com",
    joinDate: "Jan 15, 2025",
    treks: 5,
    revenue: "₹145,000",
    status: "Active"
  },
  {
    id: 2,
    name: "Adventure Beyond",
    owner: "Ananya Sharma",
    contact: "+91 8745123690",
    email: "contact@adventurebeyond.in",
    joinDate: "Feb 3, 2025",
    treks: 3,
    revenue: "₹87,500",
    status: "Active"
  },
  {
    id: 3,
    name: "Trails & Peaks",
    owner: "Rahul Mehta",
    contact: "+91 9912345678",
    email: "info@trailspeaks.co.in",
    joinDate: "Mar 10, 2025",
    treks: 2,
    revenue: "₹62,000",
    status: "Pending"
  },
  {
    id: 4,
    name: "Himalayan Journeys",
    owner: "Priya Kapoor",
    contact: "+91 8876543210",
    email: "support@himalayanjourney.com",
    joinDate: "Mar 22, 2025",
    treks: 0,
    revenue: "₹0",
    status: "Under Review"
  },
  {
    id: 5,
    name: "Summit Seekers",
    owner: "Arjun Patel",
    contact: "+91 7789012345",
    email: "info@summitseekers.net",
    joinDate: "Apr 5, 2025",
    treks: 0,
    revenue: "₹0",
    status: "Under Review"
  },
  {
    id: 6,
    name: "Wild Wanderers",
    owner: "Maya Reddy",
    contact: "+91 9988776655",
    email: "admin@wildwanderers.com",
    joinDate: "Apr 8, 2025",
    treks: 0,
    revenue: "₹0",
    status: "New"
  },
  {
    id: 7,
    name: "Trek Masters",
    owner: "Karthik Iyer",
    contact: "+91 8123456789",
    email: "hello@trekmasters.in",
    joinDate: "Jan 30, 2025",
    treks: 4,
    revenue: "₹92,500",
    status: "Active"
  },
  {
    id: 8,
    name: "Valley Voyagers",
    owner: "Neha Gupta",
    contact: "+91 9765432180",
    email: "bookings@valleyvoyagers.com",
    joinDate: "Feb 15, 2025",
    treks: 3,
    revenue: "₹78,000",
    status: "Active"
  },
  {
    id: 9,
    name: "Outdoor Odyssey",
    owner: "Rohan Joshi",
    contact: "+91 7712345678",
    email: "info@outdoorodyssey.co.in",
    joinDate: "Mar 18, 2025",
    treks: 1,
    revenue: "₹28,500",
    status: "Suspended"
  },
];

const AdminVendors = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [viewDetailsOpen, setViewDetailsOpen] = useState(false);
  
  const handleApproveVendor = (vendorId) => {
    // In a real app, make API call to approve vendor
    toast.success("Vendor approved successfully");
  };
  
  const handleRejectVendor = (vendorId) => {
    // In a real app, make API call to reject vendor
    toast.success("Vendor application rejected");
  };
  
  const handleSuspendVendor = (vendorId) => {
    // In a real app, make API call to suspend vendor
    toast.success("Vendor account suspended");
  };
  
  const handleReactivateVendor = (vendorId) => {
    // In a real app, make API call to reactivate vendor
    toast.success("Vendor account reactivated");
  };

  const handleViewDetails = (vendor) => {
    setSelectedVendor(vendor);
    setViewDetailsOpen(true);
  };

  // Filter vendors based on search term and status
  const filteredVendors = vendorsData.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendor.owner.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || vendor.status.toLowerCase() === statusFilter.toLowerCase();
                          
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Vendor Management</h1>
        
        <div className="flex flex-col sm:flex-row gap-2 mt-4 md:mt-0">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Advanced Filters
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input 
            placeholder="Search vendors by name, email, or owner..." 
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Vendors</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="under review">Under Review</SelectItem>
            <SelectItem value="suspended">Suspended</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Vendors</CardTitle>
          <CardDescription>
            Manage all vendors registered on the platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredVendors.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vendor Name</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead className="hidden md:table-cell">Email</TableHead>
                  <TableHead className="hidden md:table-cell">Join Date</TableHead>
                  <TableHead className="hidden lg:table-cell">Treks</TableHead>
                  <TableHead className="hidden lg:table-cell">Revenue</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVendors.map((vendor) => (
                  <TableRow key={vendor.id}>
                    <TableCell className="font-medium">{vendor.name}</TableCell>
                    <TableCell>{vendor.owner}</TableCell>
                    <TableCell className="hidden md:table-cell">{vendor.email}</TableCell>
                    <TableCell className="hidden md:table-cell">{vendor.joinDate}</TableCell>
                    <TableCell className="hidden lg:table-cell">{vendor.treks}</TableCell>
                    <TableCell className="hidden lg:table-cell">{vendor.revenue}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {vendor.status === "Active" && (
                          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                            <CheckCircle className="mr-1 h-3 w-3" /> Active
                          </span>
                        )}
                        
                        {vendor.status === "Pending" && (
                          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800">
                            <AlertCircle className="mr-1 h-3 w-3" /> Pending
                          </span>
                        )}
                        
                        {vendor.status === "New" && (
                          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-800">
                            New
                          </span>
                        )}
                        
                        {vendor.status === "Under Review" && (
                          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-purple-100 text-purple-800">
                            Under Review
                          </span>
                        )}
                        
                        {vendor.status === "Suspended" && (
                          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-red-100 text-red-800">
                            <XCircle className="mr-1 h-3 w-3" /> Suspended
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewDetails(vendor)}>
                            <Eye className="mr-2 h-4 w-4" /> View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <FileEdit className="mr-2 h-4 w-4" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          
                          {(vendor.status === "New" || vendor.status === "Pending" || vendor.status === "Under Review") && (
                            <>
                              <DropdownMenuItem onClick={() => handleApproveVendor(vendor.id)}>
                                <CheckCircle className="mr-2 h-4 w-4" /> Approve
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleRejectVendor(vendor.id)}>
                                <XCircle className="mr-2 h-4 w-4" /> Reject
                              </DropdownMenuItem>
                            </>
                          )}
                          
                          {vendor.status === "Active" && (
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                  <Ban className="mr-2 h-4 w-4" /> Suspend
                                </DropdownMenuItem>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Suspend Vendor Account?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This will immediately suspend {vendor.name}'s account and all their active treks. They will not be able to accept new bookings until reactivated.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleSuspendVendor(vendor.id)} className="bg-red-600 hover:bg-red-700">
                                    Suspend
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          )}
                          
                          {vendor.status === "Suspended" && (
                            <DropdownMenuItem onClick={() => handleReactivateVendor(vendor.id)}>
                              <CheckCircle className="mr-2 h-4 w-4" /> Reactivate
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="flex flex-col items-center justify-center py-10">
              <div className="text-center">
                <Search className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium">No vendors found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Try adjusting your search or filter to find what you're looking for.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {selectedVendor && (
        <Dialog open={viewDetailsOpen} onOpenChange={setViewDetailsOpen}>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>Vendor Details</DialogTitle>
              <DialogDescription>
                View complete information about this vendor.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-6 py-4">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold">{selectedVendor.name}</h2>
                  <p className="text-gray-500">Joined {selectedVendor.joinDate}</p>
                </div>
                {selectedVendor.status === "Active" ? (
                  <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-sm font-medium bg-green-100 text-green-800">
                    <CheckCircle className="mr-1 h-4 w-4" /> Active
                  </span>
                ) : selectedVendor.status === "Suspended" ? (
                  <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-sm font-medium bg-red-100 text-red-800">
                    <XCircle className="mr-1 h-4 w-4" /> Suspended
                  </span>
                ) : (
                  <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-sm font-medium bg-yellow-100 text-yellow-800">
                    <AlertCircle className="mr-1 h-4 w-4" /> {selectedVendor.status}
                  </span>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Contact Information</h3>
                  <div className="mt-2 space-y-1">
                    <p><span className="font-medium">Owner:</span> {selectedVendor.owner}</p>
                    <p><span className="font-medium">Email:</span> {selectedVendor.email}</p>
                    <p><span className="font-medium">Phone:</span> {selectedVendor.contact}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Performance Metrics</h3>
                  <div className="mt-2 space-y-1">
                    <p><span className="font-medium">Active Treks:</span> {selectedVendor.treks}</p>
                    <p><span className="font-medium">Total Revenue:</span> {selectedVendor.revenue}</p>
                    <p><span className="font-medium">Rating:</span> 4.7/5 (23 reviews)</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-500">Recent Activity</h3>
                <div className="space-y-2 text-sm">
                  <div className="p-2 rounded bg-gray-50">
                    <p className="font-medium">Trek Added: Wayanad Wildlife Trek</p>
                    <p className="text-gray-500">Apr 12, 2025</p>
                  </div>
                  <div className="p-2 rounded bg-gray-50">
                    <p className="font-medium">New Booking: TBR5682</p>
                    <p className="text-gray-500">Apr 8, 2025</p>
                  </div>
                  <div className="p-2 rounded bg-gray-50">
                    <p className="font-medium">Profile Updated</p>
                    <p className="text-gray-500">Apr 2, 2025</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-500">Documents</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 rounded border flex justify-between items-center">
                    <span>Business Registration</span>
                    <Button variant="outline" size="sm">View</Button>
                  </div>
                  <div className="p-2 rounded border flex justify-between items-center">
                    <span>GST Certificate</span>
                    <Button variant="outline" size="sm">View</Button>
                  </div>
                  <div className="p-2 rounded border flex justify-between items-center">
                    <span>ID Proof</span>
                    <Button variant="outline" size="sm">View</Button>
                  </div>
                  <div className="p-2 rounded border flex justify-between items-center">
                    <span>Bank Details</span>
                    <Button variant="outline" size="sm">View</Button>
                  </div>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setViewDetailsOpen(false)}>
                Close
              </Button>
              {selectedVendor.status === "Active" ? (
                <Button variant="destructive">
                  Suspend Vendor
                </Button>
              ) : selectedVendor.status === "Suspended" ? (
                <Button className="bg-green-600 hover:bg-green-700">
                  Reactivate Vendor
                </Button>
              ) : (
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Approve Vendor
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default AdminVendors;
