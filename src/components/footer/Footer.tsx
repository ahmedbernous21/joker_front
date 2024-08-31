const Footer = () => {
  return (
    <footer className="bg-gray-900 py-8 text-white">
      <div className="container mx-auto px-6 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Joker Graphics. All rights reserved.
        </p>
        <div className="mt-4">
          <a href="#about" className="mx-2 text-blue-400 hover:text-blue-600">
            About
          </a>
          <a
            href="#services"
            className="mx-2 text-blue-400 hover:text-blue-600"
          >
            Services
          </a>
          <a href="#contact" className="mx-2 text-blue-400 hover:text-blue-600">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
