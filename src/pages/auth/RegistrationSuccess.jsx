import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const RegistrationSuccess = () => {
  const navigate = useNavigate();
  return /*#__PURE__*/_jsxs("div", {
    className: "min-h-screen bg-gray-50",
    children: [/*#__PURE__*/_jsx("header", {
      className: "bg-aorbo-teal text-white py-4 px-4",
      children: /*#__PURE__*/_jsxs("div", {
        className: "container mx-auto flex justify-between items-center",
        children: [/*#__PURE__*/_jsxs("div", {
          className: "flex items-center gap-2",
          children: [/*#__PURE__*/_jsx("div", {
            className: "w-10 h-10 rounded-full bg-aorbo-yellow flex items-center justify-center",
            children: /*#__PURE__*/_jsx("span", {
              className: "text-black font-bold text-lg",
              children: "A"
            })
          }), /*#__PURE__*/_jsx("span", {
            className: "text-xl font-bold",
            children: "Aorbo Partner Registration"
          })]
        }), /*#__PURE__*/_jsx("button", {
          className: "bg-white text-aorbo-teal px-4 py-1.5 rounded",
          onClick: () => navigate("/"),
          children: "Logout"
        })]
      })
    }), /*#__PURE__*/_jsx("main", {
      className: "container mx-auto py-16 px-4",
      children: /*#__PURE__*/_jsxs("div", {
        className: "max-w-xl mx-auto text-center",
        children: [/*#__PURE__*/_jsx("div", {
          className: "flex justify-center",
          children: /*#__PURE__*/_jsx("div", {
            className: "w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mb-6",
            children: /*#__PURE__*/_jsx(CheckCircle, {
              className: "h-12 w-12 text-green-600"
            })
          })
        }), /*#__PURE__*/_jsx("h1", {
          className: "text-3xl font-bold mb-4",
          children: "Success!"
        }), /*#__PURE__*/_jsx("div", {
          className: "bg-white rounded-lg shadow-md p-6 mb-8",
          children: /*#__PURE__*/_jsx("p", {
            className: "text-lg mb-6",
            children: "Your KYC process is underway. Please allow 24-48 hours for completion. Our tech team will contact you soon for the next steps. Thank you for your patience!"
          })
        }), /*#__PURE__*/_jsx(Button, {
          className: "bg-aorbo-teal hover:bg-aorbo-teal/90",
          onClick: () => navigate("/"),
          children: "Return to Home"
        })]
      })
    })]
  });
};
export default RegistrationSuccess;