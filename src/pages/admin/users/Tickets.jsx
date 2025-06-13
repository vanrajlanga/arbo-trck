import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminUsersTickets = () => {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Support Tickets</h1>
            <Card>
                <CardHeader>
                    <CardTitle>User Support Tickets</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-500">
                        Support ticket management coming soon...
                    </p>
                </CardContent>
            </Card>
        </div>
    );
};

export default AdminUsersTickets;
