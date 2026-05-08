import { useState, useEffect, useContext } from "react";
import {
  FaBox,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaTruck,
} from "react-icons/fa";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const { menuItems = [] } = useContext(StoreContext);

  // FETCH ORDERS
  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/orders/seller",
        { withCredentials: true }
      );

      if (res.data.success) {
        setOrders(res.data.orders);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // AUTO REFRESH
  useEffect(() => {
    fetchOrders();

    const interval = setInterval(() => {
      fetchOrders();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // STATUS COLORS
  const getStatusColor = (status) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800 border-green-300";

      case "out_for_delivery":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";

      case "processing":
        return "bg-blue-100 text-blue-800 border-blue-300";

      case "cancelled":
        return "bg-red-100 text-red-800 border-red-300";

      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  // STATUS ICONS
  const getStatusIcon = (status) => {
    switch (status) {
      case "delivered":
        return <FaCheckCircle className="w-5 h-5" />;

      case "out_for_delivery":
        return <FaTruck className="w-5 h-5" />;

      case "processing":
        return <FaClock className="w-5 h-5" />;

      case "cancelled":
        return <FaTimesCircle className="w-5 h-5" />;

      default:
        return <FaClock className="w-5 h-5" />;
    }
  };

  // COUNTS
  const processingCount = orders.filter(
    (o) => o.status === "processing"
  ).length;

  const outForDeliveryCount = orders.filter(
    (o) => o.status === "out_for_delivery"
  ).length;

  const deliveredCount = orders.filter(
    (o) => o.status === "delivered"
  ).length;

  const cancelledCount = orders.filter(
    (o) => o.status === "cancelled"
  ).length;

  // FILTER
  const filteredOrders = orders.filter(
    (order) =>
      statusFilter === "all" || order.status === statusFilter
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-100 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-8 py-4 rounded-3xl shadow-xl border border-white/50">
            <FaBox className="w-8 h-8 text-indigo-600" />

            <div>
              <h1 className="text-4xl font-black text-gray-900">
                Orders
              </h1>

              <p className="text-lg text-gray-600 mt-1">
                Manage your restaurant orders
              </p>
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">

          {/* DELIVERED */}
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all">
            <div className="flex items-center gap-4">

              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center">
                <FaCheckCircle className="w-8 h-8 text-green-600" />
              </div>

              <div>
                <p className="text-3xl font-bold text-green-600">
                  {deliveredCount}
                </p>

                <p className="text-gray-600 font-semibold">
                  Delivered
                </p>
              </div>
            </div>
          </div>

          {/* OUT FOR DELIVERY */}
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all">
            <div className="flex items-center gap-4">

              <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center">
                <FaTruck className="w-8 h-8 text-yellow-600" />
              </div>

              <div>
                <p className="text-3xl font-bold text-yellow-600">
                  {outForDeliveryCount}
                </p>

                <p className="text-gray-600 font-semibold">
                  Out for Delivery
                </p>
              </div>
            </div>
          </div>

          {/* PROCESSING */}
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all">
            <div className="flex items-center gap-4">

              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center">
                <FaClock className="w-8 h-8 text-blue-600" />
              </div>

              <div>
                <p className="text-3xl font-bold text-blue-600">
                  {processingCount}
                </p>

                <p className="text-gray-600 font-semibold">
                  Processing
                </p>
              </div>
            </div>
          </div>

          {/* CANCELLED */}
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all">
            <div className="flex items-center gap-4">

              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center">
                <FaTimesCircle className="w-8 h-8 text-red-600" />
              </div>

              <div>
                <p className="text-3xl font-bold text-red-600">
                  {cancelledCount}
                </p>

                <p className="text-gray-600 font-semibold">
                  Cancelled
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FILTER BUTTONS */}
        <div className="flex flex-wrap gap-3 mb-8 justify-center">

          {[
            "all",
            "out_for_delivery",
            "processing",
            "delivered",
            "cancelled",
          ].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 shadow-lg ${
                statusFilter === status
                  ? "bg-indigo-600 text-white shadow-indigo-500/50 scale-105"
                  : "bg-white/50 hover:bg-white shadow-gray-200 hover:shadow-xl"
              }`}
            >
              {status.replaceAll("_", " ")}
            </button>
          ))}
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">

          {loading ? (
            <div className="h-96 flex items-center justify-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600"></div>
            </div>
          ) : filteredOrders.length === 0 ? (

            <div className="h-96 flex flex-col items-center justify-center text-center p-12">
              <FaBox className="w-24 h-24 text-gray-300 mb-6" />

              <h3 className="text-2xl font-bold text-gray-600 mb-2">
                No Orders Found
              </h3>

              <p className="text-gray-500">
                No orders match your current filter
              </p>
            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full">

                {/* TABLE HEAD */}
                <thead className="bg-gradient-to-r from-indigo-50 to-purple-50">
                  <tr>

                    <th className="px-8 py-6 text-left text-xl font-bold text-gray-800 border-b border-gray-200">
                      Order Details
                    </th>

                    <th className="px-8 py-6 text-left text-xl font-bold text-gray-800 border-b border-gray-200">
                      Customer
                    </th>

                    <th className="px-8 py-6 text-left text-xl font-bold text-gray-800 border-b border-gray-200">
                      Total
                    </th>

                    <th className="px-8 py-6 text-left text-xl font-bold text-gray-800 border-b border-gray-200">
                      Status
                    </th>

                    <th className="px-8 py-6 text-left text-xl font-bold text-gray-800 border-b border-gray-200">
                      Actions
                    </th>

                  </tr>
                </thead>

                {/* TABLE BODY */}
                <tbody className="divide-y divide-gray-200">

                  {filteredOrders.map((order) => (

                    <tr
                      key={order._id}
                      className="hover:bg-gray-50 transition-colors"
                    >

                      {/* ORDER DETAILS */}
                      <td className="px-8 py-6">

                        <div>
                          <p className="font-bold text-lg text-indigo-600">
                            #{order._id?.slice(-6)}
                          </p>

                          <p className="text-sm text-gray-500">
                            {new Date(order.createdAt).toLocaleString()}
                          </p>
                        </div>

                      </td>

                      {/* CUSTOMER */}
                      <td className="px-8 py-6">

                        <div>
                          <p className="font-semibold">
                            {order.address?.firstName}{" "}
                            {order.address?.lastName}
                          </p>

                          <p className="text-sm text-gray-500">
                            {order.address?.phone}
                          </p>

                          <p className="text-xs text-gray-400 mt-1 truncate max-w-xs">
                            {order.address?.address},{" "}
                            {order.address?.city}
                          </p>
                        </div>

                      </td>

                      {/* TOTAL */}
                      <td className="px-8 py-6">

                        <p className="text-2xl font-bold text-indigo-600">
                          ₹{order.total}
                        </p>

                        <p className="text-sm text-gray-500">
                          {order.items?.length} items
                        </p>

                      </td>

                      {/* STATUS */}
                      <td className="px-8 py-6">

                        <div
                          className={`px-4 py-2 rounded-2xl border font-semibold flex items-center gap-2 ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {getStatusIcon(order.status)}

                          {order.status.replaceAll("_", " ")}
                        </div>

                      </td>

                      {/* ACTIONS */}
                      <td className="px-8 py-6">

                        <div className="flex gap-3">

                          {/* VIEW */}
                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="px-6 py-2 bg-indigo-600 text-white rounded-xl"
                          >
                            View
                          </button>

                          {/* UPDATE */}
                          <select
                            onChange={async (e) => {
                              const newStatus = e.target.value;

                              if (!newStatus) return;

                              await axios.put(
                                `http://localhost:5000/api/orders/${order._id}`,
                                { status: newStatus },
                                { withCredentials: true }
                              );

                              fetchOrders();
                            }}
                            className="px-3 py-2 border rounded-xl"
                          >
                            <option value="">
                              Update
                            </option>

                            <option value="processing">
                              Processing
                            </option>

                            <option value="out_for_delivery">
                              Out for Delivery
                            </option>

                            <option value="delivered">
                              Delivered
                            </option>

                            <option value="cancelled">
                              Cancelled
                            </option>
                          </select>

                        </div>

                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* MODAL */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

          <div className="bg-white w-[600px] max-h-[80vh] overflow-y-auto rounded-2xl shadow-2xl p-6">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-4">

              <h2 className="text-2xl font-bold text-indigo-600">
                Order #{selectedOrder._id?.slice(-6)}
              </h2>

              <button
                onClick={() => setSelectedOrder(null)}
                className="text-red-500 text-xl"
              >
                ✕
              </button>
            </div>

            {/* CUSTOMER */}
            <div className="bg-gray-100 p-4 rounded-xl mb-4">

              <p className="font-semibold text-lg">
                {selectedOrder.address?.firstName}{" "}
                {selectedOrder.address?.lastName}
              </p>

              <p className="text-sm text-gray-600">
                {selectedOrder.address?.phone}
              </p>

              <p className="text-sm text-gray-500">
                {selectedOrder.address?.address},{" "}
                {selectedOrder.address?.city}
              </p>
            </div>

            {/* ITEMS */}
            <div className="space-y-4">

              {selectedOrder?.items?.map((item, i) => {

                const menuItem =
                  menuItems.find((m) => m._id === item.itemId) || {
                    name: "Item Unavailable",
                    price: 0,
                    image:
                      "https://via.placeholder.com/80",
                  };

                return (
                  <div
                    key={i}
                    className="flex items-center gap-4 border-b pb-3"
                  >

                    <img
                      src={menuItem.image}
                      alt=""
                      className="w-16 h-16 rounded-lg object-cover"
                    />

                    <div className="flex-1">

                      <p className="font-semibold text-lg">
                        {menuItem.name}
                      </p>

                      <p className="text-sm text-gray-500">
                        Quantity: {item.quantity}
                      </p>
                    </div>

                    <div className="font-bold text-indigo-600">
                      ₹{menuItem.price * item.quantity}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* TOTAL */}
            <div className="mt-6 flex justify-between items-center border-t pt-4">

              <p className="text-lg font-semibold">
                Total
              </p>

              <p className="text-2xl font-bold text-indigo-600">
                ₹{selectedOrder.total}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;






//  useEffect(() => {
//   const fetchOrders = async () => {
//     try {
//       const res = await axios.get(
//         "http://localhost:5000/api/orders/seller",
//         { withCredentials: true }
//       );

//       if (res.data.success) {
//         setOrders(res.data.orders);
//       }
//     } catch (err) {
//       console.log(err);
//     } finally {
//       setLoading(false);
//     }
//   };
//   fetchOrders();
// }, []);
