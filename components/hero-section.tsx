"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { MessageCircle, Instagram, Facebook } from "lucide-react"

export function HeroSection() {
  return (
    <section id="inicio" className="relative py-20 md:py-32 overflow-hidden">
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

        /* Light theme: both buttons black with shimmer */
        .light-theme-button {
          background: linear-gradient(135deg, #1e293b, #334155);
          color: white;
          border: none;
        }

        .light-theme-button:hover {
          box-shadow: 0 10px 25px rgba(30, 41, 59, 0.3);
        }

        /* Dark theme: both buttons blue with shimmer */
        .dark-theme-button {
          background: linear-gradient(135deg, #3b82f6, #06b6d4);
          color: white;
          border: none;
        }

        .dark-theme-button:hover {
          box-shadow: 0 10px 25px rgba(59, 130, 246, 0.4);
        }
      `}</style>

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
            <Button
              size="lg"
              asChild
              className="w-full sm:w-auto rounded-full shimmer-button light-theme-button dark:dark-theme-button"
            >
              <a href="#productos">Ver Productos</a>
            </Button>

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto rounded-full shimmer-button light-theme-button dark:dark-theme-button border-0 bg-transparent"
                >
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
