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
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute"

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check if document is already loaded
    if (document.readyState === "complete") {
      setIsLoaded(true);
    } else {
      const handleLoad = () => {
        setIsLoaded(true);
      };

      window.addEventListener("load", handleLoad);

      // Fallback timeout to prevent infinite loading
      const timeoutId = setTimeout(() => {
        setIsLoaded(true);
      }, 2000);

      return () => {
        window.removeEventListener("load", handleLoad);
        clearTimeout(timeoutId);
      };
    }
  }, []);

  return (
    <ShopProvider>
      <BrowserRouter>
        <AuthProvider>
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
                <Route
                  path="/dashboard/overview/"
                  element={
                    <ProtectedRoute requireAdmin={true}>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard/requests/"
                  element={
                    <ProtectedRoute requireAdmin={true}>
                      <Admin />
                    </ProtectedRoute>
                  }
                />
                <Route element={<ContactForm />} path="/contact/" />
                <Route element={<ShoppingCart />} path="/cart/" />
                <Route element={<AboutUs />} path="/about/" />
                <Route element={<MyOrders />} path="/my-orders/" />
                <Route element={<Shop />} path="/shop/:item" />
                <Route element={<NotFound />} path="*" />
              </Routes>
            </div>
          )}
        </AuthProvider>
      </BrowserRouter>
    </ShopProvider>
  );
}

export default App;
