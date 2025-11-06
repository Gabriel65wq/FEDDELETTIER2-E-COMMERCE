import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    "https://jgntxsimersdjywsqolk.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpnbnR4c2ltZXJzZGp5d3Nxb2xrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI0MzkzNjEsImV4cCI6MjA3ODAxNTM2MX0.Keit949CpRTBlBOzVXG-8vUATYLyJ--VtmFU6gP_Vk8",
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    },
  )
}
