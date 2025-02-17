import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import { Package, Truck, Clock, CreditCard, AlertCircle } from 'lucide-react';

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null;
      }

      const res = await axios.post(
        backendUrl + "/api/order/userorders",
        {},
        { headers: { token } }
      );

      if (res.data.success) {
        let allOrdersItem = [];

        res.data.orders.map((order) => {
          order.items.map((item) => {
            item["status"] = order.status;
            item["payment"] = order.payment;
            item["paymentMethod"] = order.paymentMethod;
            item["date"] = order.date;

            allOrdersItem.push(item);
          });
        });

        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  const getStatusColor = (status) => {
    const statusColors = {
      'Pending': 'bg-yellow-500',
      'Processing': 'bg-blue-500',
      'Shipped': 'bg-blue-500',
      'Delivered': 'bg-green-500',
      'Cancelled': 'bg-red-500'
    };
    return statusColors[status] || 'bg-gray-500';
  };

  const getStatusIcon = (status) => {
    const icons = {
      'Pending': <Clock size={16} />,
      'Processing': <Package size={16} />,
      'Shipped': <Truck size={16} />,
      'Delivered': <Package size={16} />,
      'Cancelled': <AlertCircle size={16} />
    };
    return icons[status] || <Package size={16} />;
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (orderData.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <div className="bg-blue-50 p-6 rounded-full mb-6">
          <Package size={48} className="text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">No orders yet</h2>
        <p className="text-gray-600 mb-8 max-w-md">
          Looks like you haven't placed any orders yet. Start shopping to see your orders here!
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-pink-600 mb-8">
        My Orders
      </h1>

      <div className="space-y-6">
        {orderData.slice(0, 4).map((item, i) => (
          <div
            key={i}
            className="bg-white rounded-lg shadow-sm overflow-hidden transform hover:scale-[1.01] transition-transform duration-200"
          >
            <div className="p-6">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                {/* Product Image and Details */}
                <div className="flex gap-6">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0">
                    <img
                      src={item.image[0]}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {item.name}
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-blue-600">
                          {currency}{item.price}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>Quantity: {item.quantity}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>Size: {item.size}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={16} className="text-gray-400" />
                        <span>{new Date(item.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CreditCard size={16} className="text-gray-400" />
                        <span>{item.paymentMethod}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status and Actions */}
                <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-start sm:items-center md:items-start lg:items-center gap-4 mt-4 md:mt-0">
                  <div className={`px-4 py-2 rounded-full ${getStatusColor(item.status)} text-white flex items-center gap-2`}>
                    {getStatusIcon(item.status)}
                    <span className="text-sm font-medium">{item.status}</span>
                  </div>
                  
                  <button
                    onClick={loadOrderData}
                    className="px-6 py-2 border border-blue-600 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors"
                  >
                    Track Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;