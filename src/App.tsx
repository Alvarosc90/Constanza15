import Hero from "./components/Hero";
import Countdown from "./components/Countdown";
import Location from "./components/Location";
import DressCode from "./components/DressCode";
import Gallery from "./components/Gallery";
import RSVP from "./components/RSVP";
import FinalMessage from "./components/FinalMessage";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <Header />
      <main className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-12">
        {/* Hero siempre ocupa pantalla completa, pero igual queda dentro del contenedor */}
        <Hero name="Constanza" date="01/11/2025" time="22:30" />

        <Countdown targetDate="2025-11-25T22:30:00" />

        <Location place="Las Marias Multiespacio" />

        <DressCode code="Formal - No usar Blanco ni plateado" />

        <Gallery images={["/img1.jpg", "/img2.jpg", "/img3.jpg"]} />

        <RSVP />

        <FinalMessage />
      </main>
      <Footer />
    </div>
  );
}

export default App;
