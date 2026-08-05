import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import ProgressSteps from "../../components/ProgressSteps";
import Loader from "../../components/Loader";
import { useCreateOrderMutation } from "../../redux/api/orderApiSlice";
import { clearCartItems } from "../../redux/features/cart/cartSlice";

const PlaceOrder = () => {
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const dispatch = useDispatch();

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      <ProgressSteps step1 step2 step3 />

      <div className="max-w-6xl mx-auto mt-8 px-6">
        {cart.cartItems.length === 0 ? (
          <Message>Your cart is empty</Message>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-white">
              <thead>
                <tr>
                  <td className="px-1 py-2 text-left align-top">Image</td>
                  <td className="px-1 py-2 text-left">Product</td>
                  <td className="px-1 py-2 text-left">Quantity</td>
                  <td className="px-1 py-2 text-left">Price</td>
                  <td className="px-1 py-2 text-left">Total</td>
                </tr>
              </thead>

              <tbody>
                {cart.cartItems.map((item, index) => (
                  <tr key={index}>
                    <td className="p-2">
                      <img
                        src={`http://localhost:5000${item.image}`}
                        alt={item.name}
                        className="w-16 h-16 object-cover"
                      />
                    </td>

                    <td className="p-2">
                      <Link
                        to={`/product/${item.product}`}
                        className="text-white hover:text-pink-400 transition-colors">
                        {item.name}
                      </Link>
                    </td>
                    <td className="p-2">{item.qty}</td>
                    <td className="p-2">₹ {item.price.toFixed(2)}</td>
                    <td className="p-2">
                      ₹ {(item.qty * item.price).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

   <div className="mt-8">
    <h2 className="text-2xl font-semibold mb-5 text-white">
      Order Summary
    </h2>

  <div className="flex justify-between flex-wrap gap-8 p-8 bg-[#181818] rounded-xl text-white">
    <ul className="text-lg text-gray-300 space-y-3">
      <li>
        <span className="font-semibold text-white">Items:</span> ₹{cart.itemsPrice}
      </li>
      <li>
        <span className="font-semibold text-white">Shipping:</span> ₹{cart.shippingPrice}
      </li>
      <li>
        <span className="font-semibold text-white">Tax:</span> ₹{cart.taxPrice}
      </li>
      <li>
        <span className="font-semibold text-white">Total:</span> ₹{cart.totalPrice}
      </li>
    </ul>

    {error && <Message variant="danger">{error.data.message}</Message>}

    <div className="text-gray-300">
      <h2 className="text-2xl font-semibold mb-4 text-white">
        Shipping
        </h2>

        <p>
          <strong className="text-white">Address:</strong>{" "}
            {cart.shippingAddress.address},{" "}
            {cart.shippingAddress.city},{" "}
            {cart.shippingAddress.postalCode},{" "}
            {cart.shippingAddress.country}
        </p>
      </div>

      <div className="text-gray-300">
       <h2 className="text-2xl font-semibold mb-4 text-white">
          Payment Method
        </h2>

        <p>
          <strong className="text-white">Method:</strong>{" "}
            {cart.paymentMethod}
        </p>
     </div>
    </div>

          <button
            type="button"
            className="bg-pink-500 hover:bg-pink-600 transition text-white py-3 px-6 rounded-full text-lg w-full mt-6"
            disabled={cart.cartItems.length === 0}
            onClick={placeOrderHandler}
          >
            Place Order
          </button>

          {isLoading && <Loader />}
        </div>
      </div>
    </>
  );
};

export default PlaceOrder;