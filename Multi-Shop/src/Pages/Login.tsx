import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { useAuth } from "../AuthContext/AuthContexts";

const Login = () => {
  type Inputs = {
    email: string;
    password: string;
  };

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const { loading, logIn } = useAuth();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await logIn(data.email, data.password);
    } catch (error:any) {
      console.log("Login error:", error.message);
    }
  };

  return (
    <>
      {loading ? (
        <p className="text-center text-red-500 text-xl">Loading...</p>
      ) : (
        <div className="flex justify-center items-center h-screen bg-gray-100">
          <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-3xl font-bold text-center text-gray-800">
              Login
            </h2>

            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
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
              <div className="relative">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                 <button
                    type="button"
                    className="absolute right-3 top-10"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i
                      className={`ri-${showPassword ? "eye-off" : "eye"}-line`}
                    ></i>
                  </button>
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
                Login
              </button>
            </form>

            <div className="text-center mt-4">
              <p className="text-gray-600">or</p>
            </div>

            <button className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg font-semibold transition duration-300">
              Login with Google
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
