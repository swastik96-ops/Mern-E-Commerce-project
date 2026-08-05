import { Link } from "react-router-dom";
import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Message from "../../components/Message";
import RawSlider from "react-slick";
const Slider = RawSlider.default || RawSlider;

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { FaStar, FaArrowRight } from "react-icons/fa";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 4500,
    pauseOnHover: true,
  };

  return (
    <div className="w-full">
      {isLoading ? null : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <div className="voltix-carousel">
          <Slider {...settings}>
            {products.map((product, index) => (
              <div key={product._id} className="px-2">
                <div className="relative bg-white rounded-[28px] border border-[#E8E2D8] shadow-[0_20px_60px_-25px_rgba(46,42,39,0.25)] overflow-hidden">
                  <div className="grid lg:grid-cols-2 items-stretch">

                    {/* IMAGE */}
                    <div className="relative bg-[#FCFAF5] flex items-center justify-center p-10 lg:p-14">
                      <span className="absolute top-6 left-6 inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.18em] uppercase text-[#A67C52]">
                        <span className="w-6 h-px bg-[#A67C52]" />
                        Top Pick {String(index + 1).padStart(2, "0")}
                      </span>

                      <img
                        src={`http://localhost:5000${product.image}`}
                        alt={product.name}
                        className="w-full max-w-[340px] h-[340px] object-contain drop-shadow-[0_25px_25px_rgba(46,42,39,0.12)]"
                      />
                    </div>

                    {/* DETAILS */}
                    <div className="flex flex-col justify-center p-8 lg:p-14">

                      <div className="flex items-center gap-2 mb-4">
                        <FaStar className="text-[#A67C52] text-sm" />
                        <span className="text-sm text-[#6B665F]">
                          {product.rating}
                          <span className="text-[#B8B2A6]">
                            {" "}({product.numReviews} reviews)
                          </span>
                        </span>
                      </div>

                      <h1 className="text-3xl lg:text-[2.75rem] leading-[1.05] font-extrabold tracking-tight text-[#2E2A27]">
                        {product.name}
                      </h1>

                      <p className="mt-4 text-[#7A756D] leading-relaxed line-clamp-2 max-w-md">
                        {product.description}
                      </p>

                      <div className="mt-6 flex items-baseline gap-3">
                        <span className="text-2xl font-bold text-[#2E5E4E]">
                          ₹ {product.price}
                        </span>
                        <span className="text-sm text-[#B8B2A6]">
                          Brand — <span className="font-semibold text-[#6B665F]">{product.brand}</span>
                        </span>
                      </div>

                      <Link
                        to={`/product/${product._id}`}
                        className="group inline-flex items-center gap-3 mt-8 w-fit bg-[#2E5E4E] hover:bg-[#254C3E] text-white pl-8 pr-6 py-3.5 rounded-full transition-all duration-300"
                      >
                        Shop Now
                        <FaArrowRight className="text-sm transition-transform duration-300 group-hover:translate-x-1" />
                      </Link>

                    </div>

                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      )}

      <style>{`
        .voltix-carousel .slick-dots {
          position: static;
          margin-top: 20px;
        }
        .voltix-carousel .slick-dots li {
          width: 8px;
          height: 8px;
          margin: 0 4px;
        }
        .voltix-carousel .slick-dots li button {
          width: 8px;
          height: 8px;
          padding: 0;
        }
        .voltix-carousel .slick-dots li button:before {
          content: "";
          width: 8px;
          height: 8px;
          border-radius: 9999px;
          background-color: #E8E2D8;
          opacity: 1;
          transition: background-color 0.3s, transform 0.3s;
        }
        .voltix-carousel .slick-dots li.slick-active button:before {
          background-color: #2E5E4E;
          transform: scale(1.25);
        }
      `}</style>
    </div>
  );
};

export default ProductCarousel;