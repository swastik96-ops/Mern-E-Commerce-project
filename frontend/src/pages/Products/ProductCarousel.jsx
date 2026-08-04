import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Message from "../../components/Message";
import RawSlider from "react-slick";
const Slider = RawSlider.default || RawSlider;

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import moment from "moment";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3500,
    pauseOnHover: true,
  };

  return (
    <div className="w-full max-w-7xl mx-auto mb-10">
      {isLoading ? null : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Slider {...settings}>
          {products.map((product) => (
            <div key={product._id} className="px-3">
              <div className="bg-[#111827] rounded-3xl overflow-hidden shadow-2xl">

                <div className="grid lg:grid-cols-2 gap-8 items-center p-8">

                  {/* IMAGE */}
                  <div className="flex justify-center items-center">
                    <img
                      src={`http://localhost:5000${product.image}`}
                      alt={product.name}
                      className="h-[450px] w-full object-contain rounded-2xl bg-white p-6"
                    />
                  </div>

                  {/* DETAILS */}
                  <div className="text-white">

                    <h1 className="text-4xl font-bold mb-4">
                      {product.name}
                    </h1>

                    <h2 className="text-3xl text-pink-500 font-bold mb-6">
                      ₹ {product.price}
                    </h2>

                    <p className="text-gray-300 leading-8 mb-8">
                      {product.description.substring(0, 220)}...
                    </p>

                    <div className="grid grid-cols-2 gap-y-5 text-lg">

                      <div className="flex items-center">
                        <FaStore className="mr-3 text-pink-500" />
                        {product.brand}
                      </div>

                      <div className="flex items-center">
                        <FaStar className="mr-3 text-yellow-400" />
                        {product.rating}
                      </div>

                      <div className="flex items-center">
                        <FaClock className="mr-3 text-cyan-400" />
                        {moment(product.createdAt).fromNow()}
                      </div>

                      <div className="flex items-center">
                        <FaShoppingCart className="mr-3 text-green-400" />
                        Qty: {product.quantity}
                      </div>

                      <div className="flex items-center">
                        <FaBox className="mr-3 text-orange-400" />
                        Stock: {product.countInStock}
                      </div>

                      <div className="flex items-center">
                        <FaStar className="mr-3 text-yellow-400" />
                        Reviews: {product.numReviews}
                      </div>

                    </div>

                    <button className="mt-10 bg-pink-600 hover:bg-pink-700 transition px-8 py-4 rounded-xl text-lg font-semibold">
                      View Product
                    </button>

                  </div>

                </div>

              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default ProductCarousel;