import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext.new";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Phone, Mail, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const MobileLogin = () => {
    const [loginType, setLoginType] = useState("email");
    const [showPassword, setShowPassword] = useState(false);
    const [showOtp, setShowOtp] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        phone: "",
        password: "",
        otp: "",
        name: "",
        confirmPassword: "",
    });
    const { login, register } = useAuth();
    const navigate = useNavigate();
    const { toast } = useToast();

    const handleLogin = async (tab) => {
        try {
            if (loginType === "phone" && tab === "login") {
                // Show OTP screen for phone login
                setShowOtp(true);
                toast({
                    title: "OTP Sent",
                    description:
                        "Please check your phone for the verification code",
                });
                return;
            }

            if (tab === "login") {
                await login(formData.email, formData.password);
            } else {
                await register(
                    formData.email,
                    formData.password,
                    formData.name
                );
            }

            navigate("/mobile-search");
        } catch (error) {
            toast({
                title: "Error",
                description: error.message,
                variant: "destructive",
            });
        }
    };

    const handleOtpVerification = () => {
        // Mock OTP verification
        toast({
            title: "Success",
            description: "Phone number verified successfully",
        });
        navigate("/mobile-search");
    };

    if (showOtp) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
                <Card className="w-full max-w-md">
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl font-bold text-gray-800">
                            Verify OTP
                        </CardTitle>
                        <p className="text-gray-600">
                            Enter the code sent to {formData.phone}
                        </p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Input
                            type="text"
                            placeholder="Enter 6-digit OTP"
                            value={formData.otp}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    otp: e.target.value,
                                })
                            }
                            className="text-center text-2xl tracking-widest"
                            maxLength={6}
                        />
                        <Button
                            onClick={handleOtpVerification}
                            className="w-full"
                        >
                            Verify OTP
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => setShowOtp(false)}
                            className="w-full"
                        >
                            Back to Login
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }
};

export default MobileLogin;
