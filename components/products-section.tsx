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
      <style jsx>{`
        @keyframes gradient-shift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }

        @keyframes hr-expand {
          0% {
            width: 0%;
            opacity: 0;
          }
          100% {
            width: 100%;
            opacity: 1;
          }
        }

        .animated-gradient-text {
          background: linear-gradient(
            90deg,
            #3b82f6,
            #06b6d4,
            #3b82f6,
            #06b6d4
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradient-shift 3s ease infinite;
        }

        .animated-gradient-hr {
          height: 3px;
          background: linear-gradient(
            90deg,
            #3b82f6,
            #06b6d4,
            #3b82f6,
            #06b6d4
          );
          background-size: 200% auto;
          animation: gradient-shift 3s ease infinite, hr-expand 1s ease-out;
          border: none;
          margin: 0 auto;
        }

        .shimmer-button {
          position: relative;
          overflow: hidden;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .shimmer-button:hover {
          transform: translateY(-2px);
        }

        .shimmer-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.3),
            transparent
          );
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }

        .light-theme-button {
          background: linear-gradient(135deg, #1e293b, #334155);
          color: white;
          border: none;
        }

        .light-theme-button:hover {
          box-shadow: 0 10px 25px rgba(30, 41, 59, 0.3);
        }

        .dark-theme-button {
          background: linear-gradient(135deg, #3b82f6, #06b6d4);
          color: white;
          border: none;
        }

        .dark-theme-button:hover {
          box-shadow: 0 10px 25px rgba(59, 130, 246, 0.4);
        }
      `}</style>

      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-3 animated-gradient-text uppercase">
            Nuestros Productos
          </h2>
          <hr className="animated-gradient-hr w-64" />
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={
                selectedCategory === category ? "shimmer-button light-theme-button dark:dark-theme-button" : ""
              }
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
