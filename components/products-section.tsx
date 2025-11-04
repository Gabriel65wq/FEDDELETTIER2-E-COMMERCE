"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ProductModal } from "@/components/product-modal"
import { products, type Category, type Product } from "@/lib/products-data"

interface ProductsSectionProps {
  onAddToCart: (product: Product, quantity: number) => void
}

export function ProductsSection({ onAddToCart }: ProductsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category>("Todos")
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const categories: Category[] = ["Todos", "Accesorios Apple", "Varios", "Vapes", "Perfumes"]

  const filteredProducts =
    selectedCategory === "Todos" ? products : products.filter((p) => p.category === selectedCategory)

  return (
    <section id="productos" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Nuestros Productos</h2>

        {/* Filtros de categoría */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Grid de productos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setSelectedProduct(product)}
            >
              <CardContent className="p-0">
                <div className="aspect-square relative overflow-hidden bg-muted">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="object-cover w-full h-full hover:scale-105 transition-transform"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-start gap-2 p-4">
                <h3 className="font-semibold text-lg line-clamp-2">{product.name}</h3>
                <p className="text-muted-foreground text-sm">{product.subtitle}</p>
                <Badge variant="secondary">{product.category}</Badge>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No hay productos en esta categoría</p>
          </div>
        )}
      </div>

      {/* Modal de detalle del producto */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={onAddToCart}
        />
      )}
    </section>
  )
}
