"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Clock, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PaymentPendingPage() {
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(true)
  const [paymentInfo, setPaymentInfo] = useState<{
    paymentId?: string
    status?: string
  }>({})

  useEffect(() => {
    const paymentId = searchParams.get("payment_id")
    const status = searchParams.get("status")

    setPaymentInfo({
      paymentId: paymentId || undefined,
      status: status || undefined,
    })

    setIsLoading(false)

    console.log("[v0] Payment pending page loaded with params:", {
      paymentId,
      status,
    })
  }, [searchParams])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-gray-900 dark:to-gray-800">
        <Loader2 className="h-12 w-12 animate-spin text-yellow-600" />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 space-y-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="rounded-full bg-gradient-to-r from-yellow-100 to-amber-100 dark:from-yellow-900 dark:to-amber-900 p-6">
            <Clock className="h-16 w-16 text-yellow-600 dark:text-amber-400" />
          </div>

          <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-yellow-600 to-amber-500 bg-clip-text text-transparent">
            Pago Pendiente
          </h1>

          <p className="text-center text-muted-foreground">
            Tu pago está siendo procesado. Te notificaremos por correo electrónico cuando se confirme.
          </p>
        </div>

        {paymentInfo.paymentId && (
          <div className="border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 space-y-2 bg-yellow-50 dark:bg-yellow-900/20">
            <h3 className="font-semibold text-sm text-yellow-900 dark:text-yellow-100">Información del Pago</h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">ID de Pago:</span>
                <span className="font-mono text-foreground">{paymentInfo.paymentId}</span>
              </div>
              {paymentInfo.status && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Estado:</span>
                  <span className="font-medium text-yellow-600 dark:text-amber-400">
                    {paymentInfo.status === "in_process" ? "En Proceso" : paymentInfo.status}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="space-y-3">
          <Button className="w-full blue-button shimmer-button" size="lg" onClick={() => (window.location.href = "/")}>
            Volver al Inicio
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            El proceso puede tardar unos minutos. Recibirás un correo cuando se complete.
          </p>
        </div>
      </div>
    </div>
  )
}
