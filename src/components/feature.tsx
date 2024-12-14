import checkIcon from "../../public/check-removebg-preview.png";
import serviceIcon from "../../public/service-removebg-preview.png";
import contactIcon from "../../public/contact-removebg-preview.png";

import LoaderWithImage from "./loaders/LoaderWithImage";

const Features = () => {
  return (
    <div className="flex flex-col items-center justify-around bg-[#F9F9F9] py-8 lg:flex-row">
      <div className="mb-8 flex flex-col items-center text-center lg:mb-0 lg:w-1/3">
        <div className="mb-9 flex justify-center">
          <LoaderWithImage
            imageSrc={checkIcon}
            imageAlt="Certified Results Icon"
            imageClassName="w-30 aspect-auto h-24"
            loaderClassName="w-10 h-10 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 stroke-[#DB3F40]"
          />
        </div>
        <p className="w-4/5 text-sm text-[#DB3F40] lg:w-2/3">
          Serving +1000 satisfied clients.
        </p>
      </div>

      <div className="mb-8 flex flex-col items-center text-center lg:mb-0 lg:w-1/3">
        <div className="mb-4 flex justify-center">
          <LoaderWithImage
            imageSrc={serviceIcon}
            imageAlt="Customer Service Icon"
            imageClassName="h-full w-full object-contain"
            loaderClassName="w-10 h-10 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 stroke-[#DB3F40]"
          />
        </div>
        <p className="w-4/5 text-sm text-[#DB3F40] lg:w-2/3">
          Attentive with responsive customer service.
        </p>
      </div>

      <div className="flex flex-col items-center text-center lg:w-1/3">
        <div className="mb-4 flex justify-center">
          <LoaderWithImage
            imageSrc={contactIcon}
            imageAlt="Creativity Icon"
            imageClassName="h-28 w-28"
            loaderClassName="w-10 h-10 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 stroke-[#DB3F40]"
          />
        </div>
        <p className="w-4/5 text-sm text-[#DB3F40] lg:w-2/3">
          Fast, customized creativity.
        </p>
      </div>
    </div>
  );
};

export default Features;
