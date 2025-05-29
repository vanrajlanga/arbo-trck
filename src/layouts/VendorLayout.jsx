import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { 
  Menu, 
  X, 
  Home, 
  Map, 
  Calendar, 
  Users, 
  Settings, 
  LogOut, 
  Plus, 
  List,
  CreditCard,
  MessageCircle,
  Star,
  FileText,
  MapPin,
  Wallet,
  Percent
} from "lucide-react";
import { useSidebar, SidebarProvider, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";

const VendorLayout = () => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <div className="flex min-h-screen">
      {/* Mobile sidebar toggle */}
      <div className="fixed inset-0 z-20 bg-black/50 lg:hidden" 
        onClick={() => setSidebarOpen(false)}
        style={{ display: sidebarOpen ? "block" : "none" }}></div>
      
      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-aorbo-teal text-white transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-auto ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex h-16 items-center justify-center px-4 bg-aorbo-teal">
          <Link to="/vendor" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-aorbo-yellow flex items-center justify-center">
              <span className="text-black font-bold text-lg">A</span>
            </div>
            <span className="text-xl font-bold">Aorbo Treks</span>
          </Link>
        </div>
        <nav className="mt-5 px-2">
          <Link to="/vendor" className={`group flex items-center px-4 py-3 rounded-md transition-all ${isActive('/vendor') && !isActive('/vendor/treks') && !isActive('/vendor/bookings') && !isActive('/vendor/customers') && !isActive('/vendor/payments') && !isActive('/vendor/reviews') && !isActive('/vendor/messages') && !isActive('/vendor/reports') && !isActive('/vendor/settings') && !isActive('/vendor/locations') && !isActive('/vendor/withdrawals') && !isActive('/vendor/coupons') ? 'bg-white bg-opacity-20 text-white' : 'text-white hover:bg-white hover:bg-opacity-10'}`}>
            <Home className="mr-3 h-5 w-5" />
            <span>Dashboard</span>
          </Link>
          <Link to="/vendor/treks" className={`group flex items-center px-4 py-3 rounded-md transition-all ${isActive('/vendor/treks') ? 'bg-white bg-opacity-20 text-white' : 'text-white hover:bg-white hover:bg-opacity-10'}`}>
            <Map className="mr-3 h-5 w-5" />
            <span>Trek Management</span>
          </Link>
          <Link to="/vendor/bookings" className={`group flex items-center px-4 py-3 rounded-md transition-all ${isActive('/vendor/bookings') ? 'bg-white bg-opacity-20 text-white' : 'text-white hover:bg-white hover:bg-opacity-10'}`}>
            <Calendar className="mr-3 h-5 w-5" />
            <span>Bookings</span>
          </Link>
          <Link to="/vendor/customers" className={`group flex items-center px-4 py-3 rounded-md transition-all ${isActive('/vendor/customers') ? 'bg-white bg-opacity-20 text-white' : 'text-white hover:bg-white hover:bg-opacity-10'}`}>
            <Users className="mr-3 h-5 w-5" />
            <span>Customers</span>
          </Link>
          <Link to="/vendor/locations" className={`group flex items-center px-4 py-3 rounded-md transition-all ${isActive('/vendor/locations') ? 'bg-white bg-opacity-20 text-white' : 'text-white hover:bg-white hover:bg-opacity-10'}`}>
            <MapPin className="mr-3 h-5 w-5" />
            <span>Manage Location</span>
          </Link>
          <Link to="/vendor/payments" className={`group flex items-center px-4 py-3 rounded-md transition-all ${isActive('/vendor/payments') ? 'bg-white bg-opacity-20 text-white' : 'text-white hover:bg-white hover:bg-opacity-10'}`}>
            <CreditCard className="mr-3 h-5 w-5" />
            <span>Payments</span>
          </Link>
          <Link to="/vendor/withdrawals" className={`group flex items-center px-4 py-3 rounded-md transition-all ${isActive('/vendor/withdrawals') ? 'bg-white bg-opacity-20 text-white' : 'text-white hover:bg-white hover:bg-opacity-10'}`}>
            <Wallet className="mr-3 h-5 w-5" />
            <span>Withdrawals</span>
          </Link>
          <Link to="/vendor/coupons" className={`group flex items-center px-4 py-3 rounded-md transition-all ${isActive('/vendor/coupons') ? 'bg-white bg-opacity-20 text-white' : 'text-white hover:bg-white hover:bg-opacity-10'}`}>
            <Percent className="mr-3 h-5 w-5" />
            <span>Coupons</span>
          </Link>
          <Link to="/vendor/reviews" className={`group flex items-center px-4 py-3 rounded-md transition-all ${isActive('/vendor/reviews') ? 'bg-white bg-opacity-20 text-white' : 'text-white hover:bg-white hover:bg-opacity-10'}`}>
            <Star className="mr-3 h-5 w-5" />
            <span>Reviews</span>
          </Link>
          <Link to="/vendor/messages" className={`group flex items-center px-4 py-3 rounded-md transition-all ${isActive('/vendor/messages') ? 'bg-white bg-opacity-20 text-white' : 'text-white hover:bg-white hover:bg-opacity-10'}`}>
            <MessageCircle className="mr-3 h-5 w-5" />
            <span>Messages</span>
          </Link>
          <Link to="/vendor/reports" className={`group flex items-center px-4 py-3 rounded-md transition-all ${isActive('/vendor/reports') ? 'bg-white bg-opacity-20 text-white' : 'text-white hover:bg-white hover:bg-opacity-10'}`}>
            <FileText className="mr-3 h-5 w-5" />
            <span>Reports</span>
          </Link>
          <Link to="/vendor/settings" className={`group flex items-center px-4 py-3 rounded-md transition-all ${isActive('/vendor/settings') ? 'bg-white bg-opacity-20 text-white' : 'text-white hover:bg-white hover:bg-opacity-10'}`}>
            <Settings className="mr-3 h-5 w-5" />
            <span>Settings</span>
          </Link>
          <button onClick={handleLogout} className="w-full group flex items-center px-4 py-3 text-white hover:bg-white hover:bg-opacity-10 rounded-md transition-all">
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
            <span className="font-semibold text-lg">Aorbo Treks</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <span className="text-sm font-medium">{user?.name}</span>
            </div>
            <div className="h-8 w-8 rounded-full bg-aorbo-teal text-white flex items-center justify-center">
              <span className="font-medium">{user?.name?.[0] || 'U'}</span>
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

export default VendorLayout;
