import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-gradient-to-b from-background to-secondary/20 py-16 sm:py-20 lg:py-28"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance mb-6">
            Estilo que define tu <span className="text-accent">personalidad</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground text-pretty mb-8 leading-relaxed">
            Descubre nuestra colección exclusiva de prendas diseñadas para quienes buscan calidad, elegancia y
            autenticidad en cada detalle.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-base sm:text-lg h-12 sm:h-14 px-6 sm:px-8">
              Ver Colección
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-base sm:text-lg h-12 sm:h-14 px-6 sm:px-8 bg-transparent"
            >
              Conocer Más
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
