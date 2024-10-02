import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductType } from "../Types/ProductType";
import { products } from "../Assests/assets";
import ProductList from "./ProductList";
import { useAppDispatch } from "../AppHook/AppHook";
import { addToCart,addAllCartQty } from "../ProductSlice/ProductSlice";
import { toast } from "react-toastify";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [description, setDescription] = useState(true);
  const [review, setReview] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [submittedReviews, setSubmittedReviews] = useState<string[]>([]);
  const [imgIndex, setImgIndex] = useState<number>(0);
  const [relatedProduct, setRelatedProduct] = useState<ProductType[] | null>(null);
  const [selectedSize,setSelectedSize] = useState<string | null>(null)

  const dispatch = useAppDispatch();

  const handleDes = () => {
    setReview(false);
    setDescription(true);
  };

  const handleRev = () => {
    setDescription(false);
    setReview(true);
  };

  const handleReviewChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReviewText(e.target.value);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (reviewText.trim()) {
      setSubmittedReviews([...submittedReviews, reviewText]);
      setReviewText(""); // Clear the input after submission
    }
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

  const handleSelectSize = (size:string) => {
    setSelectedSize(size);
    toast.success("Size Selected");
  }

  const handleAddProduct = () => {
    if (product && selectedSize) {
      dispatch(addToCart({ ...product, qty: 1,size:selectedSize }));
      dispatch(addAllCartQty());
      toast.success("Product Added To Cart");
    }else{
      toast.error("Please Select The Size")
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
              <button className="border py-2 px-4 bg-gray-100 hover:bg-red-500 bg:text-white" onClick={() => handleSelectSize("S")} >S</button>
              <button className="border py-2 px-4 bg-gray-100  hover:bg-red-500 bg:text-white"  onClick={() => handleSelectSize("M")} >M</button>
              <button className="border py-2 px-4 bg-gray-100  hover:bg-red-500 bg:text-white" onClick={() => handleSelectSize("XL")} >XL</button>
              <button className="border py-2 px-4 bg-gray-100  hover:bg-red-500 bg:text-white" onClick={() => handleSelectSize("XXL")} >XXL</button>
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
            onClick={handleDes}
          >
            Description
          </h5>
          <h5
            className="border border-gray-500 px-4 py-2 font-bold cursor-pointer"
            onClick={handleRev}
          >
            Reviews
          </h5>
        </div>
        {description && (
          <p className="text-gray-500 p-4">
            An e-commerce website is an online platform that facilitates the
            buying and selling of products or services over the internet...
          </p>
        )}
        {review && (
          <div className="p-4">
            <h3 className="font-bold">Reviews</h3>
            <form onSubmit={handleReviewSubmit} className="my-4">
              <textarea
                value={reviewText}
                onChange={handleReviewChange}
                placeholder="Write your review here..."
                className="border rounded-md p-2 w-full h-24"
                required
              />
              <button
                type="submit"
                className="bg-black text-white px-4 py-2 mt-2"
              >
                Submit Review
              </button>
            </form>
            <div>
              {submittedReviews.map((review, index) => (
                <div key={index} className="border-b my-2 pb-2">
                  <p>{review}</p>
                </div>
              ))}
            </div>
          </div>
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
