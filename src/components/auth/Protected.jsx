import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
const Protected = ({
  children,
  role
}) => {
  const {
    user,
    isLoading
  } = useAuth();
  if (isLoading) {
    return /*#__PURE__*/_jsx("div", {
      className: "flex items-center justify-center min-h-screen",
      children: "Loading..."
    });
  }
  if (!user) {
    return /*#__PURE__*/_jsx(Navigate, {
      to: "/login",
      replace: true
    });
  }
  if (role && user.role !== role) {
    return /*#__PURE__*/_jsx(Navigate, {
      to: "/",
      replace: true
    });
  }
  return /*#__PURE__*/_jsx(_Fragment, {
    children: children
  });
};
export default Protected;