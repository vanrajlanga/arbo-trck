// Build configuration utility
export const getBuildConfig = () => {
    const appType = process.env.APP_TYPE || 'default';
    const defaultLogin = process.env.DEFAULT_LOGIN || '/login';
    
    return {
        appType,
        defaultLogin,
        isAdminBuild: appType === 'admin',
        isVendorBuild: appType === 'vendor',
        isDefaultBuild: appType === 'default',
    };
};

export const getAppTitle = () => {
    const config = getBuildConfig();
    
    switch (config.appType) {
        case 'admin':
            return 'Aorbo Admin Portal';
        case 'vendor':
            return 'Aorbo Vendor Portal';
        default:
            return 'Aorbo Treks';
    }
};

export const getAppDescription = () => {
    const config = getBuildConfig();
    
    switch (config.appType) {
        case 'admin':
            return 'Administrative portal for managing Aorbo platform';
        case 'vendor':
            return 'Vendor portal for managing treks and bookings';
        default:
            return 'The India\'s Trek Ticket Booking Platform';
    }
}; 