"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Heart } from "lucide-react"

// Generar productos de ejemplo
const generateProducts = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `Referencia ${i + 1}`,
    price: Math.floor(Math.random() * 100) + 50,
    image: `/placeholder.svg?height=400&width=400&query=moda+ropa+elegante+${i + 1}`,
    category: ["Camisas", "Pantalones", "Chaquetas", "Accesorios"][Math.floor(Math.random() * 4)],
  }))
}

export function ProductGallery() {
  const [showAll, setShowAll] = useState(false)
  const [favorites, setFavorites] = useState<Set<number>>(new Set())

  const allProducts = generateProducts(20)
  const displayedProducts = showAll ? allProducts : allProducts.slice(0, 8)

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(id)) {
        newFavorites.delete(id)
      } else {
        newFavorites.add(id)
      }
      return newFavorites
    })
  }

  return (
    <section id="productos" className="py-16 sm:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">Nuestra Colección</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Explora nuestras referencias exclusivas, cada una seleccionada cuidadosamente para ofrecerte lo mejor en
            moda y estilo.
          </p>
        </div>

        {/* Grid de productos - Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-12">
          {displayedProducts.map((product) => (
            <Card key={product.id} className="group overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-0">
                <div className="relative aspect-square overflow-hidden bg-secondary">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute top-3 right-3 h-9 w-9 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => toggleFavorite(product.id)}
                  >
                    <Heart className={`h-4 w-4 ${favorites.has(product.id) ? "fill-red-500 text-red-500" : ""}`} />
                  </Button>
                  <Badge className="absolute top-3 left-3">{product.category}</Badge>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-accent">${product.price}</span>
                    <Button size="sm" className="gap-2">
                      <ShoppingCart className="h-4 w-4" />
                      Agregar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Botón Ver Todas las Referencias - Funcional */}
        {!showAll && (
          <div className="text-center">
            <Button
              size="lg"
              variant="outline"
              onClick={() => setShowAll(true)}
              className="text-base sm:text-lg h-12 sm:h-14 px-6 sm:px-8"
            >
              Ver Todas las Referencias ({allProducts.length})
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
