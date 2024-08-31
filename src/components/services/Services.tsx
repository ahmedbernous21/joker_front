const Services = () => {
  return (
    <section id="services" className="bg-white py-12">
      <div className="container mx-auto px-6">
        <h2 className="mb-8 text-center text-3xl font-bold text-gray-800">
          Our Services
        </h2>
        <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3">
          <div className="rounded-lg bg-gray-100 p-8 shadow-lg">
            <img
              src="/tshirt-removebg-preview.png"
              alt="Feature 1"
              className="mx-auto mb-4 h-24 w-24"
            />
            <h3 className="mb-2 text-xl font-semibold text-gray-700">
              Impression textile personnalisée
            </h3>
            <p className="text-gray-600">
              Nous proposons des services d'impression de haute qualité sur une
              large gamme de vêtements et accessoires, incluant t-shirts,
              sweat-shirts, casquettes, chapeaux et bien plus encore.
              Personnalisez votre style avec nos impressions durables et
              professionnelles.
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
              src="/feature-3.svg"
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
  );
};
export default Services;
