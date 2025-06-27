import { useState } from "react";
import {
    Search,
    Filter,
    Download,
    Plus,
    Edit,
    Trash2,
    Eye,
    Send,
    MessageSquare,
    Users,
    CheckCircle,
    MoreHorizontal,
} from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

// Mock data for SMS/WhatsApp templates
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const smsTemplatesData = [
    {
        id: "SMS001",
        name: "OTP Verification",
        content:
            "Your OTP for Aorbo Adventures is {{otp}}. Valid for 10 minutes. Do not share with anyone.",
        category: "otp",
        type: "sms",
        targetAudience: "customer",
        status: "active",
        lastModified: "2025-05-20",
        usage: 2450,
        variables: ["otp"],
    },
    {
        id: "SMS002",
        name: "Booking Confirmation",
        content:
            "Hi {{customer_name}}, your booking for {{trek_name}} on {{date}} is confirmed. Booking ID: {{booking_id}}",
        category: "booking",
        type: "sms",
        targetAudience: "customer",
        status: "active",
        lastModified: "2025-05-18",
        usage: 1890,
        variables: ["customer_name", "trek_name", "date", "booking_id"],
    },
    {
        id: "WA001",
        name: "Payment Reminder",
        content:
            "Hello {{customer_name}}, your payment of ₹{{amount}} for {{trek_name}} is due on {{due_date}}. Pay now: {{payment_link}}",
        category: "payment",
        type: "whatsapp",
        targetAudience: "customer",
        status: "active",
        lastModified: "2025-05-22",
        usage: 567,
        variables: [
            "customer_name",
            "amount",
            "trek_name",
            "due_date",
            "payment_link",
        ],
    },
    {
        id: "SMS003",
        name: "Vendor Commission Alert",
        content:
            "Hi {{vendor_name}}, your commission of ₹{{amount}} has been processed for booking {{booking_id}}.",
        category: "commission",
        type: "sms",
        targetAudience: "vendor",
        status: "active",
        lastModified: "2025-05-15",
        usage: 234,
        variables: ["vendor_name", "amount", "booking_id"],
    },
];
const AdminCommunicationTemplates = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [typeFilter, setTypeFilter] = useState("all");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [audienceFilter, setAudienceFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isPreviewDialogOpen, setIsPreviewDialogOpen] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [newTemplate, setNewTemplate] = useState({
        name: "",
        content: "",
        category: "otp",
        type: "sms",
        targetAudience: "customer",
        status: "active",
    });
    const filteredTemplates = smsTemplatesData.filter((template) => {
        const matchesSearch =
            template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            template.content.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType =
            typeFilter === "all" || template.type === typeFilter;
        const matchesCategory =
            categoryFilter === "all" || template.category === categoryFilter;
        const matchesAudience =
            audienceFilter === "all" ||
            template.targetAudience === audienceFilter;
        const matchesStatus =
            statusFilter === "all" || template.status === statusFilter;
        return (
            matchesSearch &&
            matchesType &&
            matchesCategory &&
            matchesAudience &&
            matchesStatus
        );
    });
    const getStatusColor = (status) => {
        switch (status) {
            case "active":
                return "bg-green-100 text-green-800";
            case "draft":
                return "bg-yellow-100 text-yellow-800";
            case "inactive":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };
    const getTypeColor = (type) => {
        switch (type) {
            case "sms":
                return "bg-blue-100 text-blue-800";
            case "whatsapp":
                return "bg-green-100 text-green-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };
    const getCategoryColor = (category) => {
        switch (category) {
            case "otp":
                return "bg-purple-100 text-purple-800";
            case "booking":
                return "bg-orange-100 text-orange-800";
            case "payment":
                return "bg-red-100 text-red-800";
            case "commission":
                return "bg-blue-100 text-blue-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };
    const handleEditTemplate = (template) => {
        console.log("Editing template:", template);
        setSelectedTemplate(template);
        setNewTemplate({
            name: template.name,
            content: template.content,
            category: template.category,
            type: template.type,
            targetAudience: template.targetAudience,
            status: template.status,
        });
        setIsEditDialogOpen(true);
    };
    const handlePreviewTemplate = (template) => {
        console.log("Previewing template:", template);
        setSelectedTemplate(template);
        setIsPreviewDialogOpen(true);
    };
    const handleDeleteTemplate = (template) => {
        console.log("Deleting template:", template);
        if (
            confirm(
                `Are you sure you want to delete the template "${template.name}"?`
            )
        ) {
            // Here you would implement the delete functionality
            alert("Template deleted successfully!");
        }
    };
    const handleTestSend = (template) => {
        console.log("Test sending template:", template);
        const phoneNumber = prompt("Enter phone number for test message:");
        if (phoneNumber) {
            alert(
                `Test message sent to ${phoneNumber} using template: ${template.name}`
            );
        }
    };
    const handleCreateTemplate = () => {
        console.log("Creating template:", newTemplate);
        setIsCreateDialogOpen(false);
        setNewTemplate({
            name: "",
            content: "",
            category: "otp",
            type: "sms",
            targetAudience: "customer",
            status: "active",
        });
        alert("Template created successfully!");
    };
    const handleUpdateTemplate = () => {
        console.log("Updating template:", selectedTemplate, newTemplate);
        setIsEditDialogOpen(false);
        setSelectedTemplate(null);
        alert("Template updated successfully!");
    };
    const getPreviewContent = (template) => {
        if (
            !template ||
            !template.variables ||
            template.variables.length === 0
        ) {
            return template?.content || "";
        }
        let previewContent = template.content;
        const sampleValues = {
            customer_name: "John Doe",
            otp: "123456",
            booking_id: "BOOK001",
            trek_name: "Everest Base Camp",
            date: "2025-06-15",
            amount: "25000",
            due_date: "2025-06-10",
            payment_link: "https://pay.example.com/abc123",
            vendor_name: "Mountain Adventures",
        };
        template.variables.forEach((variable) => {
            previewContent = previewContent.replace(
                `{{${variable}}}`,
                sampleValues[variable] || `[${variable}]`
            );
        });
        return previewContent;
    };
    return /*#__PURE__*/ _jsxs("div", {
        children: [
            /*#__PURE__*/ _jsxs("div", {
                className:
                    "flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8",
                children: [
                    /*#__PURE__*/ _jsxs("div", {
                        children: [
                            /*#__PURE__*/ _jsx("h1", {
                                className: "text-2xl font-bold",
                                children: "SMS/WhatsApp Templates",
                            }),
                            /*#__PURE__*/ _jsx("p", {
                                className: "text-gray-500",
                                children:
                                    "Manage message templates for OTP, booking details, and other operational activities",
                            }),
                        ],
                    }),
                    /*#__PURE__*/ _jsxs("div", {
                        className: "flex gap-2 mt-4 lg:mt-0",
                        children: [
                            /*#__PURE__*/ _jsxs(Button, {
                                variant: "outline",
                                children: [
                                    /*#__PURE__*/ _jsx(Download, {
                                        className: "mr-2 h-4 w-4",
                                    }),
                                    "Export Templates",
                                ],
                            }),
                            /*#__PURE__*/ _jsxs(Button, {
                                onClick: () => setIsCreateDialogOpen(true),
                                children: [
                                    /*#__PURE__*/ _jsx(Plus, {
                                        className: "mr-2 h-4 w-4",
                                    }),
                                    "Create Template",
                                ],
                            }),
                        ],
                    }),
                ],
            }),
            /*#__PURE__*/ _jsxs("div", {
                className:
                    "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8",
                children: [
                    /*#__PURE__*/ _jsxs(Card, {
                        children: [
                            /*#__PURE__*/ _jsxs(CardHeader, {
                                className:
                                    "flex flex-row items-center justify-between pb-2",
                                children: [
                                    /*#__PURE__*/ _jsx(CardTitle, {
                                        className: "text-sm font-medium",
                                        children: "Total Templates",
                                    }),
                                    /*#__PURE__*/ _jsx(MessageSquare, {
                                        className:
                                            "h-4 w-4 text-muted-foreground",
                                    }),
                                ],
                            }),
                            /*#__PURE__*/ _jsxs(CardContent, {
                                children: [
                                    /*#__PURE__*/ _jsx("div", {
                                        className: "text-2xl font-bold",
                                        children: "24",
                                    }),
                                    /*#__PURE__*/ _jsx("p", {
                                        className:
                                            "text-xs text-muted-foreground",
                                        children: "All types",
                                    }),
                                ],
                            }),
                        ],
                    }),
                    /*#__PURE__*/ _jsxs(Card, {
                        children: [
                            /*#__PURE__*/ _jsxs(CardHeader, {
                                className:
                                    "flex flex-row items-center justify-between pb-2",
                                children: [
                                    /*#__PURE__*/ _jsx(CardTitle, {
                                        className: "text-sm font-medium",
                                        children: "Active Templates",
                                    }),
                                    /*#__PURE__*/ _jsx(CheckCircle, {
                                        className:
                                            "h-4 w-4 text-muted-foreground",
                                    }),
                                ],
                            }),
                            /*#__PURE__*/ _jsxs(CardContent, {
                                children: [
                                    /*#__PURE__*/ _jsx("div", {
                                        className: "text-2xl font-bold",
                                        children: "20",
                                    }),
                                    /*#__PURE__*/ _jsx("p", {
                                        className:
                                            "text-xs text-muted-foreground",
                                        children: "Currently in use",
                                    }),
                                ],
                            }),
                        ],
                    }),
                    /*#__PURE__*/ _jsxs(Card, {
                        children: [
                            /*#__PURE__*/ _jsxs(CardHeader, {
                                className:
                                    "flex flex-row items-center justify-between pb-2",
                                children: [
                                    /*#__PURE__*/ _jsx(CardTitle, {
                                        className: "text-sm font-medium",
                                        children: "Messages Sent",
                                    }),
                                    /*#__PURE__*/ _jsx(Send, {
                                        className:
                                            "h-4 w-4 text-muted-foreground",
                                    }),
                                ],
                            }),
                            /*#__PURE__*/ _jsxs(CardContent, {
                                children: [
                                    /*#__PURE__*/ _jsx("div", {
                                        className: "text-2xl font-bold",
                                        children: "45.2K",
                                    }),
                                    /*#__PURE__*/ _jsx("p", {
                                        className:
                                            "text-xs text-muted-foreground",
                                        children: "This month",
                                    }),
                                ],
                            }),
                        ],
                    }),
                    /*#__PURE__*/ _jsxs(Card, {
                        children: [
                            /*#__PURE__*/ _jsxs(CardHeader, {
                                className:
                                    "flex flex-row items-center justify-between pb-2",
                                children: [
                                    /*#__PURE__*/ _jsx(CardTitle, {
                                        className: "text-sm font-medium",
                                        children: "Most Used",
                                    }),
                                    /*#__PURE__*/ _jsx(Users, {
                                        className:
                                            "h-4 w-4 text-muted-foreground",
                                    }),
                                ],
                            }),
                            /*#__PURE__*/ _jsxs(CardContent, {
                                children: [
                                    /*#__PURE__*/ _jsx("div", {
                                        className: "text-2xl font-bold",
                                        children: "OTP",
                                    }),
                                    /*#__PURE__*/ _jsx("p", {
                                        className:
                                            "text-xs text-muted-foreground",
                                        children: "2,450 uses",
                                    }),
                                ],
                            }),
                        ],
                    }),
                ],
            }),
            /*#__PURE__*/ _jsxs(Card, {
                children: [
                    /*#__PURE__*/ _jsxs(CardHeader, {
                        children: [
                            /*#__PURE__*/ _jsx(CardTitle, {
                                children: "Message Templates",
                            }),
                            /*#__PURE__*/ _jsx(CardDescription, {
                                children:
                                    "Manage SMS and WhatsApp templates for customer and vendor communications",
                            }),
                        ],
                    }),
                    /*#__PURE__*/ _jsxs(CardContent, {
                        children: [
                            /*#__PURE__*/ _jsxs("div", {
                                className:
                                    "flex flex-col lg:flex-row gap-4 mb-6",
                                children: [
                                    /*#__PURE__*/ _jsxs("div", {
                                        className: "relative flex-1",
                                        children: [
                                            /*#__PURE__*/ _jsx(Search, {
                                                className:
                                                    "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4",
                                            }),
                                            /*#__PURE__*/ _jsx(Input, {
                                                placeholder:
                                                    "Search templates...",
                                                value: searchQuery,
                                                onChange: (e) =>
                                                    setSearchQuery(
                                                        e.target.value
                                                    ),
                                                className: "pl-10",
                                            }),
                                        ],
                                    }),
                                    /*#__PURE__*/ _jsxs(Select, {
                                        value: typeFilter,
                                        onValueChange: setTypeFilter,
                                        children: [
                                            /*#__PURE__*/ _jsx(SelectTrigger, {
                                                className: "w-40",
                                                children: /*#__PURE__*/ _jsx(
                                                    SelectValue,
                                                    {
                                                        placeholder: "Type",
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
                                                                "All Types",
                                                        }
                                                    ),
                                                    /*#__PURE__*/ _jsx(
                                                        SelectItem,
                                                        {
                                                            value: "sms",
                                                            children: "SMS",
                                                        }
                                                    ),
                                                    /*#__PURE__*/ _jsx(
                                                        SelectItem,
                                                        {
                                                            value: "whatsapp",
                                                            children:
                                                                "WhatsApp",
                                                        }
                                                    ),
                                                ],
                                            }),
                                        ],
                                    }),
                                    /*#__PURE__*/ _jsxs(Select, {
                                        value: categoryFilter,
                                        onValueChange: setCategoryFilter,
                                        children: [
                                            /*#__PURE__*/ _jsx(SelectTrigger, {
                                                className: "w-40",
                                                children: /*#__PURE__*/ _jsx(
                                                    SelectValue,
                                                    {
                                                        placeholder: "Category",
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
                                                                "All Categories",
                                                        }
                                                    ),
                                                    /*#__PURE__*/ _jsx(
                                                        SelectItem,
                                                        {
                                                            value: "otp",
                                                            children: "OTP",
                                                        }
                                                    ),
                                                    /*#__PURE__*/ _jsx(
                                                        SelectItem,
                                                        {
                                                            value: "booking",
                                                            children: "Booking",
                                                        }
                                                    ),
                                                    /*#__PURE__*/ _jsx(
                                                        SelectItem,
                                                        {
                                                            value: "payment",
                                                            children: "Payment",
                                                        }
                                                    ),
                                                    /*#__PURE__*/ _jsx(
                                                        SelectItem,
                                                        {
                                                            value: "commission",
                                                            children:
                                                                "Commission",
                                                        }
                                                    ),
                                                ],
                                            }),
                                        ],
                                    }),
                                    /*#__PURE__*/ _jsxs(Select, {
                                        value: audienceFilter,
                                        onValueChange: setAudienceFilter,
                                        children: [
                                            /*#__PURE__*/ _jsx(SelectTrigger, {
                                                className: "w-40",
                                                children: /*#__PURE__*/ _jsx(
                                                    SelectValue,
                                                    {
                                                        placeholder: "Audience",
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
                                                                "All Audience",
                                                        }
                                                    ),
                                                    /*#__PURE__*/ _jsx(
                                                        SelectItem,
                                                        {
                                                            value: "customer",
                                                            children:
                                                                "Customer",
                                                        }
                                                    ),
                                                    /*#__PURE__*/ _jsx(
                                                        SelectItem,
                                                        {
                                                            value: "vendor",
                                                            children: "Vendor",
                                                        }
                                                    ),
                                                ],
                                            }),
                                        ],
                                    }),
                                    /*#__PURE__*/ _jsxs(Button, {
                                        variant: "outline",
                                        children: [
                                            /*#__PURE__*/ _jsx(Filter, {
                                                className: "mr-2 h-4 w-4",
                                            }),
                                            "Filters",
                                        ],
                                    }),
                                ],
                            }),
                            /*#__PURE__*/ _jsx("div", {
                                className: "overflow-x-auto",
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
                                                                    "Template Details",
                                                            }
                                                        ),
                                                        /*#__PURE__*/ _jsx(
                                                            TableHead,
                                                            {
                                                                children:
                                                                    "Type",
                                                            }
                                                        ),
                                                        /*#__PURE__*/ _jsx(
                                                            TableHead,
                                                            {
                                                                children:
                                                                    "Category",
                                                            }
                                                        ),
                                                        /*#__PURE__*/ _jsx(
                                                            TableHead,
                                                            {
                                                                children:
                                                                    "Audience",
                                                            }
                                                        ),
                                                        /*#__PURE__*/ _jsx(
                                                            TableHead,
                                                            {
                                                                children:
                                                                    "Usage Stats",
                                                            }
                                                        ),
                                                        /*#__PURE__*/ _jsx(
                                                            TableHead,
                                                            {
                                                                children:
                                                                    "Status",
                                                            }
                                                        ),
                                                        /*#__PURE__*/ _jsx(
                                                            TableHead,
                                                            {
                                                                className:
                                                                    "text-right",
                                                                children:
                                                                    "Actions",
                                                            }
                                                        ),
                                                    ],
                                                }
                                            ),
                                        }),
                                        /*#__PURE__*/ _jsx(TableBody, {
                                            children: filteredTemplates.map(
                                                (template) =>
                                                    /*#__PURE__*/ _jsxs(
                                                        TableRow,
                                                        {
                                                            children: [
                                                                /*#__PURE__*/ _jsx(
                                                                    TableCell,
                                                                    {
                                                                        children:
                                                                            /*#__PURE__*/ _jsxs(
                                                                                "div",
                                                                                {
                                                                                    children:
                                                                                        [
                                                                                            /*#__PURE__*/ _jsx(
                                                                                                "div",
                                                                                                {
                                                                                                    className:
                                                                                                        "font-medium",
                                                                                                    children:
                                                                                                        template.name,
                                                                                                }
                                                                                            ),
                                                                                            /*#__PURE__*/ _jsx(
                                                                                                "div",
                                                                                                {
                                                                                                    className:
                                                                                                        "text-sm text-gray-500 max-w-xs",
                                                                                                    children:
                                                                                                        template
                                                                                                            .content
                                                                                                            .length >
                                                                                                        50
                                                                                                            ? `${template.content.substring(
                                                                                                                  0,
                                                                                                                  50
                                                                                                              )}...`
                                                                                                            : template.content,
                                                                                                }
                                                                                            ),
                                                                                            /*#__PURE__*/ _jsxs(
                                                                                                "div",
                                                                                                {
                                                                                                    className:
                                                                                                        "text-xs text-gray-400",
                                                                                                    children:
                                                                                                        [
                                                                                                            "ID: ",
                                                                                                            template.id,
                                                                                                        ],
                                                                                                }
                                                                                            ),
                                                                                        ],
                                                                                }
                                                                            ),
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
                                                                                        getTypeColor(
                                                                                            template.type
                                                                                        ),
                                                                                    children:
                                                                                        template.type.toUpperCase(),
                                                                                }
                                                                            ),
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
                                                                                        getCategoryColor(
                                                                                            template.category
                                                                                        ),
                                                                                    children:
                                                                                        template.category,
                                                                                }
                                                                            ),
                                                                    }
                                                                ),
                                                                /*#__PURE__*/ _jsx(
                                                                    TableCell,
                                                                    {
                                                                        children:
                                                                            /*#__PURE__*/ _jsx(
                                                                                "div",
                                                                                {
                                                                                    className:
                                                                                        "text-sm capitalize",
                                                                                    children:
                                                                                        template.targetAudience,
                                                                                }
                                                                            ),
                                                                    }
                                                                ),
                                                                /*#__PURE__*/ _jsx(
                                                                    TableCell,
                                                                    {
                                                                        children:
                                                                            /*#__PURE__*/ _jsxs(
                                                                                "div",
                                                                                {
                                                                                    children:
                                                                                        [
                                                                                            /*#__PURE__*/ _jsxs(
                                                                                                "div",
                                                                                                {
                                                                                                    className:
                                                                                                        "font-medium",
                                                                                                    children:
                                                                                                        [
                                                                                                            template.usage.toLocaleString(),
                                                                                                            " uses",
                                                                                                        ],
                                                                                                }
                                                                                            ),
                                                                                            /*#__PURE__*/ _jsxs(
                                                                                                "div",
                                                                                                {
                                                                                                    className:
                                                                                                        "text-xs text-gray-500",
                                                                                                    children:
                                                                                                        [
                                                                                                            "Modified: ",
                                                                                                            template.lastModified,
                                                                                                        ],
                                                                                                }
                                                                                            ),
                                                                                        ],
                                                                                }
                                                                            ),
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
                                                                                        getStatusColor(
                                                                                            template.status
                                                                                        ),
                                                                                    children:
                                                                                        template.status,
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
                                                                            /*#__PURE__*/ _jsxs(
                                                                                DropdownMenu,
                                                                                {
                                                                                    children:
                                                                                        [
                                                                                            /*#__PURE__*/ _jsx(
                                                                                                DropdownMenuTrigger,
                                                                                                {
                                                                                                    asChild: true,
                                                                                                    children:
                                                                                                        /*#__PURE__*/ _jsx(
                                                                                                            Button,
                                                                                                            {
                                                                                                                variant:
                                                                                                                    "ghost",
                                                                                                                size: "sm",
                                                                                                                children:
                                                                                                                    /*#__PURE__*/ _jsx(
                                                                                                                        MoreHorizontal,
                                                                                                                        {
                                                                                                                            className:
                                                                                                                                "h-4 w-4",
                                                                                                                        }
                                                                                                                    ),
                                                                                                            }
                                                                                                        ),
                                                                                                }
                                                                                            ),
                                                                                            /*#__PURE__*/ _jsxs(
                                                                                                DropdownMenuContent,
                                                                                                {
                                                                                                    align: "end",
                                                                                                    children:
                                                                                                        [
                                                                                                            /*#__PURE__*/ _jsx(
                                                                                                                DropdownMenuLabel,
                                                                                                                {
                                                                                                                    children:
                                                                                                                        "Actions",
                                                                                                                }
                                                                                                            ),
                                                                                                            /*#__PURE__*/ _jsx(
                                                                                                                DropdownMenuSeparator,
                                                                                                                {}
                                                                                                            ),
                                                                                                            /*#__PURE__*/ _jsxs(
                                                                                                                DropdownMenuItem,
                                                                                                                {
                                                                                                                    onClick:
                                                                                                                        () =>
                                                                                                                            handlePreviewTemplate(
                                                                                                                                template
                                                                                                                            ),
                                                                                                                    children:
                                                                                                                        [
                                                                                                                            /*#__PURE__*/ _jsx(
                                                                                                                                Eye,
                                                                                                                                {
                                                                                                                                    className:
                                                                                                                                        "mr-2 h-4 w-4",
                                                                                                                                }
                                                                                                                            ),
                                                                                                                            "Preview",
                                                                                                                        ],
                                                                                                                }
                                                                                                            ),
                                                                                                            /*#__PURE__*/ _jsxs(
                                                                                                                DropdownMenuItem,
                                                                                                                {
                                                                                                                    onClick:
                                                                                                                        () =>
                                                                                                                            handleEditTemplate(
                                                                                                                                template
                                                                                                                            ),
                                                                                                                    children:
                                                                                                                        [
                                                                                                                            /*#__PURE__*/ _jsx(
                                                                                                                                Edit,
                                                                                                                                {
                                                                                                                                    className:
                                                                                                                                        "mr-2 h-4 w-4",
                                                                                                                                }
                                                                                                                            ),
                                                                                                                            "Edit Template",
                                                                                                                        ],
                                                                                                                }
                                                                                                            ),
                                                                                                            /*#__PURE__*/ _jsxs(
                                                                                                                DropdownMenuItem,
                                                                                                                {
                                                                                                                    onClick:
                                                                                                                        () =>
                                                                                                                            handleTestSend(
                                                                                                                                template
                                                                                                                            ),
                                                                                                                    children:
                                                                                                                        [
                                                                                                                            /*#__PURE__*/ _jsx(
                                                                                                                                Send,
                                                                                                                                {
                                                                                                                                    className:
                                                                                                                                        "mr-2 h-4 w-4",
                                                                                                                                }
                                                                                                                            ),
                                                                                                                            "Test Send",
                                                                                                                        ],
                                                                                                                }
                                                                                                            ),
                                                                                                            /*#__PURE__*/ _jsx(
                                                                                                                DropdownMenuSeparator,
                                                                                                                {}
                                                                                                            ),
                                                                                                            /*#__PURE__*/ _jsxs(
                                                                                                                DropdownMenuItem,
                                                                                                                {
                                                                                                                    onClick:
                                                                                                                        () =>
                                                                                                                            handleDeleteTemplate(
                                                                                                                                template
                                                                                                                            ),
                                                                                                                    className:
                                                                                                                        "text-red-600",
                                                                                                                    children:
                                                                                                                        [
                                                                                                                            /*#__PURE__*/ _jsx(
                                                                                                                                Trash2,
                                                                                                                                {
                                                                                                                                    className:
                                                                                                                                        "mr-2 h-4 w-4",
                                                                                                                                }
                                                                                                                            ),
                                                                                                                            "Delete",
                                                                                                                        ],
                                                                                                                }
                                                                                                            ),
                                                                                                        ],
                                                                                                }
                                                                                            ),
                                                                                        ],
                                                                                }
                                                                            ),
                                                                    }
                                                                ),
                                                            ],
                                                        },
                                                        template.id
                                                    )
                                            ),
                                        }),
                                    ],
                                }),
                            }),
                        ],
                    }),
                ],
            }),
            /*#__PURE__*/ _jsx(Dialog, {
                open: isCreateDialogOpen,
                onOpenChange: setIsCreateDialogOpen,
                children: /*#__PURE__*/ _jsxs(DialogContent, {
                    className: "max-w-3xl",
                    children: [
                        /*#__PURE__*/ _jsxs(DialogHeader, {
                            children: [
                                /*#__PURE__*/ _jsx(DialogTitle, {
                                    children: "Create Message Template",
                                }),
                                /*#__PURE__*/ _jsx(DialogDescription, {
                                    children:
                                        "Create a new SMS or WhatsApp template for customer or vendor communications",
                                }),
                            ],
                        }),
                        /*#__PURE__*/ _jsxs("div", {
                            className:
                                "grid grid-cols-1 md:grid-cols-2 gap-4 py-4",
                            children: [
                                /*#__PURE__*/ _jsxs("div", {
                                    children: [
                                        /*#__PURE__*/ _jsx(Label, {
                                            htmlFor: "name",
                                            children: "Template Name",
                                        }),
                                        /*#__PURE__*/ _jsx(Input, {
                                            id: "name",
                                            value: newTemplate.name,
                                            onChange: (e) =>
                                                setNewTemplate({
                                                    ...newTemplate,
                                                    name: e.target.value,
                                                }),
                                            placeholder:
                                                "e.g., OTP Verification",
                                        }),
                                    ],
                                }),
                                /*#__PURE__*/ _jsxs("div", {
                                    children: [
                                        /*#__PURE__*/ _jsx(Label, {
                                            htmlFor: "type",
                                            children: "Message Type",
                                        }),
                                        /*#__PURE__*/ _jsxs(Select, {
                                            value: newTemplate.type,
                                            onValueChange: (value) =>
                                                setNewTemplate({
                                                    ...newTemplate,
                                                    type: value,
                                                }),
                                            children: [
                                                /*#__PURE__*/ _jsx(
                                                    SelectTrigger,
                                                    {
                                                        children:
                                                            /*#__PURE__*/ _jsx(
                                                                SelectValue,
                                                                {}
                                                            ),
                                                    }
                                                ),
                                                /*#__PURE__*/ _jsxs(
                                                    SelectContent,
                                                    {
                                                        children: [
                                                            /*#__PURE__*/ _jsx(
                                                                SelectItem,
                                                                {
                                                                    value: "sms",
                                                                    children:
                                                                        "SMS",
                                                                }
                                                            ),
                                                            /*#__PURE__*/ _jsx(
                                                                SelectItem,
                                                                {
                                                                    value: "whatsapp",
                                                                    children:
                                                                        "WhatsApp",
                                                                }
                                                            ),
                                                        ],
                                                    }
                                                ),
                                            ],
                                        }),
                                    ],
                                }),
                                /*#__PURE__*/ _jsxs("div", {
                                    children: [
                                        /*#__PURE__*/ _jsx(Label, {
                                            htmlFor: "category",
                                            children: "Category",
                                        }),
                                        /*#__PURE__*/ _jsxs(Select, {
                                            value: newTemplate.category,
                                            onValueChange: (value) =>
                                                setNewTemplate({
                                                    ...newTemplate,
                                                    category: value,
                                                }),
                                            children: [
                                                /*#__PURE__*/ _jsx(
                                                    SelectTrigger,
                                                    {
                                                        children:
                                                            /*#__PURE__*/ _jsx(
                                                                SelectValue,
                                                                {}
                                                            ),
                                                    }
                                                ),
                                                /*#__PURE__*/ _jsxs(
                                                    SelectContent,
                                                    {
                                                        children: [
                                                            /*#__PURE__*/ _jsx(
                                                                SelectItem,
                                                                {
                                                                    value: "otp",
                                                                    children:
                                                                        "OTP",
                                                                }
                                                            ),
                                                            /*#__PURE__*/ _jsx(
                                                                SelectItem,
                                                                {
                                                                    value: "booking",
                                                                    children:
                                                                        "Booking",
                                                                }
                                                            ),
                                                            /*#__PURE__*/ _jsx(
                                                                SelectItem,
                                                                {
                                                                    value: "payment",
                                                                    children:
                                                                        "Payment",
                                                                }
                                                            ),
                                                            /*#__PURE__*/ _jsx(
                                                                SelectItem,
                                                                {
                                                                    value: "commission",
                                                                    children:
                                                                        "Commission",
                                                                }
                                                            ),
                                                        ],
                                                    }
                                                ),
                                            ],
                                        }),
                                    ],
                                }),
                                /*#__PURE__*/ _jsxs("div", {
                                    children: [
                                        /*#__PURE__*/ _jsx(Label, {
                                            htmlFor: "audience",
                                            children: "Target Audience",
                                        }),
                                        /*#__PURE__*/ _jsxs(Select, {
                                            value: newTemplate.targetAudience,
                                            onValueChange: (value) =>
                                                setNewTemplate({
                                                    ...newTemplate,
                                                    targetAudience: value,
                                                }),
                                            children: [
                                                /*#__PURE__*/ _jsx(
                                                    SelectTrigger,
                                                    {
                                                        children:
                                                            /*#__PURE__*/ _jsx(
                                                                SelectValue,
                                                                {}
                                                            ),
                                                    }
                                                ),
                                                /*#__PURE__*/ _jsxs(
                                                    SelectContent,
                                                    {
                                                        children: [
                                                            /*#__PURE__*/ _jsx(
                                                                SelectItem,
                                                                {
                                                                    value: "customer",
                                                                    children:
                                                                        "Customer",
                                                                }
                                                            ),
                                                            /*#__PURE__*/ _jsx(
                                                                SelectItem,
                                                                {
                                                                    value: "vendor",
                                                                    children:
                                                                        "Vendor",
                                                                }
                                                            ),
                                                        ],
                                                    }
                                                ),
                                            ],
                                        }),
                                    ],
                                }),
                                /*#__PURE__*/ _jsxs("div", {
                                    className: "md:col-span-2",
                                    children: [
                                        /*#__PURE__*/ _jsx(Label, {
                                            htmlFor: "content",
                                            children: "Message Content",
                                        }),
                                        /*#__PURE__*/ _jsx(Textarea, {
                                            id: "content",
                                            value: newTemplate.content,
                                            onChange: (e) =>
                                                setNewTemplate({
                                                    ...newTemplate,
                                                    content: e.target.value,
                                                }),
                                            placeholder:
                                                "Message content... Use {{variable_name}} for dynamic content",
                                            rows: 4,
                                        }),
                                        /*#__PURE__*/ _jsx("p", {
                                            className:
                                                "text-xs text-gray-500 mt-1",
                                            children:
                                                "Use variables like {{customer_name}}, {{otp}}, {{booking_id}}, etc.",
                                        }),
                                    ],
                                }),
                            ],
                        }),
                        /*#__PURE__*/ _jsxs(DialogFooter, {
                            children: [
                                /*#__PURE__*/ _jsx(Button, {
                                    variant: "outline",
                                    onClick: () => setIsCreateDialogOpen(false),
                                    children: "Cancel",
                                }),
                                /*#__PURE__*/ _jsx(Button, {
                                    onClick: handleCreateTemplate,
                                    children: "Create Template",
                                }),
                            ],
                        }),
                    ],
                }),
            }),
            /*#__PURE__*/ _jsx(Dialog, {
                open: isEditDialogOpen,
                onOpenChange: setIsEditDialogOpen,
                children: /*#__PURE__*/ _jsxs(DialogContent, {
                    className: "max-w-3xl",
                    children: [
                        /*#__PURE__*/ _jsxs(DialogHeader, {
                            children: [
                                /*#__PURE__*/ _jsx(DialogTitle, {
                                    children: "Edit Message Template",
                                }),
                                /*#__PURE__*/ _jsx(DialogDescription, {
                                    children:
                                        "Update the message template details",
                                }),
                            ],
                        }),
                        /*#__PURE__*/ _jsxs("div", {
                            className:
                                "grid grid-cols-1 md:grid-cols-2 gap-4 py-4",
                            children: [
                                /*#__PURE__*/ _jsxs("div", {
                                    children: [
                                        /*#__PURE__*/ _jsx(Label, {
                                            htmlFor: "edit-name",
                                            children: "Template Name",
                                        }),
                                        /*#__PURE__*/ _jsx(Input, {
                                            id: "edit-name",
                                            value: newTemplate.name,
                                            onChange: (e) =>
                                                setNewTemplate({
                                                    ...newTemplate,
                                                    name: e.target.value,
                                                }),
                                            placeholder:
                                                "e.g., OTP Verification",
                                        }),
                                    ],
                                }),
                                /*#__PURE__*/ _jsxs("div", {
                                    children: [
                                        /*#__PURE__*/ _jsx(Label, {
                                            htmlFor: "edit-type",
                                            children: "Message Type",
                                        }),
                                        /*#__PURE__*/ _jsxs(Select, {
                                            value: newTemplate.type,
                                            onValueChange: (value) =>
                                                setNewTemplate({
                                                    ...newTemplate,
                                                    type: value,
                                                }),
                                            children: [
                                                /*#__PURE__*/ _jsx(
                                                    SelectTrigger,
                                                    {
                                                        children:
                                                            /*#__PURE__*/ _jsx(
                                                                SelectValue,
                                                                {}
                                                            ),
                                                    }
                                                ),
                                                /*#__PURE__*/ _jsxs(
                                                    SelectContent,
                                                    {
                                                        children: [
                                                            /*#__PURE__*/ _jsx(
                                                                SelectItem,
                                                                {
                                                                    value: "sms",
                                                                    children:
                                                                        "SMS",
                                                                }
                                                            ),
                                                            /*#__PURE__*/ _jsx(
                                                                SelectItem,
                                                                {
                                                                    value: "whatsapp",
                                                                    children:
                                                                        "WhatsApp",
                                                                }
                                                            ),
                                                        ],
                                                    }
                                                ),
                                            ],
                                        }),
                                    ],
                                }),
                                /*#__PURE__*/ _jsxs("div", {
                                    children: [
                                        /*#__PURE__*/ _jsx(Label, {
                                            htmlFor: "edit-category",
                                            children: "Category",
                                        }),
                                        /*#__PURE__*/ _jsxs(Select, {
                                            value: newTemplate.category,
                                            onValueChange: (value) =>
                                                setNewTemplate({
                                                    ...newTemplate,
                                                    category: value,
                                                }),
                                            children: [
                                                /*#__PURE__*/ _jsx(
                                                    SelectTrigger,
                                                    {
                                                        children:
                                                            /*#__PURE__*/ _jsx(
                                                                SelectValue,
                                                                {}
                                                            ),
                                                    }
                                                ),
                                                /*#__PURE__*/ _jsxs(
                                                    SelectContent,
                                                    {
                                                        children: [
                                                            /*#__PURE__*/ _jsx(
                                                                SelectItem,
                                                                {
                                                                    value: "otp",
                                                                    children:
                                                                        "OTP",
                                                                }
                                                            ),
                                                            /*#__PURE__*/ _jsx(
                                                                SelectItem,
                                                                {
                                                                    value: "booking",
                                                                    children:
                                                                        "Booking",
                                                                }
                                                            ),
                                                            /*#__PURE__*/ _jsx(
                                                                SelectItem,
                                                                {
                                                                    value: "payment",
                                                                    children:
                                                                        "Payment",
                                                                }
                                                            ),
                                                            /*#__PURE__*/ _jsx(
                                                                SelectItem,
                                                                {
                                                                    value: "commission",
                                                                    children:
                                                                        "Commission",
                                                                }
                                                            ),
                                                        ],
                                                    }
                                                ),
                                            ],
                                        }),
                                    ],
                                }),
                                /*#__PURE__*/ _jsxs("div", {
                                    children: [
                                        /*#__PURE__*/ _jsx(Label, {
                                            htmlFor: "edit-audience",
                                            children: "Target Audience",
                                        }),
                                        /*#__PURE__*/ _jsxs(Select, {
                                            value: newTemplate.targetAudience,
                                            onValueChange: (value) =>
                                                setNewTemplate({
                                                    ...newTemplate,
                                                    targetAudience: value,
                                                }),
                                            children: [
                                                /*#__PURE__*/ _jsx(
                                                    SelectTrigger,
                                                    {
                                                        children:
                                                            /*#__PURE__*/ _jsx(
                                                                SelectValue,
                                                                {}
                                                            ),
                                                    }
                                                ),
                                                /*#__PURE__*/ _jsxs(
                                                    SelectContent,
                                                    {
                                                        children: [
                                                            /*#__PURE__*/ _jsx(
                                                                SelectItem,
                                                                {
                                                                    value: "customer",
                                                                    children:
                                                                        "Customer",
                                                                }
                                                            ),
                                                            /*#__PURE__*/ _jsx(
                                                                SelectItem,
                                                                {
                                                                    value: "vendor",
                                                                    children:
                                                                        "Vendor",
                                                                }
                                                            ),
                                                        ],
                                                    }
                                                ),
                                            ],
                                        }),
                                    ],
                                }),
                                /*#__PURE__*/ _jsxs("div", {
                                    className: "md:col-span-2",
                                    children: [
                                        /*#__PURE__*/ _jsx(Label, {
                                            htmlFor: "edit-content",
                                            children: "Message Content",
                                        }),
                                        /*#__PURE__*/ _jsx(Textarea, {
                                            id: "edit-content",
                                            value: newTemplate.content,
                                            onChange: (e) =>
                                                setNewTemplate({
                                                    ...newTemplate,
                                                    content: e.target.value,
                                                }),
                                            placeholder:
                                                "Message content... Use {{variable_name}} for dynamic content",
                                            rows: 4,
                                        }),
                                    ],
                                }),
                            ],
                        }),
                        /*#__PURE__*/ _jsxs(DialogFooter, {
                            children: [
                                /*#__PURE__*/ _jsx(Button, {
                                    variant: "outline",
                                    onClick: () => setIsEditDialogOpen(false),
                                    children: "Cancel",
                                }),
                                /*#__PURE__*/ _jsx(Button, {
                                    onClick: handleUpdateTemplate,
                                    children: "Update Template",
                                }),
                            ],
                        }),
                    ],
                }),
            }),
            /*#__PURE__*/ _jsx(Dialog, {
                open: isPreviewDialogOpen,
                onOpenChange: setIsPreviewDialogOpen,
                children: /*#__PURE__*/ _jsxs(DialogContent, {
                    className: "max-w-2xl",
                    children: [
                        /*#__PURE__*/ _jsxs(DialogHeader, {
                            children: [
                                /*#__PURE__*/ _jsx(DialogTitle, {
                                    children: "Template Preview",
                                }),
                                /*#__PURE__*/ _jsx(DialogDescription, {
                                    children: "Preview of the message template",
                                }),
                            ],
                        }),
                        selectedTemplate &&
                            /*#__PURE__*/ _jsxs("div", {
                                className: "py-4",
                                children: [
                                    /*#__PURE__*/ _jsxs("div", {
                                        className:
                                            "bg-gray-50 p-4 rounded-lg mb-4",
                                        children: [
                                            /*#__PURE__*/ _jsx("h4", {
                                                className: "font-medium mb-2",
                                                children: "Template Details:",
                                            }),
                                            /*#__PURE__*/ _jsxs("div", {
                                                className:
                                                    "grid grid-cols-2 gap-2 text-sm",
                                                children: [
                                                    /*#__PURE__*/ _jsxs("div", {
                                                        children: [
                                                            /*#__PURE__*/ _jsx(
                                                                "strong",
                                                                {
                                                                    children:
                                                                        "Name:",
                                                                }
                                                            ),
                                                            " ",
                                                            selectedTemplate.name,
                                                        ],
                                                    }),
                                                    /*#__PURE__*/ _jsxs("div", {
                                                        children: [
                                                            /*#__PURE__*/ _jsx(
                                                                "strong",
                                                                {
                                                                    children:
                                                                        "Type:",
                                                                }
                                                            ),
                                                            " ",
                                                            selectedTemplate.type.toUpperCase(),
                                                        ],
                                                    }),
                                                    /*#__PURE__*/ _jsxs("div", {
                                                        children: [
                                                            /*#__PURE__*/ _jsx(
                                                                "strong",
                                                                {
                                                                    children:
                                                                        "Category:",
                                                                }
                                                            ),
                                                            " ",
                                                            selectedTemplate.category,
                                                        ],
                                                    }),
                                                    /*#__PURE__*/ _jsxs("div", {
                                                        children: [
                                                            /*#__PURE__*/ _jsx(
                                                                "strong",
                                                                {
                                                                    children:
                                                                        "Audience:",
                                                                }
                                                            ),
                                                            " ",
                                                            selectedTemplate.targetAudience,
                                                        ],
                                                    }),
                                                ],
                                            }),
                                        ],
                                    }),
                                    /*#__PURE__*/ _jsxs("div", {
                                        className:
                                            "bg-blue-50 p-4 rounded-lg mb-4",
                                        children: [
                                            /*#__PURE__*/ _jsx("h4", {
                                                className: "font-medium mb-2",
                                                children: "Original Content:",
                                            }),
                                            /*#__PURE__*/ _jsx("p", {
                                                className: "text-sm",
                                                children:
                                                    selectedTemplate.content,
                                            }),
                                        ],
                                    }),
                                    /*#__PURE__*/ _jsxs("div", {
                                        className: "bg-green-50 p-4 rounded-lg",
                                        children: [
                                            /*#__PURE__*/ _jsx("h4", {
                                                className: "font-medium mb-2",
                                                children:
                                                    "Preview with Sample Data:",
                                            }),
                                            /*#__PURE__*/ _jsx("p", {
                                                className: "text-sm",
                                                children:
                                                    getPreviewContent(
                                                        selectedTemplate
                                                    ),
                                            }),
                                        ],
                                    }),
                                    selectedTemplate.variables &&
                                        selectedTemplate.variables.length > 0 &&
                                        /*#__PURE__*/ _jsxs("div", {
                                            className: "mt-4",
                                            children: [
                                                /*#__PURE__*/ _jsx("h4", {
                                                    className:
                                                        "font-medium mb-2",
                                                    children:
                                                        "Available Variables:",
                                                }),
                                                /*#__PURE__*/ _jsx("div", {
                                                    className:
                                                        "flex flex-wrap gap-2",
                                                    children:
                                                        selectedTemplate.variables.map(
                                                            (variable) =>
                                                                /*#__PURE__*/ _jsx(
                                                                    Badge,
                                                                    {
                                                                        variant:
                                                                            "outline",
                                                                        children: `{{${variable}}}`,
                                                                    },
                                                                    variable
                                                                )
                                                        ),
                                                }),
                                            ],
                                        }),
                                ],
                            }),
                        /*#__PURE__*/ _jsx(DialogFooter, {
                            children: /*#__PURE__*/ _jsx(Button, {
                                variant: "outline",
                                onClick: () => setIsPreviewDialogOpen(false),
                                children: "Close",
                            }),
                        }),
                    ],
                }),
            }),
        ],
    });
};
export default AdminCommunicationTemplates;
