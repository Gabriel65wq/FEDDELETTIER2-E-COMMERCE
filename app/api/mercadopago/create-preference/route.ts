import { NextResponse } from "next/server"

const MERCADOPAGO_ACCESS_TOKEN = "APP_USR-6665635502382108-103122-150710c98dff7e982709ebc6c6e30111-2959473195"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const preference = {
      items: body.items.map((item: any) => ({
        title: item.title,
        quantity: item.quantity,
        unit_price: item.unit_price,
        currency_id: "USD",
      })),
      payer: body.payer,
      back_urls: {
        success: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/payment/success`,
        failure: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/payment/failure`,
        pending: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/payment/pending`,
      },
      auto_return: "approved",
      notification_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/mercadopago/webhook`,
    }

    const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${MERCADOPAGO_ACCESS_TOKEN}`,
      },
      body: JSON.stringify(preference),
    })

    if (!response.ok) {
      throw new Error("Error creating MercadoPago preference")
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("[v0] Error in create-preference:", error)
    return NextResponse.json({ error: "Error creating preference" }, { status: 500 })
  }
}
