import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../../redux/api/productApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { FaChevronLeft } from "react-icons/fa";
import moment from "moment";
import HeartIcon from "./HeartIcon";
import Ratings from "./Ratings";
import ProductTabs from "./ProductTabs";
import { addToCart } from "../../redux/features/cart/cartSlice";

const ProductDetails = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const { userInfo } = useSelector((state) => state.auth);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createReview({ productId, rating, comment }).unwrap();
      refetch();
      toast.success("Review created successfully");
    } catch (error) {
      toast.error(error?.data || error.message);
    }
  };

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  return (
    <div className="min-h-screen bg-[#F4F1EA]">
      <div className="max-w-6xl mx-auto px-6 pt-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#2D4A3E] hover:opacity-70 transition-opacity"
        >
          <FaChevronLeft size={12} />
          Back to shop
        </Link>
      </div>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <div className="max-w-6xl mx-auto px-6 pt-8">
          <Message variant="danger">
            {error?.data?.message || error.message}
          </Message>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto px-6 pt-8 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-12 lg:gap-16">
            {/* Image column */}
            <div className="relative">
              <div className="sticky top-8">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-[#E4DED0]">
                  <img
                    src={`http://localhost:5000${product.image}`}
                    alt={product.name}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute top-4 right-4">
                    <HeartIcon product={product} />
                  </div>
                </div>
              </div>
            </div>

            {/* Details column */}
            <div className="flex flex-col">
              <p className="text-xs tracking-[0.2em] uppercase text-[#8A8378] mb-3">
                {product.brand}
              </p>

              <h1 className="font-serif text-4xl leading-tight text-[#1F2A24] mb-4">
                {product.name}
              </h1>

              <p className="text-2xl font-semibold text-[#2D4A3E] mb-6">
                ₹{product.price}
              </p>

              <p className="text-[#5F5A54] leading-relaxed mb-8 max-w-xl">
                {product.description}
              </p>

              <div className="grid grid-cols-3 gap-6 py-6 border-y border-[#DDD6C7] mb-8">
                <div>
                  <p className="text-xs uppercase tracking-wide text-[#8A8378] mb-1">
                    Added
                  </p>
                  <p className="text-sm text-[#1F2A24]">
                    {moment(product.createAt).fromNow()}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-[#8A8378] mb-1">
                    In stock
                  </p>
                  <p className="text-sm text-[#1F2A24]">
                    {product.countInStock}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-[#8A8378] mb-1">
                    Reviews
                  </p>
                  <p className="text-sm text-[#1F2A24]">
                    {product.numReviews}
                  </p>
                </div>
              </div>

              <div className="mb-8">
                <Ratings
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </div>

              <div className="flex items-center gap-4 mb-2">
                {product.countInStock > 0 && (
                  <select
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                    className="p-3 w-24 rounded-sm border border-[#DDD6C7] bg-white text-[#1F2A24] focus:outline-none focus:border-[#2D4A3E]"
                  >
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                )}

                <button
                  onClick={addToCartHandler}
                  disabled={product.countInStock === 0}
                  className="flex-1 bg-[#2D4A3E] text-white py-3 px-8 rounded-sm font-medium tracking-wide hover:bg-[#233B31] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {product.countInStock === 0 ? "Out of stock" : "Add to cart"}
                </button>
              </div>
            </div>
          </div>

          <div className="mt-16 pt-12 border-t border-[#DDD6C7]">
            <ProductTabs
              loadingProductReview={loadingProductReview}
              userInfo={userInfo}
              submitHandler={submitHandler}
              rating={rating}
              setRating={setRating}
              comment={comment}
              setComment={setComment}
              product={product}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;