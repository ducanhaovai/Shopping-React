import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
import { checkAuth, logout } from "../../../api/homeApi";

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
    checkAuth()
      .then((data) => {
        if (data.Status === "Success") {
          setAuth(true);
          setEmail(data.email);
          setWithExpiry("user_email", data.email, 24 * 60 * 60 * 1000);
          setWithExpiry("user_name", data.name, 24 * 60 * 60 * 1000);
        } else {
          setAuth(false);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleLogout = () => {
    logout()
      .then((data: { Status: string }) => {
        if (data.Status === "Success") {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          localStorage.removeItem("user_email");
          localStorage.removeItem("user_name");
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
  
  const setWithExpiry = (key: string, value: any, ttl: number) => {
    const now = new Date();
    const item = {
      value: value,
      expiry: now.getTime() + ttl,
    };
    localStorage.setItem(key, JSON.stringify(item));
  };

  const getWithExpiry = (key: string) => {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) {
      return null;
    }
    const item = JSON.parse(itemStr);
    const now = new Date();
    if (now.getTime() > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }
    return item.value;
  };

  const userName = getWithExpiry("user_name");

  return (
    <div className="list-none pl-0 mt-0 flex">
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
          <button
            className="outline-none transition duration-300 flex items-center space-x-2 rounded-md px-4 py-2 text-white/80 bg-transparent hover:bg-white/20 gap-x-2 no-underline font-light text-sm "
            onClick={handleLogin}
          >
            {t("Login")}
          </button>
        </div>
      )}
    </div>
  );
}
