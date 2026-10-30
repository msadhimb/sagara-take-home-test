import FormDate from "@/components/Form/FormDate"
import { Calendar, Clock } from "lucide-react"
import type { DateRange } from "react-day-picker"

interface ProductDateSelectProps {
  date?: Date | DateRange
  onDateChange: (date: Date | DateRange | undefined) => void
}

const ProductDateSelect = ({ date, onDateChange }: ProductDateSelectProps) => {
  return (
    <div className="bg-primary">
      <div className="container mx-auto flex gap-5 p-8">
        <FormDate
          mode="single"
          value={date}
          onChange={onDateChange}
          placeholder="Select Date"
          label="Select Date"
          containerClassName="text-white"
          icon={<Calendar className="text-primary" />}
        />
        <FormDate
          mode="single"
          value={date}
          onChange={onDateChange}
          placeholder="Select Time"
          label="Select Time"
          containerClassName="text-white"
          icon={<Clock className="text-primary" />}
        />
      </div>
    </div>
  )
}

export default ProductDateSelect
