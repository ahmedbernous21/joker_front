import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="container mx-auto flex items-center justify-center px-6 pb-12 md:py-12">
      <div className="flex flex-col-reverse items-center md:flex-row md:gap-12">
        <div className="w-full text-center md:w-1/2 md:text-left">
          <h1 className="mb-4 text-2xl font-bold text-gray-800 md:text-3xl xl:text-5xl">
            Bienvenue chez Joker Graphics
          </h1>
          <p className="mb-6 text-base text-gray-600 md:text-lg">
            Personnalisez vos t-shirts (coton, polyester), casquettes, sandales,
            assiettes, et plus encore avec les images et symboles de votre
            choix.
          </p>
          {/* next time i will point it /design/:article dynamically */}
          <Link
            to="/design/tshirt"
            className="inline-block rounded-lg bg-blue-600 px-4 py-2 text-white shadow transition duration-300 hover:bg-blue-500 md:px-7 md:py-5"
          >
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
  );
};
export default Hero;
