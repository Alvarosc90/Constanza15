import Hero from "./components/Hero";
import Countdown from "./components/Countdown";
import Location from "./components/Location";
import DressCode from "./components/DressCode";
// import Gallery from "./components/Gallery";
import Gift from "./components/gift";   // <-- mayúscula correcta
import RSVP from "./components/RSVP";
import FinalMessage from "./components/FinalMessage";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <Header />
      <main className="space-y-5">
        <Hero name="Constanza" date="01/11/2025" time="22:30" />

        <Countdown targetDate="2025-11-01T22:30:00" />

        <Location place="Las Marias Multiespacio" />

        <DressCode code="Formal - No usar blanco ni plateado" />

        {/* <Gallery images={["/img1.jpg", "/img2.jpg", "/img3.jpg"]} /> */}

        <RSVP />

        <Gift alias="Constanza.rc.mp" />
        <FinalMessage />
      </main>

      <Footer />
    </div>
  );
}

export default App;
