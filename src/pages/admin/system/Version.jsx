import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const AdminSystemVersion = () => {
  return /*#__PURE__*/_jsxs("div", {
    children: [/*#__PURE__*/_jsx("h1", {
      className: "text-2xl font-bold mb-6",
      children: "Version Control"
    }), /*#__PURE__*/_jsxs(Card, {
      children: [/*#__PURE__*/_jsx(CardHeader, {
        children: /*#__PURE__*/_jsx(CardTitle, {
          children: "App Version Management"
        })
      }), /*#__PURE__*/_jsx(CardContent, {
        children: /*#__PURE__*/_jsx("p", {
          className: "text-gray-500",
          children: "Version control coming soon..."
        })
      })]
    })]
  });
};
export default AdminSystemVersion;