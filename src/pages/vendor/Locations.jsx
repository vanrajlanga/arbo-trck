import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Edit2, Trash2, ChevronDown, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const ManageLocations = () => {
    const [states, setStates] = useState([
        {
            name: "Telangana",
            expanded: true,
            cities: [
                { id: "1", name: "Hyderabad", state: "Telangana" },
                { id: "2", name: "Warangal", state: "Telangana" },
                { id: "3", name: "Khammam", state: "Telangana" },
            ],
        },
        {
            name: "Andhra Pradesh",
            expanded: true,
            cities: [
                { id: "4", name: "Vijayawada", state: "Andhra Pradesh" },
                { id: "5", name: "Ananthapur", state: "Andhra Pradesh" },
                { id: "6", name: "Kurnool", state: "Andhra Pradesh" },
            ],
        },
        {
            name: "Tamil Nadu",
            expanded: true,
            cities: [
                { id: "7", name: "Chennai", state: "Tamil Nadu" },
                { id: "8", name: "Pondicherry", state: "Tamil Nadu" },
                { id: "9", name: "Coimbatore", state: "Tamil Nadu" },
            ],
        },
    ]);

    const [newState, setNewState] = useState("");
    const [newCity, setNewCity] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [isAddingCity, setIsAddingCity] = useState(false);

    // Load states from localStorage on component mount
    useEffect(() => {
        const savedStates = localStorage.getItem("locationStates");
        if (savedStates) {
            try {
                setStates(JSON.parse(savedStates));
            } catch (error) {
                console.error("Error parsing states from localStorage:", error);
            }
        } else {
            // If no saved states, save the default ones
            localStorage.setItem("locationStates", JSON.stringify(states));
        }
    }, []);

    // Save states to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem("locationStates", JSON.stringify(states));
        console.log("Saved states to localStorage:", states);
    }, [states]);

    const toggleStateExpansion = (stateName) => {
        setStates(
            states.map((state) =>
                state.name === stateName
                    ? { ...state, expanded: !state.expanded }
                    : state
            )
        );
    };

    const addNewCity = () => {
        if (!newCity || !selectedState) {
            toast.error("Please enter both city name and select a state");
            return;
        }

        // Check if city already exists in the state
        const stateObj = states.find((state) => state.name === selectedState);
        if (
            stateObj &&
            stateObj.cities.some(
                (city) => city.name.toLowerCase() === newCity.toLowerCase()
            )
        ) {
            toast.error(`${newCity} already exists in ${selectedState}`);
            return;
        }

        const newCityObj = {
            id: Date.now().toString(),
            name: newCity,
            state: selectedState,
        };

        setStates(
            states.map((state) =>
                state.name === selectedState
                    ? { ...state, cities: [...state.cities, newCityObj] }
                    : state
            )
        );

        setNewCity("");
        setSelectedState("");
        setIsAddingCity(false);
        toast.success(`Added ${newCity} to ${selectedState}`);
    };

    const deleteCity = (cityId) => {
        setStates(
            states.map((state) => ({
                ...state,
                cities: state.cities.filter((city) => city.id !== cityId),
            }))
        );
        toast.success("City removed");
    };

    const deleteState = (stateName) => {
        setStates(states.filter((state) => state.name !== stateName));
        toast.success(`${stateName} removed`);
    };

    const addNewState = () => {
        if (!newState) {
            toast.error("Please enter a state name");
            return;
        }

        // Check if state already exists
        if (
            states.some(
                (state) => state.name.toLowerCase() === newState.toLowerCase()
            )
        ) {
            toast.error("State already exists");
            return;
        }

        const newStateObj = {
            name: newState,
            cities: [],
            expanded: true,
        };

        setStates([...states, newStateObj]);
        setNewState("");
        toast.success(`${newState} added to states`);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Manage Locations</h1>
                <div className="flex gap-2">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="bg-aorbo-teal hover:bg-aorbo-teal/90">
                                <Plus className="w-4 h-4 mr-2" />
                                Add New State
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add New State</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="stateName">
                                        State Name
                                    </Label>
                                    <Input
                                        id="stateName"
                                        placeholder="Enter state name"
                                        value={newState}
                                        onChange={(e) =>
                                            setNewState(e.target.value)
                                        }
                                    />
                                </div>
                                <Button
                                    onClick={addNewState}
                                    className="w-full"
                                >
                                    Add State
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>

                    <Dialog open={isAddingCity} onOpenChange={setIsAddingCity}>
                        <DialogTrigger asChild>
                            <Button variant="outline">
                                <Plus className="w-4 h-4 mr-2" />
                                Add New City
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add New City</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="stateName">
                                        Select State
                                    </Label>
                                    <Select
                                        value={selectedState}
                                        onValueChange={setSelectedState}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a state" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {states.map((state) => (
                                                <SelectItem
                                                    key={state.name}
                                                    value={state.name}
                                                >
                                                    {state.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label htmlFor="cityName">City Name</Label>
                                    <Input
                                        id="cityName"
                                        placeholder="Enter city name"
                                        value={newCity}
                                        onChange={(e) =>
                                            setNewCity(e.target.value)
                                        }
                                    />
                                </div>
                                <Button onClick={addNewCity} className="w-full">
                                    Add City
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Operating Cities</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {states.map((state) => (
                            <div
                                key={state.name}
                                className="border rounded-lg p-4"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() =>
                                                toggleStateExpansion(state.name)
                                            }
                                        >
                                            {state.expanded ? (
                                                <ChevronDown className="w-4 h-4" />
                                            ) : (
                                                <ChevronRight className="w-4 h-4" />
                                            )}
                                        </Button>
                                        <h3 className="text-lg font-semibold">
                                            {state.name}
                                        </h3>
                                        <Badge variant="secondary">
                                            {state.cities.length} cities
                                        </Badge>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() =>
                                                deleteState(state.name)
                                            }
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>

                                {state.expanded && (
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 ml-8">
                                        {state.cities.map((city) => (
                                            <div
                                                key={city.id}
                                                className="flex items-center justify-between p-2 bg-blue-50 rounded border"
                                            >
                                                <span className="text-blue-700 font-medium">
                                                    {city.name}
                                                </span>
                                                <div className="flex gap-1">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() =>
                                                            deleteCity(city.id)
                                                        }
                                                    >
                                                        <Trash2 className="w-3 h-3" />
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default ManageLocations;
