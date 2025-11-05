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
    <section id="productos" className="py-16 md:py-24 relative overflow-hidden">
      <style jsx>{`
        #productos {
          background: linear-gradient(
            160deg,
            rgba(0, 123, 255, 0.02) 0%,
            rgba(0, 168, 255, 0.05) 50%,
            rgba(0, 99, 255, 0.03) 100%
          );
        }

        :global(.dark) #productos {
          background: linear-gradient(
            160deg,
            rgba(61, 142, 255, 0.04) 0%,
            rgba(0, 212, 255, 0.07) 50%,
            rgba(61, 142, 255, 0.05) 100%
          );
        }

        @keyframes infoFloat {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          50% {
            transform: translate(-3%, 3%) rotate(-3deg);
          }
        }

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
      `}</style>

      {/* Fondo animado con ::before */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[120%] h-[140%] animate-[infoFloat_18s_ease-in-out_infinite]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(0,170,255,0.08),transparent_50%),radial-gradient(ellipse_at_70%_80%,rgba(0,123,255,0.06),transparent_50%)]" />
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
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
                selectedCategory === category
                  ? "shimmer-button blue-button"
                  : "border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30"
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
              className="overflow-hidden cursor-pointer border-0 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white dark:bg-gray-900"
              onClick={() => setSelectedProduct(product)}
            >
              <CardContent className="p-0">
                <div className="aspect-square relative overflow-hidden bg-gray-50 dark:bg-gray-800">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-start gap-2 p-4">
                <h3 className="font-medium text-base line-clamp-2 text-gray-900 dark:text-gray-100">{product.name}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-xs">{product.subtitle}</p>
                <Badge variant="secondary" className="text-xs">
                  {product.category}
                </Badge>
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
