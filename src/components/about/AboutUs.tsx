const AboutUs = () => {
  return (
    <div
      id="about"
      className="bg-[#DB3F40] px-8 py-24 text-white md:px-12 lg:px-16"
    >
      <div className="mx-4 max-w-3xl">
        <h2 className="mb-10 text-2xl font-medium md:text-3xl lg:mb-8 lg:text-4xl">
          About Us
        </h2>
        <p className="mb-4 text-lg font-bold md:text-xl lg:mb-6 lg:text-2xl">
          Welcome to Djoker Graphic Agency, your creative agency in Azzaba,
          Skikda!
        </p>
        <hr className="mb-6 w-1/2 border-t-2 border-white lg:w-1/4" />
        <p className="space-be mb-4 text-lg font-extralight lg:mb-6 lg:text-xl">
          Specializing in design, printing, and creating custom products (prints
          on t-shirts, cards, posters, etc.), we bring your brand to life with
          tailored solutions.
        </p>
        <p className="mb-4 text-lg font-extralight lg:mb-6 lg:text-xl">
          Our passionate and experienced team supports you at every step,
          ensuring creative and impactful results for both your visual
          materials.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
