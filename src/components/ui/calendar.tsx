"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react"
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, startOfWeek, endOfWeek, isToday } from "date-fns"

import { cn } from "@/lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface CalendarProps {
  selected?: Date
  onSelect?: (date: Date | undefined) => void
  className?: string
  disabled?: (date: Date) => boolean
}

function Calendar({
  selected,
  onSelect,
  className,
  disabled,
}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState(selected || new Date())

  const handlePreviousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const calendarStart = startOfWeek(monthStart)
  const calendarEnd = endOfWeek(monthEnd)

  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd })
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  return (
    <div className={cn(
      "w-full max-w-[320px] mx-auto",
      "bg-background/40 backdrop-blur-xl",
      "rounded-2xl p-4",
      "border border-border/30",
      "shadow-xl shadow-black/5",
      className
    )}>
      {/* Header - Month Navigation */}
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={handlePreviousMonth}
          className={cn(
            "p-2 rounded-full",
            "hover:bg-muted/80 active:scale-95",
            "transition-all duration-200",
            "text-foreground/70 hover:text-foreground"
          )}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-1">
          <span className="text-base font-semibold text-foreground">
            {format(currentMonth, 'MMMM')}
          </span>
          <span className="text-base font-medium text-muted-foreground">
            {format(currentMonth, 'yyyy')}
          </span>
        </div>
        <button
          type="button"
          onClick={handleNextMonth}
          className={cn(
            "p-2 rounded-full",
            "hover:bg-muted/80 active:scale-95",
            "transition-all duration-200",
            "text-foreground/70 hover:text-foreground"
          )}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day) => (
          <div
            key={day}
            className="h-8 flex items-center justify-center text-xs font-medium text-muted-foreground"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => {
          const isSelected = selected ? isSameDay(day, selected) : false
          const isCurrentMonth = isSameMonth(day, currentMonth)
          const isCurrentDay = isToday(day)
          const isDisabled = disabled ? disabled(day) : false

          return (
            <button
              key={index}
              type="button"
              disabled={isDisabled}
              onClick={() => onSelect?.(day)}
              className={cn(
                "relative h-10 w-full rounded-xl",
                "flex items-center justify-center",
                "text-sm font-medium",
                "transition-all duration-200",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",

                // Base states
                isCurrentMonth
                  ? "text-foreground"
                  : "text-muted-foreground/40",

                // Hover state
                !isSelected && !isDisabled && "hover:bg-muted/60 active:scale-95",

                // Selected state - Apple-style filled circle
                isSelected && cn(
                  "bg-primary text-primary-foreground",
                  "shadow-md shadow-primary/30",
                  "hover:bg-primary/90"
                ),

                // Today indicator (when not selected)
                !isSelected && isCurrentDay && cn(
                  "font-bold",
                  "after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2",
                  "after:w-1 after:h-1 after:rounded-full after:bg-primary"
                ),

                // Disabled state
                isDisabled && "opacity-30 cursor-not-allowed"
              )}
            >
              {format(day, 'd')}
            </button>
          )
        })}
      </div>
    </div>
  )
}
Calendar.displayName = "Calendar"

interface CalendarPopoverProps {
  date?: Date
  onDateChange?: (date: Date | undefined) => void
  placeholder?: string
  className?: string
  disabled?: (date: Date) => boolean
}

function CalendarPopover({
  date,
  onDateChange,
  placeholder = "Select date",
  className,
  disabled
}: CalendarPopoverProps) {
  const [open, setOpen] = React.useState(false)

  const handleSelect = (newDate: Date | undefined) => {
    onDateChange?.(newDate)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          suppressHydrationWarning
          className={cn(
            "flex h-12 w-full items-center justify-between",
            "rounded-full border border-input",
            "bg-background/50 backdrop-blur-sm",
            "px-4 py-3",
            "text-sm",
            "ring-offset-background",
            "transition-all duration-200",
            "hover:bg-muted/50 hover:border-primary/50",
            "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
        >
          <span className={cn(
            "truncate",
            date ? "text-foreground" : "text-muted-foreground"
          )}>
            {date ? format(date, "EEEE, MMMM d, yyyy") : placeholder}
          </span>
          <CalendarIcon className="h-4 w-4 text-muted-foreground shrink-0 ml-2" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto p-0 bg-transparent border-0 shadow-none"
        align="center"
        sideOffset={8}
      >
        <Calendar
          selected={date}
          onSelect={handleSelect}
          disabled={disabled}
        />
      </PopoverContent>
    </Popover>
  )
}

export { Calendar, CalendarPopover }
export type { CalendarProps }
