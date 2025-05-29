import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, FileText, User, BanknoteIcon, CreditCardIcon, Info, Check, Upload } from "lucide-react";

// Step components
const PersonalDetailsStep = ({ formData, setFormData, onNext }) => {
  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold mb-6">Personal Details</h2>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="company-name">Company Name *</Label>
            <Input 
              id="company-name"
              value={formData.companyName || ""}
              onChange={(e) => handleChange("companyName", e.target.value)}
              required
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="district">District *</Label>
            <Input 
              id="district"
              value={formData.district || ""}
              onChange={(e) => handleChange("district", e.target.value)}
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="company-logo">Company Logo</Label>
            <div className="flex mt-1">
              <Input 
                id="company-logo"
                type="text"
                value={formData.companyLogo || ""}
                onChange={(e) => handleChange("companyLogo", e.target.value)}
                disabled
                className="rounded-r-none"
              />
              <Button variant="outline" className="rounded-l-none">Select</Button>
            </div>
          </div>
          
          <div>
            <Label htmlFor="state">State *</Label>
            <Input 
              id="state"
              value={formData.state || ""}
              onChange={(e) => handleChange("state", e.target.value)}
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="business-type">Business Type</Label>
            <Select 
              value={formData.businessType || ""} 
              onValueChange={(value) => handleChange("businessType", value)}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tour_operator">Tour Operator</SelectItem>
                <SelectItem value="travel_agency">Travel Agency</SelectItem>
                <SelectItem value="adventure_company">Adventure Company</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="pincode">Pincode *</Label>
            <Input 
              id="pincode"
              value={formData.pincode || ""}
              onChange={(e) => handleChange("pincode", e.target.value)}
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="owner-name">Owner Name *</Label>
            <Input 
              id="owner-name"
              value={formData.ownerName || ""}
              onChange={(e) => handleChange("ownerName", e.target.value)}
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="pan-number">PAN Number *</Label>
            <Input 
              id="pan-number"
              value={formData.panNumber || ""}
              onChange={(e) => handleChange("panNumber", e.target.value)}
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="company-address">Company Address *</Label>
            <Input 
              id="company-address"
              value={formData.companyAddress || ""}
              onChange={(e) => handleChange("companyAddress", e.target.value)}
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="msme">MSME</Label>
            <Select 
              value={formData.msme || ""} 
              onValueChange={(value) => handleChange("msme", value)}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="city">City *</Label>
            <Input 
              id="city"
              value={formData.city || ""}
              onChange={(e) => handleChange("city", e.target.value)}
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="msmeNumber">MSME Number</Label>
            <Input 
              id="msmeNumber"
              value={formData.msmeNumber || ""}
              onChange={(e) => handleChange("msmeNumber", e.target.value)}
              className="mt-1"
            />
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-8"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="email-address">Email Address *</Label>
            <Input 
              id="email-address"
              type="email"
              value={formData.emailAddress || ""}
              onChange={(e) => handleChange("emailAddress", e.target.value)}
              required
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="phone">Phone *</Label>
            <Input 
              id="phone"
              type="tel"
              value={formData.phone || ""}
              onChange={(e) => handleChange("phone", e.target.value)}
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="alt-mobile">Alternative Mobile Number</Label>
            <Input 
              id="alt-mobile"
              type="tel"
              value={formData.altMobile || ""}
              onChange={(e) => handleChange("altMobile", e.target.value)}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="business-type-other">Business Type (others)</Label>
            <Input 
              id="business-type-other"
              value={formData.businessTypeOther || ""}
              onChange={(e) => handleChange("businessTypeOther", e.target.value)}
              className="mt-1"
            />
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button type="submit" className="bg-blue-500 hover:bg-blue-600">Continue</Button>
        </div>
      </form>
    </div>
  );
};

const BankDetailsStep = ({ formData, setFormData, onNext, onPrev }) => {
  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-xl font-semibold mb-6">Bank Details</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="bank-name">Bank Name *</Label>
          <Input 
            id="bank-name"
            value={formData.bankName || ""}
            onChange={(e) => handleChange("bankName", e.target.value)}
            required
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="account-holder-name">Account Holder Name *</Label>
          <Input 
            id="account-holder-name"
            value={formData.accountHolderName || ""}
            onChange={(e) => handleChange("accountHolderName", e.target.value)}
            required
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="account-number">Account Number *</Label>
          <Input 
            id="account-number"
            value={formData.accountNumber || ""}
            onChange={(e) => handleChange("accountNumber", e.target.value)}
            required
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="account-type">Bank Account Type</Label>
          <Select 
            value={formData.accountType || ""} 
            onValueChange={(value) => handleChange("accountType", value)}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="savings">Savings</SelectItem>
              <SelectItem value="current">Current</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="ifsc">IFSC *</Label>
          <Input 
            id="ifsc"
            value={formData.ifsc || ""}
            onChange={(e) => handleChange("ifsc", e.target.value)}
            required
            className="mt-1"
          />
        </div>
        
        <div className="flex justify-between pt-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onPrev}
          >
            Back
          </Button>
          <Button 
            type="submit"
            className="bg-blue-500 hover:bg-blue-600"
          >
            Continue
          </Button>
        </div>
      </form>
    </div>
  );
};

const GSTDetailsStep = ({ formData, setFormData, onNext, onPrev }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-xl font-semibold mb-6">GST Details</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <RadioGroup 
          value={formData.gstOption || "no-gstin"} 
          onValueChange={(value) => setFormData({ ...formData, gstOption: value })}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="has-gstin" id="has-gstin" />
            <Label htmlFor="has-gstin">I have GSTIN</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no-gstin" id="no-gstin" />
            <Label htmlFor="no-gstin">I don't have GSTIN</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="revenue-over-20" id="revenue-over-20" />
            <Label htmlFor="revenue-over-20">The total revenue generated across India has gone beyond 20 lakhs.</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="revenue-under-20" id="revenue-under-20" />
            <Label htmlFor="revenue-under-20">The total revenue generated across India has not gone beyond 20 lakhs.</Label>
          </div>
        </RadioGroup>
        
        {formData.gstOption === "has-gstin" && (
          <div className="grid grid-cols-4 gap-4">
            <div>
              <Label htmlFor="state-name">State Name</Label>
              <Input 
                id="state-name"
                value={formData.gstStateName || ""}
                onChange={(e) => setFormData({ ...formData, gstStateName: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="state-code">State Code Number</Label>
              <Input 
                id="state-code"
                value={formData.gstStateCode || ""}
                onChange={(e) => setFormData({ ...formData, gstStateCode: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="gstin">GSTIN</Label>
              <Input 
                id="gstin"
                value={formData.gstin || ""}
                onChange={(e) => setFormData({ ...formData, gstin: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="head-office">Head Office</Label>
              <Input 
                id="head-office"
                value={formData.headOffice || ""}
                onChange={(e) => setFormData({ ...formData, headOffice: e.target.value })}
                className="mt-1"
              />
            </div>
          </div>
        )}
        
        <div className="pt-8">
          <p className="text-center text-gray-500 text-sm">No data found</p>
        </div>
        
        <div className="flex justify-between pt-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onPrev}
          >
            Back
          </Button>
          <Button 
            type="submit"
            className="bg-blue-500 hover:bg-blue-600"
          >
            Continue
          </Button>
        </div>
      </form>
    </div>
  );
};

const DocumentsUploadStep = ({ formData, setFormData, onNext, onPrev }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  const documentTypes = [
    { id: 'pan-card', label: 'Pan Card *', required: true },
    { id: 'driving-license', label: 'ID Proof(Aadhar/Driving License,etc) *', required: true },
    { id: 'cancelled-cheque', label: 'Cancelled Cheque *', required: true },
    { id: 'gstin-certificate', label: 'GSTIN Certificate', required: false },
    { id: 'msme-certificate', label: 'MSME Certificate', required: false },
  ];

  const businessTypes = [
    { id: 'partnership-firm', label: 'Partnership Firm?' },
    { id: 'partnership-deed', label: 'Partnership Deed' },
    { id: 'private-limited-firm', label: 'Private Limited Firm?' },
    { id: 'private-limited-document', label: 'Private Limited Document' },
    { id: 'proprietorship-firm', label: 'Proprietorship Firm?' },
    { id: 'labour-license-document', label: 'labour license Document' },
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-6">Upload Documents</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {documentTypes.map((doc) => (
          <div key={doc.id} className="flex items-center justify-between">
            <Label htmlFor={doc.id} className="flex-1">
              {doc.label}
            </Label>
            <div className="flex items-center gap-2">
              <Button type="button" variant="outline" size="sm">
                Select
              </Button>
              <span className="text-xs text-gray-500">No file selected</span>
            </div>
          </div>
        ))}
        
        <div className="border-t border-gray-200 py-4"></div>
        
        {businessTypes.map((type) => (
          <div key={type.id} className="flex items-center justify-between">
            {type.id.includes('firm') ? (
              <div className="flex items-center gap-2">
                <div className="flex h-4 w-4 items-center justify-center rounded-full border border-gray-300">
                  <div className="h-2 w-2 rounded-full bg-transparent"></div>
                </div>
                <Label htmlFor={type.id}>{type.label}</Label>
              </div>
            ) : (
              <Label htmlFor={type.id} className="flex-1">
                {type.label}
              </Label>
            )}
            <div className="flex items-center gap-2">
              <Button type="button" variant="outline" size="sm">
                Select
              </Button>
              <span className="text-xs text-gray-500">No file selected</span>
            </div>
          </div>
        ))}
        
        <div className="bg-blue-50 p-4 rounded-md mt-8 flex items-start gap-4">
          <div className="bg-black rounded-full p-1 text-white shrink-0">
            <Info className="h-4 w-4" />
          </div>
          <p className="text-xs text-gray-700">The maximum file size for upload is 2MB per file, and the supported formats include "jpg", "jpeg", "png", "pdf".</p>
        </div>
        
        <div className="border-t border-gray-200 pt-6">
          <div className="flex items-start gap-2 mb-4">
            <Checkbox id="agreement" />
            <Label htmlFor="agreement" className="text-xs leading-tight">
              I AFFIRM that all information provided is complete, accurate, and true. I acknowledge that AORBO INFOCOM shall not be held liable for any delays or failures in transaction arising from incomplete or incorrect information provided by me. I further undertake to promptly notify AORBO INFOCOM of any changes to my account details to ensure the accurate and timely processing of payments through IBEFT, NEFT, or Internet RTGS.
            </Label>
          </div>
          <p className="text-sm text-center font-medium mb-4">Note: Please verify your information thoroughly, as once submitted, it will be locked and processed by Aorbo.</p>
        </div>
        
        <div className="flex justify-between">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onPrev}
          >
            Back
          </Button>
          <Button 
            type="submit"
            className="bg-blue-500 hover:bg-blue-600"
          >
            Continue
          </Button>
        </div>
      </form>
    </div>
  );
};

const SuccessStep = () => {
  const navigate = useNavigate();
  
  return (
    <div className="max-w-md mx-auto text-center py-10">
      <h2 className="text-xl font-semibold mb-4">Success screen</h2>
      <p className="text-gray-600 mb-8">
        Your KYC process is underway. Please allow 24-48 hours for completion. Our tech team will contact you soon for the next steps. Thank you for your patience!
      </p>
      <Button 
        onClick={() => navigate("/registration-success")}
        className="bg-blue-500 hover:bg-blue-600"
      >
        Complete Registration
      </Button>
    </div>
  );
};

// Main Registration Flow Component
const RegistrationFlow = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const steps = [
    { id: 1, name: "Personal Details", icon: User },
    { id: 2, name: "Bank Details", icon: BanknoteIcon },
    { id: 3, name: "GST Details", icon: Info },
    { id: 4, name: "Upload Documents", icon: FileText },
    { id: 5, name: "Success", icon: Check }
  ];

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-aorbo-teal text-white py-4 px-6 flex justify-between items-center">
        <div className="flex items-center">
          <div className="bg-yellow-300 rounded-full h-10 w-10 flex items-center justify-center mr-3">
            <span className="text-black font-bold text-lg">A</span>
          </div>
          <h1 className="text-xl font-semibold">Aorbo Partner Registration</h1>
        </div>
        <Button 
          variant="outline" 
          className="text-white border-white hover:bg-white hover:text-aorbo-teal"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </header>

      {/* Progress Indicator */}
      <div className="container mx-auto py-8 px-4">
        {currentStep < 5 && (
          <div className="mb-12">
            <div className="flex justify-between items-center mb-4">
              {steps.map((step) => (
                <div key={step.id} className="flex flex-col items-center flex-1">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${currentStep >= step.id ? 'bg-aorbo-teal text-white' : 'bg-gray-200 text-gray-500'}`}>
                    <step.icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs sm:text-sm">{step.name}</span>
                </div>
              ))}
            </div>
            <div className="relative">
              <div className="absolute top-0 h-1 bg-gray-200 w-full"></div>
              <div 
                className="absolute top-0 h-1 bg-aorbo-teal transition-all" 
                style={{ width: `${(currentStep - 1) * 25}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
          {currentStep === 1 && (
            <PersonalDetailsStep 
              formData={formData} 
              setFormData={setFormData} 
              onNext={handleNext} 
            />
          )}
          
          {currentStep === 2 && (
            <BankDetailsStep 
              formData={formData} 
              setFormData={setFormData} 
              onNext={handleNext} 
              onPrev={handlePrev} 
            />
          )}
          
          {currentStep === 3 && (
            <GSTDetailsStep 
              formData={formData} 
              setFormData={setFormData} 
              onNext={handleNext} 
              onPrev={handlePrev} 
            />
          )}
          
          {currentStep === 4 && (
            <DocumentsUploadStep 
              formData={formData} 
              setFormData={setFormData} 
              onNext={handleNext} 
              onPrev={handlePrev} 
            />
          )}
          
          {currentStep === 5 && (
            <SuccessStep />
          )}
        </div>
      </div>
    </div>
  );
};

export default RegistrationFlow;
