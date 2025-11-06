import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validar campos requeridos
    const { cliente, productos, metodoEntrega, metodoPago, totales, notas } = body

    if (!cliente?.nombre || !cliente?.email || !cliente?.telefono) {
      return NextResponse.json({ error: "Faltan datos del cliente" }, { status: 400 })
    }

    if (!productos || productos.length === 0) {
      return NextResponse.json({ error: "El pedido debe tener al menos un producto" }, { status: 400 })
    }

    if (!metodoEntrega || !metodoPago) {
      return NextResponse.json({ error: "Faltan método de entrega o pago" }, { status: 400 })
    }

    // Crear cliente de Supabase
    const supabase = await createClient()

    // Insertar pedido principal
    const { data: pedido, error: pedidoError } = await supabase
      .from("pedidos")
      .insert({
        cliente_nombre: cliente.nombre,
        cliente_email: cliente.email,
        cliente_telefono: cliente.telefono,
        cliente_direccion: cliente.direccion || null,
        cliente_ciudad: cliente.ciudad || null,
        cliente_provincia: cliente.provincia || null,
        cliente_codigo_postal: cliente.codigoPostal || null,
        metodo_entrega: metodoEntrega,
        metodo_pago: metodoPago,
        estado: "pendiente",
        subtotal: totales.subtotal,
        descuento: totales.descuento || 0,
        envio: totales.envio || 0,
        total: totales.total,
        notas: notas || null,
      })
      .select()
      .single()

    if (pedidoError) {
      console.error("[v0] Error al insertar pedido:", pedidoError)
      return NextResponse.json({ error: "Error al crear el pedido", details: pedidoError.message }, { status: 500 })
    }

    // Insertar productos del pedido
    const productosParaInsertar = productos.map((producto: any) => ({
      pedido_id: pedido.id,
      producto_nombre: producto.nombre,
      producto_descripcion: producto.descripcion || null,
      cantidad: producto.cantidad,
      precio_unitario: producto.precioUnitario,
      subtotal: producto.subtotal,
      producto_imagen_url: producto.imagenUrl || null,
      producto_sku: producto.sku || null,
    }))

    const { error: productosError } = await supabase.from("productos_pedido").insert(productosParaInsertar)

    if (productosError) {
      console.error("[v0] Error al insertar productos:", productosError)
      // Intentar eliminar el pedido si falló la inserción de productos
      await supabase.from("pedidos").delete().eq("id", pedido.id)
      return NextResponse.json(
        { error: "Error al guardar los productos del pedido", details: productosError.message },
        { status: 500 },
      )
    }

    console.log("[v0] Pedido creado exitosamente:", pedido.id)

    return NextResponse.json({
      success: true,
      pedido: {
        id: pedido.id,
        estado: pedido.estado,
        total: pedido.total,
      },
    })
  } catch (error) {
    console.error("[v0] Error en /api/pedidos/crear:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
