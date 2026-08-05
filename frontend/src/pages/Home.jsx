import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Header from "../components/Header";
import Product from "../pages/Products/Product";

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError, error } = useGetProductsQuery({ keyword });

  // Only apply the one-per-category limit on the curated homepage view,
  // not on search results — a search should still show every match.
  const getDisplayProducts = () => {
    if (!data?.products) return [];
    if (keyword) return data.products;

    const seenCategories = new Set();
    const oneProductPerCategory = [];

    for (const product of data.products) {
      const categoryId = product.category?._id || product.category;

      if (!seenCategories.has(categoryId)) {
        seenCategories.add(categoryId);
        oneProductPerCategory.push(product);
      }
    }

    return oneProductPerCategory;
  };

  const displayProducts = getDisplayProducts();

  return (
    <>
      {!keyword ? <Header /> : null}

      {isLoading ? (
        <Loader />
      ) : isError ? (
        <div className="ml-20 px-8 pt-8">
          <Message variant="danger">
            {error?.data?.message || error?.message || "Something went wrong"}
          </Message>
        </div>
      ) : (
        <>

          {/* Section header */}
          <div className="ml-20 px-8 pt-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <span className="inline-block text-xs font-semibold tracking-[0.2em] text-pink-400 uppercase mb-3">
                {keyword ? "Search Results" : "Curated Picks"}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                {keyword ? `Results for "${keyword}"` : "Special Products"}
              </h1>
              <p className="text-gray-400 mt-3 max-w-md">
                {keyword
                  ? `${data.products.length} item${data.products.length !== 1 ? "s" : ""} matched your search.`
                  : "One handpicked favorite from every category."}
              </p>
            </div>

            {!keyword && (
              <Link
                to="/shop"
                className="self-start md:self-auto bg-pink-600 hover:bg-pink-700 transition font-bold rounded-full py-3 px-10 text-white shadow-lg shadow-pink-600/20 whitespace-nowrap"
              >
                Shop All
              </Link>
            )}
          </div>

          {/* Product grid */}
          <div className="px-8 md:pl-20 pt-10 pb-16">
            {displayProducts.length === 0 ? (
              <div className="mt-10 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-10 text-center text-gray-300 max-w-lg">
                <p className="text-lg font-semibold text-white mb-1">No products found</p>
                <p className="text-sm text-gray-400">
                  Try a different search term, or browse the full shop.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 text-white">
                {displayProducts.map((product) => (
                  <Product key={product._id} product={product} />
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Home;