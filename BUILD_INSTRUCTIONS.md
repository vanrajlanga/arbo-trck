# Build Instructions

This project supports three different build configurations for different user types:

## Build Types

### 1. Default Build (Multi-tenant)

```bash
npm run build
```

- Builds the general application with login type selection
- Output directory: `dist/`
- Landing page shows both Admin and Vendor login options

### 2. Admin Build (Admin-only)

```bash
npm run build:admin
```

- Builds admin-specific version
- Output directory: `dist-admin/`
- Landing page automatically redirects to `/admin/login`
- Optimized for administrative users

### 3. Vendor Build (Vendor-only)

```bash
npm run build:vendor
```

- Builds vendor-specific version
- Output directory: `dist-vendor/`
- Landing page automatically redirects to `/vendor/login`
- Optimized for trek vendors

## Preview Commands

### Preview Admin Build

```bash
npm run preview:admin
```

### Preview Vendor Build

```bash
npm run preview:vendor
```

### Preview Default Build

```bash
npm run preview
```

## Environment Variables

The build configurations automatically set these environment variables:

### Admin Build

- `APP_TYPE=admin`
- `DEFAULT_LOGIN=/admin/login`

### Vendor Build

- `APP_TYPE=vendor`
- `DEFAULT_LOGIN=/vendor/login`

### Default Build

- `APP_TYPE=default`
- `DEFAULT_LOGIN=/login`

## Deployment

### For Admin Portal

1. Run `npm run build:admin`
2. Deploy contents of `dist-admin/` folder
3. Users will be automatically redirected to admin login

### For Vendor Portal

1. Run `npm run build:vendor`
2. Deploy contents of `dist-vendor/` folder
3. Users will be automatically redirected to vendor login

### For General Portal

1. Run `npm run build`
2. Deploy contents of `dist/` folder
3. Users can choose between admin and vendor login

## Features by Build Type

### Admin Build Features

- Automatic redirect to admin login
- Admin-specific branding and messaging
- Optimized for administrative workflows
- Red color scheme and professional styling

### Vendor Build Features

- Automatic redirect to vendor login
- Vendor-specific branding and messaging
- Optimized for trek management
- Green color scheme and nature-inspired styling

### Default Build Features

- Login type selection page
- Multi-tenant support
- General branding and messaging
- Support for both admin and vendor users

## Configuration Files

- `vite.config.js` - Default build configuration
- `vite.config.admin.js` - Admin build configuration
- `vite.config.vendor.js` - Vendor build configuration
- `src/lib/buildConfig.js` - Build type detection utility
