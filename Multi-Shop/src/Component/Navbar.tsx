import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../AuthContext/AuthContexts";
import { useAppSelector, useAppDispatch } from "../AppHook/AppHook";
import { searchProduct } from "../ProductSlice/ProductSlice";

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { logOut, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); // To detect route changes
  const qty = useAppSelector((state) => state.product.allQty);
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    dispatch(searchProduct(searchQuery));
  };

  useEffect(() => {
    if (location.pathname !== "/shop") {
      setShowSearch(false);
    }
  }, [location.pathname]);
  

  return (
    <header>
      <nav className="container mx-auto px-4 py-4 md:px-[7vw] grid grid-cols-12 items-center">
        {/* Logo Section */}
        <div className="logo flex justify-start md:col-span-3 col-span-6">
          <span>
            <i className="ri-handbag-line text-[1.4em]"></i>
          </span>
          <h2 className="font-bold text-[1.1em] mt-1 mx-1">Multi-Yash</h2>
        </div>

        {/* Sidebar for Mobile */}
        <div
          className={`fixed top-0 right-0 h-full bg-gray-900 text-white w-[50%] p-5 z-40 transition-transform transform md:hidden ${
            showNavbar ? "translate-x-0" : "translate-x-full"
          } duration-300`}
        >
          <button
            onClick={() => setShowNavbar(!showNavbar)}
            aria-label="Toggle menu"
          >
            <i className="ri-close-line text-white text-[1.4em] absolute top-2 right-2"></i>
          </button>
          <ul className="space-y-4 text-center mt-16">
            <li>
              <Link to="/" className="font-bold">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="font-bold">
                About
              </Link>
            </li>
            <li>
              <Link to="/shop" className="font-bold">
                Shop
              </Link>
            </li>
            <li>
              <Link to="/contact" className="font-bold">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Navlink for Desktop */}
        <div className="md:col-span-6 hidden md:block">
          <ul className="flex space-x-3 justify-center">
            <li>
              <Link to="/" className="font-bold">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="font-bold">
                About
              </Link>
            </li>
            <li>
              <Link to="/shop" className="font-bold">
                Shop
              </Link>
            </li>
            <li>
              <Link to="/contact" className="font-bold">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Icons Section */}
        <div className="nav__icon flex space-x-2 justify-end col-span-6 md:col-span-3">
          <div className="search-icon text-2xl">
            <button
              onClick={() => {
                setShowSearch(true);
                navigate("/shop");
              }}
              aria-label="Search"
            >
              <i className="ri-search-line"></i>
            </button>
          </div>

          <div className="nav__shopping-card cursor-pointer relative mx-2">
            <NavLink to="/cart">
              <i className="ri-shopping-cart-2-fill text-2xl"></i>
              <span className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full text-xs px-2 py-1">
                {qty}
              </span>
            </NavLink>
          </div>

          <div className="nav__user-profile cursor-pointer">
            <button
              onClick={() => setShowRegister(!showRegister)}
              aria-label="Toggle register"
              className="flex items-center space-x-1"
            >
              <i className="ri-user-line text-2xl"></i>
              <i className="ri-arrow-drop-down-fill text-2xl"></i>
            </button>

            {showRegister && (
              <div
                className="bg-white rounded-sm shadow-lg absolute p-3 mt-2"
                onMouseEnter={() => setShowRegister(true)}
                onMouseLeave={() => setShowRegister(false)}
              >
                {user ? (
                  <button onClick={() => logOut()}>Logout</button>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setShowRegister(!showRegister)}
                    >
                      Login
                    </Link>
                    <br />
                    <Link
                      to="/signup"
                      onClick={() => setShowRegister(!showRegister)}
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>

          <div className="menu mt-1">
            <button
              onClick={() => setShowNavbar(!showNavbar)}
              aria-label="Toggle menu"
            >
              <i className="ri-menu-fill md:hidden text-black text-[1.4em]"></i>
            </button>
          </div>
        </div>
      </nav>

      {showSearch && (
        <div className="search-bar container mx-auto flex justify-center px-4 py-4">
          <div className="relative w-[70%]">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={handleChange}
              className="w-full border border-gray-600 h-8 pl-4 pr-10 rounded-full"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600">
              <i className="ri-search-line"></i>
            </span>
          </div>
          <span className="ml-3">
            <button
              onClick={() => setShowSearch(!showSearch)}
              aria-label="Submit search"
            >
              <i className="ri-close-line text-2xl"></i>
            </button>
          </span>
        </div>
      )}
    </header>
  );
};

export default Navbar;
