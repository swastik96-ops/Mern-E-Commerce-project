import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useGetOrdersQuery } from "../../redux/api/orderApiSlice";

const StatusPill = ({ ok }) => (
  <span
    className={`inline-block px-3 py-1 text-center text-sm rounded-full ${
      ok ? "bg-green-400 text-black" : "bg-red-400 text-black"
    }`}
  >
    {ok ? "Completed" : "Pending"}
  </span>
);

const OrderList = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <div className="container mx-auto overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="w-full border-b border-gray-700">
              <tr>
                <th className="text-left pl-1 py-2">ITEMS</th>
                <th className="text-left pl-1 py-2">ID</th>
                <th className="text-left pl-1 py-2">USER</th>
                <th className="text-left pl-1 py-2">DATE</th>
                <th className="text-left pl-1 py-2">TOTAL</th>
                <th className="text-left pl-1 py-2">PAID</th>
                <th className="text-left pl-1 py-2">DELIVERED</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b border-gray-800 hover:bg-white/5"
                >
                  <td className="py-3">
                    <div className="w-[4rem] h-[4rem] rounded overflow-hidden bg-gray-800 flex items-center justify-center">
                      <img
                        src={
                          order.orderItems?.[0]?.image
                            ? `http://localhost:5000${order.orderItems[0].image}`
                            : "https://placehold.co/64x64?text=No+Image"
                        }
                        alt={order.orderItems?.[0]?.name || ""}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://placehold.co/64x64?text=No+Image";
                        }}
                      />
                    </div>
                  </td>
                  <td className="pl-1 text-sm">{order._id}</td>

                  <td className="pl-1">
                    {order.user ? order.user.username : "N/A"}
                  </td>

                  <td className="pl-1">
                    {order.createdAt
                      ? order.createdAt.substring(0, 10)
                      : "N/A"}
                  </td>

                  <td className="pl-1">
                    $ {Number(order.totalPrice ?? 0).toFixed(2)}
                  </td>

                  <td className="py-2 pl-1">
                    <StatusPill ok={order.isPaid} />
                  </td>

                  <td className="py-2 pl-1">
                    <StatusPill ok={order.isDelivered} />
                  </td>

                  <td className="pl-1">
                    <Link
                      to={`/order/${order._id}`}
                      className="text-blue-400 hover:underline"
                    >
                      More
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default OrderList;