import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Edit,
  Map,
  Save,
  Trash2,
  Upload,
  MapPin,
  Plus,
  X,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

const EditTrek = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("basic");
  const [saving, setSaving] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [stageCount, setStageCount] = useState(1);

  // Basic Trek Details
  const [trekDetails, setTrekDetails] = useState({
    name: "",
    description: "",
    destination: "",
    duration: "3D/2N",
    price: "",
    difficulty: "moderate",
    slots: 10,
    startDate: "",
    status: "draft",
    itinerary: [
      { activities: [] },
      { activities: [] },
      { activities: [] }
    ],
    inclusions: [],
    exclusions: [],
    resorts: [],
    serviceDays: Array(31).fill(false),
    route: [],
    images: [],
    trekType: "adventure",
    category: "mountain",
    recurringDays: Array(7).fill(false),
    uploadedImages: [],
    cancellationPolicies: [
      { id: 1, name: "Standard Policy", description: "Full refund if cancelled 7 days before the trek" },
      { id: 2, name: "Flexible Policy", description: "Full refund if cancelled 3 days before the trek" },
      { id: 3, name: "Strict Policy", description: "No refunds for cancellations" }
    ]
  });

  // Load trek data on component mount
  useEffect(() => {
    if (id) {
      const treksJson = localStorage.getItem('vendorTreks');
      if (treksJson) {
        const treks = JSON.parse(treksJson);
        const trek = treks.find((t) => t.id === parseInt(id));
        if (trek) {
          // Ensure the structure is correct
          const formattedTrek = {
            ...trek,
            slots: typeof trek.slots === 'object' ? trek.slots : { total: trek.slots, booked: 0 },
            itinerary: trek.itinerary || [{ activities: [] }, { activities: [] }, { activities: [] }],
            inclusions: trek.inclusions || [],
            exclusions: trek.exclusions || [],
            resorts: trek.resorts || [],
            serviceDays: trek.serviceDays || Array(31).fill(false),
            route: trek.route || [],
            recurringDays: trek.recurringDays || Array(7).fill(false),
            uploadedImages: [],
            cancellationPolicies: trek.cancellationPolicies || [
              { id: 1, name: "Standard Policy", description: "Full refund if cancelled 7 days before the trek" },
              { id: 2, name: "Flexible Policy", description: "Full refund if cancelled 3 days before the trek" },
              { id: 3, name: "Strict Policy", description: "No refunds for cancellations" }
            ]
          };
          setTrekDetails(formattedTrek);
          
          // Set the initial stage count based on existing routes
          if (formattedTrek.route && formattedTrek.route.length > 0) {
            setStageCount(formattedTrek.route.length);
          }
        } else {
          toast.error("Trek not found!");
          navigate("/vendor/treks");
        }
      }
    }
  }, [id, navigate]);

  // Handle basic info changes
  const handleBasicInfoChange = (e) => {
    const { name, value } = e.target;
    setTrekDetails({ ...trekDetails, [name]: value });
  };

  // Handle itinerary changes for a specific day
  const handleItineraryChange = (day, activities) => {
    const newItinerary = [...trekDetails.itinerary];
    if (!newItinerary[day - 1]) {
      newItinerary[day - 1] = { activities: [] };
    }
    newItinerary[day - 1].activities = activities.split('\n').filter(item => item.trim() !== '');
    setTrekDetails({ ...trekDetails, itinerary: newItinerary });
  };

  // Add new activity day
  const addActivityDay = () => {
    const newItinerary = [...trekDetails.itinerary];
    newItinerary.push({ activities: [] });
    setTrekDetails({ ...trekDetails, itinerary: newItinerary });
  };

  // Handle inclusions changes
  const handleInclusionsChange = (text) => {
    setTrekDetails({
      ...trekDetails,
      inclusions: text.split('\n').filter(item => item.trim() !== '')
    });
  };

  // Handle exclusions changes
  const handleExclusionsChange = (text) => {
    setTrekDetails({
      ...trekDetails,
      exclusions: text.split('\n').filter(item => item.trim() !== '')
    });
  };

  // Add inclusion
  const addInclusion = (e) => {
    // Prevent form submission
    e.preventDefault();
    e.stopPropagation();
    
    const newInclusions = [...trekDetails.inclusions, ""];
    setTrekDetails({ ...trekDetails, inclusions: newInclusions });
  };

  // Add exclusion
  const addExclusion = (e) => {
    // Prevent form submission
    e.preventDefault();
    e.stopPropagation();
    
    const newExclusions = [...trekDetails.exclusions, ""];
    setTrekDetails({ ...trekDetails, exclusions: newExclusions });
  };

  // Update inclusion
  const updateInclusion = (index, value) => {
    const newInclusions = [...trekDetails.inclusions];
    newInclusions[index] = value;
    setTrekDetails({ ...trekDetails, inclusions: newInclusions });
  };

  // Update exclusion
  const updateExclusion = (index, value) => {
    const newExclusions = [...trekDetails.exclusions];
    newExclusions[index] = value;
    setTrekDetails({ ...trekDetails, exclusions: newExclusions });
  };

  // Handle resort changes
  const handleResortChange = (index, field, value) => {
    const newResorts = [...trekDetails.resorts];
    if (!newResorts[index]) {
      newResorts[index] = { day: index + 1, name: '', location: '', mapLink: '', image: null };
    }
    newResorts[index] = { ...newResorts[index], [field]: value };
    setTrekDetails({ ...trekDetails, resorts: newResorts });
  };

  // Add a new resort
  const addResort = () => {
    const newResorts = [...trekDetails.resorts];
    newResorts.push({
      day: newResorts.length + 1,
      name: '',
      location: '',
      mapLink: '',
      image: null
    });
    setTrekDetails({ ...trekDetails, resorts: newResorts });
  };

  // Toggle service day
  const toggleServiceDay = (dayIndex) => {
    const newServiceDays = [...trekDetails.serviceDays];
    newServiceDays[dayIndex] = !newServiceDays[dayIndex];
    setTrekDetails({ ...trekDetails, serviceDays: newServiceDays });
  };

  // Handle route changes
  const handleRouteChange = (index, field, value) => {
    const newRoute = [...trekDetails.route];
    if (!newRoute[index]) {
      newRoute[index] = { 
        stage: index + 1, 
        departure: '', 
        destination: '', 
        arrivalTime: '',
        transportation: ''
      };
    }
    newRoute[index] = { ...newRoute[index], [field]: value };
    setTrekDetails({ ...trekDetails, route: newRoute });
  };

  // Add multiple route stages based on input count
  const addMultipleRouteStages = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (stageCount <= 0) {
      toast.error("Please enter a valid number of stages");
      return;
    }
    
    // Create new route array with the specified number of stages
    const newRoute = [];
    
    // Keep existing stages if any
    for (let i = 0; i < trekDetails.route.length; i++) {
      newRoute.push(trekDetails.route[i]);
    }
    
    // Add new stages as needed
    for (let i = trekDetails.route.length; i < stageCount; i++) {
      newRoute.push({
        stage: i + 1,
        departure: '',
        destination: '',
        arrivalTime: '',
        transportation: ''
      });
    }
    
    setTrekDetails({ ...trekDetails, route: newRoute });
    setStageCount(newRoute.length);
  };

  // Add a new route stage
  const addRouteStage = () => {
    const newRoute = [...trekDetails.route];
    newRoute.push({
      stage: newRoute.length + 1,
      departure: '',
      destination: '',
      arrivalTime: '',
      transportation: ''
    });
    setTrekDetails({ ...trekDetails, route: newRoute });
    setStageCount(newRoute.length);
  };
  
  // Add a new cancellation policy
  const addCancellationPolicy = (e) => {
    // Prevent form submission
    e.preventDefault();
    e.stopPropagation();
    
    const policies = trekDetails.cancellationPolicies || [];
    const newPolicies = [
      ...policies,
      {
        id: policies.length + 1,
        name: `Custom Policy ${policies.length + 1}`,
        description: ""
      }
    ];
    
    setTrekDetails({ ...trekDetails, cancellationPolicies: newPolicies });
  };
  
  // Update cancellation policy
  const updateCancellationPolicy = (index, field, value) => {
    const policies = [...(trekDetails.cancellationPolicies || [])];
    policies[index] = { ...policies[index], [field]: value };
    setTrekDetails({ ...trekDetails, cancellationPolicies: policies });
  };
  
  // Remove cancellation policy
  const removeCancellationPolicy = (index) => {
    const policies = [...(trekDetails.cancellationPolicies || [])];
    policies.splice(index, 1);
    setTrekDetails({ ...trekDetails, cancellationPolicies: policies });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      // Get existing treks from localStorage
      const existingTreksJson = localStorage.getItem('vendorTreks');
      const existingTreks = existingTreksJson ? JSON.parse(existingTreksJson) : [];
      
      // Find the index of the trek to update
      const trekIndex = existingTreks.findIndex((t) => t.id === parseInt(id));
      
      if (trekIndex !== -1) {
        // Prepare the updated trek
        const updatedTrek = {
          ...trekDetails,
          id: parseInt(id),
          slots: typeof trekDetails.slots === 'object' ? trekDetails.slots : { total: trekDetails.slots || 0, booked: 0 },
        };
        
        // Update the trek in the array
        existingTreks[trekIndex] = updatedTrek;
        
        // Save updated treks array back to localStorage
        localStorage.setItem('vendorTreks', JSON.stringify(existingTreks));
        
        // Show success message and navigate back to treks page
        toast.success("Trek updated successfully!");
        navigate("/vendor/treks");
      } else {
        toast.error("Trek not found!");
      }
      
      setSaving(false);
    } catch (error) {
      console.error("Error updating trek:", error);
      toast.error("Failed to update trek. Please try again.");
      setSaving(false);
    }
  };

  const nextStep = () => {
    if (currentStep < 12) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Steps content based on the uploaded screenshots
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Step 1: Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name">Trek Name *</Label>
                <Input 
                  id="name" 
                  name="name" 
                  value={trekDetails.name} 
                  onChange={handleBasicInfoChange} 
                  placeholder="Enter trek name"
                  className="mt-1"
                  required 
                />
              </div>
              <div>
                <Label htmlFor="destination">Destination *</Label>
                <Input 
                  id="destination" 
                  name="destination" 
                  value={trekDetails.destination} 
                  onChange={handleBasicInfoChange} 
                  placeholder="Enter destination"
                  className="mt-1"
                  required 
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea 
                  id="description" 
                  name="description" 
                  value={trekDetails.description} 
                  onChange={handleBasicInfoChange} 
                  placeholder="Enter trek description"
                  rows={5}
                  className="mt-1"
                  required 
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Step 2: Trek Type & Category</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="trekType">Trek Type *</Label>
                <Select 
                  value={trekDetails.trekType || "adventure"} 
                  onValueChange={(value) => setTrekDetails({...trekDetails, trekType: value})}
                >
                  <SelectTrigger id="trekType" className="mt-1">
                    <SelectValue placeholder="Select trek type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="adventure">Adventure</SelectItem>
                    <SelectItem value="leisure">Leisure</SelectItem>
                    <SelectItem value="pilgrimage">Pilgrimage</SelectItem>
                    <SelectItem value="wildlife">Wildlife</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="category">Category *</Label>
                <Select 
                  value={trekDetails.category || "mountain"} 
                  onValueChange={(value) => setTrekDetails({...trekDetails, category: value})}
                >
                  <SelectTrigger id="category" className="mt-1">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mountain">Mountain</SelectItem>
                    <SelectItem value="beach">Beach</SelectItem>
                    <SelectItem value="forest">Forest</SelectItem>
                    <SelectItem value="waterfall">Waterfall</SelectItem>
                    <SelectItem value="desert">Desert</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Step 3: Duration & Difficulty</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="duration">Duration *</Label>
                <Select 
                  value={trekDetails.duration} 
                  onValueChange={(value) => setTrekDetails({...trekDetails, duration: value})}
                >
                  <SelectTrigger id="duration" className="mt-1">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1D">1 Day</SelectItem>
                    <SelectItem value="2D/1N">2 Days, 1 Night</SelectItem>
                    <SelectItem value="3D/2N">3 Days, 2 Nights</SelectItem>
                    <SelectItem value="4D/3N">4 Days, 3 Nights</SelectItem>
                    <SelectItem value="5D/4N">5 Days, 4 Nights</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="difficulty">Difficulty Level *</Label>
                <Select 
                  value={trekDetails.difficulty} 
                  onValueChange={(value) => setTrekDetails({...trekDetails, difficulty: value})}
                >
                  <SelectTrigger id="difficulty" className="mt-1">
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="challenging">Challenging</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Step 4: Trek Stages</h3>
            
            {/* Add multiple stages based on input */}
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex-grow max-w-xs">
                <Label htmlFor="stageCount">Number of Stages</Label>
                <Input 
                  id="stageCount" 
                  type="number" 
                  min="1" 
                  value={stageCount} 
                  onChange={(e) => setStageCount(parseInt(e.target.value) || 1)}
                  className="mt-1"
                />
              </div>
              <div className="pt-6">
                <Button 
                  type="button" 
                  onClick={addMultipleRouteStages}
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  Generate Stages
                </Button>
              </div>
            </div>
            
            <div className="space-y-6">
              {trekDetails.route.map((stage, index) => (
                <div key={index} className="border border-gray-200 rounded-md p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Stage {stage.stage}</h4>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon" className="text-red-500" onClick={() => {
                        const newRoute = [...trekDetails.route];
                        newRoute.splice(index, 1);
                        setTrekDetails({...trekDetails, route: newRoute});
                        setStageCount(newRoute.length);
                      }}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`stage-departure-${index}`}>Departure Location</Label>
                      <Input 
                        id={`stage-departure-${index}`}
                        value={stage.departure}
                        onChange={(e) => handleRouteChange(index, 'departure', e.target.value)}
                        placeholder="Enter departure location"
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor={`stage-destination-${index}`}>Destination</Label>
                      <Input 
                        id={`stage-destination-${index}`}
                        value={stage.destination}
                        onChange={(e) => handleRouteChange(index, 'destination', e.target.value)}
                        placeholder="Enter destination"
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor={`stage-arrivalTime-${index}`}>Arrival Time</Label>
                      <Input 
                        id={`stage-arrivalTime-${index}`}
                        value={stage.arrivalTime}
                        onChange={(e) => handleRouteChange(index, 'arrivalTime', e.target.value)}
                        placeholder="Enter arrival time"
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor={`stage-transportation-${index}`}>Transportation</Label>
                      <Select
                        value={stage.transportation}
                        onValueChange={(value) => handleRouteChange(index, 'transportation', value)}
                      >
                        <SelectTrigger id={`stage-transportation-${index}`} className="mt-1">
                          <SelectValue placeholder="Select transportation" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bus">Bus</SelectItem>
                          <SelectItem value="car">Car</SelectItem>
                          <SelectItem value="train">Train</SelectItem>
                          <SelectItem value="flight">Flight</SelectItem>
                          <SelectItem value="bike">Bike</SelectItem>
                          <SelectItem value="walking">Walking</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              ))}
              
              <Button 
                type="button" 
                variant="outline" 
                onClick={addRouteStage} 
                className="flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Stage
              </Button>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Step 5: Pricing</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="price">Price per Person (₹) *</Label>
                <Input 
                  id="price" 
                  name="price" 
                  type="number" 
                  value={trekDetails.price} 
                  onChange={handleBasicInfoChange} 
                  placeholder="0"
                  className="mt-1"
                  required 
                />
              </div>
              <div>
                <Label htmlFor="slots">Total Slots *</Label>
                <Input 
                  id="slots" 
                  name="slots" 
                  type="number" 
                  value={typeof trekDetails.slots === 'number' ? trekDetails.slots : trekDetails.slots.total} 
                  onChange={(e) => {
                    const slotsValue = parseInt(e.target.value);
                    setTrekDetails({
                      ...trekDetails, 
                      slots: typeof trekDetails.slots === 'object' 
                        ? { ...trekDetails.slots, total: slotsValue }
                        : slotsValue
                    });
                  }} 
                  placeholder="0"
                  className="mt-1"
                  required 
                />
              </div>
              <div>
                <Label htmlFor="groupDiscount">Group Discount (%)</Label>
                <Input 
                  id="groupDiscount" 
                  name="groupDiscount" 
                  type="number" 
                  value={trekDetails.groupDiscount || ""} 
                  onChange={(e) => setTrekDetails({...trekDetails, groupDiscount: e.target.value})} 
                  placeholder="0"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="minGroupSize">Minimum Group Size</Label>
                <Input 
                  id="minGroupSize" 
                  name="minGroupSize" 
                  type="number" 
                  value={trekDetails.minGroupSize || ""} 
                  onChange={(e) => setTrekDetails({...trekDetails, minGroupSize: e.target.value})} 
                  placeholder="0"
                  className="mt-1"
                />
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Step 6: Dates & Availability</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="startDate">Start Date *</Label>
                <Input 
                  id="startDate" 
                  name="startDate" 
                  type="date" 
                  value={trekDetails.startDate} 
                  onChange={handleBasicInfoChange}
                  className="mt-1"
                  required 
                />
              </div>
              <div>
                <Label htmlFor="endDate">End Date</Label>
                <Input 
                  id="endDate" 
                  name="endDate" 
                  type="date" 
                  value={trekDetails.endDate || ""} 
                  onChange={(e) => setTrekDetails({...trekDetails, endDate: e.target.value})}
                  className="mt-1"
                />
              </div>
              <div className="col-span-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="recurring" 
                    checked={trekDetails.recurring || false}
                    onCheckedChange={(checked) => setTrekDetails({...trekDetails, recurring: checked === true})}
                  />
                  <Label htmlFor="recurring">This is a recurring trek</Label>
                </div>
              </div>
              {trekDetails.recurring && (
                <div className="col-span-2 border p-4 rounded-md space-y-4">
                  <h4 className="font-medium">Recurring Schedule</h4>
                  <div className="grid grid-cols-7 gap-2">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, idx) => (
                      <div key={day} className="text-center">
                        <div className="mb-2">{day}</div>
                        <div 
                          className={`h-10 w-10 rounded-full mx-auto flex items-center justify-center cursor-pointer ${
                            trekDetails.recurringDays?.[idx] ? 'bg-green-500 text-white' : 'bg-gray-100'
                          }`}
                          onClick={() => {
                            const newDays = [...(trekDetails.recurringDays || Array(7).fill(false))];
                            newDays[idx] = !newDays[idx];
                            setTrekDetails({...trekDetails, recurringDays: newDays});
                          }}
                        >
                          {trekDetails.recurringDays?.[idx] && <Check className="h-5 w-5" />}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
        
      case 7:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Step 7: Itinerary</h3>
            <div className="space-y-4">
              {trekDetails.itinerary.map((day, index) => (
                <div key={index} className="border border-gray-200 rounded-md p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Day {index + 1} Activity</h4>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="text-red-500"
                        onClick={(e) => {
                          e.preventDefault();
                          const newItinerary = [...trekDetails.itinerary];
                          newItinerary.splice(index, 1);
                          setTrekDetails({...trekDetails, itinerary: newItinerary});
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Textarea 
                    placeholder={`Enter Day ${index + 1} activities, one per line`}
                    rows={5}
                    onChange={(e) => handleItineraryChange(index + 1, e.target.value)}
                    value={day.activities.join('\n') || ''}
                  />
                  <Button 
                    type="button" 
                    size="sm" 
                    variant="outline" 
                    onClick={(e) => {
                      e.preventDefault();
                      const newItinerary = [...trekDetails.itinerary];
                      newItinerary[index].activities.push("");
                      setTrekDetails({...trekDetails, itinerary: newItinerary});
                    }}
                    className="flex items-center mt-2"
                  >
                    <Plus className="h-3 w-3 mr-1" /> Add Activity
                  </Button>
                </div>
              ))}
              <Button 
                type="button" 
                variant="outline" 
                onClick={addActivityDay}
                className="flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" /> Add Day
              </Button>
            </div>
          </div>
        );
        
      case 8:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Step 8: Inclusions & Exclusions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label htmlFor="inclusions">Inclusions</Label>
                  <Button 
                    type="button" 
                    size="sm" 
                    variant="outline" 
                    onClick={addInclusion} 
                    className="flex items-center"
                  >
                    <Plus className="h-3 w-3 mr-1" /> Add
                  </Button>
                </div>
                <div className="space-y-2">
                  {trekDetails.inclusions.map((inclusion, index) => (
                    <div key={index} className="flex gap-2">
                      <Input 
                        value={inclusion}
                        onChange={(e) => updateInclusion(index, e.target.value)}
                        placeholder={`Inclusion ${index + 1}`}
                      />
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="icon" 
                        className="text-red-500"
                        onClick={(e) => {
                          e.preventDefault();
                          const newInclusions = [...trekDetails.inclusions];
                          newInclusions.splice(index, 1);
                          setTrekDetails({...trekDetails, inclusions: newInclusions});
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  {trekDetails.inclusions.length === 0 && (
                    <p className="text-sm text-gray-500">No inclusions added. Click Add to include items.</p>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-2">Example: Food, Accommodation, Guide services</p>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label htmlFor="exclusions">Exclusions</Label>
                  <Button 
                    type="button" 
                    size="sm" 
                    variant="outline" 
                    onClick={addExclusion} 
                    className="flex items-center"
                  >
                    <Plus className="h-3 w-3 mr-1" /> Add
                  </Button>
                </div>
                <div className="space-y-2">
                  {trekDetails.exclusions.map((exclusion, index) => (
                    <div key={index} className="flex gap-2">
                      <Input 
                        value={exclusion}
                        onChange={(e) => updateExclusion(index, e.target.value)}
                        placeholder={`Exclusion ${index + 1}`}
                      />
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="icon" 
                        className="text-red-500"
                        onClick={(e) => {
                          e.preventDefault();
                          const newExclusions = [...trekDetails.exclusions];
                          newExclusions.splice(index, 1);
                          setTrekDetails({...trekDetails, exclusions: newExclusions});
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  {trekDetails.exclusions.length === 0 && (
                    <p className="text-sm text-gray-500">No exclusions added. Click Add to include items.</p>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-2">Example: Personal expenses, Travel insurance</p>
              </div>
            </div>
          </div>
        );
        
      case 9:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Step 9: Meeting Point</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="meetingPoint">Meeting Point Name *</Label>
                <Input 
                  id="meetingPoint" 
                  value={trekDetails.meetingPoint || ""} 
                  onChange={(e) => setTrekDetails({...trekDetails, meetingPoint: e.target.value})}
                  placeholder="Enter meeting point"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="meetingTime">Meeting Time *</Label>
                <Input 
                  id="meetingTime" 
                  type="time"
                  value={trekDetails.meetingTime || ""} 
                  onChange={(e) => setTrekDetails({...trekDetails, meetingTime: e.target.value})}
                  className="mt-1"
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="meetingPointLocation">Location Details</Label>
                <Textarea 
                  id="meetingPointLocation"
                  placeholder="Provide clear directions to the meeting point"
                  rows={4}
                  value={trekDetails.meetingPointLocation || ""}
                  onChange={(e) => setTrekDetails({...trekDetails, meetingPointLocation: e.target.value})}
                  className="mt-1"
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="googleMapsLink">Google Maps Link</Label>
                <Input 
                  id="googleMapsLink" 
                  value={trekDetails.googleMapsLink || ""} 
                  onChange={(e) => setTrekDetails({...trekDetails, googleMapsLink: e.target.value})}
                  placeholder="Paste Google Maps link here"
                  className="mt-1"
                />
              </div>
            </div>
          </div>
        );
        
      case 10:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Step 10: Accommodation</h3>
            <div className="space-y-8">
              {trekDetails.resorts.map((resort, index) => (
                <div key={index} className="border border-gray-200 rounded-md p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Day {resort.day} Accommodation:</h4>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="text-red-500"
                        onClick={() => {
                          const newResorts = [...trekDetails.resorts];
                          newResorts.splice(index, 1);
                          setTrekDetails({...trekDetails, resorts: newResorts});
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`resort-name-${index}`}>Name:</Label>
                      <Input 
                        id={`resort-name-${index}`}
                        value={resort.name}
                        onChange={(e) => handleResortChange(index, 'name', e.target.value)}
                        placeholder="Accommodation name"
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor={`resort-location-${index}`}>Location:</Label>
                      <Input 
                        id={`resort-location-${index}`}
                        value={resort.location}
                        onChange={(e) => handleResortChange(index, 'location', e.target.value)}
                        placeholder="Accommodation location"
                        className="mt-1"
                      />
                    </div>
                    
                    <div className="col-span-2">
                      <Label htmlFor={`resort-map-${index}`}>Google Maps:</Label>
                      <Input 
                        id={`resort-map-${index}`}
                        value={resort.mapLink}
                        onChange={(e) => handleResortChange(index, 'mapLink', e.target.value)}
                        placeholder="Google Maps link"
                        className="mt-1"
                      />
                    </div>
                    
                    <div className="col-span-2">
                      <Label>Accommodation Image</Label>
                      <div className="flex items-center space-x-4 mt-1">
                        <Button variant="outline">
                          Select
                        </Button>
                        <span className="text-sm text-gray-500">No file selected</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <Button 
                type="button" 
                variant="outline" 
                onClick={addResort} 
                className="flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Accommodation
              </Button>
            </div>
          </div>
        );

      case 11:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Step 11: Trek Images</h3>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center justify-center h-32 w-32 border-2 border-dashed border-gray-300 rounded-md">
                  <Button variant="ghost" className="flex flex-col items-center">
                    <Upload className="h-6 w-6 mb-2" />
                    <span className="text-xs">Add Image</span>
                  </Button>
                </div>
                {(trekDetails.uploadedImages || []).map((image, index) => (
                  <div key={index} className="relative h-32 w-32 bg-gray-100 rounded-md flex items-center justify-center">
                    <span>{image.name}</span>
                    <Button 
                      variant="destructive" 
                      size="icon" 
                      className="absolute top-1 right-1 h-5 w-5"
                      onClick={() => {
                        const newImages = [...(trekDetails.uploadedImages || [])];
                        newImages.splice(index, 1);
                        setTrekDetails({...trekDetails, uploadedImages: newImages});
                      }}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-500">Upload high-quality images of the trek. Maximum file size: 2MB per image.</p>
            </div>
            
            <div className="space-y-4">
              <Label htmlFor="featuredImage">Featured Image</Label>
              <div className="flex items-center space-x-4">
                <Button variant="outline">
                  Select Featured Image
                </Button>
                <span className="text-sm text-gray-500">No file selected</span>
              </div>
              <p className="text-sm text-gray-500">This image will be displayed as the main image for your trek.</p>
            </div>
          </div>
        );

      case 12:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Step 12: Cancellation Policy</h3>
            
            <div>
              <Label htmlFor="cancellation-policy">Cancellation Policy for the Service:</Label>
              <Select 
                value={trekDetails.cancellationPolicy || "standard"}
                onValueChange={(value) => setTrekDetails({...trekDetails, cancellationPolicy: value})}
              >
                <SelectTrigger id="cancellation-policy" className="mt-1">
                  <SelectValue placeholder="Select policy" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">STANDARD AORBO</SelectItem>
                  <SelectItem value="flexible">FLEXIBLE</SelectItem>
                  <SelectItem value="strict">STRICT</SelectItem>
                  <SelectItem value="custom">Custom Policy</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="border border-gray-200 rounded-md p-6">
              <h4 className="font-medium mb-4">STANDARD AORBO <span className="text-sm font-normal text-gray-500">PREVIEW</span></h4>
              
              <div className="relative pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-center">
                    <div className="text-sm font-medium">0% Cancellation</div>
                    <div className="text-sm">100% Refund</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium">25% Cancellation</div>
                    <div className="text-sm">75% Refund</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium">50% Cancellation</div>
                    <div className="text-sm">50% Refund</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium">100% Cancellation</div>
                    <div className="text-sm">0% Refund</div>
                  </div>
                </div>
                
                <div className="h-2 bg-blue-200 rounded-full">
                  <div className="h-2 bg-blue-500 rounded-full w-1/4"></div>
                </div>
                
                <div className="flex items-center justify-between mt-2">
                  <div className="text-center text-sm">Issue day</div>
                  <div className="text-center text-sm">3 days</div>
                  <div className="text-center text-sm">1 day</div>
                  <div className="text-center text-sm">12 hours</div>
                  <div className="text-center text-sm">Departure time</div>
                </div>
              </div>
            </div>
            
            {trekDetails.cancellationPolicy === 'custom' && (
              <div className="border border-gray-200 rounded-md p-4 mt-4 space-y-4">
                <h4 className="font-medium">Custom Cancellation Policy</h4>
                <Textarea 
                  placeholder="Enter your custom cancellation policy here"
                  rows={6}
                  value={trekDetails.customCancellationPolicy || ""}
                  onChange={(e) => setTrekDetails({...trekDetails, customCancellationPolicy: e.target.value})}
                />
              </div>
            )}
            
            {/* Multiple Cancellation Policies */}
            <div className="mt-6">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium">Additional Cancellation Policies</h4>
                <Button 
                  type="button" 
                  size="sm" 
                  variant="outline" 
                  onClick={addCancellationPolicy}
                  className="flex items-center"
                >
                  <Plus className="h-3 w-3 mr-1" /> Add Policy
                </Button>
              </div>
              
              <div className="space-y-4 mt-4">
                {(trekDetails.cancellationPolicies || []).map((policy, index) => (
                  <div key={index} className="border border-gray-200 rounded-md p-4">
                    <div className="flex justify-between items-center mb-2">
                      <Label htmlFor={`policy-name-${index}`}>Policy Name</Label>
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="icon" 
                        className="text-red-500"
                        onClick={(e) => {
                          e.preventDefault();
                          removeCancellationPolicy(index);
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <Input 
                      id={`policy-name-${index}`}
                      value={policy.name}
                      onChange={(e) => updateCancellationPolicy(index, 'name', e.target.value)}
                      className="mb-3"
                    />
                    
                    <Label htmlFor={`policy-description-${index}`}>Description</Label>
                    <Textarea 
                      id={`policy-description-${index}`}
                      value={policy.description}
                      onChange={(e) => updateCancellationPolicy(index, 'description', e.target.value)}
                      rows={3}
                      className="mt-1"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return <div>Unknown step</div>;
    }
  };

  // Progress indicator
  const stepTitles = [
    "Basic Info",
    "Trek Type",
    "Duration",
    "Trek Stages",
    "Pricing",
    "Dates",
    "Itinerary",
    "Inclusions",
    "Meeting Point",
    "Accommodation",
    "Images",
    "Cancellation",
  ];

  return (
    <div className="pb-12">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/vendor/treks')}
          className="mr-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h1 className="text-2xl font-bold">Edit Trek: {trekDetails.name}</h1>
      </div>

      {/* Progress indicator */}
      <div className="mb-8">
        <div className="hidden md:flex justify-between items-center mb-2">
          {stepTitles.map((title, index) => (
            <div 
              key={index} 
              className={`flex flex-col items-center ${
                index === 0 ? 'flex-grow-0' : index === stepTitles.length - 1 ? 'flex-grow-0' : 'flex-grow'
              }`}
              style={{ maxWidth: '100px' }}
            >
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                  currentStep > index + 1 ? 'bg-green-500 text-white' : 
                  currentStep === index + 1 ? 'bg-blue-500 text-white' : 
                  'bg-gray-200 text-gray-500'
                }`}
              >
                {currentStep > index + 1 ? (
                  <Check className="h-4 w-4" />
                ) : (
                  index + 1
                )}
              </div>
              <span className="text-xs text-center truncate w-full">{title}</span>
            </div>
          ))}
        </div>
        <div className="md:hidden text-center mb-2">
          Step {currentStep} of {stepTitles.length}: {stepTitles[currentStep - 1]}
        </div>
        <div className="relative">
          <div className="absolute top-0 h-1 bg-gray-200 w-full"></div>
          <div 
            className="absolute top-0 h-1 bg-blue-500 transition-all" 
            style={{ width: `${((currentStep - 1) / (stepTitles.length - 1)) * 100}%` }}
          ></div>
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit}>
            {renderStepContent()}
            
            <div className="mt-8 flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
              >
                Previous
              </Button>
              
              {currentStep < stepTitles.length ? (
                <Button 
                  type="button"
                  onClick={nextStep}
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  Next
                </Button>
              ) : (
                <Button 
                  type="submit"
                  disabled={saving}
                  className="bg-green-500 hover:bg-green-600"
                >
                  {saving ? 'Saving...' : 'Update Trek'}
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditTrek;
