const Features = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-around items-center py-8 bg-[#F9F9F9]">
      <div className="text-center flex flex-col items-center lg:w-1/3 mb-8 lg:mb-0">
        <div className="flex justify-center mb-9">
          <img
            src="/check.PNG"
            alt="Certified Results Icon"
            className="h-24 w-30 aspect-auto "
          />
        </div>
        <p className="text-sm text-[#DB3F40] w-4/5 lg:w-2/3">
          Des créations certifiées, pour des résultats fiables.
        </p>
      </div>

      <div className="text-center flex flex-col items-center lg:w-1/3 mb-8 lg:mb-0">
        <div className="flex justify-center mb-4">
          <img
            src="/service.PNG"
            alt="Customer Service Icon"
            className="w-full h-full object-contain"
          />
        </div>
        <p className="text-sm text-[#DB3F40] w-4/5 lg:w-2/3">
          À l'écoute avec un service client réactif.
        </p>
      </div>

      <div className="text-center flex flex-col items-center lg:w-1/3">
        <div className="flex justify-center mb-4">
          <img
            src="/contact.PNG"
            alt="Creativity Icon"
            className="w-28 h-28"
          />
        </div>
        <p className="text-sm text-[#DB3F40] w-4/5 lg:w-2/3">
          Créativité rapide et sur-mesure.
        </p>
      </div>
    </div>
  );
};

export default Features;
