"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface OTPInputProps {
  length?: number
  value: string
  onChange: (value: string) => void
  className?: string
}

export function OTPInput({ length = 6, value, onChange, className }: OTPInputProps) {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(""))
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    if (value) {
      const otpArray = value.split("").slice(0, length)
      const paddedArray = [...otpArray, ...new Array(length - otpArray.length).fill("")]
      setOtp(paddedArray)
    }
  }, [value, length])

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return false

    const newOtp = [...otp]
    newOtp[index] = element.value
    setOtp(newOtp)

    onChange(newOtp.join(""))

    // Focus next input
    if (element.value && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp]
      if (otp[index]) {
        newOtp[index] = ""
        setOtp(newOtp)
        onChange(newOtp.join(""))
      } else if (index > 0) {
        newOtp[index - 1] = ""
        setOtp(newOtp)
        onChange(newOtp.join(""))
        inputRefs.current[index - 1]?.focus()
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus()
    } else if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pasteData = e.clipboardData.getData("text/plain").replace(/\D/g, "").slice(0, length)
    const newOtp = pasteData.split("").concat(new Array(length - pasteData.length).fill(""))
    setOtp(newOtp)
    onChange(pasteData)

    // Focus the next empty input or the last input
    const nextIndex = Math.min(pasteData.length, length - 1)
    inputRefs.current[nextIndex]?.focus()
  }

  return (
    <div className={cn("flex gap-2", className)}>
      {otp.map((digit, index) => (
        <Input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e.target, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          className="w-12 h-12 text-center text-lg font-semibold border-2 focus:border-red-500"
        />
      ))}
    </div>
  )
}
