import { Check, CheckCircle, X, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { passwordResetRules, passwordRules } from "../../../../helper/password"

interface PasswordChecklistProps {
  password: string
  confirmPassword?: string
  matchPassword?: boolean
}

const PasswordChecklist = ({
  password,
  confirmPassword,
  matchPassword = false,
}: PasswordChecklistProps) => {
  const rules = matchPassword ? passwordResetRules : passwordRules

  return (
    <ul className="mt-2 flex flex-col gap-1" aria-live="polite">
      {rules.map((rule) => {
        const passed = rule.test(password, {
          confirm_password: confirmPassword,
        })

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
