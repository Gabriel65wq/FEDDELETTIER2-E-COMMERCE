"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/lib/products-data"
import { useCryptoRate } from "@/lib/crypto-rate-context"

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
  const { cryptoRate, isLoading } = useCryptoRate()

  useEffect(() => {
    if (isOpen) {
      setSelectedPrice(product.pricesByQuantity[0]?.priceUSD || 0)
      setSelectedQuantity(Number.parseInt(product.pricesByQuantity[0]?.quantity.replace(/[^\d]/g, "") || "1"))
    }
  }, [isOpen, product])

  const handlePriceSelect = (priceUSD: number, quantity: string) => {
    setSelectedPrice(priceUSD)
    setSelectedQuantity(Number.parseInt(quantity.replace(/[^\d]/g, "")))
  }

  const totalUSD = selectedPrice * selectedQuantity
  const totalARS = cryptoRate ? totalUSD * cryptoRate : 0

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
        <style jsx>{`
          @keyframes gradientFlow {
            0%, 100% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
          }

          @keyframes shimmer {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(100%);
            }
          }

          .modal-title {
            background: linear-gradient(90deg, #007bff, #00a8ff, #00d4ff);
            background-size: 200% 100%;
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: gradientFlow 3s ease infinite;
          }

          :global(.dark) .modal-title {
            background: linear-gradient(90deg, #4db8ff, #66d2ff, #2da8ff, #6dd6ff);
            background-size: 200% 100%;
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          .modal-category {
            color: #00a8ff;
          }

          .modal-section-title {
            color: #00a8ff;
          }

          .modal-divider {
            background: linear-gradient(90deg, transparent, rgba(0, 170, 255, 0.3), transparent);
          }

          .modal-image-container {
            background: linear-gradient(135deg, rgba(0, 123, 255, 0.05), rgba(0, 212, 255, 0.05));
            position: relative;
            overflow: hidden;
          }

          .modal-image-container::before {
            content: "";
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
            animation: shimmer 3s infinite;
          }

          .price-button {
            background: linear-gradient(135deg, rgba(0, 123, 255, 0.08), rgba(0, 212, 255, 0.05));
            border: 2px solid rgba(0, 170, 255, 0.2);
            transition: all 0.3s ease;
          }

          .price-button:hover {
            transform: translateY(-3px) scale(1.03);
            box-shadow: 0 8px 25px rgba(0, 170, 255, 0.3);
            border-color: #00a8ff;
          }

          :global(.dark) .price-button {
            background: linear-gradient(135deg, rgba(0, 123, 255, 0.15), rgba(0, 212, 255, 0.08));
            border-color: rgba(0, 170, 255, 0.3);
          }

          :global(.dark) .price-button:hover {
            background: linear-gradient(135deg, rgba(0, 123, 255, 0.25), rgba(0, 212, 255, 0.15));
            border-color: #00d4ff;
          }

          .price-button.selected {
            border-color: #00a8ff;
            background: linear-gradient(135deg, rgba(0, 123, 255, 0.25), rgba(0, 212, 255, 0.15));
            box-shadow: 0 5px 20px rgba(0, 170, 255, 0.4);
            transform: scale(1.05);
          }

          :global(.dark) .price-button.selected {
            background: linear-gradient(135deg, rgba(0, 123, 255, 0.35), rgba(0, 212, 255, 0.2));
            border-color: #00d4ff;
          }

          .price-quantity {
            color: #00a8ff;
          }

          .total-price {
            color: #00a8ff;
          }

          .add-to-cart-button {
            background: linear-gradient(90deg, #007bff, #00a8ff, #00d4ff, #007bff) !important;
            animation: gradientFlow 4s ease infinite;
            color: white !important;
            border: none !important;
          }

          .add-to-cart-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(0, 170, 255, 0.5);
          }
        `}</style>

        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 h-10 w-10 z-50 bg-background/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <X className="h-6 w-6" />
        </Button>

        <div className="grid md:grid-cols-[2fr,3fr] gap-0">
          {/* Imagen del producto */}
          <div className="modal-image-container relative min-h-[600px] flex items-center justify-center p-8">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="max-w-full max-h-[550px] w-auto h-auto object-contain rounded-lg relative z-10"
            />
          </div>

          {/* Contenido del producto */}
          <div className="flex flex-col gap-6 p-8">
            <div>
              <h2 className="modal-title text-3xl font-bold mb-2">{product.name}</h2>
              <Badge variant="secondary" className="modal-category text-sm font-semibold uppercase tracking-wide">
                {product.category}
              </Badge>
            </div>

            <hr className="modal-divider border-none h-[2px]" />

            {/* Descripción */}
            <div>
              <h3 className="modal-section-title font-semibold text-base uppercase tracking-wide mb-2">Descripción</h3>
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            </div>

            {/* Detalles */}
            <div>
              <h3 className="modal-section-title font-semibold text-base uppercase tracking-wide mb-2">Detalles</h3>
              <ul className="space-y-2">
                {product.details.map((detail, index) => (
                  <li key={index} className="flex items-start gap-2 text-muted-foreground">
                    <span className="text-[#00a8ff] font-bold">✓</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="modal-section-title font-semibold text-base uppercase tracking-wide mb-3">
                Precios por Cantidad
              </h3>
              <div className="grid grid-cols-4 gap-2">
                {product.pricesByQuantity.map((priceOption, index) => (
                  <button
                    key={index}
                    className={`price-button flex flex-col items-center justify-center h-auto py-3 rounded-lg cursor-pointer ${
                      selectedPrice === priceOption.priceUSD &&
                      selectedQuantity === Number.parseInt(priceOption.quantity.replace(/[^\d]/g, ""))
                        ? "selected"
                        : ""
                    }`}
                    onClick={() => handlePriceSelect(priceOption.priceUSD, priceOption.quantity)}
                  >
                    <span className="price-quantity text-sm font-bold">{priceOption.quantity}</span>
                    <span className="text-xs font-semibold text-muted-foreground">${priceOption.priceUSD} USD</span>
                  </button>
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
                {isLoading ? (
                  <div className="text-sm text-muted-foreground text-center py-2">Cargando cotización...</div>
                ) : (
                  <>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Dólar Cripto:</span>
                      <span>${cryptoRate?.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-xl font-bold border-t pt-3">
                      <span>Total ARS:</span>
                      <span className="total-price">
                        ${totalARS.toLocaleString("es-AR", { maximumFractionDigits: 0 })}
                      </span>
                    </div>
                  </>
                )}
              </div>

              <Button className="add-to-cart-button w-full mt-6" size="lg" onClick={handleAddToCart}>
                Agregar al Carrito
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
