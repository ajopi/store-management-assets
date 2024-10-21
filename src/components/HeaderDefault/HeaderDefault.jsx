import { IconButton, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
const HeaderDefault = ({ avatar, userName, userPosition }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null); // Untuk mengelola state dropdown
  const open = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    navigate("profile"); // navigasi ke halaman profil
    handleMenuClose();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    location.reload();
  };
  return (
    <>
      <header className="dashboard-user__header">
        <img src={avatar} alt="ini image" />
        <div className="dashboard-user__header-person">
          <h4>{userName}</h4>
          <p>{userPosition}</p>
        </div>

        {/* Dropdown untuk profil */}
        <IconButton
          edge="end"
          aria-label="account of current user"
          aria-controls="profile-menu"
          aria-haspopup="true"
          onClick={handleProfileMenuOpen}
          color="inherit"
        >
          <KeyboardArrowDownIcon style={{ color: "white" }} />
        </IconButton>
        <Menu
          id="profile-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleProfile}>Profile</MenuItem>
          <MenuItem onClick={handleLogout} sx={{ color: "red" }}>
            Logout
          </MenuItem>
        </Menu>
      </header>
    </>
  );
};

export default HeaderDefault;
