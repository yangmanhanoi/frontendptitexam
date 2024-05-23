import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import "./navbar.css";

const Navbar = ({ onIsSidebarOpenChange }) => {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <MenuIcon
          onClick={() => onIsSidebarOpenChange()}
          className="sidebar-btn"
        />
        <PopupState variant="popover" popupId="demo-popup-menu">
          {(popupState) => (
            <React.Fragment>
              <button
                variant="contained"
                {...bindTrigger(popupState)}
                className="btn navbar-userprofile"
              >
                <img
                  className="navbar-userprofile-avatar"
                  src="./user_material/user_profile.jpg"
                />
              </button>
              <Menu {...bindMenu(popupState)}>
                <MenuItem onClick={popupState.close}>Bình Nam Quân</MenuItem>
                <hr />
                <MenuItem onClick={popupState.close}>Thông tin</MenuItem>
                <MenuItem onClick={popupState.close}>Cài đặt</MenuItem>
              </Menu>
            </React.Fragment>
          )}
        </PopupState>
      </div>
    </nav>
  );
};

export default Navbar;
