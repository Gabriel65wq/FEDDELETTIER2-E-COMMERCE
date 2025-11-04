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
  const [mercadoPagoLink, setMercadoPagoLink] = useState<string | null>(null)

  const handlePayment = async () => {
    setIsProcessing(true)

    try {
      if (paymentMethod === "efectivo") {
        // Simular procesamiento de pago en efectivo
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // Guardar pedido en Supabase
        await saveOrderToSupabase("efectivo", "completed")

        setPaymentSuccess(true)
      } else {
        // Crear preferencia de pago en Mercado Pago
        const preference = await createMercadoPagoPreference()

        if (preference && preference.init_point) {
          setMercadoPagoLink(preference.init_point)
          // Abrir link de Mercado Pago
          window.open(preference.init_point, "_blank")

          // Simular verificación de pago (en producción, usar webhooks)
          await new Promise((resolve) => setTimeout(resolve, 3000))

          // Guardar pedido en Supabase
          await saveOrderToSupabase("mercadopago", "pending")

          setPaymentSuccess(true)
        }
      }
    } catch (error) {
      console.error("[v0] Error processing payment:", error)
      alert("Error al procesar el pago. Por favor intente nuevamente.")
    } finally {
      setIsProcessing(false)
    }
  }

  const createMercadoPagoPreference = async () => {
    try {
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
        throw new Error("Error creating preference")
      }

      return await response.json()
    } catch (error) {
      console.error("[v0] Error creating MercadoPago preference:", error)
      return null
    }
  }

  const saveOrderToSupabase = async (paymentMethod: string, status: string) => {
    try {
      const response = await fetch("/api/orders/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: items.map((item) => ({
            product_id: item.product.id,
            product_name: item.product.name,
            quantity: item.quantity,
            price_usd: item.product.priceUSD || 0,
          })),
          total_usd: totalUSD,
          total_ars: totalARS,
          crypto_rate: cryptoRate,
          delivery_method: deliveryMethod,
          payment_method: paymentMethod,
          status: status,
          customer_name: formData.name,
          customer_dni: formData.dni,
          customer_email: formData.email,
          customer_phone: formData.phone,
          delivery_address:
            deliveryMethod === "cargo"
              ? `${formData.address} ${formData.number}, ${formData.floor || ""}, ${formData.locality}, ${formData.province}, CP: ${formData.postal}`
              : null,
          delivery_instructions: formData.instructions || null,
          pickup_date: pickupDate || null,
          pickup_time: pickupTime || null,
        }),
      })

      if (!response.ok) {
        throw new Error("Error saving order")
      }

      return await response.json()
    } catch (error) {
      console.error("[v0] Error saving order to Supabase:", error)
    }
  }

  if (paymentSuccess) {
    return (
      <div className="flex flex-col items-center justify-center h-full space-y-6 p-8">
        <div className="rounded-full bg-green-100 dark:bg-green-900 p-6">
          <CheckCircle2 className="h-16 w-16 text-green-600 dark:text-green-400" />
        </div>
        <h2 className="text-3xl font-bold text-center">¡Pago Exitoso!</h2>
        <p className="text-center text-muted-foreground max-w-md">
          {paymentMethod === "efectivo"
            ? "Tu pedido ha sido registrado exitosamente. Recuerda llevar el efectivo al momento del retiro."
            : "Tu pago ha sido procesado exitosamente. Recibirás un correo con los detalles de tu pedido."}
        </p>
        <Button size="lg" onClick={() => window.location.reload()}>
          Volver al Inicio
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      <div className="border-b pb-4 mb-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h2 className="text-2xl font-bold">Factura y Pago</h2>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Columna izquierda: Factura */}
          <div className="space-y-6">
            <div className="border rounded-lg p-6 space-y-4">
              <h3 className="font-semibold text-xl border-b pb-2">Resumen del Pedido</h3>

              <div className="space-y-3">
                <h4 className="font-medium text-sm text-muted-foreground">Productos:</h4>
                {items.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <span className="flex-1">
                      {item.product.name} x{item.quantity}
                    </span>
                    <span className="font-semibold">
                      ${((item.product.priceUSD || 0) * item.quantity).toFixed(2)} USD
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-3 bg-muted p-4 rounded-lg">
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total en USD:</span>
                  <span className="text-accent">${totalUSD.toFixed(2)} USD</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Dólar Cripto:</span>
                  <span>${cryptoRate.toFixed(2)} ARS</span>
                </div>
                <div className="flex justify-between font-bold text-xl border-t pt-3">
                  <span>Total en ARS:</span>
                  <span className="text-accent">
                    ${totalARS.toLocaleString("es-AR", { maximumFractionDigits: 0 })} ARS
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Columna derecha: Datos del cliente y método de pago */}
          <div className="space-y-6">
            <div className="border rounded-lg p-6 space-y-4">
              <h3 className="font-semibold text-xl border-b pb-2">Datos del Cliente</h3>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Nombre:</span>
                  <span className="font-medium">{formData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">DNI:</span>
                  <span className="font-medium">{formData.dni}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email:</span>
                  <span className="font-medium">{formData.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Teléfono:</span>
                  <span className="font-medium">{formData.phone}</span>
                </div>
              </div>

              <div className="border-t pt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Método de Entrega:</span>
                  <span className="font-medium">{deliveryMethod === "retiro" ? "Retiro en Persona" : "Vía Cargo"}</span>
                </div>

                {deliveryMethod === "retiro" && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Fecha de Retiro:</span>
                      <span className="font-medium">{pickupDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Horario:</span>
                      <span className="font-medium">{pickupTime}</span>
                    </div>
                  </>
                )}

                {deliveryMethod === "cargo" && (
                  <div className="flex flex-col gap-1">
                    <span className="text-muted-foreground">Dirección de Envío:</span>
                    <span className="font-medium">
                      {formData.address} {formData.number}
                      {formData.floor && `, ${formData.floor}`}
                    </span>
                    <span className="font-medium">
                      {formData.locality}, {formData.province}
                    </span>
                    <span className="font-medium">CP: {formData.postal}</span>
                    {formData.instructions && (
                      <span className="text-xs text-muted-foreground mt-1">Instrucciones: {formData.instructions}</span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Método de pago */}
            <div className="border rounded-lg p-6 space-y-4">
              <h3 className="font-semibold text-xl border-b pb-2">Método de Pago</h3>

              <RadioGroup
                value={paymentMethod}
                onValueChange={(value) => setPaymentMethod(value as "efectivo" | "mercadopago")}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="efectivo" id="efectivo" disabled={deliveryMethod === "cargo"} />
                  <Label
                    htmlFor="efectivo"
                    className={
                      deliveryMethod === "cargo" ? "text-muted-foreground cursor-not-allowed" : "cursor-pointer"
                    }
                  >
                    Efectivo {deliveryMethod === "cargo" && "(Solo para retiro en persona)"}
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="mercadopago" id="mercadopago" />
                  <Label htmlFor="mercadopago" className="cursor-pointer">
                    Mercado Pago (Transferencia)
                  </Label>
                </div>
              </RadioGroup>

              {deliveryMethod === "cargo" && (
                <p className="text-xs text-muted-foreground bg-muted p-3 rounded">
                  Para envíos por Vía Cargo es obligatorio pagar por transferencia.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Botón de pago */}
      <div className="border-t pt-4 mt-6">
        <Button className="w-full" size="lg" onClick={handlePayment} disabled={isProcessing}>
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
