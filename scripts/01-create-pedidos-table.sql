-- Crear tabla de pedidos
CREATE TABLE IF NOT EXISTS pedidos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Información del cliente
  cliente_nombre TEXT NOT NULL,
  cliente_email TEXT NOT NULL,
  cliente_telefono TEXT NOT NULL,
  cliente_direccion TEXT,
  cliente_ciudad TEXT,
  cliente_provincia TEXT,
  cliente_codigo_postal TEXT,
  
  -- Información del pedido
  metodo_entrega TEXT NOT NULL CHECK (metodo_entrega IN ('retiro', 'envio')),
  metodo_pago TEXT NOT NULL CHECK (metodo_pago IN ('efectivo', 'mercadopago')),
  estado TEXT NOT NULL DEFAULT 'pendiente' CHECK (estado IN ('pendiente', 'pagado_efectivo', 'pagado_mercadopago', 'cancelado')),
  
  -- Totales
  subtotal DECIMAL(10, 2) NOT NULL,
  descuento DECIMAL(10, 2) DEFAULT 0,
  envio DECIMAL(10, 2) DEFAULT 0,
  total DECIMAL(10, 2) NOT NULL,
  
  -- Información de pago
  comprobante_url TEXT,
  mercadopago_preference_id TEXT,
  mercadopago_payment_id TEXT,
  
  -- Notas
  notas TEXT
);

-- Crear índices para búsquedas rápidas
CREATE INDEX IF NOT EXISTS idx_pedidos_email ON pedidos(cliente_email);
CREATE INDEX IF NOT EXISTS idx_pedidos_estado ON pedidos(estado);
CREATE INDEX IF NOT EXISTS idx_pedidos_created_at ON pedidos(created_at DESC);

-- Crear función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Crear trigger para actualizar updated_at
DROP TRIGGER IF EXISTS update_pedidos_updated_at ON pedidos;
CREATE TRIGGER update_pedidos_updated_at
  BEFORE UPDATE ON pedidos
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Habilitar Row Level Security (RLS)
ALTER TABLE pedidos ENABLE ROW LEVEL SECURITY;

-- Política: Permitir insertar pedidos sin autenticación
CREATE POLICY "Permitir insertar pedidos" ON pedidos
  FOR INSERT
  WITH CHECK (true);

-- Política: Permitir leer todos los pedidos (para admin)
CREATE POLICY "Permitir leer pedidos" ON pedidos
  FOR SELECT
  USING (true);

-- Política: Permitir actualizar pedidos
CREATE POLICY "Permitir actualizar pedidos" ON pedidos
  FOR UPDATE
  USING (true);
