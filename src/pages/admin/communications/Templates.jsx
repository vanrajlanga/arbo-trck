
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AdminCommunicationTemplates = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Communication Templates</h1>
      <Card>
        <CardHeader>
          <CardTitle>Email & SMS Templates</CardTitle>
          <CardDescription>Manage communication templates for notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">Communication templates coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminCommunicationTemplates;
