"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { ProductsSection } from "@/components/products-section"
import { InfoSection } from "@/components/info-section"
import { ReferencesSection } from "@/components/references-section"
import { Footer } from "@/components/footer"
import { CartSheet, type CartItem } from "@/components/cart-sheet"
import type { Product } from "@/lib/products-data"

export default function Home() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  const handleAddToCart = (product: Product, quantity: number) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.product.id === product.id)

      if (existingItem) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item,
        )
      }

      return [...prev, { product, quantity }]
    })
  }

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId))
  }

  const handleClearCart = () => {
    setCartItems([])
  }

  const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar cartItemsCount={cartItemsCount} onCartClick={() => setIsCartOpen(true)} />
      <main className="flex-1">
        <HeroSection />
        <ProductsSection onAddToCart={handleAddToCart} />
        <InfoSection />
        <ReferencesSection />
      </main>
      <Footer />
      <CartSheet
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />
    </div>
  )
}
