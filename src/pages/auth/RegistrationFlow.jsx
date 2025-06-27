import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { FileText, User, BanknoteIcon, Info, Check } from "lucide-react";

// Step components
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const PersonalDetailsStep = ({
  formData,
  setFormData,
  onNext
}) => {
  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };
  const handleSubmit = e => {
    e.preventDefault();
    onNext();
  };
  return /*#__PURE__*/_jsxs("div", {
    className: "max-w-4xl mx-auto",
    children: [/*#__PURE__*/_jsx("h2", {
      className: "text-xl font-semibold mb-6",
      children: "Personal Details"
    }), /*#__PURE__*/_jsxs("form", {
      onSubmit: handleSubmit,
      className: "space-y-8",
      children: [/*#__PURE__*/_jsxs("div", {
        className: "grid grid-cols-1 md:grid-cols-2 gap-6",
        children: [/*#__PURE__*/_jsxs("div", {
          children: [/*#__PURE__*/_jsx(Label, {
            htmlFor: "company-name",
            children: "Company Name *"
          }), /*#__PURE__*/_jsx(Input, {
            id: "company-name",
            value: formData.companyName || "",
            onChange: e => handleChange("companyName", e.target.value),
            required: true,
            className: "mt-1"
          })]
        }), /*#__PURE__*/_jsxs("div", {
          children: [/*#__PURE__*/_jsx(Label, {
            htmlFor: "district",
            children: "District *"
          }), /*#__PURE__*/_jsx(Input, {
            id: "district",
            value: formData.district || "",
            onChange: e => handleChange("district", e.target.value),
            required: true,
            className: "mt-1"
          })]
        }), /*#__PURE__*/_jsxs("div", {
          children: [/*#__PURE__*/_jsx(Label, {
            htmlFor: "company-logo",
            children: "Company Logo"
          }), /*#__PURE__*/_jsxs("div", {
            className: "flex mt-1",
            children: [/*#__PURE__*/_jsx(Input, {
              id: "company-logo",
              type: "text",
              value: formData.companyLogo || "",
              onChange: e => handleChange("companyLogo", e.target.value),
              disabled: true,
              className: "rounded-r-none"
            }), /*#__PURE__*/_jsx(Button, {
              variant: "outline",
              className: "rounded-l-none",
              children: "Select"
            })]
          })]
        }), /*#__PURE__*/_jsxs("div", {
          children: [/*#__PURE__*/_jsx(Label, {
            htmlFor: "state",
            children: "State *"
          }), /*#__PURE__*/_jsx(Input, {
            id: "state",
            value: formData.state || "",
            onChange: e => handleChange("state", e.target.value),
            required: true,
            className: "mt-1"
          })]
        }), /*#__PURE__*/_jsxs("div", {
          children: [/*#__PURE__*/_jsx(Label, {
            htmlFor: "business-type",
            children: "Business Type"
          }), /*#__PURE__*/_jsxs(Select, {
            value: formData.businessType || "",
            onValueChange: value => handleChange("businessType", value),
            children: [/*#__PURE__*/_jsx(SelectTrigger, {
              className: "mt-1",
              children: /*#__PURE__*/_jsx(SelectValue, {
                placeholder: "Select"
              })
            }), /*#__PURE__*/_jsxs(SelectContent, {
              children: [/*#__PURE__*/_jsx(SelectItem, {
                value: "tour_operator",
                children: "Tour Operator"
              }), /*#__PURE__*/_jsx(SelectItem, {
                value: "travel_agency",
                children: "Travel Agency"
              }), /*#__PURE__*/_jsx(SelectItem, {
                value: "adventure_company",
                children: "Adventure Company"
              })]
            })]
          })]
        }), /*#__PURE__*/_jsxs("div", {
          children: [/*#__PURE__*/_jsx(Label, {
            htmlFor: "pincode",
            children: "Pincode *"
          }), /*#__PURE__*/_jsx(Input, {
            id: "pincode",
            value: formData.pincode || "",
            onChange: e => handleChange("pincode", e.target.value),
            required: true,
            className: "mt-1"
          })]
        }), /*#__PURE__*/_jsxs("div", {
          children: [/*#__PURE__*/_jsx(Label, {
            htmlFor: "owner-name",
            children: "Owner Name *"
          }), /*#__PURE__*/_jsx(Input, {
            id: "owner-name",
            value: formData.ownerName || "",
            onChange: e => handleChange("ownerName", e.target.value),
            required: true,
            className: "mt-1"
          })]
        }), /*#__PURE__*/_jsxs("div", {
          children: [/*#__PURE__*/_jsx(Label, {
            htmlFor: "pan-number",
            children: "PAN Number *"
          }), /*#__PURE__*/_jsx(Input, {
            id: "pan-number",
            value: formData.panNumber || "",
            onChange: e => handleChange("panNumber", e.target.value),
            required: true,
            className: "mt-1"
          })]
        }), /*#__PURE__*/_jsxs("div", {
          children: [/*#__PURE__*/_jsx(Label, {
            htmlFor: "company-address",
            children: "Company Address *"
          }), /*#__PURE__*/_jsx(Input, {
            id: "company-address",
            value: formData.companyAddress || "",
            onChange: e => handleChange("companyAddress", e.target.value),
            required: true,
            className: "mt-1"
          })]
        }), /*#__PURE__*/_jsxs("div", {
          children: [/*#__PURE__*/_jsx(Label, {
            htmlFor: "msme",
            children: "MSME"
          }), /*#__PURE__*/_jsxs(Select, {
            value: formData.msme || "",
            onValueChange: value => handleChange("msme", value),
            children: [/*#__PURE__*/_jsx(SelectTrigger, {
              className: "mt-1",
              children: /*#__PURE__*/_jsx(SelectValue, {
                placeholder: "Select"
              })
            }), /*#__PURE__*/_jsxs(SelectContent, {
              children: [/*#__PURE__*/_jsx(SelectItem, {
                value: "yes",
                children: "Yes"
              }), /*#__PURE__*/_jsx(SelectItem, {
                value: "no",
                children: "No"
              })]
            })]
          })]
        }), /*#__PURE__*/_jsxs("div", {
          children: [/*#__PURE__*/_jsx(Label, {
            htmlFor: "city",
            children: "City *"
          }), /*#__PURE__*/_jsx(Input, {
            id: "city",
            value: formData.city || "",
            onChange: e => handleChange("city", e.target.value),
            required: true,
            className: "mt-1"
          })]
        }), /*#__PURE__*/_jsxs("div", {
          children: [/*#__PURE__*/_jsx(Label, {
            htmlFor: "msmeNumber",
            children: "MSME Number"
          }), /*#__PURE__*/_jsx(Input, {
            id: "msmeNumber",
            value: formData.msmeNumber || "",
            onChange: e => handleChange("msmeNumber", e.target.value),
            className: "mt-1"
          })]
        })]
      }), /*#__PURE__*/_jsx("div", {
        className: "border-t border-gray-200 pt-8"
      }), /*#__PURE__*/_jsxs("div", {
        className: "grid grid-cols-1 md:grid-cols-2 gap-6",
        children: [/*#__PURE__*/_jsxs("div", {
          children: [/*#__PURE__*/_jsx(Label, {
            htmlFor: "email-address",
            children: "Email Address *"
          }), /*#__PURE__*/_jsx(Input, {
            id: "email-address",
            type: "email",
            value: formData.emailAddress || "",
            onChange: e => handleChange("emailAddress", e.target.value),
            required: true,
            className: "mt-1"
          })]
        }), /*#__PURE__*/_jsxs("div", {
          children: [/*#__PURE__*/_jsx(Label, {
            htmlFor: "phone",
            children: "Phone *"
          }), /*#__PURE__*/_jsx(Input, {
            id: "phone",
            type: "tel",
            value: formData.phone || "",
            onChange: e => handleChange("phone", e.target.value),
            required: true,
            className: "mt-1"
          })]
        }), /*#__PURE__*/_jsxs("div", {
          children: [/*#__PURE__*/_jsx(Label, {
            htmlFor: "alt-mobile",
            children: "Alternative Mobile Number"
          }), /*#__PURE__*/_jsx(Input, {
            id: "alt-mobile",
            type: "tel",
            value: formData.altMobile || "",
            onChange: e => handleChange("altMobile", e.target.value),
            className: "mt-1"
          })]
        }), /*#__PURE__*/_jsxs("div", {
          children: [/*#__PURE__*/_jsx(Label, {
            htmlFor: "business-type-other",
            children: "Business Type (others)"
          }), /*#__PURE__*/_jsx(Input, {
            id: "business-type-other",
            value: formData.businessTypeOther || "",
            onChange: e => handleChange("businessTypeOther", e.target.value),
            className: "mt-1"
          })]
        })]
      }), /*#__PURE__*/_jsx("div", {
        className: "flex justify-end",
        children: /*#__PURE__*/_jsx(Button, {
          type: "submit",
          className: "bg-blue-500 hover:bg-blue-600",
          children: "Continue"
        })
      })]
    })]
  });
};
const BankDetailsStep = ({
  formData,
  setFormData,
  onNext,
  onPrev
}) => {
  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };
  const handleSubmit = e => {
    e.preventDefault();
    onNext();
  };
  return /*#__PURE__*/_jsxs("div", {
    className: "max-w-lg mx-auto",
    children: [/*#__PURE__*/_jsx("h2", {
      className: "text-xl font-semibold mb-6",
      children: "Bank Details"
    }), /*#__PURE__*/_jsxs("form", {
      onSubmit: handleSubmit,
      className: "space-y-6",
      children: [/*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx(Label, {
          htmlFor: "bank-name",
          children: "Bank Name *"
        }), /*#__PURE__*/_jsx(Input, {
          id: "bank-name",
          value: formData.bankName || "",
          onChange: e => handleChange("bankName", e.target.value),
          required: true,
          className: "mt-1"
        })]
      }), /*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx(Label, {
          htmlFor: "account-holder-name",
          children: "Account Holder Name *"
        }), /*#__PURE__*/_jsx(Input, {
          id: "account-holder-name",
          value: formData.accountHolderName || "",
          onChange: e => handleChange("accountHolderName", e.target.value),
          required: true,
          className: "mt-1"
        })]
      }), /*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx(Label, {
          htmlFor: "account-number",
          children: "Account Number *"
        }), /*#__PURE__*/_jsx(Input, {
          id: "account-number",
          value: formData.accountNumber || "",
          onChange: e => handleChange("accountNumber", e.target.value),
          required: true,
          className: "mt-1"
        })]
      }), /*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx(Label, {
          htmlFor: "account-type",
          children: "Bank Account Type"
        }), /*#__PURE__*/_jsxs(Select, {
          value: formData.accountType || "",
          onValueChange: value => handleChange("accountType", value),
          children: [/*#__PURE__*/_jsx(SelectTrigger, {
            className: "mt-1",
            children: /*#__PURE__*/_jsx(SelectValue, {
              placeholder: "Select"
            })
          }), /*#__PURE__*/_jsxs(SelectContent, {
            children: [/*#__PURE__*/_jsx(SelectItem, {
              value: "savings",
              children: "Savings"
            }), /*#__PURE__*/_jsx(SelectItem, {
              value: "current",
              children: "Current"
            })]
          })]
        })]
      }), /*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx(Label, {
          htmlFor: "ifsc",
          children: "IFSC *"
        }), /*#__PURE__*/_jsx(Input, {
          id: "ifsc",
          value: formData.ifsc || "",
          onChange: e => handleChange("ifsc", e.target.value),
          required: true,
          className: "mt-1"
        })]
      }), /*#__PURE__*/_jsxs("div", {
        className: "flex justify-between pt-4",
        children: [/*#__PURE__*/_jsx(Button, {
          type: "button",
          variant: "outline",
          onClick: onPrev,
          children: "Back"
        }), /*#__PURE__*/_jsx(Button, {
          type: "submit",
          className: "bg-blue-500 hover:bg-blue-600",
          children: "Continue"
        })]
      })]
    })]
  });
};
const GSTDetailsStep = ({
  formData,
  setFormData,
  onNext,
  onPrev
}) => {
  const handleSubmit = e => {
    e.preventDefault();
    onNext();
  };
  return /*#__PURE__*/_jsxs("div", {
    className: "max-w-lg mx-auto",
    children: [/*#__PURE__*/_jsx("h2", {
      className: "text-xl font-semibold mb-6",
      children: "GST Details"
    }), /*#__PURE__*/_jsxs("form", {
      onSubmit: handleSubmit,
      className: "space-y-6",
      children: [/*#__PURE__*/_jsxs(RadioGroup, {
        value: formData.gstOption || "no-gstin",
        onValueChange: value => setFormData({
          ...formData,
          gstOption: value
        }),
        children: [/*#__PURE__*/_jsxs("div", {
          className: "flex items-center space-x-2",
          children: [/*#__PURE__*/_jsx(RadioGroupItem, {
            value: "has-gstin",
            id: "has-gstin"
          }), /*#__PURE__*/_jsx(Label, {
            htmlFor: "has-gstin",
            children: "I have GSTIN"
          })]
        }), /*#__PURE__*/_jsxs("div", {
          className: "flex items-center space-x-2",
          children: [/*#__PURE__*/_jsx(RadioGroupItem, {
            value: "no-gstin",
            id: "no-gstin"
          }), /*#__PURE__*/_jsx(Label, {
            htmlFor: "no-gstin",
            children: "I don't have GSTIN"
          })]
        }), /*#__PURE__*/_jsxs("div", {
          className: "flex items-center space-x-2",
          children: [/*#__PURE__*/_jsx(RadioGroupItem, {
            value: "revenue-over-20",
            id: "revenue-over-20"
          }), /*#__PURE__*/_jsx(Label, {
            htmlFor: "revenue-over-20",
            children: "The total revenue generated across India has gone beyond 20 lakhs."
          })]
        }), /*#__PURE__*/_jsxs("div", {
          className: "flex items-center space-x-2",
          children: [/*#__PURE__*/_jsx(RadioGroupItem, {
            value: "revenue-under-20",
            id: "revenue-under-20"
          }), /*#__PURE__*/_jsx(Label, {
            htmlFor: "revenue-under-20",
            children: "The total revenue generated across India has not gone beyond 20 lakhs."
          })]
        })]
      }), formData.gstOption === "has-gstin" && /*#__PURE__*/_jsxs("div", {
        className: "grid grid-cols-4 gap-4",
        children: [/*#__PURE__*/_jsxs("div", {
          children: [/*#__PURE__*/_jsx(Label, {
            htmlFor: "state-name",
            children: "State Name"
          }), /*#__PURE__*/_jsx(Input, {
            id: "state-name",
            value: formData.gstStateName || "",
            onChange: e => setFormData({
              ...formData,
              gstStateName: e.target.value
            }),
            className: "mt-1"
          })]
        }), /*#__PURE__*/_jsxs("div", {
          children: [/*#__PURE__*/_jsx(Label, {
            htmlFor: "state-code",
            children: "State Code Number"
          }), /*#__PURE__*/_jsx(Input, {
            id: "state-code",
            value: formData.gstStateCode || "",
            onChange: e => setFormData({
              ...formData,
              gstStateCode: e.target.value
            }),
            className: "mt-1"
          })]
        }), /*#__PURE__*/_jsxs("div", {
          children: [/*#__PURE__*/_jsx(Label, {
            htmlFor: "gstin",
            children: "GSTIN"
          }), /*#__PURE__*/_jsx(Input, {
            id: "gstin",
            value: formData.gstin || "",
            onChange: e => setFormData({
              ...formData,
              gstin: e.target.value
            }),
            className: "mt-1"
          })]
        }), /*#__PURE__*/_jsxs("div", {
          children: [/*#__PURE__*/_jsx(Label, {
            htmlFor: "head-office",
            children: "Head Office"
          }), /*#__PURE__*/_jsx(Input, {
            id: "head-office",
            value: formData.headOffice || "",
            onChange: e => setFormData({
              ...formData,
              headOffice: e.target.value
            }),
            className: "mt-1"
          })]
        })]
      }), /*#__PURE__*/_jsx("div", {
        className: "pt-8",
        children: /*#__PURE__*/_jsx("p", {
          className: "text-center text-gray-500 text-sm",
          children: "No data found"
        })
      }), /*#__PURE__*/_jsxs("div", {
        className: "flex justify-between pt-4",
        children: [/*#__PURE__*/_jsx(Button, {
          type: "button",
          variant: "outline",
          onClick: onPrev,
          children: "Back"
        }), /*#__PURE__*/_jsx(Button, {
          type: "submit",
          className: "bg-blue-500 hover:bg-blue-600",
          children: "Continue"
        })]
      })]
    })]
  });
};
const DocumentsUploadStep = ({
  formData,
  setFormData,
  onNext,
  onPrev
}) => {
  const handleSubmit = e => {
    e.preventDefault();
    onNext();
  };
  const documentTypes = [{
    id: 'pan-card',
    label: 'Pan Card *',
    required: true
  }, {
    id: 'driving-license',
    label: 'ID Proof(Aadhar/Driving License,etc) *',
    required: true
  }, {
    id: 'cancelled-cheque',
    label: 'Cancelled Cheque *',
    required: true
  }, {
    id: 'gstin-certificate',
    label: 'GSTIN Certificate',
    required: false
  }, {
    id: 'msme-certificate',
    label: 'MSME Certificate',
    required: false
  }];
  const businessTypes = [{
    id: 'partnership-firm',
    label: 'Partnership Firm?'
  }, {
    id: 'partnership-deed',
    label: 'Partnership Deed'
  }, {
    id: 'private-limited-firm',
    label: 'Private Limited Firm?'
  }, {
    id: 'private-limited-document',
    label: 'Private Limited Document'
  }, {
    id: 'proprietorship-firm',
    label: 'Proprietorship Firm?'
  }, {
    id: 'labour-license-document',
    label: 'labour license Document'
  }];
  return /*#__PURE__*/_jsxs("div", {
    className: "max-w-2xl mx-auto",
    children: [/*#__PURE__*/_jsx("h2", {
      className: "text-xl font-semibold mb-6",
      children: "Upload Documents"
    }), /*#__PURE__*/_jsxs("form", {
      onSubmit: handleSubmit,
      className: "space-y-6",
      children: [documentTypes.map(doc => /*#__PURE__*/_jsxs("div", {
        className: "flex items-center justify-between",
        children: [/*#__PURE__*/_jsx(Label, {
          htmlFor: doc.id,
          className: "flex-1",
          children: doc.label
        }), /*#__PURE__*/_jsxs("div", {
          className: "flex items-center gap-2",
          children: [/*#__PURE__*/_jsx(Button, {
            type: "button",
            variant: "outline",
            size: "sm",
            children: "Select"
          }), /*#__PURE__*/_jsx("span", {
            className: "text-xs text-gray-500",
            children: "No file selected"
          })]
        })]
      }, doc.id)), /*#__PURE__*/_jsx("div", {
        className: "border-t border-gray-200 py-4"
      }), businessTypes.map(type => /*#__PURE__*/_jsxs("div", {
        className: "flex items-center justify-between",
        children: [type.id.includes('firm') ? /*#__PURE__*/_jsxs("div", {
          className: "flex items-center gap-2",
          children: [/*#__PURE__*/_jsx("div", {
            className: "flex h-4 w-4 items-center justify-center rounded-full border border-gray-300",
            children: /*#__PURE__*/_jsx("div", {
              className: "h-2 w-2 rounded-full bg-transparent"
            })
          }), /*#__PURE__*/_jsx(Label, {
            htmlFor: type.id,
            children: type.label
          })]
        }) : /*#__PURE__*/_jsx(Label, {
          htmlFor: type.id,
          className: "flex-1",
          children: type.label
        }), /*#__PURE__*/_jsxs("div", {
          className: "flex items-center gap-2",
          children: [/*#__PURE__*/_jsx(Button, {
            type: "button",
            variant: "outline",
            size: "sm",
            children: "Select"
          }), /*#__PURE__*/_jsx("span", {
            className: "text-xs text-gray-500",
            children: "No file selected"
          })]
        })]
      }, type.id)), /*#__PURE__*/_jsxs("div", {
        className: "bg-blue-50 p-4 rounded-md mt-8 flex items-start gap-4",
        children: [/*#__PURE__*/_jsx("div", {
          className: "bg-black rounded-full p-1 text-white shrink-0",
          children: /*#__PURE__*/_jsx(Info, {
            className: "h-4 w-4"
          })
        }), /*#__PURE__*/_jsx("p", {
          className: "text-xs text-gray-700",
          children: "The maximum file size for upload is 2MB per file, and the supported formats include \"jpg\", \"jpeg\", \"png\", \"pdf\"."
        })]
      }), /*#__PURE__*/_jsxs("div", {
        className: "border-t border-gray-200 pt-6",
        children: [/*#__PURE__*/_jsxs("div", {
          className: "flex items-start gap-2 mb-4",
          children: [/*#__PURE__*/_jsx(Checkbox, {
            id: "agreement"
          }), /*#__PURE__*/_jsx(Label, {
            htmlFor: "agreement",
            className: "text-xs leading-tight",
            children: "I AFFIRM that all information provided is complete, accurate, and true. I acknowledge that AORBO INFOCOM shall not be held liable for any delays or failures in transaction arising from incomplete or incorrect information provided by me. I further undertake to promptly notify AORBO INFOCOM of any changes to my account details to ensure the accurate and timely processing of payments through IBEFT, NEFT, or Internet RTGS."
          })]
        }), /*#__PURE__*/_jsx("p", {
          className: "text-sm text-center font-medium mb-4",
          children: "Note: Please verify your information thoroughly, as once submitted, it will be locked and processed by Aorbo."
        })]
      }), /*#__PURE__*/_jsxs("div", {
        className: "flex justify-between",
        children: [/*#__PURE__*/_jsx(Button, {
          type: "button",
          variant: "outline",
          onClick: onPrev,
          children: "Back"
        }), /*#__PURE__*/_jsx(Button, {
          type: "submit",
          className: "bg-blue-500 hover:bg-blue-600",
          children: "Continue"
        })]
      })]
    })]
  });
};
const SuccessStep = () => {
  const navigate = useNavigate();
  return /*#__PURE__*/_jsxs("div", {
    className: "max-w-md mx-auto text-center py-10",
    children: [/*#__PURE__*/_jsx("h2", {
      className: "text-xl font-semibold mb-4",
      children: "Success screen"
    }), /*#__PURE__*/_jsx("p", {
      className: "text-gray-600 mb-8",
      children: "Your KYC process is underway. Please allow 24-48 hours for completion. Our tech team will contact you soon for the next steps. Thank you for your patience!"
    }), /*#__PURE__*/_jsx(Button, {
      onClick: () => navigate("/registration-success"),
      className: "bg-blue-500 hover:bg-blue-600",
      children: "Complete Registration"
    })]
  });
};

// Main Registration Flow Component
const RegistrationFlow = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const steps = [{
    id: 1,
    name: "Personal Details",
    icon: User
  }, {
    id: 2,
    name: "Bank Details",
    icon: BanknoteIcon
  }, {
    id: 3,
    name: "GST Details",
    icon: Info
  }, {
    id: 4,
    name: "Upload Documents",
    icon: FileText
  }, {
    id: 5,
    name: "Success",
    icon: Check
  }];
  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };
  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };
  const handleLogout = () => {
    navigate("/login");
  };
  return /*#__PURE__*/_jsxs("div", {
    className: "min-h-screen bg-gray-50",
    children: [/*#__PURE__*/_jsxs("header", {
      className: "bg-aorbo-teal text-white py-4 px-6 flex justify-between items-center",
      children: [/*#__PURE__*/_jsxs("div", {
        className: "flex items-center",
        children: [/*#__PURE__*/_jsx("div", {
          className: "bg-yellow-300 rounded-full h-10 w-10 flex items-center justify-center mr-3",
          children: /*#__PURE__*/_jsx("span", {
            className: "text-black font-bold text-lg",
            children: "A"
          })
        }), /*#__PURE__*/_jsx("h1", {
          className: "text-xl font-semibold",
          children: "Aorbo Partner Registration"
        })]
      }), /*#__PURE__*/_jsx(Button, {
        variant: "outline",
        className: "text-white border-white hover:bg-white hover:text-aorbo-teal",
        onClick: handleLogout,
        children: "Logout"
      })]
    }), /*#__PURE__*/_jsxs("div", {
      className: "container mx-auto py-8 px-4",
      children: [currentStep < 5 && /*#__PURE__*/_jsxs("div", {
        className: "mb-12",
        children: [/*#__PURE__*/_jsx("div", {
          className: "flex justify-between items-center mb-4",
          children: steps.map(step => /*#__PURE__*/_jsxs("div", {
            className: "flex flex-col items-center flex-1",
            children: [/*#__PURE__*/_jsx("div", {
              className: `w-10 h-10 rounded-full flex items-center justify-center mb-2 ${currentStep >= step.id ? 'bg-aorbo-teal text-white' : 'bg-gray-200 text-gray-500'}`,
              children: /*#__PURE__*/_jsx(step.icon, {
                className: "h-5 w-5"
              })
            }), /*#__PURE__*/_jsx("span", {
              className: "text-xs sm:text-sm",
              children: step.name
            })]
          }, step.id))
        }), /*#__PURE__*/_jsxs("div", {
          className: "relative",
          children: [/*#__PURE__*/_jsx("div", {
            className: "absolute top-0 h-1 bg-gray-200 w-full"
          }), /*#__PURE__*/_jsx("div", {
            className: "absolute top-0 h-1 bg-aorbo-teal transition-all",
            style: {
              width: `${(currentStep - 1) * 25}%`
            }
          })]
        })]
      }), /*#__PURE__*/_jsxs("div", {
        className: "bg-white rounded-lg shadow-sm p-6 md:p-8",
        children: [currentStep === 1 && /*#__PURE__*/_jsx(PersonalDetailsStep, {
          formData: formData,
          setFormData: setFormData,
          onNext: handleNext
        }), currentStep === 2 && /*#__PURE__*/_jsx(BankDetailsStep, {
          formData: formData,
          setFormData: setFormData,
          onNext: handleNext,
          onPrev: handlePrev
        }), currentStep === 3 && /*#__PURE__*/_jsx(GSTDetailsStep, {
          formData: formData,
          setFormData: setFormData,
          onNext: handleNext,
          onPrev: handlePrev
        }), currentStep === 4 && /*#__PURE__*/_jsx(DocumentsUploadStep, {
          formData: formData,
          setFormData: setFormData,
          onNext: handleNext,
          onPrev: handlePrev
        }), currentStep === 5 && /*#__PURE__*/_jsx(SuccessStep, {})]
      })]
    })]
  });
};
export default RegistrationFlow;