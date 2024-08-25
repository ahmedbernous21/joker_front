import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTshirt,
  faMugHot,
  faHatCowboy,
  faKey,
} from "@fortawesome/free-solid-svg-icons";

const articles = [
  { name: "T-shirt", icon: faTshirt, link: "/design/tshirt" },
  { name: "Mug", icon: faMugHot, link: "/design/mug" },
  { name: "Cap", icon: faHatCowboy, link: "/design/cap" },
  { name: "Key Ring", icon: faKey, link: "/design/keyring" },
];

const Articles = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6 py-16">
      <div className="container mx-auto">
        <h2 className="mb-12 text-center text-4xl font-bold text-gray-800">
          Explore Our Products
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {articles.map((article, index) => (
            <div
              key={index}
              className="group transform rounded-lg bg-white p-8 shadow-lg transition-transform hover:scale-105"
            >
              <div className="text-center">
                <FontAwesomeIcon
                  icon={article.icon}
                  className="mb-4 text-6xl text-blue-600"
                />
                <h3 className="mb-2 text-2xl font-semibold text-gray-700">
                  {article.name}
                </h3>
                <Link
                  to={article.link}
                  className="mt-4 inline-block rounded-lg bg-blue-600 px-6 py-3 text-lg font-medium text-white transition-colors duration-300 hover:bg-blue-500"
                >
                  Design Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Articles;
