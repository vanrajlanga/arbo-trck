import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";

const DynamicItinerary = ({ duration, itinerary, onChange }) => {
  const [days, setDays] = useState(0);

  useEffect(() => {
    // Extract number of days from duration string (e.g., "3D/2N" -> 3)
    const dayMatch = duration.match(/(\d+)D/);
    const extractedDays = dayMatch ? parseInt(dayMatch[1]) : 0;
    setDays(extractedDays);

    // Initialize itinerary if empty or days changed
    if (extractedDays > 0 && (itinerary.length === 0 || itinerary.length !== extractedDays)) {
      const newItinerary = [];
      for (let i = 1; i <= extractedDays; i++) {
        newItinerary.push({
          day: i,
          activities: [{ id: `day${i}-activity1`, activity: '' }]
        });
      }
      onChange(newItinerary);
    }
  }, [duration, itinerary.length, onChange]);

  const addActivity = (dayIndex) => {
    const newItinerary = [...itinerary];
    const activityId = `day${dayIndex + 1}-activity${newItinerary[dayIndex].activities.length + 1}`;
    newItinerary[dayIndex].activities.push({ id: activityId, activity: '' });
    onChange(newItinerary);
  };

  const removeActivity = (dayIndex, activityIndex) => {
    const newItinerary = [...itinerary];
    if (newItinerary[dayIndex].activities.length > 1) {
      newItinerary[dayIndex].activities.splice(activityIndex, 1);
      onChange(newItinerary);
    }
  };

  const updateActivity = (dayIndex, activityIndex, value) => {
    const newItinerary = [...itinerary];
    newItinerary[dayIndex].activities[activityIndex].activity = value;
    onChange(newItinerary);
  };

  if (days === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        Please set the trek duration first to configure the itinerary.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {itinerary.map((day, dayIndex) => (
        <Card key={day.day} className="border-l-4 border-l-blue-500">
          <CardHeader>
            <CardTitle className="text-lg">Day {day.day}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {day.activities.map((activity, activityIndex) => (
              <div key={activity.id} className="flex gap-2 items-end">
                <div className="flex-1">
                  <Label htmlFor={`activity-${day.day}-${activityIndex}`}>
                    Activity {activityIndex + 1}
                  </Label>
                  <Textarea
                    id={`activity-${day.day}-${activityIndex}`}
                    placeholder="Describe the activity for this day"
                    value={activity.activity}
                    onChange={(e) => updateActivity(dayIndex, activityIndex, e.target.value)}
                    rows={2}
                  />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => removeActivity(dayIndex, activityIndex)}
                  disabled={day.activities.length === 1}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={() => addActivity(dayIndex)}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Activity for Day {day.day}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DynamicItinerary;
