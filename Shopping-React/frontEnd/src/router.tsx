import { Routes, Route } from "react-router-dom";

import LoginGoogle from "./features/loginGoogle/index";

import Login from "./features/loginGoogle/login";
import RegisterLayout from "./layouts/RegisterLayout/RegisterLayout";
import LoginSignup from "./pages/login-signup";
import HomeLayout from "./layouts/HomeLayout/index";

import UserDetailLayout from "./layouts/UserDetailLayout";
import Cart from "./pages/Cart";

import ProductDetailLayout from "./layouts/ProductDetailLayout/ProductDetailLayout";
import Product from "./components/ProductDetail";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeLayout />} />
      <Route
        path="/login"
        element={
          <RegisterLayout>
            <LoginSignup />
          </RegisterLayout>
        }
      />
      <Route path="/login" element={<LoginGoogle />} />
      <Route path="/profile" element={<UserDetailLayout></UserDetailLayout>} />
      <Route path="/cart" element={<Cart />} />
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
