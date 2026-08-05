import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Messsage from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useDeliverOrderMutation,
  useGetOrderDetailsQuery,
  usePayOrderMutation,
} from "../../redux/api/orderApiSlice";

const Order = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const [showSuccess, setShowSuccess] = useState(false);

const handlePayPalClick = async () => {
  try {
    await payOrder({
      orderId,
      details: {
        id: "MOCK",
        status: "COMPLETED",
        update_time: new Date().toISOString(),
        payer: { email_address: order.user.email },
      },
    }).unwrap();
    await refetch();
    setShowSuccess(true);
  } catch (error) {
    toast.error(error?.data?.message || error.message);
  }
};

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details });
        refetch();
        toast.success("Order is paid");
      } catch (error) {
        toast.error(error?.data?.message || error.message);
      }
    });
  }

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [{ amount: { value: order.totalPrice } }],
      })
      .then((orderID) => {
        return orderID;
      });
  }

  function onError(err) {
    toast.error(err.message);
  }

  const deliverHandler = async () => {
    await deliverOrder(orderId);
    refetch();
  };

  if (isLoading) return <Loader />;

  if (error) {
    return (
      <div className="ml-20 px-8 pt-8">
        <Messsage variant="danger">
          {error?.data?.message || "We couldn't find that order."}
        </Messsage>
      </div>
    );
  }

  // Defensive guard: if the query somehow resolves with no order
  // (bad/stale id, etc.) show a clear message instead of crashing
  // on order.orderItems below.
  if (!order) {
    return (
      <div className="ml-20 px-8 pt-8">
        <Messsage variant="danger">Order not found.</Messsage>
      </div>
    );
  }

  return (
    <>
    <div className="ml-20 px-8 pt-8">
      <h1 className="text-4xl font-bold text-white">
        Order Details
      </h1>

      <p className="text-gray-400 mt-2">
        Review your purchase and payment information.
      </p>
    </div>

    <div className="flex flex-col lg:flex-row gap-10 ml-20 px-8 pb-10 text-white">
      <div className="md:w-2/3 pr-4">
        <div className="mt-6 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-xl">
          {order.orderItems.length === 0 ? (
            <Messsage>Order is empty</Messsage>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-[80%]">
                <thead className="border-b border-white/20 text-lg">
                  <tr>
                    <th className="p-2">Image</th>
                    <th className="p-2">Product</th>
                    <th className="p-2 text-center">Quantity</th>
                    <th className="p-2">Unit Price</th>
                    <th className="p-2">Total</th>
                  </tr>
                </thead>

                <tbody>
                  {order.orderItems.map((item, index) => (
                    <tr key={index}
                      className="hover:bg-white/5 transition duration-300">
                      <td className="p-2">
                        <img
                          src={`http://localhost:5000${item.image}`}
                          alt={item.name}
                          className="w-24 h-24 rounded-xl object-cover"
                        />
                      </td>

                      <td className="p-2">
                        <Link
                          to={`/product/${item.product}`}
                          className="text-lg font-semibold hover:text-pink-400 transition"
                        >
                          {item.name}
                        </Link>
                      </td>

                      <td className="p-2 text-center">{item.qty}</td>
                      <td className="p-2 text-center">₹ {item.price}</td>
                      <td className="p-2 text-center">
                        ₹ {(item.qty * item.price).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <div className="md:w-1/3">
        <div className="mt-5 border-gray-300 pb-4 mb-4">
          <h2 className="text-xl font-bold mb-2">Shipping</h2>
          <p className="mb-4 mt-4">
            <strong className="text-pink-500">Order:</strong> {order._id}
          </p>

          <p className="mb-4">
            <strong className="text-pink-500">Name:</strong>{" "}
            {order.user.username}
          </p>

          <p className="mb-4">
            <strong className="text-pink-500">Email:</strong> {order.user.email}
          </p>

          <p className="mb-4">
            <strong className="text-pink-500">Address:</strong>{" "}
            {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
            {order.shippingAddress.postalCode}, {order.shippingAddress.country}
          </p>

          <p className="mb-4">
            <strong className="text-pink-500">Method:</strong>{" "}
            {order.paymentMethod}
          </p>

          {order.isPaid ? (
            <Messsage variant="success">Paid on {order.paidAt}</Messsage>
          ) : (
            <div className="inline-block mt-4 px-4 py-2 rounded-full bg-red-500/20 text-red-400 font-semibold">
              Not Paid
            </div>
          )}
        </div>

        <div className="mt-8 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-xl">
        <h2 className="text-2xl font-bold mb-6">
          Order Summary
        </h2>
        <div className="flex justify-between mb-2">
          <span>Items</span>
          <span>₹ {order.itemsPrice}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Shipping</span>
          <span>₹ {order.shippingPrice}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Tax</span>
          <span>₹ {order.taxPrice}</span>
        </div>
        <div className="flex justify-between mt-4 pt-4 border-t border-white/10 text-2xl font-bold">
          <span>Total</span>
          <span>₹ {order.totalPrice}</span>
        </div>

        {!order.isPaid && (
          <div>
            {loadingPay && <Loader />}
            <button
              onClick={handlePayPalClick}
              className="bg-yellow-400 text-blue-900 font-bold w-full py-2 rounded mt-2"
            >
              PayPal
            </button>
          </div>
        )} 

        {loadingDeliver && <Loader />}
        {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
          <div>
            <button
              type="button"
              className="bg-pink-500 text-white w-full py-2"
              onClick={deliverHandler}
            >
              Mark As Delivered
            </button>
          </div>
        )}
      </div>
      </div>
    </div>
    </>
  );
};

export default Order;