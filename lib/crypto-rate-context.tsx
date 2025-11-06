"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface CryptoRateContextType {
  cryptoRate: number
  isLoading: boolean
  error: string | null
  refreshRate: () => Promise<void>
}

const CryptoRateContext = createContext<CryptoRateContextType | undefined>(undefined)

export function CryptoRateProvider({ children }: { children: ReactNode }) {
  const [cryptoRate, setCryptoRate] = useState<number>(1507.43) // Valor por defecto
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCryptoRate = async () => {
    try {
      console.log("[v0] Fetching crypto rate from criptoya.com...")
      const response = await fetch("https://criptoya.com/api/dolar")

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log("[v0] Crypto rate data received:", data)

      const rate = data.cripto?.ask || data.cripto?.bid || 1507.43
      console.log("[v0] Crypto rate:", rate)

      setCryptoRate(rate)
      setError(null)
    } catch (err) {
      console.error("[v0] Error fetching crypto rate:", err)
      setError(err instanceof Error ? err.message : "Error al obtener la cotización")
      // Mantener el valor anterior o usar el por defecto
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    // Fetch inicial
    fetchCryptoRate()

    // Actualizar cada 5 minutos
    const interval = setInterval(fetchCryptoRate, 5 * 60 * 1000)

    return () => clearInterval(interval)
  }, [])

  const refreshRate = async () => {
    setIsLoading(true)
    await fetchCryptoRate()
  }

  return (
    <CryptoRateContext.Provider value={{ cryptoRate, isLoading, error, refreshRate }}>
      {children}
    </CryptoRateContext.Provider>
  )
}

export function useCryptoRate() {
  const context = useContext(CryptoRateContext)
  if (context === undefined) {
    throw new Error("useCryptoRate must be used within a CryptoRateProvider")
  }
  return context
}
