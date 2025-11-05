"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { X, ChevronLeft } from "lucide-react"

const mainReferences = ["/imagenes/referencias1.jpg", "/imagenes/referencias2.jpg", "/imagenes/referencias3.jpg"]

const allReferences = [
  "/imagenes/referencias1.jpg",
  "/imagenes/referencias2.jpg",
  "/imagenes/referencias3.jpg",
  "/imagenes/referencias4.jpg",
  "/imagenes/referencias5.jpg",
  "/imagenes/referencias6.jpg",
  "/imagenes/referencias7.jpg",
  "/imagenes/referencias8.jpg",
  "/imagenes/referencias9.jpg",
  "/imagenes/referencias10.jpg",
  "/imagenes/referencias11.jpg",
  "/imagenes/referencias12.jpg",
  "/imagenes/referencias13.jpg",
  "/imagenes/referencias14.jpg",
  "/imagenes/referencias15.jpg",
  "/imagenes/referencias16.jpg",
  "/imagenes/referencias17.jpg",
  "/imagenes/referencias18.jpg",
  "/imagenes/referencias19.jpg",
  "/imagenes/referencias20.jpg",
]

export function ReferencesSection() {
  const [showGallery, setShowGallery] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  return (
    <section id="referencias" className="py-16 md:py-24 bg-muted/30">
      <style jsx>{`
        @keyframes gradient-shift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
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

      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-3 animated-gradient-text uppercase">
            Referencias
          </h2>
          <hr className="animated-gradient-hr w-64" />
        </div>

        <div className="max-w-2xl mx-auto text-center mb-12">
          <p className="text-lg leading-relaxed text-muted-foreground">✅ +1000 clientes satisfechos en todo el país</p>
          <p className="text-lg leading-relaxed text-muted-foreground">
            📦 Envíos diarios por transporte y retiros coordinados
          </p>
          <p className="text-lg leading-relaxed text-muted-foreground">💬 Testimonios reales de WhatsApp</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 max-w-5xl mx-auto">
          {mainReferences.map((image, index) => (
            <div key={index} className="aspect-square relative overflow-hidden rounded-lg bg-muted">
              <img
                src={image || "/placeholder.svg"}
                alt={`Referencia ${index + 1}`}
                className="object-cover w-full h-full hover:scale-105 transition-transform"
              />
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button
            size="lg"
            onClick={() => setShowGallery(true)}
            className="relative overflow-hidden rounded-full bg-gradient-to-r from-black to-gray-800 dark:from-blue-600 dark:to-blue-400 text-white hover:scale-105 transition-transform before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-700"
          >
            Ver Todas las Referencias
          </Button>
        </div>
      </div>

      <Dialog open={showGallery} onOpenChange={setShowGallery}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader className="pb-4">
            <DialogTitle className="flex items-center justify-between text-xl">
              <Button variant="ghost" size="lg" onClick={() => setShowGallery(false)} className="gap-2">
                <ChevronLeft className="h-5 w-5" />
                Volver
              </Button>
              <span>Galería de Referencias</span>
              <div className="w-[100px]"></div>
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {allReferences.map((image, index) => (
              <div
                key={index}
                className="aspect-square relative overflow-hidden rounded-lg bg-muted cursor-pointer"
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={image || "/placeholder.svg"}
                  alt={`Referencia ${index + 1}`}
                  className="object-cover w-full h-full hover:scale-105 transition-transform"
                />
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Lightbox para imagen en tamaño real */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-black/95">
          <div className="relative w-full h-full flex items-center justify-center p-4">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-white hover:bg-white/20"
              onClick={() => setSelectedImage(null)}
            >
              <X className="h-6 w-6" />
            </Button>
            {selectedImage && (
              <img
                src={selectedImage || "/placeholder.svg"}
                alt="Referencia en tamaño real"
                className="max-w-full max-h-[90vh] object-contain"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}
