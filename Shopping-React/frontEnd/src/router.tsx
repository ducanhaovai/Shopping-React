import { createBrowserRouter } from "react-router-dom";
import Login from "./features/loginGoogle/login";

import LoginGoogle from "./features/loginGoogle/index";
import RegisterLayout from "./layouts/RegisterLayout/RegisterLayout";
import Header from "./components/header";
import LoginSignup from "./pages/login-signup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
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
