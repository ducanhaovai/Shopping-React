import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form"; // Import React Hook Form
import "./LoginSignup.css";
import { useNavigate } from "react-router-dom";
import LoginGoogle from "../../features/loginGoogle";
import Input from "../../components/Input/Input";

axios.defaults.withCredentials = true;

export const LoginSignup = () => {
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(); // Initialize React Hook Form

  const navigate = useNavigate();

  const [action, setAction] = useState("Sign up");
  const [haveAccountText, setHaveAccountText] = useState(
    "Don’t have an account?"
  );

  const toggleAction = () => {
    if (action === "Sign up") {
      setAction("Sign in");
      setHaveAccountText("Have an account?");
    } else {
      setAction("Sign up");
      setHaveAccountText("Don’t have an account?");
    }
  };

  const handleSignUp = (data: any) => {
    axios
      .post("http://localhost:8088/signup", data)
      .then((res) => {
        console.log("Sign up successful:", res.data);
        setMessage("Registration successful");
        navigate("/login");
      })
      .catch((err) => {
        console.error("Sign up failed:", err);
        setMessage("An error occurred");
      });
  };

  const handleSignIn = (data: any) => {
    // Pass data from React Hook Form
    axios.defaults.withCredentials = true;
    axios
      .post("http://localhost:8088/login", data)
      .then((res) => {
        console.log("Sign in successful:", res.data);
        setMessage("Login successful");
        navigate("https://shopping-react-sjvr.vercel.app");
      })
      .catch((err) => {
        console.error("Sign in failed:", err);
        setMessage("Wrong email or password!");
      });
  };

  return (
    <div className="bg-orange ">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-5 py-12 lg:py-32 lg:pr-10 ">
          <div className="lg:col-span-2 lg:col-start-4 ">
            <form
              className="p-10 rounded bg-white shadow-sm "
              onSubmit={
                action === "Sign up"
                  ? handleSubmit(handleSignIn)
                  : handleSubmit(handleSignUp)
              }
            >
              <div className="flex flex-col items-center flex-wrap">
                <div className="text-2xl font-semibold">Get’s started.</div>

                <span>or login with email</span>
                <div className="rectangle"></div>
              </div>

              {action === "Sign in" && (
                <Input
                  className="mt-8"
                  type="text"
                  placeholder="Name"
                  {...register("name", { required: true })}
                />
              )}
              <Input
                className="mt-2"
                type="email"
                placeholder="Email"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <p className="text-red-600 ml-2">Email is required.</p>
              )}
              <Input
                className="mt-2"
                type="password"
                placeholder="Password"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <p className="text-red-600 ml-2">Password is required.</p>
              )}
              <div className="mt-2">
                {action === "Sign in" ? (
                  <button
                    type="submit"
                    className="w-full text-center py-4 px-2 uppercase bg-red-500 text-white  text-sm hover:bg-red-600"
                  >
                    Sign up
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="w-full text-center py-4 px-2 uppercase bg-red-500 text-white  text-sm hover:bg-red-600"
                  >
                    Sign in
                  </button>
                )}
              </div>

              <div className="mt-8 text-center">
                <div className="flex items-center justify-center">
                  {haveAccountText}{" "}
                  <span className="text-red-400 ml-2" onClick={toggleAction}>
                    {action}
                  </span>
                </div>

                <LoginGoogle />
                {message && <p className="text-red-600 ml-2">{message}</p>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
