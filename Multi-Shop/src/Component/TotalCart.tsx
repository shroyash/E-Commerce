import { useAppSelector} from "../AppHook/AppHook";


const TotalCart = () => {
    const subTotal = useAppSelector((state) => state.product.subTotal);
    const total = useAppSelector((state) => state.product.total);
   

  return (
    <div>
          <div className="w-full">
              <div className="text-2xl">
                <div className="inline-flex gap-2 items-center mb-3">
                  <p className="text-gray-500">
                    CART <span className="text-gray-700 font-medium">TOTALS</span>
                  </p>
                  <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
                </div>
              </div>
              <div className="flex flex-col gap-2 mt-2 text-sm">
                <div className="flex justify-between">
                  <p>Subtotal</p>
                  <p>${subTotal.toFixed(2)}</p> 
                </div>
                <hr />
                <div className="flex justify-between">
                  <p>Shipping Fee</p>
                  <p>$10</p>
                </div>
                <hr />
                <div className="flex justify-between">
                  <b>Total</b>
                  <b>${total.toFixed(2)}</b> 
                </div>
              </div>
            </div>

          </div>
      
  )
}

export default TotalCart
