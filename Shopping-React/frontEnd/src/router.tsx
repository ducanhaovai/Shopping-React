import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CarContext";
import LoginGoogle from "./features/loginGoogle/index";

import Login from "./features/loginGoogle/index";
import RegisterLayout from "./layouts/RegisterLayout/RegisterLayout";
import LoginSignup from "./pages/login-signup";
import HomeLayout from "./layouts/HomeLayout";
import Home from "./pages/Home/index";
import UserDetail from "./pages/UserDetail";
import UserDetailLayout from "./layouts/UserDetailLayout";
import Cart from "./pages/Cart";
import ProductDetail from "./components/ProductDetail";
import ProductDetailLayout from "./layouts/ProductDetailLayout/ProductDetailLayout";
import Product from "./components/ProductDetail";


const AppRouter = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <HomeLayout>
            <Home />
          </HomeLayout>
        }
      />
      <Route
        path="/login"
        element={
          <RegisterLayout>
            <LoginSignup />
          </RegisterLayout>
        }
      />
      <Route path="/login/google" element={<LoginGoogle />} />
      <Route
        path="/profile"
        element={
          <UserDetailLayout>
            <UserDetail />
          </UserDetailLayout>
        }
      />
      <Route
        path="/cart"
        element={
          <CartProvider>
            <Cart />
          </CartProvider>
        }
      />
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
