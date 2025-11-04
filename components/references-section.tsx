"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { X, ChevronLeft } from "lucide-react"

const mainReferences = [
  "/imagenes/referencias1.jpg",
  "/imagenes/referencias2.jpg",
  "/imagenes/referencias3.jpg",
]

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
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">REFERENCIAS</h2>

        <div className="max-w-2xl mx-auto text-center mb-12">
          <p className="text-lg leading-relaxed text-muted-foreground">✅ +1000 clientes satisfechos en todo el país</p>
          <p className="text-lg leading-relaxed text-muted-foreground">
            📦 Envíos diarios por transporte y retiros coordinados
          </p>
          <p className="text-lg leading-relaxed text-muted-foreground">💬 Testimonios reales de WhatsApp</p>
        </div>

        {/* Vista previa */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 max-w-5xl mx-auto">
          {mainReferences.map((image, index) => (
            <div key={index} className="aspect-square relative overflow-hidden rounded-lg bg-muted">
              <img
                src={image}
                alt={`Referencia ${index + 1}`}
                className="object-cover w-full h-full hover:scale-105 transition-transform"
              />
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" onClick={() => setShowGallery(true)}>
            Ver Todas las Referencias
          </Button>
        </div>
      </div>

      {/* Galería completa */}
      <Dialog open={showGallery} onOpenChange={setShowGallery}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader className="pb-4">
            <DialogTitle className="flex items-center justify-between text-xl">
              <Button variant="ghost" size="lg" onClick={() => setShowGallery(false)} className="gap-2">
                <ChevronLeft className="h-5 w-5" />
                Volver
              </Button>
              <span>Galería de Referencias</span>
              <Button variant="ghost" size="icon" onClick={() => setShowGallery(false)}>
                <X className="h-5 w-5" />
              </Button>
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4 mt-4">
            {allReferences.map((image, index) => (
              <div
                key={index}
                className="aspect-square relative overflow-hidden rounded-lg bg-muted cursor-pointer"
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={image}
                  alt={`Referencia ${index + 1}`}
                  className="object-cover w-full h-full hover:scale-105 transition-transform"
                />
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Imagen ampliada */}
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
                src={selectedImage}
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
