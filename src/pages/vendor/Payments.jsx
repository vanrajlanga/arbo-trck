
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";

const VendorPayments = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Payment Management</h1>
      <Card>
        <CardHeader>
          <CardTitle>Payment Transactions</CardTitle>
          <CardDescription>Track your earnings and payment history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-40">
            <p className="text-muted-foreground">Payment management features will be implemented here</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VendorPayments;
