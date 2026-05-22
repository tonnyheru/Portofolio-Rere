import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";

export default function Home() {
  return (
    <main className="bg-ink text-silver-2 overflow-x-hidden">
      <CustomCursor />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Contact />
      <Footer />
    </main>
  );
}
