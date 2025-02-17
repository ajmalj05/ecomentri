import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import CartTotal from "../components/CartTotal";
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item],
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  if (cartData.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <div className="bg-blue-50 p-6 rounded-full mb-6">
          <ShoppingBag size={48} className="text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
        <p className="text-gray-600 mb-8 max-w-md">
          Looks like you haven't added anything to your cart yet. Start shopping to fill it with amazing products!
        </p>
        <button
          onClick={() => navigate("/collection")}
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Continue Shopping
          <ArrowRight size={20} />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-pink-600 mb-8">
        Shopping Cart
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartData.map((item, i) => {
            const productsData = products.find((product) => product._id === item._id);
            
            return (
              <div
                key={i}
                className="bg-white rounded-lg shadow-sm p-4 sm:p-6 flex items-center gap-4 transform hover:scale-[1.01] transition-transform duration-200"
              >
                <div className="w-24 sm:w-32 h-24 sm:h-32 flex-shrink-0">
                  <img
                    src={productsData.image[0]}
                    alt={productsData.name}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">
                    {productsData.name}
                  </h3>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                    <span className="font-medium text-blue-600">
                      {currency}{productsData.price}
                    </span>
                    <span className="px-3 py-1 bg-blue-50 rounded-full">
                      Size: {item.size}
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <input
                        type="number"
                        min={1}
                        defaultValue={item.quantity}
                        onChange={(e) =>
                          e.target.value === "" || e.target.value === "0"
                            ? null
                            : updateQuantity(item._id, item.size, Number(e.target.value))
                        }
                        className="w-20 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                        qty
                      </span>
                    </div>

                    <button
                      onClick={() => updateQuantity(item._id, item.size, 0)}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
            <CartTotal />
            <button
              onClick={() => navigate("/place-order")}
              className="w-full mt-6 inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-pink-600 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity transform hover:scale-[0.99] active:scale-[0.97]"
            >
              Proceed to Checkout
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;