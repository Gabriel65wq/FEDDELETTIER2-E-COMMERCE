import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { ProductGallery } from "@/components/product-gallery"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <ProductGallery />
      </main>
      <Footer />
    </div>
  )
}
