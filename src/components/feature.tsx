const Features = () => {
  return (
    <div className="flex flex-col items-center justify-around bg-[#F9F9F9] py-8 lg:flex-row">
      <div className="mb-8 flex flex-col items-center text-center lg:mb-0 lg:w-1/3">
        <div className="mb-9 flex justify-center">
          <img
            src="/check.PNG"
            alt="Certified Results Icon"
            className="w-30 aspect-auto h-24"
          />
        </div>
        <p className="w-4/5 text-sm text-[#DB3F40] lg:w-2/3">
          Serving +1000 satisfied clients.
        </p>
      </div>

      <div className="mb-8 flex flex-col items-center text-center lg:mb-0 lg:w-1/3">
        <div className="mb-4 flex justify-center">
          <img
            src="/service.PNG"
            alt="Customer Service Icon"
            className="h-full w-full object-contain"
          />
        </div>
        <p className="w-4/5 text-sm text-[#DB3F40] lg:w-2/3">
          Attentive with responsive customer service.
        </p>
      </div>

      <div className="flex flex-col items-center text-center lg:w-1/3">
        <div className="mb-4 flex justify-center">
          <img src="/contact.PNG" alt="Creativity Icon" className="h-28 w-28" />
        </div>
        <p className="w-4/5 text-sm text-[#DB3F40] lg:w-2/3">
          Fast, customized creativity.
        </p>
      </div>
    </div>
  );
};

export default Features;
