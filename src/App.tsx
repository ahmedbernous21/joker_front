import "./index.css";

import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/notFound/NotFound";
import Header from "./components/header/Header";
import Admin from "./pages/Admin/admin";
import Login from "./pages/LoginAdmin/LoginAdmin";
import Home from "./pages/home/Home";
import Shop from "./pages/Shop/Shop";
import Dashboard from "./pages/Dashboard/dashboard";
import Articles from "./pages/Articles/Articles";
import ContactForm from "./contact/Contact";
import ShoppingCart from "./components/cart/ShoppingCart";
import AboutUs from "./components/about/AboutUs";
import Loader from "./components/loaders/Loader";
import MyOrders from "./pages/myOrders/MyOrders";
import { ShopProvider } from "./contexts/ShopContext";

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handleLoad = () => {
      setIsLoaded(true);
    };

    window.addEventListener("load", handleLoad);

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  return (
    <ShopProvider>
      <BrowserRouter>
        <Header />
        {!isLoaded ? (
          <Loader
            backgroundColor="transparent"
            color="red"
            className="mt-12 flex h-full w-full items-center justify-center"
          />
        ) : (
          <div className="opacity-100 transition-opacity duration-300">
            <Routes>
              <Route element={<Home />} path="/" />
              <Route element={<Articles />} path="/design/" />
              <Route element={<Login />} path="/kedache/" />
              <Route element={<Dashboard />} path="/dashboard/overview/" />
              <Route element={<Admin />} path="/dashboard/articles/" />
              <Route element={<ContactForm />} path="/contact/" />
              <Route element={<ShoppingCart />} path="/cart/" />
              <Route element={<AboutUs />} path="/about/" />
              <Route element={<MyOrders />} path="/my-orders/" />{" "}
              <Route element={<Shop />} path="/shop/:item" />
              <Route element={<NotFound />} path="*" />
            </Routes>
          </div>
        )}
      </BrowserRouter>
    </ShopProvider>
  );
}

export default App;
