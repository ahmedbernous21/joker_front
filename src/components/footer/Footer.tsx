import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 py-10 text-white">
      <div className="container mx-auto grid grid-cols-1 gap-8 px-6 text-center md:grid-cols-3 md:text-left">
        {/* Company Info */}
        <div>
          <h3 className="text-lg font-bold">Joker Graphics</h3>
          <p className="mt-2 text-sm">
            &copy; {new Date().getFullYear()} Joker Graphics. All rights
            reserved.
          </p>
          <div className="mt-2 flex items-center justify-center md:justify-start">
            <FaMapMarkerAlt className="mr-2" />
            <p className="text-sm">lasas Azzaba, Skikda</p>
          </div>
          <p className="mt-2 text-sm">Phone: +213 555 132 188</p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-lg font-bold">Quick Links</h3>
          <div className="mt-4">
            <a
              href="#about"
              className="mx-2 block text-blue-400 hover:text-blue-600"
            >
              About
            </a>
            <a
              href="#services"
              className="mx-2 block text-blue-400 hover:text-blue-600"
            >
              Services
            </a>
            <a
              href="#contact"
              className="mx-2 block text-blue-400 hover:text-blue-600"
            >
              Contact
            </a>
          </div>
        </div>

        {/* App Availability & Social Media */}
        <div>
          <h3 className="text-lg font-bold">Stay Connected</h3>
          <div className="mt-4 flex justify-center md:justify-start">
            <a
              href="https://facebook.com"
              className="mx-2 text-blue-600 hover:text-blue-800"
            >
              <FaFacebookF className="text-2xl" />
            </a>
            <a
              href="https://instagram.com"
              className="mx-2 text-pink-600 hover:text-pink-800"
            >
              <FaInstagram className="text-2xl" />
            </a>
            <a
              href="https://tiktok.com"
              className="mx-2 text-black hover:text-gray-800"
            >
              <FaTiktok className="text-2xl" />
            </a>
          </div>
          <p className="mt-4 text-sm">Available on Google Play:</p>
          <a href="#" className="mt-4 inline-block">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Google Play Store"
              className="mx-auto h-12 md:mx-0"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
