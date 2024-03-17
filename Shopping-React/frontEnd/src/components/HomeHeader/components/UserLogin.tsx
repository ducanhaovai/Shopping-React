import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function UserLogin() {
  const [auth, setAuth] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Kiểm tra xác thực mỗi khi component được render
    axios
      .get("http://localhost:8088/home", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((res) => {
        if (res.data.Status === "Success") {
          setAuth(true);
        } else {
          setAuth(false);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  const handleLogout = () => {
    axios
      .get("http://localhost:8088/logout")
      .then((res) => {
        if (res.data.Status === "Success") {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          navigate("/login", { replace: true });
        } else {
          alert("error");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleLogin = () => {
    navigate("/login", { replace: true });
  };
  return (
    <div className="flex items-center justify-end space-x-4 py-2">
      <div className="flex items-center">
        <a className="mx-3 capitalize hover:text-white/70"></a>
        <div className="border-r-[1px] border-r-white/40"></div>
        {auth ? (
          <a
            className="mx-3 capitalize hover:text-white/70"
            onClick={handleLogout}
          >
            Đăng Xuất
          </a>
        ) : (
          <a
            className="mx-3 capitalize hover:text-white/70"
            onClick={handleLogin}
          >
            Đăng nhập
          </a>
        )}
      </div>
    </div>
  );
}
