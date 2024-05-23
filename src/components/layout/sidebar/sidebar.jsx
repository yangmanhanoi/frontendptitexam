import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import AddIcon from "@mui/icons-material/Add";
import PieChartOutlinedIcon from "@mui/icons-material/PieChartOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import "./sidebar.css";

const Sidebar = ({ isSidebarOpen }) => {
  const location = useLocation();
  const [subMenuStates, setSubMenuStates] = useState({});

  const isRouteActive = (route) => {
    return location.pathname === route;
  };

  const toggleSubMenu = (menu) => {
    setSubMenuStates((prevState) => ({
      ...prevState,
      [menu]: !prevState[menu],
    }));
  };

  return (
    <div className={`sidebar ${isSidebarOpen ? "close" : ""}`}>
      <div className="logo-details">
        <Link to="#" className="logo-image">
          <img src="./logo/logo_page.jpg" alt="Logo" />
        </Link>
        <span className="logo-name">PTIT</span>
      </div>
      <ul className="nav-links">
        <li
          className={`nav-link-item ${
            isRouteActive("/exam_manager") || isRouteActive("/user_manager")
              ? "inPage"
              : ""
          } ${subMenuStates.dashboard ? "showMenu" : ""}`}
        >
          <div className="icon-box" onClick={() => toggleSubMenu("dashboard")}>
            <Link to="#">
              <GridViewOutlinedIcon className="icon" />
              <span className="link-name">Dashboard</span>
            </Link>
            <ArrowBackIosRoundedIcon className="icon arrow" />
          </div>
          <ul className="sub-menu">
            <li>
              <Link to="#" className="link-name">
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/exam_manager"
                className={isRouteActive("/exam_manager") ? "inPage" : ""}
              >
                Quản lý kỳ thi
              </Link>
            </li>
            <li>
              <Link
                to="/user_manager"
                className={isRouteActive("/user_manager") ? "inPage" : ""}
              >
                Quản lý người dùng
              </Link>
            </li>
          </ul>
        </li>
        <li
          className={`nav-link-item ${
            isRouteActive("/add_exam") ? "inPage" : ""
          } `}
        >
          <div className="icon-box">
            <Link to="/add_exam">
              <AddIcon className="icon" />
              <span className="link-name">Tạo kỳ thi</span>
            </Link>
          </div>
        </li>
        <li
          className={`nav-link-item ${
            isRouteActive("/exam_static") || isRouteActive("/student_static")
              ? "inPage"
              : ""
          } ${subMenuStates.static ? "showMenu" : ""}`}
        >
          <div className="icon-box" onClick={() => toggleSubMenu("static")}>
            <Link to="#">
              <PieChartOutlinedIcon className="icon" />
              <span className="link-name">Thống kê</span>
            </Link>
            <ArrowBackIosRoundedIcon className="icon arrow" />
          </div>
          <ul className="sub-menu">
            <li>
              <Link to="#" className="link-name">
                Thống kê
              </Link>
            </li>
            <li>
              <Link
                to="/exam_static"
                className={isRouteActive("/exam_static") ? "inPage" : ""}
              >
                Thống kê kỳ thi
              </Link>
            </li>
            <li>
              <Link
                to="/user_static"
                className={isRouteActive("/student_static") ? "inPage" : ""}
              >
                Thống kê người dùng
              </Link>
            </li>
          </ul>
        </li>
        <li
          className={`nav-link-item ${
            isRouteActive("/student_detail") ? "inPage" : ""
          }`}
        >
          <div className="icon-box">
            <Link to="/student_detail">
              <SchoolOutlinedIcon className="icon" />
              <span className="link-name">Sinh viên</span>
            </Link>
          </div>
        </li>
        <li className="nav-link-item">
          <div className="logout-section">
            <Link to="/logout">
              <LogoutIcon className="icon" />
              <span className="link-name">Đăng xuất</span>
            </Link>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
