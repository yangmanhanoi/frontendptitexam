import React, { useRef } from 'react'
import './Layout.css'
import { Navbar, Container, Nav, NavDropdown, InputGroup, Image } from 'react-bootstrap';
import AuthGuard from '../AuthGuard/AuthGuard';
import { Link, Outlet } from 'react-router-dom';


const Layout = () => {
    const data =  localStorage.getItem('user')
    const user = JSON.parse(data)
  return (
    <>
        <nav className="navbar navbar-expand-lg ">
            <div className="container-fluid px-4">
                <a className="navbar-brand" href="user_home.html">
                    <img src="/img/logo_page.jpg" alt="Your Logo"/>
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarMobileToggle" aria-controls="navbarMobileToggle" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarMobileToggle">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item inPage">
                            <Link to="/" className="nav-link active" aria-current="page" href="#">Trang chủ</Link>
                        </li>

                        <li className="nav-item inPage">
                            <Link to="/register-quizz" className="nav-link active" aria-current="page" href="#">Lưu trữ</Link>
                        </li>

                        <li className="nav-item inPage">
                            <Link to="/history" className="nav-link active" aria-current="page" href="#">Chat Bot</Link>
                        </li>
                    </ul>

    
                    <div className="btn-group float-end">
                        <a href="#" className=" dropdown-toggle text-decoration-none text-light" data-bs-toggle="dropdown">
                            <i className="bi bi-person-circle"></i>
                            <img src="/img/user_profile.jpg" alt="Your Avatar" className="rounded-circle" height="35"
                                width="35"/>
                            <span>{user.username}</span>
                        </a>
                        <ul className="dropdown-menu dropdown-menu-end">
                            <li className="user-className-profile"><a href="#" className="dropdown-item"><i
                                        className="bi bi-lock-fill"></i> B21DCDT174</a></li>
                            <hr className="dropdown-divider"></hr>
                            <li><a href="#" className="dropdown-item"><i className="bi bi-lock-fill"></i> Hồ sơ</a></li>
                            <li><a href="#" className="dropdown-item"><i className="bi bi-lock-fill"></i> Lớp học</a></li>
                            <hr className="dropdown-divider"/>
                            <li><a href="../../index.html" className="dropdown-item"><i className="bi bi-box-arrow-right"></i>
                                    Đăng xuất</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
        <AuthGuard element={<Outlet/>}></AuthGuard>
    </>


  )
}

export default Layout