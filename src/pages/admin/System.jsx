import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const AdminSystem = () => {
  return /*#__PURE__*/_jsxs("div", {
    children: [/*#__PURE__*/_jsx("h1", {
      className: "text-2xl font-bold mb-6",
      children: "App & System Settings"
    }), /*#__PURE__*/_jsxs(Card, {
      children: [/*#__PURE__*/_jsx(CardHeader, {
        children: /*#__PURE__*/_jsx(CardTitle, {
          children: "System Management"
        })
      }), /*#__PURE__*/_jsx(CardContent, {
        children: /*#__PURE__*/_jsx("p", {
          className: "text-gray-500",
          children: "System management coming soon..."
        })
      })]
    })]
  });
};
export default AdminSystem;