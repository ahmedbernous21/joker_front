import { Link } from "react-router-dom";
import {
  faTshirt,
  faMugHot,
  faHatCowboy,
  faKey,
  faHourglass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const articles = [
  {
    name: "T-shirt",
    icon: faTshirt,
    link: "/shop/tshirt",
    description: "Custom designs on high-quality t-shirts",
    price: "5000 DA",
  },
  {
    name: "Sweatshirt",
    icon: faTshirt,
    link: "/shop/sweet_shirt",
    description: "Comfortable sweatshirts with your design",
    price: "6500 DA",
  },
  {
    name: "Hoodie",
    icon: faTshirt,
    link: "/shop/hoodie",
    description: "Stylish hoodies with custom printing",
    price: "7000 DA",
  },
  {
    name: "Mug",
    icon: faMugHot,
    link: "/shop/cup",
    description: "Your favorite designs on quality mugs",
    price: "1500 DA",
  },
  {
    name: "Cap",
    icon: faHatCowboy,
    link: "/shop/hat",
    description: "Customized caps for any occasion",
    price: "2500 DA",
  },
  {
    name: "Keyring",
    icon: faKey,
    link: "/shop/keyring",
    description: "Personalized keyrings with your designs",
    price: "800 DA",
  },
];

const Articles = () => {
  return (
    <div className="pb-24 flex min-h-screen flex-col items-center justify-center bg-gray-50 px-6 py-16">
      <div className="container mx-auto">
        <h2 className="mb-4 text-center text-4xl font-bold text-gray-800">
          Discover Our Products
        </h2>
        <p className="mx-auto mb-12 max-w-3xl text-center text-lg text-gray-600">
          Choose from our range of customizable products and create your own
          unique design.
        </p>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, index) => (
            <div
              key={index}
              className="group flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex h-full flex-col p-6">
                <div className="mb-6 flex items-center justify-center">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-50">
                    <FontAwesomeIcon
                      icon={article.icon}
                      className="text-5xl text-blue-600"
                    />
                  </div>
                </div>

                <h3 className="mb-3 text-center text-2xl font-semibold text-gray-800">
                  {article.name}
                </h3>

                <p className="mb-4 min-h-[48px] flex-grow text-center text-gray-600">
                  {article.description}
                </p>

                <p className="mb-6 text-center text-xl font-bold text-[#DB3F40]">
                  {article.price}
                </p>

                <Link
                  to={article.link}
                  className="mt-auto block w-full rounded-lg bg-[#DB3F40] px-6 py-3 text-center text-base font-medium text-white transition-colors duration-300 hover:bg-opacity-90"
                >
                  Customize Now
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
