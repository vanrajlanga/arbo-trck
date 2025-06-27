import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const VendorPayments = () => {
  return /*#__PURE__*/_jsxs("div", {
    children: [/*#__PURE__*/_jsx("h1", {
      className: "text-2xl font-bold mb-6",
      children: "Payment Management"
    }), /*#__PURE__*/_jsxs(Card, {
      children: [/*#__PURE__*/_jsxs(CardHeader, {
        children: [/*#__PURE__*/_jsx(CardTitle, {
          children: "Payment Transactions"
        }), /*#__PURE__*/_jsx(CardDescription, {
          children: "Track your earnings and payment history"
        })]
      }), /*#__PURE__*/_jsx(CardContent, {
        children: /*#__PURE__*/_jsx("div", {
          className: "flex items-center justify-center h-40",
          children: /*#__PURE__*/_jsx("p", {
            className: "text-muted-foreground",
            children: "Payment management features will be implemented here"
          })
        })
      })]
    })]
  });
};
export default VendorPayments;