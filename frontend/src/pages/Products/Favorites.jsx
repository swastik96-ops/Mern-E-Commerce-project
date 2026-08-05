import { useSelector } from "react-redux";
import { selectFavoriteProduct } from "../../redux/features/favorites/favoriteSlice";
import Product from "./Product";

const Favorites = () => {
  const favorites = useSelector(selectFavoriteProduct);

  return (
    <div className="px-8 pt-8">
      <h1 className="text-lg font-bold mb-6 text-[#2E2A27]">
        FAVORITE PRODUCTS
      </h1>

      {favorites.length === 0 ? (
        <p className="text-[#7A756D]">No favorites yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {favorites.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;