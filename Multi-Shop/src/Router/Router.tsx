import { Route, Routes } from "react-router-dom"
import Home from "../Pages/Home"
import About from "../Pages/About"
import Card from "../Pages/Card"
import Contact from "../Pages/Contact"
import Login from "../Pages/Login"
import SignUp from "../Pages/SignUp"


const Router = () => {
  return (
    <div>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/card" element={<Card/>}/>
            <Route path="/contact" element={<Contact/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/login" element={<SignUp/>}/>
        </Routes>
      
    </div>
  )
}

export default Router
