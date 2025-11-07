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
        <div className="flex items-center gap-2">
          {/* Hamburguesa móvil - más moderna */}
          <div className="relative md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative rounded-xl hover:bg-primary/10 transition-all h-10 w-10"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5 transition-all duration-300 rotate-90" />
              ) : (
                <div className="flex flex-col gap-1.5 w-5">
                  <span className="block h-0.5 w-5 bg-current rounded-full transition-all"></span>
                  <span className="block h-0.5 w-5 bg-current rounded-full transition-all"></span>
                  <span className="block h-0.5 w-5 bg-current rounded-full transition-all"></span>
                </div>
              )}
              <span className="sr-only">Abrir menú</span>
            </Button>

            {isMenuOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-background border rounded-lg shadow-lg py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
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

          {/* Logo - solo desktop */}
          <a href="#inicio" className="text-xl font-bold tracking-tight hidden md:block">
            FEDELETTIER
          </a>

          <Button variant="ghost" size="icon" asChild className="hidden md:flex">
            <a href="#inicio">
              <Home className="h-5 w-5" />
              <span className="sr-only">Inicio</span>
            </a>
          </Button>
        </div>

        <div className="flex items-center gap-2 absolute left-1/2 transform -translate-x-1/2 md:hidden">
          <Button variant="ghost" size="icon" asChild>
            <a href="#inicio">
              <Home className="h-5 w-5" />
              <span className="sr-only">Inicio</span>
            </a>
          </Button>

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

        <div className="flex items-center gap-2">
          {/* Hamburguesa desktop */}
          <div className="relative hidden md:block">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative flex items-center justify-center h-10 w-10"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5 transition-all duration-300 rotate-90" />
              ) : (
                <div className="flex items-center justify-center">
                  <Menu className="h-5 w-5 transition-all duration-300 rotate-0" />
                </div>
              )}
              <span className="sr-only">Abrir menú</span>
            </Button>

            {isMenuOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-background border rounded-lg shadow-lg py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
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

          {/* Theme switch */}
          <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all duration-500 dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all duration-500 dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Cambiar tema</span>
          </Button>
        </div>
      </div>
    </nav>
  )
}
