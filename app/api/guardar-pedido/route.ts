import { NextResponse } from "next/server"
import { google } from "googleapis"

// Configuración de Google Sheets
const SHEET_ID = "1TnXBrsYcNffLs_jfTaySSI6OTWbDDdr5hN_pMIYS1_k"
const SHEET_NAME = "Hoja 1" // Nombre de la hoja, ajustar si es diferente

interface PedidoData {
  nombre_completo: string
  dni: string
  telefono: string
  gmail: string
  fecha_retiro: string
  horario_retiro: string
  direccion: string
  altura: string
  piso_departamento: string
  localidad: string
  provincia: string
  codigo_postal: string
  instrucciones_entrega: string
  metodo_entrega: string
  metodo_pago: string
  productos: string
  total_usd: number
  total_ars: number
}

export async function POST(request: Request) {
  try {
    console.log("[v0] Recibiendo solicitud para guardar pedido...")

    // Validar variables de entorno
    if (!process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
      console.error("[v0] Error: Faltan credenciales de Google")
      return NextResponse.json(
        { error: "Configuración de Google Sheets incompleta. Contacte al administrador." },
        { status: 500 },
      )
    }

    // Parsear el cuerpo de la solicitud
    const data: PedidoData = await request.json()
    console.log("[v0] Datos recibidos:", { ...data, gmail: data.gmail ? "***" : undefined })

    // Validar campos requeridos
    const camposRequeridos = ["nombre_completo", "dni", "telefono", "gmail"]
    const camposFaltantes = camposRequeridos.filter((campo) => !data[campo as keyof PedidoData])

    if (camposFaltantes.length > 0) {
      console.error("[v0] Campos faltantes:", camposFaltantes)
      return NextResponse.json({ error: `Campos requeridos faltantes: ${camposFaltantes.join(", ")}` }, { status: 400 })
    }

    // Validar campos según método de entrega
    if (data.metodo_entrega === "retiro") {
      if (!data.fecha_retiro || !data.horario_retiro) {
        return NextResponse.json({ error: "Para retiro en persona, debe especificar fecha y horario" }, { status: 400 })
      }
    } else if (data.metodo_entrega === "cargo") {
      const camposDomicilio = ["direccion", "altura", "localidad", "provincia", "codigo_postal"]
      const camposDomicilioFaltantes = camposDomicilio.filter((campo) => !data[campo as keyof PedidoData])

      if (camposDomicilioFaltantes.length > 0) {
        return NextResponse.json(
          { error: `Para envío por cargo, debe completar: ${camposDomicilioFaltantes.join(", ")}` },
          { status: 400 },
        )
      }
    }

    console.log("[v0] Configurando autenticación de Google...")

    // Configurar autenticación con Google
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    })

    const sheets = google.sheets({ version: "v4", auth })

    console.log("[v0] Preparando datos para insertar en Google Sheets...")

    // Orden: Nombre completo, Dni, Telefono, Gmail, Metodo entrega, Pago, Precio usd, Productos,
    // Fecha Retiro, Horario Retiro, Direccion, Altura, Localidad, Provincia, Codigo postal, Instrucciones de entrega
    const row = [
      data.nombre_completo,
      data.dni,
      data.telefono,
      data.gmail,
      data.metodo_entrega || "N/A",
      data.metodo_pago || "N/A",
      data.total_usd?.toString() || "0",
      data.productos || "N/A",
      data.fecha_retiro || "N/A",
      data.horario_retiro || "N/A",
      data.direccion || "N/A",
      data.altura || "N/A",
      data.localidad || "N/A",
      data.provincia || "N/A",
      data.codigo_postal || "N/A",
      data.instrucciones_entrega || "N/A",
    ]

    console.log("[v0] Insertando fila en Google Sheets...")

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: `${SHEET_NAME}!A:P`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [row],
      },
    })

    console.log("[v0] Pedido guardado exitosamente en Google Sheets")
    console.log("[v0] Respuesta de Google:", response.data)

    return NextResponse.json({
      success: true,
      message: "Pedido guardado exitosamente",
      updatedRange: response.data.updates?.updatedRange,
    })
  } catch (error) {
    console.error("[v0] Error al guardar pedido en Google Sheets:", error)

    // Manejo de errores específicos
    if (error instanceof Error) {
      if (error.message.includes("Unable to parse range")) {
        return NextResponse.json(
          { error: "Error de configuración: Verifique el nombre de la hoja en Google Sheets" },
          { status: 500 },
        )
      }

      if (error.message.includes("The caller does not have permission")) {
        return NextResponse.json(
          {
            error:
              "Error de permisos: Verifique que la cuenta de servicio tenga acceso a la hoja de cálculo y que el email de la cuenta de servicio esté agregado como editor",
          },
          { status: 403 },
        )
      }

      return NextResponse.json({ error: `Error al guardar pedido: ${error.message}` }, { status: 500 })
    }

    return NextResponse.json({ error: "Error desconocido al guardar pedido" }, { status: 500 })
  }
}
