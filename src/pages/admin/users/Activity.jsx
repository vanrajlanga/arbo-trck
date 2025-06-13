import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminUsersActivity = () => {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">User Activity</h1>
            <Card>
                <CardHeader>
                    <CardTitle>User Activity Monitoring</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-500">
                        User activity monitoring coming soon...
                    </p>
                </CardContent>
            </Card>
        </div>
    );
};

export default AdminUsersActivity;
