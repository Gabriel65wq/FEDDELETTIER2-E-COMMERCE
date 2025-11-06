-- Crear tabla de productos del pedido
CREATE TABLE IF NOT EXISTS productos_pedido (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pedido_id UUID NOT NULL REFERENCES pedidos(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Información del producto
  producto_nombre TEXT NOT NULL,
  producto_descripcion TEXT,
  cantidad INTEGER NOT NULL CHECK (cantidad > 0),
  precio_unitario DECIMAL(10, 2) NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL,
  
  -- Metadatos adicionales
  producto_imagen_url TEXT,
  producto_sku TEXT
);

-- Crear índice para búsquedas por pedido
CREATE INDEX IF NOT EXISTS idx_productos_pedido_pedido_id ON productos_pedido(pedido_id);

-- Habilitar Row Level Security (RLS)
ALTER TABLE productos_pedido ENABLE ROW LEVEL SECURITY;

-- Política: Permitir insertar productos sin autenticación
CREATE POLICY "Permitir insertar productos" ON productos_pedido
  FOR INSERT
  WITH CHECK (true);

-- Política: Permitir leer todos los productos
CREATE POLICY "Permitir leer productos" ON productos_pedido
  FOR SELECT
  USING (true);
