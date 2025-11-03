"use client"

import { useState } from "react"
import { Menu, ShoppingCart, Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"

export function Header() {
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [cartCount, setCartCount] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    document.documentElement.classList.toggle("dark")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="text-xl sm:text-2xl font-bold tracking-tight">FEDELLETIER</div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#inicio" className="text-sm font-medium hover:text-accent transition-colors">
              Inicio
            </a>
            <a href="#productos" className="text-sm font-medium hover:text-accent transition-colors">
              Productos
            </a>
            <a href="#nosotros" className="text-sm font-medium hover:text-accent transition-colors">
              Nosotros
            </a>
            <a href="#contacto" className="text-sm font-medium hover:text-accent transition-colors">
              Contacto
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Theme Toggle - Visible en mobile y desktop */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="h-9 w-9 sm:h-10 sm:w-10"
              aria-label="Cambiar tema"
            >
              {theme === "light" ? (
                <Moon className="h-4 w-4 sm:h-5 sm:w-5" />
              ) : (
                <Sun className="h-4 w-4 sm:h-5 sm:w-5" />
              )}
            </Button>

            {/* Cart */}
            <Button
              variant="ghost"
              size="icon"
              className="relative h-9 w-9 sm:h-10 sm:w-10"
              aria-label="Carrito de compras"
            >
              <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
              {cartCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  {cartCount}
                </Badge>
              )}
            </Button>

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Abrir menú</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[350px]">
                <nav className="flex flex-col gap-4 mt-8">
                  <a
                    href="#inicio"
                    className="text-lg font-medium hover:text-accent transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Inicio
                  </a>
                  <a
                    href="#productos"
                    className="text-lg font-medium hover:text-accent transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Productos
                  </a>
                  <a
                    href="#nosotros"
                    className="text-lg font-medium hover:text-accent transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Nosotros
                  </a>
                  <a
                    href="#contacto"
                    className="text-lg font-medium hover:text-accent transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Contacto
                  </a>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
