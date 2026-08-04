import { useSelector } from "react-redux";

const FavoritesCount = () => {
  const favorites = useSelector((state) => state.favorites);
  const favoriteCount = favorites.length;

  if (favoriteCount === 0) return null;

  return (
    <span className="flex items-center justify-center min-w-[16px] h-4 px-1 text-[10px] font-bold text-white bg-pink-500 rounded-full">
      {favoriteCount}
    </span>
  );
};

export default FavoritesCount;