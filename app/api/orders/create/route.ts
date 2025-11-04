import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ensutpndgexjghivwzvd.supabase.co"
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVuc3V0cG5kZ2V4amdoaXZ3enZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIyMTY1ODEsImV4cCI6MjA3Nzc5MjU4MX0.40XgNuSxbNuZKinevFE1LIACEhWPT8mgNgpdYwk3FEI"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const supabase = createClient(supabaseUrl, supabaseKey)

    // Insertar pedido en la tabla orders
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        total_usd: body.total_usd,
        total_ars: body.total_ars,
        crypto_rate: body.crypto_rate,
        delivery_method: body.delivery_method,
        payment_method: body.payment_method,
        status: body.status,
        customer_name: body.customer_name,
        customer_dni: body.customer_dni,
        customer_email: body.customer_email,
        customer_phone: body.customer_phone,
        delivery_address: body.delivery_address,
        delivery_instructions: body.delivery_instructions,
        pickup_date: body.pickup_date,
        pickup_time: body.pickup_time,
      })
      .select()
      .single()

    if (orderError) {
      throw orderError
    }

    // Insertar items del pedido en la tabla order_items
    const orderItems = body.items.map((item: any) => ({
      order_id: order.id,
      product_id: item.product_id,
      product_name: item.product_name,
      quantity: item.quantity,
      price_usd: item.price_usd,
    }))

    const { error: itemsError } = await supabase.from("order_items").insert(orderItems)

    if (itemsError) {
      throw itemsError
    }

    return NextResponse.json({ success: true, order })
  } catch (error) {
    console.error("[v0] Error creating order:", error)
    return NextResponse.json({ error: "Error creating order" }, { status: 500 })
  }
}
