import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext.new";
import { Link } from "react-router-dom";
import {
    Menu,
    X,
    Home,
    Users,
    Building,
    Map,
    Calendar,
    Tag,
    MessageSquare,
    HelpCircle,
    MapPin,
    CreditCard,
    Wallet,
    Shield,
    BarChart,
    Settings,
    LogOut,
    Image,
} from "lucide-react";

const AdminLayout = () => {
    const { user, logout } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const isActive = (path) => {
        return (
            location.pathname === path ||
            location.pathname.startsWith(`${path}/`)
        );
    };

    return (
        <div className="flex min-h-screen">
            {/* Mobile sidebar toggle */}
            <div
                className="fixed inset-0 z-20 bg-black/50 lg:hidden"
                onClick={() => setSidebarOpen(false)}
                style={{ display: sidebarOpen ? "block" : "none" }}
            ></div>

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-aorbo-teal text-white transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-auto ${
                    sidebarOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div className="flex h-16 items-center justify-center px-4 bg-aorbo-teal">
                    <Link to="/admin" className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-aorbo-yellow flex items-center justify-center">
                            <span className="text-black font-bold text-lg">
                                A
                            </span>
                        </div>
                        <span className="text-xl font-bold">Aorbo Admin</span>
                    </Link>
                </div>
                <nav className="mt-5 px-2">
                    <Link
                        to="/admin"
                        className={`group flex items-center px-4 py-3 rounded-md transition-all ${
                            isActive("/admin") &&
                            !isActive("/admin/users") &&
                            !isActive("/admin/vendors") &&
                            !isActive("/admin/treks") &&
                            !isActive("/admin/bookings") &&
                            !isActive("/admin/coupons") &&
                            !isActive("/admin/communications") &&
                            !isActive("/admin/support") &&
                            !isActive("/admin/locations") &&
                            !isActive("/admin/finance") &&
                            !isActive("/admin/withdrawals") &&
                            !isActive("/admin/roles") &&
                            !isActive("/admin/analytics") &&
                            !isActive("/admin/system") &&
                            !isActive("/admin/settings") &&
                            !isActive("/admin/banners")
                                ? "bg-white bg-opacity-20 text-white"
                                : "text-white hover:bg-white hover:bg-opacity-10"
                        }`}
                    >
                        <Home className="mr-3 h-5 w-5" />
                        <span>Dashboard</span>
                    </Link>
                    <Link
                        to="/admin/users"
                        className={`group flex items-center px-4 py-3 rounded-md transition-all ${
                            isActive("/admin/users")
                                ? "bg-white bg-opacity-20 text-white"
                                : "text-white hover:bg-white hover:bg-opacity-10"
                        }`}
                    >
                        <Users className="mr-3 h-5 w-5" />
                        <span>Users</span>
                    </Link>
                    <Link
                        to="/admin/vendors"
                        className={`group flex items-center px-4 py-3 rounded-md transition-all ${
                            isActive("/admin/vendors")
                                ? "bg-white bg-opacity-20 text-white"
                                : "text-white hover:bg-white hover:bg-opacity-10"
                        }`}
                    >
                        <Building className="mr-3 h-5 w-5" />
                        <span>Vendors</span>
                    </Link>
                    <Link
                        to="/admin/treks"
                        className={`group flex items-center px-4 py-3 rounded-md transition-all ${
                            isActive("/admin/treks")
                                ? "bg-white bg-opacity-20 text-white"
                                : "text-white hover:bg-white hover:bg-opacity-10"
                        }`}
                    >
                        <Map className="mr-3 h-5 w-5" />
                        <span>Treks</span>
                    </Link>
                    <Link
                        to="/admin/bookings"
                        className={`group flex items-center px-4 py-3 rounded-md transition-all ${
                            isActive("/admin/bookings")
                                ? "bg-white bg-opacity-20 text-white"
                                : "text-white hover:bg-white hover:bg-opacity-10"
                        }`}
                    >
                        <Calendar className="mr-3 h-5 w-5" />
                        <span>Bookings</span>
                    </Link>
                    <Link
                        to="/admin/coupons"
                        className={`group flex items-center px-4 py-3 rounded-md transition-all ${
                            isActive("/admin/coupons")
                                ? "bg-white bg-opacity-20 text-white"
                                : "text-white hover:bg-white hover:bg-opacity-10"
                        }`}
                    >
                        <Tag className="mr-3 h-5 w-5" />
                        <span>Coupons</span>
                    </Link>
                    <Link
                        to="/admin/communications"
                        className={`group flex items-center px-4 py-3 rounded-md transition-all ${
                            isActive("/admin/communications")
                                ? "bg-white bg-opacity-20 text-white"
                                : "text-white hover:bg-white hover:bg-opacity-10"
                        }`}
                    >
                        <MessageSquare className="mr-3 h-5 w-5" />
                        <span>Communications</span>
                    </Link>
                    <Link
                        to="/admin/support"
                        className={`group flex items-center px-4 py-3 rounded-md transition-all ${
                            isActive("/admin/support")
                                ? "bg-white bg-opacity-20 text-white"
                                : "text-white hover:bg-white hover:bg-opacity-10"
                        }`}
                    >
                        <HelpCircle className="mr-3 h-5 w-5" />
                        <span>Support</span>
                    </Link>
                    <Link
                        to="/admin/locations"
                        className={`group flex items-center px-4 py-3 rounded-md transition-all ${
                            isActive("/admin/locations")
                                ? "bg-white bg-opacity-20 text-white"
                                : "text-white hover:bg-white hover:bg-opacity-10"
                        }`}
                    >
                        <MapPin className="mr-3 h-5 w-5" />
                        <span>Locations</span>
                    </Link>
                    <Link
                        to="/admin/finance"
                        className={`group flex items-center px-4 py-3 rounded-md transition-all ${
                            isActive("/admin/finance")
                                ? "bg-white bg-opacity-20 text-white"
                                : "text-white hover:bg-white hover:bg-opacity-10"
                        }`}
                    >
                        <CreditCard className="mr-3 h-5 w-5" />
                        <span>Finance</span>
                    </Link>
                    <Link
                        to="/admin/withdrawals"
                        className={`group flex items-center px-4 py-3 rounded-md transition-all ${
                            isActive("/admin/withdrawals")
                                ? "bg-white bg-opacity-20 text-white"
                                : "text-white hover:bg-white hover:bg-opacity-10"
                        }`}
                    >
                        <Wallet className="mr-3 h-5 w-5" />
                        <span>Withdrawals</span>
                    </Link>
                    <Link
                        to="/admin/roles"
                        className={`group flex items-center px-4 py-3 rounded-md transition-all ${
                            isActive("/admin/roles")
                                ? "bg-white bg-opacity-20 text-white"
                                : "text-white hover:bg-white hover:bg-opacity-10"
                        }`}
                    >
                        <Shield className="mr-3 h-5 w-5" />
                        <span>Roles</span>
                    </Link>
                    <Link
                        to="/admin/analytics"
                        className={`group flex items-center px-4 py-3 rounded-md transition-all ${
                            isActive("/admin/analytics")
                                ? "bg-white bg-opacity-20 text-white"
                                : "text-white hover:bg-white hover:bg-opacity-10"
                        }`}
                    >
                        <BarChart className="mr-3 h-5 w-5" />
                        <span>Analytics</span>
                    </Link>
                    <Link
                        to="/admin/banners"
                        className={`group flex items-center px-4 py-3 rounded-md transition-all ${
                            isActive("/admin/banners")
                                ? "bg-white bg-opacity-20 text-white"
                                : "text-white hover:bg-white hover:bg-opacity-10"
                        }`}
                    >
                        <Image className="mr-3 h-5 w-5" />
                        <span>Banners</span>
                    </Link>
                    <Link
                        to="/admin/system"
                        className={`group flex items-center px-4 py-3 rounded-md transition-all ${
                            isActive("/admin/system")
                                ? "bg-white bg-opacity-20 text-white"
                                : "text-white hover:bg-white hover:bg-opacity-10"
                        }`}
                    >
                        <Settings className="mr-3 h-5 w-5" />
                        <span>System</span>
                    </Link>
                    <Link
                        to="/admin/settings"
                        className={`group flex items-center px-4 py-3 rounded-md transition-all ${
                            isActive("/admin/settings")
                                ? "bg-white bg-opacity-20 text-white"
                                : "text-white hover:bg-white hover:bg-opacity-10"
                        }`}
                    >
                        <Settings className="mr-3 h-5 w-5" />
                        <span>Settings</span>
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="w-full group flex items-center px-4 py-3 text-white hover:bg-white hover:bg-opacity-10 rounded-md transition-all"
                    >
                        <LogOut className="mr-3 h-5 w-5" />
                        <span>Logout</span>
                    </button>
                </nav>
            </aside>

            {/* Main content */}
            <div className="flex-1">
                <header className="bg-white border-b h-16 flex items-center justify-between px-4 lg:px-8">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="block lg:hidden p-2 rounded-md text-gray-800 hover:bg-gray-100"
                    >
                        <Menu className="h-6 w-6" />
                    </button>

                    <div className="lg:hidden text-center flex-1">
                        <span className="font-semibold text-lg">
                            Aorbo Admin
                        </span>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="hidden md:block">
                            <span className="text-sm font-medium">
                                {user?.name}
                            </span>
                        </div>
                        <div className="h-8 w-8 rounded-full bg-aorbo-teal text-white flex items-center justify-center">
                            <span className="font-medium">
                                {user?.name?.[0] || "A"}
                            </span>
                        </div>
                    </div>
                </header>

                <main className="flex-1 p-4 lg:p-8 bg-gray-50 min-h-[calc(100vh-4rem)]">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
