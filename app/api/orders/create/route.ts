import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ajpxyxjxqmtyicetzmlw.supabase.co"
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqcHh5eGp4cW10eWljZXR6bWx3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE5OTg0MjcsImV4cCI6MjA3NzU3NDQyN30.Cqs-R30L6Ga4Ev38BWL5IMXXyaRxywUPF3im02EpSQ"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    console.log("[v0] Creating order with data:", JSON.stringify(body, null, 2))

    if (!body.customer_name || !body.customer_email || !body.customer_phone) {
      throw new Error("Faltan datos del cliente")
    }

    if (!body.items || body.items.length === 0) {
      throw new Error("El pedido no tiene productos")
    }

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
      console.error("[v0] Error creating order:", orderError)
      throw new Error(`Error al crear el pedido: ${orderError.message}`)
    }

    console.log("[v0] Order created successfully:", order)

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
      console.error("[v0] Error creating order items:", itemsError)
      throw new Error(`Error al crear los items del pedido: ${itemsError.message}`)
    }

    console.log("[v0] Order items created successfully")

    return NextResponse.json({ success: true, order })
  } catch (error) {
    console.error("[v0] Error creating order:", error)
    const errorMessage = error instanceof Error ? error.message : "Error desconocido al crear el pedido"
    return NextResponse.json({ error: errorMessage, details: error }, { status: 500 })
  }
}
