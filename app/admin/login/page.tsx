"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { OTPInput } from "@/components/ui/otp-input"
import { Phone, ArrowLeft, Timer } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Alert } from "@/hooks/use-alert"

export default function AdminLogin() {
  const router = useRouter()
  const OTPDigit = 5
  const [step, setStep] = useState<"login" | "otp">("login")
  const [isLoading, setIsLoading] = useState(false)
  const [otp, setOtp] = useState("")
  const [timer, setTimer] = useState(30)
  const [canResend, setCanResend] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState("")
  const [alertData, setAlertData] = useState<{ variant: "info" | "success" | "danger" | "warning" | "dark"; message: string } | null>(null)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (step === "otp" && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [step, timer])

  // 🔥 Extracted reusable API call
  const sendOTP = async (phone: string) => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contact_no: phone }),
      })

      const data = await response.json()
      return data
    } catch (error) {
      console.error("Error sending OTP:", error)
      throw new Error("Failed to send OTP")
    }
  }

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const data = await sendOTP(phoneNumber)

      if (data.success) {
        setStep("otp")
        setTimer(30)
        setCanResend(false)
      } else {
        setAlertData({ variant: "danger", message: data.message || "Failed to send OTP" })
      }
    } catch (error) {
      setAlertData({ variant: "danger", message: "Phone verification failed. Please try again." })
    } finally {
      setIsLoading(false)
    }
  }

  const handleOTPVerify = async () => {
    if (otp.length !== OTPDigit) {
      setAlertData({ variant: "warning", message: "Please enter 5 digit OTP" })
      return
    }

    setIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (otp === "12345") {
        localStorage.setItem("adminToken", "mock-token")
        router.push("/admin/dashboard")
      } else {
        setAlertData({ variant: "danger", message: "Invalid OTP" })
        setOtp("")
      }
    } catch (error) {
      setAlertData({ variant: "danger", message: "OTP verification failed!" })
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendOTP = async () => {
    setIsLoading(true)
    try {
      const data = await sendOTP(phoneNumber) // 🔥 reused same API

      if (data.success) {
        setTimer(30)
        setCanResend(false)
        setOtp("")
        setAlertData({ variant: "success", message: "OTP resent successfully!" })
      } else {
        setAlertData({ variant: "danger", message: data.message || "Failed to resend OTP" })
      }
    } catch (error) {
      setAlertData({ variant: "danger", message: "Failed to resend OTP!" })
    } finally {
      setIsLoading(false)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4">
          <div className="w-40 h-24 mx-auto relative">
            <Image src="/images/mojo-logo.jpg" alt="MojoNetwork" fill className="object-contain" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              {step === "login" ? "Admin Login" : "Verify OTP"}
            </CardTitle>
            <CardDescription>
              {step === "login" ? "Enter your phone number to receive OTP" : ``}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          {alertData && <Alert variant={alertData.variant} message={alertData.message} />}

          {step === "login" ? (
            <form onSubmit={handlePhoneSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="9999999999"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" disabled={isLoading}>
                {isLoading ? "Sending OTP..." : "Send OTP"}
              </Button>

              <div className="text-center">
                <p className="text-sm text-gray-600">Demo phone: 9999999999</p>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="text-center space-y-4">
                <p className="text-sm text-gray-600">
                  We've sent a {OTPDigit}-digit verification code to
                  <br />
                  <span className="font-medium">{phoneNumber}</span>
                </p>

                <div className="flex justify-center">
                  <OTPInput length={OTPDigit} value={otp} onChange={setOtp} />
                </div>

                <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                  <Timer className="w-4 h-4" />
                  {timer > 0 ? (
                    <span>Resend OTP in {formatTime(timer)}</span>
                  ) : (
                    <Button
                      variant="link"
                      className="p-0 h-auto text-red-600 hover:text-red-700"
                      onClick={handleResendOTP}
                      disabled={isLoading}
                    >
                      Resend OTP
                    </Button>
                  )}
                </div>
              </div>

              <Button
                onClick={handleOTPVerify}
                className="w-full bg-red-600 hover:bg-red-700"
                disabled={isLoading || otp.length !== OTPDigit}
              >
                {isLoading ? "Verifying..." : "Verify & Continue"}
              </Button>
              <div className="flex items-center justify-between gap-2 mb-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setStep("login")}
                  className="p-0 h-auto text-gray-600 hover:text-gray-900"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Back to login
                </Button>
                <p className="text-sm text-gray-600">Demo OTP: 12345</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
