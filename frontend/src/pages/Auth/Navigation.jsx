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

 const navLinkClass = `
    group flex items-center gap-4
    px-4 py-3
    rounded-2xl
    text-[#2E5E4E]
    font-medium
    transition-all duration-300 ease-out
    hover:bg-[#EDF5EF]
    hover:text-[#8B5E3C]
    hover:translate-x-2
    hover:shadow-md
    `;
  return (
    <div
      style={{ zIndex: 9999 }}
      className={`${
        showSidebar ? "hidden" : "flex"
      } xl:flex lg:flex md:hidden sm:hidden flex-col justify-between w-[90px] hover:w-[250px] h-screen fixed top-0 left-0 transition-all duration-300 overflow-hidden`}
      id="navigation-container"
    >
      {/* Logo / Brand */}
      <div>
        <Link
          to="/"
          className="logo-link flex items-center gap-3 px-4 py-6"
        >
          <div
            className="flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center"
            style={{
              backgroundColor: "#EDE7D9",
              border: "1.5px solid #A67C52",
            }}
          >
            <span
              className="font-serif text-[13px] tracking-tight"
              style={{ color: "#2E5E4E", fontWeight: 700 }}
            >
              KM
            </span>
          </div>
          <span
            className="hidden nav-item-name whitespace-nowrap transition-all duration-300"
            style={{ lineHeight: 1.1 }}
          >
            <span
              className="block font-serif text-[19px] tracking-[0.04em]"
              style={{ color: "#EDE7D9", fontWeight: 600 }}
            >
              Kingsman
            </span>
            <span
              className="block text-[10px] uppercase tracking-[0.25em]"
              style={{ color: "#A67C52" }}
            >
              Est. Tailoring
            </span>
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
                <span className="absolute -top-2 -right-2 flex items-center justify-center min-w-[16px] h-4 px-1 text-[10px] font-bold rounded-full" style={{ backgroundColor: '#A67C52', color: '#ffffff' }}>
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
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl transition-all duration-300 focus:outline-none"
        >
          {userInfo ? (
            <>
              <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm" style={{ background: 'linear-gradient(135deg, #5F8D6B, #A67C52)', color: '#ffffff' }}>
                {userInfo.username.charAt(0).toUpperCase()}
              </div>
              <span className="hidden nav-item-name font-medium whitespace-nowrap truncate" style={{ color: '#ffffff' }}>
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
          <ul className="absolute left-3 right-3 bottom-16 space-y-1 rounded-xl overflow-hidden py-1" style={{ backgroundColor: '#ffffff', border: '1px solid #E7E2D8', boxShadow: '0 8px 32px 0 rgba(43,43,43,0.12)' }}>
            {userInfo.isAdmin && (
              <>
                <li>
                  <Link to="/admin/dashboard" className="block px-4 py-2 text-sm whitespace-nowrap rounded-md transition-all duration-300" style={{ color: '#2B2B2B' }} onMouseEnter={e => { e.target.style.backgroundColor='#EDF5EF'; e.target.style.color='#2E5E4E'; }} onMouseLeave={e => { e.target.style.backgroundColor=''; e.target.style.color='#2B2B2B'; }}>
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/admin/productlist" className="block px-4 py-2 text-sm whitespace-nowrap rounded-md transition-all duration-300" style={{ color: '#2B2B2B' }} onMouseEnter={e => { e.target.style.backgroundColor='#EDF5EF'; e.target.style.color='#2E5E4E'; }} onMouseLeave={e => { e.target.style.backgroundColor=''; e.target.style.color='#2B2B2B'; }}>
                    Products
                  </Link>
                </li>
                <li>
                  <Link to="/admin/categorylist" className="block px-4 py-2 text-sm whitespace-nowrap rounded-md transition-all duration-300" style={{ color: '#2B2B2B' }} onMouseEnter={e => { e.target.style.backgroundColor='#EDF5EF'; e.target.style.color='#2E5E4E'; }} onMouseLeave={e => { e.target.style.backgroundColor=''; e.target.style.color='#2B2B2B'; }}>
                    Category
                  </Link>
                </li>
                <li>
                  <Link to="/admin/orderlist" className="block px-4 py-2 text-sm whitespace-nowrap rounded-md transition-all duration-300" style={{ color: '#2B2B2B' }} onMouseEnter={e => { e.target.style.backgroundColor='#EDF5EF'; e.target.style.color='#2E5E4E'; }} onMouseLeave={e => { e.target.style.backgroundColor=''; e.target.style.color='#2B2B2B'; }}>
                    Orders
                  </Link>
                </li>
                <li>
                  <Link to="/admin/userlist" className="block px-4 py-2 text-sm whitespace-nowrap rounded-md transition-all duration-300" style={{ color: '#2B2B2B' }} onMouseEnter={e => { e.target.style.backgroundColor='#EDF5EF'; e.target.style.color='#2E5E4E'; }} onMouseLeave={e => { e.target.style.backgroundColor=''; e.target.style.color='#2B2B2B'; }}>
                    Users
                  </Link>
                </li>
                <li className="my-1" style={{ borderTop: '1px solid #E7E2D8' }} />
              </>
            )}
            <li>
              <Link to="/profile" className="block px-4 py-2 text-sm whitespace-nowrap rounded-md transition-all duration-300" style={{ color: '#2B2B2B' }} onMouseEnter={e => { e.target.style.backgroundColor='#EDF5EF'; e.target.style.color='#2E5E4E'; }} onMouseLeave={e => { e.target.style.backgroundColor=''; e.target.style.color='#2B2B2B'; }}>
                Profile
              </Link>
            </li>
            <li>
              <button
                onClick={logoutHandler}
                className="block w-full px-4 py-2 text-sm text-left whitespace-nowrap rounded-md transition-all duration-300"
                style={{ color: '#2B2B2B' }}
                onMouseEnter={e => { e.target.style.backgroundColor='#EDF5EF'; e.target.style.color='#2E5E4E'; }}
                onMouseLeave={e => { e.target.style.backgroundColor=''; e.target.style.color='#2B2B2B'; }}
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