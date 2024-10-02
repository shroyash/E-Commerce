import React from "react";
import { ProductType } from "../Types/ProductType";
import { NavLink } from "react-router-dom";


interface ProductProps {
  product: ProductType;
}

const Product: React.FC<ProductProps> = ({ product }) => {
  const { image, name, price, _id } = product;

  const handleDirectToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', 
    });
  }

  return (
    <div className="product-card col-span-6 md:col-span-3 my-2 " onClick={handleDirectToTop}>
      <NavLink to={`/product/${_id}`}>
        <div className="product-card__img scale-90 hover:scale-100 transition-transform duration-300">
          <img
            src={image[0]}
            alt={name}
            className="h-[60vh] md:h-[45vh] md:w-[70vw]"
          />
        </div>

        <div className="product-card__detail text-left text-slate-400 mt-3">
          <p>{name}</p>
          <div className="flex justify-between mt-3">
            <p className="text-black">${price.toFixed(2)}</p>
            <p className="text-3xl mr-5 -mt-2 hover:text-red-400 cursor-pointer">
              +
            </p>
          </div>
        </div>
      </NavLink>
    </div>
  );
};

export default Product;
