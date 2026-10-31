export const parseMode = (value: string | null) => {
  if (value === "register") return "register"
  if (value === "forgot") return "forgot"

  return "login"
}
