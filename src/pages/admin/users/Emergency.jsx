import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminUsersEmergency = () => {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Emergency Contacts</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Emergency Contact Management</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-500">
                        Emergency contact management coming soon...
                    </p>
                </CardContent>
            </Card>
        </div>
    );
};

export default AdminUsersEmergency;
