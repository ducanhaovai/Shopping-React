import { useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import LoginGoogle from "./features/loginGoogle/index";
import Login from "./features/loginGoogle/login";
import RegisterLayout from "./layouts/RegisterLayout/RegisterLayout";
import LoginSignup from "./pages/login-signup";
import HomeLayout from "./layouts/HomeLayout/index";
import UserDetailLayout from "./layouts/UserDetailLayout";
import Cart from "./pages/Cart";
import ProductDetailLayout from "./layouts/ProductDetailLayout/ProductDetailLayout";
import Product from "./components/ProductDetail";
import ChangePass from "./components/ChangePassword";
import CartLayout from "./layouts/CartLayout/CartLayout";

const AppRouter = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = localStorage.getItem("user_email");

  useEffect(() => {
    if (email && location.pathname === "/login") {
      navigate("/");
    }
  }, [email, location, navigate]);

  return (
    <Routes>
      <Route path="/" element={<HomeLayout />} />
      <Route
        path="/login"
        element={
          !email ? (
            <RegisterLayout>
              <LoginSignup />
            </RegisterLayout>
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route
        path="/login"
        element={!email ? <LoginGoogle /> : <Navigate to="/" />}
      />
      <Route path="/profile" element={<UserDetailLayout />} />
      <Route
        path="/cart"
        element={
          <CartLayout>
            <Cart />
          </CartLayout>
        }
      />
      <Route path="/pass" element={<ChangePass />} />
      <Route
        path="/products/:productId"
        element={
          <ProductDetailLayout>
            <Product />
          </ProductDetailLayout>
        }
      />
      <Route path="/login/oauth" element={<Login />} />
    </Routes>
  );
};

export default AppRouter;
