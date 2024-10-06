import { useForm, SubmitHandler } from "react-hook-form";
import TotalCart from "../Component/TotalCart";

interface FormData {
  fullName: string;
  lastName: string;
  email: string;
  address: string;
  phone: string;
  paymentMethod: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

const PlaceOrder = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => console.log(data);

  return (
    <div>
      <div className="place-order container mx-auto px-4 py-4 md:px-[7vw]">
        <div className="main-heading mt-6 mb-2">
          <h1 className="font-[500] text-[1.6em]">DELIVERY INFORMATION__</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-12 gap-16">
            <div className="col-span-12 md:col-span-6  ">
              <div className="flex flex-col gap-4 mt-">
                <div className="flex w-full space-x-4">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Full Name"
                      {...register("fullName", {
                        required: "Full name is required",
                      })}
                      className={`mt-1 p-2 border rounded w-full ${
                        errors.fullName ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.fullName && (
                      <span className="text-red-500 text-sm">
                        {errors.fullName.message}
                      </span>
                    )}
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Last Name"
                      {...register("lastName", {
                        required: "Last name is required",
                      })}
                      className={`mt-1 p-2 border rounded w-full ${
                        errors.lastName ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.lastName && (
                      <span className="text-red-500 text-sm">
                        {errors.lastName.message}
                      </span>
                    )}
                  </div>
                </div>

                {/* Email Input */}
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Invalid email format",
                      },
                    })}
                    className={`mt-1 p-2 border rounded w-full ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.email && (
                    <span className="text-red-500 text-sm">
                      {errors.email.message}
                    </span>
                  )}
                </div>

                {/* Address Input */}
                <div>
                  <input
                    type="text"
                    placeholder="Address"
                    {...register("address", {
                      required: "Address is required",
                    })}
                    className={`mt-1 p-2 border rounded w-full ${
                      errors.address ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.address && (
                    <span className="text-red-500 text-sm">
                      {errors.address.message}
                    </span>
                  )}
                </div>

                {/* City and State */}
                <div className="flex w-full space-x-4">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="City"
                      {...register("city", { required: "City is required" })}
                      className={`mt-1 p-2 border rounded w-full ${
                        errors.city ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.city && (
                      <span className="text-red-500 text-sm">
                        {errors.city.message}
                      </span>
                    )}
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="State"
                      {...register("state", { required: "State is required" })}
                      className={`mt-1 p-2 border rounded w-full ${
                        errors.state ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.state && (
                      <span className="text-red-500 text-sm">
                        {errors.state.message}
                      </span>
                    )}
                  </div>
                </div>

                {/* Zip Code and Country */}
                <div className="flex w-full space-x-4">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Zip Code"
                      {...register("zipCode", {
                        required: "Zip code is required",
                      })}
                      className={`mt-1 p-2 border rounded w-full ${
                        errors.zipCode ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.zipCode && (
                      <span className="text-red-500 text-sm">
                        {errors.zipCode.message}
                      </span>
                    )}
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Country"
                      {...register("country", {
                        required: "Country is required",
                      })}
                      className={`mt-1 p-2 border rounded w-full ${
                        errors.country ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.country && (
                      <span className="text-red-500 text-sm">
                        {errors.country.message}
                      </span>
                    )}
                  </div>
                </div>

                {/* Phone Number Input */}
                <div>
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    {...register("phone", {
                      required: "Phone number is required",
                    })}
                    className={`mt-1 p-2 border rounded w-full ${
                      errors.phone ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.phone && (
                    <span className="text-red-500 text-sm">
                      {errors.phone.message}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="col-span-12 md:col-span-6">
              <TotalCart />
             
                <p className="block font-medium mt-12 mb-3 text-[1.4em]">Payment Method</p>
                <div className="flex gap-2">
                
                <div className="flex items-center gap-3 border p-2 cursor-pointer">
                    <input
                      type="radio"
                      value="cash-on-hand"
                      {...register("paymentMethod", {
                        required: "Payment method is required",
                      })}
                    />
                    <span className="text-sm text-green-500 font-bold">Cash on Hand</span>
                  </div>
                {errors.paymentMethod && (
                  <span className="text-red-500 text-sm mt-2">
                    {errors.paymentMethod.message}
                  </span>
                )}
              </div>
            </div>
            </div>
         

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white p-2 rounded"
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default PlaceOrder;
