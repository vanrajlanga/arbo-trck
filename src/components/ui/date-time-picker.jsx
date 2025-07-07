import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function DateTimePicker({
    date,
    setDate,
    className,
    placeholder = "Pick date and time",
}) {
    const [selectedDate, setSelectedDate] = React.useState(
        date ? new Date(date) : null
    );
    const [timeValue, setTimeValue] = React.useState(
        date ? format(new Date(date), "HH:mm") : ""
    );

    React.useEffect(() => {
        if (date) {
            setSelectedDate(new Date(date));
            setTimeValue(format(new Date(date), "HH:mm"));
        }
    }, [date]);

    const handleDateSelect = (newDate) => {
        setSelectedDate(newDate);
        updateDateTime(newDate, timeValue);
    };

    const handleTimeChange = (e) => {
        const newTime = e.target.value;
        setTimeValue(newTime);
        updateDateTime(selectedDate, newTime);
    };

    const updateDateTime = (date, time) => {
        if (date && time) {
            const [hours, minutes] = time.split(":");
            const newDateTime = new Date(date);
            newDateTime.setHours(parseInt(hours, 10));
            newDateTime.setMinutes(parseInt(minutes, 10));
            setDate(newDateTime);
        }
    };

    const formatDisplayValue = () => {
        if (selectedDate && timeValue) {
            return (
                format(selectedDate, "PPP") +
                " at " +
                format(new Date(`2000-01-01T${timeValue}`), "h:mm a")
            );
        }
        return "";
    };

    return (
        <div className={cn("space-y-2", className)}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className={cn(
                            "w-full justify-start text-left font-normal",
                            !selectedDate && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formatDisplayValue() || placeholder}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <div className="p-3">
                        <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={handleDateSelect}
                            initialFocus
                        />
                        <div className="mt-3 pt-3 border-t">
                            <Label
                                htmlFor="time"
                                className="text-sm font-medium"
                            >
                                Time
                            </Label>
                            <div className="flex items-center mt-1">
                                <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="time"
                                    type="time"
                                    value={timeValue}
                                    onChange={handleTimeChange}
                                    className="w-full"
                                />
                            </div>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
}
