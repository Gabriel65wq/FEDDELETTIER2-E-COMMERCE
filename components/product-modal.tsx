"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/lib/products-data"

interface ProductModalProps {
  product: Product
  isOpen: boolean
  onClose: () => void
  onAddToCart: (product: Product, quantity: number) => void
}

export function ProductModal({ product, isOpen, onClose, onAddToCart }: ProductModalProps) {
  const [selectedPrice, setSelectedPrice] = useState<number>(product.pricesByQuantity[0]?.priceUSD || 0)
  const [selectedQuantity, setSelectedQuantity] = useState<number>(
    Number.parseInt(product.pricesByQuantity[0]?.quantity.replace(/[^\d]/g, "") || "1"),
  )
  const [dolarCripto, setDolarCripto] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDolarCripto = async () => {
      try {
        setLoading(true)
        const response = await fetch("https://criptoya.com/api/dolar")
        const data = await response.json()
        // Usar el precio de venta del dólar cripto
        const rate = data.cripto?.ask || 1507.43
        setDolarCripto(rate)
      } catch (error) {
        console.error("[v0] Error fetching dolar cripto:", error)
        // Valor por defecto si falla la API
        setDolarCripto(1507.43)
      } finally {
        setLoading(false)
      }
    }

    if (isOpen) {
      fetchDolarCripto()
      // Resetear selección al abrir
      setSelectedPrice(product.pricesByQuantity[0]?.priceUSD || 0)
      setSelectedQuantity(Number.parseInt(product.pricesByQuantity[0]?.quantity.replace(/[^\d]/g, "") || "1"))
    }
  }, [isOpen, product])

  const handlePriceSelect = (priceUSD: number, quantity: string) => {
    setSelectedPrice(priceUSD)
    setSelectedQuantity(Number.parseInt(quantity.replace(/[^\d]/g, "")))
  }

  const totalUSD = selectedPrice * selectedQuantity
  const totalARS = dolarCripto ? totalUSD * dolarCripto : 0

  const handleAddToCart = () => {
    const productWithPrice = {
      ...product,
      priceUSD: selectedPrice,
    }
    onAddToCart(productWithPrice, selectedQuantity)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[95vh] overflow-y-auto p-0">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 h-10 w-10 z-50 bg-background/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <X className="h-6 w-6" />
        </Button>

        <div className="grid md:grid-cols-[2fr,3fr] gap-0">
          {/* Imagen del producto - más grande y a la izquierda */}
          <div className="relative overflow-hidden bg-muted min-h-[600px]">
            <img src={product.image || "/placeholder.svg"} alt={product.name} className="object-cover w-full h-full" />
          </div>

          {/* Contenido del producto - a la derecha */}
          <div className="flex flex-col gap-6 p-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
              <Badge variant="secondary" className="text-sm">
                {product.category}
              </Badge>
            </div>

            {/* Descripción */}
            <div>
              <h3 className="font-semibold text-lg mb-2">Descripción</h3>
              <p className="text-muted-foreground">{product.description}</p>
            </div>

            {/* Detalles */}
            <div>
              <h3 className="font-semibold text-lg mb-2">Detalles</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                {product.details.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-3">Precios por Cantidad</h3>
              <div className="grid grid-cols-4 gap-2">
                {product.pricesByQuantity.map((priceOption, index) => (
                  <Button
                    key={index}
                    variant={
                      selectedPrice === priceOption.priceUSD &&
                      selectedQuantity === Number.parseInt(priceOption.quantity.replace(/[^\d]/g, ""))
                        ? "default"
                        : "outline"
                    }
                    className="flex flex-col h-auto py-3"
                    onClick={() => handlePriceSelect(priceOption.priceUSD, priceOption.quantity)}
                  >
                    <span className="text-xs font-normal">{priceOption.quantity}</span>
                    <span className="text-sm font-bold">${priceOption.priceUSD} USD</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Total */}
            <div className="border-t pt-6 mt-auto">
              <div className="bg-muted p-6 rounded-lg space-y-3">
                <div className="flex justify-between">
                  <span>Cantidad seleccionada:</span>
                  <span className="font-semibold">{selectedQuantity}x</span>
                </div>
                <div className="flex justify-between">
                  <span>Precio unitario:</span>
                  <span className="font-semibold">${selectedPrice.toFixed(2)} USD</span>
                </div>
                <div className="flex justify-between border-t pt-3">
                  <span className="font-semibold">Subtotal USD:</span>
                  <span className="font-bold text-lg">${totalUSD.toFixed(2)}</span>
                </div>
                {loading ? (
                  <div className="text-sm text-muted-foreground text-center py-2">Cargando cotización...</div>
                ) : (
                  <>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Dólar Cripto:</span>
                      <span>${dolarCripto?.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-xl font-bold border-t pt-3">
                      <span>Total ARS:</span>
                      <span className="text-accent">
                        ${totalARS.toLocaleString("es-AR", { maximumFractionDigits: 0 })}
                      </span>
                    </div>
                  </>
                )}
              </div>

              <Button className="w-full mt-6" size="lg" onClick={handleAddToCart}>
                Agregar al Carrito
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
