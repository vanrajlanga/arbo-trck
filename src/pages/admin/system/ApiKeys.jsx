
import { useState } from "react";
import {
  Search,
  Plus,
  MoreHorizontal,
  Eye,
  EyeOff,
  Copy,
  Trash2,
  Key,
  Shield,
  Calendar,
  Activity,
  AlertTriangle,
  CheckCircle,
  RefreshCw
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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

// Mock data for API keys
const apiKeysData = [
  {
    id: "1",
    name: "SMS Service API",
    service: "SMS Gateway",
    key: "sk_live_51234567890abcdef",
    maskedKey: "sk_live_...cdef",
    status: "active",
    createdAt: "2025-05-15",
    lastUsed: "2025-06-02",
    usage: 2450,
    limit: 5000,
    expiresAt: "2025-12-31"
  },
  {
    id: "2",
    name: "WhatsApp Business API",
    service: "WhatsApp",
    key: "whatsapp_key_98765432109876",
    maskedKey: "whatsapp_key_...9876",
    status: "active",
    createdAt: "2025-04-20",
    lastUsed: "2025-06-03",
    usage: 1890,
    limit: 3000,
    expiresAt: "2025-11-30"
  },
  {
    id: "3",
    name: "Payment Gateway",
    service: "Razorpay",
    key: "rzp_live_abcdef123456789",
    maskedKey: "rzp_live_...6789",
    status: "active",
    createdAt: "2025-03-10",
    lastUsed: "2025-06-03",
    usage: 4500,
    limit: 10000,
    expiresAt: "2026-03-10"
  },
  {
    id: "4",
    name: "Email Service",
    service: "SendGrid",
    key: "SG.abcdef123456789.xyz",
    maskedKey: "SG.abcd...xyz",
    status: "inactive",
    createdAt: "2025-02-01",
    lastUsed: "2025-05-20",
    usage: 150,
    limit: 1000,
    expiresAt: "2025-08-01"
];

const AdminSystemApiKeys = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [visibleKeys, setVisibleKeys] = useState>(new Set());
  const [newApiKey, setNewApiKey] = useState({
    name: "",
    service: "",
    key: "",
    expiresAt: "",
    isActive: true
  });
  const { toast } = useToast();

  const filteredKeys = apiKeysData.filter(key => {
    const matchesSearch = key.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         key.service.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || key.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const toggleKeyVisibility = (keyId) => {
    const newVisible = new Set(visibleKeys);
    if (newVisible.has(keyId)) {
      newVisible.delete(keyId);
    } else {
      newVisible.add(keyId);
    setVisibleKeys(newVisible);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "API key has been copied to your clipboard."
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active": return "default";
      case "inactive": return "secondary";
      case "expired": return "destructive";
      default: return "default";
  };

  const getUsagePercentage = (usage, limit) => {
    return Math.round((usage / limit) * 100);
  };

  const getUsageColor = (percentage) => {
    if (percentage >= 90) return "text-red-600";
    if (percentage >= 70) return "text-yellow-600";
    return "text-green-600";
  };

  const handleCreateApiKey = () => {
    console.log("Creating new API key:", newApiKey);
    toast({
      title: "API Key Created",
      description: "New API key has been created successfully."
    });
    setIsCreateOpen(false);
    setNewApiKey({
      name: "",
      service: "",
      key: "",
      expiresAt: "",
      isActive: true
    });
  };

  return (
    <div>
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">API Key Management</h1>
          <p className="text-gray-500">Manage API keys for external services and integrations</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add API Key
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New API Key</DialogTitle>
              <DialogDescription>
                Add a new API key for external service integration
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Key Name</Label>
                <Input
                  id="name"
                  value={newApiKey.name}
                  onChange={(e) => setNewApiKey({...newApiKey, name: e.target.value})}
                  placeholder="e.g., SMS Service API"
                />
              </div>
              <div>
                <Label htmlFor="service">Service Type</Label>
                <Select value={newApiKey.service} onValueChange={(value) => setNewApiKey({...newApiKey, service: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select service type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sms">SMS Gateway</SelectItem>
                    <SelectItem value="whatsapp">WhatsApp</SelectItem>
                    <SelectItem value="email">Email Service</SelectItem>
                    <SelectItem value="payment">Payment Gateway</SelectItem>
                    <SelectItem value="push">Push Notifications</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="key">API Key</Label>
                <Input
                  id="key"
                  type="password"
                  value={newApiKey.key}
                  onChange={(e) => setNewApiKey({...newApiKey, key: e.target.value})}
                  placeholder="Enter API key"
                />
              </div>
              <div>
                <Label htmlFor="expires">Expires At</Label>
                <Input
                  id="expires"
                  type="date"
                  value={newApiKey.expiresAt}
                  onChange={(e) => setNewApiKey({...newApiKey, expiresAt: e.target.value})}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="active"
                  checked={newApiKey.isActive}
                  onCheckedChange={(checked) => setNewApiKey({...newApiKey, isActive: checked})}
                />
                <Label htmlFor="active">Active</Label>
              </div>
              <Button onClick={handleCreateApiKey} className="w-full">
                Create API Key
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total API Keys</CardTitle>
            <Key className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">Across all services</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Keys</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Currently active</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Usage</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8,990</div>
            <p className="text-xs text-muted-foreground">API calls this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Within 30 days</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <CardTitle>API Keys</CardTitle>
          <CardDescription>
            Manage your API keys for various external services
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search API keys..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name & Service</TableHead>
                  <TableHead>API Key</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Usage</TableHead>
                  <TableHead>Last Used</TableHead>
                  <TableHead>Expires</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredKeys.map((apiKey) => {
                  const usagePercent = getUsagePercentage(apiKey.usage, apiKey.limit);
                  return (
                    <TableRow key={apiKey.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{apiKey.name}</div>
                          <div className="text-sm text-gray-500">{apiKey.service}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                            {visibleKeys.has(apiKey.id) ? apiKey.key : apiKey.maskedKey}
                          </code>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleKeyVisibility(apiKey.id)}
                          >
                            {visibleKeys.has(apiKey.id) ? 
                              <EyeOff className="h-4 w-4" /> : 
                              <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(apiKey.key)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(apiKey.status)}>
                          {apiKey.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className={`font-medium ${getUsageColor(usagePercent)}`}>
                            {apiKey.usage.toLocaleString()} / {apiKey.limit.toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-500">{usagePercent}% used</div>
                        </div>
                      </TableCell>
                      <TableCell>{apiKey.lastUsed}</TableCell>
                      <TableCell>{apiKey.expiresAt}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <RefreshCw className="mr-2 h-4 w-4" />
                              Regenerate Key
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Shield className="mr-2 h-4 w-4" />
                              View Usage Stats
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
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

      {/* Service Configuration Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Service Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">SMS Gateway</p>
                <p className="text-sm text-gray-500">Configure SMS service settings</p>
              </div>
              <Button variant="outline" size="sm">Configure</Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Payment Gateway</p>
                <p className="text-sm text-gray-500">Razorpay integration settings</p>
              </div>
              <Button variant="outline" size="sm">Configure</Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">WhatsApp Business</p>
                <p className="text-sm text-gray-500">WhatsApp API configuration</p>
              </div>
              <Button variant="outline" size="sm">Configure</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Key Rotation</p>
                <p className="text-sm text-gray-500">Auto-rotate keys every 90 days</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Usage Alerts</p>
                <p className="text-sm text-gray-500">Alert when usage exceeds 80%</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Expiry Notifications</p>
                <p className="text-sm text-gray-500">Notify 30 days before expiry</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminSystemApiKeys;
