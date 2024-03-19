import React, { useState } from "react";
import axios from "axios";
import "./LoginSignup.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"; // Import useForm
import LoginGoogle from "../../features/loginGoogle";
import Input from "../../components/Input/Input";

const LoginSignup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(); // Khởi tạo form

  const [message, setMessage] = useState("");
  const [action, setAction] = useState("Sign up");
  const [haveAccountText, setHaveAccountText] = useState(
    "Don’t have an account?"
  );
  const navigate = useNavigate();

  const toggleAction = () => {
    if (action === "Sign up") {
      setAction("Sign in");
      setHaveAccountText("Have an account?");
    } else {
      setAction("Sign up");
      setHaveAccountText("Don’t have an account?");
    }
  };

  const handleSignUp = (data) => {
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

  const handleSignIn = (data) => {
    axios
      .post("http://localhost:8088/login", data)
      .then((res) => {
        console.log("Sign in successful:", res.data);
        setMessage("Login successful");
        navigate("/");
      })
      .catch((err) => {
        console.error("Sign in failed:", err);
        setMessage("Wrong email or password!");
      });
  };

  return (
    <div className="bg-orange">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-5 py-12 lg:py-32 lg:pr-10 ">
          <div className="lg:col-span-2 lg:col-start-4 ">
            <form
              className="p-10 rounded bg-white shadow-sm "
              onSubmit={handleSubmit(
                action === "Sign up" ? handleSignUp : handleSignIn
              )}
            >
              {/* Đăng ký các trường input với form */}
              {action === "Sign in" && (
                <Input
                  className="mt-8"
                  type="text"
                  placeholder="Name"
                  {...register("name")} // Đăng ký trường input
                  autoFocus
                  required
                />
              )}
              <Input
                className="mt-2"
                type="email"
                placeholder="Email"
                {...register("email")} // Đăng ký trường input
                autoFocus
                required
              />
              <Input
                className="mt-2"
                type="password"
                placeholder="Password"
                {...register("password")} // Đăng ký trường input
                required
              />
              <div className="mt-2">
                <button
                  type="submit" // Sử dụng type submit để gửi form
                  className="w-full text-center py-4 px-2 uppercase bg-red-500 text-white  text-sm hover:bg-red-600"
                >
                  {action === "Sign in" ? "Sign up" : "Sign in"}
                </button>
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

export default LoginSignup;
