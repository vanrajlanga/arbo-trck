import { useState } from "react";
import { Link } from "react-router-dom";
import {
    Users,
    Search,
    Filter,
    MoreHorizontal,
    Shield,
    ShieldOff,
    Eye,
    Mail,
    Phone,
    Loader2,
    RefreshCw,
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
import { useUsers, useUserStats, useUserMutations } from "@/hooks/useApi";
import { toast } from "sonner";

const AdminUsers = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(10);

    // API hooks
    const {
        data: usersResponse,
        isLoading: usersLoading,
        error: usersError,
        refetch: refetchUsers,
    } = useUsers({
        search: searchQuery,
        status: statusFilter,
        page: currentPage,
        limit: pageSize,
    });

    const {
        data: statsResponse,
        isLoading: statsLoading,
        refetch: refetchStats,
    } = useUserStats();

    const { updateStatus, delete: deleteUser } = useUserMutations();

    // Extract data from API responses
    const users = usersResponse?.data?.users || [];
    const pagination = usersResponse?.data?.pagination || {};
    const stats = statsResponse?.data || {};

    // Handle user actions
    const handleStatusToggle = async (userId, currentStatus) => {
        const newStatus = currentStatus === "active" ? "blocked" : "active";
        try {
            await updateStatus.mutateAsync({ id: userId, status: newStatus });
        } catch (error) {
            console.error("Failed to update user status:", error);
        }
    };

    const handleDeleteUser = async (userId) => {
        if (
            window.confirm(
                "Are you sure you want to delete this user? This action cannot be undone."
            )
        ) {
            try {
                await deleteUser.mutateAsync(userId);
            } catch (error) {
                console.error("Failed to delete user:", error);
            }
        }
    };

    const handleRefresh = () => {
        refetchUsers();
        refetchStats();
        toast.success("Data refreshed");
    };

    // Format currency
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            minimumFractionDigits: 0,
        }).format(amount);
    };

    // Format date
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-IN");
    };

    if (usersError) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <p className="text-red-600 mb-4">
                        Failed to load users data
                    </p>
                    <Button onClick={handleRefresh} variant="outline">
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Retry
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold">User Management</h1>
                    <p className="text-gray-500">
                        Manage all users, their activity and support tickets
                    </p>
                </div>
                <div className="mt-4 lg:mt-0 flex flex-col sm:flex-row gap-4">
                    <Button
                        onClick={handleRefresh}
                        variant="outline"
                        disabled={usersLoading || statsLoading}
                    >
                        <RefreshCw
                            className={`mr-2 h-4 w-4 ${
                                usersLoading || statsLoading
                                    ? "animate-spin"
                                    : ""
                            }`}
                        />
                        Refresh
                    </Button>
                    <Link to="/admin/users/tickets" className="inline-flex">
                        <Button variant="outline">
                            <Mail className="mr-2 h-4 w-4" />
                            Support Tickets
                        </Button>
                    </Link>
                    <Link to="/admin/users/emergency" className="inline-flex">
                        <Button variant="outline">
                            <Phone className="mr-2 h-4 w-4" />
                            Emergency Contacts
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Users
                        </CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        {statsLoading ? (
                            <div className="flex items-center">
                                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                <span>Loading...</span>
                            </div>
                        ) : (
                            <>
                                <div className="text-2xl font-bold">
                                    {stats.totalUsers || 0}
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    {stats.newSignups || 0} new this month
                                </p>
                            </>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">
                            Active Users
                        </CardTitle>
                        <Shield className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        {statsLoading ? (
                            <div className="flex items-center">
                                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                <span>Loading...</span>
                            </div>
                        ) : (
                            <>
                                <div className="text-2xl font-bold">
                                    {stats.activeUsers || 0}
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    {stats.totalUsers
                                        ? (
                                              (stats.activeUsers /
                                                  stats.totalUsers) *
                                              100
                                          ).toFixed(1)
                                        : 0}
                                    % of total users
                                </p>
                            </>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">
                            New Signups
                        </CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        {statsLoading ? (
                            <div className="flex items-center">
                                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                <span>Loading...</span>
                            </div>
                        ) : (
                            <>
                                <div className="text-2xl font-bold">
                                    {stats.newSignups || 0}
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    This month
                                </p>
                            </>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">
                            Blocked Users
                        </CardTitle>
                        <ShieldOff className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        {statsLoading ? (
                            <div className="flex items-center">
                                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                <span>Loading...</span>
                            </div>
                        ) : (
                            <>
                                <div className="text-2xl font-bold">
                                    {stats.blockedUsers || 0}
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Require attention
                                </p>
                            </>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Filters and Search */}
            <Card className="mb-6">
                <CardHeader>
                    <CardTitle>Users List</CardTitle>
                    <CardDescription>
                        Manage all registered users and their account status
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Input
                                placeholder="Search users by name, email, or phone..."
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    setCurrentPage(1); // Reset to first page on search
                                }}
                                className="pl-10"
                            />
                        </div>
                        <div className="flex gap-2">
                            <select
                                value={statusFilter}
                                onChange={(e) => {
                                    setStatusFilter(e.target.value);
                                    setCurrentPage(1); // Reset to first page on filter
                                }}
                                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                            >
                                <option value="all">All Status</option>
                                <option value="active">Active</option>
                                <option value="blocked">Blocked</option>
                            </select>
                            <Button variant="outline">
                                <Filter className="mr-2 h-4 w-4" />
                                More Filters
                            </Button>
                        </div>
                    </div>

                    {usersLoading ? (
                        <div className="flex items-center justify-center py-8">
                            <Loader2 className="h-8 w-8 animate-spin mr-2" />
                            <span>Loading users...</span>
                        </div>
                    ) : users.length === 0 ? (
                        <div className="text-center py-8">
                            <p className="text-gray-500">
                                No users found matching your criteria
                            </p>
                        </div>
                    ) : (
                        <>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>User</TableHead>
                                        <TableHead>Contact</TableHead>
                                        <TableHead>Join Date</TableHead>
                                        <TableHead>Bookings</TableHead>
                                        <TableHead>Total Spent</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Last Login</TableHead>
                                        <TableHead className="text-right">
                                            Actions
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {users.map((user) => (
                                        <TableRow key={user.id}>
                                            <TableCell>
                                                <div>
                                                    <div className="font-medium">
                                                        {user.name}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        ID: {user.id}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div>
                                                    <div className="text-sm">
                                                        {user.email}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {user.phone || "N/A"}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {formatDate(user.createdAt)}
                                            </TableCell>
                                            <TableCell>
                                                {user.totalBookings || 0}
                                            </TableCell>
                                            <TableCell>
                                                {formatCurrency(
                                                    user.totalSpent || 0
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={
                                                        user.status === "active"
                                                            ? "default"
                                                            : "destructive"
                                                    }
                                                >
                                                    {user.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                {user.lastLoginAt
                                                    ? formatDate(
                                                          user.lastLoginAt
                                                      )
                                                    : "Never"}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger
                                                        asChild
                                                    >
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            disabled={
                                                                updateStatus.isPending ||
                                                                deleteUser.isPending
                                                            }
                                                        >
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuLabel>
                                                            Actions
                                                        </DropdownMenuLabel>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem>
                                                            <Eye className="mr-2 h-4 w-4" />
                                                            View Details
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem>
                                                            <Mail className="mr-2 h-4 w-4" />
                                                            View Bookings
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem
                                                            onClick={() =>
                                                                handleStatusToggle(
                                                                    user.id,
                                                                    user.status
                                                                )
                                                            }
                                                            className={
                                                                user.status ===
                                                                "active"
                                                                    ? "text-red-600"
                                                                    : "text-green-600"
                                                            }
                                                        >
                                                            {user.status ===
                                                            "active" ? (
                                                                <>
                                                                    <ShieldOff className="mr-2 h-4 w-4" />
                                                                    Block User
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <Shield className="mr-2 h-4 w-4" />
                                                                    Activate
                                                                    User
                                                                </>
                                                            )}
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem
                                                            onClick={() =>
                                                                handleDeleteUser(
                                                                    user.id
                                                                )
                                                            }
                                                            className="text-red-600"
                                                        >
                                                            Delete User
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>

                            {/* Pagination */}
                            {pagination.totalPages > 1 && (
                                <div className="flex items-center justify-between mt-4">
                                    <div className="text-sm text-gray-500">
                                        Showing{" "}
                                        {(currentPage - 1) * pageSize + 1} to{" "}
                                        {Math.min(
                                            currentPage * pageSize,
                                            pagination.totalUsers
                                        )}{" "}
                                        of {pagination.totalUsers} users
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                setCurrentPage((prev) =>
                                                    Math.max(1, prev - 1)
                                                )
                                            }
                                            disabled={
                                                !pagination.hasPrev ||
                                                usersLoading
                                            }
                                        >
                                            Previous
                                        </Button>
                                        <span className="flex items-center px-3 text-sm">
                                            Page {currentPage} of{" "}
                                            {pagination.totalPages}
                                        </span>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                setCurrentPage(
                                                    (prev) => prev + 1
                                                )
                                            }
                                            disabled={
                                                !pagination.hasNext ||
                                                usersLoading
                                            }
                                        >
                                            Next
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <Link to="/admin/users/activity">
                            <Button
                                variant="outline"
                                className="w-full justify-start"
                            >
                                <Eye className="mr-2 h-4 w-4" />
                                View User Activity
                            </Button>
                        </Link>
                        <Link to="/admin/users/tickets">
                            <Button
                                variant="outline"
                                className="w-full justify-start"
                            >
                                <Mail className="mr-2 h-4 w-4" />
                                Support Tickets
                            </Button>
                        </Link>
                        <Link to="/admin/users/emergency">
                            <Button
                                variant="outline"
                                className="w-full justify-start"
                            >
                                <Phone className="mr-2 h-4 w-4" />
                                Emergency Contacts
                            </Button>
                        </Link>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Recent Signups</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {statsLoading ? (
                            <div className="flex items-center justify-center py-4">
                                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                <span>Loading...</span>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {(stats.recentSignups || []).map((user) => (
                                    <div
                                        key={user.id}
                                        className="flex items-center justify-between"
                                    >
                                        <div>
                                            <div className="font-medium text-sm">
                                                {user.name}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {formatDate(user.createdAt)}
                                            </div>
                                        </div>
                                        <Badge variant="outline">New</Badge>
                                    </div>
                                ))}
                                {(!stats.recentSignups ||
                                    stats.recentSignups.length === 0) && (
                                    <p className="text-sm text-gray-500">
                                        No recent signups
                                    </p>
                                )}
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Top Spenders</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {statsLoading ? (
                            <div className="flex items-center justify-center py-4">
                                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                <span>Loading...</span>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {(stats.topSpenders || []).map((user) => (
                                    <div
                                        key={user.id}
                                        className="flex items-center justify-between"
                                    >
                                        <div>
                                            <div className="font-medium text-sm">
                                                {user.name}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {user.totalBookings} bookings
                                            </div>
                                        </div>
                                        <div className="text-sm font-medium">
                                            {formatCurrency(user.totalSpent)}
                                        </div>
                                    </div>
                                ))}
                                {(!stats.topSpenders ||
                                    stats.topSpenders.length === 0) && (
                                    <p className="text-sm text-gray-500">
                                        No spending data available
                                    </p>
                                )}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default AdminUsers;
