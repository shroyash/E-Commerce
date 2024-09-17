import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAuth } from "../AuthContext/AuthContexts";

const Signup = () => {
  type Inputs = {
    name: string;
    email: string;
    password: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const { signIn, loading } = useAuth();

  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    signIn(data.name, data.email, data.password);
  };

  return (
    <>
      {loading ? (
        <p className="text-center text-red-500 text-xl">Loading...</p>
      ) : (
        <div className="flex justify-center items-center h-screen bg-gray-100">
          <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-3xl font-bold text-center text-gray-800">
              Sign Up
            </h2>

            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              {/* User Name */}
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  User Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your User Name"
                  {...register("name", {
                    required: "User name is required",
                    maxLength: { value: 20, message: "Max length is 20" },
                  })}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your password"
                    {...register("password", {
                      required: "Password is required",
                      pattern: {
                        value: /^(?=.*[A-Z])(?=.*[\W_]).{8,}$/,
                        message:
                          "Password must be at least 8 characters long, include an uppercase letter, and a special character.",
                      },
                    })}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i
                      className={`ri-${showPassword ? "eye-off" : "eye"}-line`}
                    ></i>
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold transition duration-300"
              >
                Sign Up
              </button>
            </form>

            <div className="text-center mt-4">
              <p className="text-gray-600">or</p>
            </div>

            <button className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg font-semibold transition duration-300">
              Sign Up with Google
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Signup;
