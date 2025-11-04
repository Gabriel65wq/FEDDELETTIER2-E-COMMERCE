"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
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
  const [dolarBlue, setDolarBlue] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Obtener cotización del dólar blue
    const fetchDolarBlue = async () => {
      try {
        setLoading(true)
        const response = await fetch("https://dolarapi.com/v1/dolares/blue")
        const data = await response.json()
        setDolarBlue(data.venta)
      } catch (error) {
        console.error("[v0] Error fetching dolar blue:", error)
        // Valor por defecto si falla la API
        setDolarBlue(1200)
      } finally {
        setLoading(false)
      }
    }

    if (isOpen) {
      fetchDolarBlue()
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
  const totalARS = dolarBlue ? totalUSD * dolarBlue : 0

  const handleAddToCart = () => {
    onAddToCart(product, selectedQuantity)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-start justify-between pr-8">
            <span className="text-xl">{product.name}</span>
          </DialogTitle>
          <Button variant="ghost" size="icon" className="absolute right-4 top-4 h-8 w-8" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6 mt-4">
          {/* Imagen del producto */}
          <div className="aspect-square relative overflow-hidden rounded-lg bg-muted">
            <img src={product.image || "/placeholder.svg"} alt={product.name} className="object-cover w-full h-full" />
          </div>

          {/* Detalles del producto */}
          <div className="flex flex-col gap-4">
            <div>
              <Badge variant="secondary" className="mb-3">
                {product.category}
              </Badge>
              <h3 className="font-semibold text-lg mb-2">Descripción</h3>
              <p className="text-muted-foreground text-sm">{product.description}</p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Detalles</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm">
                {product.details.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-3">Precios por Cantidad</h3>
              <div className="grid grid-cols-2 gap-2">
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
            <div className="border-t pt-4 mt-auto">
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Cantidad seleccionada:</span>
                  <span className="font-semibold">{selectedQuantity}x</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Precio unitario:</span>
                  <span className="font-semibold">${selectedPrice.toFixed(2)} USD</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="font-semibold">Subtotal USD:</span>
                  <span className="font-bold">${totalUSD.toFixed(2)}</span>
                </div>
                {loading ? (
                  <div className="text-sm text-muted-foreground text-center py-2">Cargando cotización...</div>
                ) : (
                  <>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Dólar Blue:</span>
                      <span>${dolarBlue?.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold border-t pt-2">
                      <span>Total ARS:</span>
                      <span className="text-accent">
                        ${totalARS.toLocaleString("es-AR", { maximumFractionDigits: 0 })}
                      </span>
                    </div>
                  </>
                )}
              </div>

              <Button className="w-full mt-4" size="lg" onClick={handleAddToCart}>
                Agregar al Carrito
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
