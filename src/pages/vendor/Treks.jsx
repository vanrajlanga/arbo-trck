import { useState, useEffect } from 'react';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import { 
  Plus, 
  Search, 
  Filter, 
  Calendar, 
  MapPin,
  DollarSign,
  Users,
  Edit,
  Trash2,
  Eye,
  Settings,
  List,
  Grid,
  CheckCircle2,
  XCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

const Treks = () => {
  const navigate = useNavigate();
  const [treks, setTreks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewMode, setViewMode] = useState('grid');
  const [selectedTrek, setSelectedTrek] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  useEffect(() => {
    // Load treks from localStorage
    const savedTreks = localStorage.getItem('vendorTreks');
    
    if (savedTreks) {
      setTreks(JSON.parse(savedTreks));
    } else {
      // If no treks exist in localStorage, create sample data
      const sampleTreks = [
        {
          id: 1,
          name: "Himalayan Adventure",
          description: "Experience the beauty of Himalayas with our guided trek.",
          destination: "Himachal Pradesh",
          duration: "3D/2N",
          price: "5000",
          difficulty: "moderate",
          slots: {
            total: 20,
            booked: 5
          },
          startDate: "2025-06-15",
          status: "active",
          images: ["trek1.jpg"],
          itinerary: [
            { activities: ["Morning hike to basecamp", "Lunch at mountain view point", "Evening campfire"] },
            { activities: ["Trek to summit", "Photography session", "Return to basecamp"] },
            { activities: ["Morning yoga", "Return journey", "Departure"] }
          ],
          inclusions: ["Food", "Accommodation", "Guide services"],
          exclusions: ["Personal expenses", "Travel insurance"],
          meetingPoint: "Manali Bus Stand",
          meetingTime: "08:00"
        },
        {
          id: 2,
          name: "Valley Trek",
          description: "A serene trek through beautiful valleys and meadows.",
          destination: "Uttarakhand",
          duration: "2D/1N",
          price: "3000",
          difficulty: "easy",
          slots: {
            total: 15,
            booked: 2
          },
          startDate: "2025-06-20",
          status: "draft",
          images: ["trek2.jpg"],
          itinerary: [
            { activities: ["Arrival and briefing", "Short hike to viewpoint", "Evening bonfire"] },
            { activities: ["Morning trek", "Lunch at valley view", "Return journey"] }
          ],
          inclusions: ["Food", "Tent accommodation", "First aid kit"],
          exclusions: ["Personal expenses", "Travel insurance", "Additional activities"],
          meetingPoint: "Dehradun Railway Station",
          meetingTime: "07:30"
        }
      ];
      
      setTreks(sampleTreks);
      localStorage.setItem('vendorTreks', JSON.stringify(sampleTreks));
    }
    
    setLoading(false);
  }, []);

  // Filter treks based on search term and status
  const filteredTreks = treks.filter(trek => {
    const matchesSearch = 
      trek.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      trek.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trek.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || trek.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Handle trek deletion
  const handleDeleteTrek = (customerId) => {
    if (!selectedTrek) return;
    
    const updatedTreks = treks.filter(trek => trek.id !== selectedTrek.id);
    localStorage.setItem('vendorTreks', JSON.stringify(updatedTreks));
    setTreks(updatedTreks);
    setSelectedTrek(null);
    setIsDeleteDialogOpen(false);
    toast.success("Trek deleted successfully!");
  };
  
  // Handle status toggle
  const handleStatusToggle = (trek) => {
    const newStatus = trek.status === 'active' ? 'draft' : 'active';
    const updatedTreks = treks.map(t => 
      t.id === trek.id ? {...t, status: newStatus} : t
    );
    
    localStorage.setItem('vendorTreks', JSON.stringify(updatedTreks));
    setTreks(updatedTreks);
    toast.success(`Trek ${newStatus === 'active' ? 'activated' : 'deactivated'} successfully!`);
  };

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
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Trek Management</h1>
        <Link to="/vendor/treks/create">
          <Button className="flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            Add New Trek
          </Button>
        </Link>
      </div>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative md:col-span-2">
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
            <div className="flex justify-end">
              <div className="flex items-center space-x-1 border rounded-md">
                <Button 
                  variant={viewMode === 'grid' ? 'secondary' : 'ghost'} 
                  size="sm" 
                  className="rounded-r-none" 
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button 
                  variant={viewMode === 'list' ? 'secondary' : 'ghost'} 
                  size="sm" 
                  className="rounded-l-none" 
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
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
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? (
                <div className="col-span-full text-center py-10">Loading treks...</div>
              ) : filteredTreks.length > 0 ? (
                filteredTreks.map((trek) => (
                  <TrekCard 
                    key={trek.id} 
                    trek={trek} 
                    getTrekImage={getTrekImage}
                    onEdit={() => navigate(`/vendor/treks/edit/${trek.id}`)}
                    onView={() => viewTrekDetails(trek)}
                    onDelete={() => {
                      setSelectedTrek(trek);
                      setIsDeleteDialogOpen(true);
                    }}
                    onToggleStatus={() => handleStatusToggle(trek)}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-10">
                  <MapPin className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-1">No treks found</h3>
                  <p className="text-gray-500 mb-4">There are no treks matching your filters.</p>
                  <Link to="/vendor/treks/create">
                    <Button>Create Your First Trek</Button>
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <TrekTable 
              treks={filteredTreks} 
              loading={loading} 
              onEdit={(trek) => navigate(`/vendor/treks/edit/${trek.id}`)}
              onView={(trek) => viewTrekDetails(trek)}
              onDelete={(trek) => {
                setSelectedTrek(trek);
                setIsDeleteDialogOpen(true);
              }}
              onToggleStatus={handleStatusToggle}
            />
          )}
        </TabsContent>

        <TabsContent value="active" className="mt-6">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? (
                <div className="col-span-full text-center py-10">Loading treks...</div>
              ) : filteredTreks.filter(trek => trek.status === 'active').length > 0 ? (
                filteredTreks
                  .filter(trek => trek.status === 'active')
                  .map((trek) => (
                    <TrekCard 
                      key={trek.id} 
                      trek={trek} 
                      getTrekImage={getTrekImage}
                      onEdit={() => navigate(`/vendor/treks/edit/${trek.id}`)}
                      onView={() => viewTrekDetails(trek)}
                      onDelete={() => {
                        setSelectedTrek(trek);
                        setIsDeleteDialogOpen(true);
                      }}
                      onToggleStatus={() => handleStatusToggle(trek)}
                    />
                  ))
              ) : (
                <div className="col-span-full text-center py-10">
                  <CheckCircle2 className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-1">No active treks</h3>
                  <p className="text-gray-500">Activate a trek or create a new one.</p>
                </div>
              )}
            </div>
          ) : (
            <TrekTable 
              treks={filteredTreks.filter(trek => trek.status === 'active')} 
              loading={loading} 
              onEdit={(trek) => navigate(`/vendor/treks/edit/${trek.id}`)}
              onView={(trek) => viewTrekDetails(trek)}
              onDelete={(trek) => {
                setSelectedTrek(trek);
                setIsDeleteDialogOpen(true);
              }}
              onToggleStatus={handleStatusToggle}
            />
          )}
        </TabsContent>

        <TabsContent value="draft" className="mt-6">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? (
                <div className="col-span-full text-center py-10">Loading treks...</div>
              ) : filteredTreks.filter(trek => trek.status === 'draft').length > 0 ? (
                filteredTreks
                  .filter(trek => trek.status === 'draft')
                  .map((trek) => (
                    <TrekCard 
                      key={trek.id} 
                      trek={trek} 
                      getTrekImage={getTrekImage}
                      onEdit={() => navigate(`/vendor/treks/edit/${trek.id}`)}
                      onView={() => viewTrekDetails(trek)}
                      onDelete={() => {
                        setSelectedTrek(trek);
                        setIsDeleteDialogOpen(true);
                      }}
                      onToggleStatus={() => handleStatusToggle(trek)}
                    />
                  ))
              ) : (
                <div className="col-span-full text-center py-10">
                  <XCircle className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-1">No draft treks</h3>
                  <p className="text-gray-500">All your treks are currently active.</p>
                </div>
              )}
            </div>
          ) : (
            <TrekTable 
              treks={filteredTreks.filter(trek => trek.status === 'draft')} 
              loading={loading} 
              onEdit={(trek) => navigate(`/vendor/treks/edit/${trek.id}`)}
              onView={(trek) => viewTrekDetails(trek)}
              onDelete={(trek) => {
                setSelectedTrek(trek);
                setIsDeleteDialogOpen(true);
              }}
              onToggleStatus={handleStatusToggle}
            />
          )}
        </TabsContent>
      </Tabs>

      {/* Delete Trek Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete the trek "{selectedTrek?.name}"? This action cannot be undone.</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteTrek}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
                  src={getTrekImage(selectedTrek.images?.[0])} 
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
                  <div className="flex items-center text-gray-500 text-sm mb-4">
                    <MapPin className="h-4 w-4 mr-1" /> {selectedTrek.destination}
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
              
              <div className="flex justify-end space-x-3 pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setIsViewDialogOpen(false);
                    navigate(`/vendor/treks/edit/${selectedTrek.id}`);
                  }}
                >
                  <Edit className="h-4 w-4 mr-2" /> Edit Trek
                </Button>
                <Button onClick={() => setIsViewDialogOpen(false)}>Close</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Trek Card Component
const TrekCard = ({ trek, getTrekImage, onEdit, onView, onDelete, onToggleStatus }) => {
  const firstImage = trek.images && trek.images.length > 0 ? trek.images[0] : undefined;
  
  return (
    <Card className="overflow-hidden">
      <div className="relative">
        <img 
          src={getTrekImage(firstImage)} 
          alt={trek.name} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2">
          <Badge className={trek.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
            {trek.status === 'active' ? 'Active' : 'Draft'}
          </Badge>
        </div>
      </div>
      <CardContent className="pt-6">
        <h3 className="text-lg font-semibold mb-1 truncate">{trek.name}</h3>
        <div className="flex items-center text-gray-500 text-sm mb-2">
          <MapPin className="h-4 w-4 mr-1" /> {trek.destination}
        </div>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{trek.description}</p>
        
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="flex flex-col items-center bg-gray-50 rounded-md p-2">
            <Calendar className="h-4 w-4 text-gray-500 mb-1" />
            <span className="text-xs text-gray-600">{trek.duration}</span>
          </div>
          <div className="flex flex-col items-center bg-gray-50 rounded-md p-2">
            <DollarSign className="h-4 w-4 text-gray-500 mb-1" />
            <span className="text-xs text-gray-600">₹{trek.price}</span>
          </div>
          <div className="flex flex-col items-center bg-gray-50 rounded-md p-2">
            <Users className="h-4 w-4 text-gray-500 mb-1" />
            <span className="text-xs text-gray-600">{trek.slots.booked}/{trek.slots.total}</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <Badge variant="outline" className="capitalize">{trek.difficulty}</Badge>
          <div className="flex space-x-1">
            <Button variant="ghost" size="icon" onClick={onView}>
              <Eye className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={onEdit}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={onToggleStatus}>
              {trek.status === 'active' ? <XCircle className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="icon" className="text-red-500" onClick={onDelete}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Trek Table Component
const TrekTable = ({ treks, loading, onEdit, onView, onDelete, onToggleStatus }) => {
  if (loading) {
    return <div className="text-center py-10">Loading treks...</div>;
  }

  if (treks.length === 0) {
    return (
      <div className="text-center py-10">
        <MapPin className="h-12 w-12 mx-auto text-gray-300 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-1">No treks found</h3>
        <p className="text-gray-500">There are no treks matching your filters.</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Destination</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Slots</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {treks.map((trek) => (
            <TableRow key={trek.id}>
              <TableCell className="font-medium">{trek.name}</TableCell>
              <TableCell>{trek.destination}</TableCell>
              <TableCell>{trek.duration}</TableCell>
              <TableCell>₹{trek.price}</TableCell>
              <TableCell>
                {trek.slots.booked}/{trek.slots.total}
              </TableCell>
              <TableCell>
                <Badge className={trek.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                  {trek.status === 'active' ? 'Active' : 'Draft'}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  <Button variant="ghost" size="icon" onClick={() => onView(trek)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => onEdit(trek)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => onToggleStatus(trek)}>
                    {trek.status === 'active' ? <XCircle className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
                  </Button>
                  <Button variant="ghost" size="icon" className="text-red-500" onClick={() => onDelete(trek)}>
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

export default Treks;
