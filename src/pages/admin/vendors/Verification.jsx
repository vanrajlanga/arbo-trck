import { useState } from "react";
import {
    Search,
    Filter,
    MoreHorizontal,
    Eye,
    Check,
    X,
    Download,
    FileText,
    Camera,
    CreditCard,
    Building,
    AlertTriangle,
    Clock,
    CheckCircle,
    XCircle,
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
import { Textarea } from "@/components/ui/textarea";

// Mock data for vendor verification
const vendorData = [
    {
        id: "VEN001",
        name: "Adventure Trek Co.",
        email: "contact@adventuretrek.com",
        phone: "+91 9876543210",
        city: "Mumbai",
        state: "Maharashtra",
        submissionDate: "2025-06-01",
        status: "pending",
        documents: {
            businessLicense: { status: "uploaded", verified: false },
            gstCertificate: { status: "uploaded", verified: true },
            panCard: { status: "uploaded", verified: false },
            bankDetails: { status: "uploaded", verified: true },
            insuranceCertificate: { status: "missing", verified: false },
        },
        verificationNotes: "",
        assignedTo: "Verification Team A",
    },
    {
        id: "VEN002",
        name: "Mountain Explorers",
        email: "info@mountainexplorers.com",
        phone: "+91 8765432109",
        city: "Delhi",
        state: "Delhi",
        submissionDate: "2025-05-28",
        status: "approved",
        documents: {
            businessLicense: { status: "uploaded", verified: true },
            gstCertificate: { status: "uploaded", verified: true },
            panCard: { status: "uploaded", verified: true },
            bankDetails: { status: "uploaded", verified: true },
            insuranceCertificate: { status: "uploaded", verified: true },
        },
        verificationNotes: "All documents verified successfully",
        assignedTo: "Verification Team B",
    },
    {
        id: "VEN003",
        name: "Himalayan Adventures",
        email: "contact@himalayanadv.com",
        phone: "+91 7654321098",
        city: "Dehradun",
        state: "Uttarakhand",
        submissionDate: "2025-06-02",
        status: "rejected",
        documents: {
            businessLicense: { status: "uploaded", verified: false },
            gstCertificate: { status: "missing", verified: false },
            panCard: { status: "uploaded", verified: true },
            bankDetails: { status: "uploaded", verified: false },
            insuranceCertificate: { status: "missing", verified: false },
        },
        verificationNotes:
            "GST certificate and insurance documents missing. Business license appears to be invalid.",
        assignedTo: "Verification Team A",
    },
];

const AdminVendorVerification = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [selectedVendor, setSelectedVendor] = useState(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [verificationNotes, setVerificationNotes] = useState("");

    const filteredVendors = vendorData.filter((vendor) => {
        const matchesSearch =
            vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            vendor.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            vendor.id.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus =
            statusFilter === "all" || vendor.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const getStatusColor = (status) => {
        switch (status) {
            case "pending":
                return "default";
            case "approved":
            case "rejected":
                return "destructive";
            default:
                return "default";
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case "pending":
                return <Clock className="h-4 w-4" />;
            case "approved":
                return <CheckCircle className="h-4 w-4" />;
            case "rejected":
                return <XCircle className="h-4 w-4" />;
            default:
                return <Clock className="h-4 w-4" />;
        }
    };

    const getDocumentIcon = (docType) => {
        switch (docType) {
            case "businessLicense":
                return <Building className="h-4 w-4" />;
            case "gstCertificate":
                return <FileText className="h-4 w-4" />;
            case "panCard":
                return <CreditCard className="h-4 w-4" />;
            case "bankDetails":
                return <Building className="h-4 w-4" />;
            case "insuranceCertificate":
                return <FileText className="h-4 w-4" />;
            default:
                return <FileText className="h-4 w-4" />;
        }
    };

    const getDocumentName = (docType) => {
        switch (docType) {
            case "businessLicense":
                return "Business License";
            case "gstCertificate":
                return "GST Certificate";
            case "panCard":
                return "PAN Card";
            case "bankDetails":
                return "Bank Details";
            case "insuranceCertificate":
                return "Insurance Certificate";
            default:
                return docType;
        }
    };

    const getDocumentStatusBadge = (doc) => {
        if (doc.status === "missing") {
            return <Badge variant="destructive">Missing</Badge>;
        }
        if (doc.status === "uploaded" && doc.verified) {
            return <Badge variant="default">Verified</Badge>;
        }
        if (doc.status === "uploaded" && !doc.verified) {
            return <Badge variant="secondary">Pending</Badge>;
        }
        return <Badge variant="secondary">Unknown</Badge>;
    };

    const calculateCompletionPercentage = (documents) => {
        const totalDocs = Object.keys(documents).length;
        const verifiedDocs = Object.values(documents).filter(
            (doc) => doc.verified
        ).length;
        return Math.round((verifiedDocs / totalDocs) * 100);
    };

    return (
        <div>
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold">
                        Vendor Document Verification
                    </h1>
                    <p className="text-gray-500">
                        Review and verify vendor documentation for approval
                    </p>
                </div>
                <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Export Report
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">
                            Pending Verification
                        </CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">15</div>
                        <p className="text-xs text-muted-foreground">
                            Awaiting review
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">
                            Approved This Week
                        </CardTitle>
                        <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">8</div>
                        <p className="text-xs text-muted-foreground">
                            +25% from last week
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">
                            Rejected Applications
                        </CardTitle>
                        <XCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">3</div>
                        <p className="text-xs text-muted-foreground">
                            Needs resubmission
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">
                            Avg. Processing Time
                        </CardTitle>
                        <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">3.2</div>
                        <p className="text-xs text-muted-foreground">
                            Days average
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Main Content */}
            <Card>
                <CardHeader>
                    <CardTitle>Vendor Applications</CardTitle>
                    <CardDescription>
                        Review vendor documentation and approve or reject
                        applications
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col lg:flex-row gap-4 mb-6">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Input
                                placeholder="Search vendors by name, email, or ID..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <Select
                            value={statusFilter}
                            onValueChange={setStatusFilter}
                        >
                            <SelectTrigger className="w-40">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="approved">
                                    Approved
                                </SelectItem>
                                <SelectItem value="rejected">
                                    Rejected
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Vendor Details</TableHead>
                                    <TableHead>Location</TableHead>
                                    <TableHead>Submission Date</TableHead>
                                    <TableHead>Completion</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Assigned To</TableHead>
                                    <TableHead className="text-right">
                                        Actions
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredVendors.map((vendor) => {
                                    const completionPercentage =
                                        calculateCompletionPercentage(
                                            vendor.documents
                                        );
                                    return (
                                        <TableRow key={vendor.id}>
                                            <TableCell>
                                                <div>
                                                    <div className="font-medium">
                                                        {vendor.name}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {vendor.email}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {vendor.phone}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div>
                                                    <div className="font-medium">
                                                        {vendor.city}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {vendor.state}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {vendor.submissionDate}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <div className="w-16 bg-gray-200 rounded-full h-2">
                                                        <div
                                                            className="bg-blue-600 h-2 rounded-full"
                                                            style={{
                                                                width: `${completionPercentage}%`,
                                                            }}
                                                        ></div>
                                                    </div>
                                                    <span className="text-sm">
                                                        {completionPercentage}%
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={getStatusColor(
                                                        vendor.status
                                                    )}
                                                    className="flex items-center gap-1 w-fit"
                                                >
                                                    {getStatusIcon(
                                                        vendor.status
                                                    )}
                                                    {vendor.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                {vendor.assignedTo}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger
                                                        asChild
                                                    >
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                        >
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuLabel>
                                                            Actions
                                                        </DropdownMenuLabel>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem
                                                            onClick={() => {
                                                                setSelectedVendor(
                                                                    vendor
                                                                );
                                                                setVerificationNotes(
                                                                    vendor.verificationNotes
                                                                );
                                                                setIsDetailsOpen(
                                                                    true
                                                                );
                                                            }}
                                                        >
                                                            <Eye className="mr-2 h-4 w-4" />
                                                            Review Documents
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem>
                                                            <Check className="mr-2 h-4 w-4" />
                                                            Approve Vendor
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem>
                                                            <X className="mr-2 h-4 w-4" />
                                                            Reject Application
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            {/* Document Review Dialog */}
            <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>
                            Document Verification - {selectedVendor?.name}
                        </DialogTitle>
                        <DialogDescription>
                            Review and verify vendor documentation
                        </DialogDescription>
                    </DialogHeader>
                    {selectedVendor && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <h4 className="font-medium">
                                        Vendor Information
                                    </h4>
                                    <div className="text-sm">
                                        <p>
                                            <strong>Name:</strong>{" "}
                                            {selectedVendor.name}
                                        </p>
                                        <p>
                                            <strong>Email:</strong>{" "}
                                            {selectedVendor.email}
                                        </p>
                                        <p>
                                            <strong>Phone:</strong>{" "}
                                            {selectedVendor.phone}
                                        </p>
                                        <p>
                                            <strong>Location:</strong>{" "}
                                            {selectedVendor.city},{" "}
                                            {selectedVendor.state}
                                        </p>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <h4 className="font-medium">
                                        Application Details
                                    </h4>
                                    <div className="text-sm">
                                        <p>
                                            <strong>Submission Date:</strong>{" "}
                                            {selectedVendor.submissionDate}
                                        </p>
                                        <p>
                                            <strong>Status:</strong>
                                            <Badge
                                                variant={getStatusColor(
                                                    selectedVendor.status
                                                )}
                                                className="ml-2"
                                            >
                                                {selectedVendor.status}
                                            </Badge>
                                        </p>
                                        <p>
                                            <strong>Assigned To:</strong>{" "}
                                            {selectedVendor.assignedTo}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h4 className="font-medium">
                                    Document Verification
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {Object.entries(
                                        selectedVendor.documents
                                    ).map(([docType, doc]) => (
                                        <div
                                            key={docType}
                                            className="border rounded-lg p-4"
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-2">
                                                    {getDocumentIcon(docType)}
                                                    <span className="font-medium">
                                                        {getDocumentName(
                                                            docType
                                                        )}
                                                    </span>
                                                </div>
                                                {getDocumentStatusBadge(doc)}
                                            </div>
                                            <div className="flex gap-2">
                                                {doc.status === "uploaded" ? (
                                                    <>
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                        >
                                                            <Eye className="mr-2 h-4 w-4" />
                                                            View
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                        >
                                                            <Download className="mr-2 h-4 w-4" />
                                                            Download
                                                        </Button>
                                                        {!doc.verified && (
                                                            <Button size="sm">
                                                                <Check className="mr-2 h-4 w-4" />
                                                                Verify
                                                            </Button>
                                                        )}
                                                    </>
                                                ) : (
                                                    <p className="text-sm text-red-600">
                                                        Document not uploaded
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <h4 className="font-medium">
                                    Verification Notes
                                </h4>
                                <Textarea
                                    value={verificationNotes}
                                    onChange={(e) =>
                                        setVerificationNotes(e.target.value)
                                    }
                                    placeholder="Add notes about the verification process..."
                                    className="min-h-[100px]"
                                />
                            </div>

                            <div className="flex gap-2">
                                <Button>
                                    <Check className="mr-2 h-4 w-4" />
                                    Approve Vendor
                                </Button>
                                <Button variant="destructive">
                                    <X className="mr-2 h-4 w-4" />
                                    Reject Application
                                </Button>
                                <Button variant="outline">Save Notes</Button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AdminVendorVerification;
