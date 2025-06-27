import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, ChevronDown, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const ManageLocations = () => {
  const [states, setStates] = useState([{
    name: "Telangana",
    expanded: true,
    cities: [{
      id: "1",
      name: "Hyderabad",
      state: "Telangana"
    }, {
      id: "2",
      name: "Warangal",
      state: "Telangana"
    }, {
      id: "3",
      name: "Khammam",
      state: "Telangana"
    }]
  }, {
    name: "Andhra Pradesh",
    expanded: true,
    cities: [{
      id: "4",
      name: "Vijayawada",
      state: "Andhra Pradesh"
    }, {
      id: "5",
      name: "Ananthapur",
      state: "Andhra Pradesh"
    }, {
      id: "6",
      name: "Kurnool",
      state: "Andhra Pradesh"
    }]
  }, {
    name: "Tamil Nadu",
    expanded: true,
    cities: [{
      id: "7",
      name: "Chennai",
      state: "Tamil Nadu"
    }, {
      id: "8",
      name: "Pondicherry",
      state: "Tamil Nadu"
    }, {
      id: "9",
      name: "Coimbatore",
      state: "Tamil Nadu"
    }]
  }]);
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
  const toggleStateExpansion = stateName => {
    setStates(states.map(state => state.name === stateName ? {
      ...state,
      expanded: !state.expanded
    } : state));
  };
  const addNewCity = () => {
    if (!newCity || !selectedState) {
      toast.error("Please enter both city name and select a state");
      return;
    }

    // Check if city already exists in the state
    const stateObj = states.find(state => state.name === selectedState);
    if (stateObj && stateObj.cities.some(city => city.name.toLowerCase() === newCity.toLowerCase())) {
      toast.error(`${newCity} already exists in ${selectedState}`);
      return;
    }
    const newCityObj = {
      id: Date.now().toString(),
      name: newCity,
      state: selectedState
    };
    setStates(states.map(state => state.name === selectedState ? {
      ...state,
      cities: [...state.cities, newCityObj]
    } : state));
    setNewCity("");
    setSelectedState("");
    setIsAddingCity(false);
    toast.success(`Added ${newCity} to ${selectedState}`);
  };
  const deleteCity = cityId => {
    setStates(states.map(state => ({
      ...state,
      cities: state.cities.filter(city => city.id !== cityId)
    })));
    toast.success("City removed");
  };
  const deleteState = stateName => {
    setStates(states.filter(state => state.name !== stateName));
    toast.success(`${stateName} removed`);
  };
  const addNewState = () => {
    if (!newState) {
      toast.error("Please enter a state name");
      return;
    }

    // Check if state already exists
    if (states.some(state => state.name.toLowerCase() === newState.toLowerCase())) {
      toast.error("State already exists");
      return;
    }
    const newStateObj = {
      name: newState,
      cities: [],
      expanded: true
    };
    setStates([...states, newStateObj]);
    setNewState("");
    toast.success(`${newState} added to states`);
  };
  return /*#__PURE__*/_jsxs("div", {
    className: "space-y-6",
    children: [/*#__PURE__*/_jsxs("div", {
      className: "flex justify-between items-center",
      children: [/*#__PURE__*/_jsx("h1", {
        className: "text-3xl font-bold",
        children: "Manage Locations"
      }), /*#__PURE__*/_jsxs("div", {
        className: "flex gap-2",
        children: [/*#__PURE__*/_jsxs(Dialog, {
          children: [/*#__PURE__*/_jsx(DialogTrigger, {
            asChild: true,
            children: /*#__PURE__*/_jsxs(Button, {
              className: "bg-aorbo-teal hover:bg-aorbo-teal/90",
              children: [/*#__PURE__*/_jsx(Plus, {
                className: "w-4 h-4 mr-2"
              }), "Add New State"]
            })
          }), /*#__PURE__*/_jsxs(DialogContent, {
            children: [/*#__PURE__*/_jsx(DialogHeader, {
              children: /*#__PURE__*/_jsx(DialogTitle, {
                children: "Add New State"
              })
            }), /*#__PURE__*/_jsxs("div", {
              className: "space-y-4",
              children: [/*#__PURE__*/_jsxs("div", {
                children: [/*#__PURE__*/_jsx(Label, {
                  htmlFor: "stateName",
                  children: "State Name"
                }), /*#__PURE__*/_jsx(Input, {
                  id: "stateName",
                  placeholder: "Enter state name",
                  value: newState,
                  onChange: e => setNewState(e.target.value)
                })]
              }), /*#__PURE__*/_jsx(Button, {
                onClick: addNewState,
                className: "w-full",
                children: "Add State"
              })]
            })]
          })]
        }), /*#__PURE__*/_jsxs(Dialog, {
          open: isAddingCity,
          onOpenChange: setIsAddingCity,
          children: [/*#__PURE__*/_jsx(DialogTrigger, {
            asChild: true,
            children: /*#__PURE__*/_jsxs(Button, {
              variant: "outline",
              children: [/*#__PURE__*/_jsx(Plus, {
                className: "w-4 h-4 mr-2"
              }), "Add New City"]
            })
          }), /*#__PURE__*/_jsxs(DialogContent, {
            children: [/*#__PURE__*/_jsx(DialogHeader, {
              children: /*#__PURE__*/_jsx(DialogTitle, {
                children: "Add New City"
              })
            }), /*#__PURE__*/_jsxs("div", {
              className: "space-y-4",
              children: [/*#__PURE__*/_jsxs("div", {
                children: [/*#__PURE__*/_jsx(Label, {
                  htmlFor: "stateName",
                  children: "Select State"
                }), /*#__PURE__*/_jsxs(Select, {
                  value: selectedState,
                  onValueChange: setSelectedState,
                  children: [/*#__PURE__*/_jsx(SelectTrigger, {
                    children: /*#__PURE__*/_jsx(SelectValue, {
                      placeholder: "Select a state"
                    })
                  }), /*#__PURE__*/_jsx(SelectContent, {
                    children: states.map(state => /*#__PURE__*/_jsx(SelectItem, {
                      value: state.name,
                      children: state.name
                    }, state.name))
                  })]
                })]
              }), /*#__PURE__*/_jsxs("div", {
                children: [/*#__PURE__*/_jsx(Label, {
                  htmlFor: "cityName",
                  children: "City Name"
                }), /*#__PURE__*/_jsx(Input, {
                  id: "cityName",
                  placeholder: "Enter city name",
                  value: newCity,
                  onChange: e => setNewCity(e.target.value)
                })]
              }), /*#__PURE__*/_jsx(Button, {
                onClick: addNewCity,
                className: "w-full",
                children: "Add City"
              })]
            })]
          })]
        })]
      })]
    }), /*#__PURE__*/_jsxs(Card, {
      children: [/*#__PURE__*/_jsx(CardHeader, {
        children: /*#__PURE__*/_jsx(CardTitle, {
          children: "Operating Cities"
        })
      }), /*#__PURE__*/_jsx(CardContent, {
        children: /*#__PURE__*/_jsx("div", {
          className: "space-y-4",
          children: states.map(state => /*#__PURE__*/_jsxs("div", {
            className: "border rounded-lg p-4",
            children: [/*#__PURE__*/_jsxs("div", {
              className: "flex items-center justify-between mb-3",
              children: [/*#__PURE__*/_jsxs("div", {
                className: "flex items-center gap-2",
                children: [/*#__PURE__*/_jsx(Button, {
                  variant: "ghost",
                  size: "sm",
                  onClick: () => toggleStateExpansion(state.name),
                  children: state.expanded ? /*#__PURE__*/_jsx(ChevronDown, {
                    className: "w-4 h-4"
                  }) : /*#__PURE__*/_jsx(ChevronRight, {
                    className: "w-4 h-4"
                  })
                }), /*#__PURE__*/_jsx("h3", {
                  className: "text-lg font-semibold",
                  children: state.name
                }), /*#__PURE__*/_jsxs(Badge, {
                  variant: "secondary",
                  children: [state.cities.length, " cities"]
                })]
              }), /*#__PURE__*/_jsx("div", {
                className: "flex gap-2",
                children: /*#__PURE__*/_jsx(Button, {
                  variant: "ghost",
                  size: "sm",
                  onClick: () => deleteState(state.name),
                  children: /*#__PURE__*/_jsx(Trash2, {
                    className: "w-4 h-4"
                  })
                })
              })]
            }), state.expanded && /*#__PURE__*/_jsx("div", {
              className: "grid grid-cols-1 md:grid-cols-3 gap-2 ml-8",
              children: state.cities.map(city => /*#__PURE__*/_jsxs("div", {
                className: "flex items-center justify-between p-2 bg-blue-50 rounded border",
                children: [/*#__PURE__*/_jsx("span", {
                  className: "text-blue-700 font-medium",
                  children: city.name
                }), /*#__PURE__*/_jsx("div", {
                  className: "flex gap-1",
                  children: /*#__PURE__*/_jsx(Button, {
                    variant: "ghost",
                    size: "sm",
                    onClick: () => deleteCity(city.id),
                    children: /*#__PURE__*/_jsx(Trash2, {
                      className: "w-3 h-3"
                    })
                  })
                })]
              }, city.id))
            })]
          }, state.name))
        })
      })]
    })]
  });
};
export default ManageLocations;