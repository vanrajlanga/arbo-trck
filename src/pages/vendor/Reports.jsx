import { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    BarChart as ChartIcon,
    TrendingUp,
    Users,
    Calendar,
    Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell,
} from "recharts";

// Mock data for charts
const bookingsData = [
    { name: "Jan", bookings: 65, revenue: 42000 },
    { name: "Feb", bookings: 80, revenue: 52000 },
    { name: "Mar", bookings: 95, revenue: 62000 },
    { name: "Apr", bookings: 78, revenue: 51000 },
    { name: "May", bookings: 92, revenue: 60000 },
    { name: "Jun", bookings: 130, revenue: 84000 },
];

const trekPopularityData = [
    { name: "Dandeli Adventure Trek", value: 55 },
    { name: "Gokarna Beach Trek", value: 43 },
    { name: "Kudremukh Peak Trek", value: 28 },
    { name: "Vibhuti Waterfalls Trek", value: 15 },
    { name: "Other Treks", value: 12 },
];

const customerDemographicsData = [
    { name: "Bangalore", value: 42 },
    { name: "Mumbai", value: 23 },
    { name: "Delhi", value: 18 },
    { name: "Chennai", value: 11 },
    { name: "Other", value: 6 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

// Analysis cards data
const analysisCards = [
    {
        title: "Total Bookings",
        value: "453",
        change: "+12.5%",
        timeframe: "vs. last month",
        trend: "up",
        icon: Calendar,
    },
    {
        title: "Revenue",
        value: "₹2,95,000",
        change: "+8.2%",
        timeframe: "vs. last month",
        trend: "up",
        icon: TrendingUp,
    },
    {
        title: "Customers",
        value: "382",
        change: "+15.3%",
        timeframe: "vs. last month",
        trend: "up",
        icon: Users,
    },
    {
        title: "Avg. Booking Value",
        value: "₹6,512",
        change: "-2.1%",
        timeframe: "vs. last month",
        trend: "down",
        icon: ChartIcon,
    },
];

const VendorReports = () => {
    const [timeFrame, setTimeFrame] = useState("6months");

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <h1 className="text-2xl font-bold mb-2 md:mb-0">Reports</h1>
                <div className="flex items-center gap-2">
                    <Select
                        defaultValue={timeFrame}
                        onValueChange={setTimeFrame}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Time Frame" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="30days">Last 30 Days</SelectItem>
                            <SelectItem value="3months">
                                Last 3 Months
                            </SelectItem>
                            <SelectItem value="6months">
                                Last 6 Months
                            </SelectItem>
                            <SelectItem value="1year">Last Year</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button
                        variant="outline"
                        className="flex items-center gap-2"
                    >
                        <Download className="h-4 w-4" />
                        Export
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {analysisCards.map((card, index) => (
                    <Card key={index}>
                        <CardContent className="p-6">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-sm text-gray-500">
                                        {card.title}
                                    </p>
                                    <h3 className="text-2xl font-bold mt-1">
                                        {card.value}
                                    </h3>
                                    <p
                                        className={`text-xs mt-1 flex items-center ${
                                            card.trend === "up"
                                                ? "text-green-600"
                                                : "text-red-600"
                                        }`}
                                    >
                                        {card.change}{" "}
                                        <span className="text-gray-500 ml-1">
                                            {card.timeframe}
                                        </span>
                                    </p>
                                </div>
                                <div className="bg-gray-100 p-2 rounded-md">
                                    <card.icon className="h-5 w-5 text-gray-500" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Tabs defaultValue="bookings">
                <TabsList className="mb-4">
                    <TabsTrigger value="bookings">
                        Bookings & Revenue
                    </TabsTrigger>
                    <TabsTrigger value="treks">Trek Analytics</TabsTrigger>
                    <TabsTrigger value="customers">
                        Customer Analytics
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="bookings">
                    <Card>
                        <CardHeader>
                            <CardTitle>Bookings & Revenue Analysis</CardTitle>
                            <CardDescription>
                                View your booking trends and revenue generation
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-2">
                            <div className="h-[400px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        data={bookingsData}
                                        margin={{
                                            top: 20,
                                            right: 30,
                                            left: 20,
                                            bottom: 5,
                                        }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis
                                            yAxisId="left"
                                            orientation="left"
                                            stroke="#8884d8"
                                        />
                                        <YAxis
                                            yAxisId="right"
                                            orientation="right"
                                            stroke="#82ca9d"
                                        />
                                        <Tooltip />
                                        <Legend />
                                        <Bar
                                            yAxisId="left"
                                            dataKey="bookings"
                                            name="Bookings"
                                            fill="#8884d8"
                                        />
                                        <Bar
                                            yAxisId="right"
                                            dataKey="revenue"
                                            name="Revenue (₹)"
                                            fill="#82ca9d"
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Booking Trend</CardTitle>
                                <CardDescription>
                                    Month-wise booking trend analysis
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[300px]">
                                    <ResponsiveContainer
                                        width="100%"
                                        height="100%"
                                    >
                                        <LineChart
                                            data={bookingsData}
                                            margin={{
                                                top: 5,
                                                right: 30,
                                                left: 20,
                                                bottom: 5,
                                            }}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Line
                                                type="monotone"
                                                dataKey="bookings"
                                                name="Bookings"
                                                stroke="#8884d8"
                                                activeDot={{ r: 8 }}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Revenue Analysis</CardTitle>
                                <CardDescription>
                                    Month-wise revenue analysis
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[300px]">
                                    <ResponsiveContainer
                                        width="100%"
                                        height="100%"
                                    >
                                        <LineChart
                                            data={bookingsData}
                                            margin={{
                                                top: 5,
                                                right: 30,
                                                left: 20,
                                                bottom: 5,
                                            }}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Line
                                                type="monotone"
                                                dataKey="revenue"
                                                name="Revenue (₹)"
                                                stroke="#82ca9d"
                                                activeDot={{ r: 8 }}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="treks">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Trek Popularity</CardTitle>
                                <CardDescription>
                                    Comparison of trek bookings
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[300px]">
                                    <ResponsiveContainer
                                        width="100%"
                                        height="100%"
                                    >
                                        <PieChart>
                                            <Pie
                                                data={trekPopularityData}
                                                cx="50%"
                                                cy="50%"
                                                labelLine={false}
                                                outerRadius={80}
                                                fill="#8884d8"
                                                dataKey="value"
                                                label={({ name, percent }) =>
                                                    `${name}: ${(
                                                        percent * 100
                                                    ).toFixed(0)}%`
                                                }
                                            >
                                                {trekPopularityData.map(
                                                    (entry, index) => (
                                                        <Cell
                                                            key={`cell-${index}`}
                                                            fill={
                                                                COLORS[
                                                                    index %
                                                                        COLORS.length
                                                                ]
                                                            }
                                                        />
                                                    )
                                                )}
                                            </Pie>
                                            <Tooltip />
                                            <Legend />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Trek Performance</CardTitle>
                                <CardDescription>
                                    Revenue generation by trek
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[300px]">
                                    <ResponsiveContainer
                                        width="100%"
                                        height="100%"
                                    >
                                        <BarChart
                                            layout="vertical"
                                            data={trekPopularityData}
                                            margin={{
                                                top: 5,
                                                right: 30,
                                                left: 70,
                                                bottom: 5,
                                            }}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis type="number" />
                                            <YAxis
                                                type="category"
                                                dataKey="name"
                                            />
                                            <Tooltip />
                                            <Legend />
                                            <Bar
                                                dataKey="value"
                                                name="Bookings"
                                                fill="#8884d8"
                                            />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="customers">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Customer Demographics</CardTitle>
                                <CardDescription>
                                    Distribution of customers by location
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[300px]">
                                    <ResponsiveContainer
                                        width="100%"
                                        height="100%"
                                    >
                                        <PieChart>
                                            <Pie
                                                data={customerDemographicsData}
                                                cx="50%"
                                                cy="50%"
                                                labelLine={false}
                                                outerRadius={80}
                                                fill="#8884d8"
                                                dataKey="value"
                                                label={({ name, percent }) =>
                                                    `${name}: ${(
                                                        percent * 100
                                                    ).toFixed(0)}%`
                                                }
                                            >
                                                {customerDemographicsData.map(
                                                    (entry, index) => (
                                                        <Cell
                                                            key={`cell-${index}`}
                                                            fill={
                                                                COLORS[
                                                                    index %
                                                                        COLORS.length
                                                                ]
                                                            }
                                                        />
                                                    )
                                                )}
                                            </Pie>
                                            <Tooltip />
                                            <Legend />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Customer Acquisition</CardTitle>
                                <CardDescription>
                                    New customer signups over time
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[300px]">
                                    <ResponsiveContainer
                                        width="100%"
                                        height="100%"
                                    >
                                        <LineChart
                                            data={bookingsData}
                                            margin={{
                                                top: 5,
                                                right: 30,
                                                left: 20,
                                                bottom: 5,
                                            }}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Line
                                                type="monotone"
                                                dataKey="bookings"
                                                name="New Customers"
                                                stroke="#FF8042"
                                                activeDot={{ r: 8 }}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default VendorReports;
