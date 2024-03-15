import React, { useEffect, useState } from "react";
import "./LoginSignup.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography/Typography";

import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

const Header = () => {
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
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              News
            </Typography>
            {auth ? (
              <Button color="inherit" onClick={handleLogout}>
                Đăng xuất
              </Button>
            ) : (
              <Button color="inherit" onClick={handleLogin}>
                Đăng nhập
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};
export default Header;
