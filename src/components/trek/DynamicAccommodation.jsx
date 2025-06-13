
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


  accommodationscommodationNight[];
  onChange: (accommodationscommodationNight[]) => void;

const DynamicAccommodation = ({ duration, accommodations, onChange }namicAccommodationProps) => {
  const [nights, setNights] = useState(0);

  useEffect(() => {
    // Extract number of nights from duration string (e.g., "3D/2N" -> 2)
    const nightMatch = duration.match(/(\d+)N/);
    const extractedNights = nightMatch ? parseInt(nightMatch[1]) : 0;
    setNights(extractedNights);

    // Initialize accommodations if empty or nights changed
    if (extractedNights > 0 && (accommodations.length === 0 || accommodations.length !== extractedNights)) {
      const newAccommodationscommodationNight[] = [];
      for (let i = 1; i <= extractedNights; i++) {
        newAccommodations.push({
          night: i,
          type: '',
          name: '',
          description: '',
          location: ''
        });
      onChange(newAccommodations);
  }, [duration, accommodations.length, onChange]);

  const updateAccommodation = (nightIndex, field: keyof AccommodationNight, value) => {
    const newAccommodations = [...accommodations];
    newAccommodations[nightIndex] = {
      ...newAccommodations[nightIndex],
      [field]: value
    };
    onChange(newAccommodations);
  };

  if (nights === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        Please set the trek duration first to configure accommodations.
      </div>
    );

  return (
    <div className="space-y-6">
      {accommodations.map((accommodation, nightIndex) => (
        <Card key={accommodation.night} className="border-l-4 border-l-green-500">
          <CardHeader>
            <CardTitle className="text-lg">Night {accommodation.night}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`type-${accommodation.night}`}>Accommodation Type</Label>
                <Select
                  value={accommodation.type}
                  onValueChange={(value) => updateAccommodation(nightIndex, 'type', value)}
                >
                  <SelectTrigger id={`type-${accommodation.night}`}>
                    <SelectValue placeholder="Select accommodation type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hotel">Hotel</SelectItem>
                    <SelectItem value="guesthouse">Guest House</SelectItem>
                    <SelectItem value="tent">Tent</SelectItem>
                    <SelectItem value="lodge">Lodge</SelectItem>
                    <SelectItem value="homestay">Homestay</SelectItem>
                    <SelectItem value="camp">Camp</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor={`name-${accommodation.night}`}>Accommodation Name</Label>
                <Input
                  id={`name-${accommodation.night}`}
                  placeholder="Enter accommodation name"
                  value={accommodation.name}
                  onChange={(e) => updateAccommodation(nightIndex, 'name', e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor={`location-${accommodation.night}`}>Location</Label>
              <Input
                id={`location-${accommodation.night}`}
                placeholder="Enter location"
                value={accommodation.location}
                onChange={(e) => updateAccommodation(nightIndex, 'location', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor={`description-${accommodation.night}`}>Description</Label>
              <Textarea
                id={`description-${accommodation.night}`}
                placeholder="Describe the accommodation details, amenities, etc."
                value={accommodation.description}
                onChange={(e) => updateAccommodation(nightIndex, 'description', e.target.value)}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DynamicAccommodation;
