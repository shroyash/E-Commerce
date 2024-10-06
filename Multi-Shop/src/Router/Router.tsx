import { Route, Routes } from "react-router-dom"
import Home from "../Pages/Home"
import About from "../Pages/About"
import Card from "../Pages/Card"
import Contact from "../Pages/Contact"
import Login from "../Pages/Login"
import SignUp from "../Pages/SignUp"
import Shop from "../Pages/Shop"
import ProductDetail from "../Component/ProductDetail"
import ProductCart from "../Pages/ProductCart"
import PlaceOrder from "../Pages/PlaceOrder"


const Router = () => {
  return (
    <div>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/card" element={<Card/>}/>
            <Route path="/contact" element={<Contact/>}/>
            <Route path="/product/:id" element={<ProductDetail/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/cart" element={<ProductCart/>}/>
            <Route path="/shop" element={<Shop/>}/>
            <Route path="/place-order" element={<PlaceOrder/>}/>
        </Routes>
      
    </div>
  )
}

export default Router
