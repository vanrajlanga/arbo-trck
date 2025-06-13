import { Outlet } from "react-router-dom";

const VendorLayout = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="flex">
                {/* Sidebar */}
                <div className="w-64 bg-white shadow-sm">
                    <div className="p-4">
                        <h2 className="text-lg font-semibold">
                            Vendor Dashboard
                        </h2>
                    </div>
                    <nav className="mt-4">
                        <div className="px-4 py-2 text-sm text-gray-600">
                            <a
                                href="/vendor"
                                className="block py-2 hover:text-gray-900"
                            >
                                Dashboard
                            </a>
                            <a
                                href="/vendor/treks"
                                className="block py-2 hover:text-gray-900"
                            >
                                My Treks
                            </a>
                            <a
                                href="/vendor/bookings"
                                className="block py-2 hover:text-gray-900"
                            >
                                Bookings
                            </a>
                            <a
                                href="/vendor/customers"
                                className="block py-2 hover:text-gray-900"
                            >
                                Customers
                            </a>
                            <a
                                href="/vendor/payments"
                                className="block py-2 hover:text-gray-900"
                            >
                                Payments
                            </a>
                            <a
                                href="/vendor/reviews"
                                className="block py-2 hover:text-gray-900"
                            >
                                Reviews
                            </a>
                            <a
                                href="/vendor/coupons"
                                className="block py-2 hover:text-gray-900"
                            >
                                Coupons
                            </a>
                            <a
                                href="/vendor/settings"
                                className="block py-2 hover:text-gray-900"
                            >
                                Settings
                            </a>
                        </div>
                    </nav>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-8">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default VendorLayout;
