import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";

const VendorSettings = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Account Settings</h1>
      <Card>
        <CardHeader>
          <CardTitle>Vendor Profile</CardTitle>
          <CardDescription>Update your account settings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-40">
            <p className="text-muted-foreground">Settings and profile management features will be implemented here</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VendorSettings;
