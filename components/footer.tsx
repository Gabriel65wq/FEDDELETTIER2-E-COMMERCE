import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer className="bg-secondary/30 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {/* Columna 1: Marca */}
          <div>
            <h3 className="text-xl font-bold mb-4">FEDELLETIER</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              Tu destino para moda exclusiva y de calidad. Estilo que trasciende tendencias.
            </p>
            <div className="flex gap-2">
              <Button size="icon" variant="ghost" className="h-9 w-9">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" className="h-9 w-9">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" className="h-9 w-9">
                <Twitter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Columna 2: Enlaces Rápidos */}
          <div>
            <h4 className="font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#inicio" className="text-muted-foreground hover:text-accent transition-colors">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#productos" className="text-muted-foreground hover:text-accent transition-colors">
                  Productos
                </a>
              </li>
              <li>
                <a href="#nosotros" className="text-muted-foreground hover:text-accent transition-colors">
                  Nosotros
                </a>
              </li>
              <li>
                <a href="#contacto" className="text-muted-foreground hover:text-accent transition-colors">
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 3: Información */}
          <div>
            <h4 className="font-semibold mb-4">Información</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                  Política de Privacidad
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                  Términos y Condiciones
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                  Envíos y Devoluciones
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                  Preguntas Frecuentes
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 4: Contacto */}
          <div>
            <h4 className="font-semibold mb-4">Contacto</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                <span className="text-muted-foreground">Calle Principal 123, Ciudad</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <span className="text-muted-foreground">+1 234 567 890</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <span className="text-muted-foreground">info@fedelletier.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} FEDELLETIER. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
