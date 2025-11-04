"use client"

import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet"
import type { Product } from "@/lib/products-data"

export interface CartItem {
  product: Product
  quantity: number
}

interface CartSheetProps {
  isOpen: boolean
  onClose: () => void
  items: CartItem[]
  onRemoveItem: (productId: string) => void
  onClearCart: () => void
}

export function CartSheet({ isOpen, onClose, items, onRemoveItem, onClearCart }: CartSheetProps) {
  const totalUSD = items.reduce((sum, item) => sum + item.product.priceUSD * item.quantity, 0)

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Carrito de Compras</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-muted-foreground">El carrito está vacío</p>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto py-6 space-y-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-4 p-4 border rounded-lg">
                    <div className="w-20 h-20 relative overflow-hidden rounded bg-muted flex-shrink-0">
                      <img
                        src={item.product.image || "/placeholder.svg"}
                        alt={item.product.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold truncate">{item.product.name}</h4>
                      <p className="text-sm text-muted-foreground">Cantidad: {item.quantity}</p>
                      <p className="text-accent font-semibold mt-1">
                        ${(item.product.priceUSD * item.quantity).toFixed(2)} USD
                      </p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => onRemoveItem(item.product.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>

              <SheetFooter className="border-t pt-4 space-y-4">
                <div className="w-full space-y-2">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total:</span>
                    <span className="text-accent">${totalUSD.toFixed(2)} USD</span>
                  </div>
                  <Button className="w-full" size="lg">
                    Finalizar Pedido
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent" onClick={onClearCart}>
                    Vaciar Carrito
                  </Button>
                </div>
              </SheetFooter>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
