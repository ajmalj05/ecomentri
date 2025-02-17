import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import { CreditCard, Truck } from "lucide-react";

const PlaceOrder = () => {
  const {
    products,
    delivery_fee,
    cartItems,
    getCartAmount,
    navigate,
    backendUrl,
    token,
    setCartItems,
  } = useContext(ShopContext);

  const [method, setMethod] = useState("cod");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    zipcode: "",
    phone: "",
    state: "",
    street: "",
    country: "",
    city: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const orderItems = [];

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );

            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      switch (method) {
        case "cod":
          const res = await axios.post(
            backendUrl + "/api/order/place",
            orderData,
            { headers: { token } }
          );
          if (res.data.success) {
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error(res.data.message);
          }
          break;

        case "stripe":
          const responseStripe = await axios.post(
            backendUrl + "/api/order/stripe",
            orderData,
            { headers: { token } }
          );

          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data;
            window.location.replace(session_url);
          } else {
            toast.error(responseStripe.data.message);
          }
          break;

        default:
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const inputClasses = "border border-gray-200 rounded-lg py-2.5 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50";
  const labelClasses = "text-sm font-medium text-gray-700 mb-1";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col lg:flex-row justify-between gap-8 pt-5 sm:pt-8"
      >
        {/* Left Side - Delivery Information */}
        <div className="flex-1 max-w-2xl">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center gap-2 mb-6">
              <Truck className="w-5 h-5 text-blue-600" />
              <h2 className="text-2xl font-semibold text-gray-900">Delivery Information</h2>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className={labelClasses}>First Name</label>
                  <input
                    id="firstName"
                    type="text"
                    placeholder="John"
                    className={inputClasses}
                    onChange={onChangeHandler}
                    name="firstName"
                    value={formData.firstName}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className={labelClasses}>Last Name</label>
                  <input
                    id="lastName"
                    type="text"
                    placeholder="Doe"
                    className={inputClasses}
                    onChange={onChangeHandler}
                    name="lastName"
                    value={formData.lastName}
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className={labelClasses}>Email Address</label>
                <input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  className={inputClasses}
                  onChange={onChangeHandler}
                  name="email"
                  value={formData.email}
                  required
                />
              </div>

              <div>
                <label htmlFor="street" className={labelClasses}>Street Address</label>
                <input
                  id="street"
                  type="text"
                  placeholder="123 Main St"
                  className={inputClasses}
                  onChange={onChangeHandler}
                  name="street"
                  value={formData.street}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="city" className={labelClasses}>City</label>
                  <input
                    id="city"
                    type="text"
                    placeholder="New York"
                    className={inputClasses}
                    onChange={onChangeHandler}
                    name="city"
                    value={formData.city}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="state" className={labelClasses}>State</label>
                  <input
                    id="state"
                    type="text"
                    placeholder="NY"
                    className={inputClasses}
                    onChange={onChangeHandler}
                    name="state"
                    value={formData.state}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="zipcode" className={labelClasses}>ZIP Code</label>
                  <input
                    id="zipcode"
                    type="number"
                    placeholder="10001"
                    className={inputClasses}
                    onChange={onChangeHandler}
                    name="zipcode"
                    value={formData.zipcode}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="country" className={labelClasses}>Country</label>
                  <input
                    id="country"
                    type="text"
                    placeholder="United States"
                    className={inputClasses}
                    onChange={onChangeHandler}
                    name="country"
                    value={formData.country}
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className={labelClasses}>Phone Number</label>
                <input
                  id="phone"
                  type="number"
                  placeholder="+1 (555) 000-0000"
                  className={inputClasses}
                  onChange={onChangeHandler}
                  name="phone"
                  value={formData.phone}
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Order Summary & Payment */}
        <div className="w-full lg:w-[400px]">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 sticky top-6">
            <div className="mb-6">
              <CartTotal />
            </div>

            <div className="border-t pt-6">
              <div className="flex items-center gap-2 mb-6">
                <CreditCard className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">Payment Method</h2>
              </div>

              <div className="space-y-3">
                <div
                  onClick={() => setMethod("stripe")}
                  className={`flex items-center gap-3 p-4 rounded-lg cursor-pointer border transition-all duration-200 ${
                    method === "stripe"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-blue-200"
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    method === "stripe" ? "border-blue-500" : "border-gray-300"
                  }`}>
                    {method === "stripe" && (
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                    )}
                  </div>
                  <img src={assets.stripe_logo} className="h-6" alt="Stripe" />
                </div>

                <div
                  onClick={() => setMethod("cod")}
                  className={`flex items-center gap-3 p-4 rounded-lg cursor-pointer border transition-all duration-200 ${
                    method === "cod"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-blue-200"
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    method === "cod" ? "border-blue-500" : "border-gray-300"
                  }`}>
                    {method === "cod" && (
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                    )}
                  </div>
                  <span className="font-medium text-gray-700">Cash on Delivery</span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-6 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Place Order
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PlaceOrder; 