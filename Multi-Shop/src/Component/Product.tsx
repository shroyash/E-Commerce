import React from 'react';
import { ProductType } from "../Types/ProductType";

interface ProductProps {
  product: ProductType; 
}

const Product: React.FC<ProductProps> = ({ product }) => {
  const { image, name, price } = product; 

  return (
    <div className="product-card col-span-6 md:col-span-3 my-2 ">
      <div className="product-card__img">
        <img src={image[0]} alt={name} className='h-[60vh] md:h-[40vh] md:w-[70vw]' />
      </div>
      <div className="product-card__detail text-left text-slate-400 mt-2">
        <p>{name}</p>
        <p className='text-black'>${price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Product;
