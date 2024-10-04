import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductType } from "../Types/ProductType";
import { products } from "../Assests/assets";
import ProductList from "./ProductList";
import { useAppDispatch } from "../AppHook/AppHook";
import { addToCart, addAllCartQty } from "../ProductSlice/ProductSlice";
import { toast } from "react-toastify";
import Reveiw from "./Reveiw";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [description, setDescription] = useState(true);
  const [review, setReview] = useState(false);
  const [imgIndex, setImgIndex] = useState<number>(0);
  const [relatedProduct, setRelatedProduct] = useState<ProductType[] | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const dispatch = useAppDispatch();

  const handleShowDes = () => {
    setReview(false);
    setDescription(true);
  };

  const handleShowRev = () => {
    setDescription(false);
    setReview(true);
  };

  useEffect(() => {
    const foundProduct = products.find((p) => p._id === id);
    const foundProductCategories = foundProduct?.category;
    const foundProductSubCategories = foundProduct?.subCategory;
    const relatedItem = products.filter(
      (p) =>
        p.category === foundProductCategories &&
        p.subCategory === foundProductSubCategories
    );

    if (relatedItem) {
      setRelatedProduct(relatedItem);
    }

    if (foundProduct) {
      setProduct(foundProduct);
    }
  }, [id]);

  const handleSelectSize = (size: string) => {
    setSelectedSize(size);
    toast.success("Size Selected");
  };

  const handleAddProduct = () => {
    if (product && selectedSize) {
      dispatch(addToCart({ ...product, qty: 1, size: selectedSize }));
      dispatch(addAllCartQty());
      toast.success("Product Added To Cart");
    } else {
      toast.error("Please Select The Size");
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100 container mx-auto px-4 md:px-[7vw]">
        <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
          <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
            <div className="flex sm:flex-col overflow-x-auto justify-between sm:justify-normal sm:w-[18.7%] w-full">
              {product.image.map((img, i) => (
                <button key={i} onClick={() => setImgIndex(i)}>
                  <img
                    src={img}
                    className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                    alt={`Product Thumbnail ${i + 1}`}
                  />
                </button>
              ))}
            </div>

            <div className="w-full sm:w-[80%]">
              <img
                className="w-full h-auto"
                src={product.image[imgIndex]}
                alt="Product Main Image"
              />
            </div>
          </div>
          <div className="flex-1">
            <h1 className="font-medium text-2xl mt-2">{product.name}</h1>
            <p className="my-6 font-bold text-[1.6em]">
              ${product.price.toFixed(2)}
            </p>
            <p className="text-gray-600 font-[500]">{product.description}</p>
            <h2 className="font-[500] mt-6">Select Sizes</h2>
            <div className="sizes flex space-x-3 my-4">
              <button
                className={`border py-2 px-4 ${
                  selectedSize === "S"
                    ? "bg-red-500 text-white"
                    : "bg-gray-100 text-black"
                } `}
                onClick={() => handleSelectSize("S")}
              >
                S
              </button>
              <button
                className={`border py-2 px-4 ${
                  selectedSize === "M"
                    ? "bg-red-500 text-white"
                    : "bg-gray-100 text-black"
                }`}
                onClick={() => handleSelectSize("M")}
              >
                M
              </button>
              <button
                className={`border py-2 px-4 ${
                  selectedSize === "XL"
                    ? "bg-red-500 text-white"
                    : "bg-gray-100 text-black"
                }`}
                onClick={() => handleSelectSize("XL")}
              >
                XL
              </button>
              <button
                className={`border py-2 px-4 ${
                  selectedSize === "XXL"
                    ? "bg-red-500 text-white"
                    : "bg-gray-100 text-black"
                } `}
                onClick={() => handleSelectSize("XXL")}
              >
                XXL
              </button>
            </div>
            <button
              className="bg-black text-white px-8 py-3 text-sm my-4 active:bg-gray-700"
              onClick={handleAddProduct}
            >
              ADD TO CART
            </button>
            <hr className="mt-4" />
            <p className="text-[0.9em] text-gray-500 mt-5">
              100% Original product.
              <br />
              Cash on delivery is available on this product.
              <br />
              Easy return and exchange policy within 7 days.
            </p>
          </div>
        </div>
        <div className="flex mt-24">
          <h5
            className="border border-gray-500 px-4 py-2 font-bold cursor-pointer"
            onClick={handleShowDes}
          >
            Description
          </h5>
          <h5
            className="border border-gray-500 px-4 py-2 font-bold cursor-pointer"
            onClick={handleShowRev}
          >
            Reviews
          </h5>
        </div>
        {description && (
          <>
           <p className="text-gray-500 p-4">
            An e-commerce website is an online platform that facilitates the
            buying and selling of products or services over the internet. It
            serves as a virtual marketplace where businesses and individuals can
            showcase their products, interact with customers, and conduct
            transactions without the need for a physical presence. E-commerce
            websites have gained immense popularity due to their convenience,
            accessibility, and the global reach they offer.
            </p>

            <p className="mt-2"> E-commerce websites typically display products or services along
            with detailed descriptions, images, prices, and any available
            variations (e.g., sizes, colors). Each product usually has its own
            dedicated page with relevant information.</p>
          </>
      
        )}
        {review && (
        <>
        <Reveiw/>
        </>
        )}
        <div className="relatedProduct">
          <div className="main-heading mt-24 text-[1.7em] text-gray-500 text-center mb-8">
            <h1>RELATED PRODUCTS__</h1>
          </div>
          {relatedProduct && <ProductList selectedProduct={relatedProduct} />}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
