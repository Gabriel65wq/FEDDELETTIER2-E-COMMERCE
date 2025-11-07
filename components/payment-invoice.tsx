"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ChevronLeft, CheckCircle2, Loader2 } from "lucide-react"
import type { CartItem } from "@/components/cart-sheet"

interface PaymentInvoiceProps {
  items: CartItem[]
  totalUSD: number
  totalARS: number
  cryptoRate: number
  deliveryMethod: "retiro" | "cargo"
  formData: {
    name: string
    dni: string
    email: string
    phone: string
    address?: string
    number?: string
    floor?: string
    locality?: string
    province?: string
    postal?: string
    instructions?: string
  }
  pickupDate?: string
  pickupTime?: string
  onBack: () => void
}

export function PaymentInvoice({
  items,
  totalUSD,
  totalARS,
  cryptoRate,
  deliveryMethod,
  formData,
  pickupDate,
  pickupTime,
  onBack,
}: PaymentInvoiceProps) {
  const [paymentMethod, setPaymentMethod] = useState<"efectivo" | "mercadopago">(
    deliveryMethod === "cargo" ? "mercadopago" : "efectivo",
  )
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const guardarPedidoEnGoogleSheets = async () => {
    try {
      console.log("[v0] Guardando pedido en Google Sheets...")

      const productosString = items
        .map((item) => `${item.product.name} x${item.quantity} ($${item.product.priceUSD})`)
        .join(", ")

      const pedidoData = {
        nombre_completo: formData.name,
        dni: formData.dni,
        telefono: formData.phone,
        gmail: formData.email,
        metodo_entrega: deliveryMethod === "retiro" ? "Retiro en Persona" : "Vía Cargo",
        metodo_pago: paymentMethod === "efectivo" ? "Efectivo" : "Mercado Pago",
        total_usd: totalUSD,
        productos: productosString,
        fecha_retiro: deliveryMethod === "retiro" ? pickupDate || "" : "N/A",
        horario_retiro: deliveryMethod === "retiro" ? pickupTime || "" : "N/A",
        direccion: deliveryMethod === "cargo" ? formData.address || "" : "N/A",
        altura: deliveryMethod === "cargo" ? formData.number || "" : "N/A",
        localidad: deliveryMethod === "cargo" ? formData.locality || "" : "N/A",
        provincia: deliveryMethod === "cargo" ? formData.province || "" : "N/A",
        codigo_postal: deliveryMethod === "cargo" ? formData.postal || "" : "N/A",
        instrucciones_entrega: deliveryMethod === "cargo" ? formData.instructions || "" : "N/A",
      }

      const response = await fetch("/api/guardar-pedido", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pedidoData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Error al guardar el pedido")
      }

      const result = await response.json()
      console.log("[v0] Pedido guardado exitosamente:", result)
      return result
    } catch (error) {
      console.error("[v0] Error al guardar pedido:", error)
      throw error
    }
  }

  const handlePayment = async () => {
    setIsProcessing(true)
    setErrorMessage(null)

    try {
      console.log("[v0] Starting payment process...")
      console.log("[v0] Payment method:", paymentMethod)
      console.log("[v0] Delivery method:", deliveryMethod)

      await guardarPedidoEnGoogleSheets()

      if (paymentMethod === "efectivo") {
        console.log("[v0] Processing cash payment...")
        // Simular procesamiento
        await new Promise((resolve) => setTimeout(resolve, 1000))
        console.log("[v0] Cash payment successful")
        setPaymentSuccess(true)
      } else {
        console.log("[v0] Creating MercadoPago preference...")
        const preference = await createMercadoPagoPreference()

        if (preference && preference.init_point) {
          console.log("[v0] MercadoPago preference created:", preference.init_point)
          window.location.href = preference.init_point
        } else {
          throw new Error("Error al generar el link de pago de Mercado Pago. Por favor intente nuevamente.")
        }
      }
    } catch (error) {
      console.error("[v0] Error processing payment:", error)
      setErrorMessage(
        error instanceof Error ? error.message : "Error al procesar el pago. Por favor intente nuevamente.",
      )
    } finally {
      setIsProcessing(false)
    }
  }

  const createMercadoPagoPreference = async () => {
    try {
      console.log("[v0] Sending request to MercadoPago API...")
      const response = await fetch("/api/mercadopago/create-preference", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: items.map((item) => ({
            title: item.product.name,
            quantity: item.quantity,
            unit_price: item.product.priceUSD || 0,
          })),
          payer: {
            name: formData.name,
            email: formData.email,
            phone: {
              number: formData.phone,
            },
            identification: {
              type: "DNI",
              number: formData.dni,
            },
          },
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error("[v0] Error response from MercadoPago API:", errorData)
        throw new Error("Error al crear la preferencia de pago")
      }

      const data = await response.json()
      console.log("[v0] MercadoPago preference created successfully:", data)
      return data
    } catch (error) {
      console.error("[v0] Error creating MercadoPago preference:", error)
      throw error
    }
  }

  if (paymentSuccess) {
    return (
      <div className="flex flex-col items-center justify-center h-full space-y-6 p-8">
        <div className="rounded-full bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900 dark:to-cyan-900 p-6">
          <CheckCircle2 className="h-16 w-16 text-blue-600 dark:text-cyan-400" />
        </div>
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
          ¡Pago Exitoso!
        </h2>
        <p className="text-center text-muted-foreground max-w-md">
          {paymentMethod === "efectivo"
            ? "Tu pedido ha sido registrado exitosamente. Recuerda llevar el efectivo al momento del retiro."
            : "Tu pedido ha sido registrado. Completa el pago en Mercado Pago para confirmar tu compra."}
        </p>
        <Button size="lg" onClick={() => window.location.reload()} className="blue-button shimmer-button">
          Volver al Inicio
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      <div className="border-b border-blue-200 dark:border-blue-800 pb-4 mb-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={onBack} className="hover:bg-blue-100 dark:hover:bg-blue-900/30">
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            Factura y Pago
          </h2>
        </div>
      </div>

      {errorMessage && (
        <div className="mb-4 p-4 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-800 rounded-lg text-red-800 dark:text-red-200">
          {errorMessage}
        </div>
      )}

      <div className="flex-1 overflow-y-auto">
        <div className="space-y-6 max-w-4xl mx-auto">
          {/* 1. Resumen del Pedido - Parte Superior */}
          <div className="border border-blue-200 dark:border-blue-800 rounded-lg p-6 space-y-4 bg-white dark:bg-gray-800/50 shadow-lg">
            <h3 className="font-semibold text-xl border-b border-blue-200 dark:border-blue-800 pb-2 text-blue-900 dark:text-blue-100">
              Resumen del Pedido
            </h3>

            <div className="space-y-3">
              <h4 className="font-medium text-sm text-muted-foreground">Productos:</h4>
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex justify-between text-sm border-b border-blue-100 dark:border-blue-900/50 pb-2"
                >
                  <span className="flex-1 text-foreground">
                    {item.product.name} x{item.quantity}
                  </span>
                  <span className="font-semibold text-blue-600 dark:text-cyan-400">
                    ${((item.product.priceUSD || 0) * item.quantity).toFixed(2)} USD
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-blue-200 dark:border-blue-800 pt-4 space-y-3 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/50 dark:to-cyan-900/50 p-4 rounded-lg">
              <div className="flex justify-between font-semibold text-lg">
                <span className="text-blue-900 dark:text-blue-100">Total en USD:</span>
                <span className="text-blue-600 dark:text-cyan-400">${totalUSD.toFixed(2)} USD</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Dólar Cripto:</span>
                <span>${cryptoRate.toFixed(2)} ARS</span>
              </div>
              <div className="flex justify-between font-bold text-xl border-t border-blue-300 dark:border-blue-700 pt-3">
                <span className="text-blue-900 dark:text-blue-100">Total en ARS:</span>
                <span className="text-blue-600 dark:text-cyan-400">
                  ${totalARS.toLocaleString("es-AR", { maximumFractionDigits: 0 })} ARS
                </span>
              </div>
            </div>
          </div>

          {/* 2. Datos del Cliente - Parte Media */}
          <div className="border border-blue-200 dark:border-blue-800 rounded-lg p-6 space-y-4 bg-white dark:bg-gray-800/50 shadow-lg">
            <h3 className="font-semibold text-xl border-b border-blue-200 dark:border-blue-800 pb-2 text-blue-900 dark:text-blue-100">
              Datos del Cliente
            </h3>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Nombre:</span>
                <span className="font-medium text-foreground">{formData.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">DNI:</span>
                <span className="font-medium text-foreground">{formData.dni}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Email:</span>
                <span className="font-medium text-foreground">{formData.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Teléfono:</span>
                <span className="font-medium text-foreground">{formData.phone}</span>
              </div>
            </div>

            <div className="border-t border-blue-200 dark:border-blue-800 pt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Método de Entrega:</span>
                <span className="font-medium text-foreground">
                  {deliveryMethod === "retiro" ? "Retiro en Persona" : "Vía Cargo"}
                </span>
              </div>

              {deliveryMethod === "retiro" && (
                <>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Fecha de Retiro:</span>
                    <span className="font-medium text-foreground">{pickupDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Horario:</span>
                    <span className="font-medium text-foreground">{pickupTime}</span>
                  </div>
                </>
              )}

              {deliveryMethod === "cargo" && (
                <div className="flex flex-col gap-1">
                  <span className="text-muted-foreground">Dirección de Envío:</span>
                  <span className="font-medium text-foreground">
                    {formData.address} {formData.number}
                    {formData.floor && `, ${formData.floor}`}
                  </span>
                  <span className="font-medium text-foreground">
                    {formData.locality}, {formData.province}
                  </span>
                  <span className="font-medium text-foreground">CP: {formData.postal}</span>
                  {formData.instructions && (
                    <span className="text-xs text-muted-foreground mt-1">Instrucciones: {formData.instructions}</span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* 3. Método de Pago - Parte Inferior */}
          <div className="border border-blue-200 dark:border-blue-800 rounded-lg p-6 space-y-4 bg-white dark:bg-gray-800/50 shadow-lg">
            <h3 className="font-semibold text-xl border-b border-blue-200 dark:border-blue-800 pb-2 text-blue-900 dark:text-blue-100">
              Método de Pago
            </h3>

            <RadioGroup
              value={paymentMethod}
              onValueChange={(value) => setPaymentMethod(value as "efectivo" | "mercadopago")}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="efectivo" id="efectivo" disabled={deliveryMethod === "cargo"} />
                <Label
                  htmlFor="efectivo"
                  className={
                    deliveryMethod === "cargo"
                      ? "text-muted-foreground cursor-not-allowed"
                      : "cursor-pointer text-foreground"
                  }
                >
                  Efectivo {deliveryMethod === "cargo" && "(Solo para retiro en persona)"}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="mercadopago" id="mercadopago" />
                <Label htmlFor="mercadopago" className="cursor-pointer text-foreground">
                  Mercado Pago (Transferencia)
                </Label>
              </div>
            </RadioGroup>

            {deliveryMethod === "cargo" && (
              <p className="text-xs text-muted-foreground bg-muted/50 dark:bg-muted/20 p-3 rounded border border-blue-200 dark:border-blue-800">
                Para envíos por Vía Cargo es obligatorio pagar por transferencia.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Botón de pago */}
      <div className="border-t border-blue-200 dark:border-blue-800 pt-4 mt-6">
        <Button className="w-full blue-button shimmer-button" size="lg" onClick={handlePayment} disabled={isProcessing}>
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Procesando...
            </>
          ) : (
            `Confirmar Pago - $${totalARS.toLocaleString("es-AR", { maximumFractionDigits: 0 })} ARS`
          )}
        </Button>
      </div>
    </div>
  )
}
