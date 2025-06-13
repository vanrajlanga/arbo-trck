import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

const VendorCommission = () => {
    return (
        <div className="container mx-auto py-8">
            <Card>
                <CardHeader>
                    <CardTitle>Vendor Commission Management</CardTitle>
                    <CardDescription>
                        Manage commission rates and payments for vendors
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="text-center py-12">
                        <h3 className="text-lg font-semibold mb-2">
                            Commission Management
                        </h3>
                        <p className="text-muted-foreground">
                            Commission management features will be implemented
                            here
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default VendorCommission;
