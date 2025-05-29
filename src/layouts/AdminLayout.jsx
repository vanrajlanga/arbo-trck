
import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Menu, Home, Users, Map, Calendar, BarChart, Settings, LogOut, Wallet, Percent } from "lucide-react";

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="flex min-h-screen">
      {/* Mobile sidebar toggle */}
      <div className="fixed inset-0 z-20 bg-black/50 lg:hidden" 
        onClick={() => setSidebarOpen(false)}
        style={{ display: sidebarOpen ? "block" : "none" }}></div>

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-gray-900 text-white transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-auto ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex h-16 items-center justify-center px-4 bg-gray-800">
          <Link to="/admin" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-aorbo-yellow flex items-center justify-center">
              <span className="text-black font-bold text-lg">A</span>
            </div>
            <span className="text-xl font-bold">Aorbo Admin</span>
          </Link>
        </div>
        <nav className="mt-5 px-2">
          <Link to="/admin" className={`group flex items-center px-4 py-3 text-white hover:bg-white hover:bg-opacity-10 rounded-md transition-all ${location.pathname === '/admin' ? 'bg-white bg-opacity-10' : ''}`}>
            <Home className="mr-3 h-5 w-5" />
            <span>Dashboard</span>
          </Link>
          <Link to="/admin/vendors" className={`group flex items-center px-4 py-3 text-white hover:bg-white hover:bg-opacity-10 rounded-md transition-all ${location.pathname === '/admin/vendors' ? 'bg-white bg-opacity-10' : ''}`}>
            <Users className="mr-3 h-5 w-5" />
            <span>Vendors</span>
          </Link>
          <Link to="/admin/treks" className={`group flex items-center px-4 py-3 text-white hover:bg-white hover:bg-opacity-10 rounded-md transition-all ${location.pathname === '/admin/treks' ? 'bg-white bg-opacity-10' : ''}`}>
            <Map className="mr-3 h-5 w-5" />
            <span>Treks</span>
          </Link>
          <Link to="/admin/bookings" className={`group flex items-center px-4 py-3 text-white hover:bg-white hover:bg-opacity-10 rounded-md transition-all ${location.pathname === '/admin/bookings' ? 'bg-white bg-opacity-10' : ''}`}>
            <Calendar className="mr-3 h-5 w-5" />
            <span>Bookings</span>
          </Link>
          <Link to="/admin/withdrawals" className={`group flex items-center px-4 py-3 text-white hover:bg-white hover:bg-opacity-10 rounded-md transition-all ${location.pathname === '/admin/withdrawals' ? 'bg-white bg-opacity-10' : ''}`}>
            <Wallet className="mr-3 h-5 w-5" />
            <span>Withdrawals</span>
          </Link>
          <Link to="/admin/coupons" className={`group flex items-center px-4 py-3 text-white hover:bg-white hover:bg-opacity-10 rounded-md transition-all ${location.pathname === '/admin/coupons' ? 'bg-white bg-opacity-10' : ''}`}>
            <Percent className="mr-3 h-5 w-5" />
            <span>Coupons</span>
          </Link>
          <Link to="/admin/analytics" className={`group flex items-center px-4 py-3 text-white hover:bg-white hover:bg-opacity-10 rounded-md transition-all ${location.pathname === '/admin/analytics' ? 'bg-white bg-opacity-10' : ''}`}>
            <BarChart className="mr-3 h-5 w-5" />
            <span>Analytics</span>
          </Link>
          <Link to="/admin/settings" className={`group flex items-center px-4 py-3 text-white hover:bg-white hover:bg-opacity-10 rounded-md transition-all ${location.pathname === '/admin/settings' ? 'bg-white bg-opacity-10' : ''}`}>
            <Settings className="mr-3 h-5 w-5" />
            <span>Settings</span>
          </Link>
          <button onClick={logout} className="w-full mt-4 group flex items-center px-4 py-3 text-white hover:bg-white hover:bg-opacity-10 rounded-md transition-all">
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
            <span className="font-semibold text-lg">Aorbo Admin</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <span className="text-sm font-medium">{user?.name}</span>
            </div>
            <div className="h-8 w-8 rounded-full bg-gray-900 text-white flex items-center justify-center">
              <span className="font-medium">{user?.name?.[0] || 'A'}</span>
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
