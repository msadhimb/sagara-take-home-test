"use client"

import { useState } from "react"
import type { DateRange } from "react-day-picker"
import { Calendar, Clock } from "lucide-react"
import FormDate from "@/components/Form/FormDate"
import FormTime from "@/components/Form/FormTime"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ProductDateSelectProps {
  date?: Date | DateRange
  onDateChange: (date: Date | DateRange | undefined) => void
}

const DURATIONS = [1, 7, 14, 30]

const ProductDateSelect = ({ date, onDateChange }: ProductDateSelectProps) => {
  const [open, setOpen] = useState(false)
  const [draftDate, setDraftDate] = useState<Date | DateRange | undefined>(date)
  const [durationDays, setDurationDays] = useState(1)
  const [time, setTime] = useState<Date | undefined>(undefined)

  const handleOpenChange = (next: boolean) => {
    setOpen(next)
    // Start every session from the date that is already confirmed.
    if (next) setDraftDate(date)
  }

  const handleConfirm = () => {
    onDateChange(draftDate)
    setOpen(false)
  }

  return (
    <div className="bg-primary">
      <div className="container mx-auto flex gap-5 p-8">
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
          label="Select Time"
          placeholder="Select Time"
          value={time}
          onChange={setTime}
          containerClassName="text-white"
          icon={<Clock className="text-primary" />}
        />
      </div>
    </div>
  )
}

export default ProductDateSelect
