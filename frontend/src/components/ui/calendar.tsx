"use client"

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { cn } from "../../utils/cn";
import { buttonVariants } from "./button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3 bg-purple-50", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-between pt-1 relative items-center px-2",
        caption_label: "text-sm font-medium",
        nav: " items-right  space-x-1",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 text-purple-900 hover:bg-purple-100"
        ),
        table: "w-full border-collapse",
        weekdays: "flex flex-row justify-between",

        head_row: "w-full",
        head_cell: "text-purple-900 w-9 font-normal text-[0.8rem] h-9 flex items-center justify-center",
        row: "flex w-full mt-2",
        cell: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-purple-100 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-purple-100"
        ),
        day_range_end: "day-range-end",
        day_range_start: "day-range-start",
        day_selected:
          "bg-purple-900 text-white hover:bg-purple-800 hover:text-white focus:bg-purple-900 focus:text-white",
        day_today: "bg-purple-100 text-purple-900",
        day_outside: "text-purple-400 opacity-50",
        day_disabled: "text-gray-400 opacity-50 hover:bg-transparent",
        day_range_middle:
          "aria-selected:bg-purple-100 aria-selected:text-purple-900",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
