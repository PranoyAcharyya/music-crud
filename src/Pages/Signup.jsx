import { useDispatch } from "react-redux";
import { signup } from "../redux/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const signupSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Invalid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(4, "Password must be at least 4 characters")
    .required("Password is required"),
});

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
  });

  const onSubmit = (data) => {
    dispatch(signup(data));
    toast.success("Account created!");
    navigate("/library/upload");
  };

  return (
    <div className="bg-black text-white min-h-screen flex items-center justify-center">
      <div className="bg-gray-900 p-8 rounded-lg w-96">
        <h2 className="text-2xl mb-4 text-center">Sign Up</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("name")}
            className="w-full p-2 mb-1 bg-black border"
            placeholder="Name"
          />
          {errors.name && (
            <p className="text-red-400 text-sm mb-2">
              {errors.name.message}
            </p>
          )}

          <input
            {...register("email")}
            className="w-full p-2 mb-1 bg-black border"
            placeholder="Email"
          />
          {errors.email && (
            <p className="text-red-400 text-sm mb-2">
              {errors.email.message}
            </p>
          )}

          <input
            type="password"
            {...register("password")}
            className="w-full p-2 mb-1 bg-black border"
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-400 text-sm mb-2">
              {errors.password.message}
            </p>
          )}

          <button
            type="submit"
            className="bg-green-500 w-full py-2 rounded text-black"
          >
            Create Account
          </button>
        </form>

        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-green-400">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
