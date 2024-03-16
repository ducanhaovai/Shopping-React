import { createBrowserRouter } from "react-router-dom";
import Login from "./features/loginGoogle/login";

import LoginGoogle from "./features/loginGoogle/index";
import RegisterLayout from "./layouts/RegisterLayout/RegisterLayout";

import LoginSignup from "./pages/login-signup";
import HomeLayout from "./layouts/HomeLayout";
import Home from "./pages/Home/index";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <HomeLayout>
        <Home />
      </HomeLayout>
    ),
  },
  {
    path: "/login",
    element: (
      <RegisterLayout>
        <LoginSignup />
      </RegisterLayout>
    ),
  },
  {
    path: "/login",
    element: <LoginGoogle />,
  },
  {
    path: "/login/oauth",
    element: <Login />,
  },
]);

export default router;
