import React, { useState, useEffect, useRef } from 'react';
import { servicesData, ServiceItem } from './products';
import { categories, Category } from './categories';
import { FaCircleChevronRight } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const Services: React.FC = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(categories[0].id);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isEndOfScroll, setIsEndOfScroll] = useState(false); 
  const categoriesRef = useRef<HTMLDivElement>(null); 

  const itemsPerPage = 6;
  const filteredServices = servicesData.filter((service: ServiceItem) =>
    selectedCategoryId === 1
      ? true
      : service.category === categories.find(cat => cat.id === selectedCategoryId)?.name
  );

  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);
  const displayedServices = filteredServices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleScroll = () => {
    const element = categoriesRef.current;
    if (element) {
      const isEnd = element.scrollWidth - element.scrollLeft <= element.clientWidth;
      setIsEndOfScroll(isEnd);
    }
  };

  useEffect(() => {
    const element = categoriesRef.current;
    if (element) {
      element.addEventListener('scroll', handleScroll);
      return () => {
        element.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  return (
    <div id="services" className="container mx-auto py-12 bg-[#f9f9f9]">
      <div className="text-center mb-6">
        <h2 className="text-4xl font-bold">Nos services</h2>
        <p className="text-gray-600 mt-4 hidden md:inline-block">
          Nous proposons des services d'impression de haute qualité sur <br /> une large gamme de vêtements et accessoires.
        </p>
      </div>

      <div className="mb-2 relative">
        <div
          ref={categoriesRef}
          className="flex md:justify-center font-medium space-x-4 overflow-x-auto scrollbar-hide px-6 py-4 md:py-6"
        >
          {categories.map((category: Category) => (
            <button
              key={category.id}
              onClick={() => {
                setSelectedCategoryId(category.id);
                setCurrentPage(1);
              }}
              className={`flex items-center justify-center p-0 min-w-max ${
                selectedCategoryId === category.id
                  ? 'text-red-500  md:border-b-2 border-red-500'
                  : 'text-gray-500'
              } md:space-x-2 md:text-base text-sm md:flex-row flex-col`}
            >
              <div className="md:hidden w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                <img src={category.image} alt={category.name} className="w-full h-full rounded-full object-center object-contain" />
              </div>

              <span className={`hidden md:block hover:text-red-500`}>
                {category.name}
              </span>
            </button>
          ))}
        </div>

        {!isEndOfScroll && (
          <FaCircleChevronRight
            className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white cursor-pointer md:hidden"
            size={24}
          />
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-12 px-6 md:px-20">
        {displayedServices.map((service: ServiceItem) => (
          <div
            key={service.id}
            className="relative bg-[#D9D9D9] p-4 md:p-6 rounded-2xl text-center group "
          >
            <div className="w-full h-40 md:h-60 rounded-lg overflow-hidden relative">
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-full object-contain object-center"
              />

              <Link to="/shop">
              <button className="hidden md:inline-block absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-red-500 text-white py-1 md:py-2 px-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                Personnaliser
              </button></Link>
             
            </div>

            <h3 className="text-sm md:text-lg font-semibold mt-2 overflow-hidden">{service.name}</h3>
            <p className="text-red-500 font-medium overflow-hidden">{service.price}</p>
          </div>
        ))}
      </div>

      {totalPages >= 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`w-8 h-8 rounded-full ${
                currentPage === index + 1 ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-600'
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
