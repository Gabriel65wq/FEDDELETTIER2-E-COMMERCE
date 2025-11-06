"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { CheckCircle2, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(true)
  const [paymentInfo, setPaymentInfo] = useState<{
    paymentId?: string
    status?: string
    externalReference?: string
  }>({})

  useEffect(() => {
    const paymentId = searchParams.get("payment_id")
    const status = searchParams.get("status")
    const externalReference = searchParams.get("external_reference")

    setPaymentInfo({
      paymentId: paymentId || undefined,
      status: status || undefined,
      externalReference: externalReference || undefined,
    })

    setIsLoading(false)

    console.log("[v0] Payment success page loaded with params:", {
      paymentId,
      status,
      externalReference,
    })
  }, [searchParams])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 space-y-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="rounded-full bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900 p-6">
            <CheckCircle2 className="h-16 w-16 text-green-600 dark:text-emerald-400" />
          </div>

          <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
            ¡Pago Exitoso!
          </h1>

          <p className="text-center text-muted-foreground">
            Tu pago ha sido procesado correctamente. Recibirás un correo electrónico con los detalles de tu pedido.
          </p>
        </div>

        {paymentInfo.paymentId && (
          <div className="border border-blue-200 dark:border-blue-800 rounded-lg p-4 space-y-2 bg-blue-50 dark:bg-blue-900/20">
            <h3 className="font-semibold text-sm text-blue-900 dark:text-blue-100">Detalles del Pago</h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">ID de Pago:</span>
                <span className="font-mono text-foreground">{paymentInfo.paymentId}</span>
              </div>
              {paymentInfo.status && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Estado:</span>
                  <span className="font-medium text-green-600 dark:text-emerald-400">
                    {paymentInfo.status === "approved" ? "Aprobado" : paymentInfo.status}
                  </span>
                </div>
              )}
              {paymentInfo.externalReference && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Referencia:</span>
                  <span className="font-mono text-foreground">{paymentInfo.externalReference}</span>
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
            Si tienes alguna pregunta, contáctanos a través de nuestras redes sociales.
          </p>
        </div>
      </div>
    </div>
  )
}
