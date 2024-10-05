import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

const Hero = () => {
  return (
    <section className="relative mx-auto flex flex-col sm:flex-row  items-center justify-center bg-[#F1F1F1]  min-h-auto sm:min-h-auto  md:bg-[#DB3F40] md:pt-10 overflow-hidden">
      <div className="flex flex-col-reverse items-center px-12 text-white md:flex-row md:gap-12 ">
        <div className="hidden w-full md:inline-block md:w-1/2 md:text-left">
          <h1 className="mb-8 text-2xl font-medium md:text-3xl xl:text-5xl">
            Bienvenue chez Joker Graphics
          </h1>
          <p className="mb-8 text-base md:text-lg">
            Personnalisez vos t-shirts (coton, polyester), casquettes, sandales,
            assiettes, et plus encore avec les images et symboles de votre
            choix.
          </p>
          <HashLink
            to="#services"
            className="inline-block rounded-full bg-[#141E46] px-4 py-2 text-white shadow transition duration-300 hover:bg-blue-500 md:px-9 md:py-4"
          >
            Démarrer
          </HashLink>
        </div>

        <div className="w-full align-middle md:w-1/2">
          <img
            src="/model.png"
            alt="model image"
            className="h-auto object-contain"
          />
        </div>
      </div>
      <p className="absolute bottom-6 z-10 text-white text-2xl md:hidden font-medium leading-relaxed ml-10">Créez votre Design <br/> <span className="ml-10"> Personnalisé</span></p>
      <div className="custom-shape-divider-bottom-1727200539 absolute bottom-0 md:hidden">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="shape-fill"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
