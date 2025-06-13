
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminSystemMaintenance = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Maintenance Mode</h1>
      <Card>
        <CardHeader>
          <CardTitle>System Maintenance Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">Maintenance mode coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSystemMaintenance;
