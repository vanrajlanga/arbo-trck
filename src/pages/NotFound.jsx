import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Map } from "lucide-react";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const NotFound = () => {
  const location = useLocation();
  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);
  return /*#__PURE__*/_jsx("div", {
    className: "min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4",
    children: /*#__PURE__*/_jsxs("div", {
      className: "max-w-md w-full text-center",
      children: [/*#__PURE__*/_jsx("div", {
        className: "w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6",
        children: /*#__PURE__*/_jsx(Map, {
          className: "h-8 w-8 text-aorbo-teal"
        })
      }), /*#__PURE__*/_jsx("h1", {
        className: "text-6xl font-bold text-gray-900 mb-4",
        children: "404"
      }), /*#__PURE__*/_jsx("p", {
        className: "text-xl text-gray-600 mb-8",
        children: "Oops! This trail doesn't exist"
      }), /*#__PURE__*/_jsx("p", {
        className: "text-gray-500 mb-8",
        children: "The path you're looking for seems to be off our map. Let's get you back on track."
      }), /*#__PURE__*/_jsxs("div", {
        className: "flex flex-col sm:flex-row gap-4 justify-center",
        children: [/*#__PURE__*/_jsx(Button, {
          asChild: true,
          variant: "default",
          className: "bg-aorbo-teal hover:bg-aorbo-teal/90",
          children: /*#__PURE__*/_jsx(Link, {
            to: "/",
            children: "Return Home"
          })
        }), /*#__PURE__*/_jsx(Button, {
          variant: "outline",
          onClick: () => window.history.back(),
          children: "Go Back"
        })]
      })]
    })
  });
};
export default NotFound;