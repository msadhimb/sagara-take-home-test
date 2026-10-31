import { Check, CheckCircle, X, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { passwordRules } from "../../validation/password"

interface PasswordChecklistProps {
  password: string
}

const PasswordChecklist = ({ password }: PasswordChecklistProps) => {
  return (
    <ul className="mt-2 flex flex-col gap-1" aria-live="polite">
      {passwordRules.map((rule) => {
        const passed = rule.test(password)

        return (
          <li
            key={rule.id}
            className={cn(
              "flex items-center gap-1.5 text-xs transition-colors"
            )}
          >
            {passed ? (
              <CheckCircle className="size-3.5 text-emerald-600" />
            ) : (
              <XCircle className="size-3.5 text-rose-600" />
            )}
            <span>{rule.label}</span>
          </li>
        )
      })}
    </ul>
  )
}

export default PasswordChecklist
