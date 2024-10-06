
import { useAppSelector, useAppDispatch } from "../AppHook/AppHook";
import TotalCart from "../Component/TotalCart";
import { removeFromCart, updateQuantity } from "../ProductSlice/ProductSlice";
import { useNavigate } from "react-router-dom";

const ProductCart = () => {
  const addedProduct = useAppSelector((state) => state.product.items);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();


  return (
    <div className="container mx-auto px-4 py-4 md:px-[7vw]">
      <div className="border-t pt-14">
        <div className="text-2xl mb-3">
          <div className="inline-flex gap-2 items-center mb-3">
            <p className="text-gray-500">
              YOUR <span className="text-gray-700 font-medium">CART</span>
            </p>
            <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
          </div>
        </div>

        {addedProduct.map((item) => (
          <div
            className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
            key={item._id + item.size}
          >
            <div className="flex items-start gap-6">
              <img className="w-16 sm:w-20" src={item.image[0]} alt="Product" />
              <div>
                <p className="text-xs sm:text-lg font-medium">{item.name}</p>
                <div className="flex items-center gap-5 mt-2">
                  <p>${item.price.toFixed(2)}</p>
                  <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
                    {item.size}
                  </p>
                </div>
              </div>
            </div>
            <input
              className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
              type="number"
              min="1"
              value={item.qty}
              onChange={(e) => {
                const newQty = Number(e.target.value);
                if (newQty > 0) {
                  dispatch(updateQuantity({ id: item._id, size: item.size ?? "", qty: newQty, price: item.price }));
                }
              }}
            />
            <div className="delete-item">
              <button
                className="p-2 bg-red-600 text-white rounded-md"
                onClick={() => {
                  if (item.size) {
                    dispatch(removeFromCart({ id: item._id, size: item.size }));
                  }
                }}
              >
                remove
              </button>
            </div>
          </div>
        ))}

        <div className="flex justify-end my-20">
          <div className="w-full sm:w-[450px]">
            <TotalCart/>
            <div className="w-full text-end">
            <button className="bg-black text-white text-sm my-8 px-8 py-3" onClick={() => navigate('/place-order')}>
                PROCEED TO CHECKOUT
              </button>
            </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ProductCart;
