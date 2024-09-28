import Footer from "../../components/footer/Footer";
import Services from "../../components/services/Services";
import Hero from "../../components/hero/Hero";
import Features from "../../components/feature";
import AboutUs from "../../components/about/AboutUs";

const Home = () => {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <main className="flex-1">
        <Hero />
        <Features />
        <AboutUs />
        <Services />
        {/* We need an About and Contact component to match the header menu */}
      </main>
      <Footer />
    </div>
  );
};

export default Home;
