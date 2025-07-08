import { useState, useEffect } from "react";
import { Eye, Search, Filter, MapPin, Users } from "lucide-react";
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
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { getTrekImageUrl } from "@/lib/trekUtils";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
        const savedVendorTreks = localStorage.getItem("vendorTreks");
        let allTreks = [];
        if (savedVendorTreks) {
            const vendorTreks = JSON.parse(savedVendorTreks);
            // Add vendor information to each trek
            allTreks = vendorTreks.map((trek) => ({
                ...trek,
                vendorName: getVendorName(trek.id),
                vendorId: getVendorId(trek.id),
            }));
        }

        // Create sample vendor data if none exists
        const vendorsList = [
            {
                id: 1,
                name: "Mountain Explorers",
            },
            {
                id: 2,
                name: "Adventure Beyond",
            },
            {
                id: 3,
                name: "Trails & Peaks",
            },
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
            2: "Adventure Beyond",
        };
        return (
            vendorMapping[trekId] ||
            (trekId % 3 === 0 ? "Trails & Peaks" : "Mountain Explorers")
        );
    };

    // Helper function to get vendor id based on trek id
    const getVendorId = (trekId) => {
        // This is mock data - in a real app, this would come from a database
        const vendorMapping = {
            1: 1,
            2: 2,
        };
        return vendorMapping[trekId] || (trekId % 3 === 0 ? 3 : 1);
    };

    // Filter treks based on search term, status, and vendor
    const filteredTreks = treks.filter((trek) => {
        const matchesSearch =
            trek.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            trek.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
            trek.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus =
            statusFilter === "all" || trek.status === statusFilter;
        const matchesVendor =
            vendorFilter === "all" || String(trek.vendorId) === vendorFilter;
        return matchesSearch && matchesStatus && matchesVendor;
    });

    // View trek details
    const viewTrekDetails = (trek) => {
        setSelectedTrek(trek);
        setIsViewDialogOpen(true);
    };

    // Get a placeholder image for treks
    const getTrekImage = (imageName) => {
        return getTrekImageUrl(imageName);
    };
    return /*#__PURE__*/ _jsxs("div", {
        children: [
            /*#__PURE__*/ _jsx("div", {
                className:
                    "flex flex-col md:flex-row md:items-center justify-between mb-6",
                children: /*#__PURE__*/ _jsx("h1", {
                    className: "text-2xl font-bold mb-4 md:mb-0",
                    children: "All Treks",
                }),
            }),
            /*#__PURE__*/ _jsx(Card, {
                className: "mb-6",
                children: /*#__PURE__*/ _jsx(CardContent, {
                    className: "pt-6",
                    children: /*#__PURE__*/ _jsxs("div", {
                        className: "grid grid-cols-1 md:grid-cols-3 gap-4",
                        children: [
                            /*#__PURE__*/ _jsxs("div", {
                                className: "relative",
                                children: [
                                    /*#__PURE__*/ _jsx(Search, {
                                        className:
                                            "absolute left-2 top-2.5 h-4 w-4 text-gray-400",
                                    }),
                                    /*#__PURE__*/ _jsx(Input, {
                                        placeholder: "Search treks...",
                                        value: searchTerm,
                                        onChange: (e) =>
                                            setSearchTerm(e.target.value),
                                        className: "pl-8",
                                    }),
                                ],
                            }),
                            /*#__PURE__*/ _jsxs("div", {
                                className: "flex items-center space-x-2",
                                children: [
                                    /*#__PURE__*/ _jsx(Filter, {
                                        className: "h-4 w-4 text-gray-400",
                                    }),
                                    /*#__PURE__*/ _jsxs(Select, {
                                        value: statusFilter,
                                        onValueChange: setStatusFilter,
                                        children: [
                                            /*#__PURE__*/ _jsx(SelectTrigger, {
                                                className: "w-full",
                                                children: /*#__PURE__*/ _jsx(
                                                    SelectValue,
                                                    {
                                                        placeholder:
                                                            "Filter by status",
                                                    }
                                                ),
                                            }),
                                            /*#__PURE__*/ _jsxs(SelectContent, {
                                                children: [
                                                    /*#__PURE__*/ _jsx(
                                                        SelectItem,
                                                        {
                                                            value: "all",
                                                            children:
                                                                "All Statuses",
                                                        }
                                                    ),
                                                    /*#__PURE__*/ _jsx(
                                                        SelectItem,
                                                        {
                                                            value: "active",
                                                            children: "Active",
                                                        }
                                                    ),
                                                    /*#__PURE__*/ _jsx(
                                                        SelectItem,
                                                        {
                                                            value: "draft",
                                                            children: "Draft",
                                                        }
                                                    ),
                                                ],
                                            }),
                                        ],
                                    }),
                                ],
                            }),
                            /*#__PURE__*/ _jsxs("div", {
                                className: "flex items-center space-x-2",
                                children: [
                                    /*#__PURE__*/ _jsx(Users, {
                                        className: "h-4 w-4 text-gray-400",
                                    }),
                                    /*#__PURE__*/ _jsxs(Select, {
                                        value: vendorFilter,
                                        onValueChange: setVendorFilter,
                                        children: [
                                            /*#__PURE__*/ _jsx(SelectTrigger, {
                                                className: "w-full",
                                                children: /*#__PURE__*/ _jsx(
                                                    SelectValue,
                                                    {
                                                        placeholder:
                                                            "Filter by vendor",
                                                    }
                                                ),
                                            }),
                                            /*#__PURE__*/ _jsxs(SelectContent, {
                                                children: [
                                                    /*#__PURE__*/ _jsx(
                                                        SelectItem,
                                                        {
                                                            value: "all",
                                                            children:
                                                                "All Vendors",
                                                        }
                                                    ),
                                                    vendors.map((vendor) =>
                                                        /*#__PURE__*/ _jsx(
                                                            SelectItem,
                                                            {
                                                                value: String(
                                                                    vendor.id
                                                                ),
                                                                children:
                                                                    vendor.name,
                                                            },
                                                            vendor.id
                                                        )
                                                    ),
                                                ],
                                            }),
                                        ],
                                    }),
                                ],
                            }),
                        ],
                    }),
                }),
            }),
            /*#__PURE__*/ _jsxs(Tabs, {
                defaultValue: "all",
                className: "mb-6",
                children: [
                    /*#__PURE__*/ _jsxs(TabsList, {
                        children: [
                            /*#__PURE__*/ _jsx(TabsTrigger, {
                                value: "all",
                                children: "All Treks",
                            }),
                            /*#__PURE__*/ _jsx(TabsTrigger, {
                                value: "active",
                                children: "Active",
                            }),
                            /*#__PURE__*/ _jsx(TabsTrigger, {
                                value: "draft",
                                children: "Draft",
                            }),
                        ],
                    }),
                    /*#__PURE__*/ _jsx(TabsContent, {
                        value: "all",
                        className: "mt-6",
                        children: /*#__PURE__*/ _jsx("div", {
                            className: "rounded-md border",
                            children: /*#__PURE__*/ _jsxs(Table, {
                                children: [
                                    /*#__PURE__*/ _jsx(TableHeader, {
                                        children: /*#__PURE__*/ _jsxs(
                                            TableRow,
                                            {
                                                children: [
                                                    /*#__PURE__*/ _jsx(
                                                        TableHead,
                                                        {
                                                            children:
                                                                "Trek Name",
                                                        }
                                                    ),
                                                    /*#__PURE__*/ _jsx(
                                                        TableHead,
                                                        {
                                                            children: "Vendor",
                                                        }
                                                    ),
                                                    /*#__PURE__*/ _jsx(
                                                        TableHead,
                                                        {
                                                            children:
                                                                "Destination",
                                                        }
                                                    ),
                                                    /*#__PURE__*/ _jsx(
                                                        TableHead,
                                                        {
                                                            children:
                                                                "Duration",
                                                        }
                                                    ),
                                                    /*#__PURE__*/ _jsx(
                                                        TableHead,
                                                        {
                                                            children: "Price",
                                                        }
                                                    ),
                                                    /*#__PURE__*/ _jsx(
                                                        TableHead,
                                                        {
                                                            children: "Status",
                                                        }
                                                    ),
                                                    /*#__PURE__*/ _jsx(
                                                        TableHead,
                                                        {
                                                            className:
                                                                "text-right",
                                                            children: "Actions",
                                                        }
                                                    ),
                                                ],
                                            }
                                        ),
                                    }),
                                    /*#__PURE__*/ _jsx(TableBody, {
                                        children: loading
                                            ? /*#__PURE__*/ _jsx(TableRow, {
                                                  children: /*#__PURE__*/ _jsx(
                                                      TableCell,
                                                      {
                                                          colSpan: 7,
                                                          className:
                                                              "text-center py-8",
                                                          children:
                                                              "Loading treks...",
                                                      }
                                                  ),
                                              })
                                            : filteredTreks.length > 0
                                            ? filteredTreks.map((trek) =>
                                                  /*#__PURE__*/ _jsxs(
                                                      TableRow,
                                                      {
                                                          children: [
                                                              /*#__PURE__*/ _jsx(
                                                                  TableCell,
                                                                  {
                                                                      className:
                                                                          "font-medium",
                                                                      children:
                                                                          trek.name,
                                                                  }
                                                              ),
                                                              /*#__PURE__*/ _jsx(
                                                                  TableCell,
                                                                  {
                                                                      children:
                                                                          trek.vendorName,
                                                                  }
                                                              ),
                                                              /*#__PURE__*/ _jsx(
                                                                  TableCell,
                                                                  {
                                                                      children:
                                                                          trek.destination,
                                                                  }
                                                              ),
                                                              /*#__PURE__*/ _jsx(
                                                                  TableCell,
                                                                  {
                                                                      children:
                                                                          trek.duration,
                                                                  }
                                                              ),
                                                              /*#__PURE__*/ _jsxs(
                                                                  TableCell,
                                                                  {
                                                                      children:
                                                                          [
                                                                              "\u20B9",
                                                                              trek.price,
                                                                          ],
                                                                  }
                                                              ),
                                                              /*#__PURE__*/ _jsx(
                                                                  TableCell,
                                                                  {
                                                                      children:
                                                                          /*#__PURE__*/ _jsx(
                                                                              Badge,
                                                                              {
                                                                                  className:
                                                                                      trek.status ===
                                                                                      "active"
                                                                                          ? "bg-green-100 text-green-800"
                                                                                          : "bg-gray-100 text-gray-800",
                                                                                  children:
                                                                                      trek.status ===
                                                                                      "active"
                                                                                          ? "Active"
                                                                                          : "Draft",
                                                                              }
                                                                          ),
                                                                  }
                                                              ),
                                                              /*#__PURE__*/ _jsx(
                                                                  TableCell,
                                                                  {
                                                                      className:
                                                                          "text-right",
                                                                      children:
                                                                          /*#__PURE__*/ _jsx(
                                                                              Button,
                                                                              {
                                                                                  variant:
                                                                                      "ghost",
                                                                                  size: "icon",
                                                                                  onClick:
                                                                                      () =>
                                                                                          viewTrekDetails(
                                                                                              trek
                                                                                          ),
                                                                                  children:
                                                                                      /*#__PURE__*/ _jsx(
                                                                                          Eye,
                                                                                          {
                                                                                              className:
                                                                                                  "h-4 w-4",
                                                                                          }
                                                                                      ),
                                                                              }
                                                                          ),
                                                                  }
                                                              ),
                                                          ],
                                                      },
                                                      trek.id
                                                  )
                                              )
                                            : /*#__PURE__*/ _jsx(TableRow, {
                                                  children: /*#__PURE__*/ _jsx(
                                                      TableCell,
                                                      {
                                                          colSpan: 7,
                                                          className:
                                                              "text-center py-8",
                                                          children:
                                                              "No treks found matching your filters.",
                                                      }
                                                  ),
                                              }),
                                    }),
                                ],
                            }),
                        }),
                    }),
                    /*#__PURE__*/ _jsx(TabsContent, {
                        value: "active",
                        className: "mt-6",
                        children: /*#__PURE__*/ _jsx("div", {
                            className: "rounded-md border",
                            children: /*#__PURE__*/ _jsxs(Table, {
                                children: [
                                    /*#__PURE__*/ _jsx(TableHeader, {
                                        children: /*#__PURE__*/ _jsxs(
                                            TableRow,
                                            {
                                                children: [
                                                    /*#__PURE__*/ _jsx(
                                                        TableHead,
                                                        {
                                                            children:
                                                                "Trek Name",
                                                        }
                                                    ),
                                                    /*#__PURE__*/ _jsx(
                                                        TableHead,
                                                        {
                                                            children: "Vendor",
                                                        }
                                                    ),
                                                    /*#__PURE__*/ _jsx(
                                                        TableHead,
                                                        {
                                                            children:
                                                                "Destination",
                                                        }
                                                    ),
                                                    /*#__PURE__*/ _jsx(
                                                        TableHead,
                                                        {
                                                            children:
                                                                "Duration",
                                                        }
                                                    ),
                                                    /*#__PURE__*/ _jsx(
                                                        TableHead,
                                                        {
                                                            children: "Price",
                                                        }
                                                    ),
                                                    /*#__PURE__*/ _jsx(
                                                        TableHead,
                                                        {
                                                            children: "Status",
                                                        }
                                                    ),
                                                    /*#__PURE__*/ _jsx(
                                                        TableHead,
                                                        {
                                                            className:
                                                                "text-right",
                                                            children: "Actions",
                                                        }
                                                    ),
                                                ],
                                            }
                                        ),
                                    }),
                                    /*#__PURE__*/ _jsx(TableBody, {
                                        children: loading
                                            ? /*#__PURE__*/ _jsx(TableRow, {
                                                  children: /*#__PURE__*/ _jsx(
                                                      TableCell,
                                                      {
                                                          colSpan: 7,
                                                          className:
                                                              "text-center py-8",
                                                          children:
                                                              "Loading treks...",
                                                      }
                                                  ),
                                              })
                                            : filteredTreks.filter(
                                                  (trek) =>
                                                      trek.status === "active"
                                              ).length > 0
                                            ? filteredTreks
                                                  .filter(
                                                      (trek) =>
                                                          trek.status ===
                                                          "active"
                                                  )
                                                  .map((trek) =>
                                                      /*#__PURE__*/ _jsxs(
                                                          TableRow,
                                                          {
                                                              children: [
                                                                  /*#__PURE__*/ _jsx(
                                                                      TableCell,
                                                                      {
                                                                          className:
                                                                              "font-medium",
                                                                          children:
                                                                              trek.name,
                                                                      }
                                                                  ),
                                                                  /*#__PURE__*/ _jsx(
                                                                      TableCell,
                                                                      {
                                                                          children:
                                                                              trek.vendorName,
                                                                      }
                                                                  ),
                                                                  /*#__PURE__*/ _jsx(
                                                                      TableCell,
                                                                      {
                                                                          children:
                                                                              trek.destination,
                                                                      }
                                                                  ),
                                                                  /*#__PURE__*/ _jsx(
                                                                      TableCell,
                                                                      {
                                                                          children:
                                                                              trek.duration,
                                                                      }
                                                                  ),
                                                                  /*#__PURE__*/ _jsxs(
                                                                      TableCell,
                                                                      {
                                                                          children:
                                                                              [
                                                                                  "\u20B9",
                                                                                  trek.price,
                                                                              ],
                                                                      }
                                                                  ),
                                                                  /*#__PURE__*/ _jsx(
                                                                      TableCell,
                                                                      {
                                                                          children:
                                                                              /*#__PURE__*/ _jsx(
                                                                                  Badge,
                                                                                  {
                                                                                      className:
                                                                                          "bg-green-100 text-green-800",
                                                                                      children:
                                                                                          "Active",
                                                                                  }
                                                                              ),
                                                                      }
                                                                  ),
                                                                  /*#__PURE__*/ _jsx(
                                                                      TableCell,
                                                                      {
                                                                          className:
                                                                              "text-right",
                                                                          children:
                                                                              /*#__PURE__*/ _jsx(
                                                                                  Button,
                                                                                  {
                                                                                      variant:
                                                                                          "ghost",
                                                                                      size: "icon",
                                                                                      onClick:
                                                                                          () =>
                                                                                              viewTrekDetails(
                                                                                                  trek
                                                                                              ),
                                                                                      children:
                                                                                          /*#__PURE__*/ _jsx(
                                                                                              Eye,
                                                                                              {
                                                                                                  className:
                                                                                                      "h-4 w-4",
                                                                                              }
                                                                                          ),
                                                                                  }
                                                                              ),
                                                                      }
                                                                  ),
                                                              ],
                                                          },
                                                          trek.id
                                                      )
                                                  )
                                            : /*#__PURE__*/ _jsx(TableRow, {
                                                  children: /*#__PURE__*/ _jsx(
                                                      TableCell,
                                                      {
                                                          colSpan: 7,
                                                          className:
                                                              "text-center py-8",
                                                          children:
                                                              "No active treks found.",
                                                      }
                                                  ),
                                              }),
                                    }),
                                ],
                            }),
                        }),
                    }),
                    /*#__PURE__*/ _jsx(TabsContent, {
                        value: "draft",
                        className: "mt-6",
                        children: /*#__PURE__*/ _jsx("div", {
                            className: "rounded-md border",
                            children: /*#__PURE__*/ _jsxs(Table, {
                                children: [
                                    /*#__PURE__*/ _jsx(TableHeader, {
                                        children: /*#__PURE__*/ _jsxs(
                                            TableRow,
                                            {
                                                children: [
                                                    /*#__PURE__*/ _jsx(
                                                        TableHead,
                                                        {
                                                            children:
                                                                "Trek Name",
                                                        }
                                                    ),
                                                    /*#__PURE__*/ _jsx(
                                                        TableHead,
                                                        {
                                                            children: "Vendor",
                                                        }
                                                    ),
                                                    /*#__PURE__*/ _jsx(
                                                        TableHead,
                                                        {
                                                            children:
                                                                "Destination",
                                                        }
                                                    ),
                                                    /*#__PURE__*/ _jsx(
                                                        TableHead,
                                                        {
                                                            children:
                                                                "Duration",
                                                        }
                                                    ),
                                                    /*#__PURE__*/ _jsx(
                                                        TableHead,
                                                        {
                                                            children: "Price",
                                                        }
                                                    ),
                                                    /*#__PURE__*/ _jsx(
                                                        TableHead,
                                                        {
                                                            children: "Status",
                                                        }
                                                    ),
                                                    /*#__PURE__*/ _jsx(
                                                        TableHead,
                                                        {
                                                            className:
                                                                "text-right",
                                                            children: "Actions",
                                                        }
                                                    ),
                                                ],
                                            }
                                        ),
                                    }),
                                    /*#__PURE__*/ _jsx(TableBody, {
                                        children: loading
                                            ? /*#__PURE__*/ _jsx(TableRow, {
                                                  children: /*#__PURE__*/ _jsx(
                                                      TableCell,
                                                      {
                                                          colSpan: 7,
                                                          className:
                                                              "text-center py-8",
                                                          children:
                                                              "Loading treks...",
                                                      }
                                                  ),
                                              })
                                            : filteredTreks.filter(
                                                  (trek) =>
                                                      trek.status === "draft"
                                              ).length > 0
                                            ? filteredTreks
                                                  .filter(
                                                      (trek) =>
                                                          trek.status ===
                                                          "draft"
                                                  )
                                                  .map((trek) =>
                                                      /*#__PURE__*/ _jsxs(
                                                          TableRow,
                                                          {
                                                              children: [
                                                                  /*#__PURE__*/ _jsx(
                                                                      TableCell,
                                                                      {
                                                                          className:
                                                                              "font-medium",
                                                                          children:
                                                                              trek.name,
                                                                      }
                                                                  ),
                                                                  /*#__PURE__*/ _jsx(
                                                                      TableCell,
                                                                      {
                                                                          children:
                                                                              trek.vendorName,
                                                                      }
                                                                  ),
                                                                  /*#__PURE__*/ _jsx(
                                                                      TableCell,
                                                                      {
                                                                          children:
                                                                              trek.destination,
                                                                      }
                                                                  ),
                                                                  /*#__PURE__*/ _jsx(
                                                                      TableCell,
                                                                      {
                                                                          children:
                                                                              trek.duration,
                                                                      }
                                                                  ),
                                                                  /*#__PURE__*/ _jsxs(
                                                                      TableCell,
                                                                      {
                                                                          children:
                                                                              [
                                                                                  "\u20B9",
                                                                                  trek.price,
                                                                              ],
                                                                      }
                                                                  ),
                                                                  /*#__PURE__*/ _jsx(
                                                                      TableCell,
                                                                      {
                                                                          children:
                                                                              /*#__PURE__*/ _jsx(
                                                                                  Badge,
                                                                                  {
                                                                                      className:
                                                                                          "bg-gray-100 text-gray-800",
                                                                                      children:
                                                                                          "Draft",
                                                                                  }
                                                                              ),
                                                                      }
                                                                  ),
                                                                  /*#__PURE__*/ _jsx(
                                                                      TableCell,
                                                                      {
                                                                          className:
                                                                              "text-right",
                                                                          children:
                                                                              /*#__PURE__*/ _jsx(
                                                                                  Button,
                                                                                  {
                                                                                      variant:
                                                                                          "ghost",
                                                                                      size: "icon",
                                                                                      onClick:
                                                                                          () =>
                                                                                              viewTrekDetails(
                                                                                                  trek
                                                                                              ),
                                                                                      children:
                                                                                          /*#__PURE__*/ _jsx(
                                                                                              Eye,
                                                                                              {
                                                                                                  className:
                                                                                                      "h-4 w-4",
                                                                                              }
                                                                                          ),
                                                                                  }
                                                                              ),
                                                                      }
                                                                  ),
                                                              ],
                                                          },
                                                          trek.id
                                                      )
                                                  )
                                            : /*#__PURE__*/ _jsx(TableRow, {
                                                  children: /*#__PURE__*/ _jsx(
                                                      TableCell,
                                                      {
                                                          colSpan: 7,
                                                          className:
                                                              "text-center py-8",
                                                          children:
                                                              "No draft treks found.",
                                                      }
                                                  ),
                                              }),
                                    }),
                                ],
                            }),
                        }),
                    }),
                ],
            }),
            /*#__PURE__*/ _jsx(Dialog, {
                open: isViewDialogOpen,
                onOpenChange: setIsViewDialogOpen,
                children: /*#__PURE__*/ _jsxs(DialogContent, {
                    className: "max-w-4xl max-h-[90vh] overflow-y-auto",
                    children: [
                        /*#__PURE__*/ _jsx(DialogHeader, {
                            children: /*#__PURE__*/ _jsx(DialogTitle, {
                                children: selectedTrek?.name,
                            }),
                        }),
                        selectedTrek &&
                            /*#__PURE__*/ _jsxs("div", {
                                className: "space-y-6",
                                children: [
                                    /*#__PURE__*/ _jsxs("div", {
                                        className:
                                            "relative h-64 rounded-lg overflow-hidden",
                                        children: [
                                            /*#__PURE__*/ _jsx("img", {
                                                src: getTrekImage(
                                                    selectedTrek.images[0]
                                                ),
                                                alt: selectedTrek.name,
                                                className:
                                                    "w-full h-full object-cover",
                                            }),
                                            /*#__PURE__*/ _jsx("div", {
                                                className:
                                                    "absolute top-4 right-4",
                                                children: /*#__PURE__*/ _jsx(
                                                    Badge,
                                                    {
                                                        className:
                                                            selectedTrek.status ===
                                                            "active"
                                                                ? "bg-green-100 text-green-800"
                                                                : "bg-gray-100 text-gray-800",
                                                        children:
                                                            selectedTrek.status ===
                                                            "active"
                                                                ? "Active"
                                                                : "Draft",
                                                    }
                                                ),
                                            }),
                                        ],
                                    }),
                                    /*#__PURE__*/ _jsxs("div", {
                                        className:
                                            "grid grid-cols-1 md:grid-cols-2 gap-6",
                                        children: [
                                            /*#__PURE__*/ _jsxs("div", {
                                                children: [
                                                    /*#__PURE__*/ _jsx("h3", {
                                                        className:
                                                            "text-lg font-semibold mb-1",
                                                        children:
                                                            selectedTrek.name,
                                                    }),
                                                    /*#__PURE__*/ _jsxs("div", {
                                                        className:
                                                            "flex items-center text-gray-500 text-sm mb-1",
                                                        children: [
                                                            /*#__PURE__*/ _jsx(
                                                                MapPin,
                                                                {
                                                                    className:
                                                                        "h-4 w-4 mr-1",
                                                                }
                                                            ),
                                                            " ",
                                                            selectedTrek.destination,
                                                        ],
                                                    }),
                                                    /*#__PURE__*/ _jsxs("div", {
                                                        className:
                                                            "flex items-center text-gray-500 text-sm mb-4",
                                                        children: [
                                                            /*#__PURE__*/ _jsx(
                                                                Users,
                                                                {
                                                                    className:
                                                                        "h-4 w-4 mr-1",
                                                                }
                                                            ),
                                                            " Vendor: ",
                                                            selectedTrek.vendorName,
                                                        ],
                                                    }),
                                                    /*#__PURE__*/ _jsx("p", {
                                                        className:
                                                            "text-gray-600 mb-4",
                                                        children:
                                                            selectedTrek.description,
                                                    }),
                                                ],
                                            }),
                                            /*#__PURE__*/ _jsxs("div", {
                                                className:
                                                    "grid grid-cols-2 gap-4",
                                                children: [
                                                    /*#__PURE__*/ _jsxs("div", {
                                                        className:
                                                            "bg-gray-50 p-4 rounded-md",
                                                        children: [
                                                            /*#__PURE__*/ _jsx(
                                                                "h4",
                                                                {
                                                                    className:
                                                                        "text-sm font-medium text-gray-500 mb-1",
                                                                    children:
                                                                        "Duration",
                                                                }
                                                            ),
                                                            /*#__PURE__*/ _jsx(
                                                                "p",
                                                                {
                                                                    children:
                                                                        selectedTrek.duration,
                                                                }
                                                            ),
                                                        ],
                                                    }),
                                                    /*#__PURE__*/ _jsxs("div", {
                                                        className:
                                                            "bg-gray-50 p-4 rounded-md",
                                                        children: [
                                                            /*#__PURE__*/ _jsx(
                                                                "h4",
                                                                {
                                                                    className:
                                                                        "text-sm font-medium text-gray-500 mb-1",
                                                                    children:
                                                                        "Difficulty",
                                                                }
                                                            ),
                                                            /*#__PURE__*/ _jsx(
                                                                "p",
                                                                {
                                                                    className:
                                                                        "capitalize",
                                                                    children:
                                                                        selectedTrek.difficulty,
                                                                }
                                                            ),
                                                        ],
                                                    }),
                                                    /*#__PURE__*/ _jsxs("div", {
                                                        className:
                                                            "bg-gray-50 p-4 rounded-md",
                                                        children: [
                                                            /*#__PURE__*/ _jsx(
                                                                "h4",
                                                                {
                                                                    className:
                                                                        "text-sm font-medium text-gray-500 mb-1",
                                                                    children:
                                                                        "Price",
                                                                }
                                                            ),
                                                            /*#__PURE__*/ _jsxs(
                                                                "p",
                                                                {
                                                                    children: [
                                                                        "\u20B9",
                                                                        selectedTrek.price,
                                                                        "/person",
                                                                    ],
                                                                }
                                                            ),
                                                        ],
                                                    }),
                                                    /*#__PURE__*/ _jsxs("div", {
                                                        className:
                                                            "bg-gray-50 p-4 rounded-md",
                                                        children: [
                                                            /*#__PURE__*/ _jsx(
                                                                "h4",
                                                                {
                                                                    className:
                                                                        "text-sm font-medium text-gray-500 mb-1",
                                                                    children:
                                                                        "Capacity",
                                                                }
                                                            ),
                                                            /*#__PURE__*/ _jsxs(
                                                                "p",
                                                                {
                                                                    children:
                                                                        selectedTrek.batches
                                                                            ? [
                                                                                  selectedTrek.batches.reduce(
                                                                                      (
                                                                                          sum,
                                                                                          batch
                                                                                      ) =>
                                                                                          sum +
                                                                                          (batch.bookedSlots ||
                                                                                              0),
                                                                                      0
                                                                                  ),
                                                                                  "/",
                                                                                  selectedTrek.batches.reduce(
                                                                                      (
                                                                                          sum,
                                                                                          batch
                                                                                      ) =>
                                                                                          sum +
                                                                                          (batch.capacity ||
                                                                                              0),
                                                                                      0
                                                                                  ),
                                                                              ]
                                                                            : [
                                                                                  "0",
                                                                                  "/",
                                                                                  "0",
                                                                              ],
                                                                }
                                                            ),
                                                        ],
                                                    }),
                                                ],
                                            }),
                                        ],
                                    }),
                                    /*#__PURE__*/ _jsx(Separator, {}),
                                    /*#__PURE__*/ _jsxs("div", {
                                        children: [
                                            /*#__PURE__*/ _jsx("h3", {
                                                className: "font-semibold mb-4",
                                                children: "Itinerary",
                                            }),
                                            /*#__PURE__*/ _jsx("div", {
                                                className: "space-y-4",
                                                children:
                                                    selectedTrek.itinerary?.map(
                                                        (day, index) =>
                                                            /*#__PURE__*/ _jsxs(
                                                                "div",
                                                                {
                                                                    className:
                                                                        "border border-gray-100 rounded-md p-4",
                                                                    children: [
                                                                        /*#__PURE__*/ _jsxs(
                                                                            "h4",
                                                                            {
                                                                                className:
                                                                                    "font-medium mb-2",
                                                                                children:
                                                                                    [
                                                                                        "Day ",
                                                                                        index +
                                                                                            1,
                                                                                    ],
                                                                            }
                                                                        ),
                                                                        /*#__PURE__*/ _jsx(
                                                                            "ul",
                                                                            {
                                                                                className:
                                                                                    "list-disc list-inside space-y-1",
                                                                                children:
                                                                                    day.activities.map(
                                                                                        (
                                                                                            activity,
                                                                                            actIdx
                                                                                        ) =>
                                                                                            /*#__PURE__*/ _jsx(
                                                                                                "li",
                                                                                                {
                                                                                                    className:
                                                                                                        "text-gray-600",
                                                                                                    children:
                                                                                                        activity,
                                                                                                },
                                                                                                actIdx
                                                                                            )
                                                                                    ),
                                                                            }
                                                                        ),
                                                                    ],
                                                                },
                                                                index
                                                            )
                                                    ),
                                            }),
                                        ],
                                    }),
                                    /*#__PURE__*/ _jsxs("div", {
                                        className:
                                            "grid grid-cols-1 md:grid-cols-2 gap-6",
                                        children: [
                                            /*#__PURE__*/ _jsxs("div", {
                                                children: [
                                                    /*#__PURE__*/ _jsx("h3", {
                                                        className:
                                                            "font-semibold mb-4",
                                                        children: "Inclusions",
                                                    }),
                                                    /*#__PURE__*/ _jsx("ul", {
                                                        className:
                                                            "list-disc list-inside space-y-1",
                                                        children:
                                                            selectedTrek.inclusions?.map(
                                                                (item, idx) =>
                                                                    /*#__PURE__*/ _jsx(
                                                                        "li",
                                                                        {
                                                                            className:
                                                                                "text-gray-600",
                                                                            children:
                                                                                item,
                                                                        },
                                                                        idx
                                                                    )
                                                            ),
                                                    }),
                                                ],
                                            }),
                                            /*#__PURE__*/ _jsxs("div", {
                                                children: [
                                                    /*#__PURE__*/ _jsx("h3", {
                                                        className:
                                                            "font-semibold mb-4",
                                                        children: "Exclusions",
                                                    }),
                                                    /*#__PURE__*/ _jsx("ul", {
                                                        className:
                                                            "list-disc list-inside space-y-1",
                                                        children:
                                                            selectedTrek.exclusions?.map(
                                                                (item, idx) =>
                                                                    /*#__PURE__*/ _jsx(
                                                                        "li",
                                                                        {
                                                                            className:
                                                                                "text-gray-600",
                                                                            children:
                                                                                item,
                                                                        },
                                                                        idx
                                                                    )
                                                            ),
                                                    }),
                                                ],
                                            }),
                                        ],
                                    }),
                                    /*#__PURE__*/ _jsx(Separator, {}),
                                    /*#__PURE__*/ _jsxs("div", {
                                        children: [
                                            /*#__PURE__*/ _jsx("h3", {
                                                className: "font-semibold mb-4",
                                                children: "Meeting Details",
                                            }),
                                            /*#__PURE__*/ _jsxs("div", {
                                                className:
                                                    "grid grid-cols-1 md:grid-cols-2 gap-4",
                                                children: [
                                                    /*#__PURE__*/ _jsxs("div", {
                                                        children: [
                                                            /*#__PURE__*/ _jsx(
                                                                "h4",
                                                                {
                                                                    className:
                                                                        "text-sm font-medium text-gray-500 mb-1",
                                                                    children:
                                                                        "Meeting Point",
                                                                }
                                                            ),
                                                            /*#__PURE__*/ _jsx(
                                                                "p",
                                                                {
                                                                    children:
                                                                        selectedTrek.meetingPoint ||
                                                                        "Not specified",
                                                                }
                                                            ),
                                                        ],
                                                    }),
                                                    /*#__PURE__*/ _jsxs("div", {
                                                        children: [
                                                            /*#__PURE__*/ _jsx(
                                                                "h4",
                                                                {
                                                                    className:
                                                                        "text-sm font-medium text-gray-500 mb-1",
                                                                    children:
                                                                        "Meeting Time",
                                                                }
                                                            ),
                                                            /*#__PURE__*/ _jsx(
                                                                "p",
                                                                {
                                                                    children:
                                                                        selectedTrek.meetingTime ||
                                                                        "Not specified",
                                                                }
                                                            ),
                                                        ],
                                                    }),
                                                ],
                                            }),
                                        ],
                                    }),
                                    /*#__PURE__*/ _jsx("div", {
                                        className: "flex justify-end pt-4",
                                        children: /*#__PURE__*/ _jsx(Button, {
                                            onClick: () =>
                                                setIsViewDialogOpen(false),
                                            children: "Close",
                                        }),
                                    }),
                                ],
                            }),
                    ],
                }),
            }),
        ],
    });
};
export default AdminTreks;
