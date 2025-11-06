import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const { pedidoId, estado, comprobanteUrl, mercadopagoData } = body

    if (!pedidoId || !estado) {
      return NextResponse.json({ error: "Faltan pedidoId o estado" }, { status: 400 })
    }

    // Validar que el estado sea válido
    const estadosValidos = ["pendiente", "pagado_efectivo", "pagado_mercadopago", "cancelado"]
    if (!estadosValidos.includes(estado)) {
      return NextResponse.json({ error: "Estado inválido" }, { status: 400 })
    }

    // Crear cliente de Supabase
    const supabase = await createClient()

    // Preparar datos para actualizar
    const updateData: any = {
      estado,
    }

    if (comprobanteUrl) {
      updateData.comprobante_url = comprobanteUrl
    }

    if (mercadopagoData) {
      if (mercadopagoData.preferenceId) {
        updateData.mercadopago_preference_id = mercadopagoData.preferenceId
      }
      if (mercadopagoData.paymentId) {
        updateData.mercadopago_payment_id = mercadopagoData.paymentId
      }
    }

    // Actualizar pedido
    const { data: pedido, error: updateError } = await supabase
      .from("pedidos")
      .update(updateData)
      .eq("id", pedidoId)
      .select()
      .single()

    if (updateError) {
      console.error("[v0] Error al actualizar pedido:", updateError)
      return NextResponse.json(
        { error: "Error al actualizar el pedido", details: updateError.message },
        { status: 500 },
      )
    }

    console.log("[v0] Pedido actualizado exitosamente:", pedido.id, "Estado:", estado)

    return NextResponse.json({
      success: true,
      pedido: {
        id: pedido.id,
        estado: pedido.estado,
      },
    })
  } catch (error) {
    console.error("[v0] Error en /api/pedidos/actualizar-estado:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
