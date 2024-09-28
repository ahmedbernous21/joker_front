import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaLinkedin, FaSquareXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-[#DB3F40] text-white py-10 px-4">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
        {/* Logo and Address Section */}
        <div className="flex flex-col items-center md:items-start space-y-4">
          <img
            src="joker_logo.jpg"
            alt="Logo"
            className="w-16 h-16 rounded-lg"
          />
          <address className="not-italic text-center md:text-left">
            Commune de Azzaba, Skikda, <br />
            AN 2039
          </address>
          <nav className="flex space-x-4 mt-4">
            <a
              href="#"
              aria-label="Facebook"
              className="text-white hover:text-gray-300 transition-colors duration-200"
            >
              <FaFacebook size={24} />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="text-white hover:text-gray-300 transition-colors duration-200"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="#"
              aria-label="X (Twitter)"
              className="text-white hover:text-gray-300 transition-colors duration-200"
            >
              <FaSquareXTwitter size={24} />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="text-white hover:text-gray-300 transition-colors duration-200"
            >
              <FaLinkedin size={24} />
            </a>
          </nav>
        </div>

        <div className="md:flex grid grid-col-1 md:grid-col-3 sm:grid-col-2 gap-8 md:gap-16">
          <div>
            <h6 className="font-medium mb-4">Services</h6>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Aide
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Ma commande
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>

         {/* Information Section */}
            <div>
          <h6 className="font-medium mb-4">Informations</h6>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:underline">
                À propos
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Terms & Conditions
              </a>
            </li>
          </ul>
        </div>
      </div>
      </div>

      <div className="text-center mt-10 text-sm">
        © 2024 Djoker Graphics. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
