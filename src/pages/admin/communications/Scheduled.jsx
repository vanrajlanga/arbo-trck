
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminCommunicationScheduled = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Scheduled Notifications</h1>
      <Card>
        <CardHeader>
          <CardTitle>Scheduled Notification Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">Scheduled notifications coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminCommunicationScheduled;
