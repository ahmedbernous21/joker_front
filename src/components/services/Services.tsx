import React, { useState, useEffect, useRef } from "react";
import { servicesData, ServiceItem } from "./products";
import { categories, Category } from "./categories";
import { FaCircleChevronRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Services: React.FC = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(
    categories[0].id,
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isEndOfScroll, setIsEndOfScroll] = useState(false);
  const categoriesRef = useRef<HTMLDivElement>(null);

  const itemsPerPage = 6;
  const filteredServices = servicesData.filter((service: ServiceItem) =>
    selectedCategoryId === 1
      ? true
      : service.category ===
        categories.find((cat) => cat.id === selectedCategoryId)?.name,
  );

  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);
  const displayedServices = filteredServices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleScroll = () => {
    const element = categoriesRef.current;
    if (element) {
      const isEnd =
        element.scrollWidth - element.scrollLeft <= element.clientWidth;
      setIsEndOfScroll(isEnd);
    }
  };

  useEffect(() => {
    const element = categoriesRef.current;
    if (element) {
      element.addEventListener("scroll", handleScroll);
      return () => {
        element.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  return (
    <div id="services" className="container mx-auto bg-[#f9f9f9] py-12">
      <div className="mb-6 text-center">
        <h2 className="text-4xl font-bold">Our services</h2>
        <p className="mt-4 hidden text-gray-600 md:inline-block">
          We offer high-quality printing services on <br /> a wide range of
          clothing and accessories.
        </p>
      </div>

      <div className="relative mb-2">
        <div
          ref={categoriesRef}
          className="scrollbar-hide flex space-x-4 overflow-x-auto px-6 py-4 font-medium md:justify-center md:py-6"
        >
          {categories.map((category: Category) => (
            <button
              key={category.id}
              onClick={() => {
                setSelectedCategoryId(category.id);
                setCurrentPage(1);
              }}
              className={`flex min-w-max items-center justify-center p-0 ${
                selectedCategoryId === category.id
                  ? "border-red-500 text-red-500 md:border-b-2"
                  : "text-gray-500"
              } flex-col text-sm md:flex-row md:space-x-2 md:text-base`}
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-200 md:hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full rounded-full object-contain object-center"
                />
              </div>

              <span className={`hidden hover:text-red-500 md:block`}>
                {category.name}
              </span>
            </button>
          ))}
        </div>

        {!isEndOfScroll && (
          <FaCircleChevronRight
            className="absolute right-0 top-1/2 -translate-y-1/2 transform cursor-pointer text-white md:hidden"
            size={24}
          />
        )}
      </div>

      <div className="grid grid-cols-2 gap-3 px-6 md:grid-cols-3 md:gap-12 md:px-10">
        {displayedServices.map((service: ServiceItem) => (
          <div
            key={service.id}
            className="group relative rounded-2xl bg-[#D9D9D9] p-4 text-center md:p-2"
          >
            <div className="relative h-40 w-full overflow-hidden rounded-lg md:h-60">
              <Link to="/shop">
                <img
                  src={service.image}
                  alt={service.name}
                  className="h-full w-full object-contain object-center"
                />
              </Link>

              <Link to="/shop">
                <button className="absolute bottom-0 left-1/2 hidden w-full -translate-x-1/2 transform rounded-full bg-[#DB3F40] px-3 py-1 text-white opacity-0 transition-opacity group-hover:opacity-100 md:inline-block md:py-2">
                  Customize
                </button>
              </Link>
            </div>

            <h3 className="mt-2 overflow-hidden text-sm font-semibold md:text-lg">
              {service.name}
            </h3>
            <p className="overflow-hidden font-medium text-red-500">
              {service.price}
            </p>
          </div>
        ))}
      </div>

      {totalPages >= 1 && (
        <div className="mt-6 flex justify-center space-x-2">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`h-8 w-8 rounded-full ${
                currentPage === index + 1
                  ? "bg-red-500 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Services;
