import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { cn } from "@/lib/utils";
import { jsx as _jsx } from "react/jsx-runtime";
const Separator = /*#__PURE__*/React.forwardRef(({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}, ref) => /*#__PURE__*/_jsx(SeparatorPrimitive.Root, {
  ref: ref,
  decorative: decorative,
  orientation: orientation,
  className: cn("shrink-0 bg-border", orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]", className),
  ...props
}));
Separator.displayName = SeparatorPrimitive.Root.displayName;
export { Separator };