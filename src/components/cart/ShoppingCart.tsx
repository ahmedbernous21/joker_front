import React, { useState } from "react";
import { cartItems as initialCartItems } from "./CartItems";
import { IoMdClose } from "react-icons/io";

const ShoppingCart: React.FC = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);
  
  const handleDelete = (itemId: number) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCartItems);
  };

  return (
    <div className="relative flex flex-col items-center min-h-screen bg-[#F9F9F9] p-4 md:px-12">
      <div className="w-full max-w-screen-xl p-4 lg:p-8 flex flex-col lg:flex-row">
        <div
          className={`w-full lg:w-2/3 lg:pr-12 ${cartItems.length > 0 ? "lg:border-r border-gray-300" : ""}`}
        >
          <h2 className="text-xl lg:text-3xl font-semibold mb-6">Mon panier</h2>

          {cartItems.length === 0 ? (
            <div className="flex flex-col justify-center items-center h-full">
              <p className="text-lg text-gray-500 mb-4">Votre panier est vide.</p>
              <div className="w-24 h-24 opacity-50">
                <img
                  src="emptycart.png"
                  alt="Empty Cart"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          ) : (
            <div className="divide-y divide-gray-300">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center py-4">
                  <button
                    className="text-red-500 hover:text-red-700 mr-4"
                    onClick={() => handleDelete(item.id)}
                  >
                    <IoMdClose />
                  </button>
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-16 h-16 lg:w-20 lg:h-20 object-cover mr-4"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm lg:text-xl">
                      {item.name}
                    </h3>
                    <p className="text-xs text-gray-500 lg:text-sm">
                      {item.color} {item.size}
                    </p>
                  </div>
                  <p className="font-semibold text-sm lg:text-xl">
                    {item.price} DA
                  </p>
                </div>
              ))}
            </div>
          )}

          {cartItems.length > 0 && (
            <div className="mt-6">
              <label
                htmlFor="orderNotes"
                className="block font-semibold mb-2 text-sm lg:text-lg"
              >
                Notes de la commande :
              </label>
              <textarea
                id="orderNotes"
                className="w-full p-2 border border-gray-300 rounded-lg text-sm lg:text-lg"
                placeholder="Commentaires concernant votre commande."
              ></textarea>
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="w-full lg:w-1/3 mt-6 lg:mt-0 lg:pl-12">
            <h2 className="text-xl lg:text-3xl font-medium mb-4 lg:mb-6">Total</h2>
            <div className="space-y-2 mb-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between text-sm lg:text-lg">
                  <span>{item.name}</span>
                  <span className="font-bold">{item.price} DA</span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-300 pt-2">
              <div className="flex justify-between font-semibold mt-2 text-sm lg:text-lg">
                <span>Total</span>
                <span>{total} DA</span>
              </div>
            </div>
            <button className="w-full bg-red-500 text-white py-2 lg:py-3 rounded-lg hover:bg-red-700 transition duration-300 mt-6 lg:text-lg">
              Valider
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;
