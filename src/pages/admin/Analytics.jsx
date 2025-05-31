import React, { useState } from "react";
import {
  Calendar,
  DollarSign,
  TrendingUp,
  Users,
  Map,
  BarChart3,
  PieChart,
  LineChart
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart as RechartPieChart, Pie, Cell } from "recharts";

const AdminAnalytics = () => {
  const [timeframe, setTimeframe] = useState("month");

  // Sales data for charts
  const salesData = [
    { name: "Jan", amount: 25000 },
    { name: "Feb", amount: 32000 },
    { name: "Mar", amount: 43000 },
    { name: "Apr", amount: 51000 },
    { name: "May", amount: 47000 },
    { name: "Jun", amount: 58000 },
  ];

  // Bookings data for charts
  const bookingsData = [
    { name: "Jan", count: 32 },
    { name: "Feb", count: 45 },
    { name: "Mar", count: 61 },
    { name: "Apr", count: 75 },
    { name: "May", count: 68 },
    { name: "Jun", count: 84 },
  ];

  // Trek category data for pie chart
  const trekCategoryData = [
    { name: "Mountain", value: 45 },
    { name: "Waterfall", value: 20 },
    { name: "Valley", value: 15 },
    { name: "Beach", value: 10 },
    { name: "Forest", value: 10 },
  ];

  // Vendor performance data
  const vendorPerformanceData = [
    { name: "Mountain Explorers", treks: 12, bookings: 87, revenue: 345000 },
    { name: "Adventure Beyond", treks: 8, bookings: 65, revenue: 260000 },
    { name: "Trails & Peaks", treks: 6, bookings: 42, revenue: 168000 },
    { name: "Summit Seekers", treks: 5, bookings: 36, revenue: 144000 },
    { name: "Wilderness Wanderers", treks: 4, bookings: 28, revenue: 112000 }
  ];

  // Colors for pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <div>
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
          <p className="text-gray-500">Insights and statistics across the platform.</p>
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
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹10,29,000</div>
            <div className="flex items-center pt-1 text-sm">
              <TrendingUp className="mr-1 h-4 w-4 text-green-600" />
              <span className="text-green-600 mr-2">23%</span>
              <span className="text-muted-foreground">from last {timeframe}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">258</div>
            <div className="flex items-center pt-1 text-sm">
              <TrendingUp className="mr-1 h-4 w-4 text-green-600" />
              <span className="text-green-600 mr-2">18%</span>
              <span className="text-muted-foreground">from last {timeframe}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Treks</CardTitle>
            <Map className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">35</div>
            <div className="flex items-center pt-1 text-sm">
              <TrendingUp className="mr-1 h-4 w-4 text-green-600" />
              <span className="text-green-600 mr-2">7</span>
              <span className="text-muted-foreground">new this {timeframe}</span>
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
              <TrendingUp className="mr-1 h-4 w-4 text-green-600" />
              <span className="text-green-600 mr-2">3</span>
              <span className="text-muted-foreground">new this {timeframe}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="mb-8">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="treks">Treks</TabsTrigger>
          <TabsTrigger value="vendors">Vendors</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
              <CardDescription>Monthly revenue trend over the past 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`₹${value}`, 'Revenue']} />
                    <Legend />
                    <Bar dataKey="amount" name="Revenue" fill="#1e40af" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Trek Categories</CardTitle>
                <CardDescription>Distribution of treks by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartPieChart>
                      <Pie
                        data={trekCategoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {trekCategoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartPieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Bookings</CardTitle>
                <CardDescription>Number of bookings per month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={bookingsData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="count" name="Bookings" fill="#10b981" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="bookings" className="space-y-6">
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Booking Analytics</CardTitle>
              <CardDescription>Detailed booking statistics and trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">78%</div>
                    <div className="text-xs text-muted-foreground">Cart to checkout</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Average Group Size</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">3.4</div>
                    <div className="text-xs text-muted-foreground">Persons per booking</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Cancellation Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">5.2%</div>
                    <div className="text-xs text-muted-foreground">Of total bookings</div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="h-[300px]">
                <h3 className="text-lg font-semibold mb-4">Booking Status Distribution</h3>
                <ResponsiveContainer width="100%" height="100%">
                  <RechartPieChart>
                    <Pie
                      data={[
                        { name: 'Confirmed', value: 65 },
                        { name: 'Completed', value: 15 },
                        { name: 'Cancelled', value: 5 },
                        { name: 'Pending', value: 10 },
                        { name: 'Refunded', value: 5 },
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {
                        [
                          { name: 'Confirmed', value: 65 },
                          { name: 'Completed', value: 15 },
                          { name: 'Cancelled', value: 5 },
                          { name: 'Pending', value: 10 },
                          { name: 'Refunded', value: 5 },
                        ].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))
                      }
                    </Pie>
                    <Tooltip />
                  </RechartPieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="treks" className="space-y-6">
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Trek Analytics</CardTitle>
              <CardDescription>Insights into trek performance and popularity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">4.7/5</div>
                    <div className="text-xs text-muted-foreground">Based on 423 reviews</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Popular Difficulty</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">Moderate</div>
                    <div className="text-xs text-muted-foreground">48% of all treks</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Avg Trek Duration</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">2.8 Days</div>
                    <div className="text-xs text-muted-foreground">Across all treks</div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="h-[300px]">
                <h3 className="text-lg font-semibold mb-4">Top Performing Treks</h3>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { name: 'Himalayan Adventure', bookings: 87, revenue: 435000 },
                      { name: 'Valley Trek', bookings: 65, revenue: 325000 },
                      { name: 'Mountain View Trek', bookings: 54, revenue: 270000 },
                      { name: 'Forest Expedition', bookings: 43, revenue: 215000 },
                      { name: 'Beach Trek', bookings: 32, revenue: 160000 },
                    ]}
                    layout="vertical"
                    margin={{ left: 120 }}
                  >
                    <CartesianGrid horizontal={true} vertical={false} strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="name" width={100} />
                    <Tooltip formatter={(value, name) => [name === 'revenue' ? `₹${value}` : value, name === 'revenue' ? 'Revenue' : 'Bookings']} />
                    <Legend />
                    <Bar dataKey="bookings" name="Bookings" fill="#10b981" />
                    <Bar dataKey="revenue" name="Revenue" fill="#1e40af" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="vendors" className="space-y-6">
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Vendor Analytics</CardTitle>
              <CardDescription>Performance metrics for vendors on the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <h3 className="text-lg font-semibold mb-4">Top Performing Vendors</h3>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={vendorPerformanceData}
                    layout="vertical"
                    margin={{ left: 160 }}
                  >
                    <CartesianGrid horizontal={true} vertical={false} strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="name" width={150} />
                    <Tooltip formatter={(value, name) => {
                      if (name === 'revenue') return [`₹${value}`, 'Revenue'];
                      if (typeof name === 'string') {
                        return [value, name.charAt(0).toUpperCase() + name.slice(1)];
                      }
                      return [value, name];
                    }} />
                    <Legend />
                    <Bar dataKey="treks" name="Treks" fill="#8884d8" />
                    <Bar dataKey="bookings" name="Bookings" fill="#10b981" />
                    <Bar dataKey="revenue" name="Revenue (₹)" fill="#1e40af" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Vendor Growth</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+28%</div>
                    <div className="text-xs text-muted-foreground">New vendors this year</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Vendor Retention</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">92%</div>
                    <div className="text-xs text-muted-foreground">Year over year retention</div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Overview of recent platform activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <Users className="h-4 w-4 text-primary" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">New Vendor Registration</p>
                <p className="text-sm text-muted-foreground">Summit Seekers joined the platform</p>
                <p className="text-xs text-muted-foreground">3 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <Map className="h-4 w-4 text-primary" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">New Trek Added</p>
                <p className="text-sm text-muted-foreground">Mountain Explorers added "Himalayan Summit Challenge"</p>
                <p className="text-xs text-muted-foreground">5 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <Calendar className="h-4 w-4 text-primary" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">High Booking Volume</p>
                <p className="text-sm text-muted-foreground">15 bookings in the last hour</p>
                <p className="text-xs text-muted-foreground">6 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <DollarSign className="h-4 w-4 text-primary" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Revenue Milestone Reached</p>
                <p className="text-sm text-muted-foreground">Platform crossed ₹10 Lakhs in monthly revenue</p>
                <p className="text-xs text-muted-foreground">12 hours ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAnalytics;
