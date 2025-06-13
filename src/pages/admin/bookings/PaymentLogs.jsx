
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminBookingPaymentLogs = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Payment Gateway Logs</h1>
      <Card>
        <CardHeader>
          <CardTitle>Payment Transaction Logs</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">Payment gateway logs coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminBookingPaymentLogs;
