"use client"

import { useState } from "react"
import { Menu, ShoppingCart, Sun, Moon, Home, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { Badge } from "@/components/ui/badge"

interface NavbarProps {
  cartItemsCount: number
  onCartClick: () => void
}

export function Navbar({ cartItemsCount, onCartClick }: NavbarProps) {
  const { theme, setTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuItems = [
    { label: "Productos", href: "#productos" },
    { label: "Información", href: "#informacion" },
    { label: "Referencias", href: "#referencias" },
  ]

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo - izquierda */}
        <div className="flex items-center">
          <a href="#inicio" className="text-xl font-bold tracking-tight">
            FEDELETTIER
          </a>
        </div>

        {/* Centro - Botones de navegación */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild className="hidden md:flex">
            <a href="#inicio">
              <Home className="h-5 w-5" />
              <span className="sr-only">Inicio</span>
            </a>
          </Button>

          <div className="relative">
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} className="relative">
              {isMenuOpen ? (
                <X className="h-5 w-5 transition-transform" />
              ) : (
                <Menu className="h-5 w-5 transition-transform" />
              )}
              <span className="sr-only">Abrir menú</span>
            </Button>

            {isMenuOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-background border rounded-lg shadow-lg py-2 z-50">
                {menuItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="block px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          <Button variant="ghost" size="icon" className="relative" onClick={onCartClick}>
            <ShoppingCart className="h-5 w-5" />
            {cartItemsCount > 0 && (
              <Badge
                variant="destructive"
                className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
              >
                {cartItemsCount}
              </Badge>
            )}
            <span className="sr-only">Carrito</span>
          </Button>
        </div>

        {/* Derecha - Theme switch */}
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Cambiar tema</span>
          </Button>
        </div>
      </div>
    </nav>
  )
}
