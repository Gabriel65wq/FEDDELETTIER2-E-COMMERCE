"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { MessageCircle, Instagram, Facebook } from "lucide-react"

export function HeroSection() {
  return (
    <section id="inicio" className="relative py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 text-balance">FEDELETTIER</h1>
          <p className="text-2xl md:text-3xl font-semibold text-muted-foreground mb-6">IMPORTADOR MAYORISTA</p>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed text-pretty">
            Ofrezco productos innovadores y de alta calidad para satisfacer tus necesidades. También trabajamos con
            retiros al domicilio y envíos por Vía Cargo.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" asChild className="w-full sm:w-auto">
              <a href="#productos">Ver Productos</a>
            </Button>

            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                  Redes Sociales
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Síguenos en Redes Sociales</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-3 mt-4">
                  <Button variant="outline" className="w-full justify-start gap-3 bg-transparent" asChild>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="h-5 w-5 text-green-600" />
                      WhatsApp
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-3 bg-transparent" asChild>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <Instagram className="h-5 w-5 text-pink-600" />
                      Instagram
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-3 bg-transparent" asChild>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <Facebook className="h-5 w-5 text-blue-600" />
                      Facebook
                    </a>
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </section>
  )
}
