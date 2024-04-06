import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Stack from "@mui/material/Stack";
import LangSwitch from "../../../features/Lang";
import { useTranslation } from "react-i18next";

export default function UserLogin() {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [auth, setAuth] = useState(false);
  const [, setEmail] = useState("");

  const [, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleListKeyDown(event: {
    key: string;
    preventDefault: () => void;
  }) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  useEffect(() => {
    axios
      .get("http://localhost:8088/home", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.Status === "Success") {
          setAuth(true);
          setEmail(res.data.email);
          localStorage.setItem("user_email", res.data.email);
          localStorage.setItem("user_name", res.data.name);
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
          localStorage.removeItem("user_email");
          navigate("/login", { replace: true });
        } else {
          alert("error");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleLogin = () => {
    navigate("/login", { replace: true });
  };

  const userName = localStorage.getItem("user_name");

  return (
    <div className="flex items-center justify-end space-x-4 py-2 z-2">
      <LangSwitch />

      {auth ? (
        <Stack direction="row" spacing={2}>
          <div>
            <button
              onClick={handleToggle}
              className="flex items-center outline-none transition duration-300  space-x-2 rounded-md px-4 py-2 hover:bg-opacity-80 bg-transparent hover:bg-white/20"
            >
              <div className="flex-center cursor-pointer">
                <div className="mr-2 h-6 w-6 flex-shrink-0">
                  <AccountCircleIcon
                    fontSize="medium"
                    ref={anchorRef}
                    id="composition-button"
                    aria-controls={open ? "composition-menu" : undefined}
                    aria-expanded={open ? "true" : undefined}
                    aria-haspopup="true"
                    className="h-full w-full rounded-full object-cover"
                  ></AccountCircleIcon>
                </div>
                <p className="text-white/80">{userName}</p>
              </div>
            </button>

            <Popper
              open={open}
              anchorEl={anchorRef.current}
              role={undefined}
              placement="bottom-start"
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === "bottom-start" ? "left top" : "left bottom",
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList
                        autoFocusItem={open}
                        id="composition-menu"
                        aria-labelledby="composition-button"
                        onKeyDown={handleListKeyDown}
                      >
                        <MenuItem
                          className="block w-full bg-white py-3 px-4 text-left hover:bg-slate-100 hover:text-cyan-500"
                          onClick={handleProfileClick}
                        >
                          {t("Profile")}
                        </MenuItem>
                        <MenuItem
                          className="block w-full bg-white py-3 px-4 text-left hover:bg-slate-100 hover:text-cyan-500 "
                          onClick={handleClose}
                        >
                          {t("My account")}
                        </MenuItem>

                        <MenuItem
                          className="block w-full bg-white py-3 px-4 text-left hover:bg-slate-100 hover:text-cyan-500"
                          onClick={handleLogout}
                        >
                          {t("Logout")}
                        </MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </div>
        </Stack>
      ) : (
        <div className="flex items-center">
          <a
            className="mx-3 capitalize hover:text-white/70"
            onClick={handleLogin}
          >
            {t("Login")}
          </a>
        </div>
      )}
    </div>
  );
}
