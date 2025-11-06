"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { XCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PaymentFailurePage() {
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(true)
  const [errorInfo, setErrorInfo] = useState<{
    paymentId?: string
    status?: string
  }>({})

  useEffect(() => {
    const paymentId = searchParams.get("payment_id")
    const status = searchParams.get("status")

    setErrorInfo({
      paymentId: paymentId || undefined,
      status: status || undefined,
    })

    setIsLoading(false)

    console.log("[v0] Payment failure page loaded with params:", {
      paymentId,
      status,
    })
  }, [searchParams])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 dark:from-gray-900 dark:to-gray-800">
        <Loader2 className="h-12 w-12 animate-spin text-red-600" />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 space-y-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="rounded-full bg-gradient-to-r from-red-100 to-orange-100 dark:from-red-900 dark:to-orange-900 p-6">
            <XCircle className="h-16 w-16 text-red-600 dark:text-orange-400" />
          </div>

          <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
            Pago Rechazado
          </h1>

          <p className="text-center text-muted-foreground">
            Tu pago no pudo ser procesado. Por favor, verifica tus datos e intenta nuevamente.
          </p>
        </div>

        {errorInfo.paymentId && (
          <div className="border border-red-200 dark:border-red-800 rounded-lg p-4 space-y-2 bg-red-50 dark:bg-red-900/20">
            <h3 className="font-semibold text-sm text-red-900 dark:text-red-100">Información del Error</h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">ID de Pago:</span>
                <span className="font-mono text-foreground">{errorInfo.paymentId}</span>
              </div>
              {errorInfo.status && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Estado:</span>
                  <span className="font-medium text-red-600 dark:text-orange-400">
                    {errorInfo.status === "rejected" ? "Rechazado" : errorInfo.status}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="space-y-3">
          <Button className="w-full blue-button shimmer-button" size="lg" onClick={() => (window.location.href = "/")}>
            Intentar Nuevamente
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            Si el problema persiste, contáctanos a través de nuestras redes sociales.
          </p>
        </div>
      </div>
    </div>
  )
}
