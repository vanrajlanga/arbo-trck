import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, X, MapPin, ArrowLeft, ArrowRight, Save } from "lucide-react";
import DynamicItinerary from "@/components/trek/DynamicItinerary";
import DynamicAccommodation from "@/components/trek/DynamicAccommodation";
import ImageUpload from "@/components/trek/ImageUpload";

const CreateTrek = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState([]);
  const [currentStep, setCurrentStep] = useState("basic-info");
  
  const [trek, setTrek] = useState({
    name: '',
    destination: '',
    description: '',
    trekType: '',
    duration: '',
    durationDays: '',
    durationNights: '',
    price: '',
    difficulty: '',
    maxParticipants: '',
    startDate: '',
    endDate: '',
    cancellationPolicy: ''
  });

  const [trekStages, setTrekStages] = useState([]);
  const [inclusions, setInclusions] = useState([]);
  const [exclusions, setExclusions] = useState([]);
  const [meetingPoint, setMeetingPoint] = useState({
    id: '',
    cityId: '',
    cityName: '',
    locationDetails: '',
    time: ''
  });
  const [pickupPoints, setPickupPoints] = useState([]);
  const [policies, setPolicies] = useState([]);
  const [itinerary, setItinerary] = useState([]);
  const [accommodations, setAccommodations] = useState([]);
  const [images, setImages] = useState([]);

  // Load cities from localStorage on component mount
  useEffect(() => {
    const savedCities = localStorage.getItem('vendorCities');
    if (savedCities) {
      setCities(JSON.parse(savedCities));
    } else {
      // Default cities if none exist
      const defaultCities = [
        { id: "1", name: "Hyderabad", state: "Telangana" },
        { id: "2", name: "Warangal", state: "Telangana" },
        { id: "3", name: "Khammam", state: "Telangana" },
        { id: "4", name: "Vijayawada", state: "Andhra Pradesh" },
        { id: "5", name: "Visakhapatnam", state: "Andhra Pradesh" },
        { id: "6", name: "Guntur", state: "Andhra Pradesh" },
        { id: "7", name: "Chennai", state: "Tamil Nadu" },
        { id: "8", name: "Bangalore", state: "Karnataka" }
      ];
      setCities(defaultCities);
      localStorage.setItem('vendorCities', JSON.stringify(defaultCities));
    }

    // Initialize with default cancellation policy
    setPolicies([
      {
        id: 'default-cancellation',
        title: 'Cancellation Policy',
        description: 'Standard cancellation terms and conditions'
      }
    ]);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTrek(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name, value) => {
    setTrek(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Trek Stages functions
  const addTrekStage = () => {
    const newStage = {
      id: `stage-${Date.now()}`,
      name: '',
      description: '',
      distance: '',
      duration: ''
    };
    setTrekStages(prev => [...prev, newStage]);
  };

  const updateTrekStage = (index, field, value) => {
    setTrekStages(prev => prev.map((stage, i) => 
      i === index ? { ...stage, [field]: value } : stage
    ));
  };

  const removeTrekStage = (index) => {
    setTrekStages(prev => prev.filter((_, i) => i !== index));
  };

  // Inclusions functions
  const addInclusion = () => {
    const newInclusion = {
      id: `inclusion-${Date.now()}`,
      item: ''
    };
    setInclusions(prev => [...prev, newInclusion]);
  };

  const updateInclusion = (index, value) => {
    setInclusions(prev => prev.map((inclusion, i) => 
      i === index ? { ...inclusion, item: value } : inclusion
    ));
  };

  const removeInclusion = (index) => {
    setInclusions(prev => prev.filter((_, i) => i !== index));
  };

  // Exclusions functions
  const addExclusion = () => {
    const newExclusion = {
      id: `exclusion-${Date.now()}`,
      item: ''
    };
    setExclusions(prev => [...prev, newExclusion]);
  };

  const updateExclusion = (index, value) => {
    setExclusions(prev => prev.map((exclusion, i) => 
      i === index ? { ...exclusion, item: value } : exclusion
    ));
  };

  const removeExclusion = (index) => {
    setExclusions(prev => prev.filter((_, i) => i !== index));
  };

  // Meeting Point functions
  const updateMeetingPoint = (field, value) => {
    setMeetingPoint(prev => {
      const updated = { ...prev, [field]: value };
      // If cityId is being updated, also update cityName
      if (field === 'cityId') {
        const selectedCity = cities.find(city => city.id === value);
        if (selectedCity) {
          updated.cityName = selectedCity.name;
        }
      }
      return updated;
    });
  };

  // Pickup Points functions
  const addPickupPoint = () => {
    const newPickupPoint = {
      id: `pickup-${Date.now()}`,
      cityId: '',
      cityName: '',
      locationDetails: ''
    };
    setPickupPoints(prev => [...prev, newPickupPoint]);
  };

  const updatePickupPoint = (index, field, value) => {
    setPickupPoints(prev => prev.map((point, i) => {
      if (i === index) {
        const updatedPoint = { ...point, [field]: value };
        // If cityId is being updated, also update cityName
        if (field === 'cityId') {
          const selectedCity = cities.find(city => city.id === value);
          if (selectedCity) {
            updatedPoint.cityName = selectedCity.name;
          }
        }
        return updatedPoint;
      }
      return point;
    }));
  };

  const removePickupPoint = (index) => {
    setPickupPoints(prev => prev.filter((_, i) => i !== index));
  };

  // Policies functions
  const addPolicy = () => {
    const newPolicy = {
      id: `policy-${Date.now()}`,
      title: '',
      description: ''
    };
    setPolicies(prev => [...prev, newPolicy]);
  };

  const updatePolicy = (index, field, value) => {
    setPolicies(prev => prev.map((policy, i) => 
      i === index ? { ...policy, [field]: value } : policy
    ));
  };

  const removePolicy = (index) => {
    setPolicies(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate required fields
      if (!trek.name || !trek.destination || !trek.price || !trek.duration) {
        toast.error("Please fill in all required fields");
        return;
      }

      // Validate stages
      if (trekStages.length === 0) {
        toast.error("Please add at least one trek stage");
        return;
      }

      for (const stage of trekStages) {
        if (!stage.name || !stage.description) {
          toast.error("Please complete all trek stage details");
          return;
        }
      }

      // Validate inclusions and exclusions
      if (inclusions.length === 0) {
        toast.error("Please add at least one inclusion");
        return;
      }

      if (exclusions.length === 0) {
        toast.error("Please add at least one exclusion");
        return;
      }

      for (const inclusion of inclusions) {
        if (!inclusion.item) {
          toast.error("Please complete all inclusion items");
          return;
        }
      }

      for (const exclusion of exclusions) {
        if (!exclusion.item) {
          toast.error("Please complete all exclusion items");
          return;
        }
      }

      // Validate meeting point
      if (!meetingPoint.cityId || !meetingPoint.locationDetails || !meetingPoint.time) {
        toast.error("Please complete meeting point details");
        return;
      }

      // Validate pickup points
      if (pickupPoints.length === 0) {
        toast.error("Please add at least one pickup point");
        return;
      }

      for (const point of pickupPoints) {
        if (!point.cityId || !point.locationDetails) {
          toast.error("Please complete all pickup point details");
          return;
        }
      }

      // Validate policies
      for (const policy of policies) {
        if (!policy.title || !policy.description) {
          toast.error("Please complete all policy details");
          return;
        }
      }

      // Get existing treks from localStorage
      const existingTreks = JSON.parse(localStorage.getItem('vendorTreks') || '[]');
      
      // Create new trek with consistent structure
      const newTrek = {
        id: Date.now(),
        serviceId: `TSRV-${Math.floor(100000 + Math.random() * 900000)}`,
        name: trek.name,
        destination: trek.destination,
        description: trek.description,
        trekType: trek.trekType,
        duration: trek.duration,
        durationDays: trek.durationDays,
        durationNights: trek.durationNights,
        stages: trekStages,
        price: trek.price,
        difficulty: trek.difficulty,
        maxParticipants: parseInt(trek.maxParticipants) || 20,
        startDate: trek.startDate,
        endDate: trek.endDate,
        inclusions: inclusions,
        exclusions: exclusions,
        meetingPoint: meetingPoint,
        pickupPoints: pickupPoints,
        policies: policies,
        itinerary,
        accommodation: accommodations,
        images,
        slots: {
          total: parseInt(trek.maxParticipants) || 20,
          booked: 0
        },
        status: 'active',
        createdAt: new Date().toISOString()
      };

      // Save to localStorage
      const updatedTreks = [...existingTreks, newTrek];
      localStorage.setItem('vendorTreks', JSON.stringify(updatedTreks));

      toast.success("Trek created successfully!");
      navigate('/vendor/treks');
    } catch (error) {
      console.error('Error creating trek:', error);
      toast.error("Failed to create trek");
    } finally {
      setLoading(false);
    }
  };

  const canProceed = (step) => {
    switch (step) {
      case "basic-info":
        return trek.name && trek.destination && trek.description;
      case "trek-type":
        return trek.trekType;
      case "duration":
        return trek.duration || (trek.durationDays && trek.durationNights);
      case "trek-stages":
        return trekStages.length > 0 && trekStages.every(stage => stage.name && stage.description);
      case "pricing":
        return trek.price && trek.difficulty && trek.maxParticipants;
      case "dates":
        return trek.startDate && trek.endDate;
      case "itinerary":
        return true; // Optional
      case "inclusions":
        return inclusions.length > 0 && inclusions.every(inc => inc.item) && 
               exclusions.length > 0 && exclusions.every(exc => exc.item);
      case "meeting-point":
        return meetingPoint.cityId && meetingPoint.locationDetails && meetingPoint.time &&
               pickupPoints.length > 0 && pickupPoints.every(p => p.cityId && p.locationDetails);
      case "accommodation":
        return true; // Optional
      case "images":
        return true; // Optional
      case "cancellation":
        return policies.length > 0 && policies.every(policy => policy.title && policy.description);
      default:
        return false;
    }
  };

  const nextStep = () => {
    const steps = [
      "basic-info", "trek-type", "duration", "trek-stages", "pricing", 
      "dates", "itinerary", "inclusions", "meeting-point", 
      "accommodation", "images", "cancellation"
    ];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  const prevStep = () => {
    const steps = [
      "basic-info", "trek-type", "duration", "trek-stages", "pricing", 
      "dates", "itinerary", "inclusions", "meeting-point", 
      "accommodation", "images", "cancellation"
    ];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  const getCurrentStepNumber = () => {
    const steps = [
      "basic-info", "trek-type", "duration", "trek-stages", "pricing", 
      "dates", "itinerary", "inclusions", "meeting-point", 
      "accommodation", "images", "cancellation"
    ];
    return steps.indexOf(currentStep) + 1;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Create New Trek</h1>
          <p className="text-gray-600">Step {getCurrentStepNumber()} of 12</p>
        </div>
        <Button variant="outline" onClick={() => navigate('/vendor/treks')}>
          Back to Treks
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <Tabs value={currentStep} onValueChange={setCurrentStep} className="w-full">
            <TabsList className="grid w-full grid-cols-6 lg:grid-cols-12">
              <TabsTrigger value="basic-info" className="text-xs">Basic Info</TabsTrigger>
              <TabsTrigger value="trek-type" className="text-xs">Type</TabsTrigger>
              <TabsTrigger value="duration" className="text-xs">Duration</TabsTrigger>
              <TabsTrigger value="trek-stages" className="text-xs">Stages</TabsTrigger>
              <TabsTrigger value="pricing" className="text-xs">Pricing</TabsTrigger>
              <TabsTrigger value="dates" className="text-xs">Dates</TabsTrigger>
              <TabsTrigger value="itinerary" className="text-xs">Itinerary</TabsTrigger>
              <TabsTrigger value="inclusions" className="text-xs">Inclusions</TabsTrigger>
              <TabsTrigger value="meeting-point" className="text-xs">Meeting</TabsTrigger>
              <TabsTrigger value="accommodation" className="text-xs">Stay</TabsTrigger>
              <TabsTrigger value="images" className="text-xs">Images</TabsTrigger>
              <TabsTrigger value="cancellation" className="text-xs">Policies</TabsTrigger>
            </TabsList>

            <form onSubmit={handleSubmit} className="mt-6">
              {/* Step 1: Basic Info */}
              <TabsContent value="basic-info" className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Trek Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={trek.name}
                      onChange={handleInputChange}
                      placeholder="Enter trek name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="destination">Destination *</Label>
                    <Input
                      id="destination"
                      name="destination"
                      value={trek.destination}
                      onChange={handleInputChange}
                      placeholder="Enter destination"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={trek.description}
                      onChange={handleInputChange}
                      placeholder="Enter trek description"
                      rows={4}
                      required
                    />
                  </div>
                </div>
              </TabsContent>

              {/* Step 2: Trek Type */}
              <TabsContent value="trek-type" className="space-y-4">
                <div>
                  <Label htmlFor="trekType">Trek Type *</Label>
                  <Select onValueChange={(value) => handleSelectChange('trekType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select trek type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mountain">Mountain Trek</SelectItem>
                      <SelectItem value="forest">Forest Trek</SelectItem>
                      <SelectItem value="desert">Desert Trek</SelectItem>
                      <SelectItem value="coastal">Coastal Trek</SelectItem>
                      <SelectItem value="hill-station">Hill Station</SelectItem>
                      <SelectItem value="adventure">Adventure Trek</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>

              {/* Step 3: Duration */}
              <TabsContent value="duration" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="duration">Duration (e.g., 3D/2N) *</Label>
                    <Input
                      id="duration"
                      name="duration"
                      value={trek.duration}
                      onChange={handleInputChange}
                      placeholder="e.g., 3D/2N"
                    />
                  </div>
                  <div>
                    <Label htmlFor="durationDays">Number of Days</Label>
                    <Input
                      id="durationDays"
                      name="durationDays"
                      type="number"
                      value={trek.durationDays}
                      onChange={handleInputChange}
                      placeholder="Enter days"
                    />
                  </div>
                  <div>
                    <Label htmlFor="durationNights">Number of Nights</Label>
                    <Input
                      id="durationNights"
                      name="durationNights"
                      type="number"
                      value={trek.durationNights}
                      onChange={handleInputChange}
                      placeholder="Enter nights"
                    />
                  </div>
                </div>
              </TabsContent>

              {/* Step 4: Trek Stages */}
              <TabsContent value="trek-stages" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Trek Stages/Route *</h3>
                  <Button type="button" onClick={addTrekStage} variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Stage
                  </Button>
                </div>
                
                {trekStages.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">
                    No stages added. Click "Add Stage" to start.
                  </p>
                ) : (
                  trekStages.map((stage, index) => (
                    <div key={stage.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="font-medium">Stage {index + 1}</h4>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeTrekStage(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label>Stage Name *</Label>
                          <Input
                            value={stage.name}
                            onChange={(e) => updateTrekStage(index, 'name', e.target.value)}
                            placeholder="e.g., Base Camp to Summit"
                          />
                        </div>
                        <div>
                          <Label>Distance</Label>
                          <Input
                            value={stage.distance}
                            onChange={(e) => updateTrekStage(index, 'distance', e.target.value)}
                            placeholder="e.g., 5 km"
                          />
                        </div>
                        <div>
                          <Label>Duration</Label>
                          <Input
                            value={stage.duration}
                            onChange={(e) => updateTrekStage(index, 'duration', e.target.value)}
                            placeholder="e.g., 3 hours"
                          />
                        </div>
                      </div>
                      <div className="mt-4">
                        <Label>Description *</Label>
                        <Textarea
                          value={stage.description}
                          onChange={(e) => updateTrekStage(index, 'description', e.target.value)}
                          placeholder="Describe this stage of the trek"
                          rows={3}
                        />
                      </div>
                    </div>
                  ))
                )}
              </TabsContent>

              {/* Step 5: Pricing */}
              <TabsContent value="pricing" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="price">Price per Person *</Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      value={trek.price}
                      onChange={handleInputChange}
                      placeholder="Enter price"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="difficulty">Difficulty Level *</Label>
                    <Select onValueChange={(value) => handleSelectChange('difficulty', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="moderate">Moderate</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                        <SelectItem value="extreme">Extreme</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="maxParticipants">Max Participants *</Label>
                    <Input
                      id="maxParticipants"
                      name="maxParticipants"
                      type="number"
                      value={trek.maxParticipants}
                      onChange={handleInputChange}
                      placeholder="Enter max participants"
                      required
                    />
                  </div>
                </div>
              </TabsContent>

              {/* Step 6: Dates */}
              <TabsContent value="dates" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startDate">Start Date *</Label>
                    <Input
                      id="startDate"
                      name="startDate"
                      type="date"
                      value={trek.startDate}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="endDate">End Date *</Label>
                    <Input
                      id="endDate"
                      name="endDate"
                      type="date"
                      value={trek.endDate}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </TabsContent>

              {/* Step 7: Itinerary */}
              <TabsContent value="itinerary" className="space-y-4">
                <DynamicItinerary 
                  duration={trek.duration}
                  itinerary={itinerary} 
                  onChange={setItinerary} 
                />
              </TabsContent>

              {/* Step 8: Inclusions */}
              <TabsContent value="inclusions" className="space-y-4">
                <div className="space-y-6">
                  {/* Inclusions Section */}
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium">Inclusions *</h3>
                      <Button type="button" onClick={addInclusion} variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Inclusion
                      </Button>
                    </div>
                    
                    {inclusions.length === 0 ? (
                      <p className="text-gray-500 text-center py-4">
                        No inclusions added. Click "Add Inclusion" to start.
                      </p>
                    ) : (
                      inclusions.map((inclusion, index) => (
                        <div key={inclusion.id} className="flex items-center gap-2 mb-2">
                          <Input
                            value={inclusion.item}
                            onChange={(e) => updateInclusion(index, e.target.value)}
                            placeholder="What's included in the trek package"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeInclusion(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Exclusions Section */}
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium">Exclusions *</h3>
                      <Button type="button" onClick={addExclusion} variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Exclusion
                      </Button>
                    </div>
                    
                    {exclusions.length === 0 ? (
                      <p className="text-gray-500 text-center py-4">
                        No exclusions added. Click "Add Exclusion" to start.
                      </p>
                    ) : (
                      exclusions.map((exclusion, index) => (
                        <div key={exclusion.id} className="flex items-center gap-2 mb-2">
                          <Input
                            value={exclusion.item}
                            onChange={(e) => updateExclusion(index, e.target.value)}
                            placeholder="What's not included in the trek package"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeExclusion(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </TabsContent>

              {/* Step 9: Meeting Point */}
              <TabsContent value="meeting-point" className="space-y-4">
                <div className="space-y-6">
                  {/* Meeting Point Section */}
                  <div>
                    <h3 className="text-lg font-medium flex items-center gap-2 mb-4">
                      <MapPin className="h-5 w-5" />
                      Meeting Point *
                    </h3>
                    <div className="border rounded-lg p-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label>City *</Label>
                          <Select
                            value={meetingPoint.cityId}
                            onValueChange={(value) => updateMeetingPoint('cityId', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select city" />
                            </SelectTrigger>
                            <SelectContent>
                              {cities.map((city) => (
                                <SelectItem key={city.id} value={city.id}>
                                  {city.name}, {city.state}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Location Details *</Label>
                          <Input
                            value={meetingPoint.locationDetails}
                            onChange={(e) => updateMeetingPoint('locationDetails', e.target.value)}
                            placeholder="e.g., Main Bus Stand"
                          />
                        </div>
                        <div>
                          <Label>Meeting Time *</Label>
                          <Input
                            value={meetingPoint.time}
                            onChange={(e) => updateMeetingPoint('time', e.target.value)}
                            placeholder="e.g., 6:00 AM"
                          />
                        </div>
                      </div>
                      {meetingPoint.cityName && (
                        <div className="mt-2">
                          <Badge variant="outline">
                            Meeting Point: {meetingPoint.cityName} - {meetingPoint.locationDetails} at {meetingPoint.time}
                          </Badge>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Pickup Points Section */}
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium flex items-center gap-2">
                        <MapPin className="h-5 w-5" />
                        Pickup Points *
                      </h3>
                      <Button type="button" onClick={addPickupPoint} variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Pickup Point
                      </Button>
                    </div>
                    
                    {pickupPoints.length === 0 ? (
                      <p className="text-gray-500 text-center py-8">
                        No pickup points added. Click "Add Pickup Point" to start.
                      </p>
                    ) : (
                      pickupPoints.map((point, index) => (
                        <div key={point.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start mb-4">
                            <h4 className="font-medium">Pickup Point {index + 1}</h4>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removePickupPoint(index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label>City *</Label>
                              <Select
                                value={point.cityId}
                                onValueChange={(value) => updatePickupPoint(index, 'cityId', value)}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select city" />
                                </SelectTrigger>
                                <SelectContent>
                                  {cities.map((city) => (
                                    <SelectItem key={city.id} value={city.id}>
                                      {city.name}, {city.state}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label>Location Details *</Label>
                              <Input
                                value={point.locationDetails}
                                onChange={(e) => updatePickupPoint(index, 'locationDetails', e.target.value)}
                                placeholder="e.g., Metro Station, Bus Stand"
                              />
                            </div>
                          </div>
                          {point.cityName && (
                            <div className="mt-2">
                              <Badge variant="outline">
                                {point.cityName} - {point.locationDetails}
                              </Badge>
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </TabsContent>

              {/* Step 10: Accommodation */}
              <TabsContent value="accommodation" className="space-y-4">
                <DynamicAccommodation 
                  duration={trek.duration}
                  accommodations={accommodations} 
                  onChange={setAccommodations} 
                />
              </TabsContent>

              {/* Step 11: Images */}
              <TabsContent value="images" className="space-y-4">
                <ImageUpload 
                  images={images} 
                  onChange={setImages} 
                />
              </TabsContent>

              {/* Step 12: Policies */}
              <TabsContent value="cancellation" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Policies *</h3>
                  <Button type="button" onClick={addPolicy} variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Policy
                  </Button>
                </div>
                
                {policies.map((policy, index) => (
                  <div key={policy.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="font-medium">Policy {index + 1}</h4>
                      {index > 0 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removePolicy(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <div className="space-y-4">
                      <div>
                        <Label>Policy Title *</Label>
                        <Input
                          value={policy.title}
                          onChange={(e) => updatePolicy(index, 'title', e.target.value)}
                          placeholder="e.g., Cancellation Policy, Refund Policy"
                        />
                      </div>
                      <div>
                        <Label>Policy Description *</Label>
                        <Textarea
                          value={policy.description}
                          onChange={(e) => updatePolicy(index, 'description', e.target.value)}
                          placeholder="Enter detailed policy description"
                          rows={4}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </TabsContent>

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center mt-8 pt-4 border-t">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={prevStep}
                  disabled={currentStep === "basic-info"}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>

                <div className="flex space-x-2">
                  {currentStep === "cancellation" ? (
                    <Button type="submit" disabled={loading || !canProceed(currentStep)}>
                      <Save className="h-4 w-4 mr-2" />
                      {loading ? "Creating..." : "Create Trek"}
                    </Button>
                  ) : (
                    <Button 
                      type="button" 
                      onClick={nextStep}
                      disabled={!canProceed(currentStep)}
                    >
                      Next
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  )}
                </div>
              </div>
            </form>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateTrek;
