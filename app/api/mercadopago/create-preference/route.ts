import { NextResponse } from "next/server"

const MERCADOPAGO_ACCESS_TOKEN = "APP_USR-6665635502382108-103122-150710c98dff7e982709ebc6c6e30111-2959473195"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    console.log("[v0] Creating MercadoPago preference with data:", JSON.stringify(body, null, 2))

    if (!body.items || body.items.length === 0) {
      throw new Error("No hay productos en el pedido")
    }

    const isProduction = process.env.NEXT_PUBLIC_VERCEL_URL || process.env.VERCEL_URL
    const baseUrl = isProduction
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL || process.env.VERCEL_URL}`
      : "http://localhost:3000"

    console.log("[v0] Environment:", isProduction ? "production" : "development")
    console.log("[v0] Base URL:", baseUrl)

    const preference: any = {
      items: body.items.map((item: any) => ({
        title: item.title,
        quantity: item.quantity,
        unit_price: item.unit_price,
        currency_id: "USD",
      })),
      payer: body.payer,
      statement_descriptor: "FEDDELETTIER",
      external_reference: `ORDER-${Date.now()}`,
    }

    if (isProduction) {
      preference.back_urls = {
        success: `${baseUrl}/payment/success`,
        failure: `${baseUrl}/payment/failure`,
        pending: `${baseUrl}/payment/pending`,
      }
      preference.auto_return = "approved"
      preference.notification_url = `${baseUrl}/api/mercadopago/webhook`
      console.log("[v0] Production mode: back_urls and auto_return enabled")
    } else {
      console.log("[v0] Development mode: back_urls and auto_return disabled (MercadoPago doesn't accept localhost)")
    }

    console.log("[v0] Sending preference to MercadoPago:", JSON.stringify(preference, null, 2))

    const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${MERCADOPAGO_ACCESS_TOKEN}`,
      },
      body: JSON.stringify(preference),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("[v0] MercadoPago API error:", errorData)
      throw new Error(`Error de MercadoPago: ${errorData.message || "Error desconocido"}`)
    }

    const data = await response.json()
    console.log("[v0] MercadoPago preference created successfully:", data)
    return NextResponse.json(data)
  } catch (error) {
    console.error("[v0] Error in create-preference:", error)
    const errorMessage = error instanceof Error ? error.message : "Error desconocido al crear la preferencia de pago"
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
