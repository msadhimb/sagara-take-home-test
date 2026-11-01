"use client"

import { useEffect, useRef, useState } from "react"
import { useSearchParams } from "next/navigation"
import { FormProvider, useForm, type Resolver } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { AnimatePresence, motion } from "motion/react"
import Link from "next/link"
import LoginForm from "../LoginForm"
import RegisterForm from "../RegisterForm"
import ForgotForm from "../ForgotForm"
import { loginSchema } from "../LoginForm/validation"
import { registerSchema } from "../RegisterForm/validation"
import { forgotSchema } from "../ForgotForm/validation"
import {
  authTransition,
  formVariants,
  textVariants,
} from "../../helper/animation"
import { parseMode } from "./helper/parseMode"
import { useAuthStore } from "../../store"

type AuthMode = "login" | "register" | "forgot"

export interface AuthFormValues {
  name: string
  email: string
  companyId: string
  password: string
  remember: boolean
}

const AuthCard = () => {
  const searchParams = useSearchParams()
  const urlMode = parseMode(searchParams.get("mode"))

  const cardRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const modeRef = useRef<AuthMode>("login")
  const pendingModeRef = useRef<AuthMode | null>(null)
  const isNavigatingRef = useRef(false)
  const { step } = useAuthStore()

  const [mode, setMode] = useState<AuthMode>(urlMode)
  const [direction, setDirection] = useState(1)
  const [contentHeight, setContentHeight] = useState<number | "auto">("auto")

  const authDefaults: AuthFormValues = {
    name: "",
    email: "",
    companyId: "",
    password: "",
    remember: true,
  }

  const form = useForm<AuthFormValues>({
    resolver: ((values, context, options) =>
      yupResolver(schemas[modeRef.current])(
        values,
        context,
        options as any
      )) as Resolver<AuthFormValues>,
    mode: "onChange",
    defaultValues: authDefaults,
  })

  const { watch } = form

  const isRegisterVerifying = mode === "register" && step !== "initial"

  const schemas = {
    login: loginSchema,
    register: registerSchema,
    forgot: forgotSchema,
  }

  const getTitle = (mode: AuthMode) => {
    if (mode === "forgot") return "Forgot Password form"

    if (mode === "register") {
      if (step === "initial") return "Sign Up form"

      return "Email Verification"
    }

    return "Sign In form"
  }

  const getSubtitle = (mode: AuthMode) => {
    if (mode === "forgot" || step !== "initial") {
      return `We have sent you an email with a password reset link to ${watch("email")}`
    }

    return "Please logged in to flexible and easy access."
  }

  const getSwitchContent = (mode: AuthMode) => {
    if (mode === "forgot") {
      return {
        question: "Remember your password? ",
        label: "Sign In Here",
        href: "/auth?mode=login",
      }
    }

    if (mode === "register") {
      return {
        question: "Already have an account? ",
        label: "Sign In Here",
        href: "/auth?mode=login",
      }
    }

    return {
      question: "Don't have an account? ",
      label: "Sign Up Here",
      href: "/auth?mode=register",
    }
  }
  const prepareMode = (to: AuthMode) => {
    const email = form.getValues("email")

    modeRef.current = to
    form.reset({ ...authDefaults, email })
  }

  const renderForm = () => {
    if (mode === "forgot") return <ForgotForm />

    if (mode === "register") {
      return <RegisterForm />
    }

    return <LoginForm />
  }

  const renderHeading = () => {
    return (
      <motion.div
        key={`${mode}-heading`}
        variants={textVariants}
        initial="enter"
        animate="center"
        exit="exit"
        className="text-center"
      >
        <h1 className="text-2xl font-bold tracking-tight">{getTitle(mode)}</h1>
        <p className="mt-1.5 text-sm text-neutral-500">{getSubtitle(mode)}</p>
      </motion.div>
    )
  }

  const renderModeSwitch = () => {
    if (isRegisterVerifying) return null

    const { question, label, href } = getSwitchContent(mode)

    return (
      <motion.p
        key="mode-switch"
        variants={textVariants}
        initial="enter"
        animate="center"
        exit="exit"
        className="text-center text-sm text-neutral-500"
      >
        {question}
        <Link
          href={href}
          className="font-semibold text-primary underline-offset-4 transition-colors hover:underline disabled:pointer-events-none disabled:opacity-50"
        >
          {label}
        </Link>
      </motion.p>
    )
  }

  useEffect(() => {
    modeRef.current = mode
  }, [mode])

  useEffect(() => {
    if (isNavigatingRef.current) {
      if (urlMode === modeRef.current) isNavigatingRef.current = false
      return
    }

    if (urlMode === modeRef.current) return

    prepareMode(urlMode)
    setDirection(urlMode === "login" ? -1 : 1)
    pendingModeRef.current = urlMode
    setMode(urlMode)
  }, [urlMode])

  useEffect(() => {
    const node = contentRef.current
    if (!node) return

    const observer = new ResizeObserver(() => {
      setContentHeight(node.getBoundingClientRect().height)
    })
    observer.observe(node)

    return () => observer.disconnect()
  }, [])

  return (
    <FormProvider {...form}>
      <div ref={cardRef} className="overflow-hidden">
        <motion.div
          initial={false}
          animate={{ height: contentHeight }}
          transition={{ duration: authTransition.enter, ease: "easeOut" }}
          className="overflow-hidden"
        >
          <div ref={contentRef} className="flex w-140 flex-col gap-10 p-6">
            <AnimatePresence mode="wait" initial={false}>
              {renderHeading()}
            </AnimatePresence>

            <div className="flex flex-col gap-5">
              <AnimatePresence mode="wait" initial={false} custom={direction}>
                <motion.div
                  key={mode}
                  custom={direction}
                  variants={formVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  {renderForm()}
                </motion.div>
              </AnimatePresence>

              <AnimatePresence mode="wait" initial={false}>
                {renderModeSwitch()}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </FormProvider>
  )
}

export default AuthCard
