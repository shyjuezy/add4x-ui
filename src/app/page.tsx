import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Capabilities } from "@/components/sections/Capabilities";
import { Products } from "@/components/sections/Products";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <TrustStrip />
        <Capabilities />
        <Products />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
