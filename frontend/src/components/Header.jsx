import { useGetTopProductsQuery } from "../redux/api/productApiSlice";
import Loader from "./Loader";
import HeroSection from "./HeroSection";
import SmallProduct from "../pages/Products/SmallProduct";
import ProductCarousel from "../pages/Products/ProductCarousel";

const Header = () => {
  const { data, isLoading, error } = useGetTopProductsQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <h1>ERROR</h1>;
  }

  return (
    <>
    <HeroSection />

    <div className="mt-12 flex gap-8 items-start">
      <div className="hidden xl:block flex-shrink-0">
        <div className="grid grid-cols-2 gap-5">
          {data.map((product) => (
            <SmallProduct key={product._id} product={product} />
          ))}
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <ProductCarousel />
      </div>
    </div>
  </>
  );
};

export default Header;