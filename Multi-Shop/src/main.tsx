import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)


// import { useState } from "react";
// import { Link } from "react-router-dom";

// const Navbar = () => {
//   const [showNavbar, setShowNavbar] = useState<boolean>(false);

//   return (
//     <div>
//       <header>
//         <nav className="container mx-auto items-center px-4 py-4 grid grid-cols-12">
//           {/* Logo Section */}
//           <div className="logo flex justify-start md:col-span-3 col-span-6">
//             <span>
//               <i className="ri-handbag-line text-[1.2em]"></i>
//             </span>
//             <h2 className="font-bold text-[1em] mt-1 mx-1">Multi-Yash</h2>
//           </div>

//           {/* Sidebar (Right Side) mobile */}
//           <div
//             className={`fixed top-0 right-0 h-full bg-gray-900 text-white w-[50%] p-5 z-40 transition-transform transform md:hidden ${
//               showNavbar ? "translate-x-0" : "translate-x-full"
//             } duration-300`}
//           >
//             <button
//               onClick={() => setShowNavbar(!showNavbar)}
//               aria-label="Toggle menu"
//             >
//               <i className="ri-close-line text-white text-[1.4em] absolute top-2 right-2"></i>
//             </button>
//             <ul className="space-y-4 text-center mt-16">
//               <li>
//                 <Link to="/" className="block py-2 hover:bg-gray-700 rounded">
//                   Home
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/about"
//                   className="block py-2 hover:bg-gray-700 rounded"
//                 >
//                   About
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/shoppingCard"
//                   className="block py-2 hover:bg-gray-700 rounded"
//                 >
//                   Services
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/contact"
//                   className="block py-2 hover:bg-gray-700 rounded"
//                 >
//                   Contact
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           {/* Navlink for desktop */}

//           <div className="md:col-span-6 hidden md:block">
//             <ul className="flex space-x-3 justify-center">
//               <li>
//                 <Link to="/" className="block py-2 hover:bg-gray-700 rounded">
//                   Home
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/about"
//                   className="block py-2 hover:bg-gray-700 rounded"
//                 >
//                   About
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/shoppingCard"
//                   className="block py-2 hover:bg-gray-700 rounded"
//                 >
//                   Services
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/contact"
//                   className="block py-2 hover:bg-gray-700 rounded"
//                 >
//                   Contact
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           {/* Icons Section */}
//           <div className="nav__icon flex space-x-2 justify-end col-span-6 md:col-span-3">
//             <div className="nav__shopping-card cursor-pointer relative">
//               {/* Shopping Cart Icon */}
//               <i className="ri-shopping-cart-2-fill text-2xl"></i>
//               {/* Counter on top of shopping cart */}
//               <span className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full text-xs px-2 py-1">
//                 0
//               </span>
//             </div>
//             <div className="nav__user-profile cursor-pointer">
//               <i className="ri-user-line text-2xl"></i>
//             </div>
//             <div className="menu mt-1">
//               {/* Toggle between menu and cross icons */}
//               <button
//                 onClick={() => setShowNavbar(!showNavbar)}
//                 aria-label="Toggle menu"
//               >
//                 <i className="ri-menu-fill text-black text-[1.4em]"></i>
//               </button>
//             </div>
//           </div>
//         </nav>
//       </header>
//     </div>
//   );
// };

// export default Navbar;