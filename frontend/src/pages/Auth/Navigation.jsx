import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { BsLightningChargeFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import "./Navigation.css";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import FavoritesCount from "../Products/FavoritesCount";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const navLinkClass =
    "group/link flex items-center gap-4 px-3 py-2.5 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-colors";

  return (
    <div
      style={{ zIndex: 9999 }}
      className={`${
        showSidebar ? "hidden" : "flex"
      } xl:flex lg:flex md:hidden sm:hidden flex-col justify-between text-white bg-black/95 backdrop-blur-xl border-r border-white/10 w-20 hover:w-64 h-screen fixed top-0 left-0 transition-all duration-300 ease-in-out overflow-hidden group`}
      id="navigation-container"
    >
      {/* Logo / Brand */}
      <div>
        <Link to="/" className="flex items-center gap-3 px-4 py-6">
          <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shadow-lg shadow-pink-500/30">
            <BsLightningChargeFill size={18} className="text-white" />
          </div>
          <span className="hidden nav-item-name text-xl font-bold tracking-wide whitespace-nowrap">
            VOLT<span className="text-pink-500">IX</span>
          </span>
        </Link>

        {/* Nav links */}
        <div className="flex flex-col gap-2 px-3 mt-4">
          <Link to="/" className={navLinkClass}>
            <AiOutlineHome size={24} className="flex-shrink-0" />
            <span className="hidden nav-item-name whitespace-nowrap font-medium">
              Home
            </span>
          </Link>

          <Link to="/shop" className={navLinkClass}>
            <AiOutlineShopping size={24} className="flex-shrink-0" />
            <span className="hidden nav-item-name whitespace-nowrap font-medium">
              Shop
            </span>
          </Link>

          <Link to="/cart" className={navLinkClass}>
            <div className="relative flex-shrink-0">
              <AiOutlineShoppingCart size={24} />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 flex items-center justify-center min-w-[16px] h-4 px-1 text-[10px] font-bold text-white bg-pink-500 rounded-full">
                  {cartItems.reduce((a, c) => a + c.qty, 0)}
                </span>
              )}
            </div>
            <span className="hidden nav-item-name whitespace-nowrap font-medium">
              Cart
            </span>
          </Link>

          <Link to="/favorite" className={navLinkClass}>
            <div className="relative flex-shrink-0">
              <FaHeart size={20} />
              <span className="absolute -top-2 -right-2">
                <FavoritesCount />
              </span>
            </div>
            <span className="hidden nav-item-name whitespace-nowrap font-medium">
              Favorites
            </span>
          </Link>
        </div>
      </div>

      {/* Account section */}
      <div className="relative px-3 pb-6">
        <button
          onClick={toggleDropdown}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors focus:outline-none"
        >
          {userInfo ? (
            <>
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center font-bold text-sm">
                {userInfo.username.charAt(0).toUpperCase()}
              </div>
              <span className="hidden nav-item-name text-white font-medium whitespace-nowrap truncate">
                {userInfo.username}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`hidden nav-item-name h-4 w-4 ml-auto flex-shrink-0 transition-transform ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </>
          ) : (
            <></>
          )}
        </button>

        {dropdownOpen && userInfo && (
          <ul className="absolute left-3 right-3 bottom-16 space-y-1 bg-[#111] border border-white/10 rounded-xl overflow-hidden shadow-2xl py-1">
            {userInfo.isAdmin && (
              <>
                <li>
                  <Link to="/admin/dashboard" className="block px-4 py-2 text-sm hover:bg-white/10 whitespace-nowrap">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/admin/productlist" className="block px-4 py-2 text-sm hover:bg-white/10 whitespace-nowrap">
                    Products
                  </Link>
                </li>
                <li>
                  <Link to="/admin/categorylist" className="block px-4 py-2 text-sm hover:bg-white/10 whitespace-nowrap">
                    Category
                  </Link>
                </li>
                <li>
                  <Link to="/admin/orderlist" className="block px-4 py-2 text-sm hover:bg-white/10 whitespace-nowrap">
                    Orders
                  </Link>
                </li>
                <li>
                  <Link to="/admin/userlist" className="block px-4 py-2 text-sm hover:bg-white/10 whitespace-nowrap">
                    Users
                  </Link>
                </li>
                <li className="border-t border-white/10 my-1" />
              </>
            )}
            <li>
              <Link to="/profile" className="block px-4 py-2 text-sm hover:bg-white/10 whitespace-nowrap">
                Profile
              </Link>
            </li>
            <li>
              <button
                onClick={logoutHandler}
                className="block w-full px-4 py-2 text-sm text-left hover:bg-white/10 whitespace-nowrap"
              >
                Logout
              </button>
            </li>
          </ul>
        )}

        {!userInfo && (
          <div className="flex flex-col gap-2">
            <Link to="/login" className={navLinkClass}>
              <AiOutlineLogin size={24} className="flex-shrink-0" />
              <span className="hidden nav-item-name whitespace-nowrap font-medium">
                Login
              </span>
            </Link>
            <Link to="/register" className={navLinkClass}>
              <AiOutlineUserAdd size={24} className="flex-shrink-0" />
              <span className="hidden nav-item-name whitespace-nowrap font-medium">
                Register
              </span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navigation;