import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { jsx as _jsx } from "react/jsx-runtime";
const Checkbox = /*#__PURE__*/React.forwardRef(({
  className,
  ...props
}, ref) => /*#__PURE__*/_jsx(CheckboxPrimitive.Root, {
  ref: ref,
  className: cn("peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground", className),
  ...props,
  children: /*#__PURE__*/_jsx(CheckboxPrimitive.Indicator, {
    className: cn("flex items-center justify-center text-current"),
    children: /*#__PURE__*/_jsx(Check, {
      className: "h-4 w-4"
    })
  })
}));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;
export { Checkbox };