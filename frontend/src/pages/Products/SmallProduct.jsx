import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const SmallProduct = ({ product }) => {
  return (
    <div className="w-[280px] bg-[#111827] rounded-2xl overflow-hidden shadow-xl border border-gray-700 hover:scale-[1.03] hover:shadow-pink-500/20 transition-all duration-300">

      {/* Image */}
      <div className="relative bg-white flex justify-center items-center p-4">
        <img
          src={`http://localhost:5000${product.image}`}
          alt={product.name}
          className="w-full h-64 object-contain transition-transform duration-300 hover:scale-105"
        />

        <div className="absolute top-3 right-3">
          <HeartIcon product={product} />
        </div>
      </div>

      {/* Product Info */}
      <div className="p-5 text-white">

        <Link to={`/product/${product._id}`}>
          <h2 className="text-lg font-semibold hover:text-pink-400 transition-colors line-clamp-2">
            {product.name}
          </h2>
        </Link>

        <div className="flex justify-between items-center mt-5">

          <span className="bg-pink-600 text-white px-4 py-2 rounded-full font-semibold shadow-lg">
            ₹ {product.price}
          </span>

          <Link
            to={`/product/${product._id}`}
            className="text-sm text-pink-400 hover:text-pink-300 font-medium"
          >
            View →
          </Link>

        </div>

      </div>

    </div>
  );
};

export default SmallProduct;