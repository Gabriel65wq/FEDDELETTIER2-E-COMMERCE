export function InfoSection() {
  return (
    <section id="informacion" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Información</h2>
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Retiros y Envíos */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-accent">Retiros y Envíos de Mercadería</h3>
            <p className="text-muted-foreground leading-relaxed">
              En nuestro sistema de venta mayorista, ofrecemos dos modalidades para que puedas recibir tu pedido de
              forma cómoda y segura: retiro en depósito o envío a través de transporte. A continuación, te detallamos
              cómo funciona cada opción:
            </p>
          </div>

          {/* Retiros por Depósito */}
          <div className="space-y-4 bg-muted/50 p-6 rounded-lg border">
            <h4 className="text-xl font-bold">Retiros por Depósito</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <strong>Pedido previo:</strong> Debe realizarse previamente a través de nuestra página o mediante un
                vendedor autorizado.
              </li>
              <li>
                <strong>Coordinación:</strong> Una vez confirmado el pedido, se coordina día y horario con nuestro
                equipo.
              </li>
              <li>
                <strong>Horario de retiro:</strong> Lunes a viernes de 9 a 17 hs, sábados de 9 a 13 hs.
              </li>
              <li>
                <strong>Sin seña ni pago anticipado:</strong> El pago se realiza al momento del retiro.
              </li>
              <li className="text-accent font-semibold">
                Importante: No se entregan pedidos sin coordinación previa ni fuera del horario acordado.
              </li>
            </ul>
          </div>

          {/* Envíos a Todo el País */}
          <div className="space-y-4 bg-muted/50 p-6 rounded-lg border">
            <h4 className="text-xl font-bold">Envíos a Todo el País</h4>
            <p className="text-muted-foreground">Trabajamos con las siguientes empresas de logística:</p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
              <li>Vía Cargo</li>
              <li>Correo Argentino</li>
              <li>Andreani</li>
              <li>Motomensajería (Quilmes, Zona Sur, CABA y alrededores)</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              <strong>Condiciones para el envío:</strong> Pago anticipado, despacho el mismo día una vez acreditado el
              pago, y tiempos de entrega estimados de 1 a 3 días hábiles.
            </p>
          </div>

          <div className="space-y-4 bg-muted/50 p-6 rounded-lg border">
            <h4 className="text-xl font-bold">Medios de Pago</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <strong>USDT (cripto):</strong> Redes TRC20, BEP20 o Lemontag.
              </li>
              <li>
                <strong>Dólares en efectivo:</strong> Pago al momento del retiro o entrega.
              </li>
              <li>
                <strong>Transferencia en pesos:</strong> Se toma el valor del dólar blue +1,5%.
              </li>
              <li>
                <strong>Pesos en efectivo:</strong> Cotización del dólar blue sin recargo.
              </li>
            </ul>
          </div>

          <div className="space-y-4 bg-muted/50 p-6 rounded-lg border">
            <h4 className="text-xl font-bold">Aclaraciones</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Sabores de los vapes: surtidos.</li>
              <li>• Modelos y colores de fundas: surtidos.</li>
              <li>• No hace falta seña para retirar.</li>
              <li>• Para envíos, el pago debe realizarse con anticipación.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
