import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <main className="flex-1">
        <section className="container mx-auto flex items-center justify-center px-6 py-12">
          <div className="flex flex-col-reverse items-center gap-12 md:flex-row">
            <div className="w-full text-center md:w-1/2 md:text-left">
              <h1 className="mb-4 text-4xl font-bold text-gray-800 md:text-5xl">
                Bienvenue chez Joker Graphics
              </h1>
              <p className="mb-6 text-lg text-gray-600">
                Personnalisez vos t-shirts (coton, polyester), casquettes,
                sandales, assiettes, et plus encore avec les images et symboles
                de votre choix.
              </p>
              {/* next time i will point it /design/:article dynamically */}  
              <Link to="/design/tshirt" className="rounded-lg bg-blue-600 px-7 py-5 text-white shadow transition duration-300 hover:bg-blue-500">
                Créez votre design personnalisé
              </Link>
            </div>

            <div className="w-full md:w-1/2">
              <img
                src="/home.svg"
                alt="Home illustration"
                className="mx-auto w-full max-w-md"
              />
            </div>
          </div>
        </section>

        <section id="services" className="bg-white py-12">
          <div className="container mx-auto px-6">
            <h2 className="mb-8 text-center text-3xl font-bold text-gray-800">
              Our Services
            </h2>
            <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3">
              <div className="rounded-lg bg-gray-100 p-8 shadow-lg">
                <img
                  src="/tshirt.jpg"
                  alt="Feature 1"
                  className="mx-auto mb-4 h-24 w-24"
                />
                <h3 className="mb-2 text-xl font-semibold text-gray-700">
                  Impression textile personnalisée
                </h3>
                <p className="text-gray-600">
                  Nous proposons des services d'impression de haute qualité sur
                  une large gamme de vêtements et accessoires, incluant
                  t-shirts, sweat-shirts, casquettes, chapeaux et bien plus
                  encore. Personnalisez votre style avec nos impressions
                  durables et professionnelles.
                </p>
              </div>

              <div className="rounded-lg bg-gray-100 p-8 shadow-lg">
                <img
                  src="/business_cards.jpg"
                  alt="Feature 2"
                  className="mx-auto mb-4 h-24 w-24"
                />
                <h3 className="mb-2 text-xl font-semibold text-gray-700">
                  Les cartes de visite
                </h3>
                <p className="text-gray-600"></p>
              </div>

              <div className="rounded-lg bg-gray-100 p-8 shadow-lg">
                <img
                  src="/feature3.svg"
                  alt="Feature 3"
                  className="mx-auto mb-4 h-24 w-24"
                />
                <h3 className="mb-2 text-xl font-semibold text-gray-700">
                  Service 3
                </h3>
                <p className="text-gray-600"></p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 py-8 text-white">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Joker Graphics. All rights
            reserved.
          </p>
          <div className="mt-4">
            <a href="#about" className="mx-2 text-blue-400 hover:text-blue-600">
              About
            </a>
            <a
              href="#services"
              className="mx-2 text-blue-400 hover:text-blue-600"
            >
              Services
            </a>
            <a
              href="#contact"
              className="mx-2 text-blue-400 hover:text-blue-600"
            >
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
