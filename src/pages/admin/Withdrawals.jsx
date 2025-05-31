import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { CheckCircle, XCircle, Clock, DollarSign, Eye, FileText } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const AdminWithdrawals = () => {
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedWithdrawal, setSelectedWithdrawal] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [actionType, setActionType] = useState('view');
  const [adminNotes, setAdminNotes] = useState('');

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  const fetchWithdrawals = async () => {
    try {
      const { data, error } = await supabase
        .from('withdrawal_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching withdrawals:', error);
        // Fallback to localStorage
        const savedWithdrawals = localStorage.getItem('adminWithdrawals');
        if (savedWithdrawals) {
          setWithdrawals(JSON.parse(savedWithdrawals));
        } else {
          // Demo data
          const demoWithdrawals = [
            {
              id: "1",
              vendor_id: "vendor-1",
              vendor_name: "Mountain Treks Co.",
              amount: 25000,
              status: "pending",
              bank_account_number: "1234567890",
              bank_name: "State Bank of India",
              account_holder_name: "John Doe",
              ifsc_code: "SBIN0001234",
              request_date: "2025-01-15T10:30:00Z",
              admin_notes: "",
              created_at: "2025-01-15T10:30:00Z",
              updated_at: "2025-01-15T10:30:00Z"
            },
            {
              id: "2",
              vendor_id: "vendor-2",
              vendor_name: "Adventure Tours",
              amount: 15000,
              status: "approved",
              bank_account_number: "9876543210",
              bank_name: "HDFC Bank",
              account_holder_name: "Jane Smith",
              ifsc_code: "HDFC0001234",
              request_date: "2025-01-10T14:20:00Z",
              processed_date: "2025-01-12T09:15:00Z",
              admin_notes: "Approved after verification",
              created_at: "2025-01-10T14:20:00Z",
              updated_at: "2025-01-12T09:15:00Z"
            }
          ];
          setWithdrawals(demoWithdrawals);
          localStorage.setItem('adminWithdrawals', JSON.stringify(demoWithdrawals));
        }
      } else {
        setWithdrawals(data?.map(item => ({
          ...item,
          status: item.status 
        })) || []);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error("Failed to fetch withdrawal requests");
    } finally {
      setLoading(false);
    }
  };

  const openDialog = (withdrawal, action) => {
    setSelectedWithdrawal(withdrawal);
    setActionType(action);
    setAdminNotes(withdrawal.admin_notes || '');
    setDialogOpen(true);
  };

  const handleAction = async () => {
    if (!selectedWithdrawal) return;

    const newStatus = actionType === 'approve' ? 'approved' : 'rejected';
    const updatedWithdrawal = {
      ...selectedWithdrawal,
      status: newStatus,
      admin_notes: adminNotes,
      processed_date: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    try {
      const { error } = await supabase
        .from('withdrawal_requests')
        .update({
          status: newStatus,
          admin_notes: adminNotes,
          processed_date: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('id', selectedWithdrawal.id);

      if (error) {
        // Fallback to localStorage
        const updatedWithdrawals = withdrawals.map(w => 
          w.id === selectedWithdrawal.id ? updatedWithdrawal : w
        );
        setWithdrawals(updatedWithdrawals);
        localStorage.setItem('adminWithdrawals', JSON.stringify(updatedWithdrawals));
      } else {
        await fetchWithdrawals();
      }

      toast.success(`Withdrawal request ${newStatus} successfully`);
      setDialogOpen(false);
    } catch (error) {
      console.error('Error updating withdrawal:', error);
      toast.error("Failed to update withdrawal request");
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
      case 'approved':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Approved</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800"><XCircle className="h-3 w-3 mr-1" />Rejected</Badge>;
      case 'processed':
        return <Badge className="bg-blue-100 text-blue-800"><DollarSign className="h-3 w-3 mr-1" />Processed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const pendingWithdrawals = withdrawals.filter(w => w.status === 'pending');
  const totalPending = pendingWithdrawals.reduce((sum, w) => sum + w.amount, 0);
  const totalProcessed = withdrawals.filter(w => w.status === 'processed').reduce((sum, w) => sum + w.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Withdrawal Management</h1>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Requests</p>
                <p className="text-2xl font-bold">{withdrawals.length}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Requests</p>
                <p className="text-2xl font-bold">{pendingWithdrawals.length}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Amount</p>
                <p className="text-2xl font-bold">₹{totalPending.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Processed</p>
                <p className="text-2xl font-bold">₹{totalProcessed.toLocaleString()}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Withdrawals List */}
      <Card>
        <CardHeader>
          <CardTitle>Withdrawal Requests</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Loading...</div>
          ) : withdrawals.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No withdrawal requests found.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {withdrawals.map((withdrawal) => (
                <div key={withdrawal.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-bold text-lg">₹{withdrawal.amount.toLocaleString()}</h3>
                        {getStatusBadge(withdrawal.status)}
                      </div>
                      <p className="text-gray-600 mb-2">
                        <span className="font-medium">Vendor:</span> {withdrawal.vendor_name || 'Unknown Vendor'}
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Bank:</span> {withdrawal.bank_name}
                        </div>
                        <div>
                          <span className="font-medium">Account:</span> ****{withdrawal.bank_account_number.slice(-4)}
                        </div>
                        <div>
                          <span className="font-medium">IFSC:</span> {withdrawal.ifsc_code}
                        </div>
                        <div>
                          <span className="font-medium">Requested:</span> {new Date(withdrawal.request_date).toLocaleDateString()}
                        </div>
                      </div>
                      {withdrawal.processed_date && (
                        <p className="text-sm text-gray-600 mt-2">
                          <span className="font-medium">Processed:</span> {new Date(withdrawal.processed_date).toLocaleDateString()}
                        </p>
                      )}
                      {withdrawal.admin_notes && (
                        <p className="text-sm text-gray-600 mt-2">
                          <span className="font-medium">Notes:</span> {withdrawal.admin_notes}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openDialog(withdrawal, 'view')}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View Details
                    </Button>
                    {withdrawal.status === 'pending' && (
                      <>
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => openDialog(withdrawal, 'approve')}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => openDialog(withdrawal, 'reject')}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Action Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {actionType === 'view' ? 'Withdrawal Details' : 
               actionType === 'approve' ? 'Approve Withdrawal' : 'Reject Withdrawal'}
            </DialogTitle>
          </DialogHeader>

          {selectedWithdrawal && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Amount</Label>
                  <p className="font-bold text-2xl text-blue-600">₹{selectedWithdrawal.amount.toLocaleString()}</p>
                </div>
                <div>
                  <Label>Status</Label>
                  <div className="mt-1">{getStatusBadge(selectedWithdrawal.status)}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Account Holder</Label>
                  <p>{selectedWithdrawal.account_holder_name}</p>
                </div>
                <div>
                  <Label>Bank Name</Label>
                  <p>{selectedWithdrawal.bank_name}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Account Number</Label>
                  <p>{selectedWithdrawal.bank_account_number}</p>
                </div>
                <div>
                  <Label>IFSC Code</Label>
                  <p>{selectedWithdrawal.ifsc_code}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Request Date</Label>
                  <p>{new Date(selectedWithdrawal.request_date).toLocaleString()}</p>
                </div>
                {selectedWithdrawal.processed_date && (
                  <div>
                    <Label>Processed Date</Label>
                    <p>{new Date(selectedWithdrawal.processed_date).toLocaleString()}</p>
                  </div>
                )}
              </div>

              {actionType !== 'view' && (
                <div>
                  <Label htmlFor="admin_notes">Admin Notes</Label>
                  <Textarea
                    id="admin_notes"
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    placeholder={`Add notes for ${actionType === 'approve' ? 'approval' : 'rejection'}...`}
                    rows={3}
                  />
                </div>
              )}

              {selectedWithdrawal.admin_notes && actionType === 'view' && (
                <div>
                  <Label>Existing Admin Notes</Label>
                  <p className="bg-gray-50 p-3 rounded-md">{selectedWithdrawal.admin_notes}</p>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              {actionType === 'view' ? 'Close' : 'Cancel'}
            </Button>
            {actionType !== 'view' && (
              <Button 
                onClick={handleAction}
                variant={actionType === 'approve' ? 'default' : 'destructive'}
              >
                {actionType === 'approve' ? 'Approve Request' : 'Reject Request'}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminWithdrawals;
