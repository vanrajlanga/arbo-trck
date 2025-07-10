#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Building all versions of Aorbo Treks...\n');

// Function to run build command
function runBuild(command, name) {
    try {
        console.log(`📦 Building ${name}...`);
        execSync(command, { stdio: 'inherit' });
        console.log(`✅ ${name} build completed successfully!\n`);
        return true;
    } catch (error) {
        console.error(`❌ ${name} build failed:`, error.message);
        return false;
    }
}

// Clean previous builds
console.log('🧹 Cleaning previous builds...');
if (fs.existsSync('dist')) {
    fs.rmSync('dist', { recursive: true });
}
if (fs.existsSync('dist-admin')) {
    fs.rmSync('dist-admin', { recursive: true });
}
if (fs.existsSync('dist-vendor')) {
    fs.rmSync('dist-vendor', { recursive: true });
}
console.log('✅ Cleanup completed!\n');

// Build all versions
const builds = [
    { command: 'npm run build', name: 'Default (Multi-tenant)' },
    { command: 'npm run build:admin', name: 'Admin Portal' },
    { command: 'npm run build:vendor', name: 'Vendor Portal' }
];

let successCount = 0;
for (const build of builds) {
    if (runBuild(build.command, build.name)) {
        successCount++;
    }
}

console.log('📊 Build Summary:');
console.log(`✅ Successful builds: ${successCount}/${builds.length}`);

if (successCount === builds.length) {
    console.log('\n🎉 All builds completed successfully!');
    console.log('\n📁 Build outputs:');
    console.log('   - dist/          (Default/Multi-tenant)');
    console.log('   - dist-admin/    (Admin Portal)');
    console.log('   - dist-vendor/   (Vendor Portal)');
} else {
    console.log('\n⚠️  Some builds failed. Please check the errors above.');
    process.exit(1);
} 