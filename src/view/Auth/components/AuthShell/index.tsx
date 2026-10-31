import Logo from "@/components/Icons/logo"

interface AuthShellProps {
  children: React.ReactNode
}

const AuthShell = ({ children }: AuthShellProps) => {
  return (
    <main className="relative flex h-screen items-start justify-center overflow-hidden bg-background px-4 py-12">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 size-72 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-10%] bottom-[-15%] size-80 rounded-full bg-primary/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 left-[-12%] size-64 rounded-full bg-primary/10 blur-3xl"
      />

      <div className="absolute top-14">
        <Logo size={46} />
      </div>

      <div className="flex h-full w-full flex-col items-center justify-center">
        {children}
      </div>
    </main>
  )
}

export default AuthShell
