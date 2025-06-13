
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminSystemHealth = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Server Health</h1>
      <Card>
        <CardHeader>
          <CardTitle>System Health Monitoring</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">Server health monitoring coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSystemHealth;
