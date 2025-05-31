import React, { useState, useEffect } from 'react';
import { Eye, Search, Filter, Calendar, MapPin, DollarSign, Users } from 'lucide-react';
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
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

const AdminTreks = () => {
  const [treks, setTreks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [vendorFilter, setVendorFilter] = useState("all");
  const [selectedTrek, setSelectedTrek] = useState(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    // Load all treks from all vendors from localStorage
    const savedVendorTreks = localStorage.getItem('vendorTreks');
    let allTreks = [];
    
    if (savedVendorTreks) {
      const vendorTreks = JSON.parse(savedVendorTreks);
      // Add vendor information to each trek
      allTreks = vendorTreks.map((trek) => ({
        ...trek,
        vendorName: getVendorName(trek.id),
        vendorId: getVendorId(trek.id)
      }));
    }

    // Create sample vendor data if none exists
    const vendorsList = [
      { id: 1, name: "Mountain Explorers" },
      { id: 2, name: "Adventure Beyond" },
      { id: 3, name: "Trails & Peaks" }
    ];
    
    setVendors(vendorsList);
    setTreks(allTreks);
    setLoading(false);
  }, []);

  // Helper function to get vendor name based on trek id
  const getVendorName = (trekId) => {
    // This is mock data - in a real app, this would come from a database
    const vendorMapping = {
      1: "Mountain Explorers",
      2: "Adventure Beyond"
    };
    
    return vendorMapping[trekId] || (trekId % 3 === 0 ? "Trails & Peaks" : "Mountain Explorers");
  };
  
  // Helper function to get vendor id based on trek id
  const getVendorId = (trekId) => {
    // This is mock data - in a real app, this would come from a database
    const vendorMapping = {
      1: 1,
      2: 2
    };
    
    return vendorMapping[trekId] || (trekId % 3 === 0 ? 3 : 1);
  };

  // Filter treks based on search term, status, and vendor
  const filteredTreks = treks.filter(trek => {
    const matchesSearch = 
      trek.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      trek.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trek.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || trek.status === statusFilter;
    const matchesVendor = vendorFilter === 'all' || String(trek.vendorId) === vendorFilter;
    
    return matchesSearch && matchesStatus && matchesVendor;
  });

  // View trek details
  const viewTrekDetails = (trek) => {
    setSelectedTrek(trek);
    setIsViewDialogOpen(true);
  };

  // Get a placeholder image for treks
  const getTrekImage = (imageName) => {
    return 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?q=80&w=500&auto=format&fit=crop';
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">All Treks</h1>
      </div>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search treks..."
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
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
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
          <TabsTrigger value="all">All Treks</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="draft">Draft</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Trek Name</TableHead>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Destination</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">Loading treks...</TableCell>
                  </TableRow>
                ) : filteredTreks.length > 0 ? (
                  filteredTreks.map((trek) => (
                    <TableRow key={trek.id}>
                      <TableCell className="font-medium">{trek.name}</TableCell>
                      <TableCell>{trek.vendorName}</TableCell>
                      <TableCell>{trek.destination}</TableCell>
                      <TableCell>{trek.duration}</TableCell>
                      <TableCell>₹{trek.price}</TableCell>
                      <TableCell>
                        <Badge className={trek.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                          {trek.status === 'active' ? 'Active' : 'Draft'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => viewTrekDetails(trek)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">No treks found matching your filters.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="active" className="mt-6">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Trek Name</TableHead>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Destination</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">Loading treks...</TableCell>
                  </TableRow>
                ) : filteredTreks.filter(trek => trek.status === 'active').length > 0 ? (
                  filteredTreks.filter(trek => trek.status === 'active').map((trek) => (
                    <TableRow key={trek.id}>
                      <TableCell className="font-medium">{trek.name}</TableCell>
                      <TableCell>{trek.vendorName}</TableCell>
                      <TableCell>{trek.destination}</TableCell>
                      <TableCell>{trek.duration}</TableCell>
                      <TableCell>₹{trek.price}</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">Active</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => viewTrekDetails(trek)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">No active treks found.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="draft" className="mt-6">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Trek Name</TableHead>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Destination</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">Loading treks...</TableCell>
                  </TableRow>
                ) : filteredTreks.filter(trek => trek.status === 'draft').length > 0 ? (
                  filteredTreks.filter(trek => trek.status === 'draft').map((trek) => (
                    <TableRow key={trek.id}>
                      <TableCell className="font-medium">{trek.name}</TableCell>
                      <TableCell>{trek.vendorName}</TableCell>
                      <TableCell>{trek.destination}</TableCell>
                      <TableCell>{trek.duration}</TableCell>
                      <TableCell>₹{trek.price}</TableCell>
                      <TableCell>
                        <Badge className="bg-gray-100 text-gray-800">Draft</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => viewTrekDetails(trek)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">No draft treks found.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>

      {/* View Trek Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedTrek?.name}</DialogTitle>
          </DialogHeader>
          
          {selectedTrek && (
            <div className="space-y-6">
              <div className="relative h-64 rounded-lg overflow-hidden">
                <img 
                  src={getTrekImage(selectedTrek.images[0])} 
                  alt={selectedTrek.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <Badge className={selectedTrek.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                    {selectedTrek.status === 'active' ? 'Active' : 'Draft'}
                  </Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-1">{selectedTrek.name}</h3>
                  <div className="flex items-center text-gray-500 text-sm mb-1">
                    <MapPin className="h-4 w-4 mr-1" /> {selectedTrek.destination}
                  </div>
                  <div className="flex items-center text-gray-500 text-sm mb-4">
                    <Users className="h-4 w-4 mr-1" /> Vendor: {selectedTrek.vendorName}
                  </div>
                  <p className="text-gray-600 mb-4">{selectedTrek.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Duration</h4>
                    <p>{selectedTrek.duration}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Difficulty</h4>
                    <p className="capitalize">{selectedTrek.difficulty}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Price</h4>
                    <p>₹{selectedTrek.price}/person</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Slots</h4>
                    <p>{selectedTrek.slots.booked}/{selectedTrek.slots.total}</p>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-semibold mb-4">Itinerary</h3>
                <div className="space-y-4">
                  {selectedTrek.itinerary?.map((day, index) => (
                    <div key={index} className="border border-gray-100 rounded-md p-4">
                      <h4 className="font-medium mb-2">Day {index + 1}</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {day.activities.map((activity, actIdx) => (
                          <li key={actIdx} className="text-gray-600">{activity}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-4">Inclusions</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {selectedTrek.inclusions?.map((item, idx) => (
                      <li key={idx} className="text-gray-600">{item}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-4">Exclusions</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {selectedTrek.exclusions?.map((item, idx) => (
                      <li key={idx} className="text-gray-600">{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-semibold mb-4">Meeting Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Meeting Point</h4>
                    <p>{selectedTrek.meetingPoint || 'Not specified'}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Meeting Time</h4>
                    <p>{selectedTrek.meetingTime || 'Not specified'}</p>
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

export default AdminTreks;
