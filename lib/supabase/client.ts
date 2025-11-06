import { createBrowserClient } from "@supabase/ssr"

export function createClient() {
  return createBrowserClient(
    "https://jgntxsimersdjywsqolk.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpnbnR4c2ltZXJzZGp5d3Nxb2xrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI0MzkzNjEsImV4cCI6MjA3ODAxNTM2MX0.Keit949CpRTBlBOzVXG-8vUATYLyJ--VtmFU6gP_Vk8",
  )
}
