"use client"

import type { DateRange } from "react-day-picker"
import { Calendar, Clock } from "lucide-react"
import FormDate from "@/components/Form/FormDate"
import FormTime, { type TimeRange } from "@/components/Form/FormTime"

interface ProductDateSelectProps {
  date?: Date | DateRange
  onDateChange: (date: Date | DateRange | undefined) => void
  time?: TimeRange
  onTimeChange: (time: TimeRange | undefined) => void
}

const ProductDateSelect = ({
  date,
  onDateChange,
  time,
  onTimeChange,
}: ProductDateSelectProps) => {
  return (
    <div className="bg-primary">
      <div className="container mx-auto flex flex-col gap-5 p-8 sm:flex-row">
        <FormDate
          mode="range"
          value={date}
          onChange={onDateChange}
          placeholder="Select Date"
          label="Select Date"
          containerClassName="text-white"
          icon={<Calendar className="text-primary" />}
        />

        <FormTime
          mode="range"
          label="Select Time"
          placeholder="Select Start - End Time"
          value={time}
          onChange={onTimeChange}
          containerClassName="text-white"
          icon={<Clock className="text-primary" />}
        />
      </div>
    </div>
  )
}

export default ProductDateSelect
