import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function DatePicker({
  date,
  setDate,
  className
}) {
  return /*#__PURE__*/_jsxs(Popover, {
    children: [/*#__PURE__*/_jsx(PopoverTrigger, {
      asChild: true,
      children: /*#__PURE__*/_jsxs(Button, {
        variant: "outline",
        className: cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground", className),
        children: [/*#__PURE__*/_jsx(CalendarIcon, {
          className: "mr-2 h-4 w-4"
        }), date ? format(date, "PPP") : /*#__PURE__*/_jsx("span", {
          children: "Pick a date"
        })]
      })
    }), /*#__PURE__*/_jsx(PopoverContent, {
      className: "w-auto p-0",
      align: "start",
      children: /*#__PURE__*/_jsx(Calendar, {
        mode: "single",
        selected: date,
        onSelect: setDate,
        initialFocus: true
      })
    })]
  });
}