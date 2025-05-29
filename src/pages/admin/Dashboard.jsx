
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  Map,
  Calendar,
  TrendingUp,
  BarChart,
  ArrowUp,
  ArrowDown,
  DollarSign,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data
const vendorsData = [
  {
    id: 1,
    name: "Mountain Explorers",
    joinDate: "Jan 15, 2025",
    treks: 5,
    revenue: "₹145,000",
    status: "Active"
  },
  {
    id: 2,
    name: "Adventure Beyond",
    joinDate: "Feb 3, 2025",
    treks: 3,
    revenue: "₹87,500",
    status: "Active"
  },
  {
    id: 3,
    name: "Trails & Peaks",
    joinDate: "Mar 10, 2025",
    treks: 2,
    revenue: "₹62,000",
    status: "Pending"
  },
  {
    id: 4,
    name: "Himalayan Journeys",
    joinDate: "Mar 22, 2025",
    treks: 0,
    revenue: "₹0",
    status: "Under Review"
  },
];

const treksData = [
  {
    id: 1,
    name: "Dandeli Adventure Trek",
    vendor: "Mountain Explorers",
    bookings: 42,
    revenue: "₹126,000",
    rating: 4.8
  },
  {
    id: 2,
    name: "Gokarna Beach Trek",
    vendor: "Adventure Beyond",
    bookings: 35,
    revenue: "₹105,000",
    rating: 4.5
  },
  {
    id: 3,
    name: "Vibhuti Waterfalls Trek",
    vendor: "Mountain Explorers",
    bookings: 19,
    revenue: "₹38,000",
    rating: 4.7
  },
  {
    id: 4,
    name: "Kudremukh Peak Trek",
    vendor: "Trails & Peaks",
    bookings: 28,
    revenue: "₹78,400",
    rating: 4.6
  },
];

const bookingsData = [
  {
    id: "TBR5678",
    customer: "Rahul Sharma",
    trek: "Dandeli Adventure Trek",
    vendor: "Mountain Explorers",
    date: "May 25, 2025",
    amount: "₹6,000",
    status: "Confirmed"
  },
  {
    id: "TBR5679",
    customer: "Priya Patel",
    trek: "Gokarna Beach Trek",
    vendor: "Adventure Beyond",
    date: "Jun 10, 2025",
    amount: "₹9,000",
    status: "Confirmed"
  },
  {
    id: "TBR5680",
    customer: "Ankit Gupta",
    trek: "Vibhuti Waterfalls Trek",
    vendor: "Mountain Explorers",
    date: "Jun 18, 2025",
    amount: "₹3,000",
    status: "Pending"
  },
  {
    id: "TBR5681",
    customer: "Neha Singh",
    trek: "Kudremukh Peak Trek",
    vendor: "Trails & Peaks",
    date: "Jul 05, 2025",
    amount: "₹5,600",
    status: "Refund Requested"
  },
];

const AdminDashboard = () => {
  const [timeframe, setTimeframe] = useState("month");

  return (
    <div>
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-500">Welcome back, Admin. Here's what's happening.</p>
        </div>
        <div className="mt-4 lg:mt-0">
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Last 7 days</SelectItem>
              <SelectItem value="month">Last 30 days</SelectItem>
              <SelectItem value="quarter">Last 90 days</SelectItem>
              <SelectItem value="year">Last 12 months</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">124</div>
            <div className="flex items-center pt-1 text-sm">
              <ArrowUp className="mr-1 h-4 w-4 text-green-600" />
              <span className="text-green-600 mr-2">12%</span>
              <span className="text-muted-foreground">from last {timeframe}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹347,500</div>
            <div className="flex items-center pt-1 text-sm">
              <ArrowUp className="mr-1 h-4 w-4 text-green-600" />
              <span className="text-green-600 mr-2">18%</span>
              <span className="text-muted-foreground">from last {timeframe}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Vendors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">13</div>
            <div className="flex items-center pt-1 text-sm">
              <ArrowUp className="mr-1 h-4 w-4 text-green-600" />
              <span className="text-green-600 mr-2">4</span>
              <span className="text-muted-foreground">new this {timeframe}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Treks</CardTitle>
            <Map className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28</div>
            <div className="flex items-center pt-1 text-sm">
              <ArrowDown className="mr-1 h-4 w-4 text-red-600" />
              <span className="text-red-600 mr-2">2</span>
              <span className="text-muted-foreground">from last {timeframe}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Popular Treks</CardTitle>
            <CardDescription>
              Top performing treks by bookings and revenue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Trek Name</TableHead>
                  <TableHead>Bookings</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead className="text-right">Rating</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {treksData.map((trek) => (
                  <TableRow key={trek.id}>
                    <TableCell className="font-medium">{trek.name}</TableCell>
                    <TableCell>{trek.bookings}</TableCell>
                    <TableCell>{trek.revenue}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end">
                        <span className="font-medium">{trek.rating}</span>
                        <span className="text-yellow-500 ml-1">★</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-4 text-center">
              <Link to="/admin/treks" className="text-sm text-blue-600 hover:underline">
                View all treks
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
            <CardDescription>
              Latest bookings across all vendors
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookingsData.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell className="font-medium">{booking.id}</TableCell>
                    <TableCell>{booking.customer}</TableCell>
                    <TableCell>{booking.amount}</TableCell>
                    <TableCell className="text-right">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          booking.status === "Confirmed"
                            ? "bg-green-100 text-green-800"
                            : booking.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-4 text-center">
              <Link to="/admin/bookings" className="text-sm text-blue-600 hover:underline">
                View all bookings
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Recent Vendors</CardTitle>
          <CardDescription>
            Recently joined or updated vendor accounts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vendor Name</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Trek Count</TableHead>
                <TableHead>Total Revenue</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vendorsData.map((vendor) => (
                <TableRow key={vendor.id}>
                  <TableCell className="font-medium">{vendor.name}</TableCell>
                  <TableCell>{vendor.joinDate}</TableCell>
                  <TableCell>{vendor.treks}</TableCell>
                  <TableCell>{vendor.revenue}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        vendor.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : vendor.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {vendor.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">View Details</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-4 text-center">
            <Link to="/admin/vendors" className="text-sm text-blue-600 hover:underline">
              View all vendors
            </Link>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Monthly Revenue</CardTitle>
            <CardDescription>
              Revenue trends over the past 6 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center bg-slate-50 rounded-md">
              {/* In a real app, this would be a line chart component */}
              <BarChart className="h-16 w-16 text-slate-300" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Vendor Applications</CardTitle>
            <CardDescription>
              New vendors awaiting approval
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 rounded-md bg-slate-50">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">Summit Seekers</h4>
                    <p className="text-xs text-gray-500">Applied 2 days ago</p>
                  </div>
                  <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-800">
                    New
                  </span>
                </div>
                <div className="flex justify-between mt-3">
                  <Button variant="outline" size="sm">View</Button>
                  <div className="space-x-2">
                    <Button variant="destructive" size="sm">Reject</Button>
                    <Button variant="default" size="sm">Approve</Button>
                  </div>
                </div>
              </div>
              
              <div className="p-3 rounded-md bg-slate-50">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">Wild Wanderers</h4>
                    <p className="text-xs text-gray-500">Applied 3 days ago</p>
                  </div>
                  <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-800">
                    New
                  </span>
                </div>
                <div className="flex justify-between mt-3">
                  <Button variant="outline" size="sm">View</Button>
                  <div className="space-x-2">
                    <Button variant="destructive" size="sm">Reject</Button>
                    <Button variant="default" size="sm">Approve</Button>
                  </div>
                </div>
              </div>
              
              <div className="p-3 rounded-md bg-slate-50">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">Peak Pioneers</h4>
                    <p className="text-xs text-gray-500">Applied 5 days ago</p>
                  </div>
                  <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800">
                    In Review
                  </span>
                </div>
                <div className="flex justify-between mt-3">
                  <Button variant="outline" size="sm">View</Button>
                  <div className="space-x-2">
                    <Button variant="destructive" size="sm">Reject</Button>
                    <Button variant="default" size="sm">Approve</Button>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 text-center">
                <Link to="/admin/vendors/applications" className="text-sm text-blue-600 hover:underline">
                  View all applications
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
