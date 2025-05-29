
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const RegistrationSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-aorbo-teal text-white py-4 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-aorbo-yellow flex items-center justify-center">
              <span className="text-black font-bold text-lg">A</span>
            </div>
            <span className="text-xl font-bold">Aorbo Partner Registration</span>
          </div>
          <button
            className="bg-white text-aorbo-teal px-4 py-1.5 rounded"
            onClick={() => navigate("/")}
          >
            Logout
          </button>
        </div>
      </header>

      <main className="container mx-auto py-16 px-4">
        <div className="max-w-xl mx-auto text-center">
          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mb-6">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold mb-4">Success!</h1>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <p className="text-lg mb-6">
              Your KYC process is underway. Please allow 24-48 hours for completion. Our tech team will contact you soon for the next steps. Thank you for your patience!
            </p>
          </div>
          
          <Button 
            className="bg-aorbo-teal hover:bg-aorbo-teal/90"
            onClick={() => navigate("/")}
          >
            Return to Home
          </Button>
        </div>
      </main>
    </div>
  );
};

export default RegistrationSuccess;
