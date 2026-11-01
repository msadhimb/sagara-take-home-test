"use client"

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const pad = (value: number) => String(value).padStart(2, "0")

const getItemHeight = (list: HTMLElement | null) =>
  list?.querySelector("button")?.offsetHeight || 1

type WheelType = "hour" | "minute"

interface TimeWheelProps {
  label?: string
  value?: Date
  onChange: (hour: number, minute: number) => void
}

const TimeWheel = ({ label, value, onChange }: TimeWheelProps) => {
  const hourListRef = useRef<HTMLDivElement>(null)
  const minuteListRef = useRef<HTMLDivElement>(null)
  const isProgrammaticScroll = useRef(false)
  const unlockTimeout = useRef<number | undefined>(undefined)
  const frames = useRef<Record<WheelType, number | undefined>>({
    hour: undefined,
    minute: undefined,
  })
  const [fallback] = useState(() => new Date())

  const source = value instanceof Date ? value : fallback
  const selectedHour = source.getHours()
  const selectedMinute = source.getMinutes()

  const [hourPos, setHourPos] = useState(selectedHour)
  const [minutePos, setMinutePos] = useState(selectedMinute)

  const lockScroll = useCallback((duration: number) => {
    isProgrammaticScroll.current = true
    window.clearTimeout(unlockTimeout.current)
    unlockTimeout.current = window.setTimeout(() => {
      isProgrammaticScroll.current = false
    }, duration)
  }, [])

  const getList = (type: WheelType) =>
    type === "hour" ? hourListRef.current : minuteListRef.current

  const scrollToTime = useCallback(
    (hour: number, minute: number, behavior: ScrollBehavior) => {
      lockScroll(behavior === "smooth" ? 400 : 120)
      const hourList = hourListRef.current
      const minuteList = minuteListRef.current
      hourList?.scrollTo({ top: hour * getItemHeight(hourList), behavior })
      minuteList?.scrollTo({
        top: minute * getItemHeight(minuteList),
        behavior,
      })
    },
    [lockScroll]
  )

  const emitChange = (hour: number, minute: number) => {
    if (
      value instanceof Date &&
      value.getHours() === hour &&
      value.getMinutes() === minute
    ) {
      return
    }
    onChange(hour, minute)
  }

  const handleScroll = (type: WheelType) => {
    const list = getList(type)
    if (!list) return

    const position = list.scrollTop / getItemHeight(list)

    if (frames.current[type] === undefined) {
      frames.current[type] = window.requestAnimationFrame(() => {
        frames.current[type] = undefined
        if (type === "hour") setHourPos(position)
        else setMinutePos(position)
      })
    }

    if (isProgrammaticScroll.current) return

    const max = list.children.length - 1
    const index = Math.min(max, Math.max(0, Math.round(position)))

    if (type === "hour") emitChange(index, selectedMinute)
    else emitChange(selectedHour, index)
  }

  const handleSelect = (type: WheelType, index: number) => {
    const list = getList(type)
    lockScroll(400)
    list?.scrollTo({ top: index * getItemHeight(list), behavior: "smooth" })

    if (type === "hour") emitChange(index, selectedMinute)
    else emitChange(selectedHour, index)
  }

  const handleKeyDown = (
    type: WheelType,
    event: KeyboardEvent<HTMLDivElement>
  ) => {
    if (event.key !== "ArrowUp" && event.key !== "ArrowDown") return
    event.preventDefault()

    const list = getList(type)
    const max = (list?.children.length ?? 1) - 1
    const current = type === "hour" ? selectedHour : selectedMinute
    const delta = event.key === "ArrowDown" ? 1 : -1
    handleSelect(type, Math.min(max, Math.max(0, current + delta)))
  }

  const dragRef = useRef<{
    type: WheelType
    pointerId: number
    startY: number
    startScroll: number
    lastY: number
    lastT: number
    velocity: number
    moved: boolean
  } | null>(null)
  const suppressClick = useRef(false)

  const handlePointerDown = (
    type: WheelType,
    event: ReactPointerEvent<HTMLDivElement>
  ) => {
    if (event.pointerType !== "mouse" || event.button !== 0) return
    const list = getList(type)
    if (!list) return

    dragRef.current = {
      type,
      pointerId: event.pointerId,
      startY: event.clientY,
      startScroll: list.scrollTop,
      lastY: event.clientY,
      lastT: performance.now(),
      velocity: 0,
      moved: false,
    }
  }

  const handlePointerMove = (
    type: WheelType,
    event: ReactPointerEvent<HTMLDivElement>
  ) => {
    const drag = dragRef.current
    const list = getList(type)
    if (!drag || drag.type !== type || !list) return

    const deltaY = event.clientY - drag.startY

    if (!drag.moved) {
      if (Math.abs(deltaY) < 4) return
      drag.moved = true
      list.setPointerCapture(drag.pointerId)
      list.style.scrollSnapType = "none"
    }

    const now = performance.now()
    const dt = now - drag.lastT
    if (dt > 0) drag.velocity = (drag.lastY - event.clientY) / dt
    drag.lastY = event.clientY
    drag.lastT = now

    list.scrollTop = drag.startScroll - deltaY
  }

  const handlePointerEnd = (
    type: WheelType,
    event: ReactPointerEvent<HTMLDivElement>
  ) => {
    const drag = dragRef.current
    const list = getList(type)
    dragRef.current = null
    if (!drag || drag.type !== type || !list || !drag.moved) return

    suppressClick.current = true
    window.setTimeout(() => {
      suppressClick.current = false
    }, 0)

    if (list.hasPointerCapture(event.pointerId)) {
      list.releasePointerCapture(event.pointerId)
    }
    list.style.scrollSnapType = ""

    const idle = performance.now() - drag.lastT > 80
    const velocity = idle ? 0 : drag.velocity
    const max = list.children.length - 1
    const projected = list.scrollTop + velocity * 160
    const index = Math.min(
      max,
      Math.max(0, Math.round(projected / getItemHeight(list)))
    )

    handleSelect(type, index)
  }

  const handleNow = () => {
    const current = new Date()
    scrollToTime(current.getHours(), current.getMinutes(), "smooth")
    emitChange(current.getHours(), current.getMinutes())
  }

  // Posisi awal saat wheel dimount (popover dibuka)
  useEffect(() => {
    const frame = window.requestAnimationFrame(() =>
      scrollToTime(selectedHour, selectedMinute, "auto")
    )
    return () => window.cancelAnimationFrame(frame)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Sinkron saat value berubah dari luar (mis. koreksi otomatis di mode range)
  useEffect(() => {
    if (!(value instanceof Date)) return
    const hourList = hourListRef.current
    const minuteList = minuteListRef.current
    if (!hourList || !minuteList) return

    const hourIndex = Math.round(hourList.scrollTop / getItemHeight(hourList))
    const minuteIndex = Math.round(
      minuteList.scrollTop / getItemHeight(minuteList)
    )
    if (hourIndex !== selectedHour || minuteIndex !== selectedMinute) {
      scrollToTime(selectedHour, selectedMinute, "smooth")
    }
  }, [value, selectedHour, selectedMinute, scrollToTime])

  useEffect(
    () => () => {
      window.clearTimeout(unlockTimeout.current)
    },
    []
  )

  const renderWheel = (type: WheelType) => {
    const isHour = type === "hour"
    const items = Array.from({ length: isHour ? 24 : 60 }, (_, index) => index)
    const position = isHour ? hourPos : minutePos

    return (
      <div
        ref={isHour ? hourListRef : minuteListRef}
        role="listbox"
        tabIndex={0}
        aria-label={isHour ? "Jam" : "Menit"}
        onScroll={() => handleScroll(type)}
        onKeyDown={(event) => handleKeyDown(type, event)}
        onPointerDown={(event) => handlePointerDown(type, event)}
        onPointerMove={(event) => handlePointerMove(type, event)}
        onPointerUp={(event) => handlePointerEnd(type, event)}
        onPointerCancel={(event) => handlePointerEnd(type, event)}
        className={cn(
          "h-[200px] w-16 cursor-grab snap-y snap-mandatory overflow-y-auto overscroll-contain rounded-md py-20 outline-none select-none active:cursor-grabbing",
          "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          "focus-visible:ring-2 focus-visible:ring-primary/40",
          "[mask-image:linear-gradient(to_bottom,transparent,black_28%,black_72%,transparent)]"
        )}
      >
        {items.map((item) => {
          const distance = Math.abs(item - position)
          const isActive = distance < 0.5
          const direction = item < position ? 1 : -1

          return (
            <button
              key={item}
              type="button"
              role="option"
              tabIndex={-1}
              aria-selected={item === (isHour ? selectedHour : selectedMinute)}
              onClick={() => {
                if (suppressClick.current) return
                handleSelect(type, item)
              }}
              className={cn(
                "flex h-10 w-full snap-center items-center justify-center text-[26px] tabular-nums will-change-transform",
                isActive
                  ? "font-semibold text-primary"
                  : "font-normal text-neutral-500"
              )}
              style={{
                opacity: Math.max(0.15, 1 - distance * 0.36),
                transform: `perspective(240px) rotateX(${
                  Math.min(distance, 2.5) * 16 * direction
                }deg) scale(${Math.max(0.7, 1 - distance * 0.1)})`,
              }}
            >
              {pad(item)}
            </button>
          )
        })}
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center">
      {label ? (
        <p className="pt-3 text-xs font-semibold tracking-wide text-neutral-500 uppercase">
          {label}
        </p>
      ) : null}

      <div className="relative px-5 py-2">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-3 top-1/2 h-10 -translate-y-1/2 rounded-lg bg-primary/10 ring-1 ring-primary/20"
        />
        <div className="relative z-10 flex items-center justify-center">
          {renderWheel("hour")}
          <span
            aria-hidden
            className="w-4 text-center text-2xl font-semibold text-primary"
          >
            :
          </span>
          {renderWheel("minute")}
        </div>
      </div>

      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={handleNow}
        className="mb-2 text-neutral-600 hover:text-neutral-900"
      >
        Sekarang
      </Button>
    </div>
  )
}

export default TimeWheel
