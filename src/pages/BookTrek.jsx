import { useState, useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    Calendar,
    Users,
    MapPin,
    Clock,
    CreditCard,
    Plus,
    Minus,
    Info,
} from "lucide-react";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const BookTrek = () => {
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { toast } = useToast();

    const [trek, setTrek] = useState(null);
    const [selectedDateId, setSelectedDateId] = useState(
        searchParams.get("date")
    );
    const [participants, setParticipants] = useState(1);
    const [customerDetails, setCustomerDetails] = useState({
        name: "",
        email: "",
        phone: "",
        emergencyContact: "",
        emergencyPhone: "",
    });
    const [specialRequests, setSpecialRequests] = useState("");
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (id) {
            fetchTrekDetails();
        }
    }, [id]);

    const fetchTrekDetails = async () => {
        try {
            const { data, error } = await supabase
                .from("treks")
                .select(
                    `
                    *,
                    location:locations!treks_location_id_fkey(name, state),
                    trek_dates(*)
                `
                )
                .eq("id", parseInt(id))
                .eq("is_active", true)
                .single();

            if (error) throw error;

            const transformedTrek = {
                ...data,
                location: data.location
                    ? {
                          name: data.location.name || "",
                          state: data.location.state || "",
                      }
                    : { name: "", state: "" },
            };

            setTrek(transformedTrek);
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to fetch trek details",
                variant: "destructive",
            });
            navigate("/treks");
        } finally {
            setLoading(false);
        }
    };

    const selectedDate = trek?.trek_dates?.find(
        (date) => date.id === selectedDateId
    );
    const totalAmount = selectedDate
        ? selectedDate.price_per_person * participants
        : trek?.price
        ? trek.price * participants
        : 0;
    const advanceAmount = totalAmount * 0.3;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const { data: bookingData, error: bookingError } = await supabase
                .from("visitor_bookings")
                .insert({
                    trek_id: trek?.id,
                    trek_name: trek?.name,
                    trek_date: selectedDate?.start_date,
                    number_of_participants: participants,
                    total_amount: totalAmount,
                    user_id: crypto.randomUUID(),
                    booking_status: "pending",
                    payment_status: "pending",
                })
                .select()
                .single();

            if (bookingError) throw bookingError;

            toast({
                title: "Booking Submitted!",
                description:
                    "Your booking request has been submitted. We'll contact you shortly.",
            });

            navigate(`/booking-confirmation/${bookingData.id}`);
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to submit booking. Please try again.",
                variant: "destructive",
            });
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-aorbo-teal mx-auto mb-4"></div>
                    <p>Loading booking details...</p>
                </div>
            </div>
        );
    }

    if (!trek || !selectedDate) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">
                        Invalid Booking Request
                    </h2>
                    <Button onClick={() => navigate("/treks")}>
                        Back to Treks
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="mb-6">
                    <Button
                        variant="ghost"
                        onClick={() => navigate(-1)}
                        className="mb-4"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Trek Details
                    </Button>
                    <h1 className="text-3xl font-bold">Book Your Trek</h1>
                    <p className="text-gray-600">
                        Complete your booking for {trek.name}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <form onSubmit={handleSubmit}>
                            {/* Trek Summary */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Mountain className="h-5 w-5" />
                                        Trek Summary
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="flex items-center gap-2">
                                            <MapPin className="h-4 w-4 text-gray-500" />
                                            <span>{trek.destination}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4 text-gray-500" />
                                            <span>
                                                {new Date(
                                                    selectedDate.start_date
                                                ).toLocaleDateString()}{" "}
                                                -{" "}
                                                {new Date(
                                                    selectedDate.end_date
                                                ).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock className="h-4 w-4 text-gray-500" />
                                            <span>
                                                {trek.duration_days} days
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Badge variant="secondary">
                                                {trek.difficulty_level}
                                            </Badge>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Participant Count */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>
                                        Number of Participants
                                    </CardTitle>
                                    <CardDescription>
                                        Select how many people will be joining
                                        this trek
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center justify-center gap-4">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                setParticipants(
                                                    Math.max(
                                                        1,
                                                        participants - 1
                                                    )
                                                )
                                            }
                                            disabled={participants <= 1}
                                        >
                                            <Minus className="h-4 w-4" />
                                        </Button>
                                        <span className="text-2xl font-bold px-4">
                                            {participants}
                                        </span>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                setParticipants(
                                                    Math.min(
                                                        selectedDate.available_slots -
                                                            selectedDate.booked_slots,
                                                        participants + 1
                                                    )
                                                )
                                            }
                                            disabled={
                                                participants >=
                                                selectedDate.available_slots -
                                                    selectedDate.booked_slots
                                            }
                                        >
                                            <Plus className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <p className="text-sm text-gray-600 text-center mt-2">
                                        Available slots:{" "}
                                        {selectedDate.available_slots -
                                            selectedDate.booked_slots}
                                    </p>
                                </CardContent>
                            </Card>

                            {/* Customer Details */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Contact Details</CardTitle>
                                    <CardDescription>
                                        We'll use these details to contact you
                                        about your booking
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="name">
                                                Full Name *
                                            </Label>
                                            <Input
                                                id="name"
                                                required
                                                value={customerDetails.name}
                                                onChange={(e) =>
                                                    setCustomerDetails({
                                                        ...customerDetails,
                                                        name: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="email">
                                                Email Address *
                                            </Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                required
                                                value={customerDetails.email}
                                                onChange={(e) =>
                                                    setCustomerDetails({
                                                        ...customerDetails,
                                                        email: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="phone">
                                                Phone Number *
                                            </Label>
                                            <Input
                                                id="phone"
                                                required
                                                value={customerDetails.phone}
                                                onChange={(e) =>
                                                    setCustomerDetails({
                                                        ...customerDetails,
                                                        phone: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="emergencyContact">
                                                Emergency Contact Name
                                            </Label>
                                            <Input
                                                id="emergencyContact"
                                                value={
                                                    customerDetails.emergencyContact
                                                }
                                                onChange={(e) =>
                                                    setCustomerDetails({
                                                        ...customerDetails,
                                                        emergencyContact:
                                                            e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <Label htmlFor="emergencyPhone">
                                                Emergency Contact Phone
                                            </Label>
                                            <Input
                                                id="emergencyPhone"
                                                value={
                                                    customerDetails.emergencyPhone
                                                }
                                                onChange={(e) =>
                                                    setCustomerDetails({
                                                        ...customerDetails,
                                                        emergencyPhone:
                                                            e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Special Requests */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Special Requests</CardTitle>
                                    <CardDescription>
                                        Any dietary requirements, medical
                                        conditions, or special requests?
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Textarea
                                        placeholder="Enter any special requests or requirements..."
                                        value={specialRequests}
                                        onChange={(e) =>
                                            setSpecialRequests(e.target.value)
                                        }
                                    />
                                </CardContent>
                            </Card>
                        </form>
                    </div>

                    {/* Booking Summary */}
                    <div className="lg:col-span-1">
                        <Card className="sticky top-4">
                            <CardHeader>
                                <CardTitle>Booking Summary</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span>Trek Price</span>
                                        <span>
                                            ₹
                                            {selectedDate.price_per_person.toLocaleString()}
                                            /person
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Participants</span>
                                        <span>{participants}</span>
                                    </div>
                                    <div className="border-t pt-3">
                                        <div className="flex justify-between font-medium">
                                            <span>Total Amount</span>
                                            <span>
                                                ₹{totalAmount.toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="bg-yellow-50 p-3 rounded">
                                        <div className="flex items-center mb-2">
                                            <Info className="h-4 w-4 text-yellow-600 mr-2" />
                                            <span className="font-medium text-yellow-800">
                                                Advance Payment
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-yellow-700">
                                                Pay now (30%)
                                            </span>
                                            <span className="font-bold text-yellow-800">
                                                ₹
                                                {advanceAmount.toLocaleString()}
                                            </span>
                                        </div>
                                        <p className="text-xs text-yellow-600 mt-1">
                                            Remaining amount to be paid 7 days
                                            before trek
                                        </p>
                                    </div>
                                </div>

                                <Button
                                    onClick={handleSubmit}
                                    disabled={submitting}
                                    className="w-full bg-aorbo-teal hover:bg-aorbo-teal/90 h-12"
                                    size="lg"
                                >
                                    {submitting ? "Processing..." : "Book Now"}
                                    <CreditCard className="ml-2 h-4 w-4" />
                                </Button>

                                <div className="text-xs text-gray-600 space-y-1">
                                    <p>
                                        • Free cancellation up to 48 hours
                                        before trek
                                    </p>
                                    <p>
                                        • Instant confirmation via email & SMS
                                    </p>
                                    <p>• 24/7 customer support</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookTrek;
