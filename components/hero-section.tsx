"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { MessageCircle, Instagram, Facebook } from "lucide-react"

export function HeroSection() {
  return (
    <section
      id="inicio"
      className="relative py-20 md:py-32 overflow-hidden min-h-screen flex items-center justify-center"
    >
      <style jsx>{`
        #inicio {
          background: linear-gradient(
            160deg,
            rgba(0, 123, 255, 0.02) 0%,
            rgba(0, 168, 255, 0.05) 50%,
            rgba(0, 99, 255, 0.03) 100%
          );
        }

        :global(.dark) #inicio {
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

        @keyframes particleFloat {
          0%, 100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(2%, -2%);
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

        /* Eliminadas definiciones duplicadas de .shimmer-button y .blue-button ya que están en globals.css */
      `}</style>

      {/* Fondo animado con ::before */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 animate-[infoFloat_18s_ease-in-out_infinite]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(0,170,255,0.08),transparent_50%),radial-gradient(ellipse_at_70%_80%,rgba(0,123,255,0.06),transparent_50%)]" />
        </div>
        <div className="absolute inset-0 animate-[particleFloat_15s_ease-in-out_infinite]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(0,123,255,0.15)_2px,transparent_2px),radial-gradient(circle_at_85%_80%,rgba(0,212,255,0.12)_3px,transparent_3px),radial-gradient(circle_at_45%_60%,rgba(0,123,255,0.1)_2px,transparent_2px),radial-gradient(circle_at_70%_30%,rgba(0,180,255,0.13)_2.5px,transparent_2.5px)] bg-[length:100%_100%]" />
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 text-balance animated-gradient-text">
            FEDELETTIER
          </h1>
          <p className="text-2xl md:text-3xl font-bold mb-6 animated-gradient-text">IMPORTADOR MAYORISTA!</p>
          <p className="text-lg md:text-xl text-foreground mb-8 leading-relaxed text-pretty">
            Ofrezco productos innovadores y de alta calidad para satisfacer tus necesidades. También trabajamos con
            retiros al domicilio y envíos por Vía Cargo.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" asChild className="w-full sm:w-auto rounded-full shimmer-button blue-button">
              <a href="#productos">Ver Productos</a>
            </Button>

            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" className="w-full sm:w-auto rounded-full shimmer-button blue-button">
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
