import { MessageCircle, Instagram, Facebook } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer className="bg-[#1b2530] text-[#d1d5db] border-t border-[#2e3a47]">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 max-md:text-center">
          {/* Columna 1: FEDELETTIER */}
          <div className="space-y-4 flex flex-col max-md:items-center">
            <h3 className="font-bold text-lg text-blue-600">FEDELETTIER</h3>
            <p className="text-sm text-[#d1d5db] leading-relaxed">
              Importador directo de productos del momento. +1000 Clientes satisfechos.
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" asChild className="border-black bg-black hover:bg-gray-800">
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-4 w-4 text-green-600" />
                  <span className="sr-only">WhatsApp</span>
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild className="border-black bg-black hover:bg-gray-800">
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-4 w-4 text-pink-600" />
                  <span className="sr-only">Instagram</span>
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild className="border-black bg-black hover:bg-gray-800">
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <Facebook className="h-4 w-4 text-blue-600" />
                  <span className="sr-only">Facebook</span>
                </a>
              </Button>
            </div>
          </div>

          {/* Columna 2: Enlaces Rápidos */}
          <div className="space-y-4 flex flex-col max-md:items-center">
            <h3 className="font-bold text-lg text-blue-600">Enlaces Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#inicio" className="text-[#d1d5db] hover:text-white transition-colors">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#productos" className="text-[#d1d5db] hover:text-white transition-colors">
                  Productos
                </a>
              </li>
              <li>
                <a href="#informacion" className="text-[#d1d5db] hover:text-white transition-colors">
                  Información
                </a>
              </li>
              <li>
                <a href="#referencias" className="text-[#d1d5db] hover:text-white transition-colors">
                  Referencias
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 3: Información */}
          <div className="space-y-4 flex flex-col max-md:items-center">
            <h3 className="font-bold text-lg text-blue-600">Información</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-[#d1d5db] hover:text-white transition-colors">
                  Política de Privacidad
                </a>
              </li>
              <li>
                <a href="#" className="text-[#d1d5db] hover:text-white transition-colors">
                  Términos y Condiciones
                </a>
              </li>
              <li>
                <a href="#" className="text-[#d1d5db] hover:text-white transition-colors">
                  Envíos y Devoluciones
                </a>
              </li>
              <li>
                <a href="#" className="text-[#d1d5db] hover:text-white transition-colors">
                  Preguntas Frecuentes
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 4: Contacto */}
          <div className="space-y-4 flex flex-col max-md:items-center">
            <h3 className="font-bold text-lg text-blue-600">Contacto</h3>
            <div className="space-y-2 text-sm text-[#d1d5db]">
              <p>+54 9 11 2477 2377</p>
              <p>+54 9 11 3638 2378</p>
            </div>
            <div className="pt-4 mt-4">
              <p className="text-sm text-[#d1d5db]">Diseñada por: Gabriel Diaz</p>
              <p className="text-sm text-[#d1d5db]">Tel: +54 9 11 3429 5399</p>
            </div>
          </div>
        </div>

        {/* Copyright - siempre centrado */}
        <div className="border-t border-black pt-6">
          <p className="text-center text-sm text-[#d1d5db]">© 2025 Fede Lettier. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
